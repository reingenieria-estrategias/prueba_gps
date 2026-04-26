// ===== GEOLOCALIZACION =====
getLocation('119535478');

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


// ===== IMPUESTOS FORMATEADO (FORZADO) =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  function limpiar(valor) {
    return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
  }

  var lote = limpiar(api.getControlValueById('119659971'));
  var mts = limpiar(api.getControlValueById('119667582'));
  var precioMt2 = limpiar(api.getControlValueById('119667584'));
  var costo = limpiar(api.getControlValueById('119791015'));

  var valor = lote + (mts * precioMt2) + costo;

  if (!valor) return;

  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  var formateado = resultado.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  api.setControlValueById('121009493', formateado + '');

}, 1000);


// ===== DIFERENCIA Y SALDO =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  function limpiar(valor) {
    return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
  }

  var valorOperacion = limpiar(api.getControlValueById('121059979'));
  var avaluo = limpiar(api.getControlValueById('121060140'));
  var capacidad = limpiar(api.getControlValueById('121060145'));

  var dineroReal = Math.min(avaluo, capacidad);

  var diferencia = valorOperacion - dineroReal;

  if (!valorOperacion) return;

  var diferenciaFmt = diferencia.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  api.setControlValueById('121060146', diferenciaFmt + '');

  var saldoFavor = (diferencia < 0) ? Math.abs(diferencia) : 0;

  var saldoFmt = saldoFavor.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  api.setControlValueById('121063070', saldoFmt + '');

}, 1000);


// ===== TIPO SALDO =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  function limpiar(valor) {
    return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
  }

  var saldo = limpiar(api.getControlValueById('121063070'));
  var tipo = api.getControlValueById('119758426');

  if (!saldo) return;

  api.setControlValueById('121063072', '0');
  api.setControlValueById('121063095', '0');
  api.setControlValueById('121063106', '0');
  api.setControlValueById('121063110', '0');
  api.setControlValueById('121063075', '0');

  if (tipo === 'Equipamiento') {
    api.setControlValueById('121063072', saldo + '');
    api.setControlValueById('121063073', '0');
    api.setControlValueById('121063074', saldo + '');
  }

  if (tipo === 'Adjudicado') {
    api.setControlValueById('121063075', saldo + '');
  }

  if (tipo === 'Dividido') {

    api.setControlValueById('121063095', saldo + '');

    var emp = limpiar(api.getControlValueById('121063097'));
    var cli = limpiar(api.getControlValueById('121063099'));
    var cor = limpiar(api.getControlValueById('121063100'));
    var ase = limpiar(api.getControlValueById('121063102'));

    var suma = emp + cli + cor + ase;

    var impuesto = saldo * 0.35;

    var impFmt = impuesto.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121063096', impFmt + '');

    var totalFmt = suma.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121063103', totalFmt + '');
  }

  if (tipo === 'Acumulado') {

    api.setControlValueById('121063106', saldo + '');

    var impuesto = saldo * 0.35;

    var impFmt = impuesto.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121063107', impFmt + '');

    var total = saldo + impuesto;

    var totalFmt = total.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121063109', totalFmt + '');
  }

  if (tipo === 'Reintegrado') {

    api.setControlValueById('121063110', saldo + '');

    var impuesto = saldo * 0.35;

    var impFmt = impuesto.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121063111', impFmt + '');

    var total = saldo + impuesto;

    var totalFmt = total.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    api.setControlValueById('121063112', totalFmt + '');
  }

}, 1000);
