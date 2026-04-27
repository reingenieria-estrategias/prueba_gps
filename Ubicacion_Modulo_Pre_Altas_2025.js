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


// ===== FORMATEO ESTABLE MISMO CAMPO =====
var ultimo = '';

setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  function limpiar(valor) {
    return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
  }

  var actual = api.getControlValueById('121011482');

  // evitar loop innecesario
  if (!actual || actual === ultimo) return;

  // evitar formatear mientras escribe (si termina en punto o coma)
  if (/[.,]$/.test(actual)) return;

  var numero = limpiar(actual);

  var formateado = numero.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  ultimo = formateado;

  api.setControlValueById('121011482', formateado + '');

}, 700);
