// Scroll Spy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

const toggle = document.querySelector('.theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') body.classList.add('dark');

toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

const loopCards = document.querySelectorAll('.loop-card');
let activeIndex = 0;

setInterval(() => {
    loopCards[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % loopCards.length;
    loopCards[activeIndex].classList.add('active');
}, 1500);
