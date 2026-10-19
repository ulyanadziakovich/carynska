<script setup lang="ts">
import { NuxtLink } from '#components'

const { data: p } = await useCmsSingle('noclegi-pokoje')
useCmsSeo(p)
const { ustawienia } = await useSite()
const nav = await useNav()

// Pola formularza „Pokoje i apartamenty” w kształcie używanym przez szablon.
const data = computed(() => p.value && {
  intro: paragraphs(p.value.intro),
  features: (p.value.introFeatures ?? []).filter((f: any) => f.label),
  rooms: (p.value.rooms ?? []).map((r: any) => {
    const images = (r.images ?? []).map(cmsImg).filter(Boolean) as string[]
    return { ...r, amenities: lines(r.amenities), images, image: images[0] }
  }),
})

type Room = NonNullable<typeof data.value>['rooms'][number]

// Filtr nad kafelkami: przyciski z pola „Kategoria” kafelków, w kolejności pierwszego wystąpienia.
const categories = computed(() => [...new Set((data.value?.rooms ?? []).map((r: Room) => r.category?.trim()).filter(Boolean))] as string[])
const activeCategory = ref<string | null>(null)
const visibleRooms = computed(() => (data.value?.rooms ?? []).filter((r: Room) => !activeCategory.value || r.category?.trim() === activeCategory.value))
// Szczegóły kafelka: components/noclegi/RoomModal.vue (galeria, blokada przewijania, Esc i strzałki).
const selectedRoom = ref<Room | null>(null)
function openRoom(room: Room) { selectedRoom.value = room }
function closeRoom() { selectedRoom.value = null }
</script>

