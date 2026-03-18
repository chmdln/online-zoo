import { renderHeader } from '../../components/header/header.js';
import { renderFooter } from '../../components/footer/footer.js';
import { renderSidebar } from '../../components/sidebar/sidebar.js';
import { Loader } from '../../components/loader/loader.js';
import { renderDidYouKnowSection } from '../../components/did-you-know/did-you-know.js';
import { renderQuickDonateSection } from '../../components/quick-donate/quick-donate.js';
import { renderMapModal } from '../../components/map-modal/mapModal.js';
import { renderDonationPopup, setupDonationPopup } from '../../components/donation-popup/donationPopup.js';

const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo';


function setupRotatingSidebar(sidebarSelector) {
    const sidebar = document.querySelector(sidebarSelector);
    const track = sidebar.querySelector('.sidebar-track');
    const arrowDown = sidebar.querySelector('.sidebar-bottom');

    if (!track || !arrowDown) return;

    arrowDown.addEventListener('click', () => {
        const firstItem = track.firstElementChild;
        const itemHeight = firstItem.offsetHeight;

        track.style.transition = 'transform 0.3s ease';
        track.style.transform = `translateY(-${itemHeight}px)`;

        setTimeout(() => {
            track.style.transition = 'none';
            track.appendChild(firstItem);
            track.style.transform = 'translateY(0)';
        }, 300);
    });
}

document.getElementById('header').innerHTML = renderHeader();
document.getElementById('footer').innerHTML = renderFooter();
const sidebar = document.getElementById('sidebar');
sidebar.innerHTML = renderSidebar();
// re-initialize both sidebars
setupRotatingSidebar('.sidebar-collapsed');
setupRotatingSidebar('.sidebar-expanded');


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

function setActiveCam(clickedCam) {
    const cams = document.querySelectorAll('.live-cams-track img');
    cams.forEach((cam) => {
        cam.src = cam.dataset.default;
    });
    clickedCam.src = clickedCam.dataset.active;
}


