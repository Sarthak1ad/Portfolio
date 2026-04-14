/* ======================================
   SARTHAK PORTFOLIO — SCRIPT.JS
   ====================================== */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX - 3 + 'px';
  cursorDot.style.top = mouseY - 3 + 'px';
});

function animCursor() {
  curX += (mouseX - curX) * 0.1;
  curY += (mouseY - curY) * 0.1;
  cursor.style.left = curX - 18 + 'px';
  cursor.style.top = curY - 18 + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button, .proj-card, .skill-pill, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(1.6)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

/* ── THEME TOGGLE ── */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggleIcon');

// Default is light theme
let isDark = false;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  toggleIcon.textContent = isDark ? '☀' : '☾';
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── TYPED TEXT ── */
const words = [
  'Full Stack Developer',
  'ML Enthusiast',
  'Problem Solver',
  'CS Student · 3rd Year',
  'Open Source Contributor',
  'Hackathon Winner 🏆',
];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const w = words[wi];
  if (!deleting) {
    typedEl.textContent = w.slice(0, ci + 1);
    ci++;
    if (ci === w.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    typedEl.textContent = w.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 45 : 80);
}
type();

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger within parent containers
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── STAT COUNTER ANIMATION ── */
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + '+';
    if (current >= target) clearInterval(timer);
  }, 40);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCount);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── PROJECT FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projCards.forEach(card => {
      const cat = card.dataset.cat;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        // Re-trigger animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.35s ease, transform 0.35s ease, border-color 0.25s, box-shadow 0.25s, all 0.25s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 20);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const btnText = document.getElementById('btnText');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    btnText.textContent = 'Sending...';
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.7';

    setTimeout(() => {
      btnText.textContent = 'Send Message ↗';
      sendBtn.disabled = false;
      sendBtn.style.opacity = '1';
      formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }, 1500);
  });
}

/* ── NAVBAR SCROLL EFFECT ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(155,48,217,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  // Back to top button
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ── BACK TO TOP ── */
const backTop = document.getElementById('backTop');
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── PHOTO UPLOAD ── */
const photoFrame = document.getElementById('photoFrame');
const photoInput = document.getElementById('photoInput');
const photoImg = document.getElementById('photoImg');
const photoInitials = document.getElementById('photoInitials');

photoFrame.addEventListener('click', () => photoInput.click());
photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    photoImg.src = ev.target.result;
    photoImg.style.display = 'block';
    photoInitials.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

/* ── SMOOTH NAV LINK SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── SKILL PILL HOVER RIPPLE ── */
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function () {
    this.style.transition = 'all 0.2s ease';
  });
});

/* ── STAGGERED REVEAL FOR GRID CHILDREN ── */
function staggerReveal(containerSelector, delay = 80) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const children = container.querySelectorAll('.reveal');
    const containerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * delay);
        });
        containerObserver.disconnect();
      }
    }, { threshold: 0.1 });
    containerObserver.observe(container);
  });
}

staggerReveal('.proj-grid', 100);
staggerReveal('.cert-grid', 90);
staggerReveal('.skills-categories', 80);

/* ── DOWNLOAD CV ── */
document.getElementById('downloadResume').addEventListener('click', (e) => {
  e.preventDefault();
  // Creates a simple text "resume" for demo purposes
  const cvContent = `SARTHAK DARANDALE
CS Student · Full-Stack Developer
Aurangabad, Maharashtra
sarthak@email.com | github.com/sarthak | linkedin.com/in/sarthak

EDUCATION
B.E. Computer Science & Engineering
MGM's College of Engineering, Aurangabad (2022–2026) · CGPA: 8.4/10

EXPERIENCE
Software Engineering Intern — TechCorp Solutions, Pune (Jun–Aug 2024)
- Built 5 RESTful APIs consumed by 10k+ users daily
- Reduced page load time by 35% via code-splitting

PROJECTS
- ShopSmart: Full-stack e-commerce (React, Node.js, MongoDB, Stripe)
- MedPredict: Disease classifier, 92% accuracy (Python, Scikit-learn, Flask)
- TaskFlow: Kanban app with real-time collaboration (React, Socket.io)
- SentimentScope: Twitter NLP analyzer with BERT

SKILLS
Python, Java, C++, JavaScript, TypeScript, React, Next.js, Node.js,
MongoDB, MySQL, TensorFlow, Scikit-learn, Docker, Git

CERTIFICATIONS
- ML Specialization — Coursera / Andrew Ng (2024)
- Full-Stack Web Dev — Udemy (2023)
- DSA — NPTEL / IIT Bombay, Silver Elite (2023)
`;
  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Sarthak_Darandale_CV.txt';
  a.click(); URL.revokeObjectURL(url);
});
