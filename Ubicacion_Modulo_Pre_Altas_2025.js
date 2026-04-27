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


// ===== SISTEMA COMPLETO =====
setInterval(function() {

  var api = loader.getDOMAbstractionLayer();

  function limpiar(valor) {
    return Number((valor || "0").toString().replace(/[^0-9.-]/g, '')) || 0;
  }

  function fmt(n) {
    return n.toLocaleString('en-US',{
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }) + '';
  }

  // BASE
  var v1 = limpiar(api.getControlValueById('119659971'));
  var v2 = limpiar(api.getControlValueById('119667582'));
  var v3 = limpiar(api.getControlValueById('119667584'));
  var v4 = limpiar(api.getControlValueById('119791015'));

  var valorOperacion = v1 + (v2 * v3) + v4;

  // AVALUO / CAPACIDAD
  var avaluo = limpiar(api.getControlValueById('121060140'));
  var capacidad = limpiar(api.getControlValueById('121060145'));

  var dineroReal = Math.min(avaluo, capacidad);

  // DIFERENCIA
  var diferencia = valorOperacion - dineroReal;
  api.setControlValueById('121060146', fmt(diferencia));

  // SALDO
  var saldo = diferencia < 0 ? Math.abs(diferencia) : 0;
  api.setControlValueById('121063070', fmt(saldo));

  // TIPO
  var tipo = api.getControlValueById('119758426');

  // RESET
  api.setControlValueById('121063072','0');
  api.setControlValueById('121063095','0');
  api.setControlValueById('121063106','0');
  api.setControlValueById('121063110','0');
  api.setControlValueById('121063075','0');

  if(tipo === 'Equipamiento'){
    api.setControlValueById('121063072', fmt(saldo));
    api.setControlValueById('121063073','0');
    api.setControlValueById('121063074', fmt(saldo));
  }

  if(tipo === 'Adjudicado'){
    api.setControlValueById('121063075', fmt(saldo));
  }

  if(tipo === 'Dividido'){

    api.setControlValueById('121063095', fmt(saldo));

    var emp = limpiar(api.getControlValueById('121063097'));
    var cli = limpiar(api.getControlValueById('121063099'));
    var cor = limpiar(api.getControlValueById('121063100'));
    var ase = limpiar(api.getControlValueById('121063102'));

    var suma = emp + cli + cor + ase;
    api.setControlValueById('121063103', fmt(suma));

    var imp = saldo * 0.35;
    api.setControlValueById('121063096', fmt(imp));
  }

  if(tipo === 'Acumulado'){

    api.setControlValueById('121063106', fmt(saldo));

    var imp = saldo * 0.35;
    api.setControlValueById('121063107', fmt(imp));

    var total = saldo + imp;
    api.setControlValueById('121063109', fmt(total));
  }

  if(tipo === 'Reintegrado'){

    api.setControlValueById('121063110', fmt(saldo));

    var imp = saldo * 0.35;
    api.setControlValueById('121063111', fmt(imp));

    var total = saldo + imp;
    api.setControlValueById('121063112', fmt(total));
  }

}, 1000);
