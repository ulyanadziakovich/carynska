<script setup lang="ts">
interface Tile {
  id: string
  tag: string
  title: string
  icon: string
  image: string
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
    tiles: Tile[]
  }
}>()

const activeModal = ref<Tile | null>(null)
const tileRefs = ref<HTMLElement[]>([])

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
})
</script>

<template>
  <section class="bg-white">

    <!-- ── Hero image + text ── -->
    <div class="relative h-[70vh] min-h-[500px]">
      <img :src="data.image.src" :alt="data.image.alt" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/30 to-forest/80" />

      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p v-reveal class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-5">{{ data.tag }}</p>
        <h2
          v-reveal="{ delay: 100 }"
          class="font-display text-white font-light tracking-[0.15em] leading-none whitespace-pre-line"
          style="font-size: clamp(2.8rem, 6vw, 5.5rem)"
        >{{ data.title }}</h2>
        <div v-reveal="{ delay: 200 }" class="w-8 h-px bg-gold mt-8 mb-8" />
        <p v-reveal="{ delay: 280 }" class="text-white/60 font-sans font-light text-sm max-w-md leading-relaxed">{{ data.body }}</p>
        <NuxtLink
          v-reveal="{ delay: 380 }"
          :to="data.cta.href"
          class="mt-10 inline-flex items-center gap-3 border border-gold/60 text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-7 py-3 text-[11px] tracking-[0.2em] uppercase font-sans"
        >{{ data.cta.label }}</NuxtLink>
      </div>
    </div>

    <!-- ── 4 tiles ── -->
    <div class="grid grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(tile, i) in data.tiles"
        :key="tile.id"
        :ref="el => { if (el) tileRefs[i] = el as HTMLElement }"
        class="tile"
        :class="tile.from === 'left' ? 'tile-from-left' : 'tile-from-right'"
        :style="`transition-delay: ${i * 80}ms`"
        @click="openModal(tile)"
        role="button"
        :aria-label="tile.title"
      >
        <!-- photo bg -->
        <img :src="tile.image" :alt="tile.title" class="tile-photo" />
        <div class="tile-overlay" />

        <!-- text -->
        <div class="tile-content">
          <p class="tile-tag">{{ tile.tag }}</p>
          <h3 class="tile-title">{{ tile.title }}</h3>
          <div class="tile-hint">
            <span class="tile-hint-dot" />
            <span>Kliknij, aby dowiedzieć się więcej</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Modal ── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="activeModal" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-box">
            <button @click="closeModal" class="modal-close" aria-label="Zamknij">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>

            <!-- Photo header -->
            <div class="modal-photo">
              <img :src="activeModal.image" :alt="activeModal.modalTitle" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
            </div>

            <p class="modal-tag">Przystań Caryńska</p>
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
/* ── Tiles ── */
.tile {
  position: relative;
  height: 340px;
  overflow: hidden;
  cursor: pointer;
  border-right: 1px solid rgba(201, 169, 110, 0.12);
  border-top: 1px solid rgba(201, 169, 110, 0.12);
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.tile:last-child { border-right: none; }
.tile-from-left  { transform: translateX(-60px); }
.tile-from-right { transform: translateX(60px); }
.tile-from-left.tile-in,
.tile-from-right.tile-in { opacity: 1; transform: translateX(0); }

.tile-photo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.tile:hover .tile-photo { transform: scale(1.07); }

.tile-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(14,22,14,0.92) 0%, rgba(14,22,14,0.45) 50%, rgba(14,22,14,0.2) 100%);
  transition: background 0.4s ease;
}
.tile:hover .tile-overlay {
  background: linear-gradient(to top, rgba(14,22,14,0.88) 0%, rgba(14,22,14,0.38) 55%, rgba(14,22,14,0.15) 100%);
}

.tile-content {
  position: absolute; bottom: 0; inset-x: 0;
  padding: 20px;
}
.tile-tag {
  font-family: 'Raleway', sans-serif;
  font-size: 7.5px; letter-spacing: 0.28em; text-transform: uppercase;
  color: rgba(201, 169, 110, 0.65); margin-bottom: 5px;
}
.tile-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.35rem; font-weight: 300; font-style: italic;
  color: rgba(255,255,255,0.92); line-height: 1.1;
}
.tile-hint {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 10px;
  font-family: 'Raleway', sans-serif;
  font-size: 7.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.45);
  transition: color 0.3s ease;
}
.tile:hover .tile-hint { color: rgba(201, 169, 110, 0.75); }

.tile-hint-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: rgba(201, 169, 110, 0.5);
  flex-shrink: 0;
  animation: hint-pulse 2s ease-in-out infinite;
}

@keyframes hint-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.4); }
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(14, 22, 14, 0.7);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal-box {
  position: relative;
  background: #fff;
  border: 1px solid rgba(22, 32, 22, 0.08);
  box-shadow: 0 24px 80px rgba(0,0,0,0.18);
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
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(6px);
  border-radius: 50%;
  color: rgba(22, 32, 22, 0.6);
  transition: color 0.2s, background 0.2s;
}
.modal-close:hover { color: #162016; background: #fff; }

.modal-tag {
  font-family: 'Raleway', sans-serif;
  font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase;
  color: rgba(201, 169, 110, 0.7); margin-bottom: 10px;
}
.modal-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 300; font-style: italic;
  color: #162016; line-height: 1.15;
}
.modal-line {
  width: 32px; height: 1px;
  background: #C9A96E;
  margin: 20px 0 24px;
  opacity: 0.6;
}
.modal-body { margin-bottom: 24px; }
.modal-para {
  font-family: 'Raleway', sans-serif;
  font-size: 13px; font-weight: 300;
  line-height: 1.85; color: rgba(22, 32, 22, 0.6);
  margin-bottom: 12px;
}
.modal-para:last-child { margin-bottom: 0; }
.modal-chips {
  display: flex; flex-wrap: wrap; gap: 7px;
  padding-top: 20px;
  border-top: 1px solid rgba(22, 32, 22, 0.08);
}
.modal-chip {
  font-family: 'Raleway', sans-serif;
  font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(22, 32, 22, 0.5);
  border: 1px solid rgba(22, 32, 22, 0.15);
  padding: 5px 10px;
}

.modal-enter-active { transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from   { opacity: 0; transform: scale(0.96) translateY(10px); }
.modal-leave-to     { opacity: 0; }
</style>
