/* Left-hand navigation for the staging fix plan — same pattern as the Nextdoor hub's hub-nav.js.
 * Usage, right after <body>:  <script src="plan-nav.js" data-page="backlog"></script>
 * (backlog | rules | decisions). Fixed 208px sidebar; under 900px a horizontal bar. */
(function () {
  var me = document.currentScript;
  var page = (me && me.getAttribute('data-page')) || 'backlog';

  var ITEMS = [
    { id: 'backlog',   href: 'index.html',     icon: '📋', label: 'Backlog',             sub: 'PBIs and tasks, WIP limit 1' },
    { id: 'decisions', href: 'decisions.html', icon: '⚖️', label: 'Decisions & manual',  sub: 'What only you can do' },
    { id: 'rules',     href: 'rules.html',     icon: '🛡️', label: 'Guard rails',         sub: 'Staging only: how it is kept safe' }
  ];

  var CSS =
    '.plnav{position:fixed;top:0;left:0;bottom:0;width:208px;z-index:40;background:#12141d;color:#fff;' +
      'display:flex;flex-direction:column;padding:18px 12px;gap:4px;' +
      'font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;overflow:auto}' +
    '.plnav .brand{display:flex;align-items:center;gap:9px;padding:0 8px 14px;margin-bottom:6px;border-bottom:1px solid #2a2f37}' +
    '.plnav .brand img{width:26px;height:26px;object-fit:contain;background:#fff;border-radius:6px;padding:2px}' +
    '.plnav .brand span{font:700 12.5px/1.2 Georgia,"Times New Roman",serif}' +
    '.plnav .brand small{display:block;font:400 10px/1.3 system-ui,sans-serif;color:#8a918d;letter-spacing:.04em;text-transform:uppercase;margin-top:2px}' +
    '.plnav a{display:block;padding:9px 10px;border-radius:9px;text-decoration:none;color:#c8cdd6;transition:background .15s,color .15s}' +
    '.plnav a:hover{background:#1e222c;color:#fff}' +
    '.plnav a.on{background:#c92028;color:#fff}' +
    '.plnav a .t{font:600 13px/1.25 system-ui,sans-serif;display:flex;gap:7px;align-items:center}' +
    '.plnav a .s{font:400 10.5px/1.35 system-ui,sans-serif;color:#8a918d;margin-top:3px;padding-left:23px;display:block}' +
    '.plnav a.on .s{color:#f6d2d4}' +
    '.plnav .foot{margin-top:auto;padding:12px 10px 0;border-top:1px solid #2a2f37;font:400 10.5px/1.6 system-ui,sans-serif;color:#6f7782}' +
    '.plnav .foot a{display:inline;padding:0;color:#8a918d;text-decoration:underline}' +
    '.plnav .foot a:hover{background:none;color:#fff}' +
    'body{padding-left:208px}' +
    '@media(max-width:900px){' +
      '.plnav{position:static;width:auto;flex-direction:row;align-items:center;gap:6px;padding:10px 12px;' +
        'border-bottom:1px solid #2a2f37;overflow-x:auto}' +
      '.plnav .brand{border:none;padding:0 10px 0 0;margin:0;flex:0 0 auto}' +
      '.plnav .brand small,.plnav a .s,.plnav .foot{display:none}' +
      '.plnav a{white-space:nowrap;padding:8px 11px}' +
      'body{padding-left:0}}' +
    '@media print{.plnav{display:none}body{padding-left:0}}';

  function build() {
    if (document.querySelector('.plnav')) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var nav = document.createElement('nav');
    nav.className = 'plnav';
    nav.setAttribute('aria-label', 'Staging fix plan sections');
    nav.innerHTML =
      '<div class="brand"><img src="credo-mark.png" alt=""><span>Crēdo Legal<small>Staging fix plan</small></span></div>' +
      ITEMS.map(function (i) {
        return '<a href="' + i.href + '"' + (i.id === page ? ' class="on" aria-current="page"' : '') + '>' +
          '<span class="t">' + i.icon + ' ' + i.label + '</span><span class="s">' + i.sub + '</span></a>';
      }).join('') +
      '<div class="foot">Plan · awaiting approval<br>' +
        '<a href="https://staging.credolegal.com/debt-harassment-stop-calls" target="_blank" rel="noopener">Staging site ↗</a><br>' +
        '<a href="../qa/lpcheck-2026-09-23/" target="_blank" rel="noopener">Cross-browser report ↗</a></div>';
    document.body.insertBefore(nav, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
