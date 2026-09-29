# Review packet: PBI-11 · Statute citations keep their case

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there.
- Audit finding G18: every statute citation on the landing pages was displayed in capitals because its label style forced
  uppercase: "§ 1692e(2)" showed as "§ 1692E(2)", "§ 1692c(a)(1)" as "§ 1692C(A)(1)", "FRCP 60(b)" as "FRCP 60(B)". The stored
  text was correct. For a law firm, a citation in the wrong form reads as an error.
- The same two label styles also carry short word labels that the approved prototype shows in capitals: the example tags in
  the rights section (Right / Violation / Remedy / Deadline) and the words in the problem-card meta row ("Lawsuit defense",
  "State payday law"). In the rights section's left column, law names ("State payday law", "Civil right") sit where a
  citation would; the prototype shows that column as typed (no uppercase).

## Change
1. Styles `mjfdcpaboxtext` (rights section) and `mjfdcpaboxtext Copy` (card meta row): `text-transform: uppercase` → `none`
   at the base breakpoint, **and** an `xl` (≥1440px) override that set uppercase again was removed. No other breakpoint sets it.
2. So the word labels keep their look, **362 labels on 51 pages were retyped in capitals** ("Violation" → "VIOLATION",
   "Lawsuit defense" → "LAWSUIT DEFENSE"). Law names in the rights left column were left as typed, as in the prototype.
   Edits were made on the text node itself (bold kept). Element ids were read per page; where an id did not exist on a page
   the edit failed harmlessly ("not found") and that page was queried and fixed.
3. The form-header label class (`mjfdcpaboxtext Copy Copy`) was not touched (its text is typed in capitals).

## Evidence (live site, 29 Sep; trackers blocked)
- Every element in the two classes on all 51 landing pages was recorded **before** the change (stored text + context), and
  compared **after** publishing, at **1920, 1440, 1280 and 390 px** wide: 474 citations/law names now display exactly as typed
  and their stored text is unchanged; 406 word labels display in capitals (stored text = old text in capitals); 355 others
  (card numbers, form label) unchanged. **0 problems at each width.**
- Page-wide scan (every element whose own text is changed by text-transform, 1440 px): **0 citations** affected (before: 305).
- The first publish only changed the base breakpoint; the page-wide scan caught that citations were still capitals at
  ≥1440 px (the `xl` override). Fixed, republished, all four widths re-verified.
- The audit's list of citations per page is covered by the full per-page check above (all citations on all 51 pages).

## Questions for the reviewer
1. Is removing uppercase from the classes plus retyping the word labels in capitals the right fix, versus e.g. separate
   classes for citations and word labels? Any risk from typing labels in capitals (screen readers, future editing)?
2. Is the before/after comparison enough to show no label text was damaged or put in the wrong element?
3. Anything else that could still render a citation in capitals (other breakpoints, other classes, hidden elements)?

Screenshots (UX pass): rights section desktop (stop-calls), problem cards desktop (stop-calls), rights section phone
(payday-loan-lawsuit-respond), problem cards phone (ohio).
