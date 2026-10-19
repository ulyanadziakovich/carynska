<script setup lang="ts">
import { paginateMenu, BOOK_PAGE_WIDTH, BOOK_PAGE_HEIGHT, type BookPage, type MenuSection } from '~/utils/bookPagination'
import MenuPage from './tawerna-book/MenuPage.vue'

const props = defineProps<{
  menu: MenuSection[]
  /** Napisy książki z CMS (formularz „Tawerna” → „Karta dań (książka)”). */
  labels: { kicker?: string; title?: string; name?: string; section?: string; end?: string; continued?: string; prev?: string; next?: string }
}>()
/** Tytuł okładki: pierwsza linia zwykła, druga pochylona („Karta” / „Dań”). */
const coverTitle = computed(() => lines(props.labels.title))

const pages = ref<BookPage[]>([])

// +1 accounts for the front cover occupying flip-index 0.
const bookmarks = computed(() => {
  const marks = props.menu.map(section => ({
    category: section.category,
    flipIndex: pages.value.findIndex(p => p.category === section.category && !p.continued) + 1,
  }))
  return marks.map((m, i) => ({
    ...m,
    end: i + 1 < marks.length ? marks[i + 1].flipIndex - 1 : pages.value.length,
  }))
})

const bookEl = ref<HTMLElement | null>(null)
const currentFlipIndex = ref(0)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pageFlip: any = null

onMounted(async () => {
  // Mierzymy stronę stylami komponentu, który ją rysuje — jego atrybut data-v-… (scopeId).
  pages.value = paginateMenu(props.menu, { scopedAttr: (MenuPage as { __scopeId?: string }).__scopeId, eyebrow: props.labels.name })
  await nextTick()
  if (!bookEl.value) return

  const { PageFlip } = await import('page-flip')
  pageFlip = new PageFlip(bookEl.value, {
    width: BOOK_PAGE_WIDTH,
    height: BOOK_PAGE_HEIGHT,
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
</script>

<template>
  <div class="book-wrap">
    <TawernaBookBookmarks :bookmarks="bookmarks" :current="currentFlipIndex" @go="pageFlip?.turnToPage($event)" />

    <div class="book-stage">
      <button type="button" class="book-arrow book-arrow--prev" :aria-label="labels.prev" @click="pageFlip?.flipPrev()">‹</button>

      <div class="book-shadow">
        <div class="book-spine" />
        <div ref="bookEl" class="book">
          <TawernaBookCover :kicker="labels.kicker" :title="coverTitle" :sub="labels.section" />
          <MenuPage
            v-for="(page, i) in pages"
            :key="i"
            :page="page"
            :number="i + 1"
            :eyebrow="labels.name"
            :continued-label="labels.continued"
          />
          <TawernaBookCover back :closing="labels.end" :name="labels.name" />
        </div>
      </div>

      <button type="button" class="book-arrow book-arrow--next" :aria-label="labels.next" @click="pageFlip?.flipNext()">›</button>
    </div>
  </div>
</template>

<style scoped>
.book-wrap {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
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

/* ── Mobile ── */
@media (max-width: 1023px) {
  .book-wrap { flex-direction: column; }

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
