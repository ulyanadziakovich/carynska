/**
 * Odczyt treści z panelu Pruvious (../carynska-cms). Cała treść strony jest
 * tam — w kodzie zostaje tylko układ.
 */
export interface CmsImage { src: string; alt?: string; width?: number; height?: number }
export interface CmsDzial { id: number; name: string; tag?: string; phone?: string; email?: string; desc?: string }

const CMS_RETRY = 2
const CMS_RETRY_DELAY_MS = 300

/** Formularz pojedynczy (np. „strona-glowna”). */
export function useCmsSingle<T = Record<string, any>>(name: string) {
  return useFetch<T>(`/api/cms/collections/${name}`, {
    key: `cms-${name}`,
    query: { populate: true },
    retry: CMS_RETRY,
    retryDelay: CMS_RETRY_DELAY_MS,
  })
}

/** Lista rekordów (np. „dzialy”). */
export function useCmsCollection<T = Record<string, any>>(name: string, opts: { limit?: number; order?: string } = {}) {
  return useFetch<{ records: T[] }>(`/api/cms/collections/${name}`, {
    key: `cms-${name}`,
    query: { perPage: opts.limit ?? 100, populate: true, ...(opts.order ? { order: opts.order } : {}) },
    retry: CMS_RETRY,
    retryDelay: CMS_RETRY_DELAY_MS,
  })
}

/** Adres zdjęcia z CMS dla <img src>; undefined, gdy pole puste (zdjęcie usunięte). */
export function cmsImg(img: CmsImage | string | null | undefined) {
  const path = typeof img === 'string' ? img : img?.src
  if (!path) return undefined
  if (/^https?:\/\//.test(path)) return path
  return `${useRuntimeConfig().public.cmsUrl}${path}`
}

/** Pole „jedna pozycja w linii” → lista. */
export const lines = (s?: string | null) => (s ?? '').split('\n').map((l) => l.trim()).filter(Boolean)

/** Pole z akapitami oddzielonymi pustą linią → lista akapitów. */
export const paragraphs = (s?: string | null) => (s ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

/** „+48 691 944 266” → „tel:+48691944266”. */
export const telHref = (phone?: string | null) => (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined)

/** Wstawia bieżący rok w miejsce {rok}. */
export const withYear = (s?: string | null) => (s ?? '').replace('{rok}', String(new Date().getFullYear()))
