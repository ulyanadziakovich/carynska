<script setup lang="ts">
defineProps<{
  data: {
    tag: string
    title: string
    body: string[]
    cta: { label: string; href: string }
    features: { icon?: string; label: string }[]
    cards: { title?: string; desc?: string; image?: string; alt?: string; href?: string; linkLabel?: string }[]
  }
}>()
</script>

<template>
  <section class="bg-forest-wash">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 px-8 sm:px-12 lg:px-16 py-16 lg:py-24 items-center">

      <!-- Lewa: tekst, udogodnienia, przycisk -->
      <div class="relative">
        <p v-reveal class="text-gold text-[10px] lg:text-[12px] tracking-[0.4em] uppercase font-sans mb-6">{{ data.tag }}</p>

        <h2
          v-reveal="{ delay: 100 }"
          class="font-display text-white font-light leading-tight mb-8 whitespace-pre-line"
          style="font-size: clamp(2.5rem, 4vw, 4rem)"
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

      <!-- Prawa: karty ze zdjęciami (pokoje, hotel na wodzie) -->
      <div v-if="data.cards.length" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <NuxtLink
          v-for="(card, i) in data.cards"
          :key="i"
          v-reveal="{ delay: 150 + i * 150 }"
          :to="card.href || undefined"
          class="room-card group"
          :class="{ 'sm:translate-y-10': i % 2 === 1 }"
        >
          <div class="room-card__photo">
            <img v-if="card.image" :src="card.image" :alt="card.alt" class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
            <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div class="p-6 lg:p-7">
            <h3 class="font-display text-white text-2xl font-light mb-2">{{ card.title }}</h3>
            <p class="text-white/50 font-sans text-sm leading-relaxed mb-5">{{ card.desc }}</p>
            <span class="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.2em] uppercase font-sans">
              {{ card.linkLabel }}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform group-hover:translate-x-1">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </NuxtLink>
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

.room-card {
  display: block;
  overflow: hidden;
  background: #0f180e;
  border: 1px solid rgba(201, 169, 110, 0.15);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}
.room-card:hover {
  border-color: rgba(201, 169, 110, 0.45);
  box-shadow: 0 28px 56px rgba(0, 0, 0, 0.45);
}
.room-card__photo {
  position: relative;
  height: 260px;
  overflow: hidden;
}
</style>
