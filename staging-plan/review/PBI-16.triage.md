# PBI-16 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 30 Sep)

Verdicts: **Code · GPT:** approve with fixes. **Code · Gemini:** approve with fixes. **UX · GPT:** approve with fixes.
**UX · Gemini:** approve with fixes (both UX reviews on the 12 before/after screenshots).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | Desktop: the helper line sits too close under the form question after the line-height change (GPT UX 4) | **Fixed.** The helper line has `margin-top: -6px` (by design, against the old 44px line box); the question now has `margin-bottom: 10px` (site head, `body .heading-47`), a 4px gap, measured on 4 pages at every width. `P16-hero-desktop-after` refreshed. |
| 2 | Two-line step labels at 390px (GPT UX 5, Gemini UX 2, GPT code 6) | **Fixed, as the prototype does:** at ≤420px the labels are hidden and only the step numbers show (`lp.css`: `.form-steps .st .stl { display: none }` at 420px). Step bar 33px at 320–420px, labels shown from 421px; `P16-hero-phone-after` and `P16-home-hero-phone-after` refreshed. |
| 3 | Breakpoints beyond 390px not tested; narrow phones (GPT code 1, 12, 13; Gemini code 5) | **Swept** 4 pages (a landing page, home, /letter, a state page) at 320, 360, 420, 421, 479, 480, 767 and 768px: horizontal overflow 0 and text under 12px 0 at every width; ≤479px H1 32px, headlines 26px, question 18px/1.3, rights rows one column; from 480px the desktop sizes, as designed (Webflow's mobile-portrait breakpoint). `pbi16-mobile-type.mjs` (`W=<width>`). |
| 4 | Site-head rules may reach other pages (GPT code 2, 10; Gemini code 6) | The classes (`stl`, `stn`, `heading-47`, the headline and rights-row classes) exist only in the form and landing-page sections; the system pages (thank-you pages, 404, /letter) were checked in PBI-15 and here (/letter), and the 52 form pages all at 390px. |
| 5 | `body`-prefixed site-head overrides are technical debt (Gemini code 2, GPT code 3) | Accepted as interim, like PBI-15: the per-page heading fix and the duplicated class names are removed with M2 → DS-4, and the rules move into the classes then. The cascade result is proven by the computed values on all 52 pages. |
| 6 | "One citation class and one label class" deferral not evidenced (GPT code 4, GPT UX 3) | Moved to DS-8 (class consolidation). The labels already render in capitals (screenshots), so the change is structural only. |
| 7 | Phone number under Continue is a small tap target (GPT UX 6) | PBI-17 moves the "or call" block below the card; PBI-19 gives the call links padding (≥24px). |
| 8 | No CTA visible deep in the rights/FAQ sections (GPT UX 7) | The sticky call bar (PBI-05) appears at phone widths once the visitor scrolls past the form, during call hours (checked: Pixel 7, 2 pm New York, rights section, "Call now" bar at the bottom); the section crops leave it out. Outside call hours the form stays reachable from the bottom CTA. |
| 9 | Runtime/tracking/phones spot-checked on 4 pages only (GPT code 7–9, 16) | CSS-only change (site head and class styles): no script, form or tracking code touched. The 4-page functional check (form walk, payload, trackers, phones, links, text identical) matches the method of PBI-15. Real submission waits on D1. |
| 10 | Staging is public / production-like (GPT code 15, Gemini code 7) | Published to the staging domain only (`staging.credolegal.com`); every page is noindex, nofollow (D21). The start site is a separate project, never changed. |

**Status: settled.**
