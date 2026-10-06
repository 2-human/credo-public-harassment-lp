# PBI-42 triage (6 Oct 2026)

GPT: approve with fixes. Gemini: do not approve (one blocker, answered below).

Answered by the code or by a test on live staging (trackers blocked)
- Gemini 2 (blocker, order with the localStorage UTM script): DOMContentLoaded listeners run in registration order and
  the phone script is registered first (top of the footer), so it reads the original query. That script also rewrites
  the URL only when the page already has tracking parameters, and then only adds to them. The live journeys pass.
- GPT 2 (click-id-only visits): tested live: gclid only and gbraid only keep (212) 561-5902 on the next page, msclkid
  only keeps Bing's (212) 993-7320 on the microsite home.
- GPT 3 (unknown/organic utm_source → undefined number): getSource returns 'default' when the table has no entry for
  the source and every row has a default, so the number is never undefined; tested live with utm_source=linkedin (keeps
  the landing page's default number on the next page). Saved values are also checked as 11 digits on read.
- GPT 4 (pages not in the table): they use the '*' row as before; the phone-table guard passes.
- GPT 7: same as Gemini 2.
- GPT 9 (path-wide cookie): intended: the whole staging host is the microsites.
- GPT 11 (Marketing Hub mirror): the lookup line mirror.mjs rewrites is unchanged.

Not in scope / existing
- GPT 5, 6, Gemini 5: form submission, call-tracking payloads and privacy-mode tests are not part of this change (no
  form sent per the standing rule; no call-tracking account access). Found while answering GPT 5: the form's cookie
  script reads `fbclig` (typo for fbclid), so a Meta click id never reaches the lead form; pre-existing, reported to the
  operator, not changed here; kept as decision D31 (operator 6 Oct: not now).
