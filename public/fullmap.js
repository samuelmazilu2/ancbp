function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: { lat: 46.770648654100874, lng: 23.603699460355546 }
    });

    // Your JSON data
    var locations = [
      {
        Id: 1,
        Location: "Floresti",
        GPS: "46.76158234009808, 23.632253477933897",
        Remarks: "mult gunoi, plastic",
        petition_no: "",
        Imagers: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Trash_in_forest.jpg/1600px-Trash_in_forest.jpg"
        ],
        Status: "iginenizat",
        Improve: "loc de promenada"
      },
      {
        Id: 2,
        Location: "Apuseni",
        GPS: "46.62768781957937, 22.834431734624754",
        Remarks: "mult gunoi, plastic",
        petition_no: "",
        Imagers: [
          "https://upload.wikimedia.org/wikipedia/en/e/e7/Trash_TIST.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/8/83/Red_Forest_Hill.jpg"
        ],
        Status: "iginenizat",
        Improve: "loc de promenada"
      },
      {
        Id: 3,
        Location: "Apahida",
        GPS: "46.8583113365033, 23.037420588134108",
        Remarks: "mult gunoi, plastic",
        petition_no: "",
        Imagers: [
          "https://upload.wikimedia.org/wikipedia/en/e/e7/Trash_TIST.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/8/83/Red_Forest_Hill.jpg"
        ],
        Status: "iginenizat",
        Improve: "loc de promenada"
      }
      // ... other locations
    ];

    var infowindow = new google.maps.InfoWindow();

    locations.forEach(function (location) {
      var position = location.GPS.split(", ");
      var marker = new google.maps.Marker({
        position: {
          lat: parseFloat(position[0]),
          lng: parseFloat(position[1])
        },
        map: map,
        title: location.Location,
        icon: "http://maps.gstatic.com/mapfiles/ms2/micons/caution.png"
      });

      marker.addListener("click", function () {
        var contentString =
          "Location: " +
          location.Location +
          "<br>" +
          "Remarks: " +
          location.Remarks +
          "<br>" +
          "Status: " +
          location.Status +
          "<br>" +
          "Improve: " +
          location.Improve;

        if (Array.isArray(location.Imagers) && location.Imagers.length) {
          contentString += '<div class="image-container">';
          location.Imagers.forEach(function (imageUrl) {
            contentString +=
              '<img src="' +
              imageUrl +
              '" alt="Image for ' +
              location.Location +
              '" style="max-width:100%;height:auto;display:block;margin-top:10px;">';
          });
          contentString += "</div>";
        }
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      });
    });
  }

  window.initMap = initMap;