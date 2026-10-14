<script setup lang="ts">
const props = defineProps<{ name: 'regulamin' | 'regulamin-wypozyczalni' | 'wzor-umowy-jachtu' }>()

const { data: p } = await useCmsSingle(props.name)
const nav = await useNav()
const pdfUrl = computed(() => (p.value?.pdf?.filename ? cmsImg(`/uploads/${p.value.pdf.directory}${p.value.pdf.filename}`) : undefined))
</script>

<template>
  <main v-if="p" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" :always-show-logo="true" :overlay="false" />

    <PageHero :tag="p.kicker" :title="p.title" :image="cmsImg(p.heroImage) ?? ''" />

    <div class="max-w-3xl mx-auto px-8 lg:px-0 py-16 lg:py-20">
      <p v-if="p.lead" class="text-white/40 font-sans text-sm leading-relaxed mb-8">{{ p.lead }}</p>

      <div v-if="!p.buttonsAtEnd" class="mb-14">
        <DocumentButtons :pdf-url="pdfUrl" :pdf-label="p.pdfLabel" :cta="p.cta" :cta-href="p.ctaHref" />
      </div>

      <!-- Treść z edytora CMS — HTML oczyszczony w proxy (server/utils/cmsHtml.ts). -->
      <div class="doc-body" v-html="p.body" />

      <div v-if="p.buttonsAtEnd" class="mt-12">
        <DocumentButtons :pdf-url="pdfUrl" :pdf-label="p.pdfLabel" :cta="p.cta" :cta-href="p.ctaHref" />
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Wygląd treści dokumentu z edytora — jak dawne, ręcznie składane strony. */
.doc-body :deep(h2) {
  font-family: var(--font-display);
  color: var(--color-white, #fff);
  font-size: 1.5rem;
  font-weight: 300;
  margin: 3rem 0 1.25rem;
}
.doc-body :deep(h2:first-child) { margin-top: 0; }
.doc-body :deep(h2)::after {
  content: '';
  display: block;
  width: 2rem;
  height: 1px;
  margin-top: 1rem;
  background: var(--color-gold);
}
.doc-body :deep(p) {
  color: rgb(255 255 255 / 0.55);
  font-size: 0.875rem;
  line-height: 1.625;
  margin-bottom: 0.75rem;
}
.doc-body :deep(p:last-child) { margin-bottom: 0; }
.doc-body :deep(em) { color: rgb(255 255 255 / 0.35); display: block; margin-top: 3.5rem; }

/* Lista numerowana (regulamin wypożyczalni): złote numery po lewej. */
.doc-body :deep(ol) { counter-reset: doc; display: flex; flex-direction: column; gap: 1.5rem; }
.doc-body :deep(ol > li) { counter-increment: doc; display: flex; gap: 1rem; }
.doc-body :deep(ol > li)::before {
  content: counter(doc) '.';
  font-family: var(--font-display);
  color: rgb(201 169 110 / 0.7);
  font-size: 1.125rem;
  line-height: 1;
  width: 1.5rem;
  text-align: right;
  flex-shrink: 0;
}
.doc-body :deep(ol > li > *) { flex: 1; }
.doc-body :deep(ol > li) { flex-wrap: wrap; row-gap: 0; }
.doc-body :deep(ol > li > ul) { flex-basis: 100%; padding-left: 2.5rem; margin-top: 0.5rem; }
.doc-body :deep(ol > li > p) { color: rgb(255 255 255 / 0.6); }

/* Listy punktowane: złota kreska zamiast kropki. */
.doc-body :deep(ul) { display: flex; flex-direction: column; gap: 0.625rem; margin-bottom: 3rem; }
.doc-body :deep(ol ul) { gap: 0.375rem; margin-bottom: 0; }
.doc-body :deep(ul > li) { display: flex; align-items: flex-start; gap: 0.75rem; }
.doc-body :deep(ul > li)::before {
  content: '';
  width: 1rem;
  height: 1px;
  margin-top: 0.625rem;
  flex-shrink: 0;
  background: rgb(201 169 110 / 0.5);
}
.doc-body :deep(ul > li p) { color: rgb(255 255 255 / 0.6); margin: 0; }

/* Ramka „Dokument poglądowy” (cytat w edytorze). */
.doc-body :deep(blockquote) {
  border: 1px solid rgb(201 169 110 / 0.25);
  background: rgb(201 169 110 / 0.06);
  padding: 1.25rem 1.5rem;
  margin-bottom: 2.5rem;
}
.doc-body :deep(blockquote p:first-child strong) {
  color: var(--color-gold);
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  font-weight: 400;
}
.doc-body :deep(blockquote p) { color: rgb(255 255 255 / 0.65); }
.doc-body :deep(strong) { color: rgb(255 255 255 / 0.85); font-weight: 500; }
</style>
