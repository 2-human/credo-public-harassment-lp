# PBI-14 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 30 Sep)

Verdicts: **Code · GPT:** approve with fixes. **Code · Gemini:** approve with fixes. No UX review: structured data only.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Unescaped FAQ text could break the JSON-LD script (Gemini 1) | Not the case: every served JSON-LD block was parsed (JSON) and compared as data with the expected FAQPage: **52/52 equal**; LegalService parses and is correct on 56/56. Webflow writes the field as JSON (the API returns it as an object). |
| 2 | Runtime checked on 5 pages only (both) | **Re-run on all 52 form pages × 1440 and 390:** form walk, payload (412 b), trackers, dataLayer, cookies, phones, links **identical on 104/104**; 7 loads first showed a style-hash-only difference, 6 identical on re-run and the 7th (maryland 390) identical in the full rendered comparison (every element's box and every text run) twice. |
| 3 | FAQ/schema can drift when copy changes (GPT 7, 16) | `pbi14-faq-schema.py <extract> --check <served-dir>` added: fails for every page whose served FAQPage no longer equals its visible FAQs (now: ok, 52/52). Documented on the board note: run it after any FAQ copy change; new pages from the template get their FAQPage the same way. |
| 4 | Per-call "$1,000" claims repeated in structured data (GPT 8) | The FAQPage mirrors the visible page, as it must. The visible copy (9 pages, about 15 sentences) is sent to the operator as **D24** with a proposed pattern; once decided, copy and FAQ schema are updated together. |
| 5 | Telephone in LegalService not confirmed (GPT 2) | Unchanged +1-212-461-4026: Credo's main New York number, the one the NY attorney-advertising disclaimer uses for all non-Nextdoor content. |
| 6 | twitter:image / social cards (GPT 14) | Same red Credo logo file, now served from this site's asset store; the image URL returns the PNG. |
| 7 | Scope / production (GPT 18) | The Webflow project is the staging site only; the live start site is a separate project, never changed. |
| 8 | Real submission / tracking destinations (GPT 11–13) | Waits on D1; payload, trackers and phones identical (row 2). |

**Status: settled.**
