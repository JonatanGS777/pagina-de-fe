import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, type FirestoreError } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Topic } from '@/types/firestore-schema'

/**
 * Temas de un autor, en tiempo real. Sin `orderBy` en la consulta (se ordena en
 * el cliente) para no depender de un índice compuesto que no existe por defecto.
 */
export function useAuthorTopics(uid: string | undefined) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    if (!uid) {
      setTopics([])
      setLoading(false)
      return
    }

    const authorQuery = query(collection(db, 'forumTopics'), where('authorUid', '==', uid))

    const unsubscribe = onSnapshot(
      authorQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Topic)
        docs.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0))
        setTopics(docs)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [uid])

  return { topics, loading, error }
}
