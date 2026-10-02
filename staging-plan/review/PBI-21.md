# PBI-21 · Own copy for the four pages that showed the payday lawsuit page (2 Oct)

## What changed
On staging, /collection-defense, /credit-cards, /fcba-and-fdcpa and /stop-wage-garnishment showed the copy of
/payday-loan-lawsuit-respond. Each now has its own copy, taken from the same address on the live site
(start.credolegal.com, fetched read-only on 2 Oct) and fitted to the landing-page layout (the shared LP components;
copy lives in component props). Only props, the FAQ structured data of the four pages and one page title/description
were changed; no component, style or script was touched. Published to staging.credolegal.com only.

Where the live page had no matching section, text was written from the page's own statements or taken from a sibling
page already live on staging (marked in each file's header). Removed from the live copy: a client quote, "10,000+
clients", "plans starting at $250/month", a phone number that is not the page's own, the claim "if debts are
invalidated, they're removed from your credit report" (replaced by the live page's own footnote wording).
Fixed: "Garnishmed", "leave more on the table" (says the opposite of what is meant), "Our Attorneys Explains".

## Verification done
- Read-back: all 4 pages, every prop equals the content file (607 props compared on 6 pages, 0 differ).
- FAQPage structured data equals the visible questions on the 4 pages.
- /payday-loan-lawsuit-respond and /debt-harassment-stop-calls unchanged.
- Browser, 1440 and 390, trackers blocked: one h1, no horizontal overflow, no empty headings or paragraphs.

## Questions for the reviewer
1. Any statement of law that is wrong or overstated (FDCPA sections, FCBA, garnishment rules)?
2. Any promise or guarantee that a law-firm advertisement should not make?
3. Any place where the new text contradicts the live source below?

## New copy (as on staging now)

### /collection-defense
```json
{
 "hero": {
  "eyebrow": "Collection defense · Fight back",
  "h1": [
   "Debt Collectors ",
   "Harassing",
   " You?"
  ],
  "lede": "Our Attorneys Can Help.",
  "filler": "Fill in the form below or call us for a free review of your case."
 },
 "whatWeDo": {
  "headline": "You don't have to face collection attorneys alone.",
  "intro": "If a debt collection law firm or attorney is coming after you, you're not alone. Whether you're facing a lawsuit, a judgment, or constant collection letters, our attorneys can help you challenge the lawsuit, protect your rights, and explore all available legal options.",
  "bullets": [
   "Challenge the debt and the lawsuit, which may be based on outdated or invalid debt.",
   "File legal defenses or counterclaims when collectors violate the FDCPA.",
   "Work to stop harassing calls and letters.",
   "Help you resolve the debt on your terms, through legal channels."
  ]
 },
 "whyChoose": [
  [
   "Real legal power, not a call center",
   "You work with licensed attorneys who can respond in court, not with a phone agent."
  ],
  [
   "Court cases are complex and time-sensitive",
   "Our attorneys track the deadlines and prepare the response for you."
  ],
  [
   "Protection from default judgment",
   "Mistakes or no-shows can lead to a default judgment. We work to prevent that."
  ],
  [
   "Fear doesn't decide the case",
   "Collectors can rely on fear and confusion to win. We examine whether their claim holds up."
  ],
  [
   "Free consultation",
   "Speak with a debt collection defense attorney at no cost and find out where you stand."
  ]
 ],
 "commonProblems": [
  [
   "Debt collection lawsuits",
   "Collection attorneys file lawsuits for creditors. A lawsuit may be based on outdated or invalid debt.",
   "FRCP 12(a)"
  ],
  [
   "Court summons and complaints",
   "A summons starts a deadline. Mistakes or no-shows can lead to a default judgment.",
   "FRCP 55"
  ],
  [
   "Judgments and liens",
   "After a judgment, collection attorneys may place liens, garnish wages, or freeze accounts.",
   "15 U.S.C. § 1673"
  ],
  [
   "Harassing calls and letters",
   "Repeated calls and threatening letters are regulated, even when they come from a law firm.",
   "§ 1692d(5)"
  ],
  [
   "Incorrect or inflated debt claims",
   "The amount claimed may include errors, fees, or interest that cannot be supported.",
   "§ 1692e(2)"
  ],
  [
   "Actions that may not be legal",
   "Collection attorneys are hired to collect unpaid debts, but their actions may not be legal.",
   "§ 1692a(6)"
  ]
 ],
 "whoHelps": [
  "Anyone who has received letters or calls from a collection law firm or attorney.",
  "People who have been served a court summons or complaint over a debt.",
  "Those facing a judgment, a lien, or the threat of wage garnishment.",
  "Anyone who believes the amount claimed is incorrect or inflated.",
  "People who want an attorney to review the case before they respond or pay."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us what the collection attorney has sent or filed. We review it at no cost."
  ],
  [
   "Challenge the debt and the lawsuit",
   "We examine the debt and the case and may be able to dispute or respond to the lawsuit on legal grounds."
  ],
  [
   "Defenses and counterclaims",
   "When appropriate, we file legal defenses. If collectors violated the FDCPA, we may be able to sue them."
  ],
  [
   "Resolution",
   "When appropriate, we explore resolution options through legal channels, always prioritizing your rights."
  ]
 ],
 "rights": {
  "intro": "Collection attorneys must follow the same federal rules as any other debt collector.",
  "items": [
   {
    "cite": "§ 1692a(6)",
    "label": "Law firms are covered",
    "text": "Attorneys and law firms that regularly collect consumer debts are debt collectors under the FDCPA.",
    "exLabel": "Right",
    "ex": "The rules on calls, letters and statements apply to them too."
   },
   {
    "cite": "§ 1692g",
    "label": "Debt validation",
    "text": "You can dispute the debt in writing within 30 days of the first notice and ask the collector to verify it.",
    "exLabel": "Right",
    "ex": "Collection must pause until the collector sends verification."
   },
   {
    "cite": "§ 1692e",
    "label": "No false statements",
    "text": "A collector cannot misstate what you owe or threaten action that cannot legally be taken or is not intended.",
    "exLabel": "Violation",
    "ex": "A letter threatening a lawsuit the collector does not intend to file."
   },
   {
    "cite": "§ 1692d",
    "label": "No harassment",
    "text": "Repeated calls meant to annoy, abusive language and threats are prohibited.",
    "exLabel": "Violation",
    "ex": "Calling again and again after being told to stop."
   },
   {
    "cite": "Civil right",
    "label": "Right to respond + counsel",
    "text": "You have the right to respond to a lawsuit and be represented by an attorney in court.",
    "exLabel": "Right",
    "ex": "File an answer. Be heard. Make the collector prove the case."
   },
   {
    "cite": "§ 1692k",
    "label": "Damages for violations",
    "text": "If a violation is proven, a court can award up to $1,000 in statutory damages, plus actual damages and attorney's fees.",
    "exLabel": "Remedy",
    "ex": "In a successful case, the collector pays your attorney's fees."
   }
  ]
 },
 "faq": [
  [
   "What if I already got a court summons?",
   "We can help, but timing is key. Contact us before the court date."
  ],
  [
   "Can I sue a collection attorney for harassment?",
   "Yes. Under the FDCPA, we may be able to file a claim against them."
  ],
  [
   "How fast can you take over my case?",
   "We can begin within 24 to 48 hours in most cases."
  ],
  [
   "Can you help with judgment collection?",
   "Yes. In some cases, legal action may allow us to challenge or respond to judgment enforcement. We'll assess your case."
  ],
  [
   "How much does this cost?",
   "Your consultation is free. We offer flexible payment plans and will explain every option before any commitment."
  ]
 ],
 "bottomCta": {
  "headline": "You don't have to face collection attorneys alone.",
  "body": "Call now or request a free legal consultation. You get a fast response from licensed attorneys and real legal support.",
  "cta": "Get a free case evaluation"
 }
}
```

