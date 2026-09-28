# Review packet: PBI-06b · Same gap above the closing CTA button on every page

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. Work happens on a **staging clone** only: Webflow site
  `6ab90fb0761d44332faf21c8`, only domain `staging.credolegal.com`. Production (`start.credolegal.com`) and the developer's
  staging (`enroll.credolegal.com`) are separate Webflow sites and must not change.
- 31 pages end with a closing section ("Know your rights before you make any decision"): a short paragraph (`div.text-block-20`),
  then the red "Get a free case evaluation" button (`a.button-7-copy-copy-copy`, `margin-top: 15px`), then "or call (number)".
  Both classes are used only in this section, on these 31 pages.

## Problem (reported by the operator)
The gap between the paragraph and the button differed between pages. Cause: on 29 pages the paragraph's text ended with stray line
breaks (typed Shift+Enter; 2 `<br>` on 22 pages, 1 `<br>` + an invisible zero-width joiner on 7), adding an empty line (visible gap
≈ 39 px); 2 pages ended cleanly (≈ 16 px). Styles were identical. The operator chose the roomier ≈ 39 px for every page.

## What changed (Webflow Data API; published to the staging domain only)
1. On 29 pages: removed only the line-break elements (and, on 6 pages, the zero-width-joiner-only text node) that came **after the last
   word** of that paragraph. Breaks inside the text were kept (the home page has one mid-sentence break; left as is).
2. Style "Text Block 20": `margin-bottom: 38px` (the paragraph's own spacing; the button's 15 px top margin collapses into it).
   The button's style was not changed: the project holds two different styles with the same name "Button 7 Copy Copy Copy", so editing it by name was ambiguous.
- First attempt used 23 px assuming the two margins add up; measured result was 24 px on all pages (vertical margins collapse). Corrected to 38 px and republished.

## Evidence (28 Sep, after publishing)
1. Visible gap from the last text line to the button, measured on all 31 pages at 1440 px and 390 px: **39 px on 62/62**.
2. Every paragraph re-read through the API after the edit: one text node per page (home: text, break, text), no trailing breaks; wording unchanged.
3. Served HTML: e.g. `debt-lawsuit-attorney` no longer ends the paragraph with `<br><br>`.
4. enroll/start fingerprints: to be re-checked at close-out (last check 28 Sep earlier today: 60/60 unchanged).

## Conclusions to challenge
1. The closing CTA now has the same gap above the button on all 31 pages, on desktop and phone.
2. The fix lives in the style, so newly typed text cannot change the gap again unless line breaks are typed again.
3. Nothing else changed (copy, button, other sections, other pages, other sites).
