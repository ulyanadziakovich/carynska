import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  devServer: {
    port: 4000,
  },

  runtimeConfig: {
    // Tylko na serwerze: sekret, z którym formularz kontaktowy zapisuje wiadomości w CMS.
    // Z NUXT_CONTACT_SECRET (.env, poza repo) — ta sama wartość co w ../carynska-cms/.env.
    contactSecret: '',
    public: {
      // Panel treści (repo ../carynska-cms). Na produkcji nadpisz NUXT_PUBLIC_CMS_URL.
      cmsUrl: 'http://localhost:4322',
    },
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/noclegi': { redirect: '/noclegi/pokoje' },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      // Favicon, Google Analytics i język strony: app.vue (z CMS, Ustawienia → „Google i wyszukiwarki”).
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Raleway:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },
})
