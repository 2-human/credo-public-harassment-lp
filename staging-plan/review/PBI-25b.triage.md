# Heading order (PBI-33) · Resolution of the independent review (GPT-5.5, 1 Oct)

Verdict: **Code · GPT:** approve with fixes. No UX review: nothing visible changes (element compare).
**Gemini: not run** (API credits depleted).

| # | Finding | Resolution |
|---|---|---|
| 6–9 | Runtime behaviour, tracking, form, phone swap not tested | Saved-vs-live functional compare with campaign parameters, 4 pages × 2 widths: tracker requests, dataLayer, `tel:` links and swapped numbers, text, links, cookies and form payload identical; the only flag is the style row, which records the tag names themselves. No script or site code selects on these tags: inline scripts contain no `h1`–`h6`, `lp-question`, `heading-47` or `heading-41` selector; the inline CSS rules that name `heading-47`/`heading-41` are class rules. |
| 10 | Only two widths | Added 810 (tablet): 0 differing rows on 5 pages (landing page ×2, home, 2 thank-you pages), saved before vs saved after. |
| 11 | Pages outside the scan | The 56 published pages are the whole published surface; the heading scan after the change finds 0 skipped levels on all of them. New landing pages use the same components. |
| 12 | Assistive technology not tested | Not tested with a screen reader; the structural check (no skipped level, one h1 per page from PBI-25) is what Lighthouse and axe test. |
| 14 | Outside staging | Staging project only (start and enroll are separate Webflow projects, never changed); published to staging.credolegal.com only. |

**Status: settled** (Gemini pending: credits).
