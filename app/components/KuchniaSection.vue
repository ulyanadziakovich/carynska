<script setup lang="ts">
defineProps<{
  data: {
    tag: string
    title: string
    body: string[]
    cta: { label: string; href: string }
    image: { src: string; alt: string }
  }
}>()
</script>

<template>
  <section class="bg-forest">
    <div class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] min-h-[80vh]">

      <div class="relative overflow-hidden min-h-[50vh] lg:min-h-0">
        <img :src="data.image.src" :alt="data.image.alt" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-l from-forest/40 via-transparent to-transparent" />
        <div class="absolute bottom-0 inset-x-0 pointer-events-none opacity-15">
          <svg viewBox="0 0 800 60" preserveAspectRatio="none" class="w-full h-12">
            <polyline points="0,60 100,35 200,50 300,15 420,40 520,8 640,32 740,18 800,38 800,60" fill="none" stroke="#C9A96E" stroke-width="1" />
          </svg>
        </div>
      </div>

      <div class="flex flex-col justify-center px-12 lg:px-16 py-20 lg:py-24 relative">
        <div class="absolute right-0 top-1/4 w-px h-1/2 bg-gold/30 hidden lg:block" />

        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-6">{{ data.tag }}</p>

        <h2
          class="font-display text-white font-light leading-tight mb-8 whitespace-pre-line"
          style="font-size: clamp(2.5rem, 4vw, 3.5rem)"
        >{{ data.title }}</h2>

        <div class="w-8 h-px bg-gold mb-8" />

        <p
          v-for="(paragraph, i) in data.body"
          :key="i"
          class="text-white/60 font-sans font-light leading-relaxed text-sm"
          :class="i < data.body.length - 1 ? 'mb-4' : 'mb-10'"
        >{{ paragraph }}</p>

        <a :href="data.cta.href" class="inline-flex items-center gap-3 text-gold text-[11px] tracking-[0.2em] uppercase font-sans group w-fit">
          <span>{{ data.cta.label }}</span>
          <span class="w-8 h-px bg-gold transition-all duration-300 group-hover:w-14" />
        </a>
      </div>

    </div>
  </section>
</template>
