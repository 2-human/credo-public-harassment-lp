/* Search-term review — hand-authored analysis (2026-09-30).
 * Metrics are NOT typed here: the page joins each row to terms-data.js by campaign + term.
 * ADS: what each ad group served in the period (ad_group_ad pull, same day). share = the ad's
 * share of the ad group's impressions. The API reports search terms per AD GROUP, not per ad,
 * so "the ad this term triggered" is the ad group's rotation; the dominant ad is the likely one.
 * Recommended copy follows brand/voice.md (no "real attorneys", no exclamation marks,
 * mechanism over rhetoric) and RSA limits (headline <= 30, description <= 90). Drafts:
 * attorney review before use. Landing pages that carry an ad need the NY attorney-advertising
 * snippet (brand/ny-attorney-advertising-disclaimer.md, phone (212) 461-4026). */

const S = 'https://start.credolegal.com/';
const G = 'https://staging.credolegal.com/';

window.ADS = {
  'S_All-States|Garnishment': [
    { id: '800513459964', share: 81, lp: S + 'stop-wage-garnishment', h: ['Stop Wage Garnishment Now', 'We CRUSH Wage Garnishments.', 'Garnishment Risks Your Housing'] },
    { id: '754018670773', share: 19, lp: S + 'stop-wage-garnishment', h: ['Fight Wage Garnishment Now', 'Need Debt Collector Attorney?', 'We Can Help Fight Harassment'] }],
  'S_All-States|Debt Collector': [
    { id: '754109026277', share: 57, lp: S + 'collection-defense', h: ['Sued by a Collection Lawyer?', 'Harassed by Debt Collectors?', 'Debt Collectors at Your Door?'] },
    { id: '801760809096', share: 43, lp: S + 'collection-defense', h: ['Collection Law Firm Suing You?', 'You Have 20-28 Days to Respond', 'Debt Lawsuit Crushing You?'] }],
  'S_All-States|FDCPA': [
    { id: '792441523660', share: 66, lp: S + 'fcba-and-fdcpa', h: null, note: 'Ad group paused during the period; copy not pulled.' },
    { id: '801760707753', share: 34, lp: S + 'fcba-and-fdcpa', h: null }],
  'S_Garnishment_NW|Garnishment': [
    { id: '805139449432', share: 61, lp: S + 'wage-garnishment-prevention', h: ['Threatened With Garnishment?', 'Garnishment Is Preventable', 'We Act Before They Garnish'] },
    { id: '805139449435', share: 39, lp: S + 'wage-garnishment-attorney', h: ['Paycheck Already Garnished?', 'We Can Reduce or Fight It', "25% Is Max. Often It's Less."] },
    { id: '805218622442', share: 0, lp: S + 'wage-garnishment-exemptions', h: ['Paycheck Already Garnished?', 'You May Qualify For Exemptions', 'We File Exemption Claims'], note: 'Paused.' }],
  'S_Lawsuit_NW|Collection_Lawsuit': [
    { id: '805139449570', share: 96, lp: S + 'debt-lawsuit-respond-on-time', h: ['Sued by a Collector? Act Now', 'You Have 20-28 Days to Act', 'They Win If You Ignore It!'] },
    { id: '805139449573', share: 4, lp: S + 'debt-lawsuit-proof', h: ['We Demand They Prove Claims', 'No Proof? Case Dismissed.', 'Debts Sold Without Records'] }],
  'S_Lawsuit_NW|Creditor_Suing': [
    { id: '805139449576', share: 81, lp: S + 'debt-lawsuit-fight-back', h: ['Creditor Suing You?', "Don't Let Them Win", 'Default Judgment = They Win'], note: 'Ad strength: Poor.' },
    { id: '805139449579', share: 19, lp: S + 'debt-lawsuit-attorney', h: ['Outgunned by Creditor Firms?', 'Real Lawyers. No Snakeoil.', 'Level the Playing Field'], note: 'Ad strength: Poor.' }],
  'S_Lawsuit_NW|Served_Papers': [
    { id: '805139449582', share: 94, lp: S + 'debt-lawsuit-summons-respond', h: ['Just Got Served? Act Now.', 'Received a Debt Summons?', '20-28 Days Is All You Have'] },
    { id: '805139449585', share: 6, lp: S + 'debt-lawsuit-options', h: ["Got Court Papers? It's OK.", 'You Still Have Options', 'We Explain What Papers Mean'] }],
  'S_CreditCard_NW|CC_Lawsuit': [
    { id: '805139449414', share: 85, lp: S + 'credit-card-debt-lawsuit-respond', h: ['Sued for Credit Card Debt?', 'You Have Days to Respond', 'No Response = You Lose.'] },
    { id: '805139449417', share: 15, lp: S + 'credit-card-debt-lawsuit-records', h: ['They May Not Have The Proof', 'Debts Sold Without Records', 'No Proof? Case Dismissed.'] }],
  'S_CreditCard_NW|CC_Negotiation': [
    { id: '805139449426', share: 0, lp: S + 'credit-card-debt-negotiation', h: ['You Can Pay Less Than You Owe', 'Settle Card Debt for Less', 'Attorney-Led Negotiation'], note: 'Fully limited: Google Debt Services policy, certificate missing (US). Serves nothing.' },
    { id: '805139449429', share: 100, lp: S + 'credit-card-debt-challenge', h: ['Credit Card Debt? Not So Fast!', 'Do You Really Owe All That?', 'We Demand They Prove It'] }],
  'S_CreditCard_NW|CC_Branded': [
    { id: '805139449423', share: 51, lp: S + 'credit-card-debt-violations', h: null, note: 'Ad group paused during the period; copy not pulled.' },
    { id: '805139449420', share: 49, lp: S + 'credit-card-debt-stop-calls', h: null }],
  'S_Harassment_NW|FDCPA_Harassment': [
    { id: '805139449567', share: 74, lp: S + 'debt-harassment-fdcpa-attorney', h: ['Collector Broke the Law?', 'Each Violation Can Get You $1K', 'Sue Debt Collector for Breach'] },
    { id: '805139449564', share: 26, lp: S + 'debt-harassment-fdcpa-rights', h: ['Know Your FDCPA Rights', 'No Calls 8AM to 9PM!', "They Can't Threaten Arrest! (disapproved)"], note: 'Ad strength: Poor.' }],
  'S_Harassment_NW|Creditor_Harassment': [
    { id: '805139449438', share: 88, lp: S + 'debt-harassment-stop-calls', h: ["Collector Won't Stop Calling?", "We'll Send Cease Letter Today", 'Calling Your Job? Illegal.'] },
    { id: '805139449561', share: 12, lp: S + 'debt-harassment-violations', h: ["Harassed by Collector? Sue 'em", 'Each Violation Can Get $1,000', 'You Could Turn Calls Into Cash'] }],
  'S_Brand|Brand_Core': [
    { id: '822895187446', share: 57, lp: 'https://credolegal.com/', h: ['Credo Legal Services, P.A.', 'Consumer Debt Defense Firm', "We Defend, We Don't Collect"] },
    { id: '822969171047', share: 43, lp: 'https://credolegal.com/', h: ['Credo Legal Services, P.A.', 'Credo Legal – Contact Us', 'Speak With Our Team'] }]
};

