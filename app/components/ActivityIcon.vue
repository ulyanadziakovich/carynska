<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <!-- Sailboat -->
  <svg v-if="name === 'zaglowka'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <path d="M20 6 L20 30" />
    <path d="M20 6 L8 28 L20 28 Z" />
    <path d="M20 12 L30 28 L20 28" />
    <path d="M6 33 Q20 30 34 33" />
    <path d="M10 36 Q20 33 30 36" />
  </svg>

  <!-- Kayak paddle -->
  <svg v-else-if="name === 'kajak'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <path d="M8 20 L32 20" />
    <ellipse cx="6" cy="20" rx="4" ry="7" transform="rotate(-15 6 20)" />
    <ellipse cx="34" cy="20" rx="4" ry="7" transform="rotate(15 34 20)" />
    <path d="M14 26 Q20 28 26 26 Q20 38 14 26Z" />
  </svg>

  <!-- Electric / propeller -->
  <svg v-else-if="name === 'elektryczna'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <path d="M23 6 L15 21 L21 21 L17 34 L25 19 L19 19 Z" />
  </svg>

  <!-- Anchor -->
  <svg v-else-if="name === 'jacht'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <circle cx="20" cy="10" r="3.5" />
    <path d="M20 13.5 L20 34" />
    <path d="M13 18 L20 13.5 L27 18" />
    <path d="M10 34 Q14 28 20 34 Q26 28 30 34" />
  </svg>

  <!-- Hiking -->
  <svg v-else-if="name === 'trekking'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <path d="M8 34 L16 16 L22 24 L28 12 L34 34" />
    <path d="M6 34 L34 34" />
  </svg>

  <!-- Beach / sun -->
  <svg v-else-if="name === 'plaza'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <circle cx="20" cy="16" r="5" />
    <path d="M20 6 L20 8" /><path d="M20 24 L20 26" />
    <path d="M10 16 L12 16" /><path d="M28 16 L30 16" />
    <path d="M13 9 L14.5 10.5" /><path d="M25.5 21.5 L27 23" />
    <path d="M27 9 L25.5 10.5" /><path d="M14.5 21.5 L13 23" />
    <path d="M6 34 Q20 28 34 34" />
  </svg>

  <!-- Concert / music -->
  <svg v-else-if="name === 'koncert'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <path d="M14 28 L14 14 L30 10 L30 24" />
    <circle cx="11" cy="29" r="3" />
    <circle cx="27" cy="25" r="3" />
  </svg>

  <!-- Groups / people -->
  <svg v-else-if="name === 'grupy'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <circle cx="14" cy="13" r="4" />
    <circle cx="26" cy="13" r="4" />
    <path d="M6 34 Q6 24 14 24 Q20 24 20 24 Q20 24 26 24 Q34 24 34 34" />
  </svg>

  <!-- Toast / kieliszki -->
  <svg v-else-if="name === 'impreza'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <path d="M9 8 L17 10 L15 18 Q14 22 10 21 Q6 20 7 16 Z" />
    <path d="M12.5 21 L10.5 30" /><path d="M7 29.5 L14 31" />
    <path d="M31 8 L23 10 L25 18 Q26 22 30 21 Q34 20 33 16 Z" />
    <path d="M27.5 21 L29.5 30" /><path d="M26 31 L33 29.5" />
    <path d="M20 4 L20 6.5" /><path d="M16.5 5 L17.5 7" /><path d="M23.5 5 L22.5 7" />
  </svg>

  <!-- Dam / zapora -->
  <svg v-else-if="name === 'zapora'" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
    <path d="M4 14 L36 14" />
    <path d="M8 14 L12 32 L28 32 L32 14" />
    <path d="M14 14 L15.5 32" /><path d="M20 14 L20 32" /><path d="M26 14 L24.5 32" />
    <path d="M10 10 L14 10 L14 14" /><path d="M26 14 L26 10 L30 10" />
    <path d="M4 35 Q8 33 12 35 T20 35 T28 35 T36 35" />
  </svg>
</template>
