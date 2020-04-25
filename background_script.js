list_pages = ['maldita.es', 'newtral.es']

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
		var msg = JSON.parse(request.msg);
		if(msg.funct == 'call'){
			call(msg.params)
		}
    }
);


function call(search){
	
	for(var lp=0; lp<list_pages.length; lp++) {
		var page = list_pages[lp];
		
		var search = 'algo'
		
		var xhr = new XMLHttpRequest();
		query = search.split(' ').join('+');
		xhr.open("GET", "https://www.google.es/search?as_q="+query+"&as_sitesearch="+page, true);
		
		xhr.onload = function (e) {
		  if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				
				var response = xhr.responseText;
				var res = document.createElement( 'div' );
				res.innerHTML = response
				data = res.querySelector("#search")
	
				var aNodes = data.querySelectorAll("a");
				
				var links = []
				for(var i=0; i<aNodes.length; i++) {
					for (var j=0; j<list_pages.length; j++){
						if(aNodes[i].href.startsWith('http') && aNodes[i].href.includes(list_pages[j]) && !aNodes[i].href.includes("webcache") ){
							console.log("SI ->"+aNodes[i].href)
							links.push(aNodes[i].href);
						}
					}
				}
				
				//**************************//
				//    AQUI VAN LOS LINKS    //
				//**************************//
				console.log(links)
				
			} else {
			  console.error(xhr.statusText);
			}
		  }
		};
		
		xhr.onerror = function (e) {
		  console.error(xhr.statusText);
		};
		
		xhr.send(null); 
	}
	
}