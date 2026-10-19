<script setup lang="ts">
/**
 * Góra podstrony: tekst po lewej, zdjęcie w ramce po prawej — jak na stronie Pokoje.
 * Bez zdjęcia sam tekst, wyśrodkowany. Na telefonie zdjęcie pod tekstem.
 */
defineProps<{
  tag?: string
  title?: string
  image?: string
  /** Zdanie pod tytułem (pole „Zdanie pod tytułem” w zakładce Nagłówek). */
  subtitle?: string
  alt?: string
}>()
</script>

<template>
  <section class="bg-forest-wash">
    <div
      class="max-w-7xl mx-auto px-8 lg:px-16 pt-10 pb-12 lg:pt-12 lg:pb-14 grid grid-cols-1 gap-10 lg:gap-16 items-center"
      :class="image ? 'lg:grid-cols-[5fr_7fr]' : 'text-center justify-items-center'"
    >
      <div>
        <p v-if="tag" class="fade-in text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3" style="animation-delay: 0.1s">{{ tag }}</p>
        <h1
          class="fade-in font-display text-white font-light leading-[1.05] whitespace-pre-line"
          style="font-size: clamp(2.2rem, 3.6vw, 3.4rem); animation-delay: 0.25s"
        >{{ title }}</h1>
        <div class="fade-in w-10 h-px bg-gold my-5" :class="!image && 'mx-auto'" style="animation-delay: 0.4s" />
        <p v-if="subtitle" class="fade-in text-white/75 font-sans text-base lg:text-lg leading-relaxed max-w-md whitespace-pre-line" style="animation-delay: 0.5s">{{ subtitle }}</p>
        <slot />
      </div>

      <div v-if="image" class="fade-in hero-frame" style="animation-delay: 0.3s">
        <img :src="image" :alt="alt || title?.replace(/\s*\n\s*/g, ' ')" class="w-full h-full object-cover" style="object-position: center 40%" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-frame {
  position: relative;
  height: clamp(240px, 30vw, 380px);
  overflow: hidden;
  border: 1px solid rgba(201, 169, 110, 0.25);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
}
/* Wewnętrzna złota ramka — ten sam motyw co na stronie Pokoje. */
.hero-frame::after {
  content: '';
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(223, 185, 126, 0.45);
  pointer-events: none;
}
</style>
