# PBI-26 follow-up (font preload) · Resolution of the independent review (GPT-5.5, 1 Oct)

Verdict: **Code · GPT:** approve with fixes. No UX review: nothing visible changes except that the hero no longer moves.
**Gemini: not run** (API credits depleted).

| # | Finding | Resolution |
|---|---|---|
| 1, 3, 10 | Measured on few pages / one set-up | Live CLS measured on the 3 page types (landing page ×3 incl. a state page and /letter, home, thank-you): 0 in 15/15 runs. All 51 landing pages share the same LP components, so the hero is the same markup everywhere. |
| 2 | Attribution to PBI-26 | Not a PBI-26 claim to rely on: the point is only that the shift pre-dates it (saved pre-PBI-26 page: 0.283 ×3). |
| 4 | 56-page diff method | Served HTML of all 56 pages before vs after, normalised for the stylesheet/webflow.js hashes, integrity attributes and publish time: 56/56 identical once the two preload lines are removed; both lines present on 56/56 (`2026-10-01-preload/served-before`, `served-after`). |
| 5, 11 | Other browsers | WebKit (Safari's engine) and Firefox, landing page and thank-you: each font requested once, both fonts loaded, 0 warnings. |
| 6 | Credo Mono preloaded on every page | Credo Mono is above the fold on every page: the hero card (form steps, labels, slider, phone) on the 52 form pages and the "✓ Request received" label at the top of the thank-you pages. Without the preload it is fetched anyway, only later. |
| 7 | Hard-coded URLs go stale | Recorded in REVERT.md and the change log: replacing a font file in Site settings changes its URL; update the matching line. Webflow has no setting to generate preloads. |
| 8 | Site-level code, staging only | The staging project is its own Webflow project (start and enroll are separate projects, never changed); published to staging.credolegal.com only. |
| 9 | Tracking, phones, forms | Saved-vs-live functional compare (campaign parameters), 4 pages × 2 widths: tracker requests, dataLayer, `tel:` links and swapped numbers, text, links, cookies and form payload identical. The only rows flagged were the computed margin of `container-40/41` at 1440; the boxes' actual position and width were measured identical at 1280/1440/1920/2560 (Chrome reports these auto margins as 0 or the used value from run to run). |
| 12, 13 | Headers, CSP | Both URLs: 200, `font/woff2`, `Access-Control-Allow-Origin: *`, `Cache-Control: max-age=31536000`. The site sends no Content-Security-Policy header. |

**Status: settled** (Gemini pending: credits).
