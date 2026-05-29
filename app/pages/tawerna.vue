<script setup lang="ts">
const [{ data }, { data: content }] = await Promise.all([
  useFetch('/api/tawerna'),
  useFetch('/api/content'),
])
const nav = useNav()
const activeTab = ref(0)
const activeSection = computed(() => data.value?.menu[activeTab.value])
</script>

<template>
  <main v-if="data && content" class="bg-forest min-h-screen relative overflow-hidden">

    <!-- Grain overlay -->
    <div class="pointer-events-none fixed inset-0 z-10 opacity-[0.035]"
         style="background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" />

    <TheNavbar :nav="nav" :always-show-logo="true" />

    <!-- Hero -->
    <PageHero :tag="data.hero.tag" :title="data.hero.title" :image="data.hero.image" />

    <!-- Intro -->
    <div class="max-w-xl mx-auto px-8 pt-14 pb-4 text-center">
      <p class="font-display italic text-white/45 text-lg leading-relaxed">{{ data.intro }}</p>
    </div>

    <!-- Decorative divider -->
    <div class="flex items-center justify-center gap-5 py-10 px-8">
      <div class="flex-1 max-w-xs h-px bg-gradient-to-r from-transparent to-gold/30" />
      <svg viewBox="0 0 40 20" class="w-10 h-5 text-gold/50" fill="none" stroke="currentColor" stroke-width="0.8">
        <polyline points="0,20 8,8 14,14 20,2 26,14 32,8 40,20"/>
      </svg>
      <div class="flex-1 max-w-xs h-px bg-gradient-to-l from-transparent to-gold/30" />
    </div>

    <!-- Category tabs — fine dining style -->
    <nav class="max-w-5xl mx-auto px-8 mb-16">
      <div class="flex flex-wrap justify-center gap-2 lg:gap-0">
        <button
          v-for="(section, i) in data.menu"
          :key="i"
          type="button"
          @click="activeTab = i"
          class="relative px-4 lg:px-6 py-3 font-display text-[12px] lg:text-[13px] tracking-[0.25em] uppercase transition-all duration-300"
          :class="activeTab === i ? 'text-gold' : 'text-white/30 hover:text-white/60'"
        >
          {{ section.category }}
          <span
            class="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
            :class="activeTab === i ? 'bg-gold' : 'bg-transparent'"
          />
        </button>
      </div>
      <div class="h-px bg-gold/15 mt-0" />
    </nav>

    <!-- Menu content -->
    <div class="max-w-3xl mx-auto px-8 pb-24 relative">

      <Transition name="menu" mode="out-in">
        <div v-if="activeSection" :key="activeTab">

          <!-- Category heading -->
          <div class="text-center mb-14">
            <h2 class="font-display text-white/90 font-light tracking-[0.25em] uppercase"
                style="font-size: clamp(2rem, 4vw, 3.2rem)">
              {{ activeSection.category }}
            </h2>
            <div class="flex items-center justify-center gap-4 mt-4">
              <div class="w-16 h-px bg-gold/40" />
              <div class="w-1.5 h-1.5 rotate-45 bg-gold/60" />
              <div class="w-16 h-px bg-gold/40" />
            </div>
          </div>

          <!-- ── PIZZA ── special card layout -->
          <template v-if="activeSection.category === 'Pizza Portowa z Pieca'">
            <div class="grid grid-cols-1 gap-0">
              <div
                v-for="item in activeSection.items"
                :key="item.name"
                class="group flex items-start justify-between gap-6 py-7 border-b border-white/6 hover:bg-white/[0.02] transition-colors px-3 -mx-3"
              >
                <div class="flex-1">
                  <p class="font-display text-white text-xl font-light leading-snug group-hover:text-cream transition-colors">
                    {{ item.name }}
                  </p>
                  <p v-if="item.note" class="font-display italic text-white/35 text-sm mt-1.5 leading-relaxed">
                    {{ item.note }}
                  </p>
                </div>
                <span class="font-display text-gold text-xl font-light shrink-0 pt-0.5 tracking-wider">
                  {{ item.price }}
                </span>
              </div>
            </div>
          </template>

          <!-- ── STRIPS ── size progression layout -->
          <template v-else-if="activeSection.category === 'Stripsy & Wings'">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-0">
              <div
                v-for="item in activeSection.items"
                :key="item.name"
                class="flex items-start justify-between gap-4 py-5 border-b border-white/6 px-3 hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <p class="font-display text-white text-base font-light">{{ item.name }}</p>
                  <p v-if="item.note" class="font-display italic text-white/30 text-xs mt-1">{{ item.note }}</p>
                </div>
                <span class="font-display text-gold text-base font-light shrink-0">{{ item.price || '—' }}</span>
              </div>
            </div>
          </template>

          <!-- ── DEFAULT ── fine dining list -->
          <template v-else>
            <div
              v-for="item in activeSection.items"
              :key="item.name"
              class="group flex items-start justify-between gap-8 py-6 border-b border-white/6 hover:bg-white/[0.02] transition-colors px-3 -mx-3"
            >
              <div class="flex-1">
                <p class="font-display text-white/90 text-xl font-light leading-snug group-hover:text-white transition-colors">
                  {{ item.name }}
                </p>
                <p v-if="item.note" class="font-display italic text-white/30 text-sm mt-1.5">
                  {{ item.note }}
                </p>
              </div>
              <span v-if="item.price" class="font-display text-gold text-xl font-light shrink-0 pt-0.5">
                {{ item.price }}
              </span>
            </div>
          </template>

        </div>
      </Transition>
    </div>

    <!-- Delivery -->
    <div class="border-t border-gold/15 relative">
      <div class="absolute inset-0 opacity-5"
           style="background-image: url('/images/solina4.avif'); background-size: cover; background-position: center" />
      <div class="relative max-w-3xl mx-auto px-8 py-16 text-center">
        <p class="text-gold text-[10px] tracking-[0.5em] uppercase font-sans mb-4">{{ data.delivery.title }}</p>
        <p class="font-display italic text-white/50 text-base mb-10">{{ data.delivery.body }}</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a :href="`tel:${data.delivery.phone.replace(/\s/g,'')}`"
             class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-10 py-3 font-display text-lg font-light tracking-widest">
            {{ data.delivery.phone }}
          </a>
          <a :href="`mailto:${data.contact.email}`"
             class="border border-white/15 text-white/50 hover:border-gold hover:text-gold transition-all duration-300 px-10 py-3 font-sans text-[11px] tracking-[0.2em] uppercase">
            {{ data.contact.email }}
          </a>
        </div>
      </div>
    </div>

    <KontaktSection :data="content.kontakt" />
  </main>
</template>

<style scoped>
.menu-enter-active {
  animation: menu-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.menu-leave-active {
  animation: menu-out 0.2s ease;
}
@keyframes menu-in {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes menu-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-8px); }
}
</style>
