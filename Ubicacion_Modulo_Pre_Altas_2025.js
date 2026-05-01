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
  var diferenciaCalc = valor - base;

  var tipo = '';

  if (diferenciaCalc > 0) {
    tipo = 'EN CONTRA';
  } else if (diferenciaCalc < 0) {
    tipo = 'A FAVOR';
  } else {
    tipo = 'SIN DIFERENCIA';
  }

  var diferenciaAbs = Math.abs(diferenciaCalc);

  api.setControlValueById('121104026', diferenciaAbs);
  api.setControlValueById('121114371', tipo);


  // ===============================
  // 🔥 SALDO A FAVOR
  // ===============================
  if (tipo === 'A FAVOR') {
    api.setControlValueById('121104063', diferenciaAbs.toFixed(2));
  } else {
    api.setControlValueById('121104063', 0);
  }


  // ===============================
  // 🔥 DISTRIBUCION SALDO A FAVOR
  // ===============================
  var tipoSaldo = (api.getControlValueById('119758426') || "").toLowerCase().trim();
  var saldo = parseFloat(api.getControlValueById('121104063')) || 0;

  // limpiar destinos
  api.setControlValueById('121104079', 0);
  api.setControlValueById('121104080', 0);
  api.setControlValueById('121104086', 0);
  api.setControlValueById('121104097', 0);
  api.setControlValueById('121104102', 0);

  if (tipoSaldo.includes('adjudicado')) {
    api.setControlValueById('121104079', saldo);
  } else if (tipoSaldo.includes('equipamiento')) {
    api.setControlValueById('121104080', saldo);
  } else if (tipoSaldo.includes('dividido')) {
    api.setControlValueById('121104086', saldo);
  } else if (tipoSaldo.includes('acumulado')) {
    api.setControlValueById('121104097', saldo);
  } else if (tipoSaldo.includes('reintegrado')) {
    api.setControlValueById('121104102', saldo);
  }


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

  var diferencia = preliminar - sumaPagos;
  var diff = Number(diferencia.toFixed(2));

  var mensaje = "";

  if (diff > 0) {
    mensaje = "Faltan $" + diff.toFixed(2) + " por asignar";
  } else if (diff < 0) {
    mensaje = "Hay $" + Math.abs(diff).toFixed(2) + " de más en los pagos";
  } else {
    mensaje = "Cantidad completa registrada";
  }

  setTimeout(function() {
    api.setControlValueById('121118452', mensaje);
  }, 150);

}, 1000);
