import { useMemo, useRef, useState, type ComponentProps } from 'react'
import { Textarea } from '@/components/ui/textarea'
import type { AuthorRef } from '@/types/firestore-schema'

/**
 * Textarea con autocompletado de @menciones, limitado a los participantes del
 * hilo actual (ver src/lib/mentions.ts: no hay directorio de usuarios navegable).
 */
export function MentionTextarea({
  participants,
  value,
  onChange,
  ...textareaProps
}: {
  participants: AuthorRef[]
  value: string
  onChange: (value: string) => void
} & Omit<ComponentProps<typeof Textarea>, 'value' | 'onChange'>) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [query, setQuery] = useState<string | null>(null)
  const [mentionStart, setMentionStart] = useState(0)

  const matches = useMemo(() => {
    if (query === null) return []
    const q = query.toLowerCase()
    return participants.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6)
  }, [query, participants])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value
    onChange(next)

    const caret = e.target.selectionStart
    const upToCaret = next.slice(0, caret)
    const match = /@([\wÀ-ÿ ]{0,30})$/.exec(upToCaret)
    if (match) {
      setQuery(match[1])
      setMentionStart(caret - match[0].length)
    } else {
      setQuery(null)
    }
  }

  function selectParticipant(person: AuthorRef) {
    const el = ref.current
    if (!el) return
    const caret = el.selectionStart
    const before = value.slice(0, mentionStart)
    const after = value.slice(caret)
    const next = `${before}@${person.name} ${after}`
    onChange(next)
    setQuery(null)
    requestAnimationFrame(() => {
      const pos = before.length + person.name.length + 2
      el.focus()
      el.setSelectionRange(pos, pos)
    })
  }

  return (
    <div className="relative">
      <Textarea ref={ref} value={value} onChange={handleChange} {...textareaProps} />
      {query !== null && matches.length > 0 && (
        <div className="absolute z-10 mt-1 w-56 rounded-md border border-border bg-card shadow-lg">
          {matches.map((person) => (
            <button
              key={person.uid}
              type="button"
              className="block w-full px-3 py-2 text-left text-sm hover:bg-accent"
              onClick={() => selectParticipant(person)}
            >
              {person.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
