# Review packet: board QA · statuses, open ends and consistency (29 Sep, evening)

## Context (fixed)
- The staging board tracks the Credo landing-page work: PBIs with tasks (todo/doing/done), an independent review record,
  operator decisions (D-rows) and manual operator items (M/G rows).
- Scrum rules: WIP limit 1 row in "doing"; every change is published to staging only (staging.credolegal.com is the
  production site being built); every item needs independent GPT + Gemini code review (UX review when visible) before
  it is done.
- Operator decisions: PBI-01b and PBI-21 are deferred; all copy is accepted by legal (29 Sep); D15–D19 are decided.

## What changed in this pass (29 Sep, evening)
- **PBI-01c closed.** Its last two tasks (publish and verify the forms; review) were delivered in DS-7:
  26/26 + 16/16 submit tests, both review rounds settled, and 0 published pages loading multi-step.js.
- **PBI-08 closed.** The operator's CRM check moved to the manual list as M3.
- **PBI-11 closed.** Its design-system follow-up (one citation class and one label class) moved to PBI-16.
- **PBI-16:** its G22 task (intro paragraph Title Case) marked done; it was fixed in PBI-11.
- **PBI-12 done:** the last 5 copy fixes, reviewed. One rights line is open with the operator as D20.
- **PBI-19:** its G29 task (WEEK 1 tags on 22 pages) done, found again by the PBI-12 UX review.
- **Found and fixed:** a missing comma in the board data had merged D18/D19 (and later M3) into one broken row on the
  published board. A shape check (`tools/webflow/check-board.mjs`) now runs after every board edit.
- **Four pending repo changes committed and pushed** (Nextdoor NY/NJ compliance, Nextdoor metrics, LP prototype footer,
  local preview servers). A folder of old image backups inside the public assets was deliberately left uncommitted.

## Questions for the reviewer
1. Is any item's status inconsistent with its tasks or evidence? For example, a task marked done without evidence, an
   item that should be closed or reopened, or a blocked item whose blocker is gone.
2. Are there loose ends: tasks nobody owns, duplicates across items, decisions marked open that were already decided (or
   the reverse), or manual items that are stale?
3. Is the WIP-limit rule respected? Is the state line accurate?
4. Anything in the notes that contradicts another item?

## The board, as published after this pass
STATE: 29 Sep (evening): board clean-up. PBI-12 done (last 5 page-specific copy fixes; one rights line on fdcpa-attorney waits on D20) and G29 (WEEK 1 tags, 22 pages); PBI-01c, PBI-08 and PBI-11 closed (PBI-08 CRM check handed to the operator as M3; PBI-11 follow-up moved to PBI-16). Shared code (PBI-01d) steps 1–2 done: the page code and the phone-swap script that were copied onto 52 pages now live once in Site settings, all tracked numbers in one table. Waiting on the operator: D20, M2 (delete the 21 old drafts, then the legacy form components go), M3 (CRM check), D1–D3, D5–D10.

## PBI-00 · Baseline and safety net
Done when: Backup saved; enroll + start fingerprints recorded; lpcheck baseline report for the 30 staging pages.
- [done] Confirm the staging site id and that its only domain is staging.credolegal.com
- [done] Back up site + page custom code, registered scripts, page settings/SEO, styles and element trees
- [done] Fingerprint all 30 pages on enroll and start
- [done] Run lpcheck on the 30 staging URLs (baseline report)
  review: Code · GPT + Gemini · n/a · Backup and baseline only: nothing on the site changed.

## PBI-00b · Remove dead-weight pages
Done when: The 8 pages set to draft and the 4 blog articles unpublished on staging only (reversible); they return 404; every kept page and all 30 landing pages still load; enroll and start unchanged.
- [done] Back up the pages and CMS items being removed
- [done] Set test, test-page, know-your-rights, wage-garnishment-rights, medical-debt-harassment, medical-debt-errors, wage-garnishment-attorney-active and remove-property-lien to draft
- [done] Unpublish the 4 know-your-rights articles
- [done] Publish to staging only
- [done] Verify: removed pages 404, kept pages 200, enroll and start fingerprints unchanged
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: Code · GPT-5.5 · approve with fixes · settled
  review: Code · Gemini 3.1 Pro · do not approve · settled · 2 blockers answered by checks: 0 of 2,249 links point at removed URLs; forms/tracking covered by later runs.
  review: UX · GPT + Gemini · n/a · No visible change on any kept page.

## PBI-01 · Clean the page code
Note: W1 (move to Site settings) split out as PBI-01d: it would add GTM to the thank-you pages.
Done when: Dead or duplicate code gone where it is dead; form walk, phone numbers, tracking fields and tags unchanged; enroll and start unchanged; independent review settled.
- [done] Read the site and page custom code on all 53 live pages with code
- [done] Find the 21 pages whose old form still uses multi-step.js, #submitBtn, #phone-number and Font Awesome (left as they are)
- [done] Remove the duplicate GTM loader (52 pages); multi-step.js, Font Awesome, dead validators and the localStorage UTM copy (30 landing pages + home)
- [done] Shadow test before writing: old vs new code, 3 browsers
- [done] Publish to staging only
- [done] Verify: 83/83 code blocks served as intended; 30 pages × 8 devices (form 240/240, phones 344/344); tracking on 52 pages; enroll and start unchanged
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: Code · GPT-5.5 · approve with fixes · settled
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blocker (no real submit) answered by a submit test on 52 pages × 2 devices: 104/104 send every field + UTMs. Real lead waits on D1.
  review: UX · GPT + Gemini · n/a · Code-only change; nothing visible changed (form walk and screenshots unchanged).

