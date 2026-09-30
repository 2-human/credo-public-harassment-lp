# PBI-15 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 30 Sep)

Verdicts: **Code · GPT:** approve with fixes. **Code · Gemini:** approve with fixes. **UX · GPT:** approve with fixes.
**UX · Gemini:** approve with fixes (both UX reviews on the 14 before/after screenshots; a first UX run by mistake sent
only one image and is discarded).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Hidden and state-dependent contrast not tested (GPT code 9) | **Tested, and one real failure found and fixed:** the pop-up's "FREE CASE EVALUATION · STEP 2 OF 3" (another duplicated class, `mjfdcpaboxtext Copy Copy`) was 3.12:1; `secondary` gave 4.44:1 on the pop-up's light panel, so it uses `muted` (#5b6470). Re-checked on 5 pages × 2 widths: pop-up step 2, step 2 with the validation error, step 3, step 3 with field errors: **0 contrast failures**. |
| 2 | Statute references and the small labels under the statistics look light (Gemini UX 5–6, GPT UX 9) | Measured: statute references 4.61:1 (`secondary` on white), stat labels 5.79:1 (`muted` on #fafbfc); both pass AA. Styling left as designed. |
| 3 | Site-head `<style>` block is global; the "OR CALL" rule is scoped by a sibling selector (GPT code 11, Gemini code 2) | The block holds only the classes whose names are duplicated (Webflow cannot edit them by name) and the body default; each rule was checked against every page that uses the class (the "OR CALL" class is also a footer line on dark, hence the scope). When the duplicates go (M2 → DS-4), the rules move into the classes and the block is removed. |
| 4 | Phone number under the Continue button is visually weak (GPT UX 5) | PBI-17 moves the "or call" block below the card in the prototype's dark mono text. |
| 5 | Runtime coverage (GPT code 5–8) | Functional spot check on 6 pages × 2 widths: form walk, payload, trackers, dataLayer, cookies, phones, links and text identical; only computed styles differ (intended). Colour/weight changes do not touch scripts, forms or tracking. Real submission waits on D1. |
| 6 | Computed-style audit (GPT code 3) | axe on all 52 form pages × 2 widths + system pages (0 failures) plus the section screenshots of the changed areas. |

**Status: settled.**
