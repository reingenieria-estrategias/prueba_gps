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


// ===== FORMATEO AL SALIR DEL CAMPO =====
var idsFormato = [
'121011482','121011483','121011484','121011485','121011560',
'121011487','121059979',
'121059980','121060114','121060115','121009493','121060116','121060117',
'121060118','121060120','121060121','121060138','121060139',
'121060140','121060141','121060144','121060145',
'121060146','121060148','121060149','121060150','121060152','121060153','121062097',
'121062261','121062262','121062263','121062264','121062273','121062277',
'121062294','121062295','121062304','121062307','121062315','121062330',
'121063070','121063075',
'121063072','121063073','121063074',
'121063095','121063096','121063097','121063099','121063100','121063102','121063103',
'121063106','121063107','121063109',
'121063110','121063111','121063112'
];

function limpiar(valor) {
  return parseFloat((valor || "0").toString().replace(/,/g, '')) || 0;
}

function formatear(numero) {
  return numero.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

// 🔥 Detectar salida del campo
document.addEventListener('focusout', function(e) {

  var api = loader.getDOMAbstractionLayer();

  var id = e.target.id;

  if (!idsFormato.includes(id)) return;

  var actual = api.getControlValueById(id);

  if (!actual) return;

  if (/[.,]$/.test(actual)) return;

  var numero = limpiar(actual);

  var formateado = formatear(numero);

  api.setControlValueById(id, formateado);

});
