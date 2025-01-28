function setCoordinadores() {
    let controlId = '114657503'; // ID del campo desplegable de Coordinador
    let coordinadores = ["DARIO MAURO", "JUAN CARLOS"]; // Aquí irían los datos desde Google Sheets
    
    // Intentamos usar el mismo método de 123FormBuilder que sí funciona con la ubicación
    let domLayer = loader.getDOMAbstractionLayer();
    let field = domLayer.getControlById(controlId);
    
    if (field) {
        field.clearOptions(); // Eliminamos opciones existentes
        coordinadores.forEach(coordinador => {
            field.addOption(coordinador); // Agregamos cada coordinador como opción
        });
    } else {
        console.error("No se encontró el campo coordinador.");
    }
}

// Ejecutamos la función una vez que la página haya cargado completamente
window.onload = function() {
    setTimeout(setCoordinadores, 3000);
};