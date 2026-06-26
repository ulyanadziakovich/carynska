<script setup lang="ts">
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
