# PBI-35 · Cluster copy: every page makes its angle's promise; 12 pages added (2 Oct)

## What changed (staging only)
The landing pages are grouped into seven angle clusters (respond in time, fight back, demand proof, know your rights,
stop it, make them pay, reduce or remove), one page per debt type in each. A page "makes the promise" when its headline,
sub-line and first section heading all say it.
1. **26 existing pages**: only the hero headline, sub-line and/or the "What we do" heading were changed (table below).
   Headlines that match the page's Google ad headline were kept; the angle was put into the sub-line and section heading.
2. **12 new pages** fill the empty cells. New text per page: hero, what we do, three "why" rows, who this helps, how it
   works, closing paragraph and the questions marked NEW. Problems, rights and the other questions are taken unchanged
   from a sibling page of the same debt type that is already live on staging. New pages are noindex with a canonical to
   the future start address, like the other landing pages.
No component, style or script was changed. Three new pages rest on an angle that is a stretch for the debt type and are
marked "attorney to confirm": wage-garnishment-violations, debt-harassment-settlement, and (less so) debt-lawsuit-stop-calls.

## Verification done
- Read-back of 63 pages: every prop equals the content files except 9 older hero wordings that were not touched.
- On the 26 edited pages only the intended props changed (before/after extract compare: 0 unexpected changes).
- FAQPage structured data equals the visible questions on all 63 pages; new pages carry noindex + canonical + the heading style block.
- Browser at 1440 and 390 with trackers blocked: one h1, no overflow, no empty elements on the 12 new and 3 edited pages checked.

## Questions for the reviewer
1. Any statement of law in the NEW text that is wrong or overstated?
2. Any promise a law-firm advertisement should not make?
3. Does each new headline + sub-line + first heading clearly make the promise of its angle for that debt type?

## Edits to existing pages (before → after)
| Page | Part | Before | After |
|---|---|---|---|
| debt-harassment-act-fast | Headline | Let's See If We Can Help You with Creditor Harassment and Debt | Debt Collector Broke the Law? Act Fast. |
| debt-harassment-act-fast | Sub-line | Fill in the short form below to see if you qualify. | Our Attorneys Can Help You Act Before the Deadline. |
| debt-lawsuit-summons-respond | First heading | Just served? We move immediately. | Just served? We answer before the deadline. |
| credit-card-debt-lawsuit-respond | First heading | Sued over a card balance? We answer. | Sued over a card balance? We answer on time. |
| payday-loan-lawsuit-respond | First heading | Sued over a payday loan? We answer fast. | Sued over a payday loan? We answer before the deadline. |
| medical-debt-lawsuit-respond | First heading | Sued for medical debt? We act first. | Sued for medical debt? We answer on time. |
| wage-garnishment-prevention | Sub-line | Our Attorneys Can Help You Stop It Before It Starts. | Our Attorneys Can Help You Act Before It Starts. |
| wage-garnishment-prevention | First heading | We stop garnishment before it starts. | The time to act is before the first paycheck cut. |
| debt-harassment-fdcpa-attorney | Sub-line | We Explain Your Rights Against Debt Harassment under FDCPA for Free. | Our Attorneys Can Help You Fight Back Under the FDCPA. |
| debt-harassment-fdcpa-attorney | First heading | Knowing your rights is where we start. | Collector broke the law? We fight back. |
| debt-lawsuit-fight-back | Sub-line | Our Attorneys Can Help You Challenge Their Claims. | Our Attorneys Can Help You Fight Back. |
| debt-lawsuit-attorney | First heading | We level the playing field. | They have lawyers. We fight back with yours. |
| collection-defense | Headline | Debt Collectors Harassing You? | Sued by a Collection Attorney? |
| collection-defense | Sub-line | Our Attorneys Can Help. | Our Attorneys Can Help You Fight Back. |
| collection-defense | First heading | You don't have to face collection attorneys alone. | Collection attorneys coming after you? We fight back. |
| credit-cards | First heading | We don't just negotiate your debt. We challenge it legally. | We don't just negotiate your debt. We fight it legally. |
| payday-loan-fight-back | Sub-line | Our Attorneys Can Check Legality and Build Your Case. | Our Attorneys Can Help You Fight Back. |
| payday-loan-fight-back | First heading | Knowing isn't enough. We act. | The lender broke the rules. We build your case. |
| medical-debt-attorney | Sub-line | Our Attorneys Can Help You Fight Harassment & Challenge Debt. | Our Attorneys Can Fight the Collectors and Challenge the Debt. |
| medical-debt-attorney | First heading | Unexpected medical bills shouldn't ruin your financial future. | Medical debt collectors pushing you? We push back. |
| debt-lawsuit-proof | Sub-line | Our Attorneys Can Help You Challenge Their Claims. | Our Attorneys Can Make Them Prove It. |
| credit-card-debt-lawsuit-records | Sub-line | Our Attorneys Find Errors and Challenge Their Claims. | Our Attorneys Can Demand the Proof and Challenge Their Claims. |
| credit-card-debt-challenge | Sub-line | Our Attorneys Can Help You Challenge It. | Our Attorneys Can Make Them Prove You Owe It. |
| payday-loan-lawsuit-proof | Sub-line | Our Attorneys Can Help You Dispute It. | Our Attorneys Can Make Them Prove It. |
| payday-loan-lawsuit-proof | First heading | We check whether the loan was even legal. | We make them prove the loan was legal and the amount is right. |
| medical-debt-bills-errors | Sub-line | Our Attorneys Can Help You Challenge Their Claims. | Our Attorneys Can Make Them Prove Every Charge. |
| medical-debt-bills-errors | First heading | We audit the bill, line by line. | We demand proof for every line of the bill. |
| debt-harassment-fdcpa-rights | Headline | Our Attorneys Can Make Them Pay | Know Your FDCPA Rights. |
| debt-harassment-fdcpa-rights | Sub-line | We can help you know your rights and take action. | Our Attorneys Can Explain Them and Act. |
| debt-lawsuit-options | Sub-line | Our Attorneys Can Help You Make Sense of It and Act. | Our Attorneys Can Explain Your Options and Your Rights. |
| fcba-and-fdcpa | First heading | Take back control: understand your rights. | Billing errors or collector calls: understand your rights. |
| payday-loan-debt-harassment | First heading | We remove the fear they rely on. | We make the calls stop, legally. |
| stop-wage-garnishment | Sub-line | Our Attorneys Can Help You Keep More of It. | Our Attorneys Can Help You Stop It. |
| stop-wage-garnishment | First heading | Fight wage garnishment now. | Stop wage garnishment now. |
| debt-harassment-violations | First heading | Every illegal call becomes evidence. | Every illegal call can become a claim against them. |
| credit-card-debt-negotiation | Sub-line | Our Attorneys Can Help You Negotiate. | Our Attorneys Can Help You Negotiate It Down. |
| credit-card-debt-negotiation | First heading | Not advice. Legal representation. | Attorney-led negotiation to lower what you pay. |
| wage-garnishment-exemptions | Sub-line | You May Qualify for Exemptions. Our Attorneys Can Help. | Exemptions Can Let You Keep More. Our Attorneys Can Help. |

