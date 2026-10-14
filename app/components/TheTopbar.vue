<script setup lang="ts">
const { callDzialy, kontakt, ustawienia } = await useSite()
</script>

<template>
  <div class="bg-forest border-b border-white/8 relative z-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between">

      <!-- Phones -->
      <div class="flex items-center gap-6">
        <a
          v-for="d in callDzialy"
          :key="d.id"
          :href="telHref(d.phone)"
          class="topbar-phone group hidden sm:flex items-center gap-2"
        >
          <svg class="w-2.5 h-2.5 text-gold/50 shrink-0" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2.5 1C2.5 1 1 1 1 2.5c0 5.523 4.477 10 10 10C12.5 12.5 12.5 11 12.5 11l-1.5-1.5c0 0-.5-.5-1 0L9 10.5C8 10 6 8 5.5 7L6.5 6c.5-.5 0-1 0-1L5 3.5C5 3.5 4 2.5 3.5 2.5L2.5 1z" transform="scale(0.85)"/>
          </svg>
          <span class="text-white/30 font-sans text-[10px] tracking-[0.15em] group-hover:text-white/60 transition-colors">{{ d.name }}</span>
          <span class="text-white/55 font-sans text-[10px] tracking-[0.05em] group-hover:text-gold transition-colors">{{ d.phone }}</span>
        </a>
        <!-- Mobile: only main number -->
        <a v-if="callDzialy[0]" :href="telHref(callDzialy[0].phone)" class="sm:hidden flex items-center gap-2 text-white/55 font-sans text-[10px]">
          <span class="text-white/30">{{ ustawienia?.topbarLabel }}</span>
          <span>{{ callDzialy[0].phone }}</span>
        </a>
      </div>

      <!-- Right: email -->
      <a
        v-if="kontakt?.email"
        :href="`mailto:${kontakt.email}`"
        class="hidden md:block text-white/25 hover:text-gold font-sans text-[10px] tracking-[0.1em] transition-colors"
      >
        {{ kontakt.email }}
      </a>

    </div>
  </div>
</template>
