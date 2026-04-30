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


// ===== CALCULO DE IMPUESTOS + DIFERENCIA =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  // ===== VALOR TOTAL (campo fórmula) =====
  var valor = parseFloat(api.getControlValueById('121107880')) || 0;

  // ===== IMPUESTO =====
  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  api.setControlValueById('121103995', resultado.toFixed(2));


  // ===== DIFERENCIA =====
  var avaluo = parseFloat(api.getControlValueById('121104013')) || 0;
  var capacidad = parseFloat(api.getControlValueById('121110681')) || 0;
  var operacion = valor;

  // tomar el menor entre avalúo y capacidad
  var base = Math.min(avaluo, capacidad);

  // calcular diferencia
  var diferencia = operacion - base;

  // guardar resultado
  api.setControlValueById('121104026', diferencia);

}, 1000);
