<script setup lang="ts">
/**
 * Jeden projekt z listy „Projekty” w CMS: nazwa programu i tytuł, pod nimi rozwijane karty
 * z tym, co projekt ma wypełnione (opis, dodatkowe informacje, etapy, harmonogram).
 */
const props = defineProps<{
  project: Record<string, any>
  /** Napisy wspólne z formularza „Strona Projekty i logotypy”. */
  page: Record<string, any>
  /** Otwarta karta na całej stronie, np. „3:schedule”. */
  openKey: string | null
  /** id="harmonogram" dla linków /projekty#harmonogram — dostaje go pierwszy projekt z harmonogramem. */
  scheduleAnchor?: boolean
}>()
const emit = defineEmits<{ toggle: [key: string] }>()

const parts = computed(() => projectParts(props.project))
const key = (part: ProjectPart) => `${props.project.id}:${part}`
const isOpen = (part: ProjectPart) => props.openKey === key(part)
</script>

<template>
  <section :id="`projekt-${project.id}`" class="scroll-mt-24">
    <p v-if="project.programName" class="label text-gold mb-3">{{ project.programName }}</p>
    <h2 class="font-display text-ink font-light leading-snug mb-6" style="font-size: clamp(1.45rem, 2.4vw, 1.9rem)">{{ project.title }}</h2>

    <div class="flex flex-col gap-4">
      <!-- About: contract, description, finance -->
      <ProjektyAccordionCard
        v-if="parts.includes('about')"
        :open="isOpen('about')" :title="page.aboutLabel" :read-more="page.readMore"
        @toggle="emit('toggle', key('about'))"
      >
        <div class="w-8 h-px bg-gold mb-8" />
        <p v-if="project.contract" class="text-stone font-sans text-sm leading-relaxed mb-9 italic max-w-[62ch]">{{ project.contract }}</p>
        <p v-for="(p, i) in paragraphs(project.body)" :key="i" class="body-text mb-5">{{ p }}</p>

        <div v-if="project.finance?.length" class="finance-strip mt-10 flex flex-wrap gap-x-12 gap-y-7">
          <div v-for="f in project.finance" :key="f.label" class="flex flex-col gap-2">
            <span class="label text-stone">{{ f.label }}</span>
            <span class="font-display text-gold text-xl font-light">{{ f.value }}</span>
          </div>
        </div>
      </ProjektyAccordionCard>

      <!-- Extra information (e.g. about the funds) -->
      <ProjektyAccordionCard
        v-if="parts.includes('info')"
        :open="isOpen('info')" :kicker="project.infoKicker" :title="project.infoTitle" :read-more="page.readMore"
        @toggle="emit('toggle', key('info'))"
      >
        <div class="w-8 h-px bg-gold mb-8" />
        <p v-for="(p, i) in paragraphs(project.infoBody)" :key="i" class="body-text mb-5">{{ p }}</p>

        <div v-if="project.infoLinks?.length" class="flex flex-wrap gap-x-8 gap-y-2 mt-6">
          <a
            v-for="l in project.infoLinks"
            :key="l.href"
            :href="l.href"
            target="_blank"
            rel="noopener"
            class="body-text text-gold hover:text-ink underline underline-offset-4 transition-colors"
          >{{ l.label }} →</a>
        </div>
      </ProjektyAccordionCard>

      <!-- Timeline -->
      <ProjektyAccordionCard
        v-if="parts.includes('timeline')"
        :open="isOpen('timeline')" :kicker="project.timelineKicker" :title="project.timelineTitle" :read-more="page.readMore"
        @toggle="emit('toggle', key('timeline'))"
      >
        <p v-if="project.timelineSubtitle" class="text-stone font-sans text-sm mb-10">{{ project.timelineSubtitle }}</p>

        <div class="flex flex-col">
          <div v-for="m in project.milestones" :key="m.date + m.title" class="timeline-row grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-8 py-6">
            <p class="label text-gold shrink-0 pt-0.5">{{ m.date }}</p>
            <div>
              <h4 class="font-display text-ink text-lg font-light mb-2">{{ m.title }}</h4>
              <p class="body-text">{{ m.body }}</p>
            </div>
          </div>
        </div>
      </ProjektyAccordionCard>

      <!-- Support schedule -->
      <div v-if="parts.includes('schedule')" :id="scheduleAnchor ? 'harmonogram' : undefined" class="scroll-mt-24">
        <ProjektyAccordionCard
          :open="isOpen('schedule')" :kicker="project.scheduleKicker" :title="project.scheduleTitle || page.scheduleLabel" :read-more="page.readMore"
          @toggle="emit('toggle', key('schedule'))"
        >
          <ProjektySchedule
            :project="project"
            :labels="{ place: page.schedulePlaceLabel, participants: page.scheduleParticipantsLabel, executor: page.scheduleExecutorLabel }"
          />
        </ProjektyAccordionCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.finance-strip {
  padding-top: 2rem;
  border-top: 1px solid rgba(122, 92, 30, 0.22);
}

.timeline-row {
  border-bottom: 1px solid rgba(30, 43, 30, 0.09);
}
.timeline-row:last-child { border-bottom: none; }
</style>
