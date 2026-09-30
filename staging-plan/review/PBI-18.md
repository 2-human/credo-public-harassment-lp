# Review packet: PBI-18 · red accent word in the H1

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
  51 landing pages share components (the hero is the component `LP · Hero`, its H1 text a per-page prop); the home page
  has its own copy of the sections.
- Audit G23 and the prototype: every prototype H1 has one red accent word (`prefix<em>accent</em>suffix`, colour
  `#c92028`, upright); live H1s were plain text. The bottom CTA's accent ("decision", on dark) was coloured by a footer
  script after load (flash of colour, depends on the keyword, italic).

## Change (published to staging only, 30 Sep)
1. **Hero H1 = three spans** bound to three props: `H1` (text before the accent), `H1 accent` (new, class `h1-accent`:
   `#c92028`, upright) and `H1 end` (new). Both new props default to empty, so nothing changed on a page until its
   values were set. Values set on all 51 landing pages; component defaults = the template's H1.
2. **Accent words:** from the prototype's `h1` array (48 pages, split in the live wording); 3 pages whose live H1 differs
   from the prototype wording (the open D22) and home have no prototype accent, so I picked one: "Calling"
   (credit-card-debt-stop-calls), "Pay" (debt-harassment-fdcpa-rights), "Rudely" (payday-loan-debt-harassment),
   "Legally." (home).
3. **Spacing:** Webflow turns a leading space in a text prop into a no-break space (found in the first check), so a space
   between the accent and the text after it sits at the end of `H1 accent` ("Suing " + "You?"); the prop tooltips say
   so, and `lp-sync.mjs` applies the same rule.
4. **Home:** H1 "Stop collection calls. `<span class="h1-accent">`Legally.`</span>`"; its form question was a second
   `h1` (landing pages: `h3`) → `h3`; its bottom CTA heading gets `<em>decision</em>` like the landing pages, and its hard
   line break before "decision" is removed (with PBI-17's 680px width it left "any" alone on a line).
5. **Bottom CTA accent in CSS** (section embed, component + home): `.bottom-cta .heading-39-copy em { color:#ff6b73;
   font-style:normal }`. The footer script that recoloured it is now redundant (it wraps the same word in the same
   colour); its removal goes to PBI-23, where every script change is approved one by one by the operator.
6. Tools: `lp-extract.mjs` reads the three spans, `lp-sync.mjs` maps the prototype `h1` array to the three props,
   `lp-components.json` lists the new props.

## Evidence
- **H1 text unchanged:** served HTML of all 52 form pages, H1 text before vs after **byte-identical on 52/52**, no
  no-break space.
- `pbi18-accent.mjs`, 52 pages × 1440 and 390: **104/104 ok** (text = expected parts, accent span = the chosen word,
  `rgb(201, 32, 40)`, upright; bottom CTA em `rgb(255, 107, 115)`, upright, on all 52).
- Functional compare before/after (a landing page, home, /letter, a state page; 1440 + 390): form walk, payload,
  trackers, dataLayer, cookies, phones, links identical; only styles differ (home: also the visible text, from the
  removed line break). Home form question as h3: font, weight, line height, margins and position identical at both widths.
- Screenshots before → after: `P18-debt-lawsuit-attorney-hero-*`, `P18-multiple-collectors-one-attorney-hero-*`
  (accent first), `P18-home-hero-*`, `P18-*-cta-*`.
- Found, not changed here: home uses `h1` for about 28 section labels and headings, the thank-you pages 9 (landing pages
  were fixed in G5). New board item.

## Questions for the reviewer
1. Do the accent words read as the prototype intends (one red word or phrase, not distracting)?
2. Are the four picked accents (Calling, Pay, Rudely, Legally.) sensible?
3. Any risk in the three-prop H1 for editors or for SEO (text identical, spans only)?
