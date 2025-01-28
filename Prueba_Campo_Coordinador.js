getCoordinators('114657503'); // ID del campo Coordinador

async function getCoordinators(controlId) {
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMUFG3C4APJuBqY34YEaFHdzEPu0ISJJXN36si4w0-GvP2Hb35emEQCY838kpa71HW6L6ySSgyN-56/pub?gid=0&single=true&output=csv';

    try {
        console.log('Cargando datos desde:', SHEET_URL);

        // Obtiene los datos de Google Sheets como texto
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();

        console.log('Datos CSV recibidos:', csvText);

        // Convierte el CSV en un arreglo de filas
        const rows = csvText.split('\n').map(row => row.split(','));

        console.log('Filas procesadas:', rows);

        // Encuentra la columna "NOMBRE COMPLETO COORDINADOR"
        const header = rows[0].map(h => h.trim());
        console.log('Encabezados detectados:', header);

        let nameIndex = header.findIndex(col => col.toLowerCase().includes('nombre completo coordinador'));

        if (nameIndex === -1) {
            console.error('No se encontró la columna NOMBRE COMPLETO COORDINADOR.');
            return;
        }

        // Extrae los nombres de los coordinadores
        const coordinators = rows.slice(1).map(row => row[nameIndex]?.trim()).filter(name => name);

        console.log('Lista de coordinadores extraída:', coordinators);

        if (coordinators.length === 0) {
            console.error('No se encontraron coordinadores en la hoja.');
            return;
        }

        // Convierte la lista en un formato compatible con 123FormBuilder (separado por comas)
        const coordinatorsList = coordinators.join(',');

        console.log('Lista formateada para 123FormBuilder:', coordinatorsList);

        // Asigna la lista de coordinadores al campo usando el mismo método que la ubicación
        loader.getDOMAbstractionLayer().setControlValueById(controlId, coordinatorsList);

        console.log('Coordinadores insertados correctamente en el formulario.');

    } catch (error) {
        console.error('Error al cargar los datos de Google Sheets:', error);
    }
}