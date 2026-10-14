<script setup lang="ts">
const { data: p } = await useCmsSingle('strona-glowna')
const nav = await useNav()

// Pola formularza „Strona główna” w kształcie, jakiego oczekują sekcje.
const hero = computed(() => ({
  title: p.value?.heroTitle ?? '',
  subtitle: p.value?.heroSubtitle ?? '',
  images: (p.value?.heroImages ?? []).map(cmsImg).filter(Boolean) as string[],
}))
const noclegi = computed(() => ({
  tag: p.value?.noclegiTag, title: p.value?.noclegiTitle, body: paragraphs(p.value?.noclegiBody),
  cta: { label: p.value?.noclegiCta, href: p.value?.noclegiCtaHref },
  image: { src: cmsImg(p.value?.noclegiImage), alt: p.value?.noclegiImageAlt },
}))
const atrakcje = computed(() => ({
  tag: p.value?.atrakcjeTag, title: p.value?.atrakcjeTitle, body: p.value?.atrakcjeBody,
  image: { src: cmsImg(p.value?.atrakcjeImage), alt: p.value?.atrakcjeImageAlt },
  cta: { label: p.value?.atrakcjeCta, href: p.value?.atrakcjeCtaHref },
  hint: p.value?.tileHint,
  tiles: (p.value?.tiles ?? []).map((t: any) => ({
    ...t, image: cmsImg(t.image), modalBody: paragraphs(t.modalBody), highlights: lines(t.highlights),
  })),
}))
const kuchnia = computed(() => ({
  tag: p.value?.kuchniaTag, title: p.value?.kuchniaTitle, body: paragraphs(p.value?.kuchniaBody),
  cta: { label: p.value?.kuchniaCta, href: p.value?.kuchniaCtaHref },
  image: { src: cmsImg(p.value?.kuchniaImage), alt: p.value?.kuchniaImageAlt },
}))
const reviews = computed(() => ({
  tag: p.value?.reviewsTag, title: p.value?.reviewsTitle, allLabel: p.value?.reviewsAll,
  googleUrl: p.value?.googleUrl, items: p.value?.reviews ?? [],
}))
const facebook = computed(() => ({
  tag: p.value?.fbTag, title: p.value?.fbTitle, body: p.value?.fbBody,
  tabFacebook: p.value?.fbTabFacebook, tabInstagram: p.value?.fbTabInstagram, tabReviews: p.value?.fbTabReviews,
  follow: p.value?.fbFollow, fbUrl: p.value?.fbUrl, igUrl: p.value?.igUrl,
}))
</script>

<template>
  <main v-if="p" class="bg-forest min-h-screen">
    <TheNavbar :nav="nav" />
    <HeroSection :hero="hero" />
    <NoclegiSection :data="noclegi" />
    <AtrakcjeSection :data="atrakcje" />
    <KuchniaSection :data="kuchnia" />
    <ReviewsSection :reviews="reviews" />
    <FacebookSection :data="facebook" />
    <KontaktSection />
  </main>
</template>
