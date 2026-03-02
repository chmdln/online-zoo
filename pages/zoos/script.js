import { renderHeader } from '../../components/header/header.js';
import { renderFooter } from '../../components/footer/footer.js';
import { renderSidebar } from '../../components/sidebar/sidebar.js';
import { renderQuickDonateSection } from '../../components/quick-donate/quick-donate.js';
import { renderDidYouKnowSection } from '../../components/did-you-know/did-you-know.js';

export const zooData = [
    {
        id: 'panda', 
        header: 'Live panda cams',
        cams: [
            {
                id: 'cam-main',
                src: '../../assets/icons/panda-youtube-main.svg',
                link: 'https://www.youtube.com/watch?v=dqT-UlYlg1s&t=79s'
            },
            {
                id: 'cam-1',
                src: ['../../assets/icons/panda-youtube-cam-1.svg', '../../assets/icons/panda-youtube-cam-1-active.svg']
            },
            {
                id: 'cam-2',
                src: ['../../assets/icons/panda-youtube-cam-2.svg', '../../assets/icons/panda-youtube-cam-2-active.svg']
            },
            {
                id: 'cam-3',
                src: ['../../assets/icons/panda-youtube-cam-3.svg', '../../assets/icons/panda-youtube-cam-3-active.svg']
            },
        ],
        donate: {
            header: 'make the Bamboo Donation!',
            subheader: 'Our process for bamboo donations first starts with a site evaluation. It is important that our team sees where the bamboo is growing, then determining if the bamboo is a species that our animals are currently eating. Thank you for your interest in donating bamboo for our pandas.' 
        }, 
        didYouKnow: {
            header: 'Pandas are often seen eating in a relaxed sitting posture, with their hind legs stretched out before them. They may appear sedentary, but they are skilled tree-climbers and efficient swimmers.', 
            facts: {
                commonName: 'Giant Panda', 
                sciName: 'Ailuropoda melanoleuca',
                type: 'Herbivore',
                size: '4 to 5 feet',
                diet: 'Omnivore',
                habitat: 'Forests',
                range: 'Eastern Asia',
            },
            img: '../../assets/icons/panda-did-you-know.svg',
            info: 'Giant pandas are very unusual animals that eat almost exclusively bamboo, which is very low in nutrients. Because of this, they have many unique adaptations for their low-energy lifestyle. Giant pandas are solitary. They have a highly developed sense of smell that males use to avoid each other and to find females for mating in the spring. After a five-month pregnancy, females give birth to a cub or two, though they cannot care for both twins. The blind infants weigh only 5 ounces at birth and cannot crawl until they reach three months of age. They are born white, and develop their much loved coloring later. Habitat loss is the primary threat to this species. Its popularity around the world has helped the giant panda become the focus of successful conservation programs.'
        }     
    }, 
    {
        id: 'eagle', 
        header: 'Bald eagle cams',
        cams: [
            {
                id: 'cam-main',
                src: '../../assets/icons/eagle-youtube-main.svg',
                link: 'https://www.youtube.com/watch?v=dUE_AMCliSU'
            },
            {
                id: 'cam-1',
                src: ['../../assets/icons/eagle-youtube-cam-1.svg', '../../assets/icons/eagle-youtube-cam-1-active.svg']
            },
            {
                id: 'cam-2',
                src: ['../../assets/icons/eagle-youtube-cam-2.svg', '../../assets/icons/eagle-youtube-cam-2-active.svg']
            },
            {
                id: 'cam-3',
                src: ['../../assets/icons/eagle-youtube-cam-3.svg', '../../assets/icons/eagle-youtube-cam-3-active.svg']
            },
        ], 
        donate: {
            header: 'Keep the Bald Eagle cams Streaming!',
            subheader: 'Watch as this lifelong pair of eagle parents lay and protect eggs, feed their chicks and teach them to hunt and fly. Sam & Lora have stolen the hearts of thousands of viewers! 100% of the donations from this page will be utilized directly for the streaming and operational costs of this project.'
        },
        didYouKnow: {
            header: 'Because of its role as a symbol of the US, but also because of its being a large predator, the bald eagle has many representations in popular culture. Not all of these representations are accurate. In particular, the movie or television bald eagle typically has a bold, powerful cry. The actual eagle has a much softer, chirpy voice, not in keeping with its popular image.', 
            facts: {
                commonName: 'Bald Eagle', 
                sciName: 'Haliaeetus Leucocephalus',
                type: 'Birds',
                size: 'Body: 34 to 43 inches; wingspan: 6 to 8 feet',
                diet: 'Carnivore',
                habitat: 'Seacoasts, rivers, large lakes or marshes ',
                range: 'Continental United States',
            },
            img: '../../assets/icons/eagle-did-you-know.svg',
            info: 'The bald eagle, with its snowy-feathered (not bald) head and white tail, is the proud national bird symbol of the United States—yet the bird was nearly wiped out there. For many decades, bald eagles were hunted for sport and for the "protection" of fishing grounds.  These powerful birds of prey use their talons to fish, but they get many of their meals by scavenging carrion or stealing the kills of other animals. They live near water and favor coasts and lakes where fish are plentiful, though they will also snare and eat small mammals. Bald eagles are believed to mate for life. A pair constructs an enormous stick nest—one of the bird-world"s biggest—high above the ground and tends to a pair of eggs each year. Immature eagles are dark, and until they are about five years old, they lack the distinctive white markings that make their parents so easy to identify.'
        }
    }, 
    {
        id: 'gorilla', 
        header: 'Gorillas cams',
        cams: [
            {
                id: 'cam-main',
                src: '../../assets/icons/gorilla-youtube-main.svg',
                link: 'https://www.youtube.com/watch?v=SOVaFcSATEc&pp=ygUcZ29yaWxsYXMgbmF0aW9uYWwgZ2VvZ3JhcGhpYw%3D%3D'
            },
            {
                id: 'cam-1',
                src: ['../../assets/icons/gorilla-youtube-cam-1.svg', '../../assets/icons/gorilla-youtube-cam-1-active.svg']
            },
            {
                id: 'cam-2',
                src: ['../../assets/icons/gorilla-youtube-cam-2.svg', '../../assets/icons/gorilla-youtube-cam-2-active.svg']
            },
            {
                id: 'cam-3',
                src: ['../../assets/icons/gorilla-youtube-cam-3.svg', '../../assets/icons/gorilla-youtube-cam-3-active.svg']
            },
        ], 
        donate: {
            header: 'Make a difference for the gorillas!',
            subheader: 'It is our goal to ensure the conservation and restoration of the gorilla population and their habitat in Central Africa. To do this, we need your help! Bring your food charity straight to Glen and his family.'
        },
        didYouKnow: {
            header: 'In addition to having distinctive fingerprints like humans do, gorillas also have unique nose prints. Gorillas are the largest of the great apes, but the western lowland gorilla is the smallest of the subspecies.', 
            facts: {
                commonName: 'Western lowland gorillas', 
                sciName: 'Gorilla gorilla gorilla',
                type: 'Mammals',
                size: 'Standing height, four to six feet',
                diet: 'Omnivore',
                habitat: 'Rainforests',
                range: 'Western Africa',
            },
            img: '../../assets/icons/gorilla-did-you-know.svg',
            info: 'Western lowland gorillas are the smallest of the four subspecies. They live in thick tropical rainforests, where they find plenty of food for their vegetarian diet. They eat roots, shoots, fruit, wild celery, and tree bark and pulp. Gorillas can climb trees, but they"re usually found on the ground in communities—known as troops. Troops are led by one dominant, older adult male, often called a silverback because of the swath of silver hair that adorns his otherwise dark fur. Troops also include several other young males, some females, and their offspring. The leader organizes troop activities, such as eating, nesting in leaves, and moving about the group"s home range. Gorillas prefer traveling on all fours, pushing themselves forward with their knuckles and soles of their feet. Female gorillas give birth to one infant after a pregnancy of nearly nine months. These infants ride on their mothers’ backs from the age of four months through the first two or three years of their lives.'
        }
    },
    {
        id: 'lemur', 
        header: 'Lemurs cams',
        cams: [
            {
                id: 'cam-main',
                src: '../../assets/icons/lemur-youtube-main.svg',
                link: 'https://www.youtube.com/watch?v=fW1ZQF1N6JE&pp=ygUZbGVtdXIgbmF0aW9uYWwgZ2VvZ3JhcGhpYw%3D%3D'
            },
            {
                id: 'cam-1',
                src: ['../../assets/icons/lemur-youtube-cam-1.svg', '../../assets/icons/lemur-youtube-cam-1-active.svg']
            },
            {
                id: 'cam-2',
                src: ['../../assets/icons/lemur-youtube-cam-2.svg', '../../assets/icons/lemur-youtube-cam-2-active.svg']
            },
            {
                id: 'cam-3',
                src: ['../../assets/icons/lemur-youtube-cam-3.svg', '../../assets/icons/lemur-youtube-cam-3-active.svg']
            },
        ], 
        donate: {
            header: 'Provide Andy the lemur with fruits!',
            subheader: 'More than 90% of lemur species are endangered and might face extinction in the nearest future. Watch the ring-tailed lemurs play and climb in this soothing setting and support them by donating for the fruits they adore.'
        },
        didYouKnow: {
            header: 'A ring-tailed lemur mob will gather in open areas of the forest to sunbathe. They sit in what some call a "yoga position" with their bellies toward the sun and their arms and legs stretched out to the sides.', 
            facts: {
                commonName: 'Ring-tailed Lemur',
                sciName: 'Lemur catta',
                type: 'Mammals',
                size: 'Head and body 17.75 inches;, tail: 21.75 inches',
                diet: 'Herbivore',
                habitat: 'Arid, open areas and forests',
                range: 'Southeast Asia'
            },
            img: '../../assets/icons/lemur-did-you-know.svg',
            info: 'Ring-tailed lemurs are named for the 13 alternating black and white bands that adorn their tails. Unlike most other lemurs, ringtails spend 40 percent of their time on the ground, moving quadrupedally along the forest floor. Ring-tailed lemurs live in southwestern Madagascar, in arid, open areas and forests in territories that range from 15 to 57 acres (0.06 to 0.2 square kilometers) in size. As with all lemurs, olfactory communication is important for ringtails. Ring-tailed lemurs have scent glands on their wrists and chests that they use to mark their foraging routes. Ringtails eat leaves, flowers and insects. They can also eat fruit, herbs and small vertebrates. Females usually give birth to their first baby when they are three years old, and usually once a year every year after that. All adult females participate in raising the offspring of the group. The median life expectancy for a ring-tailed lemur is about 16 years.'
        } 
    }
];

