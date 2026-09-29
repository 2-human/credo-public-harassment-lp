# Review packet: D13 follow-up · Own wording for repeat submissions (/page/already-submitted)

## Context (fixed)
- A law firm's lead-generation site in Webflow; **staging.credolegal.com is the production site being built**.
- /page/thank-you and /page/already-submitted are the only two items of the "Site Pages" CMS collection, rendered by one
  template whose headline and paragraph were static text, so both pages showed the same "request received" message. The
  operator asked for a separate line for people who submit twice, and has confirmed all site copy as accepted by legal.

## Change
- Template headline bound to the item field **Title**, paragraph bound to **Long subtitle** (both were empty, unused).
- /page/thank-you item: Title "Thank you. Your request has been received."; Long subtitle "We appreciate the trust you've
  placed in our team to help protect your rights. One of our legal professionals will contact you shortly to schedule your
  free, confidential consultation." (the approved D13 wording, unchanged).
- /page/already-submitted item: Title "We already have your request."; Long subtitle "Thank you. We received your request
  earlier, so there is no need to send the form again. One of our legal professionals will contact you shortly to schedule your
  free, confidential consultation."
- Items and site published. The paragraph's old line breaks (between the two sentences and a blank line at the end) are gone,
  so the gap above "Here's what you can expect from us:" is a little smaller.

## Evidence (live, 29 Sep)
- Served HTML: /page/thank-you shows the approved headline and paragraph; /page/already-submitted shows its own headline and
  paragraph; /thank-you (not CMS) unchanged.
- Screenshots: /page/already-submitted desktop and phone.

## Questions for the reviewer
1. Is the repeat-submission wording clear and consistent with the thank-you wording?
2. Any risk from binding the template to CMS fields?
