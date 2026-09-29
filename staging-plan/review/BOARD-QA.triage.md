# Board QA · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep, evening)

Round 1 verdicts:
- **GPT:** approve with fixes.
- **Gemini:** do not approve. Its two blockers were PBI-12 being done while D20 is open (#1), and the fbclid field reaching the CRM (#2).

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | PBI-12 marked done while D20 is open (Gemini blocker 1, GPT 6) | **Fixed.** PBI-12 is open again, blocked on D20, with a new todo: "Apply the operator's D20 answer". All the other Part B fixes stay done and live. The state line says so. |
| 2 | PBI-08 closed although the CRM check (M3) is open (GPT 3). The new fbclid field reaches the live CRM before anyone has checked it (Gemini blocker 2) | **Fixed on the board:** the CRM task is todo again and PBI-08 is blocked on "M3 (operator)". **Not reverted:** the operator asked on 29 Sep for all the PBI-08 fixes and said they will test the CRM end. Formspree forwards extra fields; whether the CRM maps or ignores them is exactly M3. Reverting it would bring back the lost return-visit attribution. |
| 3 | D4 marked decided while PBI-21 is blocked on D4 and deferred (GPT 8) | **Clarified.** Two sets of four pages shared one label. D4's rebuild decision was applied in DS-7 to the 4 payday-loan pages. PBI-21 covers the 4 pages that show the payday page's content (collection-defense, credit-cards, fcba-and-fdcpa, stop-wage-garnishment), which the operator deferred. D4 now says so; PBI-21 is blocked on "Deferred (operator)"; its first task reads "Apply the operator's answer (own copy or redirect)". |
| 4 | D10 still says it decides whether shared code can move, and the state line lists it as waiting (GPT 9) | **Fixed.** D10 now reads: no longer blocks PBI-01d (the system-page check keeps GTM and Mouseflow off exactly as before); still open, optional, whether GTM should run on the thank-you pages. The state line lists D10 as optional. |
| 5 | PBI-14 still has "remove the @handle placeholder" although P1 dropped it (Gemini 6) | **Fixed.** The task is done and points to P1. D9 now only asks whether the X profile in the JSON-LD `sameAs` is right. |
| 6 | PBI-24 still plans a Clarity check on the legacy Hero-Form components (GPT 17) | **Fixed.** The task now covers the published form. The legacy components are only on the drafts and go with M2. |
| 7 | "Problem cards missed on 2 pages" (Gemini 4) | **Checked, not a defect.** The served HTML of all 52 form pages reads 01–06, except credit-card-debt-challenge, whose prototype has exactly 4 problems (01–04). The "50 pages" in PBI-12 meant the pages with 6 cards. |
| 8 | Possible double gap above the closing CTA on the 21 DS-7 pages (Gemini 5) | **Checked, not a defect.** The gap above the closing button was measured live on all 52 form pages: 38 px at 1440 and at 390 on every page. |
| 9 | Forms on 48 pages not tested after the fbclid change (Gemini 3) | **Already tested after PBI-08:** the P1 and P2 shadow and live runs walked the form on all 52 form pages with `?…fbclid=…` and compared the POSTed payload: identical, 412 bytes, 52/52. |
| 10 | Board-shape fix asserted without evidence (GPT 11) | `node tools/webflow/check-board.mjs` output after these edits: "32 items, 20 decisions, 8 manual rows; doing: PBI-01d; board data OK". The committed version before the fix failed with "decisions[17]: not a 5-string row". The rule is in tasks/lessons.md, to run after every board edit. |
| 11 | Page counts vary (30/31/51/52/54/56/57) (GPT 10) | They count different sets: 56 published URLs = 52 form pages (50 landing pages + home + /letter) + 404 + /thank-you + the 2 URLs of the Site Pages template; 57 included /401 in the 28 Sep inventory; 54 = the Title Case scan set; 30/31 = the landing pages before DS-7. Each item states its set. |
| 12 | A missing `CREDO_PHONES` row would silently fall back (GPT 14, Gemini 7) | Noted for P5 (template and sync tool): the tool will check that every published form page has a row. A restored `{slug}-old` draft would need its original slug back; the drafts are due for deletion (M2). |
| 13 | End-to-end items not done (real lead, GTM success-only, call-click, privacy, minify, redirects) (GPT 13, 15, 16; Gemini 8, 9) | Correct, and each already has its own board row: D1/PBI-02, G15, D6/PBI-22, G32, L2, G2, and the go-live recheck in D16. The repo pushes change only the private repo and the review hubs' public mirror; the live site is Webflow and is not deployed from the repo. |

**Round 2 (below):** the updated board was reviewed again by both models.

## Round 2 (29 Sep, evening)
Verdicts:
- **GPT:** approve with fixes.
- **Gemini:** its 13 checks of the round-1 fixes all pass ("supported"). Its verdict is do not approve, on three new "blockers" about systems outside staging.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| R2-1 | The state line still tied G29 to PBI-12 (GPT 1) | **Fixed:** "G29 … done under PBI-19". |
| R2-2 | "Hundreds of test leads sent to the live CRM" (Gemini 14, blocker) | **Not the case.** Every form test (lpcheck, the shadow tests, the submit tests) answers every non-GET request inside the test browser (`route.fulfill`), so no POST ever reached formspree. "1 post, 21 fields" on the board means one intercepted POST. The standing rule "no manual test lead until D1" holds. |
| R2-3 | noindex + canonical to start.credolegal.com could de-index the old live site; site-wide noindex would hurt if pushed live (Gemini 15, 16, blockers) | **Raised as D21** (operator decision). The set-up follows D16 and D19; start itself is untouched and serves `index, follow`. The heads must change at the domain switch; PBI-24 rechecks. Nothing is "pushed" from staging to start: they are separate Webflow projects, and start is never written to (operator rule, 29 Sep). |
| R2-4 | A missing `CREDO_PHONES` row falls back silently (GPT 12, 16) | **Guard added:** `python3 tools/webflow/check-phone-table.py [slug…]` fails if a published form page has no row. Run 29 Sep: 52 rows, 51 form pages checked (plus home), none missing. It is referenced in the PBI-01d note. |
| R2-5 | Clarity recapture, counts, card/gap inventories, E2E items, cookies across subdomains, draft restore (GPT 6–9, 13–20; Gemini 17–20) | Already tracked: PBI-24 (Clarity on the published form, go-live recheck), PBI-01b (one UTM mechanism, deferred), M2 (delete the drafts), D1/D6/G15/G32. Card numbering: 51 pages with 6 cards read 01–06, and credit-card-debt-challenge has 4 per its prototype. Gap: 52/52 at 38 px, both widths (the 21 DS-7 pages included). |

**Status: settled.** Open with the operator: D20, D21, M2, M3.
