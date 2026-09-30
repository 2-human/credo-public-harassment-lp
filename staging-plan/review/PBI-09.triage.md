# PBI-09 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 30 Sep, two rounds)

Verdicts (round 2): **Code · GPT:** approve with fixes. **Code · Gemini:** approve. Round 1 (`*.round1.md`): GPT approve with
fixes; Gemini do not approve (duplicate ids from the hidden native selects, hidden `required` fields, real submission).
No UX review: nothing visible changed (the options, their order and the styles are what the visitor already saw).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Duplicate ids/names and hidden `required` native selects (round 1: Gemini 1–2, GPT 1b) | Not served: Webflow leaves out elements whose visibility is off (each id and name occurs once on every served page). The hidden selects were then **removed** and the site republished; served HTML of all 56 pages identical to the verified state. |
| 2 | Only the first option exercised; placeholder validation not shown (GPT 5–6) | **Tested, 52 pages, old vs live** (`pbi09-select-check.mjs`): every option serializes to its own label, placeholders to empty, both fields `required`, Continue with placeholders shows the same error list and keeps step 3 closed. **52/52 identical.** |
| 3 | Real submission, Formspree/CRM receipt, analytics receipt (GPT 4 r1, 7 and 9 r2; Gemini 3 r1, 4 r2) | Waits on **D1** (no test lead until the operator picks a destination). The payload is identical; the values are not new (the G17 script already sent them). |
| 4 | External consumers of the values (CRM rules, Zapier, reports) (GPT 3 r1, 8 r2) | The submitted values do not change with this PBI (they were produced by G17 before and are stored now), so no consumer sees a difference. The CRM check is the operator's M3. |
| 5 | Phone swap across sources (GPT 10 r2) | Phone code is untouched (site footer). Checked anyway: visit with `utm_source=google`, 52 pages at phone width: phone numbers, `tel:` targets and cookies identical to pre-change on **52/52** (one page, utah, alternates between identical and a style-only difference on repeated runs of the same live page: timing noise). The facebook run above was identical on 104/104. |
| 6 | Site-wide scope of the head code (Gemini 4 r1, GPT 2, 8) | The Webflow project is the staging site only (the live start site is a separate project, never changed); 56/56 published pages checked. |
| 7 | Designer editing of DOM options (Gemini 5 r1) | Options are DOM `option` elements in the Navigator of `LP · Lead form` (text + `value`), documented on the board. |
| 8 | Network/Turnstile console noise (GPT 10 r1) | Seen on both old and new loads, identical on re-run. |

**Status: settled.**
