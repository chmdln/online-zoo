export function renderHeader() {
    const BASE_PATH = 'https://chmdln.github.io/online-zoo'; 
    const paths = [
        `${BASE_PATH}/index.html`,
        `${BASE_PATH}/pages/map/index.html`,
        `${BASE_PATH}/pages/zoos/index.html`,
        `${BASE_PATH}/pages/contact/index.html`,
    ]

    return `
        <header>
            <h1><img 
                src="../../assets/images/logo.png" 
                alt="logo"
                class="logo-image"
            ></h1>
            <div class="container-right">
                <div class="nav-menu">
                    <a href="${paths[0]}" id="about">About</a>
                    <a href="${paths[1]}" id="map">Map</a>
                    <a href="${paths[2]}" id="zoos">Zoos</a>
                    <a href="${paths[3]}" id="contact-us">Contact Us</a>
                    <a href="https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project?node-id=44-9749&t=I2rApDlHU6JUq024-0" id="design">Design</a>
                </div>
                <div class="social-media">
                    <img src="../../assets/images/youtube.png" alt="Youtube Logo">
                    <img src="../../assets/images/instagram.png" alt="Instagram Logo">
                    <img src="../../assets/images/facebook.png" alt="Facebook Logo">
                </div>
            </div>
        </header>
    `; 
}