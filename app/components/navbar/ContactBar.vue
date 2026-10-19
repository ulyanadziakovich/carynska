<script setup lang="ts">
/** Pasek z telefonami działów i e-mailem. Na telefonie mieści też hamburger. */
defineProps<{ scrolled: boolean }>()
const emit = defineEmits<{ openMenu: [] }>()

const { callDzialy, kontakt, ustawienia } = await useSite()
</script>

<template>
  <!-- Collapses on scroll on desktop only — on mobile it stays put since it also houses the hamburger. -->
  <div
    class="overflow-hidden transition-all duration-500 ease-in-out bg-forest-void border-b border-white/8 max-h-9 opacity-100"
    :class="scrolled ? 'md:max-h-0 md:opacity-0' : 'md:max-h-9 md:opacity-100'"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between">
      <div class="flex items-center gap-3 sm:gap-6">
        <a
          v-for="p in callDzialy"
          :key="p.id"
          :href="telHref(p.phone)"
          class="group hidden sm:flex items-center gap-2"
        >
          <svg class="w-2.5 h-2.5 text-gold/50 shrink-0" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2.5 1C2.5 1 1 1 1 2.5c0 5.523 4.477 10 10 10C12.5 12.5 12.5 11 12.5 11l-1.5-1.5c0 0-.5-.5-1 0L9 10.5C8 10 6 8 5.5 7L6.5 6c.5-.5 0-1 0-1L5 3.5C5 3.5 4 2.5 3.5 2.5L2.5 1z" transform="scale(0.85)"/>
          </svg>
          <span class="text-white/30 font-sans text-[10px] tracking-[0.15em] group-hover:text-white/60 transition-colors">{{ p.name }}</span>
          <span class="text-white/55 font-sans text-[10px] tracking-[0.05em] group-hover:text-gold transition-colors">{{ p.phone }}</span>
        </a>
        <!-- Mobile: all 3 numbers, icon instead of department label -->
        <a
          v-for="p in callDzialy"
          :key="`m-${p.id}`"
          :href="telHref(p.phone)"
          :aria-label="`${p.name}: ${p.phone}`"
          class="sm:hidden flex items-center gap-1 text-white/60 active:text-gold transition-colors"
        >
          <DzialIcon :name="p.icon" :size="12" class="shrink-0" />
          <span class="font-sans text-[9px] tracking-[0.02em] whitespace-nowrap">{{ p.phone }}</span>
        </a>
      </div>

      <div class="flex items-center gap-4">
        <a
          v-if="kontakt?.email"
          :href="`mailto:${kontakt.email}`"
          class="hidden md:block text-white/25 hover:text-gold font-sans text-[10px] tracking-[0.1em] transition-colors"
        >
          {{ kontakt?.email }}
        </a>

        <!-- Hamburger (mobile only) — always just opens -->
        <button
          class="md:hidden relative z-[60] flex flex-col justify-center items-center w-6 h-6 gap-1"
          @click="emit('openMenu')"
          :aria-label="ustawienia?.openMenu"
        >
          <span class="block w-4 h-px bg-white transition-all duration-300" />
          <span class="block w-4 h-px bg-white transition-all duration-300" />
          <span class="block w-2.5 h-px bg-white transition-all duration-300 self-end" />
        </button>
      </div>
    </div>
  </div>
</template>
