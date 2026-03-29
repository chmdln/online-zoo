export function renderQuickDonateSection(petId) {
    const BASE_PATH = window.location.hostname === '127.0.0.1' 
        ? '/front/src' 
        : '/front/src';

    const quickDonateData = {
        "1": {
            header: 'make the Bamboo Donation!',
            subheader: 'Our process for bamboo donations first starts with a site evaluation. It is important that our team sees where the bamboo is growing, then determining if the bamboo is a species that our animals are currently eating. Thank you for your interest in donating bamboo for our pandas.'  
        },
        "2": {
            header: 'Provide Andy the lemur with fruits!',
            subheader: 'More than 90% of lemur species are endangered and might face extinction in the nearest future. Watch the ring-tailed lemurs play and climb in this soothing setting and support them by donating for the fruits they adore.'
        },
        "3": {
            header: 'Make a difference for the gorillas!',
            subheader: 'It is our goal to ensure the conservation and restoration of the gorilla population and their habitat in Central Africa. To do this, we need your help! Bring your food charity straight to Glen and his family.'
        },
        "5": {
            header: 'Keep the Bald Eagle cams Streaming!',
            subheader: 'Watch as this lifelong pair of eagle parents lay and protect eggs, feed their chicks and teach them to hunt and fly. Sam & Lora have stolen the hearts of thousands of viewers! 100% of the donations from this page will be utilized directly for the streaming and operational costs of this project.'
        }
    }

    const data = quickDonateData[petId] || quickDonateData["1"];
    const header = data.header;
    const subheader = data.subheader;
    
    return `
        <section class="donate">
            <div class="donate-left">
                <h2 class="donate-left-header">${header}</h2>
                <div class="donate-left-content">${subheader}</div>
            </div>
            <div class="donate-right">
                <div class="donate-right-header">Quick Donate</div>
                <div class="btn-primary">
                    <div class="donate-right-btn-text">
                        $ Donation amount 
                    </div>
                    <div class="donate-right-btn-img">
                        <img src="../../../src/assets/icons/arrow.svg" alt="Arrow icon">
                    </div>
                </div>
            </div>
        </section>
    `; 
}


