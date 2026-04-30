// ===== SCRIPT GENERAL =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  // ===== GEOLOCALIZACION (solo si está vacío) =====
  var geo = api.getControlValueById('119652394');
  if (!geo && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      api.setControlValueById(
        '119652394',
        position.coords.latitude + "," + position.coords.longitude
      );
    });
  }

  var valorOperacion = parseFloat(api.getControlValueById('121103983')) || 0;
  var capacidad = parseFloat(api.getControlValueById('121104024')) || 0;
  var separacion = parseFloat(api.getControlValueById('121104033')) || 0;

  var tipo = api.getControlValueById('119758426');

  // ===== DIFERENCIA =====
  var diferencia = valorOperacion - capacidad;
  api.setControlValueById('121104026', diferencia);

  // ===== DIFERENCIA AJUSTADA =====
  var diferenciaAjustada = diferencia - separacion;

  // ===== ENGANCHES =====
  var tope = valorOperacion * 0.03;
  var engancheFinanciar = 0;

  if (diferenciaAjustada <= tope) {
    engancheFinanciar = diferenciaAjustada * 0.5;
  } else {
    engancheFinanciar = tope;
  }

  api.setControlValueById('121104042', engancheFinanciar);

  // ===== NO FINANCIADO =====
  var engancheNo = diferenciaAjustada - engancheFinanciar;
  api.setControlValueById('121104038', engancheNo);

  // ===== ANTICIPO =====
  api.setControlValueById('121104041', separacion + engancheNo);

  // ===== PAGO A FINANCIAR =====
  api.setControlValueById('121104046', engancheFinanciar);

  // ===== SALDO A FAVOR =====
  var saldoFavor = 0;
  if (capacidad > valorOperacion) {
    saldoFavor = capacidad - valorOperacion;
  }

  api.setControlValueById('121104063', saldoFavor);
  api.setControlValueById('121104079', saldoFavor);

  // ===== EQUIPAMIENTO =====
  var eq = (tipo === "Equipamiento") ? saldoFavor : 0;
  var eqImp = eq * 0.35;

  api.setControlValueById('121104080', eq);
  api.setControlValueById('121104081', (tipo === "Equipamiento") ? eqImp : 0);
  api.setControlValueById('121104084', (tipo === "Equipamiento") ? eq + eqImp : 0);

  // ===== DIVIDIDO =====
  var div = (tipo === "Dividido") ? saldoFavor : 0;
  var divImp = div * 0.35;

  api.setControlValueById('121104086', div);
  api.setControlValueById('121104089', (tipo === "Dividido") ? divImp : 0);
  api.setControlValueById('121104096', (tipo === "Dividido") ? div + divImp : 0);

  // ===== ACUMULADO =====
  var acu = (tipo === "Acumulado") ? saldoFavor : 0;
  var acuImp = acu * 0.35;

  api.setControlValueById('121104097', acu);
  api.setControlValueById('121104098', (tipo === "Acumulado") ? acuImp : 0);
  api.setControlValueById('121104100', (tipo === "Acumulado") ? acu + acuImp : 0);

  // ===== REINTEGRADO =====
  var rei = (tipo === "Reintegrado") ? saldoFavor : 0;
  var reiImp = rei * 0.35;

  api.setControlValueById('121104102', rei);
  api.setControlValueById('121104103', (tipo === "Reintegrado") ? reiImp : 0);
  api.setControlValueById('121104135', (tipo === "Reintegrado") ? rei + reiImp : 0);

}, 1000);
