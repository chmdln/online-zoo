export function renderHeader() {
    const BASE_PATH = window.location.hostname === 'localhost' 
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
                    <img src="${BASE_PATH}/assets/images/youtube.png" alt="Youtube Logo">
                    <img src="${BASE_PATH}/assets/images/instagram.png" alt="Instagram Logo">
                    <img src="${BASE_PATH}/assets/images/facebook.png" alt="Facebook Logo">
                </div>
            </div>
        </header>
    `; 
}