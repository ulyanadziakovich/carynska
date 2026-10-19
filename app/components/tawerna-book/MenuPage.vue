<script setup lang="ts">
/** Jedna strona karty dań. Klasy muszą zgadzać się z mierzeniem w utils/bookPagination.ts. */
import type { BookPage } from '~/utils/bookPagination'

defineProps<{ page: BookPage; number: number; eyebrow?: string; continuedLabel?: string }>()

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']
</script>

<template>
  <div class="book-page" data-density="soft">
    <div class="book-page__inner">
      <p class="book-page__eyebrow">{{ eyebrow }}</p>
      <h3 class="book-page__title">
        {{ page.category }}<span v-if="page.continued && continuedLabel" class="book-page__cont"> — {{ continuedLabel }}</span>
      </h3>
      <div class="book-page__rule" />
      <div class="book-page__items">
        <div v-for="(item, j) in page.items" :key="item.name" class="book-item">
          <span class="book-item__num">{{ ROMAN[j] }}.</span>
          <div class="book-item__body">
            <p class="book-item__name">{{ item.name }}</p>
            <p v-if="item.note" class="book-item__note">{{ item.note }}</p>
          </div>
        </div>
      </div>
      <p class="book-page__num">{{ number }}</p>
    </div>
  </div>
</template>

<style scoped>
.book-page__inner {
  position: relative;
  height: 100%;
  padding: 2.75rem 2.25rem 2rem;
  display: flex;
  flex-direction: column;
}
.book-page__eyebrow {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #8B6814;
  margin-bottom: 0.5rem;
}
.book-page__title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  letter-spacing: 0.04em;
  line-height: 1.05;
  color: #1C2A1C;
}
.book-page__cont {
  font-size: 0.55em;
  font-style: italic;
  color: #5C6B5C;
}
.book-page__rule {
  width: 2.5rem;
  height: 1px;
  background: #8B6814;
  margin: 0.9rem 0 1.25rem;
}
.book-page__items {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.book-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(28, 42, 28, 0.08);
}
.book-item:last-child { border-bottom: none; }
.book-item__num {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 11px;
  color: #C9A96E;
  width: 1.4rem;
  text-align: right;
  flex-shrink: 0;
  padding-top: 2px;
  line-height: 1;
}
.book-item__name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.25;
  color: #1C2A1C;
}
.book-item__note {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 11px;
  color: #5C6B5C;
  margin-top: 2px;
  line-height: 1.4;
}
.book-page__num {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 11px;
  color: #5C6B5C;
  margin-top: 0.75rem;
}
</style>
