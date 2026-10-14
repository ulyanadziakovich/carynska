# CMS Pruvious dla Przystani Caryńskiej — projekt

Data: 2026-10-14

## Cel

Cała treść strony carynska (teksty, zdjęcia, ceny, listy, menu, kontakt,
dokumenty) ma być edytowalna w panelu Pruvious przez osobę nietechniczną.
W plikach `.vue` zostaje wyłącznie układ i styl — zero tekstów widocznych
dla gościa strony.

**Kryteria sukcesu**

1. Po migracji każda podstrona wygląda identycznie jak przed nią (porównanie
   zrzutów ekranu).
2. W `app/**/*.vue` i `app/composables/*` nie ma tekstów widocznych dla
   gościa (sprawdzane skryptem `grep`, wyjątki: atrybuty techniczne, ikony).
3. Każdy element strony da się znaleźć w panelu w grupie nazwanej tak jak
   podstrona, na której jest widoczny.
4. Każdy telefon / e-mail wpisuje się w panelu dokładnie raz.

## Decyzje

- **Osobna aplikacja `~/carynska-cms`** (wzorzec `nb-cms` + `nb`). Strona
  carynska pobiera dane przez proxy `/api/cms/...`.
- **Na razie tylko lokalnie.** Wdrożenie (k8s, domena, backup) to osobne
  zadanie; konfiguracja trzyma ścieżki zapisu w zmiennych środowiskowych tak
  jak nb-cms, żeby wdrożenie nie wymagało zmian w kodzie.
- **Jeden formularz na ekran strony, z zakładkami** odpowiadającymi sekcjom
  strony. Listy (pokoje, jachty, dania, opinie, cenniki) to pola `repeater`
  wewnątrz formularza — nie osobne kolekcje.
- **Jedyny wyjątek od zasady wyżej: „Działy i kontakty”** to kolekcja
  wielorekordowa, bo podstrony wskazują na dział polem `record` (wybór z listy)
  zamiast przepisywać numer.

## Architektura

### carynska-cms

- Pruvious 3.16, Nuxt 4, SQLite (`./pruvious.db`), port **4322**
  (4321 zajmuje nb-cms).
- Kopiowane z nb-cms i dostosowane:
  - `app/dashboard/Base.vue` + `app/config/menuGroups.ts` — menu panelu
    pogrupowane według podstron,
  - `app/dashboard/ViewOnSite.vue` — przycisk „Zobacz na stronie”
    (adres strony z `runtimeConfig.public.siteUrl`, lokalnie
    `http://localhost:4000`),
  - `app/dashboard/MultiCollectionsOverview.vue` — przeciąganie kolejności,
  - `app/fields/gallery.field.ts` + `GalleryField.vue` — galerie zdjęć,
  - `scripts/page-texts/{spec,fields,generate}.mjs` — generator kolekcji:
    jedno źródło prawdy (`spec.mjs`) → pliki `*.collection.ts`.
- **Nie** kopiujemy: kolorów motywu (`ThemePreview`, `color.field`), mapy
  marzeń, kolekcji specyficznych dla nb, katalogu `deploy/`.
- Wszystkie kolekcje: `apiRoutes.read: 'public'` (tylko odczyt), etykiety
  i opisy pól po polsku, każde pole z opisem „gdzie to widać na stronie”.

### Struktura panelu (grupy menu → formularze → zakładki)

| Grupa | Formularz (`name`) | Zakładki |
|---|---|---|
| Strona główna | `strona-glowna` | Baner ze zdjęciami · Noclegi (zapowiedź) · Atrakcje (kafelki) · Tawerna (zapowiedź) · Opinie gości · Facebook |
| Noclegi | `noclegi-pokoje` | Nagłówek · Wstęp · Pokoje (repeater: nazwa, typ, metraż, liczba osób, opis, udogodnienia, galeria) |
| | `noclegi-cennik` | Nagłówek · Ceny (repeater wierszy) · Dopłaty i usługi · Uwagi |
| | `noclegi-jacht` | Nagłówek · Wstęp · Jachty (repeater) · W cenie · Uwagi · Dział kontaktowy |
| Atrakcje | `atrakcje` | Nagłówek · Wstęp · Wypożyczalnia (sprzęt, cennik, flota) · Bosmanat (usługi, cennik, zdjęcia) · Aktywny dzień · Dla grup |
| | `zaplanuj-pobyt` | sekcje strony wg obecnego układu |
| Tawerna | `tawerna` | Nagłówek · Wstęp · Menu (repeater kategorii → repeater dań: nazwa, opis, cena) · Książka menu · Dostawa |
| Galeria | `galeria` | Nagłówek · Zdjęcia (galeria z kategoriami wg obecnego układu) |
| Grupy | `grupy` | Nagłówek · Oferta · Cennik grupowy · Sale i pojemność · Zapytanie |
| Projekty | `projekty` | Nagłówek · Projekt · Finansowanie · Fundusze EOG · Harmonogram |
| Dokumenty | `regulamin`, `regulamin-wypozyczalni`, `wzor-umowy-jachtu` | Tytuł · Treść (edytor tekstu) |
| Ustawienia wspólne | `dzialy` (multi) | Działy: nazwa, telefon, e-mail, godziny, opis |
| | `kontakt` | Adres, mapa, e-maile firmowe, media społecznościowe, platformy rezerwacyjne, dane do przelewu |
| | `menu-strony` | Pozycje menu (repeater z podpozycjami) · Przycisk rezerwacji |
| | `ustawienia` | Logo · Pasek górny · Stopka · Odznaki i certyfikaty · Link rezerwacji hotres · Widżet rezerwacji · Menu „Zadzwoń” · Nazwa strony w karcie przeglądarki · Teksty wspólne (przyciski, komunikaty formularza kontaktowego) |

