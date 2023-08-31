function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

function navigateToIndex() {
    window.location.href = "../../../index.html";
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function scrollToElement(elementId, offset) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - offset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}


// Event listener for anchor clicks inside .content-container-top
document.querySelector('.smooth-scroll').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        const href = event.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            event.preventDefault();
            const elementId = href.substring(1); // Remove the '#' from the href
            scrollToElement(elementId, 100); // Scroll to the element with an offset of 100px
        }
    }
});



// Automatically run toggleDarkMode() when the site opens
toggleDarkMode();
