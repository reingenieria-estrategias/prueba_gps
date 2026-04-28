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


// ===== FORMATEO SIN INTERFERIR =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  var input = document.querySelector('#id_121011482 input');

  // 🔥 SI EL USUARIO ESTÁ ESCRIBIENDO → NO HACER NADA
  if (input && document.activeElement === input) return;

  function limpiar(valor) {
    return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
  }

  var actual = api.getControlValueById('121011482');

  if (!actual) return;

  var numero = limpiar(actual);

  var formateado = numero.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  if (actual !== formateado) {
    api.setControlValueById('121011482', formateado + '');
  }

}, 500);
