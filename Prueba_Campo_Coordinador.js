// URL público de Google Sheets con el ID del archivo y hoja específica
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1GyMbb5egTrbA20SUBBbUTZWvmPlhr3eaneQC0jqnvTA/gviz/tq?tqx=out:csv&sheet=COORDINADORES";

// ID del campo dinámico en FormBuilder
const COORDINADOR_FIELD_ID = "114657503"; // Este es el control ID del campo en FormBuilder

// Función para cargar los datos desde Google Sheets
async function cargarCoordinadores() {
  try {
    // Solicitud al archivo CSV de Google Sheets
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();

    // Convertir el CSV en líneas
    const lines = csvText.split("\n");

    // Referencia al campo dinámico de FormBuilder usando su ID
    const coordinadorField = document.querySelector([id='control:${COORDINADOR_FIELD_ID}']);

    // Validar que el campo existe
    if (!coordinadorField) {
      console.error(Campo con Control ID: ${COORDINADOR_FIELD_ID} no encontrado.);
      return;
    }

    // Iterar sobre las líneas del archivo CSV (saltando la primera línea: encabezados)
    lines.slice(1).forEach((line) => {
      const [nombreCompleto] = line.split(","); // Extraer la primera columna (Nombre Completo)

      if (nombreCompleto) {
        const option = document.createElement("option");
        option.value = controlId:${COORDINADOR_FIELD_ID}; // Valor exacto que necesita FormBuilder
        option.textContent = nombreCompleto.trim(); // Nombre visible en el dropdown
        coordinadorField.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error al cargar los datos desde Google Sheets:", error);
  }
}

// Ejecutar la función cuando la página cargue
document.addEventListener("DOMContentLoaded", cargarCoordinadores);