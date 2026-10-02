# WEB-01 · Website prototype rebuilt on the landing-page engine + legal pages

## What changed
The website prototype (public/website-start, six angle variants + hub) used its own old templates and look. It now uses the
landing-page engine exactly as the landing pages are on Webflow (same tokens, CSS, render code, self-hosted fonts, `<main>`,
review strip Trustpilot + BBB, no step time tags). Old versions (a/, b/, c/, lps/, archive/, old shared templates, 27 MB of
old images) were deleted. Each variant now has: home, about, six service pages, Terms of Use, Privacy Policy, Cookie Policy,
thank-you. Footer links: Home, About, Terms of Use, Privacy Policy, Cookie Policy (replacing "Privacy policy" / "Disclaimer").
Legal page text is generated from the redline specifications (tools/legal) into shared/legal-content.js; drafts pending attorney review.

## Verification done
- 74 pages × 1440/810/390: no JS errors, no missing files, one h1 and one main per page, no horizontal overflow, 1,932 internal links all resolve.
- Form flow on a service page → variant thank-you page; "Free review" on pages without a form → home page form.
- Landing-page prototype pages (public/harassment-lp) render as before: no site nav, 0 time tags, 2 review strips, 1 main.

## Questions for the reviewer
1. Bugs or fragile spots in site.js / build.mjs / the engine changes (app.js diff)?
2. XSS or escaping mistakes (content comes from our own files only)?
3. Accessibility of the dropdown (hover + focus-within, button) and the mobile `<details>` menu.

## Files

