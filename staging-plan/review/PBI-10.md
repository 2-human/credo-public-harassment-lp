# Review packet: PBI-10 · slider label and unique element ids

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`). The 3-step lead form lives in two shared components (`LP · Hero` = step 1
  card with the debt-amount slider; `LP · Lead form` = the pop-up with steps 2–3) on 51 landing pages; the home page
  has its own copy of the same form.
- Audit findings F3/F4: the debt-amount range slider (`#mjSlider`, inside an HTML embed) has no accessible name, and
  every form page repeats ids: `step-1`/`step-2`/`step-3` (the step indicator is repeated in each of the 3 steps),
  `formstep2` (the step-2 wrapper and an inner field block), and `Debt-Type` (all 6 debt-type checkboxes).

## Change (published to staging only, 30 Sep)
1. Slider: `aria-label="How much do you currently owe in total?"` (the visible question above it) on `#mjSlider`, in
   the Hero component's embed and the home page's embed. Nothing else in the embed changed.
2. Step indicators: the `id="step-1/2/3"` attributes removed from the three step-indicator embeds (component and home).
   No script or style uses them (searched: served HTML, site head/footer code, the shared CSS bundle).
3. Checkboxes: ids `Debt-Type-1` … `Debt-Type-6` (name `Debt-Type` unchanged; the scripts select them by name).
4. The inner step-2 field block: id `formstep2` → `formstep2-fields`. The popup script's `getElementById('formstep2')`
   returns the first element, the step-2 wrapper, which keeps its id; the only CSS rule on `#formstep2` also carries
   the wrapper's own `w-node-…` class, so it never matched the inner block.

## Evidence
- **Served HTML, all 56 pages vs before:** the 52 form pages differ in exactly 33 lines each (the lines listed above);
  the 4 system pages are unchanged.
- **Duplicate ids:** before, 5 duplicated ids on each of the 52 form pages; after, **0 duplicated ids on all 56 pages**.
- **axe-core** (rules `label`, `aria-input-field-name`, `duplicate-id`, `duplicate-id-active`, `duplicate-id-aria`),
  pre-change vs live: before, every one of the 52 form pages had `duplicate-id` (5 nodes) and `label` (1 node: the slider); live, **no violations on 52/52**, and the slider's accessible name is the question text.
- **Functional comparison, live vs pre-change, 52 form pages × 1440 and 390** (form walked through all 3 steps incl.
  ticking a debt-type checkbox; POST answered locally; trackers, dataLayer, console errors, cookies, links, phones,
  computed styles): **identical on 104/104**; form payload 412 bytes on all 52 (the checkbox value still comes from its label; the name is unchanged). The first pass ran during a local network outage: 11 loads showed `ERR_INTERNET_DISCONNECTED` / `ERR_NETWORK_CHANGED` errors or a style difference; all 11 were identical on re-run (one page, the home page at 390, was re-run three more times: identical each time).
- **Interactions** (slider by keyboard, pop-up open/close from the step-1 card, `#herosec`/`#heropopup` anchors),
  pre-change vs live: **identical on 104/104** (52 pages × 1440 and 390): pop-up state, scroll position, slider value and visible form step after each action.
- **Visible change:** none (only attributes changed; computed styles identical on 104/104), so no UX review.

## Questions for the reviewer
1. Is `aria-label` matching the visible question the right accessible name for the slider (vs `aria-labelledby` to
   the heading), and should the slider also expose `aria-valuetext` (the formatted amount)?
2. Any risk in removing the step ids or renaming the inner `formstep2` / checkbox ids?
3. The checkbox labels are `<label>` wrappers around each input, with a `<span for="Debt-Type">` text (Webflow's
   markup); does that need changing?

## Round 2 (after the first reviews, 30 Sep)
- **Slider value announcement (GPT 2, Gemini Q1):** added `aria-valuetext` (initial `$8,000`) and one line in the
  slider's input handler that keeps it equal to the visible amount (`slider.setAttribute('aria-valuetext', formatted)`),
  in the Hero component and on the home page. A native range input already exposes min/max/now. Served HTML: exactly
  these 2 lines changed on the 52 form pages. Tested live by keyboard (3 pages): `$8,000` → Arrow Right `$9,000` →
  `$10,000` → End `$100,000+`, always equal to the visible amount. Interactions and the functional comparison re-run
  on 6 pages (incl. home and /letter): identical (12/12 each).
- **External code depending on the ids (GPT 4, 6, 8):** the published GTM container (`GTM-PTLMPVGH`, 508 KB) contains
  none of `step-1/2/3`, `formstep2`, `Debt-Type`, `mjSlider`, `debts`, `Debt-Security` (it does not reference the form
  by id at all). Site code, embeds and the CSS bundle were searched before. The form payload is identical, so nothing
  downstream sees a difference.
- **`<span for="Debt-Type">` (Gemini Q3):** the checkbox text is Webflow's `FormInlineLabel`; Webflow writes its `for`
  from the field name, and the API does not expose it. Browsers ignore `for` on a `<span>`; the association comes from
  the wrapping `<label>` (axe `label` passes on all 52 pages).
- **Real submission (GPT 9, Gemini):** waits on D1 (no test lead yet); payload identical.
- **Phones / tracking (GPT 10, 11):** this PBI changes attributes only; phones, `tel:` targets, cookies, tracker
  requests and dataLayer identical on 104/104 (facebook-source visit); the google-source phone matrix was run in PBI-09
  after the last change to anything phone-related.
- **Scope (GPT 15):** the Webflow project is the staging site only; the live start site is a separate project.
