#!/usr/bin/env node
/* Generates statute-map.html from every content-*.js file in this folder.
 * For each LP it lists What We See (commonProblems) + FAQ, maps each to the
 * relevant FDCPA section, and links to the live LP item in a new tab.
 *
 * Run from this folder:    node _gen-statute-map.js > statute-map.html
 * Or:                       node _gen-statute-map.js
 *                          (writes ./statute-map.html in place) */
const fs = require('fs');
const path = require('path');

/* ─── LP catalog (mirror of review.html LPS, slimmed) ─────────────────────── */
const LPS = [
  { c:"Harassment", n:"FDCPA Action — We Sue Them",         content:"content-attorney.js",         file:"https://staging.credolegal.com/debt-harassment-fight-back-fdcpa-attorney" },
  { c:"Harassment", n:"FDCPA Rights Education (verbatim)",  content:"content-rights-verbatim.js",  file:"https://staging.credolegal.com/debt-harassment-know-your-rights-fdcpa" },
  { c:"Harassment", n:"Stop the Calls — Emotional Relief",  content:"content-stop-calls.js",       file:"https://staging.credolegal.com/debt-harassment-stop-calls" },
  { c:"Harassment", n:"$1,000 Per Violation",               content:"content-violations.js",       file:"https://staging.credolegal.com/debt-harassment-make-them-pay-violations" },
  { c:"Harassment", n:"Multiple Collectors — Aggregation",  content:"content-more-money.js",       file:"https://staging.credolegal.com/debt-harassment-make-them-pay-multiple-collectors" },
  { c:"Harassment", n:"Multiple Collectors — Overwhelm",    content:"content-one-attorney.js",     file:"https://staging.credolegal.com/multiple-collectors-one-attorney" },

  { c:"Lawsuit", n:"Defense — Level the Field",             content:"content-lawsuit-attorney.js",    file:"https://staging.credolegal.com/debt-lawsuit-fight-back-attorney" },
  { c:"Lawsuit", n:"Defense — Fight Back",                  content:"content-lawsuit-fight-back.js",  file:"https://staging.credolegal.com/debt-lawsuit-fight-back-creditor-suing" },
  { c:"Lawsuit", n:"Served Papers — Explore Options",       content:"content-lawsuit-options.js",     file:"https://staging.credolegal.com/debt-lawsuit-know-your-rights-options" },
  { c:"Lawsuit", n:"Collection — Proof Challenge",          content:"content-lawsuit-proof.js",       file:"https://staging.credolegal.com/debt-lawsuit-demand-proof-prove-it" },
  { c:"Lawsuit", n:"Collection — Respond on Time (CHAMPION)", content:"content-lawsuit-respond.js",   file:"https://staging.credolegal.com/debt-lawsuit-respond-on-time" },
  { c:"Lawsuit", n:"Served Papers — Act Today",             content:"content-lawsuit-summons.js",     file:"https://staging.credolegal.com/debt-lawsuit-respond-served-papers" },

  { c:"Garnishment", n:"Fight Active Garnishment",          content:"content-garn-attorney.js",     file:"https://staging.credolegal.com/debt-garnishment-fight-back-attorney" },
  { c:"Garnishment", n:"Claim Your Exemptions",             content:"content-garn-exemptions.js",   file:"https://staging.credolegal.com/debt-garnishment-reduce-exemptions" },
  { c:"Garnishment", n:"Prevention — Stop It First",        content:"content-garn-prevention.js",   file:"https://staging.credolegal.com/debt-garnishment-respond-before-it-starts" },

  { c:"Payday Loan", n:"Stop the Calls",                    content:"content-payday-harassment.js",     file:"https://staging.credolegal.com/debt-payday-loan-stop-calls" },
  { c:"Payday Loan", n:"Rights Education",                  content:"content-payday-rights.js",         file:"https://staging.credolegal.com/debt-payday-loan-know-your-rights-explained" },
  { c:"Payday Loan", n:"Violations Payoff",                 content:"content-payday-violations.js",     file:"https://staging.credolegal.com/debt-payday-loan-make-them-pay-violations" },
  { c:"Payday Loan", n:"Use Your Rights — Fight Back",      content:"content-payday-fight-back.js",     file:"https://staging.credolegal.com/debt-payday-loan-fight-back-illegal-loan" },
  { c:"Payday Loan", n:"Lawsuit — Proof Challenge",         content:"content-payday-lawsuit-proof.js",  file:"https://staging.credolegal.com/debt-payday-loan-demand-proof-seems-wrong" },
  { c:"Payday Loan", n:"Lawsuit — Respond on Time",         content:"content-payday-lawsuit-respond.js",file:"https://staging.credolegal.com/debt-payday-loan-respond-sued" },

  { c:"Medical Debt", n:"Lawsuit — Billing Errors",         content:"content-med-bills-errors.js",     file:"https://staging.credolegal.com/debt-medical-demand-proof-bill-errors" },
  { c:"Medical Debt", n:"Credit Report Removal",            content:"content-med-credit-report.js",    file:"https://staging.credolegal.com/debt-medical-demand-proof-unrecognized" },
  { c:"Medical Debt", n:"Rights Education",                 content:"content-med-fdcpa-rights.js",     file:"https://staging.credolegal.com/debt-medical-know-your-rights-fdcpa" },
  { c:"Medical Debt", n:"Lawsuit — Respond on Time",        content:"content-med-lawsuit-respond.js",  file:"https://staging.credolegal.com/debt-medical-respond-sued" },

  { c:"Credit Card", n:"Negotiation — Challenge Validity",  content:"content-cc-challenge.js",            file:"https://staging.credolegal.com/debt-credit-card-demand-proof-challenge" },
  { c:"Credit Card", n:"Lawsuit — Proof / Records",         content:"content-cc-lawsuit-records.js",      file:"https://staging.credolegal.com/debt-credit-card-demand-proof-records" },
  { c:"Credit Card", n:"Lawsuit — Respond on Time",         content:"content-cc-lawsuit-respond.js",      file:"https://staging.credolegal.com/debt-credit-card-respond-sued" },
  { c:"Credit Card", n:"Negotiation — Negotiate Down",      content:"content-cc-negotiation.js",          file:"https://staging.credolegal.com/debt-credit-card-reduce-negotiation" },
  { c:"Credit Card", n:"Harassment — Stop Calls",           content:"content-cc-stop-calls.js",           file:"https://staging.credolegal.com/debt-credit-card-stop-calls" },
  { c:"Credit Card", n:"Harassment — $1,000 Per Violation", content:"content-cc-violations.js",           file:"https://staging.credolegal.com/debt-credit-card-make-them-pay-violations" },

  { c:"All-States", n:"FDCPA — Act Fast (overlay)",         content:"content-act-fast.js",             file:"https://staging.credolegal.com/debt-harassment-respond-act-fast" },
];