## PBI-01b · One UTM mechanism [no UX review]
Note: Deferred by the operator 29 Sep.
Done when: One mechanism; a test matrix (first visit, return visit, no-query revisit, navigation, cross-subdomain) identical to today on every page type.
- [done] Map what each mechanism writes and who reads it: done 29 Sep (probe-utm-stores.mjs). 4 writers (site code: host cookies 90 days + form fields + link decoration; site code: localStorage + address-bar rewrite, wiped on any visit without parameters; page footer: .credolegal.com session cookies; page footer: decorates credolegal.com links) and 2 readers (phone script, Finsweet from the URL). Found: every value is stored twice, and the site code's cookie reader returns nothing for a name stored twice, so a returning visitor's lead sends utm_* and gclid empty (tested). One-line reader fix tested in the browser: attribution kept. The live start site has the same code
- [todo] Return-visit / cross-subdomain test matrix on the current code (baseline)
- [todo] Remove the redundant mechanisms; keep one
- [todo] Publish to staging only; re-run the matrix
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-01c · Old-form pages: multi-step.js and the videsigns-staging call
Note: D11 decided 28 Sep: the 21 pages are rebuilt on the landing-page template (design-system plan, DS-7), which removes the old form and its library.
Done when: Per D11: pages rebuilt in the new design, or the library replaced, so no page calls a staging server.
- [done] Rebuild the 21 pages on the landing-page template (DS-7), one page approved before the rest: done 28 Sep, no published page uses the old form or multi-step.js
- [done] Publish to staging only and verify the forms step by step: done in DS-7 (28 Sep): 26/26 + 16/16 submit tests, 13/13 + 8/8 form_submit pushes; no published page loads multi-step.js or calls videsigns-staging (served-HTML check 29 Sep)
- [done] Independent review: done in DS-7 (code + UX, GPT + Gemini, both rounds settled)

