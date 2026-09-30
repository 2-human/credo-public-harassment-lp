# Review packet: PBI-16 · mobile type scale and text size

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
  51 landing pages share components; the home page has its own copy of the form and sections. Phone = 390px wide.
- Audit G24/L4 and the prototype: at 390px the H1 was 52px (prototype 32px), section headlines 42px (prototype 26px),
  wrapped form questions had a 44px line height, the form step labels were 10px and the statute citations/tags 11px.
- Each landing page's page head code carries a "heading fix" `<style>` (from P1) that sets `line-height: 44px` on
  `.heading-47` and the section headline classes at every width; it loads after Webflow's CSS.

## Change (published to staging only, 30 Sep)
1. Webflow class styles: `Heading 46` (H1) at mobile portrait (≤479px) 32px / line height 1.05; `Heading 47` +
   `lp-question` line height 1.3; `mjfdcpaboxtext` (statute citations and rights tags) 11px → 12px.
2. The commented `<style>` block at the top of the site head (introduced in PBI-15 for duplicated class names), new
   rules: step labels and step numbers 12px (`body .stl, body .stn`; their embeds set 10–11px); `body .heading-47`
   line height 1.3 (covers the home page, which has no `lp-question` class); at ≤479px section headlines
   (`mjthankyouheading`, `mjthankyouheading Copy`) 26px / 1.2 and the rights rows stacked (citation + label above the
   text, `grid-template-columns: 1fr !important`, needed because Webflow sets the row grid per element by ID).
   The `body` prefix beats the page-head heading fix without `!important`.
3. Moved, not done here: "one citation class and one label class, labels typed normally" (from the PBI-11 review). It
   changes nothing visible (the labels already render in capitals) and means retyping about 500 props on 51 pages; it
   belongs to the class consolidation (DS-8).

## Evidence
- **Phone check, all 52 form pages at 390px:** text under 12px: **0** on every page (was: step labels 10px, step
  numbers 10px, citations 11px); H1 32px / 33.6px; section headlines 26px / 31.2px; form question 18px / 23.4px (was
  44px); rights rows one column (350px); horizontal overflow 0.
- Functional spot check (4 pages incl. home, /letter, a state page; 1440 + 390): form walk, payload, trackers, phones,
  links, text identical; only computed styles differ (intended).
- Head code write-back read back byte-identical (only the new rules added).
- Screenshots, before → after at 390px: `P16-hero-phone-*`, `P16-whatwedo-phone-*`, `P16-rights-phone-*`,
  `P16-faq-phone-*` (debt-harassment-stop-calls), `P16-home-hero-phone-*`; desktop hero `P16-hero-desktop-*`.
- Known trade-off: at 390px the 12px step labels "YOUR SITUATION" / "YOUR DETAILS" wrap to two lines inside the
  progress bar (the bar grows from about 32 to 44px).

## Questions for the reviewer
1. Does the phone type scale read as intended (hierarchy, spacing), and is the stacked rights row better?
2. Is the two-line step label acceptable, or should the labels shorten/hide on phones?
3. Any concern with the `body`-prefixed overrides in the site head versus editing 51 page heads?
