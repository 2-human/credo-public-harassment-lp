# Review packet: PBI-26 follow-up · preload the two self-hosted fonts (layout shift)

## Context (fixed)
- Law firm lead-generation landing pages in Webflow; staging.credolegal.com is the production site being built.
- PageSpeed (operator, 30 Sep) showed "Layout shift culprits" CLS 0.281 on phones: the hero form card
  (`div.div-block-36.hero-card`) moves, attributed to the two web fonts (Credo Mono, Hanken Grotesk).
- Both fonts are self-hosted by Webflow (font-display: swap) since PBI-26.

## Diagnosis (measured; debt-lawsuit-attorney, 412×823 @2.625, 150 ms RTT / 1.6 Mbps, 4× CPU, 3 runs each)
| Variant | CLS | FCP |
|---|---|---|
| Saved page before PBI-26 (Google loader) | 0.283 ×3 | ~0.9–1.2 s |
| Live (swap) | 0.27 / 0.283 / 0.284 | ~0.8–0.9 s |
| + preload both fonts (top of head) | 0 ×3 | ~1.05 s |
| + preload where Webflow places site head code | 0 ×3 | ~1.1 s |
| font-display optional (± preload) | 0 ×3 | 0.4–0.7 s, but the page shows fallback fonts on a first visit |
The shift is not new with PBI-26: the fonts arrive after the first paint and the hero heading re-wraps, pushing the
card down. Chosen: preload, no font-display change.

## Change (staging only)
Two lines at the top of Site settings → Custom code → Head code (added by the operator; the site-code API tool was
unavailable in this session), then published by Claude to the staging domain only:
`<link rel="preload" href="…/6abd67fde8fa9323406ea901-HankenGrotesk-latin.woff2" as="font" type="font/woff2" crossorigin>`
`<link rel="preload" href="…/6abd7153b387a989f38d2780-CredoMono-Inconsolata-latin.woff2" as="font" type="font/woff2" crossorigin>`
URLs are exactly the stylesheet's @font-face URLs (webflow-files-prod.global.ssl.fastly.net); `crossorigin` matches the
anonymous CORS font fetch so the preloaded response is reused.

## Evidence (live)
- Served HTML, all 56 pages: identical to before apart from these two lines (present on 56/56).
- Same throttled phone set-up, live pages, 3 runs each: CLS 0 on debt-lawsuit-attorney, home, /ohio, /letter,
  /thank-you (15/15 runs); each font requested once (2 font requests per load, no double download); 0 console
  warnings about unused preloads; FCP 0.8–1.5 s.

## Questions for the reviewer
1. Any risk in preloading Credo Mono on pages where it is below the fold (thank-you pages)?
2. The preload URLs are hard-coded; if a font file is replaced they go stale (noted in the revert file). Acceptable?