Dokładny podział pól na zakładki wynika z inwentaryzacji tekstów każdej
podstrony (krok 1 planu) — tabela wyżej jest szkieletem, który inwentaryzacja
uzupełnia, nie zmienia.

### Zasady deduplikacji

- Telefony i e-maile tylko w `dzialy` / `kontakt`. Formularze stron mają pole
  `record` „Dział kontaktowy” → strona pokazuje jego dane.
- Strona główna w sekcji „Noclegi” pokazuje jedno zdjęcie — własne pole „Zdjęcie” w formularzu strony głównej (nie lista pokoi).
- Link hotres jest tylko w `ustawienia`; wszystkie przyciski „Rezerwuj”
  korzystają z niego.

### carynska (strona)

- `app/composables/useCms.ts` — `useCmsSingle`, `useCmsCollection`,
  `resolveCmsUrl` (z nb, z retry).
- `server/api/cms/[...path].ts` — proxy do CMS z cache „stale” na wypadek
  chwilowej niedostępności CMS (z nb).
- `nuxt.config.ts`: `runtimeConfig.public.cmsUrl` (domyślnie
  `http://localhost:4322`, nadpisywany przez `NUXT_PUBLIC_CMS_URL`).
- Usunięte: `server/api/{content,noclegi,atrakcje,jacht,tawerna,projekty}.get.ts`.
  Zostaje `contact.post.ts` (wysyłka formularza).
- `useNav.ts` czyta `menu-strony` + `ustawienia` zamiast stałych.
- Każdy komponent i strona: teksty → pola CMS; komponenty dostają dane przez
  propsy ze strony (jak dziś), nie pobierają ich same — poza elementami
  wspólnymi (navbar, topbar, stopka, kontakt), które czytają singletony
  ustawień.
- Zdjęcia: z biblioteki mediów CMS (`resolveCmsUrl`). W `public/` zostają
  favicony i pliki wymagane technicznie.

### Import danych

`carynska-cms/scripts/import/` — skrypt Node, uruchamiany na działającym CMS:

1. wgrywa pliki z `carynska/public/images` do mediów Pruvious,
2. wypełnia każdy singleton i rekordy `dzialy` obecną treścią (z dawnych
   `*.get.ts`, z tekstów wyciągniętych z szablonów i z `useNav.ts`),
   podmieniając ścieżki zdjęć na wgrane media.

Dane źródłowe zapisane jako `scripts/import/data.json`, żeby import był
powtarzalny po usunięciu plików `*.get.ts` z carynska.

## Obsługa błędów

- CMS niedostępny: proxy zwraca ostatnią dobrą odpowiedź z cache; bez cache —
  strona renderuje się z pustymi sekcjami (komponenty odporne na brak danych
  przez `v-if` / wartości opcjonalne), bez wywracania SSR.
- Puste pole w CMS: sekcja/element się nie wyświetla (zamiast pustych
  nagłówków).

## Weryfikacja

1. Zrzuty ekranu wszystkich podstron (desktop + mobile) przed migracją
   i po — porównanie wizualne.
2. Skrypt `grep` na polskie teksty w `app/` → oczekiwany wynik pusty.
3. Ręczny test w panelu: zmiana tekstu, zdjęcia, kolejności pokoju, numeru
   działu → widoczna na stronie po odświeżeniu.
4. `nuxt build` obu projektów bez błędów.

## Poza zakresem

- Wdrożenie produkcyjne CMS (k8s, domena, backup).
- Wersje językowe.
- Kolory/motyw edytowalne z panelu.
