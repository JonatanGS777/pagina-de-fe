import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export type UserRole = 'member' | 'moderator' | 'admin'

// Mismos 3 correos de respaldo definidos en firestore.rules (función isAdmin).
// Es solo para reflejar el rol correcto en la UI: la autoridad real siempre
// es la regla de Firestore, que ya los reconoce en el backend.
const BACKUP_ADMIN_EMAILS = new Set([
  'ministeriolagloriaesdelsenor7@gmail.com',
  'yonatanguerrero430@gmail.com',
  'yonatanguerrero555@gmail.com',
])

/** Rol efectivo del usuario, leído de userProfiles/{uid}.role en tiempo real. */
export function useUserRole(user: User | null) {
  const [role, setRole] = useState<UserRole>('member')

  useEffect(() => {
    if (!user) {
      setRole('member')
      return
    }

    if (user.email && BACKUP_ADMIN_EMAILS.has(user.email)) {
      setRole('admin')
      return
    }

    const unsubscribe = onSnapshot(doc(db, 'userProfiles', user.uid), (snap) => {
      const storedRole = snap.data()?.role
      setRole(storedRole === 'admin' || storedRole === 'moderator' ? storedRole : 'member')
    })

    return unsubscribe
  }, [user])

  return role
}
