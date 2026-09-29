/* Credo Legal: state pages (13) and /letter, in the new landing-page design.
   Design-alignment preview, 2026-09-28 (staging design-system plan, DS-7).

   Source: the live staging pages (staging.credolegal.com/ohio, /utah, ... and
   /letter), captured 28 Sep. All 13 state pages are the same page; only the
   state name changes (4 lines). /letter is the same page with a different
   hero headline and no state name.

   One file serves all 14 pages:  ?state=ohio  (any of the 13 slugs)  or  ?page=letter.

   Copy rule: live wording is kept wherever the live page has it. Blocks the new
   template has but the live page does not (statute tags on the problem cards,
   "Who this helps", the structured rights list, step markers) are built from
   live sentences where possible; the rights items are the approved wording from
   the act-fast prototype. Anything not on the live page is marked NEW below and
   needs approval before it goes into Webflow. */
(function () {
  var STATES = {
    'california': 'California', 'colorado': 'Colorado', 'florida': 'Florida', 'kansas': 'Kansas',
    'kentucky': 'Kentucky', 'maryland': 'Maryland', 'minnesota': 'Minnesota', 'missouri': 'Missouri',
    'new-jersey': 'New Jersey', 'new-york': 'New York', 'ohio': 'Ohio', 'south-dakota': 'South Dakota', 'utah': 'Utah'
  };
  var qs = new URLSearchParams(window.location.search);
  var isLetter = (qs.get('page') || '').toLowerCase() === 'letter';
  var slug = (qs.get('state') || 'ohio').toLowerCase();
  var st = isLetter ? '' : (STATES[slug] || 'Ohio');
  var inSt = st ? ' in ' + st : '';

  window.CREDO_PAGE = { kind: isLetter ? 'letter' : 'state', state: st, slug: isLetter ? 'letter' : slug };
  document.title = 'Credo Legal | ' + (isLetter ? 'Letter' : st) + ' · new design preview';

  window.CREDO = {
    // Live number on all 13 state pages and /letter.
    phone: "(718) 865-8350", phoneHref: "tel:+17188658350",
    cluster: isLetter ? "Legacy" : "State pages",
    angle: isLetter ? "Harassment (letter)" : "State: " + st,
    statute: "FDCPA",

    hero: isLetter ? {
      eyebrow: "Debt harassment",
      // Live /letter hero, verbatim.
      h1: ["Creditors ", "Harassing", " You Over Debt?"],
      lede: "Our Attorneys Can Help Make Them Stop.",
      filler: "Fill in the form below or call us for a free review of your case.",
    } : {
      eyebrow: "Serving " + st + " residents",
      // Live state H1, verbatim (same on all 13).
      h1: ["Let's See If We Can Help You with ", "Creditor Harassment", " and Debt"],
      // Live filler + live "Serving {State} residents." line, moved into the hero so the state shows above the fold.
      lede: "Serving " + st + " residents. Fill in the short form below to see if you qualify.",
      filler: "Or call us for a free review of your case.",
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
        "Calls to my workplace or family",
        "Threats or harassment",
        "Being sued / served papers",
        "Repossession",
        "Billing errors",
        "Other",
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
      ["10 million+", "In debt wiped"],
      ["500k", "Debts settled every month"],
    ],

    // Live "Tired of unsecured debt..." section: headline shortened to its live last sentence; body verbatim.
    whatWeDo: {
      headline: "Let us fight for you" + inSt + ".",
      intro: "Tired of unsecured debt and harassing creditors controlling you and your life? Your fight for freedom from unsecured debt starts here. Unlike traditional debt relief programs, we explore ways to invalidate your debt, protect your rights, and deliver customized resolutions that fit your needs.",
      bullets: [
        "We use the law to try and remove debts from creditor files.",
        "Attorney representation from Day 1, including defense against lawsuits.",
        "We seek to hold creditors accountable for any harassment or violations of federal laws, such as the Fair Debt Collection Practices Act and Fair Credit Billing Act.",
      ],
    },

    // Live "Why Choose Credo Legal?" list, verbatim.
    whyChoose: [
      ["We fight to invalidate debt", "If your debt is invalidated, it disappears from your credit report and the records of creditors or debt collectors."],
      ["Legal representation", "Our attorneys are with you every step of the way, including if creditors take legal action."],
      ["We investigate creditor harassment", "Illegal calls, workplace disruptions, family contact: we'll work to stop them and take legal action when necessary."],
      ["Tailored payment plans", "Flexible installment options and hardship consultations ensure a program that fits your budget."],
      ["Comprehensive support", "From litigation to settlement negotiations, we address every aspect of your unsecured debt."],
    ],

    // Live "What problems can we try to help you solve?" (4 services + 3 common issues), as 6 cards.
    // Card titles are live; bodies are built from the live section text; statute tags NEW.
    commonProblems: [
      ["Debt collectors calling your workplace or family", "Contacting third parties about your debt is restricted under federal law. We work to stop it.", "§ 1692c(b)"],
      ["Unlawful threats and harassment by creditors", "Threats and abusive collection tactics are prohibited. We seek to hold creditors accountable.", "§ 1692d"],
      ["Lawsuits or summons over unpaid unsecured debts", "Attorney representation from day one, including defense against lawsuits over unsecured debts in excess of $10,000.", "Lawsuit defense"],
      ["Unsecured debt (e.g., medical bills)", "We review your debts for violations and invalidation opportunities.", "Unsecured debt"],
      ["Repossession defense", "Legal protection when a creditor moves to take back property.", "Repossession"],
      ["Incorrect charges and unfair billing", "The FCBA ensures accurate billing and gives you the power to dispute incorrect charges.", "FCBA"],
    ],

    // NEW: the live page has no "who this helps" block; items built from the live FAQ and problem list.
    whoHelps: [
      "People struggling with unsecured debt (e.g. medical bills) seeking legal and effective relief.",
      "Anyone whose workplace or family is being contacted by debt collectors.",
      "Anyone facing threats or harassment from creditors.",
      "Anyone who has been sued or served a summons over an unsecured debt.",
      (st ? st + " residents who want" : "Anyone who wants") + " attorney representation from day one.",
    ],

    // Live "How our program works", verbatim; step markers NEW.
    howItWorks: [
      ["Free consultation", "Share your situation, and we'll explain how we can help.", "Consultation"],
      ["Debt investigation", "We review your debts for violations and invalidation opportunities.", "Investigation"],
      ["Legal representation", "Our attorneys defend you from creditor harassment and lawsuits.", "Representation"],
      ["Work towards debt resolution", "Through litigation or settlement, we work toward the best possible outcome.", "Resolution"],
    ],

    // Intro is the live sentence; items NEW (approved wording from the act-fast prototype, plus one FCBA item).
    rights: {
      intro: "We're here to enforce your rights under federal laws like the FDCPA and the FCBA.",
      items: [
        { cite: "§ 1692c(b)",       label: "Third-party contact", text: "Collectors cannot contact your employer, family, or neighbors about your debt.", exLabel: "Violation", ex: "Each third-party contact about your debt = separate claim." },
        { cite: "§ 1692e(4),(5)",   label: "False threats",       text: "Threatening arrest, wage garnishment, or legal action the collector cannot take is prohibited.", exLabel: "Violation", ex: "'We'll have you arrested' = federal violation." },
        { cite: "15 U.S.C. § 1666", label: "Billing errors",      text: "The Fair Credit Billing Act lets you dispute incorrect charges on your credit card bill.", exLabel: "Right", ex: "Dispute the charge in writing; the creditor must investigate." },
        { cite: "§ 1692k(a)(2)(A)", label: "Statutory damages",   text: "Each FDCPA violation entitles you to up to $1,000 in statutory damages, plus actual damages and attorney fees from the collector.", exLabel: "Remedy", ex: "$1,000 per lawsuit. Fees recoverable from the collector." },
      ],
    },

    // Live FAQ, verbatim (phone number in the last answer is the live one).
    faq: [
      ["Who is this program for?", "People struggling with unsecured debt (e.g. medical bills) seeking legal and effective relief."],
      ["Does this program cover secured debt?", "No, this program only covers unsecured debts like credit card bills and medical expenses."],
      ["What federal protections do I have against creditors?", "You have rights under the Fair Debt Collection Practices Act (FDCPA) and other consumer protection laws."],
      ["What makes Credo Legal different from other debt relief services?", "Credo Legal offers a legal approach with experienced attorneys to help resolve your debt efficiently."],
      ["How do I get started?", "You can get started by filling out our online form or calling the customer service team at (212) 561-5902."],
    ],

    // Live closing block, verbatim.
    bottomCta: {
      headline: "Work Towards Living Debt Free Today!",
      body: "Our experienced law firm is here to guide you every step of the way.",
      cta: "Get your free case evaluation now",
    },

    disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
  };
})();
