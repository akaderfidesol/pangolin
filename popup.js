// Called when popup.html button is
document.getElementById('activate').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
        file: "content.js"
    });
});