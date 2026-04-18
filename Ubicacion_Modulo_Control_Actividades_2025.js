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

  var lote = parseFloat(api.getControlValueById('119659971')) || 0;
  var mts = parseFloat(api.getControlValueById('119667582')) || 0;
  var precioMt2 = parseFloat(api.getControlValueById('119667584')) || 0;
  var costo = parseFloat(api.getControlValueById('119791015')) || 0;

  var valor = lote + (mts * precioMt2) + costo;

  if (!valor) return;

  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  api.setControlValueById('121006750', resultado.toFixed(2));

}, 1000);
