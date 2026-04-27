export function renderDidYouKnowSection(pet) {

    return `
        <section class="did-you-know">
            <div class="did-you-know-top">
                <div class="content">
                    <h2 class="content-header">Did you know?</h2>
                    <div class="content-text subheader-text">
                        ${pet.description}
                    </div>
                </div>
            </div>
            <div class="did-you-know-bot">
                <div class="facts">
                    <div class="facts-left">
                        <div class="fact-item">
                            <span class="common-name-row subheader-text">Common name:</span>
                            <span class="common-name-value text">${pet.commonName}</span>
                        </div>
                        <div class="fact-item">
                            <span class="sci-name-row subheader-text">Scientific name:</span>
                            <span class="sci-name-value text">${pet.scientificName}</span>
                        </div>
                        <div class="fact-item">
                            <span class="type-row subheader-text">Type:</span>
                            <span class="type-value text">${pet.type}</span>
                        </div>
                        <div class="fact-item">
                            <span class="size-row subheader-text">Size:</span>
                            <span class="size-value text">${pet.size}</span>
                        </div>
                        <div class="fact-item">
                            <span class="diet-row subheader-text">Diet:</span>
                            <span class="diet-value text">${pet.diet}</span>
                        </div>
                        <div class="fact-item">
                            <span class="habitat-row subheader-text">Habitat:</span>
                            <span class="habitat-value text">${pet.habitat}</span>
                        </div>
                        <div class="fact-item">
                            <span class="range-row subheader-text">Range:</span>
                            <span class="range-value text">${pet.range}</span>
                            <button 
                                class="view-live-btn btn-text view-map-btn"
                                    data-lat="${pet.latitude}"
                                    data-lng="${pet.longitude}"
                                    data-name="${pet.commonName}"
                                >
                                View map
                                <span class="arrow-container">
                                    <span class="arrow-line"></span>
                                    <span class="arrow-right"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="facts-right">
                        <img 
                            src="../../assets/icons/did-you-know/${pet.id}-did-you-know.svg"
                            alt="Image of ${pet.commonName}"
                            onerror="this.onerror=null; this.src='../../assets/icons/did-you-know/${pet.id}-did-you-know.jpg';"
                        />
                    </div>
                </div>
                <div class="info text">
                    ${pet.detailedDescription}
                </div>
            </div>
        </section>
    `; 
}