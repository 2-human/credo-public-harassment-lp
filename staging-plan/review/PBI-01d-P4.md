# Review packet: PBI-01d P4 · content sections as shared components

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`). 51 ad landing pages plus the home page.
- PBI-01d moves repeated markup into shared places so design work lands once. P1–P3 are done (P3: hero, lead form,
  trust strip and bottom CTA are components).
- P4 scope: the four content sections become components. Webflow's API cannot create slot properties, so each
  component has fixed card positions with text props, plus show/hide props for the optional last cards.

## Change (published to staging only, 29 Sep)
| Component | Section | Props | Show/hide |
|---|---|---|---|
| LP · What we do | What we do + Why Credo | heading, body, 5 list items, Why heading, 5 cards × title/text (20) | list items 4, 5 |
| LP · Common problems | What we see + Who this helps | 6 cards × law/title/text, 6 list items (26) | cards 5–6, list item 6 |
| LP · How it works | 4 steps | 4 × title/text/time tag (12) | — |
| LP · Rights and FAQ | reviews/stats, Your rights, FAQ | rights intro, 6 rows × law/label/text/tag/example, 7 FAQ × q/a (48) | right 6, FAQ 6, FAQ 7 |

- Built from real pages (the page with the most items for each section), then rolled out to all 51 landing pages:
  each page's four sections were replaced by instances at the same position, with that page's own text taken from its
  served HTML (line breaks kept as multiline props). The home page keeps its own sections (its headings are H1 tags).
- Text that was identical on every page (eyebrows, section headings, card numbers, buttons, the review/stats strip)
  is fixed inside the components.
- **Markup normalisation.** Webflow cannot bind a prop to an inline Bold element. Where a `<strong>` changed the look,
  its style moved to a combo class on the parent: `Heading 41 + lp-bold` (rights labels, 700), `Text Block 19 +
  lp-step-tag` (step tags, 700), `Heading 41 + lp-right-text` / `lp-faq-q` (margin-top −1px, see below). Where a
  `<strong>` changed nothing (same weight/size/colour/line-height), it is simply gone. The Why Credo card titles keep
  the exact original markup (`h3.heading-40 > strong.bold-text-14`) via custom elements, because the 38px heading
  font sets their line height.

## Intended visible changes (all on inconsistencies between pages; none change copy meaning)
1. **Step time tags are 700 on every page** (prototype `.when` is 700). Before, step 1 was 600 on all pages, step 2
   was 600 on 23 pages and 700 on 29, steps 3–4 were 700.
2. **Rights descriptions and FAQ questions all sit at the designed position.** Before, some rows had a
   `strong.bold-text-15` wrapper (display:block; margin-top:−11px) that pulls the text up 11px so it aligns with the
   statute citation, and others did not, at random per row and per page (rights descriptions: 142 rows pulled up,
   140 not; FAQ questions: 149 pulled up, 104 not). Now every row uses the pulled-up position, which lines the rights
   description up with its citation.
3. **Common problems eyebrow reads "What we see" at weight 500 on every page.** Four legacy pages (collection-defense,
   credit-cards, fcba-and-fdcpa, stop-wage-garnishment) showed "WHY CREDO" there (a copy error), and two pages
   (multiple-collectors-*) showed it bold.
4. **medical-debt-attorney step tags typed in capitals** (Review/Resolution/Defense → REVIEW/RESOLUTION/DEFENSE), as on
   every other page and in the prototype (same rule as the approved G29 fix).
5. **debt-harassment-fdcpa-attorney:** the Common problems heading had a stray second line break (an empty line, 44px)
   that no other page has; the section is now as on the other 50 pages.
6. **debt-lawsuit-options:** its 6th FAQ question was an `<h4>` (all other FAQ questions on all pages are `<h3>`); it is
   now an `<h3>` at the same position as the others (11px higher).

## Evidence
- **Inventory before building:** every content section compared across the 52 pages. Embeds and images identical on
  all 52; static text identical on all 51 landing pages except the eyebrow in change 3; the only structural variation
  is card/list counts (covered by show/hide props) and inline markup.
- **Exact text check after publishing:** the copy of every prop was read back out of the served HTML of all 51 pages
  and compared with the pre-change copy: **4,646 props, 0 mismatches**, and the card/list/row/FAQ counts match on every
  page. (A first pass found 8 props whose text began with a space; the browser used to collapse that space, Webflow
  turned it into a visible non-breaking space. The 8 values were set without the leading space and re-checked.)
- **Rendered comparison:** live page vs the saved pre-change page with only the declared changes 1–4 applied to it
  (unwrap the `<strong>`s, pull-up margin, 700 weights, eyebrow text, tag capitals), desktop 1440 and phone 390: every
  element's tag, classes, font size, colour, box and page position, and every text run's weight/style/colour/size.
  **98/104 page×width loads identical.** The 6 others: debt-harassment-fdcpa-attorney and debt-lawsuit-options (both
  widths) differ exactly by changes 5 and 6; the home page (both widths) is not on these components, and compared as
  is (no normalisation) it is identical, 2/2.
- **Links, ids, form fields, `tel:` targets:** identical on all 52 pages (only the CSS bundle URL and the form's
  `data-wf-element-id`, which moved into the P3 Lead form component, differ).
- **Interaction smoke test** (pre-change vs live, both widths): the debt slider, opening the pop-up from the step-1
  card, closing it, `#herosec` and `#heropopup` anchors. **104/104 identical** (52 pages × 2 widths).
