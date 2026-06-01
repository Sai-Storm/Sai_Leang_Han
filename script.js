const loader = document.getElementById('loader');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const cursor = document.getElementById('cursor');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const typing = document.getElementById('typing');
const strings = [
  'Building modern software experiences.',
  'Learning new tools every day.',
  'Delivering clean and performant code.'
];
let current = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  const currentString = strings[current];
  if (!deleting) {
    typing.textContent = currentString.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentString.length) {
      deleting = true;
      setTimeout(typeWriter, 1600);
      return;
    }
  } else {
    typing.textContent = currentString.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      current = (current + 1) % strings.length;
    }
  }
  setTimeout(typeWriter, deleting ? 70 : 90);
}

function hideLoader() {
  loader.classList.add('hide');
  document.body.classList.remove('loading');
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');
  try {
    if (window.AOS) {
      AOS.init({
        duration: 900,
        once: true,
        easing: 'ease-out-cubic'
      });
    }
  } catch (error) {
    console.warn('AOS initialization failed:', error);
  }
  typeWriter();
  setTimeout(hideLoader, 1200);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('light-theme');
  themeToggle.innerHTML = isDark ? '☀️' : '🌙';
});

window.addEventListener('mousemove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

Array.from(document.querySelectorAll('a, button, input, textarea')).forEach((element) => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-active');
  });
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-active');
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please complete all fields before sending.';
    return;
  }

  formStatus.textContent = 'Message sent! I will reply as soon as possible.';
  contactForm.reset();
});

const interactiveItems = document.querySelectorAll('a, button, input, textarea');
interactiveItems.forEach((item) => {
  item.addEventListener('focus', () => {
    cursor.style.width = '28px';
    cursor.style.height = '28px';
  });
  item.addEventListener('blur', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
  });
});
