export function renderHeader() {
    return `
        <header>
            <h1><img 
                src="../../assets/images/logo.png" 
                alt="logo"
                class="logo-image"
            ></h1>
            <div class="container-right">
                <div class="nav-menu">
                    <a href="/online-zoo/index.html" id="about">About</a>
                    <a href="/online-zoo/pages/map/index.html" id="map">Map</a>
                    <a href="/online-zoo/pages/zoos/index.html" id="zoos">Zoos</a>
                    <a href="/online-zoo/pages/contact/index.html" id="contact-us">Contact Us</a>
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