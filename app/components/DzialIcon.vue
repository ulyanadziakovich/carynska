<script setup lang="ts">
/** Ikonki działów — nazwy jak w panelu (Działy i telefony → Ikona). */
withDefaults(defineProps<{ name?: string; size?: number }>(), { size: 18 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'bed'">
      <path d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7" />
      <path d="M3 18h18" />
      <path d="M3 13h18" />
      <path d="M7 9V6a1 1 0 011-1h8a1 1 0 011 1v3" />
    </template>
    <template v-else-if="name === 'utensils'">
      <path d="M3 2v7a2 2 0 002 2h2a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 00-5 5v6a2 2 0 002 2h3zm0 0v7" />
    </template>
    <template v-else-if="name === 'anchor'">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v13" />
      <path d="M5 12H2a10 10 0 0020 0h-3" />
      <path d="M7 15a5 5 0 0010 0" />
    </template>
  </svg>
</template>
