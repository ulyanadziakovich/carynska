<script setup lang="ts">
/** Linki menu z rozwijanymi podmenu i przycisk rezerwacji (desktop). */
import type { NavLink } from '~/composables/useNav'

defineProps<{ links: NavLink[]; cta: { label: string; href: string } }>()
</script>

<template>
  <div class="hidden md:flex items-center gap-8">
    <div
      v-for="link in links"
      :key="link.label"
      class="relative group"
    >
      <!-- Top-level link -->
      <a
        :href="link.href"
        class="flex items-center gap-1 text-white/70 hover:text-white text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 font-sans py-2"
      >
        {{ link.label }}
        <svg
          v-if="link.children"
          class="w-2.5 h-2.5 opacity-50 transition-transform duration-200 group-hover:rotate-180"
          viewBox="0 0 10 6" fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </a>

      <!-- Dropdown -->
      <div
        v-if="link.children"
        class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200"
      >
        <div class="bg-forest/97 backdrop-blur-md border border-gold/20 py-2 min-w-[200px] shadow-2xl">
          <a
            v-for="child in link.children"
            :key="child.label"
            :href="child.href"
            :target="child.external ? '_blank' : undefined"
            :rel="child.external ? 'noopener' : undefined"
            class="block px-5 py-2.5 hover:bg-white/5 transition-colors duration-150 whitespace-nowrap"
          >
            <span class="text-white/60 hover:text-gold text-[11px] tracking-[0.15em] uppercase font-sans">{{ child.label }}</span>
            <span v-if="child.subtitle" class="block text-gold/70 text-[11px] tracking-[0.08em] mt-0.5 font-sans normal-case">{{ child.subtitle }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <a
      :href="cta.href"
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-2.5 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-sans"
    >
      <!-- Kalendarz z zaznaczonym dniem -->
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
        <path d="M16 2.5v4M8 2.5v4M3 10h18" />
        <path d="m9 15.5 2 2 4-4" />
      </svg>
      {{ cta.label }}
    </a>
  </div>
</template>
