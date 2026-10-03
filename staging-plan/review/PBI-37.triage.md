# PBI-37 triage (3 Oct 2026) — GPT-5.5 code review: approve with fixes

| Finding | Action |
|---|---|
| 1: prove only the intended slugs changed | The bulk call's reply lists exactly the 45 pages with their new slugs; the 17 other pages (13 states, letter, multiple-collectors-one-attorney, home, thank-you) answer 200 at their unchanged addresses. |
| 2: full head-code diff | Before the change the head code of all 45 pages was read through the API and each was identical to one template apart from the slug; the new head is that template with the new slug. Served pages confirm robots, canonical, og:url and the style block. Backup: `heads.before.json`. |
| 4: live site untouched | Checked read-only after the change: 8 old addresses on start.credolegal.com still answer 200, a new address answers 404 there. Publish result names staging.credolegal.com only. |
| 5: canonical points at a future address | Intended and unchanged in principle since PBI-01d: the staging pages are noindex and canonicalise to the address they will have when this site replaces start. Reported to the operator as a go-live item (redirects first). |
| 6 (blocker for go-live, not for staging): redirects not installed | Operator step M9: 45 redirects from `tools/webflow/redirects-2026-10-03.csv` in Site settings → Publishing → 301 redirects (no API on this plan). Staging takes no ad traffic. |
| 7: path-dependent rules in shared accounts | No access by rule. Listed for the operator under M9 (GTM, Optibase, recorders, call tracking). |
| 8, 9: forms, phone swap with trackers | No test lead until D1 (standing rule). Phone swap checked on 5 pages with trackers blocked; the swap script is first-party code in the site footer and does not depend on trackers. |
| 10, 11: sitemap, robots, other pages | Sitemap contains neither old nor new landing-page addresses (the landing pages are noindex); robots.txt is empty; no old address in the served HTML of the 65 pages checked. |
| 12, 13: descriptions and FAQ data | Added: meta description and every JSON-LD block are identical before and after on all 48 pages. |
| 14: rollback | Artifacts exist per page (`url-map`, `heads.before.json`, `site-footer.before.txt`, `served-before/`); steps are in the changelog. Not dry-run. |
| 15, 16: repo and hub | Repo files changed: lp-sync MAP keys, staging-pages.json, new-pages.json, lpcheck staging URL list, hub registry builder and pages (local only). None deploys to a site. |
