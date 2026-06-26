<script setup lang="ts">
defineProps<{
  data: {
    tag: string
    title: string
    body: string[]
    cta: { label: string; href: string }
    rooms: { type: string; image: string; capacity: string; size: string; features: string[]; view?: string }[]
  }
}>()

const active = ref(0)
const scrollEl = ref<HTMLElement | null>(null)

function onScroll() {
  if (!scrollEl.value) return
  const idx = Math.round(scrollEl.value.scrollLeft / scrollEl.value.clientWidth)
  active.value = idx
}

function scrollToRoom(i: number) {
  active.value = i
  scrollEl.value?.scrollTo({ left: i * (scrollEl.value.clientWidth), behavior: 'smooth' })
}
</script>

<template>
  <section class="bg-white">
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-[80vh]">

      <!-- Left: text -->
      <div class="flex flex-col justify-center px-12 lg:px-16 py-20 lg:py-24 relative">
        <div class="absolute left-0 top-1/4 w-px h-1/2 bg-gold/30 hidden lg:block" />

        <p v-reveal class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-6">{{ data.tag }}</p>

        <h2
          v-reveal="{ delay: 100 }"
          class="font-display text-forest font-light leading-tight mb-8 whitespace-pre-line"
          style="font-size: clamp(2.5rem, 4vw, 3.5rem)"
        >{{ data.title }}</h2>

        <div v-reveal="{ delay: 200 }" class="w-8 h-px bg-gold mb-8" />

        <p
          v-for="(paragraph, i) in data.body"
          :key="i"
          v-reveal="{ delay: 250 + i * 80 }"
          class="text-forest/60 font-sans font-light leading-relaxed text-sm"
          :class="i < data.body.length - 1 ? 'mb-4' : 'mb-10'"
        >{{ paragraph }}</p>

        <NuxtLink v-reveal="{ delay: 400 }" :to="data.cta.href" class="cta-btn">
          <span class="cta-shimmer" />
          <span>{{ data.cta.label }}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Right: room carousel -->
      <div class="relative flex flex-col overflow-hidden bg-white">

        <!-- Mobile: horizontal scroll snap -->
        <div
          ref="scrollEl"
          class="lg:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth min-h-[360px]"
          style="scrollbar-width: none;"
          @scroll="onScroll"
        >
          <div
            v-for="room in data.rooms"
            :key="room.type"
            class="snap-center shrink-0 w-full relative"
          >
            <img :src="room.image" :alt="room.type" class="w-full h-full object-cover" />
            <div class="absolute bottom-0 inset-x-0 room-info">
              <div class="px-6 py-5">
                <p class="text-gold/70 text-[9px] tracking-[0.3em] uppercase font-sans mb-1">Pokój</p>
                <h3 class="font-display text-white font-light text-2xl italic">{{ room.type }}</h3>
                <p v-if="room.view" class="text-white/70 text-[10px] tracking-[0.2em] uppercase font-sans mt-1">
                  Widok na {{ room.view }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: crossfade -->
        <div v-reveal="{ delay: 150 }" class="hidden lg:flex relative flex-1 items-center justify-center p-8 pb-4">
          <Transition v-for="(room, i) in data.rooms" :key="room.type" name="card-fade">
            <div v-if="active === i" class="room-frame">
              <img :src="room.image" :alt="room.type" class="w-full h-full object-cover" />
              <!-- Thin gold top border accent -->
              <div class="absolute top-0 left-8 right-8 h-px bg-gold/40" />
              <div class="absolute bottom-0 inset-x-0 room-info rounded-b-sm">
                <div class="px-8 py-6">
                  <p class="text-gold/70 text-[9px] tracking-[0.3em] uppercase font-sans mb-1">Pokój</p>
                  <h3 class="font-display text-white font-light text-3xl italic">{{ room.type }}</h3>
                  <p v-if="room.view" class="text-white/70 text-[10px] tracking-[0.2em] uppercase font-sans mt-2">
                    Widok na {{ room.view }}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between px-8 py-5 border-t border-forest/8 bg-white">
          <!-- Room tabs -->
          <div class="flex gap-6">
            <button
              v-for="(room, i) in data.rooms"
              :key="room.type"
              @click="scrollToRoom(i)"
              class="flex flex-col gap-1 group transition-all duration-200"
            >
              <span
                class="text-[10px] tracking-[0.2em] uppercase font-sans transition-colors duration-200"
                :class="active === i ? 'text-forest' : 'text-forest/35 group-hover:text-forest/60'"
              >{{ room.type }}</span>
              <span
                class="h-px transition-all duration-300"
                :class="active === i ? 'bg-gold w-full' : 'bg-forest/15 w-full'"
              />
            </button>
          </div>

          <!-- Arrows (desktop only) -->
          <div class="hidden lg:flex gap-2">
            <button
              @click="scrollToRoom((active - 1 + data.rooms.length) % data.rooms.length)"
              class="w-8 h-8 border border-forest/15 flex items-center justify-center text-forest/40 hover:border-gold hover:text-gold transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              @click="scrollToRoom((active + 1) % data.rooms.length)"
              class="w-8 h-8 border border-forest/15 flex items-center justify-center text-forest/40 hover:border-gold hover:text-gold transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  border: 1px solid #C9A96E;
  color: #C9A96E;
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  overflow: hidden;
  transition: color 0.3s, background 0.3s;
  animation: btn-pulse 2.6s ease-in-out infinite;
}
.cta-btn:hover {
  background: #C9A96E;
  color: #162016;
}
.cta-btn:hover .cta-shimmer { display: none; }

@keyframes btn-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 169, 110, 0.45); }
  55%       { box-shadow: 0 0 0 8px rgba(201, 169, 110, 0); }
}

.cta-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(201, 169, 110, 0.18) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: shimmer 2.6s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  60%  { background-position: -200% 0; }
  100% { background-position: -200% 0; }
}

.room-info {
  background: linear-gradient(to top, rgba(14, 22, 14, 0.88) 0%, rgba(14, 22, 14, 0.3) 70%, transparent 100%);
}

.room-frame {
  position: absolute;
  inset: 32px 32px 0;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(14, 22, 14, 0.18),
    0 4px 16px rgba(14, 22, 14, 0.10);
  border: 1px solid rgba(201, 169, 110, 0.15);
}

.view-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border: 1px solid rgba(201, 169, 110, 0.4);
  color: #C9A96E;
  font-family: 'Raleway', sans-serif;
  font-size: 8.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
  background: rgba(14, 22, 14, 0.3);
}

.card-fade-enter-active,
.card-fade-leave-active {
  transition: opacity 0.45s ease;
}
.card-fade-enter-from,
.card-fade-leave-to {
  opacity: 0;
}
</style>
