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
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { CategoryFilter, Topic } from '@/types/firestore-schema'

const PAGE_SIZE = 20

function buildQuery(category: CategoryFilter, cursor?: QueryDocumentSnapshot<DocumentData>) {
  const constraints = [
    ...(category === 'all' ? [] : [where('category', '==', category)]),
    orderBy('createdAt', 'desc'),
    ...(cursor ? [startAfter(cursor)] : []),
    limit(PAGE_SIZE),
  ]
  return query(collection(db, 'forumTopics'), ...constraints)
}

/**
 * Lista paginada de forumTopics para la categoría dada. La primera página es un
 * listener en tiempo real (nuevos temas aparecen solos); "cargar más" trae
 * páginas siguientes con una lectura puntual (patrón estándar de scroll
 * infinito: cabeza en vivo, resto estático hasta recargar).
 */
export function useTopics(category: CategoryFilter) {
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
      buildQuery(category),
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
  }, [category])

  async function loadMore() {
    if (!cursorRef.current || loadingMore || !hasMore) return
    setLoadingMore(true)
    try {
      const snapshot = await getDocs(buildQuery(category, cursorRef.current))
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
