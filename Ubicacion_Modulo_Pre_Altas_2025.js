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


// ===== FORMATEO CAMPOS BASE =====
var ultimo = {};

setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  function limpiar(valor) {
    return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
  }

  var campos = [
    '121011482',
    '121011483',
    '121011484',
    '121011485',
    '121011560'
  ];

  campos.forEach(function(id){

    var actual = api.getControlValueById(id);

    if (!actual || ultimo[id] === actual) return;

    if (/[.,]$/.test(actual)) return;

    var numero = limpiar(actual);

    var formateado = numero.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });

    ultimo[id] = formateado;

    api.setControlValueById(id, formateado + '');

  });

}, 1500);
