document.addEventListener("DOMContentLoaded", function() {
var valorTotal = document.getElementById("field_119667588");
var impuestos = document.getElementById("field_121006750");

valorTotal.addEventListener("change", function() {
var valor = parseFloat(valorTotal.value) || 0;
var resultado;

if (valor <= 641000) {
resultado = valor * 0.015;
} else {
resultado = valor * 0.03;
}

impuestos.value = resultado.toFixed(2);
});
});
