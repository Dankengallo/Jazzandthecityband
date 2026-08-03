const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('.nav-links');

function setMenu(open) {
  navigation?.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

  if (menuButton) {
    menuButton.textContent = open ? '×' : '☰';
  }
}

menuButton?.addEventListener('click', () => {
  setMenu(!navigation?.classList.contains('open'));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 800) {
    setMenu(false);
  }
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const isContactPage = currentPage === 'contact.html';
let floatingInquiryButton = null;

if (!isContactPage) {
  floatingInquiryButton = document.createElement('a');
  floatingInquiryButton.href = 'contact.html';
  floatingInquiryButton.className = 'floating-inquiry';
  floatingInquiryButton.setAttribute('aria-label', 'Inquire about booking Jazz & The City');
  floatingInquiryButton.innerHTML = `
    <span>Inquire for Booking</span>
    <span class="floating-inquiry-arrow" aria-hidden="true">→</span>
  `;
  document.body.appendChild(floatingInquiryButton);
}

function updateOnScroll() {
  const scrollPosition = window.scrollY;
  header?.classList.toggle('scrolled', scrollPosition > 40);
  floatingInquiryButton?.classList.toggle('visible', scrollPosition > 250);
}

window.addEventListener('scroll', updateOnScroll, { passive: true });
updateOnScroll();
