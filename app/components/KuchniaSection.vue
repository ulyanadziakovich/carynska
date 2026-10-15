<script setup lang="ts">
const props = defineProps<{
  data: {
    tag: string
    title: string
    body: string[]
    features: { icon?: string; label: string }[]
    cta: { label: string; href: string }
    images: { src: string; alt: string }[]
  }
}>()

const { ustawienia } = await useSite()

// Zdjęcia zmieniają się same co 5 s (przejście płynne); kropki przełączają ręcznie.
// Najechanie myszką wstrzymuje zmianę; kto ma wyłączone animacje — bez automatu.
const current = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
function show(i: number) { current.value = i }
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    const n = props.data.images.length
    if (!paused.value && n > 1) current.value = (current.value + 1) % n
  }, 5000)
})
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <section class="bg-forest-wash">
    <!-- Oddech po kafelkach atrakcji: złoty rysunek (talerz z kopułą) między liniami -->
    <div v-reveal class="flex items-center justify-center gap-6 pt-20 lg:pt-24 px-8" aria-hidden="true">
      <span class="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent to-gold/50" />
      <svg class="w-16 h-16 text-gold shrink-0" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 33h36" />
        <path d="M9 33a15 15 0 0 1 30 0" />
        <path d="M24 18v-3" /><circle cx="24" cy="13.5" r="1.6" />
        <path d="M15 27a10 10 0 0 1 5-6" opacity="0.6" />
        <path d="M4 37h40" opacity="0.6" />
      </svg>
      <span class="h-px w-24 sm:w-40 bg-gradient-to-l from-transparent to-gold/50" />
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 px-8 sm:px-12 lg:px-16 pt-12 lg:pt-14 pb-20 lg:pb-28 items-center">

      <!-- Lewa: tekst, co serwujemy, przycisk -->
      <div>
        <p v-reveal class="text-gold text-[10px] lg:text-[12px] tracking-[0.4em] uppercase font-sans mb-6">{{ data.tag }}</p>

        <h2
          v-reveal="{ delay: 100 }"
          class="font-display text-white font-light leading-tight mb-8 whitespace-pre-line"
          style="font-size: clamp(2.5rem, 4vw, 3.6rem)"
        >{{ data.title }}</h2>

        <div v-reveal="{ delay: 200 }" class="w-8 h-px bg-gold mb-8" />

        <p
          v-for="(paragraph, i) in data.body"
          :key="i"
          v-reveal="{ delay: 250 + i * 80 }"
          class="text-white/60 font-sans leading-relaxed text-sm lg:text-base mb-4"
        >{{ paragraph }}</p>

        <ul v-if="data.features.length" class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-8">
          <li
            v-for="(f, i) in data.features"
            :key="i"
            v-reveal="{ delay: 300 + i * 70 }"
            class="flex items-center gap-3 text-white/70 font-sans text-sm"
          >
            <span class="feature-icon"><FeatureIcon :name="f.icon" /></span>
            {{ f.label }}
          </li>
        </ul>

        <NuxtLink v-if="data.cta.label && data.cta.href" v-reveal="{ delay: 450 }" :to="data.cta.href" class="cta-btn mt-10">
          <span>{{ data.cta.label }}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Prawa: zdjęcia potraw w ramce — zmieniają się same, kropki pod spodem -->
      <div v-if="data.images.length" v-reveal="{ delay: 150, variant: 'scale' }">
        <div class="dish-frame group" @mouseenter="paused = true" @mouseleave="paused = false">
          <img
            v-for="(img, i) in data.images"
            :key="img.src"
            :src="img.src"
            :alt="img.alt"
            class="dish-photo"
            :class="{ 'dish-photo--on': i === current }"
            :aria-hidden="i !== current"
            :loading="i === 0 ? undefined : 'lazy'"
          />
        </div>
        <div v-if="data.images.length > 1" class="flex justify-center gap-2.5 mt-5">
          <button
            v-for="(img, i) in data.images"
            :key="img.src"
            type="button"
            class="dish-dot"
            :class="{ 'dish-dot--on': i === current }"
            :aria-label="img.alt || fill(ustawienia?.photoN, i + 1)"
            :aria-current="i === current"
            @click="show(i)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-btn {
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
  transition: color 0.3s, background 0.3s;
}
.cta-btn:hover {
  background: #C9A96E;
  color: #162016;
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(201, 169, 110, 0.3);
  border-radius: 50%;
  color: #C9A96E;
}

.dish-frame {
  position: relative;
  height: 460px;
  overflow: hidden;
  border: 1px solid rgba(201, 169, 110, 0.25);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
}
/* Cienka złota ramka w środku zdjęcia — jak passe-partout */
.dish-frame::after {
  content: '';
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(223, 185, 126, 0.45);
  pointer-events: none;
}
.dish-photo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease, transform 1.2s ease-out;
}
.dish-photo--on { opacity: 1; }
.dish-frame:hover .dish-photo--on { transform: scale(1.04); }
@media (max-width: 640px) { .dish-frame { height: 320px; } }

/* Kropki pod zdjęciem: aktywna — wydłużona, złota */
.dish-dot {
  width: 8px; height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  transition: width 0.3s ease, background 0.3s ease;
  cursor: pointer;
}
.dish-dot:hover { background: rgba(201, 169, 110, 0.6); }
.dish-dot--on { width: 26px; background: #C9A96E; }
</style>
