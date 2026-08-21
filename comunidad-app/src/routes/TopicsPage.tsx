import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTopics } from '@/hooks/useTopics'
import { TopicCard } from '@/components/TopicCard'
import { NewTopicDialog } from '@/components/NewTopicDialog'
import { Button } from '@/components/ui/button'

export function TopicsPage() {
  const { user } = useAuth()
  const { topics, loading, error } = useTopics()

  if (loading) {
    return <p className="p-6 text-muted-foreground">Cargando temas...</p>
  }

  if (error) {
    return <p className="p-6 text-destructive">Error al cargar el foro: {error.message}</p>
  }

  // AuthGate ya garantiza sesión activa en toda la app.
  if (!user) return null

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Comunidad de fe</h1>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/favoritos">Mis favoritos</Link>
          </Button>
          <NewTopicDialog user={user} />
        </div>
      </div>

      {topics.length === 0 && (
        <p className="text-muted-foreground">Aún no hay temas publicados.</p>
      )}

      <div className="space-y-3">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} user={user} />
        ))}
      </div>
    </div>
  )
}
