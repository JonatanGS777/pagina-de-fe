import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { ArrowLeft, Bookmark, Heart, Trash2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTopic } from '@/hooks/useTopic'
import { useUserRole, type UserRole } from '@/hooks/useUserRole'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { TOPIC_CATEGORY_LABELS } from '@/types/firestore-schema'
import { formatRelative } from '@/lib/date'
import { cn } from '@/lib/utils'
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
  deleteTopic,
  toggleBookmark,
  toggleCommentLike,
  toggleTopicLike,
} from '@/lib/forum-actions'
import type { Comment, ReplyItem, Topic } from '@/types/firestore-schema'

function isModeratorOrAdmin(role: UserRole) {
  return role === 'moderator' || role === 'admin'
}

// Comentarios/respuestas viejos del foro legado pueden no tener authorUid
// seteado (bug ya corregido en el código, pero los documentos existentes en
// Firestore quedaron como estaban) — se verifica también author.uid/email,
// igual que la regla de seguridad de Firestore (que usa author.uid).
function isOwnEntity(entity: { authorUid?: string; author?: { uid?: string; email?: string } }, user: User) {
  return (
    entity.authorUid === user.uid ||
    entity.author?.uid === user.uid ||
    (!!entity.author?.email && entity.author.email === user.email)
  )
}

function ReplyBubble({
  reply,
  topicId,
  comment,
  user,
  role,
}: {
  reply: ReplyItem
  topicId: string
  comment: Comment
  user: User
  role: UserRole
}) {
  const [error, setError] = useState<string | null>(null)
  const canDelete = isOwnEntity(reply, user) || isModeratorOrAdmin(role)

  async function handleDelete() {
    if (!window.confirm('¿Borrar esta respuesta? Esta acción no se puede deshacer.')) return
    setError(null)
    try {
      await deleteReply(topicId, comment, reply.id)
    } catch (err) {
      console.error('Error al borrar respuesta:', err)
      setError('No se pudo borrar la respuesta. Verifica tus permisos e inténtalo de nuevo.')
    }
  }

  return (
    <div className="ml-8 border-l pl-4 text-sm">
      <p className="font-medium">{reply.author.name}</p>
      <p className="text-muted-foreground">{reply.content}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{formatRelative(reply.createdAt)}</span>
        {canDelete && (
          <button
            type="button"
            className="flex items-center gap-1 hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="size-3.5" /> Borrar
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

function CommentItem({
  comment,
  topicId,
  user,
  role,
}: {
  comment: Comment
  topicId: string
  user: User
  role: UserRole
}) {
  const [replying, setReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isLiked = comment.likedBy.includes(user.uid)
  const canDelete = isOwnEntity(comment, user) || isModeratorOrAdmin(role)

  async function handleReply(e: FormEvent) {
    e.preventDefault()
    if (replyText.trim().length < 5) return

    setSubmitting(true)
    try {
      await addReply(user, topicId, comment.id, replyText.trim())
      setReplyText('')
      setReplying(false)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('¿Borrar este comentario? Esta acción no se puede deshacer.')) return
    setError(null)
    try {
      await deleteComment(topicId, comment)
    } catch (err) {
      console.error('Error al borrar comentario:', err)
      setError('No se pudo borrar el comentario. Verifica tus permisos e inténtalo de nuevo.')
    }
  }

  return (
    <div className="space-y-2">
      <div>
        <p className="font-medium">{comment.author.name}</p>
        <p>{comment.content}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatRelative(comment.createdAt)}</span>
          <button
            type="button"
            className={cn('flex items-center gap-1', isLiked && 'text-destructive')}
            onClick={() => toggleCommentLike(user, topicId, comment)}
          >
            <Heart className={cn('size-3.5', isLiked && 'fill-current')} /> {comment.likes}
          </button>
          <button type="button" onClick={() => setReplying((v) => !v)}>
            Responder
          </button>
          {canDelete && (
            <button
              type="button"
              className="flex items-center gap-1 hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="size-3.5" /> Borrar
            </button>
          )}
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      {replying && (
        <form className="ml-8 flex gap-2" onSubmit={handleReply}>
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={2}
            placeholder="Escribe una respuesta..."
            className="text-sm"
          />
          <Button type="submit" size="sm" disabled={submitting}>
            Enviar
          </Button>
        </form>
      )}

      {comment.replies.map((reply) => (
        <ReplyBubble key={reply.id} reply={reply} topicId={topicId} comment={comment} user={user} role={role} />
      ))}
    </div>
  )
}

function NewCommentForm({ topicId, user }: { topicId: string; user: User }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (content.trim().length < 10) {
      setError('El comentario debe tener al menos 10 caracteres.')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await addComment(user, topicId, content.trim())
      setContent('')
    } catch {
      setError('No se pudo publicar el comentario.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Escribe un comentario..."
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Publicando...' : 'Comentar'}
      </Button>
    </form>
  )
}

function TopicHeader({ topic, user, role }: { topic: Topic; user: User; role: UserRole }) {
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isLiked = topic.likedBy.includes(user.uid)
  const isBookmarked = topic.bookmarkedBy.includes(user.uid)
  const canDelete = isOwnEntity(topic, user) || isModeratorOrAdmin(role)

  async function handleDelete() {
    if (!window.confirm('¿Borrar este tema junto con todos sus comentarios? Esta acción no se puede deshacer.'))
      return
    setError(null)
    setDeleting(true)
    try {
      await deleteTopic(topic)
      navigate('/')
    } catch (err) {
      console.error('Error al borrar tema:', err)
      setError('No se pudo borrar el tema. Verifica tus permisos e inténtalo de nuevo.')
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <Badge variant="secondary">{TOPIC_CATEGORY_LABELS[topic.category]}</Badge>
        {canDelete && (
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-destructive disabled:opacity-50"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 className="size-3.5" /> {deleting ? 'Borrando...' : 'Borrar tema'}
          </button>
        )}
      </div>
      <h1 className="text-xl font-semibold">{topic.title}</h1>
      <p className="text-sm text-muted-foreground">
        {topic.author.name} · {formatRelative(topic.createdAt)}
      </p>
      <p>{topic.content}</p>
      {topic.verse && <p className="italic text-muted-foreground">{topic.verse}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn('gap-1', isLiked && 'text-destructive')}
          onClick={() => toggleTopicLike(user, topic)}
        >
          <Heart className={cn('size-4', isLiked && 'fill-current')} /> {topic.likes}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn('gap-1', isBookmarked && 'text-primary')}
          onClick={() => toggleBookmark(user, topic)}
        >
          <Bookmark className={cn('size-4', isBookmarked && 'fill-current')} />
          {isBookmarked ? 'En favoritos' : 'Guardar'}
        </Button>
      </div>
    </div>
  )
}

export function TopicPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const role = useUserRole(user)
  const { topic, comments, loading, error } = useTopic(id)

  if (loading) return <p className="p-6 text-muted-foreground">Cargando tema...</p>
  if (error) return <p className="p-6 text-destructive">Error: {error.message}</p>
  if (!topic || !id) return <p className="p-6 text-muted-foreground">Tema no encontrado.</p>
  if (!user) return null

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" /> Volver a la comunidad
      </Link>

      <TopicHeader topic={topic} user={user} role={role} />

      <Separator />

      <div className="space-y-4">
        <h2 className="font-medium">Comentarios ({comments.length})</h2>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} topicId={id} user={user} role={role} />
        ))}
        <NewCommentForm topicId={id} user={user} />
      </div>
    </div>
  )
}
