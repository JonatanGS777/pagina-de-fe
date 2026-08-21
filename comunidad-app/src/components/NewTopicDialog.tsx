import { useState, type FormEvent } from 'react'
import type { User } from 'firebase/auth'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createTopic } from '@/lib/forum-actions'
import { TOPIC_CATEGORY_LABELS, type TopicCategory } from '@/types/firestore-schema'

export function NewTopicDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TopicCategory | ''>('')
  const [content, setContent] = useState('')
  const [verse, setVerse] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function reset() {
    setTitle('')
    setCategory('')
    setContent('')
    setVerse('')
    setError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (title.trim().length < 5) {
      setError('El título debe tener al menos 5 caracteres.')
      return
    }
    if (!category) {
      setError('Selecciona una categoría.')
      return
    }
    if (content.trim().length < 10) {
      setError('El contenido debe tener al menos 10 caracteres.')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await createTopic(user, {
        title: title.trim(),
        category,
        content: content.trim(),
        verse: verse.trim(),
      })
      reset()
      setOpen(false)
    } catch {
      setError('No se pudo publicar el tema. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Nuevo tema
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo tema</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="topic-title">Título</Label>
            <Input
              id="topic-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿De qué quieres hablar?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic-category">Categoría</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as TopicCategory)}>
              <SelectTrigger id="topic-category" className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TOPIC_CATEGORY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic-content">Contenido</Label>
            <Textarea
              id="topic-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic-verse">Referencia bíblica (opcional)</Label>
            <Input
              id="topic-verse"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="Ej. Juan 3:16"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Publicando...' : 'Publicar tema'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
