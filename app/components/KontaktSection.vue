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
  await $fetch('/api/contact', {
    method: 'POST',
    body: form,
  }).catch(() => {})
  sent.value = true
  sending.value = false
}
</script>

<template>
  <section id="contact" class="bg-forest border-t border-gold/20">

    <div class="w-full h-72">
      <iframe
        :src="`https://maps.google.com/maps?q=${data.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
        class="w-full h-full"
        style="border:0; filter: grayscale(80%) invert(8%) sepia(15%) saturate(300%) brightness(85%)"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>

    <div class="max-w-7xl mx-auto px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start">

      <div v-reveal class="flex flex-col gap-5 lg:min-w-56">
        <img
          :src="data.logo.src"
          :alt="data.logo.alt"
          class="w-48"
          style="filter: brightness(0) invert(1) sepia(0.8) saturate(1.4) hue-rotate(5deg) opacity(0.9)"
        />
        <div class="flex flex-col gap-2 text-sm font-sans">
          <span class="text-white/50">{{ data.address }}</span>
          <a :href="`mailto:${data.email}`" class="text-gold/70 hover:text-gold transition-colors">{{ data.email }}</a>
        </div>
        <div class="flex gap-3 pt-1">
          <a
            v-for="s in data.social"
            :key="s.label"
            :href="s.href"
            target="_blank"
            :aria-label="s.label"
            class="w-8 h-8 border border-white/15 hover:border-gold flex items-center justify-center text-white/40 hover:text-gold transition-all duration-200"
          >
            <!-- Facebook -->
            <svg v-if="s.icon === 'facebook'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <!-- Instagram -->
            <svg v-if="s.icon === 'instagram'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gold/10">
        <div
          v-for="(dept, i) in data.departments"
          :key="dept.name"
          v-reveal="{ delay: i * 120 }"
          class="bg-forest group hover:bg-forest-mid transition-colors duration-300 p-8 flex flex-col gap-4"
        >
          <p class="text-gold text-[10px] tracking-[0.4em] uppercase font-sans">{{ dept.tag }}</p>
          <h3 class="font-display text-white text-xl font-light">{{ dept.name }}</h3>
          <p class="text-white/45 font-sans font-light text-sm leading-relaxed flex-1">{{ dept.desc }}</p>
          <a :href="`tel:${dept.phone.replace(/\s/g, '')}`" class="flex items-center gap-3 group/phone mt-1">
            <div class="w-6 h-px bg-gold/40 group-hover/phone:w-10 transition-all duration-300" />
            <span class="text-white/80 font-sans text-sm tracking-wider group-hover/phone:text-gold transition-colors duration-200">{{ dept.phone }}</span>
          </a>
          <a v-if="dept.email" :href="`mailto:${dept.email}`" class="text-white/30 hover:text-gold/70 font-sans text-xs transition-colors duration-200 mt-0.5">
            {{ dept.email }}
          </a>
        </div>
      </div>

    </div>

    <!-- Booking platforms -->
    <div class="border-t border-white/10 px-8 lg:px-16 py-12">
      <p class="text-white/30 text-[10px] tracking-[0.45em] uppercase font-sans mb-7">Rezerwuj online</p>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="p in data.platforms"
          :key="p.label"
          :href="p.href"
          target="_blank"
          rel="noopener"
          class="border border-white/15 hover:border-gold/50 text-white/50 hover:text-gold px-5 py-2.5 text-[11px] font-sans tracking-[0.15em] uppercase transition-all duration-200"
        >{{ p.label }}</a>
      </div>
    </div>

    <!-- Bank details + Contact form -->
    <div class="border-t border-white/10 px-8 lg:px-16 py-14 grid grid-cols-1 lg:grid-cols-2 gap-14">

      <!-- Bank -->
      <div v-if="data.bank">
        <p class="text-white/30 text-[10px] tracking-[0.45em] uppercase font-sans mb-7">Dane do przelewu</p>
        <div class="flex flex-col gap-4">
          <div>
            <span class="text-white/30 font-sans text-[10px] tracking-widest uppercase block mb-1">Bank</span>
            <span class="text-white/80 font-sans text-sm">{{ data.bank.name }}</span>
          </div>
          <div>
            <span class="text-white/30 font-sans text-[10px] tracking-widest uppercase block mb-1">Nr rachunku</span>
            <span class="text-gold font-sans text-base tracking-wider">{{ data.bank.account }}</span>
          </div>
          <div>
            <span class="text-white/30 font-sans text-[10px] tracking-widest uppercase block mb-1">SWIFT / BIC</span>
            <span class="text-white/80 font-sans text-sm tracking-widest">{{ data.bank.swift }}</span>
          </div>
          <p class="text-white/35 font-sans text-xs leading-relaxed border-l border-gold/30 pl-4 mt-2 italic">{{ data.bank.note }}</p>
        </div>
      </div>

      <!-- Contact form -->
      <div>
        <p class="text-white/30 text-[10px] tracking-[0.45em] uppercase font-sans mb-7">Szybki kontakt</p>

        <div v-if="sent" class="flex flex-col gap-3 py-8">
          <div class="w-8 h-px bg-gold" />
          <p class="font-display text-white text-xl font-light">Dziękujemy za wiadomość</p>
          <p class="text-white/45 font-sans text-sm">Odezwiemy się najszybciej jak to możliwe.</p>
        </div>

        <form v-else class="flex flex-col gap-4" @submit.prevent="submitForm">
          <input
            v-model="form.name"
            type="text"
            placeholder="Imię i nazwisko"
            required
            class="contact-input"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            class="contact-input"
          />
          <input
            v-model="form.phone"
            type="tel"
            placeholder="Numer telefonu"
            class="contact-input"
          />
          <textarea
            v-model="form.message"
            placeholder="Wiadomość"
            rows="4"
            required
            class="contact-input resize-none"
          />
          <button
            type="submit"
            :disabled="sending"
            class="contact-btn"
          >
            {{ sending ? 'Wysyłanie…' : 'Wyślij wiadomość' }}
          </button>
        </form>
      </div>

    </div>

    <!-- Siostrzane obiekty -->
    <div v-if="data.siostrzaneObiekty?.length" class="border-t border-white/10 px-8 lg:px-16 py-12">
      <p class="text-white/30 text-[10px] tracking-[0.45em] uppercase font-sans mb-7">Nasze obiekty</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gold/8">
        <a
          v-for="obj in data.siostrzaneObiekty"
          :key="obj.name"
          :href="obj.href"
          target="_blank"
          rel="noopener"
          class="bg-forest p-7 flex flex-col gap-2 hover:bg-forest-mid transition-colors duration-200 group"
        >
          <p class="text-gold/50 text-[9px] tracking-[0.4em] uppercase font-sans">{{ obj.location }}</p>
          <h4 class="font-display text-white text-lg font-light group-hover:text-gold transition-colors duration-200">{{ obj.name }}</h4>
          <p class="text-white/35 font-sans text-xs leading-relaxed">{{ obj.desc }}</p>
          <div class="mt-2 flex flex-col gap-1">
            <span class="text-white/40 font-sans text-xs">{{ obj.phone }}</span>
            <span class="text-white/30 font-sans text-xs">{{ obj.email }}</span>
          </div>
          <span class="text-gold/40 font-sans text-[10px] tracking-widest uppercase mt-1 group-hover:text-gold transition-colors">{{ obj.href.replace('https://', '') }} →</span>
        </a>
      </div>
    </div>

    <div class="border-t border-white/10 py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-white/20 text-xs font-sans tracking-widest">© 2026 PRZYSTAŃ CARYŃSKA</p>
    </div>

  </section>
</template>

<style scoped>
.contact-input {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.8);
  padding: 0.75rem 1rem;
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  letter-spacing: 0.03em;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}
.contact-input::placeholder { color: rgba(255,255,255,0.2); }
.contact-input:focus { border-color: rgba(201,169,110,0.5); }

.contact-btn {
  background: #C9A96E;
  color: #162016;
  border: none;
  padding: 0.85rem 1.5rem;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}
.contact-btn:hover:not(:disabled) { background: #b8914f; }
.contact-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
