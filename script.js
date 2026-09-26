/* ==========================================================================
   IRON PULSE FITNESS — SCRIPT
   Plain vanilla JavaScript. No frameworks, no backend, no network calls.
   Sections: 1) Mobile menu  2) Scroll reveal  3) Gallery lightbox
             4) Contact form  5) Back-to-top button
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. MOBILE HAMBURGER MENU
     Toggles the slide-in nav menu on small screens and closes it again
     whenever a link inside it is clicked (so the page actually scrolls
     to the section instead of staying hidden behind the open menu).
  ------------------------------------------------------------------ */
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('navMenu');

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  var navLinks = navMenu.querySelectorAll('a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', closeMenu);
  }


  /* ------------------------------------------------------------------
     2. SCROLL REVEAL ANIMATION
     Adds the "active" class to any element with the "reveal" class
     once it scrolls into view, triggering the fade/slide-up in CSS.
  ------------------------------------------------------------------ */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    /* Fallback for very old browsers without IntersectionObserver */
    revealItems.forEach(function (item) { item.classList.add('active'); });
  }


  /* ------------------------------------------------------------------
     3. GALLERY LIGHTBOX
     Clicking a gallery thumbnail opens a full-size preview in a
     simple modal overlay. Closes on the X button, a click on the
     dark backdrop, or the Escape key.
  ------------------------------------------------------------------ */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; /* prevent background scroll */
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var fullImg = item.getAttribute('data-full');
      var imgAlt = item.querySelector('img').getAttribute('alt');
      openLightbox(fullImg, imgAlt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox(); /* clicked the backdrop, not the image */
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });


  /* ------------------------------------------------------------------
     4. CONTACT FORM (frontend-only)
     This form does NOT send data anywhere. It simply validates that
     the required fields are filled, shows a success message, and
     resets the form — exactly as a static demo site should behave.
  ------------------------------------------------------------------ */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); /* stop any real submission / page reload */

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formSuccess.classList.add('show');
    contactForm.reset();

    /* Hide the success message again after a few seconds */
    setTimeout(function () {
      formSuccess.classList.remove('show');
    }, 5000);
  });


  /* ------------------------------------------------------------------
     5. BACK-TO-TOP BUTTON
     Appears once the visitor has scrolled past the hero section.
  ------------------------------------------------------------------ */
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
