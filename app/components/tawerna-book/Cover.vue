<script setup lang="ts">
/** Okładka książki: przednia (napis, tytuł w dwóch liniach, podtytuł) albo tylna (zakończenie). */
defineProps<{ back?: boolean; kicker?: string; title?: string[]; sub?: string; closing?: string; name?: string }>()
</script>

<template>
  <div class="book-page book-cover" :class="{ 'book-cover--back': back }" data-density="hard">
    <div v-if="!back" class="book-cover__inner">
      <p class="book-cover__eyebrow">{{ kicker }}</p>
      <div class="book-cover__ornament">✦</div>
      <h2 class="book-cover__title">{{ title?.[0] }}<br><em>{{ title?.[1] }}</em></h2>
      <div class="book-cover__rule" />
      <p class="book-cover__sub">{{ sub }}</p>
    </div>
    <div v-else class="book-cover__inner">
      <div class="book-cover__ornament">✦</div>
      <p class="book-cover__closing">{{ closing }}</p>
      <div class="book-cover__rule" />
      <p class="book-cover__eyebrow">{{ name }}</p>
    </div>
  </div>
</template>

<style scoped>
/* .book-page (tło stron) jest w TawernaBook — podwójna klasa wygrywa niezależnie od kolejności arkuszy. */
.book-page.book-cover {
  background: linear-gradient(160deg, #16241a 0%, #0e160f 100%);
}
.book-cover__inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}
.book-cover .book-cover__eyebrow {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #C9A96E;
}
.book-cover__ornament {
  color: #C9A96E;
  font-size: 1.1rem;
  margin: 1.1rem 0;
}
.book-cover__title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 0.06em;
  line-height: 1.15;
  color: #F2E8D0;
}
.book-cover__title em { font-style: italic; color: #C9A96E; }
.book-cover__rule {
  width: 2.5rem;
  height: 1px;
  background: #C9A96E;
  margin-top: 1.25rem;
}
.book-cover__sub {
  margin-top: 0.9rem;
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #F2E8D0;
  opacity: 0.6;
}
.book-cover__closing {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.4rem;
  color: #F2E8D0;
  margin-top: 0.5rem;
}
</style>
