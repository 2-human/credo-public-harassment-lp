# Review packet: PBI-25 · heading levels on home and the thank-you pages

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
- Audit G5 fixed the landing pages to one H1 (section labels and headlines h2, card titles h3), keeping the look with a
  small per-page CSS block. Found in PBI-18: home still had 29 `h1` elements (section labels, headlines, card titles,
  pop-up step titles and question) and the three thank-you pages 9 each (/thank-you, /page/thank-you,
  /page/already-submitted; one shared component "Thank-you page").

## Change (staging only, 30 Sep)
1. **Home:** 18 headings → h2 (section labels and headlines, pop-up step titles, bottom CTA) and 10 → h3 (the five
   "Why Credo" card titles, the four step numbers, the pop-up question), the same levels as the landing pages; the
   hero H1 stays the only h1. CSS in the home page's head code keeps their h1 look (the landing pages' G5 values,
   except margin-bottom where home sets its own).
2. **Thank-you component:** 5 → h2 (labels, "Here's what you can expect", "how it works", the sequence headline) and
   3 → h3 (step numbers); "Thank you." stays the H1. Two CSS lines in the component's small style embed keep the look.
3. How the CSS was found: a shadow test (`pbi25-heading-shadow.mjs`) swaps the tags in the live page and compares every
   computed style (font size, line height, weight, family, margins, letter spacing, transform, colour, display) and box
   size of each re-tagged heading, first without CSS (to see what the tag defaults change), then with the candidate
   CSS until nothing differs.

## Evidence
- Served HTML: `h1` elements home 29 → **1**, each thank-you page 9 → **1**; home now 18 h2 + 15 h3 (incl. existing
  h3s), thank-you pages 5 h2 + 3 h3.
- Shadow test before publishing: with the CSS, 0 computed-style differences on all 28 (home) and 8 (each thank-you
  page) re-tagged headings at 1440, 768 and 390.
- After publishing, `pbi25-compare.mjs` (saved page before vs live, every element: class, font size, weight, line
  height, colour, display, margins, box width, height and position): **thank-you pages: 8 tag-only changes, 0 other
  differences** (3 pages × 1440 and 390); **home: 28 tag-only changes, 0 other differences** at 1440; at 390 two
  rows differ that belong to PBI-19 (footer bottom padding for the phone call bar, the bar's pulsing dot).
- No script targets these headings by tag (the scroll-link script uses their ids, which are kept).

## Questions for the reviewer
1. Are the chosen levels right (h2 for section labels and headlines, h3 for card titles and step numbers), consistent
   with the landing pages?
2. Any risk in keeping the look with page-level CSS (home head, component embed) rather than class changes?
