import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { ArrowLeft, Check, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useUserRole } from '@/hooks/useUserRole'
import { useReports } from '@/hooks/useReports'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { dismissReport, resolveReport } from '@/lib/forum-actions'
import { formatRelative } from '@/lib/date'
import type { Report, ReportStatus } from '@/types/firestore-schema'

const STATUS_LABEL: Record<ReportStatus, string> = {
  pending: 'Pendiente',
  resolved: 'Resuelto',
  dismissed: 'Descartado',
}

const TARGET_LABEL: Record<Report['targetType'], string> = {
  topic: 'Tema',
  comment: 'Comentario',
  reply: 'Respuesta',
}

function ReportRow({ report, user }: { report: Report; user: User }) {
  const [submitting, setSubmitting] = useState(false)

  async function handleResolve() {
    setSubmitting(true)
    try {
      await resolveReport(user, report.id)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDismiss() {
    setSubmitting(true)
    try {
      await dismissReport(user, report.id)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{TARGET_LABEL[report.targetType]}</Badge>
          <Badge variant={report.status === 'pending' ? 'default' : 'outline'}>
            {STATUS_LABEL[report.status]}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">{formatRelative(report.createdAt)}</span>
      </div>

      <p className="text-sm">{report.reason}</p>
      <p className="text-xs text-muted-foreground">Reportado por {report.reporterName}</p>

      <div className="flex items-center gap-3 pt-1">
        <Link to={`/tema/${report.topicId}`} className="text-xs font-medium text-primary hover:underline">
          Ver tema
        </Link>

        {report.status === 'pending' && (
          <>
            <Button type="button" size="sm" variant="outline" onClick={handleResolve} disabled={submitting}>
              <Check className="size-3.5" /> Resuelto
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={handleDismiss} disabled={submitting}>
              <X className="size-3.5" /> Descartar
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export function ModerationPage() {
  const { user } = useAuth()
  const role = useUserRole(user)
  const isModeratorOrAdmin = role === 'moderator' || role === 'admin'
  const { reports, loading, error } = useReports(isModeratorOrAdmin)

  if (!user) return null

  if (!isModeratorOrAdmin) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="text-muted-foreground">No tienes permiso para ver esta página.</p>
      </div>
    )
  }

  const pending = reports.filter((r) => r.status === 'pending')
  const resolved = reports.filter((r) => r.status !== 'pending')

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" /> Volver a la comunidad
      </Link>

      <div>
        <h1 className="text-xl font-semibold">Moderación</h1>
        <p className="text-sm text-muted-foreground">{pending.length} reportes pendientes</p>
      </div>

      {loading && <p className="text-muted-foreground">Cargando reportes...</p>}
      {error && <p className="text-destructive">Error: {error.message}</p>}

      {!loading && reports.length === 0 && (
        <p className="text-muted-foreground">No hay reportes todavía.</p>
      )}

      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Pendientes</h2>
          {pending.map((report) => (
            <ReportRow key={report.id} report={report} user={user} />
          ))}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Resueltos / descartados</h2>
          {resolved.map((report) => (
            <ReportRow key={report.id} report={report} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
