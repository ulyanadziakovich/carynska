<script setup lang="ts">
defineProps<{
  room: {
    slug: string
    tag: string
    title: string
    size: string
    occupancy: number
    desc: string
    amenities: string[]
    image: string
  }
}>()
</script>

<template>
  <div class="bg-forest group flex flex-col">

    <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
      <img
        :src="room.image"
        :alt="room.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
      <div class="absolute top-4 right-4 bg-forest/80 backdrop-blur-sm border border-gold/30 px-3 py-1.5">
        <span class="text-gold text-[10px] tracking-[0.2em] font-sans uppercase">max {{ room.occupancy }} os.</span>
      </div>
    </div>

    <div class="p-8 flex flex-col gap-4 flex-1">
      <div>
        <p class="text-gold text-[10px] tracking-[0.35em] uppercase font-sans mb-2">{{ room.tag }}</p>
        <div class="flex items-baseline gap-3">
          <h2 class="font-display text-white text-2xl font-light">{{ room.title }}</h2>
          <span class="text-white/30 text-xs font-sans">{{ room.size }}</span>
        </div>
      </div>

      <p class="text-white/50 font-sans font-light text-sm leading-relaxed flex-1">{{ room.desc }}</p>

      <ul class="flex flex-col gap-1.5 pt-2 border-t border-white/8">
        <li
          v-for="amenity in room.amenities"
          :key="amenity"
          class="flex items-center gap-2.5 text-white/40 text-xs font-sans"
        >
          <span class="w-3 h-px bg-gold/50 shrink-0" />
          {{ amenity }}
        </li>
      </ul>
    </div>

  </div>
</template>
