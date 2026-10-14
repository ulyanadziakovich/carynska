<script setup lang="ts">
interface MenuItem { name: string; note?: string }
interface MenuSection { category: string; items: MenuItem[] }
interface BookPage { category: string; items: MenuItem[]; continued: boolean }

const props = defineProps<{
  menu: MenuSection[]
  /** Napisy książki z CMS (formularz „Tawerna” → „Karta dań (książka)”). */
  labels: { kicker?: string; title?: string; name?: string; section?: string; end?: string; prev?: string; next?: string }
}>()
/** Tytuł okładki: pierwsza linia zwykła, druga pochylona („Karta” / „Dań”). */
const coverTitle = computed(() => lines(props.labels.title))

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']

// Design aspect ratio matches the PageFlip width/height options below —
// 'stretch' sizing scales both proportionally, so measuring at a fixed
// representative width gives a page-content height that stays valid
// across breakpoints.
const MEASURE_WIDTH = 300
const PAGE_ASPECT = 560 / 380
// Safety margin: real rendered width can differ slightly from the
// measurement width, so pack pages a bit under capacity rather than exactly
// at it — under-filling a page is harmless, overflowing one hides items.
const SAFETY_FACTOR = 0.92

const pages = ref<BookPage[]>([])

// Scoped styles only apply to elements carrying Vue's data-v-xxxx attribute;
// elements built by hand via document.createElement don't get it automatically,
// so it's copied from a real templated node before measuring — otherwise every
// height comes back as if unstyled (no padding/font-size), wildly undercounting
// how much fits on a page.
function measurePages(menu: MenuSection[], scopedAttr?: string): BookPage[] {
  const tag = <T extends HTMLElement>(el: T): T => {
    if (scopedAttr) el.setAttribute(scopedAttr, '')
    return el
  }

  const stage = document.createElement('div')
  stage.style.cssText = `position:fixed; left:-9999px; top:0; width:${MEASURE_WIDTH}px; visibility:hidden;`
  document.body.appendChild(stage)

  const shell = tag(document.createElement('div'))
  shell.className = 'book-page'
  shell.style.width = `${MEASURE_WIDTH}px`
  shell.style.height = `${Math.round(MEASURE_WIDTH * PAGE_ASPECT)}px`

  const inner = tag(document.createElement('div'))
  inner.className = 'book-page__inner'
  const eyebrow = tag(document.createElement('p'))
  eyebrow.className = 'book-page__eyebrow'
  eyebrow.textContent = props.labels.name ?? ''
  const title = tag(document.createElement('h3'))
  title.className = 'book-page__title'
  title.textContent = 'Kategoria'
  const rule = tag(document.createElement('div'))
  rule.className = 'book-page__rule'
  const itemsBox = tag(document.createElement('div'))
  itemsBox.className = 'book-page__items'
  const pageNum = tag(document.createElement('p'))
  pageNum.className = 'book-page__num'
  pageNum.textContent = '1'
  inner.append(eyebrow, title, rule, itemsBox, pageNum)
  shell.appendChild(inner)
  stage.appendChild(shell)

  const availableHeight = itemsBox.getBoundingClientRect().height * SAFETY_FACTOR

  function itemHeight(item: MenuItem): number {
    itemsBox.replaceChildren()
    const el = tag(document.createElement('div'))
    el.className = 'book-item'
    const num = tag(document.createElement('span'))
    num.className = 'book-item__num'
    num.textContent = 'I.'
    const body = tag(document.createElement('div'))
    body.className = 'book-item__body'
    const name = tag(document.createElement('p'))
    name.className = 'book-item__name'
    name.textContent = item.name
    body.appendChild(name)
    if (item.note) {
      const note = tag(document.createElement('p'))
      note.className = 'book-item__note'
      note.textContent = item.note
      body.appendChild(note)
    }
    el.append(num, body)
    itemsBox.appendChild(el)
    return el.getBoundingClientRect().height
  }

  const result: BookPage[] = []
  for (const section of menu) {
    let current: MenuItem[] = []
    let used = 0
    let continued = false
    const flush = () => {
      if (!current.length) return
      result.push({ category: section.category, items: current, continued })
      continued = true
      current = []
      used = 0
    }
    for (const item of section.items) {
      const h = itemHeight(item)
      if (current.length && used + h > availableHeight) flush()
      current.push(item)
      used += h
    }
    flush()
  }

  document.body.removeChild(stage)
  return result
}

const totalContentPages = computed(() => pages.value.length)

