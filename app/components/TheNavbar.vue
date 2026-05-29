<script setup lang="ts">
import type { NavLink } from '~/composables/useNav'

defineProps<{
  nav: { links: NavLink[]; cta: { label: string; href: string } }
  alwaysShowLogo?: boolean
}>()

const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-forest/95 backdrop-blur-sm py-3 shadow-2xl' : 'bg-transparent py-5'"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

      <!-- Logo -->
      <a
        href="/"
        class="font-display text-white tracking-[0.25em] text-lg font-medium select-none transition-all duration-500"
        :class="(scrolled || alwaysShowLogo) ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        PRZYSTAŃ CARYŃSKA
      </a>

      <!-- Links -->
      <div class="hidden md:flex items-center gap-8">
        <div
          v-for="link in nav.links"
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
                class="block px-5 py-2.5 text-white/60 hover:text-gold hover:bg-white/5 text-[11px] tracking-[0.15em] uppercase font-sans transition-colors duration-150 whitespace-nowrap"
              >
                {{ child.label }}
              </a>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <a
          :href="nav.cta.href"
          target="_blank"
          rel="noopener"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-sans"
        >
          {{ nav.cta.label }}
        </a>
      </div>

    </div>
  </nav>
</template>