### /stop-wage-garnishment
```json
{
 "hero": {
  "eyebrow": "Wage garnishment · Fight it",
  "h1": [
   "Is Your Paycheck ",
   "Garnished",
   "?"
  ],
  "lede": "Our Attorneys Can Help You Keep More of It.",
  "filler": "Fill in the form below or call us for a free review of your case."
 },
 "whatWeDo": {
  "headline": "Fight wage garnishment now.",
  "intro": "Are debt collectors taking money from your paycheck? You have rights, and our attorneys are here to help you fight wage garnishment fast. Whether you've received a garnishment notice or it's already in effect, we can help you understand your legal options and defend your income.",
  "bullets": [
   "See if we can stop or reverse your garnishment.",
   "Challenge the debt's validity and ask the court to remove or modify the garnishment where there are legal errors.",
   "Defend you in court if you're being sued or have received a summons.",
   "Hold collectors accountable when they violate your rights."
  ]
 },
 "whyChoose": [
  [
   "A law firm, not debt settlement",
   "We go beyond basic debt settlement. Our attorneys use your legal rights and remedies and work to eliminate invalid debts."
  ],
  [
   "Free consultation",
   "Speak with an experienced garnishment attorney today at no cost."
  ],
  [
   "A strategy for your situation",
   "We review your case and build a legal strategy tailored to it."
  ],
  [
   "We act quickly",
   "Acting quickly gives you the best chance. We start as soon as we have your notice."
  ],
  [
   "Confidential, no pressure",
   "Your consultation is 100% confidential, with no pressure and no obligations."
  ]
 ],
 "commonProblems": [
  [
   "Credit card debt garnishment",
   "A card issuer or debt buyer won a judgment and is now taking part of your pay.",
   "15 U.S.C. § 1673"
  ],
  [
   "Medical debt garnishment",
   "Unpaid medical bills went to court and turned into a wage garnishment.",
   "State exemption law"
  ],
  [
   "Private loan collections",
   "A private lender is collecting through your paycheck after a judgment.",
   "State garnishment rules"
  ],
  [
   "Judgments from debt lawsuits",
   "Garnishment happens when a creditor wins a court judgment. That doesn't mean the debt is valid.",
   "FRCP 60(b)"
  ],
  [
   "Garnishment after default",
   "You did not respond to the lawsuit and a default judgment was entered against you.",
   "FRCP 55"
  ],
  [
   "Garnishment without proper notice",
   "Garnishing wages without proper notice may be a violation of your rights.",
   "Due process"
  ]
 ],
 "whoHelps": [
  "Anyone who has received a wage garnishment notice.",
  "People whose paycheck is already being garnished.",
  "Those garnished over credit card debt, medical debt, or a private loan.",
  "Anyone with a default judgment they never had the chance to contest.",
  "People who believe the debt behind the garnishment is not valid."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Call or fill in the form. We review your situation and build a strategy."
  ],
  [
   "Challenge the debt's validity",
   "If legal errors or violations are found, we may be able to petition the court to remove or modify the garnishment."
  ],
  [
   "Defend you in court",
   "If you're being sued or have received a summons, we provide full legal representation from the start."
  ],
  [
   "Hold collectors accountable",
   "If a creditor or debt collector violated your rights, we may be able to sue them for damages."
  ]
 ],
 "rights": {
  "intro": "Even after a garnishment order is in place, the law continues to protect you. Creditors and employers must follow strict rules.",
  "items": [
   {
    "cite": "15 U.S.C. § 1673",
    "label": "Federal 25% cap",
    "text": "Federal law caps garnishment at 25% of disposable income, and often less applies in practice.",
    "exLabel": "Right",
    "ex": "If more than 25% of your check is being taken, the calculation is wrong."
   },
   {
    "cite": "State exemption law",
    "label": "Exemptions",
    "text": "Exemptions you were never told about may reduce or eliminate what can be taken.",
    "exLabel": "Right",
    "ex": "Head of household, low income, public benefits, narrow but real protections vary by state."
   },
   {
    "cite": "FRCP 60(b)",
    "label": "Improper judgment",
    "text": "A garnishment based on an improper judgment can be legally challenged and overturned.",
    "exLabel": "Right",
    "ex": "No valid service of the underlying lawsuit = grounds to vacate the judgment."
   },
   {
    "cite": "Due process",
    "label": "Notice required",
    "text": "Creditors who garnished wages without proper notice may have violated your rights.",
    "exLabel": "Violation",
    "ex": "Garnishment initiated without notice or hearing = procedural defect."
   },
   {
    "cite": "State garn rules",
    "label": "Right to a hearing",
    "text": "You have the right to contest an active garnishment and request a hearing at any time.",
    "exLabel": "Right",
    "ex": "Object. Request a hearing. Force the creditor to justify the amount."
   },
   {
    "cite": "31 C.F.R. § 212",
    "label": "Federal benefit protection",
    "text": "Social Security, VA benefits, and certain other federal income are legally protected from most garnishments.",
    "exLabel": "Right",
    "ex": "Marked accounts cannot be levied; protected funds must be released."
   }
  ]
 },
 "faq": [
  [
   "Can garnishment be stopped even after it's started?",
   "Yes. Active garnishment can be challenged through motions to reduce the amount, claims for applicable exemptions, or attacks on the underlying judgment."
  ],
  [
   "What is a garnishment exemption and how do I know if I qualify?",
   "Exemptions are legal protections that reduce or eliminate the amount of your wages that can be garnished. They vary by state and circumstance, head of household, low income, federal benefits, and others."
  ],
  [
   "Can the 25% cap be reduced further?",
   "Yes. State laws often set lower caps than the federal maximum, and exemptions can reduce the garnishable amount further. In some cases, the protected amount approaches the full paycheck."
  ],
  [
   "What if my garnishment is based on a default judgment I didn't know about?",
   "Default judgments can sometimes be vacated, particularly if you weren't properly served with the original lawsuit. Vacating the judgment ends the garnishment that flows from it."
  ],
  [
   "How much does this cost?",
   "Your consultation is free. We offer flexible payment plans and will explain every option before any commitment."
  ]
 ],
 "bottomCta": {
  "headline": "Protect your paycheck.",
  "body": "Wage garnishment doesn't mean you're out of options. Acting quickly gives you the best chance. Your consultation is free and 100% confidential.",
  "cta": "Get a free case evaluation"
 }
}
```

