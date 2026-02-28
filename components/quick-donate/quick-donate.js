export function renderQuickDonateSection(header, subheader) {
    return `
        <section class="donate">
            <div class="donate-left">
                <div class="donate-left-header">${header}</div>
                <div class="donate-left-content">${subheader}</div>
            </div>
            <div class="donate-right">
                <div class="donate-right-header">Quick Donate</div>
                <div class="btn-primary">
                    <div class="donate-right-btn-text">
                        $ Donation amount 
                    </div>
                    <div class="donate-right-btn-img">
                        <img src="../../assets/icons/arrow.svg" alt="Arrow icon">
                    </div>
                </div>
            </div>
            <div class="donation-popup" id="donationPopup">
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
                                    <button class="amount-btn">$10</button>
                                    <button class="amount-btn">$20</button>
                                    <button class="amount-btn">$30</button>
                                    <button class="amount-btn">$50</button>
                                    <button class="amount-btn">$80</button>
                                    <button class="amount-btn">$100</button>
                                </div>
                                <div class="other-amount-row">
                                    <button class="other-amount-btn ">Other amount</button>
                                    <input class="other-amount-input">
                                </div>
                                <div class="special-pet-row">
                                    <button class="special-pet-btn">FOR SPECIAL PET</button>
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
                                                    <li>Lukas the Panda</li>
                                                    <li>Andy the Lemur</li>
                                                    <li>Glen the Gorilla</li>
                                                    <li>Mike the Alligator</li>               
                                                    <li>Sam & Lora the eagles family</li>
                                                    <li>Liz the Koala</li>
                                                    <li>Shake the Lion</li>
                                                    <li>Senja the Tiger</li>
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
                                <button class="next-btn">
                                    Next
                                    <img src="../../assets/icons/arrow.svg">
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
                                />
                                <div class="required-label email-label">* Your Email Address:</div>
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    class="input-primary email-input"
                                    autocomplete="email"
                                    required
                                />
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
                                <button class="next-btn">
                                    Next
                                    <img src="../../assets/icons/arrow.svg">
                                </button>
                            </div>
                        </div>
                        <!-- Popup step 3 -->
                        <div class="popup-step step-3">
                            <div class="popup-section-title">Payment information:</div>
                            <div class="popup-section-main">
                                <div class="payment-info-container">
                                    <div class="credit-card-container">
                                        <div class="required-label">* Credit Card Number:</div>
                                        <input 
                                            type='number'
                                            name="cc-number"
                                            placeholder='1234 1234 1234 1234'  
                                            class="input-primary"
                                            autocomplete="cc-number"
                                            required
                                        />
                                    </div>
                                    <div class="cvv-number-container">
                                        <div class="required-label">* CVV Number:</div>
                                        <input 
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            class="input-primary"
                                            inputmode="numeric"
                                            pattern="[0-9]{3,4}"
                                            autocomplete="cc-csc"
                                            maxlength="4"
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="card-expiry-container">
                                    <!-- input month -->
                                    <div class="special-pet-select">
                                        <div class="select-trigger">
                                            <input 
                                                type="text"
                                                name="cc-exp-month"
                                                placeholder="Month"
                                                class="input-primary"
                                                autocomplete="cc-exp-month" 
                                                required
                                            />
                                            <div class="month arrow-wrapper">
                                                <div class="arrow"></div>
                                            </div>
                                        </div>
                                        <div class="select-dropdown">
                                            <div class="scroll-arrow-up-wrapper"><div class="scroll-arrow up-arrow"></div></div>
                                            <div class="scroll-arrow-down-wrapper"><div class="scroll-arrow down-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- input year -->
                                    <div class="special-pet-select">
                                    <div class="select-trigger">
                                        <input 
                                            type="text" 
                                            name="cc-exp-year"
                                            placeholder="Year" class="input-primary" 
                                            autocomplete="cc-exp-year" 
                                            required
                                        />
                                        <div class="year arrow-wrapper">
                                            <div class="arrow"></div>
                                        </div>
                                    </div>
                                    <div class="select-dropdown">
                                        <div class="scroll-arrow-up-wrapper"><div class="scroll-arrow up-arrow"></div></div>
                                        <div class="scroll-arrow-down-wrapper"><div class="scroll-arrow down-arrow"></div>
                                        </div>
                                    </div>
                                </div>
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
                                <button class="btn-primary complete-donation-btn">
                                    Complete donation
                                    <img src="../../assets/icons/arrow.svg">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    `; 
}


