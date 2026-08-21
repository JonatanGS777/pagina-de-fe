import type { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

/**
 * Las reglas de Firestore exigen isAuthenticated() para leer forumTopics/comments,
 * así que sin sesión no hay nada que mostrar: se replica el mismo gate que access.html
 * en el sitio legado.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading, signIn } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Cargando...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-semibold">Comunidad de fe</h1>
        <p className="max-w-sm text-muted-foreground">
          Inicia sesión para ver los temas del foro y participar.
        </p>
        <Button onClick={() => signIn()}>Iniciar sesión con Google</Button>
      </div>
    )
  }

  return <>{children}</>
}
