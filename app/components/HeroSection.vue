<template>
  <section class="relative h-screen flex flex-col overflow-hidden">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
      style="background-image: url('/images/solina1.avif')"
    />

    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-forest/95" />

    <!-- Mountain silhouette decoration -->
    <div class="absolute bottom-20 inset-x-0 pointer-events-none opacity-20">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" class="w-full h-20">
        <polyline
          points="0,100 120,55 200,75 340,25 460,60 580,15 680,50 800,8 920,45 1060,20 1180,58 1300,30 1440,50 1440,100"
          fill="none"
          stroke="#C9A96E"
          stroke-width="1.5"
        />
      </svg>
    </div>

    <!-- Hero content -->
    <div class="relative flex-1 flex flex-col items-center justify-center text-center px-6">
      <p
        class="fade-in text-gold text-[11px] tracking-[0.45em] uppercase mb-6 font-sans font-light"
        style="animation-delay: 0.3s"
      >
        Luksus w sercu Bieszczad
      </p>

      <h1
        class="fade-in font-display text-white font-light leading-none tracking-[0.2em]"
        style="font-size: clamp(3rem, 8vw, 7rem); animation-delay: 0.65s"
      >
        PRZYSTAŃ<br />CARYŃSKA
      </h1>

      <div
        class="fade-in w-10 h-px bg-gold mt-10"
        style="animation-delay: 1s"
      />
    </div>

    <!-- Booking widget pinned at bottom -->
    <div class="relative">
      <BookingWidget />
    </div>
  </section>
</template>