### /credit-cards
```json
{
 "hero": {
  "eyebrow": "Credit card debt · Fight back",
  "h1": [
   "Struggling with ",
   "Credit Card Debt",
   "?"
  ],
  "lede": "Let Our Attorneys Fight for You.",
  "filler": "Fill in the form below or call us for a free review of your case."
 },
 "whatWeDo": {
  "headline": "We don't just negotiate your debt. We challenge it legally.",
  "intro": "At Credo Legal, our attorneys challenge invalid credit card debts, defend your consumer rights, and fight aggressive collection harassment, using federal consumer protection laws like the Fair Debt Collection Practices Act (FDCPA).",
  "bullets": [
   "Evaluate whether the debt collector can legally enforce the debt.",
   "Fight collector harassment: illegal calls, threats, and workplace contact.",
   "Defend you in court if you've been sued by a credit card company or debt buyer.",
   "Hold creditors accountable when they violate your rights under federal law."
  ]
 },
 "whyChoose": [
  [
   "Attorney assistance from day one",
   "You work with our attorneys, not salespeople or counselors."
  ],
  [
   "We challenge debt validity",
   "Many credit card debts lack proper documentation. We demand proof."
  ],
  [
   "Debts that cannot be proven",
   "When a creditor cannot substantiate a claim, the debt may become unenforceable or subject to removal from collections."
  ],
  [
   "Protection from lawsuits",
   "Our attorneys assist you if credit card companies sue."
  ],
  [
   "Flexible payment plans",
   "Affordable installment options that fit your budget."
  ]
 ],
 "commonProblems": [
  [
   "Collection harassment",
   "Constant calls at work, threats, and contact with family can all be violations of the FDCPA.",
   "§ 1692c, § 1692d"
  ],
  [
   "Credit card lawsuits",
   "Being sued by original creditors, debt buyers, or collection agencies.",
   "FRCP 12(a)"
  ],
  [
   "Invalid or \"zombie\" debts",
   "Old credit card debts that collectors can't properly validate.",
   "§ 1692g"
  ],
  [
   "High interest charges",
   "Unaffordable payments due to excessive interest charges.",
   "Truth in Lending Act"
  ],
  [
   "Identity theft and fraudulent charges",
   "Credit card debts you never authorized.",
   "15 U.S.C. § 1643"
  ],
  [
   "Debts sold to debt buyers",
   "The company collecting may have bought the debt and may lack the documents to prove it.",
   "FRE 803(6), 901"
  ]
 ],
 "whoHelps": [
  "People struggling with high-interest credit card payments.",
  "Anyone being sued by a credit card company, a debt buyer, or a collection agency.",
  "Those getting constant collection calls at home or at work.",
  "People with old credit card debts that a collector can't properly validate.",
  "Anyone with unsecured debt who wants it reviewed by an attorney. Secured debts like mortgages and auto loans are not eligible."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Share your situation, and we'll explain how we can help."
  ],
  [
   "Debt investigation",
   "We review your debts for violations and invalidation opportunities."
  ],
  [
   "Legal representation",
   "Our attorneys defend you from creditor harassment and lawsuits."
  ],
  [
   "Work towards debt resolution",
   "Through litigation or settlement, we work toward the best possible outcome."
  ]
 ],
 "rights": {
  "intro": "Consumer protection laws protect you from abusive debt collection practices. Credit card collectors cannot:",
  "items": [
   {
    "cite": "§ 1692d(5)",
    "label": "Repeated calls",
    "text": "Call you repeatedly to harass or annoy you.",
    "exLabel": "Violation",
    "ex": "Several calls a day after you asked them to stop."
   },
   {
    "cite": "§ 1692c(a)(3)",
    "label": "Calls at work",
    "text": "Contact you at work when they know your employer does not allow it.",
    "exLabel": "Violation",
    "ex": "Calling your workplace after being told not to."
   },
   {
    "cite": "§ 1692e(4), (5)",
    "label": "Empty threats",
    "text": "Threaten you with arrest or with legal action they don't intend to take.",
    "exLabel": "Violation",
    "ex": "\"Pay today or we will have you arrested.\""
   },
   {
    "cite": "§ 1692c(b)",
    "label": "Telling others",
    "text": "Discuss your debt with family, friends, or coworkers.",
    "exLabel": "Violation",
    "ex": "Leaving details of the debt with a relative."
   },
   {
    "cite": "§ 1692d(2)",
    "label": "Abusive language",
    "text": "Use obscene language or threats.",
    "exLabel": "Violation",
    "ex": "Insults or profanity on a collection call."
   },
   {
    "cite": "§ 1692k",
    "label": "Damages",
    "text": "If a violation is proven, these laws allow courts to award up to $1,000 in statutory damages, plus attorney's fees.",
    "exLabel": "Remedy",
    "ex": "A proven violation can become a claim against the collector."
   }
  ]
 },
 "faq": [
  [
   "How is this different from debt settlement?",
   "Debt settlement companies typically negotiate with creditors to reduce the total amount owed. As a law firm, we provide legal representation and evaluate whether a creditor can legally enforce a debt under applicable federal and state laws. Depending on the specific facts of your case, this may include challenging documentation, asserting consumer protection defenses, or negotiating a resolution. Outcomes vary based on the circumstances, and not all debts can be challenged or eliminated."
  ],
  [
   "What if I'm already being sued?",
   "Our attorneys can assist you in court and challenge the creditor's case."
  ],
  [
   "What debts qualify?",
   "We handle unsecured consumer debts including credit cards, medical bills, personal loans, and payday loans."
  ],
  [
   "Does this cover secured debt?",
   "No. This program covers unsecured debts only. Secured debts like mortgages and auto loans are not eligible."
  ],
  [
   "How much does this cost?",
   "We offer a free initial consultation and flexible payment plans."
  ]
 ],
 "bottomCta": {
  "headline": "Work towards living debt free.",
  "body": "Don't let credit card companies and collectors push you around. Our attorneys are ready to fight for your rights. Submit your information for a no-cost consultation to see whether we may be able to assist.",
  "cta": "Get a free case evaluation"
 }
}
```

