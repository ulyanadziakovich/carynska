<script setup lang="ts">
const { kontakt, ustawienia } = await useSite()
// Dokumenty z CMS — w stopce te z zaznaczonym „Link w stopce”, z tytułem z formularza.
const docs = await Promise.all(
  (['regulamin', 'regulamin-wypozyczalni', 'wzor-umowy-jachtu'] as const).map(async (name) => {
    const { data } = await useCmsSingle(name)
    return { href: `/${name}`, data }
  }),
)

// „website” to pułapka na boty — ukryte pole, człowiek go nie wypełni (server/api/contact.post.ts).
const form = reactive({ name: '', email: '', phone: '', message: '', website: '' })
const sent = ref(false)
const sending = ref(false)
const failed = ref(false)

async function submitForm() {
  sending.value = true
  failed.value = false
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    sent.value = true
  } catch {
    // Wiadomość nie dotarła do skrzynki — treść zostaje w polach, gość może spróbować ponownie.
    failed.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <footer id="contact" class="bg-forest">

    <!-- Mapa — naturalne kolory, bez filtrów -->
    <div class="map-strip relative">
      <iframe
        :src="`https://maps.google.com/maps?q=${encodeURIComponent(kontakt?.mapQuery ?? '')}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
        class="w-full h-full border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        :title="kontakt?.address"
      />
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

      <!-- 1. Marka: logo, adres, główny e-mail, social -->
      <div class="lg:col-span-3 flex flex-col gap-5">
        <img
          v-if="ustawienia?.footerLogo"
          :src="cmsImg(ustawienia.footerLogo)"
          :alt="ustawienia.siteName"
          class="w-44"
          style="filter:brightness(0) invert(1) sepia(0.8) saturate(1.4) hue-rotate(5deg) opacity(0.9)"
        />
        <p class="font-display italic text-white/50 text-lg">{{ kontakt?.kicker }}</p>
        <div class="flex flex-col gap-3 text-sm font-sans">
          <p v-if="kontakt?.address" class="flex items-start gap-3 text-white/70">
            <span class="text-gold"><svg class="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s-7-7.75-7-13a7 7 0 0 1 14 0c0 5.25-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></svg></span>{{ kontakt.address }}
          </p>
          <a v-if="kontakt?.email" :href="`mailto:${kontakt.email}`" class="flex items-center gap-3 text-white/70 hover:text-gold transition-colors">
            <span class="text-gold"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>{{ kontakt.email }}
          </a>
        </div>
        <div v-if="kontakt?.social?.length" class="flex gap-2.5">
          <a
            v-for="s in kontakt?.social"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.label"
            class="w-10 h-10 rounded-full border border-gold/30 hover:border-gold hover:bg-gold hover:text-forest flex items-center justify-center text-gold transition-all"
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

      <!-- 2. Rezerwacje online i dane do przelewu -->
      <div class="lg:col-span-4 flex flex-col gap-10">
        <div>
          <h3 class="foot-heading">{{ kontakt?.reservationsTitle }}</h3>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="p in kontakt?.platforms"
              :key="p.label"
              :href="p.href"
              target="_blank"
              rel="noopener"
              class="px-3.5 py-2 border border-white/12 text-white/70 hover:border-gold hover:text-gold font-sans text-xs tracking-wide transition-colors"
            >{{ p.label }}</a>
          </div>
        </div>

        <div v-if="kontakt?.account">
          <h3 class="foot-heading">{{ kontakt.bankTitle }}</h3>
          <dl class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-sans text-sm">
            <dt class="text-white/40">{{ kontakt.bankLabel }}</dt><dd class="text-white/80">{{ kontakt.bankName }}</dd>
            <dt class="text-white/40">{{ kontakt.accountLabel }}</dt><dd class="text-gold tracking-wide break-all">{{ kontakt.account }}</dd>
            <dt class="text-white/40">{{ kontakt.swiftLabel }}</dt><dd class="text-white/80 tracking-widest">{{ kontakt.swift }}</dd>
          </dl>
        </div>

      </div>

      <!-- 3. Formularz -->
      <div class="md:col-span-2 lg:col-span-5">
        <h3 class="foot-heading">{{ kontakt?.formTitle }}</h3>
        <div v-if="sent" class="flex flex-col gap-3 py-6 px-6 border border-gold/25">
          <div class="w-8 h-px bg-gold" />
          <p class="font-display text-white text-2xl font-light">{{ kontakt?.formThanks }}</p>
          <p class="text-white/60 font-sans text-sm">{{ kontakt?.formThanksText }}</p>
        </div>
        <form v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3" @submit.prevent="submitForm">
          <input v-model="form.name" type="text" :placeholder="kontakt?.formName" :aria-label="kontakt?.formName" required class="foot-input sm:col-span-2" />
          <input v-model="form.email" type="email" :placeholder="kontakt?.formEmail" :aria-label="kontakt?.formEmail" required class="foot-input" />
          <input v-model="form.phone" type="tel" :placeholder="kontakt?.formPhone" :aria-label="kontakt?.formPhone" class="foot-input" />
          <textarea v-model="form.message" :placeholder="kontakt?.formMessage" :aria-label="kontakt?.formMessage" rows="3" required class="foot-input resize-none sm:col-span-2" />
          <!-- Pułapka na boty: niewidoczne dla ludzi i czytników ekranu, poza kolejnością tabulatora. -->
          <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] w-px h-px opacity-0" />
          <p v-if="failed" role="alert" class="sm:col-span-2 text-[#E8A598] font-sans text-sm leading-relaxed">{{ kontakt?.formError }}</p>
          <button type="submit" :disabled="sending" class="foot-btn sm:col-span-2">
            {{ sending ? kontakt?.formSending : kontakt?.formSubmit }}
          </button>
        </form>
      </div>
    </div>

    <!-- Nasze obiekty — jedna cienka linia -->
    <div v-if="kontakt?.sisters?.length" class="border-t border-white/8">
      <div class="max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
        <p class="text-gold text-[10px] tracking-[0.3em] uppercase font-sans shrink-0">{{ kontakt.sisterTitle }}</p>
        <div class="flex flex-wrap gap-x-8 gap-y-2">
          <a
            v-for="obj in kontakt.sisters"
            :key="obj.name"
            :href="obj.href"
            target="_blank"
            rel="noopener"
            class="group flex items-baseline gap-3 font-sans text-sm"
          >
            <span class="font-display text-white text-base group-hover:text-gold transition-colors">{{ obj.name }}</span>
            <span class="text-white/45">{{ obj.location }}</span>
            <span class="text-white/65">{{ obj.phone }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright i dokumenty -->
    <div class="border-t border-white/8">
      <div class="max-w-7xl mx-auto py-6 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-4 text-center">
        <p class="text-white/40 text-[11px] font-sans tracking-[0.2em] uppercase">{{ withYear(ustawienia?.copyright) }}</p>
        <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <NuxtLink
            v-for="doc in docs.filter((d) => d.data.value?.showInFooter)"
            :key="doc.href"
            :to="doc.href"
            class="text-white/55 hover:text-gold font-sans text-[11px] tracking-[0.15em] uppercase transition-colors"
          >{{ doc.data.value?.title }}</NuxtLink>
        </div>
        <p class="text-white/35 font-sans text-[11px] tracking-widest uppercase">{{ ustawienia?.regionLine }}</p>
      </div>
    </div>

  </footer>
</template>

<style scoped>
.map-strip { height: 200px; }
@media (min-width: 768px) { .map-strip { height: 260px; } }

.foot-heading {
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #C9A96E;
  padding-bottom: 14px;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(201, 169, 110, 0.2);
}

.foot-input {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.9);
  padding: 0.8rem 1rem;
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  width: 100%;
}
.foot-input::placeholder { color: rgba(255,255,255,0.4); }
.foot-input:focus { border-color: rgba(201,169,110,0.7); background: rgba(255,255,255,0.06); }

.foot-btn {
  background: #C9A96E;
  color: #162016;
  border: none;
  padding: 0.95rem 1.5rem;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
}
.foot-btn:hover:not(:disabled) { background: #DFB97E; }
.foot-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
