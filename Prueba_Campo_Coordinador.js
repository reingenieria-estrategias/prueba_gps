function waitForElement(selector, callback) {
    let element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 500);
    }
}

waitForElement('select[name="widget114657503"]', function(dropdown) {
    console.log("Campo coordinador encontrado:", dropdown);
    let coordinadores = ["DARIO MAURO", "JUAN CARLOS"]; // Datos desde Google Sheets
    
    coordinadores.forEach(coordinador => {
        let option = document.createElement("option");
        option.value = coordinador;
        option.textContent = coordinador;
        dropdown.appendChild(option);
    });
});