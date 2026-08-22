import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, type FirestoreError } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { AppNotification } from '@/types/firestore-schema'

/** Notificaciones propias en tiempo real, más recientes primero. */
export function useNotifications(uid: string | undefined) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    if (!uid) {
      setNotifications([])
      setLoading(false)
      return
    }

    const notificationsQuery = query(
      collection(db, 'notifications', uid, 'items'),
      orderBy('createdAt', 'desc'),
    )

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        setNotifications(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as AppNotification),
        )
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [uid])

  const unreadCount = notifications.filter((n) => !n.read).length

  return { notifications, unreadCount, loading, error }
}
