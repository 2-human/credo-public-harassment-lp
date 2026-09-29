# PBI-08 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini do not approve** (1 blocker). No UX review: nothing visible changes.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini 3):** the new `fbclid` field could break the formspree → CRM path; no real lead was sent (also GPT 1, 5, 9) | **Handed to the operator, who tests on the CRM end** (29 Sep). Not testable from here: the CRM is not visible and a real test lead waits on D1. Formspree accepts extra fields; whether the CRM maps, ignores or rejects `fbclid` is the open check. |
| 2 | Which value wins when the two same-named cookies differ (GPT 3, 14; Gemini 7) | **Tested and changed.** Browsers list the older cookie first. With an older value on this host and a newer one on `.credolegal.com` (another subdomain), "first" sent the older value. The reader now takes the **last (newest)** match, the same rule the phone script uses, so the lead and the number shown agree on the source. Republished; served code byte-checked; the conflict test now sends the newer value. |
| 3 | Link decoration / MutationObserver with the renamed key (GPT 6, 16; Gemini 4, 5) | **Tested:** after a Meta-style visit, the one internal link (the logo, `/`) carries `utm_source` and `fbclid`; no `fbclig`; **0 external links** get it (section 7 only decorates same-host links). The MutationObserver re-runs the same three functions on DOM changes; the form submit test covers it (fbclid present on 4/4 pages). |
| 4 | "Returning visitors lose all attribution" is broader than tested (GPT 2) | Reworded on the board to what was tested: utm_source, utm_medium, utm_campaign and gclid were empty on return visits; now sent. fbclid tested separately. |
| 5 | Call-click tracker evidence missing (Gemini 6, GPT 11) | **Tested:** none of its ids (`clicktocall`, `clicktocall1`, `clicktocall2`) exist on the page; clicking every call link made **no request** to credo.debtfixer.co. The call links' ids are navcta, herocta, footercta, bfootercta. Left for D6 / PBI-22. |
| 6 | Stale click ids across touches (GPT 7) | Stated to the operator: each click id lives 90 days on its own; last touch is `utm_source`. Existing behaviour for gclid. |
| 7 | Other browsers, tracker-enabled runs, edge values (GPT 4, 10, 17) | Chromium only; trackers blocked by rule (shared accounts). The change is plain string handling on `document.cookie`, same in every browser; Meta's `fbclid` values are URL-safe and pass through `encodeURIComponent`/`decodeURIComponent`. |
| 8 | Phone swap, page list, diffs (GPT 8, 12, 13) | Phone numbers unchanged in the four-visit probe; the byte check covers the full served page; backups and expected files kept in the backup folder. |
| 9 | `.credolegal.com` cookies set from staging (GPT 15) | Pre-existing (page footer script), part of the deferred UTM clean-up (PBI-01b). |

**Status: settled on our side**; the CRM check is with the operator.
