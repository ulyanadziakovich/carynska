<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/tawerna'),
  useFetch('/api/content'),
])

const nav = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Noclegi', href: '/noclegi' },
    { label: 'Atrakcje', href: '/atrakcje' },
    { label: 'Tawerna', href: '/tawerna' },
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
    <div class="max-w-2xl mx-auto px-8 py-14 text-center">
      <p class="text-white/55 font-sans font-light text-sm leading-relaxed">{{ data.intro }}</p>
    </div>

    <!-- Menu -->
    <div class="max-w-4xl mx-auto px-8 lg:px-16 pb-24">

      <div v-for="(section, i) in data.menu" :key="section.category">

        <!-- Category divider -->
        <div class="flex items-center gap-6 mb-8" :class="i > 0 ? 'mt-14' : ''">
          <div class="flex-1 h-px bg-gold/20" />
          <h2 class="font-display text-gold text-xl font-light tracking-[0.15em]">
            {{ section.category }}
          </h2>
          <div class="flex-1 h-px bg-gold/20" />
        </div>

        <!-- Items -->
        <div class="flex flex-col gap-0">
          <div
            v-for="item in section.items"
            :key="item.name"
            class="flex items-baseline gap-4 py-3 border-b border-white/5 group"
          >
            <span class="text-white/80 font-sans text-sm font-light flex-1 group-hover:text-white transition-colors">
              {{ item.name }}
            </span>
            <div class="flex items-baseline gap-3 shrink-0">
              <span v-if="item.note" class="text-white/30 font-sans text-xs italic">{{ item.note }}</span>
              <span v-if="item.price" class="text-gold font-sans text-sm tracking-wider">{{ item.price }}</span>
              <span v-else class="text-white/20 font-sans text-xs">—</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Delivery -->
    <div class="border-t border-gold/20 bg-forest-mid py-16 px-8">
      <div class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">Dostawa</p>
          <h2 class="font-display text-white text-3xl font-light mb-4">{{ data.delivery.title }}</h2>
          <p class="text-white/50 font-sans text-sm leading-relaxed">{{ data.delivery.body }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 lg:justify-end">
          <a
            :href="`tel:${data.delivery.phone.replace(/\s/g,'')}`"
            class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider text-center"
          >{{ data.delivery.phone }}</a>
          <a
            :href="`mailto:${data.contact.email}`"
            class="border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider text-center"
          >{{ data.contact.email }}</a>
        </div>
      </div>
    </div>

    <KontaktSection :data="content.kontakt" />
  </main>
</template>
