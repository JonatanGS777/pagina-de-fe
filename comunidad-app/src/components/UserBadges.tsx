import { Badge } from '@/components/ui/badge'
import { BADGES } from '@/lib/badges'

/** Insignias ganadas por el usuario. No renderiza nada si todavía no tiene ninguna. */
export function UserBadges({ badgeIds }: { badgeIds: string[] }) {
  const earned = BADGES.filter((badge) => badgeIds.includes(badge.id))
  if (earned.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {earned.map((badge) => (
        <Badge key={badge.id} variant="outline" className="gap-1 text-primary" title={badge.description}>
          <badge.icon className="size-3" /> {badge.label}
        </Badge>
      ))}
    </div>
  )
}
