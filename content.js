// content.js
function getNewProperties() {
    var title = document.querySelector('meta[property="og:title"]').getAttribute("content")
    var description = document.querySelector('meta[property="og:description"]').getAttribute("content")
    return {
        title:title,
        description: description
    }
}

var properties = getNewProperties()

alert("Title: " + properties.title + " Description: " + properties.description)

var msg = '{"funct":"call", "params":"'+properties.title+'"}';

chrome.runtime.sendMessage({ msg: msg });