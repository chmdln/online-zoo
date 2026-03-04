export function renderSidebar() {
    return `
        <div class="sidebar-collapsed">
            <div class="sidebar-top">
                <div class="live-badge-container">
                    <div>Live</div>
                    <img src="../../assets/icons/live-badge.svg" alt="Live badge icon">
                </div>
                <div class="double-arrow-container">
                    <div class="arrow-right"></div>
                    <div class="arrow-right"></div>
                </div>
            </div>
            <div class="sidebar-viewport">
                <div class="sidebar-track">
                    <div class="sidebar-item" data-pet="panda">
                        <img src="../../assets/icons/panda-sidebar.svg" alt="Panda icon" class="default">
                        <img src="../../assets/icons/panda-sidebar-active.svg" alt="Panda icon" class="default-active">
                        <img src="../../assets/icons/panda-sidebar-exp.svg" alt="Panda icon" class="default-small">
                        <img src="../../assets/icons/panda-sidebar-exp-active.svg" alt="Panda icon" class="default-small-active">
                    </div>
                    <div class="sidebar-item" data-pet="eagle">
                        <img src="../../assets/icons/eagle-sidebar.svg" alt="Eagle icon" class="default">
                        <img src="../../assets/icons/eagle-sidebar-active.svg" alt="Eagle icon" class="default-active">
                        <img src="../../assets/icons/eagle-sidebar-exp.svg" alt="Eagle icon" class="default-small">
                        <img src="../../assets/icons/eagle-sidebar-exp-active.svg" alt="Eagle icon" class="default-small-active">
                    </div>
                    <div class="sidebar-item" data-pet="gorilla">
                        <img src="../../assets/icons/gorilla-sidebar.svg" alt="Gorilla icon" class="default">
                        <img src="../../assets/icons/gorilla-sidebar-active.svg" alt="Gorilla icon" class="default-active">
                        <img src="../../assets/icons/gorilla-sidebar-exp.svg" alt="Gorilla icon" class="default-small">
                        <img src="../../assets/icons/gorilla-sidebar-exp-active.svg" alt="Gorilla icon" class="default-small-active">
                    </div>
                    <div class="sidebar-item" data-pet="lemur">
                        <img src="../../assets/icons/lemur-sidebar.svg" alt="Lemur icon" class="default">
                        <img src="../../assets/icons/lemur-sidebar-active.svg" alt="Lemur icon" class="default-active">
                        <img src="../../assets/icons/lemur-sidebar-exp.svg" alt="Lemur icon" class="default-small">
                        <img src="../../assets/icons/lemur-sidebar-exp-active.svg" alt="Lemur icon" class="default-small-active">
                    </div> 
                    <div class="sidebar-item" data-pet="koala">
                        <img src="../../assets/icons/koala-sidebar.svg" alt="Koala icon" class="default">
                        <img src="../../assets/icons/koala-sidebar-active.svg" alt="Koala icon" class="default-active">
                        <img src="../../assets/icons/koala-sidebar-exp.svg" alt="Koala icon" class="default-small">
                        <img src="../../assets/icons/koala-sidebar-exp-active.svg" alt="Koala icon" class="default-small-active">
                    </div>
                    <div class="sidebar-item" data-pet="lion">
                        <img src="../../assets/icons/lion-sidebar.svg" alt="Lion icon" class="default">
                        <img src="../../assets/icons/lion-sidebar-active.svg" alt="Lion icon" class="default-active">
                        <img src="../../assets/icons/lion-sidebar-exp.svg" alt="Lion icon" class="default-small">
                        <img src="../../assets/icons/lion-sidebar-exp-active.svg" alt="Lion icon" class="default-small-active">
                    </div> 
                    <div class="sidebar-item" data-pet="alligator">
                        <img src="../../assets/icons/alligator-sidebar.svg" alt="Alligator icon" class="default">
                        <img src="../../assets/icons/alligator-sidebar-active.svg" alt="Alligator icon" class="default-active">
                        <img src="../../assets/icons/alligator-sidebar-exp.svg" alt="Alligator icon" class="default-small">
                        <img src="../../assets/icons/alligator-sidebar-exp-active.svg" alt="Alligator icon" class="default-small-active">
                    </div>
                    <div class="sidebar-item" data-pet="tiger">
                        <img src="../../assets/icons/tiger-sidebar.svg" alt="Tiger icon" class="default">
                        <img src="../../assets/icons/tiger-sidebar-active.svg" alt="Tiger icon" class="default-active">
                        <img src="../../assets/icons/tiger-sidebar-exp.svg" alt="Tiger icon" class="default-small">
                        <img src="../../assets/icons/tiger-sidebar-exp-active.svg" alt="Tiger icon" class="default-small-active">
                    </div>
                </div>
            </div>
            <div class="sidebar-bottom">
                <div class="single-arrow-container">
                    <div class="arrow-right"></div>
                </div>
            </div>
        </div>
        <div class="sidebar-expanded">
            <div class="sidebar-top">
                <div class="live-badge-container">
                    <div>Live</div>
                    <img src="../../assets/icons/live-badge.svg" alt="Live badge icon">
                </div>
                <div class="double-arrow-container">
                    <div class="arrow-right"></div>
                    <div class="arrow-right"></div>
                </div>
            </div>
            <div class="sidebar-viewport">
                <div class="sidebar-track">
                    <div class="sidebar-item" data-pet="panda">
                        <img 
                            src="../../assets/icons/panda-sidebar-exp.svg" 
                            alt="Panda white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/panda-sidebar-exp-active.svg" 
                            alt="Panda white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            Watch live from China's  Panda Center 
                        </div>
                    </div>
                    <div class="sidebar-item" data-pet="eagle">
                        <img 
                            src="../../assets/icons/eagle-sidebar-exp.svg" 
                            alt="Eagle white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/eagle-sidebar-exp-active.svg" 
                            alt="Eagle white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            Watch The Bald Eagles Nest from West End cam 
                        </div>
                    </div>
                    <div class="sidebar-item" data-pet="gorilla">
                        <img 
                            src="../../assets/icons/gorilla-sidebar-exp.svg" 
                            alt="Gorilla white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/gorilla-sidebar-exp-active.svg" 
                            alt="Gorilla white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            Livestream from Gorilla Forest Corridor habitat cam 
                        </div>
                    </div>
                    <div class="sidebar-item" data-pet="lemur">
                        <img 
                            src="../../assets/icons/lemur-sidebar-exp.svg" 
                            alt="Lemur white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/lemur-sidebar-exp-active.svg" 
                            alt="Lemur white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            The ring-tailed lemurs play in Madagascar, Lemuria Land 
                        </div>
                    </div>
                    <div class="sidebar-item" data-pet="koala">
                        <img 
                            src="../../assets/icons/koala-sidebar-exp.svg"
                            alt="Koala white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/koala-sidebar-exp-active.svg"
                            alt="Koala white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            Watch the koalas nap and snack in Australia. 
                        </div>
                    </div>
                    <div class="sidebar-item" data-pet="lion">
                        <img 
                            src="../../assets/icons/lion-sidebar-exp.svg" 
                            alt="Lion white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/lion-sidebar-exp-active.svg" 
                            alt="Lion white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            See the lions roam the golden plains of Kenya. 
                        </div>
                    </div>
                    <div class="sidebar-item" data-pet="alligator">
                        <img 
                            src="../../assets/icons/alligator-sidebar-exp.svg" 
                            alt="Alligator white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/alligator-sidebar-exp-active.svg" 
                            alt="Alligator white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            Spot the alligators glide through the wetlands of Florida.
                        </div>
                    </div>
                    <div class="sidebar-item" data-pet="tiger">
                        <img 
                            src="../../assets/icons/tiger-sidebar-exp.svg" 
                            alt="Tiger white icon"
                            class="default"
                        >
                        <img 
                            src="../../assets/icons/tiger-sidebar-exp-active.svg" 
                            alt="Tiger white icon"
                            class="active"
                        >
                        <div class="sidebar-item-text text">
                            Observe the tigers prowl and India’s lush Ranthambore National Park.
                        </div>
                    </div>
                </div>
            </div>
            <div class="sidebar-bottom">
                <div class="single-arrow-container">
                    <div class="arrow-right"></div>
                </div>
            </div>
        </div>
    
    `; 
}