### /fcba-and-fdcpa
```json
{
 "hero": {
  "eyebrow": "FDCPA and FCBA · Know your rights",
  "h1": [
   "Confused About Your Debt & ",
   "FDCPA",
   "?"
  ],
  "lede": "Our Attorneys Can Explain Your Rights and Act.",
  "filler": "Fill in the form below or call us for a free review of your case."
 },
 "whatWeDo": {
  "headline": "Take back control: understand your rights.",
  "intro": "Federal laws like the Fair Credit Billing Act (FCBA) and the Fair Debt Collection Practices Act (FDCPA) give you powerful tools to dispute errors, stop harassment, and protect your finances. When creditors and debt collectors cross the line, you are not powerless.",
  "bullets": [
   "Review your situation with an experienced attorney.",
   "Identify violations of the FDCPA and the FCBA.",
   "Help you dispute billing errors and debts that cannot be verified.",
   "Help you use these laws to your advantage, including claims for damages where your rights were violated."
  ]
 },
 "whyChoose": [
  [
   "A legal approach",
   "Credo Legal offers a legal approach, with experienced attorneys working to resolve your debt."
  ],
  [
   "We explain first",
   "An attorney reviews your situation and explains which protections apply to you."
  ],
  [
   "We identify violations",
   "These laws limit what collectors can do. We check whether they crossed the line."
  ],
  [
   "We act on what we find",
   "Where your rights were violated, these laws may allow you to sue for damages."
  ],
  [
   "Free consultation",
   "Find out where you stand at no cost."
  ]
 ],
 "commonProblems": [
  [
   "Threats and obscene language",
   "The FDCPA bans threats and obscene language by third-party debt collectors.",
   "§ 1692d"
  ],
  [
   "Repeated calls intended to annoy",
   "Calling again and again to pressure you is a banned tactic.",
   "§ 1692d(5)"
  ],
  [
   "False statements about your debt",
   "Collectors cannot make false statements about what you owe or what will happen if you do not pay.",
   "§ 1692e"
  ],
  [
   "Charges you do not recognize",
   "Under the FCBA you can dispute charges you do not recognize on a credit card or line of credit.",
   "15 U.S.C. § 1666"
  ],
  [
   "Goods or services never received",
   "Charges for goods or services you never received can be disputed as billing errors.",
   "15 U.S.C. § 1666"
  ],
  [
   "Math errors and missing payments",
   "Math errors, or payments not properly credited to your account, are billing errors too.",
   "15 U.S.C. § 1666"
  ]
 ],
 "whoHelps": [
  "People struggling with unsecured debt, such as credit cards and medical bills.",
  "Anyone contacted by a third-party debt collector about a personal or household debt.",
  "Those who see charges on a statement that they do not recognize.",
  "People who disputed a bill and are still being reported as delinquent.",
  "Anyone who wants to understand their rights before deciding what to do."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Share your situation, and we'll explain how we can help."
  ],
  [
   "Debt investigation",
   "We review your debts for violations and invalidation opportunities."
  ],
  [
   "Legal representation",
   "Our attorneys defend you from creditor harassment and lawsuits."
  ],
  [
   "Work towards debt resolution",
   "Through litigation or settlement, we work toward the best possible outcome."
  ]
 ],
 "rights": {
  "intro": "The FDCPA and the FCBA give you specific protections.",
  "items": [
   {
    "cite": "§ 1692a(6)",
    "label": "Who the FDCPA covers",
    "text": "The FDCPA applies to third-party debt collectors collecting personal or household debts like credit cards, medical bills, or personal loans.",
    "exLabel": "Right",
    "ex": "A collection agency calling about a medical bill is covered."
   },
   {
    "cite": "§ 1692g",
    "label": "Right to dispute",
    "text": "You have the right to demand written verification of the debt and to dispute it within a limited time.",
    "exLabel": "Right",
    "ex": "Dispute in writing within 30 days of the first notice."
   },
   {
    "cite": "§ 1692c(c)",
    "label": "Right to stop contact",
    "text": "You can request that collectors stop contacting you in certain circumstances.",
    "exLabel": "Right",
    "ex": "A written request to stop communication."
   },
   {
    "cite": "15 U.S.C. § 1666",
    "label": "Billing error disputes",
    "text": "The FCBA covers certain open-end credit accounts, such as credit cards and some lines of credit, and focuses on billing accuracy and fair dispute processes.",
    "exLabel": "Right",
    "ex": "Write to the creditor within 60 days of the statement that shows the error."
   },
   {
    "cite": "15 U.S.C. § 1666a",
    "label": "Protected during investigation",
    "text": "While your dispute is being investigated, the creditor generally cannot report you as delinquent on the amount in question if you followed the FCBA procedures.",
    "exLabel": "Right",
    "ex": "The disputed amount is not reported as late while the investigation runs."
   },
   {
    "cite": "§ 1692k",
    "label": "Damages",
    "text": "These laws may allow you to sue for damages if your rights are violated.",
    "exLabel": "Remedy",
    "ex": "Under the FDCPA: up to $1,000 in statutory damages, plus attorney's fees."
   }
  ]
 },
 "faq": [
  [
   "Who is this program for?",
   "People struggling with unsecured debt, such as medical bills, who are looking for legal and effective relief."
  ],
  [
   "Does this program cover secured debt?",
   "No, this program only covers unsecured debts like credit card bills and medical expenses."
  ],
  [
   "What federal protections do I have against creditors?",
   "You have rights under the Fair Debt Collection Practices Act (FDCPA) and other consumer protection laws."
  ],
  [
   "What makes Credo Legal different from other debt relief services?",
   "Credo Legal offers a legal approach, with experienced attorneys working to resolve your debt."
  ],
  [
   "How do I get started?",
   "Fill in the form on this page or call us."
  ]
 ],
 "bottomCta": {
  "headline": "Work towards living debt free.",
  "body": "Our attorneys are here to guide you every step of the way.",
  "cta": "Get a free case evaluation"
 }
}
```

