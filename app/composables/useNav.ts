const BOOKING_URL = 'https://www.booking.com/hotel/pl/przystan-carynska.pl.html'

export function useNav() {
  return {
    links: [
      { label: 'Noclegi', href: '/noclegi' },
      { label: 'Atrakcje', href: '/atrakcje' },
      { label: 'Tawerna', href: '/tawerna' },
    ],
    cta: { label: 'Booking now', href: BOOKING_URL },
  }
}
