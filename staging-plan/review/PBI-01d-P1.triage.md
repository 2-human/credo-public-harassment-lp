# PBI-01d P1 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts:
- **Code · GPT:** approve with fixes.
- **Code · Gemini:** approve with fixes. Its one "blocker" is about a live form test, not about this change.
- **No UX review:** nothing visible changes. The live pages were compared with the pre-change pages on computed styles and
  visible text, 52/52 pages, desktop and phone.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | The helper functions `getURLParameter`/`setCookie` were declared inside the `if` block and relied on sloppy-mode hoisting (GPT 6, Gemini C2) | **Fixed.** The two functions are top-level declarations again, exactly as before the move, so they are global on every page. Only the listener is behind the check. Republished. Served code byte-checked, 56/56. Live check: `typeof getURLParameter === "function"` on the system pages and on /ohio. |
| 2 | Which system URLs were tested; a 5th URL seems missing (GPT 1, 17; Gemini) | There are 4 page ids behind 5 URLs; /page/thank-you and /page/already-submitted share the template. All tested live (29 Sep): **/401** (id …21b7, served with 200), **an arbitrary missing URL** (the 404 page, id …21b8), /thank-you, /page/thank-you and /page/already-submitted. On each: `credoSystemPage` is `true`, dataLayer is empty, and **no request to GTM or Mouseflow**. On /ohio: `false`, and both load. The shadow run's 56 pages did not include /401; it has now been checked separately. |
| 3 | `data-wf-page` reliability (GPT 2, Gemini C1) | Webflow puts it on `<html>` before `<head>`, and it is read while `<head>` is parsed. Confirmed on all 5 system URLs above. The list is hard-coded: a new system page must be added to it. That note is on the board and in the plan. |
| 4 | Finsweet, Inputflow, static meta and the LegalService JSON-LD now also load on the system pages (GPT 4, Gemini Q4) | Stated to the operator. Measured: no change to style, text, links, cookies or console on those pages. They are noindex/utility pages, so the JSON-LD on them is inert. |
| 5 | `RemoveStateOptions` now site-wide (GPT 7, 8) | Intended: every form has the same state list, and the operator asked for it once for all forms. It does nothing without `#n-state` (tested: no errors on the system pages). |
| 6 | Heading-fix: which page is excluded (GPT 10) | The home page. It never had it, and measured, it would change 43 elements there. It stays per page until the design-system work turns it into classes. |
| 7 | Dropped Font Awesome / `.addressmj` / duplicate tags could matter for future content (GPT 11–13) | 0 elements render with Font Awesome on any page. `.addressmj` is in no published page. The CMS "Site Pages" template now uses the thank-you component, and Know Your Rights is not published. Webflow still outputs twitter:card/title/description and og:type from the page settings (checked in the served HTML). |
| 8 | No real formspree submission; no live tracker verification (GPT 14, 15; Gemini "blocker") | Not done by design: a real lead waits on D1 (it would enter the live pipeline), and the tracking accounts are shared and must not be changed. The form sends the identical 412-byte payload on 52/52 pages, before and after. |
| 9 | Phone swap not proven (GPT 16) | The phone-swap embed is untouched page content. The `tel:` targets were compared on 52 pages × 2 widths with `?utm_source=facebook`: identical. |
| 10 | webflow.js rebuilt by Webflow (GPT 18) | Platform-side; it happens on every publish. Covered by the live run: form walk (3 steps plus pop-up), nav links, styles and text, 52 pages × 2 widths. |
| 11 | `.credolegal.com` cookies (GPT 19) | Pre-existing (the old page footer); unchanged. Merging the UTM scripts is PBI-01b, deferred by the operator. |
| 12 | Staging uses production tracker ids (GPT 20) | Pre-existing and known: staging.credolegal.com is the production site being built. |

**Status: settled.** The live comparison was re-run after the fix (see the board).
