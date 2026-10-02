# Review packet: PBI-32 · remove the time tags from the "How it works" steps

## Context (fixed)
- Law firm lead-generation landing pages in Webflow; staging.credolegal.com is the production site being built.
- Each "How it works" step ended with a small red tag (DAY 0, WEEK 1+, ONGOING, BY DEADLINE, CONSULTATION …).
  The operator (2 Oct): remove these labels from all pages and from the code; they are not needed.

## Change (staging only, 2 Oct)
- Removed the tag element (class `Text Block 19`, last child of each step) in: the LP · How it works component
  (4 tags × 51 landing pages), home's own section (4) and the Thank-you page component (3 × 3 pages): 217 tags on 55
  pages.
- Removed the 4 component props "Step 1–4 when" that held each landing page's tag text, and the matching entries in
  the repo tools (lp-components.json, lp-sync.mjs, lp-extract.mjs).
- Nothing else: step numbers, titles and texts unchanged. Each step box is one line shorter; the step keeps its own
  20px bottom padding.

## Evidence
- Served HTML, all 56 pages before vs after (normalised for file hashes and publish time): identical once the tag
  elements are removed from the "before"; 0 tag elements and 0 of the tag texts left on any page.
- Functional compare saved-vs-live with campaign parameters, 4 pages × 2 widths: tracker requests, dataLayer, `tel:`
  links and swapped numbers, links, cookies and form payload identical; only visible text and styles differ (the tags).
- Screenshots after: landing page at 1440 and 390, thank-you at 1440 (`P32-steps-*.png`).
- Before-state kept: every page's tag values (`step-tags-before.json`) and markup.

## Questions for the reviewer
1. The thank-you section's sub-heading still reads "A clear sequence, on a known timeline." and one step title is
   "Cease letter sent, day one": fine without the tags, or should the operator be asked?
2. Any concern with deleting the props rather than leaving them unused?
