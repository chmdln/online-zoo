import { Loader } from './components/loader/loader.js';
import { renderHeader } from './components/header/header.js';
import { renderFooter } from './components/footer/footer.js';
import { renderQuickDonateSection } from './components/quick-donate/quick-donate.js';


const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo';

const header = document.getElementById('header');
const footer = document.getElementById('footer');
const quickDonate = document.getElementById('quick-donate');
header.innerHTML = renderHeader();
footer.innerHTML = renderFooter();
quickDonate.innerHTML = renderQuickDonateSection(
  "Your donation makes a differece!",
  "The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!"
);

const about = document.getElementById('about');
about.classList.add('active');


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


function setupDonationPopup() {
    const donateBtn = document.querySelector('.donate-right .btn-primary');
    const popup = document.getElementById('donationPopup');
    const closeBtn = document.getElementById('closePopup');
    const overlay = document.getElementById('popupOverlay');

    donateBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    document.body.classList.add('no-scroll');
    });

    function closePopup() {
    popup.style.display = 'none';
    document.body.classList.remove('no-scroll');
    trigger.textContent = 'Choose your favourite';
    trigger.style.color = '#A4A8AE';
    popupSteps[currPopupStep].classList.remove('active');
    currPopupStep = 0;
    popupSteps[currPopupStep].classList.add('active');
    }

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    const select = document.querySelector('.special-pet-select');
    const trigger = select.querySelector('.select-trigger .trigger-placeholder');
    const arrow = select.querySelector('.arrow-wrapper');
    const options = select.querySelector('.select-options');
    const optionsList = select.querySelectorAll('.select-options li');
    const dropdown = select.querySelector('.select-dropdown');
    const upArrow = document.querySelector('.up-arrow');
    const downArrow = document.querySelector('.down-arrow')

    arrow.addEventListener('click', () => {
    options.style.display =
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });


    let currentIndex = 0;
    function updateActiveOption(index) {
        optionsList.forEach(option => option.classList.remove('active'));
        optionsList[index].classList.add('active');
        optionsList[index].scrollIntoView({
            block: 'nearest'
        });
    }

    updateActiveOption(currentIndex);

    downArrow.addEventListener('click', () => {
        if (currentIndex < optionsList.length - 1) {
            currentIndex++;
            updateActiveOption(currentIndex);
        }
    });

    upArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateActiveOption(currentIndex);
        }
    });

    optionsList.forEach((option, index) => {
        option.addEventListener('click', () => {
            currentIndex = index;
            updateActiveOption(currentIndex);
            trigger.textContent = option.textContent;
            trigger.style.color = '#000000';
            options.style.display = 'none';
            dropdown.style.display = 'none';
        });
    });

    const popupSteps = document.querySelectorAll('.popup-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const completeDonationBtn = document.querySelector('.complete-donation-btn');

    let currPopupStep = 0;
    nextBtns.forEach((nextBtn, index) => {
        nextBtn.addEventListener('click', () => {
            popupSteps[currPopupStep].classList.remove('active');
            currPopupStep++;
            if (currPopupStep < popupSteps.length) {
                popupSteps[currPopupStep].classList.add('active');
            }
        });
    });

    backBtns.forEach((backBtn, index) => {
        backBtn.addEventListener('click', () => {
            popupSteps[currPopupStep].classList.remove('active');
            currPopupStep--;
            if (currPopupStep >= 0) {
                popupSteps[currPopupStep].classList.add('active');
            }
        });
    });

    completeDonationBtn.addEventListener('click', () => {
        popupSteps[currPopupStep].classList.remove('active');
        currPopupStep = 0;
        popupSteps[currPopupStep].classList.add('active');
        closePopup();
    });
}
setupDonationPopup();


// meet-pets-section
async function fetchPetData() {
  try {
    const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
      console.error('Error fetching pet data:', error);
      // return { data: [] };
  }
}

function buildPetDataWithImages(data) {
  const petsWithImages = data.data.map(pet => {
    const fileName = pet.commonName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
      return {
        ...pet,
        img: `/assets/images/pets/${pet.id}-${fileName}.png`
      };
    });
  return petsWithImages;
}

function renderMeetPetCard(pet) {
    return `
      <div class="meet-pet-card" data-id="${pet.commonName}">
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

// meet pets section
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
      const id = card.dataset.id ? card.dataset.id : 'panda';
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

// what users think slider
document.addEventListener('DOMContentLoaded', () => {
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
  


