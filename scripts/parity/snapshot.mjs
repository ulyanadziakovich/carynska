// Zrzut „co widzi gość” każdej podstrony: tekst + alt/aria-label/placeholder.
//   node scripts/parity/snapshot.mjs [katalog wyjściowy, domyślnie baseline]
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { BASE, ROUTES, slug } from './routes.mjs'

const outDir = process.argv[2] ?? new URL('./baseline', import.meta.url).pathname
mkdirSync(outDir, { recursive: true })

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')

export function visibleText(html) {
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) ?? [, html])[1]
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
  const lines = []
  for (const m of body.matchAll(/\s(alt|aria-label|placeholder)="([^"]+)"/g)) lines.push(`@${m[1]}: ${decode(m[2])}`)
  for (const chunk of body.split(/<[^>]+>/)) {
    const t = decode(chunk).replace(/\s+/g, ' ').trim()
    if (t) lines.push(t)
  }
  return lines.join('\n') + '\n'
}

for (const route of ROUTES) {
  const res = await fetch(BASE + route)
  if (!res.ok) throw new Error(`${route}: HTTP ${res.status}`)
  writeFileSync(join(outDir, `${slug(route)}.txt`), visibleText(await res.text()))
  console.log('✓', route)
}
