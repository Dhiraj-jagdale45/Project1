(() => {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

async function getLocation(place) {

  await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
    .then((res) => {
      return res.json();
    }).then((data) => {
      var lat = data[0].lat;
      var lon = data[0].lon;
      showMap(lat, lon);
    }).catch((err) => {
      console.log(err);
    })
}

function showMap(lat, log){

  var map = L.map('map').setView([lat,log], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  var marker = L.marker([lat, log]).addTo(map);
  
  var popup = L.popup();
  
  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
  }
  
  map.on('click', onMapClick);
}

getLocation(locationName);