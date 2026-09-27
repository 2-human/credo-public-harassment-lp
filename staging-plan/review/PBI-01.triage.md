# PBI-01 · Resolution of the independent review (GPT-5.5, 27 Sep)

Verdict received: **approve with fixes** (0 blockers, 8 should-fix, 6 notes). Follow-up tests: `regression-test.mjs`,
before/after on the published pages (old code swapped back in vs code as served), Chromium desktop + WebKit iPhone 15,
pages: 2 landing pages, home, ohio, letter, payday-loan-debt-rights, medical-debt-attorney.

| # | Finding | Resolution |
|---|---|---|
| 1 | R6 was not fully dead: `#msgzip` exists; invalid ZIP now shows one message instead of two | **Agreed.** `#msgzip` exists on 30/30 landing pages (omitted from the evidence list). Accepted as a behaviour change pending the operator's OK. |
| 2 | Return visits / localStorage (R4) not tested | **Tested: identical.** Visit with UTMs, then revisit without: phone links, hidden fields, cookies, stored localStorage keys, rewritten link and URL identical before/after. |
| 3 | Only the GTM container was checked, not tags | **Tested: identical.** Every request to analytics/ads/recorder hosts compared before/after: same set on all pages, except one GTM diagnostics ping (`googletagmanager.com/td`) on home in Chromium that appeared only before (side effect of the double GTM load). dataLayer event names identical. |
| 4 | Phone numbers on the 21 old pages not covered | **Tested: identical** on ohio, letter, payday-loan-debt-rights, medical-debt-attorney (desktop + iPhone). |
| 5 | No real submission | **Agreed, blocked on D1.** A real submit goes into the production lead pipeline until staging's form destination is decided (PBI-02). |
| 6 | Shared accounts / analytics side effects | Only Webflow staging writes were made (site and page code, page drafts, CMS unpublish, publish to the staging domain). Automated tests answer all form posts and analytics beacons locally. |
| 7 | `.credolegal.com` cookies from staging reach production in the same browser | **Agreed.** Added to Guard rails as a testing caution: test staging in a private window, or clear credolegal.com cookies before visiting production. |
| 8, 9 | W1 deferral, separate UTM consolidation | Agreed; tracked as new backlog items. |
| 10 | "Removing multi-step.js breaks the old forms" unproven | **Tested: confirmed.** With the library, 1 of 2 form steps shows; without it, both steps show at once on all 4 old pages tested. |
| 11 | videsigns-staging call remains on 21 pages | Agreed; new backlog item. |
| 12 | Phone taps not tested | **Tested: identical.** Tapping the first visible phone link fires `gtm.linkClick` before and after; tel: targets and shown numbers match. |
| 13 | Old pages had lighter testing | Covered by 2–4, 10, 12 on desktop and iPhone. |
| 14 | Third-party errors not investigated | Agreed; out of scope, unchanged by this PBI. |
