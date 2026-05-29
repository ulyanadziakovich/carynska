<template>
  <section class="bg-forest py-24 px-6 lg:px-12">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
        <div>
          <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-5">
            Oferta grupowa
          </p>
          <h2
            class="font-display text-white font-light leading-tight"
            style="font-size: clamp(2.2rem, 4vw, 3.2rem)"
          >
            Grupy &amp; Eventy
          </h2>
        </div>
        <p class="text-white/50 font-sans font-light text-sm max-w-sm leading-relaxed">
          Konferencje, integracje, wesela i eventy firmowe.<br />
          Parking, catering i pełna obsługa w sercu Bieszczad.
        </p>
      </div>

      <!-- Cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
        <div
          v-for="card in cards"
          :key="card.title"
          class="relative overflow-hidden group cursor-pointer"
          style="aspect-ratio: 4/3"
        >
          <img
            :src="card.image"
            :alt="card.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
          <div class="absolute bottom-0 inset-x-0 p-7">
            <p class="text-gold text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
              {{ card.tag }}
            </p>
            <h3 class="font-display text-white text-2xl font-light">{{ card.title }}</h3>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-14 flex justify-center">
        <a
          href="#contact"
          class="border border-gold/60 text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-sans"
        >
          Zapytaj o ofertę
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    title: 'Konferencje',
    tag: 'Biznes',
    image: '/images/solina2.avif',
  },
  {
    title: 'Integracje',
    tag: 'Zespoły',
    image: '/images/solina3.avif',
  },
  {
    title: 'Eventy & Wesela',
    tag: 'Uroczystości',
    image: '/images/solina4.avif',
  },
]
</script>
