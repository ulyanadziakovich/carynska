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

/** Pola z adresem: `href`, `…Href`, `…Url` (menu, przyciski, social, rezerwacje). */
const LINK_FIELD = /^href$|Href$|Url$/
/** http(s), mailto, tel, ścieżka na stronie („/…”, nie „//…”) albo kotwica „#…”. */
const SAFE_LINK = /^(https?:|mailto:|tel:)|^\/(?!\/)|^#/i

/** Adres spoza listy (np. „javascript:”) zamieniany na pusty — link po prostu znika. */
function cleanLinks(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(cleanLinks)
  if (!value || typeof value !== 'object') return value
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(value)) {
    out[k] = LINK_FIELD.test(k) && typeof v === 'string' ? (SAFE_LINK.test(v.trim()) ? v : '') : cleanLinks(v)
  }
  return out
}

/**
 * Czyści rekord z CMS przed wysłaniem na stronę: HTML z pól edytora (lista
 * dozwolonych znaczników) i adresy w polach linków (lista dozwolonych schematów).
 */
export function sanitizeCmsRecord<T extends Record<string, unknown>>(collection: string, record: T): T {
  const out = cleanLinks(record) as Record<string, unknown>
  for (const field of EDITOR_FIELDS[collection] ?? []) {
    if (typeof out[field] === 'string') out[field] = sanitizeHtml(out[field] as string, OPTIONS)
  }
  return out as T
}