// +1 accounts for the front cover occupying flip-index 0.
const bookmarks = computed(() => {
  const marks = props.menu.map(section => ({
    category: section.category,
    flipIndex: pages.value.findIndex(p => p.category === section.category && !p.continued) + 1,
  }))
  return marks.map((m, i) => ({
    ...m,
    end: i + 1 < marks.length ? marks[i + 1].flipIndex - 1 : totalContentPages.value,
  }))
})

const bookEl = ref<HTMLElement | null>(null)
const currentFlipIndex = ref(0)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pageFlip: any = null

onMounted(async () => {
  const scopedAttr = bookEl.value
    ? [...bookEl.value.attributes].find(a => a.name.startsWith('data-v-'))?.name
    : undefined
  pages.value = measurePages(props.menu, scopedAttr)
  await nextTick()
  if (!bookEl.value) return

  const { PageFlip } = await import('page-flip')
  pageFlip = new PageFlip(bookEl.value, {
    width: 380,
    height: 560,
    size: 'stretch',
    minWidth: 280,
    maxWidth: 560,
    minHeight: 420,
    maxHeight: 820,
    maxShadowOpacity: 0.4,
    showCover: true,
    mobileScrollSupport: false,
    usePortrait: true,
    flippingTime: 700,
  })
  pageFlip.loadFromHTML(bookEl.value.querySelectorAll('.book-page'))
  currentFlipIndex.value = pageFlip.getCurrentPageIndex()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageFlip.on('flip', (e: any) => { currentFlipIndex.value = e.data })
})

onBeforeUnmount(() => {
  pageFlip?.destroy()
})

function goToFlipIndex(i: number) {
  pageFlip?.turnToPage(i)
}
function prevPage() { pageFlip?.flipPrev() }
function nextPage() { pageFlip?.flipNext() }
</script>