### public/website-start/shared/site.js
```js
/* ==========================================================================
   Credo Legal — website prototype, site layer (2 Oct 2026).

   The website uses the landing-page engine as it is on Webflow today
   (lp/app.js, lp/tokens.css, lp/lp.css — a synced copy of public/harassment-lp,
   see tools/website-start/build.mjs). This file adds what a site needs on top:
   navigation between pages, one footer, the home services section, and the
   about, legal and thank-you pages.

   Page order:  content-*.js  →  site-data.js  →  site.js  →  CredoSite.prepare(…)
                →  lp/app.js  →  CredoSite.render()
   prepare() must run before app.js, which reads window.CREDO when it loads.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.CREDO_SITE_DATA;   /* generated: variants, clusters, service slots */
  var cfg = null;

  var FOOTER_DISCLAIMER = "This is attorney advertising. Prior results do not guarantee a similar outcome. " +
    "Credo Legal is a multi-jurisdictional law firm. Communication through this site does not create an " +
    "attorney–client relationship. Not a debt-settlement company. Not a credit-counseling service.";

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* cfg: { variant, page: home|service|about|terms|privacy|cookie|thanks, cluster?, root, base }
     root = path to the website root (holds lp/ and shared/), base = path to this variant's folder. */
  function prepare(c) {
    cfg = c;
    var V = D.variants[c.variant];
    var C = window.CREDO;
    var b = c.base;
    window.CREDO_ASSET_BASE = c.root + "lp/";

    /* One phone number across the site: the new-clients line shown on every live page. */
    C.phone = "(718) 865-8350";
    C.phoneHref = "tel:+17188658350";

    C.site = {
      home: b + "index.html",
      thankYou: b + "thank-you.html",
      links: [
        { text: "Home", href: b + "index.html", current: c.page === "home" },
        { text: "Services", items: D.clusterOrder.map(function (k) {
            return { text: D.clusters[k].label, href: b + "services/" + D.clusters[k].slug + ".html", current: c.page === "service" && c.cluster === k };
          }) },
        { text: "About", href: b + "about.html", current: c.page === "about" }
      ],
      /* Pages without a form send the nav button to the form on the home page. */
      cta: (c.page === "home" || c.page === "service") ? null : { href: b + "index.html#lead-form" }
    };

    C.footer = {
      entity: "Credo Legal Services, P.C.",
      address: "1 Liberty Street, Suite 4010, New York, NY 10006",
      phones: [
        { label: "Existing clients", number: "(212) 461-4026", href: "tel:+12124614026" },
        { label: "New clients", number: "(718) 865-8350", href: "tel:+17188658350" }
      ],
      email: "support@credolegal.com",
      emailHref: "mailto:support@credolegal.com",
      links: [
        { text: "Home", href: b + "index.html", external: false },
        { text: "About", href: b + "about.html", external: false },
        { text: "Terms of Use", href: b + "terms-of-use.html", external: false },
        { text: "Privacy Policy", href: b + "privacy-policy.html", external: false },
        { text: "Cookie Policy", href: b + "cookie-policy.html", external: false }
      ],
      disclaimer: FOOTER_DISCLAIMER,
      copyright: "© 2026 Credo Legal. All rights reserved."
    };

    if (c.page === "home") {
      C.hero.h1 = V.homeH1;
      C.hero.lede = V.homeSub;
      C.hero.eyebrow = V.label;
    }
  }

  /* ---- home: the six services ------------------------------------------- */
  function servicesSection() {
    var V = D.variants[cfg.variant];
    var tiles = D.clusterOrder.map(function (k, i) {
      var s = V.services[k], cl = D.clusters[k];
      return '<a class="svc" href="' + cfg.base + 'services/' + cl.slug + '.html">' +
        '<div class="sm"><span>' + String(i + 1).padStart(2, "0") + '</span><span>' + esc(cl.label) + '</span></div>' +
        '<h3>' + esc(s.h1) + '</h3>' +
        '<p>' + esc(s.lede) + '</p>' +
        '<span class="go">See how we help →</span>' +
      '</a>';
    }).join("");
    return '<section class="section" id="services"><div class="container">' +
      '<div class="eyebrow">Our services</div>' +
      '<h2 class="h2">' + esc(V.clusterLead) + '</h2>' +
      '<div class="svc-grid">' + tiles + '</div>' +
    '</div></section>';
  }

  /* ---- page templates ---------------------------------------------------- */
  function head(eyebrow, h1, lede, upd) {
    return '<section class="page-head-wrap"><div class="container"><div class="page-head">' +
      '<div class="eyebrow">' + esc(eyebrow) + '</div>' +
      '<h1>' + h1 + '</h1>' +
      (lede ? '<p class="lede">' + esc(lede) + '</p>' : '') +
      (upd ? '<div class="upd">' + esc(upd) + '</div>' : '') +
    '</div></div></section>';
  }
  function pageCta(label) {
    var C = window.CREDO;
    return '<section class="bottom-cta"><div class="container">' +
      '<div class="eyebrow">Ready when you are</div>' +
      '<h2>Know your rights before you make any <em>decision</em>.</h2>' +
      '<p>' + C.bottomCta.body + '</p>' +
      '<a class="btn-stamp" href="' + cfg.base + 'index.html#lead-form">' + esc(label || C.bottomCta.cta) + ' <span class="ar">→</span></a>' +
      '<div class="bphone">Or call <a href="' + C.phoneHref + '">' + C.phone + '</a></div>' +
    '</div></section>';
  }

  function aboutHtml() {
    var P = window.CredoLP.parts;
    var sections = [
      ["Our specialty", "Debt validation and invalidation. Our attorneys compel creditors and collection agencies to prove that a debt is legitimate and enforceable, rather than settling or consolidating it. If validation fails, we defend you in court or negotiate the debt down as a fallback. That is the difference between a law firm and a debt-settlement or debt-consolidation company."],
      ["Who we help", "People facing consumer-debt distress: harassment from debt collectors, lawsuits over unpaid balances, wage garnishment, credit card debt, medical bills, and unsecured and payday loans."],
      ["What you can expect", "Plain language, a clear explanation of what each step does, and attorneys, not salespeople, on the phone. An attorney reviews every case."],
      ["How we work with you", "The first consultation is free. Legal services are provided only under a written engagement agreement between you and the firm, which sets out the services and the fees."]
    ];
    return head("About", "About Credo Legal", "A consumer-debt defense law firm working through attorneys licensed in the states we serve.") +
      '<div class="container"><div class="prose">' +
        sections.map(function (s) { return '<h2>' + esc(s[0]) + '</h2><p>' + esc(s[1]) + '</p>'; }).join("") +
      '</div></div>' +
      '<div class="container page-trust">' + P.ReviewBar(true) + '</div>' +
      pageCta();
  }

  var LEGAL_PAGES = { terms: "terms-of-use.html", privacy: "privacy-policy.html", cookie: "cookie-policy.html" };
  var LEGAL_NAMES = { terms: "Terms of Use", privacy: "Privacy Policy", cookie: "Cookie Policy" };
  /* Link the first mention of each other legal document in a block. */
  function crossLink(html, self) {
    Object.keys(LEGAL_NAMES).forEach(function (k) {
      if (k === self) return;
      var name = LEGAL_NAMES[k];
      var i = html.indexOf(name);
      if (i >= 0) html = html.slice(0, i) + '<a href="' + cfg.base + LEGAL_PAGES[k] + '">' + name + '</a>' + html.slice(i + name.length);
    });
    return html;
  }
  function legalHtml(key) {
    var doc = window.CREDO_LEGAL[key];
    var out = "", inList = false, upd = "";
    doc.blocks.forEach(function (b, i) {
      if (b.t === "h1") return;
      if (i <= 2 && /^Last updated/.test(b.x)) { upd = b.x; return; }
      if (b.t === "li") { if (!inList) { out += "<ul>"; inList = true; } out += "<li>" + crossLink(esc(b.x), key) + "</li>"; return; }
      if (inList) { out += "</ul>"; inList = false; }
      if (b.t === "h2" || b.t === "h3") out += "<" + b.t + ">" + esc(b.x) + "</" + b.t + ">";
      else out += "<p>" + crossLink(esc(b.x), key) + "</p>";
    });
    if (inList) out += "</ul>";
    var others = Object.keys(LEGAL_NAMES).filter(function (k) { return k !== key; }).map(function (k) {
      return '<a href="' + cfg.base + LEGAL_PAGES[k] + '">' + LEGAL_NAMES[k] + '</a>';
    }).join(" · ");
    return head("Legal", esc(doc.title), "", upd) +
      '<div class="container"><div class="prose">' +
        '<p class="note">Draft for review by the firm’s attorney. Text in square brackets is still to be confirmed.</p>' +
        out +
        '<h2>Related documents</h2><p>' + others + '</p>' +
      '</div></div>';
  }

  function thanksHtml() {
    var boxes = [
      ["Expertise", "Proven expertise", "Our attorneys have experience handling creditor disputes and helping clients reclaim control over their finances."],
      ["Guidance", "Personalized guidance", "Every financial challenge is unique. We tailor our approach to your circumstances."],
      ["Privacy", "Confidential and secure", "We handle all client information with care and strict confidentiality."],
      ["Contact", "Open communication", "We keep you informed at every step."]
    ];
    var C = window.CREDO;
    return head("Request received", "Thank you. Your request has been <em>received</em>.",
        "One of our legal professionals will contact you shortly to schedule your free, confidential consultation.") +
      '<div class="container"><div class="page-block">' +
        '<p class="note">Prototype: nothing was sent. On the live site this page follows a submitted form.</p>' +
        '<div class="box-grid">' + boxes.map(function (b, i) {
          return '<div class="box"><div class="bmeta"><span>' + String(i + 1).padStart(2, "0") + '</span><span>' + esc(b[0]) + '</span></div><h3>' + esc(b[1]) + '</h3><p>' + esc(b[2]) + '</p></div>';
        }).join("") + '</div>' +
        '<p class="after">Don’t want to wait? Call <a href="' + C.phoneHref + '">' + C.phone + '</a>, or go <a href="' + cfg.base + 'index.html">back to the home page</a>.</p>' +
      '</div></div>';
  }

  function render() {
    var L = window.CredoLP, p = cfg.page;
    if (p === "home" || p === "service") {
      L.render({ variant: "a", hero: "portrait" });
      if (p === "home") {
        var bar = document.querySelector("main .reviewbar");
        if (bar && bar.parentNode) bar.parentNode.insertAdjacentHTML("afterend", servicesSection());
      }
      /* arriving from another page's "Free review" button */
      if (location.hash === "#lead-form") {
        var f = document.getElementById("lead-form");
        if (f) window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - 72);   /* clear the sticky nav */
      }
    } else if (p === "about") {
      L.renderPage({ html: aboutHtml() });
    } else if (p === "thanks") {
      L.renderPage({ html: thanksHtml() });
    } else {
      L.renderPage({ html: legalHtml(p) });
    }
    /* close the mobile menu when a link in it is used or the page is clicked elsewhere */
    var menu = document.querySelector(".nav-menu");
    if (menu) document.addEventListener("click", function (e) { if (!menu.contains(e.target)) menu.removeAttribute("open"); });
  }

  window.CredoSite = { prepare: prepare, render: render };
})();
```

