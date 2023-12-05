const URL_PLAZAS = "http://127.0.0.1:8000/api/plaza"

function initMap() {
    var uruguayCoords = { lat: -32.522779, lng: -55.765835 };

    var mapOptions = {
        center: uruguayCoords,
        zoom: 6,
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Autocompletar para el campo de entrada
    var input = document.getElementById('address-input');
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Enlazar el autocompletar con el mapa
    autocomplete.bindTo('bounds', map);


    var centerButton = document.getElementById('centerButton');
    centerButton.addEventListener('click', function () {
        // Obtener la dirección del campo de entrada
        var address = input.value;

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                // Obtener las coordenadas de la primera coincidencia
                var location = results[0].geometry.location;

                // Crear un marcador en la ubicación de la dirección
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: 'Destino'
                });

                // Centrar el mapa en la ubicación del nuevo marcador
                map.setCenter(location);

                map.setZoom(15);
            } else {
                alert('Geocodificación inversa fallida debido a: ' + status);
            }
        });
    });
}

function obtenerTodasLasPlazas(){

    fetch(URL_PLAZAS)

    .then(response => {
        if (!response.ok) {
          throw new Error('Error de red o servidor');
        }
        return response.json();
      })

      .then(plazas => {
        

        console.log(plazas);


      })

      .catch(error => {
        console.error('Hubo un problema con la petición Fetch:', error);
      });
}

obtenerTodasLasPlazas()