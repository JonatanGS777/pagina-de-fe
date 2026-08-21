import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, type FirestoreError } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Topic } from '@/types/firestore-schema'

/**
 * "Favoritos" no es una colección propia: son los forumTopics cuyo array
 * bookmarkedBy contiene el uid del usuario actual.
 */
export function useFavorites(uid: string | undefined) {
  const [favorites, setFavorites] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    if (!uid) {
      setFavorites([])
      setLoading(false)
      return
    }

    const favoritesQuery = query(
      collection(db, 'forumTopics'),
      where('bookmarkedBy', 'array-contains', uid),
    )

    const unsubscribe = onSnapshot(
      favoritesQuery,
      (snapshot) => {
        setFavorites(
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
  }, [uid])

  return { favorites, loading, error }
}
