# PBI-06 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini do not approve** (1 blocker) · **UX · GPT approve with fixes** · **UX · Gemini approve with fixes** (1 blocker).
Both blockers are the same point: the ☰ menu is gone.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini code 1, Gemini UX 1), GPT code 5:** the ☰ menu is gone, so phone and tablet visitors lose navigation | **Phones:** an operator decision (28 Sep, Option B) after both reviewers agreed on the options review that the menu held only 5 links that jump down the same page, plus the number now in the header. **Tablets (768–991 px): also affected**, because Webflow collapses the menu below 992 px. The chosen option said "phones", so this is **put to the operator (D14)**: accept on tablets too (recommended; same menu content), or keep ☰ on tablets (needs one small site-CSS rule, because Webflow's own rule overrides class styles). |
| 2 | Call button touches the top edge; square right corners; flush right on phones (Gemini UX 2, 3) | **Not supported by the screenshot:** `pbi06-live-iphone-google` shows 6 px rounded corners and space above and to the right; measured 6 px top/bottom margin and 20 px from the right edge at 320–991 px. |
| 3 | Desktop "unchanged" only checked at 1440 px (GPT code 2, GPT UX 4) | **Tested at the breakpoint edges** (320, 478, 479, 767, 768, 991, 992, 1024 px × 3 pages): button shown ≤ 991 px, hidden from 992 px, where the 5 desktop links show; ☰ never visible. Plus lpcheck on Chrome/Safari/Firefox desktop: no new findings. |
| 4 | Tracking only partly shown (GPT code 3, GPT UX 3) | Numbers per source match the hero number on 186/186 runs; lpcheck compares **every** `tel:` link on the page, the new one included, against the campaign sheet: 344/344; a header tap fires `gtm.linkClick` with the tracked number. |
| 5 | Form submission not tested (GPT code 6) | Not touched by this change; form walk to the submit step 240/240 after it; the 28 Sep submit test (request captured locally) stands. A real lead waits on D1. |
| 6 | Unpublished component slots (GPT code 7) | The 7 other slots are the draft pages removed in PBI-00b; they are not served. |
| 7 | Accessibility (GPT code 9) | `aria-label="Call Credo Legal"`, icon `aria-hidden`, 44 px tall, white on #c92028 (≈ 5.6:1, passes AA); lpcheck axe findings identical to 27 Sep. |
| 8 | Breakpoint edges, 320 px (GPT code 8) | Covered by #3. |
| 9 | Test traffic reaching shared systems (GPT code 11) | Test runs block GA, Meta, Bing, Clarity and Mouseflow requests locally; no call is placed (a `tel:` tap in a headless browser dials nothing). |
| 10 | The swap script could overwrite the icon (Gemini code 3) | It writes into `.callnumbers` only; the icon is present after the swap in every phone screenshot and on all 31 swap pages. |
| 11 | On phones the call button is more prominent than the form's Continue, which is below the first screen (GPT UX 2, 5) | Calling is an intended primary action. The form's Continue moves up when the H1 shrinks to 32 px on phones (PBI-16). |
| 12 | Small, pale form labels; old design on state pages (GPT UX 7, 8) | PBI-15/16; state pages are being rebuilt (D11). |

**Status: settled.** #1 closed by the operator on 28 Sep: D14 accepted (tablets, like phones, show the call button instead of the ☰ menu).
