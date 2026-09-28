# Review packet: PBI-07b · Phone and email must be valid before the form sends

## Context (fixed)
- A law firm's lead-generation landing pages in Webflow. **staging.credolegal.com is the production site being built**
  (Webflow site `6ab90fb0761d44332faf21c8`); all changes are made and verified there.
- Two form types. **New form** (31 pages): its own script validates on "Submit" (phone = 10 digits, email matches
  `^[^\s@]+@[^\s@]+\.[^\s@]+$`) and then calls `form.submit()`. **Old form** (21 older pages, two copies per page:
  `#gtmform` with Submit `#submitBtn`, and `#ngtmform` with Submit `#nsubmit`; both `<a>` elements): its page code greys out
  `#submitBtn` with `pointer-events:none; opacity:.5` until phone matches `^\(\d{3}\)\s\d{3}-\d{4}$`, email matches the same email
  pattern and the form is valid; a click handler on `#submitBtn` calls `submitForm()`, which only checks that the phone is not empty,
  pushes a GTM event and calls `form.submit()`.
- The operator asked: phone and email format must be valid before any lead is sent.

## Finding before the change (strict tests: only real POSTs to host formspree.io counted)
- New form: blocked every invalid phone ("212555", letters, empty) and email ("abc", "a@b", "john@gmail", "a b@c.com", empty).
- Old form: a **tap** on the greyed-out Submit does nothing (pointer-events) and the message shows; but **keyboard Enter on the focused
  Submit link sent the lead** with a short phone "(212) 555" (and with a bad email). `pointer-events` does not stop keyboard activation.
- `#ngtmform` (second copy): its Submit sends nothing in our tests even with valid data (no script handles `#nsubmit`); noted for the rebuild.

## What changed (Webflow Data API; published to staging.credolegal.com only)
A registered site script **OldFormPhoneEmailGuard 1.0.0**, applied in the site footer next to the existing FormSubmitDataLayer
script (the freeform footer code was not edited):
```js
(function () {
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function show(id) { var m = document.getElementById(id); if (m) m.style.display = 'block'; }
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('#submitBtn, #nsubmit') : null;
    if (!btn) return;
    var form = btn.closest('form'); if (!form) return;
    var pre = form.id === 'ngtmform' ? 'n' : '';
    var phone = form.querySelector('input[name="PHONE"]'), email = form.querySelector('input[name="email"]');
    var phoneOk = !phone || phone.value.replace(/\D/g, '').length === 10;
    var emailOk = !email || EMAIL.test(email.value.trim());
    if (phoneOk && emailOk) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (!phoneOk) { show(pre + 'msgphone'); phone.focus(); }
    if (!emailOk) { show(pre + 'msgemail'); if (phoneOk) email.focus(); }
  }, true);
})();
```
- Capture phase on `document`, so it runs before the button's own click handler; keyboard Enter on a link fires the same `click`.
- `#submitBtn`/`#nsubmit` exist only on the 21 old-form pages (checked in the served HTML of all 57 pages); the new form uses `#submitform`.
- `#msgphone`/`#msgemail` and `#nmsgphone`/`#nmsgemail` are the forms' existing messages ("10 digits Number is required",
  "email@example.com format is required").

## Evidence (28 Sep)
1. Shadow test (guard appended to the served page, not yet published), /ohio, iPhone WebKit + desktop Chrome: short phone blocked for
   tap, Enter and Space (message shown); bad email blocked for all three; valid data sent with tap and Enter.
2. After publishing: the script is served on the pages; the same test on the live /ohio page gives the same results.
3. **All 21 old-form pages, keyboard Enter:** short phone sent on 0/21, bad email on 0/21, valid data sent on 21/21.
4. New form unchanged (2 pages, 9 cases each): every invalid phone/email blocked, valid sent.
5. Space on a focused link never activates it (browser behaviour), before and after; tap and Enter are the real paths.

## Conclusions to challenge
1. No old-form lead can be sent with fewer than 10 phone digits or a malformed email, by tap or keyboard.
2. Valid leads still send exactly as before (same request, same GTM push, same duplicate-number check).
3. The new form and all other pages are unaffected.
