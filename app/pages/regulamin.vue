<script setup lang="ts">
const nav = await useNav()

const sections = [
  {
    title: '1. Postanowienia ogólne',
    body: [
      'Niniejszy regulamin określa zasady świadczenia usług, odpowiedzialności oraz przebywania na terenie ośrodka Przystań Caryńska w Polańczyku (dalej: „Obiekt”) i jest integralną częścią umowy, do której zawarcia dochodzi poprzez dokonanie rezerwacji lub zapłatę zadatku/zaliczki.',
      'Dokonanie rezerwacji jest jednoznaczne z zapoznaniem się i akceptacją postanowień niniejszego regulaminu.',
    ],
  },
  {
    title: '2. Doba hotelowa',
    body: [
      'Doba hotelowa trwa od godziny 15:00 w dniu przyjazdu do godziny 10:00 w dniu wyjazdu.',
      'Życzenie przedłużenia pobytu poza okres wskazany w dniu przybycia gość powinien zgłosić możliwie wcześniej — Obiekt uwzględni życzenie w miarę posiadanych możliwości.',
    ],
  },
  {
    title: '3. Rezerwacja i płatność',
    body: [
      'Rezerwacji można dokonać telefonicznie, mailowo, poprzez formularz na stronie internetowej lub za pośrednictwem platform rezerwacyjnych (np. Booking.com).',
      'Warunkiem potwierdzenia rezerwacji jest wpłata zadatku w wysokości i terminie wskazanym przez Obiekt. Pozostała część należności płatna jest najpóźniej w dniu przyjazdu, chyba że ustalono inaczej.',
    ],
  },
  {
    title: '4. Odwołanie rezerwacji',
    body: [
      'Zasady odwołania rezerwacji i zwrotu zadatku ustalane są indywidualnie przy potwierdzeniu rezerwacji i mogą się różnić w zależności od terminu i długości pobytu (np. w sezonie letnim).',
      'W przypadku rezerwacji dokonanych przez zewnętrzne platformy rezerwacyjne obowiązują zasady anulacji określone przez daną platformę.',
    ],
  },
  {
    title: '5. Obowiązki i zasady pobytu gości',
    body: [
      'Na terenie Obiektu obowiązuje cisza nocna w godzinach 22:00–7:00.',
      'Gość ponosi pełną odpowiedzialność materialną za wszelkiego rodzaju uszkodzenia lub zniszczenia przedmiotów wyposażenia i urządzeń technicznych Obiektu powstałe z jego winy lub winy odwiedzających go osób.',
      'Osoby niezameldowane w Obiekcie mogą przebywać w pokoju gościa w godzinach 7:00–22:00 za wiedzą i zgodą obsługi.',
      'Ze względu na bezpieczeństwo przeciwpożarowe zabronione jest używanie w pokojach grzałek, żelazek i innych podobnych urządzeń niestanowiących wyposażenia pokoju.',
    ],
  },
  {
    title: '6. Zwierzęta domowe',
    body: [
      'Obiekt akceptuje pobyt zwierząt domowych za dodatkową opłatą, po wcześniejszym zgłoszeniu przy rezerwacji. Właściciel zwierzęcia zobowiązany jest do sprawowania nad nim stałej opieki i ponosi pełną odpowiedzialność za wszelkie szkody wyrządzone przez zwierzę.',
    ],
  },
  {
    title: '7. Odpowiedzialność Obiektu',
    body: [
      'Obiekt odpowiada za rzeczy wniesione przez gości w zakresie określonym przepisami Kodeksu Cywilnego. Odpowiedzialność za utratę lub uszkodzenie pieniędzy, papierów wartościowych, kosztowności albo przedmiotów o wartości naukowej lub artystycznej jest ograniczona, jeśli przedmioty te nie zostały oddane do depozytu.',
      'Obiekt nie ponosi odpowiedzialności za pojazdy pozostawione na parkingu ani za znajdujące się w nich mienie.',
    ],
  },
  {
    title: '8. Parking',
    body: [
      'Obiekt udostępnia gościom miejsca parkingowe na zasadach określonych w ofercie/rezerwacji. Parking jest niestrzeżony.',
    ],
  },
  {
    title: '9. Dzieci',
    body: [
      'Dzieci przebywające na terenie Obiektu (w tym na przystani, przy wodzie i placu zabaw) powinny znajdować się pod stałą opieką i nadzorem opiekunów prawnych, którzy ponoszą za nie pełną odpowiedzialność.',
    ],
  },
  {
    title: '10. Reklamacje',
    body: [
      'Reklamacje dotyczące usług należy zgłaszać niezwłocznie w recepcji Obiektu, co umożliwi bieżącą reakcję i poprawę jakości świadczonych usług.',
    ],
  },
  {
    title: '11. Postanowienia końcowe',
    body: [
      'W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy Kodeksu Cywilnego oraz innych obowiązujących przepisów prawa polskiego.',
      'Obiekt zastrzega sobie prawo do zmiany niniejszego regulaminu. Aktualna wersja regulaminu dostępna jest zawsze na stronie internetowej Obiektu oraz w recepcji.',
    ],
  },
]
</script>

<template>
  <main class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero tag="Informacje" title="Regulamin" image="/images/hotel.png" />

    <div class="max-w-3xl mx-auto px-8 lg:px-0 py-16 lg:py-20">
      <p class="text-white/40 font-sans text-sm leading-relaxed mb-8">
        Regulamin pobytu w ośrodku Przystań Caryńska w Polańczyku. Ostatnia aktualizacja: 2026.
      </p>

      <a
        href="/dokumenty/regulamin-przystan-carynska.pdf"
        download
        class="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans mb-14"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Pobierz regulamin (PDF)
      </a>

      <div class="flex flex-col gap-12">
        <section v-for="sec in sections" :key="sec.title">
          <h2 class="font-display text-white text-2xl font-light mb-4">{{ sec.title }}</h2>
          <div class="w-8 h-px bg-gold mb-5" />
          <p
            v-for="(p, i) in sec.body"
            :key="i"
            class="text-white/55 font-sans text-sm leading-relaxed mb-3 last:mb-0"
          >{{ p }}</p>
        </section>
      </div>
    </div>
  </main>
</template>
