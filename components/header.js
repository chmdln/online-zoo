export function renderHeader() {
    return `
        <header>
            <img 
                src="../../assets/images/logo.png" 
                alt="logo"
                class="logo-image"
            >
            <div class="container-right">
                <div class="nav-menu">
                    <a href="#" class="active">About</a>
                    <a href="#">Map</a>
                    <a href="#">Zoos</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Design</a>
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