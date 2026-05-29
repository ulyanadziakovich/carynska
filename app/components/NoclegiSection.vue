<template>
  <section class="bg-forest">
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-[80vh]">

      <!-- Text side -->
      <div class="flex flex-col justify-center px-12 lg:px-16 py-20 lg:py-24 relative">
        <!-- Gold vertical accent line -->
        <div class="absolute left-0 top-1/4 w-px h-1/2 bg-gold/30 hidden lg:block" />

        <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans mb-6">
          Noclegi
        </p>

        <h2 class="font-display text-white font-light leading-tight mb-8"
            style="font-size: clamp(2.5rem, 4vw, 3.5rem)">
          Wypoczynek<br />w sercu natury
        </h2>

        <div class="w-8 h-px bg-gold mb-8" />

        <p class="text-white/60 font-sans font-light leading-relaxed text-sm mb-4">
          Oferujemy 57 miejsc noclegowych w komfortowych pokojach i apartamentach
          z widokiem na jezioro Solina. Każde wnętrze zostało zaprojektowane
          z dbałością o detal — naturalne drewno, stonowane kolory, cisza Bieszczad.
        </p>

        <p class="text-white/60 font-sans font-light leading-relaxed text-sm mb-10">
          Do dyspozycji gości: balkon lub taras, łazienka z prysznicem,
          bezpłatne WiFi oraz prywatny parking przy obiekcie.
        </p>

        <a
          href="#"
          class="inline-flex items-center gap-3 text-gold text-[11px] tracking-[0.2em] uppercase font-sans group w-fit"
        >
          <span>Sprawdź dostępność</span>
          <span class="w-8 h-px bg-gold transition-all duration-300 group-hover:w-14" />
        </a>
      </div>

      <!-- Image side -->
      <div class="relative overflow-hidden min-h-[50vh] lg:min-h-0">
        <img
          src="/images/hotel.png"
          alt="Hotel Przystań Caryńska"
          class="w-full h-full object-cover"
        />
        <!-- Subtle dark overlay on edges -->
        <div class="absolute inset-0 bg-gradient-to-r from-forest/40 via-transparent to-transparent" />

        <!-- Mountain decoration -->
        <div class="absolute bottom-0 inset-x-0 pointer-events-none opacity-15">
          <svg viewBox="0 0 800 60" preserveAspectRatio="none" class="w-full h-12">
            <polyline
              points="0,60 80,30 160,45 260,10 360,35 460,5 560,28 660,15 760,40 800,20 800,60"
              fill="none"
              stroke="#C9A96E"
              stroke-width="1"
            />
          </svg>
        </div>
      </div>

    </div>
  </section>
</template>
