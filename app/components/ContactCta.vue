<script setup lang="ts">
defineProps<{
  tag?: string
  title?: string
  cta: {
    phone: string
    email: string
  }
}>()
</script>

<template>
  <div class="border-t border-gold/20 bg-forest-mid py-12 px-8 text-center">
    <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ tag ?? 'Rezerwacje' }}</p>
    <h3 class="font-display text-white text-3xl font-light mb-8">{{ title ?? 'Zapytaj o dostępność' }}</h3>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        :href="`tel:${cta.phone.replace(/\s/g, '')}`"
        class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider"
      >
        {{ cta.phone }}
      </a>
      <a
        :href="`mailto:${cta.email}`"
        class="border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider"
      >
        {{ cta.email }}
      </a>
    </div>
  </div>
</template>
