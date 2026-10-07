/* Credo Legal — Lawsuit — "Sued by a debt buyer" (NEW, search-term gap).
   Proposed 2026-09-30 from the search-term review (now in the Marketing Hub, Ads › New pages).
   Intent: plaintiff-name searches such as "midland credit management lawsuit",
   "lvnv funding llc lawsuit", "credit corp solutions inc suing me", and the
   collection law firms that file for them. They get 0–4% CTR on the generic
   "Creditor Suing You?" ad. The searcher is looking up who is suing them; the
   page names the common debt buyers and explains why ownership is the weak
   point of their case (Credo's validation angle).
   Buyer names are factual page copy only; keep them out of ad text.
   Not live: proposed slug /sued-by-debt-buyer. Phone = the Lawsuit pages'
   number. Draft copy for attorney review. */
window.CREDO = {
  phone: "(718) 521-4060",
  phoneHref: "tel:+17185214060",
  cluster: "Lawsuit",
  angle: "Debt buyer lawsuit. Proof of ownership",
  statute: "Civil procedure / FDCPA / Reg F",

  hero: {
    eyebrow: "Collection lawsuit · Sued by a company you never borrowed from",
    h1: ["Sued by a ", "Debt Buyer", "?"],
    lede: "Our Attorneys Can Make Them Prove They Own Your Debt.",
    filler: "Fill in the form below or call us for a free review of your case.",
  },

  form: {
    steps: [
      { key: "debt", label: "Your debt", n: "01" },
      { key: "situation", label: "Your situation", n: "02" },
      { key: "details", label: "Your details", n: "03" },
    ],
    debtQuestion: "How much is the company suing you for?",
    situationFields: {
      count:    { label: "How many debts do you have?", placeholder: "Select debts", options: ["1 debt", "2–3 debts", "4–5 debts", "6 or more"] },
      type:     { label: "What types of debt do you have?", placeholder: "Select all that apply", multi: true, options: ["Credit card", "Medical bills", "Personal or payday loan", "Auto loan", "Student loan", "Other"] },
      stage:    { label: "What stage is your debt at?", placeholder: "Select debt stage", options: ["Behind on payments", "In collections", "Being sued / served papers", "Judgment entered", "Wage garnishment"] },
      security: { label: "Is your debt secured or unsecured?", placeholder: "Select debt security", options: ["Unsecured (no collateral)", "Secured (collateral)", "Not sure"] },
      more:     { label: "Who is suing you? Tell us more", placeholder: "For example: Midland Funding, LVNV Funding, Cavalry SPV" },
    },
    detailLabels: {
      first: "First name", last: "Last name", phone: "Phone number", email: "Email",
      altPhone: "Alternative phone number", address: "Address", city: "City",
      state: "State", zip: "Zip code", dob: "Date of birth",
    },
    states: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
    situationOptions: [
      "Sued by a company I don't recognize",
      "Sued by a debt buyer's law firm",
      "Just got served / received summons",
      "Response deadline approaching",
      "Default judgment already entered",
      "The debt is several years old",
    ],
    submit: "Get a free case evaluation",
    stateExclusion: "We currently do not service DC, DE, ID, NC, OK, WV, or WY.",
  },

  trust: [
    { n: "44", lbl: "States with licensed attorneys" },
    { n: "$0", lbl: "Cost of your consultation" },
    { n: "Proof", lbl: "Their burden, not yours" },
    { n: "Flat", lbl: "Monthly fee, no contingency" },
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
    headline: "They bought the debt. Now they have to prove it.",
    intro: "Debt buyers such as Midland Funding, LVNV Funding, Cavalry SPV, Portfolio Recovery Associates and Credit Corp buy old accounts in bulk, often for a small fraction of the balance. To win in court, the company suing you has to show it owns your specific account and that the amount is right.",
    bullets: [
      "Demand the bill of sale and the record that names your account.",
      "Check the balance against the original creditor's records.",
      "Check whether the debt is past the statute of limitations.",
      "File your answer and raise every defense before the deadline.",
    ],
  },

  whyChoose: [
    ["We know how debt buyers sue", "Debt buyers and their law firms file suits in high volume and often rely on default judgments. A filed answer changes that."],
    ["We demand proof of ownership", "The company must connect your account to the portfolio it bought. Gaps in that chain are a defense."],
    ["We check the age of the debt", "Old accounts may be past the statute of limitations. Suing on a time-barred debt is itself a violation."],
    ["Attorney assistance from day one", "Licensed attorneys read your summons and confirm your answer deadline in the first conversation."],
    ["Flexible payment plans", "Attorney-led defense on a flat monthly fee."],
  ],

  commonProblems: [
    ["A plaintiff you never did business with", "The company suing you bought the account after the original creditor charged it off. Many people don't recognize the name.", "FDCPA § 1692g"],
    ["No record linking your account", "A bill of sale for thousands of accounts does not prove yours was among them without the account-level record.", "Chain of assignment"],
    ["Balance with added interest and fees", "The amount claimed may include charges the original agreement does not support.", "FDCPA § 1692f(1)"],
    ["Old debts brought back to court", "Accounts past the statute of limitations are still sold, and some are sued on.", "12 C.F.R. § 1006.26(b)"],
    ["Records that can't be authenticated", "The buyer's witness often has no personal knowledge of the original creditor's records.", "FRE 803(6), 901"],
    ["Default judgments from missed deadlines", "Most debt-buyer suits end in default because no answer is filed. An answer puts the burden back on them.", "State civil procedure"],
  ],

  howItWorks: [
    ["Free consultation", "Tell us who is suing you and when you were served. We confirm your answer deadline.", "DAY 0"],
    ["Ownership review", "We look at the complaint, the attached documents and the age of the debt.", "WEEK 1"],
    ["Answer filed", "We file your answer with every defense, including standing and the statute of limitations.", "BY DEADLINE"],
    ["Resolution", "We push for dismissal, and negotiate only when that is the better outcome for you.", "ONGOING"],
  ],

  rights: {
    intro: "When a debt buyer sues, the burden of proof is on them:",
    items: [
      { cite: "Chain of assignment",    label: "Standing to sue",         text: "The company must prove it owns your specific account, not just a portfolio of accounts.", exLabel: "Right", ex: "Bill of sale without your account listed = standing problem." },
      { cite: "FRE 803(6), 901",        label: "Admissible records",      text: "Records from the original creditor must be properly authenticated to be used as evidence.", exLabel: "Right", ex: "A buyer's employee can't always vouch for another company's records." },
      { cite: "12 C.F.R. § 1006.26(b)", label: "No suits on old debts",   text: "A debt collector may not sue or threaten to sue on a debt past the statute of limitations.", exLabel: "Violation", ex: "Time-barred suit = defense, and a possible claim back against them." },
      { cite: "FDCPA § 1692e(2)",       label: "Accurate amount",         text: "Misrepresenting the amount or status of a debt violates federal law.", exLabel: "Violation", ex: "Unsupported fees in the complaint = FDCPA claim." },
      { cite: "FDCPA § 1692g",          label: "Validation",              text: "You can dispute the debt in writing and require the collector to verify it.", exLabel: "Right", ex: "A dispute sent within 30 days of the validation notice pauses collection until they verify." },
    ],
  },

  whoHelps: [
    "Anyone sued by a company they never borrowed from.",
    "People sued over an old credit card, loan or medical account that was sold.",
    "Anyone served by a law firm that files for debt buyers.",
    "People who think the balance claimed is wrong or includes fees they don't owe.",
    "Anyone who wants the company made to prove its case before paying anything.",
  ],

  faq: [
    ["Why is a company I don't know suing me?", "Your original creditor probably sold the account to a debt buyer after it was charged off. The buyer, or a law firm working for it, is now suing in its own name."],
    ["Do they have to prove they own my debt?", "Yes. The company suing you has to show it owns your specific account and that the amount is correct. That proof is often incomplete, which is why an answer matters."],
    ["What if the debt is very old?", "If it is past your state's statute of limitations, a debt collector may not sue on it. That is a defense, and it can also be a violation we raise against them."],
    ["Should I just call the company and set up payments?", "Talk to an attorney first. A payment or a written promise can affect your defenses, including the statute of limitations in some states."],
    ["How much does this cost?", "Your first case evaluation is free. Ongoing defense is a flat monthly fee with flexible payment plans."],
  ],

  bottomCta: {
    headline: "Make them prove it. Get help before your deadline.",
    body: "Debt buyers win most of their cases by default. Filing an answer on time puts the burden back on them. Find out where you stand, for free.",
    cta: "Get a free case evaluation",
  },

  disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
};
