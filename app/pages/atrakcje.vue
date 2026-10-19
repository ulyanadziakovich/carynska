<script setup lang="ts">
const { data: p } = await useCmsSingle('atrakcje')
useCmsSeo(p)
const { ustawienia } = await useSite()
const imgs = (list?: CmsImage[]) => (list ?? []).filter((i) => i?.src).map((i) => ({ src: cmsImg(i)!, alt: i.alt ?? '' }))

// Pola formularza „Atrakcje” w kształcie używanym przez szablon.
const data = computed(() => p.value && {
  intro: paragraphs(p.value.intro),
  water: {
    tag: p.value.waterTag, title: p.value.waterTitle, body: p.value.waterBody,
    items: p.value.waterItems ?? [], pricing: p.value.waterPricing ?? [], images: imgs(p.value.waterImages),
    fleet: (p.value.fleet ?? []).map((f: any, i: number) => ({ ...f, id: String(i), units: lines(f.units), specs: lines(f.specs) })),
  },
  marina: {
    tag: p.value.marinaTag, title: p.value.marinaTitle, body: p.value.marinaBody, amenities: lines(p.value.marinaAmenities),
    pricing: p.value.marinaPricing ?? [], images: imgs(p.value.marinaImages), phone: p.value.marinaDzial?.phone,
  },
  land: { tag: p.value.landTag, title: p.value.landTitle, body: p.value.landBody, items: p.value.landItems ?? [], images: imgs(p.value.landImages) },
  groups: { tag: p.value.groupsTag, title: p.value.groupsTitle },
})

const nav = await useNav()
const openBoat = ref<string | null>(null)
</script>

