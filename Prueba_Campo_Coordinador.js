// URL público del Google Sheets
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1AbcDXYZ1234567890/gviz/tq?tqx=out:json&sheet=COORDINADORES";

// ID del campo dinámico en FormBuilder
const COORDINADOR_FIELD_ID = "114657503"; // Control ID exacto del campo "Coordinador"

// Función para cargar los datos desde Google Sheets
async function cargarCoordinadores() {
  try {
    // Hacer la solicitud al enlace de Google Sheets
    const response = await fetch(SHEET_URL);
    const text = await response.text();

    // Limpiar el JSON recibido desde Google Sheets (elimina los caracteres adicionales)
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    // Seleccionar el campo dinámico de FormBuilder usando el Control ID
    const coordinadorField = document.querySelector([id='control:${COORDINADOR_FIELD_ID}']);

    // Validar que el campo existe
    if (!coordinadorField) {
      console.error(Campo con Control ID: ${COORDINADOR_FIELD_ID} no encontrado.);
      return;
    }

    // Iterar sobre las filas y agregar las opciones al campo dinámico
    rows.forEach(row => {
      const nombreCompleto = row.c[0]?.v; // Toma el valor de la columna "NOMBRECOMPLETO COORDINADOR"
      if (nombreCompleto) {
        const option = document.createElement("option");
        option.value = controlId:${COORDINADOR_FIELD_ID}; // Valor dinámico en FormBuilder
        option.textContent = nombreCompleto; // Texto visible en el desplegable
        coordinadorField.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error al cargar los datos desde Google Sheets:", error);
  }
}

// Ejecutar la función cuando la página cargue
document.addEventListener("DOMContentLoaded", cargarCoordinadores);