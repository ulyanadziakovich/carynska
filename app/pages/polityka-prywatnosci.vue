<script setup lang="ts">
const nav = useNav()

const sections = [
  {
    title: '1. Administrator danych',
    body: [
      'Administratorem danych osobowych zbieranych za pośrednictwem strony internetowej oraz w związku ze świadczeniem usług noclegowych i gastronomicznych jest podmiot prowadzący ośrodek Przystań Caryńska w Polańczyku, ul. Równa 19 (dalej: „Administrator”). Kontakt w sprawach ochrony danych: przystan@carynska.pl.',
      'Uwaga: uzupełnij tu pełną nazwę i formę prawną podmiotu prowadzącego działalność (np. imię, nazwisko i nazwa firmy lub nazwa spółki wraz z NIP i adresem siedziby) — te dane są wymagane, by dokument miał moc prawną.',
    ],
  },
  {
    title: '2. Jakie dane przetwarzamy',
    body: [
      'W związku z korzystaniem ze strony i dokonywaniem rezerwacji możemy przetwarzać: imię i nazwisko, adres e-mail, numer telefonu, treść wiadomości przesłanej przez formularz kontaktowy oraz dane niezbędne do realizacji rezerwacji i pobytu (np. dane w formularzu meldunkowym zgodnie z odrębnymi przepisami).',
      'Podczas korzystania ze strony automatycznie zbierane są również dane techniczne (adres IP, typ przeglądarki, informacje o urządzeniu) za pośrednictwem plików cookies i podobnych technologii.',
    ],
  },
  {
    title: '3. Cel i podstawa prawna przetwarzania',
    body: [
      'Dane przetwarzane są w celu: obsługi zapytań i rezerwacji (art. 6 ust. 1 lit. b RODO — wykonanie umowy lub działania przed jej zawarciem), wypełnienia obowiązków prawnych ciążących na Administratorze, np. podatkowych i meldunkowych (art. 6 ust. 1 lit. c RODO), a także analizy ruchu na stronie i marketingu własnych usług (art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes Administratora).',
    ],
  },
  {
    title: '4. Pliki cookies i narzędzia analityczne',
    body: [
      'Strona wykorzystuje pliki cookies niezbędne do jej prawidłowego działania oraz — za zgodą użytkownika — narzędzia analityczne i marketingowe, w tym Google Analytics (Google LLC) oraz Meta Pixel (Meta Platforms, Inc.), które pomagają nam zrozumieć ruch na stronie oraz dopasować komunikację marketingową.',
      'Narzędzia te mogą ustawiać własne pliki cookies i przetwarzać dane w sposób opisany w politykach prywatności ich dostawców. Użytkownik może w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce, w tym usunąć je lub zablokować — może to jednak ograniczyć funkcjonalność strony.',
    ],
  },
  {
    title: '5. Odbiorcy danych',
    body: [
      'Dane mogą być przekazywane podmiotom wspierającym Administratora w prowadzeniu działalności i strony internetowej, w tym: dostawcy hostingu, systemy rezerwacyjne i platformy pośredniczące (np. Booking.com), dostawcy usług księgowych, dostawcy narzędzi analitycznych/marketingowych wskazani powyżej — wyłącznie w zakresie niezbędnym do realizacji wskazanych celów.',
      'Dane nie są przekazywane poza Europejski Obszar Gospodarczy poza przypadkami wynikającymi ze standardowych mechanizmów działania narzędzi wskazanych w pkt 4, które stosują odpowiednie zabezpieczenia prawne takiego transferu.',
    ],
  },
  {
    title: '6. Okres przechowywania danych',
    body: [
      'Dane związane z rezerwacją i pobytem przechowywane są przez okres wymagany przepisami prawa (w tym podatkowymi), a dane z formularza kontaktowego — przez okres niezbędny do udzielenia odpowiedzi i obsługi zapytania, nie dłużej niż przez 12 miesięcy od ostatniego kontaktu, chyba że dłuższy okres wynika z przepisów prawa.',
    ],
  },
  {
    title: '7. Prawa użytkownika',
    body: [
      'Osobie, której dane dotyczą, przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie Administratora.',
      'Przysługuje również prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO), jeśli uznasz, że przetwarzanie Twoich danych narusza przepisy o ochronie danych osobowych.',
    ],
  },
  {
    title: '8. Bezpieczeństwo danych',
    body: [
      'Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych przed ich udostępnieniem osobom nieupoważnionym, utratą lub zniszczeniem.',
    ],
  },
  {
    title: '9. Zmiany polityki prywatności',
    body: [
      'Niniejsza polityka prywatności może być okresowo aktualizowana. Aktualna wersja dostępna jest zawsze na tej stronie.',
    ],
  },
  {
    title: '10. Kontakt',
    body: [
      'W sprawach dotyczących ochrony danych osobowych prosimy o kontakt pod adresem e-mail przystan@carynska.pl.',
    ],
  },
]
</script>

<template>
  <main class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" />

    <PageHero tag="Informacje" title="Polityka Prywatności" image="/images/hotel.png" />

    <div class="max-w-3xl mx-auto px-8 lg:px-0 py-16 lg:py-20">
      <p class="text-white/40 font-sans text-sm leading-relaxed mb-14">
        Polityka prywatności strony internetowej i usług ośrodka Przystań Caryńska w Polańczyku. Ostatnia aktualizacja: 2026.
      </p>

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
