import { renderHeader } from '../../components/header.js';
import { renderFooter } from '../../components/footer.js';



document.getElementById('header').innerHTML = renderHeader();
document.getElementById('footer').innerHTML = renderFooter();
// const contact = document.getElementById('contact');
// contact.classList.add('active');
