# CMS Pruvious dla Przystani Caryńskiej — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cała treść strony carynska trafia do nowego panelu Pruvious (`~/carynska-cms`), a strona czyta ją stamtąd — bez tekstów wpisanych w kod.

**Architecture:** Osobna aplikacja Pruvious (wzorzec `~/nb-cms`), formularze generowane z jednego pliku `scripts/forms/spec.mjs`, wypełniane skryptem importu z obecnej treści. Strona carynska pobiera dane przez serwerowe proxy `/api/cms/...` (wzorzec `~/nb`) i renderuje je w niezmienionych szablonach.

**Tech Stack:** Nuxt 4, Pruvious 3.16.1 (SQLite), Node ≥ 20, Tailwind 4 (tylko strona).

**Spec:** `docs/superpowers/specs/2026-10-14-pruvious-cms-design.md`

## Global Constraints

- CMS w `~/carynska-cms`, osobne repo git, port **4322**; strona carynska na porcie **4000**.
- Na razie tylko lokalnie — bez `deploy/`, Dockerfile, k8s.
- Etykiety, opisy pól, nazwy zakładek i grup panelu — **po polsku**, każde pole z opisem „gdzie to widać na stronie”.
- Każdy telefon / e-mail działu wpisany w panelu **raz** (kolekcja `dzialy`); formularze stron wskazują dział polem `record`.
- Link rezerwacji hotres tylko w `ustawienia.bookingUrl`.
- W `carynska/app/**/*.vue` i `app/composables/*` zero tekstów widocznych dla gościa (sprawdza `scripts/check-hardcoded.mjs`).
- Kolekcje tylko do odczytu publicznie (`apiRoutes.read: 'public'`, dla `dzialy` także `readMany`).
- Commity bezpośrednio na `main` w obu repo (projekt solo), stopka commitów:
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Listy krótkich elementów (udogodnienia, wyróżniki) = pole wieloliniowe „jeden element w linii”; akapity = pole wieloliniowe, akapity oddzielone pustą linią.

## Review Focus

1. **Puste pole / pusta lista w CMS** → sekcja lub element znika, strona nie pokazuje pustego nagłówka ani nie wywraca SSR. Test: Task 14 krok „puste pola”.
2. **CMS wyłączony podczas renderu strony** → proxy oddaje ostatnią dobrą odpowiedź; bez cache strona zwraca błąd 500 tylko dla danej podstrony, a nie wisi. Test: Task 6 krok „CMS wyłączony”.
3. **Dział usunięty w panelu, a nadal wskazany na stronie** → `record` populuje `null`; strona pomija blok kontaktu zamiast wyrzucać wyjątek. Test: Task 7 krok „usunięty dział”.
4. **Zdjęcie usunięte z mediów** → pole `image` zwraca `null`; `<img>` się nie renderuje (bez `src="undefined"`). Test: Task 14 krok „puste pola”.
5. **Ponowny import na wypełnionej bazie** → import nadpisuje singletony i nie dubluje działów ani zdjęć (dedup po nazwie pliku / nazwie działu). Test: Task 5 krok „drugi import”.

---

## Mapa plików

### `~/carynska-cms` (nowe repo)

| Plik | Odpowiedzialność |
|---|---|
| `package.json`, `nuxt.config.ts`, `.gitignore`, `tsconfig.json`, `app/app.vue`, `app/layouts/default.vue` | szkielet Pruvious (z nb-cms) |
| `app/config/menuGroups.ts` | grupy menu panelu według podstron |
| `app/dashboard/Base.vue` | układ panelu czytający `menuGroups.ts` (kopia z nb-cms) |
| `app/dashboard/MultiCollectionsOverview.vue` | lista z przeciąganiem (kopia z nb-cms) |
| `app/dashboard/ViewOnSite.vue` | przycisk „Zobacz na stronie” |
| `app/fields/gallery.field.ts`, `app/dashboard/GalleryField.vue` | pole galerii (kopia z nb-cms) |
| `app/collections/dzialy.collection.ts` | działy z telefonami (pisane ręcznie, `multi`) |
| `app/collections/<form>.collection.ts` | formularze — **generowane**, nie edytować |
| `scripts/forms/fields.mjs` | klocki opisu pól |
| `scripts/forms/spec.mjs` | jedno źródło prawdy wszystkich formularzy |
| `scripts/forms/generate.mjs` | spec → pliki kolekcji |
| `scripts/import/extract.mjs` | jednorazowo: dawne `*.get.ts` carynska → `data.json` |
| `scripts/import/data.json` | treść startowa (commitowana) |
| `scripts/import/map.mjs` | `data.json` → rekordy formularzy |
| `scripts/import/run.mjs` | wgrywa zdjęcia i zapisuje rekordy przez API |

### `~/carynska`

| Plik | Odpowiedzialność |
|---|---|
| `scripts/parity/routes.mjs`, `snapshot.mjs`, `compare.mjs`, `allowed.json`, `baseline/*.txt` | test „strona wygląda tak samo” (tekst + alt) |
| `scripts/check-hardcoded.mjs` | test „brak tekstów w kodzie” |
| `app/composables/useCms.ts` | `useCmsSingle`, `useCmsCollection`, `cmsImg`, `lines`, `paragraphs`, `telHref` |
| `server/api/cms/[...path].ts` | proxy do CMS ze stale-cache |
| `app/composables/useSite.ts` | wspólne singletony: `ustawienia`, `kontakt`, `menu-strony`, `dzialy` |
| `app/composables/useNav.ts` | menu z CMS |
| strony i komponenty | podmiana tekstów na pola CMS |
| `server/api/{content,noclegi,atrakcje,jacht,tawerna,projekty}.get.ts` | **usunięte** w Task 14 |

**Zmiana względem specu:** strona główna w sekcji „Noclegi” pokazuje tylko jedno zdjęcie (`data.rooms[0].image`) — nie listę pokoi. Zamiast łączenia z `noclegi-pokoje` formularz `strona-glowna` dostaje pole `noclegiImage`. Prościej i bez utraty funkcji; w Task 2 dopisać to do specu.

---

### Task 1: Testy bazowe w carynska (parity + brak tekstów w kodzie)

**Files:**
- Create: `scripts/parity/routes.mjs`, `scripts/parity/snapshot.mjs`, `scripts/parity/compare.mjs`, `scripts/parity/allowed.json`, `scripts/parity/baseline/` (generowane)
- Create: `scripts/check-hardcoded.mjs`
- Modify: `package.json` (skrypty)

**Interfaces:**
- Produces: `npm run parity:snapshot` (zapisuje baseline), `npm run parity` (porównuje, exit 1 przy różnicy), `npm run check:hardcoded` (exit 1 przy znalezionym tekście). Używane w Task 7–14.

- [ ] **Step 1: Lista podstron**

`scripts/parity/routes.mjs`:
```js
export const ROUTES = [
  '/', '/noclegi/pokoje', '/noclegi/cennik', '/noclegi/jacht', '/atrakcje', '/zaplanuj-pobyt',
  '/tawerna', '/galeria', '/grupy', '/projekty', '/regulamin', '/regulamin-wypozyczalni', '/wzor-umowy-jachtu',
]
export const BASE = process.env.SITE_URL ?? 'http://localhost:4000'
export const slug = (r) => (r === '/' ? 'index' : r.slice(1).replace(/\//g, '__'))
```

- [ ] **Step 2: Zrzut tekstu strony**

`scripts/parity/snapshot.mjs` — dla każdej podstrony zapisuje widoczny tekst (jeden węzeł tekstowy w linii) i atrybuty `alt`/`aria-label`/`placeholder`:
```js
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
```

- [ ] **Step 3: Porównanie**

`scripts/parity/compare.mjs`:
```js
// Porównuje bieżącą stronę z baseline. Dozwolone różnice: allowed.json
// ({ "<slug>": ["linia z baseline, która może zniknąć/zmienić się", ...] }).
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
  const skip = new Set(allowed[s] ?? [])
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
```

`scripts/parity/allowed.json` (start):
```json
{}
```

- [ ] **Step 4: Detektor tekstów w kodzie**

`scripts/check-hardcoded.mjs`:
```js
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
  for (const m of tpl.matchAll(/>([^<>{}]+)</g)) { const t = m[1].replace(/\s+/g, ' ').trim(); if (LETTERS.test(t)) found.add(t) }
  for (const m of tpl.matchAll(/\s(?:alt|title|aria-label|placeholder|label)="([^"]+)"/g)) if (LETTERS.test(m[1])) found.add('@' + m[1])
  const script = f.endsWith('.ts') ? src : (src.match(/<script[^>]*>([\s\S]*?)<\/script>/) ?? [, ''])[1]
  for (const m of script.replace(/^\s*\/\/.*$/gm, '').matchAll(/'([^'\n]*)'/g)) {
    const t = m[1]
    // Polskie znaki albo zdanie zaczynające się wielką literą („Hotel na wodzie”, „Booking now”).
    const looksLikeCopy = /[ĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(t) || /^[A-ZŁŚŻ][a-ząćęłńóśźż]+( [A-Za-ząćęłńóśźż&]+)+$/.test(t)
    if (looksLikeCopy) found.add('$' + t)
  }
  for (const t of found) if (!ALLOW.has(t)) { hits++; console.log(`${f}: ${t.slice(0, 120)}`) }
}
console.log(hits ? `\n${hits} tekstów w kodzie` : 'Brak tekstów w kodzie')
process.exit(hits ? 1 : 0)
```

- [ ] **Step 5: Skrypty npm**

W `package.json` → `"scripts"` dopisz:
```json
"parity:snapshot": "node scripts/parity/snapshot.mjs",
"parity": "node scripts/parity/compare.mjs",
"check:hardcoded": "node scripts/check-hardcoded.mjs"
```

- [ ] **Step 6: Baseline**

Run (w tle `npm run dev`, potem): `npm run parity:snapshot`
Expected: 13× `✓ /…`, pliki w `scripts/parity/baseline/`.

- [ ] **Step 7: Test porównania przechodzi na niezmienionej stronie**

Run: `npm run parity`
Expected: `Wszystkie podstrony zgodne z baseline`, exit 0.

- [ ] **Step 8: Detektor zgłasza obecne teksty (test „na czerwono”)**

Run: `npm run check:hardcoded`
Expected: exit 1, na liście m.in. `app/components/KontaktSection.vue: Dane do przelewu`, `app/pages/galeria.vue: $Przystań Caryńska z lotu ptaka`, `app/composables/useNav.ts: $Pokoje & Apartamenty`. Jeśli brakuje którejś z tych trzech — popraw regexy w Step 4, aż się pojawią.

- [ ] **Step 9: Commit**

```bash
git add scripts package.json
git commit -m "Testy migracji CMS: parity podstron i detektor tekstów w kodzie

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Szkielet `~/carynska-cms` z generatorem formularzy

**Files:**
- Create: `~/carynska-cms/{package.json,nuxt.config.ts,.gitignore,tsconfig.json,README.md}`
- Create: `app/app.vue`, `app/layouts/default.vue` (kopie 1:1 z nb-cms)
- Create (kopie z nb-cms): `app/dashboard/Base.vue`, `app/dashboard/MultiCollectionsOverview.vue`, `app/dashboard/GalleryField.vue`, `app/fields/gallery.field.ts`
- Create: `app/dashboard/ViewOnSite.vue`, `app/config/menuGroups.ts`
- Create: `scripts/forms/fields.mjs`, `scripts/forms/generate.mjs`, `scripts/forms/spec.mjs` (na razie z formularzem testowym)
- Modify: `~/carynska/docs/superpowers/specs/2026-10-14-pruvious-cms-design.md` (notka o `noclegiImage`)

**Interfaces:**
- Produces: helpery `text, area, lines, editor, image, gallery, file, link, number, checkbox, select, record, repeater` z `fields.mjs`; spec to tablica `{ name, label, url, icon, tabs: { [zakładka]: { [klucz]: pole } } }`; `node scripts/forms/generate.mjs` pisze `app/collections/<name>.collection.ts`. `ViewOnSite` czyta adres z `url` w `app/config/formUrls.json` (generowane).

- [ ] **Step 1: Repo i zależności**

```bash
mkdir ~/carynska-cms && cd ~/carynska-cms && git init -q
cp ~/nb-cms/{.gitignore,tsconfig.json} .
mkdir -p app/{collections,config,dashboard,fields,layouts} scripts/{forms,import}
cp ~/nb-cms/app/app.vue app/ && cp ~/nb-cms/app/layouts/default.vue app/layouts/
cp ~/nb-cms/app/dashboard/{Base,MultiCollectionsOverview,GalleryField}.vue app/dashboard/
cp ~/nb-cms/app/fields/gallery.field.ts app/fields/
```

`package.json`:
```json
{
  "name": "carynska-cms",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "pruvious dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "forms": "node scripts/forms/generate.mjs",
    "postinstall": "npm rebuild sqlite3 --build-from-source && nuxt prepare"
  },
  "dependencies": {
    "nuxt": "^4.4.6",
    "pruvious": "3.16.1",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "engines": { "node": ">=20" },
  "overrides": { "tar": "^7.5.21", "brace-expansion": "^5.0.8", "nanoid": "^5.1.6", "sharp": "^0.35.4" }
}
```

`nuxt.config.ts`:
```ts
// Panel treści strony przystan.bieszczady.pl (repo ../carynska).
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Stały port — strona carynska szuka CMS właśnie tutaj (4321 zajmuje nb-cms).
  devServer: { port: 4322 },
  modules: ['pruvious'],

  // Adres strony, na którą prowadzi przycisk „Zobacz na stronie” w panelu.
  runtimeConfig: {
    public: { siteUrl: 'http://localhost:4000' },
  },

  // pruvious.jwt.secretKey czytany z NUXT_PRUVIOUS_JWT_SECRET_KEY (.env, poza repo).
  pruvious: {
    dashboard: {
      baseComponents: {
        misc: {
          MultiCollectionsOverview: './app/dashboard/MultiCollectionsOverview.vue',
          Base: './app/dashboard/Base.vue',
        },
      },
    },
    database: process.env.NUXT_PRUVIOUS_DATABASE ?? 'sqlite:./pruvious.db',
    uploads: {
      drive: { type: 'local', path: process.env.NUXT_PRUVIOUS_UPLOADS_DRIVE_PATH ?? './.uploads' },
      maxFileSize: '16 MB',
    },
    pageCache: { type: 'local', path: process.env.NUXT_PRUVIOUS_PAGE_CACHE_PATH ?? './.cache/pages' },
  },
})
```

```bash
printf 'NUXT_PRUVIOUS_JWT_SECRET_KEY=%s\n' "$(openssl rand -hex 32)" > .env
npm install
```
Expected: instalacja bez błędów (sqlite3 zbudowany).

- [ ] **Step 2: Sprawdź, jak `Base.vue` czyta grupy**

Run: `grep -n "menuGroups\|MENU_GROUPS" app/dashboard/Base.vue`
Expected: import z `~/config/menuGroups` (lub `../config/menuGroups`). Zachowaj tę ścieżkę — `menuGroups.ts` tworzysz w Step 5 z tym samym eksportem `MENU_GROUPS` i typem `MenuGroup`.

- [ ] **Step 3: Klocki pól**

`scripts/forms/fields.mjs`:
```js
// Klocki do opisu pól w spec.mjs. Każde pole: etykieta po polsku, podpowiedź
// „gdzie to widać na stronie”, opcjonalnie wartość domyślna.
export const text = (label, hint, def) => ({ type: 'text', label, hint, default: def })
export const link = (label, hint, def) => ({ type: 'text', label, hint, default: def, placeholder: 'np. /atrakcje albo https://…' })
/** Tekst wieloliniowy. Akapity oddzielaj pustą linią. */
export const area = (label, hint, rows = 4) => ({ type: 'text-area', label, hint, rows })
/** Lista krótkich pozycji — jedna pozycja w linii. */
export const lines = (label, hint, rows = 5) => ({ type: 'text-area', label, hint: [hint, 'Jedna pozycja w linii.'].filter(Boolean).join(' '), rows })
export const editor = (label, hint) => ({ type: 'editor', label, hint })
export const image = (label, hint) => ({ type: 'image', label, hint })
export const gallery = (label, hint, directory) => ({ type: 'gallery', label, hint, directory })
export const file = (label, hint) => ({ type: 'file', label, hint })
export const number = (label, hint) => ({ type: 'number', label, hint })
export const checkbox = (label, hint) => ({ type: 'checkbox', label, hint })
export const select = (label, hint, choices) => ({ type: 'select', label, hint, choices })
/** Wybór działu (telefon/e-mail wpisuje się raz w „Działy i telefony”). */
export const dzial = (label = 'Dział kontaktowy', hint = 'Telefon i e-mail tego działu pokażą się w tym miejscu.') =>
  ({ type: 'record', label, hint, collection: 'dzialy' })
