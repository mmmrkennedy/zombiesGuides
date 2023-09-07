// Function to toggle dark mode by adding/removing the 'dark-mode' class from the <body> element
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Function to navigate to the index.html file in a parent directory
function navigateToIndex() {
    window.location.href = "../../../index.html";
}

// Function to navigate to the index.html file in a sibling directory
function navigateToIndexToDoList() {
    window.location.href = "../index.html";
}

// Function to scroll smoothly to the top of the page
function scrollToTop() {
    const targetY = 0; // Scroll to the top of the page
    const duration = 1000; // 1000 milliseconds (1 second) for the scroll animation
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const currentTimeElapsed = currentTime - startTime;
        if (currentTimeElapsed < duration) {
            window.scrollTo(0, easeInOutCubic(currentTimeElapsed, start, targetY - start, duration));
            requestAnimationFrame(scrollStep);
        } else {
            window.scrollTo(0, targetY);
        }
    }

    requestAnimationFrame(scrollStep);
}

// Font Selector functionality
const fontSelector = document.getElementById('fontSelector');
const smoothScroll = document.querySelector('.smooth-scroll');

// Event listener for font selector changes
fontSelector.addEventListener('change', () => {
    const selectedFont = fontSelector.value;

    // If 'OpenDyslexic' font is selected, add 'open-dyslexic' class to enable it; otherwise, remove the class
    if (selectedFont === 'OpenDyslexic') {
        smoothScroll.classList.add('open-dyslexic');
    } else {
        smoothScroll.classList.remove('open-dyslexic');
    }
});

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

        const duration = 500; // 500 milliseconds (0.5 second) for a faster scroll
        const start = window.scrollY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const currentTimeElapsed = currentTime - startTime;
            if (currentTimeElapsed < duration) {
                window.scrollTo(0, easeInOutCubic(currentTimeElapsed, start, targetY - start, duration));
                requestAnimationFrame(scrollStep);
            } else {
                window.scrollTo(0, targetY);
            }
        }

        requestAnimationFrame(scrollStep);
    }
}

// Easing function for faster scrolling (you can adjust this if needed)
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}


// Automatically enable dark mode when the site opens
toggleDarkMode();
