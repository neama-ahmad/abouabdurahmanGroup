/* ==========================================================================
   translations.js  -  ALL TEXTS OF THE WEBSITE (Arabic + English)
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to change or translate a text.

   How it works:
     - In index.html, every translatable element has  data-i18n="some.key"
     - Here, each key has two texts:  ar (Arabic)  and  en (English)
     - script.js reads this file and shows the language chosen by the toggle.

   To change a text   -> edit the ar / en value of its key below.
   To add a new text  -> add a new line here, then in index.html write:
                         <p data-i18n="your.key">النص العربي</p>
   (The Arabic text inside the tag is only a fallback shown before the
    script loads.)

   The 5 testimonials appear twice in the sliding strip (the second set is a
   copy for the endless loop). Both sets use the same keys, so editing a
   testimonial here changes both automatically.
   ========================================================================== */

const TRANSLATIONS = {

  /* ---- TOP MENU (header) ------------------------------------------- */
  "nav.brand": {
    ar: "مجموعة أبو عبدالرحمن",
    en: "Abou Abdurahman Group"
  },   // site name next to the logo
  "nav.home": {
    ar: "الرئيسة",
    en: "Home"
  },
  "nav.services": {
    ar: "خدماتنا",
    en: "Our Services"
  },
  "nav.work": {
    ar: "أعمالنا",
    en: "Our Work"
  },
  "nav.reviews": {
    ar: "آراء عملاءنا",
    en: "Testimonials"
  },
  "nav.contact": {
    ar: "تواصل معنا",
    en: "Contact Us"
  },

  /* ---- HERO (first section) ---------------------------------------- */
  "hero.title": {
    ar: "نحول أفكارك إلى هوية رقمية فاخرة",
    en: "We turn your ideas into a luxurious digital identity"
  },   // big title
  "hero.text": {
    ar: "مجموعة أبو عبدالرحمن شرفه الله تعالى للخدمات الالكترونية وتصاميم الجرافيك بمعايير وجودة احترافية",
    en: "Abou Abdurahman Group for electronic services and graphic design, delivered to professional standards and quality"
  },   // description under the title
  "hero.btnOrder": {
    ar: "اطلب تصميمك الآن",
    en: "Order your design now"
  },   // gold button
  "hero.btnWork": {
    ar: "شاهد أعمالنا",
    en: "View our work"
  },   // outline button

  /* ---- SERVICES section -------------------------------------------- */
  "services.title": {
    ar: "خدمات متكاملة لهويتك",
    en: "Complete Services for Your Identity"
  },   // section title
  "services.logo": {
    ar: "تصميم شعارات",
    en: "Logo Design"
  },   // card 1
  "services.email": {
    ar: "إنشاء إيميلات",
    en: "Email Account Setup"
  },   // card 2
  "services.social": {
    ar: "إنشاء حسابات سوشيل ميديا",
    en: "Social Media Account Setup"
  },   // card 3
  "services.posts": {
    ar: "تصميم منشورات إعلانية",
    en: "Advertising Post Design"
  },   // card 4
  "services.templates": {
    ar: "تصميم قوالب فواتير وشهادات وملصقات",
    en: "Invoice, Certificate & Sticker Templates"
  },   // card 5
  "services.cards": {
    ar: "تصميم كروت شخصية وكروت عمل",
    en: "Personal & Business Card Design"
  },   // card 6

  /* ---- OUR WORK section -------------------------------------------- */
  "work.title": {
    ar: "أعمالنا",
    en: "Our Work"
  },   // section title
  "work.subtitle": {
    ar: "مختارات من مشاريعنا الأخيرة",
    en: "Selected highlights from our latest projects"
  },   // line under the title

  /* ---- TESTIMONIALS section (title + 5 opinions) ------------------- */
  "reviews.title": {
    ar: "ماذا قال عملاءنا",
    en: "What Our Clients Said"
  },   // section title
  "reviews.1.text": {
    ar: "تعامل راقٍ وتصميم شعار فاق توقعاتي، التسليم كان في الوقت المحدد والنتيجة احترافية جدًا.",
    en: "Excellent service and a logo design that exceeded my expectations. Delivered on time and very professional."
  },
  "reviews.1.name": {
    ar: "أحمد الحربي",
    en: "Ahmed Al-Harbi"
  },
  "reviews.2.text": {
    ar: "ساعدوني في تجهيز حساباتي على السوشيال ميديا وصمموا منشورات إعلانية جذبت متابعين جدد.",
    en: "They set up my social media accounts and designed ads that brought in new followers."
  },
  "reviews.2.name": {
    ar: "سارة العتيبي",
    en: "Sara Al-Otaibi"
  },
  "reviews.3.text": {
    ar: "كروت العمل والقوالب كانت بجودة عالية وتفاصيل دقيقة، أنصح بالتعامل معهم.",
    en: "The business cards and templates were high quality with fine details. Highly recommended."
  },
  "reviews.3.name": {
    ar: "محمد القحطاني",
    en: "Mohammed Al-Qahtani"
  },
  "reviews.4.text": {
    ar: "سرعة في الاستجابة وتعديلات بدون تعقيد، فريق متعاون ويفهم المطلوب من أول مرة.",
    en: "Fast responses and hassle-free revisions. A cooperative team that gets it right the first time."
  },
  "reviews.4.name": {
    ar: "نورة الدوسري",
    en: "Noura Al-Dosari"
  },
  "reviews.5.text": {
    ar: "هوية رقمية فاخرة فعلاً، شكرًا لكم على الإبداع والاهتمام بكل التفاصيل.",
    en: "A truly luxurious digital identity. Thank you for the creativity and attention to detail."
  },
  "reviews.5.name": {
    ar: "خالد الشمري",
    en: "Khalid Al-Shammari"
  },

  /* ---- ORDER CARD (gold card + WhatsApp button) -------------------- */
  "order.title": {
    ar: "اطلب تصميمك الآن",
    en: "Order Your Design Now"
  },   // big title on the gold card
  "order.btn": {
    ar: "اطلب الآن",
    en: "Order Now"
  },   // WhatsApp button text (the number is in the link in index.html)

  /* ---- FOOTER ------------------------------------------------------ */
  "footer.title": {
    ar: "تواصل معنا",
    en: "Contact Us"
  },
  "footer.copy": {
    ar: "© 2026 مجموعة أبو عبدالرحمن. جميع الحقوق محفوظة.",
    en: "© 2026 Abou Abdurahman Group. All rights reserved."
  },   // copyright line

  /* ---- BROWSER TAB TITLE ------------------------------------------------ */
  "page.title": {
    ar: "مجموعة أبو عبدالرحمن",
    en: "Abou Abdurahman Group"
  }
};