/* One row per search term. cluster groups the table; key = campaign|term (joins terms-data.js). */
window.FEATURED = [
  // ── Garnishment: "how to stop" ────────────────────────────────────────────
  { cluster: 'Garnishment: how to stop one', key: 'S_Garnishment_NW|how to stop garnishment',
    analysis: 'Best non-brand CTR in the account. A short action query, answered by the ad group\'s "Fight Wage Garnishment Now" / "Garnishment Is Preventable" lines. The weak spot is the page: the prevention ad gets 61% of the ad group\'s impressions and sends people to the prevention page ("Garnishment Looming?"), which is written for someone not yet garnished. "Stop" usually means it has already started.',
    ad: { h: ['How to Stop a Garnishment', 'Exemptions and Objections', 'Free Garnishment Case Review'], d: 'Before it starts or after: our attorneys use exemptions and objections to stop or cut it.' },
    lp: { url: G + 'stop-wage-garnishment', note: 'Use this page as the garnishment router. Set the hero First question prop to "Is money already being taken from your pay?" Yes carries the exemption and objection copy; No carries the prevention copy. No new build needed: it is a props change on the Landing page template (lp-sync.mjs).' } },
  { cluster: 'Garnishment: how to stop one', key: 'S_Garnishment_NW|how to stop a garnishment',
    analysis: 'Same intent as above and the same strong CTR, but only 1 conversion per 15 clicks. The click is earned by the ad and then lost on a page that answers the wrong stage (prevention).',
    ad: { h: ['How to Stop a Garnishment', 'Already Garnished? Act Today', 'Free Garnishment Case Review'], d: 'A garnishment can often be reduced or stopped with an exemption claim. We file it for you.' },
    lp: { url: G + 'stop-wage-garnishment', note: 'Router page, as above.' } },
  { cluster: 'Garnishment: how to stop one', key: 'S_Garnishment_NW|how to stop wage garnishment',
    analysis: 'Strong CTR at a sound CPA. The ad mirrors the query. Keep it, and use this term as the control when the router page is tested.',
    ad: { h: ['Stop a Wage Garnishment', 'Exemptions Can Cut or End It', 'Free Garnishment Case Review'], d: 'Our attorneys check which exemptions apply to your pay and file the claim. Free review.' },
    lp: { url: G + 'stop-wage-garnishment', note: 'Router page, as above.' } },
  { cluster: 'Garnishment: how to stop one', key: 'S_Garnishment_NW|how to stop wage garnishment immediately online',
    analysis: 'The highest-volume term and it works: CTR at twice the benchmark, 10 conversions, CPA $45. "Online" is not answered anywhere, though. The ad and page never say the review happens online or by phone, in minutes.',
    ad: { h: ['Stop a Garnishment Online', 'Start Your Case Review Online', 'Exemptions Can Cut or End It'], d: 'Tell us about the garnishment online. Our attorneys check exemptions and deadlines today.' },
    lp: { url: G + 'stop-wage-garnishment', note: 'Router page. Add one line under the hero form: "Takes about 2 minutes online, or call."' } },
  { cluster: 'Garnishment: how to stop one', key: 'S_Garnishment_NW|how can i stop a wage garnishment immediately',
    analysis: 'A CTR winner and a conversion loser: 62 clicks, 2 conversions, CPA $194. The same query costs $28 per conversion in S_All-States, where it lands on /stop-wage-garnishment. The prevention page is the likely leak.',
    ad: { h: ['Stop Your Garnishment Now', 'Exemptions Can Cut or End It', 'Talk to an Attorney Today'], d: 'Already garnished? Exemption claims and objections can reduce or stop it. Free review.' },
    lp: { url: G + 'wage-garnishment-exemptions', note: 'Re-enable the paused exemptions ad (805218622442) in this ad group, so "already garnished" searches have a matching page.' } },
  { cluster: 'Garnishment: how to stop one', key: 'S_Garnishment_NW|stop garnishment',
    analysis: 'High CTR, weak conversion (1.5 conversions from 25 clicks, CPA $183). This two-word head term costs about $11 a click. The page leaks here for the same reason as the rows above.',
    ad: { h: ['Stop a Garnishment', 'Before or After It Starts', 'Free Garnishment Case Review'], d: 'Our attorneys stop garnishments before they start and cut them after. Free review.' },
    lp: { url: G + 'stop-wage-garnishment', note: 'Router page.' } },
  { cluster: 'Garnishment: how to stop one', key: 'S_All-States|stop wage garnishment',
    analysis: 'The same query gets 18.4% CTR in S_Garnishment_NW and 3.7% here. The All-States garnishment ads mix in off-topic lines ("Need Debt Collector Attorney?", "We Can Help Fight Harassment"). They also say "We CRUSH Wage Garnishments.", which goes against voice.md. Both campaigns showed this term at the top of the page (All-States 100% of the time), so the gap is the ad copy, not the position. The two campaigns bid on the same terms (62 terms appear in more than one campaign).',
    ad: { h: ['Stop a Wage Garnishment', 'Exemptions Can Cut or End It', 'Free Garnishment Case Review'], d: 'Structural fix first: let S_Garnishment_NW serve this term (see note). Copy as NW row.' },
    lp: { url: G + 'stop-wage-garnishment', note: 'Add the S_Garnishment_NW terms as exact-match negatives in S_All-States › Garnishment, or pause that ad group, so the specific ads win the auction.' } },
  { cluster: 'Garnishment: how to stop one', key: 'S_All-States|can you stop a garnishment after it starts',
    analysis: '2.1% here against 16.1% for the same query in S_Garnishment_NW: the overlap problem again. The searcher states the stage ("after it starts"), and neither All-States ad answers it.',
    ad: { h: ['Garnishment Already Started?', 'It Can Still Be Reduced', 'Free Garnishment Case Review'], d: 'Once a garnishment starts, an exemption claim or objection can still cut or end it.' },
    lp: { url: G + 'wage-garnishment-exemptions', note: 'Stage-specific page. Serve it from the NW ad group, not All-States.' } },

  // ── Garnishment: research / DIY ───────────────────────────────────────────
  { cluster: 'Garnishment: research and DIY', key: 'S_All-States|wage garnishment',
    analysis: 'A two-word head term, mostly research ("what is it", "how much can they take"). The ad jumps straight to "Stop Wage Garnishment Now". Low CTR is normal for a definition-seeking query. Volume is high (339 impressions), so the ad should give the fact the searcher is looking for.',
    ad: { h: ['Wage Garnishment Limits', 'Federal Cap: 25% of Disposable', 'Exemptions May Protect You'], d: 'Federal law caps most wage garnishments, and many states protect more. See what applies.' },
    lp: { url: G + 'wage-garnishment-exemptions', note: 'Or bid lower on this head term. Its natural home is the "Garnishment & protected funds" guide in the Resources prototype (website-main/resources/templates).' } },
  { cluster: 'Garnishment: research and DIY', key: 'S_All-States|creditor garnishment',
    analysis: 'An ambiguous term: it can mean a wage garnishment or a bank-account levy. The ad speaks only to paychecks.',
    ad: { h: ['Creditor Garnishing Your Pay?', 'Bank Levy or Wage Garnishment', 'Exemptions May Protect Funds'], d: 'Wages and bank accounts have different protections. Our attorneys check which apply.' },
    lp: { url: G + 'wage-garnishment-exemptions', note: 'Add a bank-levy section (protected funds: Social Security, SSI, VA) to the exemptions page.' } },
  { cluster: 'Garnishment: research and DIY', key: 'S_Garnishment_NW|what to do if your wages are garnished',
    analysis: '0 clicks. The searcher wants steps (and the related "how to file an exemption" and "claim of exemption" queries also get 0 clicks). The prevention ad ("Threatened With Garnishment?") answers a stage the searcher has already passed.',
    ad: { h: ['Wages Garnished? Next Steps', 'File a Claim of Exemption', 'We Prepare the Exemption Claim'], d: 'A claim of exemption can cut or stop a garnishment. Our attorneys prepare and file it.' },
    lp: { url: G + 'wage-garnishment-exemptions', note: 'Re-enable exemptions ad 805218622442.' } },
  { cluster: 'Garnishment: research and DIY', key: 'S_All-States|who can garnish wages without notice',
    analysis: 'A legal-definition question with low conversion potential. Related terms behave the same: "writ of garnishment" 2.2%, "garnish wages" 0 to 3%.',
    ad: null,
    lp: { url: null, note: 'Not a paid-search fit. Add phrase negatives ("who can garnish", "garnish wages", "garnishing wages", "writ of garnishment" as exact) and cover these in Resources articles for organic and AI search.' } },

  // ── Garnishment: attorney intent ──────────────────────────────────────────
  { cluster: 'Garnishment: attorney intent', key: 'S_All-States|garnishment lawyer',
    analysis: 'High-intent attorney query with a strong CTR, but 34 clicks produced 1 conversion ($391). It lands on the legacy /stop-wage-garnishment. The sibling term "garnishment attorney" in the same ad group converts at $21, so the loss is probably noise plus friction on the page. Send attorney-intent traffic to the attorney page.',
    ad: { h: ['Wage Garnishment Attorney', 'State-Licensed Attorneys', 'Free Garnishment Case Review'], d: 'Our attorneys file exemption claims and objections to cut or stop your garnishment.' },
    lp: { url: G + 'wage-garnishment-attorney', note: 'Attorney-intent page. It answers "who will handle it" before "how".' } },
  { cluster: 'Garnishment: attorney intent', key: 'S_Garnishment_NW|garnishment lawyers near me',
    analysis: 'Strong on both CTR and CPA ($26). "Near me" is answered implicitly. Add location insertion to make it explicit.',
    ad: { h: ['Garnishment Lawyer Near You', 'Licensed in {LOCATION(State):Your State}', 'Free Garnishment Case Review'], d: 'State-licensed attorneys review your garnishment by phone or online. Free case review.' },
    lp: { url: G + 'wage-garnishment-attorney', note: 'Keep as is. Check that the tracked phone number shows in the mobile header (PBI-06, done).' } },

  // ── Collection lawsuit / debt attorney ────────────────────────────────────
  { cluster: 'Debt lawyer and collection defense', key: 'S_All-States|debt collection lawyer',
    analysis: 'An ambiguous term: creditors look for "collection lawyers" too. CTR and CPA show that consumers dominate. "Sued by a Collection Lawyer?" qualifies the reader well.',
    ad: { h: ['Debt Collection Defense', "We Defend. We Don't Collect.", 'Sued by a Collection Firm?'], d: 'We represent consumers, not collectors. Our attorneys answer the suit and demand proof.' },
    lp: { url: G + 'collection-defense', note: 'Keep.' } },
  { cluster: 'Debt lawyer and collection defense', key: 'S_All-States|debt collection attorney',
    analysis: 'The same ambiguity, with worse conversion: 30 clicks, 1.5 conversions, CPA $258. A share of these clicks are likely businesses looking for a collections attorney.',
    ad: { h: ['For Consumers Sued Over Debt', "We Defend. We Don't Collect.", 'Debt Collection Defense'], d: 'We defend people sued by collectors. We do not collect debts for businesses.' },
    lp: { url: G + 'collection-defense', note: 'Pin "For Consumers Sued Over Debt" in position 1. Add negatives: "for business", "collection agency for", "hire a collection".' } },
  { cluster: 'Debt lawyer and collection defense', key: 'S_All-States|debt lawyer near me',
    analysis: '5.8% here against 14.7% for the same query in S_Lawsuit_NW: the campaign overlap again. The All-States ads never speak to "near me".',
    ad: { h: ['Debt Defense Lawyer Near You', 'Licensed in {LOCATION(State):Your State}', 'Sued or Called by a Collector?'], d: 'State-licensed debt defense attorneys. Free case review by phone or online.' },
    lp: { url: G + 'collection-defense', note: 'Keep one campaign per term: add the S_Lawsuit_NW winners as negatives in S_All-States.' } },
  { cluster: 'Debt lawyer and collection defense', key: 'S_All-States|debt attorney',
    analysis: 'A broad two-word term below benchmark. It carries no lawsuit or harassment signal, and the ad assumes one.',
    ad: { h: ['Consumer Debt Attorney', 'Sued, Garnished or Harassed?', 'Free Debt Case Review'], d: 'Lawsuits, garnishment and collector calls: our attorneys handle each. Free case review.' },
    lp: { url: G + 'collection-defense', note: 'Add sitelinks for the three situations (lawsuit, garnishment, calls) so the searcher picks their stage.' } },
  { cluster: 'Debt lawyer and collection defense', key: 'S_Lawsuit_NW|debt lawyer near me',
    analysis: 'Working well: CTR 2.5× benchmark at CPA $73. The respond-on-time ad ("Sued by a Collector? Act Now") qualifies to people who have been sued.',
    ad: { h: ['Debt Lawyer Near You', 'Sued by a Collector?', 'Your Answer Deadline Matters'], d: 'Most courts allow 20 to 30 days to answer. Our attorneys review your deadline today.' },
    lp: { url: G + 'debt-lawsuit-respond-on-time', note: 'Keep.' } },
  { cluster: 'Debt lawyer and collection defense', key: 'S_Lawsuit_NW|debt collector lawyer near me',
    analysis: 'Excellent CTR (4× benchmark). Keep, and let S_All-States stop competing for it.',
    ad: null, lp: { url: G + 'debt-lawsuit-respond-on-time', note: 'Keep.' } },
  { cluster: 'Debt lawyer and collection defense', key: 'S_Lawsuit_NW|debt settlement attorney near me',
    analysis: 'A surprise winner: 17.3% CTR at CPA $51. Searchers who want an attorney, not a settlement company, respond to the lawsuit ad.',
    ad: null, lp: { url: G + 'debt-lawsuit-respond-on-time', note: 'Keep. See the settlement rows below for the non-local variant.' } },

  // ── Lawsuit: dismissal, fear, named plaintiffs ────────────────────────────
  { cluster: 'Debt lawsuit', key: 'S_Lawsuit_NW|how to get a debt lawsuit dismissed',
    analysis: '"Dismissed" signals a proof and defense question. The proof ad ("No Proof? Case Dismissed." → /debt-lawsuit-proof) fits best but gets only 4% of impressions; the deadline ad serves 96%. Even so, CTR is above benchmark at CPA $53.',
    ad: { h: ['Grounds to Dismiss a Debt Suit', 'They Must Prove You Owe It', 'Free Lawsuit Defense Review'], d: 'Many debt suits lack the records to prove the debt. Our attorneys ask the court for them.' },
    lp: { url: G + 'debt-lawsuit-proof', note: 'Move dismissal and proof queries into their own ad group so the proof ad and page serve them every time.' } },
  { cluster: 'Debt lawsuit', key: 'S_CreditCard_NW|how to get a credit card lawsuit dismissed',
    analysis: '9 clicks, 0 conversions. 85% of clicks land on the deadline page (/credit-card-debt-lawsuit-respond), which argues "respond on time", not "how to win".',
    ad: { h: ['Card Lawsuit? Ask for Proof', 'Card Debts Are Often Resold', 'Free Lawsuit Defense Review'], d: 'Card debts change hands and records get lost. Our attorneys demand the proof in court.' },
    lp: { url: G + 'credit-card-debt-lawsuit-records', note: 'The records page answers this query. Route to it with a dismissal and proof ad group.' } },
  { cluster: 'Debt lawsuit', key: 'S_Lawsuit_NW|what happens if a debt collector sues you and you have no money',
    analysis: 'A fear question with 0 conversions. The searcher wants to know the consequences with no money (judgment, garnishment, what is protected). The ad pushes deadline urgency instead.',
    ad: { h: ['Sued and Cannot Pay?', 'You Still Need to Answer', 'Free Review. Flexible Plans.'], d: 'Being sued with no money still needs an answer. We check defenses and what is protected.' },
    lp: { url: G + 'debt-lawsuit-options', note: 'Set the hero H1 prop to "Sued and can\'t pay? You still have options." Link the Resources article "Sued Over a Debt? What to Do in the Next 28 Days".' } },
  { cluster: 'Debt lawsuit', key: 'S_Lawsuit_NW|midland credit management lawsuit',
    analysis: 'The searcher is looking up who is suing them, and names a debt buyer. The generic "Creditor Suing You?" ad (ad strength Poor) does not show that we know this plaintiff, and it reached the top of the page only 39% of the time. Debt buyers must prove they own the account, which is Credo\'s core validation angle. "lvnv funding llc lawsuit" (1.5%) and "credit corp solutions inc suing me" (4.0%) behave the same.',
    ad: { h: ['Sued by a Debt Buyer?', 'Debt Buyers Must Prove It', 'Free Lawsuit Defense Review'], d: 'Debt buyers must show they own your account and the amount is right. We demand that proof.' },
    lp: { url: G + 'debt-lawsuit-proof', note: 'NEW variant of the proof page: "Sued by a debt buyer?", with an FAQ naming Midland, LVNV, Cavalry, PRA and Credit Corp (factual page copy is fine; keep names out of ad text for trademark reasons). New ad group "Debt_Buyer_Lawsuit" in S_Lawsuit_NW.' } },
  { cluster: 'Debt lawsuit', key: 'S_Lawsuit_NW|gurstel law firm p c',
    analysis: '0 clicks. This is the plaintiff\'s law firm, and most searchers want its phone number to pay or call. "klima peters & daly p a" (0 to 3%) and "mandarich law group llp" (4.4%) are the same pattern.',
    ad: { h: ['Sued by a Collection Firm?', 'Talk to a Defense Attorney', 'Free Lawsuit Defense Review'], d: 'Before you call the firm suing you, talk to a defense attorney. Free case review.' },
    lp: { url: G + 'debt-lawsuit-proof', note: 'Same debt-buyer ad group. If CTR stays under 3% after the change, make the firm names negatives.' } },

  // ── Settlement intent ─────────────────────────────────────────────────────
  { cluster: 'Debt settlement intent', key: 'S_Lawsuit_NW|debt settlement attorney',
    analysis: 'Below benchmark with CPA $188, while "debt settlement attorney near me" wins (17.3%, $51). Credo\'s position is validation first, with settlement as the fallback. The lawsuit ad does not tell a settlement-minded searcher why validation comes first.',
    ad: { h: ['Debt Settlement Attorney', 'Check the Debt Before Settling', 'Free Debt Case Review'], d: 'Before you settle, our attorneys check if the debt is valid and provable. Free review.' },
    lp: { url: null, note: 'NEW page from the Landing page template: "Debt settlement or debt validation?", a side-by-side of fees and incentives. Keep settlement promises out of the ads: Google\'s Debt Services policy has already fully limited the CC_Negotiation ad.' } },
  { cluster: 'Debt settlement intent', key: 'S_CreditCard_NW|debt settlement companies',
    analysis: '0 clicks. These are shoppers comparing settlement companies, a category Credo positions against. "credit acceptance settlement offer" (an auto lender, 0%) and "debt settlement lawyer" (0%) are the same kind of mismatch.',
    ad: null,
    lp: { url: null, note: 'Negatives: "companies", "company", "credit acceptance", "pds". Separately, the CC_Negotiation negotiation ad is fully limited (Debt Services certificate missing): either certify or remove the settlement language.' } },
  { cluster: 'Debt settlement intent', key: 'S_CreditCard_NW|pds debt',
    analysis: 'A navigational query for a debt-relief company (PDS Debt). It got 1 lucky conversion, but CTR is 1.4%.',
    ad: null, lp: { url: null, note: 'Negative: "pds".' } },

  // ── Credit card ───────────────────────────────────────────────────────────
  { cluster: 'Credit card', key: 'S_CreditCard_NW|credit card lawyer',
    analysis: 'Ambiguous: fraud, chargebacks, merchant disputes. The ad assumes a lawsuit ("Sued for Credit Card Debt?"), which is right for Credo, but most people typing this have not been sued.',
    ad: { h: ['Credit Card Debt Lawyer', 'Sued or Called by a Collector?', 'Free Card Debt Case Review'], d: 'Card debt lawsuits, collector calls and credit report errors. Free attorney case review.' },
    lp: { url: G + 'credit-cards', note: 'Use the general credit-card page, which lets the visitor pick their situation. Add negatives: "fraud", "chargeback", "merchant", "class action".' } },
  { cluster: 'Credit card', key: 'S_CreditCard_NW|being sued by credit card company',
    analysis: 'Low volume (43 impressions), so read it as directional. The ad was at the top 92% of the time, so position is not the cause. The likely cause is the headline mix: several deadline-ad headlines are warnings ("No Response = You Lose.", "Most People Don\'t Respond") rather than an answer to "what now?".',
    ad: { h: ['Sued by a Card Company?', 'Card Debts Are Often Resold', 'Your Answer Deadline Matters'], d: 'Most courts allow 20 to 30 days to answer. Our attorneys review your papers today.' },
    lp: { url: G + 'credit-card-debt-lawsuit-respond', note: 'Keep the page. Pin "Sued by a Card Company?" in position 1.' } },

  // ── FDCPA / statute ───────────────────────────────────────────────────────
  { cluster: 'FDCPA and statute research', key: 'S_Lawsuit_NW|fdcpa violations',
    analysis: '0 clicks from the lawsuit ad group ("Sued by a Collector? Act Now"). The same term earned 13.2% in the All-States FDCPA ad group before it was paused.',
    ad: { h: ['FDCPA Violation Review', 'Know What Collectors Cannot Do', 'Free FDCPA Case Review'], d: 'Calls before 8 a.m., threats or calls to your boss may break the FDCPA. We review it.' },
    lp: { url: G + 'debt-harassment-fdcpa-rights', note: 'Add the FDCPA terms as negatives in Collection_Lawsuit, so S_Harassment_NW › FDCPA_Harassment serves them.' } },
  { cluster: 'FDCPA and statute research', key: 'S_All-States|15 usc 1692',
    analysis: 'People reading the statute text: consumers, but also students and lawyers. The same term gets 7.9% CTR and 0 conversions in S_Lawsuit_NW.',
    ad: null,
    lp: { url: G + 'fcba-and-fdcpa', note: 'Keep citation terms (15 usc 1692, fair debt collection practices act) at a low bid in one statute ad group, or leave them to organic search. The Resources "Laws" section in the main-site prototype is the natural home.' } },

  // ── Brand ─────────────────────────────────────────────────────────────────
  { cluster: 'Brand', key: 'S_Brand|credo legal', brand: true,
    analysis: 'A navigational brand search with the best CPA in the account ($19). Brand CTR is not comparable with the non-brand benchmark. The issue is coverage: Credo appears at the top for only 38% of all brand searches it could have entered (top impression share). The pinned headline also says "Credo Legal Services, P.A.", while the NY disclaimer names "Credo Legal Services, P.C.".',
    ad: { h: ['Credo Legal Services', 'Consumer Debt Defense Firm', "We Defend. We Don't Collect."], d: 'Sued, garnished or called by collectors? Start your free case review with Credo Legal.' },
    lp: { url: 'https://credolegal.com/', note: 'Raise the brand bid (target top impression share above 90%) and add sitelinks. Confirm the entity name (P.A. or P.C.) before the next brand edit.' } },
  { cluster: 'Brand', key: 'S_Brand|credo legal services', brand: true,
    analysis: 'The strongest term in the account. Keep it.',
    ad: null, lp: { url: 'https://credolegal.com/', note: 'Keep.' } }
];

