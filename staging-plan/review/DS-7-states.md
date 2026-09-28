# Review packet: DS-7 (part 2) · The 13 state pages rebuilt on the landing-page template

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there.
- The 13 state pages (/ohio, /kentucky, /utah, /south-dakota, /missouri, /kansas, /california, /minnesota, /maryland,
  /colorado, /new-york, /new-jersey, /florida) were the same old purple page with the old two-copy multi-step form.
  The operator decided: every page gets the new landing-page design and **only the new form**; legacy forms go.
- Pilot: /ohio was rebuilt first (duplicate of the landing page `debt-harassment-stop-calls`, state copy written in),
  checked, and **approved by the operator on 28 Sep**. This packet covers the swap and the other 12.

## What changed (Webflow Data API; published to staging.credolegal.com only)
Per state page:
1. The old page was kept unchanged but **drafted** under slug `{state}-old` (title "{State} (old design)"), so it can
   be restored. Revert steps and the old head code / SEO are backed up outside the repo.
2. A new page was created by **duplicating the approved Ohio page** under the original slug.
3. Exactly three text nodes changed, Ohio → the state name:
   - hero lede "Serving {State} residents. Fill in the short form below to see if you qualify."
   - what-we-do headline "Let us fight for you in {State}."
   - who-this-helps item 5 "{State} residents who want attorney representation from day one."
4. SEO title, meta description and Open Graph copied from the old page (6 pages have the state as title, 6 the generic
   "Credo Legal | Legal Solutions for Debt Relief and Creditor Harassment" title, exactly as before).
5. Page head code = **the old page's own head code, verbatim** (robots `index, follow`, canonical, OG/Twitter, JSON-LD,
   GTM, Mouseflow, etc.; South Dakota keeps its extra `.addressmj` style) **plus** one style block the new design needs
   (heading sizes after the H1/H4 → H2/H3 fix). Page footer code = the landing-page template's footer (the old footer
   loaded multi-step.js and the old-form validation, which no longer exist on these pages). Page script
   `RemoveStateOptions 1.0.0` applied (used by the new form; duplication does not copy page code or scripts).
6. Call-tracking number: the page's phone-swap embed keeps its code byte-for-byte; only the `phones` map changes, set to
   **the number the old page showed, for every source**: 718-865-8350 for OH, KY, UT, SD, MO, KS, CA (as before);
   the state's own local number for MN 612-260-9170, MD 443-483-4080, CO 720-414-1751, NY 212-561-5902,
   NJ 201-416-7080, FL 407-512-0808 (as before). The office line 212-461-4026 stays where it was.

**Correction to the pilot found and fixed here:** the pilot Ohio page had taken the landing page's head code, which is
`noindex, nofollow` with a self canonical. The old Ohio page was `index, follow` with canonical `https://start.credolegal.com/`.
Ohio now has its own old head code back (plus the heading style block), like the other 12.

## Evidence (all on the live site, 28 Sep, trackers blocked in every test, no lead sent)
- `tools/webflow/verify-ds7-states.py` (served HTML, 13 pages): status 200; new form present (`#heropopup`, `#gtmform`);
  no `#submitBtn`, `#ngtmform` or multi-step.js; the three state strings present; no other "Ohio" on the 12 (only the state
  dropdown option); SEO title as before; robots `index, follow`, no `noindex`; canonical as before; phone embed identical to
  Ohio's after masking the numbers; phone map = the expected number ×4; `{state}-old` returns 404 (draft).
  **Result: 13/13 OK, 0 failures.**
- `tools/webflow/submit-capture.mjs` (walks the form with test data and presses Submit; requests answered locally):
  iPhone (WebKit) and desktop (Chromium), 13 pages each: **26/26 sent exactly one POST to formspree.io/f/xzzyzzwj with 21
  fields**, the same form and field count as the approved landing pages.
- `tools/webflow/verify-ds7-phones.mjs` (rendered, after the swap script runs), each page × utm_source none / google / meta
  / bing: every `tel:` link is the expected number or the office line; no page errors. **52/52 OK.**

## Known, not caused by this change (already on the board)
- Body copy shown in Title Case ("Tired Of Unsecured Debt…") comes from a capitalize style on the template (PBI-11).
- `#ngtmform` and the old form are gone from these 13 pages; the legacy components are removed from the site only once no
  published page uses them (8 non-state pages still do; next in DS-7).
- The old state pages' canonical points to the home page `https://start.credolegal.com/` (kept as it was; a self canonical
  would be an SEO decision for the operator).

## Questions for the reviewer
1. Is anything in the method likely to break tracking, SEO or the form on these pages compared with before?
2. Is the evidence enough to call the 13 pages done, and what else would you check?
3. Anything in the phone handling (same number for all sources, as before) you would flag?

Screenshots (UX pass): South Dakota phone hero, Florida desktop hero, New York phone what-we-do, New Jersey desktop who-this-helps.