## Live source text (start.credolegal.com, 2 Oct), form and footer lines removed

### /collection-defense
```
[li]
Home
[li]
About
[li]
Call Us
[h1] Debt Collectors Harassing You? Our Attorneys Can Help.
[p] Fill in the short form below to see if you qualify
[h2]
If a debt collection law firm or attorney is coming after you, you’re not alone.
[h3]
Get Legal Protection from Real Consumer Debt Lawyers
[p] Whether you’re facing a lawsuit, judgment, or constant collection letters, our attorneys can help you challenge the lawsuit, protect your rights, and explore all available legal options.
[li] Free consultation with a debt collection defense lawyer
[li] Fight/We Work to Stop harassment, lawsuits, and court judgments
[li] Protect your rights and challenge collector violations
[h3]
Get Collection Defense Help
[h3] Trust is Our Middle Name
Trustpilot
[h1] $10M+
[h1] Debt Invalidated
[h1] 500k
[h1] Debts Settled Every Month*
[p] *Prior results do not guarantee future outcomes
[h2]
Who Are Collection Attorneys and What Can They Do?‍
[p] Collection attorneys are hired by creditors to collect unpaid debts. They may file lawsuits, place liens, garnish wages, or freeze accounts.
But
their actions may not be legal. We help consumers fight back.
We help you with:
[li] Debt collection lawsuits
[li] Judgments and liens
[li] Harassing calls and letters
[li] Court summons and complaints
[li] Incorrect or inflated debt claims
See If You Qualify for Free
[h2]
How We Help Your Respond to Collection Lawsuits
[p]
Credo Legal is a national law firm focused on protecting consumers from unfair debt collection.
Here’s how we help:
1. Challenge the debt and the lawsuit: Filed lawsuits may be based on outdated or invalid debt. We examine the debt and case and may be able to dispute or respond to the lawsuit based on legal grounds.
2. File legal defenses or counterclaims when appropriate: If collectors violate the Fair Debt Collection Practices Act (FDCPA), we may be able to sue them and win compensation.
3. Help you resolve the debt on your terms: When appropriate, we explore resolution options through legal channels, always prioritizing your rights.
Speak to An Attorney Now
[h2]
Why Work with a Collection Defense Attorney?
[li] Court cases can be
complex and time-sensitive
[li] Mistakes or no-shows can lead to default judgments
[li] Collectors can rely on fear and confusion to win
[p]
We strive to give you real legal power, not just a phone call from a call center.
Real People. Real Results.
“I got sued by a debt collection attorney. CLG filed a response in court the next day. They got it dismissed in a few weeks.”
[li] 10,000+ clients protected from lawsuits and garnishments
[li] Licensed in states nationwide
[li] Affordable plans starting at $250/month
Get Collection Defense Help
[h1] Frequently Asked Questions
[p] Our Team is always happy to help.
What if I already got a court summons?
[p] We can help, but timing is key. Contact us before the court date.
Can I sue a collection attorney for harassment?
[p] Yes. Under the FDCPA, we may be able to file a claim against them.
How fast can you take over my case?
[p] We can begin within 24 to 48 hours in most cases.
Can you help with judgment collection?
[p] Yes. In some cases, legal action may allow us to challenge or respond to judgment enforcement. We’ll assess your case.
[h1]
You Don’t Have to Face Collection Attorneys Alone
[p] 📞
Call now or request a free legal consultation
🕒 Fast response from real licensed attorneys
🔍 Transparent pricing and real legal support
Get Collection Defense Help
```

