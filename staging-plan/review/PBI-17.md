# Review packet: PBI-17 · form card, "Or call", bottom CTA, FAQ width, page width

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
  51 landing pages share components (hero with the step-1 form card, pop-up form, content sections); the home page has
  its own copy of the form and sections. Phone = 390px wide.
- Audit G27/G28/L6 and the prototype (`*-locked-paired-portrait-noborders.html`): the form card had a 2px black border
  (prototype: no border, soft shadow, 4px radius); "or call (number)" sat inside the card under Continue (prototype:
  "Or call (number)" below the card, mono 13px muted grey, number dark with a red underline); the bottom CTA was centred
  (prototype: left-aligned, headline max 680px, paragraph max 560px); its embed said `poition:relative` (typo) and its
  mobile media query lacked a `}`, so the decorative glow was placed against the page and made every page **1555px
  wide at 1440** and wider than the screen on iPad (hidden on desktop by `overflow-x: hidden`); FAQ answers ran the full
  1260px (about 170 characters per line).

## Change (published to staging only, 30 Sep)
1. **Card** (`Div Block 36`, used by the hero card and the two pop-up cards): border removed; box shadow
   `0 1px 2px rgba(0,0,0,.04), 0 6px 20px rgba(0,0,0,.06)`, radius 4px, overflow hidden (the prototype values). Checked
   before the change: nothing in the hero or pop-up cards (step 2, step 2 with errors) extends outside the card.
2. **"Or call"** moved out of the card to just below it (LP · Hero component and home). Its old class name exists three
   times (legacy duplicates, not editable by name), so it now has its own classes: `hero-call` (Inconsolata 13px,
   letter-spacing .03em, colour `muted`, 18px above) and `hero-call-number` on the link (colour `ink`, 600, red 1.5px
   underline); the card gets the combo `hero-card` (bottom margin 0; the space below moves to the call line: 100px,
   30px on phones). Text "or call" → "Or call". The link keeps its id `herocta` and its `tel:` link (phone swap unchanged).
3. **Bottom CTA embed** (LP · Bottom CTA and home): `position:relative; overflow:hidden; text-align:left`; headline
   (`heading-39-copy`) max 680px, paragraph max 560px, button left; the missing `}` added; and on phones (≤479px) the
   headline 26px / 1.2 (it was still 42px; missed in PBI-16).
4. **FAQ answers** max-width `55ch` in the Rights and FAQ section's embed (component and home), about 70 characters
   per line (the prototype's 760px gives about 130).
5. Bottom CTA "or call" → "Or call" too (component and home), as in the prototype.
6. Not changed: the site head. Its PBI-15 rule for the old "OR CALL" (`.button-7-copy + .callustext-copy`) no longer
   matches anything; it goes with the next head edit (DS-8).

## Evidence
- Served HTML, all 56 published pages before vs after: on the 52 form pages exactly these changes (card class, call
  line moved and restyled, the two embeds); the rest is the publish stamp and the site stylesheet URL. `poition` on 0
  pages (was 52); `herocta` on 52 (was 52).
- `pbi17-card-cta.mjs`, all 52 form pages at 1440 / 810 / 390 / 320: **208/208 ok** (card: no border, shadow, 4px radius; "Or call" 18px below the card, left edge aligned, 13px muted, number ink with red underline; bottom CTA left, button at the cell's left edge; **page width = screen width** at every width, was 1555px at 1440). FAQ answers: longest line **72–74 characters** (was ~170). CTA headline: desktop 42px on 2 lines (3 on 2 pages with longer copy), phone 26px / 31.2px.
- Functional spot check: 4 pages (a landing page, home, /letter, a state page) × 1440 and 390, before vs after: form walk, payload, trackers, dataLayer, cookies, phones (`herocta`, `footercta`) and links **identical**; only computed styles and the visible text differ ("or call" → "Or call", intended). Pop-up walked to step 3 on 3 pages × 2 widths: nothing inside the cards is clipped by `overflow: hidden`.
- Screenshots, before → after: `P17-hero-*` (desktop + phone), `P17-popup-*` (step 2), `P17-cta-*` (desktop +
  phone), `P17-faq-desktop-*` (debt-harassment-stop-calls), `P17-home-hero-*`.

## Questions for the reviewer
1. Do the card, the "Or call" line and the bottom CTA read as the prototype intends?
2. Is the FAQ answer width right (about 70 characters), next to full-width questions?
3. Anything missed by the page-width fix (L6), or by giving the pop-up cards the same shadow?
