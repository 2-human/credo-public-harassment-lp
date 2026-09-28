# PBI-06 · Phone-header options · Resolution of the UX reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

**First attempt, void:** the screenshots were not attached (a shell quoting error on our side sent the packet alone).
Both reviewers noticed and refused to judge ("do not approve: no screenshots"). Their replies are kept as
`PBI-06-options-ux.review-*.no-images.md`. The review tool now refuses a UX review without images and records
"images sent: N" in every reply header.

**Second attempt (9 screenshots sent):** **GPT approve with fixes** · **Gemini approve with fixes**. **Both recommend Option B.**

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Option B serves callers better: the number itself is visible and builds trust; one clear header action (GPT 1, 5, 10, 12; Gemini 1, 4) | **Recommendation to the operator: Option B.** |
| 2 | Option A's "Free review" button is redundant (the form is directly below) and crowds 360 px screens (Gemini 1, 2 blockers against A) | Consistent with 1: Option A is not recommended. |
| 3 | Removing the ☰ menu on phones loses nothing important: it only held same-page jump links (and the hidden number) (GPT 3; Gemini 3) | Accepted. **Checked:** the menu holds 5 same-page links and the number only; no legal or policy links (those are in the footer). |
| 4 | Keep enough space between logo and button on 360 px (Gemini 2) | **Measured:** Option B at 360 px leaves 64 px between the logo and the button. |
| 5 | Tap targets stated, not visible (GPT 4) | **Measured in the browser** on all three phones: Option B's button is 165×44 px. |
| 6 | Add an accessible label (GPT, first attempt 6) | The button's text is the number itself; the build adds `aria-label="Call Credo Legal at (number)"`. |
| 7 | Could hurt form starts (GPT 2) | Real, and only data can tell. After production launch, compare form starts and call taps before/after in GA4 (the call link keeps firing `gtm.linkClick`). |
| 8 | Inactive step labels small and pale (GPT 9); H1 wraps into three lines on narrow phones (Gemini 5) | Already planned: PBI-15/16 (step labels 12px and darker; H1 32px on phones). |

**Status: settled.** Operator to choose; both reviewers and Claude recommend Option B.
