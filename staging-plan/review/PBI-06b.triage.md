# PBI-06b · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini do not approve** (1 blocker) · **UX · GPT approve with fixes** · **UX · Gemini approve with fixes**.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini code 2):** enroll/start not re-checked after this publish (GPT code 5 too) | **Re-checked after the final publish (17:45):** enroll 30/30 and start 30/30 byte-identical to the fingerprints. |
| 2 | Button link, "or call" number, tracking not tested (GPT code 6, 8, 9; Gemini code 3) | **Tested on all 31 pages (phone, Meta visitor):** button link unchanged from 27 Sep (`#herosec`); a tap scrolls up to the form; the "or call" number equals the page's tracked hero number. The CTA's markup and classes were not edited. |
| 3 | "Nothing else changed" too broad (GPT code 3, 4; GPT UX 3, 9) | The class usage was re-checked before the edit: `text-block-20` exists only in this section on these 31 pages. The only other edits were removing trailing breaks; the API re-read shows the wording unchanged; the footer is not part of this section and was not touched. |
| 4 | "7 pages had a zero-width joiner" vs "removed on 6" (Gemini code 4) | Wording in the packet: 7 pages had one trailing break; on 6 of them the break was followed by a text node holding only a zero-width joiner (both removed); on the 7th (debt-harassment-fdcpa-attorney) the joiner sits inside the sentence's text node, so only the break was removed. |
| 5 | Browser / font loading (GPT code 12) | Measured in Chromium after full load (web fonts loaded) at 1440 and 390 px, 62/62 = 39 px. |
| 6 | Duplicate button style name (GPT code 10; Gemini code 5) | Noted for the design-system clean-up (DS-9). |
| 7 | Gemini UX 2: the roomy gap weakens the button's link to its paragraph; the tighter one grouped better | Design opinion that differs from the operator's choice (the roomy gap). Reported to the operator; no change. |
| 8 | Paragraph line on desktop is ~165 characters (Gemini UX 4); "or call" small (GPT UX 5, Gemini UX 5) | Already planned: PBI-17 (bottom CTA: headline and text max width) and PBI-16/19 (small text). |

**Status: settled.**
