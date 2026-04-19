setInterval(function() {

  var api = loader.engine.document;

  function limpiar(id) {
    try {
      var v = api.getElementById(id).getProperty('value.value');
      return parseFloat((v || "0").toString().replace(/,/g, '')) || 0;
    } catch(e) {
      return 0;
    }
  }

  var lote = limpiar('119659971');
  var mts = limpiar('119667582');
  var precioMt2 = limpiar('119667584');
  var costo = limpiar('119791015');

  var valor = lote + (mts * precioMt2) + costo;

  if (!valor) return;

  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  var formateado = resultado.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  api.getElementById('121009493').setValue({ value: formateado });

}, 1000);
