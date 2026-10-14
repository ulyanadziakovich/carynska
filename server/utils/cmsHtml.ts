import sanitizeHtml from 'sanitize-html'

/**
 * Pola z edytorem tekstu w CMS (HTML wstawiany na stronę przez v-html).
 * Pruvious nie czyści tego HTML przy zapisie, więc robi to proxy — przejęte
 * konto w panelu nie może wtedy wstrzyknąć skryptu na stronę.
 */
const EDITOR_FIELDS: Record<string, string[]> = {
  'zaplanuj-pobyt': ['aboutBody'],
  regulamin: ['body'],
  'regulamin-wypozyczalni': ['body'],
  'wzor-umowy-jachtu': ['body'],
}

/** Dokładnie to, co potrafi wstawić pasek narzędzi edytora w CMS. */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['h2', 'h3', 'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote'],
  allowedAttributes: { a: ['href', 'target', 'rel'] },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
}

export function sanitizeEditorFields<T extends Record<string, unknown>>(collection: string, record: T): T {
  const fields = EDITOR_FIELDS[collection]
  if (!fields) return record
  const out: Record<string, unknown> = { ...record }
  for (const field of fields) {
    if (typeof out[field] === 'string') out[field] = sanitizeHtml(out[field] as string, OPTIONS)
  }
  return out as T
}
