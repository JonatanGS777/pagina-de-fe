import type { User } from 'firebase/auth'
import { toggleTopicReaction } from '@/lib/forum-actions'
import { TOPIC_REACTIONS, type Topic } from '@/types/firestore-schema'
import { cn } from '@/lib/utils'

/** Reacciones de emoji a nivel de tema, además del like (ver TOPIC_REACTIONS). */
export function ReactionBar({ topic, user }: { topic: Topic; user: User }) {
  return (
    <div className="flex items-center gap-1">
      {TOPIC_REACTIONS.map((emoji) => {
        const reactedBy = topic.reactions?.[emoji] ?? []
        const active = reactedBy.includes(user.uid)
        return (
          <button
            key={emoji}
            type="button"
            className={cn(
              'flex items-center gap-1 rounded-full border px-2 py-1 text-sm transition-colors',
              active ? 'border-primary bg-primary/10' : 'border-border hover:bg-accent',
            )}
            onClick={() => toggleTopicReaction(user, topic, emoji)}
          >
            <span>{emoji}</span>
            {reactedBy.length > 0 && <span className="text-xs text-muted-foreground">{reactedBy.length}</span>}
          </button>
        )
      })}
    </div>
  )
}
