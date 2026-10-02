# PBI-35 (cluster copy: 26 pages aligned, 12 pages added) · Resolution of the independent review (GPT-5.5, 2 Oct)

Verdict: **Copy · GPT:** approve with fixes. **UX · GPT:** approve with fixes. **Gemini: not run** (API credits depleted).

## Copy
| # | Finding | Resolution |
|---|---|---|
| 2 | Cluster matrix and donor sources not in the packet | In `content/research/lp-angle-clusters-2026-10-02.md` and `tools/webflow/clusters/build-content.mjs` (each donated section names its sibling page). |
| 3 | "Every call after a cease request is … worth up to $1,000", "must stop all contact" on the new stop-calls pages | **Fixed** on the new pages: own answers with the statute's exceptions and "can be a violation". The older wording stays on the existing pages it came from (debt-harassment-stop-calls): logged for the attorney. |
| 4 | "The FDCPA pays you, we maximize that", "automatic liability" on medical-debt-violations | **Fixed:** own "why" row and own answers (what counts as a violation, one-year limit, no proof of financial harm needed). Same older wording remains on debt-harassment-violations: logged for the attorney. |
| 5 | "Make them stop" promises a result | Existing headline pattern on the live pages and in the ads; kept, logged for the attorney. |
| 6 | "take-home pay" | **Fixed:** "garnishment looks higher than the legal limit". |
| 7 | "A creditor needs a court judgment" too general | **Fixed:** "For most private consumer debts…". |
| 8, 9 | Stretch angles and outcome wording | The three stretch pages are marked "attorney to confirm" in their files and on the board. They are on staging only (noindex). |
| 11–13, 15 | Tracking, forms, phone swap, navigation | Not changed: forms, scripts and components are shared. New pages show the default new-clients number because they are not in the phone table yet (board note). No test lead (standing rule). |
| 14 | Browser check on 3 of 26 edited pages | The edits are text in existing elements; read-back covered all 63 pages and the before/after compare showed only the intended props changed. |
| 16 | Canonical to the future address | Same convention as the other 52 landing pages (D19). |
| 17, 19 | Staging-only and no component change not evidenced | Publish results name the staging domain only; start.credolegal.com was only read. Only prop values, page settings (title, description, share image, FAQ data) and page head tags of the new pages were written. |

## UX
| # | Finding | Resolution |
|---|---|---|
| 5 | Blank badge area | Test artefact (third-party requests blocked). |
| 6–8, 10 | Mobile stats wrap, step labels, small text, stats wording | Site-wide design, unchanged by this item. |
| 12, 13 | Different phone numbers between pages; tel links | The phone table assigns numbers per page; new pages fall back to the default. All numbers are tel: links. |

**Status: settled** (attorney items logged on the board; Gemini pending: credits).
