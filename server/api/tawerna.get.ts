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
          { name: 'Szwedzki bufet', price: '35 zł', note: '25 zł dzieci' },
          { name: 'Jajecznica z kiełbasą', price: '' },
          { name: 'Naleśniki', price: '' },
          { name: 'Płatki zbożowe z mlekiem', price: '' },
          { name: 'Tace śniadaniowe', price: '' },
        ],
      },
      {
        category: 'Zupy',
        menuImage: '/images/menu-zupy.svg',
        items: [
          { name: 'Żurek staropolski z jajkiem i kiełbasą z chlebem', price: '19 zł' },
          { name: 'Pomidorowa z makaronem', price: '18 zł' },
          { name: 'Zupa dnia', price: '16 zł' },
        ],
      },
      {
        category: 'Zakąski młodego Majtka',
        items: [
          { name: 'Frytki belgijskie', price: '18 zł' },
          { name: 'Ziemniaczki opiekane', price: '12 zł' },
          { name: 'Stripsy 4 szt.', price: '18 zł' },
          { name: 'Naleśniki z serem / powidłami / nutellą 1 szt.', price: '16 zł' },
          { name: 'Placki ziemniaczane ze śmietanką 2 szt.', price: '18 zł' },
          { name: 'Miruna (w ziołach lub panierowana 100g) z frytkami oraz surówką', price: '30 zł' },
          { name: 'Kotlet z piersi kurczaka z frytkami oraz surówką', price: '32 zł' },
        ],
      },
      {
        category: 'Zestawy dla Kapitana',
        items: [
          { name: 'Zestaw dnia (zupa + drugie danie)', price: '40 zł' },
          { name: 'Burger wołowy', price: '42 zł', note: 'pomidor, cebula, ogórek, sałata, cheddar, sos szefa, frytki' },
          { name: 'Pierogi ukraińskie zapiekane z sosem czosnkowym', price: '32 zł' },
          { name: 'Placki po „Bieszczadzku" na wieprzowinie z zestawem surówek', price: '43 zł' },
          { name: 'Kotlet schabowy po Polsku z kością z ziemniakami lub frytkami oraz surówką', price: '44 zł' },
          { name: 'Kotlet z „piersi" kurczaka z frytkami oraz surówką', price: '43 zł' },
          { name: 'Portowa Bida — gulasz z kaszą hreczaną maszczoną skwarkami lub makaronem z ogóreczkiem', price: '32 zł' },
          { name: 'Pierogi ukraińskie', price: '29 zł' },
          { name: 'Ser zapiekany z żurawiną, frytkami oraz surówką', price: '34 zł' },
          { name: 'Ser zapiekany + piwo lane', price: '35 zł' },
        ],
      },
      {
        category: 'Rybki nie tylko z potoka',
        items: [
          { name: 'Pstrąg Kapitana (~280g, masło czosnkowe) z górskiej wody, frytki + surówki', price: '40 zł' },
          { name: 'Miruna (~180g, w ziołach lub panierowana) z frytkami oraz surówką', price: '35 zł' },
        ],
      },
      {
        category: 'Pizza Portowa z Pieca',
        items: [
          { name: '1. Goła Margherita', price: '34 zł', note: 'sos pomidorowy, mozzarella' },
          { name: '2. Cichy Wieprz', price: '39 zł', note: 'sos pomidorowy, mozzarella, szynka, pieczarki' },
          { name: '3. Popołudniowa Bryza', price: '42 zł', note: 'szynka, salami, pieczarki, suszone pomidory' },
          { name: '4. Osioł Portowy 🌶', price: '42 zł', note: 'jalapeno, salami, oliwki' },
          { name: '5. Burza na Rufie 🌶', price: '42 zł', note: 'jalapeno, salami, oliwki, suszone pomidory, cebula' },
          { name: '6. Bieszczadzki Port', price: '42 zł', note: 'scypek, boczek, ogórek kiszony, cebula' },
          { name: '7. Pizza Caryńska', price: '42 zł', note: 'scypek, szynka, kukurydza' },
        ],
      },
      {
        category: 'Stripsy & Wings',
        items: [
          { name: 'Kubełek Strips 5 szt.', price: '20 zł', note: '5 stripsów w złocistej chrupiącej panierce' },
          { name: 'Kubełek Strips 10 szt.', price: '38 zł' },
          { name: 'Kubełek Strips 15 szt.', price: '54 zł' },
          { name: 'Zestaw Strips 3/5 szt. + frytki', price: '23 / 29 zł' },
          { name: 'Kubełek Wings 5 szt.', price: '19 zł', note: '5 skrzydełek w złocistej chrupiącej panierce' },
          { name: 'Kubełek Wings 10 szt.', price: '34 zł' },
          { name: 'Kubełek Wings 15 szt.', price: '44 zł' },
          { name: 'Zestaw Wings 3/5 szt. + frytki', price: '22 / 27 zł' },
          { name: 'Kubełek Mały (5 skrzydełek + 5 stripsów)', price: '35 zł' },
          { name: 'Kubełek Średni (8 skrzydełek + 8 stripsów)', price: '52 zł' },
          { name: 'Dodatkowy kawałek Strips', price: '4,50 zł' },
          { name: 'Dodatkowy kawałek Wings', price: '4 zł' },
        ],
      },
      {
        category: 'Dodatki',
        items: [
          { name: 'Frytki', price: '12 zł' },
          { name: 'Ziemniaczki opiekane', price: '12 zł' },
          { name: 'Ziemniaki gotowane', price: '12 zł' },
          { name: 'Kasza gryczana', price: '12 zł' },
          { name: 'Sosy (ketchup, czosnkowy, duński, serowy chilli, sriracha, tysiąca wysp)', price: '4 zł' },
          { name: 'Dodatek do pizzy (szynka, salami, boczek, scypek, warzywa…)', price: '5 zł' },
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
