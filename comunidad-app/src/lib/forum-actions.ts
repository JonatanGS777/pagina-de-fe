import type { User } from 'firebase/auth'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { AuthorRef, Comment, ReplyItem, Topic, TopicCategory } from '@/types/firestore-schema'

function authorFromUser(user: User): AuthorRef {
  return {
    name: user.displayName || 'Usuario',
    email: user.email ?? '',
    photo: user.photoURL,
    uid: user.uid,
  }
}

/** Sube un tema nuevo a forumTopics. Mismo shape que escriben forum.js/topic.js. */
export async function createTopic(
  user: User,
  input: { title: string; content: string; category: TopicCategory; verse?: string },
) {
  const author = authorFromUser(user)
  return addDoc(collection(db, 'forumTopics'), {
    title: input.title,
    content: input.content,
    category: input.category,
    verse: input.verse ?? '',
    author,
    authorUid: user.uid,
    likes: 0,
    likedBy: [],
    bookmarkedBy: [],
    replies: 0,
    views: 0,
    createdAt: serverTimestamp(),
    lastReply: null,
  })
}

/**
 * Agrega un comentario de nivel superior. También toca el contador `replies`
 * y `lastReply` del tema, igual que updateTopicLastActivity() en el sitio legado
 * (ese contador cuenta comentarios + respuestas juntos).
 */
export async function addComment(user: User, topicId: string, content: string) {
  const author = authorFromUser(user)
  await addDoc(collection(db, 'forumTopics', topicId, 'comments'), {
    topicId,
    content,
    author,
    authorUid: user.uid,
    likes: 0,
    likedBy: [],
    createdAt: serverTimestamp(),
    replies: [],
  })

  await updateDoc(doc(db, 'forumTopics', topicId), {
    replies: increment(1),
    lastReply: serverTimestamp(),
  })
}

/**
 * Agrega una respuesta embebida en Comment.replies (arrayUnion).
 * createdAt es string ISO de cliente: Firestore serverTimestamp() no se resuelve
 * dentro de arrays, así que no hay forma de usarlo aquí sin cambiar el modelo de datos.
 */
export async function addReply(user: User, topicId: string, commentId: string, content: string) {
  const reply: ReplyItem = {
    id: crypto.randomUUID(),
    content,
    author: authorFromUser(user),
    likes: 0,
    likedBy: [],
    createdAt: new Date().toISOString(),
  }

  await updateDoc(doc(db, 'forumTopics', topicId, 'comments', commentId), {
    replies: arrayUnion(reply),
  })

  await updateDoc(doc(db, 'forumTopics', topicId), {
    replies: increment(1),
    lastReply: serverTimestamp(),
  })
}

/**
 * Borra un comentario y decrementa el contador `replies` del tema.
 * Ese contador suma comentarios + respuestas (ver addComment/addReply), así
 * que borrar un comentario con N respuestas embebidas debe restar 1+N, no 1.
 */
export async function deleteComment(topicId: string, comment: Comment) {
  await deleteDoc(doc(db, 'forumTopics', topicId, 'comments', comment.id))
  await updateDoc(doc(db, 'forumTopics', topicId), {
    replies: increment(-(1 + comment.replies.length)),
  })
}

/** Borra una respuesta embebida de un comentario y decrementa el contador del tema en 1. */
export async function deleteReply(topicId: string, comment: Comment, replyId: string) {
  await updateDoc(doc(db, 'forumTopics', topicId, 'comments', comment.id), {
    replies: comment.replies.filter((r) => r.id !== replyId),
  })
  await updateDoc(doc(db, 'forumTopics', topicId), {
    replies: increment(-1),
  })
}

export async function toggleTopicLike(user: User, topic: Topic) {
  const alreadyLiked = topic.likedBy.includes(user.uid)
  await updateDoc(doc(db, 'forumTopics', topic.id), {
    likes: increment(alreadyLiked ? -1 : 1),
    likedBy: alreadyLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
  })
}

export async function toggleCommentLike(user: User, topicId: string, comment: Comment) {
  const alreadyLiked = comment.likedBy.includes(user.uid)
  await updateDoc(doc(db, 'forumTopics', topicId, 'comments', comment.id), {
    likes: increment(alreadyLiked ? -1 : 1),
    likedBy: alreadyLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
  })
}

/** Favoritos = bookmarkedBy en el propio documento del tema; no hay colección `favorites`. */
export async function toggleBookmark(user: User, topic: Topic) {
  const alreadyBookmarked = topic.bookmarkedBy.includes(user.uid)
  await updateDoc(doc(db, 'forumTopics', topic.id), {
    bookmarkedBy: alreadyBookmarked ? arrayRemove(user.uid) : arrayUnion(user.uid),
  })
}
