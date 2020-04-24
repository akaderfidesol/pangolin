// content.js
alert("Hello from your Chrome extension!")

chrome.storage.local.get('enabled', data => {
    if (data.enabled) {
        //it is enabled, do accordingly
    } else {
        //it is disabled
    }
});