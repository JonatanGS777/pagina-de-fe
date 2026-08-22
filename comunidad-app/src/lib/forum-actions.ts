import type { User } from 'firebase/auth'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { extractMentions } from '@/lib/mentions'
import type {
  AuthorRef,
  Comment,
  ReplyItem,
  ReportTargetType,
  Topic,
  TopicCategory,
} from '@/types/firestore-schema'

function authorFromUser(user: User): AuthorRef {
  return {
    name: user.displayName || 'Usuario',
    email: user.email ?? '',
    photo: user.photoURL,
    uid: user.uid,
  }
}

/**
 * Crea una notificación para `toUid`. Nunca se notifica a sí mismo (comentar tu
 * propio tema, responder tu propio comentario) — la regla de Firestore también
 * lo exige (fromUid != userId), esto solo evita el viaje de red de antemano.
 */
async function notifyUser(
  toUid: string,
  input: { type: 'comment' | 'reply' | 'mention'; topicId: string; topicTitle: string; from: AuthorRef },
) {
  if (toUid === input.from.uid) return
  await addDoc(collection(db, 'notifications', toUid, 'items'), {
    type: input.type,
    topicId: input.topicId,
    topicTitle: input.topicTitle,
    fromUid: input.from.uid,
    fromName: input.from.name,
    read: false,
    createdAt: serverTimestamp(),
  })
}

