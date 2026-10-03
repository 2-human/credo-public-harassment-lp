# PBI-37 · One address pattern for the landing pages: debt-{type}-{angle}-{variant} (3 Oct)

## What changed (staging only)
The operator asked for one consistent address structure for the 48 cluster landing pages and chose every name:
`debt-` + debt type (harassment, lawsuit, credit-card, payday-loan, medical, garnishment) + angle (respond, fight-back,
demand-proof, know-your-rights, stop, make-them-pay, reduce) + a variant word per page. 45 addresses changed, 3 already
matched. The old addresses are kept as information (`tools/webflow/url-map-2026-10-03.json`, the hub registry, the
clusters document). start.credolegal.com (the live site the ads point to) was not touched and keeps the old addresses.

Four things were written on the staging site, nothing else:
1. **Page slug** of 45 pages (Pages API, one bulk call).
2. **Page head code** of the same 45 pages: only the canonical and og:url lines, now `https://start.credolegal.com/{new slug}`
   (the address the page will have when this site replaces start). robots noindex and the heading style block are unchanged.
3. **Shared footer code** (Site settings): the 34 keys of the phone table `window.CREDO_PHONES` that belong to renamed
   pages were renamed; numbers unchanged; no other character of the 33 k block changed.
4. Published to staging.credolegal.com only.

Not changed: copy, components, styles, forms, tracking scripts, page names in the Designer, search titles/descriptions,
FAQ data, the 15 pages outside the clusters (13 states, letter, multiple-collectors-one-attorney), home, thank-you.

## Verification done
- Backup first: served HTML of the 48 pages, the site head/footer code, the page list (`~/work/backups/credo-webflow-staging/2026-10-03-urls`).
- After publishing: 48 of 48 new addresses return 200; all 45 old addresses return 404; 17 other pages return 200.
- Per page (48): canonical and og:url carry the new address; robots noindex present; heading style block present;
  exactly one h1; one FAQPage block; title equal to before; **visible text identical to the snapshot taken before the rename**.
- Shared footer code: the intended file is found **verbatim** in all 48 served pages (control: the old footer was found
  verbatim in all 48 pages before the change); diff old→new is 34 changed lines, all table keys.
- No old address is written anywhere in the served HTML of the 65 pages checked.
- Browser check of the phone swap on 5 renamed pages with trackers blocked (google, meta, bing, no source, and a page
  that is not in the table): the number shown equals the table value in every case.
- Repo: `lp-sync.mjs --check` passes with the renamed keys (63 pages mapped; 6,205 props equal the prototype, the same 9
  known differences as before); the Marketing Hub registry carries both addresses per page and its smoke test passes.

## Known consequences (reported to the operator)
- Old addresses now return 404 on staging. The site plan has no redirect API; a redirect list for Site settings →
  Publishing → 301 redirects is prepared (`tools/webflow/redirects-2026-10-03.csv`, 45 rows). Needed before this site
  takes live traffic, because ads, sitelinks, Meta ads and Nextdoor short links point at the old addresses.
- Anything in the shared accounts that matches on page path (GTM triggers, Optibase tests, Clarity/Mouseflow filters,
  call-tracking pools) was not checked: no access by rule.
- Analytics history is keyed by the old paths; the hub joins old and new through the map.

## Questions for the reviewer
1. Is anything that depends on a page address likely to have been missed (on the site, in shared code, in the repo)?
2. Is pointing the canonical at the future start address with the NEW slug right, given start still serves the old slug today (pages are noindex)?
3. Any risk in the order of operations, and is the rollback clear (rename back with the same bulk call from the map; restore head code from the template; restore the footer from the backup file)?

## Old → new
| Old address | New address |
|---|---|
| debt-harassment-act-fast | debt-harassment-respond-act-fast |
| debt-lawsuit-respond-on-time | debt-lawsuit-respond-on-time | (unchanged)
| debt-lawsuit-summons-respond | debt-lawsuit-respond-served-papers |
| credit-card-debt-lawsuit-respond | debt-credit-card-respond-sued |
| payday-loan-lawsuit-respond | debt-payday-loan-respond-sued |
| medical-debt-lawsuit-respond | debt-medical-respond-sued |
| wage-garnishment-prevention | debt-garnishment-respond-before-it-starts |
| debt-harassment-fdcpa-attorney | debt-harassment-fight-back-fdcpa-attorney |
| debt-lawsuit-fight-back | debt-lawsuit-fight-back-creditor-suing |
| debt-lawsuit-attorney | debt-lawsuit-fight-back-attorney |
| collection-defense | debt-lawsuit-fight-back-collection-attorney |
| credit-cards | debt-credit-card-fight-back-law-firm |
| payday-loan-fight-back | debt-payday-loan-fight-back-illegal-loan |
| medical-debt-attorney | debt-medical-fight-back-attorney |
| wage-garnishment-attorney | debt-garnishment-fight-back-attorney |
| debt-harassment-validation | debt-harassment-demand-proof-validation |
| debt-lawsuit-proof | debt-lawsuit-demand-proof-prove-it |
| credit-card-debt-lawsuit-records | debt-credit-card-demand-proof-records |
| credit-card-debt-challenge | debt-credit-card-demand-proof-challenge |
| payday-loan-lawsuit-proof | debt-payday-loan-demand-proof-seems-wrong |
| medical-debt-credit-report-removal | debt-medical-demand-proof-unrecognized |
| medical-debt-bills-errors | debt-medical-demand-proof-bill-errors |
| wage-garnishment-judgment | debt-garnishment-demand-proof-judgment |
| debt-harassment-fdcpa-rights | debt-harassment-know-your-rights-fdcpa |
| debt-lawsuit-options | debt-lawsuit-know-your-rights-options |
| fcba-and-fdcpa | debt-credit-card-know-your-rights-fcba-fdcpa |
| payday-loan-debt-rights | debt-payday-loan-know-your-rights-explained |
| medical-debt-fdcpa-rights | debt-medical-know-your-rights-fdcpa |
| wage-garnishment-rights | debt-garnishment-know-your-rights-limits |
| debt-harassment-stop-calls | debt-harassment-stop-calls | (unchanged)
| debt-lawsuit-stop-calls | debt-lawsuit-stop-calls | (unchanged)
| credit-card-debt-stop-calls | debt-credit-card-stop-calls |
| payday-loan-debt-harassment | debt-payday-loan-stop-calls |
| medical-debt-stop-calls | debt-medical-stop-calls |
| stop-wage-garnishment | debt-garnishment-stop-now |
| debt-harassment-violations | debt-harassment-make-them-pay-violations |
| multiple-collectors-more-money | debt-harassment-make-them-pay-multiple-collectors |
| debt-lawsuit-violations | debt-lawsuit-make-them-pay-violations |
| credit-card-debt-violations | debt-credit-card-make-them-pay-violations |
| payday-loan-debt-violations | debt-payday-loan-make-them-pay-violations |
| medical-debt-violations | debt-medical-make-them-pay-violations |
| wage-garnishment-violations | debt-garnishment-make-them-pay-over-limit |
| debt-harassment-settlement | debt-harassment-reduce-settlement |
| debt-lawsuit-settlement | debt-lawsuit-reduce-settlement |
| credit-card-debt-negotiation | debt-credit-card-reduce-negotiation |
| payday-loan-reduce | debt-payday-loan-reduce-balance-check |
| medical-debt-reduce | debt-medical-reduce-bill-review |
| wage-garnishment-exemptions | debt-garnishment-reduce-exemptions |
