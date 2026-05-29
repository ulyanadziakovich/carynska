<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/noclegi'),
  useFetch('/api/content'),
])

const nav = useNav()
</script>

<template>
  <main v-if="data && content" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" />

    <PageHero :tag="data.hero.tag" :title="data.hero.title" :image="data.hero.image" />

    <div class="max-w-3xl mx-auto px-8 py-14 text-center">
      <p class="text-white/55 font-sans font-light text-sm leading-relaxed">{{ data.intro }}</p>
    </div>

    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
        <RoomCard v-for="room in data.rooms" :key="room.slug" :room="room" />
      </div>
    </div>

    <KontaktSection v-if="content" :data="content.kontakt" />
  </main>
</template>
