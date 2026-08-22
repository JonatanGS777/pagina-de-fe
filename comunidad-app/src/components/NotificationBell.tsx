import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { AtSign, Bell, MessageCircle, Reply } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import { markNotificationRead } from '@/lib/forum-actions'
import { formatRelative } from '@/lib/date'
import { cn } from '@/lib/utils'
import type { AppNotification, NotificationType } from '@/types/firestore-schema'

const NOTIFICATION_ICON: Record<NotificationType, typeof MessageCircle> = {
  comment: MessageCircle,
  reply: Reply,
  mention: AtSign,
}

const NOTIFICATION_VERB: Record<NotificationType, string> = {
  comment: 'comentó tu tema',
  reply: 'respondió tu comentario en',
  mention: 'te mencionó en',
}

export function NotificationBell({ user }: { user: User }) {
  const { notifications, unreadCount } = useNotifications(user.uid)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleItemClick(notification: AppNotification) {
    setOpen(false)
    if (!notification.read) {
      void markNotificationRead(user.uid, notification.id)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="relative flex size-9 items-center justify-center rounded-full hover:bg-accent"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notificaciones"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 max-w-[90vw] rounded-lg border border-border bg-card shadow-lg">
          <div className="border-b border-border p-3 text-sm font-semibold">Notificaciones</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">
                Aún no tienes notificaciones.
              </p>
            )}
            {notifications.map((notification) => {
              const Icon = NOTIFICATION_ICON[notification.type]
              return (
                <Link
                  key={notification.id}
                  to={`/tema/${notification.topicId}`}
                  onClick={() => handleItemClick(notification)}
                  className={cn(
                    'flex items-start gap-2 border-b border-border p-3 text-sm last:border-0 hover:bg-accent',
                    !notification.read && 'bg-accent/50',
                  )}
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block">
                      <strong>{notification.fromName}</strong> {NOTIFICATION_VERB[notification.type]}{' '}
                      <span className="font-medium">«{notification.topicTitle}»</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatRelative(notification.createdAt)}
                    </span>
                  </span>
                  {!notification.read && (
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
