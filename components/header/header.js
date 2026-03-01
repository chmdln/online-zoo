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
                    <a href="#" id="about">About</a>
                    <a href="#" id="map">Map</a>
                    <a href="#" id="zoos">Zoos</a>
                    <a href="#" id="contact-us">Contact Us</a>
                    <a href="#" id="design">Design</a>
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