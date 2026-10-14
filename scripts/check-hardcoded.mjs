// Szuka tekstów widocznych dla gościa wpisanych w szablony/skrypty.
// Exit 1, gdy coś znajdzie. Wyjątki (np. nazwy techniczne): ALLOW.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ALLOW = new Set([])
const LETTERS = /[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]{3,}/
const files = []
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(vue|ts)$/.test(p) && files.push(p) } }
walk('app')

let hits = 0
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  const found = new Set()
  const tpl = (src.match(/<template>([\s\S]*)<\/template>/) ?? [, ''])[1].replace(/<!--[\s\S]*?-->/g, '')
  // Wyrażenia JS w szablonie (np. „a >= b && c”) to kod, nie tekst.
  for (const m of tpl.matchAll(/>([^<>{}]+)</g)) { const t = m[1].replace(/\s+/g, ' ').trim(); if (LETTERS.test(t) && !/&&|\|\||=>|===?/.test(t)) found.add(t) }
  for (const m of tpl.matchAll(/\s(?:alt|title|aria-label|placeholder|label)="([^"]+)"/g)) if (LETTERS.test(m[1])) found.add('@' + m[1])
  const script = f.endsWith('.ts') ? src : (src.match(/<script[^>]*>([\s\S]*?)<\/script>/) ?? [, ''])[1]
  for (const m of script.replace(/^\s*\/\/.*$/gm, '').matchAll(/'([^'\n]*)'/g)) {
    const t = m[1]
    // Polskie znaki albo zdanie zaczynające się wielką literą („Hotel na wodzie”, „Booking now”).
    const looksLikeCopy = /[ĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(t) || /^[A-ZŁŚŻ][a-ząćęłńóśźż]+( [A-Za-ząćęłńóśźż&]+)+$/.test(t)
    if (looksLikeCopy) found.add('$' + t)
  }
  // Pojedyncze słowa przypisane do pól treści, np. label: 'Tawerna'.
  for (const m of script.matchAll(/\b(?:label|title|tag|name|alt|text|desc|subtitle|note|category|body|type)\s*:\s*'([^'\n]+)'/g))
    if (LETTERS.test(m[1]) && /^[A-ZĄĆĘŁŃÓŚŹŻ]/.test(m[1])) found.add('$' + m[1])
  for (const t of found) if (!ALLOW.has(t)) { hits++; console.log(`${f}: ${t.slice(0, 120)}`) }
}
console.log(hits ? `\n${hits} tekstów w kodzie` : 'Brak tekstów w kodzie')
process.exit(hits ? 1 : 0)
