export function renderFooter() {

    const BASE_PATH = '/assets';

    return `
        <footer>
            <div class="footer-top">
                <div class="footer-logos">
                    <img src="${BASE_PATH}/images/zoo-logo-white.png" alt="Online Zoo logo icon">
                    <img src="${BASE_PATH}/images/yem-digital-logo.png" alt="Yem Digital logo icon">
                    <img src="${BASE_PATH}/images/rs-school-js-logo-white.png" alt="RS School logo icon">
                </div>
                <div class="footer-nav-links btn-text nav-menu">
                    <a href="/" id="about">
                    About</a>
                    <a href="/src/pages/map/" id="map">Map</a>
                    <a href="/src/pages/zoos/" id="zoos">Zoos</a>
                    <a href="/src/pages/contact/" id="contact-us">Contact Us</a>
                </div>
                <button class="footer-btn btn-text">
                    Donate for volunteers
                    <span class="arrow-container">
                        <span class="arrow-line"></span>
                        <span class="arrow-right"></span>
                    </span>
                </button>
                <div class="we-care-popup" id="weCarePopup">
                    <div class="we-care-popup-overlay"></div>
                    <div class="we-care-popup-content">
                        <div class="close-btn">×</div>
                        <img src="${BASE_PATH}/icons/hand-and-paw.svg" alt="Hand and paw image">
                        <div class="we-care-popup-body">
                            <div class="h2-heading">Together we care, save and protect!</div>
                            <div class="we-care-subheader text">
                                Your most generous gift not only cares for countless animals, but it also offers hope and a vital lifeline to the world’s most endangered wildlife relying on us to survive.
                            </div>
                            <div class="amount-buttons">
                                <button class="amount-btn">$10</button>
                                <button class="amount-btn">$20</button>
                                <button class="amount-btn">$30</button>
                                <button class="amount-btn">$50</button>
                                <button class="amount-btn">$80</button>
                                <button class="amount-btn">$100</button>
                                <button class="amount-btn other-amount">Other amount</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="footer-separator"></div>
            <div class="footer-bottom">
                <div class="footer-bottom-left">
                    <div>© 2021 DinaK</div>
                    <div>© Yem Digital</div>
                    <div>© RSSchool</div>
                </div>
                <div class="footer-bottom-right">
                    <a href="https://www.youtube.com/@RSSchool" target="_blank">
                        <img src="${BASE_PATH}/images/youtube.png" alt="Youtube logo icon">
                    </a>
                    <a href="https://www.instagram.com/rsschool_en/" target="_blank">
                        <img src="${BASE_PATH}/images/instagram.png" alt="Instagram logo icon">
                    </a>
                    <a href="https://www.facebook.com/rsschoolEN/" target="_blank">
                        <img src="${BASE_PATH}/images/facebook.png" alt="Facebook logo icon">
                    </a>
                </div>
                <div class="footer-separator screen-320"></div>
                <div
                    class="footer-bottom-left-screen-320">
                    <div>© 2021 DinaK</div>
                    <div>© Yem Digital</div>
                    <div>© RSSchool</div>
                </div>
            </div>
        </footer>
    `; 
}

document.addEventListener('DOMContentLoaded', () => {
  const weCareBtn = document.querySelector('.footer-btn.btn-text');
  const weCarePopup = document.getElementById('weCarePopup');
  const weCareCloseBtn = document.querySelector('.we-care-popup-content .close-btn');
  const weCareOverlay = document.querySelector('.we-care-popup-overlay');

  weCareBtn.addEventListener('click', () => {
    weCarePopup.style.display = 'block';
    document.body.classList.add('no-scroll');
  });

  function closePopup() {
    weCarePopup.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  weCareCloseBtn.addEventListener('click', closePopup);
  weCareOverlay.addEventListener('click', closePopup);
}); 