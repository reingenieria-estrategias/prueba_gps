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

  // 🔥 FORMATO AQUÍ
  var formateado = resultado.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  api.setControlValueById('121009493', formateado);

}, 1000);
