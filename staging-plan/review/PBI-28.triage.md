# PBI-28 · Resolution of the independent review (GPT-5.5, 30 Sep)

Verdict: **Code · GPT:** approve with fixes. No UX review: nothing on the page changes (the chat launcher is not
rendered on staging, before or after; D8). **Gemini: not run** (API credits depleted, HTTP 402).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 11 | `document.body` may not exist if the visitor acts during loading (GPT 11) | **Fixed:** the loader appends the script to `document.head` (or the root element), which exist whenever this head script runs. Rewritten and republished; served head equals the file on 56/56 pages. |
| 2, 5 | Event coverage, `keydown` not shown (GPT 2, 5) | Added a key-press case: Tab 1 s after load → Tidio requested at that moment (california). Scroll, tap and idle re-checked live on landing page, home, california and /thank-you. `pointerdown` covers mouse, pen and touch in every current browser (Safari ≥ 13); `touchstart` is kept for older touch browsers. |
| 1, 3, 6, 12 | Full chat session not tested (GPT 1, 3, 6, 12) | A real session would create a visitor (and possibly a notification) in Credo's shared Tidio account, which tests must not do; and the launcher does not render on staging even with the old code (D8). What was proven: the same seven Tidio files load and `window.tidioChatApi` appears, so the footer's `setContactProperties`/`tidioChat-ready` code runs as before. The first real chat check belongs to the operator (D8: is chat staffed). |
| 7–10 | Tracking, submission, phone swap, coverage (GPT 7–10) | Functional compare (6 page types incl. system pages × 2 widths): only the Tidio request timing differs. No test lead until D1 (standing rule). The phone script and the form code are not touched. |
| 13 | Publish boundary (GPT 13) | Staging project only; published to the staging domain only. |

**Status: settled** (Gemini pending: credits).
