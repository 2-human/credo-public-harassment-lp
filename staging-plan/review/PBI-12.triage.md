# PBI-12 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts:
- **Code:** GPT approve with fixes; Gemini approve with fixes. Gemini's one blocker, legal sign-off on the sixth line, goes to the operator as D20.
- **UX, round 1:** GPT approve with fixes; Gemini do not approve, because the crops did not show every row.
- **UX, round 2** (full-section screenshots): GPT approve with fixes; Gemini approve with fixes.
  - The round-2 replies replaced the round-1 files. Round 1 is summarised below.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | The sixth fdcpa-attorney line departs from the prototype and needs legal/operator approval (code: GPT 1–2, Gemini 2; UX: GPT 3) | **Raised as D20.** The prototype's "another $1,000 in play" contradicts the $1,000-per-action cap (§ 1692k(a)(2)(A)) and the page's own first line. The live line is "Each call after a cease request adds another violation to the claim." Gemini (UX round 2) calls it accurate and compliant. GPT offers a softer alternative: "Each call after a cease request can add evidence of another FDCPA violation." The operator picks one. |
| 2 | The crops did not show the sixth row, the full tag orders, or wage step 4 on phone (UX round 1: Gemini blocker, GPT 3, 6, 9) | **Fixed:** full-section screenshots (`P12-full-*`, desktop and phone). Round 2 confirms every row, both tag orders and all four steps. |
| 3 | "Week 1" step tag in mixed case next to DAY 0 / WEEK 1–2 (UX round 1: Gemini 4; audit G29) | **Fixed and published:** retyped in capitals on the 21 pages that had it, plus the home page's three Week tags. The served HTML of all 56 pages changed only in those 22 tags; 0 mixed-case Week tags left. Round 2 confirms it. PBI-19's G29 task is done. |
| 4 | Forms, phone numbers and tracking not tested; webflow.js changed (code: GPT 5–9, Gemini 4) | **Tested:** live vs pre-change on the 5 edited pages plus ohio and home, desktop and phone. Phone numbers, form payload, tracker requests, dataLayer, cookies and links are identical; only the edited text differs. webflow.js is Webflow's own rebuild on publish (see PBI-01d). |
| 5 | H1 markup and tag styles (code: GPT 10–11, Gemini 3) | The served H1 is now `<h1 class="heading-46">Got Credit Card Debt?</h1>`, one text node. The layout is identical to before once the removed `<em>` is left out of the comparison. Tag styles come from classes, not from the words, so REMEDY/VIOLATION look like the other tags (screenshots). |
| 6 | Step titles or tags passed to the CRM? (code: Gemini 5) | No. The form's fields do not include page text; the form payload is identical before and after. |
| 7 | Comma splice in a "Who this helps" item on violations (UX round 2: Gemini 6) | **Not changed:** it is the prototype's approved copy. It is offered to the operator as an optional copy edit, together with similar ", " splices left from the dash clean-up. |
| 8 | Phone layout: narrow rights column, first form control below the fold, small grey helper text (UX: GPT 10, 12–13) | Existing, template-wide design points. They are already covered by PBI-16 (type scale), PBI-17 (form card) and PBI-15 (contrast), and will be done once in the shared components (PBI-01d P3/P4). |
| 9 | Screenshot of the wage steps cut at the top of the numbers (UX round 2: GPT 17) | Screenshot crop, not the page: the phone shot and the page itself show the numbers in full. |

**Status: settled; D20 is open with the operator.**
