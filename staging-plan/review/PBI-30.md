# Review packet: PBI-30 · Trustpilot and BBB badges load after the first interaction; two site scripts inline

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
- Operator-approved per script (30 Sep), after a Pingdom/PageSpeed review: delay the Trustpilot widgets and the BBB
  seals with the same trigger as the Tidio chat (PBI-28: first scroll, tap, click or key press, or 5 s after load), and
  inline Webflow's two small registered site scripts (FormSubmitDataLayer 1.0.0, RemoveStateOptions 1.0.0) into the
  site footer code instead of two separate requests. Both badges sit below the first screen on every page measured
  (phone 1,239–1,560 px vs an 844 px screen; desktop 907–981 px vs 900).

## Change (staging only, 30 Sep)
1. LP · Trust strip embed: the `<script src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async>`
   tag replaced by a comment (the widget markup stays; its box has a fixed 150 px height).
2. Three BBB seal embeds (Trust strip, Rights and FAQ, home): `src` → a 1×1 transparent data-URI placeholder plus
   `data-credo-src="…bbb.org…png"` (the box keeps its `width="384" height="80"`).
3. Site footer code, appended at the end:
   - a loader: on the first `scroll`/`pointerdown`/`touchstart`/`keydown` (capture, passive) or 5 s after the load event,
     copy each `img[data-credo-src]` into `src`, and (if the page has a `.trustpilot-widget`) insert the Trustpilot
     bootstrap script into the head;
   - the two registered scripts' code verbatim (785 B and 301 B), in the same order, at the same place (end of body,
     after the footer code) as Webflow placed them; the two scripts un-applied from the site (still registered).

## Evidence
- Shadow test before publishing (live pages with only these edits): identical functional compare (form walk, payload,
  dataLayer, errors, text, phones, links, cookies, styles) on landing page, home and /thank-you × 1440/390, except the
  Trustpilot request missing at snapshot time on runs without a click; badges load 5.0 s after load when idle, at once
  on a scroll; both widgets render (2 iframes) and both seals load afterwards; NC removed from the state list and the
  form's submit wrapped for the dataLayer exactly as before.
- Live after publishing: every page equals the tested version except Webflow's publish stamp and the Trust strip
  embed losing its `w-script` class (it no longer contains a script); no page requests the two registered-script files
  or has a Trustpilot `<script>` tag; 104/104 seals deferred; timing test repeated live (california, home, /thank-you).
- First load with no interaction (load + 2 s, desktop, like Pingdom): **88 → 47 requests**, 28 → 26 hosts
  (widget.trustpilot.com and seal-northeastflorida.bbb.org gone).
- Lighthouse phone (4 pages, median of 3): scores 49/50/57/49 → 55/55/53/57, TBT 333–548 → 359–441 ms; within the
  run-to-run noise measured earlier (single runs 41–58), so no claim beyond the request counts.

## Questions for the reviewer
1. Any risk in Trustpilot's bootstrap being inserted after the load event (it renders both widgets in the tests)?
2. Is the data-URI placeholder + data-credo-src approach for the seal sound (accessibility, crawlers, no-JS)?
3. Any risk in moving the two registered scripts inline (order, system pages, future Webflow edits)?
