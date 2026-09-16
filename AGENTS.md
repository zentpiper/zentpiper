# Protected sections — mobile hero & header redesign (2026-09-16)

The mobile header and the Home page hero section were just reworked so the hero
fits exactly within one screen on mobile and the header uses a hamburger menu.
**Read this before touching any of the files below.** The values are
interdependent across files — changing one without the others reintroduces
layout bugs that were specifically fixed (hero overflowing the viewport, dead
black space in the header, the WhatsApp button overlapping the hero CTA
buttons).

## Files involved, and why

- `src/components/Header.jsx` / `src/components/Header.css` — mobile header
  (≤768px) is a single row: hamburger button | centered logo | currency
  selector, laid out with `grid-template-columns: 1fr auto 1fr` so the logo is
  centered on the full header width. The old horizontal-scroll nav-pills bar
  is gone; nav links now live in a slide-in `.navbar-mobile` panel.
  Z-index order is intentional and easy to break: `.header-content` (z-index
  2) sits above `.navbar-mobile` (1), which sits above `.mobile-nav-backdrop`
  (0) — all inside `.header`'s own stacking context (it has
  `position: fixed` + `z-index: 1000`). If you add new fixed-position
  children inside `<header>`, give them a z-index lower than 2 or the header
  bar will disappear behind them.

- `src/pages/Home.css`, `.hero-section` mobile media queries (`@media
  (max-width: 768px)` and `@media (max-width: 480px)`) — `min-height` uses
  `calc(100svh - Npx)`. `N` = mobile header height + clearance reserved for
  the floating WhatsApp button. Current values: **142px at ≤768px, 136px at
  ≤480px**. If the header height or the WhatsApp button's size/position
  change, recompute these.

- `src/components/Layout.css` (`main { margin-top: ... }`) and the inline
  `<style>` block in `index.html`'s `<head>` (critical CSS: `.header {
  min-height }`, `main { margin-top }`) — **must stay numerically in sync**
  with the real rendered mobile header height: currently **58px at ≤768px,
  52px at ≤480px**. The inline critical CSS exists to reserve layout space
  before the real stylesheet loads (avoids a layout shift on first paint), so
  it duplicates these numbers on purpose in three places. Editing the header
  layout without updating all three is what caused the original "big empty
  black gap" bug.

- `src/App.css` — dead legacy `.hero-section` / `.hero-title` /
  `.hero-subtitle` rules were removed from here (they were leaking
  `padding: 4rem 1rem` onto the real hero via CSS cascade, since the real
  `.hero-section` in `Home.css` never declared `padding` itself). Do not
  re-add generic `.hero-section`/`.hero-title`/`.hero-subtitle` rules to
  `App.css` — the real hero styling lives entirely in `Home.css`.

- `.hero-main` and `.hero-title-wrap` (base rules, `Home.css` ~line 127-141)
  both have `flex: 1` for the **desktop** row layout (title takes remaining
  horizontal space next to the `.hero-tags` sidebar). On mobile,
  `.hero-main` switches to `flex-direction: column` — if `.hero-title-wrap`
  keeps `flex: 1` there, it grows to fill all leftover vertical space and
  shoves `.hero-tags` down, creating a large empty gap between the title and
  the tags list even though nothing looks wrong in the CSS. The mobile media
  query explicitly cancels this with `.hero-title-wrap { flex: none; width:
  100%; }` and `.hero-main { flex: none; justify-content: flex-start; }` —
  don't remove these as "redundant," they're canceling an inherited desktop
  value.

## Before changing any of the above

Re-measure in a real mobile viewport (devtools device emulation or
Playwright), don't just eyeball it:

1. Hero fits with **no page scroll** at 360×760, 375×667, 390×844, 430×932.
2. Hero footer's CTA buttons ("Ver Planes" / "Habla con nosotros") don't
   overlap `.whatsapp-float`.
3. Mobile header shows no empty/dead space (header height should match its
   content height, not a stale reserved value).
4. Hamburger menu opens/closes, closes on route change and outside click,
   and its icon stays visible above the backdrop.
5. No unexplained gap between the hero title block and the tags list
   (`[ 01 // CORE ]` etc.) below it — should be a small, consistent gap, not
   one that changes size with viewport height.
