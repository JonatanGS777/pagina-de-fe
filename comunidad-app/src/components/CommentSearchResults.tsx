import { Link } from 'react-router-dom'
import { MessageSquareText } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AuthorLink } from '@/components/AuthorLink'
import { TOPIC_CATEGORY_LABELS } from '@/types/firestore-schema'
import { formatRelative } from '@/lib/date'
import type { CommentSearchResult } from '@/hooks/useCommentSearch'

const SNIPPET_LENGTH = 160

function snippet(content: string) {
  return content.length > SNIPPET_LENGTH ? `${content.slice(0, SNIPPET_LENGTH)}…` : content
}

/**
 * Resultados de "búsqueda dentro de comentarios" (distinta del filtro de temas
 * ya cargados de TopicsPage). Cada tarjeta enlaza al tema completo; no hay
 * anclaje directo al comentario porque TopicPage no soporta scroll-to-comment.
 */
export function CommentSearchResults({ results, loading }: { results: CommentSearchResult[]; loading: boolean }) {
  if (loading) return <p className="text-sm text-muted-foreground">Buscando en comentarios...</p>
  if (results.length === 0) return null

  return (
    <div className="space-y-2">
      <h2 className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <MessageSquareText className="size-4" /> Coincidencias en comentarios
      </h2>
      {results.map(({ comment, topic }) => (
        <Link key={comment.id} to={`/tema/${topic.id}`}>
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader className="flex-row items-center justify-between gap-2">
              <Badge variant="secondary">{TOPIC_CATEGORY_LABELS[topic.category]}</Badge>
              <span className="text-xs text-muted-foreground">{formatRelative(comment.createdAt)}</span>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm font-medium">{topic.title}</p>
              <p className="text-sm text-muted-foreground">{snippet(comment.content)}</p>
              <AuthorLink
                uid={comment.authorUid}
                name={comment.author.name}
                photo={comment.author.photo}
                className="text-xs text-muted-foreground hover:underline"
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
