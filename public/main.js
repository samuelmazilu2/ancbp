const submitButton = document.getElementById("submit-button");

function handleSubmit() {
  const form = document.getElementById("submit-form");
  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/submit");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = xhr.responseText;
        console.log(response);

      } else {
        console.error("Error submitting form:", xhr.status, xhr.statusText);
      }
    }
  };
  xhr.send(formData);

}
let map, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.4268, lng: 26.1025 },
        zoom: 8,
    });

    google.maps.event.addListener(map, "click", function (event) {
        placeMarker(event.latLng);
    });
    setInitialLocation();
}

function setInitialLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLatLng = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );
                placeMarker(userLatLng);
                map.setCenter(userLatLng);
                map.setZoom(15);
            },
            function (error) {
                console.log("Error getting user location:", error.message);
            }
        );
    }
}

function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }
    //trecem API ul in reverse pentru a gasi adresa si coordonatele in sine
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            const address = results[0].formatted_address;
            document.getElementById("gps-location").value = address;

            // Extract latitude and longitude from the location
            const latitude = location.lat();
            const longitude = location.lng();

            // Display latitude and longitude
            const latLngText = `Latitudine: ${latitude}, Longitudine: ${longitude}`;
            document.getElementById("lat-lng").innerText = latLngText;

            // Update the Google Maps link
            const googleMapsLink = document.getElementById("google-maps-link");
            googleMapsLink.href = "https://www.google.com/maps?q=" + encodeURIComponent(address);
        } else {
            document.getElementById("gps-location").value =
                "Adresa și coordonatele nu au putut fi determinate.";
        }
    });
}
(function () {
    document.addEventListener("DOMContentLoaded", function () {
      var el = document.querySelector(".button-bird");
      var text = document.querySelector(".button-bird__text");
      el.addEventListener("click", function () {
        el.classList.toggle("active");

        if (el.classList.contains("active")) {
          console.log("true");
          text.innerHTML = "Sesizarea a fost trimisa";
        } else {
          text.innerHTML = "Trimite Sesizarea";
        }
      });
    });
})();
function handleFileUpload() {
    const fileInput = document.getElementById('file');
    const fileName = fileInput.value.split('\\').pop();
    document.getElementById("file").setAttribute("value", fileName);
}
function openMap() {
    if (!map) {
        initMap();
    }
}
