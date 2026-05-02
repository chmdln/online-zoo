import { renderHeader } from '../../components/header/header.js';
import { renderFooter } from '../../components/footer/footer.js';

const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo';

const header = document.getElementById('header');
header.innerHTML = renderHeader();
const footer = document.getElementById('footer');
footer.innerHTML = renderFooter();
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

const map = document.getElementById('map');
map.classList.add('active');

function renderIconOnMap(config) {
    return `
        <img 
            src="/assets/icons/${config.fileName}" 
            alt="${config.animalName} location icon"
            class="location-icon ${config.animalName.toLowerCase()}-icon"
        >   
    `; 
}

const mapConfig = [
    {   
        fileName: 'eagle-map.svg',
        animalName: 'Eagle'
    },
    {
        fileName: 'alligator-map.svg',
        animalName: 'Alligator'
    },
    {
        fileName: 'lion-map.svg',
        animalName: 'Lion'
    },
    {
        fileName: 'gorilla-map.svg',
        animalName: 'Gorilla'
    },
    {
        fileName: 'lemur-map.svg',
        animalName: 'Lemur'
    }, 
    {
        fileName: 'koala-map.svg',
        animalName: 'Koala'
    },
    {
        fileName: 'panda-map.svg',
        animalName: 'Panda'
    },
    {
        fileName: 'tiger-map.svg',
        animalName: 'Tiger'
    }
];

mapConfig.forEach(config => {
    document.querySelector('.map-container').innerHTML += renderIconOnMap(config);
});

document.querySelectorAll('.location-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.src = this.src.replace('.svg', '-white.svg');
    });

    icon.addEventListener('mouseleave', function () {
        this.src = this.src.replace('-white.svg', '.svg');
    });
});


