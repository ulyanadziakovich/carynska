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
      body: 'Czarteruj żaglówki i jachty lub wyrusz w rejs z profesjonalnym skipperem. Do wyboru pełen sprzęt wodny — od spokojnych łódek elektrycznych po dynamiczne kajaki i SUP.',
      items: [
        { icon: 'zaglowka', label: 'Żaglówki', desc: 'Samodzielny rejs lub z skipperem. Czartery na jezioro Solińskie.', image: '/images/solina2.avif' },
        { icon: 'jacht', label: 'Jachty', desc: 'Większe jednostki na dłuższe rejsy po Jeziorze Solińskim.', image: '/images/solina3.avif' },
        { icon: 'elektryczna', label: 'Łodzie elektryczne', desc: 'Cicha, ekologiczna przejażdżka po jeziorze. Idealna na rodzinny relaks.', image: '/images/solina4.avif' },
        { icon: 'kajak', label: 'Kajaki & SUP', desc: 'Aktywna eksploracja jeziora w swoim tempie.', image: '/images/solina1.avif' },
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
            { label: 'Wynajem przyczepy podłodziowej (3h)', price: '150 zł' },
            { label: 'Wynajem przyczepy podłodziowej (doba)', price: '300 zł' },
            { label: 'Ożaglowanie / odożaglowanie', price: '150 zł' },
            { label: 'Podnoszenie łodzi', price: '200 zł' },
            { label: 'Prace stolarskie', price: '100 zł / godz.' },
            { label: 'Sprzątanie kabiny (do 7,5m)', price: '100 zł' },
            { label: 'Sprzątanie kabiny (powyżej 7,5m)', price: '150 zł' },
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
      tag: 'Na lądzie',
      title: 'Bieszczady pełne aktywności',
      items: [
        { icon: 'trekking', label: 'Szlaki piesze', desc: 'Trasy piesze i biegowe w Bieszczadach tuż przy obiekcie.', image: '/images/solina4.avif' },
        { icon: 'plaza', label: 'Plaża nad jeziorem', desc: 'Trawiasta plaża z widokiem na jezioro i pasma górskie.', image: '/images/solina1.avif' },
        { icon: 'koncert', label: 'Letnie koncerty', desc: 'Bezpłatne imprezy plenerowe w sezonie letnim.', image: '/images/solina2.avif' },
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
