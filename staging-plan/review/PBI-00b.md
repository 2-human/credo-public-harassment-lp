# Review packet: PBI-00b · Remove dead-weight pages

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. Work happens on a **staging clone** only: Webflow site
  `6ab90fb0761d44332faf21c8`, only domain `staging.credolegal.com`. Production (`start.credolegal.com`) and the developer's
  staging (`enroll.credolegal.com`) are separate Webflow sites and must not change.

## Goal
Remove pages that have no purpose on staging (test pages, an unpublished draft, an unused blog and four old landing pages
already replaced by newer ones), without deleting anything, so that every later fix only has to cover pages that matter.
The operator chose to **keep all 13 state pages**.

## What changed (27 Sep, published to the staging domain only)
- 8 static pages set to **draft** (Webflow keeps them; a draft is not published): `test`, `test-page`, `know-your-rights`,
  `wage-garnishment-rights`, `medical-debt-harassment`, `medical-debt-errors`, `wage-garnishment-attorney-active`,
  `remove-property-lien`.
- The 4 items of the "know your rights" CMS collection **unpublished** (kept as items).
- Before the change: the served HTML of each removed page and the CMS item state were backed up; every change is reversible
  (set draft = false / republish the items).
- Publish call: `customDomains: [staging domain id]`, `publishToWebflowSubdomain: false`.

## Evidence (re-checked 28 Sep)
1. The 8 removed URLs return HTTP 404 on staging.
2. All 57 remaining published pages return HTTP 200 (13 state pages, 30 landing pages, home, 8 older landing pages,
   letter-type pages, thank-you pages, 401, 404).
3. enroll.credolegal.com and start.credolegal.com: 30 pages each, byte-identical (sha256) to the fingerprints taken before any change.

## Conclusions to challenge
1. The removed pages are no longer reachable on staging, and nothing was deleted.
2. No kept page broke.
3. Nothing outside the staging site changed.
