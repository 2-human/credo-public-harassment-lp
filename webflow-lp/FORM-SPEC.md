# Landing page — form behavior spec

`template.html` shows only the **step-1 form card** (the debt slider in the hero). The full lead
form is a **3-step client-side wizard** that opens in a full-screen overlay. This is the behavior
to rebuild in Webflow. **None of it submits to a backend** — see "Submit" below.

## Structure

- **Inline card (in the hero):** step 1 only — the debt-amount slider + a **Continue** button.
- **Continue** opens a **full-screen overlay** (covers the nav) at step 2. The overlay has a
  progress header ("FREE CASE EVALUATION · STEP _n_ OF 3"), a step indicator (`01 Your debt ·
  02 Your situation · 03 Your details`), the step body, and Back / Continue (or Submit) buttons.
- The inline slider and the overlay's step-1 slider stay in sync.

## Step 1 — Your debt

- Question: "How much do you currently owe in total?"
- **Range slider:** `min=0`, `max=100000`, `step=1000`, default **$8,000**.
- Live label above it formats the value as currency; at the max it reads **"$100,000+"**.
- Ends labelled `$0` … `$100,000+`.

## Step 2 — Your situation

Five inputs (2×2 grid + a textarea):
| Field | Control | Options |
|---|---|---|
| How many debts do you have? | select | 1 debt · 2–3 debts · 4–5 debts · 6 or more |
| What types of debt do you have? | **multi-select** (checkbox dropdown) | Credit card · Medical bills · Personal or payday loan · Auto loan · Student loan · Other |
| What stage is your debt at? | select | Behind on payments · In collections · Being sued / served papers · Judgment entered · Wage garnishment |
| Is your debt secured or unsecured? | select | Unsecured (no collateral) · Secured (collateral) · Not sure |
| Tell us more about your situation | textarea | free text |

The **multi-select** is a custom dropdown: a trigger button shows the placeholder when empty or the
comma-joined selections when not; clicking reveals a checkbox panel. It closes on outside-click and
on `Esc`.

## Step 3 — Your details

Only these fields are collected (progressive profiling — address/city/DOB are captured later on the
call, not here):
| Field | Required | Notes |
|---|---|---|
| First name | ✓ | |
| Last name | ✓ | |
| Phone number | ✓ | `inputmode=tel` |
| Email | ✓ | `inputmode=email` |
| State | ✓ | select of all 50 states + DC |
| Zip code | ✓ | `inputmode=numeric`, `maxlength=5` |

Intro copy: "Where should an attorney reach you? / An attorney reviews every case. We never sell your
information." Plus the state-exclusion line (per page, e.g. "We currently do not service DC, DE, ID,
NC, OK, WV, or WY.").

## Validation (submit gating)

The **Submit** button stays **disabled** until ALL of: first, last, phone, email, state are non-empty
**and** zip matches `^\d{5}$` (exactly 5 digits). No format validation on phone/email beyond
non-empty in the original — add real validation in the rebuild.

## Submit

On submit the original code only does `window.location.href = "thank-you.html"`. **There is no form
action, no API call, no analytics/pixel, no CRM.** In Webflow: wire the form to your real endpoint
(Webflow Forms, a webhook, or your CRM), fire your conversion tracking, then redirect to a thank-you
page. Capture at least the step-3 fields; the step-1/2 answers (debt amount, situation) are useful
lead-qualification data worth sending too.

## Other interactions (small but easy to miss)

- **Smooth-scroll to the form** from every CTA/anchor that targets the form (72px offset for the
  sticky nav).
- **Body scroll-lock** while the overlay is open.
- **Back** goes to the previous step; from step 1 it closes the overlay. A close (×) button also closes it.
- **FAQ** renders **pre-expanded** (no accordion toggle in the original) — treat as static, or add your own accordion.
- The bottom-right red **chat bubble** is only a placeholder mount (`.tidio-ghost`) — wire your chat widget or remove it.
