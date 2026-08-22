import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTopics } from '@/hooks/useTopics'
import { usePinnedTopics } from '@/hooks/usePinnedTopics'
import { useForumCounts } from '@/hooks/useForumCounts'
import { TopicCard } from '@/components/TopicCard'
import { CategorySidebar } from '@/components/CategorySidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  TOPIC_CATEGORY_LABELS,
  TOPIC_SORT_LABELS,
  type CategoryFilter,
  type TopicSort,
} from '@/types/firestore-schema'

export function TopicsPage() {
  const { user } = useAuth()
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [sort, setSort] = useState<TopicSort>('recent')
  const [search, setSearch] = useState('')

  const { topics, loading, loadingMore, hasMore, loadMore, error } = useTopics(category, sort)
  const pinnedTopics = usePinnedTopics()
  const { counts, totalComments } = useForumCounts()

  const visibleTopics = useMemo(() => {
    const pinnedForCategory = pinnedTopics.filter((t) => category === 'all' || t.category === category)
    const pinnedIds = new Set(pinnedForCategory.map((t) => t.id))
    const merged = [...pinnedForCategory, ...topics.filter((t) => !pinnedIds.has(t.id))]

    const q = search.trim().toLowerCase()
    if (!q) return merged
    return merged.filter(
      (topic) =>
        topic.title.toLowerCase().includes(q) ||
        topic.content.toLowerCase().includes(q) ||
        topic.author.name.toLowerCase().includes(q),
    )
  }, [topics, pinnedTopics, category, search])

  const isSearching = search.trim().length > 0

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
        <CategorySidebar counts={counts} totalComments={totalComments} selected={category} onSelect={setCategory} user={user} />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold">{categoryTitle}</h1>
              <p className="text-sm text-muted-foreground">{counts[category]} temas</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/favoritos">Mis favoritos</Link>
            </Button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por título, contenido o autor..."
                className="pl-9"
              />
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as TopicSort)}>
              <SelectTrigger className="sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TOPIC_SORT_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isSearching && hasMore && (
            <p className="text-xs text-muted-foreground">
              La búsqueda solo abarca los temas ya cargados — carga más abajo si no encuentras lo que buscas.
            </p>
          )}

          {visibleTopics.length === 0 && (
            <p className="text-muted-foreground">No hay temas en esta categoría todavía.</p>
          )}

          <div className="space-y-3">
            {visibleTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} user={user} />
            ))}
          </div>

          {hasMore && (
            <Button type="button" variant="outline" className="w-full" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? 'Cargando...' : 'Cargar más'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
