# Design-system preview · Resolution of the UX reviews (GPT-5.5 and Gemini 3.1 Pro, 28 Sep)

Two rounds, both on screenshots only (21–22 images: every page family before/after, desktop and phone).

| Round | GPT-5.5 | Gemini 3.1 Pro |
|---|---|---|
| v1 | approve with fixes (0 blockers) | approve with fixes (**1 blocker**: the red "Comments" pill covers "Or call" on phones) |
| v2 | approve with fixes (0 blockers) | approve with fixes (**1 blocker**: crowded phone header) |

## Changed in the preview (done)
| Finding | Change |
|---|---|
| v1 blocker (Gemini), GPT v1-6: red "Comments" pill over the page | It is the review hub's own commenting tool, not part of any page. Hidden in all screenshots from v2 on. The round red bubble that remains is the Tidio chat launcher, which is on the live pages today (decision D8 covers Tidio). |
| GPT v1-3/4: 401 gives no way back into the funnel in the page body | 401 now offers "Get a free case evaluation" and "Call" under the password form. |
| Gemini v2-5: on phones the 404/401 buttons and "OR" share a line awkwardly | Buttons stack full-width on phones with "OR" centred between them. |

## Placed on the backlog (Webflow work, not the preview)
| Finding | Where |
|---|---|
| **Gemini v2-3 (blocker)**, GPT v1-7, v2-10: phone header crowded (logo + full number + "Free review" on one line; small tap targets) | **PBI-06** (tracked number in the mobile header) is exactly this header. PBI-06 starts with two options to choose from: a call icon button, or the number without the "Free review" button; both get a UX review before anything is built in Webflow. |
| Gemini v2-2: red "NO UPFRONT COST" on the near-black form header is low contrast | **PBI-15** (colour and contrast): red on dark uses `credo-red-soft` #ff6b73. |
| GPT v1-5, v2-7: small, light helper text and step labels | **PBI-15/16** (secondary #6a7688 for small text on white; labels to 12px); axe contrast check on every page in DS-3. |
| Gemini v2-4: Tidio bubble covers the last card on the thank-you page (phone) | **PBI-19** (small polish): bottom padding under fixed elements (same task as the PBI-05 UX finding). |

## Decisions for the operator (design proposals, not changed yet)
| Finding | Proposal |
|---|---|
| GPT v1-3/14, v2-3/12: thank-you page has no call or scheduling button on the first screen (the old purple page did) | Move "Call now" and "Schedule a consultation" up, right under "Request received". |
| GPT v2-14: "You're pre-approved for a free legal consultation" may read as over-assuring for a law firm | Legal/compliance wording check; alternative "Your request has been received. An attorney will review it and call you." |
| GPT v1-9, v2-8: "Or call" under the form is small | Keep the form primary; make "Or call" a full-width outline button on phones. |
| GPT v1-11, v2-13: no trust signal on the first phone screen | Optional compact rating row (e.g. "4.5 ★ Trustpilot · A BBB") under the form on phones. |
| GPT v1-1: thank-you and system pages use a lighter template | Intended: a documented "system page" variant of the header (DS-10 style guide). |

**Status:** v2 has no GPT blockers; Gemini's remaining blocker (phone header) is the first thing PBI-06 addresses. The proposals above wait for the operator.
