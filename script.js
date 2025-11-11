$(document).ready(function () {

    'use strict';
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const sections = document.querySelectorAll('main .section, main #hero');

    const storedTheme = localStorage.getItem('site-theme');
    const prefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('theme-dark');
            themeIcon.className = 'fa-solid fa-sun';
            themeToggle.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.remove('theme-dark');
            themeIcon.className = 'fa-solid fa-moon';
            themeToggle.setAttribute('aria-pressed', 'false');
        }
        localStorage.setItem('site-theme', theme);
    }

    applyTheme(defaultTheme);

    themeToggle.addEventListener('click', () => {
        const nowDark = body.classList.toggle('theme-dark');
        applyTheme(nowDark ? 'dark' : 'light');
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 20;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id;
                const link = document.querySelector('.side-nav a[href="#' + id + '"]');
                if (entry.isIntersecting) {
                    document.querySelectorAll('.side-nav a').forEach((a) => a.classList.remove('active'));
                    if (link) link.classList.add('active');
                }
            });
        },
        { threshold: 0.48 }
    );

    sections.forEach((section) => observer.observe(section));

    const hero = document.getElementById('hero');
    const heroCTA = hero.querySelector('.hero-cta');
    let floatingCTA = null;

    if (heroCTA) {
        floatingCTA = heroCTA.cloneNode(true);
        floatingCTA.classList.add('floating-cta');
        document.body.appendChild(floatingCTA);

        const toggleCTA = () => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            if (heroBottom <= 0) floatingCTA.classList.add('visible');
            else floatingCTA.classList.remove('visible');
        };

        window.addEventListener('scroll', toggleCTA, { passive: true });
        toggleCTA();
    }

    const loopOrder = ['.card-a', '.card-b', '.card-c', '.card-d'];
    const loopEls = loopOrder.map((sel) => document.querySelector(sel));
    let idx = 0;

    if (loopEls.every(Boolean)) {
        loopEls.forEach((el, i) => el.classList.toggle('active', i === 0));
        setInterval(() => {
            loopEls.forEach((el) => el.classList.remove('active'));
            loopEls[idx].classList.add('active');
            idx = (idx + 1) % loopEls.length;
        }, 1800);
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
    });
});