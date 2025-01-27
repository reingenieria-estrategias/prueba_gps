// URL de Google Sheets publicada
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMUFG3C4APJuBqY34YEaFHdzEPu0ISJJXN36si4w0-GvP2Hb35emEQCY838kpa71HW6L6ySSgyN-56/pub?output=csv';

// IDs de los campos en el formulario
const coordinadoresFieldId = 'controlid:114657503';
const asesoresFieldId = 'controlid:114657504';

// Función para cargar datos de Google Sheets
async function fetchSheetData(url) {
  const response = await fetch(url);
  const text = await response.text();
  return Papa.parse(text, { header: true }).data; // Convierte CSV en un formato legible
}

// Función para cargar coordinadores sin eliminar las opciones actuales
async function loadCoordinadores() {
  const data = await fetchSheetData(sheetUrl);

  // Filtra coordinadores en estado "Alta"
  const coordinadores = data.filter(row => row['Estado Coordinador'] === 'Alta');

  // Referencia al campo de coordinadores
  const coordinadoresField = document.querySelector([id="${coordinadoresFieldId}"]);

  // Agrega dinámicamente las nuevas opciones desde Google Sheets
  coordinadores.forEach(row => {
    const optionValue = row['Nombre Coordinador'];
    const optionText = row['Nombre Coordinador'];

    // Evita duplicados
    const exists = Array.from(coordinadoresField.options).some(opt => opt.value === optionValue);
    if (!exists) {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionText;
      coordinadoresField.appendChild(option);
    }
  });

  // Agrega evento para cargar asesores dinámicamente
  coordinadoresField.addEventListener('change', event => loadAsesores(event.target.value, data));
}

// Función para cargar asesores sin eliminar las opciones actuales
function loadAsesores(selectedCoordinador, data) {
  // Filtra asesores vinculados al coordinador seleccionado y en estado "Alta"
  const asesores = data.filter(row => row['Nombre Coordinador'] === selectedCoordinador && row['Estado Asesor'] === 'Alta');

  // Referencia al campo de asesores
  const asesoresField = document.querySelector([id="${asesoresFieldId}"]);

  // Agrega dinámicamente las nuevas opciones desde Google Sheets
  asesores.forEach(row => {
    const optionValue = row['Nombre Asesor'];
    const optionText = row['Nombre Asesor'];

    // Evita duplicados
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