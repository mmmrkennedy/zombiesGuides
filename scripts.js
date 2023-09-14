// Function to toggle dark mode by adding/removing the 'dark-mode' class from the <body> element
function toggleLightMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
}

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

// Function to navigate to a specific URL
function navigateToIndex() {
    window.location.href = "/zombiesGuides/index.html";
}

// Function to scroll to the top of the page smoothly
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
var path = window.location.pathname;
var page = path.split("/").pop();

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



/* Mobile Detection */
function hasTouchScreen() {
    var hasTouchScreen = false;

    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    return hasTouchScreen;
}

function mobileCheck() {
    var check = hasTouchScreen();

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

/* Hover Image
document.addEventListener("DOMContentLoaded", function() {

    let imageHoverEnabled = localStorage.getItem('image-hover');
    if (imageHoverEnabled === 'false') {  // Again, check against the string 'false'
        return;  // Exit if image hover is disabled
    }

    const links = document.querySelectorAll(".hover-image");
    const popup = document.createElement("img");
    popup.id = "popup-image";
    popup.style.position = "fixed";
    document.body.appendChild(popup);

    let hideTimeout;

    let currentLink = null;  // To keep track of the currently hovered link

    links.forEach(function(link) {
        link.addEventListener("mouseover", function() {
            currentLink = this;  // Set the currently hovered link
            clearTimeout(hideTimeout);  // Clear any existing timeout to hide the image
            popup.src = this.href;

            const IMG_WIDTH_PERCENT = 0.95;  // For 95% of screen width
            const IMG_HEIGHT_PERCENT = 1; // For 100% of screen height

            popup.onload = function() {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;

                const aspectRatio = popup.naturalWidth / popup.naturalHeight;
                let imgWidth = screenWidth * IMG_WIDTH_PERCENT;
                let imgHeight = imgWidth / aspectRatio;

                if (imgHeight > screenHeight * IMG_HEIGHT_PERCENT) {
                    imgHeight = screenHeight * IMG_HEIGHT_PERCENT;
                    imgWidth = imgHeight * aspectRatio;
                }

                popup.style.width = imgWidth + "px";
                popup.style.height = imgHeight + "px";
                popup.style.top = (screenHeight - imgHeight) / 2 + "px";
                popup.style.right = "0px";

                popup.style.display = "block";
            }

        });

        let mouseX = 0;
        let mouseY = 0;

        // Update mouse coordinates on movement
        document.addEventListener("mousemove", function(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function checkMousePosition() {
            if (currentLink) {
                const rect = currentLink.getBoundingClientRect();

                if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
                    // Mouse is outside the coordinates of the link
                    popup.style.display = "none";
                    currentLink = null;  // Reset the currently hovered link
                }
            }

            // Request the next frame
            requestAnimationFrame(checkMousePosition);
        }

        // Start the loop
        requestAnimationFrame(checkMousePosition);
    });
});

*/