/** Sube un tema nuevo a forumTopics. Mismo shape que escriben forum.js/topic.js. */
export async function createTopic(
  user: User,
  input: {
    title: string
    content: string
    category: TopicCategory
    verse?: string
    siteLink?: { pageId: string; title: string; url: string } | null
  },
) {
  const author = authorFromUser(user)
  return addDoc(collection(db, 'forumTopics'), {
    title: input.title,
    content: input.content,
    category: input.category,
    verse: input.verse ?? '',
    ...(input.siteLink ? { siteLink: input.siteLink } : {}),
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
 * (ese contador cuenta comentarios + respuestas juntos), y notifica al autor del
 * tema (si no es quien comenta).
 */
export async function addComment(
  user: User,
  topic: Topic,
  content: string,
  threadParticipants: AuthorRef[] = [],
) {
  const author = authorFromUser(user)
  await addDoc(collection(db, 'forumTopics', topic.id, 'comments'), {
    topicId: topic.id,
    content,
    author,
    authorUid: user.uid,
    likes: 0,
    likedBy: [],
    createdAt: serverTimestamp(),
    replies: [],
  })

  await updateDoc(doc(db, 'forumTopics', topic.id), {
    replies: increment(1),
    lastReply: serverTimestamp(),
  })

  await notifyUser(topic.authorUid, {
    type: 'comment',
    topicId: topic.id,
    topicTitle: topic.title,
    from: author,
  })

  // Menciones @Nombre a otros participantes del hilo (el autor del tema ya fue
  // notificado arriba como 'comment', así que se excluye para no duplicar).
  for (const mentioned of extractMentions(content, threadParticipants)) {
    if (mentioned.uid === topic.authorUid) continue
    await notifyUser(mentioned.uid, { type: 'mention', topicId: topic.id, topicTitle: topic.title, from: author })
  }
}

/**
 * Agrega una respuesta embebida en Comment.replies (arrayUnion).
 * createdAt es string ISO de cliente: Firestore serverTimestamp() no se resuelve
 * dentro de arrays, así que no hay forma de usarlo aquí sin cambiar el modelo de datos.
 * Notifica al autor del comentario respondido (si no es quien responde).
 */
export async function addReply(
  user: User,
  topic: Topic,
  comment: Comment,
  content: string,
  threadParticipants: AuthorRef[] = [],
) {
  const author = authorFromUser(user)
  const reply: ReplyItem = {
    id: crypto.randomUUID(),
    content,
    author,
    likes: 0,
    likedBy: [],
    createdAt: new Date().toISOString(),
  }

  await updateDoc(doc(db, 'forumTopics', topic.id, 'comments', comment.id), {
    replies: arrayUnion(reply),
  })

  await updateDoc(doc(db, 'forumTopics', topic.id), {
    replies: increment(1),
    lastReply: serverTimestamp(),
  })

  await notifyUser(comment.authorUid, {
    type: 'reply',
    topicId: topic.id,
    topicTitle: topic.title,
    from: author,
  })

  for (const mentioned of extractMentions(content, threadParticipants)) {
    if (mentioned.uid === comment.authorUid) continue
    await notifyUser(mentioned.uid, { type: 'mention', topicId: topic.id, topicTitle: topic.title, from: author })
  }
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

/**
 * Borra un tema completo: primero su subcolección de comentarios (las respuestas
 * van embebidas dentro de cada comentario, así que no hace falta un paso aparte)
 * y luego el propio documento del tema, todo en un batch atómico.
 */
export async function deleteTopic(topic: Topic) {
  const commentsSnap = await getDocs(collection(db, 'forumTopics', topic.id, 'comments'))
  const batch = writeBatch(db)
  commentsSnap.docs.forEach((commentDoc) => batch.delete(commentDoc.ref))
  batch.delete(doc(db, 'forumTopics', topic.id))
  await batch.commit()
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

/**
 * Da/quita like a una respuesta embebida. No hay operador atómico para un elemento
 * de un array de objetos, así que se reescribe el array completo (igual que deleteReply).
 */
export async function toggleReplyLike(user: User, topicId: string, comment: Comment, replyId: string) {
  const replies = comment.replies.map((reply) => {
    if (reply.id !== replyId) return reply
    const alreadyLiked = reply.likedBy.includes(user.uid)
    return {
      ...reply,
      likes: reply.likes + (alreadyLiked ? -1 : 1),
      likedBy: alreadyLiked
        ? reply.likedBy.filter((uid) => uid !== user.uid)
        : [...reply.likedBy, user.uid],
    }
  })

  await updateDoc(doc(db, 'forumTopics', topicId, 'comments', comment.id), { replies })
}

/** Marca el tema como visto una vez por carga (ver useTopic/TopicPage). */
export async function incrementTopicViews(topicId: string) {
  await updateDoc(doc(db, 'forumTopics', topicId), { views: increment(1) })
}

/** Edita título/contenido/versículo de un tema propio. Marca editedAt. */
export async function updateTopic(
  topicId: string,
  input: {
    title: string
    content: string
    verse?: string
    siteLink?: { pageId: string; title: string; url: string } | null
  },
) {
  await updateDoc(doc(db, 'forumTopics', topicId), {
    title: input.title,
    content: input.content,
    verse: input.verse ?? '',
    siteLink: input.siteLink ?? null,
    editedAt: serverTimestamp(),
  })
}

/**
 * Marca/desmarca la respuesta aceptada de un tema (categoría 'preguntas').
 * La hace el autor del tema o un moderador; pasar `commentId: null` la quita.
 */
export async function setAcceptedAnswer(topicId: string, commentId: string | null) {
  await updateDoc(doc(db, 'forumTopics', topicId), { acceptedCommentId: commentId })
}

/** Fija/desfija un tema como destacado (solo admin/moderador, ver firestore.rules). */
export async function setTopicPinned(topicId: string, pinned: boolean) {
  await updateDoc(doc(db, 'forumTopics', topicId), { pinned })
}

/** Edita el contenido de un comentario propio. Marca editedAt. */
export async function updateComment(topicId: string, commentId: string, content: string) {
  await updateDoc(doc(db, 'forumTopics', topicId, 'comments', commentId), {
    content,
    editedAt: serverTimestamp(),
  })
}

/**
 * Reporta un tema, comentario o respuesta ante moderación. `commentId`/`replyId`
 * se omiten (no `undefined`, Firestore los rechaza) cuando no aplican al tipo de blanco.
 */
export async function createReport(
  user: User,
  input: {
    targetType: ReportTargetType
    topicId: string
    commentId?: string
    replyId?: string
    reason: string
  },
) {
  await addDoc(collection(db, 'reports'), {
    targetType: input.targetType,
    topicId: input.topicId,
    ...(input.commentId ? { commentId: input.commentId } : {}),
    ...(input.replyId ? { replyId: input.replyId } : {}),
    reason: input.reason,
    reportedBy: user.uid,
    reporterName: user.displayName || 'Usuario',
    status: 'pending',
    createdAt: serverTimestamp(),
  })
}

/** Marca un reporte como resuelto (el moderador ya actuó sobre el contenido). */
export async function resolveReport(moderator: User, reportId: string) {
  await updateDoc(doc(db, 'reports', reportId), {
    status: 'resolved',
    resolvedBy: moderator.uid,
    resolvedAt: serverTimestamp(),
  })
}

/** Descarta un reporte (el moderador decidió que no amerita acción). */
export async function dismissReport(moderator: User, reportId: string) {
  await updateDoc(doc(db, 'reports', reportId), {
    status: 'dismissed',
    resolvedBy: moderator.uid,
    resolvedAt: serverTimestamp(),
  })
}

/** Marca una notificación propia como leída. */
export async function markNotificationRead(uid: string, notificationId: string) {
  await updateDoc(doc(db, 'notifications', uid, 'items', notificationId), {
    read: true,
    readAt: serverTimestamp(),
  })
}

/** Borra una notificación propia. */
export async function deleteNotification(uid: string, notificationId: string) {
  await deleteDoc(doc(db, 'notifications', uid, 'items', notificationId))
}

/**
 * Da/quita una reacción de emoji a un tema (independiente del like). Usa el path
 * con notación de punto para tocar solo `reactions.<emoji>`, sin leer/reescribir
 * todo el mapa de reacciones.
 */
export async function toggleTopicReaction(user: User, topic: Topic, emoji: string) {
  const alreadyReacted = (topic.reactions?.[emoji] ?? []).includes(user.uid)
  await updateDoc(doc(db, 'forumTopics', topic.id), {
    [`reactions.${emoji}`]: alreadyReacted ? arrayRemove(user.uid) : arrayUnion(user.uid),
  })
}
