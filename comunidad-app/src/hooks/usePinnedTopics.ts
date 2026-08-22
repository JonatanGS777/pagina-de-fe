import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Topic } from '@/types/firestore-schema'

/**
 * Temas fijados, sin `orderBy` en la consulta (se ordena en el cliente) para no
 * depender de un índice compuesto — se esperan pocos temas fijados a la vez, así
 * que se cargan completos y en tiempo real, al margen de la paginación general.
 */
export function usePinnedTopics() {
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    const pinnedQuery = query(collection(db, 'forumTopics'), where('pinned', '==', true))

    const unsubscribe = onSnapshot(pinnedQuery, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Topic)
      docs.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0))
      setTopics(docs)
    })

    return unsubscribe
  }, [])

  return topics
}
