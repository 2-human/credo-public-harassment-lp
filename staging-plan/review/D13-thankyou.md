# Review packet: D13 · Thank-you wording + GUIDANCE tag

## Context (fixed)
- A law firm's lead-generation site in Webflow; **staging.credolegal.com is the production site being built**.
- D13: the thank-you headline promised a result ("You're pre-approved for a free legal consultation with our attorney." /
  "You have been pre-approved for a free legal consultation call with our attorney!"). The design preview proposed neutral
  wording, pending legal sign-off. **The operator approved applying it on 29 Sep.**
- Three thank-you pages are published: /thank-you (new design) and /page/thank-you, /page/already-submitted (two CMS items
  rendered by one "Site Pages" template, older design). Which one leads land on is set in the form service (not visible), so
  all three were updated.

## Change (text only)
- Headline (all three): "Thank you. Your request has been received."
- Paragraph (all three): "We appreciate the trust you've placed in our team to help protect your rights." / "One of our legal
  professionals will contact you shortly to schedule your free, confidential consultation." (replaces "…and guide you toward
  financial relief. One of our (dedicated) legal professionals will be in touch shortly to discuss your situation in more detail.")
- /thank-you box 02 "Personalized guidance": tag "§ 1692c(a)(1)" (calling-hours rule, unrelated) → "GUIDANCE", as in the
  prototype and like the other tags (EXPERTISE, PRIVACY, CONTACT).
- On /thank-you one forced line break was removed so the second sentence no longer leaves "free, confidential consultation."
  on its own line.

## Evidence (live, 29 Sep)
- Served HTML of all three pages: new headline and paragraph present; none of "pre-approved", "be in touch shortly",
  "truly appreciate" left; /thank-you shows GUIDANCE.
- Screenshots: /thank-you desktop and phone, /thank-you boxes, /page/thank-you desktop.

## Questions for the reviewer
1. Does the new wording avoid promising a result, and is anything else on these pages still inconsistent with it?
2. Any risk from changing the shared template (both CMS items)?
