import { renderHeader } from '../../components/header.js';
import { renderFooter } from '../../components/footer.js';

document.getElementById('header').innerHTML = renderHeader();
document.getElementById('footer').innerHTML = renderFooter();

const zooNav = document.getElementById('zoos');
zooNav.classList.add('active');

let sidebarOpen = false;
const sidebarCollapsed = document.querySelector('.sidebar-collapsed');
const sidebarExpanded = document.querySelector('.sidebar-expanded');
const sidebarArrows = document.querySelectorAll('.double-arrow-container');

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

// Initialize both sidebars
setupRotatingSidebar('.sidebar-collapsed');
setupRotatingSidebar('.sidebar-expanded');

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

// active sidebar icon
const sidebarCollapsedItems = document.querySelectorAll('.sidebar-collapsed .sidebar-item img');
const sidebarExpandedItems = document.querySelectorAll('.sidebar-expanded .sidebar-item img');

sidebarCollapsedItems.forEach((img) => {
    img.addEventListener('click', () => {
        const clickedPet = img.closest('.sidebar-item').dataset.pet;
        // reset collapsed
        sidebarCollapsedItems.forEach(i => {
            i.src = i.src.replace('-active.svg', '.svg');
        });
        img.src = img.src.replace('.svg', '-active.svg');
        // sync expanded
        sidebarExpandedItems.forEach(i => {
            const pet = i.closest('.sidebar-item').dataset.pet;
            if (pet === clickedPet) {
                i.src = i.src.replace('-exp.svg', '-exp-active.svg');
            } else {
                i.src = i.src.replace('-exp-active.svg', '-exp.svg');
            }
        });
    });

});

sidebarExpandedItems.forEach((img) => {
    img.addEventListener('click', () => {
        const clickedPet = img.closest('.sidebar-item').dataset.pet;
        // reset expanded
        sidebarExpandedItems.forEach(i => {
            i.src = i.src.replace('-exp-active.svg', '-exp.svg');
        });
        img.src = img.src.replace('-exp.svg', '-exp-active.svg');
        // sync collapsed
        sidebarCollapsedItems.forEach(i => {
            const pet = i.closest('.sidebar-item').dataset.pet;
            if (pet === clickedPet) {
                i.src = i.src.replace('.svg', '-active.svg');
            } else {
                i.src = i.src.replace('-active.svg', '.svg');
            }
        });
    });

});



