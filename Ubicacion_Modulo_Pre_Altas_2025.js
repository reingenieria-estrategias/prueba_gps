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


// ===== CALCULO DE IMPUESTOS (FORZADO GLOBAL) =====
setInterval(function() {

  var texto = document.body.innerText;

  var match = texto.match(/[\d,]+(\.\d+)?/g);
  if (!match) return;

  // toma el número más grande visible (tu valor total)
  var valor = Math.max.apply(null, match.map(function(n){
    return parseFloat(n.replace(/,/g,"")) || 0;
  }));

  if (!valor) return;

  var resultado = (valor <= 641000)
    ? valor * 0.015
    : valor * 0.03;

  var inputs = document.querySelectorAll("input");

  inputs.forEach(function(input){
    if (input.name && input.name.includes("121006750")) {
      input.value = resultado.toFixed(2);
    }
  });

}, 1000);
