<script setup lang="ts">
interface Tile {
  icon?: string
  tag: string
  title: string
  image?: string
  from: string
  modalTitle: string
  modalBody: string[]
  highlights: string[]
}

defineProps<{
  data: {
    tag: string
    title: string
    body: string
    image: { src: string; alt: string }
    cta: { label: string; href: string }
    hint?: string
    tiles: Tile[]
  }
}>()

const { ustawienia } = await useSite()

const activeModal = ref<Tile | null>(null)
const tileRefs = ref<HTMLElement[]>([])
const photoEl = ref<HTMLElement | null>(null)
const tilesEl = ref<HTMLElement | null>(null)

function openModal(tile: Tile) { activeModal.value = tile }
function closeModal() { activeModal.value = null }

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('tile-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 }
  )
  tileRefs.value.forEach((el) => el && observer.observe(el))

  // Kafelki jadą w górę szybciej niż strona i wjeżdżają na dół zdjęcia; zdjęcie przy tym
  // lekko ciemnieje i się oddala (efekt głębi). Postęp 0–1 w zmiennej CSS --cover.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  let frame = 0
  const update = () => {
    frame = 0
    const photo = photoEl.value, tiles = tilesEl.value
    if (!photo || !tiles) return
    // 0 = dół zdjęcia właśnie doszedł do dołu ekranu (kafelki zaczynają być widoczne),
    // 1 = góra zdjęcia doszła pod menu — w tym czasie kafelki wyraźnie wjeżdżają na zdjęcie
    const r = photo.getBoundingClientRect(), vh = window.innerHeight
    const range = Math.max(1, vh - r.height - 80)
    const progress = Math.min(1, Math.max(0, (vh - r.bottom) / range))
    photo.style.setProperty('--cover', progress.toFixed(3))
    tiles.style.setProperty('--cover', progress.toFixed(3))
  }
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
  stopCover = () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (frame) cancelAnimationFrame(frame)
  }
})
let stopCover = () => {}
onUnmounted(() => stopCover())
</script>

