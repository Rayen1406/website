/* ============================================
   ITKAN AUTOMOTIVE — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initMobileMenu();
  setActiveNavLink();
  initLangSwitcher();
  initContactForm();
});

/* ---------- Navbar Scroll ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Counter Animation ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

/* ---------- Active Nav Link ---------- */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  e.preventDefault();
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
});

/* ---------- Language Switcher ---------- */
function initLangSwitcher() {
  const switcher = document.getElementById('langSwitcher');
  const btn = document.getElementById('langBtn');
  const dropdown = document.getElementById('langDropdown');
  const currentLangEl = document.getElementById('currentLang');

  if (!switcher || !btn || !dropdown) return;

  // Restore language from Google Translate cookie on page load
  const savedLang = getGoogTransLang();
  if (savedLang && savedLang !== 'en') {
    const matchingOption = dropdown.querySelector('[data-lang="' + savedLang + '"]');
    if (matchingOption) {
      dropdown.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
      matchingOption.classList.add('active');
      if (currentLangEl) currentLangEl.textContent = matchingOption.textContent;
    }
  }

  // Toggle dropdown
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', () => {
    switcher.classList.remove('open');
  });

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Handle language selection
  dropdown.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      const label = option.textContent;

      // Update active state
      dropdown.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');

      // Update button text
      if (currentLangEl) currentLangEl.textContent = label;

      // Close dropdown
      switcher.classList.remove('open');

      // Trigger Google Translate
      triggerGoogleTranslate(lang);
    });
  });
}

/* Read the googtrans cookie to get saved language */
function getGoogTransLang() {
  const match = document.cookie.match(/googtrans=\/[a-z]{2}\/([a-z\-]+)/i);
  if (match) return match[1];
  // Also check for the hash-based format
  const hashMatch = window.location.hash.match(/googtrans\(([a-z\-]+)\)/i);
  if (hashMatch) return hashMatch[1];
  return null;
}

function triggerGoogleTranslate(lang) {
  // Wait for Google Translate to load
  const interval = setInterval(() => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      clearInterval(interval);
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }
  }, 100);

  // Timeout after 5 seconds
  setTimeout(() => clearInterval(interval), 5000);
}

/* ---------- Contact Form (Web3Forms) ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const resultDiv = document.getElementById('formResult');
  const submitBtn = document.getElementById('submitBtn');
  const sendAnotherBtn = document.getElementById('sendAnother');

  if (!form || !resultDiv || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnIcon = submitBtn.querySelector('.btn-icon');

    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnIcon) btnIcon.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline-flex';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        form.style.display = 'none';
        resultDiv.style.display = 'flex';
        resultDiv.classList.add('success');
        form.reset();
      } else {
        showToast('Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = '';
      if (btnIcon) btnIcon.style.display = '';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  });

  // "Send Another Message" button
  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', () => {
      resultDiv.style.display = 'none';
      resultDiv.classList.remove('success');
      form.style.display = '';
    });
  }
}

/* ---------- Toast Notification ---------- */
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('visible'));

  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

