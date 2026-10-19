<script setup lang="ts">
/** Rozwijana karta na stronie Projekty: nagłówek z „+ / −” i przyciskiem „Czytaj więcej”, treść w slocie. */
defineProps<{ open: boolean; kicker?: string; title?: string; readMore?: string }>()
const emit = defineEmits<{ toggle: [] }>()
</script>

<template>
  <section class="accordion-card">
    <button type="button" class="accordion-header" :aria-expanded="open" @click="emit('toggle')">
      <span class="toggle-icon" aria-hidden="true">{{ open ? '−' : '+' }}</span>
      <div class="flex-1">
        <!-- Napis nad tytułem pomijamy, gdy powtarza tytuł (np. „Realizacja projektu” / „Realizacja projektu”). -->
        <p v-if="kicker && kicker.trim().toLowerCase() !== title?.trim().toLowerCase()" class="label text-gold mb-3">{{ kicker }}</p>
        <h3 class="font-display text-ink font-light leading-snug" style="font-size: clamp(1.2rem, 1.8vw, 1.45rem)">{{ title }}</h3>
      </div>
      <span v-if="!open" class="read-more">{{ readMore }}</span>
    </button>

    <div v-if="open" class="accordion-body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.accordion-card {
  background-color: #F1EADA;
  border-radius: 22px;
  box-shadow: 0 2px 4px rgba(40, 28, 8, 0.03), 0 12px 28px rgba(40, 28, 8, 0.07);
  padding: 1.75rem 1.75rem;
}
@media (min-width: 640px) {
  .accordion-card { padding: 2.25rem 2.5rem; }
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  text-align: left;
  cursor: pointer;
}
.accordion-header:hover .toggle-icon {
  border-color: var(--gold);
  color: var(--ink);
}

.toggle-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(122, 92, 30, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  font-size: 15px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.read-more {
  align-self: center;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--gold);
  border: 1px solid rgba(122, 92, 30, 0.3);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.accordion-body {
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(122, 92, 30, 0.15);
}
</style>
