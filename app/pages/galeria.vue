<script setup lang="ts">
const nav = useNav()

const photos = [
  { src: '/images/solina1.avif', alt: 'Jezioro Solina z lotu ptaka', label: 'Jezioro Solina' },
  { src: '/images/solina2.avif', alt: 'Żaglówka na jeziorze Solina', label: 'Żaglówki' },
  { src: '/images/solina3.avif', alt: 'Panorama Jeziora Solińskiego', label: 'Panorama' },
  { src: '/images/solina4.avif', alt: 'Widok na Bieszczady', label: 'Bieszczady' },
  { src: '/images/hotel.png', alt: 'Hotel Przystań Caryńska', label: 'Obiekt' },
  { src: '/images/galeria-jezioro-zmierzch.png', alt: 'Jezioro Solina o zmierzchu z lotu ptaka', label: 'Zmierzch nad jeziorem' },
  { src: '/images/galeria-panorama.png', alt: 'Panorama zatoki i przystani z lotu ptaka', label: 'Panorama zatoki' },
  { src: '/images/galeria-dzieci-lodka.png', alt: 'Dzieci na łodzi pontonowej', label: 'Rejs dla najmłodszych' },
  { src: '/images/galeria-sup.png', alt: 'Osoba na desce SUP przy żaglówce', label: 'SUP na jeziorze' },
  { src: '/images/galeria-przystan-lotu-ptaka.png', alt: 'Przystań Caryńska z lotu ptaka', label: 'Przystań z lotu ptaka' },
  { src: '/images/galeria-marina-baseny.png', alt: 'Marina i baseny przy przystani', label: 'Marina i baseny' },
  { src: '/images/galeria-budynek.png', alt: 'Budynek hotelu Przystań Caryńska', label: 'Nasz obiekt' },
  { src: '/images/galeria-basen.png', alt: 'Basen z fontanną przy przystani', label: 'Baseny' },
  { src: '/images/galeria-lodki-motorowe.png', alt: 'Zacumowane łodzie motorowe', label: 'Łodzie motorowe' },
  { src: '/images/galeria-pstrag.png', alt: 'Pstrąg z frytkami i surówką', label: 'Pstrąg z Tawerny' },
  { src: '/images/galeria-pizza.png', alt: 'Pizza z pieca', label: 'Pizza z pieca' },
  { src: '/images/galeria-sniadanie.png', alt: 'Bufet śniadaniowy', label: 'Śniadania' },
]

const lightboxIndex = ref<number | null>(null)
const currentPhoto = computed(() => lightboxIndex.value !== null ? photos[lightboxIndex.value] : null)

function openLightbox(i: number) { lightboxIndex.value = i }
function closeLightbox() { lightboxIndex.value = null }
function nextPhoto() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % photos.length
}
function prevPhoto() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + photos.length) % photos.length
}

function onKeydown(e: KeyboardEvent) {
  if (lightboxIndex.value === null) return
  if (e.key === 'ArrowRight') nextPhoto()
  else if (e.key === 'ArrowLeft') prevPhoto()
  else if (e.key === 'Escape') closeLightbox()
}

let touchStartX = 0
function onTouchStart(e: TouchEvent) { touchStartX = e.changedTouches[0].clientX }
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) < 50) return
  if (dx < 0) nextPhoto()
  else prevPhoto()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <main class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" />

    <PageHero tag="Galeria" :title="'Przystań\nCaryńska'" image="/images/solina1.avif" />

    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-10">Zdjęcia</p>

      <div class="columns-1 sm:columns-2 lg:columns-3 gap-px space-y-px">
        <div
          v-for="(photo, i) in photos"
          :key="photo.src"
          class="relative overflow-hidden group cursor-pointer break-inside-avoid"
          @click="openLightbox(i)"
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
        v-if="currentPhoto"
        class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
        @click="closeLightbox"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <img
          :src="currentPhoto.src"
          :alt="currentPhoto.alt"
          class="max-w-full max-h-full object-contain select-none"
          @click.stop
        />
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-sans transition-colors"
        >✕</button>

        <button
          @click.stop="prevPhoto"
          aria-label="Poprzednie zdjęcie"
          class="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm items-center justify-center text-white/70 hover:text-white hover:border-gold/60 transition-all"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M8 1L1 8l7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button
          @click.stop="nextPhoto"
          aria-label="Następne zdjęcie"
          class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm items-center justify-center text-white/70 hover:text-white hover:border-gold/60 transition-all"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M2 1l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </Teleport>
  </main>
</template>
