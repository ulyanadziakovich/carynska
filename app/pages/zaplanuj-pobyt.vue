<script setup lang="ts">
const { data: content } = await useFetch('/api/content')
const nav = await useNav()

const linkClass = 'text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold transition-colors'

const objects = [
  {
    label: 'Pokoje & Apartamenty',
    tag: 'Noclegi',
    desc: '57 miejsc noclegowych w przytulnych pokojach i nowoczesnych apartamentach z widokiem na wodę.',
    href: '/noclegi/pokoje',
    image: '/images/1os-pokoj.png',
  },
  {
    label: 'Hotel na wodzie',
    tag: 'Noclegi',
    desc: 'Noc na jachcie żaglowym zacumowanym przy przystani — wyjątkowe zakwaterowanie na Jeziorze Solińskim.',
    href: '/noclegi/jacht',
    image: '/images/saturn25-jezero.webp',
  },
  {
    label: 'Tawerna',
    tag: 'Kuchnia',
    desc: 'Tradycyjne dania regionalne i chrupiąca pizza prosto z pieca w klimatycznym wnętrzu.',
    href: '/tawerna',
    image: '/images/tawerna-bar.jpg',
  },
  {
    label: 'Sprzęt wodny & Jezioro',
    tag: 'Atrakcje',
    desc: 'Żaglówki, łodzie elektryczne, kajaki, SUP i rowerki wodne — cała Solina w zasięgu ręki.',
    href: '/atrakcje',
    image: '/images/galeria-sup.png',
  },
  {
    label: 'Mini-aquapark & Baseny',
    tag: 'Atrakcje',
    desc: 'Baseny rekreacyjne ze zjeżdżalniami i jacuzzi — relaks dla całych rodzin na każdą pogodę.',
    href: '/atrakcje',
    image: '/images/galeria-basen.png',
  },
  {
    label: 'Grupy & Konferencje',
    tag: 'Biznes & Integracja',
    desc: 'Profesjonalne zaplecze konferencyjne, eventy firmowe, kolonie i spotkania integracyjne.',
    href: '/grupy',
    image: '/images/galeria-budynek.png',
  },
]
</script>

