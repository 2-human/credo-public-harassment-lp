# Review packet: PBI-12 · page-specific copy fixes (5 pages)

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built.**
- Each landing page has a coded prototype, which is the reference for its copy. The 22 Sep audit (Part B) listed
  per-page differences from the prototype.
- The operator has accepted all copy as approved by legal (29 Sep). Rights tags are typed in capitals on every page
  (PBI-11, 29 Sep).
- This item closes the last five Part B differences.

## Change (published to staging only, 29 Sep; text edits only, no structure or style change)
| Page | Before | After (prototype) |
|---|---|---|
| credit-card-debt-challenge | H1 `Got Credit Card<em> </em>Debt?` (empty italic element) | `Got Credit Card Debt?` (plain text) |
| debt-harassment-fdcpa-attorney | The six rights summary lines were payday/lawsuit text: "File an answer. Be heard. Force the lender to prove the case." · "Unlicensed lender = potential void of the entire claim." · "Above-cap rate = …" · "Multiple sales without documentation = standing problem." · "Missing or inadequate ability-to-repay assessment = …" · "Improper service, mistake, excusable neglect, …" | "Up to $1,000 per lawsuit, paid by the collector." · "Emotional distress, job loss, medical expenses: all recoverable." · "Collector pays your legal fees when the claim succeeds." · "The violation alone is enough; no proven harm required." · "One year from the date of the violation, no extensions." · **"Each call after a cease request adds another violation to the claim."** (see note) |
| debt-harassment-violations | Section headline "You'll recognize your own situation here"; first rights tag (§ 1692k(a)(2)(A), statutory damages) "RIGHT" | Headline with a full stop; tag "REMEDY" |
| medical-debt-credit-report-removal | Hero sub-headline "Make them prove it. Our attorneys challenge…"; tag of the § 1692f item "RIGHT" | "Make them prove it — our attorneys challenge whether you owe the debt at all, and how much."; tag "VIOLATION" |
| wage-garnishment-attorney | How-it-works step titles "Loan investigation" / "Legal response filed" / "Resolution" | "Debt investigation" / "Legal representation" / "Work towards debt resolution" |

**Note on the sixth fdcpa-attorney line.** The prototype reads "Each call after a cease request: another $1,000 in play."
That contradicts the first line and the statute: FDCPA statutory damages are capped at $1,000 per action,
§ 1692k(a)(2)(A). It was replaced with "Each call after a cease request adds another violation to the claim.", which
matches the item's own text ("Multiple violations in the same case are pursued individually. More violations mean a
larger claim."). The wording goes to the operator for confirmation.

## Evidence
- **Served HTML of all 56 published pages, before vs after, compared tag by tag.** Exactly these 5 pages changed, and
  only in the lines listed above. The other 51 pages are byte-identical, apart from the publish stamp and webflow.js.
- **Tag order checked against the prototype:**
  - violations, live after the change: REMEDY · RIGHT · REMEDY · REMEDY · RIGHT (prototype: Remedy, Right, Remedy, Remedy, Right).
  - medical, live after the change: RIGHT · RIGHT · VIOLATION · VIOLATION · RIGHT · REMEDY (prototype: the same).
- **Screenshots of each changed spot, desktop 1440 and phone 390**, are attached to the UX review.

## Questions for the reviewer
1. Do the changes match the prototype, and is anything on these five pages still inconsistent with it in the edited
   sections?
2. Is the replacement sixth line accurate and consistent with the page? Is there a better compliant wording?
3. Is there any risk from the text edits: markup, the H1 element, or the tag styles?

## Round 2 (after the first reviews, 29 Sep)
- **Full-section screenshots** (`P12-full-*`, desktop and phone) show every row: the six fdcpa-attorney rights rows
  including the sixth, all five violations tags, all six medical tags, and all four wage steps on phone.
- **Added, from the Gemini UX review (audit G29):** the "Week 1" step tag was mixed case next to "DAY 0" and "WEEK 1–2".
  It was retyped in capitals on the 21 pages that had it, plus the home page's "Week 1-2 / Week 3-4 / Week 4+".
  Published; the served HTML of all 56 pages changed only in those 22 tags; 0 mixed-case "Week" tags are left.
- **Functional check**, live vs pre-change, on the 5 edited pages plus ohio and the home page, desktop and phone:
  - phone numbers, form payload, tracker requests, dataLayer, cookies and links are identical;
  - only the edited text differs;
  - on credit-card-debt-challenge, the layout is identical once the removed `<em>` element is left out of the comparison.
- **The sixth fdcpa-attorney line** goes to the operator as decision D20. Legal accuracy is not claimed by this review.
