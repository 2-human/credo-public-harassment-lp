# PBI-01 · Resolution of the independent review (GPT-5.5, 27 Sep)

Verdict received: **approve with fixes** (0 blockers, 8 should-fix, 6 notes). Follow-up tests: `regression-test.mjs`,
before/after on the published pages (old code swapped back in vs code as served), Chromium desktop + WebKit iPhone 15,
pages: 2 landing pages, home, ohio, letter, payday-loan-debt-rights, medical-debt-attorney.

| # | Finding | Resolution |
|---|---|---|
| 1 | R6 was not fully dead: `#msgzip` exists; invalid ZIP now shows one message instead of two | **Agreed.** `#msgzip` exists on 30/30 landing pages (omitted from the evidence list). Accepted by the operator on 27 Sep (D12). |
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

## Second code review · Gemini 3.1 Pro (28 Sep)

Verdict: **do not approve** (1 blocker, 2 should-fix, 2 notes). The blocker: the form was never actually submitted, and
the removed scripts (validation, formatting, the multi-step library on the new pages) could have changed what a submit sends.

| # | Finding | Resolution |
|---|---|---|
| 2 | **Blocker:** actual form submission not tested | **Tested 28 Sep without sending a lead** (`tools/webflow/submit-capture.mjs`): on every page with a lead form (52 pages: 30 landing pages + home + the 21 old-form pages) × iPhone 15 (WebKit) and desktop Chrome = 104 runs, the form was filled with test data, **submit was pressed**, and the outgoing request was captured and answered locally (nothing reached formspree). **104/104** sent exactly one POST to the form's endpoint `formspree.io/f/xzzyzzwj`, with every field of the form; `utm_source`, `utm_medium`, `utm_campaign` and `gclid` from the URL arrived in the request on 104/104. New form: 21 fields; old form: 20 fields (17 on 6 pages, see note). Field names per page: `PBI-01.submit-test-iphone.json`, `PBI-01.submit-test-desktop.json`. What remains untested is formspree's own handling and the redirect to the thank-you page; that needs a real test lead and waits on **D1**. |
| 3 | Old-form pages not form-walked | Covered by the same test: all 21 old-form pages walked and submitted on both devices (21/21 × 2). |
| 4 | Removing the localStorage UTM copy (R4) could break something that reads localStorage | Checked in the served code of all 57 pages: the site-wide footer script (not changed by PBI-01) itself saves `gclid` and the `utm_*` keys from the URL into localStorage and reads them back (it re-appends them to the URL on later pages). R4 was a per-page copy of that same write, so the stored values are unchanged (the copy remains on the 23 pages R4 did not cover). The form's UTM fields are filled from the URL (`fs-queryparam-name`), and the submit test above shows the values arriving in the request. GTM's own variables cannot be seen from here (shared account); PBI-01b (one UTM mechanism) keeps the question open for the GTM owner. |
| 5 | The call to videsigns-staging.co.uk stopped on the landing pages | Intended (the audit's L1): it was the multi-step library's usage counter on a third-party staging server; it still runs on the 21 old-form pages until D11. |
| 1 | Conclusions 1, 2, 4–7 supported | No action. |

**Note found by the submit test (not caused by PBI-01):** on 6 old pages (debt-harassment-act-fast, multiple-collectors-more-money,
payday-loan-debt-rights, payday-loan-fight-back, payday-loan-lawsuit-proof, payday-loan-lawsuit-respond) the form has no
`gbraid`, `wbraid` or `fbclid` fields, so those click ids are never sent. Added to **PBI-08** (capture the Meta click id).

**Status: settled.** Gemini's blocker is answered by the submit test; the real end-to-end lead stays with D1.
