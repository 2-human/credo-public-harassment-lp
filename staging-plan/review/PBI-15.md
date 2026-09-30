# Review packet: PBI-15 · colour and contrast

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`). 51 landing pages share components (hero with the step-1 form card, pop-up
  form, content sections); the home page has its own copy of the form.
- Audit L3/G26/G27 and the design-system plan: pale greys fail WCAG AA contrast on white (worst: "OR CALL" at 1.6:1);
  body text is lighter and greyer than the prototype (weight 300, headings inherit Webflow's default `#333`).
- The prototype's tokens: ink `#111418`, muted `#5b6470`, secondary `#6a7688` (4.5:1 on white), credo-red-soft
  `#ff6b73` (red on dark only).

## Change (published to staging only, 30 Sep)
1. **Webflow colour variables** `ink`, `muted`, `secondary`, `credo-red-soft` (CSS `--ink`, `--muted`, `--secondary`,
   `--credo-red-soft`).
2. **Contrast (text on white):** the form intro ("Fill in the form below…", `Text Block 25`) and the card numbers
   (`mjfdcpaboxtext Copy`) → `secondary`; the inactive step numbers/labels ("02 YOUR SITUATION" …, was `#c7cad1` /
   `#b5b8bf`) and the slider end labels ("$0", "$100,000+", was `#b5b8bf`) → `var(--secondary)` in their embeds (hero,
   pop-up and home); "OR CALL" under the Continue button → `secondary` (was `#c8cdd6`). The light step borders are
   unchanged (decorative).
3. **Body text weight/colour (prototype):** body copy 300 → 400 (lede, what-we-do paragraph, card texts, FAQ/rights text,
   bottom CTA paragraph); section eyebrows ("WHAT WE DO", "WHY CREDO", "What we see") 500 → 600; the page default text
   colour and font are ink / Hanken Grotesk (headings inherited Webflow's `#333`; they are now `#111418`).
   Classes with a unique name were edited in Webflow (bound to the variables: `muted` for the lede, paragraph and card
   text; `secondary` for the greys). Three classes exist several times under the same name (legacy copies from old
   drafts that are to be deleted, M2), which Webflow cannot edit by name; for them and for the body default, a small,
   commented `<style>` block in the site head sets the same values (`.mjfdcpatext-copy` 400, `.mjthankyousteps-copy`
   600, `.button-7-copy + .callustext-copy` secondary, `body` ink + Hanken Grotesk). The "OR CALL" rule is scoped to the
   one under the Continue button because the same class is also used for a footer line on dark backgrounds.
4. Already in place (checked): the red "NO UPFRONT COST" on the near-black form header is `#ff6b73`.

## Evidence
- **axe-core color-contrast**, live pages, 1440 and 390: before, **20 failures on every page** (card numbers 3.2:1, form
  intro 3.2:1, inactive steps 1.6–2.0:1, slider labels 2.0:1, "OR CALL" 1.6:1); after, **0 failures on all 52 form
  pages at both widths**, and 0 on the system pages (thank-you pages, 404).
- The site head write-back was read back byte-identical to the intended file (only the new `<style>` block added).
- Functional spot check (6 pages incl. home, /letter, a state page; 1440 + 390): form walk, payload, trackers, dataLayer,
  cookies, phones, links and text identical; only computed styles differ (the intended colour/weight changes).
- Screenshots, before → after (same page and width): `P15-hero-*` (desktop), `P15-hero-phone-*`, `P15-whatwedo-*`,
  `P15-problems-*`, `P15-rights-faq-*`, `P15-bottom-cta-*` (debt-harassment-stop-calls), `P15-home-hero-*`.

## Questions for the reviewer
1. Do the colour and weight changes read as the prototype intends (clearer hierarchy, no loss of emphasis)?
2. Is the small site-head `<style>` block for duplicated class names an acceptable interim step, and anything missing
   from it?
3. Any text left that looks low-contrast in the screenshots?
