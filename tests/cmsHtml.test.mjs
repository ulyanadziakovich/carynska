// Testy czyszczenia HTML z pól edytora CMS (server/utils/cmsHtml.ts).
//   node --test tests/
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { sanitizeCmsRecord } from '../server/utils/cmsHtml.ts'

test('usuwa skrypty i atrybuty zdarzeń z pól edytora', () => {
  const out = sanitizeCmsRecord('zaplanuj-pobyt', { aboutBody: '<p>x</p><img src=x onerror=alert(1)><script>alert(2)</script><a href="javascript:alert(3)">y</a>' })
  assert.equal(out.aboutBody, '<p>x</p><a>y</a>')
})

test('zostawia formatowanie i linki z edytora', () => {
  const html = '<h2>Tytuł</h2><p><strong>a</strong> <em>b</em> <a href="/tawerna">c</a></p><ul><li><p>d</p></li></ul><ol><li><p>e</p></li></ol><blockquote><p>f</p></blockquote>'
  assert.equal(sanitizeCmsRecord('regulamin', { body: html }).body, html)
})

test('nie rusza zwykłych pól tekstowych ani innych formularzy', () => {
  const rec = { title: 'a < b', body: '<script>x</script>' }
  assert.deepEqual(sanitizeCmsRecord('tawerna', rec), rec)
  assert.equal(sanitizeCmsRecord('regulamin', { title: 'a < b' }).title, 'a < b')
})

test('linki z CMS: dozwolone tylko http(s), mailto, tel, ścieżki i kotwice', () => {
  const rec = {
    ctaHref: 'javascript:alert(1)', bookingUrl: 'https://panel.hotres.pl/x', href: '/tawerna', googleUrl: ' JavaScript:alert(2)',
    links: [{ label: 'a', href: 'data:text/html,x', children: [{ href: 'tel:+48123' }, { href: '//evil.example' }] }],
    social: [{ href: 'mailto:a@b.pl' }], nearbyHref: '#cennik', title: 'javascript:to nie link',
  }
  const out = sanitizeCmsRecord('cokolwiek', rec)
  assert.equal(out.ctaHref, '')
  assert.equal(out.googleUrl, '')
  assert.equal(out.links[0].href, '')
  assert.equal(out.links[0].children[1].href, '')
  assert.equal(out.bookingUrl, 'https://panel.hotres.pl/x')
  assert.equal(out.href, '/tawerna')
  assert.equal(out.links[0].children[0].href, 'tel:+48123')
  assert.equal(out.social[0].href, 'mailto:a@b.pl')
  assert.equal(out.nearbyHref, '#cennik')
  assert.equal(out.title, 'javascript:to nie link')
})
