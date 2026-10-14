// Porównuje bieżącą stronę z baseline. Dozwolone różnice: allowed.json
// ({ "<slug>" | "*": ["linia, która może zniknąć/zmienić się", ...] }).
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ROUTES, slug } from './routes.mjs'

const here = new URL('.', import.meta.url).pathname
const cur = mkdtempSync(join(tmpdir(), 'parity-'))
execFileSync('node', [join(here, 'snapshot.mjs'), cur], { stdio: 'inherit' })
const allowed = JSON.parse(readFileSync(join(here, 'allowed.json'), 'utf8'))

let failed = 0
for (const route of ROUTES) {
  const s = slug(route)
  // „*” = różnice dozwolone na każdej podstronie (np. elementy wspólne).
  const skip = new Set([...(allowed['*'] ?? []), ...(allowed[s] ?? [])])
  const filter = (p) => readFileSync(p, 'utf8').split('\n').filter((l) => !skip.has(l)).join('\n')
  const a = join(cur, `${s}.base`), b = join(cur, `${s}.now`)
  writeFileSync(a, filter(join(here, 'baseline', `${s}.txt`)))
  writeFileSync(b, filter(join(cur, `${s}.txt`)))
  try { execFileSync('diff', ['-u', a, b], { stdio: 'pipe' }) } catch (e) {
    failed++
    console.log(`\n✗ ${route}\n${e.stdout}`)
  }
}
console.log(failed ? `\n${failed} podstron różni się od baseline` : '\nWszystkie podstrony zgodne z baseline')
process.exit(failed ? 1 : 0)
