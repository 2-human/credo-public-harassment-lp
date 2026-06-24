/* review-mode.js — review widget (loads only on ?review=1). Classic script.
 * Floating add-comment pill (deepest hovered anchor) + banner + sidebar with
 * three status tabs (Active/Applied/Archived) per comment-lifecycle.md.
 * Persists via Firebase RTDB (/comments/{id}) or a localStorage fallback. */
const CFG = (window.CREDO_REVIEW_CONFIG) || {};
const L = Object.assign({
  bannerTitle:'Review mode', localOnly:'Local-only', exit:'Exit review', sidebarTitle:'Comments',
  empty:'No comments here yet. Hover an ad, its copy, headline, description, or image and click the +.',
  add:'+ Comment', save:'Post comment', cancel:'Cancel',
  edit:'Edit', del:'Delete', resolve:'Resolve', reopen:'Reopen',
  tabOpen:'Open', tabResolved:'Resolved', resolvePrompt:'Resolution note (what was done):',
  placeholder:'Your feedback…', replacementPlaceholder:'Suggested change (optional)…', namePrompt:'Your name:'
}, CFG.REVIEW_LABELS || {});
const FB = CFG.FIREBASE_CONFIG || {};
const FB_OK = FB.apiKey && FB.apiKey.indexOf('PASTE') !== 0 && FB.databaseURL && FB.databaseURL.indexOf('PASTE') < 0;
const _MEM = {};
const store = {get(k){try{return localStorage.getItem(k)}catch(e){return (k in _MEM)?_MEM[k]:null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){_MEM[k]=v}}};

/* 2026-06-23: switched from canonical 'allowlist' mode to 'direct-text' mode
 * per library/features/review-widget/commentable-everything.md. Every element
 * with direct text content (≥2 chars) becomes commentable, except those in
 * the curated NEVER_ANCHOR deny-list (form controls, SVG internals, void
 * elements, layout-only table cells). Site chrome (nav/header[role=banner]/
 * footer) is still skipped because chromeAnchored is left at false; flip
 * that and add CHROME_COUNTERS routing if you want footer / nav comments. */
const NEVER_ANCHOR = new Set([
  'input','select','textarea','option','optgroup','datalist','fieldset','legend',
  'script','style','template','noscript','meta','link','title','head','html','body',
  'svg','path','circle','rect','ellipse','polygon','polyline','line','g','use','defs','symbol','marker',
  'iframe','embed','object','param',
  'br','hr','img','video','audio','source','track','picture',
  'col','colgroup'
]);
const CHROME_SEL = '.review-banner,.review-sidebar,.review-modal-overlay,.review-floating-pill,[data-review-skip]';
function hasDirectText(el){
  for (const child of el.childNodes) {
    if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length >= 2) return true;
  }
  return false;
}
function isInSiteChrome(el){ return !!el.closest('nav, header[role="banner"], footer'); }

