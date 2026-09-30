# Review packet: PBI-24 · close-out (staging.credolegal.com)

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
- 27–30 Sep: about 25 backlog items changed the staging project (code clean-up, shared components, form fixes,
  copy, SEO/schema, colour/contrast, type, layout, headings, script clean-up). The start and enroll projects were
  never changed. PBI-24 proves the result against the 27 Sep baseline and records every change.

## What was done
1. **Full lpcheck** (the project's cross-browser checker: 8 device profiles in Chromium, WebKit and Firefox;
   JavaScript errors, failed requests, sideways scrolling, axe accessibility with WCAG 2.2 AA tags, tap targets, small
   text, form walk (never submits), phone numbers per ad source, links, SEO, Lighthouse) on the same 30 staging landing
   pages as the 27 Sep baseline. Comparison script: `tools/webflow/pbi24-lpcompare.py`; output: `PBI-24-lpcheck-compare.txt`.
2. **One fix found by it and applied**: footer links (class *Link 3 Copy*) were 23.6px tall on iPad in WebKit, under
   the 24px minimum tap size (axe `target-size` on "terms & conditions", which sits under a wrapped link). PBI-19 had
   set 4px padding, which Chromium draws at 24px. Base padding-top/bottom 4px → 5px; the phone breakpoint's own
   values were not touched. Published stylesheet diff: that one rule only.
3. **Change log per item**: `CHANGELOG.md` (what changed, where in Webflow, how to revert, reviews), 27 items.
4. **Clarity payload capture** on the published form (open follow-up from PBI-04's review): `tools/webflow/pbi24-clarity.mjs` on **all 52 form
   pages** at phone width (390). Each page loads with GTM, so Clarity starts as for a real visitor; the form is walked
   to its last step (never submitted), then first name, last name, phone and email are typed by keyboard with unique
   markers. Every Clarity upload is captured and **answered locally** (nothing reaches the shared account), decoded
   (gzip), and searched. Result **52/52**: Clarity active, 5–6 uploads per page, the page URL found in the uploads
   (decoding works), **no marker found** (`zqx…`, `5550177`, `555-0177`, `0177`), the H1 text **is** recorded (text
   capture works) while a form text inside the `data-clarity-mask` wrapper ("We currently do not service DC, DE, …")
   **is not** (the mask works, not only Clarity's default input masking).
5. **Found (shared GTM container, not changed; D27):** GTM custom-HTML tag 55 runs
   `window.uetq.push("set",{pid:{em:"contoso@example.com",ph:"+14250000000"}})`, Microsoft's sample values for
   Microsoft Ads enhanced conversions, for every visitor (seen in the page and in the public gtm.js).
6. Not done: the domain-switch task (robots, canonical and og:url for the final domain) waits on D16 and D21.

## Evidence (baseline 27 Sep → close-out 30 Sep, 30 pages)
- Issues: critical 0 → 0; **major 245 → 106**; **minor 211 → 88**; notes 60 → 60.
- Gone on every page they affected: 3 script errors (multi-step.js), calls to videsigns-staging.co.uk, "form elements
  must have labels", phone field opening the letter keyboard, meta descriptions over 160 characters (27 pages),
  sideways scrolling, text under 12px on phones, tap targets under 24px (lpcheck's own check).
- New after the run: axe `target-size` on iPad only (item 2 above: fixed and re-checked, 25.6px, no violation), and
  a transient axe `color-contrast` hit on the iPhone profiles for an element with **empty text** (#fff on a grey that
  differs per run, #e2–#ee: an element caught mid-animation; not reproducible on re-run). At baseline the contrast rule
  flagged 9+ real text elements on all 8 profiles; none remain.
- Still present: colour-contrast (the transient hit above), "duplicate element ids" on the 30 pages (lpcheck's own
  check): at baseline step-1/2/3, formstep2, Debt-Type ×6 and an empty id; now **only the empty id ×3**: three
  `<script id="">` elements that GTM's custom-HTML tags inject (Clarity/Bing loader, Bing UET, Meta pixel). Not
  page markup, harmless, Tidio files failing to load in the test (Tidio is blocked in
  tests: D8), titles over 60 characters (3 pages, copy), noindex (intended until go-live), malformed `href` handled by
  script (note).
- Unchanged passes on 30/30: page loads, form walk, phone numbers (344/344 rows correct, per ad source), links,
  cut-off text, covered buttons, covered screen, broken images.
- **Lighthouse** (mobile, lpcheck's run with 4 pages in parallel): score median 53 → 49, FCP 4.2 → 5.2 s, LCP 13.0 →
  12.6 s, TBT 427 → 460 ms. This measurement is noisy: a controlled run (one page at a time) of 10 of the pages gave
  FCP 4.6–5.7 s, and the same page moves up to 1.5 s between runs (e.g. debt-lawsuit-attorney 4.1 s in lpcheck,
  5.5 s controlled; multiple-collectors 6.4 → 4.1 s). Identical code measured 4.1 s (median of 3) and 4.6 s (single) a
  few hours apart. PBI-23 found the causes outside page code (web font path to the H1, GTM tags, Tidio, a second
  session recorder) and handed them to the operator.

## Questions for the reviewer
1. Does the evidence support "the staging pages are in a better state than the baseline, with no regressions"?
2. Is the Lighthouse reading (noise, not regression) justified, or is more measurement needed?
3. Is the change log complete and usable as a record (what changed, where in Webflow, how to revert)?
