/* Staging fix backlog — single source of truth for the board (index.html) and the other pages.
 * Source: content/research/staging-fix-plan-2026-09-27.md, built from the LP audit
 * (content/research/lp-webflow-audit-2026-09-22.md, last updated 24 Sep).
 *
 * Board rule (WIP limit of one): each row is a PBI; its tasks move across To do → Doing → Done.
 * Only ONE row may have tasks in Doing at any time: the whole team swarms on that PBI.
 * Task status: 'todo' | 'doing' | 'done'. PBI `by`: 'claude' | 'likely' | 'decision' | 'manual'.
 * `blocked` names the decision (D#) or manual step (M#) a PBI waits on. */
window.BACKLOG = {
  updated: '27 Sep 2026',
  state: 'PBI-01 done 27 Sep (D12 accepted). Next unblocked item: PBI-04, mask form inputs in session recordings.',
  site: { name: 'Credo: Microsite Staging', id: '6ab90fb0761d44332faf21c8', domain: 'staging.credolegal.com' },

  pbis: [
    { id: 'PBI-00', title: 'Baseline and safety net', refs: [], by: 'claude',
      why: 'Every later change can be rolled back, and we can prove enroll and start were never touched.',
      done: 'Backup saved; enroll + start fingerprints recorded; lpcheck baseline report for the 30 staging pages.',
      tasks: [
        ['Confirm the staging site id and that its only domain is staging.credolegal.com', 'done'],
        ['Back up site + page custom code, registered scripts, page settings/SEO, styles and element trees', 'done'],
        ['Fingerprint all 30 pages on enroll and start', 'done'],
        ['Run lpcheck on the 30 staging URLs (baseline report)', 'done']
      ] },

    { id: 'PBI-00b', title: 'Remove dead-weight pages', refs: [], by: 'claude',
      why: '10 pages in the staging project with no traffic and no purpose: test pages, an unpublished draft, the unused know-your-rights blog and four old landing pages already replaced. All 13 state pages are kept (your call, 27 Sep).',
      done: 'The 8 pages set to draft and the 4 blog articles unpublished on staging only (reversible); they return 404; every kept page and all 30 landing pages still load; enroll and start unchanged.',
      tasks: [
        ['Back up the pages and CMS items being removed', 'done'],
        ['Set test, test-page, know-your-rights, wage-garnishment-rights, medical-debt-harassment, medical-debt-errors, wage-garnishment-attorney-active and remove-property-lien to draft', 'done'],
        ['Unpublish the 4 know-your-rights articles', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify: removed pages 404, kept pages 200, enroll and start fingerprints unchanged', 'done']
      ] },

    { id: 'PBI-01', title: 'Clean the page code', refs: ['L1', 'G30', 'G31'], by: 'claude', note: 'W1 (move to Site settings) split out as PBI-01d: it would add GTM to the thank-you pages.',
      why: 'Removes the script error and the calls to videsigns-staging.co.uk, the duplicate GTM loader and dead code, without touching pages whose old form still needs it.',
      done: 'Dead or duplicate code gone where it is dead; form walk, phone numbers, tracking fields and tags unchanged; enroll and start unchanged; independent review settled.',
      tasks: [
        ['Read the site and page custom code on all 53 live pages with code', 'done'],
        ['Find the 21 pages whose old form still uses multi-step.js, #submitBtn, #phone-number and Font Awesome (left as they are)', 'done'],
        ['Remove the duplicate GTM loader (52 pages); multi-step.js, Font Awesome, dead validators and the localStorage UTM copy (30 landing pages + home)', 'done'],
        ['Shadow test before writing: old vs new code, 3 browsers', 'done'],
        ['Publish to staging only', 'done'],
        ['Verify: 83/83 code blocks served as intended; 30 pages × 8 devices (form 240/240, phones 344/344); tracking on 52 pages; enroll and start unchanged', 'done'],
        ['Independent review: packet to GPT; 14 findings settled with before/after tests (see Independent reviews)', 'done']
      ] },

    { id: 'PBI-01b', title: 'One UTM mechanism', refs: ['G31'], by: 'claude',
      why: 'Three overlapping UTM scripts (host cookies, .credolegal.com cookies, localStorage + URL rewrite) decide which phone number and tracking values a returning visitor gets.',
      done: 'One mechanism; a test matrix (first visit, return visit, no-query revisit, navigation, cross-subdomain) identical to today on every page type.',
      tasks: [
        ['Map what each mechanism writes and who reads it', 'todo'],
        ['Return-visit / cross-subdomain test matrix on the current code (baseline)', 'todo'],
        ['Remove the redundant mechanisms; keep one', 'todo'],
        ['Publish to staging only; re-run the matrix', 'todo']
      ] },

    { id: 'PBI-01c', title: 'Old-form pages: multi-step.js and the videsigns-staging call', refs: ['L1'], by: 'decision', blocked: 'D11',
      why: 'The 21 state and old landing pages still load multi-step.js (it shows their form one step at a time) and it posts to videsigns-staging.co.uk.',
      done: 'Per D11: pages rebuilt in the new design, or the library replaced, so no page calls a staging server.',
      tasks: [
        ['Apply the D11 decision on staging', 'todo'],
        ['Publish to staging only and verify the forms step by step', 'todo']
      ] },

    { id: 'PBI-01d', title: 'Move shared page code to Site settings', refs: ['W1'], by: 'decision', blocked: 'D10',
      why: 'Site code loads on every page; 7 pages (thank-you, 401, 404, CMS templates) load no GTM today. Moving GTM site-wide would start it on the thank-you pages.',
      done: 'GTM trigger setup known; shared code moved without double-counting conversions.',
      tasks: [
        ['Check in GTM whether thank-you page views count as conversions (D10)', 'todo'],
        ['Move the shared code; publish to staging only; verify tags', 'todo']
      ] },

    { id: 'PBI-02', title: 'Lead form destination for staging', refs: ['G9'], by: 'decision', blocked: 'D1',
      why: 'Staging still posts to the production formspree form, so a manual test lead enters the real pipeline.',
      done: 'Staging form posts to the chosen destination; a test lead arrives there and nowhere else; the success page still shows.',
      tasks: [
        ['Set the form action on staging to the chosen destination', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Send one test lead and confirm where it lands', 'todo']
      ] },

    { id: 'PBI-03', title: 'Consent line under the submit button', refs: ['G10'], by: 'decision', blocked: 'D2',
      why: 'No TCPA/SMS consent or "not legal advice" line at the form.',
      done: 'Counsel-approved text (or required checkbox) under the button on all 26 form pages, passing contrast.',
      tasks: [
        ['Add the form-consent paragraph (or checkbox) on each page', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify text, link and contrast', 'todo']
      ] },

    { id: 'PBI-04', title: 'Mask form inputs in session recordings', refs: ['G32'], by: 'claude',
      why: 'Clarity and Mouseflow record sessions on a form that collects PII.',
      done: 'data-clarity-mask on the form on staging. Mouseflow masking and the Tidio/Optibase review stay manual (shared accounts).',
      tasks: [
        ['Add data-clarity-mask="true" to the form block on each page', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify the attribute is served', 'todo']
      ] },

    { id: 'PBI-05', title: 'Sticky call bar never covers the form', refs: ['G19'], by: 'claude',
      why: 'On 21 pages the bar covers Continue on the first phone screen during business hours.',
      done: 'At 390×844 inside business hours: no bar while the form is on screen or the pop-up is open; bar appears after scrolling past the form.',
      tasks: [
        ['Hidden-by-default styles for .sticky-call-button', 'todo'],
        ['IntersectionObserver on the step-1 form card', 'todo'],
        ['Hide while body.mj-popup-open', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify on phone sizes with the clock inside business hours', 'todo']
,
        ['Independent review: packet to GPT; findings settled', 'todo']
      ] },

    { id: 'PBI-06', title: 'Tracked phone number in the mobile header', refs: ['G25'], by: 'likely',
      why: 'On phones the call link is hidden behind the menu button.',
      done: 'Tracked number and a "Free review" button visible in the mobile header; phone swap updates it per utm_source.',
      tasks: [
        ['Confirm on one page that the API can add the mobile-only link outside the Nav Menu', 'todo'],
        ['Apply to all pages; add its id to the phone-swap list', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify numbers per utm_source on phones', 'todo']
,
        ['Independent review: packet to GPT; findings settled', 'todo']
      ] },

    { id: 'PBI-07', title: 'Phone and ZIP fields open the number pad', refs: ['F1'], by: 'likely',
      why: 'The phone field is type="text", so phones show the letter keyboard.',
      done: 'Phone input is type="tel", ZIP has inputmode="numeric"; formatting still works.',
      tasks: [
        ['Confirm on one page that the field type can be set through the API', 'todo'],
        ['Apply to all form pages', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify with lpcheck (form fields) and a form walk', 'todo']
      ] },

    { id: 'PBI-08', title: 'Capture the Meta click id (fbclid)', refs: ['G20'], by: 'claude',
      why: 'A typo stores "fbclig", and the form has no fbclid field.',
      done: '?fbclid=test123 reaches the cookie and the hidden fbclid field.',
      tasks: [
        ['Fix fbclig → fbclid in the UTM block', 'todo'],
        ['Add the hidden fbclid field (API, or one Designer copy-paste)', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Test with ?fbclid=test123', 'todo']
,
        ['Independent review: packet to GPT; findings settled', 'todo']
      ] },

    { id: 'PBI-09', title: 'Dropdown options stored in Webflow', refs: ['F2'], by: 'likely',
      why: 'The prototype options appear only because a script rebuilds the dropdowns on load.',
      done: 'Count, security and stage options stored in Webflow; the G17 rewrite script removed; form walk passes.',
      tasks: [
        ['Confirm on one page that select options can be set through the API', 'todo'],
        ['Set the three dropdowns on all pages', 'todo'],
        ['Remove the G17 rewrite block', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify the options on every page', 'todo']
,
        ['Independent review: packet to GPT; findings settled', 'todo']
      ] },

    { id: 'PBI-10', title: 'Slider label and unique element ids', refs: ['F3', 'F4'], by: 'claude',
      why: 'The amount slider has no label; step markers, formstep2 and the debt-type checkboxes repeat ids.',
      done: 'axe finds no unlabelled slider; no duplicate ids; form still works.',
      tasks: [
        ['Check which scripts read these ids', 'todo'],
        ['aria-label on #mjSlider; unique ids for checkboxes and step markers', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify with lpcheck (axe, duplicate ids, form walk)', 'todo']
      ] },

    { id: 'PBI-11', title: 'Statute citations keep their case', refs: ['G18'], by: 'claude',
      why: '"§ 1692e(2)" displays as "§ 1692E(2)" on all 30 pages (179 citations).',
      done: 'Every citation displays as typed; word tags match the prototype.',
      tasks: [
        ['Capitalize: None on the mjfdcpaboxtext family (merge into one class)', 'todo'],
        ['Retype the word tags shown in mixed case in the prototype', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Check each page\'s citation list from the audit', 'todo']
      ] },

    { id: 'PBI-12', title: 'Page-specific copy fixes', refs: ['Part B'], by: 'claude',
      why: 'Rights lines from another vertical on fdcpa-attorney, and small text differences on four pages.',
      done: 'Each page\'s Part B items match the prototype.',
      tasks: [
        ['debt-harassment-fdcpa-attorney: six rights summary lines from the prototype', 'todo'],
        ['wage-garnishment-attorney: how-it-works step titles', 'todo'],
        ['debt-harassment-violations: tag RIGHT → Remedy, headline full stop', 'todo'],
        ['medical-debt-credit-report-removal: tag → Violation, sub-headline punctuation', 'todo'],
        ['credit-card-debt-challenge: remove the empty <em> in the H1', 'todo'],
        ['Publish to staging only and verify', 'todo']
      ] },

    { id: 'PBI-13', title: 'Meta descriptions within 160 characters', refs: ['G3'], by: 'claude',
      why: 'All 26 descriptions run 162–249 characters.',
      done: 'The approved text from the audit on each page, identical in meta, og: and twitter: descriptions.',
      tasks: [
        ['Write the approved texts to the 26 pages\' SEO settings', 'todo'],
        ['Set og:description to "same as SEO"', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify the served head tags', 'todo']
      ] },

    { id: 'PBI-14', title: 'Schema: LegalService and FAQPage', refs: ['G6'], by: 'claude', note: 'Twitter handle waits on D9',
      why: 'The JSON-LD says Florida, points at the homepage and uses production assets; no FAQPage.',
      done: 'One site-wide LegalService (P.C., 1 Liberty Street, staging-hosted logo) and a valid FAQPage per page.',
      tasks: [
        ['Site-wide LegalService block', 'todo'],
        ['Remove the old per-page LegalService blocks', 'todo'],
        ['Build a FAQPage per page from its own FAQs', 'todo'],
        ['Remove or replace the @handle placeholder (D9)', 'todo'],
        ['Publish to staging only and validate the JSON-LD', 'todo']
,
        ['Independent review: packet to GPT; findings settled', 'todo']
      ] },

    { id: 'PBI-15', title: 'Colour and contrast', refs: ['L3', 'G26', 'G27'], by: 'claude',
      why: 'Pale text fails contrast (worst: "or call" at 1.6:1); body text lighter and greyer than the prototype.',
      done: 'axe finds no contrast failures; colour variables ink / muted / secondary in use.',
      tasks: [
        ['Create the colour variables', 'todo'],
        ['Point the failing classes at secondary #6a7688', 'todo'],
        ['Body font and colour; weights 300 → 400, eyebrows 600', 'todo'],
        ['Publish to staging only', 'todo'],
        ['Verify with lpcheck (axe) and screenshots', 'todo']
,
        ['Independent review: packet to Gemini; findings settled', 'todo']
      ] },

    { id: 'PBI-16', title: 'Mobile type scale and text case', refs: ['G24', 'G22', 'L4'], by: 'claude',
      why: 'Mobile H1 52px vs the prototype\'s 32px; intro paragraph in Title Case; 10–11px labels.',
      done: 'Mobile sizes match the prototype; no text under 12px on phones.',
      tasks: [
        ['Mobile-portrait sizes for the H1 and section headlines', 'todo'],
        ['Form-question line height 1.3', 'todo'],
        ['Intro paragraph Capitalize: None', 'todo'],
        ['Step labels and rights tags to 12px', 'todo'],
        ['Publish to staging only and verify', 'todo']
,
        ['Independent review: packet to Gemini; findings settled', 'todo']
      ] },

    { id: 'PBI-17', title: 'Form card, bottom CTA and page width', refs: ['G27', 'G28', 'L6'], by: 'claude',
      why: 'Card border instead of shadow; "or call" inside the card; bottom CTA centred; page wider than the screen.',
      done: 'Card and bottom CTA match the prototype; no sideways overflow on any device.',
      tasks: [
        ['Card: remove the border, add the soft shadow', 'todo'],
        ['Move the "or call" block below the card', 'todo'],
        ['Bottom CTA: left-align, headline max width', 'todo'],
        ['Fix the poition typo and the missing }', 'todo'],
        ['Publish to staging only and verify', 'todo']
,
        ['Independent review: packet to Gemini; findings settled', 'todo']
      ] },

    { id: 'PBI-18', title: 'Red accent word in the H1', refs: ['G23'], by: 'likely',
      why: 'The prototype H1 has one red accent word; live H1s are plain.',
      done: 'Accent span on each page\'s listed word; bottom CTA uses the same class; the recolour script removed.',
      tasks: [
        ['Confirm on one page that an inline span can be added through the API', 'todo'],
        ['Create the accent class', 'todo'],
        ['Wrap each page\'s accent word', 'todo'],
        ['Remove the ctaheading recolour script', 'todo'],
        ['Publish to staging only and verify', 'todo']
,
        ['Independent review: packet to Gemini; findings settled', 'todo']
      ] },

    { id: 'PBI-19', title: 'Small polish', refs: ['L5', 'G29'], by: 'claude',
      why: 'Call links under 24px tall; "Week 1" in mixed case on 21 pages.',
      done: 'No tap target under 24px; step tags in the same case.',
      tasks: [
        ['Padding on the call links and the BBB link', 'todo'],
        ['"Week 1" to the step-tag case on 21 pages', 'todo'],
        ['Publish to staging only and verify', 'todo']
      ] },

    { id: 'PBI-20', title: 'CTA labels', refs: ['G16'], by: 'decision', blocked: 'D3',
      why: 'Four CTA labels in use; two were asked for.',
      done: 'Only the two agreed labels on all pages.',
      tasks: [
        ['Set the agreed labels on every CTA', 'todo'],
        ['Publish to staging only and verify', 'todo']
      ] },

    { id: 'PBI-21', title: 'The four payday-content pages', refs: ['Part B'], by: 'decision', blocked: 'D4',
      why: 'collection-defense, credit-cards, fcba-and-fdcpa and stop-wage-garnishment show the payday page.',
      done: 'Per D4: drafted/unlisted on staging, or rebuilt with approved copy.',
      tasks: [
        ['Apply the D4 decision on staging', 'todo'],
        ['Publish to staging only and verify', 'todo']
      ] },

    { id: 'PBI-22', title: 'Call-click tracker listens to the real links', refs: ['G21a'], by: 'decision', blocked: 'D6',
      why: 'The tracker waits for ids that don\'t exist, so it never fires.',
      done: 'Clicks on the real call links reach the tracker (only once D6 allows staging to post to the production backend).',
      tasks: [
        ['Give the sticky bar link an id', 'todo'],
        ['Point the tracker at the real call-link ids', 'todo'],
        ['Publish to staging only and verify', 'todo']
      ] },

    { id: 'PBI-23', title: 'Performance on phones', refs: ['L2'], by: 'claude', note: 'Tidio waits on D8, recorder on D5, minify is manual',
      why: 'Lighthouse 37–56 and main content after 9–15 s on a mid-range phone.',
      done: 'Lighthouse re-run on staging, compared with the baseline.',
      tasks: [
        ['Confirm the removals from PBI-01 are live', 'todo'],
        ['Lazy-load or remove Tidio (D8)', 'todo'],
        ['Keep one session recorder (D5)', 'todo'],
        ['Minify HTML/CSS/JS (manual toggle in Site settings)', 'todo'],
        ['Publish to staging only; Lighthouse before/after', 'todo']
      ] },

    { id: 'PBI-24', title: 'Close-out', refs: [], by: 'claude',
      why: 'Proof of the result and a clean hand-over for production.',
      done: 'Full lpcheck vs baseline; enroll and start fingerprints unchanged; change log for porting to production.',
      tasks: [
        ['Full lpcheck on the 30 staging pages vs the baseline', 'todo'],
        ['Re-fingerprint enroll and start: must be unchanged', 'todo'],
        ['Change log per item (what changed, where in Webflow)', 'todo']
,
        ['Independent review: packet to GPT + Gemini; findings settled', 'todo']
      ] }
  ],

  decisions: [
    ['D1', 'G9', 'Where the form posts', 'Webflow native forms, a first-party endpoint, or formspree with a DPA; and whether staging posts to a test destination meanwhile (recommended).', 'PBI-02'],
    ['D2', 'G10', 'Consent text', 'Counsel-approved wording, and whether express consent needs a checkbox.', 'PBI-03'],
    ['D3', 'G16', 'CTA labels', 'Which two labels to keep.', 'PBI-20'],
    ['D4', 'Part B', 'The four payday-content pages', 'Draft them on staging, rebuild with new copy, or leave them for production redirects.', 'PBI-21'],
    ['D5', 'G32', 'Session recorders', 'Keep Mouseflow, or remove it and rely on Clarity.', 'PBI-23'],
    ['D6', 'G21a', 'Call-click posting', 'May staging post call clicks to the production backend (credo.debtfixer.co) while testing?', 'PBI-22'],
    ['D7', 'F2', 'State list', 'Confirm North Carolina should stay removed from the state dropdown.', '—'],
    ['D8', 'L2', 'Tidio chat', 'Is chat staffed? Lazy-load it, or remove it.', 'PBI-23'],
    ['D9', 'G6', 'Twitter/X handle', 'Credo\'s real handle, or delete the @handle placeholder.', 'PBI-14']
    ,['D10', 'W1', 'GTM on thank-you pages', 'Does GTM count thank-you page views as conversions? Needs someone with GTM access. Decides whether shared code can move to Site settings.', 'PBI-01d'],
    ['D11', 'L1', 'Old-form pages', 'Rebuild the 21 state and old landing pages in the new design, or replace the multi-step library, so no page calls videsigns-staging.co.uk.', 'PBI-01c'],
    ['D12', 'PBI-01', 'ZIP error message', 'Decided 27 Sep: accepted. An invalid ZIP now shows one message ("Please enter valid 5 digit zip code") instead of two.', 'PBI-01']
  ],

  manual: [
    ['M1', 'Give the Webflow connector access to the staging project', 'Done 27 Sep'],
    ['L2', 'Site settings → Publishing → minify HTML, CSS and JS (not in the API)', 'Open'],
    ['G32', 'Mouseflow input masking; Tidio and Optibase privacy review (shared accounts)', 'Open'],
    ['G9', 'Data-processing agreement / CRM routing for the lead data', 'Open'],
    ['G15 · G21b', 'GTM: form_submit only on success; call clicks as one key event (shared container, production)', 'Open'],
    ['G2', 'Old-domain duplicates and redirects on start.credolegal.com (production)', 'Open']
  ]
};
