export const ROUTES = [
  '/', '/noclegi/pokoje', '/noclegi/cennik', '/noclegi/jacht', '/atrakcje', '/zaplanuj-pobyt',
  '/tawerna', '/galeria', '/grupy', '/projekty', '/regulamin', '/regulamin-wypozyczalni', '/wzor-umowy-jachtu',
]
export const BASE = process.env.SITE_URL ?? 'http://localhost:4000'
export const slug = (r) => (r === '/' ? 'index' : r.slice(1).replace(/\//g, '__'))