## New pages: the new text (donated sections omitted)

### /debt-harassment-validation — Harassment · Demand proof. Debt validation
```json
{
 "h1": "Collector Says You Owe It?",
 "lede": "Our Attorneys Can Make Them Prove It.",
 "whatWeDo": {
  "headline": "No proof, no pressure. We demand validation.",
  "intro": "A collector's call or letter is a claim, not proof. Federal law lets you dispute a debt in writing and ask the collector to verify it. Our attorneys send that demand and hold the collector to it.",
  "bullets": [
   "Send a written dispute and validation demand to the collector.",
   "Check whether the collector can show who owns the debt and how the amount was calculated.",
   "Document every contact that continues before the debt is verified.",
   "Act on violations when a collector cannot back up its claim."
  ]
 },
 "whyChoose": [
  [
   "Licensed attorneys, not a settlement company",
   "A validation demand from an attorney is hard to ignore."
  ],
  [
   "We start with the proof",
   "Before anything is paid, we ask the collector to show the debt is yours and the amount is right."
  ],
  [
   "We track what happens next",
   "Contact that continues before the debt is verified can be a violation. We document it."
  ]
 ],
 "whoHelps": [
  "Anyone contacted about a debt they do not recognize.",
  "People told they owe more than they remember owing.",
  "Those chased by a company they never did business with.",
  "Anyone contacted about a very old debt.",
  "People who want proof before they pay or agree to anything."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us who is contacting you and what they claim. We review it at no cost."
  ],
  [
   "Validation demand sent",
   "Our attorneys dispute the debt in writing and ask the collector to verify it."
  ],
  [
   "Their answer reviewed",
   "We check what the collector sends back: ownership, amount and dates."
  ],
  [
   "Next step",
   "If the debt cannot be verified, we act on it. If it can, we explain your options."
  ]
 ],
 "faq_first_two": [
  [
   "Can I really make a collector prove the debt?",
   "Yes. Under the FDCPA you can dispute a debt in writing within 30 days of the collector's first notice. The collector must then stop collecting until it sends verification."
  ],
  [
   "What if more than 30 days have passed?",
   "You can still dispute the debt and ask for proof, and the other protections of the FDCPA still apply. An attorney can tell you which options remain."
  ]
 ],
 "closing": "A debt is not proven because a collector says so. Our attorneys ask for the proof, and a free consultation tells you where you stand.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /wage-garnishment-judgment — Garnishment · Demand proof. Challenge the judgment
```json
{
 "h1": "Garnished Over a Debt You Never Saw?",
 "lede": "Our Attorneys Can Make Them Prove the Judgment.",
 "whatWeDo": {
  "headline": "A garnishment is only as valid as the judgment behind it.",
  "intro": "A creditor needs a court judgment before it can garnish wages for a consumer debt. Many of those judgments are entered by default, without the person ever seeing the lawsuit. Our attorneys examine the judgment and challenge it where the law allows.",
  "bullets": [
   "Get the court file and check how the judgment was entered.",
   "Check whether you were properly served with the lawsuit.",
   "Ask the court to set aside a judgment entered without proper service.",
   "Challenge the amount when fees and interest cannot be supported."
  ]
 },
 "whyChoose": [
  [
   "We go to the source",
   "We read the court file, not just the garnishment notice."
  ],
  [
   "We check service",
   "A lawsuit you were never properly served with can be grounds to challenge the judgment."
  ],
  [
   "We check the numbers",
   "The amount taken has to match a judgment that can be supported."
  ]
 ],
 "whoHelps": [
  "Anyone garnished over a lawsuit they never knew about.",
  "People who do not recognize the debt or the creditor named in the order.",
  "Those who moved and never received court papers.",
  "Anyone who believes the amount in the order is wrong.",
  "People who want the judgment checked before more is taken."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Send us the garnishment notice. We review it at no cost."
  ],
  [
   "Court file review",
   "We get the case record and check service, dates and the amount."
  ],
  [
   "Challenge filed",
   "Where there are grounds, we ask the court to set the judgment aside or correct it."
  ],
  [
   "Resolution",
   "If the judgment falls, the garnishment built on it ends. If not, we look at exemptions and other options."
  ]
 ],
 "faq_first_two": [
  [
   "What if my garnishment is based on a default judgment I didn't know about?",
   "Default judgments can sometimes be vacated, particularly if you weren't properly served with the original lawsuit. Vacating the judgment ends the garnishment that flows from it."
  ],
  [
   "How do I find out what judgment the garnishment is based on?",
   "The garnishment order names the court and the case number. Our attorneys get the court file and review it with you."
  ]
 ],
 "closing": "Before more of your paycheck is taken, have the judgment checked. Our attorneys review it for free and explain what can be challenged.",
 "problems_if_new": [
  [
   "Default judgment you never knew about",
   "The case was decided without you because no answer was filed.",
   "State civil procedure"
  ],
  [
   "Papers never properly served",
   "Service at an old address or on the wrong person can undermine the judgment.",
   "Due process"
  ],
  [
   "Debt you do not recognize",
   "The judgment may involve a debt that was sold and resold, with incomplete records.",
   "Chain of assignment"
  ],
  [
   "Wrong amount",
   "Fees, interest and costs added to the judgment may not be supportable.",
   "State garnishment rules"
  ],
  [
   "Wrong person",
   "Similar names and old records lead to garnishments against the wrong person.",
   "Due process"
  ],
  [
   "More taken than the law allows",
   "Deductions above the legal limit can be challenged.",
   "15 U.S.C. § 1673"
  ]
 ],
 "rights_first_item": "from sibling page"
}
```

### /wage-garnishment-rights — Garnishment · Know your rights. Limits and exemptions
```json
{
 "h1": "How Much of Your Paycheck Can They Take?",
 "lede": "Our Attorneys Can Explain Your Rights and Act.",
 "whatWeDo": {
  "headline": "Garnishment has limits. We explain them first.",
  "intro": "Federal and state law limit how much of your pay can be garnished, protect certain income completely, and give you the chance to object. Our attorneys explain which rules apply to you, then use them.",
  "bullets": [
   "Explain the federal limit and your state's limit on wage garnishment.",
   "Check whether your income is partly or fully exempt.",
   "Review whether the garnishment followed the required steps.",
   "File the objections and exemption claims that apply to you."
  ]
 },
 "whyChoose": [
  [
   "We explain before we act",
   "You hear in plain language which protections apply to your paycheck."
  ],
  [
   "We know the limits",
   "Federal law caps most consumer-debt garnishments. Many states protect more."
  ],
  [
   "We file what protects you",
   "Exemptions are not automatic. They have to be claimed, usually by a deadline."
  ]
 ],
 "whoHelps": [
  "Anyone who has received a garnishment notice and does not know what it means.",
  "People who think too much is being taken from their pay.",
  "Heads of household and people with low income.",
  "People whose income includes Social Security, disability or other benefits.",
  "Anyone who wants to know their rights before deciding what to do."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us what you received and what is being taken. No cost."
  ],
  [
   "Your rights explained",
   "An attorney explains the limits and exemptions that apply in your state."
  ],
  [
   "Recommendation",
   "We tell you which objections or exemption claims fit your situation."
  ],
  [
   "Action",
   "If you move forward, we file them and follow up with the court and the creditor."
  ]
 ],
 "faq_first_two": [
  [
   "How much of my paycheck can be taken?",
   "Federal law limits most consumer-debt garnishments to 25% of disposable earnings, and less if you earn close to the minimum wage. Several states set lower limits."
  ],
  [
   "What is a garnishment exemption and how do I know if I qualify?",
   "Exemptions are legal protections that reduce or eliminate the amount of your wages that can be garnished. They vary by state and circumstance, head of household, low income, federal benefits, and others."
  ]
 ],
 "closing": "You have more protection than a garnishment notice suggests. Our attorneys explain your rights for free.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /debt-lawsuit-stop-calls — Lawsuit · Stop the calls while you are sued
