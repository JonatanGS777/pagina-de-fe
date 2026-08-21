import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useFavorites } from '@/hooks/useFavorites'
import { TopicCard } from '@/components/TopicCard'

export function FavoritesPage() {
  const { user } = useAuth()
  const { favorites, loading, error } = useFavorites(user?.uid)

  if (!user) return null

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" /> Volver a la comunidad
      </Link>

      <h1 className="text-xl font-semibold">Mis favoritos</h1>

      {loading && <p className="text-muted-foreground">Cargando...</p>}
      {error && <p className="text-destructive">Error: {error.message}</p>}
      {!loading && favorites.length === 0 && (
        <p className="text-muted-foreground">Aún no has marcado temas como favoritos.</p>
      )}

      <div className="space-y-3">
        {favorites.map((topic) => (
          <TopicCard key={topic.id} topic={topic} user={user} />
        ))}
      </div>
    </div>
  )
}
