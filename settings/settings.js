document.addEventListener('DOMContentLoaded', function() {
    const colourModeSelect = document.getElementById('colourMode');
    const preloadInput = document.getElementById('preload');
    const preloadvideoInput = document.getElementById('preloadvideo');

    // Load and set values from local storage
    const savedColorMode = localStorage.getItem('colourMode');
    const savedPreloadValue = (localStorage.getItem('preload') === 'true');
    const savedPreloadvideoValue = (localStorage.getItem('preloadvideo') === 'true');

    if (savedColorMode) {
        colourModeSelect.value = savedColorMode;
    }

    preloadInput.checked = savedPreloadValue;
    preloadvideoInput.checked = savedPreloadvideoValue;

    // Save button click event listener
    const saveButton = document.querySelector('button');
    saveButton.addEventListener('click', function() {
        const colourModeValue = colourModeSelect.value;
        const preloadValue = preloadInput.checked;
        const preloadvideoValue = preloadvideoInput.checked;

        // Save values to local storage
        localStorage.setItem('colourMode', colourModeValue);
        localStorage.setItem('preload', preloadValue.toString());
        localStorage.setItem('preloadvideo', preloadvideoValue.toString());

        checkSettingsSaved(colourModeValue, preloadValue.toString(), preloadvideoValue.toString());
    });
});

function checkSettingsSaved(colourModeValue, preloadValue, preloadvideoValue) {
    if(colourModeValue === localStorage.getItem('colourMode') && preloadValue === localStorage.getItem('preload') && preloadvideoValue === localStorage.getItem('preloadvideo')) {
        changeText("Settings Saved!");
    } else {
        changeText("Settings Failed to Save! Please try again.");
    }
}

function changeText(text) {
    var paragraph = document.getElementById('saveSettingsText');
    paragraph.innerText = text;

    setTimeout(function() {
        paragraph.innerText = '';
    }, 3000); // 3000 milliseconds or 3 seconds
}


document.addEventListener('DOMContentLoaded', function() {
    const savedColorMode = localStorage.getItem('colourMode');
    if(savedColorMode === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});

window.addEventListener('storage', function(event) {
    if (event.key === 'preload' || event.key === 'colorMode' || event.key === 'preloadvideo') {
        console.log('Storage event detected!')
        location.reload();  // Reload the current page
    }
});