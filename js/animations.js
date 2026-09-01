/* ==========================================================================
   YUNKA RURU - SCROLL REVEAL & PARALLAX ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initParallaxEffects();
  initCounterAnimations();
});

/**
 * Initializes IntersectionObserver for staggered and smooth scroll reveal effects
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal-init, .reveal-left-init, .reveal-right-init, .reveal-scale-init'
  );

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Adds subtle mouse parallax and scroll parallax to hero elements
 */
function initParallaxEffects() {
  const heroSection = document.querySelector('.hero-section');
  const heroBg = document.querySelector('.hero-bg-image');
  const floatingBadges = document.querySelectorAll('.hero-badge');

  if (!heroSection || !heroBg) return;

  // Mouse move parallax on Desktop
  if (window.innerWidth > 992) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 16;
      const yPercent = (clientY / window.innerHeight - 0.5) * 16;

      heroBg.style.transform = `scale(1.06) translate3d(${xPercent * 0.4}px, ${yPercent * 0.4}px, 0)`;

      floatingBadges.forEach((badge, index) => {
        const factor = (index + 1) * 0.6;
        badge.style.transform = `translate3d(${xPercent * factor}px, ${yPercent * factor}px, 0)`;
      });
    });
  }

  // Scroll parallax
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.06) translate3d(0, ${scrollY * 0.25}px, 0)`;
    }
  }, { passive: true });
}

/**
 * Animated number counters for metrics
 */
function initCounterAnimations() {
  const metricNumbers = document.querySelectorAll('.metric-number');
  if (!metricNumbers.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentNumber = Math.floor(easeOut * targetValue);

          el.textContent = `${prefix}${currentNumber}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${targetValue}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  metricNumbers.forEach(num => counterObserver.observe(num));
}
