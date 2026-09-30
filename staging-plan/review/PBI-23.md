# Review packet: PBI-23 · performance on phones (script clean-up)

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
- Every script change needs the operator's per-script approval (standing rule). The plan and the decisions are in
  `PBI-23-plan.md`. Baseline (Lighthouse mobile, median of 3, trackers' beacons blocked): score 52–54, LCP 11.8–12.7 s.
  The LCP element is the H1 **text**: it waits for the web font (Webflow's font loader → Google Fonts), so most of
  the LCP time is outside what page code can change.

## Change (staging only, 30 Sep; all operator-approved)
1. **Inputflow `i.js` removed** from the site head code (it was `type="module"`, so deferred: one request plus
   parse/execute on every page, never render-blocking). Evidence it was unused: 0 of 56 pages have any `if-lib`
   attribute; the form walk was identical with the script blocked (4 pages × 2 widths). A one-line HTML comment
   marks where it was.
2. **Two recolour scripts removed**, both redundant since PBI-17/18 (the accent colours are in the markup and CSS):
   the site-footer script that wrapped "decision" in the bottom CTA and set `.callustext a` white, and the hero
   slider embed script that wrapped "Legally" in the H1 (it no longer matched: the H1 accent is a prop).
3. **Trustpilot bootstrap loaded once**: the second `<script src=…tp.widget.bootstrap.min.js>` include (in the
   Rights & FAQ component embed) was removed; the Trust strip's include stays. Both widgets still render (the
   bootstrap scans the whole page for `.trustpilot-widget`).
4. Not changed: Optibase stays synchronous (operator: tests are live); moving the 32 KB form code to the footer was
   dropped (the site footer field would pass Webflow's 50,000-character limit). Operator-manual items recommended:
   remove DM Mono and PT Mono in Site settings → Fonts (unused), fire the Nextdoor pixel later in GTM, turn on minify.
   Tidio (D8) and Mouseflow (D5) wait on the operator's decisions.

## Evidence
- Served head on all 56 pages equals the written head code byte for byte; 0 pages request `inputflow`.
- Functional compare, isolated to PBI-23 (`pbi23-revert.py` rebuilds each live page with only the PBI-23 hunks put
  back, so other changes published in between cancel out; `pbi01d-shadow.mjs LIVE=1` then compares that page with the
  live one: tracker requests, dataLayer, console errors, computed styles of every element, visible text, links, phone
  links, cookies, form payload), all 56 pages at 1440 and 390 (112 runs): **requests** differ in every run, and only by
  `cdn.jsdelivr.net/gh/inputflow-tools/library@1/i.js` (112/112); **computed styles** differ in 104 (the 52 form
  pages); nothing else differs anywhere (console errors, text, dataLayer, form payload, phones, links, cookies).
- The style difference, aligned element by element (`pbi23-align.mjs`, every element's tag, class, font, colours,
  display, margins, padding and box position/size; california, debt-harassment-stop-calls, home, /letter at 1440 and
  390; /thank-you and 404 had 0 differences): exactly (a) the Trust strip embed loses Webflow's `w-script` class
  (same box: an embed without a script), (b) the extra `<span>` the old script wrapped around "decision" inside the
  bottom CTA's `<em>` is gone (same colour #ff6b73 as the `<em>`; nothing after it moves), (c) on home, the extra
  `<span>` around "Legally" is gone (same #c92028 as the H1 accent), (d) at 390 the call bar's pulsing dot (an
  animation, sampled at a different moment; not PBI-23). No other element changes size or position.
- Trustpilot: both widgets (Trust strip and Rights & FAQ) render their 150px iframe on 4 pages × 2 widths.
- Lighthouse (same 4 pages, median of 3; before → after): score 53 → 54, 54 → 53, 52 → 56, 53 → 52; FCP
  4.18–4.40 s → 4.08–4.10 s; LCP 11.8–12.7 s → 11.6–12.5 s; TBT 430–500 ms → 373–497 ms. **Within run-to-run noise**
  (single runs range 41–58). The removed scripts were small (the second Trustpilot bootstrap ~90 ms main thread when
  measured; `i.js` below Lighthouse's reporting threshold). This item is clean-up; the large levers are outside page
  code: the web font path to the H1 (LCP), GTM tags (Nextdoor pixel), Tidio (D8) and the second recorder (D5).

## Questions for the reviewer
1. Is the evidence enough that removing `i.js` cannot break anything (module script, no `if-lib` attributes)?
2. Any risk in relying on one Trustpilot bootstrap for two widgets in different components?
3. Is the isolation method (revert only the PBI-23 hunks in the live HTML) sound for attributing the differences?
