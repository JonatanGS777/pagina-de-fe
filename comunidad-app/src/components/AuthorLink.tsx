import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface AuthorLinkProps {
  uid: string
  name: string
  photo?: string | null
  className?: string
}

/**
 * Nombre (+ foto opcional) de autor enlazado a su perfil público (/autor/:uid).
 * La foto usa vertical-align:middle en vez de un contenedor flex: un Link
 * inline-flex no hereda la línea base del texto plano alrededor (ej. "· fecha"
 * en TopicHeader) y queda descolgado; este patrón alinea correctamente ambos.
 */
export function AuthorLink({ uid, name, photo, className }: AuthorLinkProps) {
  return (
    <Link to={`/autor/${uid}`} className={className ?? 'hover:underline'}>
      {photo && (
        <img src={photo} alt="" className="mr-1.5 inline-block size-5 rounded-full object-cover align-middle" />
      )}
      <span className={cn(photo && 'align-middle')}>{name}</span>
    </Link>
  )
}
