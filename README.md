# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Treść strony (CMS)

Cała treść jest w panelu Pruvious — repo `../carynska-cms`.

1. `cd ../carynska-cms && npm run dev` — panel: http://localhost:4322/dashboard
2. `npm run dev` tutaj — strona: http://localhost:4000

Adres CMS: `runtimeConfig.public.cmsUrl` (nadpisz `NUXT_PUBLIC_CMS_URL`).
Testy: `npm test` (czyszczenie HTML), `npm run check:hardcoded` (brak tekstów w kodzie), `npm run parity` (strona zgodna z baseline).
