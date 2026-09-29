# Review packet: one thank-you design and one number (D13 phone)

## Context (fixed)
- A law firm's lead-generation site in Webflow; **staging.credolegal.com is the production site being built**.
- Three thank-you pages: /thank-you (new design) and /page/thank-you + /page/already-submitted (two items of the "Site Pages"
  CMS collection, older design with a navbar). /thank-you showed (443) 483-4080, the older two (718) 865-8350 (enroll matches).
- Operator decision (29 Sep): give /page/thank-you the /thank-you design, and use (718) 865-8350 on both.

## Change
1. /thank-you: call button "CALL NOW · (443) 483-4080 →" (tel:+14434834080) → "CALL NOW · (718) 865-8350 →" (tel:+17188658350).
2. /thank-you's content (hero, Why Credo boxes, call/schedule, next steps, footer) was wrapped in a plain div and turned into a
   Webflow component **"Thank-you page"** with two text props, **Headline** and **Message**, bound to the hero headline and
   paragraph; defaults = the approved /thank-you wording. /thank-you uses the component with the defaults.
3. Site Pages template: the old navbar and four old sections were removed and replaced by one "Thank-you page" instance whose
   Headline/Message are bound to the item fields Title / Long subtitle. So /page/thank-you shows the approved wording and
   /page/already-submitted keeps "We already have your request." with its own message.
4. Template page code (old navbar/footer CSS, UTM copy scripts; backed up) cleared, as /thank-you has none. Template browser
   title "Credo: Microsite Staging" → "Thank you" (same as /thank-you).

## Evidence (live, 29 Sep)
- Served HTML: all three pages show only (718) 865-8350 (one tel link each, tel:+17188658350); /thank-you and /page/thank-you:
  "Thank you. Your request has been received." + approved message; /page/already-submitted: its own headline and message;
  no old navbar; title "Thank you" on all three.
- Rendered (desktop + iPhone 15): 5 sections each, no page errors; page heights /page/* 2025 px, /thank-you 2075 px (the
  difference: /thank-you breaks headline and message onto two lines; the CMS fields are single-line).
- Screenshots: /page/thank-you desktop and phone, /page/already-submitted desktop, /thank-you desktop.

## Questions for the reviewer
1. Anything in the component approach (one shared source, CMS-bound props) likely to break these pages or future edits?
2. Anything lost by removing the template's page code and navbar?