/** Lista powtarzalnych wpisów — kolejność zmienia się przeciąganiem. */
export const repeater = (label, hint, addLabel, subfields) => ({ type: 'repeater', label, hint, addLabel, subfields })

export const ICONS = {
  zaglowka: 'Żaglówka', elektryczna: 'Łódź elektryczna', kajak: 'Kajak', jacht: 'Jacht',
  trekking: 'Góry / sport', plaza: 'Plaża / basen', koncert: 'Koncert / atrakcje', grupy: 'Grupa ludzi',
}
```

- [ ] **Step 4: Generator**

`scripts/forms/generate.mjs`:
```js
// Generuje formularze CMS z jednego źródła: scripts/forms/spec.mjs.
//   npm run forms
// Wynik: app/collections/<nazwa>.collection.ts (nie edytuj ręcznie)
//        app/config/formUrls.json (adresy podstron dla „Zobacz na stronie”)
import { writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import spec from './spec.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const EDITOR_TOOLBAR = ['heading2', 'heading3', 'paragraph', 'bold', 'italic', 'link', 'bulletList', 'orderedList', 'blockquote', 'clear', 'undo', 'redo']

export function fieldDef(f) {
  const options = { required: false, label: f.label }
  if (f.hint) options.description = f.hint
  if (f.default !== undefined) options.default = f.default
  if (f.placeholder) options.placeholder = f.placeholder
  switch (f.type) {
    case 'text-area': options.rows = f.rows; break
    case 'editor': options.toolbar = EDITOR_TOOLBAR; break
    case 'gallery': if (f.directory) options.directory = f.directory; break
    case 'select': options.choices = f.choices; options.clearable = true; break
    case 'record':
      options.collection = f.collection
      options.populate = true
      options.fields = { id: true, name: true, tag: true, phone: true, email: true, desc: true }
      options.recordLabel = 'name'
      options.clearable = true
      break
    case 'repeater':
      options.addLabel = f.addLabel
      options.subfields = Object.fromEntries(Object.entries(f.subfields).map(([k, sf]) => [k, fieldDef(sf)]))
      break
  }
  return { type: f.type, options }
}

const urls = {}
for (const form of spec) {
  urls[form.name] = form.url ?? null
  const fields = {}
  const layout = {}
  for (const [tab, tabFields] of Object.entries(form.tabs)) {
    layout[tab] = Object.keys(tabFields)
    for (const [key, f] of Object.entries(tabFields)) {
      if (fields[key]) throw new Error(`${form.name}: pole „${key}” występuje dwa razy`)
      fields[key] = fieldDef(f)
    }
  }
  const src = `// WYGENEROWANE z scripts/forms/spec.mjs — nie edytuj ręcznie (npm run forms).
import { defineCollection } from '#pruvious'

export default defineCollection(${JSON.stringify({
    name: form.name,
    mode: 'single',
    label: { collection: { plural: form.label, singular: form.label } },
    apiRoutes: { read: 'public' },
    dashboard: {
      icon: form.icon ?? 'File',
      additionalRecordOptionsVueComponent: './app/dashboard/ViewOnSite.vue',
      fieldLayout: [layout],
    },
    fields,
  }, null, 2)})
`
  writeFileSync(join(root, 'app/collections', `${form.name}.collection.ts`), src)
}
writeFileSync(join(root, 'app/config/formUrls.json'), JSON.stringify(urls, null, 2) + '\n')
console.log(`Wygenerowano ${spec.length} formularzy`)
```

- [ ] **Step 5: Menu panelu, „Zobacz na stronie”, formularz testowy**

`app/config/menuGroups.ts`:
```ts
// Grupy w menu panelu — według podstron witryny. Pozycje spoza listy
// (Media, Użytkownicy) pokazują się na dole bez grupy.
export interface MenuGroup {
  label: string
  items: { collection: string; label: string }[]
}

export const MENU_GROUPS: MenuGroup[] = [
  { label: 'Test', items: [{ collection: 'test-formularza', label: 'Formularz testowy' }] },
]
```

`app/dashboard/ViewOnSite.vue`:
```vue
<template>
  <a v-if="href" :href="href" target="_blank" rel="noopener" class="button button-white" title="Otwiera tę stronę w nowej karcie (zapisz zmiany przed podglądem)">
    <PruviousIconExternalLink class="cs-view-icon" />
    Zobacz na stronie
  </a>
</template>

<script setup lang="ts">
// Przycisk „Zobacz na stronie” — otwiera podstronę, której dotyczy formularz.
import { computed, useRoute, useRuntimeConfig } from '#imports'
import formUrls from '../config/formUrls.json'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const href = computed(() => {
  const collection = String(route.path).split('/collections/')[1]?.split('/')[0] ?? ''
  const path = (formUrls as Record<string, string | null>)[collection]
  return path ? String(runtimeConfig.public.siteUrl).replace(/\/$/, '') + path : ''
})
</script>

<style scoped>
.cs-view-icon { width: 1rem; height: 1rem; margin-right: 0.35rem; }
</style>
```

`scripts/forms/spec.mjs` (tymczasowo — sprawdza zagnieżdżony repeater i `record`, oba potrzebne w Task 3–4):
```js
import { dzial, repeater, text, lines } from './fields.mjs'

export default [
  {
    name: 'test-formularza', label: 'Formularz testowy', url: '/', icon: 'Flask',
    tabs: {
      Lista: {
        grupy: repeater('Grupy', '', 'Dodaj grupę', {
          nazwa: text('Nazwa'),
          pozycje: repeater('Pozycje', '', 'Dodaj pozycję', { nazwa: text('Nazwa'), cena: text('Cena') }),
        }),
        punkty: lines('Punkty'),
      },
    },
  },
]
```

`app/collections/dzialy.collection.ts` — w tym kroku w wersji pełnej (zmienia się dopiero w Task 3, jeśli Step 7 wykaże problem):
```ts
import { defineCollection } from '#pruvious'

// Działy z telefonami i e-mailami — jedyne miejsce, gdzie się je wpisuje.
// Podstrony wskazują dział z listy (pole „Dział kontaktowy”).
export default defineCollection({
  name: 'dzialy',
  mode: 'multi',
  label: { collection: { plural: 'Działy i telefony', singular: 'dział' } },
  translatable: false,
  apiRoutes: { read: 'public', readMany: 'public' },
  dashboard: {
    icon: 'Phone',
    primaryField: 'name',
    overviewTable: { columns: [{ field: 'name' }, { field: 'phone' }, { field: 'email' }], sort: { field: 'order', direction: 'asc' }, perPage: 50 },
    fieldLayout: [{
      'Dane działu': ['name', 'tag', 'desc', 'phone', 'email'],
      'Menu „Zadzwoń”': ['showInCallMenu', 'callTag', 'icon', 'order'],
    }],
  },
  fields: {
    name: { type: 'text', options: { required: true, label: 'Nazwa działu', description: 'Np. „Noclegi”, „Tawerna”, „Bosmanat”.' } },
    tag: { type: 'text', options: { label: 'Napis nad nazwą', description: 'W sekcji Kontakt, np. „Rezerwacje indywidualne”.' } },
    desc: { type: 'text-area', options: { label: 'Krótki opis', description: 'W sekcji Kontakt pod nazwą działu.', rows: 2 } },
    phone: { type: 'text', options: { label: 'Telefon', placeholder: '+48 600 000 000' } },
    email: { type: 'text', options: { label: 'E-mail' } },
    showInCallMenu: { type: 'checkbox', options: { label: 'Pokaż w pasku górnym i w przycisku „Zadzwoń”' } },
    callTag: { type: 'text', options: { label: 'Napis nad numerem w menu „Zadzwoń”', description: 'Np. „Rezerwacje”.' } },
    icon: { type: 'select', options: { label: 'Ikona', choices: { bed: 'Łóżko', utensils: 'Sztućce', anchor: 'Kotwica', briefcase: 'Teczka' }, clearable: true } },
    order: { type: 'number', options: { label: 'Kolejność', default: 0 } },
  },
})
```

- [ ] **Step 6: Generuj i uruchom**

```bash
npm run forms && npm run dev
```
Expected: `Wygenerowano 1 formularzy`; CMS startuje na `http://localhost:4322`. Wejdź na `http://localhost:4322/dashboard`, załóż konto administratora (zapisz dane w menedżerze haseł — będą potrzebne w Task 5).

- [ ] **Step 7: Sprawdź zagnieżdżony repeater i record przez API**

```bash
TOKEN=$(curl -s -X POST localhost:4322/api/login -H 'content-type: application/json' -d '{"email":"<email>","password":"<hasło>"}' | tr -d '"')
curl -s -X POST localhost:4322/api/collections/dzialy -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' -d '{"name":"Test","phone":"+48 1"}'
curl -s -X PATCH localhost:4322/api/collections/test-formularza -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' \
  -d '{"grupy":[{"nazwa":"A","pozycje":[{"nazwa":"x","cena":"1 zł"}]}],"punkty":"a\nb"}'
curl -s 'localhost:4322/api/collections/test-formularza?populate=true'
```
Expected: ostatnie wywołanie zwraca `{"grupy":[{"nazwa":"A","pozycje":[{"nazwa":"x","cena":"1 zł"}]}],"punkty":"a\nb",...}`.
Jeśli zagnieżdżony repeater jest odrzucony: zatrzymaj się i zgłoś — wtedy Task 3–4 zastępuje zagnieżdżenia polem `lines` w formacie „nazwa | cena” (decyzja do użytkownika).
Usuń dział testowy w panelu.

- [ ] **Step 8: Notka w specu i commit**

W `~/carynska/docs/superpowers/specs/2026-10-14-pruvious-cms-design.md`, sekcja „Zasady deduplikacji”, zamień punkt o stronie głównej na:
`- Strona główna w sekcji „Noclegi” pokazuje jedno zdjęcie — własne pole „Zdjęcie” w formularzu strony głównej (nie lista pokoi).`

```bash
cd ~/carynska-cms && git add -A && git commit -m "Szkielet panelu Pruvious z generatorem formularzy i działami

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
cd ~/carynska && git add docs && git commit -m "Spec: zdjęcie noclegów na stronie głównej jako osobne pole

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Formularze „Ustawienia wspólne” i strona główna

**Files:**
- Modify: `~/carynska-cms/scripts/forms/spec.mjs` (usuń formularz testowy, dodaj formularze niżej)
- Modify: `~/carynska-cms/app/config/menuGroups.ts`
- Delete: `~/carynska-cms/app/collections/test-formularza.collection.ts`

**Interfaces:**
- Produces: kolekcje `ustawienia`, `kontakt`, `menu-strony`, `strona-glowna` o polach jak niżej — nazwy pól to kontrakt dla Task 5 (import) i Task 7–8 (strona).

- [ ] **Step 1: Wpisy w `spec.mjs`**

Zastąp zawartość `spec.mjs`:
```js
// Jedno źródło prawdy dla wszystkich formularzy panelu. Każdy wpis = jeden
// formularz, zakładki = sekcje strony w kolejności, w jakiej widać je na stronie.
// Po zmianie: npm run forms
import { ICONS, area, checkbox, dzial, editor, file, gallery, image, lines, link, number, repeater, select, text } from './fields.mjs'

const hero = (where) => ({
  heroTag: text('Napis nad tytułem', `Mały złoty napis nad tytułem ${where}.`),
  heroTitle: area('Tytuł', 'Duży tytuł na zdjęciu. Nowa linia = łamanie wiersza.', 2),
  heroImage: image('Zdjęcie w tle', 'Duże zdjęcie na górze podstrony.'),
})
const priceGroups = (label, hint) => repeater(label, hint, 'Dodaj grupę cen', {
  category: text('Nazwa grupy', 'Np. „Sprzęt niesilnikowy”.'),
  note: text('Uwaga pod nazwą', 'Opcjonalnie, np. godziny sesji.'),
  items: repeater('Pozycje', '', 'Dodaj pozycję', { label: text('Nazwa'), price: text('Cena') }),
})

export default [
  // ───────── Ustawienia wspólne ─────────
  {
    name: 'ustawienia', label: 'Logo, rezerwacje i teksty wspólne', url: '/', icon: 'Settings',
    tabs: {
      'Logo i nazwa': {
        logo: image('Logo', 'W menu i w stopce.'),
        siteName: text('Nazwa obiektu', 'Np. w menu i na okładce karty dań.'),
        tagline: text('Hasło pod logo', 'W rozwiniętym menu, np. „Luksus w sercu Bieszczad”.'),
        regionLine: text('Linia z lokalizacją', 'Na dole stopki, np. „Polańczyk · Jezioro Solińskie · Bieszczady”.'),
      },
      'Rezerwacje online': {
        bookingUrl: link('Link do systemu rezerwacji (hotres)', 'Wszystkie przyciski „Rezerwuj” i „Sprawdź dostępność” prowadzą tutaj.'),
        bookingCta: text('Przycisk w menu', 'Np. „Booking now”.'),
        widgetTitle: text('Widżet: przycisk główny', 'Np. „Sprawdź dostępność”.'),
        widgetCheckIn: text('Widżet: przyjazd (krótko)', 'Np. „Check-in”.'),
        widgetCheckOut: text('Widżet: wyjazd (krótko)', 'Np. „Check-out”.'),
        widgetArrival: text('Widżet: przyjazd (w okienku)', 'Np. „Przyjazd”.'),
        widgetDeparture: text('Widżet: wyjazd (w okienku)', 'Np. „Wyjazd”.'),
        widgetPickDate: text('Widżet: podpowiedź daty', 'Np. „Wybierz datę”.'),
        widgetGuests: text('Widżet: goście', 'Np. „Goście”.'),
        widgetLess: text('Widżet: przycisk „mniej” (dla czytników)'),
        widgetMore: text('Widżet: przycisk „więcej” (dla czytników)'),
        widgetReserve: text('Widżet: przycisk w pasku', 'Np. „Rezerwuj”.'),
        widgetReserveNow: text('Widżet: przycisk w okienku', 'Np. „Rezerwuj teraz”.'),
      },
      'Telefony w menu': {
        topbarLabel: text('Pasek górny: napis przed numerami', 'Np. „Rezerwacje:”. Numery to działy z zaznaczonym „Pokaż w pasku górnym”.'),
        callTitle: text('Przycisk „Zadzwoń”: tytuł'),
        callSubtitle: text('Przycisk „Zadzwoń”: podtytuł', 'Np. „Wybierz dział”.'),
        pizzaLabel: text('Przycisk zamawiania pizzy', 'Na zdjęciu strony głównej i na stronie Tawerny, np. „🍕 Zamów pizzę”.'),
        pizzaDzial: dzial('Dział dla przycisku pizzy', 'Numer, pod który dzwoni przycisk zamawiania pizzy.'),
      },
      'Stopka': {
        copyright: text('Prawa autorskie', 'Strona wstawi bieżący rok w miejsce {rok}.'),
      },
      'Odznaki i certyfikaty': {
        badges: repeater('Odznaki', 'Logotypy i certyfikaty na stronie Projekty.', 'Dodaj odznakę', {
          image: image('Obrazek'), alt: text('Opis obrazka', 'Dla osób niewidomych i wyszukiwarek.'), href: link('Link (opcjonalnie)'),
        }),
      },
      'Teksty wspólne': {
        breadcrumbHome: text('Okruszki: strona startowa', 'Np. „Start”.'),
        seeMore: text('Link „Zobacz”', 'Np. „Zobacz →”.'),
        details: text('Przycisk „Szczegóły”'),
        close: text('Przycisk zamykania (dla czytników)', 'Np. „Zamknij”.'),
        prevPhoto: text('Poprzednie zdjęcie (dla czytników)'),
        nextPhoto: text('Następne zdjęcie (dla czytników)'),
        openMenu: text('Otwórz menu (dla czytników)'),
        closeMenu: text('Zamknij menu (dla czytników)'),
      },
    },
  },
  {
    name: 'kontakt', label: 'Kontakt, przelew i nasze obiekty', url: '/#kontakt', icon: 'Mail',
    tabs: {
      'Adres': {
        address: text('Adres'),
        mapQuery: text('Mapa: czego szukać w Google Maps', 'Np. „Przystan Carynska Polanczyk Rowna 19”.'),
        email: text('Główny e-mail', 'W pasku górnym, menu i sekcji Kontakt.'),
      },
      'Sekcja Kontakt': {
        kicker: text('Napis nad tytułem'),
        title: text('Tytuł'),
        reservationsTitle: text('Nagłówek listy działów', 'Np. „Rezerwacje”.'),
        formTitle: text('Formularz: tytuł', 'Np. „Napisz do nas”.'),
        formName: text('Formularz: imię i nazwisko'),
        formEmail: text('Formularz: e-mail'),
        formPhone: text('Formularz: telefon'),
        formMessage: text('Formularz: wiadomość'),
        formSubmit: text('Formularz: przycisk wysyłania'),
        formThanks: text('Po wysłaniu: tytuł', 'Np. „Dziękujemy!”.'),
        formThanksText: text('Po wysłaniu: tekst'),
      },
      'Dane do przelewu': {
        bankTitle: text('Nagłówek'),
        bankLabel: text('Podpis: bank'), bankName: text('Nazwa banku'),
        accountLabel: text('Podpis: numer rachunku'), account: text('Numer rachunku'),
        swiftLabel: text('Podpis: SWIFT'), swift: text('SWIFT / BIC'),
        bankNote: area('Uwaga do przelewu', '', 2),
      },
      'Social media i portale': {
        social: repeater('Media społecznościowe', '', 'Dodaj profil', {
          label: text('Nazwa'), href: link('Adres profilu'), icon: select('Ikona', '', { facebook: 'Facebook', instagram: 'Instagram' }),
        }),
        platforms: repeater('Portale rezerwacyjne', 'Linki w sekcji Kontakt.', 'Dodaj portal', { label: text('Nazwa'), href: link('Adres') }),
      },
      'Nasze obiekty': {
        sisterTitle: text('Nagłówek w stopce', 'Np. „Nasze obiekty”.'),
        sisters: repeater('Obiekty siostrzane', 'Pokazywane w stopce i na stronie Zaplanuj pobyt.', 'Dodaj obiekt', {
          name: text('Nazwa'), location: text('Miejscowość'), href: link('Strona internetowa'),
          phone: text('Telefon'), email: text('E-mail'),
          shortDesc: text('Krótki opis (stopka)'),
          longDesc: area('Dłuższy opis (Zaplanuj pobyt)', '', 3),
          image: image('Zdjęcie (Zaplanuj pobyt)'),
          imageAlt: text('Opis zdjęcia'),
          cta: text('Przycisk (Zaplanuj pobyt)', 'Np. „Zobacz Zajazd”.'),
        }),
      },
    },
  },
  {
    name: 'menu-strony', label: 'Menu strony', url: '/', icon: 'Menu2',
    tabs: {
      'Pozycje menu': {
        links: repeater('Pozycje menu', 'Kolejność jak w menu na stronie.', 'Dodaj pozycję', {
          label: text('Nazwa'), href: link('Dokąd prowadzi'),
          children: repeater('Podmenu', 'Rozwijana lista pod pozycją (opcjonalnie).', 'Dodaj podpozycję', {
            label: text('Nazwa'), href: link('Dokąd prowadzi'), subtitle: text('Podpis (opcjonalnie)'),
            external: checkbox('Otwórz w nowej karcie'),
          }),
        }),
      },
    },
  },

  // ───────── Strona główna ─────────
  {
    name: 'strona-glowna', label: 'Strona główna', url: '/', icon: 'Home',
    tabs: {
      'Baner ze zdjęciami': {
        heroTitle: area('Tytuł', 'Nowa linia = łamanie wiersza.', 2),
        heroSubtitle: text('Podtytuł'),
        heroImages: gallery('Zdjęcia w banerze', 'Zmieniają się co kilka sekund. Kolejność przeciąganiem.', 'strona-glowna/'),
      },
      'Noclegi': {
        noclegiTag: text('Napis nad tytułem'), noclegiTitle: area('Tytuł', '', 2),
        noclegiBody: area('Tekst', 'Akapity oddziel pustą linią.', 6),
        noclegiImage: image('Zdjęcie'), noclegiImageAlt: text('Opis zdjęcia'),
        noclegiCta: text('Przycisk'), noclegiCtaHref: link('Dokąd prowadzi przycisk'),
      },
      'Atrakcje (kafelki)': {
        atrakcjeTag: text('Napis nad tytułem'), atrakcjeTitle: area('Tytuł', '', 2), atrakcjeBody: area('Tekst', '', 3),
        atrakcjeImage: image('Zdjęcie'), atrakcjeImageAlt: text('Opis zdjęcia'),
        atrakcjeCta: text('Przycisk'), atrakcjeCtaHref: link('Dokąd prowadzi przycisk'),
        tileHint: text('Podpowiedź na kafelku', 'Np. „Kliknij, aby dowiedzieć się więcej”.'),
        tiles: repeater('Kafelki', 'Kliknięcie kafelka otwiera okienko ze szczegółami.', 'Dodaj kafelek', {
          tag: text('Napis nad tytułem'), title: text('Tytuł'),
          icon: image('Ikona'), image: image('Zdjęcie'),
          from: select('Skąd wjeżdża przy przewijaniu', '', { left: 'Z lewej', right: 'Z prawej' }),
          modalTitle: text('Okienko: tytuł'), modalBody: area('Okienko: tekst', 'Akapity oddziel pustą linią.', 8),
          highlights: lines('Okienko: wyróżniki'),
        }),
      },
      'Tawerna': {
        kuchniaTag: text('Napis nad tytułem'), kuchniaTitle: area('Tytuł', '', 2), kuchniaBody: area('Tekst', 'Akapity oddziel pustą linią.', 5),
        kuchniaImage: image('Zdjęcie'), kuchniaImageAlt: text('Opis zdjęcia'),
        kuchniaCta: text('Przycisk'), kuchniaCtaHref: link('Dokąd prowadzi przycisk'),
      },
      'Opinie gości': {
        reviewsTag: text('Napis nad tytułem'), reviewsTitle: text('Tytuł'),
        reviewsAll: text('Link do wszystkich opinii'), googleUrl: link('Adres opinii w Google'),
        reviews: repeater('Opinie', '', 'Dodaj opinię', {
          name: text('Autor'), badge: text('Odznaka autora', 'Np. „Lokalny przewodnik”.'), date: text('Kiedy', 'Np. „3 tygodnie temu”.'),
          stars: number('Gwiazdki (1–5)'), text: area('Treść', '', 4),
        }),
      },
      'Facebook': {
        fbTag: text('Napis nad tytułem'), fbTitle: area('Tytuł', '', 2), fbBody: area('Tekst', '', 3),
        fbTabFacebook: text('Zakładka: Facebook'), fbTabInstagram: text('Zakładka: Instagram'), fbTabReviews: text('Zakładka: Opinie'),
        fbFollow: text('Przycisk obserwowania'),
      },
    },
  },
]
```

> Uwaga dla wykonawcy: nazwy podpisów i zakładek w `FacebookSection.vue` odczytaj z pliku przed Task 8 — jeśli komponent ma więcej tekstów niż pola wyżej (detektor z Task 1 je pokaże), dopisz pola do zakładki „Facebook” w tym samym stylu.

- [ ] **Step 2: Menu panelu**

`app/config/menuGroups.ts` → `MENU_GROUPS`:
```ts
export const MENU_GROUPS: MenuGroup[] = [
  { label: 'Strona główna', items: [{ collection: 'strona-glowna', label: 'Baner, sekcje, opinie' }] },
  {
    label: 'Noclegi',
    items: [
      { collection: 'noclegi-pokoje', label: 'Pokoje i apartamenty' },
      { collection: 'noclegi-cennik', label: 'Cennik' },
      { collection: 'noclegi-jacht', label: 'Hotel na wodzie (jachty)' },
    ],
  },
  {
    label: 'Atrakcje',
    items: [
      { collection: 'atrakcje', label: 'Wypożyczalnia, bosmanat, aktywny dzień' },
      { collection: 'zaplanuj-pobyt', label: 'Zaplanuj pobyt' },
    ],
  },
  { label: 'Tawerna', items: [{ collection: 'tawerna', label: 'Teksty i menu' }] },
  { label: 'Galeria', items: [{ collection: 'galeria', label: 'Zdjęcia' }] },
  { label: 'Grupy', items: [{ collection: 'grupy', label: 'Oferta i cennik dla grup' }] },
  { label: 'Projekty', items: [{ collection: 'projekty', label: 'Fundusze i harmonogram' }] },
  {
    label: 'Dokumenty',
    items: [
      { collection: 'regulamin', label: 'Regulamin' },
      { collection: 'regulamin-wypozyczalni', label: 'Regulamin wypożyczalni' },
      { collection: 'wzor-umowy-jachtu', label: 'Wzór umowy jachtu' },
    ],
  },
  {
    label: 'Ustawienia wspólne',
    items: [
      { collection: 'dzialy', label: 'Działy i telefony' },
      { collection: 'kontakt', label: 'Kontakt, przelew i nasze obiekty' },
      { collection: 'menu-strony', label: 'Menu strony' },
      { collection: 'ustawienia', label: 'Logo, rezerwacje i teksty wspólne' },
    ],
  },
]
```

- [ ] **Step 3: Generuj, sprawdź panel**

```bash
rm app/collections/test-formularza.collection.ts && npm run forms && npm run dev
```
Expected: `Wygenerowano 4 formularzy`. W panelu grupy „Strona główna” i „Ustawienia wspólne” pokazują formularze z zakładkami jak wyżej. Pozostałe grupy pokazują pozycje bez formularzy (dodawane w Task 4) — jeśli `Base.vue` wyrzuca błąd dla nieistniejącej kolekcji, tymczasowo zakomentuj te grupy i odkomentuj w Task 4.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "Formularze: ustawienia wspólne, kontakt, menu i strona główna

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Formularze podstron i dokumentów

**Files:**
- Modify: `~/carynska-cms/scripts/forms/spec.mjs` (dopisz na końcu tablicy)

**Interfaces:**
- Produces: kolekcje `noclegi-pokoje`, `noclegi-cennik`, `noclegi-jacht`, `atrakcje`, `zaplanuj-pobyt`, `tawerna`, `galeria`, `grupy`, `projekty`, `regulamin`, `regulamin-wypozyczalni`, `wzor-umowy-jachtu` — nazwy pól to kontrakt dla Task 5 i 9–13.

- [ ] **Step 1: Wpisy w `spec.mjs`** (dopisz do tablicy, po `strona-glowna`)

```js
  // ───────── Noclegi ─────────
  {
    name: 'noclegi-pokoje', label: 'Pokoje i apartamenty', url: '/noclegi/pokoje', icon: 'Bed',
    tabs: {
      'Nagłówek': { ...hero('strony Pokoje'), heroSubtitle: text('Podtytuł') },
      'Wstęp': { intro: area('Tekst wstępu', 'Akapity oddziel pustą linią.', 8) },
      'Pokoje': {
        rooms: repeater('Pokoje', 'Kolejność jak na stronie.', 'Dodaj pokój', {
          slug: text('Identyfikator w adresie', 'Małe litery i myślniki, np. „pokoj-2-osobowy”. Nie zmieniaj bez potrzeby — linki do pokoju przestaną działać.'),
          tag: text('Rodzaj', 'Np. „Pokój 2-osobowy”.'), title: text('Standard', 'Np. „Standard Plus”.'),
          size: text('Powierzchnia', 'Np. „22 m²”.'), occupancy: number('Maks. liczba osób'),
          desc: area('Opis', '', 3), amenities: lines('Wyposażenie'),
          images: gallery('Zdjęcia', 'Pierwsze zdjęcie to okładka.', 'pokoje/'),
        }),
      },
      'Napisy': {
        labelSize: text('Podpis: powierzchnia'), labelMax: text('Podpis: maks. osób'), labelAmenities: text('Podpis: wyposażenie'),
        questions: text('Pytanie nad przyciskiem', 'Np. „Masz pytania o pokoje lub dostępność?”.'),
        cta: text('Przycisk rezerwacji'), dzial: dzial(),
      },
    },
  },
  {
    name: 'noclegi-cennik', label: 'Cennik noclegów', url: '/noclegi/cennik', icon: 'Receipt',
    tabs: {
      'Nagłówek': { ...hero('strony Cennik') },
      'Ceny pokoi': {
        kicker: text('Napis nad tabelą'), tableTitle: text('Tytuł tabeli', 'Np. „Cennik pokoi 2026”.'),
        colType: text('Kolumna: rodzaj pokoju'), col1: text('Kolumna: 1 osoba'), col2: text('Kolumna: 2 osoby'),
        col3: text('Kolumna: 3 osoby'), col4: text('Kolumna: 4 osoby'), colApt: text('Kolumna: apartament'),
        rows: repeater('Wiersze tabeli', 'Puste pole lub „—” = brak ceny.', 'Dodaj wiersz', {
          type: text('Rodzaj pokoju'), p1: text('1 osoba'), p2: text('2 osoby'), p3: text('3 osoby'), p4: text('4 osoby'), apt: text('Apartament'),
        }),
        note: area('Uwagi pod tabelą', '', 2),
      },
      'Usługi dodatkowe': {
        extrasTitle: text('Nagłówek'),
        extras: repeater('Usługi', '', 'Dodaj usługę', { label: text('Nazwa'), price: text('Cena') }),
      },
      'Kontakt': { contactTitle: text('Nagłówek'), cta: text('Przycisk rezerwacji'), dzial: dzial() },
    },
  },
  {
    name: 'noclegi-jacht', label: 'Hotel na wodzie', url: '/noclegi/jacht', icon: 'Sailboat',
    tabs: {
      'Nagłówek': { ...hero('strony Hotel na wodzie') },
      'Wstęp': { kicker: text('Napis nad wstępem', 'Np. „Unikalne doświadczenie”.'), intro: area('Tekst wstępu', '', 4) },
      'Jachty': {
        yachts: repeater('Jachty', '', 'Dodaj jacht', {
          name: text('Nazwa'), tag: text('Napis nad nazwą'), units: number('Liczba jednostek'),
          capacity: number('Liczba osób'), cabins: number('Liczba kabin'), price: text('Cena od', 'Np. „od 380 zł / noc”.'),
          desc: area('Opis', '', 4), gallery: gallery('Zdjęcia', 'Pierwsze zdjęcie to okładka.', 'jachty/'),
          features: lines('Wyposażenie'),
          specs: repeater('Dane techniczne', '', 'Dodaj parametr', { label: text('Parametr'), value: text('Wartość') }),
          pricing: repeater('Cennik sezonowy', '', 'Dodaj okres', { label: text('Okres'), value: text('Cena') }),
        }),
      },
      'Co zawiera nocleg': { includesTitle: text('Nagłówek'), includes: lines('Co zawiera nocleg'), note: area('Uwaga', '', 2) },
      'Napisy': {
        seeDetails: text('Przycisk „Zobacz szczegóły”'), detailsLink: text('Link „Szczegóły →”'),
        onBoard: text('Nagłówek: na pokładzie'), seasonPricing: text('Nagłówek: cennik sezonowy'),
        callCta: text('Przycisk „Zadzwoń i zarezerwuj”'), dzial: dzial(),
      },
    },
  },

  // ───────── Atrakcje ─────────
  {
    name: 'atrakcje', label: 'Atrakcje', url: '/atrakcje', icon: 'Swimming',
    tabs: {
      'Nagłówek': { ...hero('strony Atrakcje') },
      'Wstęp': { intro: area('Tekst wstępu', 'Akapity oddziel pustą linią.', 8) },
      'Wypożyczalnia': {
        waterTag: text('Napis nad tytułem'), waterTitle: text('Tytuł'), waterBody: area('Tekst', '', 4),
        waterItems: repeater('Rodzaje sprzętu', '', 'Dodaj rodzaj', { icon: select('Ikona', '', ICONS), label: text('Nazwa'), desc: area('Opis', '', 2) }),
        waterPricingTitle: text('Nagłówek cennika'),
        waterPricing: priceGroups('Cennik wypożyczalni', ''),
      },
      'Flota': {
        fleetTitle: text('Nagłówek'), noPatentLabel: text('Etykieta „bez patentu”'), unitsLabel: text('Podpis: jednostki'), specLink: text('Link do specyfikacji'),
        fleet: repeater('Jednostki', '', 'Dodaj jednostkę', {
          type: text('Rodzaj', 'Np. „Jacht żaglowy”.'), name: text('Nazwa'), units: lines('Nazwy jednostek'),
          capacity: number('Liczba osób'), price: text('Cena'), patent: checkbox('Wymaga patentu'),
          desc: area('Opis', '', 3), specs: lines('Dane techniczne'), href: link('Specyfikacja producenta (link)'),
        }),
      },
      'Bosmanat': {
        marinaTag: text('Napis nad tytułem'), marinaTitle: text('Tytuł'), marinaBody: area('Tekst', '', 4),
        marinaAmenities: lines('Udogodnienia'), marinaPricingTitle: text('Nagłówek cennika'),
        marinaPricing: priceGroups('Cennik usług', ''),
        marinaImages: gallery('Zdjęcia', '', 'atrakcje/'), marinaDzial: dzial(),
      },
      'Aktywny dzień': {
        landTag: text('Napis nad tytułem'), landTitle: text('Tytuł'), landBody: area('Tekst', '', 3),
        landItems: repeater('Atrakcje', '', 'Dodaj atrakcję', { icon: select('Ikona', '', ICONS), label: text('Nazwa'), desc: area('Opis', '', 2) }),
      },
      'Dla grup': {
        groupsTag: text('Napis nad tytułem'), groupsTitle: text('Tytuł'), groupsBody: area('Tekst', '', 3),
        groupsCta: text('Przycisk'), groupsDzial: dzial(),
      },
    },
  },
  {
    name: 'zaplanuj-pobyt', label: 'Zaplanuj pobyt', url: '/zaplanuj-pobyt', icon: 'Map',
    tabs: {
      'Nagłówek': { ...hero('strony Zaplanuj pobyt') },
      'O ośrodku': { aboutTitle: text('Tytuł'), aboutBody: editor('Tekst', 'Zaznacz słowo i wstaw link, aby prowadziło do podstrony.') },
      'Obiekty przystani': {
        tilesTitle: text('Nagłówek'), tileCta: text('Link na kafelku', 'Np. „Zobacz →”.'),
        tiles: repeater('Kafelki', '', 'Dodaj kafelek', {
          title: text('Tytuł'), tag: text('Napis nad tytułem (opcjonalnie)'), desc: area('Opis', '', 2),
          image: image('Zdjęcie'), href: link('Dokąd prowadzi'),
        }),
      },
      'Nasze obiekty w Bieszczadach': {
        sistersTitle: text('Nagłówek', 'Obiekty i ich opisy edytujesz w „Kontakt, przelew i nasze obiekty”.'),
      },
      'W okolicy': { nearbyText: text('Tekst'), nearbyCta: text('Przycisk'), nearbyHref: link('Dokąd prowadzi przycisk') },
    },
  },

  // ───────── Tawerna ─────────
  {
    name: 'tawerna', label: 'Tawerna', url: '/tawerna', icon: 'ToolsKitchen2',
    tabs: {
      'Nagłówek': { ...hero('strony Tawerna') },
      'Wstęp': { intro: area('Tekst wstępu', '', 4) },
      'Menu': {
        menu: repeater('Kategorie menu', 'Kategorie w kolejności jak w karcie dań.', 'Dodaj kategorię', {
          category: text('Nazwa kategorii'), menuImage: image('Grafika kategorii (opcjonalnie)'),
          items: repeater('Dania', '', 'Dodaj danie', { name: text('Nazwa'), note: text('Dopisek (opcjonalnie)'), price: text('Cena (opcjonalnie)') }),
        }),
      },
      'Karta dań (książka)': {
        bookKicker: text('Okładka: napis nad tytułem'), bookTitle: area('Okładka: tytuł', '', 2),
        bookName: text('Okładka: nazwa'), bookSection: text('Napis w nagłówku stron'), bookEnd: text('Ostatnia strona', 'Np. „Smacznego!”.'),
        bookPrev: text('Poprzednia strona (dla czytników)'), bookNext: text('Następna strona (dla czytników)'),
      },
      'Dostawa': { deliveryTitle: text('Tytuł'), deliveryBody: area('Tekst', '', 2), dzial: dzial() },
    },
  },

  // ───────── Galeria ─────────
  {
    name: 'galeria', label: 'Galeria', url: '/galeria', icon: 'Photo',
    tabs: {
      'Nagłówek': { ...hero('strony Galeria') },
      'Zdjęcia': {
        allLabel: text('Filtr „wszystkie”'), emptyText: text('Gdy brak zdjęć'),
        categories: repeater('Kategorie zdjęć', 'Każda kategoria to przycisk filtra nad zdjęciami.', 'Dodaj kategorię', {
          label: text('Nazwa kategorii'),
          photos: gallery('Zdjęcia', 'Opis zdjęcia = podpis widoczny na zdjęciu.', 'galeria/'),
        }),
      },
    },
  },

  // ───────── Grupy ─────────
  {
    name: 'grupy', label: 'Grupy i eventy', url: '/grupy', icon: 'Users',
    tabs: {
      'Nagłówek': {
        ...hero('strony Grupy'),
        stats: repeater('Liczby pod tytułem', '', 'Dodaj liczbę', { value: text('Liczba'), label: text('Podpis') }),
      },
      'Oferta': {
        offerKicker: text('Napis nad sekcjami', 'Np. „Organizujemy”.'),
        sections: repeater('Sekcje oferty', '', 'Dodaj sekcję', { title: text('Tytuł'), body: area('Tekst', '', 5), note: text('Wyróżniona uwaga (opcjonalnie)') }),
      },
      'Cennik grupowy': {
        pricingTag: text('Napis nad cennikiem', 'Np. „Cennik 2026”.'), minPersons: number('Minimalna liczba osób'), minPersonsLabel: text('Podpis min. liczby osób'),
        bonuses: repeater('Gratisy', '', 'Dodaj gratis', { threshold: text('Od ilu osób'), reward: text('Gratis') }),
        colRate: text('Kolumna: stawka'), cols: lines('Kolumny cennika'),
        rows: repeater('Wiersze cennika', 'Ceny w kolejności kolumn, jedna w linii.', 'Dodaj wiersz', { type: text('Nazwa'), values: lines('Ceny') }),
        hbLabel: text('Podpis HB', 'Np. „half board”.'), includesHb: lines('W cenie HB'),
        fbLabel: text('Podpis FB', 'Np. „full board”.'), includesFb: lines('W cenie FB'),
        footnote: text('Przypis o posiłkach'),
        notesTitle: text('Nagłówek uwag'), notes: lines('Ważne informacje'),
        legal: area('Zastrzeżenie prawne', '', 3),
      },
      'Opcje dodatkowe': {
        extrasTitle: text('Nagłówek'), mealsLabel: text('Etykieta wyżywienia', 'Np. „Wyżywienie”.'),
        extras: repeater('Grupy opcji', '', 'Dodaj grupę', {
          category: text('Nazwa grupy'), note: text('Uwaga (opcjonalnie)'),
          items: repeater('Opcje', '', 'Dodaj opcję', { name: text('Nazwa'), desc: area('Opis', '', 2), price: text('Cena') }),
        }),
      },
      'Baza noclegowa': {
        capacityTitle: text('Nagłówek'),
        capacityRooms: repeater('Pokoje', '', 'Dodaj rodzaj', { count: number('Liczba'), label: text('Rodzaj') }),
        totalRooms: number('Pokoi razem'), beds: number('Miejsc noclegowych'), maxOccupancy: number('Maks. osób z dostawkami'),
        halls: repeater('Sale', '', 'Dodaj salę', { name: text('Nazwa'), seats: text('Pojemność') }),
      },
      'Zapytanie': { inquiryTitle: text('Tytuł'), inquiryCta: text('Przycisk'), dzial: dzial() },
    },
  },

  // ───────── Projekty ─────────
  {
    name: 'projekty', label: 'Projekty i fundusze', url: '/projekty', icon: 'Certificate',
    tabs: {
      'Nagłówek': { ...hero('strony Projekty') },
      'Projekt': {
        programName: text('Nazwa programu'), projectTitle: area('Tytuł projektu', '', 2), contract: area('Umowa', '', 4),
        projectBody: area('Opis', 'Akapity oddziel pustą linią.', 8), readMore: text('Przycisk „Czytaj więcej”'),
        finance: repeater('Finansowanie', '', 'Dodaj pozycję', { label: text('Nazwa'), value: text('Kwota') }),
      },
      'Fundusze EOG': {
        fundsKicker: text('Napis nad tytułem'), fundsTitle: text('Tytuł'), fundsBody: area('Tekst', 'Akapity oddziel pustą linią.', 8),
        fundsLinks: repeater('Linki', '', 'Dodaj link', { label: text('Napis'), href: link('Adres') }),
      },
      'Harmonogram': {
        timelineTitle: text('Tytuł'), timelineSubtitle: text('Podtytuł'),
        milestones: repeater('Etapy', 'Od najstarszego.', 'Dodaj etap', { date: text('Data'), title: text('Tytuł'), body: area('Opis', '', 3) }),
      },
    },
  },

  // ───────── Dokumenty ─────────
  ...[
    ['regulamin', 'Regulamin', '/regulamin'],
    ['regulamin-wypozyczalni', 'Regulamin wypożyczalni', '/regulamin-wypozyczalni'],
    ['wzor-umowy-jachtu', 'Wzór umowy jachtu', '/wzor-umowy-jachtu'],
  ].map(([name, label, url]) => ({
    name, label, url, icon: 'FileText',
    tabs: {
      'Treść': {
        title: text('Tytuł'), kicker: text('Napis nad tytułem (opcjonalnie)'), lead: area('Wstęp pod tytułem', '', 3),
        body: editor('Treść dokumentu', 'Śródtytuły ustaw jako „Nagłówek 2”.'),
      },
      'Plik i przyciski': {
        pdf: file('Plik PDF do pobrania'), pdfLabel: text('Przycisk pobierania'),
        cta: text('Dodatkowy przycisk (opcjonalnie)'), ctaHref: link('Dokąd prowadzi dodatkowy przycisk'),
      },
    },
  })),
```

- [ ] **Step 2: Generuj i sprawdź**

```bash
npm run forms && npm run dev
```
Expected: `Wygenerowano 16 formularzy`. W panelu każda grupa z `menuGroups.ts` otwiera formularz z zakładkami; formularz `atrakcje` → zakładka „Flota” pokazuje listę z przyciskiem „Dodaj jednostkę”.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "Formularze podstron: noclegi, atrakcje, tawerna, galeria, grupy, projekty, dokumenty

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Import obecnej treści i zdjęć

**Files:**
- Create: `~/carynska-cms/scripts/import/extract.mjs`, `data.json` (generowany), `map.mjs`, `run.mjs`
- Modify: `~/carynska-cms/package.json` (skrypt `import`)

**Interfaces:**
- Consumes: pola formularzy z Task 3–4, kolekcja `dzialy` z Task 2.
- Produces: `CMS_EMAIL=… CMS_PASSWORD=… npm run import` → wypełniona baza. `map.mjs` eksportuje `buildForms(data, ctx)` → `{ [formName]: record }` i `DZIALY` (lista działów). `ctx.img(path)` → id uploadu, `ctx.gallery(list)` → `[{uploadId, alt}]`, `ctx.dzial(name)` → id działu, `ctx.file(path)` → id uploadu.

- [ ] **Step 1: Ekstrakcja danych z carynska**

`scripts/import/extract.mjs`:
```js
// Jednorazowo: czyta dane z ../carynska (server/api/*.get.ts) i zapisuje data.json.
// Po usunięciu tych plików z carynska data.json zostaje jedynym źródłem importu.
//   node scripts/import/extract.mjs [ścieżka do carynska]
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const site = resolve(process.argv[2] ?? '../carynska')
const out = {}
for (const name of ['content', 'noclegi', 'atrakcje', 'jacht', 'tawerna', 'projekty']) {
  let src = readFileSync(`${site}/server/api/${name}.get.ts`, 'utf8')
  src = src.replace(/^interface[^\n]*\n/gm, '').replace(/^\s*import[^\n]*\n/gm, '')
  // defineEventHandler(() => ({...})) → wartość zwracana przez handler
  const fn = new Function('defineEventHandler', src.replace('export default', 'return'))
  out[name] = fn((h) => h)()
}
writeFileSync(new URL('./data.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log('Zapisano data.json:', Object.keys(out).join(', '))
```

Run: `node scripts/import/extract.mjs ~/carynska`
Expected: `Zapisano data.json: content, noclegi, atrakcje, jacht, tawerna, projekty`. Jeśli `new Function` zgłosi błąd składni TS (adnotacje typów), usuń je tym samym `replace` co `interface` i uruchom ponownie.

- [ ] **Step 2: Teksty z szablonów do `data.json`**

Dopisz ręcznie do `data.json` klucz `"templates"` z tekstami z szablonów i skryptów `.vue` — **dokładnie** listy z wyniku `npm run check:hardcoded` w carynska (Task 1 Step 8), pogrupowane po formularzu i polu z Task 3–4. Format:
```json
"templates": {
  "ustawienia": { "siteName": "Przystań Caryńska", "tagline": "Luksus w sercu Bieszczad", "regionLine": "Polańczyk · Jezioro Solińskie · Bieszczady", "bookingUrl": "https://panel.hotres.pl/v4_step1?oid=5426&lang=pl&ref=przystan.bieszczady.pl", "bookingCta": "Booking now", "widgetTitle": "Sprawdź dostępność", "widgetCheckIn": "Check-in", "widgetCheckOut": "Check-out", "widgetArrival": "Przyjazd", "widgetDeparture": "Wyjazd", "widgetPickDate": "Wybierz datę", "widgetGuests": "Goście", "widgetLess": "Mniej", "widgetMore": "Więcej", "widgetReserve": "Rezerwuj", "widgetReserveNow": "Rezerwuj teraz", "topbarLabel": "Rezerwacje:", "callTitle": "Zadzwoń do nas", "callSubtitle": "Wybierz dział", "pizzaLabel": "🍕 Zamów pizzę", "copyright": "© {rok} Przystań Caryńska", "breadcrumbHome": "Start", "seeMore": "Zobacz →", "details": "Szczegóły", "close": "Zamknij", "prevPhoto": "Poprzednie zdjęcie", "nextPhoto": "Następne zdjęcie", "openMenu": "Otwórz menu", "closeMenu": "Zamknij menu" },
  "kontakt": { "kicker": "Jezioro Solińskie · Bieszczady", "title": "Kontakt", "reservationsTitle": "Rezerwacje", "formTitle": "Napisz do nas", "formName": "Imię i nazwisko", "formEmail": "Email", "formPhone": "Telefon", "formMessage": "Wiadomość", "formThanks": "Dziękujemy!", "formThanksText": "Odezwiemy się wkrótce.", "bankTitle": "Dane do przelewu", "bankLabel": "Bank", "accountLabel": "Nr rachunku", "swiftLabel": "SWIFT / BIC", "sisterTitle": "Nasze obiekty" },
  "menu": [ "…pełna tablica links z app/composables/useNav.ts, skopiowana 1:1 …" ],
  "zaplanuj-pobyt": { "…": "…" }
}
```
Każdy formularz z Task 3–4 musi mieć tu komplet tekstów, których nie ma w dawnych `*.get.ts`. Dla dokumentów (`regulamin`, `regulamin-wypozyczalni`, `wzor-umowy-jachtu`) zapisz `body` jako HTML: `<h2>` dla śródtytułów, `<p>`, `<ul><li>` dla list — skopiowane z tablic w odpowiednich `.vue`. Dla `zaplanuj-pobyt.aboutBody` zapisz HTML z linkami `<a href="/noclegi/pokoje">…</a>` w miejscach, gdzie szablon ma `<NuxtLink>`.
Kontrola: dla każdego wiersza z wyniku `check:hardcoded` znajdź jego tekst w `data.json`:
```bash
cd ~/carynska && npm run check:hardcoded 2>/dev/null | grep -v '^Brak\|tekstów w kodzie' | sed 's/^[^:]*: [@$]\{0,1\}//' | while IFS= read -r t; do grep -qF -- "$t" ~/carynska-cms/scripts/import/data.json || echo "BRAK: $t"; done
```
Expected: brak wierszy `BRAK:` (poza fragmentami kodu typu `, alt:` — te nie są tekstami).

- [ ] **Step 3: Mapowanie na formularze**

`scripts/import/map.mjs` — czyste funkcje, bez sieci:
```js
// data.json → rekordy formularzy. ctx dostarcza id wgranych plików i działów.
const paras = (a) => (Array.isArray(a) ? a.join('\n\n') : a ?? '')
const ls = (a) => (a ?? []).join('\n')

export const DZIALY = (d) => {
  const call = { Noclegi: ['Rezerwacje', 'bed', 1], Tawerna: ['Restauracja', 'utensils', 2], Bosmanat: ['Przystań', 'anchor', 3] }
  return d.content.kontakt.departments.map((x, i) => ({
    name: x.name, tag: x.tag, desc: x.desc, phone: x.phone, email: x.email ?? '',
    showInCallMenu: !!call[x.name], callTag: call[x.name]?.[0] ?? '', icon: call[x.name]?.[1] ?? 'briefcase', order: call[x.name]?.[2] ?? 10 + i,
  }))
}

const priceGroups = (groups) => groups.map((g) => ({ category: g.category, note: g.note ?? '', items: g.items.map((i) => ({ label: i.label, price: i.price })) }))

export function buildForms(d, t, ctx) {
  const c = d.content
  const hero = (h) => ({ heroTag: h.tag ?? '', heroTitle: h.title ?? '', heroImage: h.image ? ctx.img(h.image) : null })
  return {
    ustawienia: { ...t.ustawienia, logo: ctx.img(c.kontakt.logo.src), pizzaDzial: ctx.dzial('Tawerna'),
      badges: t.badges.map((b) => ({ image: ctx.img(b.src), alt: b.alt, href: b.href ?? '' })) },
    kontakt: {
      ...t.kontakt, address: c.kontakt.address, mapQuery: c.kontakt.mapQuery.replace(/\+/g, ' '), email: c.kontakt.email,
      bankName: c.kontakt.bank.name, account: c.kontakt.bank.account, swift: c.kontakt.bank.swift, bankNote: c.kontakt.bank.note,
      social: c.kontakt.social, platforms: c.kontakt.platforms,
      sisters: c.kontakt.siostrzaneObiekty.map((s, i) => ({ ...s, shortDesc: s.desc, ...t.sisters[i], image: ctx.img(t.sisters[i].image) })),
    },
    'menu-strony': { links: t.menu },
    'strona-glowna': {
      ...t['strona-glowna'],
      heroTitle: c.hero.title, heroSubtitle: c.hero.subtitle, heroImages: ctx.gallery(c.hero.images.map((src) => ({ src, alt: '' }))),
      noclegiTag: c.noclegi.tag, noclegiTitle: c.noclegi.title, noclegiBody: paras(c.noclegi.body),
      noclegiImage: ctx.img(c.noclegi.rooms[0].image), noclegiImageAlt: c.noclegi.rooms[0].type,
      noclegiCta: c.noclegi.cta.label, noclegiCtaHref: c.noclegi.cta.href,
      atrakcjeTag: c.atrakcje.tag, atrakcjeTitle: c.atrakcje.title, atrakcjeBody: c.atrakcje.body,
      atrakcjeImage: ctx.img(c.atrakcje.image.src), atrakcjeImageAlt: c.atrakcje.image.alt,
      atrakcjeCta: c.atrakcje.cta.label, atrakcjeCtaHref: c.atrakcje.cta.href,
      tiles: c.atrakcje.tiles.map((x) => ({ tag: x.tag, title: x.title, icon: ctx.img(x.icon), image: ctx.img(x.image), from: x.from,
        modalTitle: x.modalTitle, modalBody: paras(x.modalBody), highlights: ls(x.highlights) })),
      kuchniaTag: c.kuchnia.tag, kuchniaTitle: c.kuchnia.title, kuchniaBody: paras(c.kuchnia.body),
      kuchniaImage: ctx.img(c.kuchnia.image.src), kuchniaImageAlt: c.kuchnia.image.alt, kuchniaCta: c.kuchnia.cta.label, kuchniaCtaHref: c.kuchnia.cta.href,
      googleUrl: c.reviews.googleUrl, reviews: c.reviews.items.map((r) => ({ ...r, badge: r.badge ?? '' })),
    },
    'noclegi-pokoje': {
      ...t['noclegi-pokoje'], ...hero(d.noclegi.hero), heroSubtitle: d.noclegi.hero.subtitle, intro: paras(d.noclegi.intro),
      rooms: d.noclegi.rooms.map((r) => ({ slug: r.slug, tag: r.tag, title: r.title, size: r.size, occupancy: r.occupancy, desc: r.desc,
        amenities: ls(r.amenities), images: ctx.gallery(r.images.map((src) => ({ src, alt: `${r.tag} ${r.title}` }))) })),
      dzial: ctx.dzial('Noclegi'),
    },
    'noclegi-cennik': { ...t['noclegi-cennik'], rows: d.noclegi.pricing.rows, note: d.noclegi.pricing.note, extras: d.noclegi.pricing.extras, dzial: ctx.dzial('Noclegi') },
    'noclegi-jacht': {
      ...t['noclegi-jacht'], ...hero(d.jacht.hero), intro: d.jacht.intro, includes: ls(d.jacht.includes), note: d.jacht.note,
      yachts: d.jacht.yachts.map((y) => ({
        name: y.name, tag: y.tag, units: y.units, capacity: y.capacity, cabins: y.cabins, price: y.price ?? '', desc: y.desc,
        gallery: ctx.gallery((y.gallery ?? [y.image]).map((src) => ({ src, alt: y.name }))),
        features: ls(y.features.filter((f) => typeof f === 'string')),
        specs: [...(y.specs ?? []), ...y.features.filter((f) => typeof f === 'object')],
        pricing: y.pricing ?? [],
      })),
      dzial: ctx.dzial('Noclegi'),
    },
    atrakcje: {
      ...t.atrakcje, ...hero(d.atrakcje.hero), intro: paras(d.atrakcje.intro),
      waterTag: d.atrakcje.water.tag, waterTitle: d.atrakcje.water.title, waterBody: d.atrakcje.water.body,
      waterItems: d.atrakcje.water.items, waterPricing: priceGroups(d.atrakcje.water.pricing),
      fleet: d.atrakcje.water.fleet.map((f) => ({ ...f, units: ls(f.units), specs: ls(f.specs), href: f.href ?? '' })),
      marinaTag: d.atrakcje.marina.tag, marinaTitle: d.atrakcje.marina.title, marinaBody: d.atrakcje.marina.body,
      marinaAmenities: ls(d.atrakcje.marina.amenities), marinaPricing: priceGroups(d.atrakcje.marina.pricing),
      marinaImages: ctx.gallery(d.atrakcje.marina.images), marinaDzial: ctx.dzial('Bosmanat'),
      landTag: d.atrakcje.land.tag, landTitle: d.atrakcje.land.title, landBody: d.atrakcje.land.body, landItems: d.atrakcje.land.items,
      groupsTag: d.atrakcje.groups.tag, groupsTitle: d.atrakcje.groups.title, groupsBody: d.atrakcje.groups.body,
      groupsCta: d.atrakcje.groups.cta.label, groupsDzial: ctx.dzial('Bosmanat'),
    },
    'zaplanuj-pobyt': { ...t['zaplanuj-pobyt'], tiles: t['zaplanuj-pobyt'].tiles.map((x) => ({ ...x, image: ctx.img(x.image) })) },
    tawerna: {
      ...t.tawerna, ...hero(d.tawerna.hero), intro: d.tawerna.intro,
      menu: d.tawerna.menu.map((m) => ({ category: m.category, menuImage: m.menuImage ? ctx.img(m.menuImage) : null,
        items: m.items.map((i) => ({ name: i.name, note: i.note ?? '', price: i.price ?? '' })) })),
      deliveryTitle: d.tawerna.delivery.title, deliveryBody: d.tawerna.delivery.body, dzial: ctx.dzial('Tawerna'),
    },
    galeria: { ...t.galeria, categories: t.galeria.categories.map((k) => ({ label: k.label, photos: ctx.gallery(k.photos) })) },
    grupy: (() => {
      const g = d.noclegi.grupy, p = g.pricing
      return {
        ...t.grupy, heroTag: g.tag, heroTitle: g.title, heroImage: t.grupy.heroImage ? ctx.img(t.grupy.heroImage) : null,
        sections: g.sections.map((s) => ({ ...s, note: s.note ?? '' })),
        pricingTag: p.tag, minPersons: p.minPersons, bonuses: p.bonuses, cols: ls(p.cols),
        rows: p.rows.map((r) => ({ type: r.type, values: ls(r.values) })),
        includesHb: ls(p.includes.hb), includesFb: ls(p.includes.fb), footnote: p.includes.footnote, notes: ls(p.notes), legal: p.legal,
        extras: p.extras.map((e) => ({ category: e.category, note: e.note ?? '', items: e.items })),
        capacityRooms: g.capacity.rooms, totalRooms: g.capacity.totalRooms, beds: g.capacity.beds, maxOccupancy: g.capacity.maxOccupancy,
        halls: g.capacity.halls, dzial: ctx.dzial('Biuro'),
      }
    })(),
    projekty: {
      ...t.projekty, ...hero(d.projekty.hero),
      projectTitle: d.projekty.project.title, contract: d.projekty.project.contract, projectBody: paras(d.projekty.project.body),
      finance: d.projekty.project.finance, fundsTitle: d.projekty.funds.title, fundsBody: paras(d.projekty.funds.body), fundsLinks: d.projekty.funds.links,
      timelineTitle: d.projekty.timeline.title, timelineSubtitle: d.projekty.timeline.subtitle, milestones: d.projekty.timeline.milestones,
    },
    ...Object.fromEntries(['regulamin', 'regulamin-wypozyczalni', 'wzor-umowy-jachtu'].map((n) => [n, { ...t[n], pdf: t[n].pdf ? ctx.file(t[n].pdf) : null }])),
  }
}
```
Klucze `t.badges`, `t.sisters`, `t['zaplanuj-pobyt'].tiles`, `t.galeria.categories[].photos` (`[{src, alt}]` — `alt` = podpis z `label` w `galeria.vue`), `t.grupy.heroImage`, `t[dokument].pdf` (ścieżka w `public/`) dopisz w Step 2 do `templates`.

- [ ] **Step 4: Test mapowania (na czerwono → na zielono)**

`scripts/import/map.test.mjs`:
```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { DZIALY, buildForms } from './map.mjs'

const d = JSON.parse(readFileSync(new URL('./data.json', import.meta.url), 'utf8'))
const ctx = { img: (p) => `img:${p}`, gallery: (l) => l.map((x) => ({ uploadId: `img:${x.src}`, alt: x.alt })), dzial: (n) => `dzial:${n}`, file: (p) => `file:${p}` }
const forms = buildForms(d, d.templates, ctx)

test('każdy formularz ze spec ma rekord', async () => {
  const spec = (await import('../forms/spec.mjs')).default
  for (const f of spec) assert.ok(forms[f.name], `brak rekordu dla ${f.name}`)
})
test('żadne pole rekordu nie jest undefined', () => {
  for (const [name, rec] of Object.entries(forms))
    for (const [k, v] of Object.entries(rec)) assert.notEqual(v, undefined, `${name}.${k} = undefined`)
})
test('każde pole rekordu istnieje w formularzu', async () => {
  const spec = (await import('../forms/spec.mjs')).default
  for (const f of spec) {
    const keys = new Set(Object.values(f.tabs).flatMap(Object.keys))
    for (const k of Object.keys(forms[f.name])) assert.ok(keys.has(k), `${f.name}: pole „${k}” nie istnieje w spec.mjs`)
  }
})
test('telefony tylko w działach', () => {
  const json = JSON.stringify(forms)
  for (const x of DZIALY(d)) assert.ok(!json.includes(x.phone), `numer ${x.phone} poza działami`)
})
test('pokoje mają galerie', () => {
  assert.equal(forms['noclegi-pokoje'].rooms.length, d.noclegi.rooms.length)
  assert.ok(forms['noclegi-pokoje'].rooms.every((r) => r.images.length > 0))
})
```
Run: `node --test scripts/import/`
Expected na start: FAIL, dopóki `templates` z Step 2 nie jest kompletne (komunikaty wskażą brakujące klucze). Uzupełniaj `data.json` / `map.mjs`, aż: wszystkie testy PASS. Uwaga: `kontakt.sisters[].phone` to numery obiektów siostrzanych, nie działów — test „telefony tylko w działach” ich nie dotyczy, bo porównuje tylko numery z `DZIALY`.

- [ ] **Step 5: Zapis do CMS**

`scripts/import/run.mjs`:
```js
// Wgrywa zdjęcia/pliki z ../carynska/public i wypełnia wszystkie formularze.
//   CMS_EMAIL=… CMS_PASSWORD=… npm run import [-- http://localhost:4322 ../carynska]
// Można uruchamiać wielokrotnie: pliki i działy są dopasowywane po nazwie.
import { readFileSync } from 'node:fs'
import { basename, extname, resolve } from 'node:path'
import { DZIALY, buildForms } from './map.mjs'

const base = process.argv[2] ?? 'http://localhost:4322'
const site = resolve(process.argv[3] ?? '../carynska')
const d = JSON.parse(readFileSync(new URL('./data.json', import.meta.url), 'utf8'))

const login = await fetch(`${base}/api/login`, { method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ email: process.env.CMS_EMAIL, password: process.env.CMS_PASSWORD }) })
if (!login.ok) throw new Error(`Logowanie: ${login.status} ${await login.text()}`)
const auth = { authorization: `Bearer ${(await login.text()).replace(/"/g, '')}` }
const api = async (path, init = {}) => {
  const res = await fetch(`${base}/api/${path}`, { ...init, headers: { ...auth, ...init.headers } })
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path}: ${res.status} ${await res.text()}`)
  return res.json()
}
const json = (method, body) => ({ method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })

// — pliki: dedup po nazwie pliku w katalogu import/
const existing = new Map((await api('collections/uploads?perPage=1000')).records.map((u) => [u.filename, u.id]))
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' }
async function upload(publicPath) {
  const name = basename(publicPath)
  if (existing.has(name)) return existing.get(name)
  const form = new FormData()
  form.append('$file', new Blob([readFileSync(`${site}/public${publicPath}`)], { type: MIME[extname(name).toLowerCase()] }), name)
  form.append('directory', 'import/')
  const rec = await api('collections/uploads', { method: 'POST', body: form })
  existing.set(name, rec.id)
  console.log('↑', name)
  return rec.id
}

// — działy: dedup po nazwie
const dz = new Map((await api('collections/dzialy?perPage=100')).records.map((r) => [r.name, r.id]))
for (const x of DZIALY(d)) {
  const rec = dz.has(x.name) ? await api(`collections/dzialy/${dz.get(x.name)}`, json('PATCH', x)) : await api('collections/dzialy', json('POST', x))
  dz.set(x.name, rec.id)
}

// — zbierz wszystkie ścieżki plików, wgraj, potem zbuduj rekordy synchronicznie
const paths = new Set()
const collect = { img: (p) => (paths.add(p), 0), file: (p) => (paths.add(p), 0), gallery: (l) => (l.forEach((x) => paths.add(x.src)), []), dzial: () => 0 }
buildForms(d, d.templates, collect)
const ids = new Map()
for (const p of paths) ids.set(p, await upload(p))

const ctx = {
  img: (p) => ids.get(p), file: (p) => ids.get(p),
  gallery: (l) => l.map((x) => ({ uploadId: ids.get(x.src), alt: x.alt ?? '' })),
  dzial: (n) => { if (!dz.has(n)) throw new Error(`Nieznany dział: ${n}`); return dz.get(n) },
}
for (const [name, rec] of Object.entries(buildForms(d, d.templates, ctx))) {
  await api(`collections/${name}`, json('PATCH', rec))
  console.log('✓', name)
}
```
W `package.json` → `"scripts"`: `"import": "node scripts/import/run.mjs"`.

Run (CMS działa): `CMS_EMAIL=<email> CMS_PASSWORD=<hasło> npm run import`
Expected: lista `↑ <plik>`, potem 16× `✓ <formularz>`, bez wyjątku. Jeśli Pruvious odrzuci pole — komunikat 422 wskaże nazwę; popraw `map.mjs` i powtórz.

- [ ] **Step 6: Drugi import (idempotencja — Review Focus 5)**

Run ponownie ten sam import.
Expected: brak linii `↑` (wszystkie pliki już są), 16× `✓`. W panelu „Działy i telefony” nadal 4 działy, w Mediach → `import/` tyle plików co po pierwszym imporcie.

- [ ] **Step 7: Kontrola przez API**

```bash
curl -s 'localhost:4322/api/collections/noclegi-pokoje?populate=true' | node -e 'const r=JSON.parse(require("fs").readFileSync(0));console.log(r.rooms.length, r.rooms[0].images[0].src, r.dzial?.phone)'
```
Expected: `6 /uploads/import/1os-pokoj.png +48 691 944 266` (liczba pokoi = liczba w dawnym `noclegi.get.ts`).

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "Import obecnej treści i zdjęć carynska do CMS

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Połączenie strony carynska z CMS

**Files:**
- Create: `~/carynska/app/composables/useCms.ts`
- Create: `~/carynska/server/api/cms/[...path].ts`
- Modify: `~/carynska/nuxt.config.ts`

**Interfaces:**
- Produces:
  - `useCmsSingle<T>(name: string)` → `useFetch` z `/api/cms/collections/<name>?populate=true`
  - `useCmsCollection<T>(name, { limit?, order? })` → `{ records: T[] }`
  - `cmsImg(img: { src: string } | string | null | undefined): string | undefined`
  - `lines(s?: string | null): string[]` — niepuste linie
  - `paragraphs(s?: string | null): string[]` — akapity (oddzielone pustą linią)
  - `telHref(phone?: string | null): string | undefined` — `tel:+48…` bez spacji
  - `withYear(s?: string | null): string` — `{rok}` → bieżący rok

- [ ] **Step 1: Konfiguracja**

`nuxt.config.ts` — dodaj (obok `devServer`):
```ts
  runtimeConfig: {
    public: {
      // Panel treści (repo ../carynska-cms). Na produkcji nadpisz NUXT_PUBLIC_CMS_URL.
      cmsUrl: 'http://localhost:4322',
    },
  },
```

- [ ] **Step 2: Proxy**

Skopiuj `~/nb/server/api/cms/[...path].ts` do `~/carynska/server/api/cms/[...path].ts` bez zmian logiki; w pierwszym komentarzu zamień `nb.dexint.xyz` na „CMS (../carynska-cms)”, a w komentarzu o stale-cache usuń wzmianki o Vercelu i GPX (zostaw opis: ostatnia dobra odpowiedź na wypadek niedostępności CMS).

- [ ] **Step 3: Helpery**

`app/composables/useCms.ts`:
```ts
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
```

- [ ] **Step 4: Test proxy i helperów**

Z działającym CMS i `npm run dev`:
```bash
curl -s localhost:4000/api/cms/collections/ustawienia | head -c 200; echo
curl -s -o /dev/null -w '%{http_code}\n' localhost:4000/api/cms/collections/../dashboard
curl -s -o /dev/null -w '%{http_code}\n' localhost:4000/api/cms/uploads/import/logo.png
```
Expected: JSON zaczynający się od `{"`, potem `404`, potem `200`.

- [ ] **Step 5: CMS wyłączony (Review Focus 2)**

Zatrzymaj CMS (Ctrl+C w jego terminalu), potem:
```bash
curl -s -D - localhost:4000/api/cms/collections/ustawienia -o /dev/null | grep -i x-cms-stale
```
Expected: `x-cms-stale: 1`. Uruchom CMS ponownie.

- [ ] **Step 6: Commit**

```bash
git add nuxt.config.ts app/composables/useCms.ts server/api/cms && git commit -m "Połączenie strony z CMS: proxy i helpery

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Wzorzec migracji strony/komponentu (dotyczy Task 7–13)

Każdy z Task 7–13 robi to samo dla swoich plików:

1. Zamiast `useFetch('/api/<plik>')` → `const { data: p } = await useCmsSingle('<formularz>')`; wspólne dane z `useSite()` (Task 7).
2. Każdy tekst z wyniku `npm run check:hardcoded` dla tych plików → `{{ p?.<pole> }}` według tabeli w zadaniu.
3. Listy: `v-for="x in lines(p?.amenities)"`, akapity: `v-for="t in paragraphs(p?.intro)"`, zdjęcia: `:src="cmsImg(p?.heroImage)"` + `v-if` na elemencie, gdy pole puste.
4. Sekcja z pustym tytułem i pustą listą nie renderuje się (`v-if` na korzeniu sekcji).
5. Komponenty dostają dane propsami ze strony (jak dziś); tylko komponenty wspólne (navbar, topbar, CallMenu, KontaktSection, BookingWidget) czytają `useSite()`.

Test każdego zadania:
- `npm run check:hardcoded 2>&1 | grep -E '<pliki zadania>'` → pusto,
- `npm run parity` → zgodne dla podstron zadania (różnice dozwolone tylko te wpisane w zadaniu do `allowed.json`).

---

### Task 7: Elementy wspólne (menu, pasek, „Zadzwoń”, kontakt, rezerwacja)

**Files:**
- Create: `app/composables/useSite.ts`
- Modify: `app/composables/useNav.ts`, `app/components/TheNavbar.vue`, `app/components/TheTopbar.vue`, `app/components/CallMenu.vue`, `app/components/KontaktSection.vue`, `app/components/BookingWidget.vue`, `app/components/ContactCta.vue`, `app/components/PageHero.vue`, `app/app.vue`

**Interfaces:**
- Consumes: `useCmsSingle`, `useCmsCollection`, `cmsImg`, `telHref`, `withYear` (Task 6).
- Produces: `useSite()` → `Promise<{ ustawienia: Ref, kontakt: Ref, menu: Ref, dzialy: ComputedRef<CmsDzial[]>, callDzialy: ComputedRef<(CmsDzial & {callTag, icon})[]> }>`; `useNav()` → `ComputedRef<{ links: NavLink[]; cta: { label: string; href: string } }>` (**zmiana typu**: wcześniej zwykły obiekt — w stronach `nav.links` → `nav.value.links` albo w szablonie bez zmian, bo refy się rozpakowują przy przekazaniu `:nav="nav"`).

- [ ] **Step 1: Test na czerwono**

Run: `npm run check:hardcoded 2>&1 | grep -E 'useNav|TheNavbar|TheTopbar|CallMenu|KontaktSection|BookingWidget'`
Expected: niepusto (m.in. `KontaktSection.vue: Dane do przelewu`).

- [ ] **Step 2: `useSite`**

`app/composables/useSite.ts`:
```ts
/** Wspólne dane wszystkich podstron: logo, kontakt, menu, działy z telefonami. */
export async function useSite() {
  const [{ data: ustawienia }, { data: kontakt }, { data: menu }, { data: dzialyList }] = await Promise.all([
    useCmsSingle('ustawienia'),
    useCmsSingle('kontakt'),
    useCmsSingle('menu-strony'),
    useCmsCollection<CmsDzial & { showInCallMenu?: boolean; callTag?: string; icon?: string; order?: number }>('dzialy', { order: 'order:asc' }),
  ])
  const dzialy = computed(() => dzialyList.value?.records ?? [])
  const callDzialy = computed(() => dzialy.value.filter((d) => d.showInCallMenu && d.phone))
  return { ustawienia, kontakt, menu, dzialy, callDzialy }
}
```

- [ ] **Step 3: `useNav`**

`app/composables/useNav.ts`:
```ts
export interface NavChild { label: string; href: string; external?: boolean; subtitle?: string }
export interface NavLink { label: string; href: string; children?: NavChild[] }

/** Menu strony z CMS („Menu strony” + przycisk rezerwacji z „Ustawień”). */
export async function useNav() {
  const { menu, ustawienia } = await useSite()
  return computed(() => ({
    links: ((menu.value?.links ?? []) as NavLink[]).map((l) => ({ ...l, children: l.children?.length ? l.children : undefined })),
    cta: { label: ustawienia.value?.bookingCta ?? '', href: ustawienia.value?.bookingUrl ?? '' },
  }))
}
```
W każdej stronie, która ma `const nav = useNav()`, zmień na `const nav = await useNav()`:
```bash
grep -rl "useNav()" app/pages | xargs sed -i '' 's/const nav = useNav()/const nav = await useNav()/'
```
Wszędzie, gdzie `BOOKING_URL` był importowany/używany (`grep -rn BOOKING_URL app`), zamień na `ustawienia.value?.bookingUrl` z `useSite()`.

- [ ] **Step 4: Komponenty wspólne — tabela podmian**

| Plik | Tekst / dane dziś | Zamiana |
|---|---|---|
| `TheTopbar.vue` | `const phones = [...]` | `const { callDzialy, kontakt, ustawienia } = await useSite()`; `v-for="d in callDzialy"` → `d.name`, `d.phone`, `telHref(d.phone)` |
| `TheTopbar.vue` | `Rezerwacje:` | `{{ ustawienia?.topbarLabel }}` |
| `TheTopbar.vue`, `TheNavbar.vue` | `przystan@carynska.pl` | `{{ kontakt?.email }}`, `:href="'mailto:' + kontakt?.email"` |
| `TheNavbar.vue` | `const phones = [...]` | `callDzialy` z `useSite()` (`d.name`, `d.phone`, `d.icon`) |
| `TheNavbar.vue` | `Luksus w sercu Bieszczad` | `{{ ustawienia?.tagline }}` |
| `TheNavbar.vue` | `alt="Przystań Caryńska"`, `/images/logo.png` | `:alt="ustawienia?.siteName"`, `:src="cmsImg(ustawienia?.logo)"` |
| `TheNavbar.vue` | `aria-label="Otwórz menu"` / `"Zamknij menu"` | `:aria-label="ustawienia?.openMenu"` / `closeMenu` |
| `CallMenu.vue` | `const phones = [...]` | `callDzialy` (`d.callTag`, `d.name`, `d.phone`, `d.icon`) |
| `CallMenu.vue` | `Zadzwoń do nas`, `Wybierz dział` | `ustawienia?.callTitle`, `ustawienia?.callSubtitle` |
| `KontaktSection.vue` | `Jezioro Solińskie · Bieszczady`, `Kontakt`, `Rezerwacje` | `kontakt?.kicker`, `kontakt?.title`, `kontakt?.reservationsTitle` |
| `KontaktSection.vue` | działy z propsa `kontakt.departments` | `dzialy` z `useSite()` (`d.tag`, `d.name`, `d.desc`, `d.phone`, `d.email`) |
| `KontaktSection.vue` | `Dane do przelewu`, `Bank`, `Nr rachunku`, `SWIFT / BIC` + wartości | `kontakt?.bankTitle`, `bankLabel`/`bankName`, `accountLabel`/`account`, `swiftLabel`/`swift`, `bankNote` |
| `KontaktSection.vue` | `Napisz do nas`, placeholdery, `Dziękujemy!`, `Odezwiemy się wkrótce.` | `formTitle`, `formName`, `formEmail`, `formPhone`, `formMessage`, `formSubmit`, `formThanks`, `formThanksText` |
| `KontaktSection.vue` | `Nasze obiekty` + `siostrzaneObiekty` | `kontakt?.sisterTitle`, `kontakt?.sisters` (`s.shortDesc` w miejsce `s.desc`) |
| `KontaktSection.vue` | `© 2026 Przystań Caryńska` | `{{ withYear(ustawienia?.copyright) }}` |
| `KontaktSection.vue` | linki `Regulamin`, `Regulamin wypożyczalni`, `Wzór umowy najmu jachtu` | tytuły dokumentów: `useCmsSingle('regulamin')` itd. → `doc?.title` (trzy wywołania w `KontaktSection`) |
| `KontaktSection.vue` | `Polańczyk · Jezioro Solińskie · Bieszczady` | `ustawienia?.regionLine` |
| `KontaktSection.vue` | social, platforms, adres, mapa | `kontakt?.social`, `kontakt?.platforms`, `kontakt?.address`, `encodeURIComponent(kontakt?.mapQuery)` |
| `BookingWidget.vue` | `Check-in`, `Check-out`, `Goście`, `Rezerwuj`, `Sprawdź dostępność`, `Przyjazd`, `Wybierz datę`, `Wyjazd`, `Rezerwuj teraz`, `aria-label="Mniej"/"Więcej"` | `ustawienia?.widgetCheckIn`, `widgetCheckOut`, `widgetGuests`, `widgetReserve`, `widgetTitle`, `widgetArrival`, `widgetPickDate`, `widgetDeparture`, `widgetReserveNow`, `widgetLess`, `widgetMore`; URL rezerwacji z `ustawienia?.bookingUrl` |
| `PageHero.vue`, `ContactCta.vue` | ewentualne stałe teksty (sprawdź detektorem) | pola z `ustawienia` (np. `breadcrumbHome`) albo propsy ze strony |

Prop `kontakt` w `KontaktSection` (dziś przekazywany ze stron z `/api/content`) usuń — komponent czyta `useSite()` sam; usuń też `:kontakt="…"` w miejscach użycia (`grep -rn "<KontaktSection" app`).

- [ ] **Step 5: Usunięty dział (Review Focus 3)**

W szablonach każde użycie pola `dzial` (tu i w Task 8–13) zapisuj z `v-if`:
```vue
<a v-if="p?.dzial?.phone" :href="telHref(p.dzial.phone)">{{ p.dzial.phone }}</a>
```
Test: w panelu tymczasowo wyczyść „Dział kontaktowy” w formularzu „Tawerna” i zapisz → `curl -s -o /dev/null -w '%{http_code}' localhost:4000/tawerna` zwraca `200`. Przywróć dział „Tawerna”.

- [ ] **Step 6: Testy na zielono**

Run: `npm run check:hardcoded 2>&1 | grep -E 'useNav|TheNavbar|TheTopbar|CallMenu|KontaktSection|BookingWidget|PageHero|ContactCta'` → pusto.
Run: `npm run parity`
Expected: różnice tylko na podstronach migrowanych w późniejszych zadaniach **nie** występują (strony nadal czytają stare `/api/*`), a elementy wspólne są identyczne. Jedyna dozwolona różnica — rok w stopce, jeśli baseline zrobiono w innym roku (wtedy dopisz linię baseline do `allowed.json` dla każdej podstrony).

- [ ] **Step 7: Commit**

```bash
git add app && git commit -m "Menu, pasek górny, kontakt i rezerwacja z CMS

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Strona główna

**Files:**
- Modify: `app/pages/index.vue`, `app/components/HeroSection.vue`, `NoclegiSection.vue`, `AtrakcjeSection.vue`, `KuchniaSection.vue`, `ReviewsSection.vue`, `FacebookSection.vue`

**Interfaces:**
- Consumes: formularz `strona-glowna` (Task 3), `useSite()` (Task 7).

- [ ] **Step 1: Test na czerwono**

`npm run check:hardcoded 2>&1 | grep -E 'HeroSection|AtrakcjeSection|ReviewsSection|FacebookSection'` → niepusto.

- [ ] **Step 2: `index.vue`**

`const { data: p } = await useCmsSingle('strona-glowna')` zamiast `/api/content`. Każdy komponent dostaje `:data="p"` (jeden prop z całym formularzem) i czyta swoje pola:

| Komponent | Dziś | Pole |
|---|---|---|
| `HeroSection` | `hero.title`, `hero.subtitle`, `hero.images` | `data.heroTitle`, `data.heroSubtitle`, `data.heroImages.map(cmsImg)` |
| `HeroSection` | `🍕 Zamów pizzę` | `ustawienia.pizzaLabel`, numer `telHref(ustawienia.pizzaDzial?.phone)` |
| `NoclegiSection` | `tag`, `title`, `body[]`, `cta`, `rooms[0].image/type` | `noclegiTag`, `noclegiTitle`, `paragraphs(noclegiBody)`, `noclegiCta`/`noclegiCtaHref`, `cmsImg(noclegiImage)`/`noclegiImageAlt` |
| `AtrakcjeSection` | `tag`,`title`,`body`,`image`,`cta`,`tiles[]` | `atrakcje*`; kafelki: `t.icon`/`t.image` przez `cmsImg`, `paragraphs(t.modalBody)`, `lines(t.highlights)`; klucz `v-for` = indeks |
| `AtrakcjeSection` | `Kliknij, aby dowiedzieć się więcej`, `Przystań Caryńska`, `aria-label="Zamknij"` | `data.tileHint`, `ustawienia.siteName`, `ustawienia.close` |
| `KuchniaSection` | `tag`,`title`,`body[]`,`cta`,`image` | `kuchnia*`, `paragraphs(kuchniaBody)` |
| `ReviewsSection` | `Opinie gości`, `Co mówią nasi goście`, `Zobacz wszystkie opinie w Google`, `items`, `googleUrl` | `reviewsTag`, `reviewsTitle`, `reviewsAll`, `reviews`, `googleUrl` |
| `FacebookSection` | `Aktualności`, `Bądź na\nbieżąco`, opis, `Facebook`, `Instagram`, `Opinie`, `Obserwuj na Facebooku` | `fbTag`, `fbTitle`, `fbBody`, `fbTabFacebook`, `fbTabInstagram`, `fbTabReviews`, `fbFollow`; adres profilu z `kontakt.social` (`icon === 'facebook'`) |

Gdy `AtrakcjeSection` używał `tile.id` (np. do kotwic), zamień na indeks albo `slug` wyliczony z tytułu w komponencie.

- [ ] **Step 3: Testy na zielono**

`npm run check:hardcoded 2>&1 | grep -E 'index.vue|HeroSection|NoclegiSection|AtrakcjeSection|KuchniaSection|ReviewsSection|FacebookSection'` → pusto.
`npm run parity` → `/` zgodne z baseline.

- [ ] **Step 4: Commit**

```bash
git add app && git commit -m "Strona główna z CMS

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Noclegi (pokoje, cennik, jacht)

**Files:**
- Modify: `app/pages/noclegi/pokoje.vue`, `app/pages/noclegi/cennik.vue`, `app/pages/noclegi/jacht.vue`, `app/components/RoomCard.vue`

**Interfaces:**
- Consumes: `noclegi-pokoje`, `noclegi-cennik`, `noclegi-jacht` (Task 4).

- [ ] **Step 1: Test na czerwono** — `npm run check:hardcoded 2>&1 | grep noclegi/` → niepusto.

- [ ] **Step 2: Podmiany**

| Plik | Dziś | Pole |
|---|---|---|
| wszystkie trzy | `Noclegi` (okruszek/napis nad tytułem), tytuł, zdjęcie hero | `p.heroTag`, `p.heroTitle`, `cmsImg(p.heroImage)` |
| `pokoje.vue` | `rooms[]` (`image`, `images`, `amenities`) | `p.rooms`; okładka `cmsImg(r.images[0])`, galeria `r.images.map(cmsImg)`, `lines(r.amenities)` |
| `pokoje.vue` | `Szczegóły`, `Zobacz →`, aria `Zamknij`/`Poprzednie zdjęcie`/`Następne zdjęcie` | `ustawienia.details`, `ustawienia.seeMore`, `ustawienia.close`/`prevPhoto`/`nextPhoto` |
| `pokoje.vue` | `Powierzchnia`, `Maksymalnie`, `Wyposażenie`, `Masz pytania…`, `Sprawdź dostępność` | `p.labelSize`, `p.labelMax`, `p.labelAmenities`, `p.questions`, `p.cta` (link `ustawienia.bookingUrl`) |
| `pokoje.vue` | `intro[]`, `hero.subtitle` | `paragraphs(p.intro)`, `p.heroSubtitle` |
| `cennik.vue` | `Ceny za dobę`, `Cennik pokoi 2026`, nagłówki kolumn, `Usługi dodatkowe`, `Rezerwacje i pytania`, `Sprawdź dostępność` | `p.kicker`, `p.tableTitle`, `p.colType`, `p.col1`–`p.col4`, `p.colApt`, `p.extrasTitle`, `p.contactTitle`, `p.cta` |
| `cennik.vue` | `row.p1 === '—'` | `!row.p1 \|\| row.p1 === '—'` (puste pole = brak ceny) |
| `jacht.vue` | `Unikalne doświadczenie`, `Zobacz szczegóły`, `Szczegóły →`, `Co zawiera nocleg`, `Na pokładzie`, `Cennik sezonowy`, `Zadzwoń i zarezerwuj` | `p.kicker`, `p.seeDetails`, `p.detailsLink`, `p.includesTitle`, `p.onBoard`, `p.seasonPricing`, `p.callCta` |
| `jacht.vue` | `y.image`, `y.gallery`, `y.features` (mieszane), `y.specs`, `y.pricing` | `cmsImg(y.gallery[0])`, `y.gallery.map(cmsImg)`, `lines(y.features)`, `y.specs`, `y.pricing` |
| wszystkie trzy | telefon/e-mail z `contact`/`cta` | `p.dzial?.phone`, `p.dzial?.email` (z `v-if`) |

Jeśli `jacht.vue` wyświetlał pozycje `{label, value}` z `features` razem z cechami, teraz pokaż `y.specs` w tym samym miejscu i stylu — kolejność w baseline może się różnić; dopisz przesunięte linie do `allowed.json["noclegi__jacht"]` tylko jeśli tekst jest ten sam, a zmieniła się kolejność.

- [ ] **Step 3: Testy na zielono** — detektor pusty dla `noclegi/` i `RoomCard`; `npm run parity` zgodne dla `/noclegi/*`.

- [ ] **Step 4: Commit** — `git commit -am "Noclegi z CMS" ` (ze stopką Co-Authored-By).

---

### Task 10: Atrakcje i Zaplanuj pobyt

**Files:**
- Modify: `app/pages/atrakcje.vue`, `app/pages/zaplanuj-pobyt.vue`, `app/components/ActivityIcon.vue` (bez zmian, o ile nazwy ikon = klucze `ICONS`)

- [ ] **Step 1: Test na czerwono** — detektor dla `atrakcje.vue|zaplanuj-pobyt.vue` niepusty.

- [ ] **Step 2: Podmiany**

| Plik | Dziś | Pole |
|---|---|---|
| `atrakcje.vue` | `hero`, `intro[]` | `hero*`, `paragraphs(p.intro)` |
| `atrakcje.vue` | `water.{tag,title,body,items,pricing,fleet}` | `p.waterTag`, `waterTitle`, `waterBody`, `waterItems`, `waterPricing`, `p.fleet` (`lines(f.units)`, `lines(f.specs)`) |
| `atrakcje.vue` | `Nasza flota`, `bez patentu`, `Specyfikacja producenta →`, `Jednostki`, `Cennik wypożyczalni`, `Cennik usług` | `p.fleetTitle`, `p.noPatentLabel`, `p.specLink`, `p.unitsLabel`, `p.waterPricingTitle`, `p.marinaPricingTitle` |
| `atrakcje.vue` | `marina.*` | `p.marina*`, `lines(p.marinaAmenities)`, `p.marinaImages.map(cmsImg)`, telefon `p.marinaDzial?.phone` |
| `atrakcje.vue` | `land.*`, `groups.*`, `contact` | `p.land*`, `p.groups*`, `p.groupsDzial?.phone/email` |
| `atrakcje.vue` | kotwice `#cennik`, `#bosmanat` | **zostają w kodzie** (identyfikatory techniczne, nie tekst) |
| `zaplanuj-pobyt.vue` | `Start`, `Zaplanuj pobyt`, hero | `ustawienia.breadcrumbHome`, `p.heroTitle`, `cmsImg(p.heroImage)` |
| `zaplanuj-pobyt.vue` | blok „O ośrodku” z `<NuxtLink>` w tekście | `p.aboutTitle`; `<div class="…obecne klasy akapitu…" v-html="p.aboutBody" />` — styl linków przenieś do CSS: `.about-body a { @apply text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold transition-colors }` w `<style scoped>` z `:deep(a)` |
| `zaplanuj-pobyt.vue` | tablica kafelków w `<script>` | `p.tiles` (`cmsImg(t.image)`), `p.tilesTitle`, `p.tileCta` |
| `zaplanuj-pobyt.vue` | `Nasze obiekty w głębi Bieszczad`, Zajazd, Terebowiec | `p.sistersTitle`; `kontakt.sisters` (`s.location`, `s.name`, `s.longDesc`, `cmsImg(s.image)`, `s.imageAlt`, `s.cta`, `s.href`) |
| `zaplanuj-pobyt.vue` | `Wybierasz się…`, `Sprawdź co się dzieje w pobliżu` | `p.nearbyText`, `p.nearbyCta`, `p.nearbyHref` |

`v-html` jest bezpieczny tutaj, bo treść pisze wyłącznie zalogowany administrator CMS, a edytor Pruvious zapisuje ograniczony HTML.
Linki wewnętrzne w `aboutBody` przestają być `<NuxtLink>` (pełne przeładowanie zamiast nawigacji SPA) — akceptowalne; nie zmienia tekstu ani wyglądu.

- [ ] **Step 3: Testy na zielono** — detektor pusty; parity zgodne dla `/atrakcje`, `/zaplanuj-pobyt`.

- [ ] **Step 4: Commit** — „Atrakcje i Zaplanuj pobyt z CMS”.

---

### Task 11: Tawerna i karta dań

**Files:**
- Modify: `app/pages/tawerna.vue`, `app/components/TawernaBook.vue`

- [ ] **Step 1: Test na czerwono** — detektor dla `tawerna.vue|TawernaBook` niepusty.

- [ ] **Step 2: Podmiany**

| Plik | Dziś | Pole |
|---|---|---|
| `tawerna.vue` | hero, `intro`, `menu`, `delivery`, `contact` | `hero*`, `p.intro`, `p.menu`, `p.deliveryTitle`, `p.deliveryBody`, `p.dzial?.phone/email` |
| `tawerna.vue` | `🍕 Zamów pizzę`, `Tawerna Caryńska` | `ustawienia.pizzaLabel` (tel. `ustawienia.pizzaDzial`), `p.bookName` |
| `TawernaBook.vue` | prop `menu` | bez zmian nazwy; `section.menuImage` → `cmsImg(section.menuImage)` |
| `TawernaBook.vue` | `Przystań Caryńska`, `Karta`/`Dań`, `Tawerna`, `Tawerna Caryńska`, `Smacznego!`, aria `Poprzednia strona`/`Następna strona` | nowy prop `labels` = `{ kicker: p.bookKicker, title: p.bookTitle, name: p.bookName, section: p.bookSection, end: p.bookEnd, prev: p.bookPrev, next: p.bookNext }`; `Karta`/`Dań` = `lines(labels.title)` |
| `TawernaBook.vue` | `romanNumerals` | zostaje (cyfry rzymskie to układ, nie treść — dodaj do `ALLOW` w `check-hardcoded.mjs` tylko jeśli detektor je zgłosi) |

Uwaga: `TawernaBook` mierzy strony w DOM (`measurePages`) — po zmianie źródła danych sprawdź w przeglądarce, że książka przewraca strony i ostatnia strona ma „Smacznego!”.

- [ ] **Step 3: Testy na zielono** — detektor pusty; parity zgodne dla `/tawerna`.

- [ ] **Step 4: Commit** — „Tawerna z CMS”.

---

### Task 12: Galeria, Grupy, Projekty

**Files:**
- Modify: `app/pages/galeria.vue`, `app/pages/grupy.vue`, `app/pages/projekty.vue`, `app/components/PhotoCollage.vue` (jeśli detektor coś zgłosi)

- [ ] **Step 1: Test na czerwono** — detektor dla tych plików niepusty.

- [ ] **Step 2: Galeria**

Zamiast stałych `photos` i `categories`:
```ts
const { data: p } = await useCmsSingle('galeria')
const { ustawienia } = await useSite()
const categories = computed(() => [
  { id: 'all', label: p.value?.allLabel ?? '' },
  ...(p.value?.categories ?? []).map((c: any, i: number) => ({ id: String(i), label: c.label })),
])
const photos = computed(() =>
  (p.value?.categories ?? []).flatMap((c: any, i: number) =>
    (c.photos ?? []).map((ph: CmsImage) => ({ src: cmsImg(ph), alt: ph.alt ?? '', label: ph.alt ?? '', cat: String(i) })),
  ),
)
const filtered = computed(() => (selected.value === 'all' ? photos.value : photos.value.filter((x) => x.cat === selected.value)))
```
Teksty: `Zdjęcia` → `p.heroTag`, `Więcej zdjęć wkrótce` → `p.emptyText`, aria → `ustawienia.prevPhoto/nextPhoto/close`.
Kolejność kategorii filtra: w baseline „Wszystkie, Noclegi, Tawerna, Baseny, Wypożyczalnia, Eventy & grupy, Przystań & okolica”, a zdjęcia „przystan” były pierwsze w siatce „Wszystkie”. W imporcie (`templates.galeria.categories`) ułóż kategorie jak filtr; kolejność zdjęć w widoku „Wszystkie” się zmieni → dopisz do `allowed.json["galeria"]` linie `@alt:` zdjęć, których pozycja się przesunęła. Zmiana: `alt` zdjęcia = jego podpis (dawniej osobne `alt` i `label`) — dopisz dawne linie `@alt:` do `allowed.json`.

- [ ] **Step 3: Grupy**

| Dziś | Pole |
|---|---|
| `Grupy & Eventy`, `Idealne miejsce\nna Twój event`, `aria/alt "Grupy i eventy"` | `p.heroTag`, `p.heroTitle`, `alt` = `p.heroTag` |
| liczby + `miejsca noclegowe`, `os. w restauracji`, `sale (rest. + konf.)`, `min. osób w grupie` | `p.stats` (`s.value`, `s.label`) |
| `Organizujemy`, `sections[]` | `p.offerKicker`, `p.sections` |
| `half board`, `full board`, `Stawka`, `Ważne informacje`, `Opcje dodatkowe`, `Baza noclegowa`, `Wyżywienie` | `p.hbLabel`, `p.fbLabel`, `p.colRate`, `p.notesTitle`, `p.extrasTitle`, `p.capacityTitle`, `p.mealsLabel` |
| `pricing.*` | `p.pricingTag`, `p.minPersons`, `p.minPersonsLabel`, `p.bonuses`, `lines(p.cols)`, `p.rows` (`lines(r.values)`), `lines(p.includesHb/Fb)`, `p.footnote`, `lines(p.notes)`, `p.extras`, `p.legal` |
| `capacity.*` | `p.capacityRooms`, `p.totalRooms`, `p.beds`, `p.maxOccupancy`, `p.halls` |
| `Zapytaj o ofertę`, `przystan@carynska.pl`, `Wyślij zapytanie` | `p.inquiryTitle`, `p.dzial?.email`, `p.inquiryCta` |

`p.stats` w imporcie: wartości z obecnego szablonu (np. `capacity.beds`, `110`, `2`, `minPersons`) — wpisz je do `templates.grupy.stats` w Task 5 Step 2 jako tekst.

- [ ] **Step 4: Projekty**

| Dziś | Pole |
|---|---|
| `Start`, `Fundusze i projekty`, hero | `ustawienia.breadcrumbHome`, `p.heroTag`, `p.heroTitle`, `cmsImg(p.heroImage)` |
| `Rozwój Przedsiębiorczości i Innowacje`, `project.*`, `Czytaj więcej` | `p.programName`, `p.projectTitle`, `p.contract`, `paragraphs(p.projectBody)`, `p.finance`, `p.readMore` |
| `Fundusze EOG i Fundusze Norweskie`, `funds.*` | `p.fundsKicker`, `p.fundsTitle`, `paragraphs(p.fundsBody)`, `p.fundsLinks` |
| `Realizacja projektu`, `timeline.*` | `p.timelineTitle`, `p.timelineSubtitle`, `p.milestones` |
| logotypy PARP, Norway Grants, certyfikaty, Dogs/cats friendly | `ustawienia.badges` (`cmsImg(b.image)`, `b.alt`, `b.href`) |

- [ ] **Step 5: Testy na zielono** — detektor pusty; parity zgodne dla `/galeria` (z wpisami w `allowed.json`), `/grupy`, `/projekty`.

- [ ] **Step 6: Commit** — „Galeria, grupy i projekty z CMS”.

---

### Task 13: Dokumenty

**Files:**
- Create: `app/components/DocumentPage.vue`
- Modify: `app/pages/regulamin.vue`, `app/pages/regulamin-wypozyczalni.vue`, `app/pages/wzor-umowy-jachtu.vue`

**Interfaces:**
- Produces: `<DocumentPage name="regulamin" />` — wspólny układ trzech dokumentów.

- [ ] **Step 1: Test na czerwono** — detektor dla trzech stron niepusty.

- [ ] **Step 2: Wspólny komponent**

`app/components/DocumentPage.vue` — przenieś do niego układ z `regulamin.vue` (navbar, `PageHero`, kontener treści, przycisk PDF, `KontaktSection`), z danymi:
```vue
<script setup lang="ts">
const props = defineProps<{ name: 'regulamin' | 'regulamin-wypozyczalni' | 'wzor-umowy-jachtu' }>()
const { data: p } = await useCmsSingle(props.name)
const nav = await useNav()
const pdfUrl = computed(() => (p.value?.pdf?.filename ? cmsImg(`/uploads/${p.value.pdf.directory}${p.value.pdf.filename}`) : undefined))
useHead({ title: () => p.value?.title ?? '' })
</script>
```
Szablon: `p.kicker` (z `v-if`), `p.title`, `p.lead`, `<div class="doc-body" v-html="p.body" />`, przycisk `<a v-if="pdfUrl" :href="pdfUrl">{{ p.pdfLabel }}</a>`, opcjonalny `<NuxtLink v-if="p.cta && p.ctaHref" :to="p.ctaHref">{{ p.cta }}</NuxtLink>`.
Style `<h2>`, `<p>`, `<ol>/<ul>` w `.doc-body` przez `:deep()` — skopiuj klasy Tailwind, którymi dziś są ostylowane śródtytuły, akapity i listy w `regulamin.vue`, do `@apply` w `<style scoped>`.

- [ ] **Step 3: Strony**

Każda z trzech stron:
```vue
<template>
  <DocumentPage name="regulamin" />
</template>
```
(odpowiednio `regulamin-wypozyczalni`, `wzor-umowy-jachtu`).

- [ ] **Step 4: Testy na zielono** — detektor pusty; parity zgodne dla trzech dokumentów. Numeracja punktów: jeśli dawny szablon numerował sekcje w tytułach („1. Postanowienia ogólne”), tytuły w `<h2>` z importu muszą zawierać te same numery — wtedy parity przejdzie bez wpisów w `allowed.json`.

- [ ] **Step 5: Commit** — „Dokumenty z CMS”.

---

### Task 14: Sprzątanie i weryfikacja końcowa

**Files:**
- Delete: `server/api/{content,noclegi,atrakcje,jacht,tawerna,projekty}.get.ts`
- Delete: z `public/images/` pliki wgrane do CMS (zostają: favicony, `og`-obrazki, jeśli są w `<head>`)
- Modify: `README.md` (jak uruchomić stronę z CMS)

- [ ] **Step 1: Brak odwołań do starych API**

Run: `grep -rn "/api/\(content\|noclegi\|atrakcje\|jacht\|tawerna\|projekty\)" app`
Expected: pusto. Wtedy usuń sześć plików `server/api/*.get.ts`.

- [ ] **Step 2: Zdjęcia**

Run: `grep -rhoE "/images/[A-Za-z0-9._-]+" app nuxt.config.ts | sort -u`
Expected: pusto albo tylko pliki użyte w `<head>`. Usuń z `public/images/` wszystkie pliki niewymienione w tym wyniku (`git rm`).

- [ ] **Step 3: Puste pola (Review Focus 1 i 4)**

W panelu w formularzu „Pokoje i apartamenty”: wyczyść „Zdjęcie w tle” i „Tekst wstępu”, zapisz.
Run: `curl -s localhost:4000/noclegi/pokoje | grep -c 'src="undefined"\|src=""'`
Expected: `0`, strona zwraca 200, sekcja wstępu nie ma pustego akapitu. Przywróć pola (albo ponów `npm run import` w carynska-cms).

- [ ] **Step 4: Zmiana w panelu widoczna na stronie**

W panelu: „Działy i telefony” → Tawerna → zmień telefon na `+48 000 000 000`, zapisz.
Run: `curl -s localhost:4000/tawerna | grep -c '+48 000 000 000'`
Expected: ≥ 2 (pasek górny + strona Tawerny). Przywróć numer.

- [ ] **Step 5: Pełne testy**

```bash
npm run check:hardcoded   # Expected: „Brak tekstów w kodzie”, exit 0
npm run parity            # Expected: „Wszystkie podstrony zgodne z baseline”, exit 0
npm run build             # Expected: build bez błędów
cd ~/carynska-cms && npm run build && node --test scripts/import/   # Expected: build OK, testy PASS
```

- [ ] **Step 6: Przegląd wizualny**

Uruchom stronę i przejrzyj wszystkie 13 podstron w przeglądarce (desktop i szerokość 390 px): zdjęcia się ładują, galerie/lightboxy działają, książka menu przewraca strony, menu mobilne się rozwija, widżet rezerwacji prowadzi do hotres.

- [ ] **Step 7: README i commit**

Do `README.md` dopisz sekcję:
```md
## Treść strony (CMS)

Cała treść jest w panelu Pruvious — repo `../carynska-cms`.

1. `cd ../carynska-cms && npm run dev` — panel: http://localhost:4322/dashboard
2. `npm run dev` tutaj — strona: http://localhost:4000

Adres CMS: `runtimeConfig.public.cmsUrl` (nadpisz `NUXT_PUBLIC_CMS_URL`).
Testy: `npm run check:hardcoded` (brak tekstów w kodzie), `npm run parity` (strona zgodna z baseline).
```

```bash
git add -A && git commit -m "Usunięcie starych danych i zdjęć — cała treść w CMS

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
