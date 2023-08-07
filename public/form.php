<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <title>Formular Sesizare</title>
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>

<body>
	
    <div class="form-container">
        <div class="logo"></div>
        <h2 style="text-align: center;">Formular Sesizare</h2>
        <form id="submit-form" enctype="multipart/form-data">
			<label class="form-label" for="name">
			    <i class="form-icon fas fa-user"></i>
			    Nume <span style="color: red;">*</span>:
			</label>
            <input type="text" id="name" name="name" class="form-field" placeholder="E.g: Maria Popescu">

            <label class="form-label" for="email">
                <i class="form-icon fas fa-envelope"></i>
                Email <span style="color: red;">*</span>:
            </label>
            <input type="email" id="email" name="email" class="form-field" placeholder="Email@domeniu.com">

            <label class="form-label" for="phone">
                <i class="form-icon fas fa-phone-alt"></i>
                Numar de telefon <span style="color: red;">*</span>:
            </label>
            <input type="tel" id="phone" name="phone" class="form-field" placeholder="07...">

            <label class="form-label" for="description">
                <i class="form-icon fas fa-info-circle"></i>
                Descrierea problemei <span style="color: red;">*</span>:
            </label>
            <textarea id="description" name="description" class="form-field" placeholder="Descrierea problemei" rows="4" style="resize: vertical;"></textarea>

            <label class="form-label" for="locality">
                <i class="form-icon fas fa-map-marker-alt"></i>
                Localitate <span style="color: red;">*</span>:
            </label>
           <input type="text" id="locality" name="locality" class="form-field" placeholder="Localitate">

            <label class="form-label" for="county">
                <i class="form-icon fas fa-map"></i>
                Judet <span style="color: red;">*</span>:
            </label>
			<select id="county" name="county" class="form-field">
			    <option value="" disabled selected>Selectează un județ</option>
			    <option value="Alba">Alba</option>
			    <option value="Arad">Arad</option>
			    <option value="Argeș">Argeș</option>
			    <option value="Bacău">Bacău</option>
			    <option value="Bihor">Bihor</option>
			    <option value="Bistrița-Năsăud">Bistrița-Năsăud</option>
			    <option value="Botoșani">Botoșani</option>
			    <option value="Brașov">Brașov</option>
			    <option value="Brăila">Brăila</option>
			    <option value="București">București</option>
			    <option value="Buzău">Buzău</option>
			    <option value="Caraș-Severin">Caraș-Severin</option>
			    <option value="Călărași">Călărași</option>
			    <option value="Cluj">Cluj</option>
			    <option value="Constanța">Constanța</option>
			    <option value="Covasna">Covasna</option>
			    <option value="Dâmbovița">Dâmbovița</option>
			    <option value="Dolj">Dolj</option>
			    <option value="Galați">Galați</option>
			    <option value="Giurgiu">Giurgiu</option>
			    <option value="Gorj">Gorj</option>
			    <option value="Harghita">Harghita</option>
			    <option value="Hunedoara">Hunedoara</option>
			    <option value="Ialomița">Ialomița</option>
			    <option value="Iași">Iași</option>
			    <option value="Ilfov">Ilfov</option>
			    <option value="Maramureș">Maramureș</option>
			    <option value="Mehedinți">Mehedinți</option>
			    <option value="Mureș">Mureș</option>
			    <option value="Neamț">Neamț</option>
			    <option value="Olt">Olt</option>
			    <option value="Prahova">Prahova</option>
			    <option value="Satu Mare">Satu Mare</option>
			    <option value="Sălaj">Sălaj</option>
			    <option value="Sibiu">Sibiu</option>
			    <option value="Suceava">Suceava</option>
			    <option value="Teleorman">Teleorman</option>
			    <option value="Timiș">Timiș</option>
			    <option value="Tulcea">Tulcea</option>
			    <option value="Vaslui">Vaslui</option>
			    <option value="Vâlcea">Vâlcea</option>
			    <option value="Vrancea">Vrancea</option>
			</select>

			<label class="form-label" for="gps-location">
			    <i class="form-icon fas fa-location-arrow"></i>
			    Locatie GPS <span style="color: red;">*</span>:
			</label>
			<input type="text" id="gps-location" name="gps_location" class="form-field" placeholder="Locatie GPS: Alege locatia utilizand harta" readonly>
			<p id="lat-lng" style="font-size: 12px; margin-top: 5px;"></p>
			<a href="" id="google-maps-link" target="_blank" style="display: block; margin-top: 10px;">Deschide Google Maps la aceasta locatie</a>
			<div id="map"></div>


			<label class="form-label" for="file">
			    <i class="form-icon fas fa-file"></i>
			    Alege fisierele:
			</label>
			<input type="file" id="file" name="file[]" class="form-field" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple onchange="handleFileUpload()">

    <div class="wrapper-no4">
       	<button type="button" class="button-bird" id="submit-button" onclick="handleButtonClick()">
            <p class="button-bird__text">Trimite Sesizarea</p>
            <svg version="1.1" class="feather" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 75 38" style="enable-background:new 0 0 75 38; margin-top: 40px;" xml:space="preserve">
                <g>
                    <path d="M20.8,31.6c3.1-0.7,2.9-2.3,2,1c9.1,4.4,20.4,3.7,29.1-0.8l0,0c0.7-2.1,1-3.9,1-3.9c0.6,0.8,0.8,1.7,1,2.9
                        c4.1-2.3,7.6-5.3,10.2-8.3c0.4-2.2,0.4-4,0.4-4.1c0.6,0.4,0.9,1.2,1.2,2.1c4.5-6.1,5.4-11.2,3.7-13.5c1.1-2.6,1.6-5.4,1.2-7.7
                        c-0.5,2.4-1.2,4.7-2.1,7.1c-5.8,11.5-16.9,21.9-30.3,25.3c13-4,23.6-14.4,29.1-25.6C62.8,9,55.6,16.5,44.7,20.7
                        c2.1,0.7,3.5,1.1,3.5,1.6c-0.1,0.4-1.3,0.6-3.2,0.4c-7-0.9-7.1,1.2-16,1.5c1,1.3,2,2.5,3.1,3.6c-1.9-0.9-3.8-2.2-5.6-3.6
                        c-0.9,0.1-10.3,4.9-22.6-12.3C5.9,17.7,11.8,26.9,20.8,31.6z"/>
                </g>
            </svg>
            <span class="bird"></span>
            <span class="bird--1"></span>
            <span class="bird--2"></span>
            <span class="bird--3"></span>
            <span class="bird--4"></span>
            <span class="bird--5"></span>
            <span class="bird--6"></span>
            <span class="bird--7"></span>
            <span class="bird--8"></span>
            <span class="bird--9"></span>
            <span class="bird--10"></span>
            <span class="bird--11"></span>
            <span class="bird--12"></span>
            <span class="bird--13"></span>
            <span class="bird--14"></span>
            <span class="bird--15"></span>
            <span class="bird--16"></span>
            <span class="bird--17"></span>
            <span class="bird--18"></span>
            <span class="bird--19"></span>
            <span class="bird--20"></span>
            <span class="bird--21"></span>
            <span class="bird--22"></span>
            <span class="bird--23"></span>
            <span class="bird--24"></span>
            <span class="bird--25"></span>
            <span class="bird--26"></span>
            <span class="bird--27"></span>
            <span class="bird--28"></span>
            <span class="bird--29"></span>
            <span class="bird--30"></span>
        </button>
    </div>
            <p style="text-align: center;">Sustine activitatea OPMCB aici:</p>
            <p style="text-align: center;"><a href="https://formular230.ro/organizatia-pentru-protectia-mediului-si-combaterea-braconajului" target="_blank">Completeaza formularul 230</a></p>
        </form>
    </div>
    <script>
 
	    const submitButton = document.getElementById("submit-button");
	    submitButton.addEventListener("click", handleSubmit);
	
		function handleSubmit() {
		  const form = document.getElementById("submit-form");
		  const formData = new FormData(form);

		  const xhr = new XMLHttpRequest();
		  xhr.open("POST", "process_form.php");
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

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAdPusHO34CnOZK96sFrLTgLBLN5kIS3V8&libraries=places&callback=initMap" async defer></script>
    

</body>

</html>