### /stop-wage-garnishment
```
[li]
Home
[li]
About
[li]
Call Us
[h1] Is Your Paycheck Garnishmed?
[p] Our Attorneys Can Help You Leave More on the Table.
[h2]
Fight Wage Garnishment Now
[h3]
Fight to Protect Your Paycheck with Legal Help from Credo Legal
[p]
Are debt collectors taking money from your paycheck? You have rights, and we’re here to help you fight wage garnishment fast. Whether you’ve received a garnishment notice or it’s already in effect, our attorneys can help you
understand your legal options and defend your income.
[li] Free consultation with an experienced garnishments attorney today
[li] See if we can stop or reverse your garnishment
[li] Get a custom legal strategy tailored to your situation
[h3]
Fight Garnishment Today
[h3] Trust is Our Middle Name
Trustpilot
[h1] $10M+
[h1] Debt Invalidated
[h1] 500k
[h1] Debts Settled Every Month*
[p] *Prior results do not guarantee future outcomes
[h2]
Why Is Your Paycheck Being Garnished?
[p] Wage garnishment happens when a creditor wins a court judgment and legally collects money from your paycheck. But that doesn't mean the debt is valid or that you're out of options.
Common garnishment situations we help with:
[li] Credit card debt garnishment
[li] Medical debt garnishment
[li] Private loan collections
[li] Judgments from debt lawsuits
[li] Garnishment after default
[p] Even if the garnishment has already started,
you may be able to stop or reduce it.
See If You Qualify for Free
[h2]
How We Help You Respond to Wage Garnishment
[h3]
Fight to Protect Your Paycheck with Legal Help from Credo Legal
[p] At Credo Legal, we go beyond basic debt settlement.
We’re a law firm that empowers you with legal rights and remedies and works to eliminate invalid debts.
Here’s how we fight garnishment with the goal of protecting your income:
1. Challenge the debt’s validity: If legal errors or violations are found, we may be able to petition the court to remove or modify the garnishment.
2. Defend you in court: If you're being sued or have received a summons, we provide full legal representation from the start.
3. Hold collectors accountable: If a creditor or debt collector violated your rights, such as garnishing wages without proper notice, we may be able to sue them for damages.
Fight Garnishment Today
[h1]
Get Immediate Help with No Upfront Legal Fees
[p]
Wage garnishment doesn’t mean you’re out of options. Acting quickly gives you the best chance.
‍📞 Call now to get a free legal consultation
📄 We’ll review your situation and build a strategy
🔒 100% confidential. No pressure. No obligations.
Fight Garnishment Today
```

