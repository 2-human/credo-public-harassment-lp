# PBI-43 · The default site on staging's root domain (6 Oct 2026)

## What this is
The operator asked for a default version of the website for visitors who type the root domain (no ad, no microsite):
a home page "Debt Defense Services by Real Attorneys" and six landing pages, one per debt type. Operator decisions
(6 Oct): addresses `debt-{type}-defense-services`; titles end " | Credo Legal"; the new home **replaces** the old root
home; About and the three legal pages list the six default pages under Services. Only Webflow staging was changed
(staging.credolegal.com is the site being built; start.credolegal.com, enroll and Google Ads untouched; start last
published 23 Sep, enroll 2 Oct).

## What was done on staging (Webflow MCP)
1. Six pages created by duplicating the live landing page of the same debt type (keeps the 8 shared `LP ·` components),
   then: slug, SEO title/description, head code (noindex, canonical to start.credolegal.com/<slug>), all component props
   from `tools/webflow/clusters/default-cluster.json` via `default-cluster-payload.mjs`, navbar (Site menu on, the six
   pages under Services), footer logo link `/`.
2. Root home: the old hand-built `<main>` was saved as a library component "Legacy root home (backup 6 Oct)" (not placed;
   insert it to restore), its 8 children removed, the 8 `LP ·` components inserted in order and filled (hero, what we do +
   why Credo, Common problems in "home mode" = six service cards linking to the six pages, how it works, FAQ only (rights
   hidden), bottom CTA). New SEO, head code, FAQPage JSON-LD.
3. About + privacy/terms/cookie: Services menu → the six default pages (before: the seven microsite homes).
4. Phone table (site footer code `window.CREDO_PHONES`): six rows = the root home's numbers (google/default (718)
   865-8350, meta (218) 565-7350, bing (823) 862-9340). PBI-42's ad-visit lock is unchanged.
5. Published to the staging domain only (`customDomains:[staging]`, `publishToWebflowSubdomain:false`), twice (the
   second after fixing JSON-LD, see Findings).

## Findings during the work
- `update_page_settings` / `bulk_update_pages` with `jsonLdSchema` returned success but **did not store it** (served
  pages had the old or no FAQ JSON-LD). `bulk_update_pages_schema_markup` stores it; verified on the served pages.
- The site stylesheet was recompiled: per selector, 85 rules removed, all ending `-2faf219d` (grid rules of the removed
  old root elements); nothing added or changed.

## Verification (all pass)
- `tools/webflow/clusters/verify-default-site.py` (served HTML): per page 200, title, description, one H1 = the title
  without the suffix, canonical + noindex, FAQPage JSON-LD equal to the payload, the form, the six-page menu, no
  component placeholder text; About/legal menus; served phone table and the whole site footer byte-identical to the local
  file; /respond and /debt-harassment-stop-calls unchanged apart from the phone table, publish stamp and CSS file name.
- `verify-default-site-browser.mjs` (Playwright, trackers + non-GET answered locally, no form sent): numbers per source
  none/google/meta/bing on all 7 pages; a Meta click on /debt-lawsuit-respond-on-time keeps (718) 521-4060 on /, a
  default page and /about; form step 1 present; no page errors; axe serious/critical: none (donor: none).
- `check-phone-table.py`: every form page linked from home has a row.
- Marketing Hub: snapshot (67 pages), 102 mirrored pages, `check-microsites.mjs` 204 loads pass,
  `check-mirror.mjs` 18 pages equal staging at 1440 and 390 (incl. the default home and one default page).

## Review questions
1. Code: anything wrong or fragile in the hub changes (diff below) or the two verification scripts?
2. Is "About/legal list the six default pages" (staging) correctly reflected in the cluster microsites' About pages
   in the hub, and is the updated check rule right?
3. UX (screenshots): does the root home work as a default entry point (hierarchy, the six cards, FAQ without the rights
   table)? Anything confusing about the Services menu on About now pointing to the default pages for a visitor who
   arrived through a cluster microsite?
4. Copy is a draft for the attorney's review; flag only claims that look risky for attorney advertising.

