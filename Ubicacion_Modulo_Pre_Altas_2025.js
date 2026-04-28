
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


// ===== FORMATEO AL SALIR DEL CAMPO =====
setTimeout(function(){

  var input = document.querySelector('[id="id_121011482"] input');

  if (!input) return;

  input.addEventListener('blur', function(){

    var api = loader.getDOMAbstractionLayer();

    function limpiar(valor) {
      return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
    }

    var valor = limpiar(api.getControlValueById('121011482'));

    var formateado = valor.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121011482', formateado + '');

  });

}, 1500);
