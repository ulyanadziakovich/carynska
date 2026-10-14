<script setup lang="ts">
const nav = await useNav()

const rules = [
  { text: 'Wypożyczalnia sprzętu wodnego czynna jest codziennie w wyznaczonych godzinach w sezonie letnim.' },
  {
    text: 'Sprzęt wodny wypożycza się:',
    sub: [
      'osobom pełnoletnim po podpisaniu „Oświadczenia o zapoznaniu się z regulaminem sprzętu wodnego” (załącznik do regulaminu);',
      'osoba pełnoletnia dysponująca sprzętem pływającym może zabrać na pokład tylko jedną osobę nieumiejącą pływać.',
    ],
  },
  { text: 'Osoby nieletnie mogą korzystać z wypożyczonego sprzętu tylko pod opieką osób pełnoletnich, które ponoszą odpowiedzialność za nie, za ich zachowanie i ewentualne szkody.' },
  { text: 'Osoby korzystające ze sprzętu pływającego muszą być wyposażone w kapoki lub kamizelki asekuracyjne (ratunkowe).' },
  { text: 'Osoba wynajmująca sprzęt pływający ponosi odpowiedzialność materialną za ewentualne uszkodzenia oraz braki w wyposażeniu sprzętu wynikłe z winy użytkownika.' },
  { text: 'Osoby w stanie nietrzeźwym nie mogą korzystać ze sprzętu.' },
  {
    text: 'Użytkownikom sprzętu zabrania się:',
    sub: [
      'kąpieli podczas pływania (w tym skoków ze sprzętu do wody);',
      'wędkowania (z wyjątkiem łodzi do tego przeznaczonych);',
      'odstępowania sprzętu pływającego;',
      'zachowania w sposób zagrażający bezpieczeństwu własnemu oraz pasażerów;',
      'picia alkoholu w czasie dysponowania jednostką pływającą;',
      'wykorzystywania sprzętu pływającego niezgodnie z jego przeznaczeniem.',
    ],
  },
  { text: 'Wypożyczanie sprzętu jest odpłatne wg cennika obowiązującego na dzień wypożyczenia sprzętu (na żądanie cennik do wglądu).' },
  { text: 'Wypożyczenie sprzętu następuje po podpisaniu przez wypożyczającego oświadczenia o zapoznaniu się z niniejszym regulaminem, który stanowi załącznik do regulaminu.' },
  { text: 'Osoby korzystające ze sprzętu pływającego mogą poruszać się tylko w granicach Zalewu Solińskiego.' },
  { text: 'W przypadku dużej fali i silnego wiatru wypożyczanie sprzętu może zostać wstrzymane.' },
  { text: 'Odbiór i zwrot sprzętu odbywają się w miejscu i czasie ustalonym wcześniej przez wypożyczającego i wypożyczalnię.' },
  { text: 'Nieprzestrzeganie postanowień regulaminu może stanowić podstawę do wyciągnięcia sankcji przewidzianych odpowiednimi przepisami prawa.' },
]
</script>

<template>
  <main class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero tag="Informacje" title="Regulamin wypożyczalni" image="/images/galeria-sup.png" />

    <div class="max-w-3xl mx-auto px-8 lg:px-0 py-16 lg:py-20">
      <p class="text-white/40 font-sans text-sm leading-relaxed mb-8">
        Regulamin wypożyczalni sprzętu wodnego w ośrodku Przystań Caryńska w Polańczyku.
      </p>

      <a
        href="/dokumenty/regulamin-wypozyczalni.pdf"
        download
        class="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans mb-14"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Pobierz regulamin (PDF)
      </a>

      <ol class="flex flex-col gap-6">
        <li v-for="(rule, i) in rules" :key="i" class="flex gap-4">
          <span class="font-display text-gold/70 text-lg leading-none shrink-0 w-6 text-right">{{ i + 1 }}.</span>
          <div class="flex-1">
            <p class="text-white/60 font-sans text-sm leading-relaxed">{{ rule.text }}</p>
            <ul v-if="rule.sub" class="mt-2 flex flex-col gap-1.5">
              <li
                v-for="(s, j) in rule.sub"
                :key="j"
                class="flex items-start gap-3 text-white/55 font-sans text-sm leading-relaxed"
              >
                <span class="w-3 h-px bg-gold/50 shrink-0 mt-2.5" />
                {{ s }}
              </li>
            </ul>
          </div>
        </li>
      </ol>

      <p class="text-white/35 font-sans text-sm italic mt-14">Właściciel Ośrodka „Przystań Caryńska” w Polańczyku</p>
    </div>
  </main>
</template>
