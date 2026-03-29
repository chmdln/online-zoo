import { renderHeader } from '../../components/header/header.js';
import { renderFooter } from '../../components/footer/footer.js';

const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo';

const header = document.getElementById('header');
header.innerHTML = renderHeader();
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

// auth
document.addEventListener('DOMContentLoaded', () => {
    header.addEventListener('click', (e) => {
        if (e.target.closest('.user-icon')) {
            const popup = document.querySelector('.user-popup');
            popup.classList.toggle('active');
        }

        if (e.target.closest('.sign-in-btn')) {
            window.location.href = `${BASE_PATH}/pages/signin/`;
        } 

        if (e.target.closest('.sign-up-btn')) {
            window.location.href = `${BASE_PATH}/pages/signup/`;
        }

        if (e.target.closest('.sign-out-btn')) {
            localStorage.removeItem('user');
            header.innerHTML = renderHeader();
        }
    }); 
});

