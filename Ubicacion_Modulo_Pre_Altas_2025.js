// ===== GEOLOCALIZACION =====
getLocation('119652394');

function getLocation(controlId) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            loader.getDOMAbstractionLayer().setControlValueById(
                controlId,
                position.coords.latitude + "," + position.coords.longitude
            );
        });
    }
}


// ===== CALCULO DE IMPUESTOS =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  var valor = parseFloat(api.getControlValueById('121107880')) || 0;

  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  api.setControlValueById('121103995', resultado.toFixed(2));

}, 1000);
