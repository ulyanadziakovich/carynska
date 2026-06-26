<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/noclegi'),
  useFetch('/api/content'),
])
const nav = useNav()

type Room = NonNullable<typeof data.value>['rooms'][number]
const selectedRoom = ref<Room | null>(null)

function openRoom(room: Room) {
  selectedRoom.value = room
  document.body.style.overflow = 'hidden'
}
function closeRoom() {
  selectedRoom.value = null
  document.body.style.overflow = ''
}

onUnmounted(() => { document.body.style.overflow = '' })
</script>

<template>
  <main v-if="data && content" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" />

    <PageHero tag="Zakwaterowanie" title="Pokoje & Apartamenty" :image="data.hero.image" />

    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pt-8">
      <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-white/25">
        <NuxtLink to="/noclegi" class="hover:text-gold transition-colors">Noclegi</NuxtLink>
        <span>/</span>
        <span class="text-white/45">Pokoje & Apartamenty</span>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-2xl mx-auto px-8 py-10 text-center">
      <p class="text-white/50 font-sans font-light text-sm leading-relaxed">{{ data.intro }}</p>
    </div>

    <!-- Room grid -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
        <button
          v-for="room in data.rooms"
          :key="room.slug"
          class="text-left group cursor-pointer"
          @click="openRoom(room)"
        >
          <div class="bg-forest h-full flex flex-col">
            <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
              <img
                :src="room.image"
                :alt="room.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-4 right-4 bg-forest/80 backdrop-blur-sm border border-gold/30 px-3 py-1.5">
                <span class="text-gold text-[10px] tracking-[0.2em] font-sans uppercase">max {{ room.occupancy }} os.</span>
              </div>
              <!-- Hover hint -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-forest/70 backdrop-blur-sm border border-gold/40 px-5 py-2.5 text-gold text-[10px] tracking-[0.2em] uppercase font-sans">
                  Szczegóły
                </div>
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
              <p class="text-white/50 font-sans font-light text-sm leading-relaxed line-clamp-2">{{ room.desc }}</p>
              <div class="mt-auto pt-4 border-t border-white/8 flex items-center justify-between">
                <span class="text-white/25 font-sans text-xs tracking-wide">{{ room.amenities.length }} udogodnień</span>
                <span class="text-gold/60 font-sans text-[10px] tracking-[0.15em] uppercase group-hover:text-gold transition-colors">Zobacz →</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gold/15 pt-10">
        <div>
          <p class="text-white/50 font-sans text-sm">Masz pytania o pokoje lub dostępność?</p>
          <a href="tel:+48691944266" class="text-gold font-sans text-lg tracking-wide">+48 691 944 266</a>
        </div>
        <a
          href="https://www.booking.com/hotel/pl/przystan-carynska.pl.html"
          target="_blank"
          rel="noopener"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans"
        >
          Sprawdź dostępność
        </a>
      </div>
    </div>

    <KontaktSection :data="content.kontakt" />

    <!-- Room modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedRoom" class="modal-backdrop" @click.self="closeRoom">
          <div class="modal-panel">

            <!-- Image -->
            <div class="relative h-64 md:h-80 overflow-hidden shrink-0">
              <img :src="selectedRoom.image" :alt="selectedRoom.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#162216]/80 to-transparent" />
              <div class="absolute bottom-6 left-8">
                <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-1">{{ selectedRoom.tag }}</p>
                <h2 class="font-display text-white text-3xl font-light">{{ selectedRoom.title }}</h2>
              </div>
              <button
                class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-forest/70 backdrop-blur-sm border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all"
                @click="closeRoom"
                aria-label="Zamknij"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="overflow-y-auto flex-1 p-8">
              <!-- Meta -->
              <div class="flex gap-6 mb-6 pb-6 border-b border-white/8">
                <div>
                  <span class="text-white/25 text-[10px] tracking-[0.2em] uppercase font-sans block mb-1">Powierzchnia</span>
                  <span class="text-white font-sans text-sm">{{ selectedRoom.size }}</span>
                </div>
                <div>
                  <span class="text-white/25 text-[10px] tracking-[0.2em] uppercase font-sans block mb-1">Maksymalnie</span>
                  <span class="text-white font-sans text-sm">{{ selectedRoom.occupancy }} osoby</span>
                </div>
              </div>

              <!-- Description -->
              <p class="text-white/55 font-sans font-light text-sm leading-relaxed mb-8">{{ selectedRoom.desc }}</p>

              <!-- Amenities -->
              <p class="text-white/25 text-[10px] tracking-[0.3em] uppercase font-sans mb-4">Wyposażenie</p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 mb-10">
                <li
                  v-for="amenity in selectedRoom.amenities"
                  :key="amenity"
                  class="flex items-center gap-3 text-white/55 font-sans text-sm"
                >
                  <span class="w-4 h-px bg-gold/50 shrink-0" />
                  {{ amenity }}
                </li>
              </ul>

              <!-- CTA -->
              <a
                href="https://www.booking.com/hotel/pl/przystan-carynska.pl.html"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-center gap-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 py-4 text-[11px] tracking-[0.2em] uppercase font-sans"
              >
                Sprawdź dostępność
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
              </a>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(10, 16, 10, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-panel {
  background: #162216;
  border: 1px solid rgba(201, 169, 110, 0.2);
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
}

.modal-enter-active { transition: opacity 0.3s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.modal-enter-active .modal-panel { animation: modal-in 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes modal-in {
  from { transform: translateY(20px) scale(0.98); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
</style>
