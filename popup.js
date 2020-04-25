// Called when popup.html button is
document.getElementById('activate').addEventListener('click', function() {
    document.querySelector("#results").innerHTML = ''
    chrome.tabs.executeScript(null, {
        file: "content.js"
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.data){

        var data = request.data;
        var fake = data.score;

        //if (fake === true) {
            var results = document.querySelector("#results");
            var li = results.querySelector("li");
            console.log(results);
            

            if (li === null){
                li = document.createElement("li")
            }

            var child = document.createElement("li");
            child.innerHTML = child.innerHTML  + `<div class="fakeNewSite"><p>Possible fake new detected: <a target="_blank" href=${data.link}>${data.name}</a><p>Data debug: ${data.score}%</p></p> </div>`
            li.appendChild(child)
            console.log(fake);
            results.innerHTML = li.innerHTML;
        //}
    }
});