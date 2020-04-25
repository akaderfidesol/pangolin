list_pages = ["newtral.es", "maldita.es"];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg.title) {
    call(request.msg.title);
  }
});

function getHTML(url, callback) {
  var request = new XMLHttpRequest();

  request.onload = function () {
    if (this.readyState == 4 && this.status == 200)
      callback(request.responseText);
  };

  request.open("GET", url, true);
  request.send(null);
}

function getArticleBody(response) {
  var content = document.createElement("div");
  content.innerHTML = response;
  var body = "";
  nodes = content.querySelectorAll("p, h1, h2, h3, h4, span");
  nodes.forEach(function (n) {
    body += n.textContent;
  });
  return body;
}

function call(search) {
  // query para el buscador de Google
  var query = search.split(" ").join("+");

  for (var lp = 0; lp < list_pages.length; lp++) {
    var page = list_pages[lp];
    var url = "https://www.google.es/search?as_q=" + query + "&as_sitesearch=" + page;
    console.log(url);

    getHTML(url, function (response) {
      var res = document.createElement("div");
      res.innerHTML = response;
      var data = res.querySelector("#search");
      var aNodes = data.querySelectorAll("a");
      var links = [];

      for (var i = 0; i < aNodes.length; i++) {
        for (var j = 0; j < list_pages.length; j++) {
          if (
            aNodes[i].href.startsWith("http") &&
            aNodes[i].href.includes(list_pages[j]) &&
            !aNodes[i].href.includes("webcache")
          ) {
            links.push(aNodes[i].href);
          }
        }
      }

      console.log(links)

      // Procesamiento del primer link
      var nlinks = 1;
      if (links.length > 0) {
        for (var i = 0; i < nlinks; i++) {
          getHTML(links[i], function (response) {
            var body = getArticleBody(response);
            console.log(body);
            // Abdul procesa el body
          });
        }
      } else {
        console.log("No results for article");
      }
    });
  }
}