### tools/website-start/build.mjs (variant copy block shortened)
```js
#!/usr/bin/env node
/* Builds the website prototype (public/website-start) on top of the landing-page engine.

     node tools/website-start/build.mjs

   1. Syncs the engine from public/harassment-lp into public/website-start/lp/
      (tokens.css, lp.css, app.js, the content files the site uses, and assets).
   2. Writes shared/site-data.js: the six variants, the clusters, and for every
      service slot the content file plus its headline and lede (for the home tiles).
   3. Writes the pages: per variant index, about, terms-of-use, privacy-policy,
      cookie-policy, thank-you and six service pages; plus the hub (variants/index.html)
      and the root index.html.

   The legal texts come from tools/legal/build.py (shared/legal-content.js).
   Hand-written and kept: shared/site.js. Everything else under website-start is generated. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const LP = path.join(ROOT, 'public/harassment-lp');
const SITE = path.join(ROOT, 'public/website-start');

const CLUSTER_ORDER = ['harassment', 'lawsuit', 'creditCard', 'paydayLoan', 'medicalDebt', 'garnishment'];
const CLUSTERS = {
  harassment:  { slug: 'harassment',   label: 'Collector harassment' },
  lawsuit:     { slug: 'lawsuit',      label: 'Debt lawsuit' },
  creditCard:  { slug: 'credit-card',  label: 'Credit card debt' },
  paydayLoan:  { slug: 'payday-loan',  label: 'Payday loans' },
  medicalDebt: { slug: 'medical-debt', label: 'Medical debt' },
  garnishment: { slug: 'garnishment',  label: 'Wage garnishment' },
};

/* Landing-page slot (the names used in the 2026-06-01 variant brief) → today's content file. */
const SLOT = {
  'all-states-fdcpa-var-b-action-fast': 'act-fast',
  'all-states-garn-var-a-fight': 'garn-how-to-stop',
  'cc-harassment-var-a-stop-calls-dyn': 'cc-stop-calls',
  'cc-harassment-var-b-violations-dyn': 'cc-violations',
/* ---- helpers ------------------------------------------------------------ */
const w = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function loadContent(file) {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(LP, `content-${file}.js`), 'utf8'), ctx);
  return ctx.window.CREDO;
}
function copyDir(src, dst, skip) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.name.startsWith('.') || skip.includes(e.name)) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d, skip); else fs.copyFileSync(s, d);
  }
}

/* ---- 1. engine ---------------------------------------------------------- */
const used = new Set();
for (const v of VARIANT_ORDER) for (const k of CLUSTER_ORDER) {
  const f = SLOT[VARIANTS[v].services[k][0]];
  if (!f || !fs.existsSync(path.join(LP, `content-${f}.js`))) throw new Error(`no content file for ${v}/${k}`);
  used.add(f);
}
fs.rmSync(path.join(SITE, 'lp'), { recursive: true, force: true });
for (const f of ['tokens.css', 'lp.css', 'app.js']) { fs.mkdirSync(path.join(SITE, 'lp'), { recursive: true }); fs.copyFileSync(path.join(LP, f), path.join(SITE, 'lp', f)); }
for (const f of used) fs.copyFileSync(path.join(LP, `content-${f}.js`), path.join(SITE, 'lp', `content-${f}.js`));
copyDir(path.join(LP, 'assets'), path.join(SITE, 'lp/assets'), ['_who-prev-backup', 'design-system']);

/* ---- 2. site data ------------------------------------------------------- */
const data = { clusterOrder: CLUSTER_ORDER, clusters: CLUSTERS, variantOrder: VARIANT_ORDER, variants: {} };
for (const v of VARIANT_ORDER) {
  const V = VARIANTS[v], services = {};
  for (const k of CLUSTER_ORDER) {
    const [slot, fit, note] = V.services[k];
    const c = loadContent(SLOT[slot]);
    services[k] = { file: SLOT[slot], slot, fit, note: note || '', h1: c.hero.h1.join(''), lede: c.hero.lede };
  }
  data.variants[v] = { slug: v, label: V.label, tagline: V.tagline, home: V.home, homeH1: V.homeH1, homeSub: V.homeSub, clusterLead: V.clusterLead, visitor: V.visitor, services };
}
w(path.join(SITE, 'shared/site-data.js'),
  '/* Generated by tools/website-start/build.mjs. Do not edit by hand. */\nwindow.CREDO_SITE_DATA = ' + JSON.stringify(data, null, 1) + ';\n');

/* ---- 3. pages ----------------------------------------------------------- */
function page({ title, desc, root, base, content, legal, cfg }) {
  return `<!doctype html>
