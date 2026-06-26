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
      rooms: [
        {
          type: 'Standart',
          image: '/images/hotel.png',
          capacity: '2 osoby',
          size: '22 m²',
          features: ['Balkon', 'Widok na jezioro', 'WiFi'],
        },
        {
          type: 'Standart Plus',
          image: '/images/solina2.avif',
          capacity: '2–3 osoby',
          size: '28 m²',
          view: 'Jezioro & Góry',
          features: ['Taras', 'WiFi', 'Minibar'],
        },
        {
          type: 'Apartament',
          image: '/images/solina3.avif',
          capacity: '4 osoby',
          size: '42 m²',
          view: 'Jezioro & Góry',
          features: ['Taras panoramiczny', 'Salon', 'WiFi', 'Minibar', 'Jacuzzi'],
        },
      ],
    },

    atrakcje: {
      tag: 'Na jeziorze Solina',
      title: 'Sailing &\nAtrakcje',
      body: 'Żaglówki, łodzie elektryczne, kajaki, SUP i jachty do wynajęcia. Woda i Bieszczady — wszystko w jednym miejscu.',
      image: { src: '/images/solina3.avif', alt: 'Atrakcje wodne na jeziorze Solina' },
      cta: { label: 'Zobacz wszystkie atrakcje', href: '/atrakcje' },
      tiles: [
        {
          id: 'sprzet',
          tag: 'Wypożyczalnia',
          title: 'Sprzęt Wodny',
          icon: '/images/boat.svg',
          image: '/images/gene-dizon-wu_r3tdg_ug-unsplash.jpg',
          from: 'left',
          modalTitle: 'Wypożyczalnia sprzętu wodnego',
          modalBody: [
            'Na jeziorze Solina czeka na Ciebie pełna flota sprzętu wodnego. Oferujemy wynajem żaglówek, łodzi elektrycznych, rowerków wodnych, kajaków oraz desek SUP.',
            'Nasz bosmanat zapewnia pełne wsparcie techniczne i krótkie szkolenie dla początkujących. Jezioro Solina — jedno z największych sztucznych jezior w Polsce — oferuje idealne warunki do żeglugi i sportów wodnych przez cały sezon letni.',
          ],
          highlights: ['Żaglówki', 'Łodzie elektryczne', 'Kajaki & SUP', 'Rowerki wodne', 'Mini aquapark'],
        },
        {
          id: 'imprezy',
          tag: 'Events',
          title: 'Organizacja Imprez',
          icon: '/images/part.svg',
          image: '/images/jack-h_Jqc3liKCk-unsplash.jpg',
          from: 'right',
          modalTitle: 'Idealne miejsce na event!',
          modalBody: [
            'Ze względu na położenie w spokojnej, turystyczno-sportowej części Polańczyka, mniejsze tłumy i łatwy dojazd — Przystań Caryńska to idealne miejsce na organizację większych wydarzeń kulturalnych, sportowych i towarzyskich.',
            'Posiadamy odpowiednie zaplecze noclegowe, gastronomiczne, duży parking oraz szeroką gamę atrakcji, która uświetni każdy wyjazd. Do dyspozycji mamy łodzie żaglowe, elektryczne, rowerki, kajaki oraz mini aquapark.',
            'Przy współudziale lokalnych firm organizujemy gry i zabawy sportowe, warsztaty rękodzielnicze, off-road czy paintball. Dzięki współpracy z PKL Solina mamy możliwość sprzedaży biletów na kolejkę w preferencyjnych cenach.',
            'Nasza kuchnia to duma przystani — serwujemy własne, domowe jedzenie przygotowane ze świeżych składników od lokalnych producentów. Restauracja przystosowana jest do przyjęć nawet na 110 osób.',
          ],
          highlights: ['Wesela & uroczystości', 'Eventy firmowe', 'Paintball & off-road', 'Własna kuchnia', 'PKL Solina'],
        },
        {
          id: 'zapora',
          tag: 'Atrakcja regionu',
          title: 'Zapora Solińska',
          icon: '/images/water.svg',
          image: '/images/tomasz-zielonka-i3R2ZUHukgw-unsplash.jpg',
          from: 'left',
          modalTitle: 'Zapora Solińska',
          modalBody: [
            'Jesteśmy położeni w bezpośrednim sąsiedztwie jednej z największych atrakcji Bieszczad — Zapory Solińskiej. Imponująca budowla i rozległe jezioro tworzą unikalną scenerię, która zachwyca o każdej porze roku.',
            'Dzięki współpracy z PKL Solina oferujemy naszym gościom bilety na kolejkę linową w preferencyjnych cenach — widok z góry na jezioro i otaczające Bieszczady to przeżycie, którego nie można przegapić.',
            'Nasza lokalizacja w spokojnej części Polańczyka zapewnia łatwy dojazd i mniejsze tłumy niż w głównych punktach turystycznych regionu.',
          ],
          highlights: ['Widok na zaporę', 'PKL Solina — kolejka', 'Bieszczadzkie szlaki', 'Spokojne położenie'],
        },
        {
          id: 'grupy',
          tag: 'Organizacja',
          title: 'Dla Grup',
          icon: '/images/food.svg',
          image: '/images/aleksandar-andreev-Sk80Z2A7Ew0-unsplash.jpg',
          from: 'right',
          modalTitle: 'Pobyt w przystani dla każdego!',
          modalBody: [
            'Przyjmujemy wycieczki, kolonie, zielone szkoły, obozy sportowe, pielgrzymki oraz wszystkie inne grupy zorganizowane — od dzieci po seniorów.',
            'Organizujemy konferencje, wyjazdy firmowe, eventy, szkolenia, warsztaty i inne spotkania integracyjne. Wieczorne biesiady przy ognisku, muzyce i dobrym jedzeniu to nasza specjalność.',
            'Organizujemy również imprezy okolicznościowe takie jak wesela, chrzciny, urodziny i inne — nasza restauracja przystosowana jest do przyjęć nawet na 110 osób i słynie z pysznej, domowej kuchni.',
            'Mając na uwadze różnorodność potrzeb naszych klientów, do każdej grupy podchodzimy indywidualnie, tworząc ofertę najlepiej dopasowaną do Państwa potrzeb. Oferujemy pomoc w wyszukaniu przewodnika, transportu czy lokalnych atrakcji.',
          ],
          highlights: ['Kolonie & zielone szkoły', 'Konferencje', 'Obozy sportowe', 'Parking dla autobusów gratis', 'Oferta indywidualna'],
        },
      ],
    },

    kuchnia: {
      tag: 'Tawerna',
      title: 'Smaki\nBieszczad',
      body: [
        'Nasza Tawerna to miejsce, gdzie regionalna kuchnia spotyka się z widokiem na jezioro Solina. Świeże składniki, lokalni producenci, smaki których nie zapomnisz.',
        'Śniadania, obiady, kolacje oraz imprezy okolicznościowe — wszystko przygotowane z pasją w samym sercu Bieszczad.',
      ],
      cta: { label: 'Zobacz menu', href: '/tawerna' },
      image: { src: '/images/tawerna-bar.jpg', alt: 'Tawerna Przystań Caryńska' },
    },

    reviews: {
      googleUrl: 'https://www.google.com/maps/place/Przysta%C5%84+Cary%C5%84ska+w+Pola%C5%84czyku-Pizza+z+dostawa,+Noclegi,+Tawerna,+jachty,+SUP%27y,+elektryki+-/@49.36562,22.4265844,17z/data=!4m11!3m10!1s0x473d8344a6bc3099:0x94ef2a6c3e7dedfa!5m2!4m1!1i2!8m2!3d49.36562!4d22.4291647!9m1!1b1!16s%2Fg%2F1hc7nn1bm?entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D',
      items: [
        {
          name: 'Stan. Jar.',
          badge: 'Lokalny przewodnik',
          date: '3 tygodnie temu',
          stars: 5,
          text: 'Pokoje czyste część z widokiem na Solinę obsługa przemiła jedzenie pyszne. Pani Kasia nasza wspaniała przewodniczka Bardzo jesteśmy zadowoleni Fajna grupa 45 osobowa z pod Poznania Pozdrawiamy polecamy...',
        },
        {
          name: 'Hanna Sienkiewicz',
          badge: null,
          date: '4 tygodnie temu',
          stars: 5,
          text: 'Polecam ten hotel gorąco to jest strzał w dziesiątkę dla każdych ludzi obsługa przemiła ☺️ Chciałabym jeszcze tu wrócić',
        },
        {
          name: 'Sylwia Giełzak',
          badge: null,
          date: 'miesiąc temu',
          stars: 5,
          text: 'Super lokalizacja z przepięknym widokiem na jezioro solińskie, mili właściciele, polecam z całego ❤️',
        },
        {
          name: 'Kamil Olech',
          badge: 'Lokalny przewodnik',
          date: '9 miesięcy temu',
          stars: 5,
          text: 'Polecam obiekt z całego serca, na pewno nieraz jeszcze tu wrócę. Klimatycznie, bardzo czysto — w łazienkach czuć aż świeżość, wszędzie cicho i spokojnie. Kącik do zabawy dla dzieci, jak i do gry dla dorosłych. Sympatyczna obsługa. Przepyszna kuchnia przyhotelowa — dania mają smak, wygląd, doprawione i niebywale gorące — miłe zaskoczenie! Piękne widoki z pokoju, jak i z restauracji. Obiekt w rozsądnej cenie na 6!',
        },
      ],
    },

    kontakt: {
      address: 'Polańczyk, ul. Równa 19',
      email: 'przystan@carynska.pl',
      emailFirma: 'zajazd@carynska.pl',
      mapQuery: 'Przystan+Carynska+Polanczyk+Rowna+19',
      logo: { src: '/images/logo.png', alt: 'Przystań Caryńska' },
      departments: [
        {
          tag: 'Rezerwacje indywidualne',
          name: 'Noclegi',
          desc: 'Pokoje i apartamenty z widokiem na Solinę. Pytania o dostępność i pobyt.',
          phone: '+48 691 944 266',
          email: 'przystan@carynska.pl',
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
        {
          tag: 'Rezerwacje grupowe & sprawy firmy',
          name: 'Biuro',
          desc: 'Rezerwacje grupowe, eventy, konferencje oraz sprawy bieżące.',
          phone: '+48 609 620 565',
          email: 'zajazd@carynska.pl',
        },
      ],
      social: [
        { label: 'Facebook', href: 'https://www.facebook.com/PrzystanCarynska', icon: 'facebook' },
        { label: 'Instagram', href: 'https://www.instagram.com/przystan_carynska', icon: 'instagram' },
      ],
      platforms: [
        { label: 'Booking.com',   href: 'https://www.booking.com/hotel/pl/przystan-carynska.pl.html' },
        { label: 'TripAdvisor',   href: 'https://www.tripadvisor.com/Hotel_Review-g3176335-d28568069-Reviews-Przystan_Carynska_w_Polanczyku-Polanczyk_Subcarpathian_Province_Southern_Poland.html?m=19905' },
        { label: 'Noclegowo.pl',  href: 'https://www.noclegowo.pl/polanczyk/r92298-przystan-carynska-osrodek-szkoleniowo-wypoczynkowy-w-polanczyku/' },
        { label: 'e-nocleg.pl',   href: 'https://e-nocleg.pl/nocleg,unitra.html' },
      ],
      bank: {
        name: 'ING Bank Śląski',
        account: '88 1050 1562 1000 0092 9290 1122',
        swift: 'INGBPLPW',
        note: 'W temacie przelewu prosimy podać: Przystań Caryńska, imię i nazwisko, termin pobytu, liczbę osób.',
      },
      siostrzaneObiekty: [
        {
          name: 'Zajazd Pod Caryńską',
          location: 'Ustrzyki Górne',
          href: 'https://www.carynska.pl',
          phone: '+48 511 311 552',
          email: 'rezerwacje@carynska.pl',
          desc: 'Nocleg w sercu Bieszczadzkiego Parku Narodowego.',
        },
        {
          name: 'Noclegi Terebowiec',
          location: 'Ustrzyki Górne',
          href: 'https://www.terebowiec.pl',
          phone: '+48 577 600 571',
          email: 'noclegi@terebowiec.pl',
          desc: 'Kameralne noclegi w Ustrzykach Górnych.',
        },
      ],
    },
  }
})