/* ─── FDCPA statute dictionary ────────────────────────────────────────────
 * Source: 15 U.S.C. § 1692 et seq. (Fair Debt Collection Practices Act).
 * Excerpts kept faithful to the U.S. Code; long enumeration lists trimmed
 * to the most-cited sub-paragraphs to keep the page scannable. */
const STATUTE = {
  '§ 1692a(6)':       { title: 'Definition — "debt collector"',
                        text: 'The term "debt collector" means any person who uses any instrumentality of interstate commerce or the mails in any business the principal purpose of which is the collection of any debts, or who regularly collects or attempts to collect, directly or indirectly, debts owed or due or asserted to be owed or due another. Notwithstanding the exclusion provided by clause (F) of the last sentence of this paragraph, the term includes any creditor who, in the process of collecting his own debts, uses any name other than his own which would indicate that a third person is collecting or attempting to collect such debts.' },
  '§ 1692c(a)(1)':    { title: 'Communication at inconvenient time',
                        text: 'Without the prior consent of the consumer given directly to the debt collector or the express permission of a court of competent jurisdiction, a debt collector may not communicate with a consumer in connection with the collection of any debt — at any unusual time or place or a time or place known or which should be known to be inconvenient to the consumer. In the absence of knowledge of circumstances to the contrary, a debt collector shall assume that the convenient time for communicating with a consumer is after 8 o\\u2019clock antemeridian and before 9 o\\u2019clock postmeridian, local time at the consumer\\u2019s location.' },
  '§ 1692c(a)(2)':    { title: 'Communication when consumer is represented',
                        text: '…if the debt collector knows the consumer is represented by an attorney with respect to such debt and has knowledge of, or can readily ascertain, such attorney\\u2019s name and address, unless the attorney fails to respond within a reasonable period of time to a communication from the debt collector or unless the attorney consents to direct communication with the consumer.' },
  '§ 1692c(a)(3)':    { title: 'Workplace contact',
                        text: '…at the consumer\\u2019s place of employment if the debt collector knows or has reason to know that the consumer\\u2019s employer prohibits the consumer from receiving such communication.' },
  '§ 1692c(b)':       { title: 'Communication with third parties',
                        text: 'Except as provided in section 1692b of this title, without the prior consent of the consumer given directly to the debt collector, or the express permission of a court of competent jurisdiction, or as reasonably necessary to effectuate a postjudgment judicial remedy, a debt collector may not communicate, in connection with the collection of any debt, with any person other than the consumer, his attorney, a consumer reporting agency if otherwise permitted by law, the creditor, the attorney of the creditor, or the attorney of the debt collector.' },
  '§ 1692c(c)':       { title: 'Ceasing communication',
                        text: 'If a consumer notifies a debt collector in writing that the consumer refuses to pay a debt or that the consumer wishes the debt collector to cease further communication with the consumer, the debt collector shall not communicate further with the consumer with respect to such debt, except — (1) to advise the consumer that the debt collector\\u2019s further efforts are being terminated; (2) to notify the consumer that the debt collector or creditor may invoke specified remedies which are ordinarily invoked by such debt collector or creditor; or (3) where applicable, to notify the consumer that the debt collector or creditor intends to invoke a specified remedy.' },
  '§ 1692d':          { title: 'Harassment or abuse — general prohibition',
                        text: 'A debt collector may not engage in any conduct the natural consequence of which is to harass, oppress, or abuse any person in connection with the collection of a debt. Without limiting the general application of the foregoing, the following conduct is a violation of this section: [enumerated sub-prohibitions including threats of violence, obscene language, repeated phone calls intended to annoy, etc.].' },
  '§ 1692d(2)':       { title: 'Obscene or profane language',
                        text: 'The use of obscene or profane language or language the natural consequence of which is to abuse the hearer or reader.' },
  '§ 1692d(5)':       { title: 'Repeated phone calls to annoy',
                        text: 'Causing a telephone to ring or engaging any person in telephone conversation repeatedly or continuously with intent to annoy, abuse, or harass any person at the called number.' },
  '§ 1692e':          { title: 'False or misleading representations — general prohibition',
                        text: 'A debt collector may not use any false, deceptive, or misleading representation or means in connection with the collection of any debt. Without limiting the general application of the foregoing, the following conduct is a violation of this section: [16 enumerated sub-paragraphs].' },
  '§ 1692e(1)':       { title: 'Government affiliation — false implication',
                        text: 'The false representation or implication that the debt collector is vouched for, bonded by, or affiliated with the United States or any State, including the use of any badge, uniform, or facsimile thereof.' },
  '§ 1692e(2)':       { title: 'Misrepresenting amount or character of debt',
                        text: 'The false representation of (A) the character, amount, or legal status of any debt; or (B) any services rendered or compensation which may be lawfully received by any debt collector for the collection of a debt.' },
  '§ 1692e(3)':       { title: 'False representation as attorney',
                        text: 'The false representation or implication that any individual is an attorney or that any communication is from an attorney.' },
  '§ 1692e(4)':       { title: 'Threat of arrest, garnishment, seizure',
                        text: 'The representation or implication that nonpayment of any debt will result in the arrest or imprisonment of any person or the seizure, garnishment, attachment, or sale of any property or wages of any person unless such action is lawful and the debt collector or creditor intends to take such action.' },
  '§ 1692e(5)':       { title: 'Threat to take action that cannot/will not be taken',
                        text: 'The threat to take any action that cannot legally be taken or that is not intended to be taken.' },
  '§ 1692e(8)':       { title: 'False credit information',
                        text: 'Communicating or threatening to communicate to any person credit information which is known or which should be known to be false, including the failure to communicate that a disputed debt is disputed.' },
  '§ 1692e(10)':      { title: 'False representation or deceptive means',
                        text: 'The use of any false representation or deceptive means to collect or attempt to collect any debt or to obtain information concerning a consumer.' },
  '§ 1692e(11)':      { title: 'Mini-Miranda — debt collector identification',
                        text: 'The failure to disclose in the initial written communication with the consumer and, in addition, if the initial communication with the consumer is oral, in that initial oral communication, that the debt collector is attempting to collect a debt and that any information obtained will be used for that purpose, and the failure to disclose in subsequent communications that the communication is from a debt collector.' },
  '§ 1692f':          { title: 'Unfair practices — general prohibition',
                        text: 'A debt collector may not use unfair or unconscionable means to collect or attempt to collect any debt. Without limiting the general application of the foregoing, the following conduct is a violation of this section: [8 enumerated sub-paragraphs including collecting unauthorized amounts, postdated check abuse, communications on postcards, etc.].' },
  '§ 1692f(1)':       { title: 'Collection of unauthorized amounts',
                        text: 'The collection of any amount (including any interest, fee, charge, or expense incidental to the principal obligation) unless such amount is expressly authorized by the agreement creating the debt or permitted by law.' },
  '§ 1692g':          { title: 'Validation of debts — initial notice',
                        text: 'Within five days after the initial communication with a consumer in connection with the collection of any debt, a debt collector shall, unless the following information is contained in the initial communication or the consumer has paid the debt, send the consumer a written notice containing — (1) the amount of the debt; (2) the name of the creditor to whom the debt is owed; (3) a statement that unless the consumer disputes the validity of the debt within thirty days, the debt will be assumed to be valid; (4) a statement that if the consumer notifies the debt collector in writing within the thirty-day period that the debt is disputed, the debt collector will obtain verification of the debt; and (5) a statement that, upon written request, the debt collector will provide the consumer with the name and address of the original creditor.' },
  '§ 1692g(b)':       { title: 'Validation — disputed debts',
                        text: 'If the consumer notifies the debt collector in writing within the thirty-day period described in subsection (a) that the debt, or any portion thereof, is disputed, or that the consumer requests the name and address of the original creditor, the debt collector shall cease collection of the debt, or any disputed portion thereof, until the debt collector obtains verification of the debt or a copy of a judgment, or the name and address of the original creditor.' },
  '§ 1692i':          { title: 'Venue for legal actions',
                        text: 'Any debt collector who brings any legal action on a debt against any consumer shall — (1) in the case of an action to enforce an interest in real property securing the consumer\\u2019s obligation, bring such action only in a judicial district in which such real property is located; or (2) in the case of an action not described in paragraph (1), bring such action only in the judicial district — (A) in which such consumer signed the contract sued upon; or (B) in which such consumer resides at the commencement of the action.' },
  '§ 1692k':          { title: 'Civil liability — overview',
                        text: 'Any debt collector who fails to comply with any provision of this subchapter with respect to any person is liable to such person in an amount equal to the sum of — (1) any actual damage sustained by such person as a result of such failure; (2) in the case of any action by an individual, such additional damages as the court may allow, but not exceeding $1,000; and (3) in the case of any successful action to enforce the foregoing liability, the costs of the action, together with a reasonable attorney\\u2019s fee as determined by the court.' },
  '§ 1692k(a)(1)':    { title: 'Actual damages',
                        text: 'Any actual damage sustained by such person as a result of such failure [to comply with the FDCPA]. Includes economic harm (lost wages, medical expenses) and non-economic harm (emotional distress, reputational injury).' },
  '§ 1692k(a)(2)(A)': { title: 'Statutory damages — up to $1,000 per action',
                        text: 'In the case of any action by an individual, such additional damages as the court may allow, but not exceeding $1,000.' },
  '§ 1692k(a)(3)':    { title: 'Fee-shifting — collector pays attorney fees on success',
                        text: 'In the case of any successful action to enforce the foregoing liability, the costs of the action, together with a reasonable attorney\\u2019s fee as determined by the court.' },
  '§ 1692k(b)':       { title: 'Damages — factors considered',
                        text: 'In determining the amount of liability in any action under subsection (a), the court shall consider, among other relevant factors — (1) in the case of any action by an individual, the frequency and persistence of noncompliance by the debt collector, the nature of such noncompliance, and the extent to which such noncompliance was intentional.' },
  '§ 1692k(d)':       { title: 'One-year statute of limitations',
                        text: 'An action to enforce any liability created by this subchapter may be brought in any appropriate United States district court without regard to the amount in controversy, or in any other court of competent jurisdiction, within one year from the date on which the violation occurs.' },
  '(general)':        { title: 'General FDCPA practice — no single section',
                        text: 'This FAQ describes Credo Legal\\u2019s practice posture rather than a single FDCPA provision. The relevant authority is the Act as a whole (15 U.S.C. §§ 1692\\u20131692p) plus the Civil Procedure rules of the forum.' },
};

