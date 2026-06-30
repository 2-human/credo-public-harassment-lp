/* Credo Legal — Credit Card / Negotiation — "Challenge Validity" angle (Var B).
   Source: live re-fetch during 2026-06-23 audit (live page is the
   distinctive one with the MISSING 'Why Choose' SECTION — only 6 body
   sections instead of standard 7).

   FIRST CREDIT CARD-CLUSTER LP applied to the new design. Phone
   (646) 952-7404 routes to CC Negotiation.

   Per-LP deviations resolved:
   - MISSING 'Why Choose Credo Legal' section on live → synthesized 5
     bullets matching the cluster pattern + the challenge-validity angle.
   - Section order on live is unusual (Common Problems before Why Choose
     would have been; standard template restored here). */
window.CREDO = {
  phone: "(646) 952-7404", phoneHref: "tel:+16469527404",
  cluster: "Credit Card", angle: "Negotiation. Challenge validity",
  statute: "FDCPA + FCRA + state UCC",

  hero: {
    eyebrow: "Credit card · Challenge the debt",
    h1: ["Got ", "Credit Card Debt", "?"],
    lede: "Our Attorneys Can Help You Challenge It.",
    filler: "Fill in the form below or call us for a free review of your case.",
  },

  form: {
    steps: [
      { key: "debt", label: "Your debt", n: "01" },
      { key: "situation", label: "Your situation", n: "02" },
      { key: "details", label: "Your details", n: "03" },
    ],
    debtQuestion: "How much do you currently owe in total?",
    situationFields: {
      count:    { label: "How many debts do you have?", placeholder: "Select debts", options: ["1 debt", "2–3 debts", "4–5 debts", "6 or more"] },
      type:     { label: "What types of debt do you have?", placeholder: "Select all that apply", multi: true, options: ["Credit card", "Medical bills", "Personal or payday loan", "Auto loan", "Student loan", "Other"] },
      stage:    { label: "What stage is your debt at?", placeholder: "Select debt stage", options: ["Behind on payments", "In collections", "Being sued / served papers", "Judgment entered", "Wage garnishment"] },
      security: { label: "Is your debt secured or unsecured?", placeholder: "Select debt security", options: ["Unsecured (no collateral)", "Secured (collateral)", "Not sure"] },
      more:     { label: "Tell us more about your situation", placeholder: "Tell us more about your situation" },
    },
    detailLabels: {
      first: "First name", last: "Last name", phone: "Phone number", email: "Email",
      altPhone: "Alternative phone number", address: "Address", city: "City",
      state: "State", zip: "Zip code", dob: "Date of birth",
    },
    states: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
    situationOptions: [
      "Don't recognize the debt",
      "Believe the amount is inflated",
      "Debt sold multiple times",
      "Zombie debt, past statute",
      "Inflated fees and interest",
      "Considering negotiating settlement",
    ],
    submit: "Get a free case evaluation",
    stateExclusion: "We currently do not service DC, DE, ID, NC, OK, WV, or WY.",
  },

  trust: [
    { n: "44", lbl: "States with licensed attorneys" },
    { n: "$0", lbl: "Cost of your consultation" },
    { n: "FCRA", lbl: "Credit-report cleanup" },
    { n: "Flat", lbl: "Monthly fee, no contingency" },
  ],

  reviews: {
    bbb:        { title: "Accredited Business", meta: "A rating · 4.59 / 5" },
    trustpilot: { title: "Excellent",           meta: "4.5 / 5 · 1,247 reviews" },
    google:     { title: "Google Reviews",      meta: "4.7 / 5" },
  },
  // 2026-06-30 (Sona, span-12 + span-14, propagated): metrics swap applied
  // across all LPs. Numbers confirmed by team@2-human.com 2026-06-30.
  metrics: [
    ["10 million+", "In debt wiped"],
    ["500k", "Debts settled every month"],
  ],

  whatWeDo: {
    headline: "We don't assume you owe it.",
    intro: "At Credo Legal, we don't assume you owe what they say you owe. We challenge it, legally and thoroughly.",
    bullets: [
      "Investigate whether the debt is valid and properly documented.",
      "Challenge inflated, inaccurate, or unenforceable balances.",
      "Demand proof the debt is yours and legally collectible.",
      "Remove invalid debts from your credit report.",
    ],
  },

  // SYNTHESIZED: live page is missing this section entirely. Bullets
  // match the cluster pattern + the challenge-validity angle.
  whyChoose: [
    ["Licensed attorneys, we challenge before we negotiate", "We don't take the creditor's word for what you owe. We demand proof first."],
    ["We know what credit card debts actually require", "Cardmember agreements, chain of ownership, statute of limitations, we know what the creditor must show to enforce the debt."],
    ["We dispute, defend, and remove", "Bureau disputes, court defense, settlement negotiation, credit-report removal, every tool the law gives you."],
    ["Free consultation", "Know what they can actually prove, and what they can't, at no cost."],
    ["Flexible payment plans", "Attorney-led defense structured around your budget."],
  ],

  commonProblems: [
    ["Debts sold without complete records", "Card debts are sold many times before they end up in collections. The documentation often doesn't survive the journey.", "FRE 803(6), 901"],
    ["Balances inflated with unverifiable fees and interest", "Late fees, over-limit fees, default interest rates, not all of those are legally enforceable.", "State usury / contract"],
    ["Invalid or “zombie” debts resurfacing", "Old debts past the statute of limitations sometimes get brought back to court by new collectors.", "State SOL"],
    ["Debts you don't recognize or believe are incorrect", "Identity issues, mistaken accounts, payment errors, any of these can mean you don't actually owe what's claimed.", "FDCPA § 1692g"],
  ],

  howItWorks: [
    ["Free consultation", "We review the debt and what you've been told you owe.", "DAY 0"],
    ["Debt investigation", "We check every dollar for validity and proper documentation.", "WEEK 1"],
    ["Legal representation", "We challenge the debt with the creditor or in court.", "WEEK 1–2"],
    ["Dismissal or resolution", "Invalid debts get dismissed and removed from your record.", "ONGOING"],
  ],

  rights: {
    intro: "Before you pay any credit card debt, know your rights.",
    items: [
      { cite: "FDCPA § 1692g",      label: "Validation right",          text: "Collectors cannot enforce a debt without first providing written validation when you request it.", exLabel: "Right", ex: "Send a validation request. Collection activity pauses until they respond." },
      { cite: "Chain of assignment", label: "Proof of ownership",        text: "Collectors cannot collect on a debt they cannot prove is legally theirs.", exLabel: "Right", ex: "No complete chain from original creditor = standing problem." },
      { cite: "FDCPA § 1692e(2)",   label: "Accurate amount required",   text: "Collectors cannot claim an amount higher than what you legitimately owe.", exLabel: "Violation", ex: "Inflated balance in a complaint or collection notice = federal claim." },
      { cite: "FCRA § 623",         label: "Accurate credit reporting",  text: "Collectors cannot report inaccurate debt information to credit bureaus.", exLabel: "Violation", ex: "Willful inaccurate reporting = statutory damages + fees." },
      { cite: "State SOL",           label: "Time-barred debts",         text: "Collectors cannot pursue a debt past its statute of limitations in court.", exLabel: "Right", ex: "Most consumer debts: 3–6 years depending on state. After that, suing is improper." },
      { cite: "Discharge / payment", label: "Already-resolved debts",    text: "Collectors cannot collect on a debt that has already been resolved or discharged.", exLabel: "Right", ex: "Paid, settled, or bankruptcy-discharged = no collection." },
    ],
  },

  whoHelps: [
    "People questioning whether a credit card debt is actually valid.",
    "Anyone whose debt has been bought and sold between multiple collectors.",
    "Those being asked to pay amounts they believe are inflated or wrong.",
    "People whose credit report shows a debt they don't recognize.",
    "Anyone who wants a legal review before paying a cent.",
  ],

  faq: [
    ["How common is it for a credit card debt to be invalid?", "More common than most people realize. Credit card debts are frequently sold to third-party collectors, sometimes several times over, and documentation gets lost along the way. Balances can also be inflated with fees and interest that aren't legally enforceable."],
    ["What does “challenging debt validity” actually mean?", "It means our attorneys legally demand that the creditor prove, with documentation, that you owe the debt, that the amount is accurate, and that they have the legal right to collect it. If they can't prove it, the debt can be dismissed."],
    ["Can invalid debts really be removed from my credit report?", "Yes. If a debt is invalid, unenforceable, or improperly documented, it can be removed from your credit report, which can meaningfully improve your score."],
    ["What if my debt has already been sold multiple times?", "That actually strengthens the challenge. Each sale should come with documentation; chains often break, and standing becomes harder for the collector to prove."],
    ["How much does this cost?", "We offer flexible payment plans so attorney help is accessible without paying everything upfront. Your first case evaluation is completely free."],
  ],

  bottomCta: {
    headline: "Don't pay until you know what you actually owe. Get a free review.",
    body: "Many credit card debts can't survive a legal challenge. Our attorneys check first, and pursue what the evidence supports.",
    cta: "Get a free case evaluation",
  },

  disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
};
