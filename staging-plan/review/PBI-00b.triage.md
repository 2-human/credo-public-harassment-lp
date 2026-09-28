# PBI-00b · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Verdicts received: **GPT approve with fixes** (0 blockers, 9 should-fix, 5 notes) · **Gemini do not approve** (2 blockers, 2 should-fix, 1 note).
Both rested on the same gap: the packet proved the removed URLs 404 and the kept pages return 200, but not that nothing
still points at the removed pages, nor that the kept pages still work. Extra checks were run on 28 Sep; no change to the site was needed.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | "Nothing was deleted" not proven (GPT 1) | **Checked in Webflow (Data API, 28 Sep):** all 8 pages are still in the project with `draft: true`; all 4 "Know Your Rights" CMS items still exist with `isDraft: true`, `isArchived: false`. Backups of their HTML and CMS state are in the operator's backup folder. |
| 2 | CMS item URLs not checked (Gemini 1) | **Checked:** `/know-your-rights/collector-penalties`, `/how-credo-legal-provides-…`, `/recognizing-and-responding-to-abusive-practices`, `/what-is-the-fcba-and-fdcpa`: all HTTP 404. |
| 3 | Internal links may now lead to 404s (GPT 2, 8; Gemini 2 blocker) | **Checked:** all 2,249 links on the 57 published pages scanned; **0** point at any of the 12 removed URLs. Staging publishes no sitemap (`/sitemap.xml` 404), so nothing lists them there either. |
| 4 | Empty CMS lists on kept pages (GPT 13; Gemini 4) | **Checked:** no published page contains a Webflow collection list (`w-dyn-list` / `w-dyn-empty`), so nothing could have gone empty. |
| 5 | HTTP 200 ≠ working; forms, tracking, phone numbers not tested (GPT 3, 5–7; Gemini 3 blocker) | **Covered by later full runs with this change live:** PBI-01 cross-browser run (30 landing pages × 8 devices: form walk 240/240, phone numbers vs the campaign sheet 344/344, tracking fields present); PBI-05 run (26 other published pages load, 0 script errors); **28 Sep submit test** (every page with a lead form, iPhone + desktop, submit pressed, request captured locally, see PBI-01 resolution). |
| 6 | Kept staging pages not compared to before (GPT 4) | Drafting a page changes no other page in Webflow; the later item runs compared behaviour, not bytes, because PBI-01 deliberately changed page code afterwards. Accepted as a note. |
| 7 | Outside staging (GPT 9–11; Gemini 5) | Publish went to the staging domain id only (`6ab913a1b84e0288ab05b049`, checked with `get_site` before every publish); enroll and start 60/60 pages byte-identical to the fingerprints (re-checked 28 Sep). No external system reads the staging CMS. |
| 8 | 401/404 returning 200 is ambiguous (GPT 12) | `/404` and `/401` are Webflow's utility pages and serve 200 at their own URL; a missing URL (e.g. the 12 removed ones) returns a real **404** status with the 404 page. |
| 9 | State pages only checked by status (GPT 14) | All 13 present in the page list (draft false) and rendered in the 28 Sep design inventory (desktop + phone screenshots). |

**Status: settled.** Gemini's two blockers are answered by checks, not by argument (0 links to removed URLs; forms/tracking/phones covered by the later runs and the submit test).