/* ─── FAQ statute inference ─────────────────────────────────────────────── */
function inferFaqStatutes(question, answer){
  const q = (question + ' ' + answer).toLowerCase();
  const hits = [];
  const add = s => { if (hits.indexOf(s) < 0) hits.push(s); };
  // recovery / damages
  if (/\$\s*1,?000|statutory damages|per violation|per lawsuit/.test(q)) add('§ 1692k(a)(2)(A)');
  if (/recover|how much|sue|lawsuit/.test(q) && !/court/.test(q)) add('§ 1692k');
  if (/actual damage|emotional|lost wage|real harm|financial(ly)? harm/.test(q)) add('§ 1692k(a)(1)');
  if (/attorney.?fee|cost|free|payment plan|out of pocket/.test(q)) add('§ 1692k(a)(3)');
  // limitations
  if (/how long|time(line)?|statute of limitations|year to file|deadline to file|file an? (fdcpa )?claim/.test(q)) add('§ 1692k(d)');
  // strict liability
  if (/prove (i was )?harmed|prove harm|don.?t need to prove|liability/.test(q)) add('§ 1692k');
  // cease + communication
  if (/cease|stop calling|stop the calls|after.*cease|cease (request|letter)/.test(q)) add('§ 1692c(c)');
  if (/workplace|employer|at work/.test(q)) add('§ 1692c(a)(3)');
  if (/family|friends|neighbors|third part(y|ies)/.test(q)) add('§ 1692c(b)');
  if (/before 8 ?am|after 9 ?pm|early morning|odd hours|inconvenient time/.test(q)) add('§ 1692c(a)(1)');
  // misrepresentation / threats
  if (/arrest|jail|criminal/.test(q)) add('§ 1692e(4)');
  if (/threat|lawsuit threat|threatened/.test(q)) add('§ 1692e(5)');
  if (/government|official|police|process server|claiming.*attorney|posing as/.test(q)) add('§ 1692e(1)');
  if (/false (representation|amount|character)|misrepresent|inflated amount/.test(q)) add('§ 1692e(2)');
  // validation
  if (/validate|verify|verification|debt validation|prove (they )?own/.test(q)) add('§ 1692g(b)');
  if (/notice|initial communication|five days|30.?day/.test(q)) add('§ 1692g');
  // venue / lawsuit logistics
  if (/court|appear|trial|proceedings|hearing/.test(q)) add('§ 1692i');
  // general fallback
  if (!hits.length) add('(general)');
  return hits;
}

