# PBI-13 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 30 Sep, two rounds)

Verdicts (round 2): **Code · GPT:** approve with fixes. **Code · Gemini:** approve with fixes. Round 1: GPT approve with
fixes; Gemini do not approve (suspected literal "{State}" on the state pages; prototype files not verified).
No UX review: only `<head>` meta tags changed.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | State pages might serve a literal "{State}" (r1: Gemini blocker) | Not the case: each state page's text carries its own state name; the served check matched the exact expected text on 13/13 state pages (and on all 44 changed pages). |
| 2 | Prototype files not verified (r1: both) | 28/28 prototype pages carry exactly the approved text; `content-state.js` sets the per-state text at load (checked) and the generic text for /letter. |
| 3 | "Illegal contacts can add up to statutory damages" still implies per-contact accumulation (r2: Gemini 2, GPT 7) | **Fixed** (narrower than the approved D23 text, flagged to the operator): multiple-collectors-more-money now reads "Several collectors calling? Each one that breaks the FDCPA can owe you damages. Our attorneys track every violation. Free case evaluation." (138). Prototype updated first; served description, og and twitter tags verified. |
| 4 | Publish scope (r1: GPT 3) | Publish calls name only staging.credolegal.com (Webflow subdomain off); the live start site is a separate project, never changed. |
| 5 | Runtime checks (r1: GPT 5–8; r2: GPT 11–14) | Only head meta tags changed (served diff: exactly 6 lines on 44 pages). Runtime spot check on 6 pages × 2 widths: form walk, payload, trackers, dataLayer, cookies, phones, links, styles identical 12/12. Real submission waits on D1. |
| 6 | Cease-letter wording, state names, NY disclaimer (r1/r2: GPT) | Operator-approved copy (audit texts + D23); the cease-letter wording matches the approved audit texts and the pages' own copy; the state pages already name the state on the page; the disclaimer is on every page (footer) and cannot fit a 160-character description. |
| 7 | Accounting of unchanged pages (r2: GPT 4) | 12 unchanged: 8 landing pages already ≤160 (collection-defense, credit-cards, medical-debt-attorney, payday-loan-debt-rights, payday-loan-fight-back, payday-loan-lawsuit-proof, payday-loan-lawsuit-respond, stop-wage-garnishment) and the 4 system pages; longest description on any page: 159. |

**Status: settled.**
