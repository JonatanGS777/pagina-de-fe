const MIN_TOKEN_LENGTH = 3
/** Límite de valores de un array-contains-any en Firestore. */
const MAX_TOKENS = 30

// Rango Unicode de marcas diacríticas combinantes (U+0300-U+036F). Construido
// con fromCharCode (en vez de un literal con esos caracteres embebidos) para
// que el código fuente no contenga caracteres invisibles.
const DIACRITICS_START = String.fromCharCode(0x0300)
const DIACRITICS_END = String.fromCharCode(0x036f)
const DIACRITICS_REGEX = new RegExp(`[${DIACRITICS_START}-${DIACRITICS_END}]`, 'g')

/**
 * Tokeniza texto para búsqueda de comentarios: quita acentos, pasa a minúsculas,
 * separa por palabras, descarta tokens muy cortos y limita el total. Se usa tanto
 * al escribir searchTokens en cada comentario como al tokenizar el término de
 * búsqueda del usuario (mismo algoritmo en ambos lados para que coincidan).
 */
export function tokenize(text: string): string[] {
  const normalized = text.normalize('NFD').replace(DIACRITICS_REGEX, '').toLowerCase()

  const words = normalized.split(/[^a-z0-9]+/).filter((word) => word.length >= MIN_TOKEN_LENGTH)

  return [...new Set(words)].slice(0, MAX_TOKENS)
}
