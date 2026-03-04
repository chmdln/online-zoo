export function renderDidYouKnowSection(obj) {
    const pet = obj.didYouKnow; 
    return `
        <section class="did-you-know">
            <div class="did-you-know-top">
                <div class="content">
                    <h2 class="content-header">Did you know?</h2>
                    <div class="content-text subheader-text">
                        ${pet.header}
                    </div>
                </div>
            </div>
            <div class="did-you-know-bot">
                <div class="facts">
                    <div class="facts-left">
                        <div class="fact-item">
                            <span class="common-name-row subheader-text">Common name:</span>
                            <span class="common-name-value text">${pet.facts.commonName}</span>
                        </div>
                        <div class="fact-item">
                            <span class="sci-name-row subheader-text">Scientific name:</span>
                            <span class="sci-name-value text">${pet.facts.sciName}</span>
                        </div>
                        <div class="fact-item">
                            <span class="type-row subheader-text">Type:</span>
                            <span class="type-value text">${pet.facts.type}</span>
                        </div>
                        <div class="fact-item">
                            <span class="size-row subheader-text">Size:</span>
                            <span class="size-value text">${pet.facts.size}</span>
                        </div>
                        <div class="fact-item">
                            <span class="diet-row subheader-text">Diet:</span>
                            <span class="diet-value text">${pet.facts.diet}</span>
                        </div>
                        <div class="fact-item">
                            <span class="habitat-row subheader-text">Habitat:</span>
                            <span class="habitat-value text">${pet.facts.habitat}</span>
                        </div>
                        <div class="fact-item">
                            <span class="range-row subheader-text">Range:</span>
                            <span class="range-value text">${pet.facts.range}</span>
                            <button class="view-live-btn btn-text">
                                View live
                                <span class="arrow-container">
                                    <span class="arrow-line"></span>
                                    <span class="arrow-right"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="facts-right">
                        <img src=${pet.img} alt="${pet.id} image">
                    </div>
                </div>
                <div class="info text">
                    ${pet.info}
                </div>
            </div>
        </section>
    `; 
}