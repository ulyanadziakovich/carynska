export default defineEventHandler(() => {
  return {
    hero: {
      tag: 'Tawerna',
      title: 'Smaki\nBieszczad',
      image: '/images/tawerna-bar.jpg',
    },
    intro: 'Regionalna kuchnia polska z widokiem na jezioro Solina. Śniadania, obiady, kolacje i pizza z pieca — wszystko przygotowane z lokalnych składników w sercu Bieszczad.',

    menu: [
      {
        category: 'Śniadania',
        menuImage: '/images/menu-sniadania.svg',
        items: [
          { name: 'Szwedzki bufet', note: 'dzieci w cenie obniżonej' },
          { name: 'Jajecznica z kiełbasą' },
          { name: 'Naleśniki' },
          { name: 'Płatki zbożowe z mlekiem' },
          { name: 'Tace śniadaniowe' },
        ],
      },
      {
        category: 'Zupy',
        menuImage: '/images/menu-zupy.svg',
        items: [
          { name: 'Żurek staropolski z jajkiem i kiełbasą z chlebem' },
          { name: 'Pomidorowa z makaronem' },
          { name: 'Zupa dnia' },
        ],
      },
      {
        category: 'Zakąski młodego Majtka',
        items: [
          { name: 'Frytki belgijskie' },
          { name: 'Ziemniaczki opiekane' },
          { name: 'Stripsy 4 szt.' },
          { name: 'Naleśniki z serem / powidłami / nutellą 1 szt.' },
          { name: 'Placki ziemniaczane ze śmietanką 2 szt.' },
          { name: 'Miruna (w ziołach lub panierowana 100g) z frytkami oraz surówką' },
          { name: 'Kotlet z piersi kurczaka z frytkami oraz surówką' },
        ],
      },
      {
        category: 'Zestawy dla Kapitana',
        items: [
          { name: 'Zestaw dnia (zupa + drugie danie)' },
          { name: 'Burger wołowy', note: 'pomidor, cebula, ogórek, sałata, cheddar, sos szefa, frytki' },
          { name: 'Pierogi ukraińskie zapiekane z sosem czosnkowym' },
          { name: 'Placki po „Bieszczadzku" na wieprzowinie z zestawem surówek' },
          { name: 'Kotlet schabowy po Polsku z kością z ziemniakami lub frytkami oraz surówką' },
          { name: 'Kotlet z „piersi" kurczaka z frytkami oraz surówką' },
          { name: 'Portowa Bida — gulasz z kaszą hreczaną maszczoną skwarkami lub makaronem z ogóreczkiem' },
          { name: 'Pierogi ukraińskie' },
          { name: 'Ser zapiekany z żurawiną, frytkami oraz surówką' },
          { name: 'Ser zapiekany + piwo lane' },
        ],
      },
      {
        category: 'Rybki nie tylko z potoka',
        items: [
          { name: 'Pstrąg Kapitana (~280g, masło czosnkowe) z górskiej wody, frytki + surówki' },
          { name: 'Miruna (~180g, w ziołach lub panierowana) z frytkami oraz surówką' },
        ],
      },
      {
        category: 'Pizza Portowa z Pieca',
        items: [
          { name: '1. Goła Margherita', note: 'sos pomidorowy, mozzarella' },
          { name: '2. Cichy Wieprz', note: 'sos pomidorowy, mozzarella, szynka, pieczarki' },
          { name: '3. Popołudniowa Bryza', note: 'szynka, salami, pieczarki, suszone pomidory' },
          { name: '4. Osioł Portowy 🌶', note: 'jalapeno, salami, oliwki' },
          { name: '5. Burza na Rufie 🌶', note: 'jalapeno, salami, oliwki, suszone pomidory, cebula' },
          { name: '6. Bieszczadzki Port', note: 'scypek, boczek, ogórek kiszony, cebula' },
          { name: '7. Pizza Caryńska', note: 'scypek, szynka, kukurydza' },
        ],
      },
      {
        category: 'Stripsy & Wings',
        items: [
          { name: 'Kubełek Strips 5 szt.', note: '5 stripsów w złocistej chrupiącej panierce' },
          { name: 'Kubełek Strips 10 szt.' },
          { name: 'Kubełek Strips 15 szt.' },
          { name: 'Zestaw Strips 3/5 szt. + frytki' },
          { name: 'Kubełek Wings 5 szt.', note: '5 skrzydełek w złocistej chrupiącej panierce' },
          { name: 'Kubełek Wings 10 szt.' },
          { name: 'Kubełek Wings 15 szt.' },
          { name: 'Zestaw Wings 3/5 szt. + frytki' },
          { name: 'Kubełek Mały (5 skrzydełek + 5 stripsów)' },
          { name: 'Kubełek Średni (8 skrzydełek + 8 stripsów)' },
          { name: 'Dodatkowy kawałek Strips' },
          { name: 'Dodatkowy kawałek Wings' },
        ],
      },
      {
        category: 'Dodatki',
        items: [
          { name: 'Frytki' },
          { name: 'Ziemniaczki opiekane' },
          { name: 'Ziemniaki gotowane' },
          { name: 'Kasza gryczana' },
          { name: 'Sosy (ketchup, czosnkowy, duński, serowy chilli, sriracha, tysiąca wysp)' },
          { name: 'Dodatek do pizzy (szynka, salami, boczek, scypek, warzywa…)' },
        ],
      },
    ],

    delivery: {
      title: 'Zamów z dostawą',
      body: 'Dowieziemy prosto pod drzwi — zadzwoń i złóż zamówienie.',
      phone: '+48 514 177 136',
    },

    contact: {
      phone: '+48 514 177 136',
      email: 'przystan@carynska.pl',
    },
  }
})
