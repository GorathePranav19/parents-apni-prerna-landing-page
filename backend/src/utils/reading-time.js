const WORDS_PER_MINUTE = 200

export function getReadingTimeMinutes(markdown) {
  const words = String(markdown || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
