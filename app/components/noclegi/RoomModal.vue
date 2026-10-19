<script setup lang="ts">
/**
 * Szczegóły kafelka ze strony Pokoje: duże zdjęcie z miniaturkami po lewej, opis i rezerwacja po prawej.
 * Na telefonie na cały ekran: zdjęcie u góry, treść przewijana, przycisk rezerwacji przypięty na dole.
 * Esc zamyka, strzałki zmieniają zdjęcie.
 */
const props = defineProps<{
  room: { tag?: string; title?: string; size?: string; occupancy?: number; desc?: string; amenities: string[]; images: string[] }
  /** Napisy z formularza „Pokoje i apartamenty” (labelSize, labelMax, labelAmenities, occupancyValue, cta, ctaHref). */
  labels: Record<string, any>
}>()
const emit = defineEmits<{ close: [] }>()

// Bez await: okno montuje się po kliknięciu, a komponent z await w setupie wstrzymałby wtedy
// całą stronę (Suspense). Ustawienia są już pobrane przez stronę — bierzemy je z pamięci podręcznej.
const { data: ustawienia } = useNuxtData<Record<string, any>>('cms-ustawienia')

const index = ref(0)
const count = computed(() => props.room.images.length)
const next = () => { index.value = (index.value + 1) % count.value }
const prev = () => { index.value = (index.value - 1 + count.value) % count.value }

const closeBtn = ref<HTMLButtonElement | null>(null)
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  else if (count.value > 1 && e.key === 'ArrowRight') next()
  else if (count.value > 1 && e.key === 'ArrowLeft') prev()
}
onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
  closeBtn.value?.focus()
})
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="room-backdrop" @click.self="emit('close')">
    <div class="room-panel" role="dialog" aria-modal="true" aria-labelledby="room-modal-title">

      <!-- Gallery -->
      <div class="room-gallery">
        <img v-if="room.images[index]" :key="room.images[index]" :src="room.images[index]" :alt="room.title" class="room-gallery__img" />

        <template v-if="count > 1">
          <button type="button" class="room-arrow room-arrow--prev" :aria-label="ustawienia?.prevPhoto" @click="prev">
            <svg width="9" height="16" viewBox="0 0 8 14" fill="none" aria-hidden="true"><path d="M7 1L1 7l6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" class="room-arrow room-arrow--next" :aria-label="ustawienia?.nextPhoto" @click="next">
            <svg width="9" height="16" viewBox="0 0 8 14" fill="none" aria-hidden="true"><path d="M1 1l6 6-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span class="room-counter">{{ index + 1 }} / {{ count }}</span>

          <div class="room-thumbs">
            <button
              v-for="(img, i) in room.images"
              :key="img"
              type="button"
              class="room-thumb"
              :class="{ 'room-thumb--active': i === index }"
              :aria-label="fill(ustawienia?.photoN, i + 1)"
              :aria-current="i === index"
              @click="index = i"
            >
              <img :src="img" alt="" />
            </button>
          </div>
        </template>
      </div>

      <!-- Details -->
      <div class="room-details">
        <button ref="closeBtn" type="button" class="room-close" :aria-label="ustawienia?.close" @click="emit('close')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </button>

        <div class="room-scroll">
          <p class="room-tag">{{ room.tag }}</p>
          <h2 id="room-modal-title" class="room-title">{{ room.title }}</h2>
          <div class="room-rule" />

          <dl class="room-meta">
            <div v-if="room.size" class="room-meta__item">
              <span class="room-meta__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
              </span>
              <div>
                <dt>{{ labels.labelSize }}</dt>
                <dd>{{ room.size }}</dd>
              </div>
            </div>
            <div v-if="room.occupancy" class="room-meta__item">
              <span class="room-meta__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.8a3.2 3.2 0 010 6.4M18 14.4c1.8.8 3 2.6 3 4.6"/></svg>
              </span>
              <div>
                <dt>{{ labels.labelMax }}</dt>
                <dd>{{ fill(labels.occupancyValue, room.occupancy) }}</dd>
              </div>
            </div>
          </dl>

          <p v-if="room.desc" class="room-desc">{{ room.desc }}</p>

          <template v-if="room.amenities.length">
            <p class="room-subhead">{{ labels.labelAmenities }}</p>
            <ul class="room-amenities">
              <li v-for="a in room.amenities" :key="a">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
                {{ a }}
              </li>
            </ul>
          </template>
        </div>

        <!-- CTA (przypięty na dole kolumny) -->
        <div v-if="labels.cta && labels.ctaHref" class="room-cta-bar">
          <a :href="labels.ctaHref" target="_blank" rel="noopener" class="room-cta">
            {{ labels.cta }}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Odcienie jak białe kafelki (kontrast WCAG AA na bieli). */
