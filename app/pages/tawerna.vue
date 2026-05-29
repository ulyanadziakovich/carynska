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
  <main v-if="data && content" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" />

    <PageHero :tag="data.hero.tag" :title="data.hero.title" :image="data.hero.image" />

    <div class="max-w-2xl mx-auto px-8 py-12 text-center">
      <p class="text-white/55 font-sans font-light text-sm leading-relaxed">{{ data.intro }}</p>
    </div>

    <!-- Tabs -->
    <div class="border-y border-gold/20 px-8">
      <div class="max-w-5xl mx-auto flex flex-wrap justify-center gap-1 py-3">
        <button
          v-for="(section, i) in data.menu"
          :key="i"
          type="button"
          @click="activeTab = i"
          class="px-5 py-2.5 text-[11px] tracking-[0.12em] uppercase font-sans transition-all duration-200"
          :class="activeTab === i ? 'text-forest bg-gold' : 'text-white/45 hover:text-white'"
        >
          {{ section.category }}
        </button>
      </div>
    </div>

    <!-- Active section -->
    <div v-if="activeSection" class="max-w-5xl mx-auto px-8 lg:px-16 py-16 min-h-[40vh]">

      <!-- Pizza: 3-col cards -->
      <div v-if="activeSection.category === 'Pizza Portowa z Pieca'"
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
        <div
          v-for="item in activeSection.items"
          :key="item.name"
          class="bg-forest p-7 flex flex-col gap-3 hover:bg-forest-mid transition-colors duration-200"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="font-display text-white text-xl font-light leading-tight">{{ item.name }}</span>
            <span class="text-gold font-sans text-sm shrink-0 mt-1">{{ item.price }}</span>
          </div>
          <p v-if="item.note" class="text-white/35 font-sans text-xs leading-relaxed">{{ item.note }}</p>
        </div>
      </div>

      <!-- Strips & Wings: 2-col grid -->
      <div v-else-if="activeSection.category === 'Stripsy & Wings'"
           class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gold/10">
        <div
          v-for="item in activeSection.items"
          :key="item.name"
          class="bg-forest px-8 py-5 flex items-center justify-between gap-6 hover:bg-forest-mid transition-colors duration-200"
        >
          <div>
            <p class="text-white/80 font-sans text-sm">{{ item.name }}</p>
            <p v-if="item.note" class="text-white/30 font-sans text-xs mt-0.5">{{ item.note }}</p>
          </div>
          <span class="text-gold font-sans text-sm shrink-0">{{ item.price || '—' }}</span>
        </div>
      </div>

      <!-- Default: 2-col list -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        <div
          v-for="item in activeSection.items"
          :key="item.name"
          class="flex items-baseline gap-3 py-4 border-b border-white/6 group"
        >
          <div class="flex-1 min-w-0">
            <span class="text-white/80 font-sans text-sm leading-relaxed group-hover:text-white transition-colors">
              {{ item.name }}
            </span>
            <p v-if="item.note" class="text-white/30 font-sans text-xs mt-0.5 italic">{{ item.note }}</p>
          </div>
          <span v-if="item.price" class="text-gold font-sans text-sm shrink-0">{{ item.price }}</span>
          <span v-else class="text-white/20 font-sans text-xs shrink-0">—</span>
        </div>
      </div>

    </div>

    <!-- Delivery -->
    <div class="border-t border-gold/20 bg-forest-mid py-16 px-8">
      <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">Dostawa</p>
          <h2 class="font-display text-white text-3xl font-light mb-4">{{ data.delivery.title }}</h2>
          <p class="text-white/50 font-sans text-sm leading-relaxed">{{ data.delivery.body }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 lg:justify-end">
          <a :href="`tel:${data.delivery.phone.replace(/\s/g,'')}`"
             class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider text-center">
            {{ data.delivery.phone }}
          </a>
          <a :href="`mailto:${data.contact.email}`"
             class="border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider text-center">
            {{ data.contact.email }}
          </a>
        </div>
      </div>
    </div>

    <KontaktSection :data="content.kontakt" />
  </main>
</template>
