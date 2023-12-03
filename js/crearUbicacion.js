function crearUbicacion(e){

    e.preventDefault();

    let direccion = document.getElementById("direccion").value
    let descripcion = document.getElementById("descripcion").value
    let latitud = 0
    let longitud = 0

    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: direccion }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            // Obtener la latitud y longitud de la primera ubicación encontrada
            latitud = results[0].geometry.location.lat();
            longitud = results[0].geometry.location.lng();

            console.log("Direccion: " + direccion);
            console.log("Latitud: " + latitud);
            console.log("Longitud: " + longitud);

            jQuery.ajax({  
                url: 'http://127.0.0.1:8000/api/direcciones/', 
                type: 'POST',
                data: {
                    'direccion': direccion,
                    'latitud': latitud,
                    'longitud': longitud,
                    'descripcion': descripcion
                },
                
                success: function(data) {  
                    alert("Pronto");
                },
        
                error: function(){
                    alert("Credenciales invalidas");
                } 
            
            });
            // Aquí puedes agregar más lógica según tus necesidades
        } else {
            console.error('Error al obtener la ubicación:', status);
        }
    });
}

