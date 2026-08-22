import { useEffect, useState } from 'react'
import { collection, getAggregateFromServer, getCountFromServer, query, sum, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { CategoryFilter, TopicCategory } from '@/types/firestore-schema'

const CATEGORIES: TopicCategory[] = ['estudios', 'preguntas', 'testimonios', 'oracion', 'general']

/**
 * Conteos reales de temas por categoría y total de comentarios, vía consultas de
 * agregación (count/sum) que no descargan documentos — necesario porque, con
 * paginación, `topics` ya no trae la colección completa para derivar estos
 * números en el cliente como antes.
 */
export function useForumCounts() {
  const [counts, setCounts] = useState<Record<CategoryFilter, number>>({
    all: 0,
    estudios: 0,
    preguntas: 0,
    testimonios: 0,
    oracion: 0,
    general: 0,
  })
  const [totalComments, setTotalComments] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const base = collection(db, 'forumTopics')
        const [allSnap, ...categorySnaps] = await Promise.all([
          getCountFromServer(base),
          ...CATEGORIES.map((cat) => getCountFromServer(query(base, where('category', '==', cat)))),
        ])
        const commentsAgg = await getAggregateFromServer(base, { total: sum('replies') })

        if (cancelled) return

        const next = { all: allSnap.data().count } as Record<CategoryFilter, number>
        CATEGORIES.forEach((cat, i) => {
          next[cat] = categorySnaps[i].data().count
        })
        setCounts(next)
        setTotalComments(commentsAgg.data().total ?? 0)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { counts, totalComments, loading }
}
