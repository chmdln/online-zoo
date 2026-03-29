import { socket } from '../../socket.js';
import { User } from '../chat/user.js';

export function renderDonationPopup() {
    const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo'; 

    return `
        
            <div class="popup-overlay" id="popupOverlay"></div>
            <div class="popup-content">
                <div class="popup-header">
                    MAKE YOUR DONATION
                    <span class="close-btn" id="closePopup">&times;</span>
                </div>
                <div class="popup-body">
                    <!-- Popup step 1 -->
                    <div class="popup-step step-1 active">
                        <div class="popup-section-title">Donation Information:</div>
                        <div class="popup-section-main">
                            <div class="required-label">* Choose your donation amount:</div>
                            <div class="amount-buttons">
                                <button class="amount-btn active">$10</button>
                                <button class="amount-btn active">$20</button>
                                <button class="amount-btn active">$30</button>
                                <button class="amount-btn active">$50</button>
                                <button class="amount-btn active">$80</button>
                                <button class="amount-btn active">$100</button>
                            </div>
                            <div class="other-amount-row">
                                <button class="other-amount-btn active">Other amount</button>
                                <input class="other-amount-input">
                            </div>
                            <div class="special-pet-row">
                                <button class="special-pet-btn active">FOR SPECIAL PET</button>
                                <div class="special-pet-select">
                                    <div class="select-trigger">
                                        <div class="trigger-placeholder">
                                            Choose your favourite
                                        </div>
                                        <div class="arrow-wrapper">
                                            <div class="arrow"></div>
                                        </div>
                                    </div>
                                    <div class="select-dropdown">
                                        <div class="scroll-arrow-up-wrapper"><div class="scroll-arrow up-arrow"></div></div>
                                        <div class="options-scroll">
                                            <ul class="select-options">
                                                <li>None</li>
                                                <li data-id="1">Lukas the Panda</li>
                                                <li data-id="2">Andy the Lemur</li>
                                                <li data-id="3">Glen the Gorilla</li>
                                                <li data-id="4">Mike the Alligator</li>               
                                                <li data-id="5">Sam & Lora the eagles family</li>
                                                <li data-id="6">Liz the Koala</li>
                                                <li data-id="7">Shake the Lion</li>
                                                <li data-id="8">Senja the Tiger</li>
                                            </ul>
                                        </div>
                                        <div class="scroll-arrow-down-wrapper"><div class="scroll-arrow down-arrow"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="monthly-row">
                                <input type="checkbox" id="monthly">
                                <label for="monthly">Make this a monthly recurring gift</label>
                            </div>
                        </div>
                        <div class="popup-footer">
                            <div class="progress-dots">
                            <span class="dot active"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                            </div>
                            <button class="next-btn" disabled>
                                Next
                                <img 
                                    src="${BASE_PATH}/assets/icons/arrow.svg" 
                                    alt="Arrow icon"
                                >
                            </button>
                        </div>
                    </div>
                    <!-- Popup step 2 -->
                    <div class="popup-step step-2">
                        <div class="popup-section-title">Billing information:</div>
                        <div class="popup-section-main">
                            <div class="required-label">* Your Name:</div>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="First and last name"
                                class="input-primary name-input"
                                required
                            >
                            <div class="name-error-message"></div>
                            <div class="required-label email-label">* Your Email Address:</div>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                class="input-primary email-input"
                                autocomplete="email"
                                required
                            >
                            <div class="email-error-message"></div>
                            <div class="popup-disclaimer">
                                You will receive emails from the Online Zoo, including updates and news on the latest discoveries and translations. You can unsubscribe at any time.
                            </div>
                        </div>
                        <div class="popup-footer">
                            <div class="progress-dots">
                            <span class="dot active"></span>
                            <span class="dot active"></span>
                            <span class="dot"></span>
                            </div>
                            <div class="back-btn">
                                Back
                            </div>
                            <button class="next-btn" disabled>
                                Next
                                <img src="${BASE_PATH}/assets/icons/arrow.svg" alt="Arrow icon">
                            </button>
                        </div>
                    </div>
                    <!-- Popup step 3 -->
                    <div class="popup-step step-3">
                        <div class="popup-section-title">Payment information:</div>
                        <div class="popup-section-main">
                            <div class="saved-cards-container"></div>
                            <div class="payment-info-container">
                                <div class="credit-card-container">
                                    <div class="required-label">* Credit Card Number:</div>
                                    <input 
                                        type='text'
                                        inputmode="numeric"
                                        name="cc-number"
                                        placeholder='1234 1234 1234 1234'  
                                        class="input-primary card-number-input"
                                        required
                                    >
                                    <div class="card-number-error-message"></div>
                                </div>
                                <div class="cvv-number-container">
                                    <div class="required-label">* CVV Number:</div>
                                    <input 
                                        type="number"
                                        name="cvv"
                                        placeholder="123"
                                        class="input-primary cvv-number-input"
                                        maxlength="3"
                                        required
                                    >
                                    <div class="cvv-number-error-message"></div>
                                </div>
                            </div>
                            <div class="card-expiry-container">
                                <div>
                                    <div class="required-label">* Expiration Date</div>
                                    <input
                                        type="text"
                                        name="cc-exp"
                                        placeholder="MM/YY"
                                        class="input-primary expiry-input"
                                        maxlength="5"
                                        inputmode="numeric"
                                        required
                                    >
                                    <div class="expiry-error-message"></div>
                                </div>
                            </div>
                            <div class="save-card-info">
                            </div>
                        </div>
                        <div class="popup-footer">
                            <div class="progress-dots">
                                <span class="dot active"></span>
                                <span class="dot active"></span>
                                <span class="dot active"></span>
                            </div>
                            <div class="back-btn">
                                Back
                            </div>
                            <button class="btn-primary complete-donation-btn" disabled>
                                Complete donation
                                <img src="${BASE_PATH}/assets/icons/arrow.svg" alt="Arrow icon">
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
    `
}