/* Account-level findings that are not tied to one search term. */
window.FINDINGS = [
  { t: 'Two campaigns bid on the same searches', b: '62 search terms were served by more than one campaign. The specific campaign wins on CTR almost every time, for example "stop wage garnishment": 18.4% in S_Garnishment_NW against 3.7% in S_All-States. Add the NW campaigns\' terms as exact-match negatives in S_All-States.' },
  { t: 'An FDCPA headline states the law backwards', b: 'Ad 805139449564 says "No Calls 8AM to 9PM!". The FDCPA bars calls BEFORE 8 a.m. and AFTER 9 p.m. (15 U.S.C. §1692c(a)(1)). The same ad has a disapproved headline ("They Can\'t Threaten Arrest!", flagged as clickbait).' },
  { t: '"$1,000 per violation" overstates the FDCPA', b: 'Harassment ads say "Each Violation Can Get $1,000". Statutory damages under §1692k(a)(2)(A) are up to $1,000 per action, not per violation. This is a claims-accuracy risk for a law-firm advertiser.' },
  { t: 'One ad serves nothing', b: 'CC_Negotiation ad 805139449426 is fully limited under Google\'s Debt Services policy (certificate missing, US). Certify, or rewrite it without settlement language.' },
  { t: 'Copy off the house voice', b: 'Live ads use "Real Lawyers From Day One", "We CRUSH Wage Garnishments.", "They Win If You Ignore It!" and "Real Lawyers. No Snakeoil.". brand/voice.md rules out "real attorneys", exclamation marks and combative rhetoric.' },
  { t: 'Ads still point to start.credolegal.com', b: 'Every non-brand ad sends traffic to start.credolegal.com. The recommended pages are the staging.credolegal.com versions of the same slugs (rebuilt on the Landing page template). Swap the final URLs when staging becomes the ad destination.' }
];
