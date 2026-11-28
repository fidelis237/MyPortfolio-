document.getElementById('year').textContent = new Date().getFullYear();

// Smooth-scroll for every in-page link (View My Work, menu, etc.). Works even where plain #links are blocked.
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href');
  e.preventDefault();
  if (id.length < 2) return;
  const target = document.querySelector(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

// Project popup
const PROJECTS = {
  greenbasket: {
    kicker: 'Online grocery store',
    title: 'Greenbasket',
    desc: 'An online grocery store where customers browse fresh produce, pantry staples and household items and get them delivered to their door.',
    points: ['Shop by category: fruits, vegetables and beverages', 'Mobile money payments (MTN MoMo and Orange Money)', 'Shopping cart, customer sign-in and fast delivery', 'Featured categories and customer ratings on the homepage'],
    url: 'https://claude.ai/artifact/PRQfzPUnhnicyB7snU75ct'
  },
  skincare: {
    kicker: 'Natural skincare store',
    title: 'Skincareweb (Glowérive)',
    desc: 'A web store for the Glowérive natural skincare brand, built around shopping, product collections and the ingredients behind them.',
    points: ['Shop, collections, ingredients and blog pages', 'Product search and shopping cart', 'Customer account and admin access in the header', 'Register Now and Watch Video calls to action'],
    url: ''
  },
  rohi: {
    kicker: 'School website',
    title: 'Rohi Website',
    desc: 'The website of Rohi Bilingual Comprehensive High School in Loum, presenting the school, its departments and campuses and how to apply.',
    points: ['English and French language switch', 'Departments and campuses with dropdown menus', 'Admission guide, apply section and photo gallery', 'Clear calls to action to explore departments and read the school story'],
    url: 'https://claude.ai/artifact/RGhuriv1KQa3kJDeWpADqw'
  },
  rohi2: {
    kicker: 'School website · version 2',
    title: 'Rohi School Website (v2)',
    desc: 'A second design of the Rohi Bilingual Comprehensive High School website in Loum, a faith-rooted school focused on excellence, discipline and future-ready learning.',
    points: ['Hero with the admissions-open message, key figures and a news ticker', 'About section presenting the school and its values', 'Four departments: Science, Arts, Business and Technical', 'Step-by-step admission guide with requirements, and WhatsApp, email and call buttons'],
    url: 'https://claude.ai/artifact/JD8osoU6vaFNb2KKUPLYje'
  }
};
const pm = document.getElementById('projectModal');
const pmF = { img: document.getElementById('pmImg'), kicker: document.getElementById('pmKicker'), title: document.getElementById('pmTitle'),
  desc: document.getElementById('pmDesc'), points: document.getElementById('pmPoints'), visit: document.getElementById('pmVisit'), note: document.getElementById('pmNote') };
document.querySelectorAll('.thumb[data-project]').forEach(card => card.addEventListener('click', () => {
  const p = PROJECTS[card.dataset.project]; if (!p) return;
  const img = card.querySelector('img');
  pmF.img.src = img.src; pmF.img.alt = img.alt;
  pmF.kicker.textContent = p.kicker; pmF.title.textContent = p.title; pmF.desc.textContent = p.desc;
  pmF.points.replaceChildren(...p.points.map(t => Object.assign(document.createElement('li'), { textContent: t })));
  if (p.url) { pmF.visit.href = p.url; pmF.visit.hidden = false; pmF.note.textContent = ''; }
  else { pmF.visit.hidden = true; pmF.note.textContent = 'Live link coming soon.'; }
  pm.showModal();
  document.body.style.overflow = 'hidden';
  pm.scrollTop = 0;
}));
document.getElementById('pmClose').addEventListener('click', () => pm.close());
pm.addEventListener('click', e => { if (e.target === pm) pm.close(); });   // click on the dark backdrop closes it
pm.addEventListener('close', () => { document.body.style.overflow = ''; });

// Projects: show 3, "View More Projects" reveals the rest
const projectsGrid = document.getElementById('projectsGrid');
const projectsToggle = document.getElementById('projectsToggle');
projectsToggle.addEventListener('click', () => {
  const collapsed = projectsGrid.classList.toggle('collapsed');
  projectsToggle.setAttribute('aria-expanded', String(!collapsed));
  projectsToggle.textContent = collapsed ? 'View More Projects' : 'Show Fewer Projects';
});

// Skills: show 3, "View All Skills" reveals the rest
const skillsGrid = document.getElementById('skillsGrid');
const skillsToggle = document.getElementById('skillsToggle');
skillsToggle.addEventListener('click', () => {
  const collapsed = skillsGrid.classList.toggle('collapsed');
  skillsToggle.setAttribute('aria-expanded', String(!collapsed));
  skillsToggle.textContent = collapsed ? 'View All Skills' : 'Show Less';
});

// Reveal sections on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Highlight the active nav link
const links = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
