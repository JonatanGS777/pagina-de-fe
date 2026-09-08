import { useEffect, useState } from 'react'
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
  type FirestoreError,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { tokenize } from '@/lib/search-tokens'
import type { Comment, Topic } from '@/types/firestore-schema'

const RESULT_LIMIT = 20
const DEBOUNCE_MS = 300

export interface CommentSearchResult {
  comment: Comment
  topic: Topic
}

/**
 * Búsqueda puntual (getDocs, no en tiempo real) sobre comentarios de primer
 * nivel vía collectionGroup + array-contains-any de tokens. No alcanza
 * respuestas embebidas (no son una colección indexable) ni comentarios sin
 * searchTokens (creados antes de esta feature).
 */
export function useCommentSearch(term: string) {
  const [results, setResults] = useState<CommentSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    const tokens = tokenize(term)
    if (tokens.length === 0) {
      setResults([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    const timer = setTimeout(async () => {
      try {
        const snapshot = await getDocs(
          query(
            collectionGroup(db, 'comments'),
            where('searchTokens', 'array-contains-any', tokens),
            limit(RESULT_LIMIT),
          ),
        )
        if (cancelled) return

        const comments = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Comment)
        const topicIds = [...new Set(comments.map((c) => c.topicId))]
        const topicSnaps = await Promise.all(topicIds.map((id) => getDoc(doc(db, 'forumTopics', id))))
        if (cancelled) return

        const topicsById = new Map(
          topicSnaps.filter((snap) => snap.exists()).map((snap) => [snap.id, { id: snap.id, ...snap.data() } as Topic]),
        )

        setResults(
          comments
            .filter((comment) => topicsById.has(comment.topicId))
            .map((comment) => ({ comment, topic: topicsById.get(comment.topicId)! })),
        )
        setError(null)
      } catch (err) {
        if (!cancelled) setError(err as FirestoreError)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [term])

  return { results, loading, error }
}