### /credit-cards
```
[li]
Home
[li]
About
[li]
Call Us
[h1] We Can Help You with Credit Card Debt & Harassment
[p] Fill in the form below or call us for a
[h2] Struggling with Credit Card Debt? Let Our Attorneys Fight for You.
[h3] Our Unique 3-Step Approach to Debt Issues Combines Attorney-Backed Legal Strategies, Consumer Protection, and Hands-On Assistance.
[p] Credo Legal will challenge invalid credit card debts, defend your consumer rights, and fight against aggressive collection harassment. If you're drowning in high-interest credit card payments or facing a lawsuit, we're here to help.
[h3]
Get a Free Case Evaluation
[h3] Trust is Our Middle Name
Trustpilot
[h1] $10M+
[h1] Debt Invalidated
[h1] 500k
[h1] Debts Settled Every Month*
[p] *Prior results do not guarantee future outcomes
[h2] What We Do
[p] At Credo Legal, we don't just negotiate your credit card debt, we challenge it legally. Our experienced attorneys use federal consumer protection laws like the Fair Debt Collection Practices Act (FDCPA) to*:
Evaluate whether the debt collector can legally enforce the debt: We challenge the validity of your debt and pursue legal appropriate remedies based on the specific facts of your case.
Fight against collector harassment: Illegal calls, threats, and workplace contact violations​
Defend you in court: Legal advice which may include full representation if you've been sued by credit card companies or debt buyers.
4. ​
Hold creditors accountable: When they violate your rights under federal law​.
[p] *In some cases, when a creditor cannot substantiate a claim, the debt may become unenforceable or subject to removal from collections. Results depend on the specific circumstances. Prior results do not guarantee a similar outcome.
See If You Qualify for Free
[h2] Why Choose Credo Legal
[p] Credo Legal takes a legal approach to resolve your credit card debt which differs from non-lawyer debt settlement services:
[p]
[p] ✅
Attorney assistance from Day One:
You get real lawyers, not salespeople or counselors​
We Challenge Debt Validity
Many credit card debts lack proper documentation. We demand proof​.
Debt removal from Credit Report
If debts are invalidated, they're removed from your credit report
Protection from Lawsuits
Our attorneys assist you if credit card companies sue
Flexible Payment Plans
Affordable installment options that fit your budget​
See If You Qualify for Free
[h2] Common Credit Card Debt Problems We Solve
[p]
1. Collection Harassment:
Constant calls at work, threats, family contact - all violations of the FDCPA​
Credit Card Lawsuits:
‍Being sued by original creditors, debt buyers, or collection agencies​
Invalid or "Zombie" Debts:
‍Old credit card debts that collectors can't properly validate​
High-Interest Rate Exploitation:
‍Unaffordable payments due to excessive interest charges
Identity Theft & Fraudulent Charges:
‍Credit card debts you never authorized
[p]
Speak to an Attorney Now
[h1] How Our Program Works
[h1] 1. Free
Consultation
[p] Share your situation, and we’ll
explain how we can help.
[h1] 2. Debt
Investigation
[p] We review your debts for violations and invalidation opportunities.
[h1] 3. Legal
Representation
[p] Our attorneys defend you from creditor harassment and lawsuits.
[h1] 4. Work Towards
Debt Resolution
[p] Through litigation or settlement, we work toward the best possible outcome.
Start Your Journey to Debt Relief Today
[h2] Your Rights Under Federal Law
[p] The Consumer Protection Laws protect you from abusive debt collection practices. Credit card collectors cannot:​
[li] Call you repeatedly to harass or annoy you
[li] Contact you at work
[li] Threaten you with arrest or legal action they don't intend to take
[li] Discuss your debt with family, friends, or coworkers
[li] Use obscene language or threats
[p]
If a violation is proven, these consumer protection laws allow courts to award up to $1,000 in statutory damages, plus attorney’s fees.
[h3]
See If You Qualify for Free
[h2]
Who This Program Helps
[p] Credo Legal's credit card debt relief program is designed for people struggling with:
[li] Call you repeatedly to harass or annoy you
[li] Contact you at work
[li] Threaten you with arrest or legal action they don't intend to take
[li] Discuss your debt with family, friends, or coworkers
[li] Use obscene language or threats
[p]
Note: This program covers unsecured debts only. Secured debts like mortgages and auto loans are not eligible.​
Speak to an Attorney Now
[h1] Frequently Asked Questions
[p] Our Team is always happy to help.
How is this different from debt settlement?
[p] Debt settlement companies typically negotiate with creditors to reduce the total amount owed. As a law firm, we provide legal representation and evaluate whether a creditor can legally enforce a debt under applicable federal and state laws. Depending on the specific facts of your case, this may include challenging documentation, asserting consumer protection defenses, or negotiating a resolution. Outcomes vary based on the circumstances, and not all debts can be challenged or eliminated.
What if I'm already being sued?
[p] Our attorneys can assist you in court and challenge the creditor's case.​
How much does this cost?
[p] We offer flexible payment plans and free initial consultation.
What debts qualify?
[p] We handle unsecured consumer debts including credit cards, medical bills, personal loans, and payday loans.​
[h1] Work Towards Living Debt Free Today!
[p] Don't let credit card companies and collectors push you around. Our experienced attorneys are ready to fight for your rights and help you find real relief.
Submit your information for a no-cost consultation to determine whether we may be able to assist.
Get Your Free Case Evaluation Now
[p] OR
Call Us Directly: (347) 474-9602
[p]
‍This is for informational purposes only and does not constitute legal advice.Submitting a form or contacting us
does not create an attorney-client relationship. An attorney-client relationship is formed only after a written agreement is signed.
We do not provide credit repair services. Prior results do not guarantee a similar outcome.
```

