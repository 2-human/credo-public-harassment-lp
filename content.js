/* Credo Legal — FDCPA Harassment (Rights-Education champion) content model.
   Voice-corrected per brand rules: "our attorneys" not "real attorneys",
   no forbidden openers, statutes cited by section, no emojis / exclamations. */
window.CREDO = {
  phone: "(443) 483-4080",
  phoneHref: "tel:+14434834080",
  cluster: "Harassment",
  angle: "Rights education",
  statute: "FDCPA",

  hero: {
    eyebrow: "FDCPA · Know your rights",
    // "act" is emphasized in red via <em>
    h1: ["Our attorneys explain your rights, then ", "act", " on them."],
    lede: "The Fair Debt Collection Practices Act limits what a collector can do. We review the calls and letters you've received, flag every likely violation, and send the notice that makes them stop.",
    filler: "Fill in the form or call for a free review of your case.",
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
      type:     { label: "What type of debt do you have?", placeholder: "Select debt type", options: ["Credit card", "Medical bills", "Personal or payday loan", "Auto loan", "Student loan", "Other"] },
      stage:    { label: "What stage is your debt at?", placeholder: "Select debt stage", options: ["Behind on payments", "In collections", "Being sued / served papers", "Judgment entered", "Wage garnishment"] },
      security: { label: "Is your debt secured with collateral or unsecured?", placeholder: "Select debt security", options: ["Unsecured (no collateral)", "Secured (collateral)", "Not sure"] },
      more:     { label: "Tell us more about your situation", placeholder: "Tell us more about your situation" },
    },
    detailLabels: {
      first: "First name", last: "Last name", phone: "Phone number", email: "Email",
      altPhone: "Alternative phone number", address: "Address", city: "City",
      state: "State", zip: "Zip code", dob: "Date of birth",
    },
    states: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
    // FDCPA violation checklist — used by the Variant D diagnostic self-check.
    situationOptions: [
      "Calls before 8 AM or after 9 PM",
      "Calls to my workplace",
      "Contacting my family or friends",
      "Threats of arrest or lawsuit",
      "Claiming to be a lawyer or official",
      "Refusing to verify the debt",
    ],
    submit: "Get a free case evaluation",
    stateExclusion: "We currently do not service DC, DE, ID, OK, WV, or WY.",
  },

  trust: [
    { n: "44", lbl: "States with licensed attorneys" },
    { n: "$0", lbl: "Cost of your consultation" },
    { n: "FDCPA", lbl: "The statute we practice in" },
    { n: "Flat", lbl: "Monthly fee, no contingency" },
  ],

  // Review badges + headline metrics (from the original prototype trust band).
  // NOTE: ratings, review counts, and the $84M / 10,000 figures are pending
  // compliance / litigation sign-off before launch.
  reviews: {
    bbb:        { title: "Accredited Business", meta: "A rating · 4.59 / 5" },
    trustpilot: { title: "Excellent",           meta: "4.5 / 5 · 1,247 reviews" },
    google:     { title: "Google Reviews",      meta: "4.7 / 5" },
  },
  metrics: [
    ["$84M+", "In debt wiped"],
    ["10,000+", "Cases won"],
  ],

  whatWeDo: {
    intro: "We start with education, because knowing your rights is the first form of protection.",
    bullets: [
      "Break down the FDCPA in plain English: what a collector can do, what they can't, and where the line sits.",
      "Review every call, letter, and contact you've received, and flag each likely violation.",
      "Recommend the specific next step: cease letter, validation dispute, legal action, or a combination.",
      "Carry out the path you choose, with attorneys handling every filing and response.",
    ],
  },

  whyChoose: [
    ["Licensed attorneys, not a fact sheet", "We review your specific situation and tell you where you stand."],
    ["We know the FDCPA", "The statute is the core of our practice. We name the section a collector violated, not a general grievance."],
    ["We explain before we act", "You understand your options clearly before we recommend anything or ask you to commit."],
    ["Free consultation", "No cost to learn whether a collector has violated your rights."],
    ["Fees recoverable from the collector", "Under §1692k, a successful claim can shift your attorney fees onto the collector."],
  ],

  commonProblems: [
    ["Calls before 8 AM or after 9 PM", "Prohibited under §1692c(a). Each one is a documented violation.", "§ 1692c(a)"],
    ["Contact at your workplace", "A collector can't call you at work once they know your employer objects.", "§ 1692c(a)"],
    ["Reaching out to family or friends", "Third-party contact is strictly limited under the FDCPA.", "§ 1692c(b)"],
    ["Threats of arrest", "Debt is a civil matter. Threatening jail is illegal.", "§ 1692e"],
    ["Posing as an attorney or official", "Misrepresenting identity is a federal violation.", "§ 1692e"],
    ["Refusing to verify the debt", "Request written verification and collection must pause until they provide it.", "§ 1692g"],
  ],

  howItWorks: [
    ["Free consultation", "Tell us what the collector has been doing. We explain your FDCPA rights and whether they've been crossed.", "DAY 0"],
    ["Case review", "Our attorneys examine the collector's conduct against the specific requirements of the FDCPA.", "WEEK 1"],
    ["Recommendation", "We outline your options clearly: cease letter, formal complaint, legal claim, or a combination.", "WEEK 1–2"],
    ["Action", "If you choose to move forward, we handle everything, from stopping the calls to pursuing violations.", "ONGOING"],
  ],

  rights: {
    intro: "The Fair Debt Collection Practices Act creates specific, enforceable rules a collector must follow.",
    items: [
      { cite: "§ 1692c(a)", label: "Calling hours", text: "A collector cannot call before 8 AM or after 9 PM in your local time zone.", exLabel: "Violation", ex: "A 7:14 AM call to \u201cremind\u201d you about a balance." },
      { cite: "§ 1692c(c)", label: "Cease contact", text: "Tell them in writing to stop. Contact must end except to confirm receipt or to give notice of legal action.", exLabel: "Violation", ex: "You send a cease letter Tuesday. They call Friday to \u201cfollow up.\u201d" },
      { cite: "§ 1692g", label: "Validation", text: "Demand written verification of any debt. Collection activity pauses until they provide it.", exLabel: "Right", ex: "You request verification; the collector must stop until it arrives." },
      { cite: "§ 1692d", label: "Harassment", text: "No abusive, obscene, or threatening language, under any circumstances.", exLabel: "Violation", ex: "Repeated calls intended to annoy, or profane language on a voicemail." },
      { cite: "§ 1692e", label: "False statements", text: "No claiming to be an attorney, police officer, or government official.", exLabel: "Violation", ex: "A caller says a warrant will issue unless you pay today." },
      { cite: "§ 1692k", label: "Damages", text: "A violation can carry up to $1,000 in statutory damages, plus attorney fees paid by the collector.", exLabel: "Remedy", ex: "Fees and statutory damages recoverable from the collector." },
    ],
  },

  whoHelps: [
    "You're being contacted by a collector and aren't sure what the rules are.",
    "You suspect a collector crossed a legal line but aren't certain.",
    "You're researching your options before deciding how to respond.",
    "You want to understand every legal option before taking any action.",
    "You've been threatened, misled, or pressured and want to know if it was legal.",
  ],

  faq: [
    ["What is the FDCPA, and does it apply to me?", "The Fair Debt Collection Practices Act is a federal law that regulates how third-party debt collectors can contact and treat you. It applies to most consumer debts in collection."],
    ["What are the most common FDCPA violations?", "Calling at illegal hours, contacting your employer or family, threatening arrest, using abusive language, and refusing to verify a debt when you ask."],
    ["Do I have to prove I was harmed to have a claim?", "No. The FDCPA creates liability for violations themselves, not just for proven harm. If a collector violates the statute, you have a claim."],
    ["What if I'm not sure whether my collector broke the law?", "That is what the free consultation is for. You tell us what happened, and we tell you whether it was a violation."],
    ["How much does this cost?", "Your consultation is free. We work on a flat monthly fee, and under §1692k, attorney fees are recoverable from the collector if your claim succeeds."],
  ],

  bottomCta: {
    headline: "Know your rights before you make any decision.",
    body: "Collectors count on you not knowing the rules. Our attorneys do, and a free consultation puts that knowledge in your hands.",
    cta: "Get a free case evaluation",
  },

  disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
};
