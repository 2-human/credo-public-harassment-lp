<!-- reviewer: gemini-3.1-pro-preview · 2026-09-29T17:12:44.065Z · 106s · images sent: 0 · usage {"promptTokenCount":13370,"candidatesTokenCount":1215,"totalTokenCount":26418,"promptTokensDetails":[{"modality":"TEXT","tokenCount":13370}],"thoughtsTokenCount":11833,"serviceTier":"standard"} -->

| # | Severity (blocker / should-fix / note) | Finding | Evidence or reasoning | Suggested check |
|---|---|---|---|---|
| 1 | note | Resolution 1 is supported | The board state correctly shows PBI-12 open, blocked on D20, with a new task to apply the operator's answer. | n/a |
| 2 | note | Resolution 2 is supported | PBI-08 is blocked on M3, and the CRM check task is explicitly marked as `[todo]`. | n/a |
| 3 | note | Resolution 3 is supported | D4 clearly separates the 4 payday-loan pages (rebuilt) from the 4 payday-content pages (deferred in PBI-21). | n/a |
| 4 | note | Resolution 4 is supported | D10 description is updated to state it no longer blocks PBI-01d and is optional. | n/a |
| 5 | note | Resolution 5 is supported | PBI-14's task indicates the `@handle` was dropped in P1, and D9 now focuses on `sameAs`. | n/a |
| 6 | note | Resolution 6 is supported | PBI-24 correctly scopes the Clarity payload capture to the published form only. | n/a |
| 7 | note | Resolution 7 is supported | Logic regarding the number of cards vs pages with cards matches the prototype and board state. | n/a |
| 8 | note | Resolution 8 is supported | Measurements (38px on all pages at both breakpoints) are documented. | n/a |
| 9 | note | Resolution 9 is supported | PBI-01d P1/P2 explicitly state form payloads were verified with `fbclid` on all 52 form pages. | n/a |
| 10 | note | Resolution 10 is supported | Script output is provided confirming the board data passes validation. | n/a |
| 11 | note | Resolution 11 is supported | The varying counts are logically explained by their subsets (published, forms, staging, etc). | n/a |
| 12 | note | Resolution 12 is supported | PBI-01d P2 documents a default fallback row `*`, preventing a silent failure if a slug is missing. | n/a |
| 13 | note | Resolution 13 is supported | End-to-end items are appropriately tracked in their own board rows (D1, D6, L2, etc.). | n/a |
| 14 | blocker | Hundreds of test leads sent to the live CRM (Outside Staging) | PBI-02 (Lead form destination) is `[todo]`, meaning Staging still posts to the live destination. Yet DS-7, PBI-07, and PBI-01c report running over 150 "real formspree posts". | Stop form testing on Staging until PBI-02 routes to a test endpoint. Clear test data from the live CRM. |
| 15 | blocker | Staging canonicals risk de-indexing the live site (Outside Staging) | D16 and D19 set staging pages to `noindex` while keeping canonicals pointed at the live domain (`start.credolegal.com`). Google can pass `noindex` directives across cross-domain canonicals, effectively de-indexing production. | Point staging canonicals to the staging domain, or block staging entirely via `robots.txt` rather than using meta tags. |
| 16 | blocker | Site-wide `noindex` will de-index live if deployed (Outside Staging) | P1 applied `noindex` to all 52 pages (D19). If these Webflow page or Site Settings are pushed to production, the entire live site will drop from search. | Confirm these tags will be reverted to `index` before any code or page is published to the live site. |
| 17 | should-fix | Tracking cookies leak from Staging to Live (Outside Staging) | PBI-01b notes the site uses `.credolegal.com` session cookies. Tests on `staging.` will set this cookie, which `start.` will read, polluting live analytics with test UTMs. | Scope staging tracking cookies strictly to the staging subdomain, or require testers to clear cookies between environments. |
| 18 | should-fix | Legacy form validation removed while drafts remain | D18 reports the `OldFormPhoneEmailGuard` script was removed, but M2 (deleting the 21 legacy drafts) is still open. If a draft is restored, its form validation will be broken. | Permanently delete the drafts (M2) or do not restore them without replacing the validation script. |
| 19 | note | Baseline UTM test on staging is corrupted | PBI-01b requires a baseline test on "current code", but PBI-08 already altered the staging cookie reader logic to take the "newest match". | Run the baseline UTM test matrix against the live site instead. |
| 20 | note | Custom call-tracking untested on new mobile header | PBI-06 added a mobile header call button. While GTM was tested, PBI-22 (Call-click tracker) is blocked, so the custom backend tracker's ability to catch this new button was not verified. | Test the custom call-click tracker with the new mobile header button once D6 is resolved. |

Overall verdict: do not approve
