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
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-16">
      <div class="mb-10">
        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.water.tag }}</p>
        <h2 class="font-display text-white text-3xl font-light">{{ data.water.title }}</h2>
        <p class="text-white/50 font-sans text-sm mt-4 max-w-xl leading-relaxed">{{ data.water.body }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10">
        <div
          v-for="item in data.water.items"
          :key="item.label"
          class="bg-forest p-8 flex flex-col gap-4"
        >
          <div class="text-gold opacity-80">
            <ActivityIcon :name="item.icon" />
          </div>
          <h3 class="font-display text-white text-xl font-light">{{ item.label }}</h3>
          <p class="text-white/45 font-sans font-light text-sm leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Marina services -->
    <div class="border-t border-gold/20 bg-forest-mid">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.marina.tag }}</p>
          <h2 class="font-display text-white text-3xl font-light mb-8">{{ data.marina.title }}</h2>
          <ul class="flex flex-col gap-3">
            <li
              v-for="item in data.marina.items"
              :key="item.label"
              class="flex items-center gap-3 text-white/60 font-sans text-sm"
            >
              <span class="w-5 h-px bg-gold/50 shrink-0" />
              {{ item.label }}
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-4">
          <p class="text-white/30 text-xs font-sans tracking-[0.3em] uppercase">Kontakt — Bosmanat</p>
          <a
            :href="`tel:${data.marina.phone.replace(/\s/g,'')}`"
            class="font-display text-white text-2xl font-light hover:text-gold transition-colors"
          >{{ data.marina.phone }}</a>
        </div>
      </div>
    </div>

    <!-- Land activities -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16">
      <div class="mb-10">
        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.land.tag }}</p>
        <h2 class="font-display text-white text-3xl font-light">{{ data.land.title }}</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gold/10">
        <div
          v-for="item in data.land.items"
          :key="item.label"
          class="bg-forest p-8 flex flex-col gap-4"
        >
          <div class="text-gold opacity-80">
            <ActivityIcon :name="item.icon" />
          </div>
          <h3 class="font-display text-white text-xl font-light">{{ item.label }}</h3>
          <p class="text-white/45 font-sans font-light text-sm leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Groups CTA -->
    <div class="border-t border-gold/20 bg-forest-mid py-16 px-8 text-center">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ data.groups.tag }}</p>
      <h2 class="font-display text-white text-3xl font-light mb-6">{{ data.groups.title }}</h2>
      <p class="text-white/50 font-sans text-sm max-w-xl mx-auto leading-relaxed mb-10">{{ data.groups.body }}</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          :href="`tel:${data.groups.cta.phone.replace(/\s/g,'')}`"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider"
        >{{ data.groups.cta.phone }}</a>
        <a
          :href="`mailto:${data.groups.cta.email}`"
          class="border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider"
        >{{ data.groups.cta.email }}</a>
      </div>
    </div>

    <KontaktSection :data="content.kontakt" />
  </main>
</template>