function renderPet(pet) {
    return `
        <div class="live-cams-content">
            <section class="live-cams">
            <div class="live-cams-top">
                <div class="h2-heading">${pet.header}</div>
                <button class="donate-now-btn btn-text">
                    Donate now
                    <div class="arrow-container">
                        <div class="arrow-line"></div>
                        <div class="arrow-right"></div>
                    </div>
                </button>
            </div>
            <div class="live-cams-mid">
                <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
                    <img src=${pet.cams[0].src} alt="Youtube ${pet.id} image">
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
                            <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="${pet.cams[1].src[0]}"
                                    data-default="${pet.cams[1].src[0]}"
                                    data-active="${pet.cams[1].src[1]}"
                                    data-id="${pet.id}"
                                    alt="Youtube preview of ${pet.id}"
                                >
                            </a>
                            <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="${pet.cams[2].src[0]}"
                                    data-default="${pet.cams[2].src[0]}"
                                    data-active="${pet.cams[2].src[1]}"
                                    data-id="${pet.id}"
                                    alt="Youtube preview of ${pet.id}"
                                >
                            </a>
                            <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="${pet.cams[3].src[0]}"
                                    data-default="${pet.cams[3].src[0]}"
                                    data-active="${pet.cams[3].src[1]}"
                                    data-id="${pet.id}"
                                    alt="Youtube preview of ${pet.id}"
                                >
                            </a>
                            <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="${pet.cams[1].src[0]}"
                                    data-default="${pet.cams[1].src[0]}"
                                    data-active="${pet.cams[1].src[1]}"
                                    data-id="${pet.id}"
                                    alt="Youtube preview of ${pet.id}"
                                >
                            </a>
                            <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="${pet.cams[2].src[0]}"
                                    data-default="${pet.cams[2].src[0]}"
                                    data-active="${pet.cams[2].src[1]}"
                                    data-id="${pet.id}"
                                    alt="Youtube preview of ${pet.id}"
                                >
                            </a>
                            <a href=${pet.cams[0].link} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="${pet.cams[3].src[0]}"
                                    data-default="${pet.cams[3].src[0]}"
                                    data-active="${pet.cams[3].src[1]}"
                                    data-id="${pet.id}"
                                    alt="Youtube preview of ${pet.id}"
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
            </section>
        </div>
    `;
}

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


