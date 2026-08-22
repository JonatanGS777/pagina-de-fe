import type { AuthorRef, Comment, Topic } from '@/types/firestore-schema'

/**
 * Participantes de un hilo (autor del tema + autores de comentarios y respuestas),
 * sin duplicados por uid. Se usa para el autocompletado de @menciones: no hay
 * directorio de usuarios navegable (por privacidad), así que solo se puede
 * mencionar a alguien que ya participó en ese hilo.
 */
export function getThreadParticipants(topic: Topic, comments: Comment[]): AuthorRef[] {
  const byUid = new Map<string, AuthorRef>()

  function add(author: AuthorRef) {
    if (author.uid && !byUid.has(author.uid)) byUid.set(author.uid, author)
  }

  add(topic.author)
  comments.forEach((comment) => {
    add(comment.author)
    comment.replies.forEach((reply) => add(reply.author))
  })

  return [...byUid.values()]
}

/** Participantes cuyo "@Nombre" aparece literalmente en el texto. */
export function extractMentions(content: string, participants: AuthorRef[]): AuthorRef[] {
  return participants.filter((person) => person.name && content.includes(`@${person.name}`))
}