## Root home copy (as published)
- **LP · Hero**: Debt Defense Services by  | Real Attorneys | Collectors calling, a lawsuit, a garnishment: our licensed attorneys make creditors prove the debt and defend you. We are a law firm, not a debt settlement company. | Fill in the form below or call us for a free review of your case. | How much do you currently owe in total?
- **LP · What we do**: A law firm on your side of the debt. | Credo Legal is a consumer-debt defense law firm. Before anything is paid, we make the creditor prove the debt, enforce your rights against collectors and defend you in court. If the debt holds up, we negotiate from a position of strength. | Demand proof that the debt is valid and the amount is right. | Stop harassment and act on collector violations. | Answer lawsuits and defend you in court. | Protect your wages and income from improper garnishment. | Negotiate a resolution when that is the better outcome. | Real attorneys, licensed in the states we serve | Your case is handled by lawyers, not salespeople or a call center. | Proof first, settlement last | We make creditors prove the debt before anything is paid. | Every type of consumer debt | Credit cards, medical bills, payday and personal loans: one team handles the calls, the court and the debt. | Free consultation | No cost to find out what's happening and what we can do about it. | Flexible payment plans | Legal help that works with your financial situation, not against it.
- **LP · Common problems**: Our services | Which describes you? | Choose the situation closest to yours. | HARASSMENT | Debt Harassment Defense Services | Calls at all hours, calls to your job, threats. We make them stop and hold collectors to the law. | CREDIT CARD | Credit Card Debt Defense Services | Behind on cards or chased by a debt buyer. We check what you really owe and defend you. | LAWSUIT | Debt Lawsuit Defense Services | Served with court papers. We file your answer on time and make them prove the claim. | PAYDAY LOAN | Payday Loan Debt Defense Services | Rollovers, bank withdrawals, threats. We check whether the loan was legal and defend you. | MEDICAL DEBT | Medical Debt Defense Services | Medical bills in collections or in court. We check the charges and defend you. | GARNISHMENT | Wage Garnishment Defense Services | Paycheck garnished or about to be. We check the judgment and protect what you earn.
- **LP · How it works**: Free consultation | Tell us what's happening. No cost, no commitment. | Case review | Our attorneys examine the debt, the collector's conduct and the legal claims available to you. | Recommendation | We explain your options and which one fits your situation best. | Action | If you move forward, we handle the filings, letters and follow-up.
- **LP · Rights and FAQ**: Is Credo Legal a debt settlement company? | No. Credo Legal is a law firm. Settlement companies negotiate payoffs. Our attorneys first make creditors prove the debt, enforce your rights and defend you in court, and negotiate when that is the better outcome. | How much does it cost? | The consultation is free. After that, our legal work is covered by a flat monthly fee: no contingency cut and no settlement account to fund. | Where do you practice? | Our attorneys are licensed across most U.S. states. We currently do not serve residents of the District of Columbia, Delaware, Idaho, North Carolina, Oklahoma, West Virginia or Wyoming, and we confirm coverage before you commit. | What kinds of debt do you handle? | Unsecured consumer debt: credit cards, medical bills, payday and personal loans. We do not handle student loans, tax debt, child support or government debt. | What if I have already been sued? | Contact us right away. A lawsuit has a deadline to respond, and our attorneys can file your answer and defend you.
- **LP · Bottom CTA**: You don't have to face collectors alone. An attorney reviews your case for free.

## Diff (hub and payload code)
```diff
diff --git a/public/marketing-hub/app.js b/public/marketing-hub/app.js
index 3bd0c79..8255f2c 100644
--- a/public/marketing-hub/app.js
+++ b/public/marketing-hub/app.js
@@ -56,7 +56,7 @@
   var sites = S.sites.map(function (s) {
     var pages = SHARED.map(function (x) {
       return { id: x[0], label: x[1], kind: x[2], file: 'microsites/' + s.angle + '/' + x[0] + '.html',
-               staging: STAGING + (x[0] === 'index' ? s.angle : x[0]), live: null, liveSlug: null, inMenu: null };
+               staging: STAGING + (x[0] === 'index' ? (s.home != null ? s.home : s.angle) : x[0]), live: null, liveSlug: null, inMenu: null };
     });
     s.types.forEach(function (t) {
       t.pages.forEach(function (p) {
@@ -66,7 +66,7 @@
           running: p.running, hadAd: p.hadAd, reg: reg });
       });
     });
-    return { angle: s.angle, label: s.label, homeCopy: s.homeCopy, pages: pages, types: s.types };
+    return { angle: s.angle, home: s.home != null ? s.home : s.angle, label: s.label, homeCopy: s.homeCopy, pages: pages, types: s.types };   /* home: staging address of the home (PBI-43: '' for the default site) */
   });
   var siteBy = {}; sites.forEach(function (s) { siteBy[s.angle] = s; });
 
@@ -307,7 +307,7 @@
     return { spend: b.total.cost, visits: b.total.sessions, formSubmit: b.total.formSubmit, sa_signed: b.total.sa_signed };
   }
   function viewWebsite() {
-    var h = '<h1>Website</h1><p class="lead">The seven cluster microsites, mirrored 1:1 from staging.credolegal.com (local only). Each has a home page, about and legal pages, ' +
+    var h = '<h1>Website</h1><p class="lead">The default site (staging’s root domain: the home page and six Defense Services pages) and the seven cluster microsites, mirrored 1:1 from staging.credolegal.com (local only). Each has a home page, about and legal pages, ' +
       'a thank-you page and its cluster’s landing pages under Services. Choose a microsite on the left to see its pages; click a card here for details and metrics.</p><div class="tiles">';
     sites.forEach(function (s) {
       var m = siteSum(s), svc = s.pages.filter(function (p) { return p.kind === 'service'; }).length;
@@ -318,7 +318,7 @@
   }
   function viewSite(s) {
     var h = '<h1>' + esc(s.label) + '</h1><p class="lead">Microsite <code>' + esc(s.angle) + '</code> · ' + s.pages.length + ' pages. Click a row for details and metrics; ' +
-      'click a page name to open it.</p><div class="toolbar">' + go('#/website/' + s.angle + '/index', 'Open the home page') + link(STAGING + s.angle, 'Home on staging ↗') + '</div>' +
+      'click a page name to open it.</p><div class="toolbar">' + go('#/website/' + s.angle + '/index', 'Open the home page') + link(STAGING + s.home, 'Home on staging ↗') + '</div>' +
       '<div class="scroll"><table class="tbl"><thead><tr><th>Page</th><th>Kind</th><th>Services menu</th><th class="num">Spend*</th><th class="num">Sessions</th><th class="num">Form sends</th><th class="num">Signed*</th></tr></thead><tbody>';
     s.pages.forEach(function (p) {
       var m = pageNums(p.liveSlug);
@@ -382,7 +382,7 @@
     fitFrame();
   }
   function drawerSite(s) {
-    var m = siteSum(s), h = kv([['Microsite', '<code>' + esc(s.angle) + '</code>'], ['Home on staging', link(STAGING + s.angle)], ['Home copy', esc(s.homeCopy)], ['Pages', String(s.pages.length)]]);
+    var m = siteSum(s), h = kv([['Microsite', '<code>' + esc(s.angle) + '</code>'], ['Home on staging', link(STAGING + s.home)], ['Home copy', esc(s.homeCopy)], ['Pages', String(s.pages.length)]]);
     h += '<h3>Services menu</h3><table class="tbl"><thead><tr><th>Debt type</th><th>Page in the menu</th></tr></thead><tbody>' + s.types.map(function (t) {
       return '<tr><td>' + esc(t.label) + '</td><td><a href="#/website/' + s.angle + '/' + enc('services/' + t.pick) + '">' + esc(t.pick) + '</a><div class="sub">' + esc(t.reason) + '</div></td></tr>'; }).join('') + '</tbody></table>';
     var mh = '<h3>Metrics · ' + esc(periodLabel()) + ' (landing pages summed)</h3>' + (m.any ? '<div class="mgrid">' + mt('Spend*', usd(m.spend)) + mt('Sessions', n0(m.visits)) + mt('Signed*', n1(m.sa_signed)) + '</div><p class="note">* allocated to the pages by each ad’s share of sessions (estimate).</p>' : '<p class="note">No paid traffic in this period.</p>');
diff --git a/tools/marketing-hub/build-microsites.mjs b/tools/marketing-hub/build-microsites.mjs
index 4c5b387..70e96fd 100644
--- a/tools/marketing-hub/build-microsites.mjs
+++ b/tools/marketing-hub/build-microsites.mjs
@@ -1,5 +1,6 @@
 #!/usr/bin/env node
-/* Builds the seven cluster microsites into public/marketing-hub/microsites/.
+/* Builds the seven cluster microsites and the default site (PBI-43, 6 Oct: staging's root home + six Defense Services pages)
+ * into public/marketing-hub/microsites/.
  *   node tools/marketing-hub/build-microsites.mjs      (run build-registry.mjs first: it reads the registry and metrics)
  *
  * One microsite per angle cluster: home, about, three legal pages, thank-you, and one Services page per landing page
@@ -46,6 +47,8 @@ const LEGACY = loadWindow(R('tools/marketing-hub/microsites/legacy-variants.js')
 const PHONES = JSON.parse(fs.readFileSync(R('tools/webflow/phone-table-2026-10-03.json'), 'utf8')).phones;
 const fmtPhone = n => { const d = n.replace(/^1/, ''); return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`; };
 
