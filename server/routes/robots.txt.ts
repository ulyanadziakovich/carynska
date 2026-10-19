// robots.txt z CMS (Ustawienia → „Google i wyszukiwarki”). Przez nasze proxy,
// żeby przy chwilowej awarii CMS dostać ostatnią dobrą kopię zamiast błędu.
export default defineEventHandler(async (event) => {
  const ustawienia = await $fetch<{ robotsTxt?: string }>('/api/cms/collections/ustawienia').catch(() => null)
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return ustawienia?.robotsTxt?.trim() ? `${ustawienia.robotsTxt.trim()}\n` : ''
})
