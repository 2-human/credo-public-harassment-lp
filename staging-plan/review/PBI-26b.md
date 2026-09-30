# Review packet: PBI-26 (final step) · Inconsolata served only from our own files ("Credo Mono")

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
- PBI-26 step 1 (30 Sep) uploaded Hanken Grotesk and Inconsolata as custom fonts and the operator removed the
  Google fonts. Webflow still loaded Inconsolata from Google through its render-blocking `webfont.js`: Inconsolata
  is one of Webflow's built-in Google fonts, so any class naming it triggers the loader, whatever custom font has
  the same name. PageSpeed (operator's screenshot) showed the chain webfont.js → fonts.googleapis.com CSS →
  fonts.gstatic.com woff2 before the monospaced text could render; the page downloaded Inconsolata twice more from
  our own files (two faces declared on one file).
- Operator decisions: go ahead after Style Manager Clean up; option (a): render the weights the classes ask for
  (the old setup only had 400 and 700, so 300 showed as 400 and 600 as 700).

## Change (staging only, 30 Sep evening)
1. Custom font **"Credo Mono"**: the same Inconsolata file (md5 identical to Google's v37 latin file), declared
   once as a variable face, weight 200–900 (verified variable: ink grows smoothly 200→900), font-display swap.
2. **60 classes** Inconsolata → Credo Mono (base breakpoint only; no class set it anywhere else).
3. **8 code embeds** (form steps 1–3 and the amount slider; 4 in the LP · Hero / LP · Lead form components, 4 on
   home): `Inconsolata, monospace` → `'Credo Mono', monospace`, nothing else.
4. **Same-named class copies.** Two names existed several times (`mjfdcpaboxtext Copy Copy` ×8,
   `callustext Copy` ×3). Webflow publishes one merged rule per name; the API only reaches the first copy of a
   name and refuses to rename a class onto an existing name. Each name is used by one class copy only (found by
   renaming the copies aside and querying every page and component for elements using each): home + LP · Lead form
   use one `mjfdcpaboxtext Copy Copy`, the thank-you footer uses one `callustext Copy`. Those two now hold exactly
   the merged declarations the published CSS gave them (read from the published stylesheet, incl. the phone
   breakpoint) and are back under their original names, so the PBI-15 head rules that target them still apply.
   The 9 unused copies got Credo Mono and are parked as `zz unused …` for the next Clean up.
5. Published together with two operator changes made the same evening in the Designer: **Style Manager Clean
   up** (922 of 1,271 classes removed as unused) and **form bot protection off** (M4, PBI-27).

## Evidence
- Served HTML, all 56 pages, before vs after: after normalising the stylesheet/webflow.js hashes, integrity
  attributes, publish time, the removed webfont.js/preconnect lines and the font name, the only differences are
  `data-turnstile-sitekey` gone on the 52 form pages (PBI-27) and `sizes` on 3 home photos (below).
- Element compare (every element: tag, class, font size, weight, line height, colour, background, display,
  margins, padding, box), saved page vs live, **56 pages × 1440 and 390**: the only rows that differ are the form
  wrapper losing `w-form-loading` (Turnstile no longer holds the form in its loading state) and the animated
  call-button dot (animation timing, differs between any two runs). `container-40/41` showed a margin value
  difference at 1440 in one run; measured directly at 1280/1440/1920/2560 before vs after: identical position
  and width.
- Network (phone 390@3x, beacons blocked): font files **4 → 2**, font bytes **121.7 KB → 63.7 KB**; gone:
  webfont.js (13.2 KB), fonts.googleapis.com CSS, the fonts.gstatic.com woff2, both Google preconnects, and the
  Turnstile script (86.7 KB, PBI-27). `document.fonts`: Hanken Grotesk 300–700 and Credo Mono 200–900 only.
- Stylesheet 229.5 KB → 116.7 KB of text (Clean up). No class names Inconsolata; the only mentions left are the
  two old, unused Inconsolata @font-face rules (not downloaded) and Credo Mono's file name.
- Look: hero at 390@3x before/after (`P26b-hero-before.png`, `-after.png`): identical except the $8,000 slider
  value, now at its class weight 300 (option a); the hero phone number moves 700 → 600 (its class weight).
- Lighthouse mobile, median of 3 (beacons blocked; Optibase still off, PBI-31): stop-calls 91, home 89, /letter 85,
  california 90, debt-lawsuit-attorney 79; FCP ~1.8 s on every page, LCP 2.2–2.8 s. The PBI-31 runs the same
  evening (same Optibase state, before this change): 48 / 65 / 75 / 86, FCP 2.2–5.3 s. Lighthouse on this machine is
  bimodal (single runs of the same page range 57–92), so the medians are indicative; the request removals above are
  the measured part.
- PBI-27 (operator's bot-protection toggle, published with this): no challenges.cloudflare.com request and 0
  console errors (the recurring atob errors are gone) on 4 pages; the form walk reaches the final step on 5 page ×
  width runs; pressing submit (Formspree answered locally, no lead sent) posts the same 20 fields as before on 3
  pages, minus only `cf-turnstile-response` (Formspree never used it).

## Open points for the reviewer
1. Home: Webflow now publishes `sizes="100vw"` on 3 content photos (was 206px / 223px / 396px). Their classes and
   parent classes are unchanged in the stylesheet; the display is identical (element compare). Effect is which
   srcset file the browser picks. Accept, or chase it?
2. The two old "Inconsolata" custom font records are unused; deleting them needs the operator's OK.
3. Is parking the unused same-named copies under `zz unused …` names (for the operator's next Clean up) sound?
