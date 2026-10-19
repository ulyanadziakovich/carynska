/**
 * Odczyt treści z panelu Pruvious (../carynska-cms). Cała treść strony jest
 * tam — w kodzie zostaje tylko układ.
 */
export interface CmsImage { src: string; alt?: string; width?: number; height?: number }
export interface CmsDzial { id: number; name: string; tag?: string; phone?: string; email?: string; desc?: string }

const CMS_RETRY = 2
const CMS_RETRY_DELAY_MS = 300

/**
 * CMS nie odpowiada i nie ma zapasowej kopii: zamiast pustej strony z kodem 200
 * (którą zapamiętałyby wyszukiwarki) — strona błędu 503.
 */
function failIfMissing<T extends { data: Ref<unknown>; error: Ref<unknown> }>(res: T): T {
  if (res.error.value && !res.data.value) {
    throw createError({ statusCode: 503, statusMessage: 'CMS niedostępny', fatal: true })
  }
  return res
}

/** Formularz pojedynczy (np. „strona-glowna”). */
export async function useCmsSingle<T = Record<string, any>>(name: string) {
  return failIfMissing(await useFetch<T>(`/api/cms/collections/${name}`, {
    key: `cms-${name}`,
    query: { populate: true },
    retry: CMS_RETRY,
    retryDelay: CMS_RETRY_DELAY_MS,
  }))
}

/** Lista rekordów (np. „dzialy”). */
export async function useCmsCollection<T = Record<string, any>>(name: string, opts: { limit?: number; order?: string } = {}) {
  return failIfMissing(await useFetch<{ records: T[] }>(`/api/cms/collections/${name}`, {
    key: `cms-${name}`,
    query: { perPage: opts.limit ?? 100, populate: true, ...(opts.order ? { order: opts.order } : {}) },
    retry: CMS_RETRY,
    retryDelay: CMS_RETRY_DELAY_MS,
  }))
}

function imgUrl(img: CmsImage | string | null | undefined, cmsUrl: string) {
  const path = typeof img === 'string' ? img : img?.src
  if (!path) return undefined
  if (/^https?:\/\//.test(path)) return path
  return `${cmsUrl}${path}`
}

/** Adres zdjęcia z CMS dla <img src>; undefined, gdy pole puste (zdjęcie usunięte). */
export function cmsImg(img: CmsImage | string | null | undefined) {
  return imgUrl(img, useRuntimeConfig().public.cmsUrl)
}

/**
 * To samo co cmsImg, ale adres CMS odczytany od razu, w setupie. Do computed
 * czytanych później poza kontekstem Nuxta (np. przez useHead/useSeoMeta),
 * gdzie useRuntimeConfig() w środku cmsImg rzuciłby błąd.
 */
export function useCmsImg() {
  const cmsUrl = useRuntimeConfig().public.cmsUrl
  return (img: CmsImage | string | null | undefined) => imgUrl(img, cmsUrl)
}

/** Pole „jedna pozycja w linii” → lista. */
export const lines = (s?: string | null) => (s ?? '').split('\n').map((l) => l.trim()).filter(Boolean)

/** Pole z akapitami oddzielonymi pustą linią → lista akapitów. */
export const paragraphs = (s?: string | null) => (s ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

/** „+48 691 944 266” → „tel:+48691944266”. */
export const telHref = (phone?: string | null) => (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined)

/** Wstawia bieżący rok w miejsce {rok}. */
export const withYear = (s?: string | null) => (s ?? '').replace('{rok}', String(new Date().getFullYear()))

/** Wstawia liczbę w miejsce {liczba}, np. „max {liczba} os.” → „max 4 os.”. */
export const fill = (s: string | null | undefined, n: number | string) => (s ?? '').replace('{liczba}', String(n))
