# Review packet: PBI-01d P2 · one phone-swap script, numbers in one table

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`).
- Each landing page shows a tracked phone number that depends on the ad source (`utm_source` from the URL, or from a cookie
  on a return visit). There are 4 values per page: google, meta, bing and default.
- Before this change, each of the 52 form pages had an HtmlEmbed as the first element of its body. The embed held a
  15.7 KB script, the **same on all 52 pages except for its 4 numbers** (checked byte for byte), with three parts:
  - the phone swap: nav/hero/footer call buttons, `#btnCTA` by business hours, and the mobile sticky call bar;
  - custom smooth scroll for the nav links;
  - an anchor-link scroll guard.
  48 of the embeds also held a `<style>h1.heading-46 em { color: #c92028 !important; }</style>`.
- P1 (already reviewed and settled) moved the shared page code into Site settings. It also added
  `window.credoSystemPage`, which is true on 404/401//thank-you//page/* (the pages that never had the page code).
- Operator decision (D19): put the numbers in **one table keyed by page slug** in the site code, as one place mirroring
  the call-tracking sheet.

## Change (published to staging only, 29 Sep)
1. **New block at the start of the site footer code.** It sits before all existing footer code, so the three
   DOMContentLoaded listeners stay ahead of the other footer listeners, as the body-top embed was.
   - `window.CREDO_PHONES = { '*': {…all 17188658350…}, '': {…home…}, 'california': {…}, … }`: 52 page entries,
     taken from the embeds, plus `'*'` for any page not listed. `'*'` is the site's main number, (718) 865-8350.
   - The script, verbatim, wrapped in `if (!window.credoSystemPage) { … }`. The only line changed is the number lookup:
     ```diff
     -  const phones = {
     -'google': '12014167080',
     -    'meta': '16122568820',
     -    'bing': '12015353725',
     -    'default': '12014167080'
     -  };
     +  const phones = window.CREDO_PHONES[window.location.pathname.replace(/^\/+|\/+$/g, '')] || window.CREDO_PHONES['*'];
     ```
   - The `h1.heading-46 em` rule, once. Today it matches nothing on any page: no H1 contains an `<em>` (checked on all
     52). It is kept for the planned red accent word (PBI-18).
2. **The embed is removed from the 52 pages** (element `a7e74b1a-…`, confirmed as that HtmlEmbed on each page before
   removal). Each removed embed is saved byte for byte for rollback.

## Evidence
- **Build:** the build script checks that every embed equals the reference script once the numbers are swapped out, and
  that its optional style is the same rule (whitespace variants only). Anything else stops it.
- **Shadow test before writing:** all 56 published pages, each loaded as served and with the change swapped in.
  - `?utm_source=facebook&…&fbclid&gclid`, desktop 1440 + phone 390, all measures: tracker requests (answered locally),
    dataLayer, console errors, computed styles, visible text, links, `tel:` targets, the text of every phone element
    (nav, hero, footer, bottom footer, `.dynamic-phone`, sticky bar), cookies, and the fields the form POSTs
    (form walked; POST answered locally).
    **112/112 identical.** Two pages showed a 0.015–0.03 px sub-pixel width change once, and were identical on 2 re-runs
    each. The embed wrapper, an empty `div.w-embed` holding only a script, is left out of the style comparison.
  - The phone matrix at 390 px (where the sticky bar exists) for `utm_source` = google, meta, bing, and a visit without
    parameters: **56/56 identical for each source.**
- **After writing:** the site footer read back byte-identical to the built file.
- **After publishing:** the served HTML of all 56 pages equals the pre-change HTML minus the embed, with the new footer,
  byte for byte (**56/56**, ignoring the publish stamp).
- **Live run** (saved pre-change page vs live page, the same measures as the shadow test): **112/112 identical** (all measures, both widths, the form payload on 52/52), and the phone matrix for google, meta, bing and no parameters is **56/56 identical for each source**.
- **Rollback:** the old footer and each page's embed are saved; REVERT.md.

## Questions for the reviewer
1. Can the move from a body-top embed to the start of the site footer change behaviour? Consider the timing of the three
   DOMContentLoaded listeners, the body scripts in between, and the PBI-05 sticky-bar code, which runs on `load`.
2. Is the slug lookup `pathname.replace(/^\/+|\/+$/g, '')` right for every real URL form: trailing slash, query string,
   hash, the home page `/`? Is the `'*'` fallback a sensible default for a future page that is not in the table?
3. Any risk from the table living on `window` (`window.CREDO_PHONES`)?
4. Anything else lost by removing the embed from the pages?
