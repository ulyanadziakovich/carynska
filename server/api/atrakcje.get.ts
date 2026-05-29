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
      body: 'Pomost przyjmuje duże żaglówki i jachty. Wjazd na teren przystani jest bezpłatny i ogólnodostępny.',
      items: [
        { label: 'Bezpłatne cumowanie do 3h' },
        { label: 'Slip mechaniczny do wodowania jachtów' },
        { label: 'Prysznice i pralnia dla żeglarzy' },
        { label: 'Dostęp do prądu przy pomoście' },
        { label: 'Bezprzewodowy internet' },
        { label: 'Kamera online monitorująca pomost' },
        { label: 'Zaplecze sanitarne na miejscu' },
        { label: 'Dwa baseny rekreacyjne (głęb. 0,5m) ze zjeżdżalniami i jacuzzi' },
        { label: 'Trawiasta plaża z widokiem na jezioro i góry' },
        { label: 'Letnie koncerty plenerowe — wstęp wolny' },
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
