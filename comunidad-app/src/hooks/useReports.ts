import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, type FirestoreError } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Report } from '@/types/firestore-schema'

/**
 * Todos los reportes en tiempo real, más recientes primero. Solo para moderadores/admins:
 * `enabled` debe reflejar el rol real, porque la regla de Firestore (isModerator())
 * rechazaría la lectura para cualquier otro usuario y ensuciaría la consola.
 */
export function useReports(enabled: boolean) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    if (!enabled) {
      setReports([])
      setLoading(false)
      return
    }

    const reportsQuery = query(collection(db, 'reports'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      reportsQuery,
      (snapshot) => {
        setReports(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Report))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [enabled])

  const pendingCount = reports.filter((r) => r.status === 'pending').length

  return { reports, pendingCount, loading, error }
}
