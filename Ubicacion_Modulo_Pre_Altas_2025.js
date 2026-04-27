
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


// ===== FORMATEO AL SALIR DEL CAMPO =====
(function() {

  var api = loader.getDOMAbstractionLayer();

  function limpiar(valor) {
    return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
  }

  function formatear() {

    var valor = limpiar(api.getControlValueById('121011482'));

    var formateado = valor.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121011482', formateado + '');
  }

  // Esperar a que el campo exista
  setTimeout(function() {
    var input = document.querySelector('[id="id_121011482"] input');

    if (input) {
      input.addEventListener('blur', formatear);
    }
  }, 1000);

})();
