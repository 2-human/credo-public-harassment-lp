# Review packet: PBI-28 · Tidio chat loads after the first interaction

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
- Tidio (chat) was loaded by `<script src="//code.tidio.co/….js" async>` in the site head: ~510 KB and 290–430 ms of
  phone main-thread time during every first load. Operator's decision (30 Sep): keep Tidio, load it later; per-script
  plan approved: on the first scroll, tap or key press, or after 5 s.

## Change (staging only, 30 Sep)
The site-head line is replaced by a small loader (same script URL, same pages):
```js
(function () {
  var loaded = false, evs = ['scroll', 'pointerdown', 'touchstart', 'keydown'];
  function loadTidio() {
    if (loaded) return; loaded = true;
    evs.forEach(function (e) { window.removeEventListener(e, loadTidio, true); });
    var s = document.createElement('script');
    s.src = 'https://code.tidio.co/gioqpkhhyyqkylolfnxtq55vwnyhr9xm.js'; s.async = true;
    document.body.appendChild(s);
  }
  evs.forEach(function (e) { window.addEventListener(e, loadTidio, { capture: true, passive: true }); });
  if (document.readyState === 'complete') setTimeout(loadTidio, 5000);
  else window.addEventListener('load', function () { setTimeout(loadTidio, 5000); });
})();
```
The 5 s count from the page's load event (not from navigation start), so on slow phones Tidio still stays out of the
first load. The site footer's Tidio code (`setContactProperties` on `tidioChat-ready`, or at once if the API exists) works
unchanged with a late Tidio.

## Evidence
- Served head on all 56 pages equals the written head byte for byte; no page has the old `<script src=…tidio…>` tag.
- Timing (live, phone, Tidio requests answered locally): no interaction → first Tidio request **5.0 s after load**;
  scroll or tap 1 s after load → request **at that moment**; one script tag either way (landing page, home, /thank-you).
- Widget: with a normal phone user agent and all Tidio hosts other than its file CDN blocked (no visitor session
  created), the current and the new page load the **same seven Tidio files** and expose `window.tidioChatApi`; the
  launcher is not rendered on staging in either (as before, D8).
- Functional compare (6 pages × 1440/390, pre-change page vs live): tracker requests, dataLayer, errors, text, styles,
  links, phones, cookies and form payload identical; the only difference is the Tidio request missing at the moment of
  the snapshot on runs without a click before it (8 of 12; the desktop form walk clicks, which loads Tidio).
- Lighthouse (4 pages, median of 3): Tidio's main-thread time in the first load **286–428 ms per run → 0 ms**; scores
  53–56 → 49–57 and FCP are within run-to-run noise (FCP is bimodal, ~4.08 s or ~5.5 s, in both sets).

## Questions for the reviewer
1. Any risk for visitors who want to chat at once (launcher appears on their first scroll/tap or 5 s after load)?
2. Is the event set (scroll, pointerdown, touchstart, keydown) right, with capture and passive listeners?
3. Anything in Tidio's own script that could depend on loading before the load event?
