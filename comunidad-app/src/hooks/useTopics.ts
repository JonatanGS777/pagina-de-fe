import { useEffect, useRef, useState } from 'react'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
  getDocs,
  type DocumentData,
  type FirestoreError,
  type QueryDocumentSnapshot,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { CategoryFilter, Topic, TopicSort } from '@/types/firestore-schema'

const PAGE_SIZE = 20

function buildQuery(
  category: CategoryFilter,
  sort: TopicSort,
  cursor?: QueryDocumentSnapshot<DocumentData>,
) {
  const constraints: QueryConstraint[] = []

  if (category !== 'all') constraints.push(where('category', '==', category))
  if (sort === 'unanswered') constraints.push(where('replies', '==', 0))

  if (sort === 'active') {
    constraints.push(orderBy('replies', 'desc'))
  } else {
    // 'recent' y 'unanswered' comparten el mismo orden (más nuevo primero).
    constraints.push(orderBy('createdAt', 'desc'))
  }

  if (cursor) constraints.push(startAfter(cursor))
  constraints.push(limit(PAGE_SIZE))

  return query(collection(db, 'forumTopics'), ...constraints)
}

/**
 * Lista paginada de forumTopics para la categoría y el orden dados. La primera
 * página es un listener en tiempo real (nuevos temas aparecen solos); "cargar
 * más" trae páginas siguientes con una lectura puntual (patrón estándar de
 * scroll infinito: cabeza en vivo, resto estático hasta recargar).
 *
 * Cada combinación de categoría+orden es una consulta distinta a ojos de
 * Firestore; las que combinan un `where` con un `orderBy` en otro campo
 * necesitan un índice compuesto declarado en firestore.indexes.json.
 */
export function useTopics(category: CategoryFilter, sort: TopicSort) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)
  const cursorRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null)

  useEffect(() => {
    setTopics([])
    setLoading(true)
    setHasMore(true)
    cursorRef.current = null

    const unsubscribe = onSnapshot(
      buildQuery(category, sort),
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Topic)
        setTopics(docs)
        cursorRef.current = snapshot.docs.at(-1) ?? null
        setHasMore(snapshot.docs.length === PAGE_SIZE)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [category, sort])

  async function loadMore() {
    if (!cursorRef.current || loadingMore || !hasMore) return
    setLoadingMore(true)
    try {
      const snapshot = await getDocs(buildQuery(category, sort, cursorRef.current))
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Topic)
      setTopics((prev) => [...prev, ...docs])
      cursorRef.current = snapshot.docs.at(-1) ?? cursorRef.current
      setHasMore(snapshot.docs.length === PAGE_SIZE)
    } catch (err) {
      setError(err as FirestoreError)
    } finally {
      setLoadingMore(false)
    }
  }

  return { topics, loading, loadingMore, hasMore, loadMore, error }
}
