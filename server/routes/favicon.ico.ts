// Przeglądarki same pytają o /favicon.ico (np. przy otwieraniu PDF-ów albo w zakładkach),
// nawet bez linku w <head> — przekierowujemy na ikonę z CMS (Ustawienia → „Google i wyszukiwarki”).
export default defineEventHandler(async (event) => {
  const ustawienia = await $fetch<{ favicon?: { src?: string } }>('/api/cms/collections/ustawienia', { query: { populate: true } }).catch(() => null)
  const src = ustawienia?.favicon?.src
  if (!src?.startsWith('/uploads/')) throw createError({ statusCode: 404 })
  return sendRedirect(event, `/api/cms${src}`, 302)
})
