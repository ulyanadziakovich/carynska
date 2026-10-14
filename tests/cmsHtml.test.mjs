// Testy czyszczenia HTML z pól edytora CMS (server/utils/cmsHtml.ts).
//   node --test tests/
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { sanitizeEditorFields } from '../server/utils/cmsHtml.ts'

test('usuwa skrypty i atrybuty zdarzeń z pól edytora', () => {
  const out = sanitizeEditorFields('zaplanuj-pobyt', { aboutBody: '<p>x</p><img src=x onerror=alert(1)><script>alert(2)</script><a href="javascript:alert(3)">y</a>' })
  assert.equal(out.aboutBody, '<p>x</p><a>y</a>')
})

test('zostawia formatowanie i linki z edytora', () => {
  const html = '<h2>Tytuł</h2><p><strong>a</strong> <em>b</em> <a href="/tawerna">c</a></p><ul><li><p>d</p></li></ul><ol><li><p>e</p></li></ol><blockquote><p>f</p></blockquote>'
  assert.equal(sanitizeEditorFields('regulamin', { body: html }).body, html)
})

test('nie rusza zwykłych pól tekstowych ani innych formularzy', () => {
  const rec = { title: 'a < b', body: '<script>x</script>' }
  assert.deepEqual(sanitizeEditorFields('tawerna', rec), rec)
  assert.equal(sanitizeEditorFields('regulamin', { title: 'a < b' }).title, 'a < b')
})
