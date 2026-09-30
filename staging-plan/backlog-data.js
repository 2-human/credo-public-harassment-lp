/* Staging fix backlog — single source of truth for the board (index.html) and the other pages.
 * Source: content/research/staging-fix-plan-2026-09-27.md, built from the LP audit
 * (content/research/lp-webflow-audit-2026-09-22.md, last updated 24 Sep).
 *
 * Board rule (WIP limit of one): each row is a PBI; its tasks move across To do → Doing → Done.
 * Only ONE row may have tasks in Doing at any time: the whole team swarms on that PBI.
 * Task status: 'todo' | 'doing' | 'done'. PBI `by`: 'claude' | 'likely' | 'decision' | 'manual'.
 * `blocked` names the decision (D#) or manual step (M#) a PBI waits on. */
window.BACKLOG = {
  updated: '30 Sep 2026',
  state: '30 Sep: PBI-09, PBI-10, PBI-13, PBI-14, PBI-15, PBI-16, PBI-17, PBI-18, PBI-19 and PBI-25 done, PBI-24 close-out done (lpcheck vs baseline: major 245 \u2192 106, minor 211 \u2192 88; change log in review/CHANGELOG.md; Clarity masking proven on 52/52; D26, D27 raised; the domain-switch task waits on D16/D21), and Claude\'s part of PBI-23 (script clean-up approved per script; Lighthouse unchanged within noise; fonts, minify and the GTM Nextdoor timing are the operator\'s manual steps) (D23 approved and applied; D24 new: per-call $1,000 claims in page copy). 29 Sep (evening): board clean-up. PBI-12 done (all Part B copy fixes live, D20 wording applied). G29 (WEEK 1 tags, 22 pages) done under PBI-19; PBI-01c and PBI-11 closed (PBI-11 follow-up moved to PBI-16); PBI-08 built and reviewed, closes with the operator\'s CRM check (M3). PBI-09 done 30 Sep: the count and security dropdowns keep their options in Webflow (the G17 rewrite script is gone). Shared code (PBI-01d) done and closed: page code and the phone-swap script live once in Site settings (one phone table); every landing-page section is a component with per-page copy in props (8 LP components); new pages start from the draft Landing page template, with copy synced from the prototype by lp-sync.mjs. D20 and D21 decided; D22 opened (8 hero props where the prototype and Webflow wording differ). DS-7 done 30 Sep (the 21 old drafts stay unpublished: D18; M2 not needed). Waiting on the operator: M3 (CRM check), D1\u2013D3, D5\u2013D9, D22, D24\u2013D27 (D10 optional); PBI-01b and PBI-21 deferred.',
  site: { name: 'Credo: Microsite Staging', id: '6ab90fb0761d44332faf21c8', domain: 'staging.credolegal.com' },

  pbis: [
    { id: 'PBI-00', title: 'Baseline and safety net', refs: [], by: 'claude',
      review: { items: [
        { kind: 'Code', by: 'GPT + Gemini', na: true, note: 'Backup and baseline only: nothing on the site changed.' }
      ], links: [] },
      why: 'Every later change can be rolled back, and we can prove enroll and start were never touched.',
      done: 'Backup saved; enroll + start fingerprints recorded; lpcheck baseline report for the 30 staging pages.',
      tasks: [
        ['Confirm the staging site id and that its only domain is staging.credolegal.com', 'done'],
        ['Back up site + page custom code, registered scripts, page settings/SEO, styles and element trees', 'done'],
        ['Fingerprint all 30 pages on enroll and start', 'done'],
        ['Run lpcheck on the 30 staging URLs (baseline report)', 'done']
      ] },

    { id: 'PBI-00b', title: 'Remove dead-weight pages', refs: [], by: 'claude',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-00b.review-gpt.md', settled: true },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/PBI-00b.review-gemini.md', settled: true, note: '2 blockers answered by checks: 0 of 2,249 links point at removed URLs; forms/tracking covered by later runs.' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'No visible change on any kept page.' }
      ], links: [['Packet', 'review/PBI-00b.md'], ['Resolution', 'review/PBI-00b.triage.md']] },
      why: '10 pages in the staging project with no traffic and no purpose: test pages, an unpublished draft, the unused know-your-rights blog and four old landing pages already replaced. All 13 state pages are kept (your call, 27 Sep).',
      done: 'The 8 pages set to draft and the 4 blog articles unpublished on staging only (reversible); they return 404; every kept page and all 30 landing pages still load; enroll and start unchanged.',
      tasks: [
        ['Back up the pages and CMS items being removed', 'done'],
        ['Set test, test-page, know-your-rights, wage-garnishment-rights, medical-debt-harassment, medical-debt-errors, wage-garnishment-attorney-active and remove-property-lien to draft', 'done'],
        ['Unpublish the 4 know-your-rights articles', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify: removed pages 404, kept pages 200, enroll and start fingerprints unchanged', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'PBI-01', title: 'Clean the page code', refs: ['L1', 'G30', 'G31'], by: 'claude', note: 'W1 (move to Site settings) split out as PBI-01d: it would add GTM to the thank-you pages.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-01.review-gpt.md', settled: true },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/PBI-01.review-gemini.md', settled: true, note: 'Blocker (no real submit) answered by a submit test on 52 pages × 2 devices: 104/104 send every field + UTMs. Real lead waits on D1.' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'Code-only change; nothing visible changed (form walk and screenshots unchanged).' }
      ], links: [['Packet', 'review/PBI-01.md'], ['Resolution', 'review/PBI-01.triage.md']] },
      why: 'Removes the script error and the calls to videsigns-staging.co.uk, the duplicate GTM loader and dead code, without touching pages whose old form still needs it.',
      done: 'Dead or duplicate code gone where it is dead; form walk, phone numbers, tracking fields and tags unchanged; enroll and start unchanged; independent review settled.',
      tasks: [
        ['Read the site and page custom code on all 53 live pages with code', 'done'],
        ['Find the 21 pages whose old form still uses multi-step.js, #submitBtn, #phone-number and Font Awesome (left as they are)', 'done'],
        ['Remove the duplicate GTM loader (52 pages); multi-step.js, Font Awesome, dead validators and the localStorage UTM copy (30 landing pages + home)', 'done'],
        ['Shadow test before writing: old vs new code, 3 browsers', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify: 83/83 code blocks served as intended; 30 pages × 8 devices (form 240/240, phones 344/344); tracking on 52 pages; enroll and start unchanged', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'PBI-01b', visible: false, title: 'One UTM mechanism', refs: ['G31'], by: 'claude', note: 'Deferred by the operator 29 Sep.',
      why: 'Three overlapping UTM scripts (host cookies, .credolegal.com cookies, localStorage + URL rewrite) decide which phone number and tracking values a returning visitor gets.',
      done: 'One mechanism; a test matrix (first visit, return visit, no-query revisit, navigation, cross-subdomain) identical to today on every page type.',
      tasks: [
        ['Map what each mechanism writes and who reads it: done 29 Sep (probe-utm-stores.mjs). 4 writers (site code: host cookies 90 days + form fields + link decoration; site code: localStorage + address-bar rewrite, wiped on any visit without parameters; page footer: .credolegal.com session cookies; page footer: decorates credolegal.com links) and 2 readers (phone script, Finsweet from the URL). Found: every value is stored twice, and the site code\'s cookie reader returns nothing for a name stored twice, so a returning visitor\'s lead sends utm_* and gclid empty (tested). One-line reader fix tested in the browser: attribution kept. The live start site has the same code', 'done'],
        ['Return-visit / cross-subdomain test matrix on the current code (baseline)', 'todo'],
        ['Remove the redundant mechanisms; keep one', 'todo'],
        ['Publish to staging only; re-run the matrix', 'todo'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'todo']
      ] },

    { id: 'PBI-01c', title: 'Old-form pages: multi-step.js and the videsigns-staging call', refs: ['L1'], by: 'claude', note: 'D11 decided 28 Sep: the 21 pages are rebuilt on the landing-page template (design-system plan, DS-7), which removes the old form and its library.',
      why: 'The 21 state and old landing pages still load multi-step.js (it shows their form one step at a time) and it posts to videsigns-staging.co.uk.',
      done: 'Per D11: pages rebuilt in the new design, or the library replaced, so no page calls a staging server.',
      tasks: [
        ['Rebuild the 21 pages on the landing-page template (DS-7), one page approved before the rest: done 28 Sep, no published page uses the old form or multi-step.js', 'done'],
        ['Publish to staging only and verify the forms step by step: done in DS-7 (28 Sep): 26/26 + 16/16 submit tests, 13/13 + 8/8 form_submit pushes; no published page loads multi-step.js or calls videsigns-staging (served-HTML check 29 Sep)', 'done'],
        ['Independent review: done in DS-7 (code + UX, GPT + Gemini, both rounds settled)', 'done']
      ] },

    { id: 'PBI-01d', title: 'Shared code: Site settings, components and a landing-page template', refs: ['W1', 'D19'], by: 'claude', note: 'Plan 29 Sep (content/research/shared-code-plan-2026-09-29.md); operator decisions in D19. P1–P5 done 29 Sep: page code in Site settings, one phone table, and every landing-page section a component (8 LP components, per-page copy in props; the home page uses only the Trust strip). New pages start from the draft page Landing page template; copy comes from the prototype via tools/webflow/lp-sync.mjs (read-only; payloads + diff; --check validates the map). Component limits: 5 list items / 5 cards (What we do), 6 cards / 6 list items (Common problems), 4 steps, 6 rights, 7 FAQs. New page steps: duplicate the template, set slug/SEO, point the 3 page-head lines (robots, canonical, og:url) at the new slug, set the props, add the slug to the phone table, publish, read the copy back with lp-extract.mjs. The first real new page also gets an end-to-end check of the duplicate (head lines, phones, form walk; real submission after D1). A page needing more items than a limit means adding a hidden slot to the component (all pages get it hidden). Tracked phone numbers now live in one table in the site footer code (window.CREDO_PHONES, key = page slug): edit numbers there; a new page needs a row (check: python3 tools/webflow/check-phone-table.py <slug>). D10 no longer blocks: a system-page check keeps GTM and Mouseflow off exactly the pages they were off (404, 401, /thank-you, /page/*). A new system page must be added to that list (site head code, window.credoSystemPage).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-01d-P1.review-gpt.md', settled: true, note: 'P1. Fixed: helper functions back to top-level declarations. System URLs incl. /401 and an arbitrary 404 checked live.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-01d-P1.review-gemini.md', settled: true, note: 'P1. Its "blocker" is a real test lead, which waits on D1; the form payload is identical on 52/52 pages.' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'Nothing visible changed: computed styles and text identical on 52 pages \u00d7 2 widths (live vs pre-change).' },
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-01d-P2.review-gpt.md', settled: true, note: 'P2. Return visits via cookie, URL forms and system pages tested live; no change needed.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-01d-P2.review-gemini.md', settled: true, note: 'P2. Blocker answered: the system-page check is set in the site head, before any footer code (tested on all 5 system URLs).' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'P2: nothing visible changed (styles, text and phone numbers identical, 56 pages \u00d7 2 widths; 4 ad sources).' },
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-01d-P3.review-gpt.md', settled: true, note: 'P3. Added: interaction smoke test (slider, pop-up, anchors) 104/104 identical; phones for google, bing and direct visits identical. Real submission waits on D1.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-01d-P3.review-gemini.md', settled: true, note: 'P3. Its should-fix is a real test lead (D1).' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'P3: nothing visible changed (rendered layout and text identical, 52 pages \u00d7 2 widths).' },
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-01d-P4.review-gpt.md', settled: true, note: 'P4 (2 rounds). Added: functional re-run on the final state 104/104 identical, google phone matrix 52/52, class scope, heading outline. Real submission waits on D1.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-01d-P4.review-gemini.md', settled: true, note: 'P4 (2 rounds). Round-1 blocker (forms/phones/tracking not re-tested) answered by the re-run; tablet widths 768/991 also checked.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-01d-P4.review-gpt-ux.md', settled: true, note: 'P4. The six standardisations kept. Rights labels wrapping on phone and long FAQ lines are the existing design: moved to PBI-16 / PBI-17.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-01d-P4.review-gemini-ux.md', settled: true, note: 'P4. Round-1 request (evidence for changes 5\u20136) answered with screenshots and the heading outline.' },
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-01d-P5.review-gpt.md', settled: true, note: 'P5. Added lp-sync --check (map, state selection); counts corrected; the first real new page starts with a disposable duplicate checked end to end.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-01d-P5.review-gemini.md', settled: true, note: 'P5. The slug map is a declared table, now validated by --check.' }
      ], links: [['Packet (P1)', 'review/PBI-01d-P1.md'], ['Resolution (P1)', 'review/PBI-01d-P1.triage.md'], ['Packet (P2)', 'review/PBI-01d-P2.md'], ['Resolution (P2)', 'review/PBI-01d-P2.triage.md'], ['Packet (P3)', 'review/PBI-01d-P3.md'], ['Resolution (P3)', 'review/PBI-01d-P3.triage.md'], ['Packet (P4)', 'review/PBI-01d-P4.md'], ['Resolution (P4)', 'review/PBI-01d-P4.triage.md'], ['Packet (P5)', 'review/PBI-01d-P5.md'], ['Resolution (P5)', 'review/PBI-01d-P5.triage.md']] },
      why: 'Since DS-7 all 50 landing pages share one 11-section skeleton, but only the header and footer are shared: each of the 52 form pages carried its own copy of about 33 KB of identical code (page head/footer code, a 15.7 KB phone script that differs only in 4 numbers, about 13 KB of CSS in embeds) and its own copy of the form, hero, trust strip, content sections and bottom CTA. Every later design or form fix therefore has to be made 50 times.',
      done: 'Page-agnostic code in Site settings (system-page check); every landing-page section a component, with per-page copy in properties and slots; per page only SEO settings, canonical/og:url/robots and the phone numbers; every page behaves and looks exactly as before (same scripts in the same order, phones, form walk, tracking, styles).',
      tasks: [
        ['Inventory all published pages (served HTML + API): what is shared, what is copied, what differs per page', 'done'],
        ['Plan: three layers (Site settings / components / per-page data), phases P1\u2013P5, risks, open points; operator decisions D19', 'done'],
        ['P1 (29 Sep): the page code that was identical on 52 pages moved to Site settings (GTM, Mouseflow and page scripts behind a system-page check); RemoveStateOptions applied site-wide; page code down to robots/canonical/og:url (+ heading-fix CSS on 51); all 52 noindex with a self canonical (D19); duplicate twitter/og tags, twitter:site "@handle" and unused Font Awesome dropped. Shadow test before writing; served HTML 56/56 as intended; live vs pre-change identical on 52 pages \u00d7 2 widths (form payload, cookies, dataLayer, phones, links, styles, text); GTM/Mouseflow still absent on /401, 404, /thank-you, /page/*', 'done'],
        ['P2 (29 Sep): the phone-swap script (15.7 KB, copied on 52 pages, differing only in 4 numbers) now runs once from the site footer code; the numbers are one table keyed by page slug (window.CREDO_PHONES; \'*\' = (718) 865-8350 for any page not listed); the 52 page embeds removed. Shadow test before writing and live check after: 112/112 identical, and the numbers identical for google, meta, bing and no-parameter visits on all 56 pages; return visits via cookie, URL forms and system pages tested', 'done'],
        ['P3 (29 Sep): LP \u00b7 Lead form, Trust strip, Hero (H1, Lede, Form intro, First question) and Bottom CTA (Paragraph) as components on the 51 landing pages; home uses the Trust strip only (its other sections use H1 headings). Served HTML changed only in the question markup (strong \u2192 combo class, same weight); rendered layout and text identical 104/104; trackers, dataLayer, phones, links, cookies, form payload identical 104/104; phones identical for google, bing and direct visits; interactions (slider, pop-up, anchors) identical 104/104', 'done'],
        ['P4 (29 Sep): LP \u00b7 What we do, Common problems, How it works, Rights and FAQ as components (fixed card positions + show/hide props; the API has no slot props) on the 51 landing pages, each page\'s own copy. 4,646 props read back from the served pages: 0 mismatches; links, ids, form fields and tel: targets identical on 52 pages; rendered layout identical apart from six declared standardisations (step tags 700, rights/FAQ pull-up position, eyebrow "What we see", capitals on medical-debt-attorney tags, one stray blank line, one h4 FAQ)', 'done'],
        ['P5 (29 Sep): draft page Landing page template (only shared components, never published) + tools/webflow/lp-sync.mjs (prototype content-*.js \u2192 prop payloads and a diff report; 4,708 of 4,716 props equal to the prototype, the 8 left are hero wording for D22) + lp-extract.mjs (read the copy back after any change)', 'done'],
        ['Independent review per phase: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled (P1\u2013P5 settled)', 'done']
      ] },

    { id: 'PBI-02', visible: false, title: 'Lead form destination for staging', refs: ['G9'], by: 'decision', blocked: 'D1',
      why: 'staging.credolegal.com posts to the live formspree form, so a manual test lead enters the real lead pipeline.',
      done: 'Staging form posts to the chosen destination; a test lead arrives there and nowhere else; the success page still shows.',
      tasks: [
        ['Set the form action on staging to the chosen destination', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Send one test lead and confirm where it lands', 'todo'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'todo']
      ] },

    { id: 'PBI-03', title: 'Consent line under the submit button', refs: ['G10'], by: 'decision', blocked: 'D2',
      why: 'No TCPA/SMS consent or "not legal advice" line at the form.',
      done: 'Counsel-approved text (or required checkbox) under the button on all 26 form pages, passing contrast.',
      tasks: [
        ['Add the form-consent paragraph (or checkbox) on each page', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify text, link and contrast', 'todo'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'todo']
      ] },

    { id: 'PBI-04', title: 'Mask form inputs in session recordings', refs: ['G32'], by: 'claude', note: 'Mouseflow input masking and the Tidio/Optibase privacy review stay manual (shared accounts).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-04.review-gpt.md', settled: true },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-04.review-gemini.md', settled: true },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'An invisible attribute only.' }
      ], links: [['Packet', 'review/PBI-04.md'], ['Resolution', 'review/PBI-04.triage.md']] },
      why: 'Clarity and Mouseflow record sessions on a form that collects PII.',
      done: 'Every lead form on staging carries data-clarity-mask; a capture of Clarity uploads shows no form text or typed values.',
      tasks: [
        ['Mask the form block on the 30 landing pages and home (31 pages, page elements)', 'done'],
        ['Mask the 4 form blocks inside the 2 local form components (Hero-Form, Hero-Form-For-New-Pages) used by the 21 state and old pages', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify: 73/73 forms on 52 pages inside a masked block; enroll and start unchanged', 'done'],
        ['Prove it: capture Clarity uploads; form text present without the mask, absent with it; typed values never sent', 'done'],
        ['Form still works: form walk to submit on 3 pages × 3 browsers', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'PBI-05', title: 'Sticky call bar never covers the form', refs: ['G19'], by: 'claude',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-05.review-gpt.md', settled: true, note: 'On v1; its fix produced v2.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-05.review-gemini.md', settled: true, note: 'On v2; asked for 768px: tested, 8/8.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-05-ux.review-gpt.md', settled: true, note: '6 iPhone screenshots before/after.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-05-ux.review-gemini.md', settled: true }
      ], links: [['Packet', 'review/PBI-05.md'], ['UX packet', 'review/PBI-05-ux.md'], ['Resolution', 'review/PBI-05.triage.md']] },
      why: 'On 21 pages the bar covers Continue on the first phone screen during business hours.',
      done: 'At 390×844 inside business hours: no bar while the form is on screen or the pop-up is open; bar appears after scrolling past the form.',
      tasks: [
        ['Hidden-by-default styles for .sticky-call-button', 'done'],
        ['IntersectionObserver on the step-1 form card', 'done'],
        ['Hide while body.mj-popup-open', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify on phone sizes with the clock inside business hours', 'done']
,
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'PBI-06', title: 'Tracked phone number in the mobile header', refs: ['G25'], by: 'likely', note: 'D14 decided 28 Sep: tablets accepted (no ☰ menu below 992px).',
      review: { items: [
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-06-options-ux.review-gpt.md', settled: true, note: 'Options A/B on 3 phones (9 screenshots). Recommends B.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-06-options-ux.review-gemini.md', settled: true, note: 'Recommends B; rejects A (redundant, crowded at 360px).' },
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-06.review-gpt.md', settled: true },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/PBI-06.review-gemini.md', settled: true, note: 'Blocker: ☰ menu gone. Settled by operator decisions: phones (Option B) and tablets (D14, accepted 28 Sep).' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-06-ux.review-gpt.md', settled: true, note: 'Built version, 7 screenshots.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-06-ux.review-gemini.md', settled: true, note: 'Tablet-menu blocker settled by D14 (accepted); corner/edge claims not supported by the screenshot.' }
      ], links: [['Options packet', 'review/PBI-06-options-ux.md'], ['Packet', 'review/PBI-06.md'], ['UX packet', 'review/PBI-06-ux.md'], ['Resolution (options)', 'review/PBI-06-options-ux.triage.md'], ['Resolution', 'review/PBI-06.triage.md']] },
      why: 'On phones the call link is hidden behind the menu button.',
      done: 'Tracked number and a "Free review" button visible in the mobile header; phone swap updates it per utm_source.',
      tasks: [
        ['First: two phone-header options (call icon button, or the number without the Free review button) as screenshots; UX review by GPT + Gemini before building (Gemini rated today’s crowded header a blocker)', 'done'],
        ['Operator picks the option: B chosen 28 Sep (logo + one wide call button with the number; ☰ menu removed on phones)', 'done'],
        ['Build it in the shared header component through the API: call link (hidden on desktop), ☰ hidden, logo auto width on small phones', 'done'],
        ['Tracked number per page: no script edits needed; the link carries the class dynamic-phone, which each page’s phone-swap script already updates', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify on all 57 pages: phones, 360px, iPad, desktop; numbers per utm_source; tap fires gtm.linkClick; lpcheck regression', 'done']
,
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'PBI-06b', title: 'Same gap above the closing CTA button on every page', refs: ['Operator, 28 Sep'], by: 'claude', note: 'Asked for by the operator on 28 Sep while PBI-06 was being verified; published together with PBI-06 so the checks cover one state.',
      why: 'On 29 of 31 pages the text above the closing CTA button ended with stray line breaks (Shift+Enter), leaving a 39px gap; 2 pages had 16px. The spacing came from the content, not the design.',
      done: 'Every closing CTA has the same roomy gap (≈39px, chosen by the operator), set once in the Text Block 20 style; no stray line breaks left.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-06b.review-gpt.md', settled: true },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/PBI-06b.review-gemini.md', settled: true, note: 'Blocker: enroll/start not re-checked after the publish. Re-checked: 60/60 unchanged.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-06b-ux.review-gpt.md', settled: true },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-06b-ux.review-gemini.md', settled: true, note: 'Prefers the tighter gap; operator chose the roomier one.' }
      ], links: [['Packet', 'review/PBI-06b.md'], ['UX packet', 'review/PBI-06b-ux.md'], ['Resolution', 'review/PBI-06b.triage.md']] },
      tasks: [
        ['Find the cause: trailing line breaks in the text on 29 pages (2 on 22 pages, 1 on 7); styles identical', 'done'],
        ['Gap set in the style: Text Block 20 margin-bottom 38px (vertical margins collapse, so 23px first gave 24px; corrected). The button style name is duplicated in the project, so the text block carries it', 'done'],
        ['Remove the trailing line breaks on the 29 pages (only breaks after the last text)', 'done'],
        ['Publish to staging only (after the running PBI-06 regression finishes)', 'done'],
        ['Verify: the same gap on all 31 pages, desktop and phone; nothing else moved', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'PBI-07', title: 'Phone and ZIP fields open the number pad', refs: ['F1'], by: 'claude',
      why: 'The phone fields are type="text", so phones show the letter keyboard; on the 21 old pages the ZIP fields do too.',
      done: 'Every phone field is type="tel" (phone keypad), every ZIP field has inputmode="numeric" (numeric keypad), both with autofill hints; formatting, validation and what the form sends are unchanged.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-07.review-gpt.md', settled: true },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/PBI-07.review-gemini.md', settled: true, note: 'Blocker: soft keyboards might break formatting. Tested Android-keyboard and autofill input: identical before/after.' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'The change is the on-screen keyboard, which cannot be screenshotted headless; the page looks the same.' }
      ], links: [['Packet', 'review/PBI-07.md'], ['Resolution', 'review/PBI-07.triage.md']] },
      tasks: [
        ['Shadow test first (new types applied to the served page): both form types submit the same fields and values; phone formatting unchanged', 'done'],
        ['Confirm on one page that the field type can be set through the API', 'done'],
        ['Apply: phone field on the 31 new-form pages; 6 phone + 4 ZIP fields in the 2 shared old-form components', 'done'],
        ['Publish to staging.credolegal.com', 'done'],
        ['Verify: 167 fields on 52 pages as intended; submit test 104/104 same fields; regression "letter keyboard" 30 → 0, form walk 240/240, phones 344/344; formatting identical under key, Android-keyboard and autofill input', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'PBI-07b', title: 'Phone and email must be valid before the form sends', refs: ['Found 28 Sep', 'Operator, 28 Sep'], by: 'claude', note: 'Corrected 28 Sep: an earlier test counted a Google Analytics beacon (its URL mentions formspree) as a form send. Strict re-test: the new form already blocks every invalid phone and email.',
      why: 'The operator wants phone and email format validated. The new form (31 pages) already blocked every invalid phone and email. The old form (21 pages) greys out Submit until both are valid, but a keyboard Enter on the Submit link still sent the lead (e.g. "(212) 555" or a bad email).',
      done: 'No lead is sent without a 10-digit phone and a well-formed email, on both form types, by tap or keyboard.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-07b.review-gpt.md', settled: true },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-07b.review-gemini.md', settled: true, note: 'Blocker: Enter inside a field. Tested: never sends, valid or not.' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'No visual change; the forms\u2019 existing error messages show.' }
      ], links: [['Packet', 'review/PBI-07b.md'], ['Resolution', 'review/PBI-07b.triage.md']] },
      tasks: [
        ['Test which invalid phone/email values each form sends (strict: real formspree posts only)', 'done'],
        ['Operator chose to fix the old form now (28 Sep); tap vs keyboard test found the real gap: Enter on the Submit link', 'done'],
        ['Guard as a registered site script (OldFormPhoneEmailGuard 1.0.0, footer): blocks the old form’s Submit until phone = 10 digits and email is well formed; shadow-tested first', 'done'],
        ['Publish to staging.credolegal.com; all 21 old-form pages: short phone 0/21 sent, bad email 0/21, valid 21/21; Enter inside fields sends nothing; new form unchanged', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done']
      ] },

    { id: 'DS-7', title: 'Rebuild the 21 older pages on the landing-page template (new form only)', refs: ['D11', 'D4', 'L1'], by: 'claude', note: 'Operator 28 Sep: only the new form on every page; remove every legacy form. Pilot: Ohio, then the other 12 state pages from it.',
      why: '13 state pages and 8 older pages still use the old purple design and the old multi-step form (plus a hidden second form that never sends).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/DS-7-states.review-gpt.md', settled: true, note: 'State pages. Blocker (real lead) waits on D1; the rest proven or raised as D15/D16.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/DS-7-states.review-gemini.md', settled: true, note: 'Blockers: real lead (waits on D1); GTM tracking (tested: form_submit pushed on 13/13, same as the landing pages).' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/DS-7-states.review-gpt-ux.md', settled: true, note: 'Template-wide design points logged for the design system; claims raised as D17.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/DS-7-states.review-gemini-ux.md', settled: true, note: 'Sticky bar tested: never covers the form buttons.' }
        ,{ kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/DS-7-others.review-gpt.md', settled: true, note: 'Last 8 pages. SEO/OG and ad-source fields checked on the served pages: 8/8.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/DS-7-others.review-gemini.md', settled: true, note: 'Blocker: state choice on general pages. Tested: every lead carries a state (16/16).' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/DS-7-others.review-gpt-ux.md', settled: true, note: 'Template-wide design points logged.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/DS-7-others.review-gemini-ux.md', settled: true, note: 'Blocker: Title Case paragraphs. Template-wide and pre-existing; raised as PBI-11 for the operator.' }
      ], links: [['Packet', 'review/DS-7-states.md'], ['Resolution', 'review/DS-7-states.triage.md'], ['Packet (8 pages)', 'review/DS-7-others.md'], ['Resolution (8 pages)', 'review/DS-7-others.triage.md']] },
      done: 'All 21 URLs serve the landing-page design with the new form; no legacy form or its scripts left on the site; each page keeps its own copy, tracked number, SEO and tracking; old versions kept as drafts.',
      tasks: [
        ['Pilot: rebuild /ohio from a landing page (duplicate, state copy, number, SEO), preview under a temporary slug: live at /ohio-new, checks passed', 'done'],
        ['Operator approves the pilot: approved 28 Sep', 'done'],
        ['Swap slugs: new page takes /ohio, old page kept as draft at /ohio-old: live, submit test 1 post, 21 fields on iPhone and desktop', 'done'],
        ['The other 12 state pages from the approved pilot: duplicated from Ohio, 3 state strings each, old SEO + old head code kept, own tracked number (6 local numbers kept), old pages drafted as {state}-old', 'done'],
        ['Found and fixed: the pilot Ohio page had the landing page\u2019s noindex head; Ohio now has its own old head (index, follow) again', 'done'],
        ['Verified on staging.credolegal.com: 13/13 served-HTML checks, 26/26 submit tests (1 post, 21 fields), 52/52 numbers per ad source, 13/13 form_submit pushes, head/footer byte-diff 13/13', 'done'],
        ['Independent review of the 13 state pages (code + UX, GPT + Gemini); findings settled except D1, D15, D16, D17', 'done'],
        ['letter, medical-debt-attorney, debt-harassment-act-fast, multiple-collectors-more-money and the 4 payday pages, each with its own copy: duplicated from a new-form page with the same section counts, copy mapped node by node, 2 FAQ items added on medical; own SEO, head code and tracked numbers kept', 'done'],
        ['Remove the legacy form: site script OldFormPhoneEmailGuard removed 29 Sep (D18; 0 of 54 pages load it, form_submit still pushed); the components Hero-Form (17 instances) and Hero-Form-For-New-Pages (10) are only on the 21 old drafts. Operator 30 Sep (D18): the drafts stay as unpublished drafts, so the two components stay with them; checked 30 Sep: all 21 {slug}-old URLs return 404 (staging publishes no sitemap) and no published page loads the legacy form', 'done'],
        ['Publish to staging.credolegal.com and verify (8 pages): copy 8/8, submit 16/16, numbers 32/32, form_submit 8/8, head/footer byte-diff 8/8, SEO/OG 8/8', 'done'],
        ['Independent review of the last 8 pages (code + UX, GPT + Gemini); findings settled; Title Case raised as PBI-11', 'done']
      ] },

    { id: 'PBI-08', visible: false, title: 'Capture the Meta click id (fbclid)', blocked: 'M3 (operator)', refs: ['G20'], by: 'claude',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-08.review-gpt.md', settled: true, note: 'Cookie precedence tested and changed to newest; link decoration and call tracker tested.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/PBI-08.review-gemini.md', settled: true, note: 'Blocker: CRM handling of the new fbclid field. With the operator, who tests on the CRM end.' }
      ], links: [['Packet', 'review/PBI-08.md'], ['Resolution', 'review/PBI-08.triage.md']] },
      why: 'A typo stores "fbclig", and the form has no fbclid field.',
      done: '?fbclid=test123 reaches the cookie and the hidden fbclid field.',
      tasks: [
        ['Fix fbclig → fbclid in the UTM block (site-wide custom code, section 7: the utmKeys list and the field mapping): published 29 Sep; served code byte-checked; 4/4 pages send fbclid on the first and on a return visit (before: none)', 'done'],
        ['Add the hidden fbclid field: not needed. The same script adds a hidden field to the form for every key in its list, so the fix above adds fbclid by itself (21 → 22 fields posted)', 'done'],
        ['Also (operator 29 Sep: apply all fixes): the section-7 cookie reader returned nothing when a name is stored twice (this host and .credolegal.com), so return visits sent utm_source/medium/campaign and gclid empty. It now takes the newest match, like the phone script: return visits keep them; when the two differ the newer is sent', 'done'],
        ['Publish to staging only', 'done'],
        ['Test with ?fbclid=… : verify-fbclid.mjs, probe-utm-stores.mjs, probe-cookie-conflict.mjs, probe-tracking-channels.mjs; form_submit unchanged', 'done'],
        ['Add the missing gbraid, wbraid and fbclid fields on the 6 old pages whose form lacks them: moot after DS-7; all 51 landing pages have gbraid and wbraid (served-HTML check 29 Sep), fbclid comes with the fix above', 'done'],
        ['Independent review: code by GPT + Gemini (no UX: nothing visible); findings settled except the CRM check', 'done'],
        ['Operator tests the new fbclid field and the return-visit values on the CRM end (manual item M3); the item closes on that check, nothing left to build', 'todo']
      ] },

    { id: 'PBI-09', title: 'Dropdown options stored in Webflow', refs: ['F2'], by: 'likely', note: 'Done 30 Sep. Webflow\'s API cannot set the options of a native Form Select, so "How many debts?" and "Secured or unsecured?" are DOM <select> elements (same id, name, required, classes) with stored <option> children, in LP \u00b7 Lead form and on the home page form. Edit the options in the Designer Navigator (option text + value attribute). The debt-stage dropdown stays native (its options were already stored; its values feed the CRM).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-09.review-gpt.md', settled: true, note: 'Round 2. Every option and the placeholder validation tested 52/52; real submission waits on D1.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-09.review-gemini.md', settled: true, note: 'Round 1 "do not approve" (duplicate ids from the hidden native selects): they were never served, and are now removed.' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'Nothing visible changed: same options, order and styles as the visitor already saw (computed styles identical, 52 pages \u00d7 2 widths).' }
      ], links: [['Packet', 'review/PBI-09.md'], ['Resolution', 'review/PBI-09.triage.md']] },
      why: 'The prototype options appear only because a script rebuilds the dropdowns on load.',
      done: 'Count, security and stage options stored in Webflow; the G17 rewrite script removed; form walk passes.',
      tasks: [
        ['Confirm on one page that select options can be set through the API: not for native Form Selects (Webflow docs); a DOM <select> with <option> children works (30 Sep)', 'done'],
        ['Set the three dropdowns on all pages: count and security as stored-option DOM selects in LP \u00b7 Lead form (51 pages) and on the home page form; stage already stored', 'done'],
        ['Remove the G17 rewrite block: cut from the site head code (write-back read back byte-identical, 37,003 characters)', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify the options on every page: served HTML 56/56 as intended; live vs pre-change 104/104 identical (form payload 412 b, trackers, dataLayer, cookies, phones, styles); every option and the placeholder validation identical 52/52', 'done']
,
        ['Independent review: code by GPT + Gemini (2 rounds); no UX (nothing visible); findings settled', 'done']
      ] },

    { id: 'PBI-10', title: 'Slider label and unique element ids', refs: ['F3', 'F4'], by: 'claude', note: 'Done 30 Sep, in LP \u00b7 Hero, LP \u00b7 Lead form and the home page form. Checkbox ids are Debt-Type-1..6 (scripts select by name); the inner step-2 block is formstep2-fields (the popup uses the wrapper #formstep2).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-10.review-gpt.md', settled: true, note: 'Round 1 fix: aria-valuetext on the slider. Round 2: full re-run on 52 pages after the fix; real submission waits on D1.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-10.review-gemini.md', settled: true, note: 'Slider value announcement added; the span for= is Webflow markup (ignored by browsers).' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'Nothing visible changed: attributes only; computed styles identical on 52 pages \u00d7 2 widths.' }
      ], links: [['Packet', 'review/PBI-10.md'], ['Resolution', 'review/PBI-10.triage.md']] },
      why: 'The amount slider has no label; step markers, formstep2 and the debt-type checkboxes repeat ids.',
      done: 'axe finds no unlabelled slider; no duplicate ids; form still works.',
      tasks: [
        ['Check which scripts read these ids: none read the step ids or checkbox ids (site code, embeds, CSS bundle, GTM container); the popup reads #formstep2 = the wrapper (first match)', 'done'],
        ['aria-label (the visible question) and aria-valuetext (the formatted amount, kept in sync) on #mjSlider; step-marker ids removed; checkbox ids Debt-Type-1..6; inner formstep2 \u2192 formstep2-fields', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify: 0 duplicate ids on 56 pages (was 5 on each of 52); axe label/duplicate-id: 0 violations on 52/52 (was 2 rules on every page); live vs pre-change: form walk, payload, trackers, phones, styles 104/104; interactions 104/104; google-source phones 52/52', 'done'],
        ['Independent review: code by GPT + Gemini (2 rounds); no UX (nothing visible); findings settled', 'done']
      ] },

    { id: 'PBI-11', title: 'Statute citations keep their case', refs: ['G18'], by: 'claude',
      why: '"§ 1692e(2)" displays as "§ 1692E(2)" on all 30 pages (179 citations).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-11.review-gpt.md', settled: true, note: 'Breakpoints checked in Webflow; counts reconciled (44 labels were already in capitals); home page found and fixed.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'do not approve', file: 'review/PBI-11.review-gemini.md', settled: true, note: 'Blockers: typed capitals (kept, design-system follow-up logged); CMS bindings (not applicable, static pages).' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-11.review-gpt-ux.md', settled: true, note: 'Found the 01-04, 06, 06 card numbering on 30 pages (pre-existing), offered as a follow-up.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-11.review-gemini-ux.md', settled: true, note: '' }
        ,        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-11-D16.review-gpt.md', settled: true, note: 'What-we-do paragraph + D16. Form, numbers and form_submit re-tested after the publish on the 13 state pages: all pass.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-11-D16.review-gemini.md', settled: true, note: '54 vs 51: thank-you, 404 and 401 have no what-we-do section.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-11-D16.review-gpt-ux.md', settled: true, note: 'Sentence case confirmed; sticky bar and body size logged for the design system.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-11-D16.review-gemini-ux.md', settled: true, note: 'Sentence case confirmed.' }
      ], links: [['Packet (citations)', 'review/PBI-11.md'], ['Resolution (citations)', 'review/PBI-11.triage.md'], ['Packet (paragraph + D16)', 'review/PBI-11-D16.md'], ['Resolution (paragraph + D16)', 'review/PBI-11-D16.triage.md']] },
      done: 'Every citation displays as typed; word tags match the prototype.',
      tasks: [
        ['Capitalize: None on the citation classes: mjfdcpaboxtext and mjfdcpaboxtext Copy set to none at the base breakpoint and the xl (1440px+) uppercase override removed; the other Copy classes carry no citations (form label, typed in capitals)', 'done'],
        ['Also the what-we-do paragraph (class text-block-16 had text-transform: capitalize, so body copy showed in Title Case on every landing page; Gemini UX blocker, DS-7): set to none 29 Sep, published; 0 of 54 pages render capitalized body text (negative control passes)', 'done'],
        ['Retype the word labels the prototype shows in capitals: 362 labels on 51 pages (Right/Violation/Remedy/Deadline tags, card-row words); law names in the rights column left as typed, as in the prototype. Home page too (found by the review), where 4 mistyped card citations were corrected', 'done'],
        ['Publish to staging only', 'done'],
        ['Check each page\'s citations: every label element on all 51 pages compared with its saved before-text at 1920/1440/1280/390 px: 474 citations and law names as typed, 406 labels in capitals, 0 problems; page-wide scan: 0 citations in capitals (was 305)', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'done'],
        ['Follow-up (design system): one citation class and one label class: moved to PBI-16 (29 Sep)', 'done']
      ] },

    { id: 'PBI-12', title: 'Page-specific copy fixes', refs: ['Part B', 'D20'], by: 'claude', note: 'All Part B fixes live 29 Sep, including the D20 wording.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-12.review-gpt.md', settled: true, note: 'Sixth fdcpa-attorney line to the operator (D20); functional check added.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-12.review-gemini.md', settled: true, note: 'Blocker = legal sign-off on the sixth line: D20.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-12.review-gpt-ux.md', settled: true, note: 'Round 2 on full-section screenshots.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-12.review-gemini-ux.md', settled: true, note: 'Round 1 withheld approval (rows cut off); round 2 approves. Its WEEK 1 finding fixed (G29).' }
      ], links: [['Packet', 'review/PBI-12.md'], ['Resolution', 'review/PBI-12.triage.md']] },
      why: 'Rights lines from another vertical on fdcpa-attorney, and small text differences on four pages.',
      done: 'Each page\'s Part B items match the prototype.',
      tasks: [
        ['debt-harassment-fdcpa-attorney: six rights summary lines from the prototype (were payday text): done 29 Sep; the sixth line without the prototype\'s "another $1,000" claim (contradicts the $1,000-per-action cap): wording with the operator as D20', 'done'],
        ['Problem cards numbered 01-04, 06, 06 on 30 pages (29 landing pages + home), found by the PBI-11 UX review: fifth card set to 05; thank-you boxes 01, 02, 04, 06 renumbered 01-04 and its citation § 1692c(A)(1) corrected; 50 pages read 01-06 at phone and desktop width (29 Sep); reviewed (GPT + Gemini, code + UX), settled (review/NUM-cards.triage.md)', 'done'],
        ['Thank-you box 02 "Personalized guidance" was tagged with the calling-hours citation § 1692c(a)(1): now GUIDANCE (operator 29 Sep, as in the prototype)', 'done'],
        ['wage-garnishment-attorney: how-it-works step titles (Debt investigation / Legal representation / Work towards debt resolution): done 29 Sep', 'done'],
        ['debt-harassment-violations: first rights tag RIGHT → REMEDY, headline full stop: done 29 Sep', 'done'],
        ['medical-debt-credit-report-removal: § 1692f tag → VIOLATION, hero sub-headline as in the prototype: done 29 Sep', 'done'],
        ['credit-card-debt-challenge: remove the empty <em> in the H1: done 29 Sep (H1 is one text node)', 'done'],
        ['Publish to staging only and verify: served HTML of all 56 pages, only the 5 pages and lines above changed; live vs pre-change: phones, form payload, trackers, cookies, links identical', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots (2 rounds); findings settled, D20 with the operator', 'done'],
        ['Apply the operator\'s D20 answer to the sixth fdcpa-attorney rights line: GPT wording "Each call after a cease request can add evidence of another FDCPA violation." live 29 Sep; served HTML of all 56 pages changed only in that line; prototype updated', 'done']
      ] },

    { id: 'PBI-13', visible: false, title: 'Meta descriptions within 160 characters', refs: ['G3', 'D23'], by: 'claude', note: 'Done 30 Sep: 44 pages (26 audit texts + 18 from D23); every published page now \u2264160 (longest 159). The multiple-collectors-more-money text was narrowed after review ("Each one that breaks the FDCPA can owe you damages"): the approved "add up to statutory damages" still read as per-contact.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-13.review-gpt.md', settled: true, note: 'Prototype files verified; runtime spot check; real submission waits on D1.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-13.review-gemini.md', settled: true, note: 'Round 1 "do not approve" (literal {State}?): each state page serves its own state name (13/13 exact).' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'Only head meta tags changed; nothing visible on the pages.' }
      ], links: [['Packet', 'review/PBI-13.md'], ['Resolution', 'review/PBI-13.triage.md']] },
      why: 'All 26 descriptions run 162\u2013249 characters.',
      done: 'The approved text from the audit on each page, identical in meta, og: and twitter: descriptions.',
      tasks: [
        ['Write the approved texts to the pages\' SEO settings: 26 audit texts + 18 D23 texts (prototype first)', 'done'],
        ['Set og:description to "same as SEO"', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify the served head tags: 44/44 exact; description = og = twitter on every changed page; 6 lines per page; longest description site-wide 159', 'done'],
        ['Independent review: code by GPT + Gemini (2 rounds); no UX (head only); findings settled', 'done']
      ] },

    { id: 'PBI-14', visible: false, title: 'Schema: LegalService and FAQPage', refs: ['G6'], by: 'claude', note: 'Done 30 Sep. LegalService (site head): Credo Legal Services, P.C., 1 Liberty Street, Suite 4010, New York, NY 10006 (operator-confirmed), logo from this site\'s assets; url stays start.credolegal.com (D21); X profile in sameAs is D9. FAQPage in each page\'s Webflow JSON-LD field, built from its visible FAQs: after any FAQ copy change run tools/webflow/pbi14-faq-schema.py <extract> --check <served-dir> and rewrite the pages it lists.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-14.review-gpt.md', settled: true, note: 'Full 52-page runtime check; FAQ sync check added; per-call $1,000 copy sent to the operator (D24).' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-14.review-gemini.md', settled: true, note: 'Every served JSON-LD block parses and equals the expected FAQPage (52/52).' },
        { kind: 'UX', by: 'GPT + Gemini', na: true, note: 'Structured data only; nothing visible changed.' }
      ], links: [['Packet', 'review/PBI-14.md'], ['Resolution', 'review/PBI-14.triage.md']] },
      why: 'The JSON-LD says Florida, points at the homepage and uses production assets; no FAQPage.',
      done: 'One site-wide LegalService (P.C., 1 Liberty Street, staging-hosted logo) and a valid FAQPage per page.',
      tasks: [
        ['Site-wide LegalService block: name, address (operator-confirmed 30 Sep), staging-hosted logo/image and twitter:image; head write-back read back byte-identical', 'done'],
        ['Remove the old per-page LegalService blocks: done in PBI-01d P1 (one site-wide block)', 'done'],
        ['Build a FAQPage per page from its own FAQs: 52 pages (51 landing + home), verbatim from the served page, in Webflow\'s page JSON-LD field', 'done'],
        ['Remove or replace the @handle placeholder (D9): the twitter:site "@handle" tag was dropped in PBI-01d P1 (29 Sep); D9 now only asks whether the X profile in the JSON-LD sameAs is right', 'done'],
        ['Publish to staging only and validate the JSON-LD: LegalService correct on 56/56; FAQPage parses and equals the page\'s FAQs on 52/52; runtime unchanged on all 52 form pages', 'done']
,
        ['Independent review: code by GPT + Gemini; no UX (nothing visible); findings settled', 'done']
      ] },

    { id: 'PBI-15', title: 'Colour and contrast', refs: ['L3', 'G26', 'G27'], by: 'claude', note: 'Done 30 Sep. Webflow colour variables ink / muted / secondary / credo-red-soft. Classes whose name exists several times (legacy copies from the old drafts) cannot be edited by name, so a commented <style> block at the top of the site head code holds their values; move them into the classes with DS-4 (the old drafts, which use the duplicate classes, are kept: D18, 30 Sep).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-15.review-gpt.md', settled: true, note: 'Pop-up states tested: one real failure (step-2 label) found and fixed.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-15.review-gemini.md', settled: true, note: 'Scoped OR CALL rule kept (the class is also used on dark).' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-15.review-gpt-ux.md', settled: true, note: 'Weak phone link under Continue: PBI-17 moves it.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-15.review-gemini-ux.md', settled: true, note: 'Statute refs 4.61:1 and stat labels 5.79:1 measured: pass AA.' }
      ], links: [['Packet', 'review/PBI-15.md'], ['Resolution', 'review/PBI-15.triage.md']] },
      why: 'Pale text fails contrast (worst: "or call" at 1.6:1); body text lighter and greyer than the prototype.',
      done: 'axe finds no contrast failures; colour variables ink / muted / secondary in use.',
      tasks: [
        ['Create the colour variables: ink #111418, muted #5b6470, secondary #6a7688, credo-red-soft #ff6b73', 'done'],
        ['Point the failing classes at secondary #6a7688: form intro, card numbers, inactive steps and slider labels (embeds), OR CALL; pop-up step label muted (on its light panel)', 'done'],
        ['Body font and colour; weights 300 \u2192 400, eyebrows 600: body ink + Hanken Grotesk, lede/paragraph/card/FAQ/bottom-CTA text 400, eyebrows 600', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify with lpcheck (axe) and screenshots: color-contrast 20 failures per page \u2192 0 on 52/52 \u00d7 2 widths and the system pages; pop-up steps 2\u20133 and error states 0; 7 before/after screenshot pairs', 'done']
,
        ['Red text on the dark form header uses credo-red-soft #ff6b73 (UX review, design preview): already #ff6b73 (text-block-27-copy), checked 30 Sep', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots; findings settled', 'done']
      ] },

    { id: 'PBI-16', title: 'Mobile type scale and text case', refs: ['G24', 'G22', 'L4'], by: 'claude', note: 'Done 30 Sep. Class styles at mobile portrait (\u2264479px) plus rules in the site-head <style> token block (the duplicated class names and the per-page heading fix, both go with M2 / DS-4). Step labels hidden \u2264420px as in the prototype (numbers only).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-16.review-gpt.md', settled: true, note: 'Breakpoints 320\u2013768px swept: overflow 0, text under 12px 0.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-16.review-gemini.md', settled: true, note: 'Site-head overrides stay while the old drafts are kept (D18) / until DS-4; class task moved to DS-8.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-16.review-gpt-ux.md', settled: true, note: 'Desktop question/helper gap fixed (4px); phone link under Continue: PBI-17 / PBI-19.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-16.review-gemini-ux.md', settled: true, note: 'Two-line step labels: hidden \u2264420px as in the prototype.' }
      ], links: [['Packet', 'review/PBI-16.md'], ['Resolution', 'review/PBI-16.triage.md']] },
      why: 'Mobile H1 52px vs the prototype\'s 32px; intro paragraph in Title Case; 10\u201311px labels.',
      done: 'Mobile sizes match the prototype; no text under 12px on phones.',
      tasks: [
        ['Mobile-portrait sizes for the H1 and section headlines: H1 32px / 1.05, section headlines 26px / 1.2 at \u2264479px', 'done'],
        ['Form-question line height 1.3 (was 44px); question-to-helper gap 4px', 'done'],
        ['Intro paragraph Capitalize: None (G22, class Text Block 16): done 29 Sep in PBI-11; 0 of 54 pages render capitalized body text', 'done'],
        ['One citation class and one label class (labels uppercase via style, words typed normally), replacing the capitals typed in PBI-11 (from the PBI-11 review, Gemini): moved 30 Sep to DS-8 (class consolidation, design-system plan); no visible change, about 500 props on 51 pages', 'done'],
        ['Step labels and rights tags to 12px; step labels hidden \u2264420px (numbers only), as in the prototype', 'done'],
        ['Rights rows on phone: the label column is narrow, so labels wrap word by word; widen or stack it (existing design, from the PBI-01d P4 UX review): stacked at \u2264479px by one rule in the site head <style> block (.quick-stack-20 grid: one column), since the grid columns are set per element in LP \u00b7 Rights and FAQ', 'done'],
        ['Publish to staging only and verify: all 52 form pages at 390px, text under 12px 0, overflow 0; 4 pages at 320\u2013768px; functional spot check on 4 pages \u00d7 2 widths identical', 'done']
,
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots; findings settled', 'done']
      ] },

    { id: 'PBI-17', title: 'Form card, bottom CTA and page width', refs: ['G27', 'G28', 'L6'], by: 'claude', note: 'Done 30 Sep. New classes hero-call / hero-call-number and the combo hero-card (the old "or call" class name exists three times). The site head\'s PBI-15 rule for the old "OR CALL" no longer matches anything: remove it with the next head edit (DS-8).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-17.review-gpt.md', settled: true, note: 'Functional compare re-run on all 52 form pages.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-17.review-gemini.md', settled: true, note: 'Dropdown opened in the pop-up card at 1440/390/320: nothing clipped.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-17.review-gpt-ux.md', settled: true, note: 'Call link tap target: PBI-19.' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-17.review-gemini-ux.md', settled: true }
      ], links: [['Packet', 'review/PBI-17.md'], ['Resolution', 'review/PBI-17.triage.md']] },
      why: 'Card border instead of shadow; "or call" inside the card; bottom CTA centred; page wider than the screen.',
      done: 'Card and bottom CTA match the prototype; no sideways overflow on any device.',
      tasks: [
        ['Card: remove the border, add the soft shadow (Div Block 36: hero and pop-up cards; 4px radius)', 'done'],
        ['Move the "or call" block below the card: LP \u00b7 Hero and home; "Or call" in mono 13px muted, number ink with a red underline; link id herocta kept', 'done'],
        ['Bottom CTA: left-align, headline max width (680px, paragraph 560px, button left; headline 26px on phones, missed in PBI-16; "Or call")', 'done'],
        ['FAQ answers: cap the line length on desktop (~70 characters; from the PBI-01d P4 UX review; one edit in LP \u00b7 Rights and FAQ): 55ch, longest line 72\u201374 characters', 'done'],
        ['Fix the poition typo and the missing }: page width = screen width at 1440/810/390/320 on 52/52 (was 1555px at 1440)', 'done'],
        ['Publish to staging only and verify: 52 form pages \u00d7 4 widths 208/208; functional compare before/after on all 52 form pages', 'done']
,
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots; findings settled', 'done']
      ] },

    { id: 'PBI-18', title: 'Red accent word in the H1', refs: ['G23'], by: 'likely', note: 'Done 30 Sep. The hero H1 is three spans bound to the props H1 (text before), H1 accent (class h1-accent, #c92028) and H1 end (never starts with a space: Webflow makes a leading space a no-break space). Accent per page: review/PBI-18-accents.md (48 from the prototype, 4 picked).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-18.review-gpt.md', settled: true, note: 'Accent table, tool round-trip, CTA wrap at 9 widths, full functional compare.' },
        { kind: 'Code', by: 'Gemini 3.1 Pro', verdict: 'approve with fixes', file: 'review/PBI-18.review-gemini.md', settled: true, note: 'Footer script inside the em checked: same colour.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-18.review-gpt-ux.md', settled: true, note: 'Round 2 on the picked accents: "Rudely" \u2192 "Calling".' },
        { kind: 'UX', by: 'Gemini 3.1 Pro', verdict: 'approve', file: 'review/PBI-18.review-gemini-ux.md', settled: true, note: 'Round 2: approve with fixes (same "Rudely" point).' }
      ], links: [['Packet', 'review/PBI-18.md'], ['Round 2', 'review/PBI-18-r2.md'], ['Accents', 'review/PBI-18-accents.md'], ['Resolution', 'review/PBI-18.triage.md']] },
      why: 'The prototype H1 has one red accent word; live H1s are plain.',
      done: 'Accent span on each page\'s listed word; bottom CTA uses the same class; the recolour script removed.',
      tasks: [
        ['Confirm on one page that an inline span can be added through the API: a span inside a heading takes a prop-bound text (tested on the template draft, 30 Sep)', 'done'],
        ['Create the accent class: h1-accent (#c92028, upright); props H1 accent and H1 end on LP \u00b7 Hero', 'done'],
        ['Wrap each page\'s accent word: 51 landing pages + home; H1 text byte-identical before/after on 52/52', 'done'],
        ['Bottom CTA accent: em styled in the section embed (#ff6b73, upright; home got the same em, its line break removed)', 'done'],
        ['Remove the ctaheading recolour script: now redundant (same colour); removal moved to PBI-23 with the home "Legally" recolour script (per-script approval)', 'done'],
        ['Publish to staging only and verify: accent check 104/104; functional compare on all 52 form pages', 'done']
,
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots (2 rounds); findings settled', 'done']
      ] },

    { id: 'PBI-19', title: 'Small polish', refs: ['L5', 'G29'], by: 'claude', note: 'Done 30 Sep. No visible interactive element under 24px on the 52 form pages (all elements scanned, not only call links). Gemini reviews pending: its API credits are depleted (HTTP 402); re-run when topped up.',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-19.review-gpt.md', settled: true, note: 'All interactive elements scanned: nav, footer menu and slider fixed too; page end on 3 devices.' },
        { kind: 'UX', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-19.review-gpt-ux.md', settled: true, note: 'BBB link box measured 80px.' }
      ], links: [['Packet', 'review/PBI-19.md'], ['Resolution', 'review/PBI-19.triage.md']] },
      why: 'Call links under 24px tall; "Week 1" in mixed case on 21 pages.',
      done: 'No tap target under 24px; step tags in the same case.',
      tasks: [
        ['Bottom padding while the sticky call bar or chat bubble is visible, so the end of the page is never hidden (UX reviews PBI-05 and design preview): nothing was hidden (the bar\'s script adds 90px); its white band under the dark footer moved into the footer (body:has(.sticky-call-button)); chat bubble not rendered on staging (D8, recheck in PBI-23)', 'done'],
        ['Padding on the call links and the BBB link: hero and bottom CTA call 15 \u2192 25px, footer phone links 20 \u2192 24px, BBB badge links 18 \u2192 80px; also header nav links, footer menu links and the debt slider (review follow-up)', 'done'],
        ['"Week 1" to the step-tag case on 21 pages (G29): done 29 Sep with PBI-12 (found again by its UX review): 21 pages + the 3 Week tags on home retyped in capitals; served HTML of 56 pages changed only there; 0 mixed-case left', 'done'],
        ['Publish to staging only and verify: 104/104 no interactive element under 24px; page end on 52 pages \u00d7 3 devices; functional compare 52/52', 'done'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots; findings settled (Gemini pending: API credits)', 'done']
      ] },

    { id: 'PBI-25', title: 'Heading levels on home and the thank-you pages', refs: ['G5'], by: 'claude', note: 'Done 30 Sep. Home 29 h1 \u2192 1, thank-you pages 9 \u2192 1; the look is kept by small CSS blocks (home head code; Thank-you page component embed), to move into the classes with DS-8. Gemini review pending (API credits).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-25.review-gpt.md', settled: true, note: 'Outlines compared with a landing page; every element compared before/after: 0 non-tag differences.' }
      ], links: [['Packet', 'review/PBI-25.md'], ['Resolution', 'review/PBI-25.triage.md']] },
      why: 'Found in PBI-18: home uses h1 for about 28 section labels and headings, the thank-you pages 9 (the landing pages were fixed in G5: one H1, labels and headlines h2, card titles h3).',
      done: 'One H1 per page; the same heading levels as the landing pages; no visual change.',
      tasks: [
        ['Home: section labels and headlines h2, card titles h3, the second form question h3 (as the landing pages): 18 \u2192 h2, 10 \u2192 h3', 'done'],
        ['Thank-you pages (/thank-you, /page/thank-you, /page/already-submitted): one H1 (Thank-you page component: 5 \u2192 h2, 3 \u2192 h3)', 'done'],
        ['Publish to staging only and verify: heading outline and computed styles before/after (every element: 0 non-tag differences; functional compare identical)', 'done'],
        ['Independent review: code by GPT + Gemini; UX only if anything visible changes; findings settled (no UX: nothing visible; Gemini pending: API credits)', 'done']
      ] },

    { id: 'PBI-20', title: 'CTA labels', refs: ['G16'], by: 'decision', blocked: 'D3',
      why: 'Four CTA labels in use; two were asked for.',
      done: 'Only the two agreed labels on all pages.',
      tasks: [
        ['Set the agreed labels on every CTA', 'todo'],
        ['Publish to staging only and verify', 'todo'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'todo']
      ] },

    { id: 'PBI-21', title: 'The four payday-content pages', refs: ['Part B'], by: 'decision', note: 'Deferred by the operator 29 Sep. Open question: own copy for the 4 pages, or redirect them to matching pages. (D4\'s rebuild decision was applied to the 4 payday-loan pages in DS-7; it does not cover these 4.)', blocked: 'Deferred (operator)',
      why: 'collection-defense, credit-cards, fcba-and-fdcpa and stop-wage-garnishment show the payday page.',
      done: 'Per D4: drafted/unlisted on staging, or rebuilt with approved copy.',
      tasks: [
        ['Apply the operator\'s answer (own copy or redirect) on staging', 'todo'],
        ['Publish to staging only and verify', 'todo'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'todo']
      ] },

    { id: 'PBI-22', visible: false, title: 'Call-click tracker listens to the real links', refs: ['G21a'], by: 'decision', blocked: 'D6',
      why: 'The tracker waits for ids that don\'t exist, so it never fires.',
      done: 'Clicks on the real call links reach the tracker (only once D6 allows posting to the live call-click backend).',
      tasks: [
        ['Note (PBI-08, 29 Sep): the tracker also sends fbclig read from a cookie of that name, so it is always empty. Left as is: what it sends to the live call-click backend is part of D6', 'todo'],
        ['Give the sticky bar link an id', 'todo'],
        ['Point the tracker at the real call-link ids', 'todo'],
        ['Publish to staging only and verify', 'todo'],
        ['Independent review: code by GPT + Gemini; UX by GPT + Gemini on screenshots when anything visible changes; findings settled', 'todo']
      ] },

    { id: 'PBI-23', visible: false, title: 'Performance on phones', refs: ['L2'], by: 'claude', note: 'Claude\'s part done 30 Sep (operator-approved per script): Inputflow i.js removed, the two recolour scripts removed, Trustpilot bootstrap loaded once; Optibase kept synchronous (tests live); moving the form code to the footer dropped (Webflow 50,000-character limit). Lighthouse unchanged within noise (52\u201356): clean-up, not speed-up. The big levers are the operator\'s: remove DM Mono and PT Mono (Site settings \u2192 Fonts), fire the Nextdoor pixel later in GTM, turn on minify; Tidio waits on D8, the second recorder on D5. Gemini review pending (API credits).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-23.review-gpt.md', settled: true, note: 'Isolated compare (only the PBI-23 hunks reverted in the live pages): 112/112 runs differ only by the i.js request; styles differ only by same-colour wrapper spans. i.js read: its one unconditional helper adds an is-checked class nothing uses (site CSS, pages, scripts, GTM). Trustpilot checked on every page.' }
      ], links: [['Plan and decisions', 'review/PBI-23-plan.md'], ['Packet', 'review/PBI-23.md'], ['Resolution', 'review/PBI-23.triage.md']] },
      why: 'Lighthouse 37\u201356 and main content after 9\u201315 s on a mid-range phone.',
      done: 'Lighthouse re-run on staging, compared with the baseline.',
      tasks: [
        ['Confirm the removals from PBI-01 are live: 30 Sep, all 56 pages: no videsigns call, multi-step.js or Font Awesome; GTM loads once', 'done'],
        ['Baseline and per-script plan (review/PBI-23-plan.md): Lighthouse 52\u201354, LCP 11.8\u201312.7 s (the H1 text, gated by the web font); operator decisions 30 Sep recorded per script', 'done'],
        ['Remove the Inputflow library (i.js, site head): no element uses its if-lib attributes; form walk identical without it (operator: yes, after the evidence)', 'done'],
        ['Remove the two redundant recolour scripts (PBI-18): the footer script that wraps "decision" in the bottom CTA, and the slider embed script that wraps "Legally" in the H1 (LP \u00b7 Hero on the 51 landing pages and home\'s hero; it only matched home); both accents are now in the markup and CSS (per-script approval)', 'done'],
        ['Load the Trustpilot bootstrap once (Trust strip); the second include in the Rights & FAQ embed removed; both widgets render on all 52 pages', 'done'],
        ['Lazy-load or remove Tidio (D8)', 'todo'],
        ['Keep one session recorder (D5)', 'todo'],
        ['Operator, manual: remove DM Mono and PT Mono (Site settings \u2192 Fonts); minify HTML/CSS/JS (Site settings \u2192 Publishing); fire the Nextdoor pixel on Window Loaded in GTM (shared account)', 'todo'],
        ['Publish to staging only; Lighthouse before/after: 53/54/52/53 \u2192 54/53/56/52 (median of 3, 4 pages): within noise', 'done'],
        ['Independent review: code by GPT + Gemini; UX only if anything visible changes; findings settled (no UX: nothing visible; Gemini pending: API credits)', 'done']
      ] },

    { id: 'PBI-24', visible: false, title: 'Close-out', refs: [], by: 'claude', note: 'Close-out done 30 Sep: staging better than the 27 Sep baseline within lpcheck\'s checks, no functional regression found; Lighthouse within measurement noise (limit recorded in the triage). Found for the operator: D26 (Optibase in Safari), D27 (GTM tag with sample Bing data). Open: the domain-switch task (D16, D21). Gemini review pending (API credits).',
      review: { items: [
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-24.review-gpt.md', settled: true, note: 'Close-out: scope, tap-target fix (one CSS line; class only on the footer links), Clarity at 1440 too, Lighthouse limit recorded, D27 raised.' },
        { kind: 'Code', by: 'GPT-5.5', verdict: 'approve with fixes', file: 'review/PBI-24-changelog.review-gpt.md', settled: true, note: 'Change log: concrete revert steps, current-state table (pages, robots, canonical), current form locations, status wording.' }
      ], links: [['Packet', 'review/PBI-24.md'], ['Change log', 'review/CHANGELOG.md'], ['Resolution', 'review/PBI-24.triage.md']] },
      why: 'Proof of the result on staging.credolegal.com and a clean record of every change.',
      done: 'Full lpcheck on staging.credolegal.com vs the baseline; change log per item.',
      tasks: [
        ['Full lpcheck on the 30 staging pages vs the baseline: major 245 \u2192 106, minor 211 \u2192 88; form walk, phones (344/344), links unchanged; one new issue found and fixed (footer links 23.6px on iPad: Link 3 Copy padding 4 \u2192 5px)', 'done'],
        ['Change log per item (what changed, where in Webflow, how to revert): review/CHANGELOG.md, with the current robots/canonical state', 'done'],
        ['At the domain switch (D16, D21): every page\'s robots, canonical and og:url set for the final domain (today noindex, nofollow + canonical to start.credolegal.com/{slug}); the three thank-you pages get noindex (today no robots tag); the LegalService schema url; recheck the served heads', 'todo']
,
        ['Clarity payload capture on the published form (the landing-page form on all 52 form pages; Hero-Form and Hero-Form-For-New-Pages are only on the 21 unpublished old drafts, kept by D18) (review PBI-04): 52/52 form pages, no typed value and no masked form text in Clarity\'s uploads (uploads answered locally)', 'done'],
        ['Independent review: code by GPT + Gemini (close-out packet and the change log); UX only if anything visible changes; findings settled (no UX: footer links 2px taller; Gemini pending: API credits)', 'done']
      ] }
  ],

  decisions: [
    ['D1', 'G9', 'Where the form posts', 'Webflow native forms, a first-party endpoint, or formspree with a DPA; and whether staging posts to a test destination meanwhile (recommended).', 'PBI-02'],
    ['D2', 'G10', 'Consent text', 'Counsel-approved wording, and whether express consent needs a checkbox. Note 29 Sep: the operator accepted all existing copy as legal-approved, but no consent text has been written yet, so this stays open: it needs the text itself (or a request to draft it for counsel).', 'PBI-03'],
    ['D3', 'G16', 'CTA labels', 'Which two labels to keep.', 'PBI-20'],
    ['D4', 'Part B', 'The four payday-content pages', 'Decided 28 Sep: rebuild them on the landing-page template, like the other older pages. Applied in DS-7 to the 4 payday-loan pages (own copy each). Separate and still open: the 4 pages that show the payday page\'s content (collection-defense, credit-cards, fcba-and-fdcpa, stop-wage-garnishment), deferred by the operator 29 Sep: own copy or redirect? (PBI-21)', 'PBI-21'],
    ['D5', 'G32', 'Session recorders', 'Keep Mouseflow, or remove it and rely on Clarity.', 'PBI-23'],
    ['D6', 'G21a', 'Call-click posting', 'May staging.credolegal.com post call clicks to the live call-click backend (credo.debtfixer.co) while testing?', 'PBI-22'],
    ['D7', 'F2', 'State list', 'Confirm North Carolina should stay removed from the state dropdown.', '—'],
    ['D8', 'L2', 'Tidio chat', 'Is chat staffed? Lazy-load it, or remove it. If chat stays: a neutral dark launcher colour, so red stays reserved for the call and form buttons (UX reviews, 28 Sep).', 'PBI-23'],
    ['D9', 'G6', 'Twitter/X handle', 'The @handle placeholder is gone (dropped in PBI-01d P1, 29 Sep). Still open: is https://twitter.com/Credolegal (in the site JSON-LD sameAs) Credo\'s real X profile, or should it be removed?', 'PBI-14']
    ,['D10', 'W1', 'GTM on thank-you pages', 'No longer blocks PBI-01d (29 Sep): the shared code moved to Site settings behind a system-page check, so GTM and Mouseflow stay off the thank-you, 401 and 404 pages exactly as before. Still open, optional: should GTM run on the thank-you pages, and does it count their page views as conversions? Needs someone with GTM access; the answer only changes the page-id list in the site head.', 'PBI-01d'],
    ['D11', 'L1', 'Old-form pages', 'Decided 28 Sep: rebuild all 21 older pages (13 state, 8 others incl. the 4 payday pages) on the landing-page template: new design and the new form only; every legacy form removed. Method B: each page is a duplicate of a landing page with its own copy, number, SEO and tracking; the old page is kept as a draft until the new one passes.', 'PBI-01c'],
    ['D12', 'PBI-01', 'ZIP error message', 'Decided 27 Sep: accepted. An invalid ZIP now shows one message ("Please enter valid 5 digit zip code") instead of two.', 'PBI-01'],
    ['D13', 'Design preview', 'Thank-you wording', 'Decided 29 Sep (operator): apply the proposed wording. Done on /thank-you, /page/thank-you and /page/already-submitted: "Thank you. Your request has been received." + "We appreciate the trust you\'ve placed in our team to help protect your rights. One of our legal professionals will contact you shortly to schedule your free, confidential consultation."; box 02 tagged GUIDANCE. Operator 29 Sep: all copy accepted by legal (no further legal review of the remaining outcome-like lines). Repeat submissions now get their own line on /page/already-submitted ("We already have your request.", CMS-bound headline and paragraph; review/D13-already-submitted.triage.md). Phone decided 29 Sep: (718) 865-8350 on all thank-you pages; /page/thank-you (and already-submitted) now use the /thank-you design via a shared "Thank-you page" component (Headline/Message props, CMS-bound on the template); review/TY-unify.triage.md. D13 closed. Before: legal sign-off on the thank-you headline. Today: "You have been pre-approved for a free legal consultation call with our attorney!" Proposed (in the preview): "Thank you. Your request has been received." with "One of our legal professionals will contact you shortly to schedule your free, confidential consultation." Needs a Credo attorney to approve before it goes into Webflow. Also: which phone number the unified thank-you page shows (today /thank-you has (443) 483-4080, /page/thank-you and /page/already-submitted (718) 865-8350).', 'DS-6'],
    ['D14', 'PBI-06', 'Tablet menu', 'Decided 28 Sep: accepted. Tablets (768–991px) also show the call button instead of the ☰ menu, like phones; the menu only held 5 same-page links and the number.', 'PBI-06'],
    ['D15', 'DS-7 review', 'Call numbers per ad source', 'Decided 29 Sep: leave as is (one number per page for every source). Every state page shows one number whatever the ad source (as before): 718-865-8350, or the state\u2019s local number on MN, MD, CO, NY, NJ, FL. Keep that, or give Google / Meta / Bing their own tracked numbers so calls can be attributed? New numbers come from the call-tracking account (not ours to change).', 'DS-7'],
    ['D16', 'DS-7 review', 'State pages in search', 'Decided 29 Sep: they should not rank for now. Done: robots noindex, nofollow and canonical + og:url to the page itself (start.credolegal.com/{slug}), like the other landing pages; the rest of each head unchanged; verified 13/13 (recheck on start.credolegal.com at go-live). Before: the 13 state pages say index, follow but their canonical points to the home page (start.credolegal.com/), which folds them into the home page for Google. Kept as it was. Should each state page rank on its own (self canonical), or stay as is?', 'DS-7'],
    ['D17', 'DS-7 review', 'Stats claims', 'Decided 29 Sep: the claims are fine, kept; operator confirmed all copy as accepted by legal (29 Sep). The pages show \u201c10 million+ in debt wiped\u201d and \u201c500k debts settled every month\u201d with no source. A Credo attorney should confirm they are accurate and allowed in attorney advertising, or change them.', 'DS-7'],
    ['D18', 'DS-7', 'Old page drafts and the legacy form', 'Decided 29 Sep: delete the drafts now; changed 30 Sep (operator): keep the 21 drafts, unpublished. Done: the legacy site script removed; the drafts are not served (21/21 return 404). The 2 legacy components and the duplicate-named legacy classes stay with the drafts, so the site-head <style> block for those classes (PBI-15/16) stays too. The 21 older pages are rebuilt; their old versions are kept as hidden drafts ({slug}-old) so any page can be put back. The old form components (Hero-Form, Hero-Form-For-New-Pages) and the site script OldFormPhoneEmailGuard are only used by those drafts. When can the drafts be deleted? Deleting them lets the legacy form and its scripts be removed from the site for good.', 'DS-7'],
    ['D19', 'PBI-01d plan', 'Shared code: order, phone numbers, search', 'Decided 29 Sep (operator): (1) make the code shared (P1\u2013P4) before the design polish, so each design fix is made once; (2) phone numbers in one table keyed by page slug in the site code (recommended option); (3) align with D16: every page noindex, nofollow with a self canonical, including the 8 pages rebuilt last (letter, medical-debt-attorney, debt-harassment-act-fast, multiple-collectors-more-money and the 4 payday pages), which said index, follow with the canonical on the home page.', 'PBI-01d'],
    ['D20', 'PBI-12 review', 'Rights line on debt-harassment-fdcpa-attorney', 'Decided 29 Sep (operator): use the GPT wording. Live 29 Sep on staging: "Each call after a cease request can add evidence of another FDCPA violation." (prototype content-attorney.js updated to match). Before: the prototype line "Each call after a cease request: another $1,000 in play." contradicts the FDCPA cap of $1,000 statutory damages per action (\u00a7 1692k(a)(2)(A)) and the line above it on the same page. Live now (29 Sep): "Each call after a cease request adds another violation to the claim." (Gemini: accurate and compliant). Alternative (GPT): "Each call after a cease request can add evidence of another FDCPA violation." Keep the live line, use the alternative, or give other wording? Optional, same pass: the prototype copy has a few comma splices left from the dash clean-up (e.g. violations, Who this helps, item 3); fix them in prototype + Webflow?', 'PBI-12'],
    ['D21', 'Board QA', 'Canonical of the staging pages until go-live', 'Decided 29 Sep (operator): keep as is until go-live; PBI-24 rechecks robots, canonical and og:url at the domain switch. Before: every staging page now says noindex, nofollow with its canonical and og:url on start.credolegal.com/{slug} (D16, D19), while the old start pages say index, follow with their canonical on start.credolegal.com/. Mixed signals (noindex + a cross-domain canonical) are harmless while staging is not linked, but at the domain switch the heads must say index, follow with the final URL. Keep as is until go-live (recommended, recheck in PBI-24), or point the canonicals at staging.credolegal.com meanwhile? Nothing on start is changed either way.', 'PBI-24'],
    ['D22', 'PBI-01d P5', 'Hero wording: prototype vs Webflow', 'The copy sync (lp-sync.mjs, 29 Sep) finds 8 hero props on 7 pages where the prototype and the live page differ; everything else (4,708 props) matches. Webflow \u2192 prototype: debt-harassment-fdcpa-attorney form intro "Fill in the form below or call us\u2026" \u2192 "Fill in the form or call\u2026"; credit-card-debt-stop-calls H1 "\u2026Calling?" \u2192 "\u2026Calling You?"; credit-card-debt-violations "Collector After You?" \u2192 "Collectors After You?"; wage-garnishment-prevention "Is Garnishment Looming?" \u2192 "Garnishment Looming?"; medical-debt-credit-report-removal "Medical Debt You Don\'t Recognize?" \u2192 "Chased for Medical Debt You Don\'t Recognize?"; payday-loan-debt-harassment "Calling Rudely?" \u2192 "Calling Aggressively?"; debt-harassment-fdcpa-rights H1 "Our Attorneys Can Make Them Pay" / lede "We can help you know your rights and take action." \u2192 H1 "Our Attorneys Can Explain Your Rights and Act." / lede "Our Attorneys Can Make Them Pay.". Apply the prototype wording (the sync has the payloads ready), keep the Webflow wording (then the prototype files are updated to match), or decide per page? Headlines may match live ads, so check ad copy first. Nothing changed until decided. PBI-18 (30 Sep): the red accent on these pages was picked in the live wording; the UX reviews found "Calling Rudely?" informal and "Make Them Pay" the most aggressive H1 (both are in this decision); applying the prototype wording brings the prototype accents with it (lp-sync).', 'PBI-01d'],
    ['D25', 'PBI-25 check', 'Home: two repeated headings', 'Home repeats two section headings: "WHY CREDO" above "Common problems, and the line each one crosses" and "From violation to legal claim, fast." under "Who this helps" (copy-paste leftovers). The landing pages have "What we see" and "You\'ll recognize your own situation here." there. Use the landing-page wording on home (recommended), or other wording? Nothing changed until decided.', 'PBI-25'],
    ,['D23', 'PBI-13 (G3)', 'Meta descriptions for the pages without approved text', 'Decided 30 Sep (operator): approved as proposed; applied in PBI-13 (prototype first, then Webflow). PBI-13 puts the 26 audit-approved descriptions live (all \u2264160). 17 more pages are over 160 with no approved text: the 13 state pages, home, /letter and fcba-and-fdcpa share one 230-character generic text, and debt-harassment-act-fast is 167. Two pages (act-fast, multiple-collectors-more-money) also say every violation is worth up to $1,000, a claim the audit removed elsewhere (the FDCPA caps statutory damages at $1,000 per action). Proposed (each \u2264160): home, /letter, fcba-and-fdcpa: "Facing unsecured debt or creditor harassment? Our attorneys challenge invalid debts, defend lawsuits and enforce your FDCPA rights. Free case evaluation." (153); each state page: "{State} residents facing debt collectors or a debt lawsuit: our attorneys challenge invalid debts and enforce your federal rights. Free case evaluation." (149\u2013157); debt-harassment-act-fast: "The day you enroll, our attorneys send the collector a cease letter. Every contact after that is documented as a potential violation. Free case evaluation." (155); multiple-collectors-more-money: "Several collectors calling? Illegal contacts can add up to statutory damages under the FDCPA. Our attorneys track every violation. Free case evaluation." (152). Approve, edit or reject; approved texts go to the prototype first, then Webflow. Follow-up 30 Sep (both reviewers): the more-money text still implied per-contact damages; live text narrowed to "Several collectors calling? Each one that breaks the FDCPA can owe you damages. Our attorneys track every violation. Free case evaluation."', 'PBI-13']
    ,['D24', 'PBI-14 review', 'Per-call "$1,000" claims in the page copy', 'Found while building the FAQ schema (30 Sep): 9 pages still attach $1,000 to each call or violation in visible copy (about 15 sentences: FAQ answers such as "every subsequent call is a documented $1,000 violation", rights rows such as "Every call after a written cease request is a standalone $1,000 federal violation", "Each call outside hours = standalone $1,000 violation"). FDCPA statutory damages are capped at $1,000 per action (\u00a7 1692k(a)(2)(A)); the meta descriptions were already corrected (G3, D23). Pages: credit-card-debt-stop-calls, credit-card-debt-violations (3), debt-harassment-act-fast (2), debt-harassment-stop-calls, home (2), multiple-collectors-more-money (3), multiple-collectors-one-attorney, payday-loan-debt-harassment, payday-loan-debt-violations. Proposed: keep "each call is a violation" and move the amount to the action, e.g. "Every call after a written cease request is a separate FDCPA violation, and violations can support statutory damages of up to $1,000 per lawsuit." Approve the pattern (applied prototype first, then Webflow props, FAQ schema re-synced) or give wording.', 'PBI-12']
    ,['D26', 'PBI-23 check', 'Optibase fails in Safari', 'Found while testing PBI-23 (30 Sep): in WebKit (Safari\'s engine) Optibase\'s initialize call (app.optibase.io/api/script/initialize) answers 400 on every page tested, before and after PBI-23; Chromium is fine. If an A/B test is live, Safari visitors may not enter it. Please check in the Optibase dashboard (shared account: nothing changed by Claude).', 'PBI-23']
    ,['D27', 'PBI-24 check', 'Bing tag sends sample contact data', 'Found in the close-out (30 Sep): a custom-HTML tag in the shared GTM container (GTM-PTLMPVGH, tag 55) sends Microsoft\'s sample values to Microsoft Ads for every visitor: uetq.push("set", {pid: {em: "contoso@example.com", ph: "+14250000000"}}). The container is shared, so the live start/enroll pages very likely do the same. Enhanced-conversion matching then sees one fake person. Fix in GTM: remove that set call, or fill it with the real submitted email and phone only on the form\'s success. Nothing changed by Claude (shared account).', 'PBI-24']
  ],

  manual: [
    ['M1', 'Give the Webflow connector access to the staging project', 'Done 27 Sep'],
    ['L2', 'Site settings → Publishing → minify HTML, CSS and JS (not in the API)', 'Open'],
    ['L2 · PBI-23', 'Site settings → Fonts: remove DM Mono and PT Mono (loaded on every page, used on none; the H1 font, which sets LCP, then arrives sooner)', 'Open'],
    ['L2 · PBI-23', 'GTM: fire the Nextdoor pixel (and other non-essential tags) on Window Loaded or first interaction; it took up to 2.4 s of main thread in one run (shared container)', 'Open'],
    ['G32', 'Mouseflow input masking; Tidio and Optibase privacy review (shared accounts)', 'Open'],
    ['G9', 'Data-processing agreement / CRM routing for the lead data', 'Open'],
    ['G15 · G21b', 'GTM: form_submit only on success; call clicks as one key event (shared container)', 'Open'],
    ['G2', 'Old-domain duplicates and redirects on start.credolegal.com (old site)', 'Open'],
    ['M2', 'Delete the 21 old drafts in Webflow (Pages panel: the 21 top-level draft pages whose names end in "(old design)", slugs {slug}-old: ohio, kentucky, utah, south-dakota, missouri, kansas, california, minnesota, maryland, colorado, new-york, new-jersey, florida, letter, medical-debt-attorney, debt-harassment-act-fast, multiple-collectors-more-money, payday-loan-fight-back, payday-loan-debt-rights, payday-loan-lawsuit-proof, payday-loan-lawsuit-respond). The API cannot delete pages. D18', 'Not needed: operator 30 Sep, the drafts stay unpublished (D18)'],
    ['M3', 'CRM check (PBI-08): a staging lead now carries fbclid (new field) and keeps utm_source/medium/campaign and gclid on a return visit; confirm the CRM maps or ignores fbclid and stores the return-visit values', 'Open'],
  ]
};
