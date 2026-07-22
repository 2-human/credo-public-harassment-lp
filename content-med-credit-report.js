/* Credo Legal — Medical Debt / Rights — "Credit Report Removal" angle (Var B).
   Phone (347) 744-9014 (Medical Rights default + general New-Clients line —
   different from /medical-debt-bills-errors which uses (612) 260-9170).
   No structural deviations (6 Who-Helps bullets is fine). Voice fix ×2. */
window.CREDO = {
  phone: "(801) 386-9050", phoneHref: "tel:+18013869050",
  cluster: "Medical Debt", angle: "Rights. Credit report removal",
  statute: "FCRA + FDCPA + CFPB rules",

  hero: {
    eyebrow: "Medical debt · Clean your credit report",
    h1: ["Medical Debt on Your ", "Credit Report", "?"],
    lede: "Our Attorneys Can Help You Remove It.",
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
      "Medical collections currently on report",
      "Paid debt still showing as unpaid",
      "Don't recognize the medical debt",
      "Bill reported before insurance processed",
      "Preparing for mortgage / loan / lease",
      "Inaccurate amount being reported",
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
    headline: "Medical debt on your report? Not a given.",
    intro: "At Credo Legal, we don't accept medical debt on your credit report as a given. We examine the debt's validity, accuracy, and whether federal rule changes apply to remove it.",
    bullets: [
      "Break down what federal law allows on your credit report in plain English: FCRA rights, recent CFPB rule changes, the specific reporting timelines.",
      "Pull all three credit reports, examine the underlying bill, and flag every inaccurate line, outdated entry, or rule-violating collection.",
      "Recommend the specific next step: bureau dispute, direct dispute with the collector, removal claim under recent CFPB rule changes, or another path.",
      "Carry out the path you choose, attorneys handling every letter, filing, and follow-up until the entry is updated or removed.",
    ],
  },

  whyChoose: [
    ["Licensed attorneys. FCRA + FDCPA expertise", "Credit-report disputes backed by legal analysis carry more weight than consumer-filed disputes alone."],
    ["We know the new rules", "CFPB guidance has changed what can appear on your report. We know whether it applies to your debt."],
    ["We challenge what's inaccurate", "Formal legal disputes filed on your behalf, with the collector and the credit bureaus."],
    ["Free consultation", "Know what's on your report and what's removable, at no cost."],
    ["Flexible payment plans", "Legal help that fits your budget."],
  ],

  commonProblems: [
    ["Old medical debts still showing after years", "Collections can linger on credit reports for up to seven years, unless challenged.", "FCRA § 605"],
    ["Paid or settled debts still listed as unpaid", "A debt you resolved may still be dragging your score down if it wasn't properly updated.", "FCRA § 623"],
    ["Inaccurate amounts reported to credit bureaus", "The balance reported may not match what was actually owed.", "FCRA § 623"],
    ["Collections from debts you don't recognize", "Old hospital or specialist bills can surface on your report years later without warning.", "FDCPA § 1692g"],
    ["Bills reported before insurance processed", "Some debts go to collections, and onto your report, before insurance has a chance to pay.", "CFPB rules"],
    ["Duplicate collections for the same bill", "The same debt reported by multiple collection agencies at the same time.", "FCRA § 611"],
  ],

  howItWorks: [
    ["Free consultation", "Tell us what's on your report. We review the debt and how it's being reported, at no cost.", "DAY 0"],
    ["Debt review", "Our attorneys examine the debt's validity, accuracy, and whether federal rule changes apply to remove it.", "WEEK 1"],
    ["Dispute filed", "If grounds exist, we formally dispute the debt with the collector and the credit reporting bureaus.", "WEEK 1–2"],
    ["Resolution", "Invalid or inaccurate debts are removed. Remaining debts are negotiated or resolved to minimize credit damage.", "ONGOING"],
  ],

  rights: {
    intro: "Federal law gives you specific tools to challenge what appears on your credit report.",
    items: [
      { cite: "FCRA § 611",     label: "Right to dispute",          text: "The Fair Credit Reporting Act gives you the right to dispute any inaccurate information on your credit report.", exLabel: "Right", ex: "Inaccurate, outdated, or unverifiable = grounds for removal." },
      { cite: "CFPB rules",     label: "Medical debt restrictions", text: "Recent CFPB guidance has restricted what medical debt can appear on credit reports, some categories must now be removed.", exLabel: "Right", ex: "Paid medical debt under $500. Medical debt < 12 months old. Both excluded." },
      { cite: "FCRA § 623",     label: "Reporting current status",  text: "Paid or settled medical debts should be updated to reflect their current status. If they aren't, that's a reportable violation.", exLabel: "Violation", ex: "Paid debt still showing 'unpaid' = grounds to dispute the furnisher." },
      { cite: "FCRA § 616, 617", label: "Damages for false reporting", text: "Collectors who report inaccurate information may be liable under federal law for damages.", exLabel: "Remedy", ex: "Willful violation = statutory damages + attorney fees." },
      { cite: "FCRA § 611",     label: "Direct dispute right",      text: "You can dispute medical debt directly with credit bureaus, attorney-backed disputes carry additional weight.", exLabel: "Right", ex: "Bureau must investigate within 30 days. Furnisher must verify." },
      { cite: "FCRA § 605",     label: "Removal + score improvement", text: "Successful challenges can result in complete removal and meaningful credit score improvement.", exLabel: "Remedy", ex: "Single medical collection removed = often 30–100 point swing." },
    ],
  },

  whoHelps: [
    "Anyone with medical debt currently showing on their credit report.",
    "People whose credit score has dropped significantly due to medical collections.",
    "Those who paid or settled a medical debt but it's still showing as unpaid or in collections.",
    "Anyone who doesn't recognize a medical collection appearing on their report.",
    "People preparing to apply for a mortgage, car loan, or apartment who need to clean up their credit.",
    "Anyone who wants to know whether recent federal rule changes apply to their specific debt.",
  ],

  faq: [
    ["Can medical debt actually be removed from my credit report?", "Yes, in many cases. Recent CFPB rule changes have restricted the reporting of medical debt significantly. Paid amounts under certain thresholds and recent debts may already be excluded."],
    ["What if the debt is legitimate? Can it still come off my report?", "Possibly. Paid or settled debts should be updated. Even valid debts may be removable if they were reported in error or violate recent CFPB rules."],
    ["How long does medical debt stay on a credit report?", "Up to seven years from the date of first delinquency, but that's the maximum, not a guarantee. Legal disputes can shorten that timeline substantially."],
    ["Will disputing the debt cause any problems?", "No. You have a legal right to dispute inaccurate information. Collectors cannot retaliate against you for exercising this right."],
    ["How much does this cost?", "Your consultation is free. We offer flexible payment plans, and we'll walk you through every option before any commitment."],
  ],

  bottomCta: {
    headline: "Your credit report isn't final. Let's see what can be removed.",
    body: "Medical debt on your credit report costs you in interest rates, loan approvals, and opportunities. Our attorneys work to remove what shouldn't be there.",
    cta: "Get a free case evaluation",
  },

  disclaimer: "This is attorney advertising. Prior results do not guarantee a similar outcome.",
};
