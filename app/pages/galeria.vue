<script setup lang="ts">
const nav = await useNav()

const photos = [
  { src: '/images/galeria-przystan-lotu-ptaka.png', alt: 'Przystań Caryńska z lotu ptaka', label: 'Przystań z lotu ptaka', cat: 'przystan' },
  { src: '/images/przystan-drone-2.jpg', alt: 'Poranna mgła nad Jeziorem Solińskim', label: 'Poranek nad jeziorem', cat: 'przystan' },
  { src: '/images/przystan-drone-3.jpg', alt: 'Zatoka i marina z lotu ptaka', label: 'Zatoka i marina', cat: 'przystan' },
  { src: '/images/solina1.avif', alt: 'Jezioro Solina z lotu ptaka', label: 'Jezioro Solina', cat: 'przystan' },
  { src: '/images/solina3.avif', alt: 'Panorama Jeziora Solińskiego', label: 'Panorama', cat: 'przystan' },
  { src: '/images/solina4.avif', alt: 'Widok na Bieszczady', label: 'Bieszczady', cat: 'przystan' },
  { src: '/images/galeria-jezioro-zmierzch.png', alt: 'Jezioro Solina o zmierzchu z lotu ptaka', label: 'Zmierzch nad jeziorem', cat: 'przystan' },
  { src: '/images/galeria-panorama.png', alt: 'Panorama zatoki i przystani z lotu ptaka', label: 'Panorama zatoki', cat: 'przystan' },
  { src: '/images/gondola-solina.jpg', alt: 'Kolejka gondolowa Solina', label: 'Kolejka gondolowa', cat: 'przystan' },

  { src: '/images/hotel.png', alt: 'Hotel Przystań Caryńska', label: 'Nasz obiekt', cat: 'noclegi' },
  { src: '/images/galeria-budynek.png', alt: 'Budynek hotelu Przystań Caryńska', label: 'Budynek', cat: 'noclegi' },

  { src: '/images/galeria-pstrag.png', alt: 'Pstrąg z frytkami i surówką', label: 'Pstrąg z Tawerny', cat: 'tawerna' },
  { src: '/images/galeria-pizza.png', alt: 'Pizza z pieca', label: 'Pizza z pieca', cat: 'tawerna' },
  { src: '/images/galeria-sniadanie.png', alt: 'Bufet śniadaniowy', label: 'Śniadania', cat: 'tawerna' },

  { src: '/images/galeria-basen.png', alt: 'Basen z fontanną przy przystani', label: 'Baseny', cat: 'baseny' },
  { src: '/images/galeria-marina-baseny.png', alt: 'Marina i baseny przy przystani', label: 'Marina i baseny', cat: 'baseny' },
  { src: '/images/aquapark-baseny.jpg', alt: 'Mini-aquapark przy przystani', label: 'Mini-aquapark', cat: 'baseny' },

  { src: '/images/solina2.avif', alt: 'Żaglówka na jeziorze Solina', label: 'Żaglówki', cat: 'wypozyczalnia' },
  { src: '/images/kajaki-sprzet-wodny.jpg', alt: 'Kajaki i żaglówki na jeziorze Solińskim', label: 'Kajaki', cat: 'wypozyczalnia' },
  { src: '/images/galeria-sup.png', alt: 'Osoba na desce SUP przy żaglówce', label: 'SUP na jeziorze', cat: 'wypozyczalnia' },
  { src: '/images/galeria-lodki-motorowe.png', alt: 'Zacumowane łodzie motorowe', label: 'Łodzie motorowe', cat: 'wypozyczalnia' },
  { src: '/images/galeria-dzieci-lodka.png', alt: 'Dzieci na łodzi pontonowej', label: 'Rejs dla najmłodszych', cat: 'wypozyczalnia' },

  { src: '/images/organizacja-imprez.jpg', alt: 'Dekoracja na imprezę okolicznościową', label: 'Imprezy okolicznościowe', cat: 'eventy' },
  { src: '/images/plac-zabaw.jpg', alt: 'Plac zabaw nad mariną', label: 'Plac zabaw', cat: 'eventy' },
]

const categories = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'noclegi', label: 'Noclegi' },
  { id: 'tawerna', label: 'Tawerna' },
  { id: 'baseny', label: 'Baseny' },
  { id: 'wypozyczalnia', label: 'Wypożyczalnia' },
  { id: 'eventy', label: 'Eventy & grupy' },
  { id: 'przystan', label: 'Przystań & okolica' },
]

const selected = ref('all')
const filtered = computed(() =>
  selected.value === 'all' ? photos : photos.filter(p => p.cat === selected.value),
)
function selectCategory(id: string) {
  selected.value = id
  lightboxIndex.value = null
}

const lightboxIndex = ref<number | null>(null)
const currentPhoto = computed(() => lightboxIndex.value !== null ? filtered.value[lightboxIndex.value] : null)

function openLightbox(i: number) { lightboxIndex.value = i }
function closeLightbox() { lightboxIndex.value = null }
function nextPhoto() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % filtered.value.length
}
function prevPhoto() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + filtered.value.length) % filtered.value.length
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
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero tag="Galeria" :title="'Przystań\nCaryńska'" image="/images/solina1.avif" />

    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-8">Zdjęcia</p>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-2.5 mb-10">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-sans border transition-colors duration-200"
          :class="selected === cat.id
            ? 'border-gold bg-gold text-forest'
            : 'border-white/15 text-white/55 hover:border-gold/60 hover:text-gold'"
          @click="selectCategory(cat.id)"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="columns-1 sm:columns-2 lg:columns-3 gap-px space-y-px">
        <div
          v-for="(photo, i) in filtered"
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
