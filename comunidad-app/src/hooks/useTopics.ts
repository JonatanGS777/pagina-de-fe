import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type FirestoreError,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Topic } from '@/types/firestore-schema'

/** Lista en tiempo real de forumTopics, ordenados por fecha de creación descendente. */
export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    const topicsQuery = query(collection(db, 'forumTopics'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      topicsQuery,
      (snapshot) => {
        setTopics(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Topic),
        )
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { topics, loading, error }
}
