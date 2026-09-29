# Review packet: PBI-01d P3 · identical sections as shared components

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`). 52 form pages: 51 ad landing pages plus the home page.
- PBI-01d moves repeated code and markup into shared places so later design work lands once. P1 (page code → Site
  settings) and P2 (one phone script, numbers in one table) are done and reviewed.
- P3 scope: the four sections that are the same on every landing page become Webflow components.

## Change (published to staging only, 29 Sep)
| Component | Replaces | Props (per-page text) |
|---|---|---|
| LP · Lead form | the pop-up form section `#heropopup` (form `#gtmform` inside) | none — identical on 51 pages |
| LP · Trust strip | the trust/review strip (`section-32`) | none — identical on 52 pages |
| LP · Hero | the hero `#herosec` (step-1 card with the debt slider) | H1, Lede (multiline), Form intro, First question |
| LP · Bottom CTA | the bottom call-to-action (`section-35 bottom-cta`) | Paragraph (multiline) |

- Each page's section was replaced by an instance at the same position, and the instance props were set to that
  page's own text, taken from its served HTML (exact, including a zero-width joiner on 3 pages and `<br><br>` in two
  ledes; a multiline prop renders "\n" as `<br>`).
- **One markup change:** the first form question was `<h3 class="heading-47"><strong>…</strong></h3>`; a Webflow Bold
  element cannot be bound to a prop, so it is now `<h3 class="heading-47 lp-question">…</h3>`, where the combo class
  `lp-question` sets font-weight 700 (the weight the `<strong>` gave). Rendered weight, size and box are unchanged.
- **Home page:** its hero, pop-up and bottom CTA use H1 tags where the landing pages use H2/H3, so they would render
  differently inside the shared components. Home keeps those three sections; it uses only the Trust strip.

## Evidence
- **Structure check before the change:** every section compared node by node across the 52 pages. Hero/pop-up/CTA:
  51 pages identical apart from the prop texts and Webflow grid ids; home differs only in its H1 tags. Trust strip:
  52 identical.
- **Served HTML, all 56 published pages, before vs after, tag by tag** (normalizing the publish stamp, script hashes,
  grid ids): the 52 form pages differ only in the question markup above (51 pages; home has no such question) and, on
  3 pages, two blank lines of whitespace inside the BBB seal embed of the trust strip. The 4 system pages are identical.
- **Rendered comparison** (live page vs the saved pre-change HTML served from the same URL, desktop 1440 and phone 390):
  every element's tag, classes, font size, colour, display, box size and page position, plus every text run with its
  weight/style/colour/size. **104/104 identical** (the `<strong>` that used to wrap the question is excluded from the
  element list; its text run is compared).
- **Functional comparison**, live vs pre-change, both widths, `?utm_source=facebook…&fbclid&gclid`: tracker requests
  (answered locally), dataLayer, console errors, visible text, links, `tel:` targets, the text of every phone element,
  cookies and the form payload (form walked; POST answered locally, never sent). 104/104 page×width loads identical on
  every one of those measures (form payload 412 bytes on all 52 pages at desktop). The only flagged category is the
  computed-style list, which shifts by one row where the `<strong>` was removed (covered by the rendered comparison
  above); the home page is identical on every measure.

## Questions for the reviewer
1. Is replacing `<strong>` with a combo class on the question heading safe for accessibility and SEO?
2. Any risk from four component instances per page (Webflow publish, interactions, the pop-up open/close script,
   `#herosec`/`#heropopup` anchors, the step form script)?
3. Is keeping the home page's own hero/pop-up/CTA the right call, versus changing its H1 tags to match?
