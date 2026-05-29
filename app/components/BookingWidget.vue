<script setup lang="ts">
const checkIn = ref('')
const checkOut = ref('')
const guests = ref('2')
</script>

<template>
  <div
    id="booking"
    class="w-full bg-forest/90 backdrop-blur-md border-t border-gold/40"
  >
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row">
      <div class="flex-1 flex flex-col px-7 py-5 border-b md:border-b-0 md:border-r border-white/10">
        <label class="text-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-sans">Check-in</label>
        <input
          type="date"
          v-model="checkIn"
          class="bg-transparent text-white/90 text-sm font-sans outline-none"
        />
      </div>

      <div class="flex-1 flex flex-col px-7 py-5 border-b md:border-b-0 md:border-r border-white/10">
        <label class="text-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-sans">Check-out</label>
        <input
          type="date"
          v-model="checkOut"
          class="bg-transparent text-white/90 text-sm font-sans outline-none"
        />
      </div>

      <div class="flex-1 flex flex-col px-7 py-5 border-b md:border-b-0 md:border-r border-white/10">
        <label class="text-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-sans">Guests</label>
        <select
          v-model="guests"
          class="bg-transparent text-white/90 text-sm font-sans outline-none cursor-pointer appearance-none"
        >
          <option v-for="n in 10" :key="n" :value="String(n)">
            {{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}
          </option>
        </select>
      </div>

      <div class="flex items-center justify-center px-7 py-5">
        <button
          class="bg-gold hover:bg-gold-light text-forest text-[11px] tracking-[0.2em] uppercase font-sans font-semibold px-7 py-3 transition-colors duration-300 whitespace-nowrap w-full md:w-auto"
        >
          Booking now
        </button>
      </div>
    </div>
  </div>
</template>
