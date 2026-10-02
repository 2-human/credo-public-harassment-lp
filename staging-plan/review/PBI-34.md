# Review packet: PBI-34 · a main landmark on every page

## Context (fixed)
- Law firm lead-generation landing pages in Webflow; staging.credolegal.com is the production site being built.
- Lighthouse (operator, 1 Oct): "Document does not have a main landmark." Every page's sections sat directly in
  `<body>` between the navbar and the footer. Operator decision D29 (2 Oct): wrap them in `<main>`.

## Change (staging only, 2 Oct)
- On the 51 landing pages and home: a new Block with tag `main` between the navbar and the footer; the page's 8
  content sections moved into it in the same order (on landing pages these are the 8 `LP ·` component instances with
  their per-page copy; on home its own sections and the Trust strip). Navbar, footer and the sticky call bar stay
  outside.
- Thank-you pages (3): inside the shared Thank-you page component, a `main` block around its 4 sections; the footer
  component stays outside.
- The 404 page (Webflow's default, 5 elements) is unchanged.
- How it was done: piloted on one landing page and verified on the published page; then the same 4-step procedure on
  the other 50 landing pages by three helper agents with a fixed script (create block, set tag, move navbar before
  it, append the 8 sections). 7 pages hit API rate limits mid-way; the failed moves were retried in order.
- Same publish, separate items: the two unused "Inconsolata" custom fonts deleted (operator's OK), the operator's
  second Style Manager Clean up and image regeneration.

## Evidence (published pages)
- Served HTML, all 56 pages before vs after (normalised for file hashes and publish time): 55 identical once
  `<main>` and `</main>` are removed; the 56th is home, whose only other difference is the `sizes` attribute of its
  3 content photos (the operator's image regeneration). So every section is in its original position with its
  original copy on every page, including the 7 pages that hit rate limits.
- Each of the 55 pages has exactly one `<main>`, directly followed by the footer; h1 and the form are inside;
  navbar, footer and sticky call bar outside (checked in the browser on 4 page types).
- Element compare (every element's styles and box) on 7 pages × 1440/390, including two rate-limited pages: the
  only difference is the one added MAIN element; no other row changes.
- Tested before applying: wrapping in the browser on a landing page and home at 1440/810/390: 0 layout changes.
- Functional compare saved-vs-live with campaign parameters, 4 pages × 2 widths: tracker requests, dataLayer,
  `tel:` links and swapped numbers, text, links, cookies and form payload identical.
- Fonts after: only Hanken Grotesk and Credo Mono are declared; both preload URLs unchanged.

## Questions for the reviewer
1. Should the lead-form pop-up (a section with `id="heropopup"`, inside `main`) sit inside or outside the landmark?
2. Anything else that should stay outside `main`?
