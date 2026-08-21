import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  type FirestoreError,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Comment, Topic } from '@/types/firestore-schema'

/** Un tema del foro + sus comentarios (con replies embebidas), en tiempo real. */
export function useTopic(topicId: string | undefined) {
  const [topic, setTopic] = useState<Topic | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    if (!topicId) return

    const topicRef = doc(db, 'forumTopics', topicId)
    const unsubTopic = onSnapshot(
      topicRef,
      (snap) => {
        setTopic(snap.exists() ? ({ id: snap.id, ...snap.data() } as Topic) : null)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    const commentsQuery = query(
      collection(db, 'forumTopics', topicId, 'comments'),
      orderBy('createdAt', 'asc'),
    )
    const unsubComments = onSnapshot(commentsQuery, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Comment),
      )
    })

    return () => {
      unsubTopic()
      unsubComments()
    }
  }, [topicId])

  return { topic, comments, loading, error }
}
