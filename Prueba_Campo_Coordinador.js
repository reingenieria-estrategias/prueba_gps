// URL pública de la hoja de cálculo en formato CSV
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMUFG3C4APJuBqY34YEaFHdzEPu0ISJJXN36si4w0-GvP2Hb35emEQCY838kpa71HW6L6ySSgyN-56/pub?gid=0&single=true&output=csv';

// ID del campo desplegable en el formulario de 123FormBuilder
const FIELD_ID = '114657503';

// Función para cargar los datos de la hoja y poblar el campo desplegable
async function populateCoordinatorDropdown() {
    try {
        // Obtiene los datos de Google Sheets como texto
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();

        // Convierte el CSV en un arreglo de filas
        const rows = csvText.split('\n').map(row => row.split(','));

        // Encuentra el índice de la columna "NOMBRE COMPLETO COORDINADOR"
        const header = rows[0].map(h => h.trim()); // Elimina espacios en blanco
        const nameIndex = header.indexOf('NOMBRE COMPLETO COORDINADOR');

        if (nameIndex === -1) {
            console.error('No se encontró la columna NOMBRE COMPLETO COORDINADOR.');
            return;
        }

        // Extrae los nombres de los coordinadores, eliminando espacios y filas vacías
        const coordinators = rows.slice(1).map(row => row[nameIndex]?.trim()).filter(name => name);

        // Referencia al campo desplegable en 123FormBuilder
        const dropdown = loader.getDOMAbstractionLayer().getControlById(FIELD_ID);

        if (!dropdown) {
            console.error('No se encontró el campo en el formulario.');
            return;
        }

        // Limpia las opciones actuales
        dropdown.innerHTML = '';

        // Agrega las opciones al desplegable
        coordinators.forEach(coordinator => {
            const option = document.createElement('option');
            option.value = coordinator;
            option.textContent = coordinator;
            dropdown.appendChild(option);
        });

        console.log('Lista de coordinadores actualizada correctamente.');
    } catch (error) {
        console.error('Error al cargar los datos de Google Sheets:', error);
    }
}

// Ejecuta la función cuando se carga el formulario
document.addEventListener('DOMContentLoaded', populateCoordinatorDropdown);