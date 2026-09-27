# Review packet: PBI-01 · Consolidate and clean the page code

## Context (fixed)
- Site: a law firm's lead-generation landing pages, built in Webflow. Work happens on a **staging clone** only:
  Webflow site `6ab90fb0761d44332faf21c8`, whose only domain is `staging.credolegal.com`.
- Production (`start.credolegal.com`) and the developer's staging (`enroll.credolegal.com`) are separate Webflow sites
  and must not change. Shared accounts (GTM, GA4, formspree, Clarity/Mouseflow, call-tracking numbers) must not change.
- Each page has "page custom code" (head and footer blocks). There is also "site custom code" (head/footer) loaded on every page.
- The staging project has 56 pages: 30 new-design landing pages, 13 state pages, 6 old landing pages, home, letter,
  medical-debt-attorney, thank-you, 401, 404 and a CMS template. Live pages with page code: 53.

## Audit items this PBI addresses
- **L1** `multi-step.js` (Videsigns library, loaded `@latest` from jsDelivr) throws "multistepForm is null" and POSTs to `videsigns-staging.co.uk/counter`.
- **G30** GTM included twice (a bare `gtm.js` loader plus the standard snippet).
- **G31** Dead and overlapping code (duplicate UTM scripts, validators for elements that do not exist, Font Awesome with no icons, a year-swap script).
- **W1** Move shared page code into Site settings so later fixes are one edit.

## What changed (published to staging only, 27 Sep)
Code removed, with every removal matched against its exact expected text (a page was changed only if all its removals matched):

| # | Removal | Pages |
|---|---|---|
| R1 | Bare duplicate GTM loader `<script async src=".../gtm.js?id=GTM-PTLMPVGH">` (the standard GTM snippet stays) | 52 (all live pages that had it) |
| R2 | Font Awesome stylesheet | 31 (30 landing pages + home) |
| R3 | `multi-step.js` | 31 |
| R4 | Page-footer script copying utm_*/gclid from the URL into localStorage (duplicate of cookie scripts) | 31 |
| R5 | Formatter for `#phone-number` and `#dob` | 31 |
| R6 | `checkFormValidity` block (targets `#submitBtn`, `#msgphone`, `#msgemail`, `#msgzip`) | 31 |

Unchanged on purpose: the site-level head/footer code; the page-footer script that sets utm cookies on `.credolegal.com`;
the script that appends stored UTMs to links; the ctaheading/callustext scripts (belong to later design PBIs).

Whitespace in the rewritten blocks was tidied (trailing spaces, runs of blank lines).

## Evidence
1. **Element presence** (served HTML, all live pages): on the 30 landing pages and home, 0 pages have `#phone-number`, `#dob`,
   `#submitBtn`, `#msgphone`, `#msgemail`, `data-form="multistep"`, `#clicktocall*`, or Font Awesome icon classes.
   On the other 21 live pages (state, old landing, letter, medical-debt-attorney) these elements **do** exist, so R2–R6 were **not** applied there.
2. **Shadow test before writing** (3 landing pages + home + ohio + letter; Chromium desktop, WebKit iPhone 15, Firefox desktop):
   each page loaded twice, published code vs proposed code swapped into the served HTML.
   - Landing pages + home: "multistepForm" error gone; calls to videsigns-staging 2 → 0; GTM loaded once with the `gtm.js` event
     (in Firefox the duplicate had loaded GTM twice); phone number for `utm_source=meta` unchanged; `#utm_source` field and cookie
     unchanged; `#gclid` field unchanged; form walk reaches the submit button (never pressed) unchanged.
   - Only visible difference: an invalid ZIP ("123") used to show two messages ("Please enter valid 5 digit zip code" and
     "5-digit zip code is required"); now it shows the first only. A valid ZIP shows none, before and after.
   - ohio / letter (R1 only): identical behaviour except GTM loads once in Firefox.
   - Remaining script errors come from Cloudflare Turnstile and the Trustpilot iframe, identical before and after.
3. **After publishing:** all 83 rewritten blocks are served byte-for-byte as intended (83/83); duplicate GTM line on 0 pages;
   `multi-step.js` on exactly the 21 old-form pages.
4. **All 52 changed pages** (Chromium, `?utm_source=meta&utm_campaign=pbi01test&gclid=TESTGCLID`): HTTP 200; `#utm_source`,
   `#utm_campaign`, `#gclid` filled; `utm_source` cookie set; GTM requested exactly once with the `gtm.js` event: 52/52 pass.
   Calls to videsigns-staging: 0 from landing pages + home; still present on the 21 old-form pages.
5. **Isolation:** all 30 pages on enroll.credolegal.com and start.credolegal.com hash identically to their fingerprints taken before the
   first change. Publishing named only the staging domain. The site's only custom domain is staging.credolegal.com (re-checked before each publish).
6. **Full cross-browser run** on the 30 landing pages (8 devices, form walk, phone numbers per utm_source vs the campaign sheet): see RESULTS below.

## Conclusions to challenge
1. R1–R6 remove only code that is dead or duplicated on the pages they were applied to.
2. No tracking was lost: GTM, the UTM/gclid hidden fields, the utm cookie, and the phone-number swap work as before.
3. The form still works end to end up to submit on all landing pages and devices.
4. Nothing outside the staging site changed.
5. W1 (moving shared code to Site settings) should **not** be done yet: Site code loads on every page, and 7 pages currently load
   no GTM (thank-you, 401, 404, CMS templates). Moving GTM site-wide would start firing it on the thank-you pages, which could
   double-count conversions if GTM counts thank-you page views. GTM's configuration is not visible to us.
6. Consolidating the three UTM mechanisms (site-head cookies on the exact host; page-footer cookies on `.credolegal.com`;
   site-footer localStorage + URL rewrite) should be a separate item with its own tests, because cookie domain and return-visit
   behaviour (and therefore the phone number shown) depend on them.
7. The 21 old-form pages keep `multi-step.js` and its call to videsigns-staging; removing it would break their forms.
   Fixing that means rebuilding those pages in the new design (or replacing the library), which is outside this PBI.

## RESULTS: full cross-browser run after publishing (30 landing pages × 8 devices; lpcheck, same tool and settings as the baseline run before any change)
- Pages that failed to load: 0 (baseline: 0).
- Phone numbers vs the campaign sheet (no utm_source on 8 devices; google/meta/bing on 2 devices): 344/344 match (baseline: 344/344).
- Form walk (fills test data, never submits): reached the submit button in 240/240 runs (baseline: 240/240).
- Resolved vs baseline, on 30/30 pages: "multistepForm is null" script error in Chromium, WebKit and Firefox; calls to videsigns-staging.co.uk.
- New vs baseline: none, except Tidio sound files (tururu.mp3 / notification-sound.mp3) failing to load in some runs; these vary run to run and also appeared in the baseline.
- Accessibility, layout, SEO and other findings: unchanged (addressed by later PBIs).
