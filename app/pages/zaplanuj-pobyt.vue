<script setup lang="ts">
const { data: p } = await useCmsSingle('zaplanuj-pobyt')
const { ustawienia, kontakt } = await useSite()
const nav = await useNav()
</script>

<template>
  <main v-if="p" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero :tag="p.heroTag" :title="p.heroTitle" :image="cmsImg(p.heroImage) ?? ''" />

    <div class="bg-forest-wash">

      <!-- Breadcrumb -->
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pt-8">
        <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-white/35">
          <NuxtLink to="/" class="hover:text-gold transition-colors">{{ ustawienia?.breadcrumbHome }}</NuxtLink>
          <span>/</span>
          <span class="text-white/55">{{ p.heroTitle }}</span>
        </div>
      </div>

      <!-- Description -->
      <div class="max-w-3xl mx-auto px-8 py-14 text-center">
        <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-6">{{ p.aboutTitle }}</p>
        <!-- Treść z edytora CMS — HTML oczyszczony w proxy (server/utils/cmsHtml.ts). -->
        <div class="about-body space-y-6 text-white/70 font-sans text-base leading-relaxed" v-html="p.aboutBody" />
        <div class="w-8 h-px bg-gold mx-auto mt-10" />
      </div>

      <!-- Object tiles -->
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
        <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-8 text-center">{{ p.tilesTitle }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(obj, i) in p.tiles"
            :key="i"
            :to="obj.href"
            class="card-elevated group cursor-pointer overflow-hidden"
          >
            <div class="bg-forest-void h-full flex flex-col">
              <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
                <img v-if="cmsImg(obj.image)"
                  :src="cmsImg(obj.image)"
                  :alt="obj.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="p-7 flex flex-col gap-3 flex-1">
                <div>
                  <p class="text-gold/70 text-[10px] tracking-[0.35em] uppercase font-sans mb-1">{{ obj.tag }}</p>
                  <h2 class="font-display text-white text-2xl font-light">{{ obj.title }}</h2>
                </div>
                <p class="text-white/55 font-sans text-sm leading-relaxed">{{ obj.desc }}</p>
                <div class="mt-auto pt-4 border-t border-white/8 flex items-center justify-end">
                  <span class="text-gold/60 font-sans text-[10px] tracking-[0.15em] uppercase group-hover:text-gold transition-colors">{{ p.tileCta }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Sister objects: nasze noclegi w głębi Bieszczad -->
        <div class="mt-14">
          <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-6 text-center">{{ p.sistersTitle }}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div v-for="obj in kontakt?.sisters" :key="obj.name" class="card-elevated border border-gold/20 bg-forest-void overflow-hidden flex flex-col">
              <div v-if="obj.image" class="relative overflow-hidden" style="aspect-ratio: 16/9">
                <img v-if="cmsImg(obj.image)" :src="cmsImg(obj.image)" :alt="obj.imageAlt" class="w-full h-full object-cover" />
              </div>
              <div class="p-8 flex flex-col gap-4 flex-1">
                <div>
                  <p class="text-gold/70 text-[10px] tracking-[0.35em] uppercase font-sans mb-1">{{ obj.location }}</p>
                  <h3 class="font-display text-white text-2xl font-light">{{ obj.name }}</h3>
                </div>
                <p class="text-white/55 font-sans text-sm leading-relaxed flex-1">{{ obj.longDesc }}</p>
                <a
                  :href="obj.href"
                  target="_blank"
                  rel="noopener"
                  class="mt-auto inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold/80 text-forest px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold transition-colors"
                >
                  {{ obj.cta }}
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Nearby / region link -->
        <div class="mt-14 flex flex-col items-center gap-4 border-t border-gold/15 pt-12 text-center">
          <p class="text-white/50 font-sans text-sm">{{ p.nearbyText }}</p>
          <a
            :href="p.nearbyHref"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans"
          >
            {{ p.nearbyCta }}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          </a>
        </div>
      </div>
    </div>

    <KontaktSection />
  </main>
</template>

<style scoped>
/* Linki w tekście „O ośrodku” (z edytora CMS) — styl jak dotąd. */
.about-body :deep(a) {
  color: var(--color-gold);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--color-gold) 40%, transparent);
  text-underline-offset: 4px;
  transition: text-decoration-color 0.15s;
}
.about-body :deep(a:hover) { text-decoration-color: var(--color-gold); }
</style>
