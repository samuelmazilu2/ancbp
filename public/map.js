let map;
let marker;
let input = document.getElementById('location');
let autocomplete = null;
let mapPopup = document.getElementById('mapPopup');
let overlay = document.getElementById('overlay');

document.getElementById('openMap').addEventListener('click', openMapPopup);
document.getElementById('closeMap').addEventListener('click', closeMapPopup);
overlay.addEventListener('click', closeMapPopup);

function initMap() {
    autocomplete = new google.maps.places.Autocomplete(input);
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        draggable: true
    });

    // Add listener for marker dragend event
    marker.addListener('dragend', onMarkerDragEnd);

    // Add listener for place selection
    autocomplete.addListener('place_changed', onPlaceChanged);

    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            marker.setPosition(pos);
            marker.setVisible(true);
            updateLocationField(pos);
        });
    }
}
function onMarkerDragEnd() {
    updateLocationField(marker.getPosition());
}

document.getElementById('closeMap').addEventListener('click', () => {
    updateLocationField(marker.getPosition());
    closeMapPopup();
});

function onPlaceChanged() {
    let place = autocomplete.getPlace();

    if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    // Move the map and marker to the selected place
    map.setZoom(16);
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
}

// The coordinates displayed in the location field are in the geographic coordinate system, which uses latitude and longitude values. These values are based on the World Geodetic System 1984 (WGS 84) reference ellipsoid, a widely used standard for representing Earth's surface.

// Latitude and longitude are expressed in degrees and represent angular measurements from the Earth's center. Latitude values range from -90° (South Pole) to 90° (North Pole), while longitude values range from -180° (west) to 180° (east).

// In the example provided earlier, the coordinates are displayed in decimal degrees format, which is the most common representation of geographic coordinates. Decimal degrees express latitude and longitude as decimal numbers, with positive values indicating north and east, and negative values indicating south and west.
function updateLocationField(latlng) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                input.value = results[0].formatted_address + ' (' + results[0].geometry.location.lat().toFixed(6) + ', ' + results[0].geometry.location.lng().toFixed(6) + ')';
            } else {
                input.value = 'Location not found';
            }
        } else {
            input.value = 'Geocoder failed due to: ' + status;
        }
    });
}

function openMapPopup() {
    mapPopup.style.display = 'block';
    overlay.style.display = 'block';

    // Initialize the map if it hasn't been initialized yet
    if (!map) {
        initMap();
    }
}

function closeMapPopup() {
    mapPopup.style.display = 'none';
    overlay.style.display = 'none';
}