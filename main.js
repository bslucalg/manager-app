/* ═══════════════════════════════
   MANAGER APP – MAIN JS
═══════════════════════════════ */

/* ── Language Toggle ── */
let currentLang = 'it';

function toggleLang() {
  currentLang = currentLang === 'it' ? 'en' : 'it';
  applyLang();
  document.getElementById('lang-label').textContent =
    currentLang === 'it' ? '🇬🇧 EN' : '🇮🇹 IT';
  localStorage.setItem('lang', currentLang);
}

function applyLang() {
  const lang = currentLang;
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });
  // Update html lang attribute
  document.documentElement.lang = lang;
  // Update page title
  document.title = lang === 'it'
    ? 'Manager App – Gestisci la tua squadra'
    : 'Manager App – Manage your team';
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = lang === 'it'
      ? 'Manager è l\'app Android per gestire la tua squadra di calcio: rosa, vivaio, mercato, finanze e molto altro. Disponibile ora a €15.'
      : 'Manager is the Android app to manage your football team: squad, academy, market, finances and much more. Available now for €15.';
  }
}

/* ── Hamburger Menu ── */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

/* ── FAQ Accordion ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('visible');

  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('visible'));
  document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('open'));

  if (!isOpen) {
    answer.classList.add('visible');
    btn.classList.add('open');
  }
}

/* ── Smooth scroll for nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Navbar scroll effect ── */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(15,31,61,0.12)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* ── Intersection Observer for fade-in ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.feature-card, .review-card, .step-card, .screenshot-card, .faq-item, .stat-item'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved language
  const saved = localStorage.getItem('lang');
  if (saved && saved !== 'it') {
    currentLang = saved;
    applyLang();
    document.getElementById('lang-label').textContent = '🇮🇹 IT';
  }
});
