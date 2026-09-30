# PBI-23 · Performance on phones: per-script plan (for the operator's approval, 30 Sep)

Nothing below has been changed. Each script change waits for the operator's yes or no (standing rule).

## Baseline (staging, Lighthouse mobile defaults, median of 3 runs; tracking beacons blocked, scripts load)

| Page | Score | First paint | LCP | Total blocking time |
|---|---|---|---|---|
| debt-harassment-stop-calls | 53 | 4.2 s | 11.8 s | 454 ms |
| home | 54 | 4.4 s | 12.5 s | 500 ms |
| /letter | 52 | 4.2 s | 12.7 s | 430 ms |
| california | 53 | 4.2 s | 12.5 s | 481 ms |

The LCP element is the H1 **text**, not an image: it counts as painted when its web font arrives. The fonts come
through Webflow's JavaScript font loader (`webfont.js`, synchronous in the head) → Google Fonts CSS → font files,
while about ten third-party scripts download at the same time. Main-thread leaders: GTM tags (GA4, Ads, Meta, and the
Nextdoor pixel, which took 2.4 s in one run), Tidio, jQuery + Webflow, the page's own code.

Already confirmed (task 1): PBI-01's removals are live on all 56 pages (no videsigns call, multi-step.js or Font
Awesome; GTM loads once).

## Plan, one line per script

| # | Script (where) | What it does | Proposed | Expected effect / risk |
|---|---|---|---|---|
| 1 | `inputflow-tools/library@1/i.js` (site head, synchronous) | Attribute library (`if-lib-*`) for sliders/forms | **Remove** | No element uses it (only a leftover CSS rule names its class). Removes one blocking request from every page. Risk: none found. |
| 2 | Optibase `script.js` (site head, synchronous) | A/B testing and one click-conversion | **Keep as is** unless no test is running; if none, make it `async` | Synchronous is how Optibase avoids flicker in running tests. Needs the operator's answer: any live Optibase test? |
| 3 | Form logic, 32 KB inline (site head) | Pop-up steps, validation, submit | **Move to the site footer code** (same code, after the page HTML) | The HTML no longer waits for 32 KB of code before rendering; the form starts on DOMContentLoaded either way. Shadow-tested before publishing (form walk, payload, all states). |
| 4 | "decision" recolour + `.callustext a` colour (site footer) and "Legally" recolour (hero slider embed) | Colour the accent words after load | **Remove** | Redundant since PBI-18 (accents are in markup/CSS; the link colour is in the section CSS). |
| 5 | Trustpilot `tp.widget.bootstrap` (loaded twice: Trust strip and Rights & FAQ) | Trustpilot widget | **Load once** (remove the second include; both widgets still render) | One fewer script download and execution. |
| 6 | Webflow font loader (`webfont.js`, via Site settings → Fonts) | Loads 4 Google font families | **Operator, in Site settings → Fonts: remove DM Mono and PT Mono** (unused on all pages checked) | Fewer font files and a smaller Google Fonts CSS, so Hanken Grotesk (the H1) arrives sooner. Manual (Designer), not code. |
| 7 | GTM container (shared account) | GA4, Ads, Meta, Nextdoor pixel, … | **Operator, in GTM:** fire the Nextdoor pixel (and other non-essential tags) on Window Loaded or first interaction | Largest single main-thread cost seen. Not changed by me (shared account). |
| 8 | Tidio | Chat | Waits on **D8** (keep, lazy-load or remove) | |
| 9 | Mouseflow (with Clarity) | Session recording | Waits on **D5** (keep one recorder) | |
| 10 | Registered scripts `removestateoptions`, `formsubmitdatalayer` (end of body) | State list, form dataLayer push | **Keep** | Already at the end of the body; no gain. |
| 11 | jQuery + `webflow.js`, phone swap, UTM, sticky bar (end of body) | Webflow runtime, phones, tracking fields | **Keep** | Needed; already at the end. (UTM overlap is PBI-01b, deferred.) |
| 12 | Minify HTML/CSS/JS | Webflow setting | **Operator:** Site settings → Publishing → turn on minify | Manual toggle. |

After the approved changes: publish to staging, repeat the Lighthouse runs (same 4 pages, 3 runs each) and the
functional compare on all 52 form pages, then the usual reviews.
