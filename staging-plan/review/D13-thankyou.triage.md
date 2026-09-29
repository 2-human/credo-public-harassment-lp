# D13 thank-you wording · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini do not approve** (1 blocker) · **UX · GPT approve with fixes** ·
**UX · Gemini do not approve** (1 blocker).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini code 2):** the shared "Site Pages" template may overwrite other site pages (also GPT 7) | **Checked, not the case:** the collection holds exactly **2 items** (listing total 2): /page/thank-you and /page/already-submitted. No other page uses the template. |
| 2 | **Blocker (Gemini UX 1):** phone numbers differ between thank-you variants: /thank-you (443) 483-4080, the older two (718) 865-8350 (also GPT UX 6) | **Real, pre-existing, and the open second half of D13** ("which phone number the unified thank-you page shows"). Raised to the operator; not changed (call-tracking numbers are not ours to choose). |
| 3 | /page/already-submitted now shows the same success headline as a fresh submission (Gemini UX 3) | Unchanged in kind: it already showed the same "pre-approved" headline as /page/thank-you. Raised to the operator whether a duplicate submission needs its own line (e.g. "We already have your request."). |
| 4 | Other outcome-like copy remains ("helping countless clients reclaim control", "regain control of your financial future") (GPT UX 4; GPT 2, 4) | Raised to the operator for the same legal review as D13; not changed (not part of the approved wording). Search of all three pages: no "pre-approved", "be in touch shortly" or "truly appreciate" left. |
| 5 | "✓ REQUEST RECEIVED" looks like a button; call/schedule actions sit lower on phones (Gemini UX 2; GPT UX 7-8) | Existing design of the new thank-you page (DS-6), logged for the design system. |
| 6 | Redirect, conversion tracking, form flow not tested end to end (GPT 8-11; Gemini 4) | Text-only change on the destination pages; no scripts or embeds touched. A real submission is D1 / the operator's CRM test. |
| 7 | No screenshot of /page/already-submitted (GPT 4; Gemini 3) | Same template and item fields as /page/thank-you (fields empty); served HTML of both checked for the new headline and paragraph. |

**Status: wording applied**; open for the operator: the phone number on the thank-you pages, a separate line for duplicate submissions, the remaining outcome-like copy.