### /fcba-and-fdcpa
```
[li]
Home
[li]
About
[li]
Call Us
[h1] Confused About Your Debt & FDCPA?
[p] Our Attorneys Explains Your Rights and Act.
[h2] Take Back Control: Understand Your Rights Under FDCPA & FCBA
[p] Federal laws like the
Fair Credit Billing Act (FCBA) and Fair Debt Collection Practices Act (FDCPA) give you powerful tools to dispute errors, stop harassment, and protect your finances.
When creditors and debt collectors cross the line, you are not powerless. These laws limit what collectors can do, require fair and accurate billing, and may allow you to sue for damages if your rights are violated.
Speak with an experienced attorney who can review your situation, identify violations, and help you use these laws to your advantage.
[h3]
Get a Free Case Evaluation
[h3] Trust is Our Middle Name
Trustpilot
[h1] $10M+
[h1] Debt Invalidated
[h1] 500k
[h1] Debts Settled Every Month*
[p] *Prior results do not guarantee future outcomes
[h2] What the FDCPA Protects You From Third-Party Debt Collectors
[p] The FDCPA applies to third-party debt collectors collecting personal or household debts like credit cards, medical bills, or personal loans.
Banned Harassment Tactics
‍It bans tactics such as threats, obscene language, repeated calls intended to annoy, and false statements about what you owe or what will happen if you do not pay.
Your Right to Dispute
You have the right to demand written verification of the debt, dispute it within a limited time, and request that collectors stop contacting you in certain circumstances.
See If You Qualify for Free
[h2] How the FCBA Helps Fix Billing Errors
[p] Open End Credit Accounts
The FCBA covers certain open-end credit accounts, such as credit cards and some lines of credit, and focuses on billing accuracy and fair dispute processes.‍
[p] Dispute Unrecognized Charges
You can dispute charges you do not recognize, charges for goods or services you never received, math errors, or payments not properly credited to your account if you act within the required timeframe.
[p] Protected During Investigation
While your dispute is being investigated, the creditor generally cannot report you as delinquent on the amount in question if you followed the FCBA procedures.
Speak to An Attorney Now
[h1] How Our Program Works
[h1] 1. Free
Consultation
[p] Share your situation, and we’ll
explain how we can help.
[h1] 2. Debt
Investigation
[p] We review your debts for violations and invalidation opportunities.
[h1] 3. Legal
Representation
[p] Our attorneys defend you from creditor harassment and lawsuits.
[h1] 4. Work Towards
Debt Resolution
[p] Through litigation or settlement, we work toward the best possible outcome.
Start Your Journey to Debt Relief Today
[h1] Questions
[p] Our Team is always happy to help.
Who is this program for?
[p] People struggling with unsecured debt (e.g. medical bills) seeking legal and effective relief.
Does this program cover secured debt?
[p] No, this program only covers unsecured debts like credit card bills and medical expenses.
What federal protections do I have against creditors?
[p] You have rights under the Fair Debt Collection Practices Act (FDCPA) and other consumer protection laws.
What makes Credo Legal different from other debt relief services?
[p] Credo Legal offers a legal approach with experienced attorneys to help resolve your debt efficiently.
How do I get started?
[p] You can get started by filling out our online form or calling the customer service team at (212) 561-5902
[h1] Work Towards Living Debt Free Today!
[p] Our experienced law firm is here to guide you every step of the way.
Get Your Free Case Evaluation Now
```