<template>
  <section class="atr relative bg-forest-void">

    <!-- Róża wiatrów na styku z poprzednią sekcją — łączy Noclegi z Atrakcjami -->
    <div v-reveal="{ variant: 'scale' }" class="atr-emblem" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round">
        <circle cx="24" cy="24" r="22" opacity="0.5" />
        <circle cx="24" cy="24" r="16.5" stroke-dasharray="1.2 2.2" opacity="0.7" />
        <path d="M24 4 L26.6 21.4 L24 24 L21.4 21.4 Z" />
        <path d="M24 44 L26.6 26.6 L24 24 L21.4 26.6 Z" />
        <path d="M44 24 L26.6 26.6 L24 24 L26.6 21.4 Z" />
        <path d="M4 24 L21.4 21.4 L24 24 L21.4 26.6 Z" />
        <path d="M24 24 L32 16 M24 24 L16 32 M24 24 L32 32 M24 24 L16 16" opacity="0.45" />
      </svg>
    </div>

    <!-- ── Zdjęcie + tekst (niskie); przy przewijaniu kafelki najeżdżają na jego dół ── -->
    <div ref="photoEl" class="atr-photo">
      <div class="atr-photo__inner">
        <img v-if="data.image.src" :src="data.image.src" :alt="data.image.alt" class="w-full h-full object-cover" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
      <div class="atr-photo__shade" />

      <!-- Grafika: zarys gór i fale na dole zdjęcia -->
      <svg class="absolute bottom-0 inset-x-0 w-full h-28 lg:h-36 text-gold pointer-events-none" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M0 120 L120 70 L210 95 L340 40 L470 88 L590 30 L700 78 L820 22 L950 70 L1080 38 L1200 84 L1320 50 L1440 80" stroke="currentColor" stroke-width="1.2" opacity="0.45" />
        <path d="M0 140 Q60 130 120 140 T240 140 T360 140 T480 140 T600 140 T720 140 T840 140 T960 140 T1080 140 T1200 140 T1320 140 T1440 140" stroke="currentColor" stroke-width="1" opacity="0.35" />
        <path d="M0 152 Q60 144 120 152 T240 152 T360 152 T480 152 T600 152 T720 152 T840 152 T960 152 T1080 152 T1200 152 T1320 152 T1440 152" stroke="currentColor" stroke-width="1" opacity="0.2" />
      </svg>

      <div class="atr-photo__content absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p v-reveal class="text-gold text-[11px] tracking-[0.45em] uppercase font-sans mb-3" style="text-shadow: 0 1px 10px rgba(0,0,0,0.8)">{{ data.tag }}</p>
        <h2
          v-reveal="{ delay: 100 }"
          class="font-display text-white font-light tracking-[0.15em] leading-none whitespace-pre-line"
          style="font-size: clamp(2.3rem, 4.5vw, 4rem); text-shadow: 0 2px 30px rgba(0,0,0,0.45)"
        >{{ data.title }}</h2>
        <div v-reveal="{ delay: 200 }" class="w-8 h-px bg-gold my-5" />
        <p v-reveal="{ delay: 280 }" class="text-white/90 font-sans text-sm lg:text-base max-w-md leading-relaxed" style="text-shadow: 0 1px 12px rgba(0,0,0,0.85)">{{ data.body }}</p>
        <NuxtLink
          v-reveal="{ delay: 380 }"
          :to="data.cta.href"
          class="mt-6 inline-flex items-center gap-3 bg-gold text-forest hover:bg-gold-light transition-colors duration-300 px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase font-sans shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
        >
          {{ data.cta.label }}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- ── 4 tiles ── -->
    <div ref="tilesEl" class="atr-tiles relative z-10 bg-forest-void grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 p-2 lg:p-3 shadow-[0_-24px_50px_rgba(0,0,0,0.55)]">
      <div
        v-for="(tile, i) in data.tiles"
        :key="i"
        :ref="el => { if (el) tileRefs[i] = el as HTMLElement }"
        class="tile"
        :class="tile.from === 'left' ? 'tile-from-left' : 'tile-from-right'"
        :style="`transition-delay: ${i * 80}ms`"
        @click="openModal(tile)"
        role="button"
        :aria-label="tile.title"
      >
        <!-- photo bg -->
        <img v-if="tile.image" :src="tile.image" :alt="tile.title" class="tile-photo" />
        <div class="tile-overlay" />

        <!-- Ikonka w złotej ramce + duży, delikatny rysunek tej samej ikonki w rogu -->
        <span v-if="tile.icon" class="tile-icon" aria-hidden="true"><ActivityIcon :name="tile.icon" /></span>
        <span v-if="tile.icon" class="tile-art" aria-hidden="true"><ActivityIcon :name="tile.icon" /></span>

        <!-- text -->
        <div class="tile-content">
          <p class="tile-tag">{{ tile.tag }}</p>
          <h3 class="tile-title">{{ tile.title }}</h3>
          <!-- Komputer: po najechaniu kafelek ciemnieje i pokazuje opis — bez klikania -->
          <div class="tile-more" aria-hidden="true">
            <p class="tile-more__text">{{ tile.modalBody[0] }}</p>
            <div v-if="tile.highlights.length" class="tile-more__chips">
              <span v-for="h in tile.highlights.slice(0, 3)" :key="h" class="tile-more__chip">{{ h }}</span>
            </div>
          </div>
          <div class="tile-hint">
            <span>{{ data.hint }}</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="tile-hint-arrow">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Modal ── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="activeModal" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-box">
            <button @click="closeModal" class="modal-close" :aria-label="ustawienia?.close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>

            <!-- Photo header -->
            <div class="modal-photo">
              <img v-if="activeModal.image" :src="activeModal.image" :alt="activeModal.modalTitle" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#121c12] via-transparent to-transparent" />
            </div>

            <p class="modal-tag">{{ ustawienia?.siteName }}</p>
            <h2 class="modal-title">{{ activeModal.modalTitle }}</h2>
            <div class="modal-line" />

            <div class="modal-body">
              <p v-for="(para, i) in activeModal.modalBody" :key="i" class="modal-para">{{ para }}</p>
            </div>

            <div class="modal-chips">
              <span v-for="h in activeModal.highlights" :key="h" class="modal-chip">{{ h }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<style scoped>
/* ── Zdjęcie: niskie (--h); kafelki zachodzą na jego dół o --d.
   Na starcie kafelki są przesunięte w dół o --d, a przy przewijaniu (--cover 0→1) dojeżdżają
   na miejsce — szybciej niż strona, więc „najeżdżają” na zdjęcie. ── */
.atr { --h: 580px; --d: 200px; }
@media (max-width: 640px) { .atr { --h: 600px; --d: 150px; } }

.atr-photo {
  --cover: 0;
  position: relative;
  z-index: 0;
  height: var(--h);
  overflow: hidden;
}
.atr-photo__content { padding-bottom: var(--d); padding-top: 72px; } /* miejsce na różę wiatrów */
.atr-photo__inner {
  position: absolute; inset: 0;
  /* bez skalowania — zdjęcie zostaje ostre; głębię daje samo przyciemnienie */
}
.atr-photo__shade {
  position: absolute; inset: 0;
  background: #000;
  opacity: calc(var(--cover) * 0.4);
  pointer-events: none;
}
.atr-tiles {
  --cover: 0;
  margin-top: calc(-1 * var(--d));
  transform: translateY(calc((1 - var(--cover)) * var(--d)));
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .atr-tiles { transform: none; }
}

/* ── Róża wiatrów: sam złoty rysunek (line-art), w połowie nad poprzednią sekcją ── */
.atr-emblem {
  position: absolute;
  top: 0; left: 50%;
  z-index: 20;
  width: 120px; height: 120px;
  margin: -60px 0 0 -60px;
  color: #C9A96E;
  pointer-events: none;
  filter: drop-shadow(0 1px 6px rgba(0, 0, 0, 0.6));
}
.atr-emblem svg { width: 100%; height: 100%; }
@media (max-width: 640px) {
  .atr-emblem { width: 88px; height: 88px; margin: -44px 0 0 -44px; }
}

/* ── Tiles ── */
.tile {
  position: relative;
  height: 360px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(201, 169, 110, 0.15);
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease;
}
.tile:hover { border-color: rgba(201, 169, 110, 0.55); }
.tile-from-left  { transform: translateX(-60px); }
.tile-from-right { transform: translateX(60px); }
.tile-from-left.tile-in,
.tile-from-right.tile-in { opacity: 1; transform: translateX(0); }

.tile-photo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.tile:hover .tile-photo { transform: scale(1.05); }

/* Neutralny cień tylko u dołu — pod napisami; reszta zdjęcia w naturalnych kolorach */
.tile-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 65%);
}

