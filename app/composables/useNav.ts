const BOOKING_URL = 'https://www.booking.com/hotel/pl/przystan-carynska.pl.html'

export interface NavChild { label: string; href: string; external?: boolean; subtitle?: string }
export interface NavLink { label: string; href: string; children?: NavChild[] }

export function useNav() {
  return {
    links: [
      {
        label: 'Noclegi',
        href: '/noclegi',
        children: [
          { label: 'Pokoje & Apartamenty', href: '/noclegi/pokoje' },
          { label: 'Hotel na wodzie', href: '/noclegi/jacht' },
          { label: 'Cennik', href: '/noclegi/cennik' },
          { label: 'Grupy & Eventy', href: '/grupy' },
        ],
      },
      {
        label: 'Atrakcje',
        href: '/atrakcje',
        children: [
          { label: 'Sprzęt wodny & Jezioro', href: '/atrakcje' },
          { label: 'Cennik wypożyczalni', href: '/atrakcje#cennik' },
          { label: 'Bosmanat', href: '/atrakcje#bosmanat' },
          { label: 'Zaplanuj pobyt', href: 'https://bieszczady.plus/odkrywaj', external: true },
        ],
      },
      {
        label: 'Tawerna',
        href: '/tawerna',
      },
      {
        label: 'Galeria',
        href: '/galeria',
      },
      {
        label: 'Grupy',
        href: '/grupy',
        children: [
          { label: 'Oferta dla grup', href: '/grupy' },
          { label: 'Cennik grup 2026', href: '/grupy#cennik' },
          { label: 'Pojemność obiektu', href: '/grupy#capacity' },
        ],
      },
      {
        label: 'Kontakt',
        href: '/#contact',
        children: [
          { label: 'Noclegi',           subtitle: '+48 691 944 266', href: 'tel:+48691944266' },
          { label: 'Tawerna',           subtitle: '+48 514 177 136', href: 'tel:+48514177136' },
          { label: 'Bosmanat',          subtitle: '+48 536 700 537', href: 'tel:+48536700537' },
          { label: 'Grupy & Biuro',     subtitle: '+48 609 620 565', href: 'tel:+48609620565' },
        ],
      },
    ] as NavLink[],
    cta: { label: 'Booking now', href: BOOKING_URL },
  }
}
