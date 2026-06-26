<script setup lang="ts">
const checkIn = ref('')
const checkOut = ref('')
const guests = ref('2')

const checkInInput = ref<HTMLInputElement | null>(null)
const checkOutInput = ref<HTMLInputElement | null>(null)

function openPicker(input: HTMLInputElement | null) {
  if (!input) return
  try {
    (input as any).showPicker?.()
  } catch {
    input.focus()
    input.click()
  }
}

const HOTEL_URL = 'https://www.booking.com/hotel/pl/przystan-carynska.pl.html'

function buildBookingUrl() {
  const params = new URLSearchParams({
    group_adults: guests.value,
    group_children: '0',
    no_rooms: '1',
  })
  if (checkIn.value) {
    const d = new Date(checkIn.value)
    params.set('checkin_year', String(d.getFullYear()))
    params.set('checkin_month', String(d.getMonth() + 1))
    params.set('checkin_monthday', String(d.getDate()))
  }
  if (checkOut.value) {
    const d = new Date(checkOut.value)
    params.set('checkout_year', String(d.getFullYear()))
    params.set('checkout_month', String(d.getMonth() + 1))
    params.set('checkout_monthday', String(d.getDate()))
  }
  return `${HOTEL_URL}?${params.toString()}`
}

function book() {
  window.open(buildBookingUrl(), '_blank', 'noopener')
}

const MONTHS_PL = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru']
const DAYS_PL = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb']

function formatDate(dateStr: string) {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: MONTHS_PL[d.getMonth()],
    year: d.getFullYear(),
    weekday: DAYS_PL[d.getDay()],
  }
}

const checkInFormatted = computed(() => formatDate(checkIn.value))
const checkOutFormatted = computed(() => formatDate(checkOut.value))
</script>

<template>
  <div id="booking" class="booking-root">

    <!-- ─── Desktop (unchanged) ─── -->
    <div class="hidden md:flex max-w-4xl mx-auto">
      <div class="flex-1 flex flex-col px-7 py-5 border-r border-white/10">
        <label class="text-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-sans">Check-in</label>
        <input type="date" v-model="checkIn" class="bg-transparent text-white/90 text-sm font-sans outline-none" />
      </div>
      <div class="flex-1 flex flex-col px-7 py-5 border-r border-white/10">
        <label class="text-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-sans">Check-out</label>
        <input type="date" v-model="checkOut" class="bg-transparent text-white/90 text-sm font-sans outline-none" />
      </div>
      <div class="flex-1 flex flex-col px-7 py-5 border-r border-white/10">
        <label class="text-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-sans">Goście</label>
        <select v-model="guests" class="bg-transparent text-white/90 text-sm font-sans outline-none cursor-pointer appearance-none">
          <option v-for="n in 10" :key="n" :value="String(n)" class="bg-forest">{{ n }} {{ n === 1 ? 'Gość' : 'Gości' }}</option>
        </select>
      </div>
      <div class="flex items-center justify-center px-7 py-5">
        <button @click="book" class="bg-gold hover:bg-gold-light text-forest text-[11px] tracking-[0.2em] uppercase font-sans font-semibold px-7 py-3 transition-colors duration-300 whitespace-nowrap">
          Rezerwuj
        </button>
      </div>
    </div>

    <!-- ─── Mobile — Glass Card ─── -->
    <div class="md:hidden flex flex-col mobile-booking">

      <p class="mobile-eyebrow">Sprawdź dostępność</p>

      <div class="glass-card">

        <!-- Dates row -->
        <div class="dates-row">

          <!-- Check-in -->
          <div class="date-field" @click="openPicker(checkInInput)">
            <span class="field-label">Przyjazd</span>
            <input type="date" v-model="checkIn" ref="checkInInput" class="date-input-hidden" />
            <div class="date-display" :class="{ active: checkIn }">
              <template v-if="checkInFormatted">
                <span class="date-day">{{ checkInFormatted.day }}</span>
                <div class="date-meta">
                  <span class="date-month">{{ checkInFormatted.month }} {{ checkInFormatted.year }}</span>
                  <span class="date-weekday">{{ checkInFormatted.weekday }}</span>
                </div>
              </template>
              <template v-else>
                <span class="date-placeholder">Wybierz datę</span>
              </template>
            </div>
          </div>

          <!-- Arrow between dates -->
          <div class="dates-arrow">
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
              <line x1="0" y1="4" x2="14" y2="4" stroke="rgba(201,169,110,0.5)" stroke-width="1"/>
              <path d="M11 1l3 3-3 3" stroke="rgba(201,169,110,0.5)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>

          <!-- Check-out -->
          <div class="date-field" @click="openPicker(checkOutInput)">
            <span class="field-label">Wyjazd</span>
            <input type="date" v-model="checkOut" ref="checkOutInput" class="date-input-hidden" />
            <div class="date-display" :class="{ active: checkOut }">
              <template v-if="checkOutFormatted">
                <span class="date-day">{{ checkOutFormatted.day }}</span>
                <div class="date-meta">
                  <span class="date-month">{{ checkOutFormatted.month }} {{ checkOutFormatted.year }}</span>
                  <span class="date-weekday">{{ checkOutFormatted.weekday }}</span>
                </div>
              </template>
              <template v-else>
                <span class="date-placeholder">Wybierz datę</span>
              </template>
            </div>
          </div>

        </div>

        <!-- Divider -->
        <div class="card-divider" />

        <!-- Guests row -->
        <div class="guests-row">
          <span class="field-label">Goście</span>
          <div class="stepper">
            <button @click="guests = String(Math.max(1, Number(guests) - 1))" class="stepper-btn" aria-label="Mniej">
              <svg width="10" height="2" viewBox="0 0 10 2"><line x1="0" y1="1" x2="10" y2="1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <span class="stepper-num">{{ guests }}</span>
            <button @click="guests = String(Math.min(10, Number(guests) + 1))" class="stepper-btn" aria-label="Więcej">
              <svg width="10" height="10" viewBox="0 0 10 10"><line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>

      </div>

      <!-- CTA -->
      <button @click="book" class="mobile-cta">
        Rezerwuj teraz
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

    </div>

  </div>