```json
{
 "h1": "Sued and Still Getting Calls?",
 "lede": "Our Attorneys Can Make the Calls Stop and Answer the Lawsuit.",
 "whatWeDo": {
  "headline": "We stop the calls and answer the case.",
  "intro": "A lawsuit does not give a collector the right to keep calling you. Once our attorneys represent you, the collector generally has to deal with us, not with you. We take over the contact and answer the lawsuit.",
  "bullets": [
   "Tell the collector in writing that you are represented, so contact goes through us.",
   "File your answer to the lawsuit before the deadline.",
   "Document calls that continue after the collector knows you have an attorney.",
   "Use any violations in your defense."
  ]
 },
 "whyChoose": [
  [
   "We take the calls",
   "Once you are represented, a collector generally may not contact you directly about the debt."
  ],
  [
   "We answer the lawsuit",
   "The calls are stressful. The court deadline is what cannot be missed."
  ],
  [
   "We document violations",
   "Calls that continue after notice of representation can be violations."
  ]
 ],
 "whoHelps": [
  "Anyone who has been served and is still getting collection calls.",
  "People pressured on the phone to pay before their court date.",
  "Those receiving calls at work or through family about a debt that is in court.",
  "Anyone told by a caller that they will be arrested or lose their job.",
  "People who want one attorney to handle both the calls and the lawsuit."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us about the lawsuit and the calls. We review both at no cost."
  ],
  [
   "Notice of representation",
   "We tell the collector you are represented. Contact goes through us."
  ],
  [
   "Answer filed",
   "We file your response to the lawsuit before the deadline."
  ],
  [
   "Resolution",
   "We defend the case and act on any violations we have documented."
  ]
 ],
 "faq_first_two": [
  [
   "Can a collector keep calling me while it is suing me?",
   "A lawsuit does not suspend the FDCPA. Once the collector knows you have an attorney, it generally has to contact the attorney instead of you."
  ],
  [
   "What if the collector keeps calling after I've asked them to stop?",
   "Every call after a cease request is a federal law violation worth up to $1,000 in statutory damages. We document those violations and can pursue legal claims on your behalf."
  ]
 ],
 "closing": "You should not have to take collection calls while you defend a lawsuit. Our attorneys handle both, starting with a free consultation.",
 "problems_if_new": "from sibling page",
 "rights_first_item": {
  "cite": "§ 1692c(a)(2)",
  "label": "Represented consumers",
  "text": "Once a collector knows you are represented by an attorney, it generally must contact the attorney, not you.",
  "exLabel": "Right",
  "ex": "Calls to you after notice of representation can be a violation."
 }
}
```

