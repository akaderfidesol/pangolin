// content.js
// no used at the moment
chrome.storage.local.get('enabled', data => {
    if (data.enabled) {
        //it is enabled, do accordingly
    } else {
        //it is disabled
    }
});