.room-backdrop {
  --ink: #1E2B1E;
  --stone: #4C594B;
  --gold: #7A5C1E;
  --gold-soft: rgba(122, 92, 30, 0.14);

  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(8, 12, 8, 0.78);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.room-panel {
  width: 100%;
  max-width: 1080px;
  height: min(640px, 88vh);
  display: grid;
  grid-template-columns: 7fr 5fr;
  background: #FFFFFF;
  overflow: hidden;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55);
}

/* ── Gallery ── */
.room-gallery {
  position: relative;
  background: #0e160e;
  min-height: 0;
}
.room-gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: photo-in 0.35s ease;
}
@keyframes photo-in { from { opacity: 0.4; } to { opacity: 1; } }

.room-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.room-arrow:hover { background: #FFFFFF; transform: translateY(-50%) scale(1.06); }
.room-arrow--prev { left: 18px; }
.room-arrow--next { right: 18px; }

.room-counter {
  position: absolute;
  top: 18px;
  left: 18px;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #FFFFFF;
  background: rgba(14, 22, 14, 0.6);
  backdrop-filter: blur(4px);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
}

.room-thumbs {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 8px;
  padding: 40px 18px 18px;
  overflow-x: auto;
  scrollbar-width: none;
  background: linear-gradient(to top, rgba(8, 12, 8, 0.65), transparent);
}
.room-thumbs::-webkit-scrollbar { display: none; }
.room-thumb {
  flex-shrink: 0;
  width: 64px;
  height: 46px;
  overflow: hidden;
  border: 2px solid transparent;
  opacity: 0.65;
  transition: opacity 0.2s ease, border-color 0.2s ease;
}
.room-thumb img { width: 100%; height: 100%; object-fit: cover; }
.room-thumb:hover { opacity: 1; }
.room-thumb--active { opacity: 1; border-color: #FFFFFF; }

/* ── Details ── */
.room-details {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.room-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--stone);
  border: 1px solid var(--gold-soft);
  background: #FFFFFF;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.room-close:hover { color: var(--ink); border-color: var(--gold); }

.room-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 2.75rem 2.5rem 1.5rem;
}
.room-tag {
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.6rem;
  padding-right: 3rem;
}
.room-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 3vw, 2.6rem);
  line-height: 1.05;
  color: var(--ink);
}
.room-rule {
  width: 2.5rem;
  height: 1px;
  background: var(--gold);
  margin: 1.25rem 0 1.5rem;
}

.room-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(30, 43, 30, 0.1);
}
.room-meta__item { display: flex; align-items: center; gap: 0.75rem; }
.room-meta__icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(122, 92, 30, 0.3);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.room-meta dt {
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stone);
}
.room-meta dd {
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  color: var(--ink);
  margin-top: 2px;
}

.room-desc {
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--stone);
  margin-bottom: 1.75rem;
}
.room-subhead {
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.9rem;
}
.room-amenities {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem;
}
.room-amenities li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  line-height: 1.45;
  color: var(--ink);
}
.room-amenities svg { color: var(--gold); flex-shrink: 0; margin-top: 3px; }

.room-cta-bar {
  padding: 1.25rem 2.5rem 1.75rem;
  border-top: 1px solid rgba(30, 43, 30, 0.08);
  background: #FFFFFF;
}
.room-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--gold);
  color: #FFFFFF;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: background-color 0.25s ease;
}
.room-cta:hover { background: var(--ink); }

/* ── Telefon / tablet: na cały ekran, zdjęcie u góry ── */
@media (max-width: 860px) {
  .room-backdrop { padding: 0; }
  .room-panel {
    height: 100%;
    max-height: none;
    grid-template-columns: 1fr;
    grid-template-rows: 42vh 1fr;
  }
  .room-scroll { padding: 1.75rem 1.5rem 1rem; }
  .room-cta-bar { padding: 1rem 1.5rem calc(1rem + env(safe-area-inset-bottom)); }
  .room-close {
    position: fixed;
    top: 14px;
    right: 14px;
    background: rgba(255, 255, 255, 0.92);
    border-color: transparent;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  }
  .room-tag { padding-right: 0; }
  .room-arrow { width: 38px; height: 38px; }
  .room-arrow--prev { left: 12px; }
  .room-arrow--next { right: 12px; }
  .room-thumbs { padding: 30px 12px 12px; }
  .room-thumb { width: 52px; height: 38px; }
}

/* ── Wejście/wyjście (Transition „modal” w pokoje.vue) ── */
.modal-enter-active { transition: opacity 0.3s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .room-panel { animation: panel-in 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes panel-in {
  from { transform: translateY(24px) scale(0.98); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
</style>
