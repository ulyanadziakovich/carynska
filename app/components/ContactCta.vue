<script setup lang="ts">
defineProps<{
  tag?: string
  title?: string
  dzial?: CmsDzial | null
}>()

const { kontakt } = await useSite()
</script>

<template>
  <div v-if="dzial?.phone" class="border-t border-gold/20 bg-forest-mid py-12 px-8 text-center">
    <p v-if="tag" class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-4">{{ tag }}</p>
    <h3 v-if="title" class="font-display text-white text-3xl font-light mb-8">{{ title }}</h3>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        v-if="dzial.phone"
        :href="telHref(dzial.phone)"
        class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider"
      >
        {{ dzial.phone }}
      </a>
      <a
        v-if="dzial.email || kontakt?.email"
        :href="`mailto:${dzial.email || kontakt?.email}`"
        class="border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-all duration-300 px-8 py-3 text-sm font-sans tracking-wider"
      >
        {{ dzial.email || kontakt?.email }}
      </a>
    </div>
  </div>
</template>
