<script setup lang="ts">
// Strona: formularz „Strona Projekty i logotypy”. Projekty: lista „Projekty” (każdy wpis = jeden projekt).
const { data: page } = await useCmsSingle('projekty')
useCmsSeo(page)
const { data: list } = await useCmsCollection('projekty-lista', { order: 'order:asc' })
const { ustawienia } = await useSite()
const nav = await useNav()

const projects = computed(() => (list.value?.records ?? []).filter((p) => projectParts(p).length))
/** Pierwszy projekt z harmonogramem — jego karta dostaje kotwicę #harmonogram. */
const scheduleProject = computed(() => projects.value.find((p) => projectParts(p).includes('schedule')))

// Jedna otwarta karta na całej stronie; na start pierwsza karta pierwszego projektu.
const first = projects.value[0]
const openKey = ref<string | null>(first ? `${first.id}:${projectParts(first)[0]}` : null)
function toggle(key: string) {
  openKey.value = openKey.value === key ? null : key
}

// Link z zewnątrz (np. z Facebooka) prosto do harmonogramu: /projekty#harmonogram
const route = useRoute()
onMounted(() => {
  if (route.hash === '#harmonogram' && scheduleProject.value) {
    openKey.value = `${scheduleProject.value.id}:schedule`
    nextTick(() => document.getElementById('harmonogram')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
})
</script>

<template>
  <main v-if="page" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero :tag="page.heroTag" :title="page.heroTitle" :image="cmsImg(page.heroImage) ?? ''" :subtitle="page.heroSubtitle" />

    <div class="projekty-light">
      <!-- Logos — zaraz pod zdjęciem, zanim gość zacznie czytać o projektach. -->
      <ProjektyLogoStrip :logos="page.logos ?? []" />

      <div class="max-w-3xl mx-auto px-8 lg:px-0 pt-10 pb-20">

        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 label text-stone mb-10">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="shrink-0"><path d="M2 7.5L8 2l6 5.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 6.5V13.5a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <NuxtLink to="/" class="hover:text-gold transition-colors">{{ ustawienia?.breadcrumbHome }}</NuxtLink>
          <span>/</span>
          <span>{{ page.heroTag }}</span>
        </div>

        <div class="flex flex-col gap-16">
          <ProjektyProjekt
            v-for="p in projects"
            :key="p.id"
            :project="p"
            :page="page"
            :open-key="openKey"
            :schedule-anchor="p.id === scheduleProject?.id"
            @toggle="toggle"
          />
        </div>
      </div>

    </div><!-- end light content area -->

    <KontaktSection />
  </main>
</template>

<!-- Celowo bez „scoped”: te klasy używają też komponenty z components/projekty/
     (styl scoped nie sięga do środka komponentów-dzieci). Wszystko pod .projekty-light,
     więc nic nie wycieka na inne strony. -->
<style>
/* ── Light variant of the site's own forest/gold identity ──
   Vars live on .projekty-light itself (not :root) and are inherited by everything inside. */
.projekty-light {
  --ink:   #1E2B1E; /* body text — 14.9:1 on --cream */
  --stone: #4C594B; /* muted text — 6.9:1 on --cream (WCAG AA) */
  --gold:  #7A5C1E; /* accent text/links — 5.8:1 on --cream (WCAG AA) */
  --cream: #FAF7F0;

  background-color: var(--cream);
  color: var(--ink);
}

.projekty-light .text-ink   { color: var(--ink); }
.projekty-light .text-stone { color: var(--stone); }
.projekty-light .text-gold  { color: var(--gold); }
.projekty-light .bg-gold    { background-color: var(--gold); }

/* One consistent treatment for every tracked uppercase label on this page —
   previously each one had a slightly different size/tracking, which read
   as an inconsistent mix of typefaces rather than one deliberate style. */
.projekty-light .label {
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

/* One consistent size for all running body copy. */
.projekty-light .body-text {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink);
  opacity: 0.85;
  max-width: 62ch;
}
</style>
