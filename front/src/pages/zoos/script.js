import { socket } from '../../socket.js';
import { renderHeader } from '../../components/header/header.js';
import { renderFooter } from '../../components/footer/footer.js';
import { switchChatRoom } from '../../components/chat/main.js'
import { renderSidebar } from '../../components/sidebar/sidebar.js';
import { Loader } from '../../components/loader/loader.js';
import { renderDidYouKnowSection } from '../../components/did-you-know/did-you-know.js';
import { renderQuickDonateSection } from '../../components/quick-donate/quick-donate.js';
import { renderMapModal } from '../../components/map-modal/mapModal.js';
import { renderDonationPopup, setupDonationPopup } from '../../components/donation-popup/donationPopup.js';

const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo';

const header = document.getElementById('header');
header.innerHTML = renderHeader();
const footer = document.getElementById('footer');
footer.innerHTML = renderFooter();
const sidebar = document.getElementById('sidebar');
sidebar.innerHTML = renderSidebar();

window.addEventListener('scroll', () => {
  const headerBottom = header.getBoundingClientRect().bottom;

  if (headerBottom <= 0) {
    sidebar.style.top = '0px';
    sidebar.style.height = '100vh';
  } else {
    sidebar.style.top = `${headerBottom}px`;
    sidebar.style.height = `calc(100vh - ${headerBottom}px)`;
  }
});

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

// sidebar 
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

async function fetchSidebarPetData() {
  try {
    const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/cameras');
    if (!response.ok) {
      throw new Error('Network error.');
    }
    const petData = await response.json();
    return petData;
  } catch (error) {
      throw new Error('Error fetching camera data:', error);
      return { petData: [] };
  }
}

function renderSidebarItem(pet) {
    const id = pet.petId;
    const fallback = "../../assets/icons/sidebar/1/1-sidebar.svg"
    const fallbackActive = "../../assets/icons/sidebar/1/1-sidebar-active.svg"
    const imgSrc = `../../assets/icons/sidebar/${id}/${id}-sidebar.svg`;
    const imgSrcActive = `../../assets/icons/sidebar/${id}/${id}-sidebar-active.svg`;
    
    return `
        <div 
            class="sidebar-item" 
            data-pet="${id}" 
            data-pet-name="${camData[id]?.name ?? 'pet'}"
        >
            <img 
                src="${imgSrc}" 
                onerror="this.src='${fallback}'"
                alt="Pet white icon" class="default"
            >
            <img 
                src="${imgSrcActive}" 
                onerror="this.src='${fallbackActive}'"
                alt="Pet white icon" 
                class="default-active" 
            >
            <div class="sidebar-item-tooltip">
                ${camData[id]?.name ?? 'pet'}
            </div>
        </div>
    `
}

