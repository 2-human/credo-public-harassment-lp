# Landing page — phone number by traffic source (dynamic number insertion)

## Status: this is NOT in the page code — it must be built

The landing pages show **one fixed phone number** (baked into each page). The rendered page never
reads `utm_source` / `gclid` / `fbclid` / `msclkid`, and never swaps the number. The per-platform
numbers were planned and mapped, but the switching itself was never implemented on the page.

**Intended behavior:** show a different tracking number depending on where the visitor came from —
`utm_source=google` → the Google number, `utm_source=bing` → the Bing number, `utm_source=meta` →
the Meta number. Unknown/absent source → the default (Google) number.

## Data coverage (important)

From the source mapping (`content/campaigns/campaign-phone-numbers.csv`), joined per page:

- **Google:** assigned on **all 32** pages (this is the current on-page number).
- **Bing:** assigned on **13** pages (the rest have no separate Bing number → fall back to default).
- **Meta:** **0** pages — no Meta numbers exist in the source data yet.

So before Meta/Bing switching is meaningful for those channels, the agency must **assign the missing
tracking numbers**. The snippet already falls back to the default where a platform number is blank,
so it's safe to ship with partial data.

## Ready-to-use snippet

Paste in Webflow **page or site custom code, before `</body>`**. Set `NUMBERS` per page from the
table below (or load `phone-map.json`). In the page markup: wrap each **visible** number in an element
with `data-credo-phone` (e.g. `<span data-credo-phone>(718) 865-8350</span>` — keep any "Call us:"
label outside it), and make every **call button** a normal `tel:` link. The snippet sets the text on
the former and the `href` on the latter, so labels/prefixes are never clobbered.

```html
<script>
(function () {
  // 1) Per-page numbers. Blank bing/meta falls back to `default` (the Google number).
  var NUMBERS = { default: "(718) 865-8350", google: "(718) 865-8350", bing: "", meta: "" };

  // 2) Resolve source: utm_source, else infer from click-id, persisted for the session.
  var p = new URLSearchParams(location.search);
  var src = (p.get("utm_source") || "").toLowerCase();
  if (!src) src = p.get("gclid") ? "google" : p.get("msclkid") ? "bing" : p.get("fbclid") ? "meta" : "";
  try { if (src) sessionStorage.setItem("credo_src", src); else src = sessionStorage.getItem("credo_src") || ""; } catch (e) {}

  // 3) Apply: text on tagged number elements, href on all tel: links.
  var num = NUMBERS[src] || NUMBERS.default;
  if (!num) return;
  var tel = "tel:+1" + num.replace(/[^\d]/g, "");
  document.querySelectorAll("[data-credo-phone]").forEach(function (el) { el.textContent = num; });
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) { a.setAttribute("href", tel); });
})();
</script>
```

Notes:
- **Session persistence:** the source is remembered in `sessionStorage`, so the right number holds if
  the visitor navigates within the site before calling.
- **Click-id fallback:** if `utm_source` is missing but a `gclid`/`msclkid`/`fbclid` is present, the
  source is inferred (Google/Bing/Meta).
- **Consistency:** point any tracking/analytics "phone" event at the same resolved number.
- `phone-map.json` in this folder is the same table as JS (`window.CREDO_PHONE_MAP`) if you prefer to
  load one file and look up by page slug.

## Per-page number map

`—` = no separate number for that source → the snippet uses the default (Google). Meta is unassigned
everywhere. The ad-group column is matched by number, for reference.

