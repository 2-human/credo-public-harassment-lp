# PBI-21 (own copy for the four payday-copy pages) · Resolution of the independent review (GPT-5.5, 2 Oct)

Verdict: **Copy · GPT:** approve with fixes. **UX · GPT:** approve with fixes. **Gemini: not run** (API credits depleted).

## Copy
| # | Finding | Resolution |
|---|---|---|
| 1, 2, 5–7 | Evidence not in the packet | In the backup folder `2026-10-02-legacy4`: served pages before/after, the prop payloads, the read-back report (607 props on 6 pages, 0 differ), the publish result (staging domain only). start.credolegal.com was only read. |
| 3, 24 | Source of non-live text | Each content file's header names what is new; the generator `tools/webflow/legacy4/build-content.mjs` holds the source notes. |
| 9, 10, 14 | Garnishment rights too absolute (25% cap, hearing "at any time", bank-account rule on a wage page) | **Fixed** on stop-wage-garnishment: "for most consumer debts… disposable earnings", "you may have the right to object… depends on your state", the bank-account item replaced by job protection (15 U.S.C. § 1674). The same older wording remains on the existing page wage-garnishment-attorney: logged for the attorney. |
| 11 | Federal court-rule tags (FRCP) on state-court matters | Site-wide convention on the landing pages, kept for consistency; logged for the attorney. |
| 12 | "Truth in Lending Act" tag on high interest charges | **Fixed:** tag is now "Cardholder agreement". |
| 13 | Creditor vs debt collector | **Fixed** in the rights intro ("Debt collectors cannot:"). "Hold creditors accountable" is the live page's wording, kept. |
| 15 | "Within 24 to 48 hours", "experienced", "affordable" | Live wording, kept; for the firm to confirm. |
| 16 | "Right to respond + counsel" | Existing wording on the lawsuit pages, kept. |
| 4, 8, 17–23 | Forms, phone swap, tracking, other pages | Not touched by this change: only copy props, FAQ data and one title changed; forms, scripts and components are shared and unchanged. No test lead (standing rule). |

## UX
| # | Finding | Resolution |
|---|---|---|
| 3 | Empty badge area | Test artefact: third-party requests were blocked. |
| 4–7, 15 | Stats wording, mobile stat wrap, step labels, footer size, button labels | Site-wide design, not part of this change. |
| 8 | Only one page at 390 | All four were checked at 390 (no overflow, no empty elements); one screenshot was sent. |
| 11 | "Payday loans" in the credit-cards answer | Live wording: it lists the debts the firm handles. Kept. |
| 12 | Headline names only the FDCPA | Live headline, kept. |

**Status: settled** (attorney items logged on the board; Gemini pending: credits).