<template>
  <main v-if="data && p" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero :tag="p.heroTag" :title="p.heroTitle" :image="cmsImg(p.heroImage) ?? ''" :subtitle="p.heroSubtitle" />

    <!-- Intro -->
    <div class="max-w-3xl mx-auto px-8 py-14 text-center">
      <p
        v-for="(p, i) in data.intro"
        :key="i"
        class="text-white/55 font-sans text-sm leading-relaxed mb-4 last:mb-0"
      >{{ p }}</p>
    </div>

    <!-- Water activities: text + collage -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div>
        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.water.tag }}</p>
        <h2 class="font-display text-white text-3xl font-light mb-4">{{ data.water.title }}</h2>
        <p class="text-white/45 font-sans text-sm leading-relaxed mb-10">{{ data.water.body }}</p>

        <div class="flex flex-col gap-6">
          <div
            v-for="item in data.water.items"
            :key="item.label"
            class="flex items-start gap-5 group"
          >
            <div class="text-gold opacity-70 shrink-0 mt-0.5">
              <ActivityIcon :name="item.icon" />
            </div>
            <div>
              <p class="font-display text-white text-lg font-light mb-1">{{ item.label }}</p>
              <p class="text-white/40 font-sans text-xs leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:pt-8">
        <PhotoCollage :images="data.water.images" />
      </div>
    </div>

    <!-- Fleet accordions -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-16">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-8">{{ p.fleetTitle }}</p>
      <div class="flex flex-col gap-px bg-gold/10">
        <div
          v-for="boat in data.water.fleet"
          :key="boat.id"
          class="bg-forest"
        >
          <!-- Accordion header -->
          <button
            type="button"
            class="w-full text-left px-8 py-6 flex items-center gap-6 group"
            @click="openBoat = openBoat === boat.id ? null : boat.id"
          >
            <div class="flex-1 min-w-0">
              <p class="text-gold/50 text-[9px] tracking-[0.35em] uppercase font-sans mb-1">{{ boat.type }}</p>
              <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 class="font-display text-white text-xl font-light">{{ boat.name }}</h3>
                <span class="text-white/30 font-sans text-xs">{{ boat.units.length > 1 ? fill(p.unitsCount, boat.units.length) : boat.units[0] }}</span>
              </div>
            </div>
            <div class="hidden sm:flex items-center gap-6 shrink-0">
              <span class="text-white/30 font-sans text-xs">{{ fill(ustawienia?.maxPersons, boat.capacity) }}</span>
              <span class="text-gold font-sans text-sm font-medium">{{ boat.price }}</span>
              <span v-if="!boat.patent" class="text-[9px] tracking-widest uppercase border border-gold/30 text-gold/60 px-2 py-0.5">{{ p.noPatentLabel }}</span>
            </div>
            <svg
              class="w-4 h-4 text-white/25 shrink-0 transition-transform duration-300"
              :class="openBoat === boat.id ? 'rotate-180' : ''"
              viewBox="0 0 16 16" fill="none"
            >
              <path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Accordion body -->
          <div v-if="openBoat === boat.id" class="px-8 pb-8 border-t border-white/6">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 pt-7">
              <div>
                <p class="text-white/55 font-sans text-sm leading-relaxed mb-6">{{ boat.desc }}</p>
                <ul class="flex flex-col gap-2">
                  <li
                    v-for="spec in boat.specs"
                    :key="spec"
                    class="flex items-center gap-3 text-white/40 font-sans text-xs"
                  >
                    <span class="w-4 h-px bg-gold/40 shrink-0" />
                    {{ spec }}
                  </li>
                </ul>
                <a
                  v-if="(boat as any).href"
                  :href="(boat as any).href"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-2 mt-6 text-gold/60 hover:text-gold font-sans text-[11px] tracking-[0.15em] uppercase transition-colors"
                >
                  {{ p.specLink }}
                </a>
              </div>
              <div v-if="boat.units.length > 1" class="shrink-0">
                <p class="text-white/25 text-[9px] tracking-[0.35em] uppercase font-sans mb-3">{{ p.unitsLabel }}</p>
                <div class="flex flex-wrap lg:flex-col gap-2">
                  <span
                    v-for="unit in boat.units"
                    :key="unit"
                    class="border border-gold/20 text-gold/60 px-3 py-1 font-sans text-xs"
                  >{{ unit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Water pricing -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-8">{{ p.waterPricingTitle }}</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div v-for="group in data.water.pricing" :key="group.category" class="card-elevated bg-forest-void p-8">
          <p class="text-white text-[11px] tracking-[0.25em] uppercase font-sans mb-1 pb-4 border-b border-gold/20">{{ group.category }}</p>
          <p v-if="(group as any).note" class="text-gold/40 font-sans text-[10px] mb-4">{{ (group as any).note }}</p>
          <div class="flex flex-col gap-3 mt-5">
            <div v-for="item in group.items" :key="item.label" class="flex items-start justify-between gap-4">
              <span class="text-white/50 font-sans text-xs leading-relaxed">{{ item.label }}</span>
              <span class="text-gold font-sans text-xs whitespace-nowrap shrink-0">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Marina: header + collage -->
    <div class="border-t border-gold/15 max-w-7xl mx-auto px-8 lg:px-16 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div class="lg:order-2">
        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.marina.tag }}</p>
        <h2 class="font-display text-white text-3xl font-light mb-3">{{ data.marina.title }}</h2>
        <p class="text-white/45 font-sans text-sm leading-relaxed mb-8">{{ data.marina.body }}</p>
        <ul class="flex flex-col gap-2.5 mb-8">
          <li v-for="item in data.marina.amenities" :key="item" class="flex items-center gap-3 text-white/55 font-sans text-sm">
            <span class="w-4 h-px bg-gold/50 shrink-0" />{{ item }}
          </li>
        </ul>
        <a v-if="data.marina.phone" :href="telHref(data.marina.phone)" class="inline-flex items-center gap-3 text-gold group">
          <span class="w-6 h-px bg-gold/50 group-hover:w-10 transition-all duration-300" />
          <span class="font-sans text-sm tracking-wider">{{ data.marina.phone }}</span>
        </a>
      </div>
      <div class="lg:order-1 lg:pt-8">
        <PhotoCollage :images="data.marina.images" />
      </div>
    </div>

    <!-- Marina: pricing tables -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-8">{{ p.marinaPricingTitle }}</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="group in data.marina.pricing"
          :key="group.category"
          class="card-elevated bg-forest-void p-8"
        >
          <p class="text-white text-[11px] tracking-[0.25em] uppercase font-sans mb-6 pb-4 border-b border-gold/20">
            {{ group.category }}
          </p>
          <div class="flex flex-col gap-3">
            <div
              v-for="item in group.items"
              :key="item.label"
              class="flex items-start justify-between gap-4"
            >
              <span class="text-white/50 font-sans text-xs leading-relaxed">{{ item.label }}</span>
              <span class="text-gold font-sans text-xs whitespace-nowrap shrink-0">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Land activities: text + collage -->
    <div class="border-t border-gold/15 max-w-7xl mx-auto px-8 lg:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div>
        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.land.tag }}</p>
        <h2 class="font-display text-white text-3xl font-light mb-10">{{ data.land.title }}</h2>

        <div class="flex flex-col gap-6">
          <div
            v-for="item in data.land.items"
            :key="item.label"
            class="flex items-start gap-5"
          >
            <div class="text-gold opacity-70 shrink-0 mt-0.5">
              <ActivityIcon :name="item.icon" />
            </div>
            <div>
              <p class="font-display text-white text-lg font-light mb-1">{{ item.label }}</p>
              <p class="text-white/40 font-sans text-xs leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:pt-8">
        <PhotoCollage :images="data.land.images" />
      </div>
    </div>

    <!-- Groups CTA -->
    <ContactCta
      :tag="data.groups.tag"
      :title="data.groups.title"
      :dzial="p.groupsDzial"
    />

    <KontaktSection />
  </main>
</template>
