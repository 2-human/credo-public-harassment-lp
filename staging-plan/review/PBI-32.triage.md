# PBI-32 (step time tags removed) · Resolution of the independent reviews (GPT-5.5, 2 Oct)

Verdicts: **Code · GPT:** approve with fixes. **UX · GPT** (the section at 1440 and 390, thank-you at 1440): approve
with fixes. **Gemini: not run** (API credits depleted).

| # | Finding | Resolution |
|---|---|---|
| Code 1 | 55 vs 56 pages | 56 published pages were compared; 55 had the section (51 landing pages, home, 3 thank-you pages). The 56th is the 404 page, which has no such section and is unchanged. |
| Code 4, 6, 7 | Functional behaviour only sampled | The change removes one text element per step and no script, link or form element. Served HTML of all 56 pages is identical apart from the removed tags, so every tracker tag, phone link and form on every page is byte-identical; the functional compare (4 pages × 2 widths) confirms behaviour on each page type. |
| Code 5 | No real submission | Standing rule: no test lead until D1. Payload compared (identical). |
| Code 8, 13 | Deleted props and repo tools | lp-sync.mjs and lp-extract.mjs were updated in the same commit and pass a syntax check; lp-components.json no longer lists the props. The prototype's content files still carry a third value per step; the sync now ignores it. These are local tools (tools/webflow), run by hand; they are not deployed anywhere. |
| Code 10, UX 3 | Remaining timeline wording | Raised for the operator as D28: the thank-you sub-heading "A clear sequence, on a known timeline." and the step title "Cease letter sent, day one" stay as they are unless decided otherwise (copy, not part of the request). |
| UX 6, 13 (blockers) | CTA and phone not visible in the screenshots | The screenshots show only the changed section on purpose. CTAs and phone links are unchanged (served HTML identical; functional compare). |
| UX 10 | Thank-you: three steps in a four-column grid | Not caused by this change: the thank-you steps sat in the same grid before (saved page of 1 Oct). Noted for the operator in D28. |

**Status: settled** (D28 open; Gemini pending: credits).
