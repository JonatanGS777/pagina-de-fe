import { useState, type FormEvent } from 'react'
import type { User } from 'firebase/auth'
import { Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { createReport } from '@/lib/forum-actions'
import type { ReportTargetType } from '@/types/firestore-schema'

export function ReportDialog({
  user,
  targetType,
  topicId,
  commentId,
  replyId,
}: {
  user: User
  targetType: ReportTargetType
  topicId: string
  commentId?: string
  replyId?: string
}) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (reason.trim().length < 5) {
      setError('Cuéntanos brevemente por qué lo reportas (mínimo 5 caracteres).')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await createReport(user, { targetType, topicId, commentId, replyId, reason: reason.trim() })
      setDone(true)
    } catch {
      setError('No se pudo enviar el reporte. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setReason('')
      setError(null)
      setDone(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button type="button" className="flex items-center gap-1 hover:text-destructive">
          <Flag className="size-3.5" /> Reportar
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reportar contenido</DialogTitle>
        </DialogHeader>

        {done ? (
          <p className="text-sm text-muted-foreground">
            Gracias, un moderador revisará este contenido pronto.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="¿Por qué reportas este contenido?"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar reporte'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