<template>
  <main v-if="content" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero tag="Przystań Caryńska" title="Zaplanuj pobyt" image="/images/galeria-przystan-lotu-ptaka.png" />

    <div class="bg-forest-wash">

      <!-- Breadcrumb -->
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pt-8">
        <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-white/35">
          <NuxtLink to="/" class="hover:text-gold transition-colors">Start</NuxtLink>
          <span>/</span>
          <span class="text-white/55">Zaplanuj pobyt</span>
        </div>
      </div>

      <!-- Description -->
      <div class="max-w-3xl mx-auto px-8 py-14 text-center">
        <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-6">O ośrodku</p>
        <div class="space-y-6 text-white/70 font-sans text-base leading-relaxed">
          <p>
            Przystań Caryńska to wyjątkowy, całoroczny ośrodek wypoczynkowy położony w samym sercu
            malowniczego Polańczyka, tuż nad brzegiem Jeziora Solińskiego. To idealne miejsce dla
            wszystkich, którzy pragną połączyć bieszczadzki spokój z komfortowym wypoczynkiem i licznymi
            atrakcjami. Ośrodek dysponuje 57 miejscami noclegowymi w przytulnych
            <NuxtLink to="/noclegi/pokoje" :class="linkClass">pokojach oraz nowoczesnych apartamentach</NuxtLink>,
            z których okien roztacza się niezapomniany, kojący widok na taflę wody.
          </p>
          <p>
            Sercem kompleksu jest klimatyczna
            <NuxtLink to="/tawerna" :class="linkClass">Tawerna</NuxtLink>, znana z doskonałej kuchni.
            Serwujemy tam zarówno tradycyjne dania regionalne, jak i chrupiącą pizzę prosto z pieca, co
            pozwala zregenerować siły po dniu pełnym wrażeń. Dla miłośników aktywnego spędzania czasu
            przygotowaliśmy bogato wyposażoną
            <NuxtLink to="/atrakcje" :class="linkClass">wypożyczalnię sprzętu wodnego</NuxtLink> – u nas
            z łatwością wyruszysz na wodną przygodę i odkryjesz najpiękniejsze zakątki Soliny. Dodatkową
            dawkę relaksu i rozrywki dla całych rodzin zapewnia nowoczesny
            <NuxtLink to="/atrakcje" :class="linkClass">mini-aquapark</NuxtLink>, będący doskonałą
            alternatywą na każdą pogodę. Przystań Caryńska posiada również profesjonalne
            <NuxtLink to="/grupy" :class="linkClass">zaplecze konferencyjne</NuxtLink>, dzięki czemu jest
            świetnym wyborem zarówno na rodzinne wakacje, jak i na organizację spotkań biznesowych czy
            integracyjnych w Bieszczadach.
          </p>
        </div>
        <div class="w-8 h-px bg-gold mx-auto mt-10" />
      </div>

      <!-- Object tiles -->
      <div class="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
        <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-8 text-center">Odkryj obiekty przystani</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="obj in objects"
            :key="obj.href + obj.label"
            :to="obj.href"
            class="card-elevated group cursor-pointer overflow-hidden"
          >
            <div class="bg-forest-void h-full flex flex-col">
              <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
                <img
                  :src="obj.image"
                  :alt="obj.label"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="photo-tint" />
              </div>
              <div class="p-7 flex flex-col gap-3 flex-1">
                <div>
                  <p class="text-gold/70 text-[10px] tracking-[0.35em] uppercase font-sans mb-1">{{ obj.tag }}</p>
                  <h2 class="font-display text-white text-2xl font-light">{{ obj.label }}</h2>
                </div>
                <p class="text-white/55 font-sans text-sm leading-relaxed">{{ obj.desc }}</p>
                <div class="mt-auto pt-4 border-t border-white/8 flex items-center justify-end">
                  <span class="text-gold/60 font-sans text-[10px] tracking-[0.15em] uppercase group-hover:text-gold transition-colors">Zobacz →</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Sister objects: nasze noclegi w głębi Bieszczad -->
        <div class="mt-14">
          <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-6 text-center">Nasze obiekty w głębi Bieszczad</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="card-elevated border border-gold/20 bg-forest-void overflow-hidden flex flex-col">
              <div class="relative overflow-hidden" style="aspect-ratio: 16/9">
                <img src="/images/zajazd-carynska.jpg" alt="Zajazd Pod Caryńską w Ustrzykach Górnych" class="w-full h-full object-cover" />
                <div class="photo-tint" />
              </div>
              <div class="p-8 flex flex-col gap-4 flex-1">
                <div>
                  <p class="text-gold/70 text-[10px] tracking-[0.35em] uppercase font-sans mb-1">Ustrzyki Górne</p>
                  <h3 class="font-display text-white text-2xl font-light">Zajazd Pod Caryńską</h3>
                </div>
                <p class="text-white/55 font-sans text-sm leading-relaxed flex-1">
                  Nocleg w samym sercu Bieszczadzkiego Parku Narodowego — idealna baza wypadowa na Tarnicę,
                  Połoninę Caryńską i najpiękniejsze szlaki regionu.
                </p>
                <a
                  href="https://www.carynska.pl"
                  target="_blank"
                  rel="noopener"
                  class="mt-auto inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold/80 text-forest px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold transition-colors"
                >
                  Zobacz Zajazd
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                </a>
              </div>
            </div>

            <div class="card-elevated border border-gold/20 bg-forest-void overflow-hidden flex flex-col">
              <div class="relative overflow-hidden" style="aspect-ratio: 16/9">
                <img src="/images/terebowiec.jpg" alt="Noclegi Terebowiec w Ustrzykach Górnych" class="w-full h-full object-cover" />
                <div class="photo-tint" />
              </div>
              <div class="p-8 flex flex-col gap-4 flex-1">
                <div>
                  <p class="text-gold/70 text-[10px] tracking-[0.35em] uppercase font-sans mb-1">Ustrzyki Górne</p>
                  <h3 class="font-display text-white text-2xl font-light">Noclegi Terebowiec</h3>
                </div>
                <p class="text-white/55 font-sans text-sm leading-relaxed flex-1">
                  Komfortowe zakwaterowanie w Ustrzykach Górnych, blisko szlaków i najpiękniejszych
                  zakątków Bieszczadów — świetny punkt startowy na górskie wędrówki.
                </p>
                <a
                  href="https://www.terebowiec.pl/"
                  target="_blank"
                  rel="noopener"
                  class="mt-auto inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold/80 text-forest px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold transition-colors"
                >
                  Zobacz Terebowiec
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- Nearby / region link -->
        <div class="mt-14 flex flex-col items-center gap-4 border-t border-gold/15 pt-12 text-center">
          <p class="text-white/50 font-sans text-sm">Wybierasz się w Bieszczady? Zobacz, co ciekawego czeka w okolicy.</p>
          <a
            href="https://bieszczady.plus/odkrywaj"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans"
          >
            Sprawdź co się dzieje w pobliżu
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          </a>
        </div>
      </div>
    </div>

    <KontaktSection />
  </main>
</template>
