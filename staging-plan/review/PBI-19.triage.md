# PBI-19 · Resolution of the independent reviews (GPT-5.5, 30 Sep)

Verdicts: **Code · GPT:** approve with fixes. **UX · GPT:** approve with fixes (8 before/after screenshots).
**Gemini: not run:** the Gemini API returned HTTP 402 (prepaid credits depleted) for both the code and the UX review;
to be re-run once the credits are topped up (operator).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Anything else under 24px? The check covered only call and BBB links; slider thumb and step boxes look small (GPT code 9, GPT UX 10) | **Scanned every visible interactive element** (links, buttons, inputs, selects, the slider, the pop-up steps) on all 52 form pages at 1440 and 390 (`pbi19-targets.mjs`): found and **fixed three more**: header nav links 20 → 24px (combo `Nav Link + track-redirect`, 2px top/bottom), footer menu links 16 → 24px on desktop (`Link 3 Copy`, 4px top/bottom; phone spacing unchanged), and the debt slider (box 4–6px, handle 18px → box 24px with the same 4/6px track drawn as a background line, handle 24px; layout identical in Chromium, WebKit within 1px; a tap 10px above the track moves it in both). After: **104/104, no interactive element under 24px**. The step numbers 01/02/03 are not interactive. |
| 2 | Page end only checked on one page and device (GPT code 5) | Swept all 52 form pages in call hours on a Chromium phone (412px), a WebKit small phone (320px) and WebKit landscape (667×375): **156/156 ok**: the bar present, no text under it, no white band below the footer (`pbi19-page-end.mjs`). |
| 3 | Chat bubble not rendered, so not validated (GPT code 6) | Correct: Tidio does not render on staging. Its future (keep, lazy-load or remove) is D8 in PBI-23; the page-end check is re-run there once the chat state is decided. |
| 4 | `:has()` support and scope (GPT code 7) | `:has()` is supported by Safari 15.4+, Chrome/Edge 105+ and Firefox 121+ (tested in Chromium and WebKit). Without it the page behaves exactly as before (the bar's own 90px body padding: white band, nothing hidden). The rule only applies while `.sticky-call-button` exists, which the phone-swap script creates only on phones in call hours. |
| 5 | "Week 1" not evidenced (GPT code 8, GPT UX 7) | Done in PBI-12 (29 Sep): 21 pages + 3 tags on home retyped; served HTML check, 0 mixed-case left (board note). Not part of this change. |
| 6 | BBB link box not visible in a screenshot (GPT UX 4) | Measured: the BBB link box is 80px tall (was 18px) on 52/52 pages at both widths (row 1 and the tap check). |
| 7 | Functional coverage sampled (GPT code 10, 12) | **Re-run on all 52 form pages** (before vs after, one page at a time, 1440): form walk, payload, trackers, dataLayer, cookies, phones (all `tel:` links and the phone swap) and links **identical on 52/52**; only styles differ. One page also showed a different count of Cloudflare Turnstile's own `atob` console error (third-party noise, seen in earlier runs). |
| 8 | Real submission not shown (GPT code 11) | Waits on D1 (no test lead until the form destination is decided); the payload the form would send is identical before/after (row 7). |

**Status: settled** (Gemini pending: credits).