| LP | On-page (Google) | Bing | Meta | Ad group |
|---|---|---|---|---|
| act-fast | (718) 865-8350 | — | — | S_All-States / FDCPA |
| attorney | (443) 483-4080 | — | — | S_Harassment_NW / FDCPA_Harassment |
| cc-challenge | (646) 952-7404 | — | — | S_CreditCard_NW / CC_Negotiation |
| cc-lawsuit-records | (646) 952-7380 | (718) 521-4180 | — | S_CreditCard_NW / CC_Lawsuit |
| cc-lawsuit-respond | (646) 952-7380 | (718) 521-4180 | — | S_CreditCard_NW / CC_Lawsuit |
| cc-negotiation | (646) 952-7404 | — | — | S_CreditCard_NW / CC_Negotiation |
| cc-stop-calls | (646) 952-7392 | — | — | S_CreditCard_NW / CC_Branded |
| cc-violations | (646) 952-7392 | — | — | S_CreditCard_NW / CC_Branded |
| garn-attorney | (720) 414-1751 | (646) 350-2650 | — | S_Garnishment_NW / Garnishment |
| garn-exemptions | (720) 414-1751 | (646) 350-2650 | — | S_Garnishment_NW / Garnishment |
| garn-prevention | (720) 414-1751 | (646) 350-2650 | — | S_Garnishment_NW / Garnishment |
| lawsuit-attorney | (347) 523-4568 | — | — | S_Lawsuit_NW / Creditor_Suing |
| lawsuit-fight-back | (347) 523-4568 | — | — | S_Lawsuit_NW / Creditor_Suing |
| lawsuit-options | (347) 523-4662 | — | — | S_Lawsuit_NW / Served_Papers |
| lawsuit-proof | (212) 561-5902 | (212) 993-7320 | — | S_Lawsuit_NW / Collection_Lawsuit |
| lawsuit-respond | (212) 561-5902 | (212) 993-7320 | — | S_Lawsuit_NW / Collection_Lawsuit |
| lawsuit-summons | (347) 523-4662 | — | — | S_Lawsuit_NW / Served_Papers |
| med-bills-errors | (612) 260-9170 | (407) 734-2024 | — | S_MedicalDebt_NW / Medical_Lawsuit |
| med-credit-report | (347) 744-9014 | — | — | S_MedicalDebt_NW / Medical_Rights |
| med-fdcpa-rights | (347) 744-9014 | — | — | S_MedicalDebt_NW / Medical_Rights |
| med-lawsuit-respond | (612) 260-9170 | (407) 734-2024 | — | S_MedicalDebt_NW / Medical_Lawsuit |
| more-money | (347) 474-9602 | (646) 350-2456 | — | S_All-States / Credit Card |
| one-attorney | (347) 474-9602 | (646) 350-2456 | — | S_All-States / Credit Card |
| payday-fight-back | (347) 744-9014 | — | — | S_MedicalDebt_NW / Medical_Rights |
| payday-harassment | (407) 512-0808 | — | — | S_PaydayLoan_NW / Payday_Brand_Harassment |
| payday-lawsuit-proof | (347) 744-9014 | — | — | S_MedicalDebt_NW / Medical_Rights |
| payday-lawsuit-respond | (347) 744-9014 | — | — | S_MedicalDebt_NW / Medical_Rights |
| payday-rights | (347) 744-9014 | — | — | S_MedicalDebt_NW / Medical_Rights |
| payday-violations | (407) 512-0808 | — | — | S_PaydayLoan_NW / Payday_Brand_Harassment |
| rights-verbatim | (443) 483-4080 | — | — | S_Harassment_NW / FDCPA_Harassment |
| stop-calls | (201) 416-7080 | (201) 535-3725 | — | S_Harassment_NW / Creditor_Harassment |
| violations | (201) 416-7080 | (201) 535-3725 | — | S_Harassment_NW / Creditor_Harassment |

> Some pages share a Google number (e.g. several payday/medical pages use `(347) 744-9014`); the
> ad-group column shows the first match for that number. The **numbers** are what drive the swap —
> confirm the final tracking numbers (especially Meta and the remaining Bing) with whoever owns the
> call-tracking account before launch.

## Alternative: a call-tracking provider

If you use a DNI provider (CallRail-style), you can skip the snippet: create a tracking number per
source, set the provider's dynamic-insertion to swap on `utm_source`, and tag the on-page number with
the provider's class/attribute instead of `data-credo-phone`. The per-page/source mapping above is
the source of truth either way.
