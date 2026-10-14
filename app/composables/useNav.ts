export interface NavChild { label: string; href: string; external?: boolean; subtitle?: string }
export interface NavLink { label: string; href: string; children?: NavChild[] }

interface CmsNavLink extends NavLink { showDzialy?: boolean }

/** Menu strony z CMS („Menu strony” + przycisk rezerwacji z „Ustawień”). */
export async function useNav() {
  const { menu, ustawienia, dzialy } = await useSite()
  return computed(() => ({
    links: ((menu.value?.links ?? []) as CmsNavLink[]).map(({ showDzialy, ...l }) => {
      // „Kontakt” pokazuje działy z telefonami — numery wpisuje się tylko w „Działy i telefony”.
      const children = showDzialy
        ? dzialy.value.filter((d) => d.phone).map((d) => ({ label: d.name, subtitle: d.phone, href: telHref(d.phone)! }))
        : l.children
      return { ...l, children: children?.length ? children : undefined }
    }),
    cta: { label: ustawienia.value?.bookingCta ?? '', href: ustawienia.value?.bookingUrl ?? '' },
  }))
}