<template>
  <main v-if="data && p" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <!-- Góra strony: tekst po lewej, zdjęcie pokoju w ramce po prawej (bez napisów na zdjęciu) -->
    <section class="bg-forest-wash">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pt-6 pb-10 lg:pt-8 lg:pb-12 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-center">
        <div>
          <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-white/40 mb-6">
            <NuxtLink to="/noclegi/pokoje" class="hover:text-gold transition-colors">{{ p.crumbParent }}</NuxtLink>
            <span>/</span>
            <span class="text-white/60">{{ p.crumbCurrent }}</span>
          </div>
          <p class="fade-in text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3" style="animation-delay: 0.1s">{{ p.heroTag }}</p>
          <h1
            class="fade-in font-display text-white font-light leading-[1.05] whitespace-pre-line"
            style="font-size: clamp(2.2rem, 3.6vw, 3.4rem); animation-delay: 0.25s"
          >{{ p.heroTitle }}</h1>
          <div class="fade-in w-10 h-px bg-gold my-5" style="animation-delay: 0.4s" />
          <p class="fade-in text-white/75 font-sans text-base lg:text-lg leading-relaxed max-w-md" style="animation-delay: 0.5s">{{ p.heroSubtitle }}</p>
          <a
            v-if="p.cta && ustawienia?.bookingUrl"
            :href="ustawienia.bookingUrl"
            target="_blank"
            rel="noopener"
            class="fade-in mt-7 inline-flex items-center gap-3 bg-gold text-forest hover:bg-gold-light transition-colors px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase font-sans"
            style="animation-delay: 0.65s"
          >
            {{ p.cta }}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <div v-if="p.heroImage" class="fade-in hero-frame" style="animation-delay: 0.3s">
          <img :src="cmsImg(p.heroImage)" :alt="p.heroImage.alt || p.heroTitle" class="w-full h-full object-cover" style="object-position: center 35%" />
        </div>
      </div>
    </section>

    <!-- Intro: krótki tekst + co jest na miejscu (ikonki) -->
    <div class="max-w-5xl mx-auto px-8 pt-14 pb-14">
      <p
        v-for="(para, i) in data.intro"
        :key="i"
        v-reveal
        class="max-w-3xl mx-auto text-center text-white/75 font-sans text-base lg:text-lg leading-relaxed mb-4 last:mb-0"
      >{{ para }}</p>

      <ul v-if="data.features.length" class="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-10">
        <li
          v-for="(f, i) in data.features"
          :key="i"
          v-reveal="{ delay: i * 60 }"
          class="flex items-center gap-3 text-white/75 font-sans text-sm"
        >
          <span class="feature-icon"><FeatureIcon :name="f.icon" /></span>
          {{ f.label }}
        </li>
      </ul>
    </div>

    <!-- Kafelki (pokoje, apartamenty, domki): białe karty na ciemnym tle strony — kolejność i nowe kafelki: panel → Pokoje i apartamenty → Kafelki -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
      <!-- Filtr: tylko gdy są co najmniej dwie kategorie -->
      <div v-if="categories.length > 1" class="flex flex-wrap justify-center gap-2.5 mb-10" role="group" :aria-label="p.filterLabel">
        <button
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': !activeCategory }"
          :aria-pressed="!activeCategory"
          @click="activeCategory = null"
        >{{ p.filterAll }}</button>
        <button
          v-for="c in categories"
          :key="c"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': activeCategory === c }"
          :aria-pressed="activeCategory === c"
          @click="activeCategory = c"
        >{{ c }}</button>
      </div>

      <TransitionGroup tag="div" name="tile" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Kafelek z polem „Link” (np. jachty) prowadzi na podstronę; bez niego otwiera okno ze szczegółami. -->
        <component
          :is="room.link ? NuxtLink : 'button'"
          v-for="(room, i) in visibleRooms"
          :key="room.slug || i"
          :to="room.link || undefined"
          :type="room.link ? undefined : 'button'"
          class="room-card block text-left group cursor-pointer overflow-hidden"
          @click="!room.link && openRoom(room)"
        >
          <div class="h-full flex flex-col">
            <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
              <img v-if="room.image"
                :src="room.image"
                :alt="room.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-4 right-4 bg-forest/80 backdrop-blur-sm border border-gold/30 px-3 py-1.5">
                <span class="text-gold text-[10px] tracking-[0.2em] font-sans uppercase">{{ fill(ustawienia?.maxPersons, room.occupancy) }}</span>
              </div>
              <!-- Hover hint -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-forest/70 backdrop-blur-sm border border-gold/40 px-5 py-2.5 text-gold text-[10px] tracking-[0.2em] uppercase font-sans">
                  {{ ustawienia?.details }}
                </div>
              </div>
            </div>
            <div class="p-8 flex flex-col gap-4 flex-1">
              <div>
                <p class="room-gold text-[10px] tracking-[0.35em] uppercase font-sans mb-2">{{ room.tag }}</p>
                <div class="flex items-baseline gap-3">
                  <h2 class="font-display room-ink text-2xl font-light">{{ room.title }}</h2>
                  <span class="room-stone text-xs font-sans">{{ room.size }}</span>
                </div>
              </div>
              <p class="room-stone font-sans text-sm leading-relaxed line-clamp-2">{{ room.desc }}</p>
              <div class="room-divider mt-auto pt-4 flex items-center justify-between">
                <span class="room-stone font-sans text-xs tracking-wide">{{ room.amenities.length ? fill(p.amenitiesCount, room.amenities.length) : '' }}</span>
                <span class="room-gold font-sans text-[10px] tracking-[0.15em] uppercase group-hover:underline underline-offset-4">{{ ustawienia?.seeMore }}</span>
              </div>
            </div>
          </div>
        </component>
      </TransitionGroup>

      <!-- CTA -->
      <div class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gold/15 pt-10">
        <div>
          <p class="text-white/50 font-sans text-sm">{{ p.questions }}</p>
          <a v-if="p.dzial?.phone" :href="telHref(p.dzial.phone)" class="text-gold font-sans text-lg tracking-wide">{{ p.dzial.phone }}</a>
        </div>
        <a
          :href="p.ctaHref"
          target="_blank"
          rel="noopener"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans"
        >
          {{ p.cta }}
        </a>
      </div>
    </div>

    <KontaktSection />

    <!-- Szczegóły kafelka -->
    <Teleport to="body">
      <Transition name="modal">
        <NoclegiRoomModal v-if="selectedRoom" :room="selectedRoom" :labels="p" @close="closeRoom" />
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
.hero-frame {
  position: relative;
  height: clamp(260px, 30vw, 380px);
  overflow: hidden;
  border: 1px solid rgba(201, 169, 110, 0.25);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
}
.hero-frame::after {
  content: '';
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(223, 185, 126, 0.45);
  pointer-events: none;
}
.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(201, 169, 110, 0.3);
  border-radius: 50%;
  color: #C9A96E;
}
/* ── Białe kafelki na ciemnym tle strony — tekst w odcieniach jasnej strony Projekty (kontrast WCAG AA na bieli) ── */
.room-ink   { color: #1E2B1E; }
.room-stone { color: #4C594B; }
.room-gold  { color: #7A5C1E; }
.room-divider { border-top: 1px solid rgba(30, 43, 30, 0.1); }

.room-card {
  position: relative;
  background-color: #FFFFFF;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35), 0 3px 10px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
}
.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.45), 0 6px 16px rgba(0, 0, 0, 0.3);
}

/* ── Filtr nad kafelkami ── */
.filter-pill {
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(201, 169, 110, 0.35);
  border-radius: 999px;
  padding: 0.6rem 1.3rem;
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}
.filter-pill:hover { color: #C9A96E; border-color: #C9A96E; }
.filter-pill--active,
.filter-pill--active:hover {
  background-color: #C9A96E;
  border-color: #C9A96E;
  color: #162016;
}

/* Kafelki pojawiają się/znikają łagodnie przy zmianie filtra. */
.tile-enter-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.tile-enter-from { opacity: 0; transform: translateY(10px); }
.tile-leave-active { display: none; }

</style>
