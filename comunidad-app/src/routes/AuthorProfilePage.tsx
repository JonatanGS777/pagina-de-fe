import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Eye, Heart, MessageCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useAuthorTopics } from '@/hooks/useAuthorTopics'
import { TopicCard } from '@/components/TopicCard'

export function AuthorProfilePage() {
  const { uid } = useParams<{ uid: string }>()
  const { user } = useAuth()
  const { topics, loading, error } = useAuthorTopics(uid)

  if (!user || !uid) return null

  const author = topics[0]?.author
  const totalLikes = topics.reduce((sum, t) => sum + t.likes, 0)
  const totalViews = topics.reduce((sum, t) => sum + t.views, 0)
  const totalComments = topics.reduce((sum, t) => sum + t.replies, 0)

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" /> Volver a la comunidad
      </Link>

      {loading && <p className="text-muted-foreground">Cargando perfil...</p>}
      {error && <p className="text-destructive">Error: {error.message}</p>}

      {!loading && topics.length === 0 && (
        <p className="text-muted-foreground">Este usuario todavía no ha publicado temas.</p>
      )}

      {!loading && author && (
        <>
          <div className="flex items-center gap-3">
            {author.photo && (
              <img src={author.photo} alt="" className="size-14 rounded-full object-cover" />
            )}
            <div>
              <h1 className="text-xl font-semibold">{author.name}</h1>
              <p className="text-sm text-muted-foreground">{topics.length} temas publicados</p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageCircle className="size-4" /> {totalComments} comentarios recibidos
            </span>
            <span className="flex items-center gap-1">
              <Heart className="size-4" /> {totalLikes} likes recibidos
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-4" /> {totalViews} vistas
            </span>
          </div>

          <div className="space-y-3">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
