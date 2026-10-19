<script setup lang="ts">
/** Pasek logotypów pod zdjęciem strony Projekty (formularz „Strona Projekty i logotypy” → Logotypy). */
defineProps<{ logos: { image?: CmsImage | null; alt?: string; href?: string }[] }>()

// ── Logotypy: równe „na oko” ──
// Ta sama wysokość robi z szerokich logo (PARP, Podkarpackie) olbrzymy, a z wąskich (znak FE) drobinki.
// Zamiast tego każde logo dostaje tę samą powierzchnię (szer. × wys.), z limitem wysokości i szerokości.
const LOGO_AREA = 72 * 72
const LOGO_MAX_H = 80
const LOGO_MAX_W = 140
function logoStyle(img?: CmsImage | null) {
  if (!img?.width || !img?.height) return { maxHeight: `${LOGO_MAX_H}px`, maxWidth: `${LOGO_MAX_W}px` }
  const ratio = img.width / img.height
  const h = Math.min(Math.sqrt(LOGO_AREA / ratio), LOGO_MAX_H, LOGO_MAX_W / ratio)
  return { width: `${Math.round(h * ratio)}px` }
}
</script>

<template>
  <div v-if="logos.length" class="logos-strip py-8 sm:py-10 px-8">
    <!-- Na dużych ekranach jeden rząd; węższe ekrany zawijają do kolejnych rzędów. -->
    <div class="max-w-6xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-10 xl:gap-x-12 gap-y-6">
      <div v-for="(b, i) in logos" :key="i" class="logo-slot">
        <component :is="b.href ? 'a' : 'span'" :href="b.href || undefined" target="_blank" rel="noopener" class="contents">
          <img v-if="cmsImg(b.image)" :src="cmsImg(b.image)" :alt="b.alt" :style="logoStyle(b.image)" class="max-w-full h-auto object-contain" />
        </component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logos-strip {
  background-color: #FFFFFF;
  border-bottom: 1px solid rgba(122, 92, 30, 0.12);
}
.logo-slot {
  height: 88px;
  min-width: 0;
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
