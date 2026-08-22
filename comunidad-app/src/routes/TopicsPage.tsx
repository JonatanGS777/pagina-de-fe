import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTopics } from '@/hooks/useTopics'
import { TopicCard } from '@/components/TopicCard'
import { CategorySidebar, type CategoryFilter } from '@/components/CategorySidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TOPIC_CATEGORY_LABELS } from '@/types/firestore-schema'

export function TopicsPage() {
  const { user } = useAuth()
  const { topics, loading, error } = useTopics()
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [search, setSearch] = useState('')

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase()
    return topics
      .filter((topic) => {
        const matchesCategory = category === 'all' || topic.category === category
        const matchesSearch =
          !query ||
          topic.title.toLowerCase().includes(query) ||
          topic.content.toLowerCase().includes(query)
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned))
  }, [topics, category, search])

  if (loading) {
    return <p className="p-6 text-muted-foreground">Cargando temas...</p>
  }

  if (error) {
    return <p className="p-6 text-destructive">Error al cargar el foro: {error.message}</p>
  }

  // AuthGate ya garantiza sesión activa en toda la app.
  if (!user) return null

  const categoryTitle = category === 'all' ? 'Todos los temas' : TOPIC_CATEGORY_LABELS[category]

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <CategorySidebar topics={topics} selected={category} onSelect={setCategory} user={user} />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold">{categoryTitle}</h1>
              <p className="text-sm text-muted-foreground">{filteredTopics.length} temas</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/favoritos">Mis favoritos</Link>
            </Button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en los temas..."
              className="pl-9"
            />
          </div>

          {filteredTopics.length === 0 && (
            <p className="text-muted-foreground">No hay temas en esta categoría todavía.</p>
          )}

          <div className="space-y-3">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
