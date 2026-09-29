# One thank-you design + one number · Resolution of the independent reviews (29 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini do not approve** (3 blockers) · **UX · GPT approve with fixes** ·
**UX · Gemini do not approve** (2 blockers).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini code 1, UX 3):** removing the template's UTM copy scripts may break attribution | **Checked, no loss.** These scripts copied URL parameters into storage/cookies on a page reached *after* the lead is sent (the lead already carries them). The site-wide attribution script (section 7, cookies + form fields) still runs on all three pages (served HTML), and /thank-you never had the removed scripts. The old code is backed up (backups/…/2026-09-29-thankyou). |
| 2 | **Blocker (Gemini code 2):** other items of the "Site Pages" collection could be broken | The collection has exactly **2 items** (/page/thank-you, /page/already-submitted), both checked live. |
| 3 | **Blocker (Gemini code 3; GPT 5-6):** form routing and conversion tracking not tested | Where the form sends visitors is set in formspree (not visible; real lead waits on D1). **None of the three thank-you pages loads GTM** (served HTML, before and after: 0), so no conversion tag depends on them (known, PBI-01d / D10). |
| 4 | **Blocker (Gemini UX 1):** call button and (718) number not shown; "REQUEST RECEIVED" looks like the main action | Screenshot added (TY3-page-thankyou-call.png): "CALL NOW · (718) 865-8350 →" beside "Schedule a consultation". The page layout is the approved /thank-you design; the status badge vs button look is logged for the design system (as in the D13 review). |
| 5 | Future edits of a shared component (GPT) | Intended: one source for both designs; Headline/Message are props so each page keeps its wording; the component description says where it is used. |
| 6 | Line breaks differ (/thank-you two lines, CMS pages one) | Minor; the CMS fields are single-line. |

**Status: settled.** D13 fully closed (wording, repeat-submission line, one number).
