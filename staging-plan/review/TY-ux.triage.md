# Thank-you page · Resolution of the UX reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Verdicts: **GPT approve with fixes** (0 blockers, 3 should-fix, 8 notes) · **Gemini approve with fixes** (0 blockers, 2 should-fix, 5 notes).
Both confirm: call and booking are on the first screen on desktop and phone, call is clearly primary, and the new headline
confirms the request without promising an outcome.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | The "Wording pending legal review (D13)" label would hurt trust if visitors saw it (GPT 5; Gemini 7) | It exists only in the review-hub preview, as a flag for the operator. It is not part of the design and never goes into Webflow. |
| 2 | The round red chat bubble competes with the red call button (GPT 4; Gemini 4) | Real, and the same on every page: it is the Tidio chat launcher. Added to decision **D8** (Tidio): if chat stays, give the launcher a neutral dark colour so red is reserved for the primary action. |
| 3 | Small grey line under the buttons may fail contrast (Gemini 5) | **Measured:** `#5b6470` on `#fafbfc` = **5.79:1**, above the WCAG AA minimum of 4.5:1 for small text. No change. |
| 4 | Phone number differs: today's purple page shows (718) 865-8350, the proposal (443) 483-4080 (GPT 10) | **Correct, and it is a staging inconsistency today:** `/thank-you` uses (443) 483-4080, while `/page/thank-you` and `/page/already-submitted` use (718) 865-8350 (plus (212) 461-4026 for existing clients). Unifying the pages means choosing one number; question for the operator, recorded with **D13**. |
| 5 | Verify the call button is a `tel:` link (GPT 6, 7) | It is: `tel:+14434834080`. |
| 6 | Consistency with other pages not assessable (Gemini 6) | Covered by the design-preview review (all page families side by side). |

**Status: settled**, with two operator questions (D8 chat colour; D13 which number the thank-you page shows).
