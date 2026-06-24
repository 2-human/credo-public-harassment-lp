/* Credo Legal — Harassment / Multiple Collectors — "Overwhelm relief / One attorney" angle.
   Source: live re-fetch of https://start.credolegal.com/multiple-collectors-one-attorney
   (2026-06-23), supersedes the 2026-06-01 capture which had bracketed placeholders.

   Sibling of /multiple-collectors-more-money in the Multiple_Collectors ad group:
   same H1, same phone (347) 474-9602, different lede + body emphasis.
   This LP frames the situation as overwhelm and offers consolidation; the
   sibling frames it as opportunity and offers aggregated damages.

   Per-LP deviations resolved (same defaults as URL #5):
   - H1 typo on live: "Harasssing" (3 s's) → "Harassing".
   - Browser tab typo: "Ypu" → "You" (irrelevant here; we set a new
     SEO-tuned title in the HTML head).
   - Common Problems had 5 bullets (std 6) → added 6th "Calls about
     debts you've already paid or settled" (§ 1692e(2)) matching the
     cluster pattern and the "Collectors You Don't Recognize" theme.
   - Why Choose bullet 4 label: "Real Lawyers, Not a Settlement Company"
     → "Our Lawyers, Not a Settlement Company" (voice rule).

   Universal fixes:
   - Live page WWD bullet 4 already shows "Our attorneys" (capture's
     flagged "Real attorneys" was fixed upstream).
   - State exclusion list includes NC.

   Design enhancements applied:
   - Common Problems gains FDCPA § citations
   - How It Works gains time markers (DAY 0 → ONGOING)
   - Your Rights bullets promoted to structured items
   - Trust strip = prototype's compliance-safe credentials. */
