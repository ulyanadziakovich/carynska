<script setup lang="ts">
/** Logo z CMS w kolorze kremowym (na ciemnym tle menu). Klasy rozmiaru podaje rodzic. */
const { ustawienia } = await useSite()
</script>

<template>
  <img
    v-if="cmsImg(ustawienia?.logo)"
    :src="cmsImg(ustawienia?.logo)"
    :alt="ustawienia?.siteName"
    style="filter: brightness(0) invert(1) sepia(0.18) brightness(0.96);"
  />
</template>
