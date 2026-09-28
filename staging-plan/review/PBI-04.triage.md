# PBI-04 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Verdicts received: **GPT approve with fixes** (0 blockers, 8 should-fix, 5 notes) · **Gemini approve with fixes** (0 blockers, 2 should-fix, 3 notes).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | `/401` exception checked only in static HTML (GPT 1, 10) | **Checked at runtime (28 Sep):** loading `/401` in a browser requests no Clarity, Mouseflow or GTM host (it does load Optibase and Tidio, which are not session recorders). |
| 2 | Payload test scope unclear, one session only (GPT 2; Gemini 1) | Accepted as a limit of the 27 Sep test. The static check is the stronger evidence: all 73 lead forms, on both form types and both components, sit inside a masked element, and Clarity masks everything inside it. A payload capture on each form type (page form, `Hero-Form`, `Hero-Form-For-New-Pages`) is added as a close-out task (PBI-24). |
| 3 | Mouseflow still records (GPT 3; Gemini 3) | Known and already on the board as a **manual** item: Mouseflow masking is an account setting in a shared account, which we must not change. Decision D5 (keep Mouseflow or rely on Clarity) covers it. |
| 4 | "Nothing else changed" / layout not checked (GPT 4, 5; Gemini 4) | The only write was the `data-clarity-mask` attribute. **Checked:** the published site stylesheet contains no selector that mentions `clarity-mask`, so the attribute does not restyle anything; the 28 Sep screenshots of all 57 pages (design inventory) show every form rendering normally. |
| 5 | Form submission not tested (GPT 6; Gemini 2) | **Tested 28 Sep without sending a lead:** submit pressed on every page with a lead form (iPhone + desktop); the form sends its request with all fields and tracking values, which the test answers locally. See the PBI-01 resolution. A real test lead waits on D1. |
| 6 | Tracking and phone numbers (GPT 7, 8) | Covered by the full run later on 27 Sep with this change live: phone numbers per utm_source vs the campaign sheet 254/254, click-to-call links present, form hidden tracking fields filled; tapping the call bar fires `gtm.linkClick` (PBI-05). |
| 7 | Regression covered 30 of 57 pages (GPT 9) | The other 27 pages were covered by the PBI-05 run (load, 0 errors) and the 28 Sep submit test (21 old-form pages). |
| 8 | Outside staging; test traffic in shared accounts (GPT 11, 12) | enroll/start 60/60 byte-identical. Our test runs block Clarity, Mouseflow, GA, Meta and Bing requests locally, so no test sessions reach the shared accounts. |
| 9 | Component edits reach every page (GPT 13) | Intended; covered by the 57-page check (73/73 lead forms masked). |

**Status: settled.**