- **Home and system pages:** unchanged (the home page differs only by the P3 whitespace in the BBB embed).

## Screenshots (before → after, same page, same width)
- `P4-steps-*` (medical-debt-attorney, change 1 and 4), `P4-rights-*` and `P4-rights-phone-*`
  (credit-card-debt-lawsuit-respond, change 2), `P4-faq-*` (change 2), `P4-eyebrow-*` (collection-defense, change 3).

## Questions for the reviewer
1. Are the six intended visible changes the right standardisations, or should any page keep its old look?
2. Is the fixed-positions-plus-show/hide model (max 5/6/4/6-row/7-FAQ) robust for future pages, and are the limits
   documented well enough?
3. Any risk from the combo classes and the custom `h3 > strong` elements (SEO heading outline, accessibility)?

## Round 2 (after the first reviews, 29 Sep)
- **Functional re-run on the final P4 state**, live vs pre-change, 52 pages × 1440 and 390,
  `?utm_source=facebook…&fbclid&gclid`: tracker requests (answered locally), dataLayer, console errors, links, `tel:`
  targets, the text of every phone element (nav, hero, footer, sticky bar), cookies and the form payload (form walked
  through all 3 steps; POST answered locally): **identical on 104/104**, form payload 412 bytes on all 52 pages.
  Flagged only: the computed-style list (row shift where `<strong>`s were removed, covered by the rendered comparison)
  and visible text on exactly the 6 pages with a declared text change (4 eyebrow pages, medical-debt-attorney tags,
  the fdcpa-attorney blank line). Phone matrix with `utm_source=google` at 390: identical on 52/52. Real submission and
  third-party delivery wait on D1 (no test lead until the operator agrees one); nothing in the forms, phone script or
  tracking code changed (all are site-level code or in the P3 components, not in these sections).
- **Changes 5 and 6 evidence:** `P4-blankline-before/after.png` (debt-harassment-fdcpa-attorney, the stray empty line
  under the heading is gone) and `P4-faq6-before/after.png` (debt-lawsuit-options). Heading outline (h1–h6 sequence) of
  all 52 pages before vs after: identical on 51; on debt-lawsuit-options the only change is that one `h4` → `h3`.
- **Text check and change 4:** the 4,646-prop comparison used the pre-change copy with the declared change 4 applied
  (the 3 medical-debt-attorney tags in capitals); everything else was compared as it was.
- **Rendered comparison count:** 104 loads = 52 pages × 2 widths. 98 identical to the normalised pre-change page; 4
  (fdcpa-attorney, options × 2 widths) differ exactly by changes 5–6; the home page (2) is not on these components, so
  the normalisation does not apply to it, and compared as is it is identical (2/2).
- **Class scope:** `lp-bold`, `lp-right-text`, `lp-faq-q`, `lp-step-tag` are new combo classes; they appear only inside
  the four components (51 landing pages), never on the home or system pages (served-HTML search).
- **Limits** (5/6/4/6/7) are documented on the board note and in the plan; a page needing more gets one more hidden
  slot added to the component.
- The narrow left column on phone (labels wrapping word by word, GPT UX 9) is the existing design, unchanged by P4; it
  goes to the design polish (PBI-18).
