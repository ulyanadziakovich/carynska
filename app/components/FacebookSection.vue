<template>
  <section class="bg-forest border-t border-gold/15 overflow-hidden">
    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-[1fr_650px] gap-10 lg:gap-16 items-center">

      <!-- Left: text -->
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-gold/60 text-[10px] tracking-[0.45em] uppercase font-sans mb-5">Aktualności</p>
          <h2
            class="font-display text-white font-light leading-tight"
            style="font-size: clamp(2rem, 3.5vw, 3rem)"
          >
            Bądź na<br>bieżąco
          </h2>
          <div class="w-8 h-px bg-gold mt-7" />
        </div>

        <p class="text-white/45 font-sans font-light text-sm leading-relaxed max-w-sm">
          Najnowsze posty, wydarzenia i zdjęcia z Przystani Caryńskiej. Śledź nas na Facebooku i nie przegap żadnej atrakcji sezonu.
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-px bg-gold/10 max-w-xs">
          <div class="bg-forest px-5 py-4">
            <p class="font-display text-gold text-2xl font-light">FB</p>
            <p class="text-white/30 font-sans text-[9px] tracking-widest uppercase mt-1">Facebook</p>
          </div>
          <div class="bg-forest px-5 py-4">
            <p class="font-display text-white text-2xl font-light">IG</p>
            <p class="text-white/30 font-sans text-[9px] tracking-widest uppercase mt-1">Instagram</p>
          </div>
          <div class="bg-forest px-5 py-4">
            <p class="font-display text-gold text-2xl font-light">★</p>
            <p class="text-white/30 font-sans text-[9px] tracking-widest uppercase mt-1">Opinie</p>
          </div>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col gap-3 max-w-xs">
          <a
            href="https://www.facebook.com/przystancarynska/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-3 bg-[#1877F2] hover:bg-[#1565D8] text-white px-6 py-3 transition-colors duration-200"
          >
            <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="font-sans text-[11px] tracking-[0.18em] uppercase font-semibold">Obserwuj na Facebooku</span>
          </a>
          <a
            href="https://www.instagram.com/carynskaprzystan/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/50 hover:text-white px-6 py-3 transition-all duration-200"
          >
            <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span class="font-sans text-[11px] tracking-[0.18em] uppercase">Instagram</span>
          </a>
        </div>
      </div>

      <!-- mobile iframe (360px) -->
      <div class="fb-wrap w-full lg:hidden">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprzystancarynska&tabs=timeline&width=360&height=420&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=false"
          class="fb-iframe fb-iframe--mobile"
          scrolling="no"
          frameborder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
      <!-- desktop iframe (500px scaled to 650px) -->
      <div class="fb-wrap fb-wrap--desktop w-full hidden lg:block">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprzystancarynska&tabs=timeline&width=500&height=500&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=false"
          class="fb-iframe fb-iframe--desktop"
          scrolling="no"
          frameborder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.fb-wrap {
  border: 1px solid rgba(201,169,110,0.15);
  overflow: hidden;
}

.fb-iframe--mobile {
  width: 360px;
  height: 420px;
  border: none;
  display: block;
}

.fb-iframe--desktop {
  width: 500px;
  height: 500px;
  border: none;
  display: block;
  transform: scale(1.3);
  transform-origin: top left;
}

/* 500px * 1.3 = 650px — wrapper crops the scaled overflow cleanly */
.fb-wrap--desktop {
  height: 650px;
}
</style>
