# Review packet: PBI-19 · small polish (tap targets, page end)

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**.
  51 landing pages share components; the home page has its own copy of most sections; the footer is one component.
- Audit L5 and the UX reviews of PBI-05 and the design preview: call links under 24px tall (hero "Or call" number 15px,
  bottom CTA number 15px, footer phone links 20px, BBB badge link 18px); the end of the page must never sit under the
  sticky call bar or the chat bubble.

## Change (published to staging only, 30 Sep)
1. **Hero call number** (`hero-call-number`, PBI-17): padding 6px top/bottom (25px tall; 5px gave 23px); its red underline moves from a
   border to `text-decoration` (1.5px, offset 3px) so it stays under the digits.
2. **Bottom CTA call number:** new class `cta-call-number` (padding 5px top/bottom) on the link (LP · Bottom CTA and home).
3. **Footer phone links** (`Link Block 5`, footer component): padding 2px top/bottom (24px).
4. **BBB badge links** (Rights and FAQ and Trust strip sections, component + home): the link is `inline-block` and the
   image `block`, so the link box is the 80px badge (it was an 18px text line box around the image).
5. **Page end:** nothing was ever hidden (during call hours on phones the bar's own script adds 90px bottom padding;
   the last text ends 58px above the bar), but that padding showed as a white band under the dark footer. Now, while
   the bar exists, the space sits inside the footer (`body:has(.sticky-call-button)`: body padding 0, footer padding
   120px; bottom CTA section embed, component + home). Outside call hours there is no bar and nothing changes. The chat
   bubble is not rendered on staging (Tidio loads only its hidden loader here; its future is D8 / PBI-23).
6. Done earlier (G29, in PBI-12 on 29 Sep): "Week 1" in the step-tag case.
7. **After the GPT review** (a scan of every interactive element): header nav links 20 → 24px (combo `Nav Link +
   track-redirect`, 2px top/bottom); footer menu links 16 → 24px on desktop (`Link 3 Copy`, 4px top/bottom; phone
   spacing unchanged); debt slider: input box 24px (was 4px, 6px on phones) with the same thin track drawn as a
   background line, handle 18 → 24px, margins compensated so the layout is unchanged (CSS only; the scripts in that
   embed are untouched).

## Evidence
- `pbi19-tap.mjs`, all 52 form pages at 1440 and 390 (2 pm New York): **104/104 ok**, every visible call link and
  BBB link at least 24px: hero call 15 → 25px, bottom CTA call 15 → 25px, footer phone links 20 → 24px, BBB badges
  18 → 80px; unchanged: header number 25px, header button 32px, phone call button 44px. Thank-you page and 404: no
  link under 24px. Hero underline: red (#c92028), offset 3px.
- Page end on a phone in call hours (Pixel 7): no text under the bar (last text 58px above it), no white band;
  outside call hours and on desktop: no overlay at all.
- Functional compare before/after (a landing page, home, /letter, a state page; 1440 + 390): form walk, payload,
  trackers, dataLayer, cookies, phones (`herocta`, `footercta`, `bfootercta` swap) and links identical; only styles
  differ.
- Screenshots before → after (debt-harassment-stop-calls): `P19-*-hero-phone-*`, `P19-*-cta-phone-*`,
  `P19-*-footer-phone-*` (element shot: the sticky bar overlays it mid-scroll), `P19-*-page-end-phone-*` (scrolled to the
  end, the real end state), `P19-*-bbb-desktop-*`.

## Questions for the reviewer
1. Do the call links keep their look with the larger tap area (hero underline position, footer spacing)?
2. Anything else under 24px, or anything that could cover the page end?
