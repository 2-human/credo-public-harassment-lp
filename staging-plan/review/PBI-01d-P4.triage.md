# PBI-01d P4 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep, two rounds)

Verdicts (round 2): **Code · GPT:** approve with fixes. **Code · Gemini:** approve. **UX · GPT:** approve with fixes.
**UX · Gemini:** approve with fixes. Round 1 (files `*.round1.md`): Gemini code raised a blocker (forms, phones,
tracking not re-tested after P4) and Gemini UX a blocker (no evidence for changes 5–6); both answered in round 2.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Forms, phone swap and tracking not re-tested after P4 (round 1: Gemini blocker, GPT 8–10) | **Re-run on the final state:** trackers, dataLayer, errors, links, `tel:` targets, phone texts, cookies and form payload (412 bytes) identical on 104/104; google phone matrix 52/52; interactions 104/104. Flags only on the declared text changes. |
| 2 | Changes 5 and 6 without evidence (round 1: Gemini UX blocker, GPT UX 5–6) | Screenshots `P4-blankline-*`, `P4-faq6-*`; heading outline of all 52 pages: identical on 51, one `h4` → `h3` on debt-lawsuit-options. |
| 3 | Text check vs change 4; 98/104 count; class scope; limits (GPT 4, 7, 13, 14) | Clarified in the packet (round 2). `lp-*` combo classes appear only inside the four components on the 51 landing pages. Limits documented on the board and in the plan. |
| 4 | Intermediate widths not tested (Gemini round 2) | **Tested at 768 and 991 px** (51 landing pages, same normalised rendered comparison): **98/102 identical**; the 4 others are debt-harassment-fdcpa-attorney and debt-lawsuit-options at both widths, differing only by changes 5 and 6 (text identical on all 102). Log: backup `2026-09-29-pbi01d-p4/render-tablet.log`. |
| 5 | Real submission and third-party delivery (GPT round 2: 7–9, 14) | Waits on D1 (no test lead until the operator agrees one). Form, phone and tracking code are unchanged and outside these sections. |
| 6 | Rights labels wrap word by word on phone; long FAQ lines on desktop (GPT UX 10–11, Gemini UX 8) | Existing design, unchanged by P4 (identical before/after). Added to the design polish (PBI-18) as a note: widen or stack the rights label column on phone; cap FAQ text width (~70ch). |
| 7 | Hero/form/phone UI not in the screenshots (GPT UX 8, 9, 14) | Not touched by P4 (P3 verified identical rendering and behaviour for those sections). |
| 8 | Standardisations approved as the right call (Gemini UX 5, both round 1) | Kept. |

**Status: settled.** No code change needed beyond round 2.
