# Review packet: PBI-29 · logo images: right size, not lazy at the top

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
- From the operator's PageSpeed/Pingdom review (30 Sep): the header logo is above the fold but marked lazy and loads a
  500 px file shown at 91×30 CSS px; the footer (and pop-up, thank-you) logo is a 38 KB, 480 px PNG shown at 77–140 px.

## Change (staging only, 30 Sep)
1. **Two right-sized files** made from the site's own logo file (`credo-logo.png`, 480×158, byte-identical to the
   Webflow asset): `credo-logo-280.png` (280×92, 5.3 KB, for the 91 px header: 3× screens) and `credo-logo-420.png`
   (420×138, 8.6 KB, for logos up to 140 px). LANCZOS resize, 256-colour palette PNG (WebP came out larger for this
   flat logo). Worst pixel error against the full-colour resize: 30/255 on anti-aliased edges.
2. **Header** (Navbar component): the 280 file, `loading="eager"` (custom attribute; Webflow's own width/height fields
   are not in the API and a `width` custom attribute is rejected).
3. **Footer** (Footer-MJ component, and the separate "footer" component inside the Thank-you page), **pop-up logo**
   (LP · Lead form, and home's own), **thank-you logo** (Thank-you page component, also `loading="eager"`, since it is at
   the top of those pages): the 420 file.
4. **Found while checking the image audits:** the BBB seal is **squashed on phones** (shown 310×80, ratio 3.88,
   natural 4.80): its embed fixes the height at 80 px while the phone width caps it at 310 px. Fixed in its three code
   embeds (LP · Rights and FAQ, LP · Trust strip, home): `object-fit: contain` (same box, seal drawn in proportion)
   and `width="384" height="80"` attributes.

## Evidence
- Served HTML, all 56 pages: no `<img>` uses the old logo files (the remaining references are the Open Graph/Twitter
  image and the schema logo, which should stay large); the differences are exactly the logo tags and the seal embeds.
- Bytes: logo downloads per landing page **117 KB → 13.8 KB** (header + footer + pop-up), thank-you pages 38 → 8.6 KB.
- Look: element screenshots old vs new at 1440@1x, 810@2x, 390@3x (landing page, home, thank-you): footer logos
  pixel-identical; pop-up and thank-you logos differ in ≤ 2.2% of pixels (anti-aliasing); the header box is 0.4 px wider
  (91.3 vs 90.9: the old file "Credo Logo Red" has ratio 3.030, `credo-logo.png` 3.038), same look side by side.
- Layout: every element's box, position and style compared (aligned) on 4 pages × 1440/390: nothing moves except the
  seal at 1440 by 0.13 px (width 384 vs its natural 384.26) and the animated call-bar dot (animation timing).
- Lighthouse image audits (debt-lawsuit-attorney): image aspect ratio now passes (the seal); "unsized images" still
  lists the header logo (Webflow writes `width="Auto"`: fixable only in the Designer's image settings) and the footer
  logo (height left out on purpose: its CSS narrows it on phones, so a fixed height would distort it); "image
  delivery" lists the header file (sized for 3× screens; Lighthouse's phone is 2.6×: a few hundred bytes) and the hero
  photo (not a logo: outside this item).
- Functional compare (4 pages × 2 widths, saved page vs live): tracker requests, dataLayer, console errors, visible text,
  links, phone links, cookies and the form payload identical in 8/8 runs; computed styles differ only by the sub-pixel
  image widths above (header logo 90.91 → 91.30 px, thank-you logo 139.73 → 140 px, footer logo height −0.06 px).
- Screenshots: `P29-seal-390-before-after.png` (phone, before left / after right), `P29-header-logo-before-after.png`
  (phone 3×, before top / after bottom).

## Questions for the reviewer
1. Is replacing the header's 1822 px source (served via srcset) by a single 280 px file right for all screens?
2. Any risk in the footer image no longer being bound to its component prop (the prop now unused)?
3. Is `object-fit: contain` in a fixed 80 px box the right fix for the seal, or should the box follow the seal's ratio?
