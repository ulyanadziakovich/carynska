/**
 * Tytuł, opis i obrazek podstrony dla Google i przy udostępnianiu — z zakładki
 * „Google i udostępnianie” jej formularza. Puste pola biorą to, co już jest na
 * stronie: tytuł i zdjęcie z nagłówka, opis ogólny z Ustawień.
 * Nazwę obiektu na końcu tytułu dopisuje titleTemplate w app.vue.
 *
 * Celowo bez `await`: po await w zwykłej funkcji Nuxt gubi kontekst i useSeoMeta
 * rzuca błąd. Ustawienia pobrał już app.vue (useSite) — czytamy je z pamięci
 * podręcznej po tym samym kluczu, a gdyby jeszcze ich nie było, ref się uzupełni.
 */
export function useCmsSeo(page: Ref<Record<string, any> | null | undefined>) {
  const { data: ustawienia } = useNuxtData<Record<string, any>>('cms-ustawienia')
  const img = useCmsImg()
  const oneLine = (s?: string | null) => s?.replace(/\s*\n\s*/g, ' ').trim() || undefined

  const title = computed(() => {
    const p = page.value
    return oneLine(p?.seoTitle) ?? oneLine(p?.title) ?? oneLine(p?.heroTitle) ?? oneLine(p?.heroTag)
  })
  const description = computed(() => oneLine(page.value?.seoDescription) ?? oneLine(ustawienia.value?.defaultSeoDescription))
  const image = computed(() => img(page.value?.seoImage) ?? img(page.value?.heroImage) ?? img(ustawienia.value?.defaultSeoImage))

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogSiteName: () => ustawienia.value?.siteName,
    ogType: 'website',
    twitterCard: 'summary_large_image',
  })
}