function renderZoosPage(data, pet) {
    const zooNav = document.getElementById('zoos');
    zooNav.classList.add('active');
    const liveCams = document.getElementById('live-cams-container');
    const donate = document.getElementById('quick-donate');
    const didYouKnow = document.getElementById('did-you-know');
    
    data.forEach(zooPet => {
        if (zooPet.id === pet) {
            // render pet page 
            liveCams.innerHTML = renderPet(zooPet);
            // render quick donate
            donate.innerHTML = renderQuickDonateSection(
                zooPet.donate.header, zooPet.donate.subheader
            );
            // render did you know
            didYouKnow.innerHTML = renderDidYouKnowSection(zooPet);
            setupDonationPopup(); 
            setupLiveCamsCarousel();

            const cams = document.querySelectorAll('.live-cams-track img');
            cams.forEach(cam => {
                cam.addEventListener('click', () => {
                    setActiveCam(cam);
                });
            })
        }
    });
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

function setActiveCam(clickedCam) {
    const cams = document.querySelectorAll('.live-cams-track img');
    cams.forEach((cam) => {
        cam.src = cam.dataset.default;
    });
    clickedCam.src = clickedCam.dataset.active;
}

document.addEventListener('DOMContentLoaded', () => {
    const storedPet = (
        localStorage.getItem('selectedPetId') !== 'undefined' && localStorage.getItem('selectedPetId')
        ? localStorage.getItem('selectedPetId') 
        : 'panda'
    );
    localStorage.removeItem('selectedPetId');
    renderZoosPage(zooData, storedPet);

    // listener for live cams 
    const cams = document.querySelectorAll('.live-cams-track img');
    cams.forEach((cam) => {
        cam.addEventListener('click', () => {
            setActiveCam(cam);
        });
    });

    // default active sidebar icon
    const pandas = document.querySelectorAll('.sidebar-item[data-pet="panda"]');
    pandas.forEach(panda => panda.classList.add('active'));

    sidebar.addEventListener('click', (e) => {
        const petItem = e.target.closest('.sidebar-item');
        const items = sidebar.querySelectorAll('.sidebar-item'); 
        if (petItem) {
            const petId = petItem.dataset.pet;
            renderZoosPage(zooData, petId);
            // Update active sidebar icon
            items.forEach(item => {
                if (item.dataset.pet === petId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
        };
    });

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

});
   