function pageSlug(){let p=window.location.pathname.replace(/\/index\.html?$/,'');if(p===''||p==='/')return 'home';return p.replace(/^\/|\/$/g,'').replace(/\//g,'-')||'home';}
const SLUG = pageSlug();

/* Anchor counters persist across re-anchor passes (added 2026-06-24 with the
 * MutationObserver). Resetting per-call caused new step-2 form labels to
 * collide with already-issued step-1 label-N IDs once content swaps in. */
const ANCHOR_COUNTERS = {};

/* ───── Variant-scoped commenting (added 2026-06-24) ─────────────────────────
 * Goal: a comment on the hero IMAGE in the M·M mix should not appear when the
 * reviewer flips to W·W — but a comment on the hero HEADLINE applies to every
 * mix. Generalised so any future page-internal variation (mix, layout A/B,
 * copy A/B/C, etc.) can opt in.
 *
 * Contract:
 *   1. The page declares its dimensions in `window.CREDO_VARIANT_DIMENSIONS`,
 *      a map of `dimensionKey → () => currentValue` (e.g. {hero:()=>'m', who:()=>'w'}).
 *   2. Any element that varies along one or more dimensions carries
 *      `data-variant-scope="<dim1> <dim2> …"` (space-separated keys).
 *   3. When commenting on such an element, the widget tags the comment record's
 *      `page` field with `<pageSlug>#<dim>=<value>,…` for the dimensions it
 *      varies along. Untagged comments stay at bare `<pageSlug>`.
 *   4. When filtering comments on render, the widget shows a tagged comment
 *      only when every dimension/value in its page key matches the page's
 *      current dimension state.
 *
 * Untagged elements + untagged comments behave exactly as before. */
function _dims(){ return window.CREDO_VARIANT_DIMENSIONS || {}; }
function getVariantScope(elm){
  if(!elm||!elm.closest)return [];
  const carrier = elm.closest('[data-variant-scope]');
  if(!carrier) return [];
  return (carrier.getAttribute('data-variant-scope')||'').split(/\s+/).filter(Boolean);
}
function currentVariantSuffix(dimKeys){
  if(!dimKeys||!dimKeys.length) return '';
  const cfg = _dims();
  const parts = dimKeys.map(k=>{
    const fn = cfg[k];
    const v = (typeof fn === 'function') ? fn() : null;
    return (v==null) ? null : (k+'='+String(v));
  }).filter(Boolean);
  return parts.length ? ('#'+parts.join(',')) : '';
}
function effectivePage(elm){ return SLUG + currentVariantSuffix(getVariantScope(elm)); }
function pageMatches(commentPage){
  if(commentPage === SLUG) return true;
  if(typeof commentPage !== 'string') return false;
  if(!commentPage.startsWith(SLUG+'#')) return false;
  const dimsStr = commentPage.slice(SLUG.length+1);
  if(!dimsStr) return true;
  const cfg = _dims();
  for(const part of dimsStr.split(',')){
    const eq = part.indexOf('=');
    if(eq < 0) continue;
    const k = part.slice(0, eq);
    const v = part.slice(eq+1);
    const fn = cfg[k];
    if(typeof fn !== 'function') return false;     // unknown dimension → hide
    if(String(fn()) !== v) return false;            // mismatched value → hide
  }
  return true;
}
function reviewer(){let n=store.get('credo_reviewer');if(!n){n=(window.prompt(L.namePrompt,'')||'Anonymous').trim()||'Anonymous';store.set('credo_reviewer',n);}return n;}

/* status normalize (reader shim for legacy boolean records) */
function statusOf(c){ const s=c.status; if(s==='resolved'||s==='applied'||s==='archived'||c.archived||c.applied)return 'resolved'; return 'pending'; }

/* ---- adapter ---- */
function localAdapter(){
  const KEY='credo_review_comments'; let cb=null;
  const read=()=>{try{return JSON.parse(store.get(KEY)||'{}')}catch(e){return {}}};
  const write=o=>store.set(KEY,JSON.stringify(o)); const ping=()=>cb&&cb(read());
  return { local:true,
    subscribe(fn){cb=fn;fn(read());window.addEventListener('storage',e=>{if(e.key===KEY)fn(read())});return()=>{cb=null}},
    create(rec){const o=read();const id='c'+Date.now()+Math.random().toString(36).slice(2,7);o[id]=rec;write(o);ping();return Promise.resolve(id)},
    update(id,patch){const o=read();o[id]=Object.assign({},o[id],patch);write(o);ping();return Promise.resolve()},
    remove(id){const o=read();delete o[id];write(o);ping();return Promise.resolve()} };
}
async function firebaseAdapter(){
  const A=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
  const D=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');
  const app=(A.getApps&&A.getApps().length)?A.getApp():A.initializeApp(FB);
  const db=D.getDatabase(app); const root=D.ref(db,'comments');
  return { local:false,
    subscribe(fn){return D.onValue(root,s=>fn(s.val()||{}))},
    create(rec){const r=D.push(root);return D.set(r,rec).then(()=>r.key)},
    update(id,patch){return D.update(D.ref(db,'comments/'+id),patch)},
    remove(id){return D.remove(D.ref(db,'comments/'+id))} };
}

function el(t,c,h){const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return (s==null?'':String(s)).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function when(ts){const d=new Date(ts||Date.now());return d.toLocaleDateString()+' '+d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}

let SIDE,LIST,TABS,PILL,ADAPTER,ME,COMMENTS={},FILTER='open',curEl=null,curId=null,hideT=null;
let SELID=null,SELANCHOR=null; /* clicked comment: row id + its anchor (persist across re-renders) */
const TAB_OF={open:'pending',resolved:'resolved'};

function buildChrome(){
  const ban=el('div','review-banner');
  ban.innerHTML='<span class="rw-title">'+esc(L.bannerTitle)+'</span>'+(ADAPTER.local?'<span class="rw-local">'+esc(L.localOnly)+'</span>':'')+'<span class="rw-spacer"></span><span class="rw-name">'+esc(ME)+'</span>';
  const exit=el('button',null,esc(L.exit)); exit.onclick=()=>{const u=new URL(location.href);u.searchParams.delete('review');location.href=u.toString()};
  ban.appendChild(exit); document.body.appendChild(ban);

  SIDE=el('aside','review-sidebar');
  SIDE.appendChild(el('h3',null,'<span>'+esc(L.sidebarTitle)+'</span>'));
  TABS=el('div','review-tabs');
  [['open',L.tabOpen],['resolved',L.tabResolved]].forEach(([k,lbl])=>{
    const b=el('button',k===FILTER?'on':null,esc(lbl)+' <span class="rw-c">0</span>'); b.dataset.k=k;
    b.onclick=()=>{FILTER=k;TABS.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x.dataset.k===k));render();};
    TABS.appendChild(b);
  });
  SIDE.appendChild(TABS);
  LIST=el('div','review-list'); SIDE.appendChild(LIST); document.body.appendChild(SIDE);

  PILL=el('button','review-floating-pill',esc(L.add)); PILL.type='button'; PILL.setAttribute('data-review-skip','');
  document.body.appendChild(PILL);
  PILL.addEventListener('mouseenter',()=>clearTimeout(hideT));
  PILL.addEventListener('mouseleave',hidePillSoon);
  PILL.addEventListener('click',()=>{if(curId&&curEl)openComposer(curId,curEl)});
  /* Hover-time fallback (added 2026-06-24): if the hovered element is in a
   * freshly rendered region (e.g. the form overlay just appeared and the
   * MutationObserver re-anchor is queued for the next microtask), force an
   * anchor pass on the spot so the pill appears without the user having to
   * mouse out and back in. Cheap because anchorPass skips already-anchored
   * elements via the data-comment-id check. */
  document.addEventListener('mouseover',e=>{
    if(e.target.closest(CHROME_SEL))return;
    let a=e.target.closest('[data-comment-id]');
    if(!a){
      const tag=(e.target.tagName||'').toLowerCase();
      const looksAnchorable = tag && !NEVER_ANCHOR.has(tag) && hasDirectText(e.target) && !isInSiteChrome(e.target);
      const inUnanchoredImg = !!(e.target.closest && e.target.closest('img,picture,.hero-figure,.body-fig,figure'));
      if(looksAnchorable || inUnanchoredImg){
        anchorPass();
        anchorImagePass();
        a = e.target.closest('[data-comment-id]');
      }
    }
    if(a){clearTimeout(hideT);placePill(a);}
  });
  document.addEventListener('mouseout',e=>{const to=e.relatedTarget;if(to&&(to===PILL||(to.closest&&to.closest('[data-comment-id]'))))return;hidePillSoon();});
  window.addEventListener('scroll',()=>{if(curEl&&PILL.style.display==='block')placePill(curEl)},true);
}
function placePill(elm){curEl=elm;curId=elm.getAttribute('data-comment-id');PILL.style.display='block';const r=elm.getBoundingClientRect();PILL.style.top=Math.max(52,Math.min(r.top+6,window.innerHeight-34))+'px';PILL.style.left=Math.max(6,r.right-PILL.offsetWidth-8)+'px';}
function hidePillSoon(){hideT=setTimeout(()=>{PILL.style.display='none';curEl=null;curId=null;},140);}

function anchorPass(){
  /* commentable-everything 'direct-text' mode: iterate ALL elements; anchor
   * any element whose own text-node children include ≥2 trimmed chars, except
   * those in NEVER_ANCHOR. Counters live module-scope (ANCHOR_COUNTERS) so
   * re-runs after DOM mutations don't reissue duplicate IDs for new content. */
  document.querySelectorAll('*').forEach(elm=>{
    if(elm.closest(CHROME_SEL))return;             // widget chrome
    if(elm.hasAttribute('data-comment-id'))return;
    if(elm.hasAttribute('data-review-skip'))return;
    const tag=elm.tagName.toLowerCase();
    if(NEVER_ANCHOR.has(tag))return;
    if(!hasDirectText(elm))return;
    if(isInSiteChrome(elm))return;                 // chromeAnchored opt-in not enabled
    ANCHOR_COUNTERS[tag]=(ANCHOR_COUNTERS[tag]||0)+1;
    elm.setAttribute('data-comment-id',SLUG+'-'+tag+'-'+ANCHOR_COUNTERS[tag]);
  });
}

/* Image anchor pass (added 2026-06-24). Images themselves are in NEVER_ANCHOR
 * and their wrapping <picture> is too, so the text pass skips both. Walk
 * <img> elements and anchor the nearest meaningful container instead — the
 * .hero-figure / .body-fig / <figure> / <picture> / fallback parent. The pill
 * already resolves the deepest anchor via closest('[data-comment-id]'), so
 * hovering an image lands on its container's anchor. */
function anchorImagePass(){
  document.querySelectorAll('img').forEach(img=>{
    if(img.closest(CHROME_SEL))return;
    if(isInSiteChrome(img))return;
    if(img.closest('[data-review-skip]'))return;
    const target = img.closest('.hero-figure')
                 || img.closest('.body-fig')
                 || img.closest('figure')
                 || img.closest('picture')
                 || img.parentElement;
    if(!target) return;
    if(target.hasAttribute('data-comment-id')) return;
    let prefix = 'img';
    if(target.classList && target.classList.contains('hero-figure')) prefix = 'hero-image';
    else if(target.classList && target.classList.contains('body-fig')) prefix = 'body-image';
    ANCHOR_COUNTERS[prefix] = (ANCHOR_COUNTERS[prefix]||0) + 1;
    target.setAttribute('data-comment-id', SLUG+'-'+prefix+'-'+ANCHOR_COUNTERS[prefix]);
  });
}

function modal(title,ctx,initText,initRepl,onSave){
  const ov=el('div','review-modal-overlay');const m=el('div','review-modal');
  m.innerHTML='<h4>'+esc(title)+'</h4><div class="rw-ctx">'+esc(ctx)+'</div>';
  const ta=el('textarea');ta.placeholder=L.placeholder;ta.value=initText||'';
  const tr=el('textarea');tr.placeholder=L.replacementPlaceholder;tr.value=initRepl||'';tr.style.minHeight='44px';
  const acts=el('div','rw-modal-acts');
  const cancel=el('button','rw-cancel',esc(L.cancel));cancel.onclick=()=>ov.remove();
  const save=el('button','rw-save',esc(L.save));
  save.onclick=()=>{const t=ta.value.trim(),r=tr.value.trim();if(!t&&!r)return;onSave(t,r);ov.remove()};
  acts.appendChild(cancel);acts.appendChild(save);m.appendChild(ta);m.appendChild(tr);m.appendChild(acts);ov.appendChild(m);
  ov.onclick=e=>{if(e.target===ov)ov.remove()};document.body.appendChild(ov);ta.focus();
}
function openComposer(anchor,elm){
  const note=elm.getAttribute('data-variant-note');
  const prev=note||(elm.textContent||'').replace(/\s+/g,' ').trim().slice(0,80)||(elm.querySelector('img,video')?'[creative]':'');
  /* effectivePage tags the comment with the active variant state for any
   * dimension the anchored element varies along (data-variant-scope). For an
   * untagged element, effectivePage === SLUG and behaviour is unchanged. */
  const pageKey = effectivePage(elm);
  modal('Add comment',anchor,'','',(text,repl)=>ADAPTER.create({comment:text,replacement:repl||null,anchor:anchor,page:pageKey,author:ME,status:'pending',timestamp:Date.now(),text_preview:prev,url:location.href,user_agent:navigator.userAgent}));
}

function actBtn(label,cls,fn){const b=el('button',cls,esc(label));b.onclick=ev=>{ev.stopPropagation();fn()};return b;}
function render(){
  /* Variant-aware filter: untagged comments (page === SLUG) always show;
   * tagged comments show only when every dim/value in their page key matches
   * the page's current dimension state via pageMatches(). */
  const all=Object.entries(COMMENTS).filter(([id,c])=>c && pageMatches(c.page));
  const counts={pending:0,resolved:0};
  all.forEach(([id,c])=>{counts[statusOf(c)]=(counts[statusOf(c)]||0)+1});
  TABS.querySelectorAll('button').forEach(b=>{b.querySelector('.rw-c').textContent=counts[TAB_OF[b.dataset.k]]||0;});
  // outlines
  document.querySelectorAll('.has-comment,.has-applied-comment').forEach(e=>e.classList.remove('has-comment','has-applied-comment'));
  all.forEach(([id,c])=>{const st=statusOf(c);if(st==='archived')return;const sel='[data-comment-id="'+(window.CSS&&CSS.escape?CSS.escape(c.anchor):c.anchor)+'"]';document.querySelectorAll(sel).forEach(a=>a.classList.add(st==='applied'?'has-applied-comment':'has-comment'))});
  // list for current tab
  const want=TAB_OF[FILTER];
  const rows=all.filter(([id,c])=>statusOf(c)===want).sort((a,b)=>(a[1].timestamp||0)-(b[1].timestamp||0));
  LIST.innerHTML='';
  if(!rows.length){LIST.appendChild(el('div','review-empty',esc(L.empty)));return}
  rows.forEach(([id,c])=>{
    const st=statusOf(c);
    const row=el('div','review-row'+(id===SELID?' rw-selected':''));
    const blabel=st==='resolved'?'resolved':'open';
    row.innerHTML='<div class="rw-meta"><b>'+esc(c.author||'Anonymous')+'</b><span class="rw-badge rw-'+st+'">'+blabel+'</span><span>'+when(c.timestamp)+(c.edited_at?' · edited':'')+'</span></div>'+
      '<div class="rw-body">'+esc(c.comment||'')+'</div>'+
      (c.replacement?'<div class="rw-repl">↳ '+esc(c.replacement)+'</div>':'')+
      (st==='resolved'&&c.resolution?'<div class="rw-resolution">✓ '+esc(c.resolution)+'</div>':'')+
      '<div class="rw-anchor">'+esc(c.anchor)+'</div>';
    const acts=el('div','rw-acts');
    if(st==='pending'){
      acts.appendChild(actBtn(L.edit,'edit-btn',()=>modal('Edit comment',c.anchor,c.comment||'',c.replacement||'',(t,r)=>ADAPTER.update(id,{comment:t,replacement:r||null,edited_at:Date.now()}))));
      acts.appendChild(actBtn(L.resolve,'resolve-btn',()=>{const note=(window.prompt(L.resolvePrompt,'')||'').trim();ADAPTER.update(id,{status:'resolved',resolution:note||('Resolved · '+ME),resolved_at:Date.now(),resolved_by:ME});}));
    } else {
      acts.appendChild(actBtn(L.reopen,'restore-btn',()=>ADAPTER.update(id,{status:'pending',resolution:null})));
    }
    acts.appendChild(actBtn(L.del,'delete-btn',()=>{if(confirm('Delete this comment?'))ADAPTER.remove(id)}));
    row.appendChild(acts);
    row.onclick=()=>{SELID=id;spotlight(c.anchor);};
    LIST.appendChild(row);
  });
  applyActive();
}
/* persistent strong highlight on the currently-selected comment's element(s).
 * querySelectorAll because a campaign-wide headline anchor (hl-{i}) can match
 * several ads at once. */
function applyActive(){
  document.querySelectorAll('.rw-active-anchor').forEach(e=>e.classList.remove('rw-active-anchor'));
  if(!SELANCHOR)return;
  const sel='[data-comment-id="'+(window.CSS&&CSS.escape?CSS.escape(SELANCHOR):SELANCHOR)+'"]';
  document.querySelectorAll(sel).forEach(a=>a.classList.add('rw-active-anchor'));
}
function spotlight(anchor){
  SELANCHOR=anchor;
  let a=null;
  /* the prototype exposes __rwReveal: it flips the right dropdown/tab so the
   * commented variant is on screen, then returns that zone's element. */
  if(window.__rwReveal){try{a=window.__rwReveal(anchor)}catch(e){}}
  if(!a)a=document.querySelector('[data-comment-id="'+(window.CSS&&CSS.escape?CSS.escape(anchor):anchor)+'"]');
  applyActive();
  if(!a)return;
  a.scrollIntoView({behavior:'smooth',block:'center'});
  a.classList.remove('rw-spot');void a.offsetWidth;a.classList.add('rw-spot');setTimeout(()=>a.classList.remove('rw-spot'),1200);
}

(async function init(){
  ME=reviewer();
  try{ADAPTER=FB_OK?await firebaseAdapter():localAdapter();}catch(e){console.warn('[review] firebase init failed, using local',e);ADAPTER=localAdapter();}
  buildChrome();
  anchorPass();
  anchorImagePass();
  /* MutationObserver (added 2026-06-24): re-anchor + re-render whenever new
   * non-chrome DOM appears. Drives 'comment on every step of the form': each
   * step's labels/buttons get anchored as soon as the step DOM renders.
   *
   * Implementation notes:
   *   - We look at addedNodes specifically (not just any mutation target).
   *     For renderOverlay()-style flows (removeChild + appendChild on body),
   *     only the appended overlay's subtree matters — anchorPass auto-skips
   *     anchored elements anyway.
   *   - Re-anchor is scheduled on a microtask (queueMicrotask), not setTimeout,
   *     so it runs before the next user interaction tick. An 80ms debounce
   *     used to race with the user moving the mouse into the overlay before
   *     anchors existed; the pill would no-op once and the user would think
   *     'commenting on step 2 doesn't work'.
   *   - Watching childList+subtree only — render()'s class flips and
   *     attribute writes are not observed, so we don't loop. As a safety net
   *     we still skip nodes inside widget chrome below.
   */
  let _scheduled = false;
  function _reanchorSoon(){
    if(_scheduled) return;
    _scheduled = true;
    queueMicrotask(()=>{
      _scheduled = false;
      anchorPass();
      anchorImagePass();
      render();
    });
  }
  const mo = new MutationObserver(muts=>{
    for(const m of muts){
      if(!m.addedNodes || !m.addedNodes.length) continue;
      for(const node of m.addedNodes){
        if(!node || node.nodeType !== 1) continue;
        if(node.closest && node.closest(CHROME_SEL)) continue;
        _reanchorSoon();
        return;
      }
    }
  });
  mo.observe(document.body, { childList:true, subtree:true });
  /* variant-aware anchors (credo variation): the prototype rewrites a zone's
   * data-comment-id when its headline/message/creative selection changes, then
   * calls this hook so the highlight pass re-matches comments to the now-current
   * variant. Per-dimension scoping falls out of the existing match-by-anchor. */
  window.__rwRefresh=render;
  ADAPTER.subscribe(data=>{COMMENTS=data||{};render()});
})();
