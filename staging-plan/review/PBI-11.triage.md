# PBI-11 · Resolution of the independent reviews (GPT-5.5 and Gemini 3.1 Pro, 29 Sep)

Verdicts: **Code · GPT approve with fixes** · **Code · Gemini do not approve** (2 blockers) ·
**UX · GPT approve with fixes** · **UX · Gemini approve**.

| # | Finding (reviewer) | Resolution |
|---|---|---|
| 1 | **Blocker (Gemini 2):** labels typed in capitals are an accessibility risk (screen readers spelling them out) and harder to maintain; use a separate uppercase class (also GPT 6) | **Kept for now, raised for the design system.** Current screen readers read common all-caps words ("VIOLATION", "REMEDY") as words; spelling out affects short unknown strings. The fix the audit prescribed (retype as the prototype shows) keeps the approved look without touching 700+ element classes. The cleaner structure (one `citation` class, one `label` class with uppercase, words typed normally) is logged as a design-system task, where the classes are being rebuilt anyway. |
| 2 | **Blocker (Gemini 3):** editing text nodes could break CMS bindings | **Not applicable:** these are static pages (no CMS collection behind the landing pages; the page list shows no collection ids for them). |
| 3 | Untested breakpoints (GPT 1; Gemini 1) | **Checked in Webflow at every breakpoint** (main, large, xl, xxl, medium, small, tiny): both classes now carry `text-transform` only at the base (`none`); the only other override is `tiny` (alignment, font size). The first publish missed an `xl` uppercase override; the page-wide scan at 1440 px caught it; removed and re-verified at 1920/1440/1280/390 px. |
| 4 | 362 retyped vs 406 labels in capitals (GPT 2) | 406 word labels in total; **44 were already typed in capitals** (e.g. the first "RIGHT" tag on many pages), 362 needed retyping. |
| 5 | Wrong-element risk (GPT 5) | Every edit used an id read from Webflow for that element, or failed with "not found" (no write). Then every element in both classes on all 51 pages was compared with its saved before-text at four widths: 0 problems. Before/after texts are kept in the backup folder. |
| 6 | Pages outside the 51 (GPT 7) | **Found and fixed one:** the **home page** uses the same sections and was outside the scan list. After the style change its labels showed in mixed case, and 4 card citations were revealed as mistyped in Webflow ("§ 1692C (C)", "§ 1692c(A)(1)", "§ 1692c (b)", "§ 1692e (2)"); corrected to match the same page's rights section, labels retyped; republished and checked. /thank-you uses the classes only for numbers and "OR" (already capitals). A scan of all citations on all pages found no other mistyped citation. |
| 7 | Hidden elements (GPT 8) | The class scan reads the DOM, so hidden elements are included; Webflow shows 25 class elements per page and the scan matched that count on every page. |
| 8 | Form, tracking, phone swap (GPT 9-11) | Text and style only; form re-tested: one POST and `form_submit` on 3/3 pages; phone swap untouched. |
| 9 | Duplicate card numbers 01-04, 06, 06 (GPT UX 10) | **Real, pre-existing, not part of this change:** 30 pages (29 landing pages + home) number the fifth problem card "06". Same slip as fixed on the DS-7 duplicates. Offered to the operator as a quick follow-up. |
| 10 | CTA, phone, form not visible in the crops; mobile heading size (GPT UX 3-8) | The screenshots are section crops. Mobile type scale is PBI-16. |

**Status: settled**; design-system follow-up: separate citation and label classes.
