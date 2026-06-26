<script setup lang="ts">
defineProps<{
  hero: {
    title: string
    subtitle: string
    image: string
  }
}>()
</script>

<template>
  <section class="relative h-screen flex flex-col overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat ken-burns"
      :style="`background-image: url('${hero.image}')`"
    />

    <div class="absolute inset-0 bg-gradient-to-b from-forest/60 via-black/30 to-forest/95" />

    <div class="absolute bottom-20 inset-x-0 pointer-events-none opacity-20">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" class="w-full h-20">
        <polyline
          points="0,100 120,55 200,75 340,25 460,60 580,15 680,50 800,8 920,45 1060,20 1180,58 1300,30 1440,50 1440,100"
          fill="none" stroke="#C9A96E" stroke-width="1.5"
        />
      </svg>
    </div>

    <div class="relative flex-1 flex flex-col items-center justify-center text-center px-6">
      <p class="fade-in text-gold text-[11px] tracking-[0.45em] uppercase mb-6 font-sans font-light" style="animation-delay: 0.3s">
        {{ hero.subtitle }}
      </p>
      <h1
        class="fade-in font-display text-cream/90 font-light leading-none tracking-[0.2em] whitespace-pre-line"
        style="font-size: clamp(3rem, 8vw, 7rem); animation-delay: 0.65s; text-shadow: 0 2px 40px rgba(0,0,0,0.4)"
      >
        {{ hero.title }}
      </h1>
      <div class="fade-in w-10 h-px bg-gold mt-10" style="animation-delay: 1s" />

      <CallMenu variant="hero" />
    </div>

    <div class="relative">
      <BookingWidget />
    </div>
  </section>
</template>

<style scoped>
.hero-call-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 2rem;
  background: #C9A96E;
  color: #162016;
  padding: 0.9rem 2rem;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.35);
  transition: background 0.25s, transform 0.2s;
}
.hero-call-btn:hover {
  background: #b8914f;
  transform: translateY(-2px);
}
</style>
