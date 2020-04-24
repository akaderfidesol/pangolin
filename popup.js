document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('activate');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab){
            //METER LLAMADA AL PROCESO AQUí
            alert("PANGOLIN FUNCIONANDO EN ESTA PÁGINA");
        });
    },false );
}, false);