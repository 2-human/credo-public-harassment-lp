# Review packet: PBI-06 · Tracked phone number in the phone header (Option B)

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. Work happens on a **staging clone** only: Webflow site
  `6ab90fb0761d44332faf21c8`, only domain `staging.credolegal.com`. Production (`start.credolegal.com`) and the developer's
  staging (`enroll.credolegal.com`) are separate Webflow sites and must not change.
- Every page with a header uses one shared Webflow component, `navbar` (61 page slots; 54 published pages have a header).
- 31 landing pages carry an inline "phone-swap" script: on DOMContentLoaded it picks a number by `utm_source`
  (google/meta/bing/default) and writes it into `#navcta`, `#herocta`, `#footercta`, `#bfootercta` and **every element with the
  class `dynamic-phone`** (for those: `href = 'tel:+1…'`; text goes into a child `.callnumbers` if present, else replaces innerHTML).
  The other 23 pages with a header (13 state pages, 8 older pages, 2 CMS thank-you pages) have no swap script.
- Before: on phones/tablets (≤991 px) the header showed the logo and a ☰ button; the number sat inside the collapsed menu.

## What changed (Webflow Data API; published to the staging domain only)
In the `navbar` component:
1. New Link Block, classes `mobile-call` + combo `dynamic-phone`, placed in the Navbar Wrapper after the menu:
   `href="tel:+17188658350"` (same value and link mode as the existing `#navcta`), `aria-label="Call Credo Legal"`,
   children: an HTML embed with an inline SVG phone icon (`aria-hidden`), and a div `.callnumbers.mobile-call-number` with the text "(718) 865-8350".
2. Styles: `.mobile-call` = `display:none` on desktop; at ≤991 px `display:flex`, `min-height:44px`, padding 0 14px, red #c92028,
   white text, radius 6px, `white-space:nowrap`. `.callnumbers.mobile-call-number` = white, Inconsolata 15 px bold.
3. The ☰ button (NavbarButton) set to **hidden** (Webflow visibility setting; element kept, reversible).
4. Style "Navbar Brand" at the smallest breakpoint (≤478 px): `width 80%` → `auto`, so the logo link does not squeeze the button.
- No script was changed on any page; the new link is updated by the existing swap script through the `dynamic-phone` class.
- First publish rendered `href="tel:835:+17188658350"` (phone link mode added its own prefix); fixed by storing it in URL mode
  like `#navcta`, republished, served HTML re-checked: `href="tel:+17188658350"`.

## Evidence (28 Sep, after publishing)
1. **All 57 published pages × iPhone 15 (4 sources: google, meta, bing, none) + Android 360 + iPad Mini 768 + desktop 1440 = 399 runs**
   (`tools/webflow/verify-pbi06.mjs`, results `PBI-06.verify.json`): 0 failed loads; 3 pages have no header (/401, /404, /thank-you).
   - Phones/tablet: button visible 324/324, height ≥ 44 px 324/324, ☰ visible 0/324, header height 56 px (before 49).
   - Swap pages: header number = the page's hero call number in 186/186 phone/tablet runs (per source).
   - Pages without swap: header shows the default (718) 865-8350 (same as their hidden menu number before).
   - Desktop: button visible 0/54; the 5 desktop nav links and "Call Us: number" visible 54/54.
   - Sideways scroll: 2 runs (/page/thank-you, /page/already-submitted on iPad 768). **Pre-existing:** caused by a content grid on those
     CMS pages; hiding the new button or the whole header leaves the page width unchanged (808 px on 768).
   - Page errors on the 21 old-form pages (Cloudflare Turnstile frame access, `atob` "invalid characters"). **Pre-existing:** the 27 Sep
     HTML of /ohio replayed in the same browser gives the same 4 errors; they also occur on desktop, where the new header is not shown.
2. **Tap:** tapping the header button on iPhone fires `gtm.linkClick` with `tel:+13475234568` (the page's tracked Google number).
3. **Regression, 30 landing pages × 8 devices (lpcheck, full profile set):** all loaded; phone numbers vs the campaign sheet 344/344;
   form walk reached the submit step 240/240. Only change vs the 27 Sep run: "content runs past the screen edge" on iPad (810 px) on 30/30 —
   **pre-existing** (the closing section's decorative glow; `poition:relative` typo, scheduled PBI-17); the 27 Sep runs did not include the
   iPad profile, and replaying the 27 Sep site stylesheet gives the same 875 px width.
4. **Isolation:** enroll.credolegal.com and start.credolegal.com 60/60 pages byte-identical to the fingerprints taken before any change.

## Conclusions to challenge
1. On phones and tablets every page with a header shows a working, tappable call button with the page's tracked number.
2. Desktop is unchanged.
3. Tracking is unchanged (numbers per source, GTM link click).
4. Nothing outside the staging site changed; the findings listed as pre-existing are not caused by this change.
