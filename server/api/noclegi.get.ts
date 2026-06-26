export default defineEventHandler(() => {
  return {
    hero: {
      tag: 'Noclegi',
      title: '57 miejsc noclegowych\nnad jeziorem Solina',
      subtitle: 'Pokoje i apartamenty w Polańczyku',
      image: '/images/hotel.png',
    },
    intro: 'Całoroczny ośrodek wypoczynkowo-konferencyjny w Polańczyku oferuje komfortowe zakwaterowanie w pokojach o standardzie podstawowym i podwyższonym oraz apartamentach. Łącznie 67 miejsc noclegowych z możliwością dostawek.',
    rooms: [
      {
        slug: 'pokoj-1-osobowy',
        tag: 'Pokój 1-osobowy',
        title: 'Standard',
        size: '16.85 m²',
        occupancy: 2,
        desc: 'Przytulny pokój z widokiem na jezioro lub góry. Idealne rozwiązanie dla podróżujących solo lub par szukających komfortu w dobrej cenie.',
        amenities: ['Balkon (widok na jezioro lub góry)', 'Łazienka z prysznicem', 'TV + WiFi', 'Czajnik + lodówka', 'Suszarka do włosów'],
        image: '/images/solina2.avif',
      },
      {
        slug: 'pokoj-2-osobowy',
        tag: 'Pokój 2-osobowy',
        title: 'Standard',
        size: '15–19 m²',
        occupancy: 3,
        desc: 'Dwa łączone łóżka pojedyncze, balkon i pełne wyposażenie. W wybranych pokojach możliwość dostawki dla trzeciej osoby.',
        amenities: ['Balkon (większość pokoi)', 'Łazienka z prysznicem', 'TV + WiFi', 'Czajnik + lodówka', 'Suszarka do włosów'],
        image: '/images/solina3.avif',
      },
      {
        slug: 'pokoj-2-osobowy-plus',
        tag: 'Pokój 2-osobowy',
        title: 'Standard Plus',
        size: '22 m²',
        occupancy: 4,
        desc: 'Strefa dzienna z rozkładaną sofą oraz wydzielona nisza z łóżkiem dwuosobowym. Klimatyzacja ręczna i balkon z widokiem na jezioro lub góry.',
        amenities: ['Balkon z widokiem na jezioro/góry', 'Klimatyzacja ręczna', 'Łazienka z prysznicem', 'TV + WiFi', 'Czajnik + lodówka'],
        image: '/images/hotel.png',
      },
      {
        slug: 'studio-3-osobowe',
        tag: 'Studio 3-osobowe',
        title: 'Standard',
        size: '22–26 m²',
        occupancy: 5,
        desc: 'Salon z rozkładaną sofą i sypialnia z dwoma łączonymi łóżkami. Przestronne, rodzinne wnętrze z balkonem w większości jednostek.',
        amenities: ['Balkon (większość)', 'Łazienka z prysznicem', 'TV + WiFi', 'Czajnik + lodówka', 'Suszarka do włosów'],
        image: '/images/solina1.avif',
      },
      {
        slug: 'studio-3-osobowe-plus',
        tag: 'Studio 3-osobowe',
        title: 'Standard Plus',
        size: '28 m²',
        occupancy: 5,
        desc: 'Większa wersja studia z balkonem z widokiem na jezioro lub góry. Ten sam układ — wyższy standard wykończenia i piękna panorama.',
        amenities: ['Balkon z widokiem na jezioro/góry', 'Łazienka z prysznicem', 'TV + WiFi', 'Czajnik + lodówka', 'Suszarka do włosów'],
        image: '/images/solina4.avif',
      },
      {
        slug: 'apartament-5-osobowy',
        tag: 'Apartament 5-osobowy',
        title: 'Premium',
        size: '40 m²',
        occupancy: 6,
        desc: 'Dwie osobne sypialnie z łączonymi łóżkami i obszerny salon z rozkładaną sofą. Szeroki balkon z panoramicznym widokiem na jezioro lub góry.',
        amenities: ['Szeroki balkon (widok na jezioro/góry)', 'Dwie sypialnie', 'Salon z sofą', 'Łazienka z prysznicem', 'TV + WiFi', 'Czajnik + lodówka'],
        image: '/images/hotel.png',
      },
    ],
    pricing: {
      note: 'Ceny za dobę. Doba hotelowa: check-in 15:00, check-out 10:00. W sezonie i długie weekendy obowiązuje min. pobyt 3 noce.',
      rows: [
        { type: 'Pokój 1-osobowy Standard',    p1: '—',    p2: '260 zł', p3: '—',      p4: '—',      apt: '—' },
        { type: 'Pokój 2-osobowy Standard',    p1: '—',    p2: '260 zł', p3: '390 zł', p4: '520 zł', apt: '—' },
        { type: 'Pokój 2-osobowy Standard+',   p1: '150 zł', p2: '280 zł', p3: '420 zł', p4: '—',  apt: '—' },
        { type: 'Studio 3-osobowe Standard',   p1: '—',    p2: '260 zł', p3: '390 zł', p4: '520 zł', apt: '—' },
        { type: 'Studio 3-osobowe Standard+',  p1: '—',    p2: '280 zł', p3: '420 zł', p4: '—',      apt: '—' },
        { type: 'Apartament 5-osobowy',        p1: '—',    p2: '—',      p3: '—',      p4: '—',      apt: '700 zł' },
      ],
      extras: [
        { label: 'Śniadanie',                       price: '38 zł / os.' },
        { label: 'Śniadanie (dzieci do 10 lat)',     price: '28 zł / os.' },
        { label: 'Kolacja',                          price: '45 zł / os.' },
        { label: 'Kolacja (dzieci do 10 lat)',       price: '35 zł / os.' },
        { label: 'Prowiant',                         price: '25 zł / szt.' },
        { label: 'Dostawka / rozkładana sofa',       price: '110 zł / dobę' },
        { label: 'Dziecko 2–10 lat (łóżko rodzica)', price: '90 zł / dobę' },
        { label: 'Zwierzę domowe',                   price: '50 zł / dobę' },
        { label: 'Opłata klimatyczna',               price: '3 zł / os. / dobę' },
      ],
    },
    grupy: {
      tag: 'Grupy & Eventy',
      title: 'Idealne miejsce\nna Twój event',
      sections: [
        {
          title: 'Idealne miejsce na event!',
          body: 'Ze względu na położenie w spokojnej, turystyczno-sportowej części Polańczyka, mniejsze tłumy i łatwy dojazd – Przystań Caryńska to idealne miejsce na organizację większych wydarzeń kulturalnych, sportowych i towarzyskich. Posiadamy odpowiednie zaplecze noclegowe, gastronomiczne, duży parking oraz szeroką gamę atrakcji, która uświetni każdy wyjazd. Do dyspozycji mamy łodzie żaglowe, elektryczne, rowerki, kajaki oraz mini aquapark.',
        },
        {
          title: 'Pobyt w przystani dla każdego!',
          body: 'Przyjmujemy wycieczki, kolonie, zielone szkoły, obozy sportowe, pielgrzymki oraz wszystkie inne grupy zorganizowane od dzieci po seniorów. Organizujemy konferencje, wyjazdy firmowe, eventy, szkolenia, warsztaty i inne spotkania integracyjne. Wieczorne biesiady przy ognisku, muzyce i dobrym jedzeniu to nasza specjalność. Organizujemy również imprezy okolicznościowe takie jak wesela, chrzciny, urodziny i inne – nasza restauracja przystosowana jest do przyjęć nawet na 110 osób i słynie z pysznej, domowej kuchni. W restauracji i na przystani gościmy również wycieczki objazdowe (spoza naszego ośrodka).',
          note: 'Dla grup korzystających z naszych atrakcji i wyżywienia parking dla autobusów gratis.',
        },
        {
          title: 'Pobyt pełen atrakcji!',
          body: 'Przy współudziale lokalnych firm organizujemy gry i zabawy sportowe, warsztaty rękodzielnicze, off-road czy paintball. Dzięki współpracy z PKL Solina mamy możliwość sprzedaży biletów na kolejkę, która jest niewątpliwie jedną z największych atrakcji regionu, w preferencyjnych cenach. Mając na uwadze różnorodność potrzeb Naszych klientów, do każdej grupy podchodzimy indywidualnie tworząc ofertę najlepiej dopasowaną do Państwa potrzeb. Oferujemy pomoc w wyszukaniu przewodnika, transportu czy lokalnych atrakcji.',
        },
      ],
      pricing: {
        tag: 'Cennik 2026',
        minPersons: 25,
        bonuses: [
          { threshold: 'Powyżej 30 osób', reward: '1 osoba gratis' },
          { threshold: 'Powyżej 40 osób', reward: '2 osoby gratis' },
        ],
        cols: ['Zielona szkoła (dzieci)', 'Ferie zimowe (dzieci)', 'Poza sezonem (dzieci)', 'Poza sezonem (dorośli)', 'W sezonie (7 lip – 28 sie)'],
        rows: [
          { type: 'Cena HB', values: ['150 zł', '—', '150 zł', '190 zł', 'indywidualnie'] },
          { type: 'Cena FB', values: ['170 zł', '150 zł', '170 zł', '215 zł', 'indywidualnie'] },
        ],
        includes: {
          hb: [
            'Nocleg',
            'Śniadanie (bufet szwedzki, ok. 8:30–9:30)',
            'Kolacja serwowana (ok. 18:00–19:00)',
            'Parking monitorowany przy obiekcie',
            'Wi-Fi',
          ],
          fb: [
            'Nocleg',
            'Śniadanie (bufet szwedzki, ok. 8:30–9:30)',
            'Obiad (zupa + drugie danie, ok. 14:00–15:00)',
            'Kolacja serwowana (ok. 18:00–19:00)',
            'Parking monitorowany przy obiekcie',
            'Wi-Fi',
          ],
          footnote: 'Godziny posiłków są przykładowe — elastycznie podchodzimy do każdej grupy.',
        },
        notes: [
          'Darmowy parking dla autokarów przy obiekcie.',
          'Sprzęt przystani wodnej – 15% rabatu od cen standardowych.',
          'Pobyt 1-nocny podnosi cenę oferty o 15 zł/os.',
        ],
        extras: [
          {
            category: 'Wyżywienie dodatkowe',
            items: [
              { name: 'Suchy prowiant', desc: 'Bułka z serem żółtym, bułka z wędliną, owoc, baton, woda 0,5 l — idealna opcja na wycieczkę, w góry lub nad wodę.', price: '25 zł/szt.' },
              { name: 'Obiadokolacja tradycyjna', desc: 'Zupa, drugie danie, kompot.', price: '40 zł/os.' },
              { name: 'Obiadokolacja regionalna', desc: 'Zupa, drugie danie, kompot.', price: '45 zł/os.' },
            ],
          },
          {
            category: 'Grupy objazdowe (nienocujące)',
            note: 'Parking do 6 h gratis.',
            items: [
              { name: 'Obiad dwudaniowy', desc: 'Zupa, drugie danie, kompot.', price: 'Dzieci od 25 zł / Dorośli od 35 zł' },
              { name: 'Przerwa kawowa ciągła', desc: 'Kawa, herbata, woda mineralna, ciasteczka kruche, owoce, ciasto domowe.', price: '30 zł/os.' },
            ],
          },
          {
            category: 'Wieczory & Ogniska',
            items: [
              { name: 'Ognisko', desc: 'Kiełbasa, ziemniaczek pieczony z masłem czosnkowym, napoje w dzbankach, chleb, smalec, pikle, ketchup, musztarda, drzewo.', price: '50 zł/os.' },
              { name: 'Grill', desc: 'Karkówka, kiełbasa, sałatka grecka, ziemniaczki pieczone, oscypek z żurawiną, napoje, chleb, smalec, pikle, ketchup, musztarda.', price: '100 zł/os.' },
              { name: 'Watra Bojkowska', desc: 'Szynka pieczona ogniem żywym z kaszą maszczoną skwarkami i kapustą zasmażaną, grule z sosem czosnkowym, kawa, herbata, pikle, smalczyk, powidła, gorące trunki lokalne (100 ml/os.).', price: '70 zł/os. · 85 zł/os.' },
              { name: 'Kolacja Chłopska I', desc: 'Szwedzki stół: kaszanka z cebulką, żurek staropolski, kociołek gulaszu, zimne półmiski wędlin regionalnych i serów, sałatka, powidła, kawa, herbata, pikle, pajda.', price: '80 zł/os.', note: 'Podawana wyłącznie przy zamówieniu obiadokolacji.' },
              { name: 'Kolacja Chłopska II', desc: 'Szwedzki stół: kaszanka z cebulką, zimne półmiski wędlin regionalnych i serów, sałatka, powidła, pikle, pajda.', price: '100 zł/os.', note: 'Podawana wyłącznie przy zamówieniu obiadokolacji.' },
              { name: 'Kolacja Bojkowska', desc: 'Szwedzki stół: barszcz ukraiński, żur staropolski, pierogi po bojkowsku, gulasz, pieczeń, bandury, kasza, kapusta, zimne półmiski, sery regionalne, sałatki, powidła, ciasto domowe, napoje, kawa, herbata.', price: '120 zł/os.' },
            ],
          },
          {
            category: 'Sala & Rozrywka',
            items: [
              { name: 'Sala konferencyjna', desc: 'Pełny węzeł multimediów + flipchart.', price: '50 zł/h' },
              { name: 'Kapela WATRA', desc: 'W przypadku dostępności.', price: '1 620 zł (do 4 h) · 2 000 zł/wieczór' },
              { name: 'DJ', desc: 'Wraz z salą.', price: '1 200 zł/wieczór' },
            ],
          },
        ],
        legal: 'Cennik nie jest ofertą handlową w rozumieniu Kodeksu Cywilnego. Przystań Caryńska zastrzega sobie prawo do zmian cen, o czym informuje klienta w momencie potwierdzenia rezerwacji.',
      },

      capacity: {
        rooms: [
          { count: 10, label: 'pokoi dwuosobowych' },
          { count: 7,  label: 'pokoi trzyosobowych' },
          { count: 2,  label: 'apartamentów pięcioosobowych' },
          { count: 1,  label: 'pokój czteroosobowy' },
          { count: 1,  label: 'pokój jednoosobowy' },
        ],
        totalRooms: 21,
        beds: 56,
        maxOccupancy: 73,
        halls: [
          { name: 'Sala restauracyjna', seats: '60 osób' },
          { name: 'Sala konferencyjna', seats: '60 osób (80 w układzie kinowym)' },
        ],
      },
    },

    cta: {
      phone: '+48 691 944 266',
      email: 'przystan@carynska.pl',
    },
  }
})
