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
</script>

<template>
  <section class="bg-forest-wash">
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

      <!-- Left: text -->
      <div class="flex flex-col justify-between px-12 lg:px-16 py-12 lg:py-16 relative">
        <div class="absolute left-0 top-1/4 w-px h-1/2 bg-gold/30 hidden lg:block" />

        <div>
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
            class="text-white/60 font-sans leading-relaxed text-sm lg:text-base"
            :class="i < data.body.length - 1 ? 'mb-4' : 'mb-0'"
          >{{ paragraph }}</p>
        </div>

        <NuxtLink v-reveal="{ delay: 400 }" :to="data.cta.href" class="cta-btn mt-10">
          <span class="cta-shimmer" />
          <span>{{ data.cta.label }}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Right: single room photo -->
      <div class="relative flex flex-col overflow-hidden bg-forest-void min-h-[360px]">
        <div v-reveal="{ delay: 150 }" class="relative flex flex-1 items-center justify-center p-8">
          <div class="room-frame">
            <img :src="data.rooms[0].image" :alt="data.rooms[0].type" class="w-full h-full object-cover" />
            <div class="photo-tint" />
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

.room-frame {
  position: absolute;
  inset: 32px 32px 0;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(14, 22, 14, 0.18),
    0 4px 16px rgba(14, 22, 14, 0.10);
  border: 1px solid rgba(201, 169, 110, 0.15);
}
</style>
