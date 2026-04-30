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

// ===== API =====
var api = loader.getDOMAbstractionLayer();

// ===== HELPERS =====
function get(id){
  return parseFloat(api.getControlValueById(id)) || 0;
}

function set(id, val){
  api.setControlValueById(id, val);
}

// ===== BASE =====
var valorOperacion = get(121103983);
var capacidad = get(121104024);
var separacion = get(121104033);

// ===== DIFERENCIA =====
var diferencia = valorOperacion - capacidad;
set(121104026, diferencia);

// ===== DIFERENCIA AJUSTADA =====
var diferenciaAjustada = diferencia - separacion;

// ===== ENGANCHES =====
var tope = valorOperacion * 0.03;

var engancheFinanciar;

if (diferenciaAjustada <= tope) {
  engancheFinanciar = diferenciaAjustada * 0.5;
} else {
  engancheFinanciar = tope;
}

set(121104042, engancheFinanciar);

// ===== NO FINANCIADO =====
var engancheNo = diferenciaAjustada - engancheFinanciar;
set(121104038, engancheNo);

// ===== ANTICIPO =====
set(121104041, separacion + engancheNo);

// ===== PAGO A FINANCIAR =====
set(121104046, engancheFinanciar);

// ===== SALDO A FAVOR =====
var saldoFavor = 0;

if (capacidad > valorOperacion) {
  saldoFavor = capacidad - valorOperacion;
}

set(121104063, saldoFavor);
set(121104079, saldoFavor);

// ===== TIPO =====
var tipo = api.getControlValueById(119758426);

// ===== EQUIPAMIENTO =====
var eq = (tipo === "Equipamiento") ? saldoFavor : 0;
set(121104080, eq);

var eqImp = eq * 0.35;
set(121104081, (tipo === "Equipamiento") ? eqImp : 0);

set(121104084, (tipo === "Equipamiento") ? eq + eqImp : 0);

// ===== DIVIDIDO =====
var div = (tipo === "Dividido") ? saldoFavor : 0;
set(121104086, div);

var divImp = div * 0.35;
set(121104089, (tipo === "Dividido") ? divImp : 0);

// (Empresa, Cliente, Coordinador, Asesor = captura manual)

set(121104096, (tipo === "Dividido") ? div + divImp : 0);

// ===== ACUMULADO =====
var acu = (tipo === "Acumulado") ? saldoFavor : 0;
set(121104097, acu);

var acuImp = acu * 0.35;
set(121104098, (tipo === "Acumulado") ? acuImp : 0);

set(121104100, (tipo === "Acumulado") ? acu + acuImp : 0);

// ===== REINTEGRADO =====
var rei = (tipo === "Reintegrado") ? saldoFavor : 0;
set(121104102, rei);

var reiImp = rei * 0.35;
set(121104103, (tipo === "Reintegrado") ? reiImp : 0);

set(121104135, (tipo === "Reintegrado") ? rei + reiImp : 0);
