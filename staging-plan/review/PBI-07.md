# Review packet: PBI-07 · Phone and ZIP fields open the number pad

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there.
- Two form types: the **new 3-step form** on 31 pages (30 landing pages + home; page-level form, field ids `n-*`) and the
  **old multi-step form** on 21 older pages (state pages etc.; inside two shared components "Hero-Form" and
  "Hero-Form-For-New-Pages", each holding two forms: ids without and with the `n-` prefix).
- Phone formatting is done by page scripts on key events ("2125550142" → "(212) 555-0142"); the new form validates
  "10 digits Number is required".

## Audit item
**F1** Phone fields were `type="text"`, so phones showed the letter keyboard; on the 21 old pages the ZIP fields did too
(the new form's ZIP already had `inputmode="numeric"` + `autocomplete="postal-code"`).

## What changed (Webflow Data API; published to staging.credolegal.com only)
- New form, 31 pages: `#n-phone-number` → input type `tel` + `autocomplete="tel"`. Nothing else on the element changed (id, name "PHONE", required).
- Old form, 2 shared components: `#phone-number`, `#n-phone-number`, `#Alternative-Phone-Number` → type `tel` + `autocomplete="tel"`;
  `#zip-code`, `#n-zip-code` → `inputmode="numeric"` + `autocomplete="postal-code"` (type stays `text`, so the existing 5-digit logic is untouched).
- No script, style or other field was changed.

## Evidence (28 Sep)
1. **Shadow test before writing** (new attributes applied to the served HTML, 5 pages, both form types, iPhone): the submit request
   carried exactly the same fields and values as with today's page (e.g. PHONE "(212) 555-0142", zip "10006"/"10001", dob "01/15/1980").
2. **After publishing, served HTML of all 57 pages:** 167 phone/ZIP fields on 52 form pages, all as intended (52 `n-phone-number` tel/tel,
   21 `phone-number` tel/tel, 21 `Alternative-Phone-Number` tel/tel, 52 `n-zip-code` numeric/postal-code, 21 `zip-code` numeric/postal-code).
3. **Submit test** (form filled, submit pressed, request captured and answered locally; nothing reaches formspree), 52 pages × iPhone 15
   (WebKit) + desktop Chrome = 104 runs: 104/104 sent one request with every field, the same field list as the same test this morning,
   PHONE formatted as before; utm/gclid carried through.
4. **Cross-browser regression** (30 landing pages × 8 devices): "Phone fields open the letter keyboard on phones" **30 → 0 pages**;
   form walk to the submit step 240/240; phone numbers vs the campaign sheet 344/344; no other finding changed (only Tidio sound-file
   load noise).
5. **Invalid phone handling, before (type restored to text locally) vs after, iPhone:**
   - New form, "212555": not sent, message "10 digits Number is required": before and after identical.
   - New form, letters "abcdefghij": message shown; not sent in 7/8 runs **both before and after**; in 1 of 4 before-runs and 1 of 8 earlier runs
     the form still sent with an empty PHONE → an intermittent pre-existing flaw, not caused by this change (reported to the operator separately).
   - Old form: sends even with an invalid phone ("(212) 555" or empty), before and after: pre-existing; those pages are being rebuilt (D11).
6. The on-screen keyboard itself cannot be captured in a headless browser and no iOS simulator is available; the keyboard type follows from the
   field attributes checked in #2 (`type="tel"` → phone keypad; `inputmode="numeric"` → numeric keypad).

**Correction (28 Sep, after the reviews):** in #5 the "sends" with an empty PHONE were Google Analytics `form_start` beacons whose URL mentions formspree, counted by a too-loose test filter. Strict re-test: the new form blocks all invalid phones and emails; the old form sends only a too-short phone.

## Conclusions to challenge
1. On phones, every phone field now opens the phone keypad and every ZIP field the numeric keypad, on all 52 form pages.
2. Formatting, validation and what the form sends are unchanged.
3. The invalid-phone behaviours listed in #5 existed before and are not caused by this change.