// sidebar 
async function fetchSidebarPetData() {
  try {
    const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/cameras');
    if (!response.ok) {
      throw new Error('Network error.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
      throw new Error('Error fetching camera data:', error);
      return { data: [] };
  }
}

function renderSidebarItem(pet) {
    const id = pet.petId;
    const fallback = "../../assets/icons/sidebar/1/1-sidebar.svg"
    const fallbackActive = "../../assets/icons/sidebar/1/1-sidebar-active.svg"
    const imgSrc = `../../assets/icons/sidebar/${id}/${id}-sidebar.svg`;
    const imgSrcActive = `../../assets/icons/sidebar/${id}/${id}-sidebar-active.svg`;
    
    if (id >= 9) {
        return `
            <div class="sidebar-item" data-pet="${id}">
                <img src="${fallback}" alt="Pet white icon" class="default">
                <img src="${fallbackActive}" alt="Pet white icon" class="default-active">
            </div>
        `
    } else {
        return `
            <div class="sidebar-item" data-pet="${id}">
                <img src="${imgSrc}" alt="Pet white icon" class="default">
                <img src="${imgSrcActive}" alt="Pet white icon" class="default-active">
            </div>
        `
    }
}

function renderExpandedSidebarItem(pet) {
    const id = pet.petId;
    const fallback = "../../assets/icons/sidebar/1/1-sidebar-exp.svg"
    const fallbackActive = "../../assets/icons/sidebar/1/1-sidebar-exp-active.svg"
    const imgSrc = `../../assets/icons/sidebar/${id}/${id}-sidebar-exp.svg`;
    const imgSrcActive = `../../assets/icons/sidebar/${id}/${id}-sidebar-exp-active.svg`;

    if (id >= 9) {
        return `
        <div class="sidebar-item" data-pet="${id}">
            <img src="${fallback}" alt="Pet white icon" class="default">
            <img src="${fallbackActive}" alt="Pet white icon" class="active">
            <div class="sidebar-item-text text">
                ${pet.text} 
            </div>
        </div>
    `
    }
    return `
        <div class="sidebar-item" data-pet="${id}">
            <img src="${imgSrc}" alt="Pet white icon" class="default">
            <img src="${imgSrcActive}" alt="Pet white icon" class="active">
            <div class="sidebar-item-text text">
                ${pet.text} 
            </div>
        </div>
    `
}

function setupSidebarListener(sidebar, data) {
    sidebar.addEventListener('click', async (e) => {
        const petItem = e.target.closest('.sidebar-item');
        const items = sidebar.querySelectorAll('.sidebar-item');

        if (petItem) {
            const petId = petItem.dataset.pet;
            renderZoosPage(data, petId, true);

            items.forEach(item => {
                if (item.dataset.pet === petId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // render quick-donate 
            const quickDonate = document.getElementById('quick-donate');
            quickDonate.innerHTML = renderQuickDonateSection(petId);
            // donation popup
            const popup = document.getElementById('donationPopup');
            popup.innerHTML = renderDonationPopup();
            setupDonationPopup();

            // render did-you-know 
            const didYouKnow = document.getElementById('did-you-know');
            didYouKnow.innerHTML = Loader(); 
            try {
                const pet = await fetchPetById(petId);
                didYouKnow.innerHTML = renderDidYouKnowSection(pet);

            } catch (error) {
                didYouKnow.innerHTML = '';
                didYouKnow.insertAdjacentHTML(
                    'beforeend', 
                    '<div class="load-error">Something went wrong. Please, refresh the page</div>'
                );

                didYouKnow.style.height = '1508px';
                const loadError = document.querySelector('.load-error');
                loadError.style = 'margin-top: 500px;'; 
                console.error('Failed to load pet data:', error);
            }
        }
    });
}

function setupSyncListenerForSidebar() {
    let sidebarOpen = false;
    const sidebarArrows = document.querySelectorAll('.double-arrow-container');
    const sidebarCollapsed = document.querySelector('.sidebar-collapsed');
    const sidebarExpanded = document.querySelector('.sidebar-expanded');
    // Sync collapsed -> expanded when opening
    sidebarArrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const collapsedTrack = sidebarCollapsed.querySelector('.sidebar-track');
            const expandedTrack = sidebarExpanded.querySelector('.sidebar-track');
            if (!sidebarOpen) {
                const collapsedFirstPet = collapsedTrack.firstElementChild.dataset.pet;
                // Rotate expanded until first item matches collapsed
                while (expandedTrack.firstElementChild.dataset.pet !== collapsedFirstPet) {
                    expandedTrack.appendChild(expandedTrack.firstElementChild);
                }
                sidebarCollapsed.style.display = 'none';
                sidebarExpanded.style.display = 'flex';
            }
            else {
                const expandedFirstPet = expandedTrack.firstElementChild.dataset.pet;
                // Rotate expanded until first item matches collapsed
                while (collapsedTrack.firstElementChild.dataset.pet !== expandedFirstPet) {
                    collapsedTrack.appendChild(collapsedTrack.firstElementChild);
                }
                // Collapsing sidebar
                sidebarCollapsed.style.display = 'flex';
                sidebarExpanded.style.display = 'none';
            }
            sidebarOpen = !sidebarOpen;
        });
    });
    
}

function setupActiveSidebarIcon(petId) {
    const items = document.querySelectorAll(`.sidebar-item[data-pet="${petId}"]`);
    items.forEach(item => item.classList.add('active'));
}

function handleScreenChange(e) {
    const items = document.querySelectorAll('.sidebar-item');
    items.forEach(item => {
        if (e.matches) {
            item.classList.add('small');   // 1420px and below
        } else {
            item.classList.remove('small'); // above 1420px
        }
    });
}


// live cams
const camData = {
  "1": {
    name: 'panda',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s'
  },
  "5": {
    name: 'eagle',
    link: 'https://www.youtube.com/watch?v=dUE_AMCliSU'
  },
  "3": {
    name: 'gorilla',
    link: 'https://www.youtube.com/watch?v=SOVaFcSATEc&pp=ygUcZ29yaWxsYXMgbmF0aW9uYWwgZ2VvZ3JhcGhpYw%3D%3D'
  },
  "2": {
    name: 'lemur',
    link: 'https://www.youtube.com/watch?v=fW1ZQF1N6JE&pp=ygUZbGVtdXIgbmF0aW9uYWwgZ2VvZ3JhcGhpYw%3D%3D'
  },
  "4": {
    name: 'alligator', 
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "6": {
    name: 'australian koala',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "7": {
    name: 'african lion', 
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  }, 
  "8": {
    name: 'sumatran tiger', 
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  }, 
  "9": {
    name: 'red panda',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "10": {
    name: 'mountain gorilla',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "11": {
    name: 'african elephant',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "12": {
    name: 'sea otter',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "13": {
    name: 'bengal tiger',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "14": {
    name: 'gray wolf',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "15": {
    name: 'fennec fox',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "16": {
    name: 'grizzly bear',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "17": {
    name: 'bottlenose dolphin', 
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "18": {
    name: 'snow leopard',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "19": {
    name: 'polar bear',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "20": {
    name: 'jaguar',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "21": {
    name: 'ring-tailed lemur',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "22": {
    name: 'white Rhinoceros',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "23": {
    name: 'arctic fox',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "24": {
    name: 'saltwater crocodile',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "25": {
    name: 'scarlet macaw',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "26": {
    name: 'komodo dragon',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "27": {
    name: 'sloth',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  },
  "28": {
    name: 'cheetah',
    link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
  }
};

function renderLiveCamsHeader(petId) {
    const cam = camData[petId];
    return `
        <div class="live-cams-top">
            <div class="h2-heading">Live ${cam.name} cams</div>
            <button class="donate-now-btn btn-text">
                Donate now
                <div class="arrow-container">
                    <div class="arrow-line"></div>
                    <div class="arrow-right"></div>
                </div>
            </button>
        </div>
        <div class="loader-hook"></div>
    `
}

function renderPet(petId, isActive = false) {
    const imgs = {
        'main': `../../assets/icons/live-cams/${petId}/${petId}-youtube-main.svg`,
        'default': [
            `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-1.svg`,
            `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-2.svg`,
            `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-3.svg`,
        ],
        'active': [
            `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-1-active.svg`,
            `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-2-active.svg`,
            `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-3-active.svg`
        ],
        'fallback': {
            'main': `../../assets/icons/live-cams/1/1-youtube-main.svg`,
            'default': [
                `../../assets/icons/live-cams/1/1-youtube-cam-1.svg`,
                `../../assets/icons/live-cams/1/1-youtube-cam-2.svg`,
                `../../assets/icons/live-cams/1/1-youtube-cam-3.svg`,
            ],
            'active': [
                `../../assets/icons/live-cams/1/1-youtube-cam-1-active.svg`,
                `../../assets/icons/live-cams/1/1-youtube-cam-2-active.svg`,
                `../../assets/icons/live-cams/1/1-youtube-cam-3-active.svg`
            ],
        }
    };

    const cam = camData[petId];
    return `
        <div class="live-cams-mid">
            <a href=${cam.link} target="_blank" rel="noopener noreferrer">
                <img 
                    src=${imgs.main} 
                    alt="Youtube ${cam.name} image"
                    onerror="this.src='${imgs.fallback.main}'"
                >
            </a>
        </div>
        <div class="live-cams-bott">
            <div class="live-cams-bott-txt">More live views</div>
            <div class="live-cams-carousel">
                <img 
                    src="../../assets/icons/live-cams-left-arrow.svg" 
                    alt="Left arrow icon"
                    class="live-cams-arrow left"
                >
                <div class="live-cams-viewport">
                    <div class="live-cams-track">
                        <a href=${cam.link} target="_blank" rel="noopener noreferrer">
                            <img 
                                src="${imgs.default[0]}"
                                data-default="${imgs.default[0]}"
                                data-active="${imgs.active[0]}"
                                data-id="${petId}"
                                alt="Youtube preview of ${cam.name}"
                                onerror="this.src='${isActive ? imgs.fallback.active[0] : imgs.fallback.default[0]}'"
                            >
                        </a>
                        <a href=${cam.link} target="_blank" rel="noopener noreferrer">
                            <img 
                                src="${imgs.default[1]}"
                                data-default="${imgs.default[1]}"
                                data-active="${imgs.active[1]}"
                                data-id="${petId}"
                                alt="Youtube preview of ${cam.name}"
                                onerror="this.src='${isActive ? imgs.fallback.active[1] : imgs.fallback.default[1]}'"
                            >
                        </a>
                        <a href=${cam.link} target="_blank" rel="noopener noreferrer">
                            <img 
                                src="${imgs.default[2]}"
                                data-default="${imgs.default[2]}"
                                data-active="${imgs.active[2]}"
                                data-id="${petId}"
                                alt="Youtube preview of ${cam.name}"
                                onerror="this.src='${isActive ? imgs.fallback.active[2] : imgs.fallback.default[2]}'"
                            >
                        </a>
                    </div>
                </div>
                <img 
                    src="../../assets/icons/live-cams-right-arrow.svg" 
                    alt="Right arrow icon"
                    class="live-cams-arrow right"
                >
            </div> 
        </div>
    `;
}

// function renderPet(petId) {
//     const imgs = {
//         'main': `../../assets/icons/live-cams/${petId}/${petId}-youtube-main.svg`,
//         'default': [
//             `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-1.svg`,
//             `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-2.svg`,
//             `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-3.svg`,
//         ],
//         'active': [
//             `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-1-active.svg`,
//             `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-2-active.svg`,
//             `../../assets/icons/live-cams/${petId}/${petId}-youtube-cam-3-active.svg`
//         ],
//         'fallback': {
//             'main': `../../assets/icons/live-cams/1/1-youtube-main.svg`,
//             'default': [
//                 `../../assets/icons/live-cams/1/1-youtube-cam-1.svg`,
//                 `../../assets/icons/live-cams/1/1-youtube-cam-2.svg`,
//                 `../../assets/icons/live-cams/1/1-youtube-cam-3.svg`,
//             ],
//             'active': [
//                 `../../assets/icons/live-cams/1/1-youtube-cam-1-active.svg`,
//                 `../../assets/icons/live-cams/1/1-youtube-cam-2-active.svg`,
//                 `../../assets/icons/live-cams/1/1-youtube-cam-3-active.svg`
//             ],
//         }
//     };

//     const cam = camData[petId];
//     console.log("cam", cam);
//     return `
//         <div class="live-cams-content">
//             <section class="live-cams">
//             <div class="live-cams-top">
//                 <div class="h2-heading">Live ${cam.name} cams</div>
//                 <button class="donate-now-btn btn-text">
//                     Donate now
//                     <div class="arrow-container">
//                         <div class="arrow-line"></div>
//                         <div class="arrow-right"></div>
//                     </div>
//                 </button>
//             </div>
//             <div class="live-cams-mid">
//                 <a href=${cam.link} target="_blank" rel="noopener noreferrer">
//                     <img 
//                         src=${imgs.main} 
//                         alt="Youtube ${cam.name} image"
//                     >
//                 </a>
//             </div>
//             <div class="live-cams-bott">
//                 <div class="live-cams-bott-txt">More live views</div>
//                 <div class="live-cams-carousel">
//                     <img 
//                         src="../../assets/icons/live-cams-left-arrow.svg" 
//                         alt="Left arrow icon"
//                         class="live-cams-arrow left"
//                     >
//                     <div class="live-cams-viewport">
//                         <div class="live-cams-track">
//                             <a href=${cam.link} target="_blank" rel="noopener noreferrer">
//                                 <img 
//                                     src="${imgs.default[0]}"
//                                     data-default="${imgs.default[0]}"
//                                     data-active="${imgs.active[0]}"
//                                     data-id="${petId}"
//                                     alt="Youtube preview of ${cam.name}"
//                                 >
//                             </a>
//                             <a href=${cam.link} target="_blank" rel="noopener noreferrer">
//                                 <img 
//                                     src="${imgs.default[1]}"
//                                     data-default="${imgs.default[1]}"
//                                     data-active="${imgs.active[1]}"
//                                     data-id="${petId}"
//                                     alt="Youtube preview of ${cam.name}"
//                                 >
//                             </a>
//                             <a href=${cam.link} target="_blank" rel="noopener noreferrer">
//                                 <img 
//                                     src="${imgs.default[2]}"
//                                     data-default="${imgs.default[2]}"
//                                     data-active="${imgs.active[2]}"
//                                     data-id="${petId}"
//                                     alt="Youtube preview of ${cam.name}"
//                                 >
//                             </a>
//                             // <a href=${cam.link} target="_blank" rel="noopener noreferrer">
//                             //     <img 
//                             //         src="${pet.cams[1].src[0]}"
//                             //         data-default="${pet.cams[1].src[0]}"
//                             //         data-active="${pet.cams[1].src[1]}"
//                             //         data-id="${pet.id}"
//                             //         alt="Youtube preview of ${pet.id}"
//                             //     >
//                             // </a>
//                             // <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
//                             //     <img 
//                             //         src="${pet.cams[2].src[0]}"
//                             //         data-default="${pet.cams[2].src[0]}"
//                             //         data-active="${pet.cams[2].src[1]}"
//                             //         data-id="${pet.id}"
//                             //         alt="Youtube preview of ${pet.id}"
//                             //     >
//                             // </a>
//                             // <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
//                             //     <img 
//                             //         src="${pet.cams[3].src[0]}"
//                             //         data-default="${pet.cams[3].src[0]}"
//                             //         data-active="${pet.cams[3].src[1]}"
//                             //         data-id="${pet.id}"
//                             //         alt="Youtube preview of ${pet.id}"
//                             //     >
//                             // </a>
//                         </div>
//                     </div>
//                     <img 
//                         src="../../assets/icons/live-cams-right-arrow.svg" 
//                         alt="Right arrow icon"
//                         class="live-cams-arrow right"
//                     >
//                 </div> 
//             </div>
//             </section>
//         </div>
//     `;
// }

function renderZoosPage(data, petId, isActive = false) {
    const zooNav = document.getElementById('zoos');
    zooNav.classList.add('active');
    const liveCams = document.querySelector('.live-cams');
    const donate = document.getElementById('quick-donate');
    const didYouKnow = document.getElementById('did-you-know');

    try {
        data.forEach(pet => {
            if (String(pet.petId) === String(petId)) {  
            // render header 
            liveCams.innerHTML = renderLiveCamsHeader(pet.petId);   
            // render main live cam
            liveCams.insertAdjacentHTML('beforeend', renderPet(pet.petId, isActive));
            }
        });
    } catch (error) {
        console.error(error);
    }
    
}

function setupLiveCamsCarousel() {
    const track = document.querySelector('.live-cams-track');
    if (!track) return;

    const leftBtn = document.querySelector('.live-cams-arrow.left');
    const rightBtn = document.querySelector('.live-cams-arrow.right');

    // wait for images to load
    const firstImg = track.querySelector('img');
    firstImg.onload = () => {
        const style = getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;
        const itemWidth = firstImg.offsetWidth + gap; // full width per image

        let carouselIndex = 0;
        const maxIndex = track.childElementCount - 3; // adjust to viewport

        function showNext() {
            if (carouselIndex < maxIndex) {
                carouselIndex++;
                track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
            }
        }

        function showPrev() {
            if (carouselIndex > 0) {
                carouselIndex--;
                track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
            }
        }

        // replace buttons to remove previous listeners
        leftBtn.replaceWith(leftBtn.cloneNode(true));
        rightBtn.replaceWith(rightBtn.cloneNode(true));

        document.querySelector('.live-cams-arrow.left').addEventListener('click', showPrev);
        document.querySelector('.live-cams-arrow.right').addEventListener('click', showNext);
    };
}

// did-you-know
async function fetchPetById(petId) {
  try {
    const response = await fetch(`https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${petId}`);
    if (!response.ok) {
      throw new Error('Network error.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
      throw new Error('Error fetching pet data:', error);
      return { data: [] };
  }
}

document.addEventListener('DOMContentLoaded', async () => {
    const liveCams = document.querySelector('.live-cams');
    const sidebarCol = document.querySelector('.sidebar-collapsed .sidebar-track');
    const sidebarExp = document.querySelector('.sidebar-expanded .sidebar-track');
    
    // if redirected from another page
    const storedPetId = localStorage.getItem('selectedPetId') || '1';
    liveCams.innerHTML = renderLiveCamsHeader(storedPetId); 
    const loaderHook = document.querySelector('.loader-hook');
    loaderHook.innerHTML = Loader();
    // quick-donate 
    const donate = document.getElementById('quick-donate');
    donate.innerHTML = renderQuickDonateSection(storedPetId);
    const popup = document.getElementById('donationPopup');
    popup.innerHTML = renderDonationPopup();
    setupDonationPopup();
    

    // did-you-know 
    const didYouKnow = document.getElementById('did-you-know');
    // inject map modal once
    document.body.insertAdjacentHTML('beforeend', renderMapModal());
    setupMapModal();
    
    try {
        const [data, pet] = await Promise.all([
            fetchSidebarPetData(),
            fetchPetById(storedPetId)
        ]);
        const collapsedHTML = data.data.map(pet => renderSidebarItem(pet)).join('');
        const expandedHTML = data.data.map(pet => renderExpandedSidebarItem(pet)).join('');
        sidebarCol.innerHTML = collapsedHTML;
        sidebarExp.innerHTML = expandedHTML; 
        setupSidebarListener(sidebar, data.data); 
        setupSyncListenerForSidebar(); 

        // render zoo page
        renderZoosPage(data.data, storedPetId);
        // render did-you-know
        didYouKnow.innerHTML = renderDidYouKnowSection(pet);
        setupActiveSidebarIcon(storedPetId);
        localStorage.removeItem('selectedPetId');

    } catch (error) {
        liveCams.insertAdjacentHTML(
            'beforeend', 
            '<div class="load-error">Something went wrong. Please, refresh the page</div>'
        );
        const loadErr = document.querySelector('.load-error');
        loadErr.style = 'margin-top: 10%'; 
        loaderHook.innerHTML = '';
        console.error(error);
    }
    

//     // listener for live cams 
//     const cams = document.querySelectorAll('.live-cams-track img');
//     cams.forEach((cam) => {
//         cam.addEventListener('click', () => {
//             setActiveCam(cam);
//         });
//     });


//     const burger = document.querySelector('.hamburger-icon');
//     const burgerMenu = document.querySelector('.burger-menu');
//     const burgerCloseBtn = document.querySelector('.burger-close-btn');

//     burger.addEventListener('click', () => {
//     burgerMenu.classList.add('burger');
//     burgerCloseBtn.classList.add('active');
//     });

//     burgerCloseBtn.addEventListener('click', () => {
//     burgerMenu.classList.remove('burger');
//     burgerCloseBtn.classList.remove('active');
//     });

});


// map modal (did-you-know)
// parse "18.7669° S" → -18.7669, "46.8691° E" → 46.8691
function parseCoordinate(coordStr) {
    const match = coordStr.match(/([\d.]+)°?\s*([NSEW])/i);
    if (!match) return 0;
    let value = parseFloat(match[1]);
    const dir = match[2].toUpperCase();
    if (dir === 'S' || dir === 'W') value = -value;
    return value;
}

let leafletMap = null;

function openMapModal(lat, lng, petName) {
    const overlay = document.getElementById('mapModalOverlay');
    overlay.classList.add('active');

    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
    }

    // wait for the overlay to be visible and painted before init
        leafletMap = L.map('mmap').setView([lat, lng], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(leafletMap);
        L.marker([lat, lng]).addTo(leafletMap)
            .bindPopup(petName)
            .openPopup();
        
        // force Leaflet to recalculate container size
        leafletMap.invalidateSize();
}

function closeMapModal() {
    const overlay = document.getElementById('mapModalOverlay');
    overlay.classList.remove('active');
    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
    }
}

function setupMapModal() {
    const overlay = document.getElementById('mapModalOverlay');
    const closeBtn = document.getElementById('mapModalClose');

    closeBtn.addEventListener('click', closeMapModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMapModal();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeMapModal();
    });
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-map-btn');
    if (btn) {
        const lat = parseCoordinate(btn.dataset.lat);
        const lng = parseCoordinate(btn.dataset.lng);
        const name = btn.dataset.name;
        openMapModal(lat, lng, name);
    }
});
   