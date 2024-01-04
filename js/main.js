document.addEventListener('DOMContentLoaded', function() {
    
    const URL_PLAZAS = "http://127.0.0.1:8000/api/plaza"

    function initMap() {
        var uruguayCoords = { lat: -32.522779, lng: -55.765835 };

        var mapOptions = {
            center: uruguayCoords,
            zoom: 6,
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        let inputDireccion = document.getElementById('ubicacion');
        let autocomplete = new google.maps.places.Autocomplete(inputDireccion);

        autocomplete.addListener('place_changed', function () {
            let place = autocomplete.getPlace();
            if (place.geometry) {
                latitud = place.geometry.location.lat();
                longitud = place.geometry.location.lng();
            }
        });
        

    }

    initMap()

    function obtenerTodasLasPlazas(){

        fetch(URL_PLAZAS)

        .then(response => {
            if (!response.ok) {
            throw new Error('Error de red o servidor');
            }
            return response.json();
        })

        .then(plazas => {
            let container_plazas = document.getElementById("plazas_container")

            plazas.forEach(plaza => {

                const puntuacionRedondeada = Math.floor(plaza.valoracion);
                const puntuacionDecimal = plaza.valoracion - puntuacionRedondeada;

                // Genera las estrellas en HTML
                let estrellasHTML = '';
                for (let i = 0; i < 5; i++) {
                    if (i < puntuacionRedondeada) {
                        estrellasHTML += '<i class="fa-solid fa-star"></i>';
                    } else if (i === puntuacionRedondeada && puntuacionDecimal > 0) {
                        // Agrega una estrella parcialmente llena
                        const opacidad = puntuacionDecimal;
                        estrellasHTML += `<i class="fa-solid fa-star" style="color: #ffd700; opacity: ${opacidad};"></i>`;
                    } else {
                        estrellasHTML += '<i class="fa-regular fa-star"></i>';
                    }
                }
                
                container_plazas.innerHTML += `
                
                <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud}, '${plaza.nombre_plaza}', '${plaza.direccion}' ,${plaza.valoracion}, ${plaza.cantidad_resenas}, '${plaza.descripcion}', ${plaza.id})">

                <h2 class="plaza_titulo">${plaza.nombre_plaza}</h2>
                
                <p><i class="fa-solid fa-location-dot ubicacion_icono"></i>&nbsp;${plaza.direccion}</p>
                <br>
                <p>${estrellasHTML} Calificación: ${plaza.valoracion} - ${plaza.cantidad_resenas} opiniones</p>

                </div>
                
                `
            //buscador de plazas 
            let search_bar = document.getElementById("searchbar")
            search_bar.addEventListener("input", function(){
            
                const searchTerm = search_bar.value.toLowerCase();

                // Filtra las plazas que coincidan con el término de búsqueda
                const plazasFiltradas = plazas.filter(plaza =>
                    plaza.nombre_plaza.toLowerCase().includes(searchTerm)
                );
            
                // Muestra solo las plazas que coinciden con el término de búsqueda
                container_plazas.innerHTML = ""
                plazasFiltradas.forEach(plaza => {

                    const puntuacionRedondeada = Math.floor(plaza.valoracion);
                    const puntuacionDecimal = plaza.valoracion - puntuacionRedondeada;

                    // Genera las estrellas en HTML
                    let estrellasHTML = '';
                    for (let i = 0; i < 5; i++) {
                        if (i < puntuacionRedondeada) {
                            estrellasHTML += '<i class="fa-solid fa-star"></i>';
                        } else if (i === puntuacionRedondeada && puntuacionDecimal > 0) {
                            // Agrega una estrella parcialmente llena
                            const opacidad = puntuacionDecimal;
                            estrellasHTML += `<i class="fa-solid fa-star" style="color: #ffd700; opacity: ${opacidad};"></i>`;
                        } else {
                            estrellasHTML += '<i class="fa-regular fa-star"></i>';
                        }
                    }

                    const plazaHTML = `

                        <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud}, '${plaza.nombre_plaza}', '${plaza.direccion}' ,${plaza.valoracion}, ${plaza.cantidad_resenas}, '${plaza.descripcion}', ${plaza.id})">
                            <h2 class="plaza_titulo">${plaza.nombre_plaza}</h2>
                            <p><i class="fa-solid fa-location-dot ubicacion_icono"></i>&nbsp;${plaza.direccion}</p>
                            <br>
                            <p>${estrellasHTML} Calificación: ${plaza.valoracion} - ${plaza.cantidad_resenas} opiniones</p>
                        </div>
                    `;
                    container_plazas.innerHTML += plazaHTML;
                });

                
                })

            });

            //sort de plazas

            let select_sort = document.getElementById("select_orden")

            select_sort.addEventListener("change", function(e){

                let selectedOption = select_sort.selectedOptions[0];
                let selectedId = selectedOption.id;

                if(selectedId == "mejor_votadas"){
                    
                    let plazas_ordenadas = plazas.sort((a, b) => b.valoracion - a.valoracion);

                    container_plazas.innerHTML = ""
                    
                    plazas_ordenadas.forEach(plaza =>{

                        const puntuacionRedondeada = Math.floor(plaza.valoracion);
                        const puntuacionDecimal = plaza.valoracion - puntuacionRedondeada;

                        // Genera las estrellas en HTML
                        let estrellasHTML = '';
                        for (let i = 0; i < 5; i++) {
                            if (i < puntuacionRedondeada) {
                                estrellasHTML += '<i class="fa-solid fa-star"></i>';
                            } else if (i === puntuacionRedondeada && puntuacionDecimal > 0) {
                                // Agrega una estrella parcialmente llena
                                const opacidad = puntuacionDecimal;
                                estrellasHTML += `<i class="fa-solid fa-star" style="color: #ffd700; opacity: ${opacidad};"></i>`;
                            } else {
                                estrellasHTML += '<i class="fa-regular fa-star"></i>';
                            }
                        }
                        
                        container_plazas.innerHTML += `
                        
                        <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud}, '${plaza.nombre_plaza}', '${plaza.direccion}' ,${plaza.valoracion}, ${plaza.cantidad_resenas}, '${plaza.descripcion}', ${plaza.id})">

                        <h2 class="plaza_titulo">${plaza.nombre_plaza}</h2>
                        
                        <p><i class="fa-solid fa-location-dot ubicacion_icono"></i>&nbsp;${plaza.direccion}</p>
                        <br>
                        <p>${estrellasHTML} Calificación: ${plaza.valoracion} - ${plaza.cantidad_resenas} opiniones</p>

                        </div>
                        
                        `

                    })
                   
                }
                
                //mas resenas
                if(selectedId == "mas_resenas"){

                    let plazas_ordenadas = plazas.sort((a, b) => b.cantidad_resenas - a.cantidad_resenas);

                    container_plazas.innerHTML = ""
                    
                    plazas_ordenadas.forEach(plaza =>{

                        const puntuacionRedondeada = Math.floor(plaza.valoracion);
                        const puntuacionDecimal = plaza.valoracion - puntuacionRedondeada;

                        // Genera las estrellas en HTML
                        let estrellasHTML = '';
                        for (let i = 0; i < 5; i++) {
                            if (i < puntuacionRedondeada) {
                                estrellasHTML += '<i class="fa-solid fa-star"></i>';
                            } else if (i === puntuacionRedondeada && puntuacionDecimal > 0) {
                                // Agrega una estrella parcialmente llena
                                const opacidad = puntuacionDecimal;
                                estrellasHTML += `<i class="fa-solid fa-star" style="color: #ffd700; opacity: ${opacidad};"></i>`;
                            } else {
                                estrellasHTML += '<i class="fa-regular fa-star"></i>';
                            }
                        }
                        
                        container_plazas.innerHTML += `
                        
                        <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud}, '${plaza.nombre_plaza}', '${plaza.direccion}' ,${plaza.valoracion}, ${plaza.cantidad_resenas}, '${plaza.descripcion}', ${plaza.id})">

                        <h2 class="plaza_titulo">${plaza.nombre_plaza}</h2>
                        
                        <p><i class="fa-solid fa-location-dot ubicacion_icono"></i>&nbsp;${plaza.direccion}</p>
                        <br>
                        <p>${estrellasHTML} Calificación: ${plaza.valoracion} - ${plaza.cantidad_resenas} opiniones</p>

                        </div>
                        
                        `

                    })
                }
            })
            
            //funcion para encontrar plazas cercanas

            function encontrarPlazaMasCercana(usuarioLatitud, usuarioLongitud) {

                plazas_ordenadas_por_cercania = []
                let plazaMasCercana = null;
                let distanciaMinima = 20;
            
                plazas.forEach(plaza => {
                    const distancia = calcularDistancia(usuarioLatitud, usuarioLongitud, plaza.latitud, plaza.longitud);
                    
                    if (distancia < distanciaMinima) {
                        plazaMasCercana = plaza;
                        plazas_ordenadas_por_cercania.push({ plaza, distancia });
                        
                    }
                    
                });

                plazas_ordenadas_por_cercania.sort((a, b) => a.distancia - b.distancia);

                container_plazas.innerHTML = ""
                
                plazas_ordenadas_por_cercania.forEach(e =>{

                    const puntuacionRedondeada = Math.floor(e.plaza.valoracion);
                    const puntuacionDecimal = e.plaza.valoracion - puntuacionRedondeada;

                        // Genera las estrellas en HTML
                        let estrellasHTML = '';
                        for (let i = 0; i < 5; i++) {
                            if (i < puntuacionRedondeada) {
                                estrellasHTML += '<i class="fa-solid fa-star"></i>';
                            } else if (i === puntuacionRedondeada && puntuacionDecimal > 0) {
                                // Agrega una estrella parcialmente llena
                                const opacidad = puntuacionDecimal;
                                estrellasHTML += `<i class="fa-solid fa-star" style="color: #ffd700; opacity: ${opacidad};"></i>`;
                            } else {
                                estrellasHTML += '<i class="fa-regular fa-star"></i>';
                            }
                        }

                    container_plazas.innerHTML += `
                        
                        <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${e.plaza.latitud}, ${e.plaza.longitud}, '${e.plaza.nombre_plaza}', '${e.plaza.direccion}' ,${e.plaza.valoracion}, ${e.plaza.cantidad_resenas}, '${e.plaza.descripcion}', ${e.plaza.id})">

                        <h2 class="plaza_titulo">${e.plaza.nombre_plaza}</h2>
                        
                        <p><i class="fa-solid fa-location-dot ubicacion_icono"></i>&nbsp;${e.plaza.direccion}</p>
                        <br>
                        <p>${estrellasHTML} Calificación: ${e.plaza.valoracion} - ${e.plaza.cantidad_resenas} opiniones</p>

                        </div>
                        
                        `

                })

                return plazaMasCercana;
            }
            
            //necesario para encontrarPlazaMasCercana()
            function calcularDistancia(latitud1, longitud1, latitud2, longitud2) {
                const R = 6371; // Radio de la Tierra en kilómetros
                const dLat = toRadians(latitud2 - latitud1);
                const dLon = toRadians(longitud2 - longitud1);
            
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(toRadians(latitud1)) * Math.cos(toRadians(latitud2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distancia = R * c;
            
                return distancia;
            }
            
            //necesario para calcularDistancia()
            function toRadians(grados) {
                return grados * (Math.PI / 180);
            }
            
            let input_ubicacion_usuario = document.getElementById("ubicacion")
            input_ubicacion_usuario.addEventListener("change", function(){
                    
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: input_ubicacion_usuario.value }, function (results, status) {
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
        
                        if (marker) {
                            marker.setMap(null);
                        }
        
                        marker = new google.maps.Marker({
                            position: ubicacion,
                            map: map,
                            title: 'Ubicación'
                        });
        
                        encontrarPlazaMasCercana(latitud, longitud)
                        
                    }
                });  
                
            })


        })

        .catch(error => {
            console.error('Hubo un problema con la petición Fetch:', error);
        });
    }

    obtenerTodasLasPlazas()

    function obtenerTodasLasResenasDeUnaPlaza(id_plaza){

        const URL_RESEÑAS = "http://127.0.0.1:8000/api/resena/plaza/"+id_plaza

        fetch(URL_RESEÑAS)

        .then(response => {
            if (!response.ok) {
            throw new Error('Error de red o servidor');
            }
            return response.json();
        })

        .then(reseñas => {
            console.log(reseñas)
        })

        .catch(error => {
            console.error('Hubo un problema con la petición Fetch:', error);
        });

    }


    //ademas de buscar pone los datos de la descripcion
    window.buscarPlazaEnMapa = function(latitud, longitud, nombre_plaza, direccion, valoracion, cantidad_resenas, descripcion, id) {
        
        obtenerTodasLasResenasDeUnaPlaza(id)
        
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitud, lng: longitud },
            zoom: 15
        });
        
        var marker = new google.maps.Marker({
            position: { lat: latitud, lng: longitud },
            map: map,
            title: 'Ubicación de la plaza'
        });

        //info de las plazas
        let info_plaza_container = document.getElementById("info_plazas")
        
        info_plaza_container.innerHTML = `
        
            <h2 class="info_plaza_titulo">${nombre_plaza} (${valoracion})</h2>
            <h3 class="info_plaza_direccion">Dirección: ${direccion}</h3>
            <p class="info_plaza_descripcion">Descripción: ${descripcion}</p>
            <h2>Reseñas (${cantidad_resenas})</h2>
            <hr>
            <div class="resenas_container">

            </div>
        
        `

    };

});