<html lang="en" data-labels="plain" data-borders="off" data-hero-style="portrait">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}"/>
<meta name="robots" content="noindex"/>
<link rel="preload" href="${root}lp/assets/fonts/HankenGrotesk-latin.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="stylesheet" href="${root}lp/tokens.css"/>
<link rel="stylesheet" href="${root}lp/lp.css"/>
</head>
<body>
<div id="root"></div>
<script src="${root}lp/content-${content}.js"></script>
${legal ? `<script src="${root}shared/legal-content.js"></script>\n` : ''}<script src="${root}shared/site-data.js"></script>
<script src="${root}shared/site.js"></script>
<script>CredoSite.prepare(${JSON.stringify({ ...cfg, root, base })});</script>
<script src="${root}lp/app.js"></script>
<script>CredoSite.render();</script>
</body>
</html>
`;
}

fs.rmSync(path.join(SITE, 'variants'), { recursive: true, force: true });
let count = 0;
for (const v of VARIANT_ORDER) {
  const V = data.variants[v], dir = path.join(SITE, 'variants', v);
  const homeFile = V.services[V.home].file;
  const put = (rel, o) => { w(path.join(dir, rel), page(o)); count++; };
  const top = { root: '../../', base: '', content: homeFile };
  put('index.html', { ...top, title: `${V.homeH1.join('')} | Credo Legal`, desc: V.homeSub, cfg: { variant: v, page: 'home' } });
  put('about.html', { ...top, title: 'About | Credo Legal', desc: 'A consumer-debt defense law firm working through attorneys licensed in the states we serve.', cfg: { variant: v, page: 'about' } });
  put('thank-you.html', { ...top, title: 'Thank you | Credo Legal', desc: 'Your request has been received.', cfg: { variant: v, page: 'thanks' } });
  for (const [key, file, name] of [['terms', 'terms-of-use', 'Terms of Use'], ['privacy', 'privacy-policy', 'Privacy Policy'], ['cookie', 'cookie-policy', 'Cookie Policy']])
    put(`${file}.html`, { ...top, legal: true, title: `${name} | Credo Legal`, desc: `${name} of the Credo Legal website.`, cfg: { variant: v, page: key } });
  for (const k of CLUSTER_ORDER) {
    const s = V.services[k];
    put(`services/${CLUSTERS[k].slug}.html`, { root: '../../../', base: '../', content: s.file, title: `${s.h1} | Credo Legal`, desc: s.lede, cfg: { variant: v, page: 'service', cluster: k } });
  }
}

/* hub */
const hub = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Credo Legal | Website prototype · six variants</title>
<meta name="robots" content="noindex"/>
<link rel="stylesheet" href="../lp/tokens.css"/>
<link rel="stylesheet" href="../lp/lp.css"/>
<style>
  .hub-head { padding: 48px 0 28px; border-bottom: 2px solid var(--fg); }
  .hub-head img { height: 40px; width: auto; margin-bottom: 28px; }
  .hub-head h1 { font-size: clamp(30px, 4vw, 46px); font-weight: var(--fw-medium); letter-spacing: -0.02em; line-height: 1.1; margin: 8px 0 14px; }
  .hub-head p { max-width: 760px; color: var(--fg-muted); line-height: 1.6; margin: 0 0 8px; }
  .hv { padding: 40px 0; border-bottom: 1px solid var(--border); }
  .hv h2 { font-size: 26px; font-weight: var(--fw-semi); margin: 6px 0 6px; }
  .hv .who { color: var(--fg-muted); max-width: 760px; line-height: 1.55; margin: 0 0 18px; }
  .hv .links { display: flex; flex-wrap: wrap; gap: 10px 22px; margin: 0 0 6px; font-size: 11px; font-weight: var(--fw-bold); letter-spacing: var(--tracking-widest); text-transform: uppercase; }
  .hv .links a { color: var(--credo-red); }
  .svc .fit { color: var(--credo-red); }
  .svc .fit.best { color: var(--fg-muted); }
  .hub-foot { padding: 28px 0 56px; color: var(--fg-muted); font-size: var(--fs-body-sm); line-height: 1.6; }
</style>
</head>
<body>
<main><div class="lp">
<div class="container hub-head">
  <img src="../lp/assets/credo-logo.png" alt="Credo Legal"/>
  <div class="eyebrow">Website prototype</div>
  <h1>Six site variants, one design.</h1>
  <p>Each variant is a complete site built around one angle: a home page, six service pages, an about page, and the Terms of Use, Privacy Policy and Cookie Policy. Every page uses the landing-page design as it is on Webflow today (staging.credolegal.com) and today's landing-page copy.</p>
  <p>"Perfect fit" means the cluster has a landing page at exactly that angle. "Best fit" is the closest available page.</p>
</div>
${VARIANT_ORDER.map((v, n) => { const V = data.variants[v]; return `<section class="hv"><div class="container">
  <div class="eyebrow">Variant ${String(n + 1).padStart(2, '0')} · ${esc(V.tagline)}</div>
  <h2>${esc(V.label)}</h2>
  <p class="who">${esc(V.visitor)}</p>
  <div class="links"><a href="${v}/index.html">Open the site →</a><a href="${v}/about.html">About</a><a href="${v}/terms-of-use.html">Terms of Use</a><a href="${v}/privacy-policy.html">Privacy Policy</a><a href="${v}/cookie-policy.html">Cookie Policy</a></div>
  <div class="svc-grid">${CLUSTER_ORDER.map((k, i) => { const s = V.services[k]; return `
    <a class="svc" href="${v}/services/${CLUSTERS[k].slug}.html"><div class="sm"><span>${String(i + 1).padStart(2, '0')} · ${esc(CLUSTERS[k].label)}</span><span class="fit ${s.fit}">${s.fit} fit</span></div><h3>${esc(s.h1)}</h3><p>${esc(s.note || s.lede)}</p></a>`; }).join('')}
  </div>
