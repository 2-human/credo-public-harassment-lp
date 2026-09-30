<!-- reviewer: gemini-3.1-pro-preview · 2026-09-30T10:05:00.173Z · 29s · images sent: 0 · usage {"promptTokenCount":1190,"candidatesTokenCount":694,"totalTokenCount":4166,"promptTokensDetails":[{"modality":"TEXT","tokenCount":1190}],"thoughtsTokenCount":2282,"serviceTier":"standard"} -->

### Evaluation of Conclusions
*   **Change 1 (`LegalService` update):** The evidence supports the conclusion. The API read/write was verified byte-identical and all 56 pages contain the updated schema. 
*   **Change 2 (`FAQPage` additions):** The evidence supports the conclusion. The 52/52 parse check confirms the JSON-LD was successfully generated and matches the page text.

### Findings

| # | Severity (blocker / should-fix / note) | Finding | Evidence or reasoning | Suggested check |
|---|---|---|---|---|
| 1 | should-fix | Potential `<script>` breakage from unescaped FAQ text in JSON-LD. | The script pulled text "verbatim" into the Webflow page JSON-LD field. If the FAQ text contains `</script>` or unescaped double quotes (e.g., "worth up to $1,000"), it will prematurely terminate the JSON-LD block and break subsequent scripts (tracking, forms, phone swap). | Verify `tools/webflow/pbi14-faq-schema.py` strictly sanitizes HTML and escapes quotes/control characters before API injection. |
| 2 | should-fix | 47 form pages were not tested for dynamic functionality. | Runtime spot checks (form payloads, tracking, phone swaps) were only done on 5 of the 52 form pages. If the JSON-LD injection corrupted the page settings or adjacent scripts on specific pages, it was missed. | Run a broader automated check or manual sample of forms and phone-number scripts on the remaining 47 pages. |
| 3 | note | FAQPage schema will silently drift out of sync with page copy. (Answers Q1) | Webflow's page JSON-LD field is static once injected. If an editor updates FAQ text in Webflow, the schema will retain the old text. | Add to the content SOP that `pbi14-faq-schema.py` must be re-run after copy updates, or move FAQs to Webflow CMS to use native dynamic JSON-LD bindings. |
| 4 | note | `LegalService` is missing required/recommended fields, and `url` creates a go-live dependency. (Answers Q2) | Google recommends `priceRange` (e.g., "$$") for LegalService; omitting it triggers warnings in Search Console. The `url` correctly points to `start.credolegal.com` for now (D21), but must be updated upon go-live to avoid pointing production schema to an old subdomain. | Add `priceRange` to the schema block. Add a strict go-live checklist item to update the `url` field to the new production domain. |
| 5 | note | Amplification of legal claims in structured data. (Answers Q3) | Duplicating the "$1,000 per call" claim in `FAQPage` schema explicitly feeds this data to search engines and AI assistants, compounding the risk already flagged for the page copy. | Wait for the operator's copy decision; if they alter or remove the claim from the page, immediately re-run the FAQ schema script to update the JSON-LD. |

**Overall verdict:** approve with fixes
