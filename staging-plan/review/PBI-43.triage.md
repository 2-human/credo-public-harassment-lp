# PBI-43 triage (6 Oct 2026)

Code: GPT approve with fixes; Gemini do not approve (one blocker, answered below). UX: GPT and Gemini approve with fixes.

Fixed
- GPT code 1 + 10 (menu check too broad): `verify-default-site.py` now reads the navbar's Services dropdown only and
  checks the six pages in order; the root's six service cards are checked separately. Re-run: all checks pass.
- GPT code 7 (comment overstates isolation): the browser script's header now says the Tag Manager container script
  loads; its beacons and every non-GET are answered locally.

Answered by the code or a test
- GPT code 2 ("Debt Defense Services by | Real Attorneys"): an artefact of the packet's join (the H1 end prop is empty
  on purpose); the served H1 reads "Debt Defense Services by Real Attorneys" (checked text = title) and the screenshots
  show it. The backup component exists ("Legacy root home (backup 6 Oct)", 9b878bb2-…, its tree read back with the 8
  sections). Its grid rules were dropped from the compiled CSS; Webflow recompiles them if the component is placed again.
- GPT code 4 + 8 (site-wide effects): the footer change only adds six rows (diff of 7 lines; served footer byte-identical
  to the file); the CSS change is proven per selector (85 removed, all `-2faf219d`, nothing else); the mirror check
  compares 18 pages element by element with staging. The PBI-42 journeys were tested on 6 Oct and the script is unchanged.
- GPT code 5 (publish evidence): publish responses list only staging.credolegal.com; served stamps: start 23 Sep, enroll
  2 Oct, staging 6 Oct 10:51 UTC.
- GPT code 11 (hub root links): "Home on staging" resolves to https://staging.credolegal.com/; the mirrored home loads
  (200) and renders in the hub; check-mirror covers default/ and one default page.
- GPT UX 12 (header phone is a tel: link): the browser check reads every tel: link per source.

Not in scope / rules
- Gemini code 10 (blocker) + GPT code 6 (form submission): standing rule, no test lead until D1; forms are never
  submitted. The lead form is the shared `LP · Lead form` component, unchanged and the same on all 48 landing pages.
- Gemini code 11/12, GPT code 7 (tracker firing, analytics): shared site code, unchanged by this item.
- GPT code 9: the Marketing Hub is local plus the password-gated mirror (data encrypted in CI).
- GPT code 13 / Gemini 14: canonical to start.credolegal.com is the rule on every staging page until the domain switch.
- GPT UX 8 (empty trust strip): the screenshot was taken before any scroll; the badges load on the first interaction
  (PBI-30), the same on every page.

For the operator (copy and existing components, not changed here)
- Copy (attorney review of the draft): the home's "Every type of consumer debt" card conflicts with the FAQ ("We do not
  handle student loans, tax debt, child support or government debt"); suggest "Every kind of unsecured consumer debt".
  GPT also flags "We make them stop", "licensed across most U.S. states" and the trust-strip figures (10 million+ /
  500k) for substantiation (existing D24-type question).
- UX suggestions on shared components (all pages, not new): service cards on the homes have no visible "link" cue;
  "A clear sequence, on a known timeline" heading; small "Or call" link and footer legal text on phones; fuller menu
  labels on About ("Harassment Defense"). Candidates for a later item if the operator wants them.
- Cluster visitors who open About/legal now see the default pages under Services (operator decision 6 Oct; both
  reviewers note it as acceptable).
