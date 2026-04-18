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
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}


// ===== CALCULO DE IMPUESTOS (FORZADO DESDE DOM) =====
setInterval(function() {

  var campoValor = document.querySelector('[name="field_119667588"]');
  var campoImpuesto = document.querySelector('[name="field_121006750"]');

  if (!campoValor || !campoImpuesto) return;

  var valorRaw = campoValor.value;
  if (!valorRaw) return;

  var valor = parseFloat(
    valorRaw.toString().replace(/[^0-9.-]+/g, "")
  );

  if (isNaN(valor)) return;

  var resultado;

  if (valor <= 641000) {
    resultado = valor * 0.015;
  } else {
    resultado = valor * 0.03;
  }

  campoImpuesto.value = resultado.toFixed(2);

}, 1000);
