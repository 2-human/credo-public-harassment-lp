# Review packet: PBI-14 · schema: LegalService and FAQPage

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); pages are `noindex` until go-live; canonicals point at start.credolegal.com
  until go-live (decision D21).
- Audit G6: the JSON-LD `LegalService` (since PBI-01d a single block in the site head code) said "Credo Legal" at
  2151 W Hillsboro Blvd, Deerfield Beach, FL, and loaded its logo from the start site's asset store; there was no
  FAQPage. The operator confirmed the firm details on 30 Sep: **Credo Legal Services, P.C., 1 Liberty Street,
  Suite 4010, New York, NY 10006**.

## Change (published to staging only, 30 Sep)
1. Site head `LegalService`: `name` "Credo Legal Services, P.C."; `address` 1 Liberty Street, Suite 4010, New York, NY
   10006, US; `logo`/`image` and the site `twitter:image` now the red Credo logo in this site's own asset store.
   Unchanged: `url` (https://start.credolegal.com/, per D21), `description`, `contactPoint` telephone +1-212-461-4026,
   `sameAs` (the X profile is question D9). The head code was written back through the API and read back: byte-identical
   to the intended file; the only differences from before are those lines.
2. Per page (Webflow's page JSON-LD field, 52 pages: 51 landing pages + home): a `FAQPage` whose Questions/Answers are
   that page's own visible FAQ items (5–7 per page), taken verbatim from the served page (built by
   `tools/webflow/pbi14-faq-schema.py` from the component props read back from the served HTML).

## Evidence
- **Served HTML, all 56 published pages:** every page has exactly one `LegalService` with the new name, address and
  staging-hosted logo; the 52 form pages also have exactly one `FAQPage`, equal (as parsed JSON) to the expected one
  built from that page's FAQs: **52/52**. Each FAQ question and answer was checked to appear verbatim in its page's
  visible text before writing (0 misses).
- The system pages (404, 401, thank-you pages) carry only the site-wide `LegalService` (no FAQs).
- Runtime spot check (5 pages incl. home, /letter, a state page, medical-debt-attorney; 1440 + 390): form walk, payload,
  trackers, dataLayer, cookies, phones, links, styles identical 10/10. Nothing visible changed.

## Notes
- The visible FAQ answers on several pages still say that every call after a cease request is "a documented $1,000
  violation" / "worth up to $1,000" (the per-call claim the audit removed from the meta descriptions); the FAQPage
  mirrors the page as it must. Flagged to the operator as a copy decision (not changed here).
- Google shows FAQ rich results only for well-known government and health sites since 2023; the markup still states
  the FAQ structure for other search engines and AI assistants.

## Questions for the reviewer
1. Is the per-page FAQPage in Webflow's page schema field (static, not script-injected) the right mechanism, and how
   should it be kept in sync when FAQ copy changes?
2. Anything missing or wrong in the LegalService (e.g. `url` still on start.credolegal.com, `priceRange`, opening hours)?
3. Any concern with FAQ answers that contain phone numbers or legal claims being repeated in structured data?