export function setupDonationPopup() {
    const BASE_URL = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';
    const donateBtn = document.querySelector('.donate-right .btn-primary');
    const popup = document.getElementById('donationPopup');
    const closeBtn = document.getElementById('closePopup');
    const overlay = document.getElementById('popupOverlay');

    donateBtn.addEventListener('click', () => {
        popup.style.display = 'block';
        document.body.classList.add('no-scroll');
    });

    // step 1 
    const nextBtnStep1 = document.querySelector('.step-1 .next-btn');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const otherAmountBtn = document.querySelector('.other-amount-btn');
    const otherAmountInput = document.querySelector('.other-amount-input');
    const specialPetBtn = document.querySelector('.special-pet-btn');
    // const optionsList = document.querySelectorAll('.select-options li');

    let selectedAmount = false;
    let selectedPet = false;
    let canProceed = false;
    let AMOUNT;  
    let PETID; 
    
    function updateNextBtn() {
        canProceed = selectedAmount && selectedPet;
        nextBtnStep1.disabled = !canProceed;
    }

    // amount buttons
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.add('active'));
            btn.classList.remove('active');
            otherAmountBtn.classList.add('active');
            otherAmountInput.value = '';
            selectedAmount = true;
            updateNextBtn();
        });
    });

    // other amount button — toggles the input
    otherAmountBtn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.add('active'));
        otherAmountBtn.classList.remove('active');
        otherAmountInput.style.display = 'block';
        otherAmountInput.focus();
        selectedAmount = false;
        updateNextBtn();
    });

    otherAmountInput.addEventListener('focus', () => {
        amountBtns.forEach(b => b.classList.add('active'));
        otherAmountBtn.classList.remove('active');
    })

    otherAmountInput.addEventListener('blur', () => {
        if (!otherAmountInput.value) {
            otherAmountBtn.classList.add('active');
            selectedAmount = false;
        } else if (otherAmountInput.value) {
            selectedAmount = true; 
        }
        updateNextBtn();
    })

    // other amount input validation
    otherAmountInput.addEventListener('input', () => {
        const raw = otherAmountInput.value;
        const isValid = /^\d*\.?\d*$/.test(raw); 
        if (!isValid) {
            otherAmountInput.value = raw.slice(0, -1); 
        }
    });

    // special pet select 
    const select = document.querySelector('.special-pet-select');
    const trigger = select.querySelector('.select-trigger .trigger-placeholder');
    const arrow = select.querySelector('.arrow');
    const options = select.querySelector('.select-options');
    const optionsList = select.querySelectorAll('.select-options li');
    const dropdown = select.querySelector('.select-dropdown');
    const upArrow = document.querySelector('.up-arrow');
    const downArrow = document.querySelector('.down-arrow')
    const dropdownTriggers = [trigger, arrow]; 

    specialPetBtn.addEventListener('click', () => {
        options.style.display = 'block'; 
        dropdown.style.display = 'flex'; 
        specialPetBtn.classList.remove('active');
    });

    dropdownTriggers.forEach(el => el.addEventListener('click', () => {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        specialPetBtn.classList.remove('active');
    }));

    // hide dropdown on blur
    document.addEventListener('click', (e) => {
        if (!select.contains(e.target) && !specialPetBtn.contains(e.target)) {
            options.style.display = 'none';
            dropdown.style.display = 'none';
            // re-active special pet button if None selected
            if (trigger.textContent.trim() === 'Choose your favourite') {
                specialPetBtn.classList.add('active');
                selectedPet = false;
            }
            updateNextBtn(); 
        }
    });

    let currentIndex = 0;
    function updateActiveOption(index) {
        optionsList.forEach(option => option.classList.remove('active'));
        optionsList[index].classList.add('active');
        optionsList[index].scrollIntoView({
            block: 'nearest'
        });
    }

    updateActiveOption(currentIndex);

    downArrow.addEventListener('click', () => {
        if (currentIndex < optionsList.length - 1) {
            currentIndex++;
            updateActiveOption(currentIndex);
        }
    });

    upArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateActiveOption(currentIndex);
        }
    });

    optionsList.forEach((option, index) => {
        option.addEventListener('click', () => {
            currentIndex = index;
            updateActiveOption(currentIndex);
            if (option.textContent.trim() !== 'None') {
                trigger.textContent = option.textContent;
                trigger.style.color = '#000000';
                selectedPet = true;
            } else {
                trigger.textContent = 'Choose your favourite';
                trigger.style.color = '#A4A8AE';
                specialPetBtn.classList.add('active');
                selectedPet = false;
            }
            options.style.display = 'none';
            dropdown.style.display = 'none';
            updateNextBtn();
        });
        
    });

    // save amount and petId
    nextBtnStep1.addEventListener('click', () => {
        const selectedBtn = [...amountBtns].find(b => !b.classList.contains('active'));
        if (selectedBtn) {
            AMOUNT = parseFloat(selectedBtn.textContent.slice(1));
        }

        if (!otherAmountBtn.classList.contains('active')) {
            AMOUNT = parseFloat(otherAmountInput.value);
            console.log("other amount", AMOUNT);
        }

        if (selectedPet) {
            PETID = parseInt(optionsList[currentIndex].getAttribute('data-id'));
        }
    }); 
    

    // step 2 
    const nameInput = document.querySelector('.name-input');
    const emailInput = document.querySelector('.email-input');
    const nameErrorMess = document.querySelector('.name-error-message');
    const emailErrorMess = document.querySelector('.email-error-message');
    const nextBtnStep2 = document.querySelector('.step-2 .next-btn');

    function updateStep2NextBtn() {
        nextBtnStep2.disabled = !(nameInput.value && emailInput.value && validateName(nameInput.value) && validateEmail(emailInput.value));
    }

    // prefill name and email
    nextBtnStep1.addEventListener('click', () => {
        if (canProceed) {
            const currUser = localStorage.getItem('user');
            if (currUser) {
                const user = JSON.parse(currUser);
                nameInput.value = user.name;
                emailInput.value = user.email;
                updateStep2NextBtn();
            }
        }
    })

    // input validation
    function validateName(value) {
        return /^[a-zA-Z\s]+$/.test(value.trim()) && value.trim().length > 0;
    }

    function validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    nameInput.addEventListener('blur', () => {
        const name = nameInput.value;
        const isValid = validateName(name);
        if (name && !isValid) {
            nameInput.classList.add('error');
            nameErrorMess.textContent = 'Name cannot contain numbers, special characters, or punctuation.';
        } 
        updateStep2NextBtn(); 
    });

    nameInput.addEventListener('focus', () => {
        nameInput.classList.remove('error');
        nameErrorMess.textContent = '';
    });

    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const isValid = validateEmail(email);
        if (email && !isValid) {
            emailInput.classList.add('error');
            emailErrorMess.textContent = 'Please enter a valid email address.';
        } 
        updateStep2NextBtn(); 
    });

    emailInput.addEventListener('focus', () => {
        emailInput.classList.remove('error');
        emailErrorMess.textContent = '';
    });


    // step 3 
    const payInfoContainer = document.querySelector('.payment-info-container');
    const cardNumberInput = document.querySelector('.card-number-input');
    const cardNumberErrorMess = document.querySelector('.card-number-error-message');
    const cvvNumberInput = document.querySelector('.cvv-number-input');
    const cvvNumberErrorMess = document.querySelector('.cvv-number-error-message');
    const expiryInput = document.querySelector('.expiry-input');
    const expiryErrorMess = document.querySelector('.expiry-error-message');
    const completeBtn = document.querySelector('.complete-donation-btn');

    // render saved cards 
    let savedCardsVisible = false;

    function renderSavedCards(cards) {
        const container = document.querySelector('.saved-cards-container');
        if (!cards || cards.length === 0) {
            container.innerHTML = '';
            savedCardsVisible = false;
            return;
        }

        const cardOptions = cards.map((card, index) => {
            const num = card.cardNumber.replace(/\s/g, '');
            const masked = `${num.slice(0, 4)} **** **** ${num.slice(-4)}`;
            return `<li data-index="${index}">${masked}</li>`;
        }).join('');

        container.innerHTML = `
            <div class="saved-cards-dropdown">
                <ul class="saved-cards-list">
                    ${cardOptions}
                </ul>
            </div>
        `;
        savedCardsVisible = true;

        // prefill selected card
        container.querySelectorAll('.saved-cards-list li').forEach(li => {
            li.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const card = cards[parseInt(li.dataset.index)];
                cardNumberInput.value = card.cardNumber;
                cvvNumberInput.value = card.cvv;
                expiryInput.value = card.expiry;
                container.innerHTML = '';
                savedCardsVisible = false;
                updateCompleteBtn();
            });
        });
    }

    // show saved cards on focus
    cardNumberInput.addEventListener('focus', () => {
        cardNumberInput.classList.remove('error');
        cardNumberErrorMess.textContent = '';

        const currUser = localStorage.getItem('user');
        if (currUser !== null) {
            const user = JSON.parse(currUser);
            if (user.cardInfo && user.cardInfo.length > 0) {
                renderSavedCards(user.cardInfo);
            }
        }
    });

    // hide saved cards on user input
    cardNumberInput.addEventListener('input', () => {
        const container = document.querySelector('.saved-cards-container');
        if (savedCardsVisible && container) {
            container.innerHTML = '';
            savedCardsVisible = false;
        }
    });

    // hide saved cards on outside click
    document.addEventListener('click', (e) => {
        const container = document.querySelector('.saved-cards-container');
        if (savedCardsVisible && container && !container.contains(e.target) && e.target !== cardNumberInput) {
            container.innerHTML = '';
            savedCardsVisible = false;
        }
    });
    

    function updateCompleteBtn() {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const cardValid = /^\d{16}$/.test(cardNumber);
        const cvvValid = /^\d{3}$/.test(cvvNumberInput.value);
        const val = expiryInput.value;
        const [mm, yy] = val.split('/') || [];
        const month = parseInt(mm, 10);
        const year = parseInt('20' + yy, 10);
        const now = new Date();
        const expiry = new Date(year, month, 0);
        const expiryValid = /^\d{2}\/\d{2}$/.test(val)
            && month >= 1 && month <= 12
            && expiry > now
            && year <= now.getFullYear() + 20;

        completeBtn.disabled = !(cardValid && cvvValid && expiryValid);
    }

    function formatCardNumber(val) {
        val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
        return val;
    }

    nextBtnStep2.addEventListener('click', () => {
        const currUser = localStorage.getItem('user');
        const saveCardInfo = document.querySelector('.save-card-info'); 

        // display checkbox
        if (currUser !== null) {
            saveCardInfo.innerHTML = `
            <input type="checkbox" id="saveCardInfo">
            <label for="saveCardInfo">Save card info for future donations</label>
            `
        } else {
            saveCardInfo.innerHTML = '';
        }
    }); 

    document.addEventListener('click', (e) => {
        const savedCardsContainer = document.querySelector('.saved-cards-container');
        if (!cardNumberInput.contains(e.target) && !savedCardsContainer?.contains(e.target)) {
            const cardNumber = cardNumberInput.value.replace(/\s/g, ''); 
            const isValid = /^\d{16}$/.test(cardNumber);
            if (cardNumber && !isValid) {
                cardNumberInput.classList.add('error');
                payInfoContainer.classList.add('error');
                cardNumberErrorMess.textContent = 'Please enter a valid card number.';
            } else {
                cardNumberInput.classList.remove('error');
                payInfoContainer.classList.remove('error');
                cardNumberErrorMess.textContent = '';
                cardNumberInput.value = formatCardNumber(cardNumber);
                updateCompleteBtn();
            }
        }
    });


    cvvNumberInput.addEventListener('input', () => {
        const cvvNumber = cvvNumberInput.value;
        const isValid = /^\d{3}$/.test(cvvNumber);
        if (!isValid) {
            cvvNumberInput.value = cvvNumber.slice(0, 3);
        }
    })

    cvvNumberInput.addEventListener('blur', () => {
        const cvvNumber = cvvNumberInput.value;
        const isValid = /^\d{3}$/.test(cvvNumber);
        if (cvvNumber && !isValid) {
            cvvNumberInput.classList.add('error');
            payInfoContainer.classList.add('error');
            cvvNumberErrorMess.textContent = 'Please enter a valid CVV number.';
        } else {
            cvvNumberInput.classList.remove('error');
            payInfoContainer.classList.remove('error');
            cvvNumberErrorMess.textContent = '';
            updateCompleteBtn()
        }
    });

    cvvNumberInput.addEventListener('focus', () => {
        cvvNumberInput.classList.remove('error');
        payInfoContainer.classList.remove('error');
        cvvNumberErrorMess.textContent = '';
    });

    // auto-format MM/YY 
    expiryInput.addEventListener('input', () => {
        let val = expiryInput.value.replace(/\D/g, ''); 
        if (val.length >= 3) {
            val = val.slice(0, 2) + '/' + val.slice(2, 4);
        }
        expiryInput.value = val;
        updateCompleteBtn();
    });

    expiryInput.addEventListener('blur', () => {
        const val = expiryInput.value;
        const [mm, yy] = val.split('/');
        const month = parseInt(mm, 10);
        const year = parseInt('20' + yy, 10);
        const now = new Date();
        const expiry = new Date(year, month, 0); // month is 0-indexed

        const isValid = /^\d{2}\/\d{2}$/.test(val) 
            && month >= 1 && month <= 12
            && expiry > now
            && year <= now.getFullYear() + 20;

        if (!isValid) {
            expiryInput.classList.add('error');
            expiryErrorMess.textContent = 'Please enter a valid future expiry date.';
        } else {
            expiryInput.classList.remove('error');
            expiryErrorMess.textContent = '';
            updateCompleteBtn();
        }
    });

    expiryInput.addEventListener('focus', () => {
        expiryInput.classList.remove('error');
        expiryErrorMess.textContent = '';
    });


    // step navigation
    const popupSteps = document.querySelectorAll('.popup-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const backBtns = document.querySelectorAll('.back-btn');

    let currPopupStep = 0;
    nextBtns.forEach((nextBtn, index) => {
        nextBtn.addEventListener('click', () => {
            popupSteps[currPopupStep].classList.remove('active');
            currPopupStep++;
            if (currPopupStep < popupSteps.length) {
                popupSteps[currPopupStep].classList.add('active');
            }
        });
    });

    backBtns.forEach((backBtn, index) => {
        backBtn.addEventListener('click', () => {
            popupSteps[currPopupStep].classList.remove('active');
            currPopupStep--;
            if (currPopupStep >= 0) {
                popupSteps[currPopupStep].classList.add('active');
            }
        });
    });

    // complete donation
    function closePopup() {
        // reset steps
        popupSteps[currPopupStep].classList.remove('active');
        currPopupStep = 0;
        popupSteps[currPopupStep].classList.add('active');
        popup.style.display = 'none';
        document.body.classList.remove('no-scroll');

        // reset step 1
        amountBtns.forEach(b => b.classList.add('active'));
        otherAmountBtn.classList.add('active');
        otherAmountInput.value = '';
        trigger.textContent = 'Choose your favourite';
        trigger.style.color = '#A4A8AE';
        specialPetBtn.classList.add('active');
        selectedAmount = false;
        selectedPet = false;
        canProceed = false;
        currentIndex = 0;
        updateActiveOption(currentIndex);
        options.style.display = 'none';
        dropdown.style.display = 'none';
        nextBtnStep1.disabled = true;
        document.getElementById('monthly').checked = false;

        // reset step 2
        nameInput.value = '';
        emailInput.value = '';
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        nameErrorMess.textContent = '';
        emailErrorMess.textContent = '';
        nextBtnStep2.disabled = true;

        // reset step 3
        cardNumberInput.value = '';
        cvvNumberInput.value = '';
        expiryInput.value = '';
        cardNumberInput.classList.remove('error');
        cvvNumberInput.classList.remove('error');
        expiryInput.classList.remove('error');
        payInfoContainer.classList.remove('error');
        cardNumberErrorMess.textContent = '';
        cvvNumberErrorMess.textContent = '';
        expiryErrorMess.textContent = '';
        document.querySelector('.save-card-info input').checked = false
    }

    async function submitDonation(payLoad) {
        try {
            const response = await fetch(`${BASE_URL}/donations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payLoad)
            });
            const data = await response.json(); 
            data.data.ok = response.ok;
            return data.data; 
            
        } catch (error) {
            console.error('Error:', error);
            return { 
                message: 'Something went wrong. Please, try again later.', 
                ok: false 
            };
        }
    }

    function saveCardInfo(data) {
        const checkbox = document.querySelector('.save-card-info input'); 
        let userStr = localStorage.getItem('user'); 
        if (!checkbox || !checkbox.checked || !userStr) return;
        
        let user = JSON.parse(userStr);
        if (!Array.isArray(user.cardInfo)) {
            if (user.cardInfo) {
                user.cardInfo = [user.cardInfo];
            } else {
                user.cardInfo = [];
            }
        }

        user.cardInfo.push(...data);
        localStorage.setItem('user', JSON.stringify(user))
    }

    function showCompleteMessage(mess, isOk) {
        // create a toast-style message outside the popup
        const toast = document.createElement('div');
        toast.className = 'complete-message';
        toast.textContent = mess;
        toast.style.color = isOk ? '#00A092' : 'red';
        toast.style.fontFamily = 'Montserrat';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function parsePetName(name) {
        if (!name || name === 'None') return null;
        // pet name contains "&"
        if (name.includes('&')) {
            const [left, right] = name.split('&');
            const first = left.trim().split(' ')[0];
            const second = right.trim().split(' ')[0];
            return `${first} & ${second}`;
        }
        // one word name
        return name.trim().split(' ')[0];
    }

    async function updateDonorInfo() {
        const username = User.username;

        try {
            const resp = await fetch(`http://localhost:3000/user/donate/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
            if (resp.ok) {
                User.markAsDonor(); 
            }
        } catch (err) {
            console.error('Error updating donor info:', err);
            throw new Error('Failed to update donor info');
        }
    }

    completeBtn.addEventListener('click', async () => {
        // backend call
        const payLoad = {
            name: nameInput.value,
            email: emailInput.value,
            amount: AMOUNT,
            petId: PETID,
        }
        const data = await submitDonation(payLoad);

        // save card info
        const cardInfo = [{
            cardNumber: cardNumberInput.value,
            cvv: cvvNumberInput.value,
            expiry: expiryInput.value
        }]; 
        saveCardInfo(cardInfo);

        // showcase user in chat who donates 
        let petName; 
        Array.from(optionsList).forEach((option, index) => {
            if (option.dataset.id === String(PETID)) {
                petName = parsePetName(option.textContent);
            }
        })

        if (data.ok) {
            socket.emit('donation_submit', {
                name: nameInput.value, 
                amount: AMOUNT,
                petId: PETID,
                petName: petName,
            });

            await updateDonorInfo();
        }

        // reset to step 1
        popupSteps[currPopupStep].classList.remove('active');
        currPopupStep = 0;
        popupSteps[currPopupStep].classList.add('active');
        closePopup();

        // show message
        showCompleteMessage(data.message, data.ok);
    });
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
}