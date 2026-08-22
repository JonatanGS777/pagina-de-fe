import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { User } from 'firebase/auth'
import {
  ArrowLeft,
  Bookmark,
  CircleCheck,
  ExternalLink,
  Eye,
  Heart,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTopic } from '@/hooks/useTopic'
import { useUserRole, type UserRole } from '@/hooks/useUserRole'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ReportDialog } from '@/components/ReportDialog'
import { AuthorLink } from '@/components/AuthorLink'
import { ReactionBar } from '@/components/ReactionBar'
import { MentionTextarea } from '@/components/MentionTextarea'
import { TOPIC_CATEGORY_LABELS } from '@/types/firestore-schema'
import { SITE_CATEGORIES, SITE_PAGES, SITE_PAGES_BY_ID } from '@/lib/site-content'
import { getThreadParticipants } from '@/lib/mentions'
import { formatRelative } from '@/lib/date'
import { cn } from '@/lib/utils'
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
  deleteTopic,
  incrementTopicViews,
  setAcceptedAnswer,
  setTopicPinned,
  toggleBookmark,
  toggleCommentLike,
  toggleReplyLike,
  toggleTopicLike,
  updateComment,
  updateTopic,
} from '@/lib/forum-actions'
import type { AuthorRef, Comment, ReplyItem, Topic } from '@/types/firestore-schema'

