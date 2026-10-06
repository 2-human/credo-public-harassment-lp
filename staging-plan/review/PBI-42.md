# PBI-42 · The ad campaign's phone number stays the same on every microsite page (6 Oct 2026)

## What this is
Operator: an ad opens a microsite, not a single landing page. The phone number tied to the campaign must stay the
same on every page the visitor opens. Reproduced on staging before the change (trackers blocked): Google ad →
/debt-lawsuit-respond-on-time shows (212) 561-5902; Services → Harassment shows (718) 865-8350; microsite home
/respond shows (718) 865-8350. The utm_source cookie was kept; the number changed because the phone script reads
`CREDO_PHONES[<this page's slug>]` on every page.

## Change (staging site footer code only; start and enroll never touched)
The number of the page the ad opened (a visit with utm_source or an ad click id) is saved in a host-only cookie
`credo_call` for 90 days (the same as the form's campaign cookies); every later page without those parameters shows the
saved number instead of its own row. A new ad click replaces it; visits that never came from an ad are unchanged. An
ad click carrying only a click id now counts as that source (gclid/gbraid/wbraid → google, fbclid → meta, msclkid →
bing); before, an fbclid-only Meta click got the page's default number. The table, the lookup line and everything else
in the footer are unchanged (the Marketing Hub's mirror rewrites that lookup line, so it keeps working).

```diff
--- /Users/milos.funl/work/backups/credo-webflow-staging/2026-10-06-phone-lock/site-footer.before.txt	2026-10-06 09:53:33
+++ /Users/milos.funl/work/backups/credo-webflow-staging/2026-10-06-phone-lock/site-footer.after.txt	2026-10-06 09:53:52
@@ -75,8 +75,12 @@
   // ============================================================
   // 2. GET UTM SOURCE FROM URL OR COOKIE
   // ============================================================
+  // MH-16 (6 Oct): an ad click without utm_source still counts as that ad's source (Google, Meta or Bing click id)
+  const adParams = new URLSearchParams(window.location.search);
+  const CLICK_IDS = { gclid: 'google', gbraid: 'google', wbraid: 'google', fbclid: 'meta', msclkid: 'bing' };
   function getSource() {
-    let src = new URLSearchParams(window.location.search).get('utm_source');
+    let src = adParams.get('utm_source');
+    if (!src) Object.keys(CLICK_IDS).forEach(k => { if (!src && adParams.has(k)) src = CLICK_IDS[k]; });
     if (!src) {
       document.cookie.split('; ').forEach(c => {
         if (c.startsWith('utm_source=')) src = c.split('=')[1];
@@ -106,7 +110,19 @@
   // 4. GET PHONE NUMBER BASED ON UTM SOURCE
   // ============================================================
   const source = getSource();
-  const number = phones[source];
+  // MH-16 (6 Oct): the number stays the ad campaign's for the whole visit. The page the ad opened (a visit with
+  // utm_source or an ad click id) sets it from that page's row and the source, and saves it for 90 days, like the
+  // form's campaign cookies; every later page without those parameters (other services, the microsite's home, about,
+  // legal) shows the saved number instead of its own row. A new ad click replaces it; visits that never came from an
+  // ad keep each page's own number. Cookie for this host only.
+  const isAdVisit = adParams.has('utm_source') || Object.keys(CLICK_IDS).some(k => adParams.has(k));
+  const savedCall = (document.cookie.split('; ').find(c => c.startsWith('credo_call=')) || '').split('=')[1];
+  let number = phones[source];
+  if (isAdVisit) {
+    document.cookie = 'credo_call=' + number + '; max-age=' + (90 * 24 * 3600) + '; path=/; SameSite=Lax';
+  } else if (savedCall && /^\d{11}$/.test(savedCall)) {
+    number = savedCall;
+  }
   const formatted = format(number);
   // Ensure full number has +1 prefix for tel: links
   const fullNumber = '+' + number;
```

## Verified on staging after publish (trackers blocked, no form sent)
- Served footer equals the intended file byte for byte on 10 pages (landing pages, microsite homes, about, privacy,
  thank-you, root).
- 14 of 14 journey checks pass: Google ad → 2 other service pages → microsite home → about all (212) 561-5902 in the
  header and every tracked call link; fbclid-only Meta click keeps (718) 521-4060 on the next page; a direct visit
  with nothing saved keeps each page's own number; a later Meta ad on another page replaces the Google number and it
  stays on the home page; phone width (390 px) the same. The same journeys on the live site before the change failed 8.
- No script errors on landing, microsite home, about, privacy, thank-you and root pages; phone-table guard passes.

## Questions for the reviewer
1. Bugs or edge cases (cookie parsing, number validation, organic utm_source values such as linkedin, pages not in
   the table, the localStorage UTM script that rewrites the URL on the same DOMContentLoaded).
2. Anything about attribution that this breaks (the form's hidden fields read the existing 90-day cookies).
