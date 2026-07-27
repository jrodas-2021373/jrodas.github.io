// ==========================================================================
// Portafolio de Desarrollador — Script general
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveLink();
  initRevealOnScroll();
  initSkillBars();
  initTerminalTyping();
  initRotatingWord();
  initCodeTilt();
});

/* Menú móvil */
function initNavToggle(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* Resalta el link del nav correspondiente a la página actual */
function initActiveLink(){
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if(href === current){
      link.classList.add('active');
    }
  });
}

/* Anima elementos con clase .reveal cuando entran en pantalla */
function initRevealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

/* Barras de habilidades: crecen al entrar en pantalla */
function initSkillBars(){
  const bars = document.querySelectorAll('.skill-fill');
  if(!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = el.getAttribute('data-percent') || '0';
        requestAnimationFrame(() => { el.style.width = target + '%'; });
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* Escribe el comando del terminal y luego revela la salida */
function initTerminalTyping(){
  const el = document.querySelector('[data-terminal-typing]');
  if(!el) return;
  const text = el.getAttribute('data-terminal-typing');
  const output = document.querySelector('[data-terminal-output]');
  el.textContent = '';
  let i = 0;

  function type(){
    if(i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    } else if(output){
      setTimeout(() => output.classList.add('show'), 300);
    }
  }
  setTimeout(type, 2300);
}

/* Rota las palabras de la frase del héroe (interfaces, APIs, productos...) */
function initRotatingWord(){
  const el = document.querySelector('.rotating-word');
  if(!el) return;
  const words = (el.getAttribute('data-words') || '').split(',').map(w => w.trim()).filter(Boolean);
  if(words.length < 2) return;
  let i = 0;

  setInterval(() => {
    el.classList.add('switching');
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('switching');
    }, 300);
  }, 2400);
}

/* Inclina levemente la ventana de código según la posición del mouse */
function initCodeTilt(){
  const wrap = document.querySelector('.hero-code-wrap');
  const win = document.querySelector('[data-tilt]');
  if(!wrap || !win) return;
  if(!window.matchMedia('(pointer: fine)').matches) return;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    win.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });

  wrap.addEventListener('mouseleave', () => {
    win.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}