### /medical-debt-stop-calls — Medical Debt · Stop the calls
```json
{
 "h1": "Medical Debt Collectors Won't Stop Calling?",
 "lede": "Our Attorneys Can Make Them Stop.",
 "whatWeDo": {
  "headline": "Medical bills are stressful enough. We stop the calls.",
  "intro": "Collectors calling about hospital and medical bills have to follow the same federal rules as any other debt collector. Our attorneys send a formal cease letter and document every contact that follows.",
  "bullets": [
   "Send a formal cease-communication letter to the collector.",
   "Ask the collector to verify the bill it is collecting.",
   "Document every contact after the cease letter.",
   "Take legal action when collectors ignore federal law."
  ]
 },
 "whyChoose": [
  [
   "Licensed attorneys, not a settlement company",
   "Our attorneys are real lawyers. The cease letter carries legal authority, and if collectors keep calling, we have real legal remedies to pursue."
  ],
  [
   "We act on day one",
   "The cease letter goes out immediately. You don't spend weeks waiting to feel relief."
  ],
  [
   "We check the bill too",
   "Medical bills often contain errors. We ask the collector to verify what it is collecting."
  ]
 ],
 "whoHelps": [
  "Anyone getting repeated calls about a hospital or medical bill.",
  "People contacted at work or through family about medical debt.",
  "Those called about a bill their insurance should have covered.",
  "Anyone threatened with a lawsuit or credit damage over a medical bill.",
  "People who want the calls to stop before deciding how to handle the bill."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us what's been happening. We review your situation and explain your rights at no cost."
  ],
  [
   "Cease letter sent, day one",
   "Our attorneys send a formal cease-communication letter to the collector immediately after enrollment. Legally, they must stop."
  ],
  [
   "Violations documented",
   "If contact continues after the cease letter, each instance is a federal violation. We track and record them."
  ],
  [
   "Resolution",
   "We resolve the harassment and, where warranted, pursue legal claims against the collector, potentially recovering money on your behalf."
  ]
 ],
 "faq_first_two": [
  [
   "Can I legally force a debt collector to stop calling me?",
   "Yes. Under the FDCPA, once you send a written cease communication request, the collector must stop all contact. Our attorneys send that letter on the day you enroll."
  ],
  [
   "What if the collector keeps calling after I've asked them to stop?",
   "Every call after a cease request is a federal law violation worth up to $1,000 in statutory damages. We document those violations and can pursue legal claims on your behalf."
  ]
 ],
 "closing": "The calls about medical bills can stop. Our attorneys send the letter that requires it, and the consultation is free.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /debt-lawsuit-violations — Lawsuit · Make them pay. Violations as counterclaims
```json
{
 "h1": "Sued by a Collector Who Broke the Law?",
 "lede": "Our Attorneys Can Help Make Them Pay.",
 "whatWeDo": {
  "headline": "Their violations can become your claim.",
  "intro": "A collector that sues you still has to follow the FDCPA. False statements, a wrong amount or a lawsuit on a debt that is too old can be violations. Our attorneys defend the lawsuit and raise those violations against the collector.",
  "bullets": [
   "File your answer to the lawsuit before the deadline.",
   "Review the collector's letters, calls and court filings for FDCPA violations.",
   "Raise violations as counterclaims where the law allows.",
   "Pursue statutory damages, actual damages and attorney's fees."
  ]
 },
 "whyChoose": [
  [
   "We defend and we claim",
   "You answer the lawsuit and assert your own claims in the same case."
  ],
  [
   "We track every violation",
   "Calls, letters and court filings are all reviewed."
  ],
  [
   "The FDCPA creates accountability",
   "A collector that breaks the law can owe damages and attorney's fees."
  ]
 ],
 "whoHelps": [
  "Anyone sued by a collector after months of harassing calls.",
  "People sued for an amount they know is wrong.",
  "Those sued over a debt that is many years old.",
  "Anyone threatened with arrest or other action before the lawsuit.",
  "People who want the collector held to the same rules they are."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us about the lawsuit and how the collector has treated you. No cost."
  ],
  [
   "Violations documented",
   "We review calls, letters and court papers for FDCPA violations."
  ],
  [
   "Answer and counterclaims filed",
   "We respond to the lawsuit before the deadline and raise the claims the law allows."
  ],
  [
   "Resolution",
   "We pursue the defense and the claims toward the best possible outcome."
  ]
 ],
 "faq_first_two": [
  [
   "Can I make a claim against a collector that is suing me?",
   "Often, yes. If the collector violated the FDCPA, those violations can be raised as counterclaims in the same lawsuit or in a separate case. An attorney reviews which applies."
  ],
  [
   "How much can I recover from a debt collector who violated the FDCPA?",
   "Up to $1,000 per lawsuit in statutory damages, plus actual damages for real harm suffered, plus attorney fees, all recoverable from the collector if the claim is viable."
  ]
 ],
 "closing": "Being sued does not cancel your rights. Our attorneys review the collector's conduct for free and tell you what you can claim.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /medical-debt-violations — Medical Debt · Make them pay
