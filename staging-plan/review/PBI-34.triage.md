# PBI-34 (main landmark) · Resolution of the independent review (GPT-5.5, 2 Oct)

Verdict: **Code · GPT:** approve with fixes. No UX review: nothing visible changes (element compare).
**Gemini: not run** (API credits depleted).

| # | Finding | Resolution |
|---|---|---|
| 1 | 404 page has no main | Left out on purpose: Webflow's default 404 (5 elements, no sections), not a page visitors are sent to. Can be added if wanted. |
| 5 | No accessibility audit after the change | Run after publishing with axe-core on 5 page types (landing page ×2, home, 2 thank-you pages): `landmark-one-main`, `landmark-no-duplicate-main`, `heading-order`, `page-has-heading-one` pass. The scan found one more item (`region`: the footer was a plain section, outside every landmark); fixed in the same item by setting the two footer components' tag to `footer` (56/56 pages identical apart from that tag; `region` passes). Left: `identical-links-same-purpose` on form pages = D30 (operator's choice pending). |
| 6, 9 | Functional compare sampled | The landing pages are one template (same components); served HTML of all 56 pages is identical apart from the wrapper, so every tracker tag, phone link and form is unchanged on every page. Functional compare on 4 pages × 2 widths confirms behaviour per page type. |
| 7, 8 | Real submission, thank-you conversions | Standing rule: no test lead until D1. Payload identical; the thank-you pages' HTML is identical apart from the wrapper and footer tag. |
| 10, 19 | Pop-up, nav, interactions | Form walk through the pop-up (steps 2–3) on 5 page × width runs: all steps work, final step reached, 0 page errors. The navbar and the sticky call bar are outside `main` and their markup is unchanged; the element compare (with Webflow's scripts running) shows no moved element. |
| 13 | Pages outside the inventory | The 56 published pages are the whole published surface (list_pages: 58 pages incl. the password page and one empty draft). |
| 14–17 | Other changes in the same publish | Separate operator items, recorded on the board: old Inconsolata fonts deleted (M7: the stylesheet declares only Hanken Grotesk and Credo Mono; no class or embed names Inconsolata since PBI-26), Clean up (M5: classes used by no element; element compare unchanged), image regeneration (M6: home's 3 photos now get `sizes` 694–906px instead of 100vw; bytes unchanged, see M6). |

**Status: settled** (D30 open; Gemini pending: credits).
