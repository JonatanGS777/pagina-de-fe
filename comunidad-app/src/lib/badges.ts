import { CalendarCheck, Flag, Flame, Heart, MessagesSquare, type LucideIcon } from 'lucide-react'

export interface UserStats {
  topicsCount: number
  totalLikesReceived: number
  commentsCount: number
  daysSinceJoining: number
}

export interface BadgeDef {
  id: string
  label: string
  description: string
  icon: LucideIcon
  earned: (stats: UserStats) => boolean
}

/** Insignias nunca se retiran una vez ganadas, aunque las estadísticas bajen después. */
export const BADGES: BadgeDef[] = [
  {
    id: 'first-topic',
    label: 'Primer paso',
    description: 'Publicaste tu primer tema en la comunidad.',
    icon: Flag,
    earned: (s) => s.topicsCount >= 1,
  },
  {
    id: 'active-voice',
    label: 'Voz activa',
    description: 'Publicaste 10 o más temas.',
    icon: Flame,
    earned: (s) => s.topicsCount >= 10,
  },
  {
    id: 'beloved',
    label: 'Querido por la comunidad',
    description: 'Tus temas recibieron 25 o más likes en total.',
    icon: Heart,
    earned: (s) => s.totalLikesReceived >= 25,
  },
  {
    id: 'collaborator',
    label: 'Colaborador',
    description: 'Escribiste 20 o más comentarios.',
    icon: MessagesSquare,
    earned: (s) => s.commentsCount >= 20,
  },
  {
    id: 'veteran',
    label: 'Un año en la comunidad',
    description: 'Llevas un año o más como parte de la comunidad.',
    icon: CalendarCheck,
    earned: (s) => s.daysSinceJoining >= 365,
  },
]

export function computeEarnedBadgeIds(stats: UserStats): string[] {
  return BADGES.filter((badge) => badge.earned(stats)).map((badge) => badge.id)
}
