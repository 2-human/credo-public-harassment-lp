# Review packet: problem-card numbering (01-04, 06, 06) and the thank-you boxes

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there.
- Found by the UX review of PBI-11: the six "common problems" cards were numbered 01, 02, 03, 04, **06**, 06 on 30 pages (29
  landing pages and the home page). The same slip had already been fixed on the pages rebuilt earlier (DS-7). The thank-you
  page's four "Why Credo" boxes read 01, 02, **04, 06**, and box 02 carried a mistyped citation "§ 1692c(A)(1)" (the subsection
  letter must be lower case; it used to be hidden because the label style forced capitals, removed in PBI-11).
- The operator approved fixing the numbering.

## Change
- 30 pages: the fifth card's number text "06" → "05" (one text node per page, same element on every page).
- Thank-you page: box numbers 04 → 03 and 06 → 04; citation "§ 1692c(A)(1)" → "§ 1692c(a)(1)".
- Text only; no style, structure or script changes.

## Evidence (live site after publish, 29 Sep)
- Served HTML of all 54 published pages: **50 pages read 01-06 in order**; credit-card-debt-challenge shows four cards
  numbered 01-04 (as before, correct); thank-you reads 01-04 (rendered check: "01 EXPERTISE, 02 § 1692c(a)(1), 03 PRIVACY,
  04 CONTACT"); 2 pages have no cards.
- Form re-tested on 2 pages: one POST and `form_submit` once, same as the reference page.
- Noted for the operator, not changed: box 02 on the thank-you page ("Personalized guidance") is tagged with the calling-hours
  citation § 1692c(a)(1), which does not match the box; likely template leftover (copy decision).

## Questions for the reviewer
1. Anything in this change that could break content, layout or tracking?
2. Is the evidence enough to show every card list now counts correctly?

Screenshots (UX pass): problem cards desktop (debt-harassment-stop-calls), thank-you boxes desktop.
