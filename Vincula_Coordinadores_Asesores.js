// URL de Google Sheets publicada
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMUFG3C4APJuBqY34YEaFHdzEPu0ISJJXN36si4w0-GvP2Hb35emEQCY838kpa71HW6L6ySSgyN-56/pub?output=csv';

// Hojas en Google Sheets
const sheetCoordinadores = 'COORDINADORES';
const sheetAsesores = 'ASESORES';

// IDs de los campos en el formulario
const coordinadoresFieldId = 'controlid:114657503'; // Campo de Coordinador
const asesoresFieldId = 'controlid:114657504'; // Campo de Asesor

// Función para cargar datos de Google Sheets
async function fetchSheetData(sheetUrl) {
  const response = await fetch(sheetUrl);
  const text = await response.text();
  return Papa.parse(text, { header: true }).data; // Convierte CSV en un formato legible
}

// Función para cargar coordinadores desde la hoja "COORDINADORES"
async function loadCoordinadores() {
  const data = await fetchSheetData(sheetUrl);

  // Filtra coordinadores en estado "ALTA"
  const coordinadores = data.filter(row => row['ESTADO COORDINADOR'] === 'ALTA');

  // Referencia al campo de coordinadores
  const coordinadoresField = document.querySelector([id="${coordinadoresFieldId}"]);

  // Agrega dinámicamente las nuevas opciones desde Google Sheets
  coordinadores.forEach(row => {
    const optionValue = row['NOMBRE COORDINADOR'];
    const optionText = row['NOMBRE COORDINADOR'];

    // Evita duplicados
    const exists = Array.from(coordinadoresField.options).some(opt => opt.value === optionValue);
    if (!exists) {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionText;
      coordinadoresField.appendChild(option);
    }
  });

  coordinadoresField.addEventListener('change', event => loadAsesores(event.target.value, data));
}

// Función para cargar asesores desde la hoja "ASESORES"
function loadAsesores(selectedCoordinador, data) {
  // Filtra asesores vinculados al coordinador seleccionado y en estado "ALTA"
  const asesores = data.filter(row => row['NOMBRE COORDINADOR'] === selectedCoordinador && row['ESTADO ASESOR'] === 'ALTA');

  // Referencia al campo de asesores
  const asesoresField = document.querySelector([id="${asesoresFieldId}"]);

  // Agrega dinámicamente las nuevas opciones desde Google Sheets
  asesores.forEach(row => {
    const optionValue = row['NOMBRE ASESOR'];
    const optionText = row['NOMBRE ASESOR'];

    const exists = Array.from(asesoresField.options).some(opt => opt.value === optionValue);
    if (!exists) {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionText;
      asesoresField.appendChild(option);
    }
  });
}

// Inicializa el formulario
document.addEventListener('DOMContentLoaded', loadCoordinadores);