.tile-icon {
  position: absolute; top: 16px; left: 16px; z-index: 1;
  display: flex; align-items: center; justify-content: center;
  width: 48px; height: 48px;
  border: 1px solid rgba(223, 185, 126, 0.55);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  color: #DFB97E;
  transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
}
.tile-icon :deep(svg) { width: 28px; height: 28px; }
.tile:hover .tile-icon { background: #C9A96E; color: #162016; border-color: #C9A96E; }
.tile-art {
  position: absolute; right: -14px; bottom: 54px;
  color: #DFB97E; opacity: 0.22;
  pointer-events: none;
  transition: opacity 0.5s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.tile-art :deep(svg) { width: 130px; height: 130px; }
.tile:hover .tile-art { opacity: 0.4; transform: rotate(-6deg) scale(1.05); }

.tile-content {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 22px;
}
.tile-tag {
  font-family: 'Raleway', sans-serif;
  font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
  color: #DFB97E; margin-bottom: 6px;
}
.tile-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.6rem; font-weight: 400; font-style: italic;
  color: #fff; line-height: 1.1;
}
.tile-hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.3s ease;
}
.tile:hover .tile-hint { color: #DFB97E; }
.tile-hint-arrow { transition: transform 0.3s ease; }
.tile:hover .tile-hint-arrow { transform: translateX(4px); }

/* Opis po najechaniu — tylko na urządzeniach z myszką (na telefonie kafelek otwiera okienko) */
.tile-more {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
}
.tile-more > * { overflow: hidden; }
.tile-more__text {
  margin-top: 12px;
  font-family: 'Raleway', sans-serif;
  font-size: 13px; line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
  display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical;
}
.tile-more__chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.tile-more__chip {
  font-family: 'Raleway', sans-serif;
  font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
  color: #DFB97E;
  border: 1px solid rgba(201, 169, 110, 0.4);
  padding: 4px 8px;
}
@media (hover: hover) and (min-width: 1024px) {
  .tile-overlay { transition: background 0.5s ease; }
  .tile:hover .tile-overlay { background: rgba(8, 12, 8, 0.82); }
  .tile:hover .tile-more { grid-template-rows: 1fr; opacity: 1; }
  .tile-more { display: grid; }
  .tile-more > div, .tile-more > p { min-height: 0; }
  /* Klikanie niepotrzebne — napis „Kliknij…” tylko na telefonie */
  .tile-hint { display: none; }
  .tile:hover .tile-art { opacity: 0.12; }
}
@media not ((hover: hover) and (min-width: 1024px)) {
  .tile-more { display: none; }
}

@media (max-width: 640px) {
  .tile { height: 280px; }
  .tile-content { padding: 14px; }
  .tile-icon { top: 10px; left: 10px; width: 38px; height: 38px; }
  .tile-icon :deep(svg) { width: 22px; height: 22px; }
  .tile-art :deep(svg) { width: 90px; height: 90px; }
  .tile-art { bottom: 70px; }
  .tile-title { font-size: 1.3rem; }
  .tile-tag, .tile-hint { font-size: 9px; letter-spacing: 0.12em; }
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal-box {
  position: relative;
  background: #121c12;
  border: 1px solid rgba(201, 169, 110, 0.3);
  box-shadow: 0 30px 90px rgba(0,0,0,0.6);
  max-width: 620px; width: 100%;
  max-height: 88vh; overflow-y: auto;
  padding: 48px 40px 36px;
  scrollbar-width: none;
}
@media (max-width: 640px) { .modal-box { padding: 40px 22px 28px; } }

.modal-photo {
  position: relative;
  height: 200px;
  margin: -48px -40px 28px;
  overflow: hidden;
}
@media (max-width: 640px) {
  .modal-photo { margin: -40px -22px 24px; }
}

.modal-close {
  position: absolute; top: 14px; right: 14px;
  z-index: 10;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(201, 169, 110, 0.4);
  border-radius: 50%;
  color: #DFB97E;
  transition: color 0.2s, background 0.2s;
}
.modal-close:hover { color: #162016; background: #C9A96E; }

.modal-tag {
  font-family: 'Raleway', sans-serif;
  font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
  color: #C9A96E; margin-bottom: 10px;
}
.modal-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 300; font-style: italic;
  color: #fff; line-height: 1.15;
}
.modal-line {
  width: 32px; height: 1px;
  background: #C9A96E;
  margin: 20px 0 24px;
  opacity: 0.8;
}
.modal-body { margin-bottom: 24px; }
.modal-para {
  font-family: 'Raleway', sans-serif;
  font-size: 14px; font-weight: 300;
  line-height: 1.85; color: rgba(255, 255, 255, 0.72);
  margin-bottom: 12px;
}
.modal-para:last-child { margin-bottom: 0; }
.modal-chips {
  display: flex; flex-wrap: wrap; gap: 7px;
  padding-top: 20px;
  border-top: 1px solid rgba(201, 169, 110, 0.15);
}
.modal-chip {
  font-family: 'Raleway', sans-serif;
  font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
  color: #DFB97E;
  border: 1px solid rgba(201, 169, 110, 0.35);
  padding: 5px 10px;
}

.modal-enter-active { transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from   { opacity: 0; transform: scale(0.96) translateY(10px); }
.modal-leave-to     { opacity: 0; }
</style>
