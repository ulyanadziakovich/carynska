<script setup lang="ts">
/**
 * Harmonogram wsparcia jednego projektu: dane projektu, wspólne miejsce/prowadzący/uczestnicy,
 * działania pogrupowane po dniach i podpisany PDF.
 */
const props = defineProps<{
  project: Record<string, any>
  labels: { place?: string; participants?: string; executor?: string }
}>()

interface ScheduleItem { date?: string; hours?: string; title?: string; place?: string; participants?: string; executor?: string }
type SharedKey = 'place' | 'participants' | 'executor'
const SHARED_KEYS: SharedKey[] = ['place', 'participants', 'executor']

const weekdayFmt = new Intl.DateTimeFormat('pl-PL', { weekday: 'long' })
const dayFmt = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })

/** „27.10.2026” → Date; null, gdy w polu jest coś innego. */
function parseDate(s?: string) {
  const m = s?.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null
}
/** Początek „16.00-20.00” w minutach — do sortowania w obrębie dnia. */
function startMinutes(hours?: string) {
  const m = hours?.match(/(\d{1,2})[.:](\d{2})/)
  return m ? +m[1] * 60 + +m[2] : 0
}
const norm = (s?: string) => (s ?? '').trim()

const schedule = computed(() => {
  const items: ScheduleItem[] = (props.project.scheduleItems ?? []).filter((i: ScheduleItem) => norm(i.title) || norm(i.date))

  // Pola wspólne dla wszystkich wpisów pokazujemy raz, nad listą, zamiast powtarzać je przy każdym spotkaniu.
  const shared = SHARED_KEYS.filter((k) => items.length > 1 && norm(items[0][k]) && items.every((i) => norm(i[k]) === norm(items[0][k])))

  const sorted = items
    .map((i) => ({ ...i, when: parseDate(i.date) }))
    .sort((a, b) => (a.when?.getTime() ?? Infinity) - (b.when?.getTime() ?? Infinity) || startMinutes(a.hours) - startMinutes(b.hours))

  const days: { key: string; weekday?: string; day: string; entries: typeof sorted }[] = []
  for (const i of sorted) {
    const key = i.when ? i.when.toDateString() : norm(i.date)
    let day = days.find((d) => d.key === key)
    if (!day) days.push(day = { key, weekday: i.when ? weekdayFmt.format(i.when) : undefined, day: i.when ? dayFmt.format(i.when) : norm(i.date), entries: [] })
    day.entries.push(i)
  }

  return {
    days,
    shared: shared.map((k) => ({ key: k, label: props.labels[k], value: norm(items[0][k]) })),
    perItem: SHARED_KEYS.filter((k) => !shared.includes(k)).map((k) => ({ key: k, label: props.labels[k] })),
  }
})

const pdfUrl = computed(() => {
  const f = props.project.schedulePdf
  return f?.filename ? cmsImg(`/uploads/${f.directory}${f.filename}`) : undefined
})
/** „16.00-20.00” → „16.00–20.00” (półpauza w przedziale). */
const range = (s?: string) => norm(s).replace(/\s*-\s*/g, '–')
</script>

<template>
  <div>
    <div class="w-8 h-px bg-gold mb-8" />

    <!-- Project facts -->
    <dl v-if="project.scheduleFacts?.length" class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8 gap-y-3 mb-10">
      <template v-for="f in project.scheduleFacts" :key="f.label">
        <dt class="label text-stone sm:pt-1">{{ f.label }}</dt>
        <dd class="font-sans text-ink text-[15px] leading-relaxed -mt-2 sm:mt-0 mb-2 sm:mb-0">{{ f.value }}</dd>
      </template>
    </dl>

    <!-- Shared details (same for every entry) -->
    <dl v-if="schedule.shared.length" class="shared-strip grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mb-10">
      <div v-for="s in schedule.shared" :key="s.key" class="flex gap-3" :class="s.key === 'executor' && 'sm:col-span-2'">
        <span class="meta-icon" aria-hidden="true">
          <svg v-if="s.key === 'place'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
          <svg v-else-if="s.key === 'participants'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.8a3.2 3.2 0 010 6.4M18 14.4c1.8.8 3 2.6 3 4.6"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 20.5c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>
        </span>
        <div>
          <dt class="label text-stone mb-1.5">{{ s.label }}</dt>
          <dd class="font-sans text-ink text-[15px] leading-relaxed whitespace-pre-line">{{ s.value }}</dd>
        </div>
      </div>
    </dl>

    <!-- Agenda, grouped by day -->
    <div class="flex flex-col gap-10">
      <div v-for="d in schedule.days" :key="d.key">
        <h4 class="day-heading flex items-baseline gap-3 pb-3 mb-1">
          <span v-if="d.weekday" class="label text-gold">{{ d.weekday }}</span>
          <span class="font-display text-ink text-xl font-light">{{ d.day }}</span>
        </h4>
        <ul>
          <li v-for="(e, i) in d.entries" :key="i" class="entry-row grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-1 sm:gap-8 py-5">
            <p class="font-display text-gold text-lg font-light tabular-nums whitespace-nowrap">{{ range(e.hours) }}</p>
            <div>
              <p class="font-display text-ink text-lg font-light leading-snug">{{ e.title }}</p>
              <dl v-if="schedule.perItem.some((m) => e[m.key])" class="mt-2 flex flex-col gap-1">
                <div v-for="m in schedule.perItem.filter((m) => e[m.key])" :key="m.key" class="flex gap-2 text-sm text-stone">
                  <dt class="font-medium shrink-0">{{ m.label }}:</dt>
                  <dd class="whitespace-pre-line">{{ e[m.key] }}</dd>
                </div>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <a
      v-if="pdfUrl"
      :href="pdfUrl"
      target="_blank"
      rel="noopener"
      class="pdf-link mt-10 inline-flex items-center gap-2.5"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5"/><path d="M5 19.5h14"/></svg>
      {{ project.schedulePdfLabel }}
    </a>
  </div>
</template>

<style scoped>
.shared-strip {
  padding: 1.5rem 1.5rem;
  border-radius: 16px;
  background-color: rgba(250, 247, 240, 0.7);
  border: 1px solid rgba(122, 92, 30, 0.14);
}
.meta-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(122, 92, 30, 0.3);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.day-heading {
  border-bottom: 1px solid rgba(122, 92, 30, 0.28);
}
.entry-row {
  border-bottom: 1px solid rgba(30, 43, 30, 0.09);
}
.entry-row:last-child { border-bottom: none; }

.pdf-link {
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--cream);
  background-color: var(--gold);
  border-radius: 999px;
  padding: 0.75rem 1.4rem;
  transition: background-color 0.2s ease;
}
.pdf-link:hover { background-color: var(--ink); }
</style>
