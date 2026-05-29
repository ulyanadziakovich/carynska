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
      body: 'Czartery żaglówek z skipperem lub samodzielnie, łodzie elektryczne bez patentu, kajaki, SUP i pontony. Czynne od 8:00 do 19:00. Rezerwacje: +48 536 700 537.',
      items: [
        { icon: 'zaglowka', label: 'Żaglówki & Jachty', desc: 'Samodzielny rejs lub z skipperem. Czartery na Jezioro Solińskie.' },
        { icon: 'elektryczna', label: 'Łodzie elektryczne', desc: 'Bez patentu. Dla 4, 5 lub 8 osób. Cicha, ekologiczna przejażdżka.' },
        { icon: 'kajak', label: 'Kajaki & SUP', desc: 'Kajaki, deski SUP, rowerki wodne i pontony wiosłowe.' },
      ],
      pricing: [
        {
          category: 'Sprzęt niesilnikowy',
          items: [
            { label: 'Kajak', price: '20 zł / godz. · 80 zł / dzień' },
            { label: 'Deska SUP', price: '25 zł / godz. · 90 zł / dzień' },
            { label: 'Rowerek wodny', price: '35 zł / godz. · 120 zł / dzień' },
            { label: 'Ponton wiosłowy', price: '20 zł / godz. · 80 zł / dzień' },
          ],
        },
        {
          category: 'Łodzie elektryczne (bez patentu)',
          items: [
            { label: 'Łódź 4-osobowa', price: '80 zł / godz. · 350 zł / dzień' },
            { label: 'Łódź 8-os. Holica/Połonina/Solina', price: '200 zł / godz. · 700 zł / 5h' },
            { label: 'Łódź 8-os. Tarnica (2024)', price: '250 zł / godz. · 800 zł / 5h' },
            { label: 'Saturn 23GT 5-os. (2024)', price: '250 zł / godz. · 800 zł / 5h' },
          ],
        },
        {
          category: 'Jachty żaglowe',
          items: [
            { label: 'Omega', price: '230 zł / dzień' },
            { label: 'Saturn 23GT 4-koj. (2024)', price: '380–480 zł / dzień' },
            { label: 'Saturn 25L 6-koj. Caryńska (2024)', price: '430–530 zł / dzień' },
          ],
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
