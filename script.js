window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const site = document.getElementById('site');
  const fill = document.querySelector('.loader-fill');
  const percent = document.getElementById('loader-percentage');

  let count = 0;
  const interval = setInterval(() => {
    count++;
    fill.style.width = count + '%';
    percent.textContent = count + '%';

    if (count >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.display = 'none';
        site.classList.remove('hidden');
        revealOnScroll();
        popUpOnScroll();
      }, 300); // small delay for smoothness
    }
  }, 25); // total time ~2.5s
});


// Accordion for FAQ section
document.querySelectorAll('.faq .question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      document.querySelectorAll('.faq .answer').forEach(a => a.style.maxHeight = null);
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Scroll-based animation for sections
const animatedSections = document.querySelectorAll('.animate-on-scroll');

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;
  animatedSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < triggerPoint) {
      section.classList.add('show');
    }
  });
}

// Scroll-based pop-up for individual items
const popItems = document.querySelectorAll('.animate-pop');

function popUpOnScroll() {
  const trigger = window.innerHeight * 0.9;
  popItems.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      setTimeout(() => {
        el.classList.add('show');
      }, index * 150);
    }
  });
}

window.addEventListener('scroll', () => {
  revealOnScroll();
  popUpOnScroll();
});

// Theme toggle button logic
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  // Re-run animations after theme switch
setTimeout(() => {
  revealOnScroll();
  popUpOnScroll();
}, 500);
});
