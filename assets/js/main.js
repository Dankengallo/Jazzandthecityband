const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

function setMenu(open) {
  navLinks?.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);

  menuBtn?.setAttribute(
    'aria-expanded',
    String(open)
  );

  menuBtn?.setAttribute(
    'aria-label',
    open ? 'Close menu' : 'Open menu'
  );

  if (menuBtn) {
    menuBtn.textContent = open ? '×' : '☰';
  }
}

menuBtn?.addEventListener('click', () => {
  setMenu(!navLinks?.classList.contains('open'));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMenu(false);
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setMenu(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 800) {
    setMenu(false);
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document
  .querySelectorAll('.reveal')
  .forEach(element => {
    observer.observe(element);
  });

/* Floating inquiry button */

const currentPage =
  window.location.pathname.split('/').pop() ||
  'index.html';

const isContactPage =
  currentPage === 'contact.html';

let floatingInquiryButton = null;

if (!isContactPage) {
  floatingInquiryButton =
    document.createElement('a');

  floatingInquiryButton.href = 'contact.html';

  floatingInquiryButton.className =
    'floating-inquiry';

  floatingInquiryButton.setAttribute(
    'aria-label',
    'Inquire about booking Jazz & The City'
  );

  floatingInquiryButton.innerHTML = `
    <span>Inquire for Booking</span>
    <span
      class="floating-inquiry-arrow"
      aria-hidden="true"
    >
      →
    </span>
  `;

  document.body.appendChild(
    floatingInquiryButton
  );
}

function updatePageOnScroll() {
  const scrollPosition = window.scrollY;

  header?.classList.toggle(
    'scrolled',
    scrollPosition > 40
  );

  floatingInquiryButton?.classList.toggle(
    'visible',
    scrollPosition > 250
  );
}

window.addEventListener(
  'scroll',
  updatePageOnScroll,
  {
    passive: true
  }
);

updatePageOnScroll();
