import type { User } from 'firebase/auth'
import { BookOpen, Globe, HandHeart, Heart, HelpCircle, MessageSquare, type LucideIcon } from 'lucide-react'
import { NewTopicDialog } from '@/components/NewTopicDialog'
import { cn } from '@/lib/utils'
import type { CategoryFilter } from '@/types/firestore-schema'

interface CategoryDef {
  key: CategoryFilter
  label: string
  description: string
  icon: LucideIcon
}

// Mismas categorías y descripciones que el foro anterior (Comunidad/forum.html)
const CATEGORIES: CategoryDef[] = [
  { key: 'all', label: 'Todos los temas', description: 'Ver todas las discusiones', icon: Globe },
  { key: 'estudios', label: 'Estudios Bíblicos', description: 'Profundizando en la Palabra', icon: BookOpen },
  { key: 'preguntas', label: 'Preguntas y Respuestas', description: 'Dudas sobre la fe', icon: HelpCircle },
  { key: 'testimonios', label: 'Testimonios', description: 'Experiencias de fe', icon: Heart },
  { key: 'oracion', label: 'Peticiones de Oración', description: 'Orando juntos', icon: HandHeart },
  { key: 'general', label: 'Conversación General', description: 'Charlas fraternas', icon: MessageSquare },
]

export function CategorySidebar({
  counts,
  totalComments,
  selected,
  onSelect,
  user,
}: {
  counts: Record<CategoryFilter, number>
  totalComments: number
  selected: CategoryFilter
  onSelect: (category: CategoryFilter) => void
  user: User
}) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Nuevo tema</h3>
        <NewTopicDialog user={user} />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Categorías</h3>
        <div className="space-y-1">
          {CATEGORIES.map(({ key, label, description, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={cn(
                'flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-2 text-left transition-colors hover:bg-accent',
                selected === key && 'border-border bg-accent',
              )}
            >
              <span className="flex items-center gap-2 min-w-0">
                <Icon className="size-4 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{description}</span>
                </span>
              </span>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                {counts[key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Estadísticas</h3>
        <div className="space-y-1 text-sm">
          <p>
            <strong>{counts.all}</strong> temas en total
          </p>
          <p>
            <strong>{totalComments}</strong> comentarios
          </p>
        </div>
      </div>
    </aside>
  )
}
