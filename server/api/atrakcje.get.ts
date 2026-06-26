interface FleetItem { id: string; type: string; name: string; units: string[]; capacity: number; price: string; patent: boolean; desc: string; specs: string[]; href?: string }
interface PricingGroup { category: string; note?: string; items: { label: string; price: string }[] }

export default defineEventHandler(() => {
  return {
    hero: {
      tag: 'Atrakcje',
      title: 'Woda, góry\ni przygoda',
      image: '/images/solina3.avif',
    },
    intro: 'Polańczyk i jego okolice to raj dla aktywnych — zarówno na wodzie, jak i na lądzie. Jezioro Solińskie, szlaki górskie i Bieszczady tuż za progiem.',

    water: {
      tag: 'Wypożyczalnia sprzętu wodnego',
      title: 'Na jeziorze Solińskim',
      body: 'Czartery żaglówek z skipperem lub samodzielnie, łodzie elektryczne bez patentu, kajaki, SUP i pontony. Czynne od 8:30 do 19:00 (sesje: 8:30–13:30 i 14:00–19:00). Rezerwacje: +48 536 700 537.',
      items: [
        { icon: 'zaglowka', label: 'Żaglówki & Jachty', desc: 'Samodzielny rejs lub z skipperem. Czartery na Jezioro Solińskie.' },
        { icon: 'elektryczna', label: 'Łodzie elektryczne', desc: 'Bez patentu. Dla 8 osób. Cicha, ekologiczna przejażdżka.' },
        { icon: 'kajak', label: 'Kajaki, SUP & Rowerki', desc: 'Kajaki, deski SUP, rowerki wodne i pontony wiosłowe.' },
      ],
      pricing: [
        {
          category: 'Sprzęt niesilnikowy',
          items: [
            { label: 'Kajak (2-osobowy)', price: '25 zł / godz. · 90 zł / dzień' },
            { label: 'Deska SUP (2-osobowa)', price: '25 zł / godz. · 90 zł / dzień' },
            { label: 'Rowerek wodny (4-osobowy)', price: '35 zł / godz. · 120 zł / dzień' },
            { label: 'Ponton wiosłowy (4-osobowy)', price: '20 zł / godz. · 90 zł / dzień' },
          ],
        },
        {
          category: 'Łodzie elektryczne (bez patentu)',
          note: 'Sesje: 8:30–13:30 lub 14:00–19:00',
          items: [
            { label: 'Łódź 4-osobowa', price: '80 zł / godz. · 350 zł / dzień' },
            { label: 'Łódź 8-os. — Holica, Połonina, Solina, Kabajka', price: '200 zł / godz. · 700 zł / 5h' },
            { label: 'Łódź 8-os. Tarnica (rocznik 2024)', price: '250 zł / godz. · 800 zł / 5h' },
          ],
        },
        {
          category: 'Jachty żaglowe',
          items: [
            { label: 'Omega „Łamaga" (6 os.)', price: '230 zł / dzień' },
            { label: 'Saturn 23 GT — 5 jednostek (5 os.)', price: '480 zł / dzień' },
            { label: 'Saturn 25L „Caryńska" (6 os.)', price: '530 zł / dzień' },
          ],
        },
      ],
      fleet: [
        {
          id: 'saturn23',
          type: 'Jacht żaglowy',
          name: 'Saturn 23 GT',
          units: ['Okrąglik', 'Otryt', 'Rozsypaniec', 'Halicz', 'Dwernik'],
          capacity: 5,
          price: '480 zł / dzień',
          patent: true,
          desc: 'Saturn 23GT to jednostka renomowanej stoczni Saturn Yachts — sportowa wersja turystycznego jachtu z nowoczesną linią i ostrymi kształtami. Doskonale zrównoważony i zwrotny, idealny do żeglowania w węższych częściach Soliny. Całe olinowanie sprowadzone do kokpitu pozwala na wygodne prowadzenie nawet jednej osobie.',
          specs: ['4 koje we wnętrzu', 'Silnik elektryczny Haswing Vetura 5.0', 'Kuchnia gazowa + lodówka', 'Instalacja wody pitnej ze zlewozmywakiem', 'Toaleta chemiczna', 'Duża ilość schowków i bakist'],
          href: 'https://alfea.pl/saturn-23/',
        },
        {
          id: 'saturn25',
          type: 'Jacht żaglowy — flagowa jednostka',
          name: 'Saturn 25L „Caryńska"',
          units: ['Caryńska'],
          capacity: 6,
          price: '530 zł / dzień',
          patent: true,
          desc: 'Flagowa jednostka Przystani Caryńskiej, największy jacht stoczni Saturn Yachts. Sportowa linia, doskonałe właściwości nautyczne i bardzo duży kokpit — idealna dla większych załóg. Perfekcyjnie zrównoważona żaglowo, niezwykle zwrotna.',
          specs: ['4 koje (2 dwuosobowe + 2 jednoosobowe)', 'Silnik elektryczny Haswing Vetura 5.0', 'Kuchnia gazowa + lodówka', 'Instalacja wody pitnej ze zlewozmywakiem', 'Duża ilość schowków i bakist'],
          href: 'https://alfea.pl/saturn-25-2/',
        },
        {
          id: 'omega',
          type: 'Jacht regatowo-turystyczny',
          name: 'Omega „Łamaga"',
          units: ['Łamaga'],
          capacity: 6,
          price: '230 zł / dzień',
          patent: true,
          desc: 'Legenda polskiego jachtingu — najpopularniejsza klasa regatowo-turystyczna w kraju. Wybitne właściwości nautyczne, lekkość prowadzenia i ogromny otwarty kokpit. Doskonały dla sportowców, grup znajomych i firm organizujących regaty integracyjne. Konstrukcja bezkabinowa — cała przestrzeń podpodporządkowana ergonomii żeglowania.',
          specs: ['Komplet żagli (Grot + Fok)', 'Miecz uchylny i płetwa', 'Kamizelki asekuracyjne dla 6 osób', 'Długość kadłuba: 6,20 m · Szerokość: 1,80 m', 'Powierzchnia żagli: ok. 15 m²'],
        },
        {
          id: 'elektryk8',
          type: 'Łódź elektryczna (bez patentu)',
          name: 'Łodzie 8-osobowe',
          units: ['Połonina', 'Holica', 'Kabajka', 'Solina'],
          capacity: 8,
          price: '200 zł / godz. · 700 zł / 5h',
          patent: false,
          desc: 'Ekskluzywne łodzie elektryczne na luksusowy relaks w strefie ciszy Jeziora Solińskiego. Nowoczesny napęd elektryczny — rejs odbywa się bezszelestnie, bez hałasu i spalin. Do prowadzenia nie potrzebujesz żadnych uprawnień — krótki instruktaż bosmana w zupełności wystarczy.',
          specs: ['Pojemność: 8 osób', 'Komfortowe, tapicerowane kanapy', 'Stolik burtowy w centrum kokpitu', 'Zadaszenie Bimini (ochrona przed słońcem i deszczem)', 'Środki ratunkowe dla 8 osób'],
        },
        {
          id: 'tarnica',
          type: 'Łódź elektryczna (bez patentu) · rocznik 2024',
          name: 'Tarnica',
          units: ['Tarnica'],
          capacity: 8,
          price: '250 zł / godz. · 800 zł / 5h',
          patent: false,
          desc: 'Najnowsza jednostka floty (rocznik 2024). Ekologiczny, bezszelestny silnik elektryczny — żegluga w strefie ciszy bez hałasu i spalin. Przestronny kokpit z wygodnymi kanapami, stolikiem i daszkiem Bimini. Brak wymaganych uprawnień — 15-minutowy instruktaż bosmana przed wypłynięciem.',
          specs: ['Pojemność: 8 osób', 'Model 2024 — nowy', 'Kierownica i intuicyjna manetka gazu', 'Tapicerowane kanapy i stolik kokpitowy', 'Zadaszenie Bimini', 'Środki ratunkowe dla wszystkich pasażerów'],
        },
      ],
    },

    marina: {
      tag: 'Bosmanat',
      title: 'Usługi przystani',
      body: 'Pomost przyjmuje duże żaglówki i jachty. Wjazd na teren przystani jest bezpłatny i ogólnodostępny. Krótkoterminowe cumowanie do 6h w miejscu bosmanatu — bezpłatne.',
      amenities: [
        'Prysznice i pralnia dla żeglarzy',
        'Dostęp do prądu przy pomoście',
        'Bezprzewodowy internet',
        'Kamera online monitorująca pomost',
        'Zaplecze sanitarne na miejscu',
        'Dwa baseny rekreacyjne ze zjeżdżalniami i jacuzzi',
        'Trawiasta plaża z widokiem na jezioro i góry',
        'Letnie koncerty plenerowe — wstęp wolny',
      ],
      pricing: [
        {
          category: 'Cumowanie',
          items: [
            { label: 'Cumowanie krótkoterminowe (do 6h)', price: 'Bezpłatnie' },
            { label: 'Cumowanie przy nabrzeżu (do 7 dni)', price: '50 zł / dobę' },
            { label: 'Jacht nieczarterowy', price: '2 500 zł' },
            { label: 'Jacht czarterowy', price: '3 500 zł' },
          ],
        },
        {
          category: 'Slip / wodowanie',
          items: [
            { label: 'Skutery wodne (własny pojazd)', price: '30 zł' },
            { label: 'Łodzie powyżej 4m (własny pojazd)', price: '50 zł' },
            { label: 'Jachty do 7,5m', price: '150 zł' },
            { label: 'Jachty powyżej 7,5m', price: '200 zł' },
          ],
        },
        {
          category: 'Serwis i wyposażenie',
          items: [
            { label: 'Wynajem przyczepy (3h)', price: '150 zł' },
            { label: 'Wynajem przyczepy (doba)', price: '300 zł' },
            { label: 'Ożaglowanie / odożaglowanie', price: '150 zł' },
            { label: 'Podnoszenie łodzi', price: '200 zł' },
            { label: 'Prace stolarskie', price: '100 zł / godz.' },
            { label: 'Sprzątanie kabiny (do 7,5m)', price: '100 zł' },
            { label: 'Sprzątanie kabiny (pow. 7,5m)', price: '150 zł' },
            { label: 'Ozonowanie', price: '50 zł / godz.' },
          ],
        },
      ],
      phone: '+48 536 700 537',
      images: [
        { src: '/images/solina1.avif', alt: 'Jezioro Solina z lotu ptaka' },
        { src: '/images/solina3.avif', alt: 'Żaglówki na Solinie' },
        { src: '/images/solina4.avif', alt: 'Widok na Bieszczady' },
      ],
    },

    land: {
      tag: 'Aktywny dzień',
      title: 'Więcej niż woda',
      body: 'Boisko wielofunkcyjne, korty tenisowe, szlaki górskie i atrakcje całego regionu — Bieszczady mają tu wiele do zaoferowania.',
      items: [
        { icon: 'plaza', label: 'Baseny & Plaża', desc: 'Dwa baseny rekreacyjne ze zjeżdżalniami, fontannami i jacuzzi. Trawiasta plaża z leżakami.' },
        { icon: 'trekking', label: 'Boisko & Tenis', desc: 'Nowoczesne boisko wielofunkcyjne (piłka nożna, koszykówka, siatkówka) oraz korty tenisowe z oświetleniem.' },
        { icon: 'koncert', label: 'Atrakcje regionu', desc: 'Zapora w Solinie, kolejka bieszczadzka, gondola, trasy MTB, quady, browary rzemieślnicze.' },
      ],
    },

    groups: {
      tag: 'Dla grup',
      title: 'Organizujemy eventy na wodzie',
      body: 'Rejsy integracyjne, regaty firmowe, szkolenia żeglarskie. Przygotujemy program dopasowany do Twojej grupy — od kilku do kilkudziesięciu osób.',
      cta: { label: 'Zapytaj o ofertę grupową', phone: '+48 536 700 537', email: 'przystan@carynska.pl' },
    },

    contact: {
      phone: '+48 536 700 537',
      email: 'przystan@carynska.pl',
    },
  }
})