```json
{
 "h1": "Medical Debt Collectors Breaking the Rules?",
 "lede": "Our Attorneys Can Help Make Them Pay.",
 "whatWeDo": {
  "headline": "Every illegal call about a medical bill can become a claim.",
  "intro": "Medical debt collectors are covered by the FDCPA. When they call at illegal hours, contact your workplace or family, or misstate what you owe, the law lets you hold them accountable. Our attorneys document each violation and pursue the claim.",
  "bullets": [
   "Document every call, letter and threat.",
   "Send a cease letter so later contact is on the record.",
   "Check the bill for amounts the collector cannot support.",
   "Pursue statutory damages, actual damages and attorney's fees."
  ]
 },
 "whyChoose": [
  [
   "Licensed attorneys, we hold collectors accountable",
   "We don't send a strongly worded letter and hope for the best. We build FDCPA cases and pursue them."
  ],
  [
   "We track every violation",
   "Each illegal call, threat, or contact after a cease request is documented and added to your claim."
  ],
  [
   "The FDCPA pays you, we maximize that",
   "Statutory damages, actual damages, and attorney fees are all recoverable. We pursue the full amount."
  ]
 ],
 "whoHelps": [
  "Anyone called before 8 AM or after 9 PM about a medical bill.",
  "People whose employer or family was contacted about medical debt.",
  "Those told they owe an amount that does not match their bills.",
  "Anyone threatened with arrest or a lawsuit over a hospital bill.",
  "People who asked a collector to stop and are still being called."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us what's been happening. We review every collector contact and identify violations at no cost."
  ],
  [
   "Violations documented",
   "Our attorneys catalog every illegal call, threat, and breach from day one. Each one is potential money in your pocket."
  ],
  [
   "Cease letter sent",
   "We stop the calls while simultaneously building your FDCPA claim against the collector."
  ],
  [
   "Legal action",
   "We pursue the collector for statutory damages, actual damages, and attorney fees, shifting the financial pressure from you to them."
  ]
 ],
 "faq_first_two": [
  [
   "How much can I recover from a debt collector who violated the FDCPA?",
   "Up to $1,000 per lawsuit in statutory damages, plus actual damages for real harm suffered, plus attorney fees, all recoverable from the collector if the claim is viable."
  ],
  [
   "Do I need to prove I was financially harmed to make a claim?",
   "No. Under the FDCPA, a violation is enough, you don't need to show that the calls cost you money. The law creates automatic liability for each breach."
  ]
 ],
 "closing": "Medical debt collectors have rules to follow. Our attorneys review what they did, for free, and tell you what you can claim.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /wage-garnishment-violations — Garnishment · Make them pay. Wrongful garnishment (attorney to confirm the angle)
```json
{
 "h1": "Garnished More Than the Law Allows?",
 "lede": "Our Attorneys Can Go After What Was Wrongly Taken.",
 "whatWeDo": {
  "headline": "When a garnishment breaks the rules, we make them answer for it.",
  "intro": "A garnishment has to stay within federal and state limits and leave exempt income alone. When too much is taken, or protected income is garnished, you may be able to get money back and hold the creditor or collector accountable. Our attorneys check the numbers and act where the rules were broken.",
  "bullets": [
   "Check each deduction against the federal and state limits.",
   "Identify exempt income that should not have been touched.",
   "Ask the court to correct the garnishment and return what was wrongly taken.",
   "Pursue claims against collectors that broke the law."
  ]
 },
 "whyChoose": [
  [
   "We check the math",
   "Limits are calculated on disposable earnings. Errors are common."
  ],
  [
   "We know what is exempt",
   "Certain benefits and income are protected by law."
  ],
  [
   "We act on violations",
   "Where a collector broke the law, we pursue the claim."
  ]
 ],
 "whoHelps": [
  "Anyone losing more than a quarter of their take-home pay to one consumer debt.",
  "People whose Social Security, disability or other benefits were garnished.",
  "Those garnished without notice or a chance to object.",
  "Heads of household whose exemption was never applied.",
  "Anyone who wants the deductions checked by an attorney."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Send us your pay stubs and the garnishment order. We review them at no cost."
  ],
  [
   "Deductions checked",
   "We compare what was taken with what the law allows."
  ],
  [
   "Objection filed",
   "Where too much was taken, we ask the court to correct it and return the excess."
  ],
  [
   "Claims pursued",
   "If a collector violated your rights, we pursue the claim."
  ]
 ],
 "faq_first_two": [
  [
   "How much of my paycheck can be taken?",
   "Federal law limits most consumer-debt garnishments to 25% of disposable earnings, and less if you earn close to the minimum wage. Several states set lower limits."
  ],
  [
   "Can I get back money that was wrongly garnished?",
   "Sometimes. It depends on why the garnishment was wrong and on your state's rules. Our attorneys review the deductions and tell you what can be claimed."
  ]
 ],
 "closing": "If more was taken than the law allows, you do not have to accept it. Our attorneys check your garnishment for free.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /debt-harassment-settlement — Harassment · Reduce or remove. Violations as leverage (attorney to confirm the angle)
