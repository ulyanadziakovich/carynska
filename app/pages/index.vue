<script setup lang="ts">
const { data: content } = await useFetch('/api/content')
</script>

<template>
  <main v-if="content" class="bg-forest min-h-screen">
    <TheNavbar :nav="content.nav" />
    <HeroSection :hero="content.hero" />
    <NoclegiSection :data="content.noclegi" />
    <AtrakcjeSection :data="content.atrakcje" />
    <KuchniaSection :data="content.kuchnia" />
    <KontaktSection :data="content.kontakt" />
  </main>
</template>
