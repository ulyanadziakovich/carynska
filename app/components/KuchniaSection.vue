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
  <section class="bg-white">
    <div class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] min-h-[80vh]">

      <div class="relative overflow-hidden" style="min-height: min(55vw, 480px)">
        <img :src="data.image.src" :alt="data.image.alt" class="w-full h-full object-cover" />
      </div>

      <div class="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-24 relative">
        <div class="absolute right-0 top-1/4 w-px h-1/2 bg-gold/20 hidden lg:block" />

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

        <NuxtLink v-reveal="{ delay: 400 }" :to="data.cta.href" class="inline-flex items-center gap-3 text-gold text-[11px] tracking-[0.2em] uppercase font-sans group w-fit">
          <span>{{ data.cta.label }}</span>
          <span class="w-8 h-px bg-gold transition-all duration-300 group-hover:w-14" />
        </NuxtLink>
      </div>

    </div>
  </section>
</template>
