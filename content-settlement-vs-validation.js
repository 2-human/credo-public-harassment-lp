/* Credo Legal — All-States — "Debt settlement or debt validation?" (NEW, search-term gap).
   Proposed 2026-09-30 from the search-term review (now in the Marketing Hub, Ads › New pages).
   Intent: settlement shoppers. "debt settlement attorney" (157 impressions,
   CPA $188) and "debt settlement lawyer" (0 clicks) land on the lawsuit
   deadline ad; "debt settlement attorney near me" converts at $51, so
   attorney-minded settlement searchers are worth reaching. This page meets
   them on their own word, then explains Credo's order of operations:
   validate first, defend in court if sued, settle as the fallback.
   Cross-vertical (credit card, medical, personal loans), so it sits in the
   All-States section. Keep settlement promises out of ads: Google's Debt
   Services policy already limits the CC_Negotiation ad.
   Not live: proposed slug /debt-settlement-vs-validation. Phone = the
   All-States overlay's number. Draft copy for attorney review. */
window.CREDO = {
  phone: "(612) 256-8820",
  phoneHref: "tel:+16122568820",
  cluster: "All-States",
  angle: "Settlement shopper. Validate before you settle",
  statute: "FDCPA § 1692g / FTC TSR",

  hero: {
    eyebrow: "Debt settlement · Before you settle",
    h1: ["Thinking About ", "Debt Settlement", "?"],
    lede: "Our Attorneys Check Whether You Owe It Before You Pay a Dollar.",
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
      "Comparing debt settlement companies",
      "Already enrolled in a settlement program",
      "Collector offered a settlement",
      "Being sued while in a settlement program",
      "Several debts in collections",
      "Not sure I owe the full amount",
    ],
    submit: "Get a free case evaluation",
    stateExclusion: "We currently do not service DC, DE, ID, NC, OK, WV, or WY.",
  },

  trust: [
    { n: "44", lbl: "States with licensed attorneys" },
    { n: "$0", lbl: "Cost of your consultation" },
    { n: "Court", lbl: "Defense if you are sued" },
    { n: "Flat", lbl: "Monthly fee, not a % of your debt" },
  ],

  reviews: {
    bbb:        { title: "Accredited Business", meta: "A rating · 4.59 / 5" },
    trustpilot: { title: "Excellent",           meta: "4.5 / 5 · 1,247 reviews" },
    google:     { title: "Google Reviews",      meta: "4.7 / 5" },
  },
  metrics: [
    ["10 million+", "In debt wiped"],
    ["500k", "Debts settled every month"],
  ],

  whatWeDo: {
    headline: "Settling a debt you may not owe costs money you don't have to spend.",
    intro: "Settlement companies negotiate a discount on whatever the collector says you owe. We start one step earlier: our attorneys ask the collector to validate the debt and prove the amount. If they can't, there may be nothing to settle. If you are sued, we defend you in court. Settlement stays on the table as a fallback, negotiated by an attorney.",
    bullets: [
      "Request validation of each debt before any payment is offered.",
      "Challenge debts the collector can't prove, including old and resold accounts.",
      "Defend you in court if a collector sues, which settlement companies can't do.",
      "Negotiate a settlement only where that is the better outcome.",
    ],
  },

  whyChoose: [
    ["Validation comes first", "A discount on a debt you don't owe is still money lost. We check the debt before any offer."],
    ["Attorneys, not negotiators", "If a collector sues, our attorneys file your answer and defend the case. Settlement companies can't appear in court for you."],
    ["Flat monthly fee", "Our fee is not a percentage of your enrolled debt, and it doesn't grow with your balance."],
    ["Keep your options open", "Stopping payments for a settlement program can lead to lawsuits. We plan around that risk from day one."],
    ["Flexible payment plans", "Attorney-led help structured around your budget."],
  ],

  commonProblems: [
    ["Sued while enrolled in a settlement program", "Collectors can sue while you save toward a settlement. A settlement company can't file your answer.", "State civil procedure"],
    ["Paying a percentage of your debt in fees", "Settlement companies usually charge a share of the debt they settle. Our fee is flat.", "16 C.F.R. § 310.4(a)(5)"],
    ["Settling debts that can't be proven", "Old or resold debts often lack records. Settling them pays a claim that might not hold up.", "FDCPA § 1692g"],
    ["Tax on forgiven debt", "Forgiven debt can count as income. Settlements can come with a tax bill later.", "IRS Form 1099-C"],
    ["Credit damage from missed payments", "Programs that tell you to stop paying can leave months of late marks on your report.", "FCRA"],
    ["Time-barred debts restarted", "In some states, a payment on an old debt can restart the statute of limitations.", "State SOL"],
  ],

  howItWorks: [
    ["Free consultation", "Tell us which debts you want to settle. We review each one at no cost.", "DAY 0"],
    ["Validation", "We ask each collector to verify the debt and the amount in writing.", "WEEK 1–4"],
    ["Defense or challenge", "Debts they can't prove are challenged. If you are sued, we defend the case.", "ONGOING"],
    ["Settlement if it helps", "Where a debt holds up, our attorneys negotiate terms you can afford.", "ONGOING"],
  ],

  rights: {
    intro: "Before you settle, the law gives you ways to test the debt:",
    items: [
      { cite: "FDCPA § 1692g",           label: "Validation",              text: "You can dispute a debt in writing and require the collector to verify it.", exLabel: "Right", ex: "Dispute within 30 days of the validation notice = collection pauses until they verify." },
      { cite: "FDCPA § 1692e(2)",        label: "Accurate amount",         text: "A collector may not misrepresent the amount or legal status of a debt.", exLabel: "Violation", ex: "Inflated balance = FDCPA claim against the collector." },
      { cite: "16 C.F.R. § 310.4(a)(5)", label: "No advance settlement fees", text: "Debt settlement companies selling by phone may not charge fees before they settle a debt.", exLabel: "Right", ex: "An upfront fee demand from a settlement company is a warning sign." },
      { cite: "12 C.F.R. § 1006.26(b)",  label: "No suits on old debts",   text: "A debt collector may not sue or threaten to sue on a debt past the statute of limitations.", exLabel: "Violation", ex: "Time-barred debt = no lawsuit, and often nothing to settle." },
      { cite: "FCRA",                    label: "Accurate credit report",  text: "Debts reported inaccurately can be disputed with the credit bureaus.", exLabel: "Remedy", ex: "Invalid debt removed = no settlement needed for that account." },
    ],
  },

  whoHelps: [
    "People comparing debt settlement companies.",
    "Anyone already in a settlement program who has been sued.",
    "People offered a settlement by a collector who aren't sure they owe the amount.",
    "Anyone with old or resold debts in collections.",
    "People who want an attorney on a flat fee instead of a percentage of their debt.",
  ],

  faq: [
    ["What is the difference between debt settlement and debt validation?", "Debt settlement negotiates a discount on the amount a collector claims. Debt validation asks the collector to prove the debt and the amount first. Validating first means you only consider settling debts that hold up."],
    ["Is a debt settlement attorney different from a settlement company?", "Yes. An attorney can defend you in court if a collector sues, raise legal defenses and file claims for violations. A settlement company can only negotiate."],
    ["Will I still be able to settle?", "Yes. Settlement remains an option for any debt that holds up. Our attorneys negotiate it as a fallback, not as the first step."],
    ["Can a collector sue me while I'm settling?", "Yes. Collectors can sue while you are in a settlement program. If that happens, you need an answer filed by the deadline, which we handle."],
    ["How much does this cost?", "Your first case evaluation is free. Ongoing representation is a flat monthly fee, not a percentage of your debt."],
  ],

  bottomCta: {
    headline: "Check the debt before you settle it. Get help today.",
    body: "A free review tells you which debts the collector can prove, which it can't, and what a settlement would really cost you.",
    cta: "Get a free case evaluation",
  },

  disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
};