</div></section>`; }).join('\n')}
<div class="container hub-foot">Prototype for review. Forms do not send anything. The legal pages are drafts pending review by the firm's attorney.</div>
</div></main>
</body>
</html>
`;
w(path.join(SITE, 'variants/index.html'), hub);
w(path.join(SITE, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="robots" content="noindex"/>
<meta http-equiv="refresh" content="0; url=variants/"/><title>Credo Legal | Website prototype</title></head>
<body><p><a href="variants/">Credo Legal website prototype: six variants</a></p></body></html>
`);

console.log(`engine: ${used.size} content files · pages: ${count} + hub + root index`);
```

### diff public/harassment-lp/app.js
```diff
diff --git a/public/harassment-lp/app.js b/public/harassment-lp/app.js
index 471f068..9d39a1f 100644
--- a/public/harassment-lp/app.js
+++ b/public/harassment-lp/app.js
@@ -12,6 +12,9 @@
   "use strict";
 
   var C = window.CREDO;
+  /* Asset base (added 2026-10-02): pages outside this folder (the website prototype) set
+   * window.CREDO_ASSET_BASE to the folder that holds assets/. Empty for the LP prototype. */
+  var AB = (window.CREDO_ASSET_BASE || "") + "assets/";
 
   /* ---- inline SVG icons (Lucide-style, stroke currentColor) -------------- */
   var Ico = {
@@ -169,20 +172,42 @@
      SECTION MARKUP (returns HTML strings; classes identical to prototype)
      ====================================================================== */
 
+  /* Site navigation (added 2026-10-02, website prototype). When the content object carries
+   * C.site = { home, links: [{ text, href } | { text, items: [{ text, href, current }] }], cta: { href } },
+   * the nav shows those links (with a dropdown and a mobile menu) instead of the landing page's
+   * in-page anchors. Landing pages have no C.site and render exactly as before. */
+  function SiteLinks(S) {
+    return (S.links || []).map(function (l) {
+      if (l.items) {
+        return '<div class="nav-dd"><button type="button" class="nav-dd-t" aria-haspopup="true">' + esc(l.text) + ' <span aria-hidden="true">▾</span></button>' +
+          '<div class="nav-dd-m">' + l.items.map(function (it) {
+            return '<a href="' + esc(it.href) + '"' + (it.current ? ' aria-current="page"' : '') + '>' + esc(it.text) + '</a>';
+          }).join("") + '</div></div>';
+      }
+      return '<a href="' + esc(l.href) + '"' + (l.current ? ' aria-current="page"' : '') + '>' + esc(l.text) + '</a>';
+    }).join("");
+  }
   function Nav() {
+    var S = C.site;
+    var links = S ? SiteLinks(S) :
+      '<a href="#whatwedo">What we do</a>' +
+      '<a href="#why">Why us</a>' +
+      '<a href="#process">How it works</a>' +
+      '<a href="#rights">Your rights</a>' +
+      '<a href="#faq">FAQ</a>';
+    var cta = (S && S.cta && S.cta.href)
+      ? '<a href="' + esc(S.cta.href) + '" class="nav-cta">Free review →</a>'
+      : '<a href="#lead-form" data-scrollform class="nav-cta">Free review →</a>';
+    var menu = S
+      ? '<details class="nav-menu"><summary aria-label="Menu">Menu</summary><div class="nav-menu-m">' + SiteLinks(S) + '</div></details>'
+      : '';
     return '' +
-      '<nav class="nav"><div class="container nav-inner">' +
-        '<a href="#top" class="brand"><img src="assets/credo-logo.png" alt="Credo Legal, consumer-debt defense law firm"/></a>' +
+      '<nav class="nav' + (S ? ' nav-site' : '') + '"><div class="container nav-inner">' +
+        '<a href="' + (S ? esc(S.home) : '#top') + '" class="brand"><img src="' + AB + 'credo-logo.png" alt="Credo Legal, consumer-debt defense law firm"/></a>' +
         '<div class="nav-right">' +
-          '<div class="nav-links">' +
-            '<a href="#whatwedo">What we do</a>' +
-            '<a href="#why">Why us</a>' +
-            '<a href="#process">How it works</a>' +
-            '<a href="#rights">Your rights</a>' +
-            '<a href="#faq">FAQ</a>' +
-          '</div>' +
+          '<div class="nav-links">' + links + '</div>' +
           '<a href="' + C.phoneHref + '" class="nav-phone"><span class="nav-phone-pre">Call us: </span>' + C.phone + '</a>' +
-          '<a href="#lead-form" data-scrollform class="nav-cta">Free review →</a>' +
+          cta + menu +
         '</div>' +
       '</div></nav>';
   }
@@ -222,9 +247,9 @@
     return '' +
       '<div class="hero-figure" data-style="' + hs + '" data-subject="' + subj + '" data-variant-scope="hero">' +
         '<picture>' +
-          '<source srcset="assets/' + slug + '-960.webp" media="(min-width: 768px)" type="image/webp"/>' +
-          '<source srcset="assets/' + slug + '-480.webp" type="image/webp"/>' +
-          '<img src="assets/' + slug + '-480.jpg" loading="eager" decoding="async" alt="' + esc(alt) + '"/>' +
+          '<source srcset="' + AB + slug + '-960.webp" media="(min-width: 768px)" type="image/webp"/>' +
+          '<source srcset="' + AB + slug + '-480.webp" type="image/webp"/>' +
+          '<img src="' + AB + slug + '-480.jpg" loading="eager" decoding="async" alt="' + esc(alt) + '"/>' +
         '</picture>' +
       '</div>';
   }
@@ -262,9 +287,9 @@
     return '' +
       '<div class="body-fig has-img"' + scopeAttr + '>' +
         '<picture>' +
-          '<source srcset="assets/' + slug + '-960.webp" media="(min-width: 768px)" type="image/webp"/>' +
-          '<source srcset="assets/' + slug + '-480.webp" type="image/webp"/>' +
-          '<img src="assets/' + slug + '-480.jpg" alt="' + esc(alt) + '" loading="lazy" decoding="async"/>' +
+          '<source srcset="' + AB + slug + '-960.webp" media="(min-width: 768px)" type="image/webp"/>' +
+          '<source srcset="' + AB + slug + '-480.webp" type="image/webp"/>' +
+          '<img src="' + AB + slug + '-480.jpg" alt="' + esc(alt) + '" loading="lazy" decoding="async"/>' +
         '</picture>' +
       '</div>';
   }
@@ -389,7 +414,7 @@
     return '' +
       '<div class="form-overlay" role="dialog" aria-modal="true" aria-label="Free case evaluation">' +
         '<div class="fo-bar">' +
-          '<span class="fo-brand"><img src="assets/credo-logo.png" alt="Credo Legal"/></span>' +
+          '<span class="fo-brand"><img src="' + AB + 'credo-logo.png" alt="Credo Legal"/></span>' +
           '<span class="fo-step">FREE CASE EVALUATION · STEP ' + (state.step + 1) + ' OF 3</span>' +
           '<button class="fo-close" data-fo-close aria-label="Close">' + Ico.close + '</button>' +
         '</div>' +
@@ -451,9 +476,9 @@
     var r = C.reviews;
     var rows = '' +
       '<div class="rev-row">' +
-        '<div class="rev" data-slot="reviews.bbb">' + BBBMark() + '<div><div class="rv-title">' + r.bbb.title + '</div><div class="rv-meta">' + r.bbb.meta + '</div></div></div>' +
+        /* 2026-10-02: order and set as on Webflow (Trustpilot widget, BBB seal); the Google badge is not on the live pages. */
         '<div class="rev" data-slot="reviews.trustpilot">' + TrustpilotMark() + '<div><div class="rv-title">' + r.trustpilot.title + ' ' + Stars(4.5) + '</div><div class="rv-meta">' + r.trustpilot.meta + '</div></div></div>' +
-        '<div class="rev" data-slot="reviews.google">' + GoogleMark() + '<div><div class="rv-title">' + r.google.title + ' ' + Stars(4.7) + '</div><div class="rv-meta">' + r.google.meta + '</div></div></div>' +
+        '<div class="rev" data-slot="reviews.bbb">' + BBBMark() + '<div><div class="rv-title">' + r.bbb.title + '</div><div class="rv-meta">' + r.bbb.meta + '</div></div></div>' +
       '</div>';
     var mrow = "";
     if (metrics) {
@@ -505,7 +530,7 @@
       '<div class="eyebrow">How it works</div>' +
       '<h2 class="h2">A clear sequence, on a known timeline.</h2>' +
       '<div class="process' + (cols ? " cols" : "") + '" style="margin-top:28px">' + C.howItWorks.map(function (row, i) {
-        return '<div class="step"><div class="n">' + pad2(i + 1) + '</div><div><h3 data-slot="howItWorks[' + i + '].label">' + row[0] + '</h3><p data-slot="howItWorks[' + i + '].body">' + row[1] + '</p><div class="when" data-slot="howItWorks[' + i + '].timeMarker">' + row[2] + '</div></div></div>';
+        return '<div class="step"><div class="n">' + pad2(i + 1) + '</div><div><h3 data-slot="howItWorks[' + i + '].label">' + row[0] + '</h3><p data-slot="howItWorks[' + i + '].body">' + row[1] + '</p></div></div>';   /* time tags (row[2]) removed 2026-10-02, as on Webflow (PBI-32) */
       }).join("") + '</div>';
   }
   function Rights() {
@@ -552,7 +577,9 @@
   function Footer() {
     var F = C.footer || {};
     var links = (F.links || []).map(function (l) {
-      return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.text) + '</a>';
+      return l.external === false
+        ? '<a href="' + esc(l.href) + '">' + esc(l.text) + '</a>'
+        : '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.text) + '</a>';
     }).join("");
     var phones = (F.phones || []).map(function (p) {
       return '<div class="fcontact-row"><span class="flabel">' + esc(p.label) + '</span>' +
@@ -563,13 +590,14 @@
         '<a href="' + esc(F.emailHref || ('mailto:' + F.email)) + '">' + esc(F.email) + '</a></div>'
       : '';
     // Site legal statements (from the live LP) + campaign compliance tail.
-    var legal = ((F.legal || []).join(" ") +
+    // F.disclaimer (optional, added 2026-10-02) replaces the composed statement with the exact footer text used on Webflow.
+    var legal = F.disclaimer ? esc(F.disclaimer) : ((F.legal || []).join(" ") +
       ' ' + esc(F.entity || 'Credo Legal') + ' is a multi-jurisdictional law firm. ' +
       'Not a debt-settlement company. Not a credit-counseling service.').trim();
     return '' +
       '<footer class="foot"><div class="container">' +
         '<div class="frow">' +
-          '<a href="#top" class="brand"><img src="assets/credo-logo.png" alt="Credo Legal"/></a>' +
+          '<a href="' + (C.site ? esc(C.site.home) : '#top') + '" class="brand"><img src="' + AB + 'credo-logo.png" alt="Credo Legal"/></a>' +
           '<div class="flinks">' + links + '</div>' +
         '</div>' +
         '<div class="fgrid">' +
@@ -643,7 +671,7 @@
           InlineCTA("Speak to an attorney now") +
         '</div></section>' +
 
-        '<div class="container">' + ReviewBar(false) + '</div>' +
+        '<div class="container">' + ReviewBar(true) + '</div>' +
 
         '<section class="section" id="rights"><div class="container">' +
           '<div>' + SectionNo("06", "Statute") + Rights() + '</div>' +
@@ -695,7 +723,7 @@
           '</div>' +
         '</div></section>' +
 
-        '<div class="container">' + ReviewBar(false) + '</div>' +
+        '<div class="container">' + ReviewBar(true) + '</div>' +
 
         '<section class="section" id="rights"><div class="container">' +
           '<div>' + SectionNo("06", "Statute") + Rights() + '</div>' +
@@ -830,7 +858,7 @@
     if (next) next.addEventListener("click", function () { state.step++; renderOverlay(); });
     var submit = root.querySelector("[data-fo-submit]");
     if (submit) submit.addEventListener("click", function () {
-      if (canSubmit()) window.location.href = "thank-you.html";
+      if (canSubmit()) window.location.href = (C.site && C.site.thankYou) || "thank-you.html";
     });
     var close = root.querySelector("[data-fo-close]");
     if (close) close.addEventListener("click", closeOverlay);
@@ -890,7 +918,7 @@
 
     var root = document.getElementById("root");
     var body = variant === "c" ? VariantC() : VariantA();
-    root.innerHTML = Nav() + body + Footer() + StickyCTA();
+    root.innerHTML = Nav() + '<main>' + body + '</main>' + Footer() + StickyCTA();   /* <main> as on Webflow (PBI-34) */
 
     wireScrollForm(root);
     wireInlineForm();
@@ -904,5 +932,18 @@
     };
   }
 
-  window.CredoLP = { render: render };
+  /* Non-landing pages of the website prototype (about, legal): same nav and footer around the
+   * given HTML, no lead form. opts.html is trusted markup written by the site templates. */
+  function renderPage(opts) {
+    opts = opts || {};
+    document.documentElement.setAttribute("data-labels", "plain");
+    var root = document.getElementById("root");
+    root.innerHTML = Nav() + '<main><div class="lp page" data-variant="page">' + (opts.html || "") + '</div></main>' + Footer() + StickyCTA();
+  }
+
+  window.CredoLP = {
+    render: render,
+    renderPage: renderPage,
+    parts: { esc: esc, pad2: pad2, SectionNo: SectionNo, ReviewBar: ReviewBar, HowItWorks: HowItWorks, FAQ: FAQ, BottomCTA: BottomCTA, InlineCTA: InlineCTA }
+  };
 })();
```
### diff lp.css + tokens.css
```diff
diff --git a/public/harassment-lp/lp.css b/public/harassment-lp/lp.css
index 5c522c9..a0c7d05 100644
--- a/public/harassment-lp/lp.css
+++ b/public/harassment-lp/lp.css
@@ -263,7 +263,7 @@ a.hero-call:hover { color: var(--credo-red); }
 /* ===== Review bar (BBB / Trustpilot / Google + headline metrics) ========= */
 .reviewbar { border-top: 2px solid var(--fg); border-bottom: 2px solid var(--fg); background: #fff; }
 .reviewbar .rev-row { display: grid; grid-template-columns: 1fr; }
-@media (min-width: 720px){ .reviewbar .rev-row { grid-template-columns: repeat(3, 1fr); } }
+@media (min-width: 720px){ .reviewbar .rev-row { grid-template-columns: repeat(2, 1fr); } }   /* two badges since 2026-10-02 (Trustpilot, BBB), as on Webflow */
 .reviewbar .rev { display: flex; align-items: center; gap: 14px; padding: 18px 22px; border-bottom: 1px solid var(--border); }
 @media (min-width: 720px){ .reviewbar .rev { border-bottom: 0; border-right: 1px solid var(--border); } .reviewbar .rev:last-child { border-right: 0; } }
 .reviewbar .rev .logo { flex: none; }
@@ -698,3 +698,78 @@ html[data-borders="off"] .multi-dd-panel {
   border-radius: 4px;
 }
 html[data-borders="off"] .multi-opt { border-bottom-color: var(--border-soft); }
+
+
+/* ===== Website prototype additions (2026-10-02) ============================
+   Only used when the content object carries C.site (site navigation) or a page is
+   rendered with CredoLP.renderPage (about, legal). Landing pages are unaffected. */
+.nav-site .nav-links { align-items: center; }
+.nav-links a[aria-current="page"] { color: var(--credo-red); }
+.nav-dd { position: relative; }
+.nav-dd-t {
+  font: inherit; font-size: 11px; color: var(--fg); font-weight: var(--fw-semi);
+  letter-spacing: var(--tracking-widest); text-transform: uppercase;
+  background: none; border: 0; padding: 0; cursor: pointer;
+}
+.nav-dd-t:hover, .nav-dd:focus-within .nav-dd-t { color: var(--credo-red); }
+.nav-dd-m {
+  display: none; position: absolute; top: 100%; left: -18px; min-width: 220px; padding: 10px 0;
+  background: #fff; border: 1px solid var(--border); border-top: 2px solid var(--fg); z-index: 60;
+}
+.nav-dd:hover .nav-dd-m, .nav-dd:focus-within .nav-dd-m { display: block; }
+.nav-dd-m a { display: block; padding: 9px 18px; }
+.nav-menu { display: none; position: relative; }
+.nav-menu summary {
+  list-style: none; cursor: pointer; padding: 8px 12px; border: 1px solid var(--fg);
+  font-size: 10px; font-weight: var(--fw-bold); letter-spacing: var(--tracking-widest); text-transform: uppercase;
+}
+.nav-menu summary::-webkit-details-marker { display: none; }
+.nav-menu-m {
+  position: absolute; right: 0; top: calc(100% + 12px); width: min(78vw, 300px); padding: 8px 0;
+  background: #fff; border: 1px solid var(--border); border-top: 2px solid var(--fg); z-index: 60;
+}
+.nav-menu-m a, .nav-menu-m .nav-dd-t {
+  display: block; width: 100%; text-align: left; padding: 11px 18px;
+  font-size: 11px; font-weight: var(--fw-semi); letter-spacing: var(--tracking-widest); text-transform: uppercase; color: var(--fg);
+}
+.nav-menu-m .nav-dd-t { color: var(--fg-muted); cursor: default; }
+.nav-menu-m .nav-dd-m { display: block; position: static; border: 0; padding: 0 0 6px; min-width: 0; }
+.nav-menu-m .nav-dd-m a { padding-left: 32px; }
+@media (max-width: 860px){ .nav-site .nav-menu { display: block; } .nav-site .nav-cta { display: none; } }
+
+/* Home: the six services */
+.svc-grid { display: grid; grid-template-columns: 1fr; border-top: 2px solid var(--fg); border-left: 1px solid var(--border); margin-top: 28px; }
+@media (min-width: 600px){ .svc-grid { grid-template-columns: 1fr 1fr; } }
+@media (min-width: 900px){ .svc-grid { grid-template-columns: repeat(3, 1fr); } }
+.svc { display: block; padding: 22px 22px 24px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); background: #fff; color: var(--fg); transition: background var(--t-fast); }
+.svc:hover { background: var(--bg-soft); }
+.svc .sm { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-wide); text-transform: uppercase; color: var(--fg-muted); }
+.svc h3 { font-size: 18px; font-weight: var(--fw-bold); margin: 14px 0 6px; line-height: 1.25; }
+.svc p { font-size: var(--fs-body-sm); color: var(--fg-muted); margin: 0; line-height: 1.5; }
+.svc .go { display: inline-block; margin-top: 14px; font-size: 10px; font-weight: var(--fw-bold); letter-spacing: var(--tracking-widest); text-transform: uppercase; color: var(--credo-red); }
+
+/* About and legal pages */
+.page .page-head { padding: 56px 0 28px; border-bottom: 2px solid var(--fg); }
+.page .page-head h1 { font-size: clamp(32px, 4.4vw, 52px); font-weight: var(--fw-medium); letter-spacing: -0.02em; line-height: 1.08; margin: 10px 0 0; }
+.page .page-head h1 em { color: var(--credo-red); font-style: normal; }
+.page .page-head .lede { margin: 16px 0 0; max-width: 720px; }
+.page .page-head .upd { font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-wide); text-transform: uppercase; color: var(--fg-muted); margin-top: 18px; }
+.page .prose { max-width: 780px; padding: 36px 0 72px; }
+.page .prose h2 { font-size: 24px; font-weight: var(--fw-semi); letter-spacing: -0.01em; line-height: 1.25; margin: 44px 0 12px; padding-top: 20px; border-top: 1px solid var(--border); }
+.page .prose h2:first-child { margin-top: 0; padding-top: 0; border-top: 0; }
+.page .prose h3 { font-size: 17px; font-weight: var(--fw-bold); margin: 26px 0 8px; }
+.page .prose p, .page .prose li { font-size: var(--fs-body); line-height: 1.65; color: var(--fg); }
+.page .prose p { margin: 0 0 14px; }
+.page .prose ul { margin: 0 0 16px; padding-left: 20px; }
+.page .prose li { margin: 0 0 6px; }
+.page .prose a { color: var(--credo-red); border-bottom: 1px solid currentColor; }
+.page .prose table { width: 100%; border-collapse: collapse; margin: 8px 0 22px; font-size: var(--fs-body-sm); }
+.page .prose th, .page .prose td { text-align: left; vertical-align: top; padding: 10px 12px 10px 0; border-bottom: 1px solid var(--border); line-height: 1.5; }
+.page .prose th { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-wide); text-transform: uppercase; color: var(--fg-muted); border-bottom: 2px solid var(--fg); }
+.page .prose .table-wrap { overflow-x: auto; }
+.page .note { font-size: var(--fs-body-sm); color: var(--fg-muted); background: var(--bg-soft); border-left: 3px solid var(--credo-red); padding: 14px 18px; margin: 0 0 28px; }
+.page .page-block { padding: 36px 0 72px; }
+.page .page-block .note { max-width: 780px; }
+.page .page-block .after { margin: 28px 0 0; font-size: var(--fs-body); }
+.page .page-block .after a { color: var(--credo-red); border-bottom: 1px solid currentColor; }
+.page .page-trust { padding-bottom: 72px; }
diff --git a/public/harassment-lp/tokens.css b/public/harassment-lp/tokens.css
index 31d2eb2..baf9471 100644
--- a/public/harassment-lp/tokens.css
+++ b/public/harassment-lp/tokens.css
@@ -3,7 +3,10 @@
    Hanken Grotesk · brand red #c92028 · editorial "legal ledger" language.
    ========================================================================== */
 
-@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap');
+/* 2026-10-02: fonts self-hosted, as on Webflow since PBI-26 (no Google Fonts request). Same files as the live site:
+   Hanken Grotesk variable 300-700, and Inconsolata under the name "Credo Mono" (variable 200-900). */
+@font-face { font-family: 'Hanken Grotesk'; src: url('assets/fonts/HankenGrotesk-latin.woff2') format('woff2'); font-weight: 300 700; font-style: normal; font-display: swap; }
+@font-face { font-family: 'Credo Mono'; src: url('assets/fonts/CredoMono-Inconsolata-latin.woff2') format('woff2'); font-weight: 200 900; font-style: normal; font-display: swap; }
 
 :root {
   /* ---- Brand color ----------------------------------------------------- */
@@ -49,13 +52,13 @@
   --t-base:           240ms cubic-bezier(.4,0,.2,1);
 
   /* ---- Layout ---------------------------------------------------------- */
-  --max-width:        1180px;
+  --max-width:        1300px;   /* as the Webflow containers (was 1180px until 2026-10-02) */
   --gutter:           24px;
 
   /* ---- Type families --------------------------------------------------- */
   --font-sans:        'Hanken Grotesk', -apple-system, BlinkMacSystemFont,
                       'Segoe UI', Roboto, sans-serif;
-  --font-mono:        ui-monospace, SFMono-Regular, Menlo, monospace;
+  --font-mono:        'Credo Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
 
   /* ---- Type scale ------------------------------------------------------
      Action 7 (post-review 2026-06-02): per-page visible sizes constrained
```
