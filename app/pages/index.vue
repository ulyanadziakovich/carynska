<script setup lang="ts">
const { data: content } = await useFetch('/api/content')
const nav = useNav()
</script>

<template>
  <main v-if="content" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" />
    <HeroSection :hero="content.hero" />
    <NoclegiSection :data="content.noclegi" />
    <AtrakcjeSection :data="content.atrakcje" />
    <KuchniaSection :data="content.kuchnia" />
    <ReviewsSection :reviews="content.reviews" />
    <KontaktSection :data="content.kontakt" />
  </main>
</template>
