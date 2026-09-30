# PBI-29 · Resolution of the independent reviews (GPT-5.5, 30 Sep)

Verdicts: **Code · GPT:** approve with fixes. **UX · GPT** (screenshots of the seal and header logo): approve with fixes.
**Gemini: not run** (API credits depleted, HTTP 402); to be re-run once topped up.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | One 280 px header file for "all screens"; after looks slightly softer (Code 2, UX 1, 2, 11) | **Changed:** the header now uses the **420 px** file too (4.6× its size, headroom for browser zoom and very dense screens; +3.3 KB, and it is the same file as the other logos, so each page downloads **one** 8.6 KB logo). Measured: the header logo is 91.3×30 CSS px at every width from 320 to 2560 px (no mobile-menu variant). Side-by-side at 3× (enlarged 2×): `P29-header-logo-before-after.png`, no softening. |
| 2 | Footer image no longer bound to its prop (Code 3, UX 12) | **Changed:** both footer components' "Image" props now carry a tooltip: "Not used since 30 Sep (PBI-29): the footer logo is set directly on the image element (credo-logo-420.png). Change it there." Kept, not deleted, so the change stays reversible. No page overrode the prop (served HTML: all footers used the same file). |
| 3 | Footer, pop-up, thank-you logos not shown (UX 3, 8) | Added: `P29-footer-logo-before-after.png` (0 px differ), `P29-popup-logo-before-after.png` (≤2.2% edge pixels), `P29-thankyou-logo-before-after.png` (≤0.5%), before above, after below, phone 3×. Pixel comparisons at 1440@1×, 810@2×, 390@3× on a landing page, home and /thank-you (the pop-up is opened for its logo). |
| 4 | Seal: contain in a fixed box vs a box that follows the ratio (Code 4, UX 4, 13) | Kept `object-fit: contain`: the box stays exactly where it was (0 px layout change on phones), the seal is drawn in proportion. A ratio-following box would shrink the section by ~15 px on phones. |
| 5 | Runtime/injected images, pop-up state (Code 5, 12) | The logo check runs after scripts, scrolls the whole page and opens the pop-up; the served-HTML check covers the markup of all 56 pages. No CSS background uses a logo (site CSS has no logo URL). |
| 6 | Byte savings vs cache/network (Code 6) | The bytes are the image responses actually received in a fresh browser context (no cache), per page: 117 KB → **8.6 KB** (landing pages), 38 → 8.6 KB (thank-you pages). Webflow serves the files with a one-year cache. |
| 7 | Unsized images remain (Code 8) | Documented: the header's `width="Auto"` comes from the Designer's image size fields (the API rejects a `width` attribute); the footer's missing height is on purpose (its CSS narrows it on phones, a fixed height would distort it). Lighthouse CLS is 0; both are below the fold or fixed-height boxes. Optional operator step: in the Designer, set the header logo image size to 91×30. |
| 8 | Real submission, tracking, phone swap, all pages (Code 9–11, 13) | No test lead until D1 (standing rule). The saved-vs-live compare with campaign parameters (utm/gclid/fbclid) found requests, dataLayer, phone links, cookies and form payload identical (8/8); the change touches only image files and the seal's style/size attributes, not scripts, links or forms. |
| 9 | BBB seal click-through (Code 14) | The embed's link (`href`, `target`, `rel`) and the image `src`/`alt` are unchanged; only the image's style gained `object-fit` and it gained width/height (diff in `bbb-embed-before.html` / `-after2.html`). |
| 10 | Outside staging (Code 15, 16) | Staging project only (start and enroll are separate Webflow projects, never changed); published to the staging domain only. The two new files are public CDN assets like every other image on the site. |

**Status: settled** (Gemini pending: credits).
