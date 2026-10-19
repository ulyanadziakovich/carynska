// Formularz „Napisz do nas” → skrzynka „Wiadomości” w CMS (../carynska-cms, server/api/kontakt.post.ts).
// Wysyła serwer strony z sekretem; przeglądarka gościa nigdy nie rozmawia z CMS bezpośrednio.

/** Proste ograniczenie: tyle wiadomości z jednego adresu IP na okno czasu (pamięć procesu). */
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60_000
const recent = new Map<string, number[]>()

function tooMany(ip: string) {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)
  if (recent.size > 5_000) recent.clear()
  return hits.length > RATE_LIMIT
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)
  const str = (k: string) => (typeof body?.[k] === 'string' ? (body[k] as string) : '')

  // Pułapka na boty: ukryte pole, którego człowiek nie widzi. Udajemy sukces, nic nie zapisujemy.
  if (str('website')) return { ok: true }

  if (!str('name').trim() || !str('email').trim() || !str('message').trim()) {
    throw createError({ statusCode: 400 })
  }
  if (tooMany(getRequestIP(event, { xForwardedFor: true }) ?? 'unknown')) {
    throw createError({ statusCode: 429 })
  }

  const config = useRuntimeConfig()
  await $fetch(`${config.public.cmsUrl}/api/kontakt`, {
    method: 'POST',
    headers: { 'x-contact-secret': config.contactSecret },
    body: { name: str('name'), email: str('email'), phone: str('phone'), message: str('message') },
    timeout: 8_000,
    retry: 1,
  }).catch((err) => {
    console.error('[Kontakt] CMS nie przyjął wiadomości:', err?.statusCode ?? err?.message)
    throw createError({ statusCode: 502 })
  })

  return { ok: true }
})
