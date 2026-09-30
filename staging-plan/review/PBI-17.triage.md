# PBI-17 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 30 Sep)

Verdicts: **Code · GPT:** approve with fixes. **Code · Gemini:** approve with fixes. **UX · GPT:** approve with fixes.
**UX · Gemini:** approve (both UX reviews on 12 before/after screenshots).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | `overflow: hidden` on the card may clip dropdowns or tooltips (Gemini code 2, GPT code 9) | **Tested, nothing clipped.** The only custom overlay in the cards is the pop-up's "Select Debt Types" dropdown (Webflow dropdown, absolutely positioned list): opened at 1440, 390 and 320px, its list ends 165px (1440) inside the card, 0px clipped, all 12 options clickable. The other selects are native `<select>` (PBI-09), whose menus are drawn outside the page. No tooltips or date pickers. Validation errors (step 2) and step 3 checked on 3 pages × 2 widths. |
| 2 | Functional coverage only 4 pages (GPT code 2, 7) | **Re-run on all 52 form pages** (before vs after, trackers answered locally): at 1440, one page at a time, **52/52 identical** in form walk, payload (412 b), trackers, dataLayer, cookies, phones and links; only styles and the visible text differ (intended). A first parallel run (5 at a time) showed payload and console-error differences on some pages; all were on the *before* side (the saved page's walk timed out under load, and Cloudflare Turnstile `atob` errors) and none survived the sequential run. One page showed a link difference once in the sequential run (a render-time third-party link); served hrefs are identical and it was identical twice on re-check. At 390, 52/52 identical in the parallel run. |
| 3 | Final submission / lead receipt not shown (GPT code 8) | Waits on D1 (no test lead until the form destination is decided); the walk reaches the final step and the payload the form would send is identical before and after (row 2). |
| 4 | "Or call" is a small tap target on phones (GPT UX 9) | PBI-19 (next but one) gives the call links vertical padding so each is at least 24px tall; the sticky call bar (PBI-05) is the main phone call action. |
| 5 | FAQ text looks flush to the left edge (GPT UX 10) | Screenshot crop: the capture is the FAQ column only; on the page it sits in the container at x = 90px (1440 wide), the same left edge as the other content sections ("What we do", bottom CTA). |
| 6 | FAQ answers narrower than the full-width questions (Gemini code 4, Gemini UX 4; GPT UX 4: no change needed) | Kept: the board task asked for about 70 characters per line (measured 72–74); the questions are one line each, so the ragged right edge is the question length, not a misalignment. The prototype's 760px (about 130 characters) is the alternative if the operator prefers it: one value in the section embed. |
| 7 | Pop-up coverage narrower than the hero (GPT code 9) | Pop-up walked to step 3 at 1440 and 390 on 3 pages (nothing clipped), step 2 with errors checked before the change; dropdown open state in row 1. |

**Status: settled.**