+/* PBI-43 (6 Oct): the default site on staging's root domain: the root home and one Defense Services page per debt type */
+const DEFAULT = JSON.parse(fs.readFileSync(R('tools/webflow/clusters/default-cluster.json'), 'utf8')).pages.map(p => ({ slug: p.slug, type: p.type }));
 const TYPES = [['harassment', 'Harassment'], ['lawsuit', 'Lawsuit'], ['credit-card', 'Credit Card'], ['payday-loan', 'Payday Loan'], ['medical', 'Medical Debt'], ['garnishment', 'Garnishment']];
 /* angle slug → [label, legacy variant with the approved home copy, hero photograph] */
 const ANGLES = [
@@ -131,6 +134,7 @@ function routeFor(angle, up) {
   for (const [a] of ANGLES) r[a] = rel(`${a}/index.html`);
   for (const s of SHARED) r[s] = rel(`${angle}/${s}.html`);
   for (const p of pages) r[p.slug] = rel(`${p.angle}/services/${p.slug}.html`);
+  for (const p of DEFAULT) r[p.slug] = rel(`default/services/${p.slug}.html`);
   return r;
 }
 const removedRefs = new Set();
@@ -144,6 +148,20 @@ for (const [angle, label] of ANGLES) {
   for (const p of pages.filter(x => x.angle === angle))
     write('services/' + p.slug + '.html', await mirror.render(snapshot(p.slug), { up: '../../', thankYou: '../thank-you.html', route: routeFor(angle, '../../'), kind: 'service', slug: p.slug, phoneKey: p.slug }), p.slug);
 }
+/* the default site (PBI-43): same mirror, its home is staging's root page */
+{
+  const angle = 'default', dir = path.join(OUT, angle); fs.mkdirSync(path.join(dir, 'services'), { recursive: true });
+  const write = (file, r, what) => { fs.writeFileSync(path.join(dir, file), r.html); count++; r.report.notes.forEach(n => mirrorNotes.push(`${angle}/${what}: ${n}`)); r.report.removed.forEach(x => removedRefs.add(x.slice(0, 70))); };
+  const top = { up: '../', thankYou: 'thank-you.html', route: routeFor(angle, '../') };
+  write('index.html', await mirror.render(snapshot('_root'), { ...top, kind: 'home', slug: '', phoneKey: '' }), 'home');
+  for (const s of SHARED) write(s + '.html', await mirror.render(snapshot(s), { ...top, kind: s, slug: s, phoneKey: s }), s);
+  for (const p of DEFAULT)
+    write('services/' + p.slug + '.html', await mirror.render(snapshot(p.slug), { up: '../../', thankYou: '../thank-you.html', route: routeFor(angle, '../../'), kind: 'service', slug: p.slug, phoneKey: p.slug }), p.slug);
+  summary.unshift({ angle, home: '', label: 'Default site (root domain)', homeCopy: 'new draft (PBI-43)', pages: DEFAULT.length,
+    /* in the default site's menu order (staging's navbar), not TYPES order */
+    types: DEFAULT.map(p => ({ type: p.type, label: TYPES.find(t => t[0] === p.type)[1], pick: p.slug, reason: 'the default page for this debt type', by: null,
+      pages: [{ slug: p.slug, live: null, main: true, running: false, hadAd: false }] })) });
+}
 console.log('tracker and chat scripts removed from the mirrored pages:\n  ' + [...removedRefs].join('\n  '));
 await mirror.close();
 /* a note means a staging page no longer has a piece the mirror relies on (or names a host it does not know): stop, do not ship a half-right page */
@@ -151,5 +169,5 @@ if (mirrorNotes.length) { console.error('MIRROR PROBLEMS (the build is not valid
 
 /* ── hub data (mirror tier: choices and reasons, no figures) ── */
 fs.writeFileSync(R('public/marketing-hub/data/microsites.js'), '/* Generated by tools/marketing-hub/build-microsites.mjs. Mirror tier: no money, no client counts. */\nwindow.HUB_MICROSITES = ' + JSON.stringify({ built: new Date().toISOString().slice(0, 10), sites: summary }) + ';\n');
-console.log(`${ANGLES.length} microsites, ${count} pages (${pages.length} service pages)`);
+console.log(`${ANGLES.length} microsites + the default site, ${count} pages (${pages.length} service pages)`);
 for (const s of summary) for (const t of s.types) if (t.pages.length > 1) console.log(`  ${s.label} × ${t.label}: ${t.pick}  [${t.reason}]`);
diff --git a/tools/marketing-hub/check-microsites.mjs b/tools/marketing-hub/check-microsites.mjs
index b62ece0..8f9dd02 100644
--- a/tools/marketing-hub/check-microsites.mjs
+++ b/tools/marketing-hub/check-microsites.mjs
@@ -1,5 +1,5 @@
 #!/usr/bin/env node
-/* Checks every page of the seven microsites (public/marketing-hub/microsites) in a browser with outside requests blocked.
+/* Checks every page of the seven microsites and the default site (public/marketing-hub/microsites) in a browser with outside requests blocked.
  *   node tools/marketing-hub/check-microsites.mjs [http://localhost:8795]
  * Per page: loads, no script errors, exactly one h1, a Services menu with one entry per debt type whose targets exist,
  * every local link resolves, the header sits at the same place as on every other page, no horizontal overflow at 1440 and 375. Service pages: the menu follows the rule (own debt type = the page itself,
@@ -17,7 +17,9 @@ const sites = w.HUB_MICROSITES.sites; const problems = []; let n = 0; const head
 /* Independent inventory: the service pages must be exactly the 48 addresses of the address map, each in its own cluster. */
 const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/webflow/url-map-2026-10-03.json'), 'utf8')).pages;
 const built = sites.flatMap(s => s.types.flatMap(t => t.pages.map(pg => s.angle + '|' + t.type + '|' + pg.slug))).sort();
-const expected = map.map(o => o.angle + '|' + o.type + '|' + o.new).sort();
+/* plus the default site's six pages (PBI-43, 6 Oct) */
+const defaults = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/webflow/clusters/default-cluster.json'), 'utf8')).pages;
+const expected = [...map.map(o => o.angle + '|' + o.type + '|' + o.new), ...defaults.map(p => 'default|' + p.type + '|' + p.slug)].sort();
 if (JSON.stringify(built) !== JSON.stringify(expected)) problems.push('service pages differ from the address map: ' + built.length + ' built, ' + expected.length + ' expected');
 for (const s of sites) if (s.types.length !== 6) problems.push(s.angle + ': ' + s.types.length + ' debt types');
 const b = await chromium.launch();
@@ -52,9 +54,10 @@ for (const width of [1440, 375]) {
         /* the header (logo, links, phone, button, menu) sits at the same place on every page of every microsite */
         if (width > 991 && info.bases.length && Math.max(...info.bases) - Math.min(...info.bases) > 0.5) errs.push('header texts are not on one line: baselines ' + info.bases.join(', '));
         headRef[width] ||= info.head; if (info.head !== headRef[width]) errs.push('header differs: ' + info.head + ' vs ' + headRef[width]);
-        /* about and legal are shared by the seven microsites: their menu lists the seven home pages */
+        /* about and legal are shared by all sites; since PBI-43 (operator, 6 Oct) their menu lists the default site's six
+           Defense Services pages (before: the seven microsite home pages) */
         if (kind === 'shared') { const here = path.dirname(path.join(dir, s.angle, rel));
-          const want = sites.map(x => path.join(dir, x.angle, 'index.html')); const got = info.menu.map(m => path.join(here, m.href));
+          const want = defaults.map(p => path.join(dir, 'default/services', p.slug + '.html')); const got = info.menu.map(m => path.join(here, m.href));
           if (JSON.stringify(got) !== JSON.stringify(want)) errs.push('shared menu: ' + got.join(',')); }
         else {
         if (info.menu.length !== 6) errs.push('menu has ' + info.menu.length + ' entries');
diff --git a/tools/marketing-hub/check-mirror.mjs b/tools/marketing-hub/check-mirror.mjs
index c2d7ff7..c41545a 100644
--- a/tools/marketing-hub/check-mirror.mjs
+++ b/tools/marketing-hub/check-mirror.mjs
@@ -21,7 +21,7 @@ const sites = w.HUB_MICROSITES.sites;
 /* staging address → mirrored file. Since 4 Oct (MH-09) the home, about and legal pages are staging pages too. */
 const list = sites.flatMap(s => {
   const lps = s.types.flatMap(t => t.pages.map(p => ({ site: s.angle, slug: p.slug, file: `services/${p.slug}.html` })));
-  const own = [{ site: s.angle, slug: s.angle, file: 'index.html' }];
+  const own = [{ site: s.angle, slug: s.home != null ? s.home : s.angle, file: 'index.html' }];   /* PBI-43: the default site's home is staging's root */
   const shared = ['about', 'terms-of-use', 'privacy-policy', 'cookie-policy'].map(x => ({ site: s.angle, slug: x, file: x + '.html' }));
   return ALL ? [...own, ...lps, ...(s.angle === 'respond' ? shared : [])] : [...own, lps[0], ...(s.angle === 'respond' ? shared.slice(0, 2) : [])];
 });
diff --git a/tools/marketing-hub/sync-staging.mjs b/tools/marketing-hub/sync-staging.mjs
index 62a96c5..201bdca 100644
--- a/tools/marketing-hub/sync-staging.mjs
+++ b/tools/marketing-hub/sync-staging.mjs
@@ -17,7 +17,9 @@ const CDN = 'https://cdn.prod.website-files.com/6ab90fb0761d44332faf21c8/';   /*
 const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/webflow/url-map-2026-10-03.json'), 'utf8')).pages;
 /* since 4 Oct (MH-09) staging also has the seven microsite home pages, the shared about page and the three legal pages */
 const SITE_PAGES = ['respond', 'fight-back', 'demand-proof', 'know-your-rights', 'stop', 'make-them-pay', 'reduce', 'about', 'terms-of-use', 'privacy-policy', 'cookie-policy'];
-const all = [...map.map(o => o.new), 'thank-you', ...SITE_PAGES];
+/* since 6 Oct (PBI-43) the default site: the root home (stored as _root) and the six Defense Services pages */
+const DEFAULT_PAGES = ['_root', ...JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/webflow/clusters/default-cluster.json'), 'utf8')).pages.map(p => p.slug)];
+const all = [...map.map(o => o.new), 'thank-you', ...SITE_PAGES, ...DEFAULT_PAGES];
 const only = process.argv.slice(2);
 const slugs = only.length ? all.filter(s => only.includes(s)) : all;
 const get = async url => { for (let i = 0; ; i++) { const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (credo staging snapshot)' } });
@@ -28,7 +30,7 @@ const manifestFile = path.join(OUT, 'manifest.json');
 const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : { pages: {} };
 const css = new Set(); let changed = 0;
 for (const slug of slugs) {
-  const html = await get(HOST + slug);
+  const html = await get(HOST + (slug === '_root' ? '' : slug));
   if (!/<html[\s>]/i.test(html) || !html.includes('</body>')) throw new Error(`${slug}: not a full page`);
   const links = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map(m => (m[0].match(/href="([^"]+)"/) || [])[1]);
   if (links.length !== 1 || !links[0].startsWith(CDN + 'css/')) throw new Error(`${slug}: expected one stylesheet of the staging project, found ${links.join(', ')}`);
diff --git a/tools/webflow/lp-sync.mjs b/tools/webflow/lp-sync.mjs
index 9676b99..5a1c547 100644
--- a/tools/webflow/lp-sync.mjs
+++ b/tools/webflow/lp-sync.mjs
@@ -12,7 +12,7 @@ const [CUR, OUT, ...only] = process.argv.slice(2);
 const HERE = path.dirname(new URL(import.meta.url).pathname);
 const PROTO = path.resolve(HERE, '../../public/harassment-lp');
 const COMPS = JSON.parse(fs.readFileSync(path.join(HERE, 'lp-components.json'), 'utf8'));
-const current = JSON.parse(fs.readFileSync(CUR, 'utf8'));
+const current = CUR && fs.existsSync(CUR) ? JSON.parse(fs.readFileSync(CUR, 'utf8')) : {};   // empty when imported as a module (default-cluster-payload.mjs)
 
 // Webflow slug -> prototype content file (derived 29 Sep by matching page copy; 1:1). The 13 state pages and /letter
 // share content-state.js, selected by query string.
```

## New: tools/webflow/clusters/verify-default-site.py
```python
"""PBI-43 (6 Oct 2026): checks the published default site on staging against default-cluster-payload.json. Read-only.
Per page (root + six Defense Services pages): HTTP 200, <title>, meta description, H1, canonical + noindex, the FAQPage
JSON-LD, the lead form, the six-page Services menu, no component placeholder text left. Also: About and the legal pages
list the six pages; the served phone table matches the local footer file; a microsite page differs from its pre-change
snapshot only in the phone table.
Usage: python3 tools/webflow/clusters/verify-default-site.py"""
import html, json, os, re, subprocess, sys
BASE = 'https://staging.credolegal.com'
HERE = os.path.dirname(os.path.abspath(__file__))
BK = os.path.expanduser('~/work/backups/credo-webflow-staging/2026-10-06-default-site')
P = json.load(open(os.path.join(HERE, 'default-cluster-payload.json')))
get = lambda p: subprocess.run(['curl', '-sf', '-H', 'Cache-Control: no-cache', BASE + p + '?v=pbi43'], capture_output=True, text=True, check=True).stdout
SLUGS = [p['slug'] for p in P['pages']]
PLACEHOLDERS = ['Card 1 text', 'Item 1<', 'Who 1<', 'Step 1 text', 'Rights intro', '>Q<', '>A<', 'Debt Collectors Won']
fails = []
def ok(cond, msg):
    if not cond: fails.append(msg)

def text(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()
def menu(h): return re.findall(r'href="/(debt-[a-z-]+-defense-services)"', h)

for pg in [P['home']] + P['pages']:
    slug = pg['slug']; name = slug or '/'
    try: h = get('/' + slug)
    except subprocess.CalledProcessError: ok(False, f'{name}: not served'); continue
    t = re.search(r'<title>(.*?)</title>', h, re.S)
    ok(t and html.unescape(t.group(1)) == pg['seo']['title'], f'{name}: title {t and t.group(1)!r}')
    d = re.search(r'<meta content="([^"]*)" name="description"', h) or re.search(r'<meta name="description" content="([^"]*)"', h)
    ok(d and html.unescape(d.group(1)) == pg['seo']['description'], f'{name}: description')
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', h, re.S)
    want = pg['seo']['title'].replace(' | Credo Legal', '')
    ok(len(h1s) == 1 and text(h1s[0]) == want, f'{name}: H1 {[text(x) for x in h1s]}')
    ok(f'<link rel="canonical" href="https://start.credolegal.com/{slug}">' in h, f'{name}: canonical')
    ok('<meta name="robots" content="noindex, nofollow">' in h, f'{name}: noindex')
    lds = [json.loads(x) for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)]
    ok(any(x.get('@type') == 'FAQPage' and x == json.loads(pg['jsonLd']) for x in lds), f'{name}: FAQ JSON-LD')
    ok('id="gtmform"' in h, f'{name}: lead form')
    ok(sorted(set(menu(h))) == sorted(SLUGS), f'{name}: menu/links {sorted(set(menu(h)))}')
    ok('href="/respond"' not in h, f'{name}: still links the microsite menu')
    for ph in PLACEHOLDERS: ok(ph not in h, f'{name}: placeholder {ph!r}')
    print('checked', name)

for s in ['about', 'privacy-policy', 'terms-of-use', 'cookie-policy']:
    h = get('/' + s)
    ok(sorted(set(menu(h))) == sorted(SLUGS) and 'href="/respond"' not in h, f'{s}: Services menu')
    print('checked', s)

# the served phone table = the local footer file
home = get('/')
tbl = lambda s: re.search(r'window\.CREDO_PHONES = \{.*?\n\};', s, re.S).group(0)
ok(tbl(home) == tbl(open(os.path.join(BK, 'site-footer.after.txt')).read()), 'phone table differs from site-footer.after.txt')
foot_start = home.find('<!-- PBI-01d P2 (29 Sep)')
local = open(os.path.join(BK, 'site-footer.after.txt')).read().rstrip('\n')
ok(foot_start > 0 and home[foot_start:foot_start + len(local)] == local, 'served site footer is not byte-identical to site-footer.after.txt')

# a microsite page: unchanged apart from the phone table, Webflow's publish stamp and the shared stylesheet's file name
# (the rebuild drops the old root home's grid rules; checked 6 Oct: 85 selectors ending -2faf219d removed, nothing else)
norm = lambda s: re.sub(r'webflow\.shared\.[0-9a-f]+\.min\.css" rel="stylesheet" type="text/css" integrity="[^"]+"', 'CSS',
                        re.sub(r'window\.CREDO_PHONES = \{.*?\n\};', '', re.sub(r'Last Published:[^-]*-->', '', s), flags=re.S))
for s in ['respond', 'debt-harassment-stop-calls']:
    ok(norm(get('/' + s)) == norm(open(os.path.join(BK, 'served-before', s + '.html')).read()), f'{s}: changed beyond the phone table')
    print('checked', s, '(unchanged)')

print('FAILURES:\n  ' + '\n  '.join(fails) if fails else 'all checks passed')
sys.exit(1 if fails else 0)
```

## New: tools/webflow/clusters/verify-default-site-browser.mjs
```js
// PBI-43 (6 Oct 2026): browser checks of the published default site on staging. Read-only: trackers are answered with
// 204 and every non-GET request is answered locally, so no form or beacon ever leaves the browser.
// 1. Phones: root + the six Defense Services pages show their phone-table number for each ad source (none, google, meta,
//    bing); the only other number allowed is the office line.
// 2. Ad visit persistence (PBI-42): a Meta click on a microsite page keeps that number on the default home and pages.
// 3. Form: step 1 of the lead form is visible; no page errors.
// 4. axe: serious/critical violations on each page vs a donor landing page (the same components).
// Usage: node tools/webflow/clusters/verify-default-site-browser.mjs
import fs from 'node:fs';
import { chromium, devices } from '/Users/milos.funl/work/projects/credo/tools/lpcheck/node_modules/playwright/index.mjs';
const AXE = fs.readFileSync('/Users/milos.funl/work/projects/credo/tools/lpcheck/node_modules/axe-core/axe.min.js', 'utf8');
const BASE = 'https://staging.credolegal.com/';
const TRACK = /facebook\.com\/tr|google-analytics|analytics\.google|googletagmanager\.com\/(?!gtm\.js)|\/collect\?|doubleclick|bat\.bing|clarity\.ms|mouseflow|tidio|debtfixer|credoss/;
const OFFICE = '12124614026';
const ROW = { '': '17188658350', google: '17188658350', meta: '12185657350', bing: '18238629340' };
const PAGES = ['', 'debt-harassment-defense-services', 'debt-credit-card-defense-services', 'debt-lawsuit-defense-services',
  'debt-payday-loan-defense-services', 'debt-medical-defense-services', 'debt-garnishment-defense-services'];
const DONOR = 'debt-garnishment-stop-now';
let bad = 0;
const b = await chromium.launch();
async function open(ctx, path) {
  const page = await ctx.newPage(); const errs = [];
  page.on('pageerror', e => errs.push(e.message.slice(0, 80)));
  await page.route('**/*', r => {
    const q = r.request();
    if (q.method() !== 'GET') return r.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    if (!q.isNavigationRequest() && TRACK.test(q.url())) return r.fulfill({ status: 204, body: '' });
    return r.continue();
  });
  await page.goto(BASE + path, { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(1200);
  return { page, errs };
}
const tels = page => page.$$eval('a[href^="tel:"]', as => [...new Set(as.map(a => a.getAttribute('href').replace(/\D/g, '')))]);

console.log('1+3. phones per source, form, page errors');
for (const slug of PAGES) {
  const row = [];
  for (const src of ['', 'google', 'meta', 'bing']) {
    const ctx = await b.newContext(devices['iPhone 15']);
    const { page, errs } = await open(ctx, slug + (src ? '?utm_source=' + src : ''));
    const t = await tels(page), want = ROW[src];
    // step 1 of the form (the slider and its Next button); #gtmform itself is the hidden submit form on every page
    const form = await page.evaluate(() => ['gtmform', 'mjSlider', 'openstep2'].every(i => document.getElementById(i)) &&
      document.getElementById('openstep2').getBoundingClientRect().height > 0);
    const ok = t.includes(want) && t.every(x => x === want || x === OFFICE) && !errs.length && form;
    if (!ok) bad++;
    row.push(`${src || 'none'}:${ok ? 'ok' : 'FAIL ' + t.join('/') + (form ? '' : ' no-form') + (errs.length ? ' ' + errs.join('|') : '')}`);
    await ctx.close();
  }
  console.log('  ' + (slug || '/').padEnd(36), row.join('  '));
}

console.log('2. Meta ad click on /debt-lawsuit-respond-on-time ((718) 521-4060), then the default pages');
{
  const ctx = await b.newContext(devices['iPhone 15']);
  let { page } = await open(ctx, 'debt-lawsuit-respond-on-time?utm_source=meta'); await page.close();
  for (const p of ['', 'debt-garnishment-defense-services', 'about']) {
    ({ page } = await open(ctx, p)); const t = await tels(page);
    const ok = t.includes('17185214060') && t.every(x => x === '17185214060' || x === OFFICE);
    if (!ok) bad++; console.log('  ' + (p || '/').padEnd(36), ok ? 'ok' : 'FAIL ' + t.join('/')); await page.close();
  }
  await ctx.close();
}

console.log('4. axe serious/critical (rule: nodes) vs donor ' + DONOR);
const axe = async slug => {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const { page } = await open(ctx, slug);
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(async () => (await axe.run(document, { resultTypes: ['violations'] })).violations
    .filter(v => ['serious', 'critical'].includes(v.impact)).map(v => [v.id, v.nodes.length]));
  await ctx.close(); return Object.fromEntries(r);
};
const donor = await axe(DONOR); console.log('  donor'.padEnd(38), JSON.stringify(donor));
for (const slug of PAGES) {
  const v = await axe(slug), extra = Object.keys(v).filter(k => !(k in donor));
  if (extra.length) bad++;
  console.log('  ' + (slug || '/').padEnd(36), JSON.stringify(v), extra.length ? 'NEW: ' + extra.join(',') : '');
}
await b.close(); console.log('failures:', bad); process.exit(bad ? 1 : 0);
```

## New: tools/webflow/clusters/default-cluster-payload.mjs
```js
// PBI-43 (6 Oct 2026): the default site on staging's root domain. Turns default-cluster.json (donor references
// resolved) into the Webflow writes: per page the component prop values (set_component_instance_prop_values), the
// navbar and footer props, SEO, head code and FAQPage JSON-LD. Read-only: it writes one JSON file, never Webflow.
// Operator decisions 6 Oct: addresses debt-{type}-defense-services; titles end " | Credo Legal"; the new home replaces
// the root home; About and the legal pages list the six default pages under Services.
// Usage: node tools/webflow/clusters/default-cluster-payload.mjs [out.json]
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
import { toProps } from '../lp-sync.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, '../../..');
const D = JSON.parse(fs.readFileSync(path.join(HERE, 'default-cluster.json'), 'utf8'));
const COMPS = JSON.parse(fs.readFileSync(path.join(HERE, '../lp-components.json'), 'utf8'));
const NAV = JSON.parse(fs.readFileSync(path.join(HERE, '../site-menu/navbar-props.json'), 'utf8')).props;
const HP = JSON.parse(fs.readFileSync(path.join(HERE, '../site-menu/home-props.json'), 'utf8'));
const HEAD = fs.readFileSync(path.join(HERE, '../site-menu/head-template.html'), 'utf8');
const FOOTER_HOME = 'df9510b1-7e5b-7a94-cb03-45d4b09ea690';   // Footer-MJ "Link 1" (logo / home)

/* donor references, as in default-cluster-doc.mjs */
const cache = {};
const load = n => cache[n] ||= (() => { const w = {}; vm.runInNewContext(fs.readFileSync(path.join(ROOT, `public/harassment-lp/content-${n}.js`), 'utf8'), { window: w, document: {}, URLSearchParams, location: { search: '' } }); return w.CREDO; })();
const S = D.shared;
const one = (x, section) => typeof x !== 'string' ? x : S[x] ? S[x] : x.includes('#') ? load(x.split('#')[0])[section][+x.split('#')[1]] : null;
const list = (x, section) => typeof x === 'string' ? load(x)[section] : x;

const str = (pid, v) => ({ prop_id: pid, type: 'string', string_value: v });
const bool = (pid, v) => ({ prop_id: pid, type: 'boolean', boolean_value: v });
const url = (pid, u) => ({ prop_id: pid, type: 'link', link_mode: 'url', link_to: u });
const P = (comp, name) => { const id = COMPS[comp].props[name]; if (!id) throw new Error(`${comp}: no prop ${name}`); return id; };
/* prop map {component: {name: value}} -> [values] with ids (booleans stay booleans) */
const values = (comp, m) => Object.entries(m).filter(([, v]) => v !== undefined && v !== null).map(([n, v]) => typeof v === 'boolean' ? bool(P(comp, n), v) : str(P(comp, n), String(v)));

/* the six default pages, in menu order */
const MENU = D.pages.map(p => ({ label: p.menu, slug: p.slug }));
const navbar = () => {
  const v = [bool(NAV['Page links'], false), bool(NAV['Site menu'], true), url(NAV['Home link'], '/'), url(NAV['About link'], '/about'),
    str(NAV['Services label'], 'SERVICES'), bool(NAV['Show menu 7'], false)];
  MENU.forEach((m, i) => { v.push(str(NAV[`Menu ${i + 1} text`], m.label), url(NAV[`Menu ${i + 1} link`], '/' + m.slug)); });
  return v;
};
const faqLd = faq => JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const head = slug => HEAD.replaceAll('{slug}', slug).replace('https://start.credolegal.com/"', 'https://start.credolegal.com/"');

const out = { built: '2026-10-06', navbar: navbar(), footer: [url(FOOTER_HOME, '/')], pages: [] };

/* landing pages: the prototype shape lp-sync knows, then its prop mapping */
for (const p of D.pages) {
  const C = { hero: { h1: p.hero.h1, lede: p.hero.lede, filler: S.formIntro }, whatWeDo: p.whatWeDo, whyChoose: p.whyChoose.map(x => one(x, 'whyChoose')),
    commonProblems: list(p.commonProblems, 'commonProblems'), whoHelps: p.whoHelps, howItWorks: p.howItWorks, rights: list(p.rights, 'rights'),
    faq: p.faq.map(x => one(x, 'faq')), bottomCta: { body: p.bottomCta } };
  const props = toProps(C);
  delete props['LP · Hero']['First question'];   // undefined in C.form: the duplicated page keeps its own
  out.pages.push({ slug: p.slug, type: p.type, title: p.seo.title.replace(' | Credo Legal', ''), seo: p.seo,
    components: Object.fromEntries(Object.entries(props).map(([c, m]) => [c, values(c, m)])), head: head(p.slug), jsonLd: faqLd(C.faq) });
}

/* the root home: the microsite-home structure (Common problems in home mode, rights hidden) plus What we do */
const H = D.home; const cp = HP['LP · Common problems'].props; const rf = HP['LP · Rights and FAQ'].props;
const why = H.whyChoose.map(x => one(x, 'whyChoose'));
const titleOf = Object.fromEntries(D.pages.map(p => [p.slug, p.seo.title.replace(' | Credo Legal', '')]));
const home = {
  'LP · Hero': values('LP · Hero', { H1: H.hero.h1[0], 'H1 accent': H.hero.h1[1], 'H1 end': H.hero.h1[2], Lede: H.hero.lede, 'Form intro': S.formIntro, 'First question': 'How much do you currently owe in total?' }),
  'LP · What we do': values('LP · What we do', Object.assign({ 'What heading': H.whatWeDo.headline, 'What body': H.whatWeDo.intro, 'Show item 4': H.whatWeDo.bullets.length >= 4, 'Show item 5': H.whatWeDo.bullets.length >= 5 },
    ...H.whatWeDo.bullets.map((b, i) => ({ ['Item ' + (i + 1)]: b })), ...why.map(([t, x], i) => ({ [`Card ${i + 1} title`]: t, [`Card ${i + 1} text`]: x })))),
  'LP · Common problems': [bool(cp['Problem headings'], false), bool(cp['Home mode'], true), bool(cp['Show who this helps'], false), str(cp['Home eyebrow'], H.services.eyebrow),
    str(cp['Home heading'], H.services.heading), str(cp['Home lead'], H.services.lead), bool(P('LP · Common problems', 'Show cards 5-6'), true),
    ...H.services.cards.flatMap(([label, slug, text], i) => [str(P('LP · Common problems', `Card ${i + 1} law`), label.toUpperCase()), str(P('LP · Common problems', `Card ${i + 1} title`), titleOf[slug]),
      str(P('LP · Common problems', `Card ${i + 1} text`), text), url(cp[`Card ${i + 1} link`], '/' + slug)])],
  'LP · How it works': values('LP · How it works', Object.assign({}, ...H.howItWorks.map(([t, x], i) => ({ [`Step ${i + 1} title`]: t, [`Step ${i + 1} text`]: x })))),
  'LP · Rights and FAQ': [bool(rf['Show rights'], false), bool(rf['Show right 6'], false), bool(rf['Show FAQ 4'], H.faq.length >= 4), bool(rf['Show FAQ 5'], H.faq.length >= 5),
    bool(rf['Show FAQ 6'], false), bool(rf['Show FAQ 7'], false), ...H.faq.flatMap(([q, a], i) => [str(P('LP · Rights and FAQ', `FAQ ${i + 1} question`), q), str(P('LP · Rights and FAQ', `FAQ ${i + 1} answer`), a)])],
  'LP · Bottom CTA': values('LP · Bottom CTA', { Paragraph: H.bottomCta }),
};
out.home = { slug: '', title: 'Credo Legal', seo: H.seo, components: home, head: head(''), jsonLd: faqLd(H.faq),
  order: ['LP · Hero', 'LP · Lead form', 'LP · Trust strip', 'LP · What we do', 'LP · Common problems', 'LP · How it works', 'LP · Rights and FAQ', 'LP · Bottom CTA'],
  componentIds: Object.fromEntries(Object.entries(COMPS).map(([k, v]) => [k, v.id])) };

const OUT = process.argv[2] || path.join(HERE, 'default-cluster-payload.json');
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(`payload: ${out.pages.length} pages + home → ${path.relative(ROOT, OUT)}`);
for (const p of [...out.pages, { slug: '(home)', components: home }]) console.log('  ' + p.slug.padEnd(36), Object.entries(p.components).map(([c, v]) => c.replace('LP · ', '') + ' ' + v.length).join(' · '));
```
