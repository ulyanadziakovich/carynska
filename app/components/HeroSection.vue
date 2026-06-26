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

      <div class="flex flex-wrap items-stretch justify-center gap-4 mt-8">
        <CallMenu variant="hero" />
        <a
          href="https://carynska.app-tapporder.ngastro.lsisoftware.net/zpc-skorka-spolka-jawna/products?group=af95-0528-1b1b-4b7a"
          target="_blank"
          rel="noopener"
          class="hero-pizza-btn"
        >
          🍕 Zamów pizzę
        </a>
      </div>
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

.hero-pizza-btn {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  gap: 0.5rem;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.5);
  color: #fff;
  padding: 0.9rem 2rem;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  transition: background 0.25s, border-color 0.25s, transform 0.2s;
}
.hero-pizza-btn:hover {
  background: rgba(255,255,255,0.22);
  border-color: rgba(255,255,255,0.8);
  transform: translateY(-2px);
}
</style>
