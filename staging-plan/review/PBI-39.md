# MH-09 · The seven microsites built on staging (Webflow), plus the prototype synced back (4 Oct 2026)

## What this is
The operator asked to "sync everything to webflow", run a thorough QA, apply every landing-page optimization made so far
(Webflow components, Core Web Vitals measures) and test with GPT and Gemini. staging.credolegal.com is the production site
being built and the source of truth. The local prototype (public/marketing-hub/microsites/) mirrors staging 1:1.

Operator decisions: ONE shared set of pages: seven microsite homes at /respond, /fight-back, /demand-proof,
/know-your-rights, /stop, /make-them-pay and /reduce, plus one /about, /terms-of-use, /privacy-policy and /cookie-policy.
On about and the legal pages the Services menu lists the seven microsites. The legal pages are published with a visible
"Draft for review by the firm's attorney" note, and the footer links to them site-wide.

## Webflow changes (staging site only; start/enroll never touched)
Every change went into the shared components, controlled by props. The defaults keep each existing page unchanged. A
checkpoint publish left all 67 pre-existing pages byte-identical apart from webflow.js (+143 B gzip, Dropdown/nav button).

- **navbar**: a site menu (Home · Services ▾ as a native Webflow Dropdown with 7 DropdownLinks · About), shown when
  the `Site menu` prop is on. The landing pages' in-page anchor links sit behind `Page links`. Webflow binding cannot invert
  a boolean, so these are two props. The brand link and Home link are bound to the `Home link` prop. Menu links carry
  `data-append-utm="true"` like the existing links. A small `<style>` embed renders only with the menu:
  ```css
  .site-menu-link.w--current, .w-nav-menu .nav-link.track-redirect.w--current { color:#c92028 }
  .menu-button-2.w--open { background:#fff; color:#111418 }
  /* + phone-width flex toggle, transparent dropdown list */
  ```
- **LP · Common problems**: a home heading block (eyebrow/heading/lead props, `display:contents`). Six card link overlays
  (LinkBlock, aria-label bound to the card title) go to each microsite's service pages. `Show who this helps`.
- **LP · Rights and FAQ**: `Show rights`, `Show FAQ 4/5`. **LP · Bottom CTA**: `Button link` prop.
- **Footer-MJ** (site-wide): About and legal links point to the new pages. Labels "terms of use" and "cookie policy". The
  footer logo's white filter moved from a CTA embed into the `footerlogo` style. Before, pages without a Bottom CTA
  (legal, thank-you) showed a red logo on the dark footer.
- **Pages**: 7 homes, each duplicated from its cluster's first landing page, so they reuse the same 8 `LP ·` components.
  Also /about and three legal pages (body built with staging's own classes). All have SEO titles and descriptions, OG
  tags, robots noindex while on staging, a canonical to start.credolegal.com/{slug}, and FAQPage JSON-LD on the homes
  (only for questions that are shown). The 47 landing pages have the site menu turned on.
- **Site footer code** (fix to a pre-existing bug): the off-hours block pointed the header button at
  `#consultation`/`#nconsultation`, and no page has either. Off hours, the header button therefore did nothing on any
  page. It now targets the first of those that exists, else `#herosec`. Pages without a form (about, legal) keep the
  button's link to a page with the form:
  ```js
  const target = document.getElementById("consultation") || document.getElementById("nconsultation") || document.getElementById("herosec");
  if (target) { btnCTA.setAttribute("href","javascript:void(0)"); btnCTA.onclick = e => { e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }; }
  ```
- **Styles**: `Container 40` margin auto, `page-body` padding 20px and max-width 820. The menu icon is #111418 (it was
  white on white at tablet and phone widths). The open nav menu has a white background and borders. The menu button
  is bordered at 44 px.

## Core Web Vitals
The measures are site-wide, so the new pages inherit them: Tidio and the review badges load after first interaction,
fonts are self-hosted with preload, the logo is 8.6 KB, Optibase is off. No page-level scripts were added.
Lighthouse mobile (median of 3; tracker scripts dominate TBT):

| page | score | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| /respond (home) | 61 | 3.8 s | 5.8 s | 428 | 0 |
| /about | 79 | 2.7 s | 3.4 s | 296 | 0.027 |
| /terms-of-use | 83 | 2.2 s | 3.1 s | 285 | 0.0003 |
| debt-lawsuit-respond-on-time (LP) | 65 | 3.0 s | 5.5 s | 328 | 0.001 |
| debt-harassment-stop-calls (LP) | 61 | 2.4 s | 9.1 s | 522 | 0 |

## Prototype sync-back (local)
`sync-staging.mjs` now snapshots the 11 new staging pages (60 pages in total). `mirror.mjs` lost its compose functions
(home/about/legal were hand-composed before). Every page is now staging's markup and stylesheet, with trackers and chat
removed and the per-slug phone kept. Internal links are routed to the microsite's own files:
```js
d.querySelectorAll('a[href^="/"]').forEach(a => {
  const href = a.getAttribute('href'); const m = href.match(/^\/([a-z0-9-]*)(#[a-z0-9-]*)?$/i); if (!m) return;
  const to = P.route[m[1]]; if (to === undefined) { a.setAttribute('href', 'https://staging.credolegal.com' + href); return; }
  a.setAttribute('href', to + (m[2] || '')); routed++;
});
```
Routes are root paths (`/microsites/<angle>/…`), not relative paths. Staging's UTM click handler rebuilds every
`data-append-utm` link with `new URL(href, location.origin)`, so a relative link sent visitors to the server root. QA
caught this. The hub is served with public/marketing-hub as its root. The build fails if a page has no routed internal
link (thank-you excepted: staging's has none).

## QA results
- Served-HTML diff: the 67 pre-existing pages are byte-identical outside the header and footer after the full publish.
  The footer code is served on 78/78 pages.
- axe-core: no violations on 7 pages × 2 widths (1440, 390).
- lpcheck (11 new pages): 0 critical, 0 major. The minor finding was missing OG tags, now fixed.
- check-microsites: 180 page loads (7 microsites × 2 widths). Menus, current entry, links, phones and header position all pass.
- check-components: header, footer, hero and trust strip are identical between homes and LPs. In every microsite the
  header button leads to the form, and the form walk completes to thank-you with nothing sent and no outside host reached.
- check-mirror --all: every staging page against its mirror (see result appended below).
- smoke: pass.

## Known and accepted
- Two-word red accents ("prove it", "more rights", "Make them") have no nowrap on staging and may split across lines.
- /know-your-rights (page) coexists with a CMS collection of the same slug base (collection items live under their own path).
- Canonicals point at start.credolegal.com/{slug} until the domain switch (PBI-24).

## Please review
1. Code: the link routing and the root-path choice; the footer-code fix (any page where `#herosec` is the wrong target?);
   the paired-boolean visibility props. Do you see any risk to the 47 existing landing pages?
2. UX (screenshots: home, about, terms and an LP at 1440 and 390, plus the open menu at both widths): is the site menu
   clear? Does "Services" make sense on about/legal, where it lists the microsites? Is the draft note on the legal pages
   acceptable for a published page? Anything that looks inconsistent between home, about/legal and the LP?
