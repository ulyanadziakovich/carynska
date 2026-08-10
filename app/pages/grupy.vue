<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/noclegi'),
  useFetch('/api/content'),
])
const nav = useNav()
const g = computed(() => data.value?.grupy)

const sectionsScroll = ref<HTMLElement | null>(null)
const activeSectionDot = ref(0)
function onSectionsScroll() {
  if (!sectionsScroll.value) return
  activeSectionDot.value = Math.round(sectionsScroll.value.scrollLeft / sectionsScroll.value.clientWidth)
}

function extraIcon(category: string) {
  if (category.includes('Wyżywienie')) return 'utensils'
  if (category.includes('objazdowe')) return 'bus'
  if (category.includes('Ogniska')) return 'flame'
  if (category.includes('Rozrywka')) return 'music'
  return 'star'
}
</script>

<template>
  <main v-if="data && content && g" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <!-- ── Hero ── -->
    <div class="relative h-[70vh] min-h-[520px] overflow-hidden">
      <img src="/images/tawerna-bar.jpg" alt="Grupy i eventy" class="absolute inset-0 w-full h-full object-cover scale-105" />
      <div class="absolute inset-0" style="background: linear-gradient(160deg, rgba(14,22,14,0.82) 0%, rgba(14,22,14,0.45) 60%, rgba(14,22,14,0.75) 100%)" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-10 lg:px-20 max-w-7xl mx-auto">
        <p class="text-gold text-[10px] tracking-[0.5em] uppercase font-sans mb-5">Grupy & Eventy</p>
        <h1 class="font-display text-cream/90 font-light leading-none mb-6" style="font-size: clamp(3rem, 7vw, 5.5rem); letter-spacing: 0.04em">
          Idealne miejsce<br>
          <em>na Twój event</em>
        </h1>
        <div class="w-10 h-px bg-gold" />
      </div>
    </div>

    <!-- ── Key numbers ── -->
    <div class="bg-forest-void border-b border-gold/15">
      <div class="max-w-7xl mx-auto px-8 lg:px-16">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/10">
          <div class="py-10 px-8 flex flex-col gap-1">
            <span class="font-display text-gold text-5xl font-light">73</span>
            <span class="text-white/35 font-sans text-xs tracking-[0.2em] uppercase">miejsca noclegowe</span>
          </div>
          <div class="py-10 px-8 flex flex-col gap-1">
            <span class="font-display text-gold text-5xl font-light">110</span>
            <span class="text-white/35 font-sans text-xs tracking-[0.2em] uppercase">os. w restauracji</span>
          </div>
          <div class="py-10 px-8 flex flex-col gap-1">
            <span class="font-display text-gold text-5xl font-light">2</span>
            <span class="text-white/35 font-sans text-xs tracking-[0.2em] uppercase">sale (rest. + konf.)</span>
          </div>
          <div class="py-10 px-8 flex flex-col gap-1">
            <span class="font-display text-gold text-5xl font-light">25+</span>
            <span class="text-white/35 font-sans text-xs tracking-[0.2em] uppercase">min. osób w grupie</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Occasions ── -->
    <div class="bg-forest-wash border-t border-gold/15">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 py-20">
        <p class="text-gold/60 text-[10px] tracking-[0.45em] uppercase font-sans mb-14">Organizujemy</p>
        <div
          ref="sectionsScroll"
          class="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2"
          style="scrollbar-width: none"
          @scroll="onSectionsScroll"
        >
          <div v-for="sec in g.sections" :key="sec.title" class="card-elevated bg-forest-void p-10 flex flex-col gap-5 shrink-0 w-[85vw] md:w-auto snap-center">
            <div class="w-8 h-px bg-gold/60" />
            <h3 class="font-display text-white text-2xl font-light italic leading-snug">{{ sec.title }}</h3>
            <p class="text-white/60 font-sans text-sm leading-relaxed flex-1">{{ sec.body }}</p>
            <p v-if="(sec as any).note" class="text-white/35 font-sans text-xs leading-relaxed border-l border-gold/40 pl-4 italic">{{ (sec as any).note }}</p>
          </div>
        </div>

        <!-- Dots (mobile only) -->
        <div class="flex md:hidden justify-center gap-2 pt-6">
          <button
            v-for="(_, i) in g.sections"
            :key="i"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="activeSectionDot === i ? 'bg-gold w-4' : 'bg-white/20 w-1.5'"
            @click="sectionsScroll?.scrollTo({ left: i * sectionsScroll.clientWidth, behavior: 'smooth' })"
          />
        </div>
      </div>
    </div>

    <!-- ── Rates ── -->
    <div id="cennik" class="bg-forest border-t border-gold/15 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 py-20">

        <div class="flex flex-wrap items-start justify-between gap-10 mb-14">
          <div>
            <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-3">{{ g.pricing.tag }}</p>
            <p class="text-white/30 font-sans text-sm">Min. {{ g.pricing.minPersons }} osób</p>
          </div>
          <!-- Bonuses -->
          <div class="flex gap-4 flex-wrap">
            <div v-for="b in g.pricing.bonuses" :key="b.threshold" class="card-elevated bg-forest-void px-5 py-3">
              <p class="text-white/35 font-sans text-[10px] tracking-[0.15em] uppercase mb-1">{{ b.threshold }}</p>
              <p class="text-gold font-sans text-sm">{{ b.reward }}</p>
            </div>
          </div>
        </div>

        <!-- HB / FB packages -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div class="bg-gold/8 border border-gold/30 p-10">
            <div class="flex items-baseline gap-3 mb-6">
              <span class="font-display text-gold text-5xl font-light">HB</span>
              <span class="text-white/30 font-sans text-xs tracking-[0.15em] uppercase">half board</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li v-for="item in g.pricing.includes.hb" :key="item" class="flex items-start gap-3 text-cream/90 font-sans text-sm">
                <span class="text-gold shrink-0">—</span>{{ item }}
              </li>
            </ul>
          </div>
          <div class="bg-gold/8 border border-gold/30 p-10">
            <div class="flex items-baseline gap-3 mb-6">
              <span class="font-display text-gold text-5xl font-light">FB</span>
              <span class="text-white/30 font-sans text-xs tracking-[0.15em] uppercase">full board</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li v-for="item in g.pricing.includes.fb" :key="item" class="flex items-start gap-3 text-cream/90 font-sans text-sm">
                <span class="text-gold shrink-0">—</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>

        <p class="text-white/20 font-sans text-xs italic mb-12">{{ g.pricing.includes.footnote }}</p>

        <!-- Price table -->
        <div class="overflow-x-auto mb-8">
          <table class="w-full font-sans border-collapse text-sm">
            <thead>
              <tr class="border-b border-gold/20">
                <th class="text-left text-white/30 text-[10px] tracking-[0.2em] uppercase py-3 pr-8 font-normal whitespace-nowrap">Stawka</th>
                <th v-for="col in g.pricing.cols" :key="col" class="text-center text-white/25 text-[9px] tracking-[0.1em] uppercase py-3 px-4 font-normal" style="min-width: 110px">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in g.pricing.rows" :key="row.type" class="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td class="text-white/60 py-4 pr-8 font-light">{{ row.type }}</td>
                <td v-for="(val, vi) in row.values" :key="vi" class="text-center py-4 px-4"
                  :class="val === '—' ? 'text-white/15' : val === 'indywidualnie' ? 'text-white/25 italic text-xs' : 'text-gold'">{{ val }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-gold/8 border border-gold/30 p-6 md:p-8 mb-4">
          <p class="text-gold text-[10px] tracking-[0.35em] uppercase font-sans mb-4">Ważne informacje</p>
          <div class="space-y-3">
            <p v-for="note in g.pricing.notes" :key="note" class="flex items-start gap-3 text-cream/90 font-sans text-sm leading-relaxed">
              <span class="text-gold shrink-0">★</span>{{ note }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Options: icon tiles ── -->
    <div class="bg-forest-wash border-t border-gold/15">
      <div class="max-w-6xl mx-auto px-8 lg:px-12 py-20">
        <p class="text-gold/60 text-[10px] tracking-[0.45em] uppercase font-sans mb-16">Opcje dodatkowe</p>

        <div class="flex flex-col gap-6">
          <div
            v-for="cat in g.pricing.extras"
            :key="cat.category"
            class="card-elevated bg-forest-void border border-gold/10 hover:border-gold/25 transition-colors duration-300 p-8 md:p-10"
          >
            <div class="flex items-center gap-4 mb-8">
              <div class="w-10 h-10 rounded-full border border-gold/25 bg-gold/5 flex items-center justify-center text-gold shrink-0">
                <svg v-if="extraIcon(cat.category) === 'utensils'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 2v7a2 2 0 002 2h2a2 2 0 002-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 00-5 5v6a2 2 0 002 2h3zm0 0v7" />
                </svg>
                <svg v-else-if="extraIcon(cat.category) === 'bus'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 16V7a2 2 0 012-2h14a2 2 0 012 2v9" />
                  <path d="M3 16h18" />
                  <path d="M7 16v3M17 16v3" />
                  <path d="M3 11h18" />
                </svg>
                <svg v-else-if="extraIcon(cat.category) === 'flame'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
                </svg>
                <svg v-else-if="extraIcon(cat.category) === 'music'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l2.6 6.2 6.7.5-5.1 4.4 1.6 6.5L12 16.3 6.2 19.6l1.6-6.5-5.1-4.4 6.7-.5z" />
                </svg>
              </div>
              <h3 class="font-display text-white text-xl font-light italic">{{ cat.category }}</h3>
              <div class="flex-1 h-px bg-gold/10 hidden sm:block" />
              <p class="text-white/25 font-sans text-[9px] tracking-[0.25em] uppercase shrink-0 hidden sm:block">{{ cat.items.length }} {{ cat.items.length === 1 ? 'pozycja' : 'pozycje' }}</p>
            </div>
            <p v-if="(cat as any).note" class="text-white/35 font-sans text-xs mb-6 italic">{{ (cat as any).note }}</p>

            <div class="grid grid-cols-1 gap-x-10" :class="cat.items.length > 3 ? 'md:grid-cols-2' : ''">
              <div v-for="item in cat.items" :key="item.name" class="py-4 border-b border-white/6 flex items-start justify-between gap-6 group">
                <div class="flex-1 min-w-0">
                  <p class="text-white font-sans text-sm mb-1">{{ item.name }}</p>
                  <p class="text-white/45 font-sans text-xs leading-relaxed">{{ item.desc }}</p>
                  <p v-if="(item as any).note" class="text-white/30 font-sans text-[10px] italic mt-1">{{ (item as any).note }}</p>
                </div>
                <span class="text-gold font-display text-lg font-light shrink-0">{{ item.price }}</span>
              </div>
            </div>
          </div>
        </div>

        <p class="text-white/25 font-sans text-xs leading-relaxed pt-10 mt-16 border-t border-white/8">{{ g.pricing.legal }}</p>
      </div>
    </div>

    <!-- ── Capacity ── -->
    <div id="capacity" class="bg-forest border-t border-gold/15 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 py-20">
        <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-14">Baza noclegowa</p>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
          <div>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gold/10 border border-gold/10 mb-8">
              <div v-for="room in g.capacity.rooms" :key="room.label" class="px-5 py-7 flex flex-col gap-2">
                <span class="font-display text-gold text-4xl font-light">{{ room.count }}</span>
                <span class="text-white/35 font-sans text-[10px] leading-snug">{{ room.label }}</span>
              </div>
            </div>
            <div class="flex gap-10">
              <div v-for="[label, val, cls] in [['Łącznie pokoi', g.capacity.totalRooms, 'text-white'], ['Łóżek', g.capacity.beds, 'text-white'], ['Max. gości', g.capacity.maxOccupancy, 'text-gold']]" :key="label">
                <p class="text-white/25 text-[10px] tracking-[0.2em] uppercase font-sans mb-1">{{ label }}</p>
                <p class="font-display text-2xl font-light" :class="cls">{{ val }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div v-for="hall in g.capacity.halls" :key="hall.name" class="card-elevated bg-forest-void px-7 py-6 hover:border-gold/35 transition-colors duration-300">
              <p class="text-white/60 font-sans text-sm mb-1.5">{{ hall.name }}</p>
              <p class="text-gold font-sans text-xs leading-relaxed">{{ hall.seats }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── CTA ── -->
    <div class="bg-forest-void border-t border-gold/15">
      <div class="max-w-4xl mx-auto px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <p class="text-white/30 font-sans text-xs tracking-[0.2em] uppercase mb-2">Zapytaj o ofertę</p>
          <a href="tel:+48691944266" class="font-display text-gold text-3xl font-light hover:text-gold/80 transition-colors">+48 691 944 266</a>
          <p class="text-white/20 font-sans text-xs mt-1">
            <a href="mailto:przystan@carynska.pl" class="hover:text-gold/60 transition-colors">przystan@carynska.pl</a>
          </p>
        </div>
        <a
          href="mailto:przystan@carynska.pl"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans whitespace-nowrap"
        >
          Wyślij zapytanie
        </a>
      </div>
    </div>

    <KontaktSection :data="content.kontakt" />
  </main>
</template>

