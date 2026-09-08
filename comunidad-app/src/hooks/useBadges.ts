import { useEffect, useRef } from 'react'
import type { User } from 'firebase/auth'
import {
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  getAggregateFromServer,
  getCountFromServer,
  getDoc,
  query,
  sum,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { computeEarnedBadgeIds } from '@/lib/badges'

/**
 * Calcula y otorga insignias de participación una vez por sesión autenticada
 * (no en tiempo real: son 3 aggregation queries + una lectura del perfil propio,
 * no vale la pena repetirlas en cada render). Solo agrega insignias nuevas vía
 * arrayUnion; nunca las retira. Si el usuario no tiene aún userProfiles/{uid}
 * (lo crea el sitio legado, no esta app) no hace nada.
 */
export function useBadges(user: User | null) {
  const computedFor = useRef<string | null>(null)

  useEffect(() => {
    if (!user || computedFor.current === user.uid) return
    computedFor.current = user.uid

    async function run(currentUser: User) {
      const profileRef = doc(db, 'userProfiles', currentUser.uid)
      const profileSnap = await getDoc(profileRef)
      if (!profileSnap.exists()) return

      const topicsQuery = query(collection(db, 'forumTopics'), where('authorUid', '==', currentUser.uid))
      const commentsQuery = query(collectionGroup(db, 'comments'), where('authorUid', '==', currentUser.uid))

      const [topicsCountSnap, likesAgg, commentsCountSnap] = await Promise.all([
        getCountFromServer(topicsQuery),
        getAggregateFromServer(topicsQuery, { total: sum('likes') }),
        getCountFromServer(commentsQuery),
      ])

      const data = profileSnap.data()
      const currentBadges: string[] = data.badges ?? []
      const earned = computeEarnedBadgeIds({
        topicsCount: topicsCountSnap.data().count,
        totalLikesReceived: likesAgg.data().total ?? 0,
        commentsCount: commentsCountSnap.data().count,
        daysSinceJoining: data.daysSinceJoining ?? 0,
      })

      const newBadges = earned.filter((id) => !currentBadges.includes(id))
      if (newBadges.length > 0) {
        await updateDoc(profileRef, { badges: arrayUnion(...newBadges) })
      }
    }

    // No hay UI que dependa de esto: si falla (p. ej. falta un índice todavía no
    // desplegado), solo se registra — nunca debe romper el resto de la sesión.
    run(user).catch((err) => console.error('No se pudieron calcular las insignias:', err))
  }, [user])
}
