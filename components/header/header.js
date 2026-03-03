export function renderHeader() {
    const BASE_PATH = window.location.hostname === '127.0.0.1' 
        ? '' 
        : '/online-zoo';

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
            <div class="burger-menu">
                <div class="burger-close-btn">&times</div>
                <a href="${BASE_PATH}/" id="about">About</a>
                <a href="${BASE_PATH}/pages/map/" id="map">Map</a>
                <a href="${BASE_PATH}/pages/zoos/" id="zoos">Zoos</a>
                <a href="${BASE_PATH}/pages/contact/" id="contact-us">Contact Us</a>
                <a href="https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project?node-id=44-9749&t=I2rApDlHU6JUq024-0" id="design">Design</a>
            </div>
            <img 
                src="../../assets/icons/burger.svg" alt="Hamburger icon"
                class="hamburger-icon"
            >
        </header>
    `; 
}