getLocation('111147532');
function getLocation(controlId) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            loader.getDOMAbstractionLayer().setControlValueById(controlId,
                "Latitude: " + position.coords.latitude +
                " Longitude: " + position.coords.longitude
            );
        });
        console.error("Geolocation supported this browser.");
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}
