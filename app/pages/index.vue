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
  features: (p.value?.noclegiFeatures ?? []).filter((f: any) => f.label),
  cards: (p.value?.noclegiCards ?? []).map((c: any) => ({ ...c, image: cmsImg(c.image), alt: c.image?.alt ?? '' })),
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
  features: (p.value?.kuchniaFeatures ?? []).filter((f: any) => f.label),
  cta: { label: p.value?.kuchniaCta, href: p.value?.kuchniaCtaHref },
  images: (p.value?.kuchniaImages ?? [])
    .map((img: any) => ({ src: cmsImg(img), alt: img?.alt ?? '' }))
    .filter((img: { src?: string }) => img.src),
}))
const reviews = computed(() => ({
  tag: p.value?.reviewsTag, title: p.value?.reviewsTitle, allLabel: p.value?.reviewsAll,
  googleUrl: p.value?.googleUrl, items: p.value?.reviews ?? [],
  rating: p.value?.reviewsRating, ratingNote: p.value?.reviewsRatingNote,
  moreLabel: p.value?.reviewsMore, lessLabel: p.value?.reviewsLess,
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