<template>
  <div class="book-wrap">
    <!-- Bookmarks -->
    <nav class="book-bookmarks">
      <button
        v-for="b in bookmarks"
        :key="b.category"
        type="button"
        class="bookmark"
        :class="{ 'bookmark--active': currentFlipIndex >= b.flipIndex && currentFlipIndex <= b.end }"
        @click="goToFlipIndex(b.flipIndex)"
      >
        {{ b.category }}
      </button>
    </nav>

    <div class="book-stage">
      <button type="button" class="book-arrow book-arrow--prev" :aria-label="labels.prev" @click="prevPage">‹</button>

      <div class="book-shadow">
        <div class="book-spine" />
        <div ref="bookEl" class="book">
          <!-- Front cover -->
          <div class="book-page book-cover" data-density="hard">
            <div class="book-cover__inner">
              <p class="book-cover__eyebrow">{{ labels.kicker }}</p>
              <div class="book-cover__ornament">✦</div>
              <h2 class="book-cover__title">{{ coverTitle[0] }}<br><em>{{ coverTitle[1] }}</em></h2>
              <div class="book-cover__rule" />
              <p class="book-cover__sub">{{ labels.section }}</p>
            </div>
          </div>

          <div v-for="(page, i) in pages" :key="i" class="book-page" data-density="soft">
            <div class="book-page__inner">
              <p class="book-page__eyebrow">{{ labels.name }}</p>
              <h3 class="book-page__title">
                {{ page.category }}<span v-if="page.continued" class="book-page__cont"> — c.d.</span>
              </h3>
              <div class="book-page__rule" />
              <div class="book-page__items">
                <div v-for="(item, j) in page.items" :key="item.name" class="book-item">
                  <span class="book-item__num">{{ romanNumerals[j] }}.</span>
                  <div class="book-item__body">
                    <p class="book-item__name">{{ item.name }}</p>
                    <p v-if="item.note" class="book-item__note">{{ item.note }}</p>
                  </div>
                </div>
              </div>
              <p class="book-page__num">{{ i + 1 }}</p>
            </div>
          </div>

          <!-- Back cover -->
          <div class="book-page book-cover book-cover--back" data-density="hard">
            <div class="book-cover__inner">
              <div class="book-cover__ornament">✦</div>
              <p class="book-cover__closing">{{ labels.end }}</p>
              <div class="book-cover__rule" />
              <p class="book-cover__eyebrow">{{ labels.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <button type="button" class="book-arrow book-arrow--next" :aria-label="labels.next" @click="nextPage">›</button>
    </div>
  </div>
</template>

<style scoped>
.book-wrap {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

/* ── Bookmarks ── */
.book-bookmarks {
  display: none;
}
@media (min-width: 1024px) {
  .book-bookmarks {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 12rem;
    position: sticky;
    top: 2.5rem;
  }
}
.bookmark {
  text-align: left;
  background: transparent;
  border: none;
  border-left: 2px solid rgba(28, 42, 28, 0.12);
  padding: 0.6rem 0 0.6rem 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 15px;
  letter-spacing: 0.03em;
  color: #5C6B5C;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.bookmark:hover { color: #1C2A1C; }
.bookmark--active {
  color: #1C2A1C;
  font-weight: 400;
  border-left-color: #8B6814;
}

/* ── Stage ── */
.book-stage {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.book-arrow {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid rgba(139, 104, 20, 0.3);
  background: transparent;
  color: #8B6814;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.book-arrow:hover { background: #8B6814; color: #F2E8D0; }

/* ── Book shell: shadow beneath + stacked-page edges + spine ── */
.book-shadow {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  max-width: 640px;
  margin: 0 auto;
  filter: drop-shadow(0 28px 38px rgba(0, 0, 0, 0.35)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
}
.book-shadow::before,
.book-shadow::after {
  content: '';
  position: absolute;
  top: 5px;
  bottom: 5px;
  width: 7px;
  background: repeating-linear-gradient(
    to bottom,
    #ddd0ad 0px, #ddd0ad 2px,
    #c7b587 2px, #c7b587 4px
  );
  border: 1px solid rgba(28, 42, 28, 0.15);
}
.book-shadow::before { left: -5px; border-radius: 3px 0 0 3px; }
.book-shadow::after { right: -5px; border-radius: 0 3px 3px 0; }
.book-spine {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 44px;
  margin-left: -22px;
  pointer-events: none;
  z-index: 5;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(28, 42, 28, 0.16) 42%,
    rgba(28, 42, 28, 0.22) 50%,
    rgba(28, 42, 28, 0.16) 58%,
    transparent 100%
  );
}
@media (max-width: 1023px) {
  .book-spine { display: none; }
}

.book {
  width: 100%;
}

/* ── Page content ── */
.book-page {
  background: #E8DCC0;
  width: 100%;
  height: 100%;
}
.book-page__inner {
  position: relative;
  height: 100%;
  padding: 2.75rem 2.25rem 2rem;
  display: flex;
  flex-direction: column;
}
.book-page__eyebrow {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #8B6814;
  margin-bottom: 0.5rem;
}
.book-page__title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  letter-spacing: 0.04em;
  line-height: 1.05;
  color: #1C2A1C;
}
.book-page__cont {
  font-size: 0.55em;
  font-style: italic;
  color: #5C6B5C;
}
.book-page__rule {
  width: 2.5rem;
  height: 1px;
  background: #8B6814;
  margin: 0.9rem 0 1.25rem;
}
.book-page__items {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.book-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(28, 42, 28, 0.08);
}
.book-item:last-child { border-bottom: none; }
.book-item__num {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 11px;
  color: #C9A96E;
  width: 1.4rem;
  text-align: right;
  flex-shrink: 0;
  padding-top: 2px;
  line-height: 1;
}
.book-item__name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.25;
  color: #1C2A1C;
}
.book-item__note {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 11px;
  color: #5C6B5C;
  margin-top: 2px;
  line-height: 1.4;
}
.book-page__num {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 11px;
  color: #5C6B5C;
  margin-top: 0.75rem;
}

/* ── Covers ── */
.book-cover {
  background: linear-gradient(160deg, #16241a 0%, #0e160f 100%);
}
.book-cover__inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}
.book-cover .book-cover__eyebrow {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #C9A96E;
}
.book-cover__ornament {
  color: #C9A96E;
  font-size: 1.1rem;
  margin: 1.1rem 0;
}
.book-cover__title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 0.06em;
  line-height: 1.15;
  color: #F2E8D0;
}
.book-cover__title em { font-style: italic; color: #C9A96E; }
.book-cover__rule {
  width: 2.5rem;
  height: 1px;
  background: #C9A96E;
  margin-top: 1.25rem;
}
.book-cover__sub {
  margin-top: 0.9rem;
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #F2E8D0;
  opacity: 0.6;
}
.book-cover__closing {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.4rem;
  color: #F2E8D0;
  margin-top: 0.5rem;
}

/* ── Mobile bookmarks (horizontal, above book) ── */
@media (max-width: 1023px) {
  .book-wrap { flex-direction: column; }
  .book-bookmarks {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    gap: 0.25rem;
    position: static;
    scrollbar-width: none;
  }
  .book-bookmarks::-webkit-scrollbar { display: none; }
  .bookmark {
    flex-shrink: 0;
    white-space: nowrap;
    border-left: none;
    border-bottom: 2px solid rgba(28, 42, 28, 0.12);
    padding: 0.5rem 0.85rem;
  }
  .bookmark--active { border-bottom-color: #8B6814; }

  .book-stage {
    gap: 0.25rem;
    padding: 0 0.25rem;
  }
  .book-arrow {
    width: 2rem;
    height: 2rem;
    font-size: 18px;
  }
}
</style>
