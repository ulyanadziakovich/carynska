<script setup lang="ts">
const { data: p } = await useCmsSingle('noclegi-cennik')
useCmsSeo(p)
const nav = await useNav()

/** Puste pole w CMS = brak ceny (pokazujemy kreskę, jak dotąd). */
const price = (v?: string) => v?.trim() || '—'
</script>

<template>
  <main v-if="p" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero :tag="p.heroTag" :title="p.heroTitle" :image="cmsImg(p.heroImage) ?? ''" :subtitle="p.heroSubtitle" />

    <div class="max-w-4xl mx-auto px-8 lg:px-12 py-20">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-white/25 mb-16">
        <NuxtLink to="/noclegi/pokoje" class="hover:text-gold transition-colors">{{ p.crumbParent }}</NuxtLink>
        <span>/</span>
        <span class="text-white/45">{{ p.crumbCurrent }}</span>
      </div>

      <!-- Pricing table -->
      <section id="cennik" class="scroll-mt-20 mb-20">
        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ p.kicker }}</p>
        <h2 class="font-display text-white text-3xl font-light mb-10">{{ p.tableTitle }}</h2>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm font-sans border-collapse">
            <thead>
              <tr class="border-b border-gold/30">
                <th class="text-left text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 pr-6 font-normal">{{ p.colType }}</th>
                <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">{{ p.col1 }}</th>
                <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">{{ p.col2 }}</th>
                <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">{{ p.col3 }}</th>
                <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">{{ p.col4 }}</th>
                <th class="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase py-3 px-4 font-normal">{{ p.colApt }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in p.rows"
                :key="row.type"
                class="border-b border-white/6 hover:bg-white/3 transition-colors"
              >
                <td class="text-white/70 py-4 pr-6">{{ row.type }}</td>
                <td class="text-center py-4 px-4" :class="price(row.p1) === '—' ? 'text-white/20' : 'text-gold'">{{ price(row.p1) }}</td>
                <td class="text-center py-4 px-4" :class="price(row.p2) === '—' ? 'text-white/20' : 'text-gold'">{{ price(row.p2) }}</td>
                <td class="text-center py-4 px-4" :class="price(row.p3) === '—' ? 'text-white/20' : 'text-gold'">{{ price(row.p3) }}</td>
                <td class="text-center py-4 px-4" :class="price(row.p4) === '—' ? 'text-white/20' : 'text-gold'">{{ price(row.p4) }}</td>
                <td class="text-center py-4 px-4" :class="price(row.apt) === '—' ? 'text-white/20' : 'text-gold'">{{ price(row.apt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-white/30 font-sans text-xs leading-relaxed">{{ p.note }}</p>
      </section>

      <!-- Extras -->
      <section class="mb-20">
        <p class="text-white text-[11px] tracking-[0.25em] uppercase font-sans mb-6 pb-3 border-b border-gold/20">{{ p.extrasTitle }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          <div
            v-for="extra in p.extras"
            :key="extra.label"
            class="flex items-baseline justify-between gap-4 py-3.5 border-b border-white/6"
          >
            <span class="text-white/60 font-sans text-sm">{{ extra.label }}</span>
            <span class="text-gold font-sans text-sm shrink-0">{{ extra.price }}</span>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gold/15 pt-10">
        <div>
          <p class="text-white/35 font-sans text-xs mb-1">{{ p.contactTitle }}</p>
          <a v-if="p.dzial?.phone" :href="telHref(p.dzial.phone)" class="text-gold font-display text-2xl font-light tracking-wide">{{ p.dzial.phone }}</a>
        </div>
        <a
          :href="p.ctaHref"
          target="_blank"
          rel="noopener"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans"
        >
          {{ p.cta }}
        </a>
      </div>

    </div>

    <KontaktSection />
  </main>
</template>
