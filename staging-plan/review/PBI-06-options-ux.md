# UX review packet: PBI-06 · tracked phone number in the phone header (choose between two options)

## Context (fixed)
- A law firm's lead-generation landing pages (consumer-debt defense) on a Webflow staging copy. The page's goal: the visitor
  starts the free case-evaluation form (its first step is right below the headline) or calls. Many visitors call.
- Each page shows a **tracked** phone number that changes with the ad source (e.g. Google vs Meta), so calls can be credited.
- **Today on phones** the header shows the logo and a ☰ menu button. The tracked number is hidden inside that menu, next to
  five links that jump to sections of the same page. (Desktop is not part of this change.)

## The two options (both drawn on the real staging page, nothing built yet)
- **Option A:** logo · square red call button (phone icon, 44×44 px) · black "Free review →" button (jumps to the form). ☰ menu removed on phones.
- **Option B:** logo · one red button showing the phone icon and the number, e.g. "(347) 523-4568" (165×44 px). ☰ menu removed on phones.
- In both, the button calls the page's own tracked number (checked: a Google visitor sees (347) 523-4568, a Meta visitor (718) 521-4060).
- Measured on all three phones: every tap target is at least 44×44 px; nothing overflows; header height 56 px (today 49 px).
- A separate sticky "Call now" bar appears at the bottom of the screen once the visitor scrolls past the form (business hours only).

## Screenshots (first screen, page "Is a Creditor Suing You?", Google visitor)
1. `pbi06-today-iphone` · 2. `pbi06-A-iphone` · 3. `pbi06-B-iphone` (iPhone 15, 393 px)
4. `pbi06-today-iphone-se` · 5. `pbi06-A-iphone-se` · 6. `pbi06-B-iphone-se` (iPhone SE, 375 px)
7. `pbi06-today-android` · 8. `pbi06-A-android` · 9. `pbi06-B-android` (Android, 360 px)

## Questions
1. Which option better serves a visitor who wants to call, without hurting the form? Say which you recommend and why.
2. Is anything lost by removing the ☰ menu on phones (its links jump to sections of the same page)?
3. Do both options have comfortable tap targets and a clear hierarchy on the smallest screen (360 px)?
4. Anything that would make the chosen option better?
