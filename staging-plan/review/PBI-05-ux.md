# UX review packet: PBI-05 · Sticky call bar never covers the form

## Context (fixed)
- A law firm's lead-generation landing pages (consumer-debt defense). The page's goal: the visitor starts the free
  case-evaluation form (3 steps: amount slider → situation → contact details) or calls.
- Work happens on a staging copy only (staging.credolegal.com).

## The change
On phones during business hours, a dark "Call Now for Free Guidance" bar is fixed to the bottom of the screen.
Before the change it was always visible. After the change it is hidden while the step-1 form card is on screen and while the
pop-up form (steps 2–3) is open, and it fades in once the visitor scrolls past the form.

## Screenshots (iPhone 15, 393×852, business hours, page /debt-lawsuit-attorney ("Is a Creditor Suing You?"))
Before = the same page with the change removed; After = as published.
1. `pbi05-before-1-load.jpg`: first screen on load.
2. `pbi05-before-2-scrolled.jpg`: scrolled to the middle of the page.
3. `pbi05-before-3-popup.jpg`: pop-up form (step 2) open.
4. `pbi05-after-1-load.jpg`
5. `pbi05-after-2-scrolled.jpg`
6. `pbi05-after-3-popup.jpg`

## Conclusions to challenge
1. Before: the bar covers part of the step-1 form on the first screen and the fields of the pop-up form.
2. After: the bar covers neither the step-1 form nor the pop-up form.
3. After: calling is still one tap away once the visitor has scrolled past the form.
4. Nothing else on these screens changed.
