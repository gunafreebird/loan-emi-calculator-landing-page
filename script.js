/* =========================================================
   Bank Loan EMI Calculator – Landing Page Script
   ========================================================= */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Hamburger / Mobile Drawer ----
const hamburger      = document.getElementById('hamburger');
const mobileDrawer   = document.getElementById('mobile-drawer');
const drawerLinks    = mobileDrawer.querySelectorAll('.drawer-link, .drawer-cta');

hamburger.addEventListener('click', () => {
  const isOpen = mobileDrawer.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger lines
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

drawerLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ---- Intersection Observer – Scroll Reveal ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -48px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---- Parallax on hero phone mockup ----
const heroMockup = document.querySelector('.hero-mockup');
if (heroMockup) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroMockup.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }, { passive: true });
}

// ---- Stagger problem cards ----
const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  card.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)';
});

// ---- Stagger benefit cards on reveal ----
const benefitCards = document.querySelectorAll('.benefit-card');
const benefitObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      benefitCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, i * 90);
      });
      benefitObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

benefitCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const benefitsSection = document.querySelector('.benefits-section');
if (benefitsSection) benefitObserver.observe(benefitsSection);

// ---- Feature pills stagger in ----
const pills = document.querySelectorAll('.feature-pill');
const pillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pills.forEach((pill, i) => {
        setTimeout(() => {
          pill.style.opacity   = '1';
          pill.style.transform = 'translateY(0) scale(1)';
        }, i * 100);
      });
      pillObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

pills.forEach(pill => {
  pill.style.opacity   = '0';
  pill.style.transform = 'translateY(16px) scale(0.96)';
  pill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
const calcSection = document.querySelector('.calculator-section');
if (calcSection) pillObserver.observe(calcSection);

// ---- Trust badges pulse on CTA reveal ----
const trustBadges = document.querySelectorAll('.trust-badge');
const ctaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      trustBadges.forEach((badge, i) => {
        setTimeout(() => {
          badge.style.opacity   = '1';
          badge.style.transform = 'translateY(0)';
        }, 400 + i * 120);
      });
      ctaObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

trustBadges.forEach(badge => {
  badge.style.opacity   = '0';
  badge.style.transform = 'translateY(12px)';
  badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
const finalCta = document.querySelector('.final-cta');
if (finalCta) ctaObserver.observe(finalCta);

// ---- Smooth active nav link highlight ----
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// Inject active nav style
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav-link.active { color: var(--green-dark); background: var(--green-light); }`;
document.head.appendChild(activeStyle);

// ---- Page Load fade in ----
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  // Trigger hero reveal immediately (both main and premium pages)
  document.querySelectorAll('.hero .reveal, .premium-page-hero .reveal').forEach(el => {
    el.classList.add('revealed');
  });
});

// ---- Stagger Pricing Cards ----
const pricingCards = document.querySelectorAll('.pricing-card');
const pricingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pricingCards.forEach((card, i) => {
        const delay = card.classList.contains('pricing-card-featured') ? i * 80 + 60 : i * 80;
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, delay);
      });
      pricingObserver.disconnect();
    }
  });
}, { threshold: 0.08 });

pricingCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(36px) scale(0.97)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
const pricingSection = document.querySelector('.pricing-section');
if (pricingSection) pricingObserver.observe(pricingSection);

// ---- Stagger Premium Feature Items ----
const premiumFeatItems = document.querySelectorAll('.premium-feat-item');
const premFeatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      premiumFeatItems.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity   = '1';
          item.style.transform = 'translateY(0)';
        }, i * 80);
      });
      premFeatObserver.disconnect();
    }
  });
}, { threshold: 0.1 });
premiumFeatItems.forEach(item => {
  item.style.opacity   = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
});
const premiumSection = document.querySelector('.pricing-section');
if (premiumSection) premFeatObserver.observe(premiumSection);

// ---- Stagger Why-Cards ----
const whyCards = document.querySelectorAll('.why-card');
const whyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      whyCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, i * 100);
      });
      whyObserver.disconnect();
    }
  });
}, { threshold: 0.1 });
whyCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
const whySection = document.querySelector('.why-premium');
if (whySection) whyObserver.observe(whySection);

// ---- Stagger prem-feature-cat cards ----
const pfcCards = document.querySelectorAll('.prem-feature-cat');
const pfcObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pfcCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, i * 110);
      });
      pfcObserver.disconnect();
    }
  });
}, { threshold: 0.08 });
pfcCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
const pfc = document.querySelector('.prem-features-section');
if (pfc) pfcObserver.observe(pfc);
