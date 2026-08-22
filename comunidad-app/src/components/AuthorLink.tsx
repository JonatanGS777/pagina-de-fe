import { Link } from 'react-router-dom'

/** Nombre de autor enlazado a su perfil público (/autor/:uid). */
export function AuthorLink({ uid, name, className }: { uid: string; name: string; className?: string }) {
  return (
    <Link to={`/autor/${uid}`} className={className ?? 'hover:underline'}>
      {name}
    </Link>
  )
}
