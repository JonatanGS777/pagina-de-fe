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

export type CategoryFilter = 'all' | TopicCategory

export type TopicSort = 'recent' | 'active' | 'unanswered'

export const TOPIC_SORT_LABELS: Record<TopicSort, string> = {
  recent: 'Más recientes',
  active: 'Más comentados',
  unanswered: 'Sin responder',
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
  /** Presente solo si el autor editó el tema después de publicarlo. */
  editedAt?: Timestamp
  /** Cita opcional a una página real del sitio (ver src/lib/site-content.ts). */
  siteLink?: { pageId: string; title: string; url: string }
  /** Solo admin/moderador la fija; los temas fijados se muestran primero en la lista. */
  pinned?: boolean
  /**
   * Id del comentario marcado como respuesta aceptada (solo aplica a la categoría
   * 'preguntas'). Lo pone el autor del tema o un moderador.
   */
  acceptedCommentId?: string
  /**
   * Reacciones más allá del like, por emoji -> uids que reaccionaron. Solo a
   * nivel de tema (no comentarios/respuestas) para no saturar la UI de hilos.
   */
  reactions?: Record<string, string[]>
}

export const TOPIC_REACTIONS = ['🙏', '💡'] as const

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
  /** Presente solo si el autor editó el comentario después de publicarlo. */
  editedAt?: Timestamp
}

export type ReportTargetType = 'topic' | 'comment' | 'reply'
export type ReportStatus = 'pending' | 'resolved' | 'dismissed'

/** reports/{reportId} */
export interface Report {
  id: string
  targetType: ReportTargetType
  topicId: string
  /** Id del comentario reportado (targetType 'comment' o 'reply'); ausente si targetType es 'topic'. */
  commentId?: string
  /** Id de la respuesta reportada (targetType 'reply'); ausente en otros casos. */
  replyId?: string
  reason: string
  reportedBy: string
  reporterName: string
  status: ReportStatus
  createdAt: Timestamp
  resolvedBy?: string
  resolvedAt?: Timestamp
}

export type NotificationType = 'comment' | 'reply' | 'mention'

/** notifications/{uid}/items/{notificationId} */
export interface AppNotification {
  id: string
  type: NotificationType
  topicId: string
  topicTitle: string
  fromUid: string
  fromName: string
  read: boolean
  createdAt: Timestamp
  readAt?: Timestamp
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
