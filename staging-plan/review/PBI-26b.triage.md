# PBI-26 final step (Credo Mono) · Resolution of the independent reviews (GPT-5.5, 30 Sep)

Verdicts: **Code · GPT:** approve with fixes. **UX · GPT** (hero before/after at 390@3x): approve with fixes.
**Gemini: not run** (API credits depleted); to be re-run once topped up.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Font source, variable range, md5 asserted (Code 1, UX 1) | Published stylesheet `@font-face`: `font-family: Credo Mono; src: …/6abd7153b387a989f38d2780-CredoMono-Inconsolata-latin.woff2; font-weight: 200 900; font-display: swap` (`site-css-after-81faeee5f.css`). Variable: rendered ink grows smoothly 200→900 (a static face would plateau). md5 of the uploaded file = Google's v37 latin file (c933a93e…); the CDN returns 29,020 bytes. |
| 2 | 60-class list and breakpoint audit not shown (Code 2, UX 2) | `inconsolata-classes.json` (backup) lists the 60 classes with every property path that named Inconsolata: all at the base breakpoint only. After: a style query for `font-family` containing Inconsolata returns 0 classes; the published CSS has 0 rules naming it. |
| 3 | Embeds not grepped separately (Code 3, UX 3) | Served HTML of all 56 pages after: 0 mentions of `Inconsolata` (before: 11 on each form page = 10 in the 4 embeds + the loader line, 1 on system pages). Site head/footer code: 0 mentions. |
| 4 | Same-named copies: references by custom code (Code 4, UX 4) | Checked: `zz-unused`, `mjf-tmp`, `tmpa` appear in no served page and no site code. The live elements keep the original class names (home and landing pages `mjfdcpaboxtext-copy-copy`, both thank-you pages `callustext-copy`), so the two PBI-15 head rules that target them still match. Element compare on all 56 pages covers the result. |
| 5, 13 | Combined publish with Clean up and bot protection; Clean up risks (Code 5, 13) | Both are operator decisions made in the Designer the same evening; a Webflow publish always carries the whole project, so they could not be separated. Covered: all 56 published pages (the complete surface: 51 landing pages, home, 4 system pages; the 2 CMS templates render as /page/thank-you and /page/already-submitted, the Know-your-rights items are unpublished) × 1440/390 element compare; the form walk opens the hidden steps 2–3 (pop-up); webflow.js interactions run in every compare. |
| 6 | Asset contents, not only references (Code 6) | Stylesheets compared directly (before 229.5 KB → after 116.7 KB; the only rules naming a font changed as listed). webflow.js is Webflow's own rebuild on publish. |
| 7 | States and interactions (Code 7) | Form walk through all 3 steps on 5 page × width runs; submit pressed on 3 pages (answered locally); slider moved by the walk; sticky call button in every compare. Hover/focus colours are class rules not touched by this item. |
| 8, 14, 15 | Tracking, phone swap, pixels (Code 8, 14, 15; UX 14) | Saved-vs-live functional compare with campaign parameters (utm, fbclid, gclid), 4 pages × 2 widths (`shadow-live.log`): tracker requests, dataLayer, `tel:` links and swapped numbers, visible text, links and cookies identical. The header phone button is one `tel:` link (the whole red button). Real pixel delivery stays untested by design (shared accounts). |
| 9 | No real end-to-end submission (Code 9) | Standing rule: no test lead until D1. The payload is identical except `cf-turnstile-response` (23 bytes, empty value), which Formspree never read. |
| 10 | Bot protection off: spam (Code 10) | The operator's decision (P3, 30 Sep; M4). Formspree keeps its own spam filtering. |
| 11 | Home `sizes="100vw"` (Code 11, UX 6) | **Measured and open.** Photo bytes on home, before → after: 1440@1x 29 → 87 KB, 810@2x 34 → 87 KB, 390@3x 72 → 87 KB. The photos are lazy-loaded and below the fold (no effect on first paint/LCP). Cause: Webflow no longer derives a width for these absolutely positioned images (stylesheet rules of the images and their parents are unchanged); the API rejects a `sizes` attribute, and re-applying the class and republishing did not change it. Raised on the board for the operator's Designer check. Landing pages are not affected. |
| 12 | Old Inconsolata font records (Code 12) | Waiting for the operator's OK to delete (destructive). |
| 16 | Lighthouse not conclusive (Code 16) | Agreed; the packet already says so. The measured parts are the request/byte removals. |
| 17 | Weight change sign-off (Code 17, UX 9) | The operator chose option (a) before the change. |
| 18 | Deployment boundary (Code 18) | Staging project only; start and enroll are separate Webflow projects, never changed; published to staging.credolegal.com only. |
| UX 13 | Trust signals near the form | Out of scope (copy/design); the page has the trust strip, reviews, stats and the disclaimer below the hero. Logged for the design system. |

**Status: settled** (open: home `sizes`, operator Designer check; old font records, operator OK; Gemini pending credits).
