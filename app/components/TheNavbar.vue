<script setup lang="ts">
defineProps<{
  nav: {
    links: { label: string; href: string }[]
    cta: { label: string; href: string }
  }
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
      <a
        href="/"
        class="font-display text-white tracking-[0.25em] text-lg font-medium select-none transition-all duration-500"
        :class="(scrolled || alwaysShowLogo) ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        PRZYSTAŃ CARYŃSKA
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in nav.links"
          :key="link.label"
          :href="link.href"
          class="text-white/70 hover:text-white text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 font-sans"
        >
          {{ link.label }}
        </a>
        <a
          :href="nav.cta.href"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-sans"
        >
          {{ nav.cta.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
