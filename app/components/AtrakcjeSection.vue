<template>
  <section class="bg-forest-mid relative overflow-hidden">
    <!-- Full-bleed image with overlay -->
    <div class="relative h-[70vh] min-h-[500px]">
      <img
        src="/images/solina3.avif"
        alt="Atrakcje wodne na jeziorze Solina"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/30 to-forest/80" />

      <!-- Centered label -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p class="text-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-5">
          Na jeziorze Solina
        </p>
        <h2
          class="font-display text-white font-light tracking-[0.15em] leading-none"
          style="font-size: clamp(2.8rem, 6vw, 5.5rem)"
        >
          Sailing &amp;<br />Atrakcje
        </h2>
        <div class="w-8 h-px bg-gold mt-8 mb-8" />
        <p class="text-white/60 font-sans font-light text-sm max-w-md leading-relaxed">
          Żaglówki, łodzie elektryczne, kajaki, SUP i jachty do wynajęcia.<br />
          Woda i Bieszczady — wszystko w jednym miejscu.
        </p>
      </div>
    </div>

    <!-- Feature strip -->
    <div class="grid grid-cols-2 lg:grid-cols-4 border-t border-gold/20">
      <div
        v-for="item in features"
        :key="item.label"
        class="flex flex-col items-center justify-center py-10 px-6 text-center border-r border-gold/20 last:border-r-0 group cursor-default"
      >
        <span class="text-gold text-2xl mb-4">{{ item.icon }}</span>
        <p class="text-white text-[11px] tracking-[0.2em] uppercase font-sans">{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { icon: '⛵', label: 'Żaglówki' },
  { icon: '🚣', label: 'Kajaki & SUP' },
  { icon: '⚡', label: 'Łodzie elektryczne' },
  { icon: '⚓', label: 'Jachty' },
]
</script>
