import { renderHeader } from '../../components/header.js';
import { renderFooter } from '../../components/footer.js';

document.getElementById('header').innerHTML = renderHeader();
document.getElementById('footer').innerHTML = renderFooter();
  
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

// meet pets slider
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.meet-pets-container');
  const leftBtn = document.querySelector('.slider.left');
  const rightBtn = document.querySelector('.slider.right');
  const gap = parseInt(getComputedStyle(container).gap) || 0;

  function getColumnWidth() {
    const columnWidth = container.clientWidth / 2.5; // 3 visible columns
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

document.addEventListener('DOMContentLoaded', () => {
  const weCareBtn = document.querySelector('.footer-btn.btn-text');
  const weCarePopup = document.getElementById('weCarePopup');
  const weCareCloseBtn = document.querySelector('.we-care-popup-content .close-btn');
  const weCareOverlay = document.querySelector('.we-care-popup-overlay');

  weCareBtn.addEventListener('click', () => {
    weCarePopup.style.display = 'block';
    document.body.classList.add('no-scroll');
  });

  function closePopup() {
    weCarePopup.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  weCareCloseBtn.addEventListener('click', closePopup);
  weCareOverlay.addEventListener('click', closePopup);
}); 
  


