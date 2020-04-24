/*document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('activate');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab){
            //METER LLAMADA AL PROCESO AQUí
            alert("PANGOLIN FUNCIONANDO EN ESTA PÁGINA");
        });
    },false );
}, false);
*/

//Calling button using storage
document.getElementById('activate').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
        chrome.storage.local.set({ action: 'executeCode' });
    });
});