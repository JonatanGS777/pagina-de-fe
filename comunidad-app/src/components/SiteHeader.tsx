import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useUserRole } from '@/hooks/useUserRole'
import { useReports } from '@/hooks/useReports'
import { NotificationBell } from '@/components/NotificationBell'

// Mismo logo/nombre que el header de index.html, para que la app no se
// sienta "atrapada" sin salida: el logo lleva de vuelta al sitio principal.
export function SiteHeader() {
  const { user } = useAuth()
  const role = useUserRole(user)
  const isModeratorOrAdmin = role === 'moderator' || role === 'admin'
  const { pendingCount } = useReports(isModeratorOrAdmin)

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 p-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/images/EMD.png?v=2" alt="Logo EMD" className="size-10 object-contain" />
          <div className="leading-tight">
            <div className="font-heading text-base font-semibold text-foreground">Ministerio</div>
            <div className="text-xs text-muted-foreground">&quot;La Gloria es del Señor&quot;</div>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm font-medium text-primary hover:underline">
            Comunidad de fe
          </Link>
          {user && isModeratorOrAdmin && (
            <Link
              to="/moderacion"
              className="relative flex size-9 items-center justify-center rounded-full hover:bg-accent"
              aria-label="Moderación"
            >
              <ShieldAlert className="size-5" />
              {pendingCount > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                  {pendingCount > 9 ? '9+' : pendingCount}
                </span>
              )}
            </Link>
          )}
          {user && <NotificationBell user={user} />}
        </div>
      </div>
    </header>
  )
}
