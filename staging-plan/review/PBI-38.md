# PBI-38 · Compact "Your rights" headlines on the landing pages (3 Oct 2026)

## What this is
Operator: the "Your rights" headline on some landing pages is much longer than on others, e.g. "Federal law protects you
when creditors take legal action. Before paying anything or accepting a default judgment, know your rights. Creditors
cannot:" (150 characters) versus "The Fair Debt Collection Practices Act (FDCPA) gives you enforceable, specific
protections." (91). "Please compact the your rights headlines to be of similar length to the latter of the two."

Rule applied: no "Your rights" headline longer than 91 characters. 26 of 53 landing pages were over; 19 distinct texts
were rewritten. The headline sits above a list of rights. On five pages the list items are sentence fragments that
complete the headline ("Creditors cannot:" + "Obtain a default judgment against you without first serving you
properly."), so those keep their lead-in. Law firm (New York attorney advertising rules apply): no promise of outcome,
no new legal claim; where the old text overstated, the new text says less.

Changed: the prototype content files (`public/harassment-lp/content-*.js`, field `rights.intro`, 26 files) and, after the
operator's OK on 3 Oct, the staging site: 25 pages, prop `Rights intro` of the `LP · Rights and FAQ` instance (one of the 26
content files, garn-how-to-stop, has no staging page). Published to the staging domain only.

## Old → new
| Characters | Was | Now | Pages (content file) |
|---|---|---|---|
| 197 → 84 | Federal and state laws protect a portion of your wages from garnishment, and require creditors to follow strict rules before touching your paycheck. Before a garnishment can begin, a creditor must: | Federal and state law set strict rules. Before garnishing your pay, a creditor must: | garn-prevention |
| 160 → 78 | The FDCPA doesn't just protect you, it pays you. Every violation by a credit card debt collector can carry up to $1,000 in statutory damages. Collectors cannot: | The FDCPA lets you claim up to $1,000 in statutory damages. Collectors cannot: | cc-violations |
| 150 → 78 | Federal law protects you when creditors take legal action. Before paying anything or accepting a default judgment, know your rights. Creditors cannot: | Federal law protects you when a creditor takes you to court. Creditors cannot: | cc-lawsuit-respond |
| 145 → 80 | Federal and state law provide specific exemptions that can protect your income from garnishment. These are not automatic, you have to claim them. | Exemptions can protect your income from garnishment, but you have to claim them. | garn-exemptions |
| 127 → 89 | Even after a garnishment order is in place, the law continues to protect you. Creditors and employers must follow strict rules. | Even with a garnishment order in place, creditors and employers must follow strict rules. | garn-attorney |
| 118 → 80 | The FDCPA gives you financial recourse against every collector that violates it, and each violation stands on its own. | The FDCPA gives you financial recourse against every collector that violates it. | more-money |
| 114 → 87 | Consumer protection laws give you rights when dealing with credit card debt. Card companies and collectors cannot: | The law limits how credit card debt is collected. Card companies and collectors cannot: | cc-negotiation |
| 111 → 80 | A garnishment has to follow federal and state rules. Whether it has started or not, you have these protections: | A garnishment has to follow federal and state rules. You have these protections: | garn-how-to-stop, stop-wage-garnishment, wage-garnishment-judgment, wage-garnishment-rights, wage-garnishment-violations |
| 106 → 68 | You may not owe what they say you do. Federal law gives you rights against unfair medical debt collection. | Federal law gives you rights against unfair medical debt collection. | med-attorney |
| 105 → 72 | Federal and state law give you specific, enforceable rights when a creditor sues you for a consumer debt. | The law gives you specific, enforceable rights when a creditor sues you. | lawsuit-attorney |
| 104 → 87 | Receiving court papers is not the end of the road. The law protects you in ways most people do not know. | Court papers are not the end of the road. The law protects you in ways few people know. | lawsuit-options |
| 104 → 84 | Payday loan collectors must follow strict federal rules. Most people being collected on don't know them. | Payday loan collectors must follow strict federal rules that most people don't know. | payday-harassment |
| 104 → 79 | Payday loan borrowers have more legal protection than most realize, at both the federal and state level. | Payday loan borrowers have more federal and state protection than most realize. | payday-rights |
| 103 → 87 | The Fair Debt Collection Practices Act creates specific, enforceable rules that collectors must follow. | The Fair Debt Collection Practices Act sets specific, enforceable rules for collectors. | rights-verbatim |
| 100 → 74 | Consumer protection laws protect you from abusive debt collection practices. Debt collectors cannot: | The law protects you from abusive debt collection. Debt collectors cannot: | credit-cards |
| 100 → 76 | The FDCPA doesn't just protect you, it creates financial accountability for collectors who break it. | The FDCPA creates real financial accountability for collectors who break it. | debt-harassment-settlement, debt-lawsuit-violations, medical-debt-violations, violations |
| 97 → 82 | The FDCPA applies to every third-party debt collector, regardless of how many are contacting you. | The FDCPA applies to every third-party collector, however many are contacting you. | one-attorney |
| 96 → 80 | Even after court papers are in your hands, the law protects you in ways most people do not know. | Even after you are served, the law protects you in ways most people do not know. | lawsuit-summons |
| 95 → 81 | Federal law puts the burden on the collector to prove a debt, and gives you tools to make them. | Federal law makes the collector prove the debt, and gives you tools to demand it. | med-credit-report |

## Notes on single rows
- $1,000 row: the old text said every violation "can carry up to $1,000 in statutory damages" and "it pays you". The new
  text says the FDCPA "lets you claim up to $1,000 in statutory damages" (15 U.S.C. 1692k(a)(2)(A) caps additional
  damages at $1,000 per action, not per violation).
- "each violation stands on its own" was dropped from the multiple-collectors row for the same reason.
- The know-your-rights page (rights-verbatim) carried the live champion page's text word for word; it is shortened too.

## Please review
1. Does any new headline change the legal meaning, add a claim, or promise an outcome?
2. On the five lead-in rows, does headline + list item still read as one correct sentence?
3. Any new headline that is unclear or weaker for a worried reader than it needs to be? Suggest wording at most 91 characters.
