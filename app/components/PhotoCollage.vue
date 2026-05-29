<script setup lang="ts">
defineProps<{
  images: { src: string; alt: string }[]
}>()
</script>

<template>
  <div class="flex items-start gap-3 lg:gap-4">
    <div
      v-for="(img, i) in images.slice(0, 3)"
      :key="img.src"
      class="flex-1 overflow-hidden"
      :style="{
        marginTop: i === 0 ? '0' : i === 1 ? '3rem' : '1.25rem',
        aspectRatio: '2/3',
      }"
    >
      <img
        :src="img.src"
        :alt="img.alt"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