## PBI-01d · Shared code: Site settings, components and a landing-page template
Note: Plan 29 Sep (content/research/shared-code-plan-2026-09-29.md); operator decisions in D19. P1 and P2 done 29 Sep; next P3 (identical sections as components). Tracked phone numbers now live in one table in the site footer code (window.CREDO_PHONES, key = page slug): edit numbers there; a new page needs a row. D10 no longer blocks: a system-page check keeps GTM and Mouseflow off exactly the pages they were off (404, 401, /thank-you, /page/*). A new system page must be added to that list (site head code, window.credoSystemPage).
Done when: Page-agnostic code in Site settings (system-page check); every landing-page section a component, with per-page copy in properties and slots; per page only SEO settings, canonical/og:url/robots and the phone numbers; every page behaves and looks exactly as before (same scripts in the same order, phones, form walk, tracking, styles).
- [done] Inventory all published pages (served HTML + API): what is shared, what is copied, what differs per page
- [done] Plan: three layers (Site settings / components / per-page data), phases P1–P5, risks, open points; operator decisions D19
- [done] P1 (29 Sep): the page code that was identical on 52 pages moved to Site settings (GTM, Mouseflow and page scripts behind a system-page check); RemoveStateOptions applied site-wide; page code down to robots/canonical/og:url (+ heading-fix CSS on 51); all 52 noindex with a self canonical (D19); duplicate twitter/og tags, twitter:site "@handle" and unused Font Awesome dropped. Shadow test before writing; served HTML 56/56 as intended; live vs pre-change identical on 52 pages × 2 widths (form payload, cookies, dataLayer, phones, links, styles, text); GTM/Mouseflow still absent on /401, 404, /thank-you, /page/*
- [done] P2 (29 Sep): the phone-swap script (15.7 KB, copied on 52 pages, differing only in 4 numbers) now runs once from the site footer code; the numbers are one table keyed by page slug (window.CREDO_PHONES; '*' = (718) 865-8350 for any page not listed); the 52 page embeds removed. Shadow test before writing and live check after: 112/112 identical, and the numbers identical for google, meta, bing and no-parameter visits on all 56 pages; return visits via cookie, URL forms and system pages tested
- [todo] P3: Lead form, Trust strip, Hero and Bottom CTA as components (section CSS inside); pilot 1 page, then 49
- [todo] P4: content sections as components with slots and card components
- [todo] P5: draft landing-page template + prototype content-to-properties sync tool
- [doing] Independent review per phase: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled (P1, P2 settled)
  review: Code · GPT-5.5 · approve with fixes · settled · P1. Fixed: helper functions back to top-level declarations. System URLs incl. /401 and an arbitrary 404 checked live.
  review: Code · Gemini 3.1 Pro · approve with fixes · settled · P1. Its "blocker" is a real test lead, which waits on D1; the form payload is identical on 52/52 pages.
  review: UX · GPT + Gemini · n/a · Nothing visible changed: computed styles and text identical on 52 pages × 2 widths (live vs pre-change).
  review: Code · GPT-5.5 · approve with fixes · settled · P2. Return visits via cookie, URL forms and system pages tested live; no change needed.
  review: Code · Gemini 3.1 Pro · approve with fixes · settled · P2. Blocker answered: the system-page check is set in the site head, before any footer code (tested on all 5 system URLs).
  review: UX · GPT + Gemini · n/a · P2: nothing visible changed (styles, text and phone numbers identical, 56 pages × 2 widths; 4 ad sources).

## PBI-02 · Lead form destination for staging [blocked: D1] [no UX review]
Done when: Staging form posts to the chosen destination; a test lead arrives there and nowhere else; the success page still shows.
- [todo] Set the form action on staging to the chosen destination
- [todo] Publish to staging only
- [todo] Send one test lead and confirm where it lands
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-03 · Consent line under the submit button [blocked: D2]
Done when: Counsel-approved text (or required checkbox) under the button on all 26 form pages, passing contrast.
- [todo] Add the form-consent paragraph (or checkbox) on each page
- [todo] Publish to staging only
- [todo] Verify text, link and contrast
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-04 · Mask form inputs in session recordings
Note: Mouseflow input masking and the Tidio/Optibase privacy review stay manual (shared accounts).
Done when: Every lead form on staging carries data-clarity-mask; a capture of Clarity uploads shows no form text or typed values.
- [done] Mask the form block on the 30 landing pages and home (31 pages, page elements)
- [done] Mask the 4 form blocks inside the 2 local form components (Hero-Form, Hero-Form-For-New-Pages) used by the 21 state and old pages
- [done] Publish to staging only
- [done] Verify: 73/73 forms on 52 pages inside a masked block; enroll and start unchanged
- [done] Prove it: capture Clarity uploads; form text present without the mask, absent with it; typed values never sent
- [done] Form still works: form walk to submit on 3 pages × 3 browsers
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: Code · GPT-5.5 · approve with fixes · settled
  review: Code · Gemini 3.1 Pro · approve with fixes · settled
  review: UX · GPT + Gemini · n/a · An invisible attribute only.

## PBI-05 · Sticky call bar never covers the form
Done when: At 390×844 inside business hours: no bar while the form is on screen or the pop-up is open; bar appears after scrolling past the form.
- [done] Hidden-by-default styles for .sticky-call-button
- [done] IntersectionObserver on the step-1 form card
- [done] Hide while body.mj-popup-open
- [done] Publish to staging only
- [done] Verify on phone sizes with the clock inside business hours
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: Code · GPT-5.5 · approve with fixes · settled · On v1; its fix produced v2.
  review: Code · Gemini 3.1 Pro · approve · settled · On v2; asked for 768px: tested, 8/8.
  review: UX · GPT-5.5 · approve with fixes · settled · 6 iPhone screenshots before/after.
  review: UX · Gemini 3.1 Pro · approve · settled

## PBI-06 · Tracked phone number in the mobile header
Note: D14 decided 28 Sep: tablets accepted (no ☰ menu below 992px).
Done when: Tracked number and a "Free review" button visible in the mobile header; phone swap updates it per utm_source.
- [done] First: two phone-header options (call icon button, or the number without the Free review button) as screenshots; UX review by GPT + Gemini before building (Gemini rated today’s crowded header a blocker)
- [done] Operator picks the option: B chosen 28 Sep (logo + one wide call button with the number; ☰ menu removed on phones)
- [done] Build it in the shared header component through the API: call link (hidden on desktop), ☰ hidden, logo auto width on small phones
- [done] Tracked number per page: no script edits needed; the link carries the class dynamic-phone, which each page’s phone-swap script already updates
- [done] Publish to staging only
- [done] Verify on all 57 pages: phones, 360px, iPad, desktop; numbers per utm_source; tap fires gtm.linkClick; lpcheck regression
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: UX · GPT-5.5 · approve with fixes · settled · Options A/B on 3 phones (9 screenshots). Recommends B.
  review: UX · Gemini 3.1 Pro · approve with fixes · settled · Recommends B; rejects A (redundant, crowded at 360px).
  review: Code · GPT-5.5 · approve with fixes · settled
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blocker: ☰ menu gone. Settled by operator decisions: phones (Option B) and tablets (D14, accepted 28 Sep).
  review: UX · GPT-5.5 · approve with fixes · settled · Built version, 7 screenshots.
  review: UX · Gemini 3.1 Pro · approve with fixes · settled · Tablet-menu blocker settled by D14 (accepted); corner/edge claims not supported by the screenshot.

## PBI-06b · Same gap above the closing CTA button on every page
Note: Asked for by the operator on 28 Sep while PBI-06 was being verified; published together with PBI-06 so the checks cover one state.
Done when: Every closing CTA has the same roomy gap (≈39px, chosen by the operator), set once in the Text Block 20 style; no stray line breaks left.
- [done] Find the cause: trailing line breaks in the text on 29 pages (2 on 22 pages, 1 on 7); styles identical
- [done] Gap set in the style: Text Block 20 margin-bottom 38px (vertical margins collapse, so 23px first gave 24px; corrected). The button style name is duplicated in the project, so the text block carries it
- [done] Remove the trailing line breaks on the 29 pages (only breaks after the last text)
- [done] Publish to staging only (after the running PBI-06 regression finishes)
- [done] Verify: the same gap on all 31 pages, desktop and phone; nothing else moved
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: Code · GPT-5.5 · approve with fixes · settled
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blocker: enroll/start not re-checked after the publish. Re-checked: 60/60 unchanged.
  review: UX · GPT-5.5 · approve with fixes · settled
  review: UX · Gemini 3.1 Pro · approve with fixes · settled · Prefers the tighter gap; operator chose the roomier one.

## PBI-07 · Phone and ZIP fields open the number pad
Done when: Every phone field is type="tel" (phone keypad), every ZIP field has inputmode="numeric" (numeric keypad), both with autofill hints; formatting, validation and what the form sends are unchanged.
- [done] Shadow test first (new types applied to the served page): both form types submit the same fields and values; phone formatting unchanged
- [done] Confirm on one page that the field type can be set through the API
- [done] Apply: phone field on the 31 new-form pages; 6 phone + 4 ZIP fields in the 2 shared old-form components
- [done] Publish to staging.credolegal.com
- [done] Verify: 167 fields on 52 pages as intended; submit test 104/104 same fields; regression "letter keyboard" 30 → 0, form walk 240/240, phones 344/344; formatting identical under key, Android-keyboard and autofill input
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: Code · GPT-5.5 · approve with fixes · settled
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blocker: soft keyboards might break formatting. Tested Android-keyboard and autofill input: identical before/after.
  review: UX · GPT + Gemini · n/a · The change is the on-screen keyboard, which cannot be screenshotted headless; the page looks the same.

## PBI-07b · Phone and email must be valid before the form sends
Note: Corrected 28 Sep: an earlier test counted a Google Analytics beacon (its URL mentions formspree) as a form send. Strict re-test: the new form already blocks every invalid phone and email.
Done when: No lead is sent without a 10-digit phone and a well-formed email, on both form types, by tap or keyboard.
- [done] Test which invalid phone/email values each form sends (strict: real formspree posts only)
- [done] Operator chose to fix the old form now (28 Sep); tap vs keyboard test found the real gap: Enter on the Submit link
- [done] Guard as a registered site script (OldFormPhoneEmailGuard 1.0.0, footer): blocks the old form’s Submit until phone = 10 digits and email is well formed; shadow-tested first
- [done] Publish to staging.credolegal.com; all 21 old-form pages: short phone 0/21 sent, bad email 0/21, valid 21/21; Enter inside fields sends nothing; new form unchanged
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
  review: Code · GPT-5.5 · approve with fixes · settled
  review: Code · Gemini 3.1 Pro · approve with fixes · settled · Blocker: Enter inside a field. Tested: never sends, valid or not.
  review: UX · GPT + Gemini · n/a · No visual change; the forms’ existing error messages show.

## DS-7 · Rebuild the 21 older pages on the landing-page template (new form only)
Note: Operator 28 Sep: only the new form on every page; remove every legacy form. Pilot: Ohio, then the other 12 state pages from it.
Done when: All 21 URLs serve the landing-page design with the new form; no legacy form or its scripts left on the site; each page keeps its own copy, tracked number, SEO and tracking; old versions kept as drafts.
- [done] Pilot: rebuild /ohio from a landing page (duplicate, state copy, number, SEO), preview under a temporary slug: live at /ohio-new, checks passed
- [done] Operator approves the pilot: approved 28 Sep
- [done] Swap slugs: new page takes /ohio, old page kept as draft at /ohio-old: live, submit test 1 post, 21 fields on iPhone and desktop
- [done] The other 12 state pages from the approved pilot: duplicated from Ohio, 3 state strings each, old SEO + old head code kept, own tracked number (6 local numbers kept), old pages drafted as {state}-old
- [done] Found and fixed: the pilot Ohio page had the landing page’s noindex head; Ohio now has its own old head (index, follow) again
- [done] Verified on staging.credolegal.com: 13/13 served-HTML checks, 26/26 submit tests (1 post, 21 fields), 52/52 numbers per ad source, 13/13 form_submit pushes, head/footer byte-diff 13/13
- [done] Independent review of the 13 state pages (code + UX, GPT + Gemini); findings settled except D1, D15, D16, D17
- [done] letter, medical-debt-attorney, debt-harassment-act-fast, multiple-collectors-more-money and the 4 payday pages, each with its own copy: duplicated from a new-form page with the same section counts, copy mapped node by node, 2 FAQ items added on medical; own SEO, head code and tracked numbers kept
- [todo] Remove the legacy form: site script OldFormPhoneEmailGuard removed 29 Sep (D18; 0 of 54 pages load it, form_submit still pushed); the components Hero-Form (17 instances) and Hero-Form-For-New-Pages (10) are only on the 21 old drafts, so they go once the operator deletes the drafts (M2: pages cannot be deleted through the API) (blocked)
- [done] Publish to staging.credolegal.com and verify (8 pages): copy 8/8, submit 16/16, numbers 32/32, form_submit 8/8, head/footer byte-diff 8/8, SEO/OG 8/8
- [done] Independent review of the last 8 pages (code + UX, GPT + Gemini); findings settled; Title Case raised as PBI-11
  review: Code · GPT-5.5 · approve with fixes · settled · State pages. Blocker (real lead) waits on D1; the rest proven or raised as D15/D16.
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blockers: real lead (waits on D1); GTM tracking (tested: form_submit pushed on 13/13, same as the landing pages).
  review: UX · GPT-5.5 · approve with fixes · settled · Template-wide design points logged for the design system; claims raised as D17.
  review: UX · Gemini 3.1 Pro · approve with fixes · settled · Sticky bar tested: never covers the form buttons.
  review: Code · GPT-5.5 · approve with fixes · settled · Last 8 pages. SEO/OG and ad-source fields checked on the served pages: 8/8.
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blocker: state choice on general pages. Tested: every lead carries a state (16/16).
  review: UX · GPT-5.5 · approve with fixes · settled · Template-wide design points logged.
  review: UX · Gemini 3.1 Pro · do not approve · settled · Blocker: Title Case paragraphs. Template-wide and pre-existing; raised as PBI-11 for the operator.

## PBI-08 · Capture the Meta click id (fbclid) [no UX review]
Done when: ?fbclid=test123 reaches the cookie and the hidden fbclid field.
- [done] Fix fbclig → fbclid in the UTM block (site-wide custom code, section 7: the utmKeys list and the field mapping): published 29 Sep; served code byte-checked; 4/4 pages send fbclid on the first and on a return visit (before: none)
- [done] Add the hidden fbclid field: not needed. The same script adds a hidden field to the form for every key in its list, so the fix above adds fbclid by itself (21 → 22 fields posted)
- [done] Also (operator 29 Sep: apply all fixes): the section-7 cookie reader returned nothing when a name is stored twice (this host and .credolegal.com), so return visits sent utm_source/medium/campaign and gclid empty. It now takes the newest match, like the phone script: return visits keep them; when the two differ the newer is sent
- [done] Publish to staging only
- [done] Test with ?fbclid=… : verify-fbclid.mjs, probe-utm-stores.mjs, probe-cookie-conflict.mjs, probe-tracking-channels.mjs; form_submit unchanged
- [done] Add the missing gbraid, wbraid and fbclid fields on the 6 old pages whose form lacks them: moot after DS-7; all 51 landing pages have gbraid and wbraid (served-HTML check 29 Sep), fbclid comes with the fix above
- [done] Independent review: code by GPT + Gemini (no UX: nothing visible); findings settled except the CRM check
- [done] Operator tests the new fbclid field and the return-visit values on the CRM end: handed to the operator as manual item M3 (29 Sep); nothing left to build
  review: Code · GPT-5.5 · approve with fixes · settled · Cookie precedence tested and changed to newest; link decoration and call tracker tested.
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blocker: CRM handling of the new fbclid field. With the operator, who tests on the CRM end.

## PBI-09 · Dropdown options stored in Webflow
Done when: Count, security and stage options stored in Webflow; the G17 rewrite script removed; form walk passes.
- [todo] Confirm on one page that select options can be set through the API
- [todo] Set the three dropdowns on all pages
- [todo] Remove the G17 rewrite block
- [todo] Publish to staging only
- [todo] Verify the options on every page
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-10 · Slider label and unique element ids
Done when: axe finds no unlabelled slider; no duplicate ids; form still works.
- [todo] Check which scripts read these ids
- [todo] aria-label on #mjSlider; unique ids for checkboxes and step markers
- [todo] Publish to staging only
- [todo] Verify with lpcheck (axe, duplicate ids, form walk)
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-11 · Statute citations keep their case
Done when: Every citation displays as typed; word tags match the prototype.
- [done] Capitalize: None on the citation classes: mjfdcpaboxtext and mjfdcpaboxtext Copy set to none at the base breakpoint and the xl (1440px+) uppercase override removed; the other Copy classes carry no citations (form label, typed in capitals)
- [done] Also the what-we-do paragraph (class text-block-16 had text-transform: capitalize, so body copy showed in Title Case on every landing page; Gemini UX blocker, DS-7): set to none 29 Sep, published; 0 of 54 pages render capitalized body text (negative control passes)
- [done] Retype the word labels the prototype shows in capitals: 362 labels on 51 pages (Right/Violation/Remedy/Deadline tags, card-row words); law names in the rights column left as typed, as in the prototype. Home page too (found by the review), where 4 mistyped card citations were corrected
- [done] Publish to staging only
- [done] Check each page's citations: every label element on all 51 pages compared with its saved before-text at 1920/1440/1280/390 px: 474 citations and law names as typed, 406 labels in capitals, 0 problems; page-wide scan: 0 citations in capitals (was 305)
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled
- [done] Follow-up (design system): one citation class and one label class: moved to PBI-16 (29 Sep)
  review: Code · GPT-5.5 · approve with fixes · settled · Breakpoints checked in Webflow; counts reconciled (44 labels were already in capitals); home page found and fixed.
  review: Code · Gemini 3.1 Pro · do not approve · settled · Blockers: typed capitals (kept, design-system follow-up logged); CMS bindings (not applicable, static pages).
  review: UX · GPT-5.5 · approve with fixes · settled · Found the 01-04, 06, 06 card numbering on 30 pages (pre-existing), offered as a follow-up.
  review: UX · Gemini 3.1 Pro · approve · settled
  review: Code · GPT-5.5 · approve with fixes · settled · What-we-do paragraph + D16. Form, numbers and form_submit re-tested after the publish on the 13 state pages: all pass.
  review: Code · Gemini 3.1 Pro · approve with fixes · settled · 54 vs 51: thank-you, 404 and 401 have no what-we-do section.
  review: UX · GPT-5.5 · approve with fixes · settled · Sentence case confirmed; sticky bar and body size logged for the design system.
  review: UX · Gemini 3.1 Pro · approve with fixes · settled · Sentence case confirmed.

## PBI-12 · Page-specific copy fixes
Done when: Each page's Part B items match the prototype.
- [done] debt-harassment-fdcpa-attorney: six rights summary lines from the prototype (were payday text): done 29 Sep; the sixth line without the prototype's "another $1,000" claim (contradicts the $1,000-per-action cap): wording with the operator as D20
- [done] Problem cards numbered 01-04, 06, 06 on 30 pages (29 landing pages + home), found by the PBI-11 UX review: fifth card set to 05; thank-you boxes 01, 02, 04, 06 renumbered 01-04 and its citation § 1692c(A)(1) corrected; 50 pages read 01-06 at phone and desktop width (29 Sep); reviewed (GPT + Gemini, code + UX), settled (review/NUM-cards.triage.md)
- [done] Thank-you box 02 "Personalized guidance" was tagged with the calling-hours citation § 1692c(a)(1): now GUIDANCE (operator 29 Sep, as in the prototype)
- [done] wage-garnishment-attorney: how-it-works step titles (Debt investigation / Legal representation / Work towards debt resolution): done 29 Sep
- [done] debt-harassment-violations: first rights tag RIGHT → REMEDY, headline full stop: done 29 Sep
- [done] medical-debt-credit-report-removal: § 1692f tag → VIOLATION, hero sub-headline as in the prototype: done 29 Sep
- [done] credit-card-debt-challenge: remove the empty <em> in the H1: done 29 Sep (H1 is one text node)
- [done] Publish to staging only and verify: served HTML of all 56 pages, only the 5 pages and lines above changed; live vs pre-change: phones, form payload, trackers, cookies, links identical
- [done] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots (2 rounds); findings settled, D20 with the operator
  review: Code · GPT-5.5 · approve with fixes · settled · Sixth fdcpa-attorney line to the operator (D20); functional check added.
  review: Code · Gemini 3.1 Pro · approve with fixes · settled · Blocker = legal sign-off on the sixth line: D20.
  review: UX · GPT-5.5 · approve with fixes · settled · Round 2 on full-section screenshots.
  review: UX · Gemini 3.1 Pro · approve with fixes · settled · Round 1 withheld approval (rows cut off); round 2 approves. Its WEEK 1 finding fixed (G29).

## PBI-13 · Meta descriptions within 160 characters [no UX review]
Done when: The approved text from the audit on each page, identical in meta, og: and twitter: descriptions.
- [todo] Write the approved texts to the 26 pages' SEO settings
- [todo] Set og:description to "same as SEO"
- [todo] Publish to staging only
- [todo] Verify the served head tags
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-14 · Schema: LegalService and FAQPage [no UX review]
Note: Twitter handle waits on D9
Done when: One site-wide LegalService (P.C., 1 Liberty Street, staging-hosted logo) and a valid FAQPage per page.
- [todo] Site-wide LegalService block
- [todo] Remove the old per-page LegalService blocks
- [todo] Build a FAQPage per page from its own FAQs
- [todo] Remove or replace the @handle placeholder (D9)
- [todo] Publish to staging only and validate the JSON-LD
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-15 · Colour and contrast
Done when: axe finds no contrast failures; colour variables ink / muted / secondary in use.
- [todo] Create the colour variables
- [todo] Point the failing classes at secondary #6a7688
- [todo] Body font and colour; weights 300 → 400, eyebrows 600
- [todo] Publish to staging only
- [todo] Verify with lpcheck (axe) and screenshots
- [todo] Red text on the dark form header uses credo-red-soft #ff6b73 (UX review, design preview)
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-16 · Mobile type scale and text case
Done when: Mobile sizes match the prototype; no text under 12px on phones.
- [todo] Mobile-portrait sizes for the H1 and section headlines
- [todo] Form-question line height 1.3
- [done] Intro paragraph Capitalize: None (G22, class Text Block 16): done 29 Sep in PBI-11; 0 of 54 pages render capitalized body text
- [todo] One citation class and one label class (labels uppercase via style, words typed normally), replacing the capitals typed in PBI-11 (from the PBI-11 review, Gemini)
- [todo] Step labels and rights tags to 12px
- [todo] Publish to staging only and verify
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-17 · Form card, bottom CTA and page width
Done when: Card and bottom CTA match the prototype; no sideways overflow on any device.
- [todo] Card: remove the border, add the soft shadow
- [todo] Move the "or call" block below the card
- [todo] Bottom CTA: left-align, headline max width
- [todo] Fix the poition typo and the missing }
- [todo] Publish to staging only and verify
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-18 · Red accent word in the H1
Done when: Accent span on each page's listed word; bottom CTA uses the same class; the recolour script removed.
- [todo] Confirm on one page that an inline span can be added through the API
- [todo] Create the accent class
- [todo] Wrap each page's accent word
- [todo] Remove the ctaheading recolour script
- [todo] Publish to staging only and verify
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-19 · Small polish
Done when: No tap target under 24px; step tags in the same case.
- [todo] Bottom padding while the sticky call bar or chat bubble is visible, so the end of the page is never hidden (UX reviews PBI-05 and design preview)
- [todo] Padding on the call links and the BBB link
- [done] "Week 1" to the step-tag case on 21 pages (G29): done 29 Sep with PBI-12 (found again by its UX review): 21 pages + the 3 Week tags on home retyped in capitals; served HTML of 56 pages changed only there; 0 mixed-case left
- [todo] Publish to staging only and verify
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-20 · CTA labels [blocked: D3]
Done when: Only the two agreed labels on all pages.
- [todo] Set the agreed labels on every CTA
- [todo] Publish to staging only and verify
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-21 · The four payday-content pages [blocked: D4]
Note: Deferred by the operator 29 Sep. Open question: own copy for the 4 pages, or redirect them to matching pages.
Done when: Per D4: drafted/unlisted on staging, or rebuilt with approved copy.
- [todo] Apply the D4 decision on staging
- [todo] Publish to staging only and verify
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-22 · Call-click tracker listens to the real links [blocked: D6] [no UX review]
Done when: Clicks on the real call links reach the tracker (only once D6 allows posting to the live call-click backend).
- [todo] Note (PBI-08, 29 Sep): the tracker also sends fbclig read from a cookie of that name, so it is always empty. Left as is: what it sends to the live call-click backend is part of D6
- [todo] Give the sticky bar link an id
- [todo] Point the tracker at the real call-link ids
- [todo] Publish to staging only and verify
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-23 · Performance on phones [no UX review]
Note: Tidio waits on D8, recorder on D5, minify is manual
Done when: Lighthouse re-run on staging, compared with the baseline.
- [todo] Confirm the removals from PBI-01 are live
- [todo] Lazy-load or remove Tidio (D8)
- [todo] Keep one session recorder (D5)
- [todo] Minify HTML/CSS/JS (manual toggle in Site settings)
- [todo] Publish to staging only; Lighthouse before/after
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## PBI-24 · Close-out [no UX review]
Done when: Full lpcheck on staging.credolegal.com vs the baseline; change log per item.
- [todo] Full lpcheck on the 30 staging pages vs the baseline
- [todo] Change log per item (what changed, where in Webflow)
- [todo] Clarity payload capture on each form type: page form, Hero-Form, Hero-Form-For-New-Pages (review PBI-04)
- [todo] Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled

## Decisions (id · source · title · status/text · item)
- D1 · G9 · Where the form posts · Webflow native forms, a first-party endpoint, or formspree with a DPA; and whether staging posts to a test destination meanwhile (recommended). · PBI-02
- D2 · G10 · Consent text · Counsel-approved wording, and whether express consent needs a checkbox. Note 29 Sep: the operator accepted all existing copy as legal-approved, but no consent text has been written yet, so this stays open: it needs the text itself (or a request to draft it for counsel). · PBI-03
- D3 · G16 · CTA labels · Which two labels to keep. · PBI-20
- D4 · Part B · The four payday-content pages · Decided 28 Sep: rebuild them on the landing-page template, like the other older pages. · PBI-21
- D5 · G32 · Session recorders · Keep Mouseflow, or remove it and rely on Clarity. · PBI-23
- D6 · G21a · Call-click posting · May staging.credolegal.com post call clicks to the live call-click backend (credo.debtfixer.co) while testing? · PBI-22
- D7 · F2 · State list · Confirm North Carolina should stay removed from the state dropdown. · —
- D8 · L2 · Tidio chat · Is chat staffed? Lazy-load it, or remove it. If chat stays: a neutral dark launcher colour, so red stays reserved for the call and form buttons (UX reviews, 28 Sep). · PBI-23
- D9 · G6 · Twitter/X handle · Credo's real handle, or delete the @handle placeholder. · PBI-14
- D10 · W1 · GTM on thank-you pages · Does GTM count thank-you page views as conversions? Needs someone with GTM access. Decides whether shared code can move to Site settings. · PBI-01d
- D11 · L1 · Old-form pages · Decided 28 Sep: rebuild all 21 older pages (13 state, 8 others incl. the 4 payday pages) on the landing-page template: new design and the new form only; every legacy form removed. Method B: each page is a duplicate of a landing page with its own copy, number, SEO and tracking; the old page is kept as a draft until the new one passes. · PBI-01c
- D12 · PBI-01 · ZIP error message · Decided 27 Sep: accepted. An invalid ZIP now shows one message ("Please enter valid 5 digit zip code") instead of two. · PBI-01
- D13 · Design preview · Thank-you wording · Decided 29 Sep (operator): apply the proposed wording. Done on /thank-you, /page/thank-you and /page/already-submitted: "Thank you. Your request has been received." + "We appreciate the trust you've placed in our team to help protect your rights. One of our legal professionals will contact you shortly to schedule your free, confidential consultation."; box 02 tagged GUIDANCE. Operator 29 Sep: all copy accepted by legal (no further legal review of the remaining outcome-like lines). Repeat submissions now get their own line on /page/already-submitted ("We already have your request.", CMS-bound headline and paragraph; review/D13-already-submitted.triage.md). Phone decided 29 Sep: (718) 865-8350 on all thank-you pages; /page/thank-you (and already-submitted) now use the /thank-you design via a shared "Thank-you page" component (Headline/Message props, CMS-bound on the template); review/TY-unify.triage.md. D13 closed. Before: legal sign-off on the thank-you headline. Today: "You have been pre-approved for a free legal consultation call with our attorney!" Proposed (in the preview): "Thank you. Your request has been received." with "One of our legal professionals will contact you shortly to schedule your free, confidential consultation." Needs a Credo attorney to approve before it goes into Webflow. Also: which phone number the unified thank-you page shows (today /thank-you has (443) 483-4080, /page/thank-you and /page/already-submitted (718) 865-8350). · DS-6
- D14 · PBI-06 · Tablet menu · Decided 28 Sep: accepted. Tablets (768–991px) also show the call button instead of the ☰ menu, like phones; the menu only held 5 same-page links and the number. · PBI-06
- D15 · DS-7 review · Call numbers per ad source · Decided 29 Sep: leave as is (one number per page for every source). Every state page shows one number whatever the ad source (as before): 718-865-8350, or the state’s local number on MN, MD, CO, NY, NJ, FL. Keep that, or give Google / Meta / Bing their own tracked numbers so calls can be attributed? New numbers come from the call-tracking account (not ours to change). · DS-7
- D16 · DS-7 review · State pages in search · Decided 29 Sep: they should not rank for now. Done: robots noindex, nofollow and canonical + og:url to the page itself (start.credolegal.com/{slug}), like the other landing pages; the rest of each head unchanged; verified 13/13 (recheck on start.credolegal.com at go-live). Before: the 13 state pages say index, follow but their canonical points to the home page (start.credolegal.com/), which folds them into the home page for Google. Kept as it was. Should each state page rank on its own (self canonical), or stay as is? · DS-7
- D17 · DS-7 review · Stats claims · Decided 29 Sep: the claims are fine, kept; operator confirmed all copy as accepted by legal (29 Sep). The pages show “10 million+ in debt wiped” and “500k debts settled every month” with no source. A Credo attorney should confirm they are accurate and allowed in attorney advertising, or change them. · DS-7
- D18 · DS-7 · Old page drafts and the legacy form · Decided 29 Sep: delete the drafts now. Done: the legacy site script removed. Open: the operator deletes the 21 drafts in the Webflow Pages panel (M2), then the 2 legacy components are removed. The 21 older pages are rebuilt; their old versions are kept as hidden drafts ({slug}-old) so any page can be put back. The old form components (Hero-Form, Hero-Form-For-New-Pages) and the site script OldFormPhoneEmailGuard are only used by those drafts. When can the drafts be deleted? Deleting them lets the legacy form and its scripts be removed from the site for good. · DS-7
- D19 · PBI-01d plan · Shared code: order, phone numbers, search · Decided 29 Sep (operator): (1) make the code shared (P1–P4) before the design polish, so each design fix is made once; (2) phone numbers in one table keyed by page slug in the site code (recommended option); (3) align with D16: every page noindex, nofollow with a self canonical, including the 8 pages rebuilt last (letter, medical-debt-attorney, debt-harassment-act-fast, multiple-collectors-more-money and the 4 payday pages), which said index, follow with the canonical on the home page. · PBI-01d
- D20 · PBI-12 review · Rights line on debt-harassment-fdcpa-attorney · Open. The prototype line "Each call after a cease request: another $1,000 in play." contradicts the FDCPA cap of $1,000 statutory damages per action (§ 1692k(a)(2)(A)) and the line above it on the same page. Live now (29 Sep): "Each call after a cease request adds another violation to the claim." (Gemini: accurate and compliant). Alternative (GPT): "Each call after a cease request can add evidence of another FDCPA violation." Keep the live line, use the alternative, or give other wording? Optional, same pass: the prototype copy has a few comma splices left from the dash clean-up (e.g. violations, Who this helps, item 3); fix them in prototype + Webflow? · PBI-12

## Manual (operator) items
- M1 · Give the Webflow connector access to the staging project · Done 27 Sep
- L2 · Site settings → Publishing → minify HTML, CSS and JS (not in the API) · Open
- G32 · Mouseflow input masking; Tidio and Optibase privacy review (shared accounts) · Open
- G9 · Data-processing agreement / CRM routing for the lead data · Open
- G15 · G21b · GTM: form_submit only on success; call clicks as one key event (shared container) · Open
- G2 · Old-domain duplicates and redirects on start.credolegal.com (old site) · Open
- M2 · Delete the 21 old drafts in Webflow (Pages panel: the 21 top-level draft pages whose names end in "(old design)", slugs {slug}-old: ohio, kentucky, utah, south-dakota, missouri, kansas, california, minnesota, maryland, colorado, new-york, new-jersey, florida, letter, medical-debt-attorney, debt-harassment-act-fast, multiple-collectors-more-money, payday-loan-fight-back, payday-loan-debt-rights, payday-loan-lawsuit-proof, payday-loan-lawsuit-respond). The API cannot delete pages. D18 · Open
- M3 · CRM check (PBI-08): a staging lead now carries fbclid (new field) and keeps utm_source/medium/campaign and gclid on a return visit; confirm the CRM maps or ignores fbclid and stores the return-visit values · Open
