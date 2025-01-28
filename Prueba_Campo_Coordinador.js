// URL pública de la hoja de cálculo en formato CSV
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMUFG3C4APJuBqY34YEaFHdzEPu0ISJJXN36si4w0-GvP2Hb35emEQCY838kpa71HW6L6ySSgyN-56/pub?gid=0&single=true&output=csv';

// ID del campo desplegable en el formulario de 123FormBuilder
const FIELD_ID = '114657503';

// Función para cargar los datos de la hoja y poblar el campo desplegable
async function populateCoordinatorDropdown() {
    try {
        console.log('Cargando datos desde:', SHEET_URL);

        // Obtiene los datos de Google Sheets como texto
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();

        console.log('Datos CSV recibidos:', csvText); // Verificar que se reciba contenido

        // Convierte el CSV en un arreglo de filas correctamente
        const rows = csvText.split('\n').map(row => row.split(','));

        console.log('Filas procesadas:', rows); // Verificar cómo se ve la tabla en el código

        // Encuentra la columna "NOMBRE COMPLETO COORDINADOR"
        const header = rows[0].map(h => h.trim());
        console.log('Encabezados detectados:', header);

        // Buscar la columna correcta
        let nameIndex = header.findIndex(col => col.toLowerCase().includes('nombre completo coordinador'));

        if (nameIndex === -1) {
            console.error('No se encontró la columna NOMBRE COMPLETO COORDINADOR.');
            return;
        }

        // Extrae los nombres de los coordinadores
        const coordinators = rows.slice(1).map(row => row[nameIndex]?.trim()).filter(name => name);

        console.log('Lista de coordinadores extraída:', coordinators); // Depurar lista de nombres

        // Referencia al campo desplegable en 123FormBuilder
        const dropdown = loader.getDOMAbstractionLayer().getControlById(FIELD_ID);

        if (!dropdown) {
            console.error('No se encontró el campo en el formulario.');
            return;
        }

        // Limpia las opciones actuales
        dropdown.innerHTML = '';

        // Agrega la opción "Seleccione una Opción" como primera opción
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccione una Opción';
        dropdown.appendChild(defaultOption);

        // Agrega las opciones al desplegable
        coordinators.forEach(coordinator => {
            const option = document.createElement('option');
            option.value = coordinator;
            option.textContent = coordinator;
            dropdown.appendChild(option);
        });

        console.log('Lista de coordinadores actualizada correctamente en el formulario.');
    } catch (error) {
        console.error('Error al cargar los datos de Google Sheets:', error);
    }
}

// Ejecuta la función cuando se carga el formulario
document.addEventListener('DOMContentLoaded', populateCoordinatorDropdown);