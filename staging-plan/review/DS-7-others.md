# Review packet: DS-7 (part 3) · The last 8 older pages rebuilt on the landing-page template

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there.
- The operator decided every page gets the landing-page design and **only the new form**. The 13 state pages were done and
  reviewed earlier today (packet DS-7-states). This packet covers the remaining 8 older pages: /letter, /medical-debt-attorney,
  /debt-harassment-act-fast, /multiple-collectors-more-money and the 4 payday pages (/payday-loan-fight-back,
  /payday-loan-debt-rights, /payday-loan-lawsuit-proof, /payday-loan-lawsuit-respond).
- Each page's copy comes from its prototype copy file (content-*.js), shown to the operator in the design preview before the
  rebuild decision (D11, D4).

## Method (Webflow Data API; published to staging.credolegal.com only)
Per page, same recipe as the state pages:
1. Old page renamed `{slug}-old`, set to **draft** (kept unchanged for revert). Old head code and SEO backed up.
2. New page = **duplicate of an existing new-form page with the same section counts**, under the original slug:
   - /letter and /medical-debt-attorney from the approved Ohio page (3 bullets, 4 rights).
   - The 4 payday pages and act-fast from /payday-loan-debt-harassment (4 bullets, 6 rights).
   - /multiple-collectors-more-money from /multiple-collectors-one-attorney (5 bullets, 6 rights).
3. Copy: the template's text nodes were matched to the template's own copy file by exact text (in page order, first unused
   key), then each node whose copy differs was set to the target file's value (76-87 `set_text` edits per page). Form text is
   excluded (identical on every page); the closing headline is fixed template text (the prototype hard-codes it too).
   Extra: problem-card numbers on the payday/one-attorney templates read 04, 06, 06; set to 04, 05, 06 on the new pages.
   /medical-debt-attorney has 7 FAQs: 2 FAQ items were added with the template's own classes (`faqitem`, `Heading 41` H3,
   `mjfdcpatext Copy`). /letter: "Anyone who want…" (a slip in my prototype) written as "Anyone who wants…".
4. SEO title, description and Open Graph copied exactly from the old page. Head code = the old page's own head, verbatim, plus
   the one heading style block; footer = the landing-page template footer; page script `RemoveStateOptions 1.0.0`.
5. Phone map set to the number the old page showed, for every source: 718-865-8350 (letter, act-fast, medical),
   347-744-9014 (4 payday pages), 347-474-9602 (more-money).

## Evidence (live site, 28 Sep; trackers blocked in every test; no lead sent)
- `verify-ds7-others.py` (served HTML): every copy field the template shows is present verbatim from the page's copy file
  (case-insensitive, since the template writes small tags in capitals); SEO title as before; robots `index, follow`, canonical as
  before; new form only (no `#submitBtn`, `#ngtmform`, multi-step.js); phone embed identical to Ohio's apart from the number;
  `{slug}-old` 404. **8/8 OK.** A leftover check found no copy from the template pages left behind.
  (The check caught one real miss: the 2 added FAQ answers had kept Webflow's placeholder text; fixed, republished, 8/8.)
- Submit test (form walked with test data, POSTs answered locally): **16/16 (iPhone + desktop) sent one POST to
  formspree.io/f/xzzyzzwj with 21 fields**, same as every other new-form page.
- Numbers after the swap script, per ad source (none / google / meta / bing): **32/32 OK**, no page errors.
- dataLayer on submit (GTM container loaded, beacons blocked): **8/8 push `form_submit` once**, same as the reference page.
- Head/footer/scripts read back from Webflow: **8/8 head = old head + style block, footer = template, script applied**; the old
  heads were re-read from the drafted old pages and match the backups.
- Site sweep: **0 of 54 published pages** contain `#submitBtn`, `#ngtmform` or multi-step.js.

## Not done yet (on purpose)
- The legacy form components (Hero-Form, Hero-Form-For-New-Pages) and the site script OldFormPhoneEmailGuard are no longer used by
  any published page, but the 21 drafted old pages still use them. Deleting them removes the revert path, so it waits for the
  operator (proposed decision D18).

## Questions for the reviewer
1. Is anything in the method likely to break the form, tracking, SEO or copy on these pages compared with before?
2. Is the text-matching approach (exact text → copy key → target value) safe, and is the evidence enough to show nothing was
   missed or cross-wired?
3. Anything about the 2 added FAQ items or the other structural differences you would flag?

Screenshots (UX pass): letter phone hero, payday-fight-back desktop hero, medical desktop FAQ (items 6-7 are the added ones),
more-money phone what-we-do.
