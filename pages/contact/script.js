import { renderHeader } from '../../components/header/header.js';
import { renderFooter } from '../../components/footer/footer.js';

document.getElementById('header').innerHTML = renderHeader();
document.getElementById('footer').innerHTML = renderFooter();
const contact = document.getElementById('contact-us');
contact.classList.add('active');

const burger = document.querySelector('.hamburger-icon');
const burgerMenu = document.querySelector('.burger-menu');
const burgerCloseBtn = document.querySelector('.burger-close-btn');

burger.addEventListener('click', () => {
burgerMenu.classList.add('burger');
burgerCloseBtn.classList.add('active');
});

burgerCloseBtn.addEventListener('click', () => {
burgerMenu.classList.remove('burger');
burgerCloseBtn.classList.remove('active');
});

