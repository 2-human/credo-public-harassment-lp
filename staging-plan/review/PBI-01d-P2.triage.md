# PBI-01d P2 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts:
- **Code · GPT:** approve with fixes.
- **Code · Gemini:** approve with fixes. Its one blocker was answered with evidence (#1).
- **No UX review:** nothing visible changed. Computed styles, text and phone numbers were identical on 56 pages × 2 widths,
  live vs pre-change.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini 2), GPT 1:** is `window.credoSystemPage` defined before the new block at the start of the site footer? | **Yes.** P1 defines it in the **site head code**, which runs before any body or footer code. Tested live, 29 Sep, on /401, an arbitrary 404, /thank-you, /page/thank-you and /page/already-submitted: `credoSystemPage` is `true`, the phone script does not run (no log line, no sticky bar), and the tel links are the pages' own. |
| 2 | Slug lookup is case-sensitive (Gemini 1) | Tested: Webflow answers `/OHIO` and `/California` with **404**, so mixed-case URLs never reach a landing page. A trailing slash is 301-redirected to the canonical URL, and query and hash do not affect `pathname`. Tested live: `/credit-card-debt-stop-calls/?utm_source=bing#faq` shows that page's bing number. No change needed. |
| 3 | Return visit via cookie not tested (GPT 10) | **Tested live:** a meta click on /medical-debt-bills-errors shows its meta number; a return to the same page without parameters shows the same number; a different page (/credit-card-debt-stop-calls) without parameters shows **its own meta number** (14076243722). |
| 4 | Listener order after moving from a body-top embed to the footer; synchronous dependencies (GPT 3, Gemini 3) | The block runs first in the footer. Nothing in the body calls it synchronously: the script only registers DOMContentLoaded listeners, and no console errors occurred on 112/112 loads. The PBI-05 sticky-bar code runs on `load`, after all of them. The sticky bar, phones and anchor links were identical in all runs. |
| 5 | Removing the embed could affect `:first-child`/sibling selectors or interactions (GPT 9) | The computed styles of every element were compared, before vs after, on 56 pages × 2 widths: identical. The only exception is the removed wrapper itself, an empty div holding only a script. The embed has no id or class hook in the served HTML. |
| 6 | `window.CREDO_PHONES` could be overwritten (GPT 7) | It appears only in the new block (served-HTML search). Nothing else on the site references it. Left writable on purpose, so the table can be inspected in the console. |
| 7 | `'*'` fallback for unlisted pages (GPT 6, 15) | This is the operator's D19 decision (default: the main number, (718) 865-8350). Today every page with the form is listed (52/52). A new page needs a row, as the note on the table says. |
| 8 | `h1.heading-46 em` rule is now global (GPT 14) | Intended: it is the planned red accent word (PBI-18). Today it matches nothing. |
| 9 | Real network, form and call tracking not tested (GPT 11, 12, 16) | Shared accounts and live leads: same as P1 and D1. Request sets, dataLayer and form payload are identical. |
| 10 | Other domains could get this on a publish to all domains (Gemini 4) | The project publishes to staging.credolegal.com only (checked before every publish). enroll and start are separate Webflow projects. |

**Status: settled.** No code change needed.
