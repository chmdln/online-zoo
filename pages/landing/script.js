import { renderHeader } from '../../components/header/header.js';
import { renderFooter } from '../../components/footer/footer.js';
import { renderQuickDonateSection } from '../../components/quick-donate/quick-donate.js';

// document.getElementById('header').innerHTML = renderHeader();
document.getElementById('footer').innerHTML = renderFooter();
document.getElementById('quick-donate').innerHTML = renderQuickDonateSection(
  "Your donation makes a differece!",
  "The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!"
);

// const about = document.getElementById('about');
// about.classList.add('active');


// meet pets slider
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.meet-pets-container');
  const leftBtn = document.querySelector('.slider.left');
  const rightBtn = document.querySelector('.slider.right');
  const gap = parseInt(getComputedStyle(container).gap) || 0;

 function getVisibleColumns() {
  const width = window.innerWidth;
  if (width <= 800) return 1.02;
  if (width <= 1200) return 2;
  return 2.6;
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
  


