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
