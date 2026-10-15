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
    <template v-else-if="name === 'obiad'">
      <circle cx="12" cy="13" r="6.5" /><circle cx="12" cy="13" r="3.5" opacity="0.6" /><path d="M2.5 4v5a1.5 1.5 0 0 0 3 0V4M4 9.5V20" /><path d="M21.5 4c-1.5 0-2.5 2-2.5 5h2.5M21.5 4v16" />
    </template>
    <template v-else-if="name === 'pizza'">
      <path d="M12 3 3 20.5h18L12 3z" /><path d="M5.2 16.5c4.5-1.2 9-1.2 13.6 0" /><circle cx="11" cy="12" r="1" /><circle cx="14" cy="15.5" r="1" /><circle cx="9.5" cy="16.8" r="0.8" />
    </template>
    <template v-else-if="name === 'impreza'">
      <path d="M6 3h6l-.6 5.5a2.4 2.4 0 0 1-4.8 0L6 3z" /><path d="M9 11v8M6.5 19.5h5" />
      <path d="M14 5h5.5l-.5 4.6a2.25 2.25 0 0 1-4.5 0L14 5z" /><path d="M16.75 12.5V19M14.5 19.5h4.5" />
    </template>
    <template v-else-if="name === 'ryba'">
      <path d="M2.5 12c3-4.5 8-6 12.5-4 2 1 3.5 2.5 4.5 4-1 1.5-2.5 3-4.5 4-4.5 2-9.5.5-12.5-4z" /><path d="M19.5 12 22 8.5v7L19.5 12z" /><circle cx="7" cy="11.2" r="0.7" fill="currentColor" />
    </template>
    <template v-else>
      <path d="M20 6 9 17l-5-5" />
    </template>
  </svg>
</template>
