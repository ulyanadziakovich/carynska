<script setup lang="ts">
/** Zakładki z kategoriami: z boku książki na desktopie, poziomy pasek nad nią na telefonie. */
defineProps<{ bookmarks: { category: string; flipIndex: number; end: number }[]; current: number }>()
const emit = defineEmits<{ go: [flipIndex: number] }>()
</script>

<template>
  <nav class="book-bookmarks">
    <button
      v-for="b in bookmarks"
      :key="b.category"
      type="button"
      class="bookmark"
      :class="{ 'bookmark--active': current >= b.flipIndex && current <= b.end }"
      @click="emit('go', b.flipIndex)"
    >
      {{ b.category }}
    </button>
  </nav>
</template>

<style scoped>
/* ── Bookmarks ── */
.book-bookmarks {
  display: none;
}
@media (min-width: 1024px) {
  .book-bookmarks {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 12rem;
    position: sticky;
    top: 2.5rem;
  }
}
.bookmark {
  text-align: left;
  background: transparent;
  border: none;
  border-left: 2px solid rgba(28, 42, 28, 0.12);
  padding: 0.6rem 0 0.6rem 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 15px;
  letter-spacing: 0.03em;
  color: #5C6B5C;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.bookmark:hover { color: #1C2A1C; }
.bookmark--active {
  color: #1C2A1C;
  font-weight: 400;
  border-left-color: #8B6814;
}

/* ── Mobile (horizontal, above book) ── */
@media (max-width: 1023px) {
  .book-bookmarks {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    gap: 0.25rem;
    position: static;
    scrollbar-width: none;
  }
  .book-bookmarks::-webkit-scrollbar { display: none; }
  .bookmark {
    flex-shrink: 0;
    white-space: nowrap;
    border-left: none;
    border-bottom: 2px solid rgba(28, 42, 28, 0.12);
    padding: 0.5rem 0.85rem;
  }
  .bookmark--active { border-bottom-color: #8B6814; }
}
</style>
