/** Wspólne dane wszystkich podstron: logo, kontakt, menu, działy z telefonami. */
export async function useSite() {
  const [{ data: ustawienia }, { data: kontakt }, { data: menu }, { data: dzialyList }] = await Promise.all([
    useCmsSingle('ustawienia'),
    useCmsSingle('kontakt'),
    useCmsSingle('menu-strony'),
    useCmsCollection<CmsDzial & { showInCallMenu?: boolean; callTag?: string; icon?: string; order?: number }>('dzialy', { order: 'order:asc' }),
  ])
  const dzialy = computed(() => dzialyList.value?.records ?? [])
  /** Działy pokazywane w pasku górnym i w przycisku „Zadzwoń”. */
  const callDzialy = computed(() => dzialy.value.filter((d) => d.showInCallMenu && d.phone))
  return { ustawienia, kontakt, menu, dzialy, callDzialy }
}
