<script setup lang="ts">
const { data: p } = await useCmsSingle('noclegi-jacht')
const { ustawienia, kontakt } = await useSite()
const nav = await useNav()

// Pola formularza „Hotel na wodzie” w kształcie używanym przez szablon.
const data = computed(() => p.value && {
  intro: p.value.intro,
  includes: lines(p.value.includes),
  note: p.value.note,
  // E-mail działu, a gdy go brak — główny e-mail.
  contact: { phone: p.value.dzial?.phone ?? '', email: p.value.dzial?.email || kontakt.value?.email || '' },
  yachts: (p.value.yachts ?? []).map((y: any, i: number) => {
    const gallery = (y.gallery ?? []).map(cmsImg).filter(Boolean) as string[]
    return { ...y, id: i, gallery, image: gallery[0], features: lines(y.features), specs: y.specs ?? [], pricing: y.pricing ?? [] }
  }),
})

type Yacht = NonNullable<typeof data.value>['yachts'][number]
const selectedYacht = ref<Yacht | null>(null)
const activePhoto = ref(0)
let touchStartX = 0

const gallery = computed<string[]>(() => {
  if (!selectedYacht.value) return []
  return selectedYacht.value.gallery
})

function openYacht(y: Yacht) {
  selectedYacht.value = y
  activePhoto.value = 0
  document.body.style.overflow = 'hidden'
}
function closeYacht() {
  selectedYacht.value = null
  document.body.style.overflow = ''
}
function nextPhoto() {
  activePhoto.value = (activePhoto.value + 1) % gallery.value.length
}
function prevPhoto() {
  activePhoto.value = (activePhoto.value - 1 + gallery.value.length) % gallery.value.length
}
function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
}
function onTouchEnd(e: TouchEvent) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (gallery.value.length < 2 || Math.abs(diff) < 40) return
  if (diff > 0) nextPhoto()
  else prevPhoto()
}
onUnmounted(() => { document.body.style.overflow = '' })
</script>

