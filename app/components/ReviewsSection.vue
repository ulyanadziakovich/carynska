<script setup lang="ts">
const props = defineProps<{
  reviews: {
    googleUrl: string
    items: { name: string; badge: string | null; date: string; stars: number; text: string }[]
  }
}>()

const scrollEl = ref<HTMLElement | null>(null)
const activeDot = ref(0)
function onScroll() {
  if (!scrollEl.value) return
  activeDot.value = Math.round(scrollEl.value.scrollLeft / scrollEl.value.clientWidth)
}
</script>

<template>
  <section class="bg-white border-t border-black/6">
    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-20">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <p class="text-forest/40 text-[10px] tracking-[0.4em] uppercase font-sans mb-3">Opinie gości</p>
          <h2 class="font-display text-forest font-light" style="font-size: clamp(1.8rem, 3vw, 2.6rem)">Co mówią nasi goście</h2>
        </div>
      </div>

      <!-- Cards -->
      <div
        ref="scrollEl"
        class="flex md:grid md:grid-cols-4 gap-px bg-black/5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none"
        style="scrollbar-width: none"
        @scroll="onScroll"
      >
        <div
          v-for="review in reviews.items"
          :key="review.name"
          class="bg-white p-7 flex flex-col gap-4 hover:bg-forest/[0.02] transition-colors duration-300 shrink-0 w-[80vw] md:w-auto snap-center"
        >
          <!-- Stars + Google icon -->
          <div class="flex items-center justify-between">
            <div class="flex gap-0.5">
              <svg v-for="i in review.stars" :key="i" class="w-3.5 h-3.5 text-[#FBBC05]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <svg class="w-4 h-4 opacity-25" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>

          <!-- Text -->
          <p class="text-forest/60 font-sans font-light text-sm leading-relaxed flex-1">„{{ review.text }}"</p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-3 border-t border-black/6">
            <div class="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
              <span class="text-forest/50 font-sans text-xs font-medium">{{ review.name[0] }}</span>
            </div>
            <div class="min-w-0">
              <p class="text-forest font-sans text-xs font-medium truncate">{{ review.name }}</p>
              <p class="text-forest/30 font-sans text-[10px]">
                <span v-if="review.badge" class="text-[#1A73E8]">{{ review.badge }} · </span>{{ review.date }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Dots (mobile only) -->
      <div class="flex md:hidden justify-center gap-2 pt-5">
        <button
          v-for="(_, i) in props.reviews.items"
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="activeDot === i ? 'bg-forest w-4' : 'bg-forest/25 w-1.5'"
          @click="scrollEl?.scrollTo({ left: i * scrollEl.clientWidth, behavior: 'smooth' })"
        />
      </div>

      <!-- See all -->
      <div class="mt-8 flex justify-center">
        <a
          :href="reviews.googleUrl"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 border border-forest/20 hover:border-forest/50 text-forest/50 hover:text-forest px-7 py-3 font-sans text-[11px] tracking-[0.18em] uppercase transition-all duration-200"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Zobacz wszystkie opinie w Google
        </a>
      </div>

    </div>
  </section>
</template>
