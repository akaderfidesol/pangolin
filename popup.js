// Called when popup.html button is
document.getElementById('activate').addEventListener('click', function() {
    document.querySelector("#results").innerHTML = ''
    chrome.tabs.executeScript(null, {
        file: "content.js"
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.data){
        var data = request.data
        var results = document.querySelector("#results");
        var ul = results.querySelector("ul");

        if (!ul)
            ul = document.createElement("ul")
        
        var child = document.createElement("li");
        child.innerHTML = `<a target="_blank" href=${data.link}>${data.name}</a>${data.score}`
        ul.appendChild(child)

        results.innerHTML = ul.innerHTML;
    }
});