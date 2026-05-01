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

  // ===== VALOR TOTAL =====
  var valor = parseFloat(api.getControlValueById('121107880')) || 0;

  // ===== IMPUESTO =====
  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  api.setControlValueById('121103995', resultado.toFixed(2));


  // ===== DIFERENCIA =====
  var avaluo = parseFloat(api.getControlValueById('121104013')) || 0;
  var capacidad = parseFloat(api.getControlValueById('121110681')) || 0;

  var base = Math.min(avaluo, capacidad);
  var diferencia = valor - base;

  var tipo = '';

  if (diferencia > 0) {
    tipo = 'EN CONTRA';
  } else if (diferencia < 0) {
    tipo = 'A FAVOR';
  } else {
    tipo = 'SIN DIFERENCIA';
  }

  var diferenciaAbs = Math.abs(diferencia);

  api.setControlValueById('121104026', diferenciaAbs);
  api.setControlValueById('121114371', tipo);


  // ===============================
  // 🔥 BLOQUE FINANCIERO
  // ===============================

  var separacion = parseFloat(api.getControlValueById('121104033')) || 0;

  if (tipo === 'EN CONTRA') {

    var diferenciaAjustada = diferenciaAbs - separacion;

    if (diferenciaAjustada < 0) diferenciaAjustada = 0;

    var tope = valor * 0.03;

    var engancheFinanciar = 0;

    if (diferenciaAjustada <= tope) {
      engancheFinanciar = diferenciaAjustada * 0.5;
    } else {
      engancheFinanciar = tope;
    }

    var engancheNo = diferenciaAjustada - engancheFinanciar;

    api.setControlValueById('121104042', engancheFinanciar);
    api.setControlValueById('121104038', engancheNo);
    api.setControlValueById('121104041', separacion + engancheNo);

  } else {

    api.setControlValueById('121104042', 0);
    api.setControlValueById('121104038', 0);
    api.setControlValueById('121104041', 0);
  }

}, 1000);
