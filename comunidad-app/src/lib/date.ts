import type { Timestamp } from 'firebase/firestore'

/**
 * Normaliza fechas mixtas del esquema: Topic/Comment.createdAt es un Timestamp
 * de Firestore, ReplyItem.createdAt es un string ISO de cliente.
 */
export function toDate(value: Timestamp | string | null | undefined): Date | null {
  if (!value) return null
  return typeof value === 'string' ? new Date(value) : value.toDate()
}

export function formatRelative(value: Timestamp | string | null | undefined): string {
  const date = toDate(value)
  if (!date) return ''

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'ahora mismo'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `hace ${days} d`

  return date.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })
}
