function toggleLightMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
}

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('preload') === 'true') {
        // Select all anchor tags with href attributes ending with common image types
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

window.addEventListener('storage', function(event) {
    if (event.key === 'preload' || event.key === 'colorMode' || event.key === 'preloadvideo') {
        location.reload();  // Reload the current page
    }
});



document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('preloadvideo') === 'true') {
        // Select all anchor tags with href attributes ending with ".mp4"
        const videoAnchors = document.querySelectorAll('a[href$=".mp4"]');

        videoAnchors.forEach(anchor => {
            // Create a video element and source element to trigger the preload
            const video = document.createElement('video');
            video.preload = "auto";  // Hint the browser to preload the entire video
            const source = document.createElement('source');

            source.src = anchor.href;
            source.type = 'video/mp4';

            video.appendChild(source);

            // Optional: Append the video to the body if you want it to be visible
            //document.body.appendChild(video);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const savedColorMode = localStorage.getItem('colorMode');
    if(savedColorMode === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});

function navigateToIndex() {
    window.location.href = "/zombiesGuides/index.html";
}

function navigateToSettings() {
    window.open("/zombiesGuides/settings/settings.html", "_blank");
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Font Selector functionality
const fontSelector = document.getElementById('fontSelector');
const smoothScroll = document.querySelector('.smooth-scroll');

// Event listener for font selector changes
let path = window.location.pathname;
let page = path.split("/").pop();

if(page !== "index.html") {
    fontSelector.addEventListener('change', () => {
        const selectedFont = fontSelector.value;

        // If 'OpenDyslexic' font is selected, add 'open-dyslexic' class to enable it; otherwise, remove the class
        if (selectedFont === 'OpenDyslexic') {
            smoothScroll.classList.add('open-dyslexic');
        } else {
            smoothScroll.classList.remove('open-dyslexic');
        }
    });
}

// Event listener for anchor clicks inside the HTML element with the class 'smooth-scroll'
document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to the document
    document.addEventListener('click', function (event) {
        // Check if the clicked element is an anchor (<a> tag)
        if (event.target.tagName === 'A' || event.target.tagName === 'a') {
            // Get the value of the 'href' attribute of the clicked anchor element
            const href = event.target.getAttribute('href');

            // Check if the 'href' value starts with '#' (indicating an internal page link)
            if (href && href.startsWith('#')) {
                // Prevent the default behavior of the anchor link (prevents jumping to a new page)
                event.preventDefault();

                // Extract the element ID from the 'href' by removing the '#' character
                const elementId = href.substring(1);

                // Scroll to the element on the page with an offset of 100 pixels using window.scrollBy
                scrollToElement(elementId, 100);
            }
        }
    });
});

// Function to scroll smoothly to a specific HTML element by its ID with an offset
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

/* Mobile Detection */
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
        // Show the mobile content and hide the non-mobile content
        document.getElementById('mobileContent').style.display = 'block';
        document.getElementById('nonMobileContent').style.display = 'none';
    } else {
        // Hide the mobile content and show the non-mobile content
        document.getElementById('mobileContent').style.display = 'none';
        document.getElementById('nonMobileContent').style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    mobileCheck();
});

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






