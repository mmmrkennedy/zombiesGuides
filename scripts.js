// Function to toggle dark mode by adding/removing the 'dark-mode' class from the <body> element
function toggleDarkMode() {
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
