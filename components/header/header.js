export function renderHeader() {
    const BASE_PATH = window.location.hostname === '127.0.0.1' 
        ? '' 
        : '/online-zoo';

    const user = (
        localStorage.getItem("user") 
        && localStorage.getItem("user") !== "undefined") 
        ? JSON.parse(localStorage.getItem("user")) 
        : "";
    
    const userName = user ? user.name : "";
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
                    <a href="${BASE_PATH}/" id="about">About</a>
                    <a href="${BASE_PATH}/pages/map/" id="map">Map</a>
                    <a href="${BASE_PATH}/pages/zoos/" id="zoos">Zoos</a>
                    <a href="${BASE_PATH}/pages/contact/" id="contact-us">Contact Us</a>
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
                <a href="${BASE_PATH}/" id="about">About</a>
                <a href="${BASE_PATH}/pages/map/" id="map">Map</a>
                <a href="${BASE_PATH}/pages/zoos/" id="zoos">Zoos</a>
                <a href="${BASE_PATH}/pages/contact/" id="contact-us">Contact Us</a>
                <a href="https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project?node-id=44-9749&t=I2rApDlHU6JUq024-0" id="design">Design</a>
            </div>
            <img 
                src="${BASE_PATH}/assets/icons/burger.svg" alt="Hamburger icon"
                class="hamburger-icon"
            >
        </header>
    `; 
}