# Review packet: PBI-08 · Meta click id (fbclid) + returning visitors keep their attribution

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there. The form posts to formspree
  (`formspree.io/f/xzzyzzwj`); from there leads reach the firm's CRM (not visible to us).
- Several scripts save ad-source values, added over time: (1) site-wide code "section 7" (cookies on the current host, 90 days;
  fills the form's hidden fields and adds missing ones; adds values to internal links); (2) site-wide footer (localStorage +
  address-bar rewrite, wiped on any visit without parameters); (3) each page's footer (session cookies on `.credolegal.com`
  for utm_* and gclid); (4) each page's footer (adds those cookies to credolegal.com links); plus the phone script (reads
  utm_source) and Finsweet (fills 8 hidden fields from the URL). Consolidating them is a separate item, deferred by the operator.

## Two bugs found (tested on the live pages before the change; trackers blocked, POST answered locally)
1. **fbclid never captured.** Section 7 listed the key as `'fbclig'` (typo), so the `fbclid` Meta adds to the URL was never
   stored, and the form had no fbclid field. Before: 4/4 pages sent 21 fields, no fbclid.
2. **Returning visitors lose all attribution.** Scripts (1) and (3) both write utm_* and gclid, so the browser holds each name
   twice (`.staging.credolegal.com` and `.credolegal.com`). Section 7's reader `value.split('; ' + name + '=')` returned null
   whenever `parts.length !== 2`, i.e. whenever a name was stored twice. On a return visit without parameters, script (2) has
   wiped localStorage and Finsweet sees no URL parameters, so the lead sent utm_source/medium/campaign and gclid **empty**,
   although the cookies held them.

## Change (site-wide head code, section 7 only; 3 edits)
```diff
-        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
+        if (parts.length >= 2) return decodeURIComponent(parts[1].split(';').shift()); // the same name can be stored twice (this host and .credolegal.com): use the first
-    var utmKeys = [..., 'gclid', 'fbclig', 'gbraid', 'wbraid'];
+    var utmKeys = [..., 'gclid', 'fbclid', 'gbraid', 'wbraid'];
-            'fbclig': 'fbclig',
+            'fbclid': 'fbclid',
```
No form element added: section 7 already appends a hidden input for every key in `utmKeys` that the form lacks.
Not changed (on purpose): the call-click tracker in the same file still sends a key `fbclig` to an external backend
(`credo.debtfixer.co`); what it sends there is an open operator decision (D6). It never fires today anyway (see evidence).

## Evidence (live staging after publish, 29 Sep; trackers blocked; no lead sent)
- Served code: the new head code is served **byte for byte** as intended, and the rest of the page is unchanged (compared
  with the page saved before the change, ignoring Webflow's publish stamps). Backup of the old code kept.
- `verify-fbclid.mjs`: Meta-style visit `?fbclid=…` then a return visit without it: **4/4 pages** (4 templates) send fbclid on
  both visits; 22 fields; no `fbclig`.
- `probe-utm-stores.mjs` (one browser: Meta click → return → Google click → return): the return visits now send utm_* and
  gclid (before: empty). Phone numbers shown are unchanged.
- `verify-ds7-datalayer.mjs`: form still sends one POST and pushes `form_submit` once on 5/5 pages.
- Side effect to note: each click id lives 90 days independently, so a lead from a later Google click still carries an older
  fbclid (and vice versa). That was already true for gclid before; last touch is utm_source.

## Questions for the reviewer
1. Is the reader change correct and safe? Which of two same-name cookies does `document.cookie` list first, and can they differ
   in value (e.g. a newer ad click on another credolegal.com subdomain)? Is "first" acceptable, or should it prefer another?
2. Anything else in section 7 that the key rename affects (links decorated with fbclid, the MutationObserver)?
3. Anything likely to break the form, tracking or the CRM mapping compared with before (a new field `fbclid`)?
