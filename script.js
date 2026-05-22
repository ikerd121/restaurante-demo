// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== MENU DATA =====
const menuData = {
  entrantes: [
    { name: 'Croquetas de jamón ibérico', desc: 'Bechamel artesanal, jamón DO Jabugo, pan rallado casero', price: '14€', badge: null },
    { name: 'Ensalada de temporada', desc: 'Hojas variadas, frutos secos, queso de cabra, vinagreta de miel', price: '12€', badge: 'Vegano' },
    { name: 'Carpaccio de buey', desc: 'Láminas finas, alcaparras, parmesano 24 meses, rúcula', price: '18€', badge: null },
    { name: 'Gazpacho andaluz', desc: 'Tomate de huerto, pepino, pimiento, aceite virgen extra', price: '10€', badge: 'Vegano' },
    { name: 'Tabla de ibéricos', desc: 'Selección de embutidos ibéricos de bellota con pan con tomate', price: '22€', badge: null },
    { name: 'Boquerones en vinagre', desc: 'Marinados 48h, ajo, perejil, aceite de oliva arbequina', price: '11€', badge: null },
  ],
  principales: [
    { name: 'Cochinillo asado', desc: 'Cocción lenta 8 horas, piel crujiente, puré de manzana', price: '28€', badge: null },
    { name: 'Lubina a la sal', desc: 'Lubina salvaje, sal marina, hinojo, patatas confitadas', price: '32€', badge: null },
    { name: 'Risotto de setas', desc: 'Boletus, trompetas, aceite de trufa, parmesano, cebollino', price: '22€', badge: 'Vegano' },
    { name: 'Solomillo de ternera', desc: 'Ternera gallega, salsa de vino tinto, espárragos, foie', price: '36€', badge: null },
    { name: 'Pasta fresca al ragù', desc: 'Tagliatelle artesanal, ragù de ternera y cerdo, albahaca', price: '19€', badge: null },
    { name: 'Merluza en salsa verde', desc: 'Merluza del norte, almejas, guisantes, caldo de pescado', price: '26€', badge: null },
  ],
  postres: [
    { name: 'Tarta de queso vasca', desc: 'Cremosa, ligeramente quemada, coulis de frutos rojos', price: '9€', badge: null },
    { name: 'Crema catalana', desc: 'Receta tradicional, azúcar caramelizado al momento', price: '7€', badge: null },
    { name: 'Coulant de chocolate', desc: 'Fondant interior, helado de vainilla bourbon, crujiente', price: '10€', badge: null },
    { name: 'Helados artesanos', desc: 'Tres bolas a elegir: vainilla, stracciatella, pistacho, limón', price: '8€', badge: null },
  ],
  bebidas: [
    { name: 'Vinos por copa', desc: 'Selección de blancos, tintos y rosados. Pregunte al sommelier', price: '5–9€', badge: null },
    { name: 'Cava Brut Nature', desc: 'Cavas seleccionados de la D.O. Cava, botella', price: '28€', badge: null },
    { name: 'Aguas y refrescos', desc: 'Mineral con y sin gas, refrescos artesanos de temporada', price: '2.5€', badge: null },
    { name: 'Cafés e infusiones', desc: 'Café de especialidad, té negro, infusiones ecológicas', price: '3€', badge: null },
  ],
};

// ===== MENU TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const menuContent = document.getElementById('menu-content');

function renderMenu(tab) {
  const items = menuData[tab];
  menuContent.innerHTML = items.map(item => `
    <div class="menu-item reveal">
      <div class="menu-item-info">
        <h3>${item.name}${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}</h3>
        <p>${item.desc}</p>
      </div>
      <span class="menu-price">${item.price}</span>
    </div>
  `).join('');
  observeReveal();
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    menuContent.style.opacity = '0';
    menuContent.style.transform = 'translateY(10px)';
    setTimeout(() => {
      renderMenu(btn.dataset.tab);
      menuContent.style.transition = 'opacity .3s ease, transform .3s ease';
      menuContent.style.opacity = '1';
      menuContent.style.transform = 'translateY(0)';
    }, 180);
  });
});

renderMenu('entrantes');

// ===== SCROLL REVEAL =====
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.querySelectorAll('.strip-item, .gallery-item, .horario-row, .footer-brand, .footer-links').forEach(el => {
  el.classList.add('reveal');
});
observeReveal();

// ===== RESERVA FORM =====
const reservaForm = document.getElementById('reserva-form');
const reservaSuccess = document.getElementById('reserva-success');

const today = new Date().toISOString().split('T')[0];
document.getElementById('fecha').min = today;

reservaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const required = reservaForm.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#e57373';
      valid = false;
    }
  });
  if (!valid) return;

  const btn = reservaForm.querySelector('.btn-submit');
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  setTimeout(() => {
    reservaForm.style.display = 'none';
    reservaSuccess.style.display = 'block';
    reservaSuccess.style.animation = 'fadeUp .6s ease both';
  }, 1200);
});

// ===== SMOOTH SCROLL OFFSET (fixed navbar) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
