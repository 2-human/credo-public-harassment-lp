# Review packet: PBI-04 · Mask form inputs in session recordings

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. Work happens on a **staging clone** only: Webflow site
  `6ab90fb0761d44332faf21c8`, only domain `staging.credolegal.com`. Production (`start.credolegal.com`) and the developer's
  staging (`enroll.credolegal.com`) are separate Webflow sites and must not change.
- Microsoft Clarity (session recording) is loaded on the pages through Google Tag Manager. Clarity does not record the
  content of any element that has the attribute `data-clarity-mask="true"`, or of anything inside it.

## Audit item
**G32** The lead form collects name, phone, email, address, date of birth and debt details. Session recordings could capture
what visitors type. Clarity's own masking should exclude the form.

## What changed (published to staging only, 27 Sep)
- The attribute `data-clarity-mask="true"` was added, through the Webflow Data API, to the form wrapper element
  (Webflow "Form Block", the `div.w-form` around each `<form>`):
  - on 31 pages where the form is a page element;
  - inside 2 shared components that hold the form on the other pages: `Hero-Form` (2 form wrappers) and
    `Hero-Form-For-New-Pages` (2 form wrappers). A component change applies to every page using that component.
- No other element, style, script or setting was changed. The Clarity and GTM accounts were not touched (shared accounts).
- Mouseflow (a second recorder, also loaded) was **not** changed: its masking is an account setting, left to the operator.

## Evidence
1. **Served HTML, re-checked 28 Sep**, all 57 published pages: 53 pages contain a form, 74 `<form>` elements in total.
   73 of 74 are inside an element with `data-clarity-mask`. The one unmasked form is Webflow's password page (`/401`),
   which loads neither GTM nor Clarity (no `clarity` or `googletagmanager` reference in its HTML).
2. **Recording payload check, 27 Sep:** in a browser session on staging, test text was typed into the form fields
   (not submitted) and Clarity's upload requests were captured: the typed text did not appear in them.
3. After the change, 27 Sep: a smoke run of the cross-browser checker on 3 pages (home, debt-harassment-stop-calls,
   wage-garnishment-prevention) × Chrome desktop, Firefox desktop, iPhone 15: HTTP 200, form walk and phone checks as before.
   The full regression run that followed later the same evening (with this change live, as part of the next item) covered
   all 30 landing pages × 5 devices: form walk to the submit step 150/150, phone numbers vs the campaign sheet 254/254.
4. **Isolation, re-checked 28 Sep:** enroll.credolegal.com and start.credolegal.com, 30 pages each, byte-identical
   (sha256) to the fingerprints taken before any change.

## Conclusions to challenge
1. Every lead form on staging is excluded from Clarity recordings.
2. Nothing else on the pages changed (layout, form behaviour, tracking).
3. Nothing outside the staging site changed.
