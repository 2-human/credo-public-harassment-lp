/* Credo Legal — Lawsuit — "Sued and can't pay" (NEW, search-term gap).
   Proposed 2026-09-30 from the search-term review (search-terms/index.html).
   Intent: "what happens if a debt collector sues you and you have no money"
   (175 impressions, 0 conversions) and the related "being sued / what do I do"
   questions. The searcher is afraid of the consequences of having no money;
   the live deadline pages answer with urgency instead. This page answers the
   fear first (what can and can't be taken, no jail for debt), then explains
   why an answer still matters.
   Not live: proposed slug /debt-lawsuit-cant-pay. Phone = the Lawsuit pages'
   number. Draft copy for attorney review. */
window.CREDO = {
  phone: "(718) 521-4060",
  phoneHref: "tel:+17185214060",
  cluster: "Lawsuit",
  angle: "Sued with no money. Consequences and options",
  statute: "Civil procedure / exemption law / FDCPA",

  hero: {
    eyebrow: "Collection lawsuit · When you have no money to pay",
    h1: ["Sued Over a Debt You ", "Can't Pay", "?"],
    lede: "You Still Have Options. Our Attorneys Can Help You Answer.",
    filler: "Fill in the form below or call us for a free review of your case.",
  },

  form: {
    steps: [
      { key: "debt", label: "Your debt", n: "01" },
      { key: "situation", label: "Your situation", n: "02" },
      { key: "details", label: "Your details", n: "03" },
    ],
    debtQuestion: "How much are you being sued for?",
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
      "Sued and I have no money to pay",
      "My income is only benefits (Social Security, SSI, VA)",
      "Just got served / received summons",
      "Response deadline approaching",
      "Default judgment already entered",
      "Worried about my paycheck or bank account",
    ],
    submit: "Get a free case evaluation",
    stateExclusion: "We currently do not service DC, DE, ID, NC, OK, WV, or WY.",
  },

  trust: [
    { n: "44", lbl: "States with licensed attorneys" },
    { n: "$0", lbl: "Cost of your consultation" },
    { n: "No jail", lbl: "For owing a consumer debt" },
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
    headline: "Having no money doesn't mean you have no defense.",
    intro: "A lawsuit asks whether you owe the debt, not whether you can pay it today. If you don't answer, the collector usually wins by default and can then go after your wages or bank account. We answer the suit, check the debt, and protect the income the law says they cannot take.",
    bullets: [
      "File your answer so the case is not lost by default.",
      "Check whether the collector can prove the debt and the amount.",
      "Identify income that is protected, such as Social Security, SSI and VA benefits.",
      "Negotiate a payment plan or settlement you can afford, if that is the better path.",
    ],
  },

  whyChoose: [
    ["We start with what they can take", "Many people sued with no money have income or property the law protects. We check that first."],
    ["We still defend the claim", "A defense does not depend on your bank balance. We demand proof of the debt and the amount."],
    ["Your deadline, confirmed", "Most courts allow 20 to 30 days to answer. We confirm yours in the first conversation."],
    ["Attorney assistance from day one", "Licensed attorneys read your summons and explain what happens next, in plain language."],
    ["Flexible payment plans", "A flat monthly fee, sized for people who are short on money."],
  ],

  commonProblems: [
    ["Ignoring the summons because you can't pay", "Not answering is how most debt suits are lost. A default judgment is what allows garnishment.", "State civil procedure"],
    ["Fear of losing benefits", "Social Security, SSI and VA benefits are generally protected from private creditors, including in your bank account.", "31 C.F.R. Part 212"],
    ["Wages at risk after a judgment", "A judgment can lead to wage garnishment, capped for most consumer debts and reduced further by state exemptions.", "15 U.S.C. § 1673"],
    ["Bank account frozen after judgment", "A bank levy can follow a judgment. Protected funds can be claimed back.", "State exemption law"],
    ["Fear of arrest", "You cannot be jailed for owing a consumer debt. Threatening arrest to collect is a violation.", "FDCPA § 1692e(4)"],
    ["Debt the collector can't prove", "Sold or old debts often lack records. That defense exists whether you can pay or not.", "Chain of assignment"],
  ],

  howItWorks: [
    ["Free consultation", "Tell us about the lawsuit and your income. We confirm your answer deadline.", "DAY 0"],
    ["Protected income check", "We identify income and property the collector cannot take, and look at the claim for weaknesses.", "WEEK 1"],
    ["Answer filed", "We file your answer with every available defense before the deadline.", "BY DEADLINE"],
    ["Resolution", "We push for dismissal, or negotiate terms that fit what you can actually pay.", "ONGOING"],
  ],

  rights: {
    intro: "Being sued with no money is stressful, but the law sets limits on what a collector can do:",
    items: [
      { cite: "State civil procedure", label: "Right to answer",        text: "You can answer the lawsuit and make the collector prove its case, whatever your finances.", exLabel: "Right", ex: "No answer = default judgment. An answer = they have to prove it." },
      { cite: "31 C.F.R. Part 212",    label: "Protected benefits",     text: "Federal benefits deposited directly into your account are generally protected from private creditors.", exLabel: "Right", ex: "Banks must protect two months of directly deposited benefits." },
      { cite: "15 U.S.C. § 1673",      label: "Wage cap",               text: "For most consumer debts, no more than 25% of disposable earnings can be garnished.", exLabel: "Right", ex: "Lower near the minimum wage, and lower still in many states." },
      { cite: "FDCPA § 1692e(4)",      label: "No arrest threats",      text: "A collector may not say you will be arrested or jailed for not paying a debt.", exLabel: "Violation", ex: "Arrest threat = FDCPA claim against the collector." },
      { cite: "State exemption law",   label: "Exemptions",             text: "State laws protect some wages, household goods and, in many states, a vehicle and part of your savings.", exLabel: "Right", ex: "Exemptions must be claimed. We claim them for you." },
    ],
  },

  whoHelps: [
    "People sued over a debt with no money to pay it.",
    "Anyone living on Social Security, SSI, VA or other benefits who has been sued.",
    "People afraid a judgment will take their paycheck or bank account.",
    "Anyone who has been told they could be arrested over a debt.",
    "People who need attorney help on a small, flat monthly fee.",
  ],

  faq: [
    ["What happens if a debt collector sues me and I have no money?", "The lawsuit goes ahead either way. If you don't answer, the collector usually gets a default judgment and can then try to garnish wages or levy a bank account. If you answer, the collector has to prove the debt, and protected income stays protected."],
    ["Can I go to jail for not paying a debt?", "No. You cannot be jailed for owing a consumer debt. Ignoring a court order, such as an order to appear, is a different matter, so we make sure you meet every court date."],
    ["Can they take my Social Security or disability?", "Federal benefits are generally protected from private creditors, including when they are deposited in your bank account. We make sure those protections are claimed."],
    ["Is it worth fighting if I can't pay anyway?", "Yes. A judgment can follow you for years and grow with interest. Answering can lead to dismissal, a lower amount, or terms you can manage."],
    ["How much does this cost?", "Your first case evaluation is free. Ongoing representation is a flat monthly fee with flexible payment plans."],
  ],

  bottomCta: {
    headline: "No money to pay is not the same as no defense. Get help today.",
    body: "The answer deadline is the one date that matters most. Find out yours, and what the collector can and cannot take, for free.",
    cta: "Get a free case evaluation",
  },

  disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
};
