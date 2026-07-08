<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/tawerna'),
  useFetch('/api/content'),
])
const nav = useNav()

const romanNumerals = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV']
</script>

<template>
  <main v-if="data && content" class="relative overflow-hidden">

    <!-- Grain overlay -->
    <div class="pointer-events-none fixed inset-0 z-10 opacity-[0.025]"
         style="background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" />

    <!-- Dark hero area -->
    <div class="bg-forest">
      <TheNavbar :nav="nav" :always-show-logo="true" />
      <PageHero :tag="data.hero.tag" :title="data.hero.title" :image="data.hero.image" />
    </div>

    <!-- Light content area -->
    <div class="tawerna-light">

      <!-- Intro -->
      <div class="max-w-2xl mx-auto px-8 pt-16 pb-2 text-center">
        <p class="font-display italic text-lg leading-relaxed text-stone">{{ data.intro }}</p>
      </div>

      <!-- Divider -->
      <div class="flex items-center justify-center gap-4 py-10 px-8">
        <div class="flex-1 max-w-xs h-px bg-gold-muted" />
        <div class="w-1.5 h-1.5 rotate-45 bg-gold-strong" />
        <div class="flex-1 max-w-xs h-px bg-gold-muted" />
      </div>

      <!-- Menu: flip-through book -->
      <div class="max-w-5xl mx-auto pb-28 px-6 lg:px-12 pt-10">
        <ClientOnly>
          <TawernaBook :menu="data.menu" />

          <template #fallback>
            <div class="flex flex-col gap-16">
              <div v-for="section in data.menu" :key="section.category">
                <div class="mb-10">
                  <p class="section-eyebrow">Tawerna Caryńska</p>
                  <h2 class="section-title">{{ section.category }}</h2>
                  <div class="flex items-center gap-3 mt-5">
                    <div class="w-10 h-px bg-gold-strong/50" />
                    <div class="w-1 h-1 rotate-45 bg-gold-strong/60 flex-shrink-0" />
                    <div class="flex-1 h-px bg-gold-muted" />
                  </div>
                </div>
                <div>
                  <div
                    v-for="(item, j) in section.items"
                    :key="item.name"
                    class="menu-item group"
                  >
                    <span class="menu-item__num">{{ romanNumerals[j] }}.</span>
                    <div class="flex-1 min-w-0">
                      <p class="menu-item__name">{{ item.name }}</p>
                      <p v-if="(item as any).note" class="menu-item__note">{{ (item as any).note }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Delivery band -->
      <div class="tawerna-delivery">
        <div class="max-w-3xl mx-auto px-8 py-16 text-center">
          <p class="section-eyebrow mb-4">{{ data.delivery.title }}</p>
          <p class="font-display italic text-base text-stone mb-10">{{ data.delivery.body }}</p>
          <div class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <a
              href="https://carynska.app-tapporder.ngastro.lsisoftware.net/zpc-skorka-spolka-jawna/products?group=af95-0528-1b1b-4b7a"
              target="_blank"
              rel="noopener"
              class="btn-gold"
            >
              🍕 Zamów pizzę
            </a>
            <a :href="`tel:${data.delivery.phone.replace(/\s/g,'')}`" class="btn-outline">
              {{ data.delivery.phone }}
            </a>
            <a :href="`mailto:${data.contact.email}`" class="btn-outline">
              {{ data.contact.email }}
            </a>
          </div>
        </div>
      </div>

    </div>

    <KontaktSection :data="content.kontakt" />
  </main>
</template>

<style scoped>
/* ── Palette ── */
:root {
  --ink:       #1C2A1C;
  --stone:     #5C6B5C;
  --cream:     #F2E8D0;
  --parchment: #E8DCC0;
  --gold:      #8B6814;
  --gold-lt:   #C9A96E;
}

/* ── Light area ── */
.tawerna-light {
  background-color: var(--cream);
  color: var(--ink);
}

/* ── Utility ── */
.bg-gold-muted  { background-color: rgba(139,104,20,0.2); }
.bg-gold-strong { background-color: var(--gold); }
.text-stone     { color: var(--stone); }

/* ── Typography ── */
.section-eyebrow {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.75rem;
}
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 4vw, 3.2rem);
  letter-spacing: 0.06em;
  line-height: 1;
  color: var(--ink);
}

/* ── Menu items ── */
.menu-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(28, 42, 28, 0.08);
}
.menu-item:last-child { border-bottom: none; }

.menu-item__num {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 12px;
  color: var(--gold-lt, #C9A96E);
  width: 1.75rem;
  text-align: right;
  flex-shrink: 0;
  padding-top: 3px;
  line-height: 1;
}
.menu-item__name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 19px;
  line-height: 1.3;
  color: var(--ink);
}
.group:hover .menu-item__name { color: #000; }

.menu-item__note {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 13px;
  color: var(--stone);
  margin-top: 4px;
  line-height: 1.5;
}
/* ── Delivery ── */
.tawerna-delivery {
  background-color: var(--parchment);
  border-top: 1px solid rgba(139, 104, 20, 0.2);
}
.btn-gold {
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 0.75rem 2.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 0.12em;
  white-space: nowrap;
  transition: background 0.25s, color 0.25s;
  text-decoration: none;
  display: inline-block;
}
.btn-gold:hover { background: var(--gold); color: var(--cream); }
.btn-outline {
  border: 1px solid rgba(28, 42, 28, 0.25);
  color: var(--stone);
  padding: 0.75rem 2.5rem;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: border-color 0.25s, color 0.25s;
  text-decoration: none;
  display: inline-block;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }
</style>
