<script setup lang="ts">
const nav = useNav()

const points = [
  'Okres najmu, dane jachtu i załogi oraz warunki ubezpieczenia (OC i NNW).',
  'Odpowiedzialność najemcy, kaucja gwarancyjna i zasady jej zwrotu.',
  'Zasady rezerwacji, zaliczki oraz anulowania rezerwacji.',
  'Obowiązki przy odbiorze i zwrocie jachtu (protokół, sprzątanie).',
]
</script>

<template>
  <main class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero tag="Dokumenty" title="Wzór umowy najmu jachtu" image="/images/saturn25-jezero.webp" />

    <div class="max-w-3xl mx-auto px-8 lg:px-0 py-16 lg:py-20">

      <!-- Sample notice -->
      <div class="border border-gold/25 bg-gold/[0.06] px-6 py-5 mb-10">
        <p class="text-gold text-[10px] tracking-[0.35em] uppercase font-sans mb-2">Dokument poglądowy</p>
        <p class="text-white/65 font-sans text-sm leading-relaxed">
          Poniższy dokument to <strong class="text-white/85 font-medium">przykładowy wzór</strong> umowy najmu jachtu —
          służy wyłącznie do zapoznania się z warunkami przed rezerwacją. Ostateczną umowę, z aktualnymi cenami
          i danymi, podpisuje się na miejscu przy odbiorze jachtu.
        </p>
      </div>

      <p class="text-white/50 font-sans text-sm leading-relaxed mb-6">
        We wzorze umowy znajdziesz m.in.:
      </p>
      <ul class="flex flex-col gap-2.5 mb-12">
        <li
          v-for="(p, i) in points"
          :key="i"
          class="flex items-start gap-3 text-white/60 font-sans text-sm leading-relaxed"
        >
          <span class="w-4 h-px bg-gold/50 shrink-0 mt-2.5" />
          {{ p }}
        </li>
      </ul>

      <div class="flex flex-col sm:flex-row gap-4">
        <a
          href="/dokumenty/wzor-umowy-najmu-jachtu.pdf"
          download
          class="inline-flex items-center justify-center gap-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Pobierz wzór umowy (PDF)
        </a>
        <NuxtLink
          to="/noclegi/jacht"
          class="inline-flex items-center justify-center gap-3 border border-white/15 text-white/50 hover:border-gold hover:text-gold transition-all px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans"
        >
          Zobacz jachty
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
