# Card numbering · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini approve with fixes** · **UX · GPT approve with fixes** ·
**UX · Gemini approve with fixes** (its 2 "blockers" ask for mobile and form screenshots).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Thank-you box 02 ("Personalized guidance") tagged with the calling-hours citation § 1692c(a)(1) (all four reviews) | **Raised to the operator as a copy decision**: suggested tag "GUIDANCE", matching EXPERTISE / PRIVACY / CONTACT. Not changed without approval (thank-you wording is under D13). |
| 2 | Rendered numbering at other widths (GPT 3, GPT UX 2; Gemini UX 2) | **Checked rendered on all 54 pages at phone width (iPhone 15):** 50 read 01-06, credit-card-debt-challenge and thank-you read 01-04, 404/401 have none. Desktop checked from served HTML (same text). |
| 3 | Form, tracking, phone swap (GPT 7-9; Gemini UX 3) | Text-only change on number labels and one citation; form re-tested (one POST, `form_submit` once) on 2 pages. Phone swap does not read these elements. |
| 4 | "Text only" not independently shown (GPT 4) | Every change was a `set_text` on a String node (33 in all); no style, element or script call was made for this item. |
| 5 | Drafts / other domains (GPT 10, 12) | The 21 old drafts are being deleted (M2); the site publishes only to staging.credolegal.com. |

**Status: settled**, except the thank-you tag (operator).
