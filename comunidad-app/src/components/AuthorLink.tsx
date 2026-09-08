import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface AuthorLinkProps {
  uid: string
  name: string
  photo?: string | null
  className?: string
}

/** Nombre (+ foto opcional) de autor enlazado a su perfil público (/autor/:uid). */
export function AuthorLink({ uid, name, photo, className }: AuthorLinkProps) {
  return (
    <Link to={`/autor/${uid}`} className={cn('inline-flex items-center gap-1.5', className ?? 'hover:underline')}>
      {photo && <img src={photo} alt="" className="size-5 shrink-0 rounded-full object-cover" />}
      {name}
    </Link>
  )
}
