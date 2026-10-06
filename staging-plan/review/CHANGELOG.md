# Staging change log (staging.credolegal.com, Webflow site 6ab90fb0761d44332faf21c8)

This log lists every change made to the Webflow project "staging" from 27 to 30 Sep 2026, item by item, with where it lives in Webflow and how to undo it.
The start and enroll Webflow projects were never changed (their page fingerprints were re-checked unchanged after the publishes).
Every change was published to the staging custom domain only (domain id 6ab913a1b84e0288ab05b049, Webflow subdomain off); backup folders below are under `~/work/backups/credo-webflow-staging/`, and packet links are relative to `review/`.


## Current state (30 Sep, read from the served pages)

**Pages.** 56 published pages. **52 form pages**: the 30 landing pages (`tools/lpcheck/urls/staging-lps.txt`), the 21
older pages rebuilt in DS-7 (13 state pages: ohio, kentucky, utah, south-dakota, missouri, kansas, california,
minnesota, maryland, colorado, new-york, new-jersey, florida; 8 others: letter, medical-debt-attorney,
debt-harassment-act-fast, multiple-collectors-more-money, payday-loan-fight-back, payday-loan-debt-rights,
payday-loan-lawsuit-proof, payday-loan-lawsuit-respond) and home. **4 system pages**: 404, /thank-you,
/page/thank-you, /page/already-submitted (plus Webflow's password page /401). The 21 old versions were
deleted by the operator on 30 Sep (evening). The staging site publishes no sitemap and an empty robots.txt.

| Page group | robots | canonical | og:url |
|---|---|---|---|
| 52 form pages | `noindex, nofollow` | `https://start.credolegal.com/{slug}` (home: `https://start.credolegal.com/`) | same as canonical |
| /thank-you, /page/thank-you, /page/already-submitted | none (indexable) | none | none |
| 404 | none (404 status) | none | none |

The thank-you pages carry no robots tag: add `noindex` there with the domain-switch task (below).

**Site head code has layers.** Site settings → Custom code → Head code was changed by PBI-01d P1, PBI-08, PBI-09
(a block cut), PBI-14, PBI-15, PBI-16, PBI-23 and PBI-28, mostly in commented blocks. To revert one item, remove or restore only that item's block in
the current head; writing an older `site-head-before.html` back would also undo every later item.

**Start and enroll untouched.** Fingerprints of their pages: `2026-09-27/fingerprints/start.sha256` and
`enroll.sha256`, re-checked against the live sites after the publishes (see PBI-00, PBI-04 triage).

---

## PBI-00 · Baseline and safety net (27 Sep)

**What changed**
- Nothing on the site. A full backup and a baseline were taken before any change.
- Recorded: fingerprints of the 30 pages on enroll and start; an lpcheck baseline report for the 30 staging pages.

**Where in Webflow**
- Read only: site and page custom code, registered scripts, page settings/SEO, styles and element trees were read and saved.

**Revert**
- Not needed. The backup itself is `2026-09-27/` (README.md explains each file and how to restore it).

**Evidence / review**
- No review needed (backup only; the board marks both reviews not applicable).

## PBI-00b · Remove dead-weight pages (27 Sep)

**What changed**
- 12 URLs no longer load (they return 404): 8 pages and the 4 "Know your rights" articles. Nothing was deleted.
- 8 static pages set to draft: test, test-page, know-your-rights, wage-garnishment-rights, medical-debt-harassment, medical-debt-errors, wage-garnishment-attorney-active, remove-property-lien.
- The 4 items of the "Know your rights" CMS collection unpublished (kept as items). All 13 state pages kept (operator, 27 Sep).

**Where in Webflow**
- Pages panel: each of the 8 pages' settings → Draft.
- CMS → "Know your rights" collection: the 4 items set to draft (unpublished).

**Revert**
- Set draft = false on the 8 pages and republish the 4 items. Served HTML of the removed pages and the CMS state: `2026-09-27/removed-pages-html/`, `2026-09-27/cms-state.json`, `2026-09-27/pages-list.json`. No REVERT.md.

**Evidence / review**
- Code: GPT approve with fixes; Gemini do not approve (2 blockers answered by checks: 0 of 2,249 links point at removed URLs). UX not needed. [PBI-00b.md](PBI-00b.md), [PBI-00b.triage.md](PBI-00b.triage.md).

## PBI-01 · Clean the page code (27 Sep)

**What changed**
- No visible change. The script error and the calls to videsigns-staging.co.uk stopped on the 30 landing pages and home.
- Removed the duplicate GTM loader (52 pages; the standard GTM snippet stays).
- Removed from 31 pages (30 landing pages + home): Font Awesome, multi-step.js, the localStorage UTM copy, the `#phone-number`/`#dob` formatter and the `checkFormValidity` block.
- Side effect accepted by the operator (D12): an invalid ZIP now shows one error message instead of two.

**Where in Webflow**
- Each page's settings → Custom code (head and footer) on the pages listed above.
- Not changed: Site settings → Custom code; the 21 old-form pages kept the scripts their form needed.

**Revert**
- Pre-change page code for every page: `2026-09-27/code/<slug>.head.html` and `<slug>.footer.html` (baseline). No REVERT.md.

**Evidence / review**
- Code: GPT approve with fixes; Gemini do not approve (blocker answered by a submit test, 104/104). UX not needed. [PBI-01.md](PBI-01.md), [PBI-01.triage.md](PBI-01.triage.md).

## PBI-01c · Old-form pages: multi-step.js and the videsigns-staging call (28–29 Sep)

**What changed**
- No separate change. Done by DS-7 (D11): the 21 old-form pages were rebuilt on the landing-page template, so no published page loads multi-step.js or calls videsigns-staging (served-HTML check, 29 Sep).

**Where in Webflow**
- See DS-7 below.

**Revert**
- See DS-7.

**Evidence / review**
- Reviewed within DS-7 (code + UX, GPT + Gemini). [DS-7-states.md](DS-7-states.md), [DS-7-others.md](DS-7-others.md).

## PBI-01d · Shared code: Site settings, components and a landing-page template (29 Sep)

Done in five phases (P1–P5). Visitors see no change, except six small standardisations in P4.

### P1 · Page code moved to Site settings

**What changed**
- The code that was identical on 52 pages now runs once from Site settings. GTM, Mouseflow and the `#gtmform` guard sit behind a system-page check, so they stay off the 404, 401, /thank-you and /page/* pages as before.
- Registered script RemoveStateOptions 1.0.0 now applied site-wide (footer) and removed from the 52 pages.
- Page code on the 52 pages cut to robots, canonical and og:url (plus the heading-fix `<style>` on 51 pages). All 52 then said `noindex, nofollow` with a self canonical (D19); canonical and og:url now point to `start.credolegal.com/{slug}` (see Current state).
- Dropped: a second twitter:card and og:type, twitter:site "@handle", stale twitter title/description on 22 pages, Font Awesome on the 21 rebuilt pages, the `.addressmj` CSS.
- Review fix, same day: `getURLParameter` and `setCookie` made top-level functions again; only the listener sits behind the check.

**Where in Webflow**
- Site settings → Custom code → Head code: shared head appended (starts with `window.credoSystemPage = [...]`, a list of page ids).
- Site settings → Custom code → Footer code: shared footer appended.
- Site settings → registered scripts: RemoveStateOptions 1.0.0 (footer, after FormSubmitDataLayer).
- Each of the 52 form pages: page settings → Custom code (head reduced, footer emptied).

**Revert**
- `2026-09-29-pbi01d/` with REVERT.md (site and page code before in `code/`).

### P2 · One phone-swap script and one phone table

**What changed**
- No visible change. The phone-swap script (15.7 KB, copied on 52 pages) now runs once.
- Tracked numbers live in one table, `window.CREDO_PHONES`, keyed by page slug; `'*'` = (718) 865-8350 for any page not listed.
- Added the `h1.heading-46 em` colour rule (used later by PBI-18).

**Where in Webflow**
- Site settings → Custom code → Footer code: new block at the very start (table + script behind the system-page check).
- On the 52 form pages: the first body element, HtmlEmbed `a7e74b1a-05ff-c21d-f3fb-4c7a8a74aeeb`, removed.
- To change a number: edit the row for that slug in the table. A new page needs a row.

**Revert**
- `2026-09-29-pbi01d-p2/` with REVERT.md (removed embeds saved per page in `embed/`).

### P3 · First four sections as components

**What changed**
- No visible change. Hero, pop-up form, trust strip and bottom CTA became shared components on the 51 landing pages; home uses only the Trust strip.
- One markup change: the first form question is now `h3.heading-47.lp-question` (combo class, weight 700) instead of `h3 > strong`.

**Where in Webflow**
- Components: LP · Hero (262505dd-e60d-5cac-3569-ab3e5a12137b; props H1, Lede, Form intro, First question), LP · Lead form (ee6ce53c-73c7-547e-0332-e93ecbddaf80), LP · Trust strip (b23fe5cd-c61f-f258-d850-e24efd61a7bb), LP · Bottom CTA (c19ff96b-213b-9049-44a5-0bbdcb6a2229; prop Paragraph).
- New combo class `lp-question`.

**Revert**
- `2026-09-29-pbi01d-p3/` with REVERT.md (unlink the instances per page).

### P4 · Content sections as components

**What changed**
- The four content sections became components on the 51 landing pages, each page with its own copy in props.
- Six intended visible standardisations: step time tags weight 700 everywhere; rights descriptions and FAQ questions all at the designed (pulled-up) position; the Common problems eyebrow reads "What we see" at weight 500 on every page; medical-debt-attorney step tags in capitals; a stray blank line removed on debt-harassment-fdcpa-attorney; one `h4` FAQ question on debt-lawsuit-options now `h3`.

**Where in Webflow**
- Components: LP · What we do (dd4dd472-e7d6-7b6c-3f5b-f3b0f987e471), LP · Common problems (515b1047-cb16-da1c-8f40-ac800c47bc6c), LP · How it works (227e6ed7-a7ef-d06d-6da3-b5e61b52cedd), LP · Rights and FAQ (c87d3cd8-31b2-86ab-5286-08354728b042).
- New combo classes: `lp-bold`, `lp-right-text`, `lp-faq-q` (on Heading 41), `lp-step-tag` (on Text Block 19).
- Limits per component: 5 list items / 5 cards (What we do), 6 cards / 6 list items (Common problems), 4 steps, 6 rights, 7 FAQs.

**Revert**
- `2026-09-29-pbi01d-p4/` with REVERT.md (instance ids in `instances.jsonl`).

### P5 · Landing page template and copy tools

**What changed**
- Nothing published. A draft page "Landing page template" (`/landing-page-template`, never published) made only of the shared components.
- Repo tools (read-only, never write to Webflow): `tools/webflow/lp-sync.mjs` (prototype copy → prop payloads and a diff; `--check` validates the slug map) and `lp-extract.mjs` (reads copy back from served pages).

**Where in Webflow**
- Pages panel: draft page "Landing page template". New page steps: see the board note for PBI-01d.

**Revert**
- No backup folder: see packet. Deleting the draft page removes it. Deleted 30 Sep with the old drafts (operator); a new landing page now starts as a duplicate of an existing one.

**Evidence / review (P1–P5)**
- Code: GPT approve with fixes on P1–P5; Gemini approve with fixes (P1, P2, P5) and approve (P3, P4). UX: not needed for P1–P3; P4 UX GPT and Gemini approve with fixes. Packets [PBI-01d-P1.md](PBI-01d-P1.md) … [PBI-01d-P5.md](PBI-01d-P5.md), triage [PBI-01d-P1.triage.md](PBI-01d-P1.triage.md) … [PBI-01d-P5.triage.md](PBI-01d-P5.triage.md).

## PBI-04 · Mask form inputs in session recordings (27 Sep)

**What changed**
- No visible change. Clarity no longer records form text or typed values (tested by capturing Clarity uploads).
- Attribute `data-clarity-mask="true"` added to the Form Block (`div.w-form`) around every lead form.

**Where in Webflow**
- Page elements: the Form Block on 31 pages (30 landing pages + home).
- Components Hero-Form (2 form wrappers) and Hero-Form-For-New-Pages (2 form wrappers).
- Not changed: Mouseflow masking (account setting, manual), Clarity and GTM accounts.

**Revert**
- No backup folder. Since PBI-01d the attribute sits on the form wrapper in component **LP · Lead form** (51 landing pages) and on home's form; the old components carry it on the unpublished drafts. Revert: remove `data-clarity-mask` from those wrappers. Checked 30 Sep (PBI-24): present on all 52 form pages; Clarity uploads hold no typed value and no masked form text (52/52).

**Evidence / review**
- Code: GPT approve with fixes; Gemini approve with fixes. UX not needed. Follow-up done in PBI-24 (30 Sep): Clarity uploads captured on all 52 form pages: no typed value and no masked form text in them (52/52). [PBI-04.md](PBI-04.md), [PBI-04.triage.md](PBI-04.triage.md).

## PBI-05 · Sticky call bar never covers the form (27–28 Sep)

**What changed**
- On phones in business hours, the dark call bar is hidden while the step-1 form card is on screen and while the pop-up form is open. It fades in after the visitor scrolls past the form.
- One `<style>` + `<script>` block appended (final version v2, with a scroll-based fallback for browsers without IntersectionObserver).

**Where in Webflow**
- Site settings → Custom code → Footer code: the appended block starting `<!-- PBI-05 (G19)`.

**Revert**
- No item folder. Delete that block; the pre-change site footer is in `2026-09-27/code/` (baseline). See packet.

**Evidence / review**
- Code: GPT approve with fixes (on v1, its fix made v2); Gemini approve. UX: GPT approve with fixes; Gemini approve. [PBI-05.md](PBI-05.md), [PBI-05-ux.md](PBI-05-ux.md), [PBI-05.triage.md](PBI-05.triage.md).

## PBI-06 · Tracked phone number in the mobile header (28 Sep)

**What changed**
- Below 992 px (phones and tablets) the header shows the logo and one red call button with the tracked number. The ☰ menu is hidden (Option B; tablets accepted in D14).
- The number is swapped per ad source by the existing phone-swap script through the class `dynamic-phone`.

**Where in Webflow**
- Component `navbar` (04a0978c-8e86-d11c-3360-04ad644f4dd6): new Link Block (classes `Mobile Call` + `dynamic-phone`) in the Navbar Wrapper, with an icon embed and a `callnumbers` + `Mobile Call Number` text; link in URL mode `tel:+17188658350`.
- NavbarButton (☰) visibility set to hidden (element kept).
- Style "Navbar Brand" at the smallest breakpoint: width 80% → auto.
- New styles: "Mobile Call", "dynamic-phone", combo "callnumbers" + "Mobile Call Number".

**Revert**
- `2026-09-28-pbi06/` with REVERT.md.

**Evidence / review**
- Options UX: GPT and Gemini approve with fixes (both recommend B). Code: GPT approve with fixes; Gemini do not approve (menu blocker settled by B and D14). UX: GPT and Gemini approve with fixes. [PBI-06-options-ux.md](PBI-06-options-ux.md), [PBI-06.md](PBI-06.md), [PBI-06-ux.md](PBI-06-ux.md), [PBI-06-options-ux.triage.md](PBI-06-options-ux.triage.md), [PBI-06.triage.md](PBI-06.triage.md).

## PBI-06b · Same gap above the closing CTA button on every page (28 Sep)

**What changed**
- Every closing CTA has the same roomy gap (about 39 px, the operator's choice) between its paragraph and the button.
- Stray trailing line breaks removed from that paragraph on 29 pages (and a zero-width-joiner-only text node on 6 of them).

**Where in Webflow**
- Style "Text Block 20": margin-bottom 38px.
- Page elements: the closing CTA paragraph on 29 pages (only breaks after the last word).
- Not changed: the button style (the name "Button 7 Copy Copy Copy" exists twice in the project).

**Revert**
- No backup folder. Style "Text Block 20": remove `margin-bottom` (not set before: the 27 Sep stylesheet has none). The removed line breaks: the 29 pages' earlier HTML is in `2026-09-27/staging-html/<slug>.html` (the closing CTA paragraph).

**Evidence / review**
- Code: GPT approve with fixes; Gemini do not approve (blocker: enroll/start re-checked, 60/60 unchanged). UX: GPT and Gemini approve with fixes. [PBI-06b.md](PBI-06b.md), [PBI-06b-ux.md](PBI-06b-ux.md), [PBI-06b.triage.md](PBI-06b.triage.md).

## PBI-07 · Phone and ZIP fields open the number pad (28 Sep)

**What changed**
- Phones show the number pad for phone fields and the numeric keypad for ZIP fields. Formatting, validation and what the form sends are unchanged.
- Phone fields: `type="tel"` + `autocomplete="tel"`. ZIP fields: `inputmode="numeric"` + `autocomplete="postal-code"` (type stays text).

**Where in Webflow**
- Page elements: `#n-phone-number` on the 31 new-form pages.
- Components Hero-Form and Hero-Form-For-New-Pages: `#phone-number`, `#n-phone-number`, `#Alternative-Phone-Number`, `#zip-code`, `#n-zip-code`.

**Revert**
- No backup folder. Since PBI-01d the fields live in component **LP · Lead form** and home's form (`#n-phone-number` is `type="tel"` on all 52 form pages). Revert: set the field settings back as listed in the packet's Change section.

**Evidence / review**
- Code: GPT approve with fixes; Gemini do not approve (blocker answered by soft-keyboard and autofill tests). UX not possible on screenshots. [PBI-07.md](PBI-07.md), [PBI-07.triage.md](PBI-07.triage.md).

## PBI-07b · Phone and email must be valid before the form sends (28 Sep; removed 29 Sep)

**What changed**
- On the 21 old-form pages, the old form no longer sent a lead with a short phone or a bad email when Submit was triggered by keyboard.
- Guard script OldFormPhoneEmailGuard 1.0.0. The new form already blocked these values and was not changed.
- Removed again on 29 Sep (D18), once DS-7 had moved every page to the new form.

**Where in Webflow**
- Site settings → registered site script OldFormPhoneEmailGuard 1.0.0, applied in the site footer (the shipped form, per packet, triage and board). The backup's REVERT.md describes the first draft (a block appended to the footer code), which was replaced by the registered script before publishing.
- Since 29 Sep: removed from the site (still registered).

**Revert**
- Nothing to revert since 29 Sep (removed). To put it back: re-apply the registered script (source `2026-09-28-ds7/oldformphoneemailguard-1.0.0.js`); `2026-09-28-pbi07b/REVERT.md` covers only the first draft.

**Evidence / review**
- Code: GPT approve with fixes; Gemini approve with fixes. UX not needed. [PBI-07b.md](PBI-07b.md), [PBI-07b.triage.md](PBI-07b.triage.md).

## DS-7 · Rebuild the 21 older pages on the landing-page template (28–30 Sep)

**What changed**
- The 13 state pages and 8 older pages (letter, medical-debt-attorney, debt-harassment-act-fast, multiple-collectors-more-money, payday-loan-fight-back, payday-loan-debt-rights, payday-loan-lawsuit-proof, payday-loan-lawsuit-respond) now use the landing-page design and the new form only.
- Each keeps its own copy, tracked number, SEO/Open Graph and tracking. State pages: 3 text nodes changed (Ohio → state). Other 8: copy mapped node by node; 2 FAQ items added on medical-debt-attorney; card numbers 04, 05, 06 fixed.
- Pilot fix: Ohio got its own old head code back (it had taken the landing page's noindex head).
- D16 (29 Sep): the 13 state pages now say `noindex, nofollow` with canonical and og:url = `https://start.credolegal.com/{slug}`.
- D18 (29 Sep): site script OldFormPhoneEmailGuard removed. Operator 30 Sep: the 21 old versions stay as unpublished drafts (not deleted); checked: 21/21 `{slug}-old` URLs return 404 (the staging site publishes no sitemap).

**Where in Webflow**
- Pages panel: new pages under the original slugs (page ids in REVERT.md); old pages renamed `{slug}-old`, titled "(old design)", set to draft.
- Each new page: page settings (SEO title, description, Open Graph copied from the old page); Custom code head = old page's head + one heading style block (since D16: robots, canonical, og:url changed); footer = the template footer; page script RemoveStateOptions 1.0.0 (moved site-wide in PBI-01d P1).
- Phone numbers: first set in each page's phone-swap embed; since PBI-01d P2 in the `window.CREDO_PHONES` table (site footer code).
- 30 Sep (evening): the operator deleted the 21 drafts in the Designer (M2), and with them the draft "Landing page template" (PBI-01d P5). They cannot be restored in Webflow; only their page head/footer code is backed up (`2026-09-27/code/`), not their layouts. The components Hero-Form and Hero-Form-For-New-Pages are on no published page; unregistering them and Style Manager Clean up are the operator's (M5).

**Revert**
- `2026-09-28-ds7/` with REVERT.md (old heads in `oldhead/`, SEO/OG in `meta.json`, new page ids in `new-ids.json`). REVERT.md parts 1–4 cover the rebuild, D16 and D18.

**Evidence / review**
- State pages: Code GPT approve with fixes, Gemini do not approve (blockers: real lead waits on D1; form_submit tested 13/13); UX GPT and Gemini approve with fixes. Last 8: Code GPT approve with fixes, Gemini do not approve (state field tested 16/16); UX GPT approve with fixes, Gemini do not approve (Title Case, fixed in PBI-11). D16: GPT and Gemini approve with fixes. [DS-7-states.md](DS-7-states.md), [DS-7-states.triage.md](DS-7-states.triage.md), [DS-7-others.md](DS-7-others.md), [DS-7-others.triage.md](DS-7-others.triage.md), [PBI-11-D16.md](PBI-11-D16.md), [PBI-11-D16.triage.md](PBI-11-D16.triage.md).

## PBI-08 · Capture the Meta click id (fbclid) (29 Sep)

**What changed**
- Leads now carry `fbclid` (21 → 22 fields posted). The typo `fbclig` became `fbclid`.
- Return visits no longer send utm_source/medium/campaign and gclid empty. When a cookie name is stored twice (this host and .credolegal.com), the reader now takes the newest match (changed after review; the packet diff shows the first version).

**Where in Webflow**
- Site settings → Custom code → Head code, section 7 (the UTM block): the `utmKeys` list, the field mapping and the cookie reader.
- No form element added: section 7 adds a hidden field for every key in its list.
- Not changed: the call-click tracker in the same code still sends `fbclig` (D6 / PBI-22).

**Revert**
- `2026-09-29-pbi08/` (site-head-before.html and expected-after files). Revert steps: `2026-09-28-ds7/REVERT.md`, part 5.

**Evidence / review**
- Code: GPT approve with fixes; Gemini do not approve (blocker: CRM handling, the operator's check M3). No UX. [PBI-08.md](PBI-08.md), [PBI-08.triage.md](PBI-08.triage.md).

## PBI-09 · Dropdown options stored in Webflow (30 Sep)

**What changed**
- No visible change. "How many debts?" and "Secured or unsecured?" keep their options in Webflow instead of being rebuilt by a script on load.
- Each is now a DOM `<select>` with stored `<option>` children and the same id (`debts`, `Debt-Security`), name, required and classes. The old native selects were hidden, then removed after review.
- The G17 dropdown script (1,682 characters) removed from the site head code.
- Not changed: the debt-stage dropdown (already stored) and the state dropdown.

**Where in Webflow**
- Component LP · Lead form (ee6ce53c-73c7-547e-0332-e93ecbddaf80) and the home page form (page 6ab90fb0761d44332faf219d).
- To edit options: Designer → Navigator → the option element (text + value attribute).
- Site settings → Custom code → Head code: G17 block cut.

**Revert**
- `2026-09-30-pbi09/` with REVERT.md. Note: the native selects were removed, so a full revert means rebuilding them (see REVERT.md).

**Evidence / review**
- Code: GPT approve with fixes (round 2); Gemini approve (round 1 "do not approve" answered). No UX (nothing visible). [PBI-09.md](PBI-09.md), [PBI-09.triage.md](PBI-09.triage.md).

## PBI-10 · Slider label and unique element ids (30 Sep)

**What changed**
- Screen readers now hear a label and the formatted amount on the debt slider. No visible change.
- `#mjSlider`: `aria-label` (the visible question) and `aria-valuetext` (kept in sync with the amount; added after review).
- Duplicate ids removed: step-indicator `id="step-1/2/3"` dropped; checkboxes `Debt-Type-1` … `Debt-Type-6`; inner step-2 block `formstep2` → `formstep2-fields`.

**Where in Webflow**
- LP · Hero component: slider embed and step-indicator embed.
- LP · Lead form component: checkbox ids, the inner step-2 block, step-indicator embeds.
- Home page: the same embeds and elements in its own form.

**Revert**
- `2026-09-30-pbi10/` with REVERT.md. REVERT.md does not list the later `aria-valuetext` lines: see packet (round 2).

**Evidence / review**
- Code: GPT approve with fixes; Gemini approve with fixes (2 rounds each). No UX. [PBI-10.md](PBI-10.md), [PBI-10.triage.md](PBI-10.triage.md).

## PBI-11 · Statute citations keep their case (29 Sep)

**What changed**
- Citations show as typed ("§ 1692e(2)", not "§ 1692E(2)"). Word labels still show in capitals because 362 of them were retyped in capitals on 51 pages.
- Home: labels retyped, and 4 mistyped card citations corrected (found by review).
- Also: the what-we-do paragraph no longer shows in Title Case on the landing pages (G22).

**Where in Webflow**
- Styles "mjfdcpaboxtext" (67337275-088d-7c82-02ee-b895c03e2eb8) and "mjfdcpaboxtext Copy" (996867e7-78cc-68d2-d108-9ca6f61d2039): text-transform uppercase → none at the base breakpoint; the xl uppercase override removed.
- Style "Text Block 16" (0df26cd3-822d-e745-3e59-47e8294090cf): text-transform capitalize → none.
- Text of the label elements on 51 pages and home (before PBI-01d P4, so on page elements; now in component props).

**Revert**
- `2026-09-29-pbi11/` (labels-before.json, labels-after.json, pageids.json). Revert steps: `2026-09-28-ds7/REVERT.md`, parts 4 and 6.

**Evidence / review**
- Citations: Code GPT approve with fixes, Gemini do not approve (blockers answered); UX GPT approve with fixes, Gemini approve. Title Case: Code and UX, GPT and Gemini approve with fixes. [PBI-11.md](PBI-11.md), [PBI-11.triage.md](PBI-11.triage.md), [PBI-11-D16.md](PBI-11-D16.md), [PBI-11-D16.triage.md](PBI-11-D16.triage.md).

## PBI-12 · Page-specific copy fixes (29 Sep)

**What changed**
- debt-harassment-fdcpa-attorney: six rights summary lines from the prototype (were payday text). Sixth line per D20: "Each call after a cease request can add evidence of another FDCPA violation."
- debt-harassment-violations: first rights tag RIGHT → REMEDY; headline full stop.
- medical-debt-credit-report-removal: § 1692f tag → VIOLATION; hero sub-headline as in the prototype.
- wage-garnishment-attorney: step titles Debt investigation / Legal representation / Work towards debt resolution.
- credit-card-debt-challenge: empty `<em>` removed from the H1.
- G29: "Week 1" retyped in capitals on 21 pages, plus the 3 Week tags on home.
- Card numbering: fifth problem card "06" → "05" on 30 pages (29 landing pages + home); thank-you boxes renumbered 01–04, citation "§ 1692c(A)(1)" → "§ 1692c(a)(1)", then box 02 tag → GUIDANCE (D13).

**Where in Webflow**
- Text (String) nodes on those pages; node ids per page in the REVERT notes.
- Card 5 number: String b51746cd-6a53-47de-9f55-e67aa637e9ca.
- No style, structure or script change.

**Revert**
- `2026-09-29-pbi12/` with REVERT.md (served HTML `before/`, `after/`, `after2/`, `after3/`). Card numbering and thank-you boxes: `2026-09-28-ds7/REVERT.md`, part 7.

**Evidence / review**
- Code: GPT and Gemini approve with fixes. UX (round 2): GPT and Gemini approve with fixes. Card numbering: all four reviews approve with fixes. [PBI-12.md](PBI-12.md), [PBI-12.triage.md](PBI-12.triage.md), [NUM-cards.md](NUM-cards.md), [NUM-cards.triage.md](NUM-cards.triage.md).

## D13 (DS-6) · Thank-you pages: wording, repeat-submission line, one design and number (29 Sep)

Not a board row: tracked as decision D13. Listed here because it changed the site.

**What changed**
- /thank-you, /page/thank-you, /page/already-submitted: headline "Thank you. Your request has been received." and the approved paragraph (replaces "pre-approved" wording).
- /page/already-submitted: its own line, "We already have your request." with its own message.
- /thank-you call button: (443) 483-4080 → (718) 865-8350.
- /page/thank-you and /page/already-submitted now use the /thank-you design through a shared component. Template browser title → "Thank you".

**Where in Webflow**
- Page /thank-you (6ab90fb0761d44332faf2201): content wrapped in component "Thank-you page" (d2b02f7b-689a-7d6f-0a20-76a13ba1cfe5), props Headline and Message.
- Site Pages template (6ab90fb0761d44332faf21a3): old navbar and 4 sections replaced by one "Thank-you page" instance, props bound to CMS fields Title and Long subtitle; template page code cleared.
- CMS "Site Pages" collection: items thank-you and already-submitted (Title, Long subtitle filled).

**Revert**
- `2026-09-28-ds7/REVERT.md`, parts 7 and 8. Old template code and ids: `2026-09-29-thankyou/site-pages-template-code-before.md`.

**Evidence / review**
- Wording: Code GPT approve with fixes, Gemini do not approve; UX GPT approve with fixes, Gemini do not approve (blockers settled or raised to the operator). Repeat line: Code GPT approve with fixes, Gemini do not approve; UX both approve with fixes. Unify: Code and UX, GPT approve with fixes, Gemini do not approve (blockers answered). [D13-thankyou.md](D13-thankyou.md), [D13-thankyou.triage.md](D13-thankyou.triage.md), [D13-already-submitted.md](D13-already-submitted.md), [D13-already-submitted.triage.md](D13-already-submitted.triage.md), [TY-unify.md](TY-unify.md), [TY-unify.triage.md](TY-unify.triage.md).

## PBI-13 · Meta descriptions within 160 characters (30 Sep)

**What changed**
- 44 pages have a new meta description (26 audit texts + 18 from D23); every published page is now at most 160 characters (longest 159).
- og:description and twitter:description equal the meta description.
- multiple-collectors-more-money narrowed after review: "Several collectors calling? Each one that breaks the FDCPA can owe you damages. Our attorneys track every violation. Free case evaluation."

**Where in Webflow**
- Each page's settings → SEO → Meta description; Open Graph description set to "same as SEO".

**Revert**
- `2026-09-30-pbi13/` with REVERT.md (old descriptions in `before/<slug>.html`).

**Evidence / review**
- Code: GPT and Gemini approve with fixes (2 rounds). No UX (head only). [PBI-13.md](PBI-13.md), [PBI-13.triage.md](PBI-13.triage.md).

## PBI-14 · Schema: LegalService and FAQPage (30 Sep)

**What changed**
- No visible change. One site-wide LegalService: "Credo Legal Services, P.C.", 1 Liberty Street, Suite 4010, New York, NY 10006; logo, image and twitter:image from this site's asset store.
- Unchanged: `url` (start.credolegal.com, D21), description, telephone, sameAs (D9).
- A FAQPage per page (52: 51 landing pages + home), built from that page's visible FAQs.

**Where in Webflow**
- Site settings → Custom code → Head code: the LegalService JSON-LD block and the twitter:image tag.
- Each of the 52 pages: page settings → schema markup (JSON-LD) field.
- After any FAQ copy change: run `tools/webflow/pbi14-faq-schema.py <extract> --check <served-dir>` and rewrite the pages it lists.

**Revert**
- `2026-09-30-pbi14/` with REVERT.md.

**Evidence / review**
- Code: GPT and Gemini approve with fixes. No UX. [PBI-14.md](PBI-14.md), [PBI-14.triage.md](PBI-14.triage.md).

## PBI-15 · Colour and contrast (30 Sep)

**What changed**
- Pale text is darker and passes contrast (axe: 20 failures per page → 0). Body copy weight 300 → 400, eyebrows 600, text colour ink, font Hanken Grotesk.
- Grey text (form intro, card numbers, inactive steps, slider end labels, "or call") → `secondary` #6a7688; the pop-up step label → `muted` #5b6470.

**Where in Webflow**
- Variables: `ink` #111418, `muted` #5b6470, `secondary` #6a7688, `credo-red-soft` #ff6b73.
- Classes with a unique name edited in the Designer (e.g. Text Block 25, mjfdcpaboxtext Copy; lede, paragraph and card text bound to `muted`).
- Embeds: step labels and slider labels in the hero, pop-up and home embeds use `var(--secondary)`.
- Site settings → Custom code → Head code: a commented `<style>` block ("PBI-15 (30 Sep)") for classes whose name exists several times (`.mjfdcpatext-copy`, `.mjthankyousteps-copy`, `.button-7-copy + .callustext-copy`, `.mjfdcpaboxtext-copy-copy`) and the `body` default. It stays while the old drafts (which use the duplicate classes) are kept (D18); moves into the classes with DS-4.

**Revert**
- No REVERT.md. Head code: remove the "PBI-15 (30 Sep)" rules from the `<style>` block (see the layers note above); `2026-09-30-pbi15/site-head-before.html` / `-after.html` show exactly what was added. Variables and classes: earlier values in the packet's Change section and in the served pages `2026-09-30-pbi15/served-before/`.

**Evidence / review**
- Code and UX: GPT and Gemini approve with fixes. [PBI-15.md](PBI-15.md), [PBI-15.triage.md](PBI-15.triage.md).

## PBI-16 · Mobile type scale and text case (30 Sep)

**What changed**
- On phones (≤479 px): H1 32px, section headlines 26px, rights rows stacked. No text under 12px on phones.
- Form question line height 1.3 with a 4px gap to the helper line; step labels and rights tags 12px; step labels hidden at ≤420px (numbers only, as the prototype).
- Title Case paragraph (G22) was already fixed in PBI-11.

**Where in Webflow**
- Styles: Heading 46 (H1) at mobile portrait 32px / 1.05; Heading 47 + lp-question line height 1.3; mjfdcpaboxtext 11px → 12px.
- Site settings → Custom code → Head code, the same `<style>` block ("PBI-16 (30 Sep)" rules): `.stl`/`.stn` 12px, `.heading-47` line height and margin, the ≤420px and ≤479px rules.

**Revert**
- No REVERT.md. Head code: remove the "PBI-16 (30 Sep)" rules (see the layers note above; `2026-09-30-pbi16/site-head-before.html` / `-after.html` show the difference). Styles: earlier values in the packet's Change section and `2026-09-30-pbi16/served-before/`.

**Evidence / review**
- Code and UX: GPT and Gemini approve with fixes. [PBI-16.md](PBI-16.md), [PBI-16.triage.md](PBI-16.triage.md).

## PBI-17 · Form card, bottom CTA and page width (30 Sep)

**What changed**
- Form card: border removed, soft shadow, 4px radius.
- "Or call" line moved below the card, in mono 13px muted, number in ink with a red underline. The link keeps id `herocta`.
- Bottom CTA left-aligned; headline max 680px, paragraph max 560px; headline 26px on phones.
- FAQ answers capped at 55ch on desktop.
- Page no longer wider than the screen (was 1555px at 1440): the "poition" typo and the missing `}` fixed.

**Where in Webflow**
- Style "Div Block 36" (9865c48b-cfca-516b-1e20-deb7886173ec): hero and pop-up cards.
- LP · Hero component and home: call block moved; new classes `hero-call`, `hero-call-number`, combo `hero-card`.
- Bottom CTA code embed (LP · Bottom CTA c19ff96b-213b-9049-44a5-0bbdcb6a2229, and home).
- Rights and FAQ code embed (LP · Rights and FAQ c87d3cd8-31b2-86ab-5286-08354728b042, and home): FAQ max width.
- Left for DS-8: the PBI-15 "OR CALL" rule in the site head no longer matches anything.

**Revert**
- `2026-09-30-pbi17/` with REVERT.md (before-state.md, bottom-cta-embed-before.html, faq-embed-before.html).

**Evidence / review**
- Code: GPT and Gemini approve with fixes. UX: GPT approve with fixes; Gemini approve. [PBI-17.md](PBI-17.md), [PBI-17.triage.md](PBI-17.triage.md).

## PBI-18 · Red accent word in the H1 (30 Sep)

**What changed**
- Each page's H1 has one red accent word (#c92028, upright). The bottom CTA's "decision" is red too (#ff6b73).
- Accents: 48 pages from the prototype, 4 picked (list in [PBI-18-accents.md](PBI-18-accents.md)); after round 2, payday-loan-debt-harassment uses "Calling".
- Home: H1 accent "Legally."; its form question h1 → h3; its bottom CTA gets `<em>decision</em>` and loses a hard line break.

**Where in Webflow**
- LP · Hero component: Heading 46 split into three spans bound to props H1, H1 accent (new), H1 end (new); new class `h1-accent`. H1 end never starts with a space.
- Home page: H1 span, form question tag, bottom CTA heading.
- Bottom CTA code embeds (component and home): CSS `.bottom-cta .heading-39-copy em`.

**Revert**
- `2026-09-30-pbi18/` with REVERT.md.

**Evidence / review**
- Code: GPT and Gemini approve with fixes. UX: GPT approve with fixes; Gemini approve (round 2 both approve with fixes). [PBI-18.md](PBI-18.md), [PBI-18-r2.md](PBI-18-r2.md), [PBI-18-accents.md](PBI-18-accents.md), [PBI-18.triage.md](PBI-18.triage.md).

## PBI-19 · Small polish (30 Sep)

**What changed**
- No visible tap target under 24px on the 52 form pages: hero call number 25px, bottom CTA call number, footer phone links 24px, BBB badge links 80px, header nav links 24px, footer menu links 24px on desktop, debt slider box and handle 24px.
- On phones in call hours, the white band under the dark footer is gone (the space moved into the footer).
- "Week 1" case (G29): done earlier under PBI-12.

**Where in Webflow**
- Style `hero-call-number` (338a56a1-5249-a95b-04a6-d39b441b84e9): padding 6px, underline as text-decoration.
- New class `cta-call-number` on the bottom CTA call link (LP · Bottom CTA and home).
- Style "Link Block 5" (footer component): padding 2px.
- BBB badge embeds (Rights and FAQ and Trust strip sections, component and home): link inline-block, image block.
- Combo `Nav Link + track-redirect` (2px padding); style `Link 3 Copy` (4px padding, desktop).
- Slider CSS in the slider embed (scripts untouched).
- Bottom CTA code embed: `body:has(.sticky-call-button)` rule.

**Revert**
- No REVERT.md. `2026-09-30-pbi19/before-state.md` lists the earlier value of every style and embed changed (with element ids); embeds: `bottom-cta-embed-before.html`, `slider-embed-before-served.html`. `Link 3 Copy` was changed again in PBI-24 (4px → 5px).

**Evidence / review**
- Code and UX: GPT approve with fixes. Gemini not run (API credits); re-run pending. [PBI-19.md](PBI-19.md), [PBI-19.triage.md](PBI-19.triage.md).

## PBI-25 · Heading levels on home and the thank-you pages (30 Sep)

**What changed**
- No visible change. One H1 per page: home 29 h1 → 1 (18 → h2, 10 → h3); thank-you pages 9 → 1 (5 → h2, 3 → h3).
- Small CSS blocks keep the old look.

**Where in Webflow**
- Home page: heading tags; page settings → Custom code → Head code (heading CSS).
- Component "Thank-you page": heading tags and two CSS lines in its style embed (serves /thank-you, /page/thank-you, /page/already-submitted).
- To move into the classes with DS-8.

**Revert**
- No REVERT.md. Set the headings back to h1 (`2026-09-30-pbi25/map-home.json` and `map-thanks.json` list each element and its earlier tag), then remove the heading CSS (`home-heading-fix.css` from the home page's head code, the `thanks-heading-fix.css` lines from the Thank-you page component's style embed).

**Evidence / review**
- Code: GPT approve with fixes. Gemini not run (API credits). No UX (nothing visible). [PBI-25.md](PBI-25.md), [PBI-25.triage.md](PBI-25.triage.md).

## PBI-23 · Performance on phones (30 Sep; Claude's part)

**What changed**
- No visible change. Lighthouse unchanged within noise (clean-up, not speed-up). Each removal approved per script by the operator.
- Removed: the Inputflow library `i.js`; the footer script that recoloured "decision" (and set `.callustext a` white); the slider code embed script that recoloured "Legally" (in LP · Hero on the 51 landing pages and in home's hero; it only matched home's H1); the second Trustpilot bootstrap include.
- Not changed: Optibase stays synchronous; the form code stays in the head (Webflow's 50,000-character footer limit).

**Where in Webflow**
- Site settings → Custom code → Head code: the `i.js` line replaced by a one-line comment.
- Site settings → Custom code → Footer code: the recolour script replaced by a one-line comment.
- Hero slider code embed: the `// Fix for heading color` block replaced by a comment.
- Component LP · Rights and FAQ (c87d3cd8-31b2-86ab-5286-08354728b042), TrustBox code embed: second bootstrap include replaced by a comment (the Trust strip keeps its include).

**Revert**
- `2026-09-30-pbi23/` with REVERT.md (each removal can be put back on its own).

**Evidence / review**
- Code: GPT approve with fixes. Gemini not run (API credits). No UX. [PBI-23-plan.md](PBI-23-plan.md), [PBI-23.md](PBI-23.md), [PBI-23.triage.md](PBI-23.triage.md).

---

## PBI-24 · Close-out (30 Sep)

**What changed**
- Found by the close-out lpcheck: on iPad (Safari's engine) the footer link "terms & conditions" was 23.6px tall, just
  under the 24px minimum tap size (PBI-19 had set 4px padding, which Chromium draws at 24px). Now 25.6px.
- Footer links on desktop and tablet are 2px taller; phones unchanged.

**Where in Webflow**
- Class Link 3 Copy (af3c28f2-06c9-7cfe-9652-8f270d94865e), base breakpoint: padding-top and padding-bottom 4px → 5px.
  The tiny breakpoint's own values (display block, padding-top 5px, padding-bottom 0) were not touched.

**Revert**
- `2026-09-30-pbi24/` with REVERT.md.

**Evidence / review**
- Published stylesheet differs by that one rule only; iPad axe target-size clean. [PBI-24.md](PBI-24.md), [PBI-24.triage.md](PBI-24.triage.md).

## PBI-28 · Tidio chat loads after the first interaction (30 Sep)

**What changed**
- The chat widget loads on the visitor's first scroll, tap, click or key press, or 5 s after the page has loaded,
  instead of during the first load (~510 KB, 290–430 ms of phone main-thread time).

**Where in Webflow**
- Site settings → Custom code → Head code: the `<script src="//code.tidio.co/…js" async>` line replaced by the
  commented "PBI-28" loader block (same script URL).

**Revert**
- `2026-09-30-pbi28/` with REVERT.md (site-head-before.html / site-head-after.html).

**Evidence / review**
- Code GPT approve with fixes; Gemini pending. [PBI-28.md](PBI-28.md), [PBI-28.triage.md](PBI-28.triage.md).

## PBI-29 · Logo images: right size, not lazy at the top (30 Sep)

**What changed**
- Every logo (header, footer, pop-up, thank-you) now uses one 8.6 KB file instead of 13–38 KB files: 117 KB → 8.6 KB
  of logo per landing page. The header and thank-you logos load immediately (they are at the top). Same look.
- The BBB seal is no longer squashed on phones (it is drawn in proportion in the same box).

**Where in Webflow**
- Assets: `credo-logo-420.png` (6abd55573915529793acb45e; also `credo-logo-280.png` 6abd555711b7d04e77f3fb8d, unused).
- Navbar component (Image): new file, custom attribute `loading=eager`.
- Footer-MJ and "footer" (inside Thank-you page) components: image set directly (their "Image" prop is now unused;
  tooltip says so). LP · Lead form and home: pop-up logo (Image 30). Thank-you page component: Image 29, `loading=eager`.
- BBB seal code embeds (LP · Rights and FAQ, LP · Trust strip, home): `width="384" height="80"` and
  `object-fit:contain;object-position:left center` on the image.

**Revert**
- `2026-09-30-pbi29/` with REVERT.md (before-state.md, bbb-embed-before.html).

**Evidence / review**
- Code GPT approve with fixes; UX GPT approve with fixes; Gemini pending. [PBI-29.md](PBI-29.md), [PBI-29.triage.md](PBI-29.triage.md).

## PBI-30 · Badges after the first interaction; two site scripts inline (30 Sep)

**What changed**
- The Trustpilot widgets and the BBB seals load on the visitor's first scroll, tap, click or key press, or 5 s after
  the page has loaded (their boxes are reserved). First load without interaction: 88 → 47 requests.
- Webflow's two registered site scripts (FormSubmitDataLayer, RemoveStateOptions) run inline from the site footer.

**Where in Webflow**
- Site settings → Custom code → Footer code: the "PBI-30" loader and the two scripts' code at the end. **The inline
  copies are now the source**: the registered scripts are still registered but not applied.
- Site settings → registered scripts: FormSubmitDataLayer 1.0.0 and RemoveStateOptions 1.0.0 un-applied.
- LP · Trust strip, Code Embed 8: Trustpilot `<script>` tag replaced by a comment. BBB seal embeds (Trust strip,
  Rights and FAQ, home): `src` placeholder + `data-credo-src`.

**Revert**
- `2026-09-30-pbi30/` with REVERT.md (footer before/after, embed before/after).

**Evidence / review**
- Code GPT approve with fixes; Gemini pending. [PBI-30.md](PBI-30.md), [PBI-30.triage.md](PBI-30.triage.md).

## PBI-31 · Optibase off (temporary measurement, 30 Sep)

**What changed**
- The Optibase script tag in the site head is commented out (the operator's request, to measure the page without
  Optibase hiding it until its API answers). The original tag is quoted inside the comment.

**Where in Webflow**
- Site settings → Custom code → Head code: the "PBI-31" comment.

**Revert**
- `2026-09-30-pbi31/REVERT.md`: put the quoted line back (or write `site-head-before.html` back) and publish to the
  staging domain only. Open: the operator's decision (restore, keep off, or only on pages with live tests).

## PBI-26 · Fonts only from our own files (30 Sep)

**What changed**
- Step 1: Hanken Grotesk (variable 300–700) and Inconsolata uploaded as custom fonts (font-display swap); the
  operator removed the Google fonts (DM Mono, Hanken Grotesk, PT Mono) in Site settings.
- Step 2 (evening): Webflow still loaded Inconsolata from Google (its built-in Google font list triggers the
  render-blocking `webfont.js` for any class naming it). The same file was uploaded once more as **"Credo Mono"**
  (one variable face, 200–900); 60 classes and 8 form/slider embeds now name Credo Mono. Two class names that
  existed several times (`mjfdcpaboxtext Copy Copy` ×8, `callustext Copy` ×3): the copy in use holds the merged
  styling under its original name; the 9 unused copies are parked as `zz unused …` (next Clean up removes them).
- Result: no `webfont.js`, no Google font request or preconnect; font files per page 4 → 2 (121.7 → 63.7 KB).
  Option (a): the slider value renders at its class weight 300, the hero phone number at 600.
- Published with the operator's Style Manager Clean up (922 of 1,271 classes; stylesheet 229 → 117 KB).

**Where in Webflow**
- Site settings → Fonts: custom fonts Hanken Grotesk, Credo Mono (and the two old, unused Inconsolata entries: M7).
- Classes: the 60 listed in the backup; LP · Hero (step-1 and slider embeds), LP · Lead form (step-2/3 embeds),
  home's four form embeds.

**Revert**
- `2026-09-30-pbi26/` (step 1) and `2026-09-30-pbi26b/REVERT.md` (step 2: class list with every earlier value, full
  style dump, embed code in `served-before/`, merged rules in `site-css-before-8c3f49456.css`). Clean up itself
  cannot be reverted from here.

**Evidence / review**
- Served HTML 56/56, element compare 56 pages × 1440/390, functional compare 8/8, network, Lighthouse (FCP ~1.8 s).
  Code + UX GPT approve with fixes; Gemini pending. [PBI-26b.md](PBI-26b.md),
  [PBI-26b.triage.md](PBI-26b.triage.md). Open: home photos' `sizes` since the Clean up (M6).

## PBI-27 · No Webflow spam check (Turnstile) on the Formspree form (30 Sep)

**What changed**
- The operator switched the form bot protection off (M4); published with PBI-26. The Turnstile script (86.7 KB)
  no longer loads, the recurring atob console errors are gone, and the form sends the same 20 fields (minus the
  empty `cf-turnstile-response`, which Formspree never used).

**Where in Webflow**
- Site settings (operator's toggle); no element changed.

**Revert**
- Switch bot protection back on and publish to the staging domain only.

**Evidence / review**
- Reviewed within PBI-26 ([PBI-26b.triage.md](PBI-26b.triage.md), rows 5, 9, 10).

## L2 · Minify HTML, CSS and JS (30 Sep, operator)

**What changed**
- The operator switched on Webflow's minify options; published to the staging domain only. Stylesheet 116.7 → 95.9 KB
  (20.1 → 18.3 KB transferred with brotli); webflow.js was already minified; the pages' HTML is unchanged apart from
  whitespace.

**Where in Webflow**
- Site settings → Publishing → Advanced publishing options.

**Revert**
- Switch the options off and publish to the staging domain only.

**Evidence**
- Served HTML 56/56 identical after normalising whitespace and file hashes (`2026-09-30-l2-minify/`); element
  compare 6 pages × 1440/390: 0 differences (animated call-button dot aside).

## PBI-26 follow-up · Font preload removes the hero layout shift (30 Sep late evening / 1 Oct)

**What changed**
- Two `<link rel="preload" … as="font" crossorigin>` lines for the two self-hosted font files at the top of the site
  head code (added by the operator; the site-code API tool was unavailable in that session), published to staging only.
- PageSpeed's layout shift on phones (0.28, the hero form card moving when the fonts arrive; already 0.283 before
  PBI-26) is gone: CLS 0 in 15/15 throttled phone runs on 5 pages; each font still downloads once.

**Where in Webflow**
- Site settings → Custom code → Head code, first two lines. If a font file is replaced in Site settings → Fonts, its
  URL changes: update the matching line.

**Revert**
- `2026-10-01-preload/REVERT.md`: delete the two lines, publish to the staging domain only.

**Evidence / review**
- Served HTML 56/56, functional compare 8/8, WebKit and Firefox spot checks. Code GPT approve with fixes; Gemini
  pending. [PBI-26c.md](PBI-26c.md), [PBI-26c.triage.md](PBI-26c.triage.md).

## PBI-33 · Heading order (1 Oct)

**What changed**
- The form's first question is an h2 instead of an h3 (it follows the h1). The card titles on home (27) and on the
  thank-you pages (7) are h3 instead of h4. Skipped heading levels on the 56 pages: 58 → 0. No visual change.

**Where in Webflow**
- LP · Hero (heading "How much do you currently owe…"); home's own form heading; Thank-you page component and home:
  `Heading 41` titles now carry the combo class `as-h4` (keeps the h4 look: 18px / 24px / 600 / 10px margins).

**Revert**
- `2026-10-01-headings/REVERT.md` (element ids, earlier levels and classes).

**Evidence / review**
- Element compare at 1440, 810 and 390: only tag and class names differ. Functional compare 8/8. Code GPT approve
  with fixes; Gemini pending. [PBI-25b.md](PBI-25b.md), [PBI-25b.triage.md](PBI-25b.triage.md).

## PBI-32 · Time tags removed from the "How it works" steps (2 Oct)

**What changed**
- The small red tag under each step (DAY 0, WEEK 1+, ONGOING, BY DEADLINE, CONSULTATION …) is removed on every page
  (operator's request): 217 tags on 55 pages. The 4 component props that held the tag text are removed too.

**Where in Webflow**
- LP · How it works (the tag block of each step; props "Step 1–4 when"); home's "How it works" section; Thank-you
  page component. Repo tools: `lp-components.json`, `lp-sync.mjs`, `lp-extract.mjs` no longer know the props.

**Revert**
- `2026-10-02-steptags/REVERT.md`; every page's tag values in `step-tags-before.json`.

**Evidence / review**
- Served HTML 56/56 identical apart from the tags; functional compare 8/8. Code + UX GPT approve with fixes; Gemini
  pending. [PBI-32.md](PBI-32.md), [PBI-32.triage.md](PBI-32.triage.md). Open: D28 (remaining timeline wording).

## PBI-34 · Main and footer landmarks (2 Oct)

**What changed**
- Every landing page, home and the thank-you pages have one `<main>` element around their content sections
  (operator's decision D29). The footers are `<footer>` elements. Nothing else changes: all 56 pages' HTML is
  identical apart from these tags.

**Where in Webflow**
- Each landing page and home: a Block with tag `main` between the navbar and the footer, holding the 8 sections.
- Thank-you page component: a `main` block around its 4 sections.
- Footer-MJ and the "footer" component: root tag `footer`.

**Revert**
- `2026-10-02-main/REVERT.md`; the new blocks' ids in `main-ids.md`.

**Evidence / review**
- Served HTML 56/56; element compare 7 pages × 1440/390 (only the added MAIN row); functional compare 8/8; pop-up
  form walk; axe passes landmark-one-main, region, heading-order. Code GPT approve with fixes; Gemini pending.
  [PBI-34.md](PBI-34.md), [PBI-34.triage.md](PBI-34.triage.md).
- Same publish: the two old Inconsolata custom fonts deleted (M7), the operator's second Clean up (M5) and image
  regeneration (M6, home photo bytes unchanged).

## At a glance

| ID | Title | Main Webflow location(s) | Status |
|---|---|---|---|
| PBI-00 | Baseline and safety net | none (backup only) | done |
| PBI-00b | Remove dead-weight pages | Pages panel (8 drafts); CMS "Know your rights" (4 items) | done |
| PBI-01 | Clean the page code | Page custom code, 52 pages | done |
| PBI-01c | Old-form pages | via DS-7 | done |
| PBI-01d | Shared code | Site head/footer code; CREDO_PHONES table; 8 LP components; draft Landing page template (deleted 30 Sep) | done |
| PBI-04 | Mask form inputs | Form Block on 31 pages; Hero-Form, Hero-Form-For-New-Pages | done |
| PBI-05 | Sticky call bar | Site footer code | done |
| PBI-06 | Phone in mobile header | navbar component; Navbar Brand style | done |
| PBI-06b | Same gap above closing CTA | Text Block 20 style; 29 page paragraphs | done |
| PBI-07 | Number pad fields | #n-phone-number (31 pages); 2 old-form components | done |
| PBI-07b | Valid phone and email | Registered site script (removed 29 Sep, D18) | done |
| DS-7 | Rebuild the 21 older pages | Pages panel; page settings and page code of 21 pages | done (the 21 old versions were deleted by the operator on 30 Sep, evening) |
| PBI-08 | fbclid | Site head code, section 7 | built and live; closes when the operator confirms the CRM side (M3, open) |
| PBI-09 | Dropdown options stored | LP · Lead form; home form; site head (G17 cut) | done |
| PBI-10 | Slider label, unique ids | LP · Hero, LP · Lead form, home embeds | done |
| PBI-11 | Citations keep their case | mjfdcpaboxtext styles; Text Block 16; label text | done |
| PBI-12 | Page-specific copy fixes | Text nodes on 5 pages + Week tags + card numbers | done |
| D13 | Thank-you pages | Thank-you page component; Site Pages template + CMS | done (D13 closed) |
| PBI-13 | Meta descriptions | Page settings → SEO, 44 pages | done |
| PBI-14 | LegalService and FAQPage | Site head code; page JSON-LD field, 52 pages | done |
| PBI-15 | Colour and contrast | Variables; classes; embeds; site head `<style>` block | done |
| PBI-16 | Mobile type scale | Heading 46/47, mjfdcpaboxtext styles; site head `<style>` block | done |
| PBI-17 | Form card, bottom CTA, width | Div Block 36; LP · Hero; Bottom CTA and Rights and FAQ embeds | done |
| PBI-18 | Red accent in H1 | LP · Hero (3 spans, h1-accent); home; Bottom CTA embeds | done |
| PBI-19 | Small polish | Call-link and nav/footer styles; BBB, slider, Bottom CTA embeds | done (Gemini review pending) |
| PBI-25 | Heading levels | Home tags + head code; Thank-you page component | done (Gemini review pending) |
| PBI-23 | Performance on phones | Site head/footer code; slider embed in LP · Hero and home's hero; LP · Rights and FAQ embed | partly done: Tidio (D8), recorder (D5), operator manual steps open |
| PBI-24 | Close-out | Class Link 3 Copy (footer links) | close-out done; its domain-switch task waits on D16, D21 |
| PBI-28 | Tidio after first interaction | Site head code (loader) | done |
| PBI-29 | Logo images | Navbar, Footer-MJ, footer, Thank-you page, LP · Lead form, home; BBB embeds | done |
| PBI-30 | Badges after interaction; scripts inline | Site footer code; Trust strip and BBB embeds; registered scripts un-applied | done |
| PBI-31 | Optibase off (temporary) | Site head code (comment) | live; operator to decide |
| PBI-26 | Fonts only from our own files | Custom fonts; 60 classes; 8 form/slider embeds (LP · Hero, LP · Lead form, home) | done (M6 home photo sizes, M7 old font entries open) |
| PBI-27 | No Turnstile on the form | Site settings (operator's toggle) | done |
| PBI-33 | Heading order | LP · Hero; home; Thank-you page component (combo class `as-h4`) | done |
| PBI-32 | Time tags removed | LP · How it works (elements + 4 props); home; Thank-you page component | done (D28 open) |
| PBI-34 | Main and footer landmarks | A `main` block on 52 pages and in the Thank-you page component; footer components' tag | done (D30 open) |

## Open / not changed

- **PBI-01b** One UTM mechanism: deferred by the operator (29 Sep). Only a read-only mapping was done; nothing changed.
- **PBI-02** Lead form destination for staging: waits on D1.
- **PBI-03** Consent line under the submit button: waits on D2.
- **PBI-20** CTA labels: waits on D3.
- **PBI-21** The four payday-content pages: deferred by the operator (own copy or redirect, D4 open part).
- **PBI-22** Call-click tracker: waits on D6.
- **PBI-39** legal pages: the attorney's read; then remove the draft note and fill in the date.
- **PBI-24, domain-switch task** (the close-out itself is done): robots, canonical and og:url for the final domain wait on D16 and D21 (today noindex, nofollow + canonical to start.credolegal.com/{slug}).
- Parts still open inside done items: PBI-08 CRM check (M3); PBI-23 Tidio (D8), second recorder (D5), GTM Nextdoor timing (operator, manual; fonts done in PBI-26, minify done in L2); site-head CSS for the duplicate-named classes (the drafts are gone, but Webflow keeps every copy of a used name through Clean up; resolve them the PBI-26 way with DS-4 / DS-8); Gemini reviews for PBI-19, PBI-23, PBI-25, PBI-26, PBI-28, PBI-29, PBI-30.
- Found and not changed (copy or account decisions): D22 hero wording, D24 per-call $1,000 claims, D25 home headings, D26 Optibase in Safari.

## PBI-21 · Own copy for the four pages that showed the payday page (2 Oct)

**What changed.** /collection-defense, /credit-cards, /fcba-and-fdcpa and /stop-wage-garnishment showed the copy of
/payday-loan-lawsuit-respond. Each now carries its own copy, taken from the same address on start.credolegal.com
(read-only) and fitted to the landing-page components. Also updated: the FAQ structured data (JSON-LD) of the four
pages, and the title and description of /collection-defense (it carried a credit-card title).

**Where in Webflow.** The four pages: the prop values of their `LP · Hero`, `LP · What we do`, `LP · Common problems`,
`LP · How it works`, `LP · Rights and FAQ` and `LP · Bottom CTA` instances; Page settings → Schema markup; for
/collection-defense also Page settings → SEO. No component, class or script was changed.

**Source.** `tools/webflow/legacy4/build-content.mjs` → `public/harassment-lp/content-{collection-defense,credit-cards,fcba-and-fdcpa,stop-wage-garnishment}.js`;
`lp-sync.mjs` maps the four pages to these files.

**Verified.** 607 props read back on 6 pages, 0 differ; FAQPage equals the visible questions; /payday-loan-lawsuit-respond
unchanged; browser at 1440 and 390 with trackers blocked.

**Undo.** Backup `2026-10-02-legacy4/`: `served-before/` and `current.json` hold the previous prop values (the payday copy);
set them back with `lp-sync.mjs` payloads built from that file, and restore the previous Schema markup from the served-before pages.

## PBI-35 · Angle clusters: copy aligned on 26 pages, 12 pages added (2 Oct)

**What changed.** (1) On 26 landing pages the hero headline, sub-line and/or the "What we do" heading were changed so
that each page states the promise of its angle; headlines that match the page's Google ad were kept
(`tools/webflow/clusters/edits.json` lists every change). (2) 12 new landing pages were created by duplicating
/fcba-and-fdcpa and given their own copy: debt-harassment-validation, wage-garnishment-judgment,
wage-garnishment-rights, debt-lawsuit-stop-calls, medical-debt-stop-calls, debt-lawsuit-violations,
medical-debt-violations, wage-garnishment-violations, debt-harassment-settlement, debt-lawsuit-settlement,
payday-loan-reduce, medical-debt-reduce (page ids in `tools/webflow/clusters/new-pages.json`).

**Where in Webflow.** Prop values of the `LP ·` component instances on those pages. For the new pages also: Page
settings (title, description, share image, Schema markup) and Page settings → Custom code → Head (noindex, canonical
and og:url to `https://start.credolegal.com/{slug}`, and the heading style block the other landing pages carry; a
duplicated page does not inherit page head code).

**Verified.** 63 pages read back (9 older hero wordings differ from the prototype files and were not touched); on the
26 edited pages only the intended props changed; FAQPage equals the visible questions on all 63; all 63 say noindex.

**Not done / open.** The new pages are not in the phone table (they show the default new-clients number) and have no
ads. Copy on the new pages is a draft for the attorney.

**Undo.** Edited pages: `2026-10-02-clusters/current.json` holds the previous values of every prop. New pages: set
them to draft or delete them in Webflow (Pages panel); nothing else depends on them.


## PBI-36 · Credit card rights page says "credit card" (3 Oct)

**What changed.** On /fcba-and-fdcpa (now /debt-credit-card-know-your-rights-fcba-fdcpa) the hero headline is
"Credit Card Debt? Know Your Rights.", the sub-line names the FCBA and the FDCPA, and the first section, the first and
third list items, four "Who this helps" lines and the rights intro say credit card or card. Search title and
description updated. The before/after of all 13 fields is in `review/PBI-36.md`; the values are in
`tools/webflow/clusters/edits.json` (the override block of `content-fcba-and-fdcpa.js`).

**Where in Webflow.** Prop values of the `LP · Hero`, `LP · What we do`, `LP · Common problems` and `LP · Rights and FAQ`
instances on that page; Page settings → SEO title and description.

**Verified.** Served page read back: 11 body strings, title and description present; old strings gone; one h1;
canonical, noindex and FAQPage unchanged; screenshots at 1440 and 390.

**Undo.** Set the 11 props and the two SEO fields back to the "Before" column of `review/PBI-36.md`.

## PBI-37 · Landing-page addresses: debt-{type}-{angle}-{variant} (3 Oct)

**What changed.** 45 of the 48 cluster landing pages got a new address in one pattern chosen by the operator
(`tools/webflow/url-map-2026-10-03.json` lists old and new). For each renamed page the canonical and og:url lines in
the page head now carry the new address, and its key in the shared phone table was renamed.

**Where in Webflow.** Pages panel → page settings → Slug (45 pages). Page settings → Custom code → Head: the two lines
`<link rel="canonical" …>` and `<meta property="og:url" …>` (45 pages). Site settings → Custom code → Footer: the keys
of `window.CREDO_PHONES` (34 keys; a page that is not listed still gets `'*'`).

**Verified.** 48 new addresses 200; 45 old addresses 404; visible text of all 48 pages identical to the snapshot before
the rename; head tags, one h1, FAQPage, titles as before; the footer code equals the intended file byte for byte in all
48 served pages; no old address left in any served page; phone number shown correctly on 5 pages (google, meta, bing,
no source, page not in the table); `lp-sync.mjs --check` ok.

**Not done / open.** 301 redirects from the old addresses (the API needs an Enterprise plan): the list is in
`tools/webflow/redirects-2026-10-03.csv` for Site settings → Publishing → 301 redirects. Page names in the Designer keep
the old wording. Shared accounts that match on page path (GTM, Optibase, recorders, call tracking) were not checked.

**Undo.** Backup `2026-10-03-urls/`: rename back with the same bulk call from `url-map-2026-10-03.json` (new → old),
set the head code from `heads.before.json`, and paste `site-footer.before.txt` into the footer code.

## PBI-38 · Shorter "Your rights" headlines (3 Oct)

**What changed.** On 25 landing pages the headline above the list of rights was shortened to at most 91 characters
(longest now 89; before, up to 197). Old and new text per page: `review/PBI-38.md` and
`tools/webflow/clusters/rights-intro-2026-10-03.json`. Two overstatements were removed with it: "every violation … can
carry up to $1,000" is now "may let you seek up to $1,000 in statutory damages", and "each violation stands on its own"
is gone. The prototype content files carry the same text (26 files; one has no staging page).

**Where in Webflow.** Prop `Rights intro` of the `LP · Rights and FAQ` instance on each of the 25 pages (list with page
ids: `2026-10-03-rights/work.json` in the backup folder; instance ids in `apply-log.jsonl` there).

**Verified.** Each value read back from Webflow equal to the new text. After publishing, all 25 served pages carry the
new headline, no longer the old one, and every other line of text is identical to the snapshot taken before
(`2026-10-03-rights/served-before` and `served-after`).

**Undo.** Set `Rights intro` on each page back to the `was` text in `2026-10-03-rights/work.json` and publish to the
staging domain.


## PBI-39 · The seven microsites on staging (4 Oct)

**What changed.**
- Eleven new pages: seven homes (/respond, /fight-back, /demand-proof, /know-your-rights, /stop, /make-them-pay,
  /reduce; each a duplicate of its cluster's first landing page), /about, /terms-of-use, /privacy-policy,
  /cookie-policy (legal texts carry the visible "Draft for review by the firm's attorney" note and `[date of
  publication]`, operator 4 Oct). noindex, canonical to start.credolegal.com/{slug}, OG tags; FAQPage JSON-LD on the homes.
- navbar component: site menu (Home · Services ▾ · About) behind the `Site menu` prop, in-page links behind `Page
  links`; menu entries are link props per page. On for the 11 new pages and the 47 landing pages; off elsewhere.
- LP · Common problems (home mode, card links, `Show who this helps`), LP · Rights and FAQ (`Show rights`, `Show FAQ
  4/5`), LP · Bottom CTA (`Button link`): new props whose defaults keep the old pages as they were.
- Footer-MJ (every page): About → /about, legal links → the three new pages; labels "terms of use", "cookie policy".
- Site settings → footer code: the off-hours block now scrolls to `#herosec` (it looked for `#consultation` /
  `#nconsultation`, which no page has, so off hours the header button did nothing on any page). Pages without a form
  keep the button's link.
- Styles: `footerlogo` white filter (was only in the Bottom CTA embed: red logo on legal and thank-you pages);
  `Container 40` margin auto; `page-body` padding 80px (30px on phones), max-width 820px; nav menu icon #111418 on
  tablet/phone; open nav menu white with borders; `Menu Button 2` bordered 44px; `Text Block 14` (header phone)
  `white-space: nowrap`.

**Where in Webflow.** Components navbar (04a0978c-…), Footer-MJ (462342c8-…), the four LP components above; prop ids
in `tools/webflow/site-menu/navbar-props.json` and `home-props.json`; page ids in `tools/webflow/site-menu/pages.json`;
per-page prop values in `2026-10-04-microsites/apply-log.jsonl`; legal bodies in `legal-log.jsonl`.

**Verified.** Checkpoint publish (component changes, before any page used them): the 67 older pages identical apart
from webflow.js (+143 B gzip). Full publish: the older pages differ only in header and footer; footer code served on
78/78 pages. axe: no violations (7 pages × 2 widths); lpcheck on the 11 new pages: 0 critical, 0 major; Lighthouse
mobile: home 61, about 79, terms 83, landing pages 61–65; keyboard: Services opens with Enter, Escape closes; JSON-LD
questions all visible; off hours (clock fixed to Sunday 03:00 ET) the header button scrolls to the form on homes and
landing pages and keeps its link on about/legal. Prototype: check-mirror --all, 59 pages equal staging at both widths. Backups: `2026-10-04-microsites/` (served-before, served-checkpoint, served-after,
pages-before.json, site-footer.before.txt).

**Undo.** Turn `Site menu` off and `Page links` on for the 47 landing pages (values in apply-log.jsonl); set the
eleven new pages to draft; set Footer-MJ link defaults back (pages-before.json / served-before show the old hrefs);
write `site-footer.before.txt` back into the footer code (only the off-hours block differs); publish to the staging domain.

## PBI-40 · No UTM tags on internal links (4 Oct)

**What changed.** Site settings → Head code, block "7. UTM PERSISTENCE": `isInternalLink`, `addUTMToLink` and
`addUTMToAllLinks` removed with their two calls (cookie storage, `populateSpecificFields` and the form's hidden UTM
fields unchanged). navbar component: `data-append-utm` removed from its 16 links (logo, Home, About, in-page links,
the seven Services entries, header button). Footer code unchanged (its localStorage helper now matches no link).

**Verified.** Browser walk on staging (trackers blocked): fresh direct visit, campaign visit with UTMs, later direct
visit; no internal link and no URL after a click carries UTMs; after the campaign visit the form on a second page still
has utm_source/medium/campaign in its hidden fields. Head code read back byte-identical to the intended text.

**Undo.** Write `2026-10-04-utm/site-head.before.txt` back into the head code; add `data-append-utm="true"` to the 16
navbar links listed in `2026-10-04-utm/navbar-utm-links.json`;
publish to the staging domain.

## PBI-41 · PageSpeed findings: logo link name, logo size, call-button label (5 Oct)

**What changed.** navbar component: `aria-label="Credo Legal home"` on the logo link (…-4dda); `aria-label="Call Credo
Legal"` removed from the phone button (15e363eb-3fad-162c-1667-f9918ed59251). New asset credo-logo-244.png
(6ac34a93bd9b2b4bdc96ebdc, 4,243 B) on the navbar logo (…-4ddb), Footer-MJ logo (…-9ba5), thank-you footer component
logo (41aa75a8-…-e9fc) and thank-you Image 29 (d2b02f7b-…-cfea). The lead-form pop-up logo keeps the 420 file (hidden).

**Verified.** Lighthouse 13.5 mobile on /respond, a landing page and /about: link-name, label-content-name-mismatch and
agent-accessibility-tree pass, accessibility 100, the logo is no longer in image delivery. axe on all 60 pages at 1440
and 390: no violations. Logos read back as credo-logo-244.png; screenshots at 3× sharp.

Later the same day (PageSpeed "layout shift culprits: unsized image"): style `footerlogo` gets `aspect-ratio: 244 / 80`;
new combo class `Image` + `Header logo` (aspect-ratio 244 / 80) on the navbar logo image. Lighthouse unsized-images passes;
logos render at the same size (92×30 header, 122×40 / 100×33 footer).

**Undo.** Remove `aspect-ratio` from `footerlogo`; set the navbar logo's classes back to `Image` only; set those four images back to 6abd55573915529793acb45e (credo-logo-420.png); remove the logo link's aria-label;
add `aria-label="Call Credo Legal"` back to the phone button; publish to the staging domain.

## PBI-42 · The ad campaign's phone number stays the same on every microsite page (6 Oct)

**What changed.** Site settings → Custom code → Footer code, phone script ("DYNAMIC PHONE NUMBERS"): the page an ad
opens (a visit with utm_source or an ad click id) saves its number in the host-only cookie `credo_call` for 90 days;
every later page without those parameters shows that number in the header, below the form, in the footer and in the
sticky call bar. A new ad click replaces it; visits that never came from an ad keep each page's own number. Ad clicks
with only a click id count as their source (gclid/gbraid/wbraid → google, fbclid → meta, msclkid → bing). The phone
table and its lookup line are unchanged.

**Verified.** Before: Google ad → landing (212) 561-5902, next service page and microsite home (718) 865-8350. After
(trackers blocked, no form sent): served footer equals the intended file on 10 pages; 22 journey checks pass (Google,
Meta fbclid-only, gclid/gbraid/msclkid-only, organic LinkedIn, direct visit, new ad click replacing the number, phone
width); no script errors; phone-table guard passes. Packet PBI-42.md, triage PBI-42.triage.md.

**Undo.** Write `2026-10-06-phone-lock/site-footer.before.txt` back into the footer code; publish to the staging domain.
