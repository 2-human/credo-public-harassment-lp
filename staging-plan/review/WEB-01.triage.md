# WEB-01 (website prototype on the landing-page engine + legal pages) · Resolution of the independent review (GPT-5.5, 2 Oct)

Verdict: **Code · GPT:** approve with fixes. **UX · GPT:** approve with fixes. **Gemini: not run** (API credits depleted).

## Code
| # | Finding | Resolution |
|---|---|---|
| 1, 15 | Crawl output and full build script not in the packet | The check script and the build script are in the repo (tools/website-start/build.mjs); result: 74 pages, 1,932 links, 0 problems, re-run after every change. |
| 2, 6, 7 | Real submission, tracking, call tracking not tested | Out of scope: this is a static prototype with no trackers and no form endpoint. One phone number site-wide is intended (the new-clients line on every live page). |
| 3, 10 | Sticky CTA on pages without a form | Not a CTA: the sticky element is only the chat-launcher placeholder. The bottom call-to-action on about pages is a real link to the home form (tested). |
| 4, 5, 16, 17 | Engine changes also affect the landing-page prototype | Intended: the prototype now matches Webflow (no time tags, Trustpilot + BBB, main, fonts, 1300 px). public/harassment-lp is the prototype, not what Webflow serves. Checked 3 prototype pages: render without errors, no site nav. |
| 8 | Mobile menu | Checked at 390 and 810: links hidden below 860 px, menu shown, no overflow. **Fixed:** the group title inside the mobile menu is now a label, not a button. |
| 9 | Dropdown accessibility | **Fixed:** aria-expanded kept in sync, button toggles, Escape closes and returns focus; tested by keyboard. |
| 11 | Legal block types | Generator emits only h1, h2, h3, p, li; all text escaped; no tables. |
| 12 | Legal text is a draft | Yes: marked on every legal page; redlines go to the attorney. |
| 13 | References to deleted paths | Only old briefs under content/web/sites/start-redesign (history). The public hub URL (/variants/) is unchanged; a/, b/, c/, lps/ are gone on purpose (operator: delete the old versions). |
| 14 | Font files | Present in both folders; loaded with 200 in the check. |
| 18 | Other routes | Not applicable to the prototype. |

## UX
| # | Finding | Resolution |
|---|---|---|
| 3, 4, 13, 15 | States not in the screenshots | Checked separately: mobile menu open, services tiles, dropdown open, footer on every page type. |
| 5 | About page has no call-to-action in the content | It ends with the review strip and the closing call-to-action block (below the first viewport). |
| 6, 7, 10 | Placeholders, draft notice, entity/address mismatch, prototype note | Expected at this stage and flagged for the attorney ([confirm legal entity name and address]); notices are removed when the text is approved. |
| 8, 9 | Chat launcher over text on mobile | Same placeholder position as on the landing pages; left as is. |
| 12 | Phone links | All are tel: links. |

**Status: settled** (Gemini pending: credits).
