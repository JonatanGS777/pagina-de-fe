import { Link } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { MessageCircle, Heart, Bookmark, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TOPIC_CATEGORY_LABELS, type Topic } from '@/types/firestore-schema'
import { formatRelative } from '@/lib/date'
import { toggleTopicLike, toggleBookmark } from '@/lib/forum-actions'
import { cn } from '@/lib/utils'

export function TopicCard({ topic, user }: { topic: Topic; user: User }) {
  const isLiked = topic.likedBy.includes(user.uid)
  const isBookmarked = topic.bookmarkedBy.includes(user.uid)

  return (
    <Card className="transition-colors hover:bg-muted/50">
      <Link to={`/tema/${topic.id}`}>
        <CardHeader className="flex-row items-start justify-between gap-2">
          <div>
            <Badge variant="secondary">{TOPIC_CATEGORY_LABELS[topic.category]}</Badge>
            <h3 className="mt-2 font-medium">{topic.title}</h3>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatRelative(topic.createdAt)}
          </span>
        </CardHeader>
      </Link>
      <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{topic.author.name}</span>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-4" /> {topic.replies}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="size-4" /> {topic.views}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn('h-auto gap-1 p-1', isLiked && 'text-destructive')}
          onClick={() => toggleTopicLike(user, topic)}
        >
          <Heart className={cn('size-4', isLiked && 'fill-current')} /> {topic.likes}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn('h-auto gap-1 p-1', isBookmarked && 'text-primary')}
          onClick={() => toggleBookmark(user, topic)}
        >
          <Bookmark className={cn('size-4', isBookmarked && 'fill-current')} />
        </Button>
      </CardContent>
    </Card>
  )
}
