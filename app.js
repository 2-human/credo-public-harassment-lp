/* ==========================================================================
   Credo Legal — FDCPA Harassment LP
   Vanilla render + multi-step form controller.

   Ported from the Claude Design prototype (React + Babel) to dependency-free
   vanilla JS for production. DOM structure and class names are preserved
   verbatim, so tokens.css + lp.css produce a pixel-faithful result.

   Entry pages call:  CredoLP.render({ variant: "a" | "c", hero: "portrait" | "watercolor" });
   ========================================================================== */
(function () {
  "use strict";

  var C = window.CREDO;

  /* ---- inline SVG icons (Lucide-style, stroke currentColor) -------------- */
  var Ico = {
    check: function (size) {
      size = size || 24;
      return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    },
    arrow: '<span class="ar">→</span>',
    phone: function (size) {
      size = size || 24;
      return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    },
    chat: function (size) {
      size = size || 24;
      return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    },
    scale: function (size) {
      size = size || 24;
      return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 7h10M5 7l-2.5 6a3.5 3.5 0 0 0 7 0L7 7zM17 7l-2.5 6a3.5 3.5 0 0 0 7 0L19 7zM7 21h10"/></svg>';
    },
    close: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  };

  /* ---- small helpers ----------------------------------------------------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function pad2(i) { return String(i).padStart(2, "0"); }
  function heroStyle() {
    return window.CREDO_HERO_STYLE || document.documentElement.getAttribute("data-hero-style") || "portrait";
  }
  function fmtAmt(v) { return v >= 100000 ? "$100,000+" : "$" + Number(v).toLocaleString(); }

  /* Auto-format a date of birth as MM/DD/YYYY. Inserts "/" after the MM and DD
     pairs while typing forward; leaves the field alone on backspace/delete. */
  function formatDob(value, isDelete) {
    var d = value.replace(/\D/g, "").slice(0, 8);
    var out;
    if (d.length > 4) out = d.slice(0, 2) + "/" + d.slice(2, 4) + "/" + d.slice(4);
    else if (d.length > 2) out = d.slice(0, 2) + "/" + d.slice(2);
    else out = d;
    if (!isDelete) {
      if (d.length === 2) out = d + "/";
      else if (d.length === 4) out = d.slice(0, 2) + "/" + d.slice(2, 4) + "/";
    }
    return out;
  }

  function scrollToForm() {
    var el = document.getElementById("lead-form");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  }

  /* ---- shared form state (inline step-1 + overlay stay in sync) ---------- */
  var state = {
    open: false,
    step: 0,
    amount: 15000,
    sit: { count: "", type: "", stage: "", security: "", more: "" },
    fields: { first: "", last: "", phone: "", email: "", altPhone: "", address: "", city: "", state: "", zip: "", dob: "" }
  };

  /* ======================================================================
     SECTION MARKUP (returns HTML strings; classes identical to prototype)
     ====================================================================== */

  function Nav() {
    return '' +
      '<nav class="nav"><div class="container nav-inner">' +
        '<a href="#top" class="brand"><img src="assets/credo-logo.png" alt="Credo Legal — consumer-debt defense law firm"/></a>' +
        '<div class="nav-right">' +
          '<div class="nav-links">' +
            '<a href="#whatwedo">What we do</a>' +
            '<a href="#why">Why us</a>' +
            '<a href="#process">How it works</a>' +
            '<a href="#rights">Your rights</a>' +
            '<a href="#faq">FAQ</a>' +
          '</div>' +
          '<a href="' + C.phoneHref + '" class="nav-phone"><span class="nav-phone-pre">Call us: </span>' + C.phone + '</a>' +
          '<a href="#lead-form" data-scrollform class="nav-cta">Free review →</a>' +
        '</div>' +
      '</div></nav>';
  }

  function SectionNo(no, label) {
    return '<div class="section-no"><span>§ ' + no + ' · ' + label + '</span></div>';
  }

  /* hero figure — two systems (portrait / watercolor); optional tight crop */
  var HERO_ART = {
    portrait: {
      slug: "harassment-portrait",
      alt: "Sarah stands at her kitchen counter, arms crossed, looking out the window as her phone rings face-down beside her."
    },
    watercolor: {
      slug: "harassment-portrait-wc",
      alt: "Watercolor illustration: a woman stands at her kitchen counter, arms crossed, looking out the window, her phone face-down beside an opened collection letter and a red mug."
    }
  };
  function HeroFigure(tight) {
    var hs = heroStyle();
    var a = HERO_ART[hs] || HERO_ART.portrait;
    var slug = tight
      ? (hs === "portrait" ? "harassment-portrait-tight" : "harassment-portrait-wc-tight")
      : a.slug;
    return '' +
      '<div class="hero-figure" data-style="' + hs + '">' +
        '<picture>' +
          '<source srcset="assets/' + slug + '-960.webp" media="(min-width: 768px)" type="image/webp"/>' +
          '<source srcset="assets/' + slug + '-480.webp" type="image/webp"/>' +
          '<img src="assets/' + slug + '-480.jpg" loading="eager" decoding="async" alt="' + esc(a.alt) + '"/>' +
        '</picture>' +
      '</div>';
  }

  /* right-column body figure — photo on portrait site, watercolor on wc site */
  function BodyFig(kind) {
    var portrait = heroStyle() === "portrait";
    var map = {
      what: { wc: "body-what", ph: "body-what-photo",
        altWc: "Watercolor illustration: hands reviewing an opened collection letter and a notepad at a kitchen table.",
        altPh: "A person at a wooden table reviewing an opened letter and writing on a notepad, a deep-red mug beside them." },
      why: { wc: "body-why", ph: "body-why-photo",
        altWc: "Watercolor illustration: an attorney's desk with a legal pad, fountain pen, lamp, and a law book with a red ribbon marker.",
        altPh: "An attorney's desk with a legal pad, fountain pen, banker's lamp, and a law book with a red ribbon marker." },
      who: { wc: "who-hope", ph: "who-onphone",
        altWc: "Watercolor illustration: a woman at her kitchen counter on the phone with her attorney, a cease-letter and law book beside her in warm morning light.",
        altPh: "A woman standing in her kitchen on the phone with her attorney, holding a notepad in warm morning light." }
    };
    var m = map[kind];
    var slug = portrait ? m.ph : m.wc;
    var alt = portrait ? m.altPh : m.altWc;
    return '' +
      '<div class="body-fig has-img">' +
        '<picture>' +
          '<source srcset="assets/' + slug + '-960.webp" media="(min-width: 768px)" type="image/webp"/>' +
          '<source srcset="assets/' + slug + '-480.webp" type="image/webp"/>' +
          '<img src="assets/' + slug + '-480.jpg" alt="' + esc(alt) + '" loading="lazy" decoding="async"/>' +
        '</picture>' +
      '</div>';
  }

  /* ---- multi-step form bodies ------------------------------------------- */
  function StepIndicator(step) {
    return '<div class="form-steps">' + C.form.steps.map(function (s, i) {
      var cls = "st" + (i === step ? " active" : "") + (i < step ? " done" : "");
      var mark = i < step ? Ico.check(12) : s.n;
      return '<div class="' + cls + '"><span class="stn">' + mark + '</span><span class="stl">' + s.label + '</span></div>';
    }).join("") + '</div>';
  }

  function StepDebt() {
    return '' +
      '<p class="q">' + C.form.debtQuestion + '</p>' +
      '<p class="qsub">An estimate is fine. It helps us understand your situation.</p>' +
      '<div class="amount" data-amount>' + fmtAmt(state.amount) + '</div>' +
      '<input class="slider" type="range" min="0" max="100000" step="1000" value="' + state.amount + '" aria-label="Estimated amount owed" data-slider/>' +
      '<div class="slider-ends"><span>$0</span><span>$100,000+</span></div>';
  }

  function StepSituation() {
    var s = C.form.situationFields;
    function sel(k) {
      var opts = '<option value="">' + s[k].placeholder + '</option>' +
        s[k].options.map(function (o) {
          return '<option value="' + esc(o) + '"' + (state.sit[k] === o ? " selected" : "") + '>' + o + '</option>';
        }).join("");
      return '<div><label>' + s[k].label + '</label><select data-sit="' + k + '">' + opts + '</select></div>';
    }
    return '' +
      '<p class="q">Tell us about the debt.</p>' +
      '<p class="qsub">A few details help an attorney assess your case before the call.</p>' +
      '<div class="field row2">' + sel("count") + sel("type") + '</div>' +
      '<div class="field row2">' + sel("stage") + sel("security") + '</div>' +
      '<div class="field"><label>' + s.more.label + '</label>' +
        '<textarea data-sit="more" placeholder="' + esc(s.more.placeholder) + '">' + esc(state.sit.more) + '</textarea></div>';
  }

  function StepDetails() {
    var L = C.form.detailLabels;
    function inp(k, attrs) {
      attrs = attrs || "";
      return '<input value="' + esc(state.fields[k]) + '" placeholder="' + esc(L[k]) + '" data-field="' + k + '" ' + attrs + '/>';
    }
    var stateOpts = '<option value="">Select state</option>' + C.form.states.map(function (st) {
      return '<option value="' + esc(st) + '"' + (state.fields.state === st ? " selected" : "") + '>' + st + '</option>';
    }).join("");
    return '' +
      '<p class="q">Where should an attorney reach you?</p>' +
      '<p class="qsub">A real person reviews your case. We never sell your information.</p>' +
      '<div class="field row2"><div><label>' + L.first + ' *</label>' + inp("first") + '</div><div><label>' + L.last + ' *</label>' + inp("last") + '</div></div>' +
      '<div class="field row2"><div><label>' + L.phone + ' *</label>' + inp("phone", 'inputmode="tel"') + '</div><div><label>' + L.email + ' *</label>' + inp("email", 'inputmode="email"') + '</div></div>' +
      '<div class="field row2"><div><label>' + L.altPhone + '</label>' + inp("altPhone", 'inputmode="tel"') + '</div><div><label>' + L.address + '</label>' + inp("address") + '</div></div>' +
      '<div class="field row2"><div><label>' + L.city + '</label>' + inp("city") + '</div><div><label>' + L.state + ' *</label>' +
        '<select data-field="state">' + stateOpts + '</select></div></div>' +
      '<div class="field row2"><div><label>' + L.zip + '</label>' + inp("zip", 'inputmode="numeric"') + '</div><div><label>' + L.dob + '</label>' +
        '<input value="' + esc(state.fields.dob) + '" placeholder="MM/DD/YYYY" data-field="dob" inputmode="numeric" maxlength="10"/></div></div>' +
      '<div class="form-exclusion">' + C.form.stateExclusion + '</div>';
  }

  /* inline step-1 card. Continue opens the overlay at step 2. */
  function LeadForm(opts) {
    opts = opts || {};
    var id = opts.id || "lead-form";
    var headLabel = opts.headLabel || "FREE CASE EVALUATION";
    return '' +
      '<div class="form" id="' + id + '">' +
        '<div class="form-head"><span>' + headLabel + '</span><span class="red">NO UPFRONT COST</span></div>' +
        StepIndicator(0) +
        '<div class="form-body">' + StepDebt() + '</div>' +
        '<div class="form-foot">' +
          '<div class="form-nav">' +
            '<button class="btn-stamp full" data-form-continue>Continue ' + Ico.arrow + '</button>' +
          '</div>' +
          '<p class="form-fine">' + C.disclaimer + '</p>' +
        '</div>' +
      '</div>';
  }

  /* full-screen overlay wizard (steps 1–3). Covers the nav. */
  function overlayMarkup() {
    var heads = ["YOUR DEBT", "YOUR SITUATION", "YOUR DETAILS"];
    var titles = ["Let's start with the basics.", "Tell us what's been happening.", "How do we reach you?"];
    var body = state.step === 0 ? StepDebt() : state.step === 1 ? StepSituation() : StepDetails();
    var nav = '<button class="btn-ghost" data-fo-back>' + (state.step > 0 ? "Back" : "Close") + '</button>';
    if (state.step < 2) {
      nav += '<button class="btn-stamp" data-fo-next>Continue ' + Ico.arrow + '</button>';
    } else {
      nav += '<button class="btn-stamp" data-fo-submit' + (canSubmit() ? "" : " disabled") + '>' + C.form.submit + ' ' + Ico.arrow + '</button>';
    }
    return '' +
      '<div class="form-overlay" role="dialog" aria-modal="true" aria-label="Free case evaluation">' +
        '<div class="fo-bar">' +
          '<span class="fo-brand"><img src="assets/credo-logo.png" alt="Credo Legal"/></span>' +
          '<span class="fo-step">FREE CASE EVALUATION · STEP ' + (state.step + 1) + ' OF 3</span>' +
          '<button class="fo-close" data-fo-close aria-label="Close">' + Ico.close + '</button>' +
        '</div>' +
        '<div class="fo-body">' +
          '<div class="fo-card">' +
            '<h2 class="fo-title">' + titles[state.step] + '</h2>' +
            '<div class="form">' +
              '<div class="form-head"><span>' + heads[state.step] + '</span><span class="red">NO UPFRONT COST</span></div>' +
              StepIndicator(state.step) +
              '<div class="form-body">' + body + '</div>' +
              '<div class="form-foot">' +
                '<div class="form-nav">' + nav + '</div>' +
                '<p class="form-fine">' + C.disclaimer + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function canSubmit() {
    var f = state.fields;
    return !!(f.first.trim() && f.last.trim() && f.phone.trim() && f.email.trim() && f.state);
  }

  /* ---- review badges (BBB / Trustpilot / Google) + headline metrics ----- */
  function BBBMark() {
    return '<svg class="logo" viewBox="0 0 56 56" width="42" height="42" aria-hidden="true">' +
      '<path d="M28 3 L49 12 L45 36 Q41 48 28 53 Q15 48 11 36 L7 12 Z" fill="#0e4684"/>' +
      '<text x="28" y="27" text-anchor="middle" font-family="Hanken Grotesk, sans-serif" font-size="15" font-weight="800" fill="#fff" letter-spacing="-0.5">BBB</text>' +
      '<text x="28" y="42" text-anchor="middle" font-family="Hanken Grotesk, sans-serif" font-size="13" font-weight="700" fill="#fff">A</text>' +
      '</svg>';
  }
  function TrustpilotMark() {
    return '<svg class="logo" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">' +
      '<rect width="24" height="24" rx="3" fill="#00b67a"/>' +
      '<polygon points="12,4 14.3,9.3 20,9.7 15.6,13.4 17,19 12,15.7 7,19 8.4,13.4 4,9.7 9.7,9.3" fill="#fff"/>' +
      '</svg>';
  }
  function GoogleMark() {
    return '<svg class="logo" viewBox="0 0 48 48" width="32" height="32" aria-hidden="true">' +
      '<path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>' +
      '<path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>' +
      '<path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.3C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"/>' +
      '<path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.3C39.3 41.5 44 38 44 24c0-1.3-.1-2.3-.4-3.5z"/>' +
      '</svg>';
  }
  function Stars(n) {
    var out = '<span class="stars" aria-hidden="true">';
    for (var i = 0; i < 5; i++) {
      out += '<svg viewBox="0 0 20 20" width="12" height="12"><polygon points="10,1 12.6,7 19,7.6 14,11.8 15.6,18 10,14.6 4.4,18 6,11.8 1,7.6 7.4,7" fill="' + (i < Math.round(n) ? "#e0a92e" : "#d6dae0") + '"/></svg>';
    }
    return out + '</span>';
  }
  function ReviewBar(metrics) {
    var r = C.reviews;
    var rows = '' +
      '<div class="rev-row">' +
        '<div class="rev">' + BBBMark() + '<div><div class="rv-title">' + r.bbb.title + '</div><div class="rv-meta">' + r.bbb.meta + '</div></div></div>' +
        '<div class="rev">' + TrustpilotMark() + '<div><div class="rv-title">' + r.trustpilot.title + ' ' + Stars(4.5) + '</div><div class="rv-meta">' + r.trustpilot.meta + '</div></div></div>' +
        '<div class="rev">' + GoogleMark() + '<div><div class="rv-title">' + r.google.title + ' ' + Stars(4.7) + '</div><div class="rv-meta">' + r.google.meta + '</div></div></div>' +
      '</div>';
    var mrow = "";
    if (metrics) {
      mrow = '<div class="metric-row">' + C.metrics.map(function (m) {
        return '<div class="m"><span class="m-n">' + m[0] + '</span><span class="m-l">' + m[1] + '</span></div>';
      }).join("") + '</div>';
    }
    return '<div class="reviewbar">' + rows + mrow + '</div>';
  }

  /* ---- body sections ---------------------------------------------------- */
  function WhatWeDo() {
    return '' +
      '<div class="eyebrow">What we do</div>' +
      '<h2 class="h2">' + C.whatWeDo.intro + '</h2>' +
      '<ol class="claim-list">' + C.whatWeDo.bullets.map(function (b, i) {
        return '<li><span class="cn">' + pad2(i + 1) + '</span><span>' + b + '</span></li>';
      }).join("") + '</ol>';
  }
  function WhyChoose() {
    return '' +
      '<div class="eyebrow">Why Credo</div>' +
      '<h2 class="h2">Legal advice, not a fact sheet.</h2>' +
      '<ul class="why" style="margin-top:28px">' + C.whyChoose.map(function (row) {
        return '<li><p class="wl">' + row[0] + '</p><p class="wb">' + row[1] + '</p></li>';
      }).join("") + '</ul>';
  }
  function CommonProblems(cols3) {
    return '' +
      '<div class="eyebrow">What we see</div>' +
      '<h2 class="h2">Common problems, and the line each one crosses.</h2>' +
      '<div class="box-grid' + (cols3 ? " cols3" : "") + '" style="margin-top:28px">' + C.commonProblems.map(function (row, i) {
        return '<div class="box"><div class="bmeta"><span>' + pad2(i + 1) + '</span><span>' + row[2] + '</span></div><h3>' + row[0] + '</h3><p>' + row[1] + '</p></div>';
      }).join("") + '</div>';
  }
  function HowItWorks(cols) {
    return '' +
      '<div class="eyebrow">How it works</div>' +
      '<h2 class="h2">A clear sequence, on a known timeline.</h2>' +
      '<div class="process' + (cols ? " cols" : "") + '" style="margin-top:28px">' + C.howItWorks.map(function (row, i) {
        return '<div class="step"><div class="n">' + pad2(i + 1) + '</div><div><h3>' + row[0] + '</h3><p>' + row[1] + '</p><div class="when">' + row[2] + '</div></div></div>';
      }).join("") + '</div>';
  }
  function Rights() {
    return '' +
      '<div class="eyebrow">Your rights</div>' +
      '<h2 class="h2">' + C.rights.intro + '</h2>' +
      '<div class="rights" style="margin-top:28px">' + C.rights.items.map(function (r) {
        return '<div class="right">' +
          '<div class="gut">' + r.cite + '<span class="b">' + r.label + '</span></div>' +
          '<div><h3>' + r.text + '</h3><div class="ex"><div class="exl">' + r.exLabel + '</div><p>' + r.ex + '</p></div></div>' +
        '</div>';
      }).join("") + '</div>';
  }
  function WhoHelps() {
    return '' +
      '<div class="eyebrow">Who this helps</div>' +
      '<h2 class="h2">You\'ll recognize your own situation here.</h2>' +
      '<ul class="who-list" style="margin-top:28px">' + C.whoHelps.map(function (w, i) {
        return '<li><span class="wn">' + pad2(i + 1) + '</span><span>' + w + '</span></li>';
      }).join("") + '</ul>';
  }
  function FAQ() {
    return '' +
      '<div class="eyebrow">Frequently asked</div>' +
      '<h2 class="h2">Questions, answered plainly.</h2>' +
      '<div class="faq faq-static" style="margin-top:28px">' + C.faq.map(function (qa) {
        return '<div class="qa open"><div class="q">' + qa[0] + '</div><div class="a"><p>' + qa[1] + '</p></div></div>';
      }).join("") + '</div>';
  }
  function InlineCTA(label) {
    return '<div class="inline-cta"><button class="btn-stamp" data-scrollform>' + (label || "Get a free case evaluation") + ' ' + Ico.arrow + '</button></div>';
  }
  function BottomCTA() {
    return '' +
      '<section class="bottom-cta" id="begin"><div class="container">' +
        SectionNo("99", "Closing") +
        '<div class="eyebrow">Ready when you are</div>' +
        '<h2>Know your rights before you make any <em>decision</em>.</h2>' +
        '<p>' + C.bottomCta.body + '</p>' +
        '<button class="btn-stamp" data-scrollform>' + C.bottomCta.cta + ' ' + Ico.arrow + '</button>' +
        '<div class="bphone">Or call <a href="' + C.phoneHref + '">' + C.phone + '</a></div>' +
      '</div></section>';
  }
  function Footer() {
    return '' +
      '<footer class="foot"><div class="container">' +
        '<div class="frow">' +
          '<a href="#top" class="brand"><img src="assets/credo-logo.png" alt="Credo Legal"/></a>' +
          '<div class="flinks"><a href="#">About</a><a href="#">Contact</a><a href="#">Privacy</a><a href="#">Disclaimer</a></div>' +
          '<span class="fmeta">© 2026 · ATTORNEY ADVERTISING</span>' +
        '</div>' +
        '<p class="disclaimer">' + C.disclaimer + ' Credo Legal is a multi-jurisdictional law firm. Communication through this site does not create an attorney–client relationship. Not a debt-settlement company. Not a credit-counseling service.</p>' +
        '<p class="state-excl">' + C.form.stateExclusion + '</p>' +
      '</div></footer>';
  }
  function StickyCTA() {
    return '' +
      '<div class="sticky-cta">' +
        '<button class="btn-stamp" data-scrollform>' + C.form.submit + ' ' + Ico.arrow + '</button>' +
        '<a class="sphone" href="' + C.phoneHref + '" aria-label="Call us">' + Ico.phone(22) + '</a>' +
      '</div>' +
      '<div class="tidio-ghost" title="Chat (Tidio launcher placeholder)">' + Ico.chat(22) + '</div>';
  }

  /* ======================================================================
     VARIANTS
     ====================================================================== */

  /* Variant A — Locked · paired (default) */
  function VariantA() {
    return '' +
      '<div class="lp has-sticky" data-variant="a">' +
        '<section class="hero" id="top"><div class="container">' +
          '<div class="hero-grid">' +
            '<div>' +
              '<div class="hero-no"><span>§ 00 · HARASSMENT · FDCPA</span></div>' +
              '<h1 class="h1">Our attorneys explain your rights, then <em>act</em> on them.</h1>' +
              '<p class="lede">' + C.hero.lede + '</p>' +
              '<p class="form-fine" style="margin:0 0 22px">' + C.hero.filler + '</p>' +
              LeadForm() +
              '<a class="hero-call" href="' + C.phoneHref + '" style="display:inline-block;margin-top:18px">Or call <b>' + C.phone + '</b></a>' +
            '</div>' +
            '<div>' + HeroFigure(false) + '</div>' +
          '</div>' +
        '</div></section>' +

        '<div class="container" style="padding-top:0">' + ReviewBar(true) + '</div>' +

        '<section class="section"><div class="container">' +
          '<div class="imgrow">' +
            '<div id="whatwedo">' + SectionNo("01", "Practice") + WhatWeDo() + '</div>' +
            BodyFig("what") +
          '</div>' +
          '<div style="height:48px"></div>' +
          '<div class="imgrow">' +
            '<div id="why">' + SectionNo("02", "Difference") + WhyChoose() + '</div>' +
            BodyFig("why") +
          '</div>' +
          '<div class="inline-cta only-desktop" style="margin-top:48px"><button class="btn-stamp" data-scrollform>See if you qualify, free ' + Ico.arrow + '</button></div>' +
        '</div></section>' +

        '<section class="section alt"><div class="container">' +
          '<div>' + SectionNo("03", "Patterns") + CommonProblems(true) + '</div>' +
          '<div style="height:64px"></div>' +
          '<div class="imgrow">' +
            '<div>' + SectionNo("04", "Fit") + WhoHelps() + '</div>' +
            BodyFig("who") +
          '</div>' +
        '</div></section>' +

        '<section class="section" id="process"><div class="container">' +
          '<div>' + SectionNo("05", "Method") + HowItWorks(true) + '</div>' +
          InlineCTA("Speak to an attorney now") +
        '</div></section>' +

        '<div class="container">' + ReviewBar(false) + '</div>' +

        '<section class="section" id="rights"><div class="container">' +
          '<div>' + SectionNo("06", "Statute") + Rights() + '</div>' +
          '<div id="faq" style="margin-top:72px">' + SectionNo("07", "Questions") + FAQ() + '</div>' +
        '</div></section>' +

        BottomCTA() +
      '</div>';
  }

  /* Variant C — Sticky conversion rail */
  function VariantC() {
    return '' +
      '<div class="lp has-sticky" data-variant="c">' +
        '<section class="hero" id="top"><div class="container">' +
          '<div class="hero-grid">' +
            '<div>' +
              '<div class="hero-no"><span>§ 00 · HARASSMENT · FDCPA</span></div>' +
              '<h1 class="h1">Our attorneys explain your rights, then <em>act</em> on them.</h1>' +
              '<p class="lede">' + C.hero.lede + '</p>' +
              '<div class="hero-cta" style="margin-top:52px">' +
                '<button class="btn-stamp" data-scrollform>' + C.form.submit + ' ' + Ico.arrow + '</button>' +
                '<a class="hero-call" href="' + C.phoneHref + '">Or call <b>' + C.phone + '</b></a>' +
              '</div>' +
            '</div>' +
            '<div>' + HeroFigure(true) + '</div>' +
          '</div>' +
        '</div></section>' +

        '<div class="container" style="padding-top:0">' + ReviewBar(true) + '</div>' +

        '<section class="section"><div class="container">' +
          '<div class="rail-wrap">' +
            '<div class="rail-content">' +
              '<div id="whatwedo">' + SectionNo("01", "Practice") + WhatWeDo() + '</div>' +
              '<div style="height:48px"></div>' +
              '<div id="why">' + SectionNo("02", "Difference") + WhyChoose() + '</div>' +
              '<div style="height:48px"></div>' +
              '<div>' + SectionNo("03", "Patterns") + CommonProblems(false) + '</div>' +
              '<div style="height:48px"></div>' +
              '<div>' + SectionNo("04", "Fit") + WhoHelps() + '</div>' +
              '<div style="height:48px"></div>' +
              '<div id="process">' + SectionNo("05", "Method") + HowItWorks(false) + '</div>' +
            '</div>' +
            '<div class="rail-side">' +
              LeadForm({ headLabel: "START — FREE REVIEW" }) +
              '<p class="rail-reassure">' + Ico.scale(16) + '<span>A licensed attorney reviews your case. We never sell your information. ' + C.form.stateExclusion + '</span></p>' +
            '</div>' +
          '</div>' +
        '</div></section>' +

        '<div class="container">' + ReviewBar(false) + '</div>' +

        '<section class="section" id="rights"><div class="container">' +
          '<div>' + SectionNo("06", "Statute") + Rights() + '</div>' +
          '<div id="faq" style="margin-top:72px">' + SectionNo("07", "Questions") + FAQ() + '</div>' +
        '</div></section>' +

        BottomCTA() +
      '</div>';
  }

  /* ======================================================================
     RENDER + INTERACTIVITY
     ====================================================================== */

  var overlayEl = null;

  function renderOverlay() {
    if (overlayEl) { overlayEl.parentNode.removeChild(overlayEl); overlayEl = null; }
    if (!state.open) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    var wrap = document.createElement("div");
    wrap.innerHTML = overlayMarkup();
    overlayEl = wrap.firstChild;
    document.body.appendChild(overlayEl);
    wireOverlay(overlayEl);
  }

  function wireOverlay(root) {
    var amount = root.querySelector("[data-amount]");
    var slider = root.querySelector("[data-slider]");
    if (slider) {
      slider.addEventListener("input", function () {
        state.amount = +slider.value;
        if (amount) amount.textContent = fmtAmt(state.amount);
        syncInlineSlider();
      });
    }
    root.querySelectorAll("[data-sit]").forEach(function (node) {
      var k = node.getAttribute("data-sit");
      node.addEventListener("input", function () { state.sit[k] = node.value; });
      node.addEventListener("change", function () { state.sit[k] = node.value; });
    });
    root.querySelectorAll("[data-field]").forEach(function (node) {
      var k = node.getAttribute("data-field");
      node.addEventListener("input", function (e) {
        if (k === "dob") {
          var isDel = e.inputType && e.inputType.indexOf("delete") === 0;
          node.value = formatDob(node.value, isDel);
        }
        state.fields[k] = node.value;
        var submit = root.querySelector("[data-fo-submit]");
        if (submit) submit.disabled = !canSubmit();
      });
      node.addEventListener("change", function () { state.fields[k] = node.value; });
    });
    var back = root.querySelector("[data-fo-back]");
    if (back) back.addEventListener("click", function () {
      if (state.step > 0) { state.step--; renderOverlay(); } else { closeOverlay(); }
    });
    var next = root.querySelector("[data-fo-next]");
    if (next) next.addEventListener("click", function () { state.step++; renderOverlay(); });
    var submit = root.querySelector("[data-fo-submit]");
    if (submit) submit.addEventListener("click", function () {
      if (canSubmit()) window.location.href = "thank-you.html";
    });
    var close = root.querySelector("[data-fo-close]");
    if (close) close.addEventListener("click", closeOverlay);
  }

  function openOverlay(step) {
    state.step = step;
    state.open = true;
    renderOverlay();
  }
  function closeOverlay() {
    state.open = false;
    renderOverlay();
  }

  /* keep the inline step-1 slider/amount in sync with overlay edits */
  function syncInlineSlider() {
    var inline = document.getElementById("lead-form");
    if (!inline) return;
    var a = inline.querySelector("[data-amount]");
    var s = inline.querySelector("[data-slider]");
    if (a) a.textContent = fmtAmt(state.amount);
    if (s) s.value = state.amount;
  }

  function wireInlineForm() {
    document.querySelectorAll(".form .form-body [data-slider]").forEach(function (slider) {
      var card = slider.closest(".form");
      var amount = card.querySelector("[data-amount]");
      slider.addEventListener("input", function () {
        state.amount = +slider.value;
        if (amount) amount.textContent = fmtAmt(state.amount);
      });
    });
    document.querySelectorAll("[data-form-continue]").forEach(function (btn) {
      btn.addEventListener("click", function () { openOverlay(1); });
    });
  }

  function wireScrollForm(root) {
    root.querySelectorAll("[data-scrollform]").forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); scrollToForm(); });
    });
  }

  function onKey(e) {
    if (e.key === "Escape" && state.open && state.step === 0) closeOverlay();
  }

  function render(opts) {
    opts = opts || {};
    var variant = (opts.variant || "a").toLowerCase();
    var hero = opts.hero || "portrait";
    window.CREDO_HERO_STYLE = hero;
    document.documentElement.setAttribute("data-hero-style", hero);
    document.documentElement.setAttribute("data-labels", "plain");

    var root = document.getElementById("root");
    var body = variant === "c" ? VariantC() : VariantA();
    root.innerHTML = Nav() + body + Footer() + StickyCTA();

    wireScrollForm(root);
    wireInlineForm();
    window.addEventListener("keydown", onKey);
  }

  window.CredoLP = { render: render };
})();
