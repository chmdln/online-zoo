export function renderSidebar() {
    return `
        <div class="sidebar-collapsed">
            <div class="sidebar-top">
                <div class="live-badge-container">
                    <div>Live</div>
                    <img src="/assets/icons/live-badge.svg" alt="Live badge icon">
                </div>
                <div class="double-arrow-container">
                    <img 
                        src="/assets/icons/chevron-double.svg" alt="Double arrow chevron icon"
                        class="double-chevron"
                    >
                </div>
            </div>
            <div class="sidebar-viewport">
                <div class="sidebar-track"></div>
            </div>
            <div class="sidebar-bottom">
                <div class="single-arrow-container">
                    <img 
                        src="/assets/icons/chevron-down.svg" alt="Chevron icon"
                        class="down-chevron"
                    >
                </div>
            </div>
        </div>
        <div class="sidebar-expanded">
            <div class="sidebar-top">
                <div class="live-badge-container">
                    <div>Live</div>
                    <img src="/assets/icons/live-badge.svg" alt="Live badge icon">
                </div>
                <div class="double-arrow-container">
                    <img 
                        src="/assets/icons/chevron-double.svg" alt="Double arrow chevron icon"
                        class="double-chevron"
                    >
                </div>
            </div>
            <div class="sidebar-viewport">
                <div class="sidebar-track"></div>
            </div>
            <div class="sidebar-bottom">
                <div class="single-arrow-container">
                    <img 
                        src="/assets/icons/chevron-down.svg" alt="Chevron icon"
                        class="down-chevron"
                    >
                </div>
            </div>
        </div>    
    `; 
}
