
'use strict';

/* =====================================
   SAUDAÇÃO DINÂMICA
===================================== */

const greeting = document.querySelector('#greeting');

const hour = new Date().getHours();

greeting.textContent =
    hour < 12 ? 'Bom dia' :
    hour < 18 ? 'Boa tarde' :
    'Boa noite';


/* =====================================
   MODO CLARO E ESCURO
===================================== */

const root = document.documentElement;

const themeButton = document.querySelector('#theme-toggle');

const themeIcon = document.querySelector('#theme-icon');

let savedTheme = null;

try {
    savedTheme = localStorage.getItem('leticia-theme');
} catch (_) {
    // Funciona mesmo se o armazenamento estiver bloqueado.
}

const systemDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(mode) {

    root.dataset.theme = mode;

    themeIcon.textContent =
        mode === 'dark' ? '☀' : '☾';

    const label = mode === 'dark'
        ? 'Ativar modo claro'
        : 'Ativar modo escuro';

    themeButton.setAttribute('aria-label', label);

    themeButton.title = label;

    const metaTheme = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (metaTheme) {
        metaTheme.content =
            mode === 'dark' ? '#1d1428' : '#f9f6ff';
    }
}

applyTheme(
    savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : systemDark ? 'dark' : 'light'
);

themeButton.addEventListener('click', () => {

    const next = root.dataset.theme === 'dark'
        ? 'light'
        : 'dark';

    applyTheme(next);

    try {
        localStorage.setItem('leticia-theme', next);
    } catch (_) {
        // O tema continua funcionando.
    }

});


/* =====================================
   MENU RESPONSIVO
===================================== */

const menu = document.querySelector('#menu-principal');

const menuButton = document.querySelector('#menu-toggle');

menu.classList.add('js-menu');

function closeMenu(returnFocus = false) {

    menu.classList.remove('is-open');

    menuButton.setAttribute('aria-expanded', 'false');

    menuButton.setAttribute('aria-label', 'Abrir menu');

    if (returnFocus) {
        menuButton.focus();
    }
}

menuButton.addEventListener('click', () => {

    const isOpen = menu.classList.toggle('is-open');

    menuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
    );

    menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Fechar menu' : 'Abrir menu'
    );
});

/* Fecha ao escolher uma seção */

menu.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => closeMenu());

});

/* Fecha com Escape */

document.addEventListener('keydown', event => {

    if (
        event.key === 'Escape' &&
        menu.classList.contains('is-open')
    ) {
        closeMenu(true);
    }

});

/* Fecha ao clicar fora */

document.addEventListener('click', event => {

    if (
        !menu.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {
        closeMenu();
    }

});

/* Fecha ao aumentar a tela */

window.addEventListener('resize', () => {

    if (window.innerWidth > 760) {
        closeMenu();
    }

});


/* =====================================
   ANO AUTOMÁTICO
===================================== */

document.querySelector('#current-year')
    .textContent = new Date().getFullYear();
