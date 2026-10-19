<script setup lang="ts">
// Wspólne dla całej strony, z Ustawień → „Google i wyszukiwarki”: ikona, statystyki, końcówka tytułu.
const { ustawienia } = await useSite()
const img = useCmsImg()
const favicon = computed(() => img(ustawienia.value?.favicon))
// Identyfikator trafia do skryptu — przepuszczamy tylko format Google (np. G-KSRW79Y4C6).
const gaId = computed(() => {
  const id = ustawienia.value?.gaId?.trim()
  return id && /^[A-Z]{1,3}-[A-Z0-9-]+$/i.test(id) ? id : undefined
})

useHead({
  htmlAttrs: { lang: 'pl' },
  titleTemplate: (t) => {
    const name = ustawienia.value?.siteName
    // Bez dublowania, gdy tytuł strony to sama nazwa obiektu (np. „PRZYSTAŃ CARYŃSKA” na głównej).
    return t && t.toLowerCase() !== name?.toLowerCase() ? [t, name].filter(Boolean).join(' · ') : name ?? null
  },
  link: () => (favicon.value ? [
    { rel: 'icon', type: 'image/png', href: favicon.value },
    { rel: 'apple-touch-icon', href: favicon.value },
  ] : []),
  script: () => (gaId.value ? [
    { src: `https://www.googletagmanager.com/gtag/js?id=${gaId.value}`, async: true },
    { innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId.value}');` },
  ] : []),
})

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > window.innerHeight * 0.7
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <!-- Floating call button (pojawia się po hero) -->
    <Transition name="fab">
      <CallMenu v-if="scrolled" variant="fab" />
    </Transition>
  </div>
</template>

<style>
.fab-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fab-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateY(12px); }
</style>
