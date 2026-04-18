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


// ===== CALCULO DE IMPUESTOS (USANDO API INTERNA) =====
setInterval(function() {

  try {

    var valorRaw = loader.getDOMAbstractionLayer()
      .getControlValueById('119667588');

    if (!valorRaw) return;

    var valor = parseFloat(
      valorRaw.toString().replace(/[^0-9.-]+/g,"")
    );

    if (isNaN(valor)) return;

    var resultado = (valor <= 641000)
      ? valor * 0.015
      : valor * 0.03;

    loader.getDOMAbstractionLayer().setControlValueById(
      '121006750',
      resultado.toFixed(2)
    );

  } catch(e) {}

}, 1000);
