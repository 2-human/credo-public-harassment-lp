# D13 follow-up (repeat submissions) · Resolution of the independent reviews (29 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini do not approve** (2 blockers) · **UX · GPT approve with fixes** ·
**UX · Gemini approve with fixes**.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini 2):** routing of a second submission to /page/already-submitted not tested | Where the form sends visitors is set in the formspree account (not visible or ours to change); a real test submission waits on D1. Both destinations now carry correct wording, so the result is right whichever page is used. |
| 2 | **Blocker (Gemini 3):** conversion tracking could depend on the page text | **Checked:** the GTM container (GTM-PTLMPVGH) has no trigger on "thank-you", "already-submitted", the old or the new headline, or any h1. The change is text only. |
| 3 | Slightly smaller gap above "Here's what you can expect from us:" after the line breaks were dropped (Gemini) | Accepted as is: minor spacing on an older-design page; logged for the design system (unified thank-you page, DS-6). |
| 4 | Binding risk: an empty field would blank the headline (GPT) | Both items (the whole collection) have Title and Long subtitle filled and published. |

**Status: settled.**
