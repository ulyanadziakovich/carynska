<script setup lang="ts">
defineProps<{
  tag: string
  title: string
  image: string
}>()
</script>

<template>
  <div class="relative h-[55vh] min-h-[420px] overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center scale-105"
      :style="`background-image: url('${image}')`"
    />
    <div class="absolute inset-0 bg-black/30" />

    <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
      <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-5">{{ tag }}</p>
      <h1
        class="font-display text-cream/90 font-light leading-tight tracking-[0.1em] whitespace-pre-line"
        style="font-size: clamp(2rem, 5vw, 4rem); text-shadow: 0 2px 40px rgba(0,0,0,0.4)"
      >{{ title }}</h1>
      <div class="w-8 h-px bg-gold mt-8" />
    </div>
  </div>
</template>