window.CREDO = {
  phone: "(347) 474-9602",
  phoneHref: "tel:+13474749602",
  cluster: "Harassment",
  angle: "Multiple Collectors. Overwhelm relief",
  statute: "FDCPA",

  hero: {
    eyebrow: "FDCPA · One attorney, every collector",
    // Same H1 as the sibling /multiple-collectors-more-money LP; typo
    // "Harasssing" (3 s's) on live → "Harassing" here. "Multiple"
    // emphasized in red, matching the sibling for visual cluster
    // consistency.
    h1: ["", "Multiple", " Debt Collectors Harassing You?"],
    // Live subhead. The relief framing differentiates this from
    // the sibling LP's "Make Them Pay" angle.
    lede: "Get one attorney to handle them all.",
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
      "Calls before 8 AM or after 9 PM",
      "Calls to my workplace",
      "Contacting my family or friends",
      "Threats of arrest or lawsuit",
      "Claiming to be a lawyer or official",
      "Refusing to verify the debt",
    ],
    submit: "Get a free case evaluation",
    stateExclusion: "We currently do not service DC, DE, ID, NC, OK, WV, or WY.",
  },

  trust: [
    { n: "44", lbl: "States with licensed attorneys" },
    { n: "$0", lbl: "Cost of your consultation" },
    { n: "FDCPA", lbl: "The statute we practice in" },
    { n: "Flat", lbl: "Monthly fee, no contingency" },
  ],

  reviews: {
    bbb:        { title: "Accredited Business", meta: "A rating · 4.59 / 5" },
    trustpilot: { title: "Excellent",           meta: "4.5 / 5 · 1,247 reviews" },
    google:     { title: "Google Reviews",      meta: "4.7 / 5" },
  },
  metrics: [
    ["$84M+", "In debt wiped"],
    ["10,000+", "Cases won"],
  ],

  // ---- WHAT WE DO — live intro paragraph + 5 bullets (live verbatim) ----
  whatWeDo: {
    headline: "Every collector. One legal strategy.",
    intro: "Multiple-collector situations are our specialty. When several debt collectors are calling at once, the FDCPA applies to all of them. At Credo Legal, we send cease letters to every active collector simultaneously, coordinate your defense across all accounts, and track violations from every source under one legal strategy. You don't have to manage each collector separately, we manage all of them from day one.",
    bullets: [
      "Cease letters sent to every active collector, not just the loudest one.",
      "Violations tracked and documented across every collector and every account.",
      "One coordinated legal strategy covering your entire situation.",
      "Our attorneys managing the full picture, from the first call.",
      "Flexible payment plans to make comprehensive representation accessible.",
    ],
  },

  // ---- WHY CHOOSE — live copy, voice fix on bullet 4 label ----
  whyChoose: [
    ["One attorney handles every collector", "You don't need a separate response for each one. We coordinate the full legal reply across all active collectors simultaneously, from day one."],
    ["Cease letters to all of them, immediately", "Every active collector gets a formal cease-communication letter the day you enroll. Contact from all of them must stop."],
    ["Violations tracked across every account", "When multiple collectors are calling, violations multiply. We document every breach, from every source, as part of one organized case file."],
    // Voice fix: "Real Lawyers" → "Our Lawyers" in the label.
    ["Our lawyers, not a settlement company", "Cease letters from attorneys have weight, and if collectors ignore them, we have real legal remedies to pursue."],
    ["Flexible payment plans", "One legal engagement covers all your collectors. It's more efficient and more affordable than it sounds."],
  ],

  // ---- COMMON PROBLEMS — live 5 + 1 added to hit standard 6 count.
  //      Statute § citations added. ----
  commonProblems: [
    ["Multiple collectors calling at once", "Different agencies, different debts, different names calling the same phone. The confusion is often intentional. We cut through all of it with a single coordinated response.", "§ 1692a(6)"],
    ["Calls to your workplace or family", "When collectors cannot reach you directly, they expand outward. Contacting your employer or relatives is a federal violation from any collector, not just the most aggressive one.", "§ 1692c(a)(3), (b)"],
    ["Threats from more than one source", "Collectors threatening arrest, legal action, or wage seizure without intention to follow through. Each such instance, from each collector, is a standalone FDCPA violation with its own legal consequence.", "§ 1692e(4),(5)"],
    ["Calls before 8 AM or after 9 PM", "Federal law applies to every collector equally. Timing violations from any of them are actionable, and we track all of them.", "§ 1692c(a)(1)"],
    ["Collectors you don't recognize", "Debts are frequently sold between agencies. You may be receiving calls about accounts you thought were settled, from collectors who may not even have the documentation to prove you owe anything.", "§ 1692g"],
    // Synthesized 6th row to match standard cluster count.
    ["Calls about debts you've already paid or settled", "Misrepresenting the amount owed, or that you owe anything at all on a resolved debt, is a federal violation regardless of which collector says it.", "§ 1692e(2)"],
  ],

  // ---- HOW IT WORKS — live copy + time markers ----
  howItWorks: [
    ["Free consultation", "Tell us how many collectors are calling and what they have been doing. We assess the full picture at no cost and explain your options.", "DAY 0"],
    ["Cease letters to every collector on day one", "Our attorneys send a formal cease-communication letter to each active collector the day you enroll. All contact from all of them must stop.", "DAY 0"],
    ["Violations tracked across all accounts", "From the moment we engage, every subsequent contact from any collector is documented as a potential $1,000 FDCPA violation. We track all of them in one place.", "WEEK 1+"],
    ["One coordinated resolution", "We manage the legal strategy across all collectors simultaneously, pursuing every valid claim and resolving the full situation as efficiently as possible.", "ONGOING"],
  ],

  // ---- YOUR RIGHTS — live bullets promoted to structured items ----
  rights: {
    intro: "The FDCPA applies to every third-party debt collector, regardless of how many are contacting you.",
    items: [
      { cite: "§ 1692c(c)",       label: "Cease request applies to each collector", text: "Once a collector receives a written cease request, all contact must stop. Every call after that is a federal violation.", exLabel: "Right", ex: "Send one cease letter per collector. Contact from each must stop." },
      { cite: "§ 1692c(a)(1)",    label: "Calling hours",         text: "Collectors cannot call before 8 AM or after 9 PM in your local time zone.", exLabel: "Violation", ex: "Three collectors. A 7:14 AM call from any one of them is its own violation." },
      { cite: "§ 1692c(a)(3), (b)", label: "Workplace + third-party contact", text: "Collectors cannot contact your employer, family, or neighbors about your debt.", exLabel: "Violation", ex: "Any collector reaching out to your sister or your HR rep = separate claim." },
      { cite: "§ 1692e(4),(5)",   label: "False threats",         text: "Threatening arrest, wage garnishment, or legal action they cannot actually take is a federal violation.", exLabel: "Violation", ex: "Multiple collectors each threatening jail = multiple claims." },
      { cite: "§ 1692k(a)(2)(A)", label: "Statutory damages + fees", text: "FDCPA violations entitle you to up to $1,000 in statutory damages, plus attorney fees recovered from the collector.", exLabel: "Remedy", ex: "Up to $1,000 per claim. Fees recoverable from each collector." },
      { cite: "§ 1692k",          label: "Multiple sets of claims", text: "Multiple collectors mean multiple sets of potential claims. Each one is subject to the same federal law.", exLabel: "Right", ex: "Each collector's violations form an independent claim." },
    ],
  },

  // ---- WHO HELPS — live copy, verbatim ----
  whoHelps: [
    "Anyone receiving calls from two or more debt collectors at the same time.",
    "People overwhelmed by simultaneous harassment across multiple accounts or debt types.",
    "Those being contacted at work, through family members, or at illegal hours by any of their collectors.",
    "Anyone who wants one attorney to handle everything, not a different response for every collector.",
    "People who want clarity and control over a situation that currently feels completely out of hand.",
  ],

  // ---- FAQ — live copy, verbatim (already at standard 5) ----
  faq: [
    ["Can one attorney really handle all my collectors together?", "Yes. The FDCPA applies to all third-party debt collectors. We send cease letters to each of them simultaneously and coordinate legal strategy across all accounts. You make one call. We manage the rest."],
    ["Do I have to deal with each collector separately?", "No, that is exactly what we are here to prevent. We handle all active collectors on your behalf. You're not managing five problems. You have one attorney managing all of them."],
    ["What if different collectors are calling about different types of debt?", "The FDCPA covers all unsecured debt types, including credit cards, medical bills, payday loans, and utilities. Regardless of what each collector is calling about, the same federal law governs how they are allowed to treat you."],
    ["What happens if a collector keeps calling after the cease letter?", "Every call after a written cease request is a federal violation worth up to $1,000 in statutory damages. With multiple collectors, violations can multiply quickly. We track and document each one across every account."],
    ["How much does this cost?", "Your consultation is free. We offer flexible payment plans, and in cases where we pursue FDCPA violations, collector-paid penalties may offset costs entirely."],
  ],

  // ---- BOTTOM CTA — live copy, verbatim ----
  bottomCta: {
    headline: "One call ends the chaos for all of them.",
    body: "Multiple collectors do not mean multiple problems. They mean one attorney, one plan, and one solution that covers everything. Find out what we can do, for free.",
    cta: "Get a free case evaluation",
  },

  disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
};
