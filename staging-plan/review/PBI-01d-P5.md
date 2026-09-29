# Review packet: PBI-01d P5 · landing-page template and the prototype-to-Webflow copy sync

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow; **staging.credolegal.com is the production site being built**.
- After P3–P4 every landing page is: navbar · LP · Hero · LP · Lead form · LP · Trust strip · LP · What we do ·
  LP · Common problems · LP · How it works · LP · Rights and FAQ · LP · Bottom CTA · footer, all components, with each
  page's copy in component props (8 LP components, 111 text/show-hide props in total).
- Each landing page has a coded prototype (`public/harassment-lp/content-*.js`, one `window.CREDO` object per page);
  copy is approved there first and then applied to Webflow.

## Change
1. **Draft page "Landing page template"** (`/landing-page-template`, Webflow draft, never published): a duplicate of
   a finished landing page, so it is made only of the shared components. New page = duplicate it, set the slug/SEO,
   update the 3 per-page lines in the page head code (robots, canonical and og:url point at the new slug; the
   duplicate still points at the page it was copied from), set the props, and add the slug to the phone table
   (`window.CREDO_PHONES`, check with `check-phone-table.py`).
2. **`tools/webflow/lp-sync.mjs`** (read-only): loads a prototype's `window.CREDO` (the 13 state pages and /letter
   share `content-state.js`, selected by query string), maps it onto the component props (`lp-components.json` holds
   every component and prop id), and compares with the copy on the live page (`lp-extract.mjs`, which reads the props'
   text back out of the served HTML). It writes, per page, the prop `values` arrays ready for the Webflow API call, and
   a report of every prop that would change. It never writes to Webflow; copy changes still go through approval.
   - Mapping rules: word tags are typed in capitals in Webflow (PBI-11), statute citations keep their case
     (§ 1692c(b)); props the prototype does not define (e.g. the "Why Credo" heading) are left as they are.
   - The slug → prototype map was derived by matching page copy (1:1 for 33 prototypes; the 4 legacy copies of the
     payday page have no prototype of their own, D4/PBI-21).
3. `lp-extract.mjs` is also the post-change check: after any prop update, read the page back and compare.

## Evidence
- **Round trip on the current site:** prototype copy vs the live copy for 47 pages: **4,704 of 4,716 props equal**.
  The 12 differences are real copy differences, listed below; none were applied.
  - Hero headline/lede wording (8 props on 7 pages): debt-harassment-fdcpa-attorney (form intro), credit-card-debt-stop-calls,
    credit-card-debt-violations, wage-garnishment-prevention, medical-debt-credit-report-removal,
    payday-loan-debt-harassment, debt-harassment-fdcpa-rights (H1 and lede swapped).
  - medical-debt-attorney step tags in mixed case (3): fixed in Webflow in P4 (capitals, as everywhere else).
  - /letter "Anyone who want…" (1): a typo in the prototype, fixed in `content-state.js`.
- Template page: 10 elements, all component instances (navbar, 8 LP components, footer); draft, so excluded from
  publishing.

## Questions for the reviewer
1. Is a read-only sync (payloads + diff report, applied by a person/agent through the API) the right level of
   automation for legally approved copy, versus writing directly?
2. Anything missing from the template workflow for a new page (tracking, phone table, SEO, canonical)?
3. Is the derived slug → prototype map a sound way to tie the two, or should it be declared in each content file?

## Round 2 (after the first reviews, 29 Sep)
- The slug → prototype map is a **declared table** in `lp-sync.mjs` (it was derived once by matching copy, then written
  down). New check `node lp-sync.mjs <extract> --check` fails if a form page has no prototype, a prototype file is
  missing or does not load, two pages share one prototype, or `content-state.js` does not select the page's own state
  (all 13 state pages checked by name): **ok, 47 pages mapped, 4 legacy pages without a prototype, 0 problems.**
- After P4 went live the round trip is **4,708 of 4,716 equal**; the 8 left are the hero wording differences above
  (the medical-debt-attorney tags and the /letter typo are resolved).
- Coverage: the compared props are the ones the prototype defines for the items that exist (e.g. a page with 5 FAQs
  has no FAQ 6/7 text); show/hide flags are compared through the item counts, which match on all pages.
- `lp-sync.mjs` and `lp-extract.mjs` make no network requests except `lp-extract` loading local HTML files; neither can
  write to Webflow (no API client in either).
