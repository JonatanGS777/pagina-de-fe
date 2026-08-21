import type { Timestamp } from 'firebase/firestore'

export type TopicCategory =
  | 'estudios'
  | 'preguntas'
  | 'testimonios'
  | 'oracion'
  | 'general'

export const TOPIC_CATEGORY_LABELS: Record<TopicCategory, string> = {
  estudios: 'Estudios Bíblicos',
  preguntas: 'Preguntas y Respuestas',
  testimonios: 'Testimonios',
  oracion: 'Peticiones de Oración',
  general: 'Conversación General',
}

export interface AuthorRef {
  name: string
  email: string
  photo: string | null
  uid: string
}

/** forumTopics/{topicId} */
export interface Topic {
  id: string
  title: string
  content: string
  category: TopicCategory
  verse?: string
  author: AuthorRef
  authorUid: string
  likes: number
  likedBy: string[]
  /** Único mecanismo de favoritos: no existe una colección `favorites` separada. */
  bookmarkedBy: string[]
  /** Contador de comentarios (no confundir con Comment.replies, que es un array). */
  replies: number
  views: number
  createdAt: Timestamp
  lastReply: Timestamp | null
}

/**
 * Respuesta embebida dentro de Comment.replies (arrayUnion), no una subcolección.
 * createdAt es un string ISO de cliente porque Firestore serverTimestamp() no se
 * resuelve dentro de arrays — no es un error, es una restricción real de Firestore.
 */
export interface ReplyItem {
  id: string
  content: string
  author: AuthorRef
  likes: number
  likedBy: string[]
  createdAt: string
}

/** forumTopics/{topicId}/comments/{commentId} */
export interface Comment {
  id: string
  topicId: string
  content: string
  author: AuthorRef
  authorUid: string
  likes: number
  likedBy: string[]
  createdAt: Timestamp
  replies: ReplyItem[]
}

/** forumStats (documento único agregado, recalculado manualmente) */
export interface ForumStats {
  topicsCount: number
  commentsCount: number
  usersCount: number
  lastUpdated: Timestamp
}

/** userProfiles/{uid} */
export interface UserProfile {
  uid: string
  name: string
  email: string
  photoURL: string | null
  lastLogin: Timestamp
  joinDate: Date
  visitCount: number
  lastVisitDate: string
  daysSinceJoining: number
  isValidData: boolean
  /** Seteado por fuera de la app (script set-admin-role.mjs), no por escritura de cliente. */
  role?: 'admin' | 'moderator' | 'member'
}
