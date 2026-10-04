# MH-09 · resolution of the GPT and Gemini reviews (4 Oct 2026)

Reviews: GPT-5.5 code (approve with fixes) and UX (approve with fixes); Gemini 2.5 Flash via Vertex code (do not
approve) and UX (approve with fixes).

| Finding | Resolution |
|---|---|
| "Form submission not tested / nothing sent" (GPT 3, Gemini 3.1 blocker) | **Rejected by standing rule.** No test lead goes out until D1, so the form walk stops before sending by design. The form element, its action and its fields are the same component as on the 47 landing pages and were not changed. |
| Draft note on the published legal pages (GPT 8, GPT-UX 3, Gemini 2.3/4.3, Gemini-UX 2) | **Operator decision (4 Oct): publish with the draft note.** Pages are noindex. Removing the note and filling in `[date of publication]` is the attorney's step before the domain switch (on the open list). |
| Off-hours script would override the about/legal button (Gemini 1.2, GPT 6) | **Checked, not the case.** about and the three legal pages have no `#herosec` (read from the served pages), so `target` is null and the button keeps its link to `/#herosec`. Verified after the publish with the browser clock fixed to Sunday 03:00 ET: about and terms keep `/#herosec`; home and LP set `javascript:void(0)` and the click scrolls the form into view (1440 and 390). |
| `#herosec` may not be the form (GPT 7) | The lead form sits inside `#herosec` on every page that has the id (7 homes + 47 LPs). check-components: "header button leads to the form" in all seven microsites. |
| "byte-identical" vs "menu turned on" contradiction (GPT 11, Gemini 1.4) | Wording: the checkpoint publish came *before* the landing pages got the menu (proving the component defaults change nothing). After the full publish, the pre-existing pages differ only in the header (menu) and footer (links). Packet clarified in the board item. |
| Site-wide style changes could alter old pages (GPT 12, Gemini 3.4) | Checked per class in the served HTML: `container-40` appears on 64 old pages, always with `w-container` (already `margin:auto`), so nothing changes there. `page-body` occurs only on the four new pages. `footerlogo` is white on every page now; before, it was red on pages without the Bottom CTA, which was the bug. |
| Keyboard and dropdown accessibility (GPT 13) | Tested on staging: Tab reaches "Services", Enter opens it (aria-expanded true), ArrowDown moves into the list, Escape closes it. axe stays at no violations. |
| FAQPage JSON-LD validity (Gemini 3.7) | Parsed on all seven homes: 3 questions each, all visible on the page. |
| Mobile menu icon blank (GPT-UX 4); About text against the left edge (GPT-UX 9) | The screenshots predated two fixes already live (icon colour, container margin). Retaken. |
| About/legal column misaligned with the landing pages; long lines (GPT-UX 9, Gemini-UX 3) | **Fixed.** `page-body` padding 80px (30px on phones), so the text starts where the landing pages' hero text starts (150px at 1440, 80px at tablet, 30px on phones); text width ≤ 660px. |
| Phone number wraps in the open phone menu (GPT-UX 5) | **Fixed site-wide.** `Text Block 14` (header phone) `white-space: nowrap`. This affected the 47 landing pages too. |
| Services labels differ between microsite and about/legal (GPT-UX 2) | By design (operator decision): on a microsite, Services lists that microsite's debt types; on the shared about/legal pages, it lists the seven microsites. |
| Tracking, UTMs, phone swap (GPT 4/5, Gemini 3.2/3.3) | No tracking script, GTM tag or phone table was changed. New links carry `data-append-utm` like the existing ones; the phone table is unchanged (`*` = home number on the new pages). check-microsites checks the per-slug phone in all 90 mirrored pages. |
| Canonical/noindex until the domain switch (GPT 9, Gemini 4.1/4.2) | Same as the 47 landing pages; part of PBI-24 (domain switch). |
| Lighthouse scores (GPT 10) | The new pages score like the landing pages (home 61 vs LPs 61–65; about/legal 79–83). The remaining cost is the tracker scripts, which belong to shared accounts. No page-level script was added. |
| Root-path routing depends on the server root (GPT 14) | Recorded in build-microsites.mjs and the README: serve public/marketing-hub as the root (the local server does). |
| Unrouted links fall back to staging (GPT 15) | Intended: only addresses with no microsite file (e.g. state pages) go to staging. |
| No change outside staging (GPT 18) | Publishes went to the staging domain only (`6ab913a1…`, Webflow subdomain off). start and enroll were not written. |

**After the fixes (published to the staging domain only, 4 Oct):** h1 / text edge on about and terms 150px at 1440 and
30px at 390, the same as the landing pages; text width 660px; header phone `white-space: nowrap` on every page type.
check-mirror --all before this publish: all 59 pages equal staging at 1440 and 390 (79,226 elements); after it the
prototype was re-synced and the checks rerun.
