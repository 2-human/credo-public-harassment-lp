# PBI-30 · Resolution of the independent review (GPT-5.5, 30 Sep)

Verdict: **Code · GPT:** approve with fixes. No UX review: the badges look the same; they appear on the visitor's first
scroll/tap or 5 s after load, below the first screen. **Gemini: not run** (API credits depleted, HTTP 402).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 2, 10 | No-JS visitors and crawlers do not get the seal / Trustpilot (GPT 2, 10) | Accepted, not changed. Trustpilot never worked without JavaScript (it is a script widget; its fallback link to the Trustpilot profile stays in the HTML). The BBB seal keeps its link to the BBB profile and its alt text; only the image waits for the trigger. Google renders JavaScript; the form itself needs JavaScript, so a no-JS visitor cannot convert either way. |
| 9 | `w-script` class removed (GPT 9) | Searched: the site CSS and our site code never use it; the only "w-script" hit in webflow.js is inside the word "allow-scripts". Nothing depends on it (the same happened in PBI-23 without effect). |
| 3, 12 | Inline copies vs the still-registered scripts; site-wide scope (GPT 3, 12) | Recorded in the change log and REVERT.md: the inline copies in the site footer are now the only source; the registered scripts stay registered but unapplied (edit the footer, not the registered scripts). The footer runs on all 56 pages, as the registered scripts did; the system pages were in the tests (the form-wrap script finds no form there and does nothing, as before). |
| 1, 11 | Trustpilot after load; trigger coverage (GPT 1, 11) | Tested live and in the shadow: both widgets render after the idle timeout and after a scroll, on landing page and home; one bootstrap per page; no console errors (PBI-23 check pattern). The trigger is the one reviewed in PBI-28 (incl. key press). |
| 8 | Taller screens may show a badge in the first screen (GPT 8) | Then it appears within 5 s or at the first interaction; its box is reserved (fixed 150 px / 384×80), so nothing shifts. |
| 13 | Trustpilot impressions (GPT 13) | Trustpilot now counts an impression only when the widget loads (after a scroll/tap or 5 s), so bounces that never scroll no longer count. Noted for the operator; the widget's display is unchanged. |
| 4–7, 14 | Submission, phones, tracking, coverage, metrics (GPT 4–7, 14) | No test lead until D1 (standing rule). The functional compare covers payload, dataLayer (the inlined FormSubmitDataLayer wraps the form exactly as before), phones and cookies. Performance: the packet claims only the request counts (88 → 47), not a Lighthouse change. |

**Status: settled** (Gemini pending: credits).