```json
{
 "h1": "Harassed Over a Debt? You May Owe Less.",
 "lede": "Our Attorneys Can Use Their Violations to Reduce It.",
 "whatWeDo": {
  "headline": "Their violations can lower what you pay.",
  "intro": "When a collector breaks the FDCPA, it can owe you damages. That changes the conversation about the debt itself. Our attorneys document the violations, check whether the debt is valid, and use both to reduce or resolve what is claimed.",
  "bullets": [
   "Document every FDCPA violation.",
   "Ask the collector to verify the debt and the amount.",
   "Use violations and gaps in proof as leverage in negotiation.",
   "Pursue damages where a settlement is not the best outcome."
  ]
 },
 "whyChoose": [
  [
   "We negotiate from strength",
   "Documented violations give you leverage."
  ],
  [
   "We check the debt first",
   "You should not negotiate over an amount nobody has proven."
  ],
  [
   "We talk to them so you don't have to",
   "Contact goes through our attorneys."
  ]
 ],
 "whoHelps": [
  "Anyone harassed by a collector over a debt they want resolved.",
  "People who think the amount claimed is too high.",
  "Those who want the calls to stop and the debt dealt with.",
  "Anyone offered a deal on the phone and unsure whether to take it.",
  "People who want an attorney to negotiate for them."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us about the calls and the debt. No cost."
  ],
  [
   "Violations and debt reviewed",
   "We document violations and ask the collector to verify the debt."
  ],
  [
   "Negotiation",
   "Our attorneys negotiate with the collector using what the review found."
  ],
  [
   "Resolution",
   "A reduced balance, a dropped claim or a damages claim, depending on the facts."
  ]
 ],
 "faq_first_two": [
  [
   "Can violations really reduce what I owe?",
   "They can. A collector facing a valid FDCPA claim often has a reason to settle the debt for less or to drop it. Results depend on the facts of your case."
  ],
  [
   "Should I accept a settlement offer made on the phone?",
   "Not before the debt has been verified and the offer is in writing. Our attorneys review offers and negotiate for you."
  ]
 ],
 "closing": "Before you pay a collector that harassed you, find out what their conduct is worth. The consultation is free.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /debt-lawsuit-settlement — Lawsuit · Reduce or remove. Challenge the amount and negotiate
```json
{
 "h1": "Sued for More Than You Owe?",
 "lede": "Our Attorneys Can Challenge the Amount and Negotiate It Down.",
 "whatWeDo": {
  "headline": "We challenge the amount, then negotiate it down.",
  "intro": "The amount in a collection lawsuit often includes fees, interest and charges that cannot be supported. Our attorneys answer the lawsuit on time, challenge the numbers, and negotiate from that position.",
  "bullets": [
   "File your answer before the deadline so you keep your leverage.",
   "Ask the collector to document the amount it claims.",
   "Challenge fees, interest and charges that cannot be supported.",
   "Negotiate a resolution, or defend the case in court."
  ]
 },
 "whyChoose": [
  [
   "Attorney-led negotiation",
   "Collectors negotiate differently with an attorney who has filed an answer."
  ],
  [
   "We challenge the amount",
   "Inflated balances are common in collection lawsuits."
  ],
  [
   "Protection from default judgment",
   "An answer on file keeps your options open."
  ]
 ],
 "whoHelps": [
  "Anyone sued for an amount higher than they remember owing.",
  "People who want to resolve the lawsuit without paying the full claim.",
  "Those sued by a debt buyer that added fees and interest.",
  "Anyone offered a settlement by the collector's attorney.",
  "People who want an attorney to negotiate while the case is defended."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "We review your lawsuit and explain exactly where you stand and what options you have, at no cost."
  ],
  [
   "Debt investigation",
   "Our attorneys examine the claim, the documentation, and the legal basis before we respond."
  ],
  [
   "Legal response filed",
   "We file your answer by the deadline, preserving your right to defend the case."
  ],
  [
   "Work towards resolution",
   "We fight the case in court, negotiate a settlement, or move to reduce or dismiss the debt based on the strength of the case."
  ]
 ],
 "faq_first_two": [
  [
   "Can a debt lawsuit be settled for less than the amount claimed?",
   "Often, yes. Collectors settle when the amount is in dispute or their records are incomplete. Results depend on the facts, and nothing is guaranteed."
  ],
  [
   "Do I still have to answer the lawsuit if I want to settle?",
   "Yes. Without an answer, the collector can get a default judgment for the full amount. Filing an answer protects your position while we negotiate."
  ]
 ],
 "closing": "You do not have to choose between ignoring the lawsuit and paying everything. Our attorneys answer it and negotiate, starting with a free consultation.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /payday-loan-reduce — Payday Loan · Reduce or remove. Check what is legally owed
