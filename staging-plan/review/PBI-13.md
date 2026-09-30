# Review packet: PBI-13 · meta descriptions within 160 characters

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all pages are `noindex` until go-live.
- Audit G3: the meta descriptions were copied from the prototype and ran 162–249 characters. The audit (Part B) gives an
  approved text of at most 160 characters for 26 pages. They drop two claims from the old texts: "every illegal call is
  up to $1,000" (the FDCPA caps statutory damages at $1,000 per action, § 1692k(a)(2)(A)) and "recent CFPB rule changes"
  (the 2025 CFPB medical-debt reporting rule was vacated). None carries the NY attorney-advertising disclaimer: it cannot
  fit, and every page has it in the footer.

## Change
1. Prototype first: the 26 prototype pages (`public/harassment-lp/*-locked-paired-portrait-noborders.html`) carry the
   approved text in `<meta name="description">` (each replaced only where the old text equalled the live Webflow text).
2. Webflow, 26 pages, one bulk API update: SEO description = the approved text; Open Graph description set to
   "same as SEO description", so `og:description` and the `twitter:description` Webflow derives from it are identical.
3. Published to staging only.
4. Decision D23 (approved by the operator 30 Sep): 18 more pages. 17 were over 160 characters with no approved text
   (13 state pages, home, /letter and fcba-and-fdcpa shared one 230-character generic text; debt-harassment-act-fast
   was 167), and two (act-fast, multiple-collectors-more-money) used the "$1,000 per violation" claim. New texts:
   - home, /letter, fcba-and-fdcpa: "Facing unsecured debt or creditor harassment? Our attorneys challenge invalid debts,
     defend lawsuits and enforce your FDCPA rights. Free case evaluation." (153)
   - each state page: "{State} residents facing debt collectors or a debt lawsuit: our attorneys challenge invalid debts
     and enforce your federal rights. Free case evaluation." (149–157)
   - debt-harassment-act-fast: "The day you enroll, our attorneys send the collector a cease letter. Every contact after that
     is documented as a potential violation. Free case evaluation." (155)
   - multiple-collectors-more-money: "Several collectors calling? Illegal contacts can add up to statutory damages under the
     FDCPA. Our attorneys track every violation. Free case evaluation." (152)
   Prototype first where one exists (act-fast and more-money pages; the shared state prototype sets the description from
   `content-state.js`, per state, and /letter gets the generic text); home and fcba-and-fdcpa have no prototype.
   In all, 44 pages get a new description; with the 8 landing pages already at most 160 (collection-defense,
   credit-cards, medical-debt-attorney, payday-loan-debt-rights, payday-loan-fight-back, payday-loan-lawsuit-proof,
   payday-loan-lawsuit-respond, stop-wage-garnishment) every published page is then at most 160 characters.

## Evidence
- **Served HTML, all 56 published pages vs before:** 44 pages differ in exactly 6 lines each (the `description`,
  `og:description` and `twitter:description` meta tags, old and new); the other 12 pages are unchanged.
- **Served tags:** on all 44 pages the description equals the intended text exactly, and `og:description` and
  `twitter:description` equal it. The longest description on any published page is now **159 characters** (was 249).
- **Not changed (noted):** medical-debt-attorney and stop-wage-garnishment keep an older separate social text
  (og/twitter) that differs from their meta description; both are within 160 and outside the approved texts.
- Only `<head>` meta tags changed: nothing visible on the pages, no scripts, forms or tracking touched.

## Questions for the reviewer
1. Are the copied-from-SEO Open Graph descriptions the right choice (vs separate social copy)?
2. Anything in the approved texts that reads as a guarantee or an unsupported legal claim?
3. Do the D23 texts (the operator approved them) raise any concern, e.g. the state pages naming a state?

## Round 2 (after the first reviews, 30 Sep)
- **State pages do not contain "{State}" (Gemini blocker):** `{State}` in this packet is only notation. Each state page's
  SEO description was written with its own state name, and the served check compares every page with its exact
  expected text: 13/13 state pages match, e.g. /south-dakota serves "South Dakota residents facing debt collectors or a
  debt lawsuit: …" (157 characters), /ohio "Ohio residents …" (149).
- **Prototype files verified (both reviewers):** all 28 prototype pages (26 + act-fast + more-money) contain exactly one
  `<meta name="description">` with exactly the approved text. `content-state.js` sets the description per state at
  load (checked for california, new-jersey, south-dakota: the state name and 155/155/157 characters) and the generic text
  for /letter (153).
- **Publish scope (GPT 3):** the publish call names only the custom domain staging.credolegal.com, with the Webflow
  subdomain off; this Webflow project is the staging site only (the live start site is a separate project, never
  changed).
- **Runtime spot check (GPT 5–8):** live vs pre-change on 6 pages (incl. home, /letter, a state page, act-fast) at 1440
  and 390: form walk, form payload, tracker requests, dataLayer, cookies, phone numbers and `tel:` targets, links and
  styles identical 12/12. Real submission waits on D1.
- **Copy (GPT 11–14):** the D23 texts were approved by the operator. The cease-letter wording matches the approved audit
  texts ("send a cease letter the day you enroll") and the on-page copy of these pages; the state pages already name
  the state in their headline and copy. The "add up to statutory damages" wording is flagged back to the operator as
  a note (FDCPA statutory damages are capped per action).
