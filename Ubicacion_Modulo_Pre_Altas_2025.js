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


// ===== CALCULO GENERAL =====
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


  // ===============================
  // 🔥 VALIDACION DE PAGOS
  // ===============================

  var preliminar = parseFloat(api.getControlValueById('121115230')) || 0;

  var sumaPagos = (
    (parseFloat(api.getControlValueById('121104047')) || 0) +
    (parseFloat(api.getControlValueById('121104048')) || 0) +
    (parseFloat(api.getControlValueById('121104049')) || 0) +
    (parseFloat(api.getControlValueById('121104051')) || 0) +
    (parseFloat(api.getControlValueById('121104053')) || 0) +
    (parseFloat(api.getControlValueById('121104054')) || 0) +
    (parseFloat(api.getControlValueById('121104055')) || 0) +
    (parseFloat(api.getControlValueById('121104056')) || 0) +
    (parseFloat(api.getControlValueById('121104058')) || 0) +
    (parseFloat(api.getControlValueById('121104059')) || 0) +
    (parseFloat(api.getControlValueById('121104060')) || 0) +
    (parseFloat(api.getControlValueById('121104061')) || 0)
  );

  var mensaje = "";

  // 🔥 REDONDEO DIRECTO EN MENSAJE (SOLUCION DEFINITIVA)
  var diferencia = Math.round((preliminar - sumaPagos) * 100) / 100;

  if (diferencia > 0) {
    mensaje = "Faltan $" + diferencia.toFixed(2) + " por asignar";
  } else if (diferencia < 0) {
    mensaje = "Hay $" + Math.abs(diferencia).toFixed(2) + " de más en los pagos";
  } else {
    mensaje = "Cantidad completa registrada";
  }

  // 🔥 FIX TIMING
  setTimeout(function() {
    api.setControlValueById('121118452', mensaje);
  }, 150);

}, 1000);