</template>

<style scoped>
.booking-root {
  background: rgba(22, 32, 22, 0.35);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border-top: 1px solid rgba(201, 169, 110, 0.2);
}

/* ── Mobile wrapper ── */
.mobile-booking {
  padding: 28px 20px 24px;
  flex-direction: column;
  gap: 16px;
}

.mobile-eyebrow {
  text-align: center;
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.6);
  font-family: sans-serif;
  margin: 0;
}

/* ── Glass card ── */
.glass-card {
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(201, 169, 110, 0.18);
  border-radius: 3px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  box-shadow:
    0 1px 0 0 rgba(201, 169, 110, 0.08) inset,
    0 20px 40px rgba(0, 0, 0, 0.35);
}

/* ── Dates row ── */
.dates-row {
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.date-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 16px;
  cursor: pointer;
  position: relative;
}

.field-label {
  font-size: 8.5px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.7);
  font-family: sans-serif;
  display: block;
}

.date-input-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  color-scheme: dark;
}

.date-display {
  display: flex;
  align-items: baseline;
  gap: 7px;
  position: relative;
  z-index: 0;
}

.date-day {
  font-size: 28px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.01em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.date-display.active .date-day {
  color: rgba(255, 255, 255, 0.95);
}

.date-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.date-month {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  font-family: sans-serif;
  letter-spacing: 0.04em;
  line-height: 1;
}

.date-weekday {
  font-size: 9px;
  color: rgba(201, 169, 110, 0.55);
  font-family: sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.date-placeholder {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.2);
  font-family: sans-serif;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.dates-arrow {
  flex-shrink: 0;
  padding: 0 4px;
  margin-top: 12px;
}

/* ── Divider ── */
.card-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(201, 169, 110, 0.15) 20%,
    rgba(201, 169, 110, 0.15) 80%,
    transparent
  );
  margin: 0 16px;
}

/* ── Guests row ── */
.guests-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stepper-btn {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(201, 169, 110, 0.3);
  background: transparent;
  color: rgba(201, 169, 110, 0.8);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  touch-action: manipulation;
}

.stepper-btn:active {
  background: rgba(201, 169, 110, 0.12);
  border-color: rgba(201, 169, 110, 0.6);
  transform: scale(0.92);
}

.stepper-num {
  font-size: 22px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.9);
  min-width: 28px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

/* ── CTA ── */
.mobile-cta {
  width: 100%;
  background: #C9A96E;
  color: #0e160e;
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: 600;
  padding: 17px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.15s ease;
  touch-action: manipulation;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  animation: cta-pulse 2.8s ease-in-out infinite;
}

@keyframes cta-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 169, 110, 0.5); }
  50%       { box-shadow: 0 0 0 10px rgba(201, 169, 110, 0); }
}

.mobile-cta:hover {
  background: #DFB97E;
}

.mobile-cta:active {
  transform: scale(0.98);
}
</style>
