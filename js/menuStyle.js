/* ==========================================================================
   script.js  -  BEHAVIOR OF THE PAGE
   --------------------------------------------------------------------------
   Needs translations.js to be loaded BEFORE this file (it holds all texts).

   1. Language toggle  (Arabic <-> English, also flips the page direction)
   2. Mobile menu      (burger button opens / closes the links)
   3. Smooth scroll    (click a menu link / button -> glide to its section)
   4. Scroll spy       (the menu link of the section you are viewing lights up)
   ========================================================================== */

/* ---- Elements we need -------------------------------------------------- */
const html     = document.documentElement;                          // the <html> tag
const langBtns = document.querySelectorAll('.lang-switch button');  // "العربية" and "English" buttons
const burger   = document.getElementById('burger');                 // burger button (phones)
const menu     = document.getElementById('menu');                   // the list of menu links


/* ==========================================================================
   1. LANGUAGE TOGGLE
   Every element with data-i18n="some.key" gets its text from translations.js
   (TRANSLATIONS["some.key"].ar or .en). The page direction is also switched:
   Arabic = right-to-left (rtl), English = left-to-right (ltr).
   To change any text, edit translations.js - not this file.
   ========================================================================== */
function setLang(lang) {                       // lang is 'ar' or 'en'
  html.lang = lang;                            // <html lang="ar"> or "en"
  html.dir  = lang === 'ar' ? 'rtl' : 'ltr';   // flips the whole layout

  // Replace the text of every translatable element
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const entry = TRANSLATIONS[el.dataset.i18n];   // e.g. TRANSLATIONS["hero.title"]
    if (entry) el.textContent = entry[lang];       // entry.ar or entry.en
  });

  // Highlight the active language button in gold
  langBtns.forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  // Browser tab title (also taken from translations.js)
  document.title = TRANSLATIONS['page.title'][lang];

  // Remember the choice for the next visit (ignored if the browser blocks it)
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

// Click on a language button -> switch language
langBtns.forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// When the page opens: use the saved language, or Arabic by default
let savedLang = 'ar';
try { savedLang = localStorage.getItem('lang') || 'ar'; } catch (e) {}
setLang(savedLang);


/* ==========================================================================
   2. MOBILE MENU
   On phones/tablets the links are hidden; the burger button opens them.
   toggleMenu()      -> open if closed, close if open
   toggleMenu(true)  -> force open      toggleMenu(false) -> force close
   ========================================================================== */
function toggleMenu(forceOpen) {
  const open = forceOpen ?? !menu.classList.contains('open');
  menu.classList.toggle('open', open);                 // show / hide the links
  burger.classList.toggle('open', open);               // burger turns into an X
  burger.setAttribute('aria-expanded', open);          // accessibility
}

burger.addEventListener('click', () => toggleMenu());

// If the screen becomes wide again (e.g. phone rotated), close the mobile menu
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) toggleMenu(false);
});


/* ==========================================================================
   3. SMOOTH SCROLL
   Every link that points to a section on this page (href="#services" ...)
   glides smoothly to that section instead of jumping. This covers the menu
   links, the logo and the two buttons in the first section.
   The scroll stops just under the sticky header so the title is not hidden.
   ========================================================================== */
const header    = document.querySelector('.header');      // the sticky top bar
const navLinks  = [...menu.querySelectorAll('a')];        // the 5 menu links
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lockedUntilScrollEnds = false;   // true while a click-scroll is running
let lockTimer;                       // safety timer for browsers without "scrollend"

// Mark ONE menu link as the active (gold) one. `id` is a section id like "work".
function setActiveLink(id) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href').slice(1);          // "services", "work" ...
    const target = document.getElementById(id);
    if (!target) return;                                    // "#" links (social icons) do nothing here

    event.preventDefault();                                 // stop the instant jump

    // Where to stop: top of the section minus the height of the sticky header
    const y = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight + 1;
    window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    history.pushState(null, '', '#' + id);                  // keep the address bar in sync

    // Light up the clicked menu link right away and keep it lit during the glide
    if (navLinks.includes(link)) setActiveLink(id);
    lockedUntilScrollEnds = true;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => { lockedUntilScrollEnds = false; updateActiveLink(); }, 1200);

    toggleMenu(false);                                      // close the mobile menu
  });
});

// When the browser reports the glide is finished, hand control back to the scroll spy
window.addEventListener('scrollend', () => {
  if (!lockedUntilScrollEnds) return;
  lockedUntilScrollEnds = false;
  clearTimeout(lockTimer);
  updateActiveLink();
});


/* ==========================================================================
   4. SCROLL SPY (active menu link while scrolling)
   While you scroll, the menu link of the section you are looking at turns
   gold automatically.

   SECTIONS = [ section id on the page , menu link it belongs to ]
   - The gold "order" card has no link of its own, so it uses "contact".
   - To add a new section: give it an id in index.html, add a menu link, and
     add a line here.
   ========================================================================== */
const SECTIONS = [
  ['home',     'home'],       // first section        -> "الرئيسة"
  ['services', 'services'],   // services             -> "خدماتنا"
  ['work',     'work'],       // our work             -> "أعمالنا"
  ['reviews',  'reviews'],    // testimonials         -> "آراء عملاءنا"
  ['order',    'contact'],    // gold order card      -> "تواصل معنا"
  ['contact',  'contact']     // footer               -> "تواصل معنا"
];

function updateActiveLink() {
  if (lockedUntilScrollEnds) return;                        // a click-scroll is running

  // Imaginary line a little below the header: the section that crossed it is "current"
  const line = window.scrollY + header.offsetHeight + window.innerHeight * 0.25;

  let current = SECTIONS[0][1];
  SECTIONS.forEach(([sectionId, linkId]) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    if (top <= line) current = linkId;                      // we have scrolled past its top
  });

  // At the very bottom of the page the last link ("contact") is always the active one
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) current = 'contact';

  setActiveLink(current);
}

// Run the check while scrolling (once per animation frame, so it stays fast)
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateActiveLink(); ticking = false; });
}, { passive: true });

window.addEventListener('resize', updateActiveLink);
updateActiveLink();                                          // also once when the page opens
