/* ==========================================================================
   YUNKA RURU - MAIN APPLICATION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollSpy();
  initWhatsAppWidget();
  initProcessTimeline();
});

/**
 * Sticky Navbar on Scroll
 */
function initNavbar() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.backdrop-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    toggleBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * ScrollSpy to highlight active link in navbar
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -70% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/**
 * Floating WhatsApp Widget Toggle
 */
function initWhatsAppWidget() {
  const whatsappBtn = document.getElementById('whatsappToggleBtn');
  const popupCard = document.getElementById('whatsappPopupCard');
  const closeCardBtn = document.getElementById('closeWhatsappCard');

  if (!whatsappBtn || !popupCard) return;

  whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popupCard.classList.toggle('show');
  });

  if (closeCardBtn) {
    closeCardBtn.addEventListener('click', () => {
      popupCard.classList.remove('show');
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!popupCard.contains(e.target) && !whatsappBtn.contains(e.target)) {
      popupCard.classList.remove('show');
    }
  });
}

/**
 * Interactive Process Timeline Step Highlights
 */
function initProcessTimeline() {
  const steps = document.querySelectorAll('.process-step-card');
  if (!steps.length) return;

  steps.forEach((step, idx) => {
    step.addEventListener('mouseenter', () => {
      steps.forEach((s, i) => {
        if (i <= idx) {
          s.style.borderColor = 'var(--color-ochre)';
        }
      });
    });

    step.addEventListener('mouseleave', () => {
      steps.forEach(s => {
        s.style.borderColor = '';
      });
    });
  });
}
