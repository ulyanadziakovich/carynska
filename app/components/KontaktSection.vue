<template>
  <section id="contact" class="bg-forest">

    <!-- Hero contact header with background -->
    <div class="relative py-24 overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-15"
        style="background-image: url('/images/solina1.avif')"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-forest via-forest/80 to-forest" />

      <div class="relative max-w-5xl mx-auto px-8 text-center">
        <!-- Logo -->
        <img
          src="/images/logo.png"
          alt="Przystań Caryńska"
          class="w-64 lg:w-80 mx-auto mb-10"
          style="filter: brightness(0) invert(1) sepia(0.8) saturate(1.4) hue-rotate(5deg) opacity(0.9)"
        />

        <p class="text-white/50 font-sans font-light text-sm tracking-[0.3em] uppercase mb-2">
          Polańczyk, ul. Równa 19 · 38-610 Polańczyk
        </p>
        <a
          href="mailto:przystan@carynska.pl"
          class="text-gold/80 hover:text-gold font-sans text-sm tracking-wider transition-colors duration-200"
        >
          przystan@carynska.pl
        </a>
      </div>
    </div>

    <!-- Divider -->
    <div class="flex items-center gap-4 px-8 lg:px-24 opacity-30">
      <div class="flex-1 h-px bg-gold" />
      <svg class="w-4 h-4 text-gold shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/>
      </svg>
      <div class="flex-1 h-px bg-gold" />
    </div>

    <!-- 3 Department cards -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">

        <div
          v-for="dept in departments"
          :key="dept.name"
          class="bg-forest group hover:bg-forest-mid transition-colors duration-300 p-10 lg:p-12 flex flex-col gap-6"
        >
          <!-- Icon -->
          <div class="w-12 h-12 border border-gold/30 group-hover:border-gold/60 flex items-center justify-center transition-colors duration-300">
            <component :is="'span'" class="text-gold text-xl">{{ dept.icon }}</component>
          </div>

          <!-- Label + name -->
          <div>
            <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-3">
              {{ dept.tag }}
            </p>
            <h3 class="font-display text-white text-2xl font-light">
              {{ dept.name }}
            </h3>
          </div>

          <p class="text-white/50 font-sans font-light text-sm leading-relaxed flex-1">
            {{ dept.desc }}
          </p>

          <!-- Phone -->
          <a
            :href="`tel:${dept.phone.replace(/\s/g, '')}`"
            class="flex items-center gap-3 group/phone"
          >
            <div class="w-8 h-px bg-gold/40 group-hover/phone:w-12 transition-all duration-300" />
            <span class="text-white font-sans text-base tracking-wider group-hover/phone:text-gold transition-colors duration-200">
              {{ dept.phone }}
            </span>
          </a>
        </div>

      </div>
    </div>

    <!-- Divider -->
    <div class="flex items-center gap-4 px-8 lg:px-24 opacity-30">
      <div class="flex-1 h-px bg-gold" />
      <svg class="w-4 h-4 text-gold shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/>
      </svg>
      <div class="flex-1 h-px bg-gold" />
    </div>

    <!-- Map -->
    <div class="w-full h-80 lg:h-[420px] mt-0">
      <iframe
        src="https://maps.google.com/maps?q=Przystan+Carynska+Polanczyk+Rowna+19&t=&z=15&ie=UTF8&iwloc=&output=embed"
        class="w-full h-full"
        style="border:0; filter: grayscale(80%) invert(8%) sepia(15%) saturate(300%) brightness(85%)"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>

    <!-- Bottom bar: social + platforms -->
    <div class="border-t border-gold/20 max-w-7xl mx-auto px-8 lg:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-8">

      <!-- Social -->
      <div class="flex items-center gap-6">
        <span class="text-white/30 text-[10px] tracking-[0.3em] uppercase font-sans">Śledź nas</span>
        <a href="https://www.facebook.com/PrzystanCarynska" target="_blank"
           class="w-9 h-9 border border-white/15 hover:border-gold flex items-center justify-center text-white/40 hover:text-gold transition-all duration-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/przystan_carynska" target="_blank"
           class="w-9 h-9 border border-white/15 hover:border-gold flex items-center justify-center text-white/40 hover:text-gold transition-all duration-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>

      <!-- Platforms -->
      <div class="flex items-center gap-4 flex-wrap justify-center">
        <span class="text-white/30 text-[10px] tracking-[0.3em] uppercase font-sans">Rezerwuj przez</span>
        <a href="https://www.booking.com/hotel/pl/przystan-carynska.pl.html" target="_blank"
           class="px-4 py-2 border border-white/15 hover:border-gold text-white/40 hover:text-gold text-[11px] font-sans tracking-wider transition-all duration-200">
          Booking.com
        </a>
        <a href="https://www.tripadvisor.com" target="_blank"
           class="px-4 py-2 border border-white/15 hover:border-gold text-white/40 hover:text-gold text-[11px] font-sans tracking-wider transition-all duration-200">
          TripAdvisor
        </a>
        <a href="https://www.noclegi.pl" target="_blank"
           class="px-4 py-2 border border-white/15 hover:border-gold text-white/40 hover:text-gold text-[11px] font-sans tracking-wider transition-all duration-200">
          Noclegi.pl
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-white/10 py-5 text-center">
      <p class="text-white/20 text-xs font-sans tracking-widest">
        © 2026 PRZYSTAŃ CARYŃSKA · POLAŃCZYK
      </p>
    </div>

  </section>
</template>

<script setup lang="ts">
const departments = [
  {
    icon: '🛏',
    tag: 'Rezerwacje',
    name: 'Noclegi',
    desc: 'Pokoje i apartamenty z widokiem na jezioro Solina. Rezerwacje, dostępność, pytania o pobyt.',
    phone: '+48 691 944 266',
  },
  {
    icon: '🍽',
    tag: 'Restauracja',
    name: 'Tawerna',
    desc: 'Kuchnia regionalna, catering, eventy i dostawy. Stolik lub zamówienie na wynos.',
    phone: '+48 514 177 136',
  },
  {
    icon: '⚓',
    tag: 'Przystań',
    name: 'Bosmanat',
    desc: 'Wynajem żaglówek, łodzi elektrycznych, kajaków i SUP. Informacje o sprzęcie wodnym.',
    phone: '+48 536 700 537',
  },
]
</script>
