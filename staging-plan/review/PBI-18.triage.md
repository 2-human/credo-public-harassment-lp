# PBI-18 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 30 Sep)

Verdicts, round 1: **Code · GPT:** approve with fixes. **Code · Gemini:** approve with fixes. **UX · GPT:** approve with
fixes. **UX · Gemini:** approve (12 before/after screenshots). Round 2 (`PBI-18-r2.md`, the four picked accents with
their pages): **UX · GPT** and **UX · Gemini:** approve with fixes.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | The picked accents were not shown (GPT code 3–4, GPT UX 2, Gemini UX 2) | Full table of all 52 pages in `PBI-18-accents.md`; round 2 sent the three landing pages (desktop + phone) and home. |
| 2 | "Rudely" is the weak pick (round 2: GPT UX 4, Gemini UX 1) | **Changed:** "Payday Lenders **Calling** Rudely?" (the same accent as the credit-card page). The informal wording itself is decision D22 (prototype: "Calling Aggressively?"); the reviewers' note was added there. |
| 3 | "Make Them Pay" is the most aggressive H1 (round 2: GPT UX 3) | Kept: "Pay" is the firm's answer in that H1, as on the other pages; the H1 wording is D22 (prototype: "Our Attorneys Can Explain Your Rights and Act."), note added there. |
| 4 | Home: black full stop after red "Legally" (round 2: Gemini UX 2, note; GPT UX 5: keep "Legally") | Kept by rule: punctuation stays outside the accent on every page (prototype `h1` arrays put "?" outside, bottom CTA "decision."). |
| 5 | Home H1 already red before (GPT UX 4) | Yes: a home-only embed script recoloured "Legally" after load (same pattern as the footer "decision" script). The accent is now in the markup, so both scripts are redundant; their removal is listed for PBI-23, where every script change is approved one by one. |
| 6 | The footer script now acts on text inside the `em` (Gemini code 5) | Checked: it wraps "decision" in a span of the same colour inside the em; em colour `rgb(255, 107, 115)` and upright on 52/52 pages at both widths. |
| 7 | Defaults and unset props not shown (GPT code 2) | The template draft's hero (no overrides) resolves to "Debt Collectors Won't " / "Stop Calling" / "?"; new props defaulted to empty, so pages were unchanged until set; empty parts render as empty spans (checked on the accent-first and accent-last pages). |
| 8 | Home CTA line break removal only checked at 1440/390 (GPT code 7) | Checked at 1440, 1024, 800, 768, 700, 600, 480, 390, 320: home wraps exactly like the landing pages (two lines, three at 480: "Know your rights / before you make any / decision."), never a lone word. |
| 9 | CTA `em` rule could reach other pages (GPT code 9) | The bottom CTA section exists only on the 52 form pages (no thank-you or system page has it). |
| 10 | Tool updates not evidenced (GPT code 10) | `lp-extract.mjs` on the served pages returns the three parts exactly as set on 51/51 landing pages; `lp-sync.mjs` dry run against the prototype: H1 differences only on the D22 pages; `lp-components.json` lists both new prop ids. |
| 11 | Functional coverage sampled (GPT code 11–15) | **Re-run on all 52 form pages** (before vs after, one page at a time, 1440): form walk, payload, trackers, dataLayer, cookies, phones (incl. the phone swap) and links **identical on 52/52**; only styles differ, plus the visible text on home (the removed line break). |
| 12 | Phone link small on phones (GPT UX 8, round 2 GPT UX 10 / Gemini UX 3) | PBI-19 (next) gives the call links ≥24px tap height. |
| 13 | Step labels only numbers on phones (round 2, GPT UX 9) | Intended (PBI-16, as the prototype: labels hidden ≤420px so the progress bar stays one line). |
| 14 | Screenshots not available to the code reviewers (GPT code 19) | The code review is text-only by design; the UX reviews had the screenshots. |

**Status: settled.**
