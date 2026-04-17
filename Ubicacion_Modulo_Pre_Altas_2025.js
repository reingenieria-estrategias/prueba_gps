// ===== GEOLOCALIZACION =====
getLocation('119652394');

function getLocation(controlId) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            loader.getDOMAbstractionLayer().setControlValueById(controlId,
                position.coords.latitude + "," + position.coords.longitude
            );
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}


// ===== CALCULO DE IMPUESTOS =====
form.on('change', function(field) {

  var valor = parseFloat(form.getFieldValue('field_119667588')) || 0;
  var resultado;

  if (valor <= 641000) {
    resultado = valor * 0.015;
  } else {
    resultado = valor * 0.03;
  }

  form.setFieldValue('field_121006750', resultado.toFixed(2));

});
