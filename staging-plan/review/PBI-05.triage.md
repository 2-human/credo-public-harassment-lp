# PBI-05 · Resolution of the independent review (GPT-5.5, 27 Sep)

Verdict received: **approve with fixes** (0 blockers, 7 should-fix, 5 notes). One code change came out of it; the rest was
settled with extra tests (`sticky-test2.mjs`, business-hours clock, proposed code swapped in before writing).

| # | Finding | Resolution |
|---|---|---|
| 1 | Only 4 phone sizes tested; landscape, zoom not covered | **Added** iPhone SE landscape (667×375): the card starts below that short screen, so the bar shows until the card scrolls into view and never covers a button. Zoom/in-app browsers remain untested; noted. |
| 2 | Without IntersectionObserver the bar always shows, over the form | **Fixed.** Older browsers now use the same rule, measured on scroll. The first attempt used `'IntersectionObserver' in window`, which the test showed is true even when the feature is unusable (the bar then never appeared); changed to `typeof window.IntersectionObserver === 'function'`. With and without IntersectionObserver: identical results on all phones tested. |
| 3 | Conclusion 2 fine for meta | Agreed. |
| 4 | Bar number only checked for `utm_source=meta` | **Tested:** no source, google, bing, meta: the bar always carries the same tracked number as the page's hero link (e.g. stop-calls: google and none (201) 416-7080, bing (201) 535-3725, meta (612) 256-8820). |
| 5, 6 | Site-wide code; pages without a bar not checked | **Tested:** all 26 other published pages (13 state, 6 old landing, letter, medical-debt-attorney, thank-you, 401, 404, /page/thank-you, /page/already-submitted) on iPhone and desktop in business hours: all HTTP 200, the new code loads and does nothing, 0 errors from it, no bar. |
| 7 | Form not walked while the bar exists | **Tested:** in business hours with the bar present, the form walk reaches submit on every page and phone tested. A real submission waits on D1. |
| 8 | Tapping the bar not tested | **Tested:** tapping the visible bar fires `gtm.linkClick`, the same event as the other phone links. |
| 9 | Depends on `#openstep2`/`#mjSlider` and today's structure | Documented in the code comment and here; if either id is missing the bar behaves as before (shown). |
| 10, 12 | Isolation; porting to production | Only the staging site's footer code was written, published to the staging domain; enroll and start fingerprints unchanged. Any later port of site-wide code to production gets its own review. |
| 11 | Global CSS could hit other elements with that class | **Checked:** `.sticky-call-button` appears only in the pages' own phone-swap script (the bar it creates) and not in the site stylesheet. |

## Second code review · Gemini 3.1 Pro (28 Sep, on the final v2 packet)

Verdict: **approve** (0 blockers, 0 should-fix, 6 notes).

| # | Finding | Resolution |
|---|---|---|
| 5 | 768px (tablet portrait) not tested; the bar is created up to `innerWidth <= 768` | **Tested 28 Sep:** iPad Mini (WebKit, 768×1024) and 768×1024 Chromium × 4 pages (debt-lawsuit-attorney, debt-harassment-stop-calls, home, credit-cards), business hours: 8/8 hidden at load, shown when scrolled, hidden at top, hidden with the pop-up open, shown after closing; no covered button; tracked numbers kept. |
| 1–4, 6 | Conclusions 1–4 supported; no untested breakage found | No action. |

## UX reviews · GPT-5.5 and Gemini 3.1 Pro (28 Sep, 6 iPhone 15 screenshots before/after, packet `PBI-05-ux.md`)

Verdicts: **GPT approve with fixes** (0 blockers, 5 should-fix, 6 notes) · **Gemini approve** (0 blockers, 0 should-fix, 6 notes).
Both confirm from the screenshots that the bar covered the form before and no longer does.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Screenshots show only the top of the step-1 card and pop-up (GPT 2) | Covered by measurement rather than pictures: the 155-run test checks whether the bar covers step-1 "Continue" and step-2 "Continue" at every state; 0 covered. |
| 2 | Tap-to-call not proven by screenshots (GPT 3, 10) | Tested earlier: the bar is a `tel:` link with the page's tracked number, and tapping it fires `gtm.linkClick`. iPhone safe-area spacing is not changed by this item. |
| 3 | When visible, the bar covers a line of page text (GPT 6) | **Accepted.** New task in PBI-19 (small polish): add bottom padding while the bar is visible, so the end of the page is never hidden under it. |
| 4 | On iPhone 15 the step-1 "Continue" is below the first screen (GPT 5) | Accepted; caused by the oversized mobile H1 (52px). Fixed by PBI-16 (H1 32px on phones), which moves the form up. |
| 5 | Inactive step labels ("YOUR SITUATION", "YOUR DETAILS") small and pale (GPT 7) | Already planned: PBI-15 (contrast) and PBI-16 (labels to 12px). |
| 6 | Bar copy "Is your debt situation becoming urgent?" is pressure-toned (GPT 9) | Copy question for the operator; noted with the CTA-label decision D3. |
| 7 | No slider track visible on the first screen (Gemini 6) | The slider sits just below the fold on iPhone 15; same fix as #4 (PBI-16). |
| 8 | Only one page shown (GPT 11) | The 155-run test covers all 31 pages with a bar. |

**Status: settled** (two follow-ups placed on the board: PBI-19 bottom padding; PBI-16 already covers #4, #5, #7).
