# PBI-24 · Resolution of the independent reviews (GPT-5.5, 30 Sep)

Verdicts: **Code · GPT (close-out packet):** approve with fixes. **Change log · GPT (`PBI-24-changelog.md`, the full
log sent as its own packet, since the first reviewer could not see it):** approve with fixes. No UX review: the one
visible change is footer links 2px taller on desktop and tablet.
**Gemini: not run** (API credits depleted, HTTP 402); to be re-run once topped up.

## Close-out packet

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Scope: 30 landing pages only (GPT WD-1, Untested-4, Q1) | lpcheck's list is the same 30 pages as the 27 Sep baseline, so the comparison is like for like. The other 26 pages were covered by other checks today: the PBI-23 isolated compare on **all 56 pages** × 1440/390 (errors, text, dataLayer, form payload, phones, links, cookies, every element's style), the Clarity capture on **all 52 form pages**, and the Trustpilot/console check on all 52. |
| 2 | Tap-target fix: diff and class reuse not shown (GPT WD-2, Outside-2) | Published stylesheet diff (d35a5c349 → 9ffb643ec): exactly one line, `.link-3-copy { padding: 4px 7px }` → `5px 7px`. The class is used **only** by the six footer links on the 52 form pages (served HTML of all 56). Measured after: 26.0px in Chromium at 1440 and 810, 25.6px in WebKit iPad (no axe violation), phones unchanged at 25px (the phone breakpoint sets its own padding). |
| 3 | Change log not included (GPT WD-3, Q3) | Sent as its own packet (`PBI-24-changelog.md`), reviewed below. |
| 4 | Clarity only at phone width (GPT WD-4) | Repeated at **1440** on home, debt-harassment-stop-calls, california and /letter: 4/4 same result (no marker, masked text absent, H1 present). Real-account ingestion stays unverified by design (test data must not reach the shared account). Mouseflow masking is the operator's (manual row, D5). |
| 5 | GTM tag 55 sample values affect other sites (GPT WD-5, Outside-1, Untested-5) | Agreed: raised as **D27** for the operator (shared container; the start/enroll pages very likely run the same tag). Not changed by us. |
| 6 | "No regressions" too strong (GPT Q1) | Reworded: **better than the baseline within lpcheck's checks, with no functional regression found** (form walk, phones 344/344, links, loads all unchanged; the one new issue found was fixed). |
| 7 | Lighthouse not justified as noise (GPT Q2) | A controlled baseline cannot be re-measured: the 27 Sep state is gone. What is measured: identical code gave FCP 4.1 s (median of 3) and 4.6 s (single) a few hours apart, and single pages move up to 1.5 s between runs. The changes since the baseline mostly remove code (PBI-01, PBI-01c, PBI-09, PBI-23) or add CSS rules; the request lists compared in PBI-01 and PBI-23 show removals, and no item was found to add a third-party request. So no regression is shown, but it cannot be excluded to within 1 s. Recorded as the limit of this check. The known levers are the operator's (fonts, GTM tags, D5, D8). |
| 8 | Real submission not tested (GPT Untested-1, blocker) | Standing rule: no test lead until D1 decides where staging leads go (PBI-02). Every form test answers the POST locally. The payload itself was compared (identical) on all 52 pages in PBI-23. |
| 9 | Tracking end to end (GPT Untested-2) | Tracker requests, dataLayer and cookies compared on all 56 pages (PBI-23). GTM Preview needs the shared account (the operator's). D27 is the one GTM defect found. |
| 10 | Phone swap on all pages and sources (GPT Untested-3) | PBI-01d P2 checked all 56 pages × 4 ad sources. Today lpcheck got 344/344 rows correct, and the PBI-23 compare (with utm/gclid/fbclid on the URL) found identical numbers and `tel:` links on 56 pages. |
| 11 | Domain switch (GPT WD-6) | The PBI-24 task stays open on D16/D21. Added to it: the three thank-you pages have **no robots tag** (indexable; found while building the change log's current-state table). |

## Change log packet

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1, 8, 9 | Entries whose revert said "see packet" (GPT 1, 8, 9) | Each now has concrete steps. PBI-06b: remove Text Block 20's margin-bottom (the 27 Sep stylesheet has none) + the 29 pages' earlier HTML in the baseline backup. PBI-15/16: remove that item's rules from the head `<style>` block. PBI-19: `before-state.md` lists every earlier value with element ids. PBI-25: element maps give each heading's earlier tag, plus the two CSS files to remove. PBI-04 and PBI-07: current location and the step. |
| 2 | No canonical page list (GPT 2) | New "Current state" section at the top: the 56 pages by group (30 landing + 21 rebuilt, named + home = 52 form pages; 4 system pages), with the file holding the 30-page list. |
| 3, 5 | PBI-08 and PBI-24 status wording (GPT 3, 5) | PBI-08: "built and live; closes when the operator confirms the CRM side (M3, open)". PBI-24: "close-out done; its domain-switch task waits on D16, D21", named the same way under Open. |
| 4 | PBI-23 open parts (GPT 4) | Kept as "partly done", with each open part named: Tidio (D8), recorder (D5), and the operator's manual steps (fonts, minify, GTM Nextdoor timing). Owners are on the board's decision and manual lists. |
| 6 | Robots/canonical unclear (GPT 6) | Current-state table read from the served pages: 52 form pages `noindex, nofollow` with canonical and og:url = `start.credolegal.com/{slug}`; thank-you pages without robots; no sitemap; empty robots.txt. The PBI-01d line now says the self canonical was the state **then**. |
| 7 | Locations outdated after the components (GPT 7) | PBI-04 and PBI-07 now say where the attribute and fields live today: LP · Lead form and home's form (checked on 52/52 pages). |
| — | Head code has several authors | Added a note: the site head was changed by PBI-01d P1, PBI-08, PBI-09, PBI-14, PBI-15, PBI-16 and PBI-23. Revert one item by its own block; an old full `site-head-before.html` would undo later items. |
| 10, 11 | Final disposition of "do not approve" reviews; owners (GPT 10, 11) | Each item's triage file (linked in every entry) records the disposition. Owners and next steps are on the board (decisions D#, manual rows M#/L2/G#). The log links to both rather than copying them. |
| 12–16 | Test coverage (GPT 12–16) | Same answers as the close-out rows 1 and 8–10. The system pages (404, thank-you ×3) were in the PBI-23 compare (only difference: the removed `i.js` request; no errors) and the aligned style compare (0 differences). |
| 17 | start.credolegal.com references before go-live (GPT 17) | The domain-switch task covers canonical, og:url and robots. Added there: schema `url` (LegalService) and the thank-you pages' robots. |
| 18 | Repo tools (GPT 18) | Committed with their items (PBI-01d P5 and later). What each tool reads or writes is stated in its header comment and in the PBI-01d P5 packet (`lp-sync.mjs` writes page copy into component props on staging only; the check and extract tools are read-only). |
| 19 | Fingerprint evidence (GPT 19) | Paths added: `2026-09-27/fingerprints/start.sha256`, `enroll.sha256`. |

**Status: settled** (Gemini pending: credits).
