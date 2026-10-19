<script setup lang="ts">
import type { NavLink } from '~/composables/useNav'

withDefaults(defineProps<{
  nav: { links: NavLink[]; cta: { label: string; href: string } }
  alwaysShowLogo?: boolean
  overlay?: boolean
}>(), { overlay: true })

const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const menuOpen = ref(false)
</script>

<template>
  <nav :class="overlay ? 'fixed top-0 inset-x-0 z-50' : 'relative z-50'">

    <NavbarContactBar :scrolled="scrolled" @open-menu="menuOpen = true" />

    <!-- Main nav row: logo + desktop links, hidden on mobile (logo/hamburger live in the contact bar there) -->
    <div
      class="hidden md:block transition-all duration-500"
      :class="scrolled ? 'bg-forest/95 backdrop-blur-sm py-3 shadow-2xl' : (overlay ? 'bg-forest/70 backdrop-blur-sm py-5' : 'bg-forest py-5')"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a
          href="/"
          class="select-none transition-all duration-500 flex items-center"
          :class="(scrolled || alwaysShowLogo) ? 'opacity-100' : 'opacity-80'"
        >
          <NavbarLogo class="h-7 md:h-10 w-auto object-contain" />
        </a>

        <NavbarDesktopLinks :links="nav.links" :cta="nav.cta" />
      </div>
    </div>

    <NavbarMobileMenu :open="menuOpen" :links="nav.links" :cta="nav.cta" @close="menuOpen = false" />
  </nav>
</template>
