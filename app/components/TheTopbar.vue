<script setup lang="ts">
const phones = [
  { label: 'Noclegi', number: '+48 691 944 266', href: 'tel:+48691944266' },
  { label: 'Tawerna', number: '+48 514 177 136', href: 'tel:+48514177136' },
  { label: 'Bosmanat', number: '+48 536 700 537', href: 'tel:+48536700537' },
]
</script>

<template>
  <div class="bg-forest border-b border-white/8 relative z-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between">

      <!-- Phones -->
      <div class="flex items-center gap-6">
        <a
          v-for="p in phones"
          :key="p.label"
          :href="p.href"
          class="topbar-phone group hidden sm:flex items-center gap-2"
        >
          <svg class="w-2.5 h-2.5 text-gold/50 shrink-0" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2.5 1C2.5 1 1 1 1 2.5c0 5.523 4.477 10 10 10C12.5 12.5 12.5 11 12.5 11l-1.5-1.5c0 0-.5-.5-1 0L9 10.5C8 10 6 8 5.5 7L6.5 6c.5-.5 0-1 0-1L5 3.5C5 3.5 4 2.5 3.5 2.5L2.5 1z" transform="scale(0.85)"/>
          </svg>
          <span class="text-white/30 font-sans text-[10px] tracking-[0.15em] group-hover:text-white/60 transition-colors">{{ p.label }}</span>
          <span class="text-white/55 font-sans text-[10px] tracking-[0.05em] group-hover:text-gold transition-colors">{{ p.number }}</span>
        </a>
        <!-- Mobile: only main number -->
        <a href="tel:+48691944266" class="sm:hidden flex items-center gap-2 text-white/55 font-sans text-[10px]">
          <span class="text-white/30">Rezerwacje:</span>
          <span>+48 691 944 266</span>
        </a>
      </div>

      <!-- Right: email -->
      <a
        href="mailto:przystan@carynska.pl"
        class="hidden md:block text-white/25 hover:text-gold font-sans text-[10px] tracking-[0.1em] transition-colors"
      >
        przystan@carynska.pl
      </a>

    </div>
  </div>
</template>