const NO_SITE_LINK = 'none'

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
  const isLiked = reply.likedBy.includes(user.uid)

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
      <p className="font-medium">
        <AuthorLink uid={reply.author.uid} name={reply.author.name} />
      </p>
      <p className="whitespace-pre-wrap text-muted-foreground">{reply.content}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{formatRelative(reply.createdAt)}</span>
        <button
          type="button"
          className={cn('flex items-center gap-1', isLiked && 'text-destructive')}
          onClick={() => toggleReplyLike(user, topicId, comment, reply.id)}
        >
          <Heart className={cn('size-3.5', isLiked && 'fill-current')} /> {reply.likes}
        </button>
        <ReportDialog user={user} targetType="reply" topicId={topicId} commentId={comment.id} replyId={reply.id} />
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
  topic,
  user,
  role,
  participants,
}: {
  comment: Comment
  topic: Topic
  user: User
  role: UserRole
  participants: AuthorRef[]
}) {
  const [replying, setReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(comment.content)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isLiked = comment.likedBy.includes(user.uid)
  const isOwn = isOwnEntity(comment, user)
  const canDelete = isOwn || isModeratorOrAdmin(role)
  const isAccepted = topic.acceptedCommentId === comment.id
  const canMarkAccepted = topic.category === 'preguntas' && (isOwnEntity(topic, user) || isModeratorOrAdmin(role))

  async function handleToggleAccepted() {
    await setAcceptedAnswer(topic.id, isAccepted ? null : comment.id)
  }

  async function handleReply(e: FormEvent) {
    e.preventDefault()
    if (replyText.trim().length < 5) return

    setSubmitting(true)
    try {
      await addReply(user, topic, comment, replyText.trim(), participants)
      setReplyText('')
      setReplying(false)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleEditSave(e: FormEvent) {
    e.preventDefault()
    if (editText.trim().length < 10) {
      setError('El comentario debe tener al menos 10 caracteres.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await updateComment(topic.id, comment.id, editText.trim())
      setEditing(false)
    } catch {
      setError('No se pudo guardar el cambio. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('¿Borrar este comentario? Esta acción no se puede deshacer.')) return
    setError(null)
    try {
      await deleteComment(topic.id, comment)
    } catch (err) {
      console.error('Error al borrar comentario:', err)
      setError('No se pudo borrar el comentario. Verifica tus permisos e inténtalo de nuevo.')
    }
  }

  return (
    <div className={cn('space-y-2', isAccepted && 'rounded-lg border border-primary/40 bg-primary/5 p-3')}>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium">
            <AuthorLink uid={comment.authorUid} name={comment.author.name} />
          </p>
          {isAccepted && (
            <Badge variant="outline" className="gap-1 text-primary">
              <CircleCheck className="size-3" /> Respuesta aceptada
            </Badge>
          )}
        </div>

        {editing ? (
          <form className="space-y-2" onSubmit={handleEditSave}>
            <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3} />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={submitting}>
                Guardar
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <p className="whitespace-pre-wrap">
            {comment.content}
            {comment.editedAt && <span className="ml-1 text-xs text-muted-foreground">(editado)</span>}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatRelative(comment.createdAt)}</span>
          <button
            type="button"
            className={cn('flex items-center gap-1', isLiked && 'text-destructive')}
            onClick={() => toggleCommentLike(user, topic.id, comment)}
          >
            <Heart className={cn('size-3.5', isLiked && 'fill-current')} /> {comment.likes}
          </button>
          <button type="button" onClick={() => setReplying((v) => !v)}>
            Responder
          </button>
          {canMarkAccepted && (
            <button
              type="button"
              className={cn('flex items-center gap-1', isAccepted ? 'text-primary' : 'hover:text-primary')}
              onClick={handleToggleAccepted}
            >
              <CircleCheck className="size-3.5" /> {isAccepted ? 'Quitar aceptada' : 'Marcar como aceptada'}
            </button>
          )}
          {isOwn && !editing && (
            <button
              type="button"
              className="flex items-center gap-1 hover:text-primary"
              onClick={() => {
                setEditText(comment.content)
                setEditing(true)
              }}
            >
              <Pencil className="size-3.5" /> Editar
            </button>
          )}
          <ReportDialog user={user} targetType="comment" topicId={topic.id} commentId={comment.id} />
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
          <div className="flex-1">
            <MentionTextarea
              participants={participants}
              value={replyText}
              onChange={setReplyText}
              rows={2}
              placeholder="Escribe una respuesta... (usa @ para mencionar)"
              className="text-sm"
            />
          </div>
          <Button type="submit" size="sm" disabled={submitting}>
            Enviar
          </Button>
        </form>
      )}

      {comment.replies.map((reply) => (
        <ReplyBubble key={reply.id} reply={reply} topicId={topic.id} comment={comment} user={user} role={role} />
      ))}
    </div>
  )
}

function NewCommentForm({
  topic,
  user,
  participants,
}: {
  topic: Topic
  user: User
  participants: AuthorRef[]
}) {
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
      await addComment(user, topic, content.trim(), participants)
      setContent('')
    } catch {
      setError('No se pudo publicar el comentario.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <MentionTextarea
        participants={participants}
        value={content}
        onChange={setContent}
        rows={3}
        placeholder="Escribe un comentario... (usa @ para mencionar)"
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
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(topic.title)
  const [editContent, setEditContent] = useState(topic.content)
  const [editVerse, setEditVerse] = useState(topic.verse ?? '')
  const [editSitePageId, setEditSitePageId] = useState(topic.siteLink?.pageId ?? NO_SITE_LINK)
  const [submitting, setSubmitting] = useState(false)
  const [pinning, setPinning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isLiked = topic.likedBy.includes(user.uid)
  const isBookmarked = topic.bookmarkedBy.includes(user.uid)
  const isOwn = isOwnEntity(topic, user)
  const canDelete = isOwn || isModeratorOrAdmin(role)
  const isResolved = topic.category === 'preguntas' && !!topic.acceptedCommentId

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

  async function handleTogglePinned() {
    setPinning(true)
    try {
      await setTopicPinned(topic.id, !topic.pinned)
    } finally {
      setPinning(false)
    }
  }

  function startEditing() {
    setEditTitle(topic.title)
    setEditContent(topic.content)
    setEditVerse(topic.verse ?? '')
    setEditSitePageId(topic.siteLink?.pageId ?? NO_SITE_LINK)
    setEditing(true)
  }

  async function handleEditSave(e: FormEvent) {
    e.preventDefault()
    if (editTitle.trim().length < 5) {
      setError('El título debe tener al menos 5 caracteres.')
      return
    }
    if (editContent.trim().length < 10) {
      setError('El contenido debe tener al menos 10 caracteres.')
      return
    }
    const sitePage = editSitePageId !== NO_SITE_LINK ? SITE_PAGES_BY_ID.get(editSitePageId) : undefined
    setSubmitting(true)
    setError(null)
    try {
      await updateTopic(topic.id, {
        title: editTitle.trim(),
        content: editContent.trim(),
        verse: editVerse.trim(),
        siteLink: sitePage ? { pageId: sitePage.id, title: sitePage.title, url: sitePage.url } : null,
      })
      setEditing(false)
    } catch {
      setError('No se pudo guardar el cambio. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (editing) {
    return (
      <form className="space-y-3" onSubmit={handleEditSave}>
        <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Título" />
        <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={5} />
        <Input
          value={editVerse}
          onChange={(e) => setEditVerse(e.target.value)}
          placeholder="Referencia bíblica (opcional)"
        />
        <Select value={editSitePageId} onValueChange={setEditSitePageId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sin vínculo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NO_SITE_LINK}>Sin vínculo al sitio</SelectItem>
            {SITE_CATEGORIES.map((cat) => (
              <SelectGroup key={cat}>
                <SelectLabel>{cat}</SelectLabel>
                {SITE_PAGES.filter((p) => p.category === cat).map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-2">
          <Button type="submit" size="sm" disabled={submitting}>
            Guardar cambios
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
            Cancelar
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{TOPIC_CATEGORY_LABELS[topic.category]}</Badge>
          {topic.pinned && (
            <Badge variant="outline" className="gap-1">
              <Pin className="size-3" /> Fijado
            </Badge>
          )}
          {isResolved && (
            <Badge variant="outline" className="gap-1 text-primary">
              <CircleCheck className="size-3" /> Resuelto
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
          {isOwn && (
            <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={startEditing}>
              <Pencil className="size-3.5" /> Editar
            </button>
          )}
          {isModeratorOrAdmin(role) && (
            <button
              type="button"
              className="flex items-center gap-1 hover:text-primary disabled:opacity-50"
              onClick={handleTogglePinned}
              disabled={pinning}
            >
              {topic.pinned ? <PinOff className="size-3.5" /> : <Pin className="size-3.5" />}
              {topic.pinned ? 'Desfijar' : 'Fijar'}
            </button>
          )}
          <ReportDialog user={user} targetType="topic" topicId={topic.id} />
          {canDelete && (
            <button
              type="button"
              className="flex items-center gap-1 hover:text-destructive disabled:opacity-50"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className="size-3.5" /> {deleting ? 'Borrando...' : 'Borrar tema'}
            </button>
          )}
        </div>
      </div>
      <h1 className="text-xl font-semibold">{topic.title}</h1>
      <p className="text-sm text-muted-foreground">
        <AuthorLink uid={topic.authorUid} name={topic.author.name} /> · {formatRelative(topic.createdAt)}
        {topic.editedAt && ' · editado'}
      </p>
      <p className="whitespace-pre-wrap">{topic.content}</p>
      {topic.verse && <p className="italic text-muted-foreground">{topic.verse}</p>}
      {topic.siteLink && (
        <a
          href={topic.siteLink.url}
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-1 text-sm text-primary hover:underline"
        >
          <ExternalLink className="size-3.5" /> {topic.siteLink.title}
        </a>
      )}
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
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Eye className="size-4" /> {topic.views}
        </span>
        <ReactionBar topic={topic} user={user} />
      </div>
    </div>
  )
}

export function TopicPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const role = useUserRole(user)
  const { topic, comments, loading, error } = useTopic(id)
  const viewedRef = useRef<string | null>(null)

  // Cuenta la vista una sola vez por carga de tema (no en cada re-render del
  // listener en tiempo real, que dispararía incrementos infinitos).
  useEffect(() => {
    if (!id || viewedRef.current === id) return
    viewedRef.current = id
    void incrementTopicViews(id)
  }, [id])

  if (loading) return <p className="p-6 text-muted-foreground">Cargando tema...</p>
  if (error) return <p className="p-6 text-destructive">Error: {error.message}</p>
  if (!topic || !id) return <p className="p-6 text-muted-foreground">Tema no encontrado.</p>
  if (!user) return null

  const participants = getThreadParticipants(topic, comments)

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
          <CommentItem
            key={comment.id}
            comment={comment}
            topic={topic}
            user={user}
            role={role}
            participants={participants}
          />
        ))}
        <NewCommentForm topic={topic} user={user} participants={participants} />
      </div>
    </div>
  )
}
