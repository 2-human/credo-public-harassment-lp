# Credo Legal — Landing Page → Webflow handoff

A static export of the Credo landing-page design for a developer to rebuild in Webflow.

**The design is one template.** All 32 landing-page variants in the repo share the same
structure and CSS; only the copy differs. So this bundle is: the template rendered once as
static HTML, plus every page's copy.

## What's in here

| File | What it is |
|---|---|
| `template.html` | The landing page rendered to **static HTML** (no JavaScript). This is the structure + markup to reproduce in Webflow. Example copy is the "Act-Fast" page. |
| `tokens.css` | Design tokens — colors (`--credo-red: #c92028`), type scale, spacing, radii, shadows. Also `@import`s the web font. |
| `lp.css` | All layout/component styles (class-based, uses the tokens). ~690 lines. |
| `assets/` | All images (logo + hero/body/who-helps photos), responsive `webp` + `jpg` at 480/960 widths. |
| `copy-deck.html` | **Human-readable copy sheet** — open in a browser. One section per page (headline, lede, bullets, FAQ, rights, CTA, etc.). |
| `copy.json` | The same copy, **structured** (all 32 pages' content objects) for programmatic use. |
| `FORM-SPEC.md` | **The lead form's behavior** — the 3-step wizard, fields, validation, and submit. The form is only partially visible in `template.html` (step 1); this is the rest. |
| `PHONE-DNI-SPEC.md` | **Dynamic phone by `utm_source`** (Google/Bing/Meta). This is NOT in the page code — it must be built; the doc has a ready-to-use snippet + the per-page number table. |
| `phone-map.json` | The per-page numbers-by-source map as JS (`window.CREDO_PHONE_MAP`), for the snippet above. |
| `index.html` | A landing page for this bundle (links + the .zip download). Reachable from the review hub's Sections menu → "Webflow export". |
| `webflow-lp.zip` | Everything above zipped for handoff (excludes `index.html` + the zip itself). |

## How the original works (context for the rebuild)

Each page in the repo is a 21-line stub: `<div id="root"></div>` + `app.js` (a vanilla-JS
renderer) + a `content-<slug>.js` data file. `app.js` reads the content object and builds the
whole page as HTML at runtime. **Webflow can't run that renderer**, so `template.html` is the
rendered output — the real markup — captured statically.

## Rebuilding in Webflow

1. **Font** — the design uses **Hanken Grotesk** (weights 300–700), loaded from Google Fonts.
   Add it in Webflow's font settings. (`tokens.css` imports it via `@import`.)
2. **Tokens/colors** — bring the values from `tokens.css` into Webflow variables/styles. Brand
   red is `#c92028`.
3. **Build the template once** from `template.html` — the nav, hero (two-column: form left,
   photo right), review bar, the numbered body sections (What we do · Why us · Common problems ·
   Who this helps · How it works · Your rights · FAQ), CTA, and footer. Styles are class-based, so
   `lp.css` maps 1:1 to the markup's class names.
4. **Populate 32 pages** — create one page per section in `copy-deck.html`, dropping each field's
   copy into the matching template slot. (`copy.json` if you prefer to script it.)

## Important notes

- **The form does not submit anywhere.** It's a client-side 3-step wizard (debt slider → situation →
  details) that just redirects to a thank-you page — no backend, action URL, or tracking. Full
  behavior + fields + validation are in **`FORM-SPEC.md`**; rebuild it and wire your own submission/CRM.
- **The phone number does not change by traffic source.** Each page shows one fixed number; the
  `utm_source` → Google/Bing/Meta switching was mapped but never implemented in the page. See
  **`PHONE-DNI-SPEC.md`** for the ready-to-use snippet + the per-page number table (Google on all
  pages, Bing on 13, Meta unassigned).
- **Fixed template chrome vs per-page copy.** Section headings (e.g. "Legal advice, not debt
  consolidation."), the nav, and the footer legal disclaimer are the **same on every page** and
  are already in `template.html`. Only the fields in `copy-deck.html` change per page.
- **Design state is baked in.** The export is the canonical variant: two-column "locked-paired"
  layout, portrait photography, borders off, plain labels. (The repo also has a sticky-rail layout
  and watercolor-art variants — not exported here.)
- **Images.** Default set is the portrait/woman subject. The repo's `assets/` also contains `-m`
  (man) subject and watercolor variants if you want alternates.
- A small red chat-bubble placeholder (`.tidio-ghost`, bottom-right) is in the markup — it's a
  chat-widget mount point; drop it or wire your own.

## Regenerate

The pipeline lives in `handoff/webflow-lp/_build/` and writes into this folder
(`public/harassment-lp/webflow-lp/`). From the repo root:

```
node handoff/webflow-lp/_build/build-export.js       # template.html, copy.json, copy-deck.html, tokens.css, lp.css, assets/
node handoff/webflow-lp/_build/build-phone-map.js     # phone-map.json (+ prints the number table)
# then refresh the download bundle:
cd public/harassment-lp/webflow-lp && zip -rq webflow-lp.zip . -x 'index.html' 'webflow-lp.zip' '.*'
```

`build-export.js` re-renders from `public/harassment-lp/`'s `content-*.js` files and `app.js`;
change which page is the template example via `TEMPLATE_SLUG` in that script.
