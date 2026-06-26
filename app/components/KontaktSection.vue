<script setup lang="ts">
defineProps<{
  data: {
    address: string
    email: string
    emailFirma?: string
    mapQuery: string
    logo: { src: string; alt: string }
    departments: { tag: string; name: string; desc: string; phone: string; email?: string }[]
    social: { label: string; href: string; icon: string }[]
    platforms: { label: string; href: string }[]
    bank?: { name: string; account: string; swift: string; note: string }
    siostrzaneObiekty?: { name: string; location: string; href: string; phone: string; email: string; desc: string }[]
  }
}>()

const form = reactive({ name: '', email: '', phone: '', message: '' })
const sent = ref(false)
const sending = ref(false)

async function submitForm() {
  sending.value = true
  await $fetch('/api/contact', { method: 'POST', body: form }).catch(() => {})
  sent.value = true
  sending.value = false
}
</script>

<template>
  <footer id="contact" class="bg-forest">

    <!-- Map — full width, generous height -->
    <div class="w-full map-strip" style="position:relative;">
      <iframe
        :src="`https://maps.google.com/maps?q=${data.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
        class="w-full h-full"
        style="border:0;filter:grayscale(90%) invert(10%) sepia(20%) saturate(400%) brightness(80%)"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
      <!-- Gold overlay bar at bottom -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gold/40" />
    </div>

    <!-- Identity strip: logo + tagline full width -->
    <div class="border-b border-white/8">
      <div class="max-w-7xl mx-auto px-5 lg:px-16 py-5 md:py-6 flex flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-6">
          <img
            :src="data.logo.src"
            :alt="data.logo.alt"
            class="w-32 md:w-44"
            style="filter:brightness(0) invert(1) sepia(0.8) saturate(1.4) hue-rotate(5deg) opacity(0.9)"
          />
          <div class="w-px h-10 bg-gold/20 hidden md:block" />
          <p class="font-display italic text-white/30 text-lg hidden md:block">Jezioro Solińskie · Bieszczady</p>
        </div>
        <div class="flex gap-2">
          <a
            v-for="s in data.social"
            :key="s.label"
            :href="s.href"
            target="_blank"
            :aria-label="s.label"
            class="w-8 h-8 border border-white/10 hover:border-gold flex items-center justify-center text-white/30 hover:text-gold transition-all"
          >
            <svg v-if="s.icon === 'facebook'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <svg v-if="s.icon === 'instagram'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Main info grid -->
    <div class="max-w-7xl mx-auto px-5 lg:px-16 py-0 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">

      <!-- Departments -->
      <div class="bg-forest p-5 md:p-6 flex flex-col gap-4 md:gap-5">
        <p class="text-gold text-[9px] tracking-[0.5em] uppercase font-sans">Kontakt</p>
        <!-- Mobile: compact horizontal grid; Desktop: vertical list -->
        <div class="grid grid-cols-2 gap-x-5 gap-y-4 md:flex md:flex-col md:gap-4">
          <div v-for="dept in data.departments" :key="dept.name">
            <p class="text-white/25 text-[9px] tracking-[0.3em] uppercase font-sans mb-0.5">{{ dept.tag }}</p>
            <p class="font-display text-white text-base md:text-lg font-light leading-snug">{{ dept.name }}</p>
            <a :href="`tel:${dept.phone.replace(/\s/g,'')}`" class="text-white/50 hover:text-gold font-sans text-sm tracking-wider transition-colors block mt-0.5">{{ dept.phone }}</a>
            <a v-if="dept.email" :href="`mailto:${dept.email}`" class="text-white/25 hover:text-gold/60 font-sans text-xs transition-colors block">{{ dept.email }}</a>
          </div>
        </div>
        <div class="pt-3 border-t border-white/8">
          <p class="text-white/25 font-sans text-xs leading-relaxed">{{ data.address }}</p>
          <a :href="`mailto:${data.email}`" class="text-gold/50 hover:text-gold font-sans text-xs transition-colors block mt-1">{{ data.email }}</a>
        </div>
      </div>

      <!-- Rezerwacje + dane bankowe -->
      <div class="bg-forest p-5 md:p-6 flex flex-col gap-4 md:gap-5">
        <p class="text-gold text-[9px] tracking-[0.5em] uppercase font-sans">Rezerwacje</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-3">
          <a
            v-for="p in data.platforms"
            :key="p.label"
            :href="p.href"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
          >
            <span class="w-5 h-px bg-gold/30 group-hover:w-8 group-hover:bg-gold transition-all duration-300 shrink-0" />
            <span class="font-sans text-sm tracking-[0.1em]">{{ p.label }}</span>
          </a>
        </div>
        <div v-if="data.bank" class="pt-3 border-t border-white/8 flex flex-col gap-2.5">
          <p class="text-gold text-[9px] tracking-[0.5em] uppercase font-sans">Dane do przelewu</p>
          <div class="grid grid-cols-1 gap-2">
            <div>
              <p class="text-white/20 text-[9px] tracking-widest uppercase font-sans">Bank</p>
              <p class="text-white/55 font-sans text-xs mt-0.5">{{ data.bank.name }}</p>
            </div>
            <div>
              <p class="text-white/20 text-[9px] tracking-widest uppercase font-sans">Nr rachunku</p>
              <p class="text-gold/60 font-sans text-xs tracking-wider mt-0.5 leading-relaxed break-all">{{ data.bank.account }}</p>
            </div>
            <div>
              <p class="text-white/20 text-[9px] tracking-widest uppercase font-sans">SWIFT / BIC</p>
              <p class="text-white/40 font-sans text-xs tracking-widest mt-0.5">{{ data.bank.swift }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Formularz -->
      <div class="bg-forest p-5 md:p-6 flex flex-col gap-3">
        <p class="text-gold text-[9px] tracking-[0.5em] uppercase font-sans">Napisz do nas</p>
        <div v-if="sent" class="flex flex-col gap-3 py-4">
          <div class="w-8 h-px bg-gold" />
          <p class="font-display text-white text-xl font-light">Dziękujemy!</p>
          <p class="text-white/40 font-sans text-sm">Odezwiemy się wkrótce.</p>
        </div>
        <form v-else class="flex flex-col gap-2 flex-1" @submit.prevent="submitForm">
          <input v-model="form.name" type="text" placeholder="Imię i nazwisko" required class="foot-input" />
          <input v-model="form.email" type="email" placeholder="Email" required class="foot-input" />
          <input v-model="form.phone" type="tel" placeholder="Telefon" class="foot-input" />
          <textarea v-model="form.message" placeholder="Wiadomość" rows="3" required class="foot-input resize-none" />
          <button type="submit" :disabled="sending" class="foot-btn mt-1">
            {{ sending ? 'Wysyłanie…' : 'Wyślij wiadomość' }}
          </button>
        </form>
      </div>

    </div>

    <!-- Siostrzane obiekty -->
    <div v-if="data.siostrzaneObiekty && data.siostrzaneObiekty.length" class="border-t border-white/8 px-5 lg:px-16 py-5">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-12 items-start">
        <p class="text-gold/40 text-[9px] tracking-[0.5em] uppercase font-sans shrink-0 mt-0.5">Nasze obiekty</p>
        <div class="flex flex-wrap gap-x-10 gap-y-4">
          <a
            v-for="obj in data.siostrzaneObiekty"
            :key="obj.name"
            :href="obj.href"
            target="_blank"
            rel="noopener"
            class="group flex flex-col gap-0.5"
          >
            <p class="text-white/20 text-[9px] tracking-[0.3em] uppercase font-sans">{{ obj.location }}</p>
            <h4 class="font-display text-white/60 text-base font-light group-hover:text-gold transition-colors">{{ obj.name }}</h4>
            <p class="text-white/25 font-sans text-xs">{{ obj.phone }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-white/8 py-4 px-5 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p class="text-white/20 text-[10px] font-sans tracking-[0.3em] uppercase">© 2026 Przystań Caryńska</p>
      <p class="text-white/10 font-sans text-[10px] tracking-widest uppercase">Polańczyk · Jezioro Solińskie · Bieszczady</p>
    </div>

  </footer>
</template>

<style scoped>
.map-strip { height: 140px; }
@media (min-width: 768px) { .map-strip { height: 240px; } }

.foot-input {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  color: rgba(255,255,255,0.75);
  padding: 0.6rem 0.8rem;
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  letter-spacing: 0.03em;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}
.foot-input::placeholder { color: rgba(255,255,255,0.18); }
.foot-input:focus { border-color: rgba(201,169,110,0.45); }

.foot-btn {
  background: #C9A96E;
  color: #162016;
  border: none;
  padding: 0.7rem 1.5rem;
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}
.foot-btn:hover:not(:disabled) { background: #b8914f; }
.foot-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