```json
{
 "h1": "Payday Loan Balance Out of Control?",
 "lede": "Our Attorneys Can Check What You Legally Owe.",
 "whatWeDo": {
  "headline": "You may owe less than they say. We check.",
  "intro": "Payday loan balances grow through rollovers, fees and interest. State law limits what lenders can charge, and loans made by unlicensed lenders or above the legal rate may be void or voidable. Our attorneys check the loan and work to reduce what is claimed.",
  "bullets": [
   "Review the loan agreement, fees and rollovers.",
   "Check whether the lender was licensed in your state.",
   "Check the interest rate against your state's limit.",
   "Challenge what cannot be supported and negotiate the rest."
  ]
 },
 "whyChoose": [
  [
   "We know payday loan law",
   "Payday lending is governed by specific state and federal rules."
  ],
  [
   "We check the loan itself",
   "Licensing, rates and fees are reviewed before anything more is paid."
  ],
  [
   "We challenge inflated balances",
   "Rollovers and fees can multiply a small loan."
  ]
 ],
 "whoHelps": [
  "Anyone whose payday loan has grown far beyond the amount borrowed.",
  "People who borrowed from an online lender and are unsure it was licensed.",
  "Those paying fees every pay period without the balance going down.",
  "Anyone contacted by a collector for a payday loan balance they do not recognize.",
  "People who want the loan checked before they pay more."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Tell us about the loan and what you have paid. No cost."
  ],
  [
   "Loan review",
   "We check licensing, the rate, fees and rollovers against your state's rules."
  ],
  [
   "Challenge and negotiation",
   "We dispute what cannot be supported and negotiate the rest."
  ],
  [
   "Resolution",
   "A reduced balance, a voided loan or a defended claim, depending on what the review finds."
  ]
 ],
 "faq_first_two": [
  [
   "Can the amount I owe on a payday loan be reduced?",
   "It may be. If fees or interest exceed what your state allows, or the lender was not licensed, part or all of the balance can be challenged. Results depend on your state and the loan."
  ],
  [
   "Can a payday loan be challenged if I actually borrowed the money?",
   "Yes. The original loan amount may be legally disputed if the lender wasn't licensed, if the rate was above your state cap, or if fees were applied improperly."
  ]
 ],
 "closing": "Before you pay another fee, have the loan checked. Our attorneys review it for free.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```