function renderExpandedSidebarItem(pet) {
    const id = pet.petId;
    const fallback = "../../assets/icons/sidebar/1/1-sidebar-exp.svg"
    const fallbackActive = "../../assets/icons/sidebar/1/1-sidebar-exp-active.svg"
    const imgSrc = `../../assets/icons/sidebar/${id}/${id}-sidebar-exp.svg`;
    const imgSrcActive = `../../assets/icons/sidebar/${id}/${id}-sidebar-exp-active.svg`;

    return `
        <div 
            class="sidebar-item" 
            data-pet="${id}"
            data-pet-name="${camData[id]?.name ?? 'pet'}"
        >
            <img 
                src="${imgSrc}" 
                onerror="this.src='${fallback}'"
                alt="Pet white icon" class="default"
            >
            <img 
                src="${imgSrcActive}" 
                onerror="this.src='${fallbackActive}'"
                alt="Pet white icon" class="active"
            >
            <div class="sidebar-item-tooltip">
                ${camData[id]?.name ?? 'pet'}
            </div>
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
            if (currPetId && currPetId !== petId) {
                socket.emit('leave_view', currPetId);
            }
            const petName = camData[petId]?.name ?? 'pet';
            currPetId = petId;
            switchChatRoom(petId, petName);
            socket.emit('join_view', petId); 

            renderZoosPage(data, petId, true);
            items.forEach(item => {
                if (item.dataset.pet === petId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            setupLiveCamsCarousel();

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
    links: [
      'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s',
      'https://www.youtube.com/watch?v=YdP2fFyjBWQ',
      'https://www.youtube.com/watch?v=V1EhowMXAn8',
      'https://www.youtube.com/watch?v=k-7_sWrR1rk'
    ]
  },
  "5": {
    name: 'eagle',
    links: [
        'https://www.youtube.com/watch?v=dUE_AMCliSU',
        'https://www.youtube.com/watch?v=eN4Qy5RRpsc',
        'https://www.youtube.com/watch?v=uTDcLtvAyoA',
        'https://www.youtube.com/watch?v=Mft1_T87ytk',
    ]
  },
  "3": {
    name: 'gorilla',
    links: [
        'https://www.youtube.com/watch?v=SOVaFcSATEc',
        'https://www.youtube.com/watch?v=T2EJNAph7q8',
        'https://www.youtube.com/watch?v=_X57lHbQP6k',
        'https://www.youtube.com/watch?v=ODyB9i6bGwQ',
    ]
  },
  "2": {
    name: 'lemur',
    links: [
        'https://www.youtube.com/watch?v=fW1ZQF1N6JE',
        'https://www.youtube.com/watch?v=jcjDrE1ye-E&t=12s', 
        'https://www.youtube.com/watch?v=UjSiq53nJBo', 
        'https://www.youtube.com/watch?v=fHCQ5-1n07M'
    ]
  },
  "4": {
    name: 'alligator', 
    links: [
        'https://www.youtube.com/watch?v=HPrPtCns5Lc',
        'https://www.youtube.com/watch?v=boQgZGj9Umg', 
        'https://www.youtube.com/watch?v=rxHABWblJ-U', 
        'https://www.youtube.com/watch?v=npi99Y-MkN0'
    ]
  },
  "6": {
    name: 'australian koala',
    links: [
        'https://www.youtube.com/watch?v=Th21rWOrERg',
        'https://www.youtube.com/watch?v=jQH50vKSv2o', 
        'https://www.youtube.com/watch?v=8D0fTIngsXg', 
        'https://www.youtube.com/watch?v=CMwAgft_kZ8'
    ]
  },
  "7": {
    name: 'african lion', 
    links: [
        'https://www.youtube.com/watch?v=iXMg1Da2-Yw',
        'https://www.youtube.com/watch?v=tlZwYsJpqjo',
        'https://www.youtube.com/watch?v=C72eOjRzkoM',
        'https://www.youtube.com/watch?v=8-6YqxYAkd0'
    ]
  }, 
  "8": {
    name: 'sumatran tiger', 
    links: [
        'https://www.youtube.com/watch?v=FK3dav4bA4s',
        'https://www.youtube.com/watch?v=Rt-5fQWvyDw',
        'https://www.youtube.com/watch?v=qhrT0v7QSvc',
        'https://www.youtube.com/watch?v=hVOHKWnflTY'
    ]
  }, 
  "9": {
    name: 'red panda',
    links: [
        'https://www.youtube.com/watch?v=ZipGq3So7PY',
        'https://www.youtube.com/watch?v=AhA0q98CXIw',
        'https://www.youtube.com/watch?v=8wGOyIS9BX8',
        'https://www.youtube.com/watch?v=L2_d5aCZN3w'
    ]
  },
  "10": {
    name: 'mountain gorilla',
    links: [
        'https://www.youtube.com/watch?v=CWnk6PTsZNo',
        'https://www.youtube.com/watch?v=ODyB9i6bGwQ&t=7s',
        'https://www.youtube.com/watch?v=zut9g6z7KIc',
        'https://www.youtube.com/watch?v=CWnk6PTsZNo&t=8s'
    ]
  },
  "11": {
    name: 'african elephant',
    links: [
        'https://www.youtube.com/watch?v=xV_O_d6wN_8',
        'https://www.youtube.com/watch?v=qOXeIip16No',
        'https://www.youtube.com/watch?v=FwOoC0QdeG4',
        'https://www.youtube.com/watch?v=Fk3VdpuFx0Q'
    ]
  },
  "12": {
    name: 'sea otter',
    links: [
        'https://www.youtube.com/watch?v=YL1xobrY1I8',
        'https://www.youtube.com/watch?v=YL1xobrY1I8&t=8s',
        'https://www.youtube.com/watch?v=FukcZF9ARy8',
        'https://www.youtube.com/watch?v=SIWbjgPYcJY'
    ]
  },
  "13": {
    name: 'bengal tiger',
    links: [
        'https://www.youtube.com/watch?v=AGmiksi01BA',
        'https://www.youtube.com/watch?v=ja4GNdU2vYc',
        'https://www.youtube.com/watch?v=t0FN7P_tWZ8',
        'https://www.youtube.com/watch?v=KIm2NK9_sQk'
    ]
  },
  "14": {
    name: 'gray wolf',
    links: [
        'https://www.youtube.com/watch?v=cATlsFzHigI',
        'https://www.youtube.com/watch?v=YXMo5w9aMNs',
        'https://www.youtube.com/watch?v=pgUIm6NVwh4',
        'https://www.youtube.com/watch?v=FoFbY9vkg4Q'
    ]
  },
  "15": {
    name: 'fennec fox',
    links: [
        'https://www.youtube.com/watch?v=7yu2gvILYyA',
        'https://www.youtube.com/watch?v=S9atRW1DgbQ',
        'https://www.youtube.com/watch?v=9-PaIwxjnr8',
        'https://www.youtube.com/watch?v=1IGw4UZcFkM'
    ],
  },
  "16": {
    name: 'grizzly bear',
    links: [
        'https://www.youtube.com/watch?v=GeF25GJleA8',
        'https://www.youtube.com/watch?v=DGLU6Rz1TDA',
        'https://www.youtube.com/watch?v=MTcbqzYIqpk',
        'https://www.youtube.com/watch?v=TSSPDwAQLXs'
    ],
  },
  "17": {
    name: 'bottlenose dolphin', 
    links: [
        'https://www.youtube.com/watch?v=7d5nLGzG8YU',
        'https://www.youtube.com/watch?v=_bnur3gHJ0s&t=170s',
        'https://www.youtube.com/watch?v=g7PaWeHCPHg',
        'https://www.youtube.com/watch?v=CF3VzOw6hFs'
    ],
  },
  "18": {
    name: 'snow leopard',
    links: [
        'https://www.youtube.com/watch?v=JTlveCrymV8',
        'https://www.youtube.com/watch?v=JTlveCrymV8&t=28s',
        'https://www.youtube.com/watch?v=2i4ruVTyMU4',
        'https://www.youtube.com/watch?v=O4VQG82Gvp8'
    ]
  },
  "19": {
    name: 'polar bear',
    links: [
        'https://www.youtube.com/watch?v=1zRGzlWqce4',
        'https://www.youtube.com/watch?v=64ZaC04ppLQ',
        'https://www.youtube.com/watch?v=D6_e6yKH26Q',
        'https://www.youtube.com/watch?v=COk0Sbbc_co'
    ]
  },
  "20": {
    name: 'jaguar',
    links: [
        'https://www.youtube.com/watch?v=fQ8ug4QJw74',
        'https://www.youtube.com/watch?v=fQ8ug4QJw74&t=18s',
        'https://www.youtube.com/watch?v=DfskHraT2g0',
        'https://www.youtube.com/watch?v=rb9Bby_H9Sg'
    ]
  },
  "21": {
    name: 'ring-tailed lemur',
    links: [
        'https://www.youtube.com/watch?v=jcjDrE1ye-E',
        'https://www.youtube.com/watch?v=UjSiq53nJBo&t=15s',
        'https://www.youtube.com/watch?v=rjPBMXGkhnA',
        'https://www.youtube.com/watch?v=We5EHfpl7gk'
    ]
  },
  "22": {
    name: 'white Rhinoceros',
    links: [
        'https://www.youtube.com/watch?v=uul3KOb0g0o',
        'https://www.youtube.com/watch?v=yA6gHs6KkwU',
        'https://www.youtube.com/watch?v=uul3KOb0g0o&t=13s',
        'https://www.youtube.com/watch?v=NOgl1nW0NtA'
    ]
  },
  "23": {
    name: 'arctic fox',
    links: [
        'https://www.youtube.com/watch?v=OdTvYMlRO9g',
        'https://www.youtube.com/watch?v=k2kiyWu_XNc',
        'https://www.youtube.com/watch?v=aSQiLm54gUs',
        'https://www.youtube.com/watch?v=C7mxTEskjQg'
    ]
  },
  "24": {
    name: 'saltwater crocodile',
    links: [
        'https://www.youtube.com/watch?v=_bVZeOt7bCw',
        'https://www.youtube.com/watch?v=npi99Y-MkN0',
        'https://www.youtube.com/watch?v=5WIdIs3A9Ok',
        'https://www.youtube.com/watch?v=y9Lb49JOVWY'
    ]
  },
  "25": {
    name: 'scarlet macaw',
    links: [
        'https://www.youtube.com/watch?v=kAD07bEsil8',
        'https://www.youtube.com/watch?v=GN9AHGOyQ1g&pp=ygUNc2NhcmxldCBtYWNhdw%3D%3D',
        'https://www.youtube.com/watch?v=CjxWflbweJM',
        'https://www.youtube.com/watch?v=OvU_Vj3UmCQ&t=43s'
    ]
  },
  "26": {
    name: 'komodo dragon',
    links: [
        'https://www.youtube.com/watch?v=28FzV5OHqMU',
        'https://www.youtube.com/watch?v=xZdMERr_L7I',
        'https://www.youtube.com/watch?v=1OSGNzrNXr8',
        'https://www.youtube.com/watch?v=bSvQ4ZYwJH8'
    ]
  },
  "27": {
    name: 'sloth',
    links: [
        'https://www.youtube.com/watch?v=DpV4k3Edr-I',
        'https://www.youtube.com/watch?v=BTRUqdH8IqQ',
        'https://www.youtube.com/watch?v=tMtMTwBIaeM',
        'https://www.youtube.com/watch?v=OTp8W251aiQ'
    ]
  },
  "28": {
    name: 'cheetah',
    links: [
        'https://www.youtube.com/watch?v=N7e_lDDojas',
        'https://www.youtube.com/watch?v=feg3tYeOOME',
        'https://www.youtube.com/watch?v=J20eXhZTHEo',
        'https://www.youtube.com/watch?v=rb9Bby_H9Sg&t=11s'
    ]
  }
};

function renderLiveCamsHeader(petId) {
    const cam = camData[petId];
    return `
        <div class="live-cams-top">
            <div class="h2-heading">Live ${cam.name} cams</div>
            <div class="live-cams-top-buttons">
                <div class="donate-btn-container">
                    <button class="donate-now-btn btn-text">
                        Donate now
                        <div class="arrow-container">
                            <div class="arrow-line"></div>
                            <div class="arrow-right"></div>
                        </div>
                    </button>
                    <div class="live-cams-tooltip">
                        Donate to your fave pet
                    </div>
                </div>
                <div class="chat-toggle-container">
                    <div class="chat-toggle">
                        Live chat
                        <div class="arrow-container">
                            <div class="arrow-line"></div>
                            <div class="arrow-right"></div>
                        </div>
                    </div>
                    <div class="chat-toggle-tooltip">
                        Open live chat
                    </div>
                </div>
            </div>
        </div>
        <div class="loader-hook"></div>
    `
}

function renderIFrame(videoId, width, height, isPreview = false, isActive = false) {
    const preview = `
        <div 
            class="preview-video" 
            data-src="https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1"
            ${isActive ? `style="border: 4px solid #F58021; border-radius: 13px;"` : ''}
        >
    `;
    return  `
        ${isPreview ? preview : ''}
            <iframe
                width="${width}"
                height="${height}"
                src="https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&rel=0&playsinline=1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        ${isPreview ? '</div>' : ''}
    `
}

function renderPet(petId, isActive = false) {
    const cam = camData[petId];
    const videoId = new URL(cam.links[0]).searchParams.get('v');

    return `
        <div class="live-cams-mid">
            ${renderIFrame(videoId, '100%', '768px')}
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
                        ${cam.links.map((link, index) => {
                            const vidId = new URL(link).searchParams.get('v');
                            return (index === 0 
                                ? renderIFrame(vidId, '300px', '200px', true, true)
                                : renderIFrame(vidId, '300px', '200px', true, false)
                        )}).join('')}
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
    const mainVideo = document.querySelector('.live-cams-mid iframe');

    let carouselIndex = 0;

    function initCarousel() {
        const firstVid = track.querySelector('.preview-video');
        if (!firstVid) return;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const itemWidth = firstVid.getBoundingClientRect().width + gap;

        const visibleItems = 3;
        const maxIndex = Math.max(0, track.children.length - visibleItems);

        function updatePosition() {
            track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
        }

        function showNext() {
            if (carouselIndex < maxIndex) {
                carouselIndex++;
                updatePosition();
            }
        }

        function showPrev() {
            if (carouselIndex > 0) {
                carouselIndex--;
                updatePosition();
            }
        }

        leftBtn.onclick = showPrev;
        rightBtn.onclick = showNext;

        track.addEventListener('click', (e) => {
            const preview = e.target.closest('.preview-video');
            if (!preview) return;
             // highlight selected preview
            const previews = track.querySelectorAll('.preview-video');
            previews.forEach(p => {
                p.style.border = 'none';
                p.style.borderRadius = '0';
            });
            preview.style.border = '4px solid #F58021';
            preview.style.borderRadius = '13px';
            mainVideo.src = preview.dataset.src;
        });
    }

    requestAnimationFrame(initCarousel);
}

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
        setupLiveCamsCarousel();
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
   
// chat 
// init chat viewer count
let currPetId = '1';
socket.emit('join_view', currPetId);

document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.chat-toggle');
    if (!toggle) return; 
    const chat = document.getElementById('chat-root');
    if (!chat.classList.contains('active')) {
        chat.classList.add('active');
    }
});     