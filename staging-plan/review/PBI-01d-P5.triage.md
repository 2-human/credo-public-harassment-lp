# PBI-01d P5 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts: **Code · GPT:** approve with fixes. **Code · Gemini:** approve with fixes. No UX review (the template is a
draft page; nothing published changed).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Slug → prototype map derived, not declared (GPT 10, Gemini 2) | It is a declared table in `lp-sync.mjs`; added `--check` (unmapped, missing, duplicate, wrong state) — 0 problems. |
| 2 | Shared `content-state.js` query selection untested (GPT 11, Gemini 7) | `--check` loads each of the 13 state pages and /letter through its own query string and asserts the state name; the round trip compared all 14 against their live pages (0 copy differences). |
| 3 | 12 vs 11 difference count (GPT 7) | Corrected: 8 hero props on 7 pages + 3 + 1 = 12. |
| 4 | Coverage accounting (GPT 8, 9) | Added to the packet (round 2): only props the prototype defines for existing items; show/hide via counts. The report lists every differing prop; props the prototype does not define are never written. |
| 5 | Prove the tool is read-only (GPT 6) | Neither script has an API client or network write; the payload goes through the Webflow MCP call by a person/agent, after approval. |
| 6 | New-page workflow not tested end to end: head lines, phone table, tracking, form attribution (GPT 2–5, Gemini 1, 4, 5) | Phones, tracking, UTM storage and form hidden fields are site-level code keyed by the URL (P1/P2, tested on 56 pages incl. unlisted slugs, which get the `'*'` default number). Title/description/OG are Webflow page settings. The first real new page (DS-10) starts with a disposable duplicate checked end to end (head lines, phone table, form walk; real submission after D1). Added as the first step of that task. |
| 7 | Post-change check never exercised (GPT 12) | Exercised in P4: after publishing, `lp-extract` read 4,646 props back from 51 pages and caught 8 leading-space values, fixed and re-checked (0 mismatches). |
| 8 | `window.CREDO_PHONES` and the prototype fix could affect other environments (GPT 14, 15, Gemini 6) | The phone table is in the staging project's site code only (start/enroll are separate projects, never written). `content-state.js` is the review-hub prototype; the fix is grammar only ("who want" → "who wants"), matching the live Webflow text. |
| 9 | Which "live" site the tools read (GPT 16) | `served-diff.py` fetches only `https://staging.credolegal.com/…`; `lp-extract` reads local files. |
| 10 | Read-only sync is the right level (GPT 17, Gemini 3) | Agreed; kept read-only. |

**Status: settled.** Code change: `lp-sync.mjs --check`.
