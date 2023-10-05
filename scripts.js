/*
=======================================
LIGHT AND DARK MODE FUNCTIONALITIES
=======================================
*/

function toggleLightMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
}

document.addEventListener('DOMContentLoaded', function() {
    changeThemeColour();
});

function changeThemeColour(){
    const savedColorMode = localStorage.getItem('colourMode');
    if(savedColorMode === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

/*
=======================================
PRELOAD IMAGES AND VIDEOS
=======================================
*/

document.addEventListener('DOMContentLoaded', function() {
    // Preload Images
    if(localStorage.getItem('preload') === 'true') {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const anchors = [];

        imageExtensions.forEach(ext => {
            const foundAnchors = document.querySelectorAll(`a[href$="${ext}"]`);
            anchors.push(...foundAnchors);
        });

        anchors.forEach(anchor => {
            const image = new Image();
            image.src = anchor.href;
        });
    }
});

/*
=======================================
STORAGE EVENT LISTENERS
=======================================
*/

window.addEventListener('storage', function(event) {
    switch(event.key) {
        case 'preload':
            if(localStorage.getItem("preload") === 'true') {
                window.location.reload();
            }
            break;
        case 'colourMode':
            changeThemeColour();
            break;
        case 'substeps':
            substeps((localStorage.getItem("substeps") === 'true'), 1);
            if(localStorage.getItem("substeps") === 'true') {
                window.location.href = window.location.href.split("#")[0];
            }
            break;
        case 'close_setting_auto':
            break;
        default:
            console.log("Unknown Storage Event", event);
    }
});

/*
=======================================
NAVIGATION UTILITIES
=======================================
*/

function navigateToIndex() {
    window.location.href = "index.html";
}

function navigateToSettings() {
    window.open("settings/settings.html", "_blank");
}

/*
=======================================
SCROLL FUNCTIONS
=======================================
*/

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            const href = event.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const elementId = href.substring(1);
                scrollToElement(elementId, 100);
            }
        }
    });
});

function scrollToElement(elementId, offset) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const targetY = elementPosition + window.scrollY - offset;
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    }
}

/*
=======================================
FONT SELECTOR FUNCTIONALITIES
=======================================
*/

const fontSelector = document.getElementById('fontSelector');
const smoothScroll = document.querySelector('.smooth-scroll');
let path = window.location.pathname;
let page = path.split("/").pop();

if(page !== "index.html") {
    fontSelector.addEventListener('change', () => {
        const selectedFont = fontSelector.value;
        if (selectedFont === 'OpenDyslexic') {
            smoothScroll.classList.add('open-dyslexic');
        } else {
            smoothScroll.classList.remove('open-dyslexic');
        }
    });
}

/*
=======================================
MOBILE DETECTION AND HANDLING
=======================================
*/

function hasTouchScreen() {
    let hasTouchScreen;

    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            let UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    return hasTouchScreen;
}

function mobileCheck() {
    let check = hasTouchScreen();
    if (check) {
        document.getElementById('mobileContent').style.display = 'block';
        document.getElementById('nonMobileContent').style.display = 'none';
    } else {
        document.getElementById('mobileContent').style.display = 'none';
        document.getElementById('nonMobileContent').style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    mobileCheck();
});

/*
=======================================
HISTORY MANAGEMENT FOR ANCHOR LINKS
=======================================
*/

document.addEventListener('click', function(event) {
    var target = event.target;
    if (target.tagName.toLowerCase() === 'a' && target.hash) {
        window.history.pushState({hash: target.hash}, '', target.hash);
    }
});

window.addEventListener('popstate', function(event) {
    if (event.state && event.state.hash) {
        window.location.hash = event.state.hash;
    }
});


/*
=======================================
SUBSTEP FUNCTIONALITIES
=======================================
 */
function substeps(check, callid) {
    let displayStyle = 'block';
    if (check) {
        displayStyle = 'block';
    } else {
        displayStyle = 'none';
    }
    
    let i = 1;
    while(true) {
        try{
            document.getElementById('substeps' + i).style.display = displayStyle;
        } catch (e) {
            break;
        }
        i++;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    substeps((localStorage.getItem('substeps') === 'true'), 2);
});




