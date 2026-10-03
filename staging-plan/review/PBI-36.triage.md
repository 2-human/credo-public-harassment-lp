# PBI-36 triage (3 Oct 2026) — GPT-5.5 code: approve with fixes · UX: approve with fixes

| Finding | Action |
|---|---|
| Code 1: "11 strings" vs 13 changed fields | Clarified: 11 visible strings were read back from the page body, plus the title and the description read from the head (13 in all). All present. |
| Code 2, 3, 12, 13: only copy changed / staging only / other pages / repo | Props are per page instance (not shared); publish target was the staging domain only (publish result lists staging.credolegal.com); the 3 Oct address rename check afterwards compared the visible text of all 48 cluster pages with their snapshot and found no difference; the repo change is the prototype content file and edits.json, nothing deploys from them. |
| Code 4, 6; UX 1, 3, 10: legal wording and advertising compliance | For the attorney's read, as all landing-page copy. The disclaimer and attorney-advertising footer are site-wide and unchanged. Flagged to the operator. |
| Code 5; UX 2, 4, 5, 8, 9, 11: first screen | Screenshots at 1440 and 390 in the UX packet: headline on two lines, sub-line and form above the fold, one h1, no overflow. |
| Code 7, 8, 9: tracking, phone swap, form submission | Not touched by a copy change. No test lead until D1 (standing rule). The phone swap was exercised on 5 pages in PBI-37. |
| Code 10, 11, 14 | FAQPage unchanged and equal to the visible questions (lp-sync/pbi14 check on 63 pages); title 53 characters, description 152; no ad account change. |
| UX 6, 7: step labels hidden on phones; "$8 ,000" spacing in the amount field | Site-wide form design, not this change. Added to the operator's list as a candidate backlog item. |
