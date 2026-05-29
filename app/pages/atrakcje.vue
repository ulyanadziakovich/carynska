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

    <!-- Water activities -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-6">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-3">{{ data.water.tag }}</p>
      <h2 class="font-display text-white text-3xl font-light mb-2">{{ data.water.title }}</h2>
      <p class="text-white/45 font-sans text-sm max-w-lg leading-relaxed mb-10">{{ data.water.body }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10">
        <div v-for="item in data.water.items" :key="item.label" class="bg-forest flex flex-col group">
          <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
            <img :src="item.image" :alt="item.label" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          </div>
          <div class="p-6 flex flex-col gap-3">
            <div class="text-gold opacity-75">
              <ActivityIcon :name="item.icon" />
            </div>
            <h3 class="font-display text-white text-lg font-light">{{ item.label }}</h3>
            <p class="text-white/45 font-sans text-xs leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Marina services — text only, no image -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16 border-t border-gold/15">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.marina.tag }}</p>
          <h2 class="font-display text-white text-3xl font-light mb-8">{{ data.marina.title }}</h2>
          <ul class="flex flex-col gap-3">
            <li v-for="item in data.marina.items" :key="item.label" class="flex items-center gap-3 text-white/55 font-sans text-sm">
              <span class="w-5 h-px bg-gold/50 shrink-0" />
              {{ item.label }}
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-4 lg:pt-16">
          <p class="text-white/30 text-[10px] tracking-[0.3em] uppercase font-sans">Bosmanat — kontakt</p>
          <a :href="`tel:${data.marina.phone.replace(/\s/g,'')}`"
             class="font-display text-white text-2xl font-light hover:text-gold transition-colors">
            {{ data.marina.phone }}
          </a>
        </div>
      </div>
    </div>

    <!-- Land activities -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-16 border-t border-gold/15">
      <div class="pt-16 mb-8">
        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-3">{{ data.land.tag }}</p>
        <h2 class="font-display text-white text-3xl font-light">{{ data.land.title }}</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
        <div v-for="item in data.land.items" :key="item.label" class="bg-forest flex flex-col group">
          <div class="relative overflow-hidden" style="aspect-ratio: 16/9">
            <img :src="item.image" :alt="item.label" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
          </div>
          <div class="p-7 flex flex-col gap-3">
            <div class="text-gold opacity-75">
              <ActivityIcon :name="item.icon" />
            </div>
            <h3 class="font-display text-white text-xl font-light">{{ item.label }}</h3>
            <p class="text-white/45 font-sans text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
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
