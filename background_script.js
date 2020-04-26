list_pages = ["newtral.es", "maldita.es"];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg.title) {
    call(request.msg.title);
  }
});

function updateHTML(data) {
  chrome.runtime.sendMessage({ data: data});
}

function getHTML(url, callback) {
  var request = new XMLHttpRequest();

  request.onload = function () {
    if (this.readyState == 4 && this.status == 200)
      callback(request);
  };

  request.open("GET", url, true);
  request.send(null);
}

function getArticleBody(response) {
  var content = document.createElement("div");
  content.innerHTML = response.responseText;
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
    //console.log(url);

    getHTML(url, function (response) {
      var res = document.createElement("div");
      res.innerHTML = response.responseText;
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

      //console.log(links)

      // Procesamiento del primer link
      var nlinks = 1;
      var result;
      console.log(links.length);

      if (links.length > 0) {
        for (var i = 0; i < nlinks; i++) {
        	console.log(links[i]);
          getHTML(links[i], function (response) {
            var body = getArticleBody(response);
            var linkA =  response.responseURL;
            // Abdul procesa el body
            console.log("Link: "+links[i]);
            result = algoritm(body, search);
            console.log(result);

            var domainName = linkA.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
            var fake;
            

            var roundDecimal = round(result.percent, 2);

            updateHTML({
		        name: domainName,
		        link: linkA,
		        score: roundDecimal
	        })
            

            

          });
        }
      } else {
        console.log("No results for article");
      }
    });
  }
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function algoritm(text, keywords, threshold = {
    min: 3,
    max: 5
}) {
    var completeKeywInText = searchCompleteText(text, keywords);
    var textLength = 0;
    var percent = 0;
    var keys = 0;
    var badKeys = 0;
    var textSplited = 0;
    var matchWords = 0;


    if (completeKeywInText === 0) {
        //cambiamos a minúsculas todo el texto
        keywords = keywords.toLowerCase();
        text = text.toLowerCase();


        //extraemos los carácteres innecesarios
        keys = keywords.split(/[-+, .]/);

        //eliminamos elementos duplicados en el array
        keys = keys.filter(onlyUnique);

        //badKeys = ["de","el","la","lo","le","en","que","a","e","y","o","u","ha","se","del","con","más"];
        //console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            //console.log(i+ ": "+ keys[i].length);
            if (keys[i].length <= 2) {
                keys[i] = "";

            }

        }
        //console.log(keys);

        textSplited = text.split(/[-+, .]/);

        //cantidad de palabras que coinciden
        for (var i = 0; i < textSplited.length; i++) {
            for (var j = 0; j < keys.length; j++) {
                if (keys[j] == textSplited[i] && keys[j] != "") {
                    matchWords++;
                }
            }
        }

        textLength = textSplited.length;
        percent = (matchWords * 100) / textLength;


    } else {
        percent = 100;
    }

    var isFake = false;
    if (percent < threshold['min']) {
        isFake = false;
    } else if (percent > threshold['min'] && percent < threshold['max']) {
        isFake = false;
    } else if (percent > threshold['max']) {
        isFake = true;
    } else {
        isFake = false;
        console.error("Error en comparaciones. Probablemente de código.")
    }

    // Determinamos la escala del bulo
		    if (percent < 3) {
		    	console.log("No es bulo");
		    }
		    else if (percent >= 3 && percent <= 5){
		    	console.log("Posible bulo");
		    }
		    else if (percent > 5) {
		    	console.log("Es bulo.");
		    }

		    if (completeKeywInText === 1) {
		    	console.log("el título existe en la descripción de forma exacta, por lo que se considera bulo.");
		    }

		    console.log("------Información de las variables--------");
		    console.log("Coincidencias en keywords: "+matchWords);
		    console.log("Porcentaje de coincidencias: "+percent+"%");
		    console.log(keys);
		    console.log(textSplited);


    return {
        percent: percent,
        completeKeywInText: completeKeywInText,
        matchWords: matchWords,
        keys: keys,
        textSplited: textSplited,
        isFake: isFake,
    };
}


// Función para extraer elementos duplicados
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


// Función para buscar el título completo en el texto.
function searchCompleteText(text, keywords) {
    var result;

    text = text.toLowerCase();
    keywords = keywords.toLowerCase();

    if (text.includes(keywords) == true) {
        result = 1;

    } else {
        result = 0;
    }
    return result;

}
