export default defineEventHandler(() => {
  return {
    nav: {
      links: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '#features' },
        { label: 'Contacts', href: '#contacts' },
        { label: 'Contact', href: '#contact' },
        { label: 'Login', href: '#login' },
      ],
      cta: { label: 'Booking now', href: '#booking' },
    },

    hero: {
      title: 'PRZYSTAŃ\nCARYŃSKA',
      subtitle: 'Luksus w sercu Bieszczad',
      image: '/images/solina1.avif',
    },

    noclegi: {
      tag: 'Noclegi',
      title: 'Wypoczynek\nw sercu natury',
      body: [
        'Oferujemy 57 miejsc noclegowych w komfortowych pokojach i apartamentach z widokiem na jezioro Solina. Każde wnętrze zostało zaprojektowane z dbałością o detal — naturalne drewno, stonowane kolory, cisza Bieszczad.',
        'Do dyspozycji gości: balkon lub taras, łazienka z prysznicem, bezpłatne WiFi oraz prywatny parking przy obiekcie.',
      ],
      cta: { label: 'Sprawdź dostępność', href: '/noclegi' },
      image: { src: '/images/hotel.png', alt: 'Hotel Przystań Caryńska' },
    },

    atrakcje: {
      tag: 'Na jeziorze Solina',
      title: 'Sailing &\nAtrakcje',
      body: 'Żaglówki, łodzie elektryczne, kajaki, SUP i jachty do wynajęcia. Woda i Bieszczady — wszystko w jednym miejscu.',
      image: { src: '/images/solina3.avif', alt: 'Atrakcje wodne na jeziorze Solina' },
      features: [
        { icon: 'zaglowka', label: 'Żaglówki' },
        { icon: 'kajak', label: 'Kajaki & SUP' },
        { icon: 'elektryczna', label: 'Łodzie elektryczne' },
        { icon: 'jacht', label: 'Jachty' },
      ],
      cta: { label: 'Zobacz wszystkie atrakcje', href: '/atrakcje' },
    },

    kuchnia: {
      tag: 'Tawerna',
      title: 'Smaki\nBieszczad',
      body: [
        'Nasza Tawerna to miejsce, gdzie regionalna kuchnia spotyka się z widokiem na jezioro Solina. Świeże składniki, lokalni producenci, smaki których nie zapomnisz.',
        'Śniadania, obiady, kolacje oraz imprezy okolicznościowe — wszystko przygotowane z pasją w samym sercu Bieszczad.',
      ],
      cta: { label: 'Zobacz menu', href: '/tawerna' },
      image: { src: '/images/solina4.avif', alt: 'Tawerna Przystań Caryńska' },
    },

    kontakt: {
      address: 'Polańczyk, ul. Równa 19',
      email: 'przystan@carynska.pl',
      mapQuery: 'Przystan+Carynska+Polanczyk+Rowna+19',
      logo: { src: '/images/logo.png', alt: 'Przystań Caryńska' },
      departments: [
        {
          tag: 'Rezerwacje',
          name: 'Noclegi',
          desc: 'Pokoje i apartamenty z widokiem na Solinę. Pytania o dostępność i pobyt.',
          phone: '+48 691 944 266',
        },
        {
          tag: 'Restauracja',
          name: 'Tawerna',
          desc: 'Kuchnia regionalna, catering, eventy i dostawy na wynos.',
          phone: '+48 514 177 136',
        },
        {
          tag: 'Przystań',
          name: 'Bosmanat',
          desc: 'Wynajem żaglówek, łodzi, kajaków i SUP na jeziorze Solina.',
          phone: '+48 536 700 537',
        },
      ],
      social: [
        { label: 'Facebook', href: 'https://www.facebook.com/PrzystanCarynska', icon: 'facebook' },
        { label: 'Instagram', href: 'https://www.instagram.com/przystan_carynska', icon: 'instagram' },
      ],
      platforms: [
        { label: 'Booking.com', href: 'https://www.booking.com/hotel/pl/przystan-carynska.pl.html' },
        { label: 'TripAdvisor', href: 'https://www.tripadvisor.com' },
        { label: 'Noclegi.pl', href: 'https://www.noclegi.pl' },
      ],
    },
  }
})
