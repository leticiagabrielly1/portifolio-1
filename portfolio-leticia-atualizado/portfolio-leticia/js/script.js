'use strict';

// Saudação: acompanha o horário do aparelho, sem solicitar localização.
const greeting = document.querySelector('#greeting');
const hour = new Date().getHours();
greeting.textContent = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

// O único dado salvo localmente é a preferência de aparência.
const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
let savedTheme = null;
try { savedTheme = localStorage.getItem('leticia-theme'); } catch (_) { /* Navegador pode bloquear armazenamento. */ }
const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
function applyTheme(mode) {
  root.dataset.theme = mode;
  themeIcon.textContent = mode === 'dark' ? '☀' : '☾';
  themeButton.setAttribute('aria-label', mode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
  themeButton.title = mode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
  document.querySelector('meta[name="theme-color"]').content = mode === 'dark' ? '#1d1428' : '#f9f6ff';
}
applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (systemDark ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('leticia-theme', next); } catch (_) { /* Tema continua funcionando. */ }
});

// Menu: visível sem JS em telas pequenas; o JS habilita o botão de abrir/fechar.
const menu = document.querySelector('#menu-principal');
const menuButton = document.querySelector('#menu-toggle');
menu.classList.add('js-menu');
function closeMenu(returnFocus = false) {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

document.querySelector('#current-year').textContent = new Date().getFullYear();
