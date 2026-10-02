# Review packet: heading order (Lighthouse "Heading elements are not in a sequentially-descending order")

## Context (fixed)
- Law firm lead-generation landing pages in Webflow; staging.credolegal.com is the production site being built.
- PageSpeed (operator, 1 Oct) flagged the form's first question `<h3 class="heading-47 lp-question">` right after the
  page's `<h1>`. A scan of all 56 published pages found 58 skipped levels on 55 pages: h1 → h3 (the step-1 question,
  51 landing pages + home) and h2 → h4 (the `Heading 41` card titles on home and the 3 thank-you pages).

## Change (staging only, 1 Oct)
1. Step-1 question h3 → h2: LP · Hero component (all 51 landing pages) and home's own form.
2. `Heading 41` card titles h4 → h3 on home (27) and in the Thank-you page component (7). Their current look came
   partly from Webflow's default h4 styles, so a combo class `Heading 41` + `as-h4` pins exactly those values
   (18px / 24px line height / 600 / 10px top and bottom margin). The base class was not changed, because the landing
   pages' own `Heading 41` h3 titles take h3 defaults (tested: changing the base class would have moved them).
3. Nothing else: the landing pages' Rights rows (h3 label + h4 text) and FAQ (h3) were already in order.

## Evidence
- Before the change, tested in the live pages by swapping the tags in the browser: every element's styles and box
  unchanged (landing page, home, thank-you × 1440/390) with the combo class; without it home and thank-you moved.
- After publishing: heading skips on the 56 pages 58 → 0. Served HTML 56/56 identical apart from the heading tags
  and the added combo class. Element compare (landing page ×2, home, 3 thank-you pages × 1440/390): 104 changed rows,
  all only tag/class name; font size, weight, line height, margins, box size and position identical in every row.

## Questions for the reviewer
1. Is h2 right for the step-1 question (the section's own title is visually the card header "Free case evaluation")?
2. Any concern with a combo class that pins tag-default values?
