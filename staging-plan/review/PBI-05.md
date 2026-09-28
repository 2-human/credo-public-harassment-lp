# Review packet: PBI-05 · Sticky call bar never covers the form

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. Work happens on a **staging clone** only: Webflow site
  `6ab90fb0761d44332faf21c8`, only domain `staging.credolegal.com`. Production (`start.credolegal.com`) and the developer's
  staging (`enroll.credolegal.com`) are separate Webflow sites and must not change.
- Site custom code (head/footer) loads on every page of the staging site (56 pages; 46 published).

## Audit item
**G19** On phones (≤768px wide), during business hours (Mon–Fri 9 AM–9 PM ET, Sat 9 AM–5 PM ET), a fixed "Call Now" bar
(`.sticky-call-button`, z-index 9999999, created by each page's phone-swap embed script) sits over the step-1 "Continue"
button on the first screen of many pages, and over the pop-up form (steps 2–3). The bar is the most-clicked call element,
so it should stay, but never cover the form.

## What changed (published to staging only)
One block appended to the **site footer code** (existing footer content kept byte-for-byte; verified in the served HTML).
This is the **final version (v2)**, after the GPT-5.5 review of v1: v2 adds the scroll-based fallback for browsers without
IntersectionObserver and checks `typeof window.IntersectionObserver === 'function'` (see the resolution file).

```html
<!-- PBI-05 (G19): the mobile sticky call bar never covers the form.
     Visible only while the step-1 form card is off screen and the pop-up form is closed.
     The bar itself is created by each page's phone-swap embed (business hours, <=768px); this only shows/hides it. -->
<style>
.sticky-call-button{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,visibility .2s ease}
.sticky-call-button.is-visible{opacity:1;visibility:visible;pointer-events:auto}
body.mj-popup-open .sticky-call-button{display:none!important}
</style>
<script>
(function () {
  function card() {
    var b = document.getElementById('openstep2'), s = document.getElementById('mjSlider');
    if (!b || !s) return null;
    var el = b.parentElement;
    while (el && !el.contains(s)) el = el.parentElement;
    return el;
  }
  function init() {
    var bar = document.querySelector('.sticky-call-button'), c = card();
    if (!bar) return;
    if (!c) { bar.classList.add('is-visible'); return; }   // no step-1 form on this page: behave as before
    if (typeof window.IntersectionObserver === 'function') {
      new IntersectionObserver(function (entries) {
        bar.classList.toggle('is-visible', !entries[0].isIntersecting);
      }).observe(c);
    } else {   // older browsers: same rule, measured on scroll
      var update = function () { var r = c.getBoundingClientRect(); bar.classList.toggle('is-visible', r.bottom <= 0 || r.top >= innerHeight); };
      addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
    }
  }
  // the bar is added on DOMContentLoaded by the page embed; run after it
  if (document.readyState === 'complete') init(); else window.addEventListener('load', init);
})();
</script>
```

Facts the code relies on (checked on the served pages):
- The bar is created inside a `DOMContentLoaded` handler of an inline embed script on each landing page and home (31 pages),
  only when `innerWidth <= 768` and within business hours. Other pages (state/old pages, thank-you, 404) have no bar.
- `#openstep2` is the step-1 "Continue" link; `#mjSlider` is the step-1 amount slider. Their smallest common ancestor is
  `div.div-block-37` (≈392px tall on a 390px-wide phone), i.e. the step-1 form card.
- The site head script adds `mj-popup-open` to `<body>` while the pop-up form (steps 2–3) is open and removes it on close.

## Evidence
1. **Shadow test before writing** (snippet appended to the served HTML), clock faked to Monday 2 PM ET, 3 pages
   (2 landing pages + home) × 390×844 Chromium, iPhone 15 (WebKit), Pixel 7, iPhone SE (WebKit), desktop 1440:
   - Today: bar shown at load, while scrolled, back at top, and while the pop-up is open; covers "Continue" on
     debt-lawsuit-attorney at 390×844 and debt-harassment-stop-calls on Pixel 7.
   - Proposed: hidden at load and back at top; shown when scrolled to 50% of the page; hidden while the pop-up is open;
     shown again after closing it and scrolling down; never covers "Continue" or the step-2 "Continue"; desktop unchanged (no bar).
     Exception by design: iPhone SE + home, where the card starts below the first screen, the bar shows until the card scrolls into view.
   - The bar's `tel:` link keeps each page's tracked number (e.g. meta number for `?utm_source=meta`).
2. **After publishing:** served HTML contains the previous site footer unchanged plus the new block; the block is present on
   pages without a bar (e.g. ohio), where `init()` exits because `.sticky-call-button` does not exist.
3. **Full run on all 31 pages with a bar:** see RESULTS.

## Conclusions to challenge
1. The bar can no longer cover the step-1 form card or the pop-up form on any phone size tested.
2. The bar still appears (and keeps its tracked number) once the visitor has scrolled past the form, and after closing the pop-up.
3. Pages without a bar, desktop, and outside business hours are unaffected.
4. Nothing outside the staging site changed.

## RESULTS
- **All 31 pages with a bar** (30 landing pages + home), after publishing, clock faked to Monday 2 PM ET (only `Date` replaced;
  real timers), 390×844 Chromium, iPhone 15, Pixel 7, iPhone SE, desktop (155 runs):
  - 390×844, iPhone 15, Pixel 7: 31/31 each: hidden at load → shown at 50% scroll → hidden back at top → hidden with pop-up
    open → shown after close + scroll. "Continue" never covered; step-2 "Continue" never covered.
  - iPhone SE: 24/31 the same; 7/31 (home and 6 landing pages whose card starts below the 667px-tall first screen) show the bar at
    load and at top, hide it while the card is in view, hide it with the pop-up open. No covered button in any run.
  - Desktop: no bar on any page (unchanged). 0 pages failed to load, 0 retries needed (final run 28 Sep).
  - Every bar keeps its page's tracked `tel:` number for `?utm_source=meta`.
- **Regression, real clock** (Sunday = outside business hours, so no bar is created): 30 landing pages × 5 devices:
  0 pages failed to load; phone numbers vs campaign sheet 254/254; form walk to submit 150/150; 0 "button covered" findings.
- **Isolation:** enroll.credolegal.com and start.credolegal.com: 30/30 pages each identical to the fingerprints from before the first change.

## Follow-up tests (after the first review, business-hours clock)
- Without IntersectionObserver (feature removed in the page): same results as with it on all phones tested.
- Bar number for no source, google, bing and meta: always the same tracked number as the page's hero link.
- All 26 other published pages (13 state, 6 old landing pages, letter, medical-debt-attorney, thank-you, 401, 404,
  /page/thank-you, /page/already-submitted) on iPhone and desktop: HTTP 200, the new code loads and does nothing, 0 errors from it, no bar.
- Form walk with the bar present: reaches submit on every page and phone tested (no real submission; staging has no approved form destination yet).
- Tapping the visible bar fires `gtm.linkClick`, the same event as the other phone links.
- iPhone SE landscape (667×375): the card starts below the short screen, so the bar shows until the card scrolls into view; no covered button.
- `.sticky-call-button` appears only in the pages' own phone-swap script, not in the site stylesheet.
