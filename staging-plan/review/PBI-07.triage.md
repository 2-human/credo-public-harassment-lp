# PBI-07 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Verdicts: **Code · GPT approve with fixes** (0 blockers) · **Code · Gemini do not approve** (1 blocker).
UX review: **not possible on screenshots.** The change is the phone's on-screen keyboard, which a headless browser cannot render, and no iOS simulator is installed. The page itself looks the same (no CSS targets the field type; see #6).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini 2):** on real phones, soft keyboards (Android) don't send normal key events, so a key-event formatter could break with `type="tel"` | **Tested 28 Sep, old type (restored locally) vs new, on Android Chrome (Pixel 7) and iPhone WebKit, both form types:** (a) physical key events, (b) Android-style soft keyboard (keydown `keyCode 229` 'Unidentified' → value change → `input` event → keyup 229), (c) autofill (whole value at once + `input`/`change`). All 24 combinations give "(212) 555-0142", identical before and after. Limit: simulated input, not a physical phone. |
| 2 | Autofill not tested (GPT 6) | Covered by #1 (c). |
| 3 | Keyboard not directly shown (GPT 1, 2; Gemini 1) | Correct: not possible here (see above). The attribute check on all 167 served fields is the evidence. The browser picks the keypad from these standard attributes (`type="tel"`, `inputmode="numeric"`). |
| 4 | The 21 old pages not in the regression (Gemini 1; GPT 10) | They are covered by the served-HTML check (all their fields as intended) and the submit test (21 pages × 2 devices, all sent every field). They have no phone-swap script, so there is no number swapping to test. |
| 5 | End-to-end delivery to formspree, conversion pixels (GPT 4, 5; Gemini 4, 6) | Unchanged by this item: the same request is built with the same fields and values. A real test lead waits on **D1**. |
| 6 | CSS/JS selectors that target `type="text"` (GPT 7) | **Checked:** the published site stylesheet has no selector on `type=text` or `type=tel`, and the page code of all 57 pages has none either. The fields are styled by class. |
| 7 | Shared components in unpublished or future pages (GPT 11, 12) | Unpublished slots are the drafts removed in PBI-00b; any future page using these components gets the same, intended fields. |
| 8 | The 5 pages without a form (Gemini 7) | /401, /404, /thank-you, /page/thank-you, /page/already-submitted: no phone or ZIP fields, so nothing changed there. |
| 9 | Invalid phone still sent sometimes (GPT 8, 9) | **Corrected 28 Sep:** the "occasional send with an empty phone" was a test error: the test counted any request whose URL contained "formspree", and Google Analytics' `form_start` beacon mentions the formspree URL. A strict re-test (only real posts to formspree.io) shows the new form blocks every invalid phone and email; the old form blocks invalid emails and empty/letter phones but sends a too-short phone such as "(212) 555" (before and after this change). Logged as **PBI-07b**. |
| 10 | Changes alter the Webflow project for all collaborators (Gemini 8) | Intended; every change is listed on the board and in these packets for the developer. |

**Status: settled.**
