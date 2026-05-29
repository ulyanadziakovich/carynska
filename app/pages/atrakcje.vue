<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/atrakcje'),
  useFetch('/api/content'),
])

const nav = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Noclegi', href: '/noclegi' },
    { label: 'Atrakcje', href: '/atrakcje' },
    { label: 'Contact', href: '/#contact' },
  ],
  cta: { label: 'Booking now', href: '/#booking' },
}
</script>

<template>
  <main v-if="data && content" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" />

    <PageHero :tag="data.hero.tag" :title="data.hero.title" :image="data.hero.image" />

    <!-- Intro -->
    <div class="max-w-3xl mx-auto px-8 py-14 text-center">
      <p class="text-white/55 font-sans font-light text-sm leading-relaxed">{{ data.intro }}</p>
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
        <PhotoCollage :images="[
          { src: '/images/solina2.avif', alt: 'Żaglówki' },
          { src: '/images/solina3.avif', alt: 'Jezioro Solina' },
          { src: '/images/solina4.avif', alt: 'Bieszczady' },
        ]" />
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
        <a :href="`tel:${data.marina.phone.replace(/\s/g,'')}`" class="inline-flex items-center gap-3 text-gold group">
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
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-8">Cennik usług</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
        <div
          v-for="group in data.marina.pricing"
          :key="group.category"
          class="bg-forest p-8"
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
        <PhotoCollage :images="[
          { src: '/images/solina4.avif', alt: 'Bieszczady' },
          { src: '/images/solina1.avif', alt: 'Jezioro z lotu ptaka' },
          { src: '/images/solina2.avif', alt: 'Jezioro Solina' },
        ]" />
      </div>
    </div>

    <!-- Groups CTA -->
    <ContactCta
      :tag="data.groups.tag"
      :title="data.groups.title"
      :cta="data.contact"
    />

    <KontaktSection :data="content.kontakt" />
  </main>
</template>
