# PBI-01d P3 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts:
- **Code · GPT:** approve with fixes.
- **Code · Gemini:** approve.
- **No UX review:** nothing visible changed. Rendered layout and text were identical on 52 pages × 2 widths, live vs
  pre-change.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | `<strong>` → combo class on the question heading: accessibility/SEO (GPT 1, Gemini 1) | Kept. The heading stays an `<h3>` with the same text; the `<strong>` only carried the bold weight, which the combo class keeps (700). Gemini: safe. |
| 2 | Pop-up open/close, anchors, slider and step form not explicitly clicked (GPT 2, Gemini 2) | **Tested, 52 pages × 2 widths, pre-change vs live:** slider moved by keyboard, pop-up opened from the step-1 card, closed, `#herosec` and `#heropopup` anchors followed; the visible state after each step (pop-up shown, scroll position, slider value, visible form steps) is **identical on 104/104** (`tools/webflow/lp-interactions.mjs`). The form walk in the functional test already goes through all three steps. |
| 3 | Real submission and third-party delivery not tested end to end (GPT 3, 4; Gemini 4, 5) | Blocked on D1 (no test lead until the operator agrees one). Payload (412 bytes), request set and dataLayer are identical to pre-change on all pages; the form's action and fields are unchanged (see P4 check: every form field, link, id and `tel:` target identical on 52 pages). The form's `data-wf-element-id` changed because the form now lives in a component; the action is formspree, not Webflow forms. |
| 4 | Phone matrix only tested with facebook (GPT 5) | **Tested live, phone width (sticky bar present):** google, bing and a visit without parameters on all 52 form pages: phone numbers, `tel:` targets and cookies identical to pre-change on every page. |
| 5 | Home-page exception should be documented (GPT 6) | Documented on the board and in the plan: home keeps its own hero, pop-up and bottom CTA (H1 headings); it uses the Trust strip. |
| 6 | Draft/unpublished pages with the old sections (GPT 7) | The 21 old `-old` drafts still carry old sections; they are to be deleted under M2 (operator). No other page has these sections. |
| 7 | Browser coverage (GPT 8) | Chromium at desktop and phone width only, as in P1/P2. No browser-specific code was added (components render to the same HTML). |
| 8 | Normalised script hashes (GPT 9) | The webflow.js hash changes on every publish; the functional run (dataLayer, errors, requests) covers behaviour. |
| 9 | Component edits propagate site-wide (GPT 10) | Intended (that is the purpose). Only staging.credolegal.com is published from this project. |
| 10 | Designer usability of the props (GPT 11) | Props are named (H1, Lede, Form intro, First question, Paragraph) and multiline where the text has line breaks; documented in the plan. |

**Status: settled.** No code change needed.
