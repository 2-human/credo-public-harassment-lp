# Review packet: PBI-09 · dropdown options stored in Webflow (no rewrite script)

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`). 51 landing pages use one shared form component (`LP · Lead form`);
  the home page has its own copy of the form.
- The form's step 2 has four dropdowns: how many debts, debt stage, secured/unsecured, and state (step 3).
- Until now the options for "How many debts?" and "Secured or unsecured?" were wrong in Webflow (`1-2 / 3-5 / 6+`,
  `Secured with collateral / Unsecured / Don't Know`) and a site-wide script ("G17", in the site head code) rebuilt
  both dropdowns in the browser on page load with the prototype's options. The submitted values were the rebuilt ones.
- Webflow's API cannot read or set the options of a native Form Select (confirmed with Webflow's own API assistant,
  citing the Form Inputs docs FAQ). Its documented workaround is a custom DOM `<select>` with `<option>` children.

## Change (published to staging only, 30 Sep)
1. In `LP · Lead form` (51 pages) and on the home page form: each of the two dropdowns is now a DOM `<select>` with the
   **same** id (`debts`, `Debt-Security`), name, data-name, `required` and classes (`select-field w-select`) as before,
   and stored options identical to what the script produced:
   - `Select debts` (value "") · `1 debt` · `2–3 debts` · `4–5 debts` · `6 or more`
   - `Select debt security` (value "") · `Unsecured (no collateral)` · `Secured (collateral)` · `Not sure`
   (value = label, as the script set them). The native selects are hidden (kept until review, then removed).
2. The G17 dropdown script (1,682 characters) is removed from the site head code. The site head code was written
   back through the API and read back: byte-identical to the intended file (37,003 characters), the only difference
   from before being that one `<script>` block.
3. Not changed: the debt-stage dropdown (its options are already stored in Webflow; changing its values would change
   the data the CRM receives), the state dropdown, and the form script that validates and submits the form (it reads
   the dropdowns by id).

## Evidence
- **Served HTML, all 56 published pages vs before:** the 52 form pages differ only in the two dropdowns' `<option>`
  lists (now in the HTML) and the removed script block; the 3 thank-you pages differ only in the removed script block;
  404 unchanged. The `<select>` tags themselves are identical to before (id, name, data-name, required, classes).
- **What the visitor gets is unchanged:** before, the options only existed after the script ran; they are now served
  in the HTML, with the same text, values and order. A first publish without the `required` attribute (Webflow
  drops an empty attribute value) was caught by the served-HTML check and fixed (`required="required"`) before this
  final state.
- **Functional comparison, live vs pre-change, 52 form pages** (form walked through all 3 steps; POST answered
  locally; tracker requests, dataLayer, console errors, cookies, links, phones): **identical on 104/104** (52 pages × 1440 and 390); the form payload is 412 bytes on all 52 and its fields and values are the same as before (the walk picks the first real option, `1 debt` / `Unsecured (no collateral)`, the same option the visitor saw after the script ran). Computed styles identical (the new selects render exactly like the old ones). Four loads first showed console errors from the network (QUIC/socket errors, a Cloudflare Turnstile error that also occurs on the pre-change page); each was identical on re-run.
- **Nothing in the repo or the form script uses the old option values** (search: only notes and captures of the old live site mention them).

## Questions for the reviewer
1. Is replacing the native Form Select by a DOM `<select>` sound for a Webflow form (validation, submission, the
   Designer experience for later edits)?
2. Anything that could read the old option values (`1-2`, `Unsecured`, …) and now breaks?
3. Should the hidden native selects be removed now, or kept one cycle as a rollback?

## Round 2 (after the first reviews, 30 Sep)
- **Duplicate ids/names, hidden required fields (Gemini 1–2, GPT 1b):** Webflow does not serve elements whose visibility
  is off, so the hidden native selects were never in the published HTML: on every served page `id="debts"`,
  `id="Debt-Security"`, `name="Select-Debts"` and `name="Debt-Security"` occur exactly once. The hidden native selects
  have now been **removed** from the component and the home page and the site republished; the served HTML of all 56
  pages is identical to the verified state above (404 now also lacks the G17 block, as the other system pages did).
- **Every option and the placeholder validation (GPT 5–6):** new check `tools/webflow/pbi09-select-check.mjs`, pre-change
  page vs live, all 52 form pages: every option of both dropdowns sets the form value to its own label (`1 debt`,
  `2–3 debts`, `4–5 debts`, `6 or more`, `Unsecured (no collateral)`, `Secured (collateral)`, `Not sure`; placeholder
  = empty); both are `required`; pressing Continue with both left on the placeholder shows the same error list
  ("Please select how many debts you have … Please select debt security option") and step 3 stays closed.
  **Identical on 52/52.**
- **Real submission / CRM (GPT 4, Gemini 3):** waits on D1 (the operator has not yet chosen where a staging test lead may
  go; no test lead until then). The form is submitted by the site's own script with the browser's native
  `form.submit()` to the form's action (formspree), not by Webflow's form backend, so a DOM `<select>` is serialized
  like any other field; the captured payload is identical. The submitted values are also not new: since the G17 script
  was added, the browser always sent the rebuilt values, which are now simply stored.
- **Site head code scope (Gemini 4, GPT 2, 8):** this Webflow project is the staging site only; the live start site is a
  separate Webflow project that is never changed. All 56 published pages were checked; there are no other domains.
- **Designer editing (Gemini 5):** the options are ordinary DOM `option` elements in the Navigator of `LP · Lead form`
  (text and `value` attribute editable in the Designer), not an HTML embed; documented on the board.
