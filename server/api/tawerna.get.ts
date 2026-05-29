export default defineEventHandler(() => {
  return {
    hero: {
      tag: 'Tawerna',
      title: 'Smaki\nBieszczad',
      image: '/images/solina4.avif',
    },
    intro: 'Regionalna kuchnia polska z widokiem na jezioro Solina. Śniadania, obiady, kolacje i pizza z pieca — wszystko przygotowane z lokalnych składników w sercu Bieszczad.',

    menu: [
      {
        category: 'Śniadania',
        icon: 'plaza',
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
        icon: 'koncert',
        items: [
          { name: 'Żurek z jajkiem i kiełbasą', price: '' },
          { name: 'Pomidorowa z makaronem', price: '' },
          { name: 'Zupa dnia', price: '' },
        ],
      },
      {
        category: 'Przystawki',
        icon: 'trekking',
        items: [
          { name: 'Frytki belgijskie', price: '' },
          { name: 'Ziemniaki z patelni', price: '' },
          { name: 'Strips z kurczaka', price: '' },
          { name: 'Naleśniki (ser/dżem/Nutella)', price: '' },
          { name: 'Placki ziemniaczane', price: '' },
          { name: 'Miruna / Pstrąg kapitański', price: '' },
        ],
      },
      {
        category: 'Pizza z pieca',
        icon: 'grupy',
        items: [
          { name: 'Quiet Pork', price: '34 zł' },
          { name: 'Osioł portowy', price: '36 zł' },
          { name: 'Bieszczadzki Port', price: '38 zł' },
          { name: 'Pozostałe 4 warianty', price: '34–42 zł' },
        ],
      },
      {
        category: 'Zestawy Kapitana',
        icon: 'zaglowka',
        items: [
          { name: 'Pstrąg kapitański (280g z masłem czosnkowym)', price: '40 zł' },
          { name: 'Miruna w różnych wariantach', price: '' },
        ],
      },
      {
        category: 'Polska kuchnia',
        icon: 'jacht',
        items: [
          { name: 'Schabowy', price: '' },
          { name: 'Pierogi ruskie', price: '' },
          { name: 'Gulasz z kaszą gryczaną', price: '' },
          { name: 'Ser pieczony z żurawiną', price: '' },
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
