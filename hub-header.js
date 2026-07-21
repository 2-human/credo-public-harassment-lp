/* Shared review-hub header — one uniform header across every hub component
 * (LP review, Ads → LP, Phone map, Statute map, Blog). Single source of truth.
 *
 * Usage on a page:
 *   <div id="hub-header" data-page="ads-map"></div>
 *   <script src="hub-header.js"></script>
 *
 * Renders: [logo] Credo·Legal · <Section>  <subtitle> ........ [← LP review] [Sections ▾]
 * Matches review.html's dark bar (#111418 / accent #ff6b73). The interactive
 * review.html keeps its own toolbar (mix/phone/search) but the same brand + Sections. */
(function () {
  var mount = document.getElementById('hub-header');
  if (!mount) return;
  var page = mount.getAttribute('data-page') || '';

  var META = {
    'review':      { name: 'LP Review',   sub: '32 landing-page variants across 7 debt clusters' },
    'ads-map':     { name: 'Ads → LP',    sub: 'Every ad mapped to its landing-page final URL + UTM tracking' },
    'phone-map':   { name: 'Phone map',   sub: 'Every ad × platform, with its call-tracking phone number' },
    'statute-map': { name: 'Statute map', sub: 'Every claim + FAQ mapped to 15 U.S.C. § 1692' },
    'blog':        { name: 'Blog',        sub: 'Article library' }
  };
  /* Canonical section list (mirrors review.html's Sections menu). */
  var SECTIONS = [
    { h: 'This hub', items: [
      { id: 'review',      label: 'LP review',      href: 'review.html' },
      { id: 'statute-map', label: 'Statute map',    href: 'statute-map.html' },
      { id: 'ads-map',     label: 'Ads → LP',       href: 'ads-map.html' },
      { id: 'phone-map',   label: 'Phone map',      href: 'phone-map.html' },
      { id: 'blog',        label: 'Blog',           href: 'blog.html' },
      { id: 'webflow',     label: 'Webflow export', href: 'webflow-lp/index.html' }
    ]},
    { h: 'Social campaign', items: [
      { id: 'social-hub', label: 'Social hub',      href: 'https://2-human.github.io/credo-public-social-hub/' },
      { id: 'social-cal', label: 'Social calendar', href: 'https://2-human.github.io/credo-public-social-hub/calendar.html' }
    ]}
  ];

  var CSS =
  '.hh-bar{position:sticky;top:0;z-index:50;background:#111418;color:#fff;display:flex;align-items:center;gap:14px;' +
  'padding:0 20px;height:56px;border-bottom:1px solid #2a2f37;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}' +
  '.hh-brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#fff;white-space:nowrap;flex:0 0 auto}' +
  '.hh-logo{height:22px;width:auto;display:block}' +
  '.hh-nm{font-size:13px;font-weight:600;letter-spacing:-0.01em}' +
  '.hh-nm .hh-dot{color:#ff6b73}.hh-nm .hh-mid{color:#5b6470;margin:0 3px}.hh-nm b{font-weight:600}' +
  '.hh-sub{font-size:12px;color:#8590a0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}' +
  '.hh-spacer{flex:1 1 auto;min-width:8px}' +
  '.hh-back,.hh-menu-btn{font:600 11px/1 -apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:.08em;text-transform:uppercase;' +
  'color:#c8cdd6;background:none;border:1px solid #2a2f37;padding:8px 12px;cursor:pointer;text-decoration:none;border-radius:3px;transition:all .15s;white-space:nowrap;flex:0 0 auto}' +
  '.hh-back:hover,.hh-menu-btn:hover{color:#fff;border-color:#5b6470}' +
  '.hh-menu{position:relative;display:inline-flex;flex:0 0 auto}' +
  '.hh-menu-btn::after{content:" \\25be";color:#8590a0}' +
  '.hh-menu.open .hh-menu-btn{color:#fff;border-color:#5b6470;background:#1a1e25}' +
  '.hh-menu-panel{position:absolute;top:calc(100% + 6px);right:0;z-index:60;min-width:200px;padding:5px;display:none;flex-direction:column;' +
  'background:#1a1e25;border:1px solid #2a2f37;border-radius:4px;box-shadow:0 10px 28px rgba(0,0,0,.45)}' +
  '.hh-menu.open .hh-menu-panel{display:flex}' +
  '.hh-mi{font:600 11px/1 -apple-system,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#c8cdd6;text-decoration:none;' +
  'padding:8px 11px;border-radius:3px;white-space:nowrap;transition:background .12s,color .12s;display:block}' +
  'a.hh-mi:hover{background:#2a2f37;color:#fff}' +
  '.hh-mi.hh-cur{color:#ff6b73;cursor:default}.hh-mi.hh-cur::after{content:" \\2713";opacity:.8}' +
  '.hh-sep{height:1px;background:#2a2f37;margin:5px 8px}' +
  '.hh-mh{font-size:9px;letter-spacing:.1em;color:#6b7480;text-transform:uppercase;padding:6px 11px 3px;font-weight:700}' +
  '@media(max-width:720px){.hh-sub{display:none}}';

  if (!document.getElementById('hh-css')) {
    var st = document.createElement('style'); st.id = 'hh-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }

  var m = META[page] || { name: page || 'Review hub', sub: '' };
  var menuHtml = SECTIONS.map(function (g) {
    return '<div class="hh-mh">' + g.h + '</div>' + g.items.map(function (it) {
      var ext = it.href.indexOf('http') === 0;
      if (it.id === page) return '<span class="hh-mi hh-cur" aria-current="page">' + it.label + '</span>';
      return '<a class="hh-mi" href="' + it.href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + it.label + (ext ? ' ↗' : '') + '</a>';
    }).join('');
  }).join('<div class="hh-sep"></div>');

  mount.className = 'hh-bar';
  mount.innerHTML =
    '<a class="hh-brand" href="review.html" title="Back to the LP review hub">' +
      '<img class="hh-logo" src="assets/credo-logo.png" alt="Credo Legal">' +
      '<span class="hh-nm"><span class="hh-mid">·</span><b>' + m.name + '</b></span>' +
    '</a>' +
    (m.sub ? '<span class="hh-sub">' + m.sub + '</span>' : '') +
    '<span class="hh-spacer"></span>' +
    (page !== 'review' ? '<a class="hh-back" href="review.html">← LP review</a>' : '') +
    '<div class="hh-menu" id="hh-menu"><button class="hh-menu-btn" aria-haspopup="true" aria-expanded="false">Sections</button>' +
      '<div class="hh-menu-panel" role="menu">' + menuHtml + '</div></div>';

  var menu = mount.querySelector('#hh-menu'), btn = menu.querySelector('.hh-menu-btn');
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function () {
    menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
  });
})();
