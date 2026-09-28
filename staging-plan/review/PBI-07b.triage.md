# PBI-07b · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Verdicts: **Code · GPT approve with fixes** (0 blockers) · **Code · Gemini approve with fixes** (1 blocker).
UX: not needed. Nothing on the page changes; the forms' existing messages appear where a keyboard send used to slip through.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini 1):** Enter pressed *inside* the phone or email field (implicit submission) not tested; GPT 8: the guard handles clicks, not `submit` events | **Tested (Ohio + payday-loan-fight-back, analytics blocked):** Enter inside the phone or email field of `#gtmform`, and inside the phone field of `#ngtmform`, sends nothing, with a short phone **and with a valid one**. There is no implicit-submission path: `#gtmform`'s `submit` event is already cancelled by a head script, and the forms have no native submit button. The old form sends only through `form.submit()` called from the Submit link's click handler, which is the path the guard covers. |
| 2 | "Same request, same GTM push, same duplicate check" not shown (GPT 2; Gemini 2, 3) | **Tested:** a valid lead by real click sends one request with **exactly the same field list** as this morning's submit test, and pushes `form_submit` to the dataLayer. With the guard removed locally the result is identical (1 request, 3 `form_submit` pushes: the triple push predates this change). The duplicate-number check lives inside `submitForm()`, which the guard does not touch; for valid data the guard returns before doing anything. |
| 3 | Only 2 new-form pages tested (GPT 3; Gemini 4) | The guard only reacts to `#submitBtn`/`#nsubmit`, which exist on 0 of the 31 new-form pages (served HTML of all 57 pages checked). |
| 4 | Success path details (GPT 5) | Valid leads: 21/21 old-form pages (Enter), plus real clicks on 4 pages × desktop and iPhone: 1 request each. (A first click test showed 0 on one page: the test clicked a button that was below the visible area. Scrolled into view, it sends.) |
| 5 | `#ngtmform` sends nothing even with valid data (GPT 7) | Pre-existing (no script handles `#nsubmit`). Those 21 pages are being rebuilt on the new form (D11); noted there. The guard covers it in case it ever becomes active. |
| 6 | Tracking / call tracking (GPT 4, 6) | Invalid attempts are stopped before `submitForm()`, so no `form_submit` is pushed for them; valid attempts are unchanged (#2). No phone link or swap script is involved. |
| 7 | Test traffic reaching live accounts (Gemini 5) | **Partly right, and reported to the operator.** No test lead reached formspree (every post answered locally). But today's invalid-input test scripts did **not** block analytics, so roughly 330 test page views from this Mac (28 Sep evening, hostname staging.credolegal.com) sent GA4 page views / form_start events, and likely Meta Pixel and Clarity/Mouseflow sessions. The kept scripts now block analytics and recorders. |
| 8 | Site-wide script (GPT 9, 10) | Intended; it is inert where `#submitBtn`/`#nsubmit` don't exist. Revert = remove the registered script "OldFormPhoneEmailGuard" from the site and publish. |

**Status: settled.**