### /medical-debt-reduce — Medical Debt · Reduce or remove. Check the bill and negotiate
```json
{
 "h1": "Medical Bills Higher Than They Should Be?",
 "lede": "Our Attorneys Can Help Reduce What You Owe.",
 "whatWeDo": {
  "headline": "You may owe less than the bill says. We check.",
  "intro": "Medical bills are often wrong: duplicate charges, insurance that was never applied, amounts above what was agreed. Our attorneys review the bill, challenge what cannot be supported, and negotiate what remains.",
  "bullets": [
   "Review the itemized bill and insurance records for errors.",
   "Ask the collector to verify the amount it claims.",
   "Challenge charges that cannot be supported.",
   "Negotiate the remaining balance on your behalf."
  ]
 },
 "whyChoose": [
  [
   "We examine the bill first",
   "Every charge is reviewed before anything is paid."
  ],
  [
   "We challenge what's wrong",
   "Errors, duplicate charges and unapplied insurance are raised formally."
  ],
  [
   "Attorney-led negotiation",
   "Collectors and providers negotiate differently with an attorney."
  ]
 ],
 "whoHelps": [
  "Anyone with a medical bill that looks too high.",
  "People billed for care their insurance should have covered.",
  "Those with a medical debt in collections for more than the original bill.",
  "Anyone who received a surprise out-of-network bill.",
  "People who want the bill checked before they agree to a payment plan."
 ],
 "howItWorks": [
  [
   "Free consultation",
   "Send us the bill and any collection letters. We review them at no cost."
  ],
  [
   "Bill review",
   "We check the charges, the insurance record and who owns the debt."
  ],
  [
   "Challenge and negotiation",
   "We dispute what cannot be supported and negotiate the rest."
  ],
  [
   "Resolution",
   "A corrected bill, a reduced balance or a dropped claim, depending on what the review finds."
  ]
 ],
 "faq_first_two": [
  [
   "Can a medical bill really be reduced?",
   "Often. Billing errors, unapplied insurance and unsupported charges can lower what is owed, and the remaining balance can be negotiated. Results depend on the bill and the facts."
  ],
  [
   "Should I agree to a payment plan first?",
   "It is usually better to have the bill checked first, so that you only agree to pay an amount that is correct. Our attorneys review the bill for free."
  ]
 ],
 "closing": "Before you pay a medical bill that looks wrong, have it checked. Our attorneys review it for free.",
 "problems_if_new": "from sibling page",
 "rights_first_item": "from sibling page"
}
```
