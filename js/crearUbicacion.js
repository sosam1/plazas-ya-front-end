let inputDireccion = document.getElementById('direccion');
let latitud = 0;
let longitud = 0;

function initMap() {

    let uruguayCoords = { lat: -32.522779, lng: -55.765835 };

    let mapOptions = {
        center: uruguayCoords,
        zoom: 6,
    };

    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    let inputDireccion = document.getElementById('direccion');
    let autocomplete = new google.maps.places.Autocomplete(inputDireccion);

    autocomplete.addListener('place_changed', function () {
        let place = autocomplete.getPlace();
        if (place.geometry) {
            latitud = place.geometry.location.lat();
            longitud = place.geometry.location.lng();
        }
    });

}

function crearUbicacion(e) {
    e.preventDefault();

    let nombre_plaza = document.getElementById("nombre_plaza").value;
    let descripcion = document.getElementById("descripcion").value;
    let inputDireccion = document.getElementById('direccion');

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: inputDireccion.value }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            // Obtener la latitud y longitud de la primera ubicación encontrada
            latitud = results[0].geometry.location.lat();
            longitud = results[0].geometry.location.lng();

            console.log("Nombre: " + nombre_plaza);
            console.log("Direccion: " + inputDireccion.value);
            console.log("Latitud: " + latitud);
            console.log("Longitud: " + longitud);

            // Resto del código para la solicitud AJAX
            jQuery.ajax({
                url: 'http://127.0.0.1:8000/api/plaza/',
                type: 'POST',
                data: {
                    'nombre_plaza': nombre_plaza,
                    'direccion': inputDireccion.value,
                    'latitud': latitud,
                    'longitud': longitud,
                    'descripcion': descripcion
                },
                success: function (data) {
                    alert("Pronto");
                },
                error: function () {
                    alert("Credenciales invalidas");
                }
            });

            } else {
                console.error('Error al obtener la ubicación:', status);
            }
    });
}

//evento cambiar direccion en mapa

let direccion = document.getElementById("direccion")

direccion.addEventListener("change", function() {  

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: inputDireccion.value }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            // Obtener la latitud y longitud de la primera ubicación encontrada
            latitud = results[0].geometry.location.lat();
            longitud = results[0].geometry.location.lng();

            console.log("latidud " + latitud + " " + "longitud: " + longitud)

            let mapOptions = {
                center: { lat: latitud, lng: longitud },
                zoom: 6,
            };

            let map = new google.maps.Map(document.getElementById('map'), mapOptions);
            let marker;
            let ubicacion = new google.maps.LatLng(latitud, longitud);
            map.setCenter(ubicacion);
            map.setZoom(15);


            // Eliminar marcador anterior, si existe
            if (marker) {
                marker.setMap(null);
            }

            marker = new google.maps.Marker({
                position: ubicacion,
                map: map,
                title: 'Ubicación'
            });

            } else {
                console.error('Error al obtener la ubicación:', status);
            }
    });

})