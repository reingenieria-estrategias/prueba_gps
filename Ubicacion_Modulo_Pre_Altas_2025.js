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


// ===== CALCULO DE IMPUESTOS (LECTURA REAL DE FORMULA) =====
setInterval(function() {

  var campoValor = document.querySelector('[name="field_119667588"]');
  var campoImpuesto = document.querySelector('[name="field_121006750"]');

  if (!campoValor || !campoImpuesto) return;

  // 🔥 clave: intenta leer value o texto visible
  var valorRaw = campoValor.value || campoValor.innerText || campoValor.textContent;

  if (!valorRaw) return;

  var valor = parseFloat(
    valorRaw.toString().replace(/[^0-9.-]+/g,"")
  );

  if (isNaN(valor)) return;

  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  campoImpuesto.value = resultado.toFixed(2);

}, 1000);