<template>
  <main v-if="data && p" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero :tag="p.heroTag" :title="p.heroTitle" :image="cmsImg(p.heroImage) ?? ''" />

    <!-- Content area -->
    <div class="bg-forest-wash">

      <!-- Breadcrumb -->
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pt-8">
        <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-white/35">
          <NuxtLink to="/noclegi/pokoje" class="hover:text-gold transition-colors">{{ p.crumbParent }}</NuxtLink>
          <span>/</span>
          <span class="text-white/55">{{ p.crumbCurrent }}</span>
        </div>
      </div>

      <!-- Intro -->
      <div class="max-w-2xl mx-auto px-8 py-10 text-center">
        <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-4">{{ p.kicker }}</p>
        <p class="font-display italic text-white/75 text-lg leading-relaxed">{{ data.intro }}</p>
        <div class="w-8 h-px bg-gold mx-auto mt-6" />
      </div>

      <!-- Yacht cards -->
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            v-for="yacht in data.yachts"
            :key="yacht.id"
            class="card-elevated text-left group cursor-pointer bg-forest-void overflow-hidden"
            @click="openYacht(yacht)"
          >
            <div class="h-full flex flex-col">
              <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
                <img
                  :src="yacht.image"
                  :alt="yacht.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="photo-tint" />
                <div class="absolute top-4 right-4 bg-forest/80 backdrop-blur-sm border border-gold/30 px-3 py-1.5">
                  <span class="text-gold text-[10px] tracking-[0.2em] font-sans uppercase">{{ fill(ustawienia?.maxPersons, yacht.capacity) }}</span>
                </div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest/20">
                  <div class="bg-forest/80 backdrop-blur-sm border border-gold/40 px-5 py-2.5 text-gold text-[10px] tracking-[0.2em] uppercase font-sans">
                    {{ p.seeDetails }}
                  </div>
                </div>
              </div>
              <div class="p-7 flex flex-col gap-3 flex-1">
                <div>
                  <p class="text-gold/70 text-[10px] tracking-[0.35em] uppercase font-sans mb-1">{{ yacht.tag }}</p>
                  <h2 class="font-display text-white text-3xl font-light">{{ yacht.name }}</h2>
                </div>
                <p class="text-white/60 font-sans text-sm leading-relaxed line-clamp-2">{{ yacht.desc }}</p>
                <div class="flex gap-6 pt-1">
                  <div v-for="spec in yacht.specs.slice(0, 3)" :key="spec.label">
                    <p class="text-white/35 text-[9px] tracking-[0.2em] uppercase font-sans mb-0.5">{{ spec.label }}</p>
                    <p class="text-white/70 font-sans text-sm">{{ spec.value }}</p>
                  </div>
                </div>
                <div class="mt-auto pt-4 border-t border-white/8 flex items-center justify-between">
                  <span class="text-gold font-display text-xl font-light">{{ yacht.price }}</span>
                  <span class="text-white/40 font-sans text-[10px] tracking-[0.15em] uppercase group-hover:text-gold transition-colors">{{ p.detailsLink }}</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Co w cenie -->
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-16">
        <div class="card-elevated border border-gold/15 p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start bg-forest-void">
          <div>
            <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-6">{{ p.includesTitle }}</p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10">
              <li
                v-for="item in data.includes"
                :key="item"
                class="flex items-center gap-3 text-white/70 font-sans text-sm"
              >
                <span class="w-4 h-px bg-gold/60 shrink-0" />
                {{ item }}
              </li>
            </ul>
            <p class="text-white/35 font-sans text-xs leading-relaxed mt-6 max-w-xl">{{ data.note }}</p>
          </div>
          <div class="flex flex-col gap-3 lg:min-w-[220px]">
            <a
              :href="`tel:${data.contact.phone.replace(/\s/g,'')}`"
              class="flex items-center justify-center gap-3 bg-gold hover:bg-gold/80 text-forest px-6 py-4 font-sans text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 9.11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {{ data.contact.phone }}
            </a>
            <a
              :href="`mailto:${data.contact.email}`"
              class="flex items-center justify-center gap-3 border border-white/15 hover:border-gold text-white/50 hover:text-gold px-6 py-4 font-sans text-[11px] tracking-[0.2em] uppercase transition-all"
            >
              {{ data.contact.email }}
            </a>
          </div>
        </div>
      </div>
    </div><!-- end content area -->

    <KontaktSection />

    <!-- Yacht modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedYacht" class="modal-backdrop" @click.self="closeYacht">
          <div class="modal-panel">

            <!-- Photo gallery -->
            <div
              class="relative shrink-0"
              style="height: 52vw; max-height: 340px; min-height: 220px;"
              @touchstart.passive="onTouchStart"
              @touchend.passive="onTouchEnd"
            >
              <img
                :key="activePhoto"
                :src="gallery[activePhoto]"
                :alt="selectedYacht.name"
                class="w-full h-full object-cover"
              />
              <!-- Close -->
              <button
                class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/90 text-forest hover:bg-white transition-colors rounded-full shadow"
                @click="closeYacht"
                :aria-label="ustawienia?.close"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              <template v-if="gallery.length > 1">
                <!-- Prev / Next -->
                <button
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-forest/70 backdrop-blur-sm border border-white/15 text-white/70 hover:text-white hover:border-gold/50 transition-all"
                  @click.stop="prevPhoto"
                  :aria-label="ustawienia?.prevPhoto"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-forest/70 backdrop-blur-sm border border-white/15 text-white/70 hover:text-white hover:border-gold/50 transition-all"
                  @click.stop="nextPhoto"
                  :aria-label="ustawienia?.nextPhoto"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <!-- Dots -->
                <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  <button
                    v-for="(_, i) in gallery"
                    :key="i"
                    @click.stop="activePhoto = i"
                    class="rounded-full transition-all duration-200"
                    :class="activePhoto === i ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'"
                    :aria-label="fill(ustawienia?.photoN, i + 1)"
                  />
                </div>
              </template>
            </div>

            <!-- Header -->
            <div class="px-7 pt-6 pb-4 border-b border-forest/8">
              <p class="text-gold text-[9px] tracking-[0.4em] uppercase font-sans mb-1">{{ selectedYacht.tag }}</p>
              <h2 class="font-display text-forest text-2xl font-light">{{ selectedYacht.name }}</h2>
            </div>

            <div class="overflow-y-auto flex-1 px-7 py-6">
              <!-- Specs -->
              <div class="grid grid-cols-3 gap-px bg-forest/8 mb-6">
                <div v-for="spec in selectedYacht.specs.slice(0,3)" :key="spec.label" class="bg-white px-3 py-3 text-center">
                  <p class="text-forest/55 text-[8px] tracking-[0.2em] uppercase font-sans mb-1">{{ spec.label }}</p>
                  <p class="text-forest font-sans text-sm font-medium">{{ spec.value }}</p>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-px bg-forest/8 mb-7">
                <div v-for="spec in selectedYacht.specs.slice(3)" :key="spec.label" class="bg-white px-3 py-3 text-center">
                  <p class="text-forest/55 text-[8px] tracking-[0.2em] uppercase font-sans mb-1">{{ spec.label }}</p>
                  <p class="text-forest font-sans text-sm font-medium">{{ spec.value }}</p>
                </div>
              </div>

              <p class="text-forest/60 font-sans text-sm leading-relaxed mb-7">{{ selectedYacht.desc }}</p>

              <p class="text-forest/55 text-[9px] tracking-[0.3em] uppercase font-sans mb-3">{{ p.onBoard }}</p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mb-7">
                <li v-for="feat in selectedYacht.features" :key="feat" class="flex items-center gap-3 text-forest/65 font-sans text-sm">
                  <span class="w-3 h-px bg-gold shrink-0" />{{ feat }}
                </li>
              </ul>

              <p class="text-forest/55 text-[9px] tracking-[0.3em] uppercase font-sans mb-3">{{ p.seasonPricing }}</p>
              <div class="border border-forest/10 mb-7">
                <div
                  v-for="row in (selectedYacht as any).pricing"
                  :key="row.label"
                  class="flex items-center justify-between gap-4 px-4 py-3 border-b border-forest/8 last:border-0"
                >
                  <span class="text-forest/65 font-sans text-xs">{{ row.label }}</span>
                  <span class="text-gold font-sans text-sm font-semibold shrink-0">{{ row.value }}</span>
                </div>
              </div>

              <a
                :href="`tel:${data!.contact.phone.replace(/\s/g,'')}`"
                class="flex items-center justify-center gap-3 bg-gold hover:bg-gold/80 text-forest py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold transition-colors"
              >
                {{ p.callCta }}
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
  background: #fff;
  width: 100%;
  max-width: 600px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
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
