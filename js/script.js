/* ==========================================================================
   script.js  -  BEHAVIOR OF THE PAGE
   --------------------------------------------------------------------------
   Needs translations.js to be loaded BEFORE this file (it holds all texts).

   1. Language toggle  (Arabic <-> English, also flips the page direction)
   2. Mobile menu      (burger button opens / closes the links)
   3. Menu links       (highlight the clicked link and close the mobile menu)
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
   3. MENU LINKS
   Clicking a link: mark it as the active one and close the mobile menu.
   (The page itself scrolls to the section through the link's href="#id".)
   ========================================================================== */
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.querySelectorAll('a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    toggleMenu(false);
  });
});
