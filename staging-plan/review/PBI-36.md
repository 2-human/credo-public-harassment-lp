# PBI-36 · Credit card rights page says "credit card" (3 Oct)

## What changed (staging only, one page: /fcba-and-fdcpa)
The page sits in the cluster "Know your rights × Credit card" but its headline and first screen never said credit card
(headline "Confused About Your Debt & FDCPA?"). The operator asked for it to be clear, with a short headline.
Only copy props and the search title/description changed. No component, style, script, form or tracking change.
The page's Google ad group ("FDCPA", paused) has the keywords "fdcpa", "fcba", "fcba dispute", "credit card" and ad
headlines such as "Know Your FCBA Rights", "Dispute Credit Card Errors", "Know Your FDCPA Rights"; both statute names
stay on the first screen (sub-line).

| Part | Before | After |
|---|---|---|
| Headline | Confused About Your Debt & FDCPA? | Credit Card Debt? Know Your Rights. |
| Sub-line | Our Attorneys Can Explain Your Rights and Act. | Our Attorneys Explain Your FCBA and FDCPA Rights and Act on Them. |
| First section heading | Billing errors or collector calls: understand your rights. | Credit card billing errors or collector calls: know your rights. |
| First section body | Federal laws like the Fair Credit Billing Act (FCBA) and the Fair Debt Collection Practices Act (FDCPA) give you powerful tools to dispute errors, stop harassment, and protect your finances. When creditors and debt collectors cross the line, you are not powerless. | If you carry credit card debt, two federal laws protect you. The Fair Credit Billing Act (FCBA) lets you dispute billing errors on your card statement. The Fair Debt Collection Practices Act (FDCPA) limits what debt collectors can do once a card debt is sent to collections. When card issuers and debt collectors cross the line, you are not powerless. |
| List item 1 | Review your situation with an experienced attorney. | Review your credit card debt with an experienced attorney. |
| List item 3 | Help you dispute billing errors and debts that cannot be verified. | Help you dispute card billing errors and card debts that cannot be verified. |
| Who this helps 1 | People struggling with unsecured debt, such as credit cards and medical bills. | People struggling with credit card debt. |
| Who this helps 2 | Anyone contacted by a third-party debt collector about a personal or household debt. | Anyone contacted by a third-party debt collector about a credit card debt. |
| Who this helps 3 | Those who see charges on a statement that they do not recognize. | Those who see charges on a card statement that they do not recognize. |
| Who this helps 4 | People who disputed a bill and are still being reported as delinquent. | People who disputed a card bill and are still being reported as delinquent. |
| Rights intro | The FDCPA and the FCBA give you specific protections. | The FDCPA and the FCBA give cardholders specific protections. |
| Search title | FCBA and FDCPA \| Credo Legal | Credit Card Debt Rights: FCBA and FDCPA \| Credo Legal |
| Search description | Facing unsecured debt or creditor harassment? Our attorneys challenge invalid debts, defend lawsuits and enforce your FDCPA rights. Free case evaluation. | Credit card billing errors or collector calls? Our attorneys explain your rights under the FCBA and the FDCPA and act on violations. Free case evaluation. |

Unchanged: problem cards (three FDCPA, three FCBA billing-error cards), the six rights, how it works, the five questions
and their FAQPage data, the closing paragraph, the form, phone number, head code (noindex, canonical).

## Verification done
- Served page read back after publishing to staging.credolegal.com only: all 11 new strings present, the three old
  strings gone, title and description as above, one h1, canonical and noindex unchanged, one FAQPage block.
- Prototype content file regenerated from tools/webflow/clusters/edits.json (the same values that were sent to Webflow).

## Questions for the reviewer
1. Is any statement of law in the new text wrong or overstated (FCBA: billing-error disputes on a card statement;
   FDCPA: limits on third-party debt collectors)?
2. Does the first screen now make clear the page is about credit card debt, with a short headline?
3. Anything a law-firm advertisement should not say?
