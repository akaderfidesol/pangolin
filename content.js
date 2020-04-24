// content.js

chrome.storage.onChanged.addListener(function(changes) {
    var action = changes['activate'];
    if(action.newValue === 'executeCode') {
                //LLAMADA A CODIGO AQUI
        alert('Botón Pangolin activado');
    }
});