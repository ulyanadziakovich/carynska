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

    <!-- Cennik -->
    <section id="cennik" class="max-w-7xl mx-auto px-8 lg:px-16 py-24 scroll-mt-20">
      <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">Cennik</p>
      <h2 class="font-display text-white text-3xl font-light mb-10">Cennik pokoi 2025</h2>

      <!-- Price table -->
      <div class="overflow-x-auto mb-6">
        <table class="w-full text-sm font-sans border-collapse">
          <thead>
            <tr class="border-b border-gold/30">
              <th class="text-left text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 pr-6 font-normal">Rodzaj pokoju</th>
              <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">1 os.</th>
              <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">2 os.</th>
              <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">3 os.</th>
              <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">4 os.</th>
              <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">Apt.</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in data.pricing.rows"
              :key="row.type"
              class="border-b border-white/6 hover:bg-white/3 transition-colors"
            >
              <td class="text-white/70 py-4 pr-6">{{ row.type }}</td>
              <td class="text-center py-4 px-4" :class="row.p1 === '—' ? 'text-white/20' : 'text-gold'">{{ row.p1 }}</td>
              <td class="text-center py-4 px-4" :class="row.p2 === '—' ? 'text-white/20' : 'text-gold'">{{ row.p2 }}</td>
              <td class="text-center py-4 px-4" :class="row.p3 === '—' ? 'text-white/20' : 'text-gold'">{{ row.p3 }}</td>
              <td class="text-center py-4 px-4" :class="row.p4 === '—' ? 'text-white/20' : 'text-gold'">{{ row.p4 }}</td>
              <td class="text-center py-4 px-4" :class="row.apt === '—' ? 'text-white/20' : 'text-gold'">{{ row.apt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-white/30 font-sans text-xs leading-relaxed mb-14">{{ data.pricing.note }}</p>

      <!-- Extras -->
      <p class="text-white text-[11px] tracking-[0.25em] uppercase font-sans mb-6 pb-3 border-b border-gold/20">Usługi dodatkowe</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
        <div
          v-for="extra in data.pricing.extras"
          :key="extra.label"
          class="flex items-baseline justify-between gap-4 py-3 border-b border-white/6"
        >
          <span class="text-white/60 font-sans text-sm">{{ extra.label }}</span>
          <span class="text-gold font-sans text-sm shrink-0">{{ extra.price }}</span>
        </div>
      </div>
    </section>

    <KontaktSection v-if="content" :data="content.kontakt" />
  </main>
</template>
