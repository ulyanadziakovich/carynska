<script setup lang="ts">
const nav = useNav()

const photos = [
  { src: '/images/solina1.avif', alt: 'Jezioro Solina z lotu ptaka', label: 'Jezioro Solina' },
  { src: '/images/solina2.avif', alt: 'Żaglówka na jeziorze Solina', label: 'Żaglówki' },
  { src: '/images/solina3.avif', alt: 'Panorama Jeziora Solińskiego', label: 'Panorama' },
  { src: '/images/solina4.avif', alt: 'Widok na Bieszczady', label: 'Bieszczady' },
  { src: '/images/hotel.png', alt: 'Hotel Przystań Caryńska', label: 'Obiekt' },
]

const lightbox = ref<string | null>(null)
</script>

<template>
  <main class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" />

    <PageHero tag="Galeria" :title="'Przystań\nCaryńska'" image="/images/solina1.avif" />

    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-10">Zdjęcia</p>

      <div class="columns-1 sm:columns-2 lg:columns-3 gap-px space-y-px">
        <div
          v-for="photo in photos"
          :key="photo.src"
          class="relative overflow-hidden group cursor-pointer break-inside-avoid"
          @click="lightbox = photo.src"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-colors duration-300 flex items-end">
            <span class="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase text-white/80 px-5 py-4">
              {{ photo.label }}
            </span>
          </div>
        </div>
      </div>

      <p class="text-white/25 font-sans text-xs text-center mt-16 tracking-wider">
        Więcej zdjęć wkrótce
      </p>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
        @click="lightbox = null"
      >
        <img
          :src="lightbox"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
        <button
          @click="lightbox = null"
          class="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-sans transition-colors"
        >✕</button>
      </div>
    </Teleport>
  </main>
</template>
