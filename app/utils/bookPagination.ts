/**
 * Dzielenie karty dań na strony książki (TawernaBook): mierzy prawdziwą wysokość
 * każdej pozycji i przenosi na kolejną stronę to, co się nie mieści.
 */
export interface MenuItem { name: string; note?: string }
export interface MenuSection { category: string; items: MenuItem[] }
export interface BookPage { category: string; items: MenuItem[]; continued: boolean }

// Design aspect ratio matches the PageFlip width/height options in TawernaBook —
// 'stretch' sizing scales both proportionally, so measuring at a fixed
// representative width gives a page-content height that stays valid
// across breakpoints.
export const BOOK_PAGE_WIDTH = 380
export const BOOK_PAGE_HEIGHT = 560
const MEASURE_WIDTH = 300
const PAGE_ASPECT = BOOK_PAGE_HEIGHT / BOOK_PAGE_WIDTH
// Safety margin: real rendered width can differ slightly from the
// measurement width, so pack pages a bit under capacity rather than exactly
// at it — under-filling a page is harmless, overflowing one hides items.
const SAFETY_FACTOR = 0.92

/**
 * Scoped styles only apply to elements carrying Vue's data-v-xxxx attribute;
 * elements built by hand via document.createElement don't get it automatically,
 * so `scopedAttr` must be the one of the component that styles the page
 * (TawernaBookMenuPage) — otherwise every height comes back as if unstyled
 * (no padding/font-size), wildly undercounting how much fits on a page.
 */
export function paginateMenu(menu: MenuSection[], opts: { scopedAttr?: string; eyebrow?: string }): BookPage[] {
  const tag = <T extends HTMLElement>(el: T, className: string, text?: string): T => {
    el.className = className
    if (opts.scopedAttr) el.setAttribute(opts.scopedAttr, '')
    if (text !== undefined) el.textContent = text
    return el
  }

  const stage = document.createElement('div')
  stage.style.cssText = `position:fixed; left:-9999px; top:0; width:${MEASURE_WIDTH}px; visibility:hidden;`
  document.body.appendChild(stage)

  const shell = tag(document.createElement('div'), 'book-page')
  shell.style.width = `${MEASURE_WIDTH}px`
  shell.style.height = `${Math.round(MEASURE_WIDTH * PAGE_ASPECT)}px`
  const inner = tag(document.createElement('div'), 'book-page__inner')
  const itemsBox = tag(document.createElement('div'), 'book-page__items')
  inner.append(
    tag(document.createElement('p'), 'book-page__eyebrow', opts.eyebrow ?? ''),
    tag(document.createElement('h3'), 'book-page__title', 'Kategoria'),
    tag(document.createElement('div'), 'book-page__rule'),
    itemsBox,
    tag(document.createElement('p'), 'book-page__num', '1'),
  )
  shell.appendChild(inner)
  stage.appendChild(shell)

  const availableHeight = itemsBox.getBoundingClientRect().height * SAFETY_FACTOR

  function itemHeight(item: MenuItem): number {
    itemsBox.replaceChildren()
    const el = tag(document.createElement('div'), 'book-item')
    const body = tag(document.createElement('div'), 'book-item__body')
    body.appendChild(tag(document.createElement('p'), 'book-item__name', item.name))
    if (item.note) body.appendChild(tag(document.createElement('p'), 'book-item__note', item.note))
    el.append(tag(document.createElement('span'), 'book-item__num', 'I.'), body)
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
