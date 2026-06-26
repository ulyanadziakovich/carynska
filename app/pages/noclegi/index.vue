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

    <PageHero
      tag="Noclegi"
      :title="data.hero.title"
      :image="data.hero.image"
    />

    <!-- Intro -->
    <div class="max-w-2xl mx-auto px-8 py-16 text-center">
      <p class="text-white/50 font-sans font-light text-sm leading-relaxed">{{ data.intro }}</p>
    </div>

    <!-- Three main tiles -->
    <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">

        <!-- Pokoje tile -->
        <NuxtLink to="/noclegi/pokoje" class="hub-tile group">
          <img src="/images/solina2.avif" alt="Pokoje" class="hub-tile-img" />
          <div class="hub-tile-overlay" />
          <div class="hub-tile-body">
            <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans">Zakwaterowanie</p>
            <h2 class="font-display text-white font-light" style="font-size: clamp(1.8rem, 2.5vw, 2.5rem)">Pokoje &<br>Apartamenty</h2>
            <p class="text-white/45 font-sans text-sm leading-relaxed">6 typów pokoi z widokiem na jezioro Solina</p>
            <div class="hub-cta">
              <span>Zobacz pokoje</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Cennik tile -->
        <NuxtLink to="/noclegi/cennik" class="hub-tile-dark group flex flex-col justify-between p-10 gap-8">
          <div>
            <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-5">Ceny</p>
            <h2 class="font-display text-white font-light mb-3" style="font-size: clamp(1.8rem, 2.5vw, 2.5rem)">Cennik<br>2025</h2>
            <p class="text-white/35 font-sans text-sm leading-relaxed">Pokoje od 260 zł/dobę<br>Apartament od 700 zł/dobę</p>
          </div>
          <div class="space-y-0 border border-gold/10">
            <div
              v-for="row in data.pricing.rows.slice(0, 3)"
              :key="row.type"
              class="flex justify-between gap-4 px-5 py-3 border-b border-white/6 last:border-0"
            >
              <span class="text-white/35 font-sans text-xs">{{ row.type }}</span>
              <span class="text-gold font-sans text-xs">{{ row.p2 !== '—' ? row.p2 : row.p1 }}</span>
            </div>
          </div>
          <div class="hub-cta">
            <span>Pełny cennik</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          </div>
        </NuxtLink>

        <!-- Grupy tile -->
        <NuxtLink to="/grupy" class="hub-tile group">
          <img src="/images/tawerna-bar.jpg" alt="Grupy i eventy" class="hub-tile-img" />
          <div class="hub-tile-overlay" />
          <div class="hub-tile-body">
            <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans">Organizacja</p>
            <h2 class="font-display text-white font-light" style="font-size: clamp(1.8rem, 2.5vw, 2.5rem)">Grupy &<br>Eventy</h2>
            <p class="text-white/45 font-sans text-sm leading-relaxed">Wesela, konferencje, zielone szkoły, eventy dla min. 25 osób</p>
            <div class="hub-cta">
              <span>Dowiedz się więcej</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>

    <KontaktSection :data="content.kontakt" />
  </main>
</template>

<style scoped>
.hub-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 480px;
  overflow: hidden;
}
.hub-tile-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}
.hub-tile:hover .hub-tile-img { transform: scale(1.05); }
.hub-tile-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(14,22,14,0.95) 0%, rgba(14,22,14,0.35) 60%, transparent 100%);
}
.hub-tile-body {
  position: relative;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.hub-tile-dark {
  min-height: 480px;
  background: #162216;
  transition: background 0.3s;
}
.hub-tile-dark:hover { background: #1c2c1c; }
.hub-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #C9A96E;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 0.5rem;
  transition: gap 0.3s;
}
.group:hover .hub-cta { gap: 14px; }
</style>
