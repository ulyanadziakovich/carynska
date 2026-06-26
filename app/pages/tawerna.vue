<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/tawerna'),
  useFetch('/api/content'),
])
const nav = useNav()
const activeTab = ref(0)
const activeSection = computed(() => data.value?.menu[activeTab.value])

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

      <!-- Menu layout -->
      <div class="max-w-5xl mx-auto pb-28">

        <!-- Mobile tabs -->
        <div class="lg:hidden border-b border-ink/12 px-6 relative">
          <div class="flex overflow-x-auto scrollbar-hide">
            <button
              v-for="(section, i) in data.menu"
              :key="i"
              type="button"
              @click="activeTab = i"
              class="mobile-tab"
              :class="activeTab === i ? 'mobile-tab--active' : 'mobile-tab--idle'"
            >
              {{ section.category }}
              <span v-if="activeTab === i" class="mobile-tab-line" />
            </button>
          </div>
          <!-- scroll hint -->
          <div class="absolute right-0 top-0 bottom-0 w-12 pointer-events-none tab-fade" />
        </div>

        <div class="flex items-start gap-0 px-6 lg:px-12 pt-10">

          <!-- Sidebar (desktop) -->
          <nav class="hidden lg:block w-56 flex-shrink-0 sticky top-10 pr-8 border-r border-ink/10">
            <p class="sidebar-label">Karta dań</p>
            <button
              v-for="(section, i) in data.menu"
              :key="i"
              type="button"
              @click="activeTab = i"
              class="sidebar-btn"
              :class="activeTab === i ? 'sidebar-btn--active' : 'sidebar-btn--idle'"
            >
              <span v-if="activeTab === i" class="sidebar-dot" />
              {{ section.category }}
            </button>
          </nav>

          <!-- Content -->
          <div class="flex-1 lg:pl-14 min-w-0">
            <div class="hidden lg:block h-px mb-10 bg-gradient-to-r from-gold-strong/40 via-gold-strong/10 to-transparent" />

            <Transition name="menu" mode="out-in">
              <div v-if="activeSection" :key="activeTab">

                <!-- Category heading -->
                <div class="mb-10">
                  <p class="section-eyebrow">Tawerna Caryńska</p>
                  <h2 class="section-title">{{ activeSection.category }}</h2>
                  <div class="flex items-center gap-3 mt-5">
                    <div class="w-10 h-px bg-gold-strong/50" />
                    <div class="w-1 h-1 rotate-45 bg-gold-strong/60 flex-shrink-0" />
                    <div class="flex-1 h-px bg-gold-muted" />
                  </div>
                </div>

                <!-- Items -->
                <div>
                  <div
                    v-for="(item, j) in activeSection.items"
                    :key="item.name"
                    class="menu-item group"
                  >
                    <span class="menu-item__num">{{ romanNumerals[j] }}.</span>
                    <div class="flex-1 min-w-0">
                      <p class="menu-item__name">{{ item.name }}</p>
                      <p v-if="(item as any).note" class="menu-item__note">{{ (item as any).note }}</p>
                    </div>
                    <span v-if="item.price" class="menu-item__price">{{ item.price }}</span>
                    <span v-else class="menu-item__dash">—</span>
                  </div>
                </div>

              </div>
            </Transition>
          </div>

        </div>
      </div>

      <!-- Delivery band -->
      <div class="tawerna-delivery">
        <div class="max-w-3xl mx-auto px-8 py-16 text-center">
          <p class="section-eyebrow mb-4">{{ data.delivery.title }}</p>
          <p class="font-display italic text-base text-stone mb-10">{{ data.delivery.body }}</p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a :href="`tel:${data.delivery.phone.replace(/\s/g,'')}`" class="btn-gold">
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

/* ── Sidebar ── */
.sidebar-label {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: 1.5rem;
  padding-left: 2px;
}
.sidebar-btn {
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.65rem 1.5rem 0.65rem 0;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 15px;
  letter-spacing: 0.03em;
  border-bottom: 1px solid rgba(28, 42, 28, 0.08);
  transition: color 0.2s;
  cursor: pointer;
  background: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
}
.sidebar-btn:last-child { border-bottom: none; }
.sidebar-btn--idle  { color: var(--stone); }
.sidebar-btn--idle:hover { color: var(--ink); }
.sidebar-btn--active { color: var(--ink); font-weight: 400; }
.sidebar-dot {
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--gold);
  z-index: 1;
}

/* ── Mobile tabs ── */
.mobile-tab {
  position: relative;
  flex-shrink: 0;
  padding: 0.75rem 1rem;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.2s;
  background: transparent;
  cursor: pointer;
  border: none;
}
.mobile-tab--idle  { color: var(--stone); }
.mobile-tab--active { color: var(--ink); }
.mobile-tab-line {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: var(--gold);
}

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
.menu-item__price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 19px;
  font-weight: 400;
  color: var(--gold);
  flex-shrink: 0;
  padding-top: 1px;
  letter-spacing: 0.02em;
}
.menu-item__dash {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  color: rgba(28, 42, 28, 0.2);
  flex-shrink: 0;
  padding-top: 3px;
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
  transition: border-color 0.25s, color 0.25s;
  text-decoration: none;
  display: inline-block;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }

/* ── Transitions ── */
.menu-enter-active { animation: menu-in 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.menu-leave-active { animation: menu-out 0.18s ease; }
@keyframes menu-in  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
@keyframes menu-out { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-6px); } }

.scrollbar-hide { scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

.tab-fade {
  background: linear-gradient(to right, transparent, var(--cream) 80%);
}
</style>
