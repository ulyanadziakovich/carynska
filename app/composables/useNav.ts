const BOOKING_URL = 'https://www.booking.com/hotel/pl/przystan-carynska.pl.html'

export interface NavChild { label: string; href: string; external?: boolean }
export interface NavLink { label: string; href: string; children?: NavChild[] }

export function useNav() {
  return {
    links: [
      {
        label: 'Noclegi',
        href: '/noclegi',
        children: [
          { label: 'Pokoje & Apartamenty', href: '/noclegi' },
          { label: 'Cennik pokoi', href: '/noclegi#cennik' },
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
    ] as NavLink[],
    cta: { label: 'Booking now', href: BOOKING_URL },
  }
}
