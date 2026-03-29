import { Loader } from './src/components/loader/loader.js';
import { renderHeader } from './src/components/header/header.js';
import { renderFooter } from './src/components/footer/footer.js';
import { renderQuickDonateSection } from './src/components/quick-donate/quick-donate.js';
import { renderDonationPopup, setupDonationPopup } from './src/components/donation-popup/donationPopup.js';


const isLocalhost = (
    (window.location.hostname === '127.0.0.1') 
    || (window.location.hostname === 'localhost') 
);
const BASE_PATH = isLocalhost ? '/src' : '/online-zoo/front/src';

const header = document.getElementById('header');
const footer = document.getElementById('footer');
const quickDonate = document.getElementById('quick-donate');

header.innerHTML = renderHeader();
footer.innerHTML = renderFooter();
const about = document.getElementById('about');
about.classList.add('active');



// donation popup
quickDonate.innerHTML = renderQuickDonateSection(
  "Your donation makes a differece!",
  "The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!"
);
const donateBtn = document.querySelector('.donate-right .btn-primary');
const popup = document.getElementById('donationPopup');
popup.innerHTML = renderDonationPopup();
setupDonationPopup();


// meet-pets section
export async function fetchPetData() {
  try {
    const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets');
    if (!response.ok) {
      throw new Error('Network error.');
    }
    const petData = await response.json();
    return petData;
  } catch (error) {
      console.error('Error fetching pet data:', error);
  }
}

function buildPetDataWithImages(data) {
  const petsWithImages = data.data.map(pet => {
    const fileName = pet.commonName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
      return {
        ...pet,
        img: `${BASE_PATH}/assets/images/pets/${pet.id}-${fileName}.png`
      };
    });
  return petsWithImages;
}

function renderMeetPetCard(pet) {
    return `
      <div class="meet-pet-card" data-id="${pet.id}">
          <div class="meet-pet-tag subheader-text">
              ${pet.name}
          </div>
          <img 
              src="${pet.img}" 
              alt="${pet.commonName} image" 
              class="meet-pet-image"
          >
          <div class="meet-pet-info">
              <div class="meet-pet-name">${pet.commonName}</div>
              <div class="text">${pet.description}.</div>
              <button class="btn-text">
                  View live cam 
                  <img src="./assets/icons/arrow-orange.svg" alt="Orange Arrow Icon">
              </button>
          </div>
      </div>
    `
}

document.addEventListener('DOMContentLoaded', async () => {
  const content = document.querySelector('.meet-pets-content');
  // show loader
  content.innerHTML = Loader();
  try {
    const data = await fetchPetData();
    const dataWithImages = buildPetDataWithImages(data);
    content.innerHTML = '<div class="meet-pets-container"></div>';
    const container = document.querySelector('.meet-pets-container');
    dataWithImages.forEach(pet => {
      container.innerHTML += renderMeetPetCard(pet);
    });

  } catch (error) {
    content.innerHTML = `
        <div class="load-error">Something went wrong. Please, refresh the page</div>
    `;
    console.error(error);
  }

  // meet pets slider
  const container = document.querySelector('.meet-pets-container');
  const leftBtn = document.querySelector('.slider.left');
  const rightBtn = document.querySelector('.slider.right');
  const gap = parseInt(getComputedStyle(container).gap) || 0;

  document.querySelectorAll('.meet-pet-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      localStorage.setItem('selectedPetId', id);
      window.location.href = `${BASE_PATH}/pages/zoos/index.html`;
    });
  })

  document.querySelectorAll('.care-pet-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id; 
      localStorage.setItem('selectedPetId', id);
      window.location.href = `${BASE_PATH}/pages/zoos/index.html`;
    });
  })
  
  function getVisibleColumns() {
    const width = window.innerWidth;
    if (width <= 800) return 1.02;
    if (width <= 1200) return 2;
    return 2.9;
  }

  function getColumnWidth() {
    const visibleCols = getVisibleColumns();
    const columnWidth = container.clientWidth / visibleCols;
    return columnWidth + gap;
  }

  rightBtn.addEventListener('click', () => {
    container.scrollBy({
      left: getColumnWidth(),
      behavior: 'smooth'
    });
  });

  leftBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -getColumnWidth(),
      behavior: 'smooth'
    });
  });

  function updateButtons() {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (scrollLeft <= 0) {
      leftBtn.classList.add('is-disabled');
    } else {
      leftBtn.classList.remove('is-disabled');
    }

    if (scrollLeft >= maxScroll - 1) {
      rightBtn.classList.add('is-disabled');
    } else {
      rightBtn.classList.remove('is-disabled');
    }
  }

  container.addEventListener('scroll', updateButtons);
  updateButtons();

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
  
});


// what users think section
async function fetchFeedbackData() {
  try {
    const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/feedback');
    
    if (!response.ok) {
      throw new Error('Network error.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
      console.error('Error fetching feedback data:', error);
      return { data: [] };
  }
}

function renderWhatUsersThinkCard(user) {
  const { city, month, text, year, name } = user;
  const feedbackDate = `${city}, ${month} ${year}`;
  return `
    <div class="users-think-card">
      <img src="./assets/icons/quotation-marks.svg" alt="Quotation marks icon" class="quotation-marks">
      <div class="users-think-card-date subheader-text">${feedbackDate}</div>
      <div class="users-think-card-text text">${text}</div>
      <div class="users-think-card-author btn-text">${name}</div>
    </div>
  `
}

document.addEventListener('DOMContentLoaded', async () => {
  const content = document.querySelector('.what-users-think-cards-container');
  // show loader
  content.innerHTML = Loader();
  try {
    const data = await fetchFeedbackData();
    content.innerHTML = '';
    data.forEach(user => {
      content.innerHTML += renderWhatUsersThinkCard(user);
    });
  } catch (error) {
    content.innerHTML = `
        <div class="load-error">Something went wrong. Please, refresh the page</div>
    `;
    console.error(error);
  }

  // slider
  const container = document.querySelector('.what-users-think-cards-container');
  const leftBtn = document.querySelector('.what-users-think-cards-content .slider.left');
  const rightBtn = document.querySelector('.what-users-think-cards-content .slider.right');
  const gap = parseInt(getComputedStyle(container).gap) || 0;

  function getColumnWidth() {
    const columnWidth = container.clientWidth; // 1 visible column
    return columnWidth + gap;
  }

  rightBtn.addEventListener('click', () => {
    container.scrollBy({
      left: getColumnWidth(),
      behavior: 'smooth'
    });
  });

  leftBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -getColumnWidth(),
      behavior: 'smooth'
    });
  });

  function updateButtons() {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (scrollLeft <= 0) {
      leftBtn.classList.add('is-disabled');
    } else {
      leftBtn.classList.remove('is-disabled');
    }

    if (scrollLeft >= maxScroll - 1) {
      rightBtn.classList.add('is-disabled');
    } else {
      rightBtn.classList.remove('is-disabled');
    }
  }

  container.addEventListener('scroll', updateButtons);
  updateButtons();
});
  


