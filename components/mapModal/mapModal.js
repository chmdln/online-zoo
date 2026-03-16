export function renderMapModal() {
    return `
        <div class="map-modal-overlay" id="mapModalOverlay">
            <div class="map-modal">
                <button class="map-modal-close" id="mapModalClose">✕</button>
                <div id="mmap"></div>
            </div>
        </div>
    `;
}
