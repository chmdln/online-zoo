const BASE_PATH = new URL('../../assets/images', import.meta.url).href

export function renderHeader() {
    const user = (
        localStorage.getItem("user") 
        && localStorage.getItem("user") !== "undefined") 
        ? JSON.parse(localStorage.getItem("user")) 
        : "";
    
    const userName = user ? user.name : "Guest";
    const userEmail = user ? user.email : "";
    const userPopupContent = user
        ? `
            <div class="user-info user-info-logged-in">
                <div class="user-popup-name">${userName}</div>
                <div class="user-popup-email">${userEmail}</div>
                <button class="sign-out-btn">Sign out</button>
            </div>
        `
        : `
            <div class="user-info user-info-logged-out">
                <button class="sign-in-btn">Sign in</button>
                <span>or</span>
                <button class="sign-up-btn">Register</button>
            </div>
        `;

    return `
        <header>
            <h1><img 
                src="${BASE_PATH}/assets/images/logo.png"
                alt="logo"
                class="logo-image"
            ></h1>
            <div class="container-right">
                <div class="nav-menu">
                    <a href="/" id="about">About</a>
                    <a href="src/pages/map/" id="map">Map</a>
                    <a href="src/pages/zoos/" id="zoos">Zoos</a>
                    <a href="src/pages/contact/" id="contact-us">Contact Us</a>
                    <a href="https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project?node-id=44-9749&t=I2rApDlHU6JUq024-0" id="design">Design</a>
                </div>
                <div class="social-media">
                    <a href="https://www.youtube.com/@RSSchool" target="_blank">
                        <img src="${BASE_PATH}/assets/images/youtube.png" alt="Youtube Logo">
                    </a>
                    <a href="https://www.instagram.com/rsschool_en/" target="_blank">
                        <img src="${BASE_PATH}/assets/images/instagram.png" alt="Instagram Logo">
                    </a>
                    <a href="https://www.facebook.com/rsschoolEN/" target="_blank">
                        <img src="${BASE_PATH}/assets/images/facebook.png" alt="Facebook Logo">
                    </a>
                </div>
            </div>
            <div class="user-container">
                <div class="user-icon">
                    <img src="${BASE_PATH}/assets/icons/user.svg" alt="User icon">
                </div>
                <div class="user-name">${userName}</div>
                <div class="user-popup">
                    ${userPopupContent}
                </div>
            </div>
            <div class="burger-menu">
                <div class="burger-close-btn">&times</div>
                <a href="/" id="about">About</a>
                <a href="/pages/map/" id="map">Map</a>
                <a href="/pages/zoos/" id="zoos">Zoos</a>
                <a href="/pages/contact/" id="contact-us">Contact Us</a>
                <a href="https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project?node-id=44-9749&t=I2rApDlHU6JUq024-0" id="design">Design</a>
            </div>
            <img 
                src="${BASE_PATH}/assets/icons/burger.svg" alt="Hamburger icon"
                class="hamburger-icon"
            >
        </header>
    `; 
}


// auth 
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    header.addEventListener('click', (e) => {   
        if (e.target.closest('.user-container')) {
            console.log('User icon clicked');
            const popup = document.querySelector('.user-popup');
            console.log('Popup element:', popup);
            popup.classList.toggle('active');
        }

        if (e.target.closest('.sign-in-btn')) {
            window.location.href = `/pages/signin/`;
        } 

        if (e.target.closest('.sign-up-btn')) {
            window.location.href = `/pages/signup/`;
        }

        if (e.target.closest('.sign-out-btn')) {
            localStorage.removeItem('user');
            location.reload();
        }
    }); 
});

document.addEventListener('click', (e) => {
    const popup = document.querySelector('.user-popup');
    if (popup && !e.target.closest('.user-container')) {
        popup.classList.remove('active');
    }
});