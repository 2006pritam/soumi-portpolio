// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  menu.classList.remove('open');
}));

// Nav shadow + back-to-top
const nav = document.getElementById('nav');
const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  topBtn.classList.toggle('show', window.scrollY > 500);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Typing effect
const words = ['Full Stack Developer', 'Data Analyst', 'React Developer', 'Problem Solver'];
const typing = document.getElementById('typing');
let w = 0, c = 0, del = false;
function type() {
  const word = words[w];
  typing.textContent = word.substring(0, c);
  if (!del && c < word.length) c++;
  else if (del && c > 0) c--;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else { del = false; w = (w + 1) % words.length; }
  setTimeout(type, del ? 45 : 90);
}
type();

// Scroll reveal, skill bars, counters
const counters = document.querySelectorAll('[data-count]');
function countUp(el) {
  const target = +el.dataset.count;
  const step = Math.max(1, Math.ceil(target / 60));
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n;
    if (n >= target) clearInterval(t);
  }, 25);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    e.target.querySelectorAll('.bar span').forEach(s => s.style.width = s.dataset.w + '%');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form (validation + opens the visitor's email app)
const form = document.getElementById('contactForm');
const status = document.getElementById('status');
const RECEIVER = 'your-email@example.com'; // <-- change to Soumi's real email

form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    const bad = !el.value.trim() || (id === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
    el.parentElement.classList.toggle('error', bad);
    if (bad) ok = false;
  });
  status.className = 'status';
  if (!ok) {
    status.textContent = 'Please fill in all required fields correctly.';
    status.classList.add('err');
    return;
  }
  const subject = encodeURIComponent(document.getElementById('subject').value || 'Portfolio Contact');
  const body = encodeURIComponent(
    'Name: ' + document.getElementById('name').value +
    '\nEmail: ' + document.getElementById('email').value +
    '\n\n' + document.getElementById('message').value
  );
  window.location.href = `mailto:${RECEIVER}?subject=${subject}&body=${body}`;
  status.textContent = 'Thank you! Your email app is opening to send the message.';
  status.classList.add('ok');
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
