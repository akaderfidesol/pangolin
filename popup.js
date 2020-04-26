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

            var results = document.querySelector("#results");
            var li = results.querySelector("li");
            console.log(results);
            

            if (li === null){
                li = document.createElement("li")
            }

            var child = document.createElement("li");
            child.innerHTML = child.innerHTML  + `<div class="fakeNewSite"><p><img src="redcheck.png"> Possible fake new detected: <a target="_blank" href=${data.link}>${data.name}</a></p> </div>`
            li.appendChild(child)
            console.log(fake);
            results.innerHTML = li.innerHTML;
    }
    else{
        var results = document.querySelector("#results");
        var span = results.querySelector("span");

        if (span === null){
                span = document.createElement("span")
            }

            span.innerHTML =  `<div class="noFake"><img src="greencheck.png"><h2>No fake detected</h2> </div>`;

            results.innerHTML = span.innerHTML;

    }
    if (request.info) {
        var info = request.info;
        var count = info.count;

        console.log(info);



        /*

        if (count === 2) {
            var results = document.querySelector("#results");
            var fakeNews = results.querySelector(".fakeNewSite");

            if (fakeNews === null) {
                var child = document.createElement("li");
                child.innerHTML = child.innerHTML  + `<div class="fakeNewSite"><p>No Fake New</p> </div>`
                fakeNews.appendChild(child)
                console.log(fake);
                results.innerHTML = li.innerHTML;
            }
        }*/

    }
});