<script setup lang="ts">
defineProps<{ pdfUrl?: string; pdfLabel?: string; cta?: string; ctaHref?: string }>()
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4">
    <a
      v-if="pdfUrl"
      :href="pdfUrl"
      download
      class="inline-flex items-center justify-center gap-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
      {{ pdfLabel }}
    </a>
    <NuxtLink
      v-if="cta && ctaHref"
      :to="ctaHref"
      class="inline-flex items-center justify-center gap-3 border border-white/15 text-white/50 hover:border-gold hover:text-gold transition-all px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans"
    >
      {{ cta }}
    </NuxtLink>
  </div>
</template>
