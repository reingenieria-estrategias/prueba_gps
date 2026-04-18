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


// ===== PRUEBA DE ESCRITURA EN IMPUESTOS =====
setInterval(function() {

  try {
    loader.getDOMAbstractionLayer().setControlValueById(
      '121006750',
      '9999'
    );
  } catch(e) {}

}, 2000);