/* ─── Load each LP's CREDO object ─────────────────────────────────────────── */
function loadCredo(filename){
  global.window = global.window || {};
  global.window.CREDO = null;
  const src = fs.readFileSync(filename, 'utf8');
  // strip prelude + execute in a sandbox via Function()
  try {
    new Function('window', src)(global.window);
  } catch (e) {
    console.error('FAIL load', filename, e.message); return null;
  }
  return global.window.CREDO;
}

/* ─── HTML helpers ────────────────────────────────────────────────────────── */
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function statuteBlock(citations){
  // Render distinct statute boxes; pull citation off, lookup full text.
  return citations.map(cite => {
    const s = STATUTE[cite] || { title: cite, text: '(statute text not available)' };
    return `
      <details class="statute">
        <summary><span class="cite">${esc(cite)}</span><span class="stitle">${esc(s.title)}</span></summary>
        <p class="stext">${esc(s.text)}</p>
      </details>`;
  }).join('');
}

/* ─── Build the page ──────────────────────────────────────────────────────── */
function build(){
  const lpData = LPS.map(lp => {
    const C = loadCredo(lp.content);
    if (!C) return null;
    return { ...lp, C };
  }).filter(Boolean);

  // group by cluster
  const byCluster = {};
  lpData.forEach(lp => { (byCluster[lp.c] = byCluster[lp.c] || []).push(lp); });

  let nav = '';
  Object.keys(byCluster).forEach(cluster => {
    nav += `<div class="nav-cluster"><h3>${esc(cluster)}</h3><ul>`;
    byCluster[cluster].forEach(lp => {
      const slug = lp.file.replace(/\.html$/, '');
      nav += `<li><a href="#lp-${esc(slug)}">${esc(lp.n)}</a></li>`;
    });
    nav += `</ul></div>`;
  });

  let main = '';
  Object.keys(byCluster).forEach(cluster => {
    main += `<section class="cluster-block"><h2 class="cluster-h">${esc(cluster)} <span class="lpct">(${byCluster[cluster].length} LP${byCluster[cluster].length===1?'':'s'})</span></h2>`;
    byCluster[cluster].forEach(lp => {
      const slug = lp.file.replace(/\.html$/, '');
      const cp = (lp.C.commonProblems || []);
      const fq = (lp.C.faq || []);
      main += `
      <article class="lp-block" id="lp-${esc(slug)}">
        <header class="lp-head">
          <h3 class="lp-name">${esc(lp.n)}</h3>
          <span class="lp-slug">${esc(slug)}</span>
          <a class="lp-open" href="${esc(lp.file)}" target="_blank" rel="noopener">Open landing page ↗</a>
        </header>

        <h4 class="section-h">What we see <span class="count">(${cp.length})</span></h4>
        <div class="items">${cp.map((row, i) => {
          const cite = row[2];
          return `
            <div class="item">
              <div class="item-head">
                <span class="item-n">cp${(i+1).toString().padStart(2,'0')}</span>
                <span class="item-label">${esc(row[0])}</span>
                <a class="item-link" href="${esc(lp.file)}#cp-${i}" target="_blank" rel="noopener">view on LP ↗</a>
              </div>
              <p class="item-body">${esc(row[1])}</p>
              ${statuteBlock([cite])}
            </div>`;
        }).join('')}</div>

        <h4 class="section-h">FAQ <span class="count">(${fq.length})</span></h4>
        <div class="items">${fq.map((qa, i) => {
          const cites = inferFaqStatutes(qa[0], qa[1]);
          return `
            <div class="item">
              <div class="item-head">
                <span class="item-n">faq${(i+1).toString().padStart(2,'0')}</span>
                <span class="item-label">${esc(qa[0])}</span>
                <a class="item-link" href="${esc(lp.file)}#faq-${i}" target="_blank" rel="noopener">view on LP ↗</a>
              </div>
              <p class="item-body">${esc(qa[1])}</p>
              ${statuteBlock(cites)}
            </div>`;
        }).join('')}</div>
      </article>`;
    });
    main += `</section>`;
  });

  const totalCp = lpData.reduce((s, lp) => s + (lp.C.commonProblems||[]).length, 0);
  const totalFaq = lpData.reduce((s, lp) => s + (lp.C.faq||[]).length, 0);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Credo Legal — FDCPA Statute Map (all LPs)</title>
<meta name="robots" content="noindex"/>
<style>
:root { --rw-deep:#DC4646; --rw-dark:#b23a3a; --rw-ink:#1f2330; --rw-soft:#f6f7f9; --rw-border:#e7eaee; --rw-muted:#65676b; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; }
body { font: 14.5px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: var(--rw-ink); background: var(--rw-soft); }
a { color: var(--rw-deep); text-decoration: none; }
a:hover { text-decoration: underline; }

.topbar { position: sticky; top: 0; z-index: 10; background: var(--rw-ink); color: #fff; padding: 12px 18px; display: flex; align-items: center; gap: 16px; }
.topbar h1 { margin: 0; font: 600 14px/1.2 -apple-system, sans-serif; }
.topbar h1 .r { color: #ff6b73; }
.topbar .meta { color: #c8cdd6; font-size: 12.5px; }
.topbar .back { margin-left: auto; font-size: 11.5px; color: #c8cdd6; border: 1px solid #2a2f37; padding: 6px 12px; border-radius: 4px; }
.topbar .back:hover { color: #fff; border-color: #5b6470; text-decoration: none; }

.layout { display: grid; grid-template-columns: 280px 1fr; height: calc(100vh - 46px); }

aside.sidenav { background: #fff; border-right: 1px solid var(--rw-border); overflow-y: auto; padding: 14px 0 60px; }
aside.sidenav .nav-cluster { padding: 10px 18px 8px; }
aside.sidenav .nav-cluster h3 { font: 700 10px/1 -apple-system, sans-serif; letter-spacing: .1em; text-transform: uppercase; color: var(--rw-deep); margin: 8px 0 6px; }
aside.sidenav ul { list-style: none; padding: 0; margin: 0; }
aside.sidenav li a { display: block; padding: 5px 4px; color: var(--rw-ink); font-size: 13px; line-height: 1.35; border-left: 3px solid transparent; padding-left: 8px; }
aside.sidenav li a:hover { background: #fafbfc; border-left-color: var(--rw-deep); text-decoration: none; }

main { overflow-y: auto; padding: 24px 30px 80px; }

.preamble { background: #fff; border: 1px solid var(--rw-border); padding: 14px 18px; border-radius: 8px; margin-bottom: 22px; max-width: 880px; }
.preamble p { margin: 0 0 8px; color: var(--rw-muted); font-size: 13px; }
.preamble strong { color: var(--rw-ink); }

.cluster-block { margin-bottom: 30px; }
.cluster-h { font: 700 18px/1.2 -apple-system, sans-serif; color: var(--rw-ink); border-bottom: 2px solid var(--rw-ink); padding-bottom: 6px; margin: 0 0 16px; }
.cluster-h .lpct { color: var(--rw-muted); font-weight: 500; font-size: 13px; }

.lp-block { background: #fff; border: 1px solid var(--rw-border); border-radius: 10px; padding: 16px 20px; margin-bottom: 22px; max-width: 940px; }
.lp-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 6px; flex-wrap: wrap; }
.lp-head .lp-name { margin: 0; font: 600 16px/1.2 -apple-system, sans-serif; color: var(--rw-ink); }
.lp-head .lp-slug { color: var(--rw-muted); font: 11px ui-monospace, Menlo, monospace; }
.lp-head .lp-open { margin-left: auto; font-size: 12px; background: var(--rw-deep); color: #fff; padding: 5px 11px; border-radius: 5px; }
.lp-head .lp-open:hover { background: var(--rw-dark); text-decoration: none; }

.section-h { margin: 14px 0 8px; font: 700 11px/1 -apple-system, sans-serif; letter-spacing: .08em; text-transform: uppercase; color: var(--rw-deep); }
.section-h .count { color: var(--rw-muted); font-weight: 500; }

.items { display: flex; flex-direction: column; gap: 8px; }
.item { background: #fafbfc; border: 1px solid var(--rw-border); border-radius: 7px; padding: 10px 12px; }
.item-head { display: flex; align-items: center; gap: 9px; margin-bottom: 4px; flex-wrap: wrap; }
.item-n { font: 700 10px/1 ui-monospace, Menlo, monospace; color: var(--rw-deep); background: rgba(220,70,70,.08); padding: 3px 6px; border-radius: 3px; }
.item-label { font-weight: 600; font-size: 13.5px; color: var(--rw-ink); flex: 1; min-width: 200px; }
.item-link { font-size: 11px; color: var(--rw-muted); border: 1px solid var(--rw-border); padding: 3px 8px; border-radius: 4px; }
.item-link:hover { color: var(--rw-deep); border-color: var(--rw-deep); text-decoration: none; }
.item-body { margin: 4px 0 6px; color: var(--rw-ink); font-size: 13px; line-height: 1.45; }

.statute { margin-top: 6px; background: #fff; border-left: 3px solid #C5CAE9; border-radius: 4px; padding: 4px 8px 4px 10px; }
.statute summary { cursor: pointer; font-size: 12px; color: var(--rw-ink); }
.statute summary:hover { color: var(--rw-deep); }
.statute summary .cite { font: 600 11px ui-monospace, Menlo, monospace; color: #4a4a99; margin-right: 8px; }
.statute summary .stitle { color: var(--rw-muted); font-style: italic; }
.statute .stext { margin: 6px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--rw-ink); padding-bottom: 4px; }

@media (max-width: 880px) {
  .layout { grid-template-columns: 1fr; }
  aside.sidenav { display: none; }
}
</style>
</head>
<body>

<header class="topbar">
  <h1>Credo<span class="r">·</span>Legal · FDCPA Statute Map</h1>
  <span class="meta">${lpData.length} LPs · ${totalCp} "what we see" + ${totalFaq} FAQ items mapped to 15 U.S.C. § 1692</span>
  <a class="back" href="review.html">← Back to LP review hub</a>
</header>

<div class="layout">
  <aside class="sidenav">${nav}</aside>
  <main>
    <div class="preamble">
      <p><strong>What this is.</strong> Every "What we see" bullet and every FAQ on every LP, paired with the FDCPA section it is inferred from. Built to answer the compliance question "do we need to put the statute number anywhere?" by making the underlying statute auditable in one place.</p>
      <p><strong>How to read it.</strong> Click any statute box to expand the full U.S. Code excerpt. Click <em>view on LP</em> next to any item to jump to that item on the live landing page (opens in a new tab). FAQ statute citations are inferred by content keyword; commonProblems statutes come from the content file directly.</p>
      <p><strong>Source.</strong> 15 U.S.C. § 1692 et seq. — Fair Debt Collection Practices Act. Excerpts faithful to the U.S. Code; long enumeration lists trimmed for scannability.</p>
    </div>
    ${main}
  </main>
</div>

</body>
</html>`;
}

// Write or print
const out = build();
if (process.argv.includes('--stdout')) {
  process.stdout.write(out);
} else {
  fs.writeFileSync(path.join(__dirname, 'statute-map.html'), out);
  console.error('wrote statute-map.html (' + out.length + ' bytes)');
}
