export default defineEventHandler(() => {
  return {
    hero: {
      tag: 'Fundusze i projekty',
      title: 'Rewitalizacja\nPrzystani Caryńska',
      image: '/images/przystan-drone-2.jpg',
    },

    project: {
      title: 'Rozwój Przedsiębiorczości i Innowacje: „Zwiększenie przychodów z działalności dzięki rewitalizacji Przystani Caryńska”',
      contract: 'Umowa NORW.19.01.02-18-0006/22-001 w sprawie projektu w ramach schematu Innowacje w obszarze wód śródlądowych lub morskich programu „Rozwój Przedsiębiorczości i Innowacje” współfinansowanego ze środków Norweskiego Mechanizmu Finansowego 2014-2021, oś priorytetowa 19 Norweski Mechanizm Finansowy 2014-2021, działanie 19.1 Nowe Produkty i Inwestycje, poddziałanie 19.1.2 Innowacje w obszarze wód śródlądowych lub morskich – Blue growth.',
      body: [
        'Przedmiotem projektu jest prowadzenie prac rewitalizacji i modernizacji Przystani Caryńska na brzegu jeziora Solińskiego. Planowane działania obejmują prace remontowo-budowlane, zakup nowego sprzętu, zagospodarowanie terenu oraz rozbudowę infrastruktury technicznej.',
        'Projekt pozwoli na stworzenie atrakcyjnej przestrzeni rekreacyjnej nie tylko dla pojedynczych podróżujących, rodzin i dzieci, a również dla osób z niepełnosprawnościami. Wdrożone w ramach projektu innowacyjne rozwiązania doprowadzą do rozwoju działalności gospodarczej przedsiębiorcy, w szczególności wzrostu przychodów i zatrudnienia, oraz przyczynią się do zwiększenia konkurencyjności gospodarczej.',
      ],
      finance: [
        { label: 'Wydatki ogółem', value: '2 575 276,20 PLN' },
        { label: 'Wydatki kwalifikowalne', value: '2 094 126,95 PLN' },
        { label: 'W tym VAT', value: '0,00 PLN' },
        { label: 'Dofinansowanie', value: '1 465 888,56 PLN' },
        { label: '% dofinansowania', value: '70%' },
      ],
    },

    funds: {
      title: 'Rola Funduszy Norweskich i Funduszy EOG',
      body: [
        'Fundusze norweskie i fundusze EOG reprezentują wkład Norwegii w tworzenie Europy zielonej, konkurencyjnej i sprzyjającej integracji społecznej. W ramach funduszy norweskich i funduszy EOG Norwegia przyczynia się do ograniczenia nierówności społecznych i ekonomicznych oraz wzmocnienia relacji dwustronnych z państwami beneficjentami z Europy Środkowej i Południowej i obszaru Morza Bałtyckiego.',
        'Norwegia ściśle współpracuje z UE w ramach Porozumienia o Europejskim Obszarze Gospodarczym (EOG). Wraz z pozostałymi darczyńcami Norwegia przekazała 3,3 miliarda euro w ramach kolejnych programów funduszy w latach 1994–2014. Fundusze norweskie są finansowane wyłącznie przez Norwegię i dostępne w państwach, które przystąpiły do UE po 2003 r. Fundusze norweskie na lata 2014-2021 wynoszą 1,25 miliarda euro.',
      ],
      links: [
        { label: 'www.eeagrants.org', href: 'https://www.eeagrants.org' },
        { label: 'www.norwaygrants.org', href: 'https://www.norwaygrants.org' },
      ],
    },

    timeline: {
      title: 'Realizacja projektu',
      subtitle: 'Zwiększenie przychodów z działalności dzięki rewitalizacji Przystani Caryńska',
      milestones: [
        {
          date: '11 września 2023',
          title: 'Dostawa 10 łodzi szkoleniowych klasy Optymist',
          body: 'Realizacja zadania 21. Na podstawie umowy nr 02/2023 z dnia 11.09.2023 r. Wykonawca: Zakład Szkutniczy Banan Jacht Jarosław Banaszek dostarczył do naszej Przystani 10 łodzi szkoleniowych — pierwszy i bardzo ważny krok w realizacji projektu.',
        },
        {
          date: '11 października 2023',
          title: 'Zakup i montaż placu zabaw',
          body: 'Realizacja zadania nr 16. W ramach umowy z dnia 20.09.2023 r. na terenie Przystani powstał nowy plac zabaw. Wykonawcą inwestycji została firma Ringpol Waldemar Kubiak.',
        },
        {
          date: '22 października 2023',
          title: 'Wizyta studyjna u norweskiego partnera projektu',
          body: 'Podróż do norweskiego partnera projektu — Solneset Gard. Podczas pobytu odwiedziliśmy również inne miejsca, w tym mariny, w celu poznania dobrych praktyk oraz rozwiązań stosowanych w branży turystycznej i rolniczej przez organizacje działające w Norwegii. Dziękujemy za sprawną obsługę wizyty wykonawcy M-Travels Marcin Mazur.',
        },
        {
          date: '30 października 2023',
          title: 'Zakup łodzi kabinowej — Jacht Saturn 25',
          body: 'Staliśmy się właścicielami nowoczesnej i funkcjonalnej łodzi kabinowej Saturn 25, dzięki której oferujemy gościom przygody na wodzie. Wykonawca: Przedsiębiorstwo Wielobranżowe Moto Plast Jerzy Stasiczak.',
        },
        {
          date: '3 listopada 2023',
          title: 'Montaż instalacji fotowoltaicznej',
          body: 'Na Przystani zamontowano instalację fotowoltaiczną, redukującą emisję gazów cieplarnianych i zwiększającą samowystarczalność energetyczną obiektu. Wykonawca: Firma Handlowo-Usługowa „Pol-Bud” Sp. z o.o.',
        },
        {
          date: '27 listopada 2023',
          title: 'Platforma antypoślizgowa dla niepełnosprawnych i modernizacja budynków',
          body: 'Odebrano platformę antypoślizgową zapewniającą dostęp do aktywności wodnych osobom z różnymi rodzajami niepełnosprawności (wykonawca: Katarzyna Streich Handel). Zakończono również prace modernizacyjne budynków toalet, bosmanki, pomieszczeń technicznych i wiaty (wykonawca: Nowbud Bartłomiej Nowak).',
        },
        {
          date: '28 listopada 2023',
          title: 'Kamizelki ratunkowe dla dzieci i dorosłych',
          body: 'Zakup kamizelek ratunkowych dla dzieci i asekuracyjnych dla dorosłych, wspierających bezpieczny wypoczynek nad wodą dla osób o różnych umiejętnościach pływackich. Dostawca: Olimp PW Kowalczyk K.',
        },
        {
          date: '30 listopada 2023',
          title: 'Remont parkingów i dróg dojazdowych',
          body: 'Zakończono prace remontowe poprawiające infrastrukturę Przystani — naprawiono powierzchnię parkingów oraz drogi dojazdowe do atrakcji. Wykonawca: Nowbud Bartłomiej Nowak.',
        },
        {
          date: '13 grudnia 2023',
          title: 'Montaż 10 latarni solarnych',
          body: 'Inwestycja przynosząca oszczędności kosztów, niezależność energetyczną, niskie koszty konserwacji oraz pozytywny wpływ na środowisko i społeczność lokalną.',
        },
        {
          date: '7 lutego 2024',
          title: '3 nowe łodzie elektryczne Saturn 23 GT',
          body: 'Do floty dołączyły 3 łodzie elektryczne Saturn 23 GT — ekologiczny napęd elektryczny umożliwiający zarówno klasyczny czarter, jak i czarter jachtu z opcją noclegu. Wykonawca: Przedsiębiorstwo Wielobranżowe Moto Plast Jerzy Stasiczak.',
        },
        {
          date: '15 lutego 2024',
          title: 'Kolejne 3 łodzie elektryczne',
          body: 'Flota powiększyła się o kolejne 3 łodzie elektryczne, w tym Marine Time QX650 oraz Marion 750.',
        },
        {
          date: '21 lutego 2024',
          title: 'Mobilna scena koncertowa',
          body: 'Odebrano mobilną scenę koncertową, umożliwiającą organizację własnych wydarzeń plenerowych. Wykonawca: Grand Event Promotion Sp. z o.o.',
        },
        {
          date: '8 marca 2024',
          title: '4 kolejne łodzie elektryczne — 10 jednostek w sumie',
          body: 'Wykonawca Przedsiębiorstwo Wielobranżowe Moto Plast Jerzy Stasiczak dostarczył 4 kolejne łodzie elektryczne — łącznie flota liczy już 10 jednostek o napędzie elektrycznym.',
        },
      ],
    },
  }
})
