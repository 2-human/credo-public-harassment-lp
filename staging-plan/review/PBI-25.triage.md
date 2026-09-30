# PBI-25 · Resolution of the independent review (GPT-5.5, 30 Sep)

Verdict: **Code · GPT:** approve with fixes. No UX review: nothing visible changes (0 non-tag differences, below).
**Gemini: not run** (API credits depleted, HTTP 402); to be re-run once topped up.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Levels and consistency with the landing pages not shown (GPT 4, 5) | Outlines compared (served HTML): a landing page runs h1 hero → h3 form question → h2 section label + h2 headline per section → h3 card titles / step numbers / FAQ questions; home now follows the same pattern section by section, and the thank-you pages are h1 "Thank you." → h2 labels and headlines → h3 step numbers. |
| 2 | Page-level CSS could style other h2/h3 on these pages (GPT 6) | The selectors are shown in the packet's change list (home head: `.heading-49`, `.mjthankyousteps-copy`, `.heading-38-copy-copy`, `.mjthankyouheading(-copy)`, `.heading-39-copy`, `.heading-40`, `.heading-42`; component embed: `.heading-38-copy`, `.mjthankyousteps`, `.mjthankyouheading`, `.heading-44-copy`, `.heading-42`). The after-publish compare covers **every element** on the page, not only the re-tagged ones: 0 non-tag differences, so nothing else is affected. The CSS moves into the classes with the class clean-up (DS-8), like the landing pages' G5 block. |
| 3 | Scripts might target headings by tag (GPT 7) | Searched the served home and thank-you pages (all inline scripts and site code): no `querySelector`/`getElementsByTagName` on h1–h6. The scroll links use the ids (`whatdo`, `whydo`, …), which are kept; GTM/Clarity are not configured on heading tags (no change to their tags in this item). |
| 4 | Functional coverage (GPT 8) | Before/after compare on home and /thank-you at 1440 and 390: form walk, payload, trackers, dataLayer, cookies, phones and links identical; only the style hash differs (it includes the tag names). |
| 5 | Other pages / other component instances (GPT 2, 9) | The Thank-you page component has 2 instances: /thank-you and the Site Pages template (which serves /page/thank-you and /page/already-submitted); all three URLs checked. The home CSS lives in the home page's own head code. The landing pages were not touched (one H1 already, G5). |
| 6 | The two home rows at 390 (GPT 10) | They are PBI-19's changes, published before this item: the footer's bottom padding while the phone call bar exists (861 → 951px section height) and the bar's pulsing dot (an animation, its size changes over time). |
| 7 | Outside staging (GPT 11) | Published only to the staging domain; the start site is a separate Webflow project, never changed. |

Found while checking the outline (not changed; copy, for the operator): home repeats two headings: "WHY CREDO" above
"Common problems…" and "From violation to legal claim, fast." under "Who this helps", where the landing pages have
"What we see" and "You'll recognize your own situation here." Sent as D25.

**Status: settled** (Gemini pending: credits).
