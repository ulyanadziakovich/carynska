<script setup lang="ts">
/** Ikonki udogodnień — nazwy jak w panelu (Strona główna → Noclegi → Udogodnienia). */
defineProps<{ name?: string }>()
</script>

<template>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'balkon'">
      <path d="M4 21V10a8 8 0 0 1 16 0v11" /><path d="M2 21h20" /><path d="M7 15v6M12 15v6M17 15v6M4 15h16" />
    </template>
    <template v-else-if="name === 'lazienka'">
      <path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z" /><path d="M6 12V5a2 2 0 0 1 3.5-1.3" /><path d="M7 20l-1 2M17 20l1 2" />
    </template>
    <template v-else-if="name === 'wifi'">
      <path d="M2 8.8a15 15 0 0 1 20 0" /><path d="M5 12.6a10 10 0 0 1 14 0" /><path d="M8.5 16.4a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="0.6" fill="currentColor" />
    </template>
    <template v-else-if="name === 'parking'">
      <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </template>
    <template v-else-if="name === 'widok'">
      <path d="m3 18 6-8 4 5 3-3 5 6" /><path d="M2 21c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" /><circle cx="17" cy="6" r="2" />
    </template>
    <template v-else-if="name === 'sniadanie'">
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" /><path d="M17 11h1a2.5 2.5 0 0 1 0 5h-1.5" /><path d="M8 2.5v3M12 2.5v3" />
    </template>
    <template v-else-if="name === 'klimatyzacja'">
      <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" /><path d="m9 4 3 2 3-2M9 20l3-2 3 2" />
    </template>
    <template v-else-if="name === 'zwierzeta'">
      <circle cx="5.5" cy="11" r="1.8" /><circle cx="9.5" cy="6.5" r="1.8" /><circle cx="14.5" cy="6.5" r="1.8" /><circle cx="18.5" cy="11" r="1.8" />
      <path d="M12 12c-3 0-5.5 3.5-5.5 6 0 1.5 1.5 2.5 3 2l2.5-.8 2.5.8c1.5.5 3-.5 3-2 0-2.5-2.5-6-5.5-6z" />
    </template>
    <template v-else>
      <path d="M20 6 9 17l-5-5" />
    </template>
  </svg>
</template>
