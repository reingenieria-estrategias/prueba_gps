// URL de Google Sheets publicada
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMUFG3C4APJuBqY34YEaFHdzEPu0ISJJXN36si4w0-GvP2Hb35emEQCY838kpa71HW6L6ySSgyN-56/pub?output=csv';

// Hojas en Google Sheets
const sheetCoordinadores = 'COORDINADORES'; // Nombre de la hoja de coordinadores
const sheetAsesores = 'ASESORES'; // Nombre de la hoja de asesores

// IDs de los campos en el formulario
const coordinadoresFieldId = 'controlid:114657503'; // Campo de Coordinador
const asesoresFieldId = 'controlid:114657504'; // Campo de Asesor

// Función para cargar datos de Google Sheets
async function fetchSheetData(url) {
  const response = await fetch(url);
  const text = await response.text();
  return Papa.parse(text, { header: true }).data; // Convierte CSV en un formato legible
}

// Función para cargar asesores cuando el coordinador es seleccionado
async function loadAsesores(selectedCoordinador) {
  const data = await fetchSheetData(sheetUrl);

  // Filtra asesores vinculados al coordinador seleccionado y en estado "ALTA"
  const asesores = data.filter(row => row['NOMBRE COORDINADOR'] === selectedCoordinador && row['ESTADO ASESOR'] === 'ALTA');

  // Referencia al campo de asesores
  const asesoresField = document.querySelector([id="${asesoresFieldId}"]);

  // Limpia las opciones actuales de asesores
  asesoresField.innerHTML = '';

  // Agrega dinámicamente las nuevas opciones desde Google Sheets
  asesores.forEach(row => {
    const optionValue = row['NOMBRE ASESOR'];
    const optionText = row['NOMBRE ASESOR'];

    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionText;
    asesoresField.appendChild(option);
  });
}

// Inicializa la carga de asesores cuando el coordinador es seleccionado
document.addEventListener('DOMContentLoaded', () => {
  const coordinadoresField = document.querySelector([id="${coordinadoresFieldId}"]);
  
  // Agrega el evento para cuando el coordinador sea seleccionado
  coordinadoresField.addEventListener('change', (event) => {
    loadAsesores(event.target.value);
  });
});