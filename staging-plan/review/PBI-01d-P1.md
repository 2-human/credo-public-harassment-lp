# Review packet: PBI-01d P1 · shared page code moved into Site settings

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there. The form posts to formspree.
- Since the design was consolidated, the 50 landing pages share one 11-section skeleton. The same form and form code
  are on 52 pages (50 landing pages + home + /letter).
- Before this change, every one of those 52 pages carried its **own copy** of the same page custom code:
  - **Head code:** meta tags, the LegalService JSON-LD, Finsweet queryparam, Inputflow, the Facebook domain verification,
    the Mouseflow loader, the GTM loader, a `#gtmform` submit guard and a "heading-fix" `<style>`.
  - **Footer code:** nav/mobile CSS, session cookies on `.credolegal.com` for utm_*/gclid, decoration of credolegal.com
    links with those cookies, and the colouring of the word "decision".
  - **A page-applied registered script** `RemoveStateOptions`, which removes two options from `#n-state`.
- The system pages carry no page code today, so they load **no GTM and no Mouseflow**:
  404, 401, /thank-you, and the CMS template for /page/thank-you and /page/already-submitted.
  Whether GTM should run on the thank-you pages is an open operator decision (D10).
- Operator decisions for this change:
  - Make the code shared before the design polish.
  - Align with D16: every page gets `noindex, nofollow` and a self canonical. The 8 pages rebuilt last said `index, follow`
    with the canonical pointing at the home page.

## Change (published to staging only, 29 Sep)
1. **Site head code:** the shared head code is appended after the existing site code. The existing site code is unchanged,
   and the order is the same as before, because Webflow emits site code before page code.
   A system-page check comes first:
   `window.credoSystemPage = [<404, 401, /thank-you, Site Pages template page ids>].indexOf(document.documentElement.getAttribute('data-wf-page')) !== -1;`
   Mouseflow, GTM and the `#gtmform` guard are wrapped in `if (!window.credoSystemPage) { … }`, so they still load on
   exactly the pages they loaded on before. The meta tags, JSON-LD, Finsweet and Inputflow are static.
2. **Site footer code:** the shared footer code is appended (again after the existing code, the same order as before).
   - Its CSS is unchanged; it was measured to change nothing on the home page or the system pages.
   - Its 3 scripts are wrapped in the same check, verbatim otherwise.
3. **Registered script** `RemoveStateOptions` 1.0.0 is now applied site-wide in the footer, right after the site-applied
   `FormSubmitDataLayer`, the same position it had before. It is removed from the 52 pages. It does nothing on a page
   without `#n-state`.
4. **Page code on the 52 pages** is now only:
   - `robots` (now `noindex, nofollow` on all 52);
   - `canonical` and `og:url` (self);
   - the heading-fix `<style>`, on 51 pages. It stays per page because the same classes on the home page and the
     thank-you pages would change (43 elements measured on the home page). Turning it into proper classes is a later
     design-system item.
5. **Dropped, each for a stated reason:**
   - A second `twitter:card` and a second `og:type` on the pages: Webflow already outputs both.
   - `twitter:site "@handle"`: a placeholder.
   - Stale second `twitter:title`/`twitter:description` on 22 pages, which conflicted with the ones Webflow generates.
   - Font Awesome on the 21 rebuilt pages: 0 elements render with it, including pseudo-elements.
   - The CSS for `.addressmj`, an element no longer on the page.
   The build script accounts for every line of every page's old code: moved, kept or dropped. Anything else stops it.

Shared code excerpt (site head, appended):
```html
<meta name="author" content="Credo Legal">
<meta property="og:site_name" content="Credo Legal">
<meta name="twitter:image" content="…Credo Logo Red.png">
<meta name="facebook-domain-verification" content="…" />
<script type="application/ld+json">{ "@type": "LegalService", … }</script>
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-queryparam@1/queryparam.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/inputflow-tools/library@1/i.js"></script>
<script>window.credoSystemPage = ["…21a3","…21b7","…21b8","…2201"].indexOf(document.documentElement.getAttribute('data-wf-page')) !== -1;</script>
<script type="text/javascript">if (!window.credoSystemPage) { /* Mouseflow loader, verbatim */ }</script>
<script>if (!window.credoSystemPage) { /* GTM loader GTM-PTLMPVGH, verbatim */ }</script>
<script>if (!window.credoSystemPage) { /* #gtmform submit guard, verbatim */ }</script>
```
Site footer, appended: the page CSS as is, then the 3 page scripts, each as `<script>if (!window.credoSystemPage) { …verbatim… }</script>`.
The first of those scripts declares `function getURLParameter` and `function setCookie` inside the `if` block. That is
sloppy mode, so Annex B hoisting applies, and they are still assigned as globals when the block runs.

## Evidence
- **Before writing:** a shadow test on all 56 published pages, desktop 1440 and phone 390.
  Each page was loaded as served, and again with the proposed code swapped in. Compared: tracker requests (answered
  locally), dataLayer, console errors, computed styles of every element, visible text, link targets, phone links,
  cookies, and the fields the form POSTs (form walked; POST answered locally).
  - **52 form pages: identical on every measure, at both widths.** The form sends the same 412-byte payload.
  - 4 system pages: the only difference is that Finsweet and Inputflow now load. Style, text, links and cookies are
    identical; GTM and Mouseflow are absent, as before.
- **After writing:** the site code was read back through the API, head and footer byte-identical to the intended files.
  The page code read back as intended; page scripts are empty.
- **After publishing (staging only):** the served HTML of all 56 pages was compared with the expected HTML (the page
  before the change, with the same substitutions applied). Result: **56/56 identical**, apart from the publish stamp and
  webflow.js.
  - Webflow rebuilt its own runtime `webflow.js` on this publish: new hash and new minified build, 58.4 → 57.7 KB. This is
    platform-side, not part of the change. It is covered by the live run below.
- **Live run after publishing:** the saved pre-change page vs the live page, same measures as the shadow test.
  Result: **52/52 form pages identical at both widths** (the form sends the same payload on all 52). new-york showed a sub-pixel width change (0.015 px) once and was identical on 2 re-runs, so that was timing noise. The 4 system pages: only Finsweet/Inputflow added, as in the shadow test.
- **Rollback:** API backups of all site and page code, plus REVERT.md.

## Questions for the reviewer
1. Is the system-page check reliable? `data-wf-page` is read from `<html>` while `<head>` is parsed. Could it be missing
   or different, for example on the 404 page, the 401 password page, or the CMS template's two URLs?
2. Can wrapping the footer scripts in `if (…) { }` change their behaviour on the 52 pages? Consider the function
   declarations in a block, hoisting, and the timing of the DOMContentLoaded listeners.
3. Could moving code from page settings to site settings change execution order in a way that matters? Site code has
   always come first; the moved code is appended at the end of each site block.
4. Anything wrong with the static parts (meta, JSON-LD, Finsweet, Inputflow) now also loading on the 5 system pages?
5. Risks from the dropped items: duplicate `twitter:*` and `og:type`, `twitter:site "@handle"`, and Font Awesome on 21 pages.
6. Is the switch to `noindex` + self canonical on the 8 pages done correctly (operator decision, aligned with D16)?
