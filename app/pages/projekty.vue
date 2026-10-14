<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/projekty'),
  useFetch('/api/content'),
])
const nav = useNav()

const openSection = ref<string | null>('project')
function toggleSection(key: string) {
  openSection.value = openSection.value === key ? null : key
}
</script>

<template>
  <main v-if="data && content" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero :tag="data.hero.tag" :title="data.hero.title" :image="data.hero.image" />

    <div class="projekty-light">
      <div class="max-w-3xl mx-auto px-8 lg:px-0 pt-10">

        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 label text-stone mb-8">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="shrink-0"><path d="M2 7.5L8 2l6 5.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 6.5V13.5a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <NuxtLink to="/" class="hover:text-gold transition-colors">Start</NuxtLink>
          <span>/</span>
          <span>Fundusze i projekty</span>
        </div>

        <div class="flex flex-col gap-4 pb-4">

          <!-- Project -->
          <section class="accordion-card">
            <button type="button" class="accordion-header" @click="toggleSection('project')">
              <span class="toggle-icon">{{ openSection === 'project' ? '−' : '+' }}</span>
              <div class="flex-1">
                <p class="label text-gold mb-3">Rozwój Przedsiębiorczości i Innowacje</p>
                <h1 class="font-display text-ink font-light leading-snug" style="font-size: clamp(1.3rem, 2vw, 1.6rem)">{{ data.project.title }}</h1>
              </div>
              <span v-if="openSection !== 'project'" class="read-more">Czytaj więcej</span>
            </button>

            <div v-if="openSection === 'project'" class="accordion-body">
              <div class="w-8 h-px bg-gold mb-8" />

              <p class="text-stone font-sans text-sm leading-relaxed mb-9 italic max-w-[62ch]">{{ data.project.contract }}</p>

              <p
                v-for="(p, i) in data.project.body"
                :key="i"
                class="body-text mb-5"
              >{{ p }}</p>

              <!-- Finance stats -->
              <div class="finance-strip mt-10 flex flex-wrap gap-x-12 gap-y-7">
                <div v-for="f in data.project.finance" :key="f.label" class="flex flex-col gap-2">
                  <span class="label text-stone">{{ f.label }}</span>
                  <span class="font-display text-gold text-xl font-light">{{ f.value }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- EEA / Norway Grants -->
          <section class="accordion-card">
            <button type="button" class="accordion-header" @click="toggleSection('funds')">
              <span class="toggle-icon">{{ openSection === 'funds' ? '−' : '+' }}</span>
              <div class="flex-1">
                <p class="label text-gold mb-3">Fundusze EOG i Fundusze Norweskie</p>
                <h2 class="font-display text-ink font-light leading-snug" style="font-size: clamp(1.3rem, 2vw, 1.6rem)">{{ data.funds.title }}</h2>
              </div>
              <span v-if="openSection !== 'funds'" class="read-more">Czytaj więcej</span>
            </button>

            <div v-if="openSection === 'funds'" class="accordion-body">
              <div class="w-8 h-px bg-gold mb-8" />

              <p
                v-for="(p, i) in data.funds.body"
                :key="i"
                class="body-text mb-5"
              >{{ p }}</p>

              <div class="flex flex-wrap gap-x-8 gap-y-2 mt-6">
                <a
                  v-for="l in data.funds.links"
                  :key="l.href"
                  :href="l.href"
                  target="_blank"
                  rel="noopener"
                  class="body-text text-gold hover:text-ink underline underline-offset-4 transition-colors"
                >{{ l.label }} →</a>
              </div>
            </div>
          </section>

          <!-- Timeline -->
          <section class="accordion-card">
            <button type="button" class="accordion-header" @click="toggleSection('timeline')">
              <span class="toggle-icon">{{ openSection === 'timeline' ? '−' : '+' }}</span>
              <div class="flex-1">
                <p class="label text-gold mb-3">Realizacja projektu</p>
                <h2 class="font-display text-ink font-light leading-snug" style="font-size: clamp(1.3rem, 2vw, 1.6rem)">{{ data.timeline.title }}</h2>
              </div>
              <span v-if="openSection !== 'timeline'" class="read-more">Czytaj więcej</span>
            </button>

            <div v-if="openSection === 'timeline'" class="accordion-body">
              <p class="text-stone font-sans text-sm mb-10">{{ data.timeline.subtitle }}</p>

              <div class="flex flex-col">
                <div v-for="m in data.timeline.milestones" :key="m.date + m.title" class="timeline-row grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-8 py-6">
                  <p class="label text-gold shrink-0 pt-0.5">{{ m.date }}</p>
                  <div>
                    <h3 class="font-display text-ink text-lg font-light mb-2">{{ m.title }}</h3>
                    <p class="body-text">{{ m.body }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <!-- Logos -->
      <div class="logos-strip py-16 px-8">
        <div class="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          <div class="logo-slot"><img src="/images/logo-parp.png" alt="PARP Grupa PFR" class="max-h-full max-w-[190px] w-auto object-contain" /></div>
          <div class="logo-slot"><img src="/images/logo-norway-grants.png" alt="Norway Grants" class="max-h-full max-w-[130px] w-auto object-contain" /></div>
          <div class="logo-slot"><img src="/images/certyfikat-dobrych-praktyk.png" alt="Certyfikat Dobrych Praktyk" class="max-h-full max-w-[130px] w-auto object-contain" /></div>
          <div class="logo-slot"><img src="/images/certyfikat-dobrych-praktyk-bon-turystyczny.jpg" alt="Certyfikat Dobrych Praktyk - Bon Turystyczny" class="max-h-full max-w-[130px] w-auto object-contain" /></div>
          <div class="logo-slot"><img src="/images/badge-dogs-cats-friendly.png" alt="Dogs/cats friendly" class="max-h-full max-w-[130px] w-auto object-contain" /></div>
        </div>
      </div>

    </div><!-- end light content area -->

    <KontaktSection :data="content.kontakt" :natural-map-colors="true" />
  </main>
</template>

<style scoped>
/* ── Light variant of the site's own forest/gold identity ──
   Vars live on .projekty-light itself (not :root) — Vue's scoped-style
   compiler can't attribute-scope :root, since :root is <html> and never
   receives this component's scope attribute, so vars declared there are
   silently never defined. */
.projekty-light {
  --ink:   #1E2B1E; /* body text — 14.9:1 on --cream */
  --stone: #4C594B; /* muted text — 6.9:1 on --cream (WCAG AA) */
  --gold:  #7A5C1E; /* accent text/links — 5.8:1 on --cream (WCAG AA) */
  --cream: #FAF7F0;

  background-color: var(--cream);
  color: var(--ink);
}

.text-ink   { color: var(--ink); }
.text-stone { color: var(--stone); }
.text-gold  { color: var(--gold); }
.bg-gold    { background-color: var(--gold); }

/* One consistent treatment for every tracked uppercase label on this page —
   previously each one had a slightly different size/tracking, which read
   as an inconsistent mix of typefaces rather than one deliberate style. */
.label {
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

/* One consistent size for all running body copy. */
.body-text {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink);
  opacity: 0.85;
  max-width: 62ch;
}

.accordion-card {
  background-color: #F1EADA;
  border-radius: 22px;
  box-shadow: 0 2px 4px rgba(40, 28, 8, 0.03), 0 12px 28px rgba(40, 28, 8, 0.07);
  padding: 1.75rem 1.75rem;
}
@media (min-width: 640px) {
  .accordion-card { padding: 2.25rem 2.5rem; }
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  text-align: left;
  cursor: pointer;
}
.accordion-header:hover .toggle-icon {
  border-color: var(--gold);
  color: var(--ink);
}

.toggle-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(122, 92, 30, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  font-size: 15px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.read-more {
  align-self: center;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--gold);
  border: 1px solid rgba(122, 92, 30, 0.3);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.accordion-body {
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(122, 92, 30, 0.15);
}

.finance-strip {
  padding-top: 2rem;
  border-top: 1px solid rgba(122, 92, 30, 0.22);
}

.timeline-row {
  border-bottom: 1px solid rgba(30, 43, 30, 0.09);
}
.timeline-row:last-child { border-bottom: none; }

.logos-strip {
  background-color: #EDE2C7;
}
.logo-slot {
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
