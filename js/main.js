document.addEventListener('DOMContentLoaded', function() {
    
    const URL_PLAZAS = "http://127.0.0.1:8000/api/plaza"

    function initMap() {
        var uruguayCoords = { lat: -32.522779, lng: -55.765835 };

        var mapOptions = {
            center: uruguayCoords,
            zoom: 6,
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        

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
                
                <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud})">

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

                        <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud})">
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
                        
                        <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud})">

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
                        
                        <div class="plaza_objeto" onclick="buscarPlazaEnMapa(${plaza.latitud}, ${plaza.longitud})">

                        <h2 class="plaza_titulo">${plaza.nombre_plaza}</h2>
                        
                        <p><i class="fa-solid fa-location-dot ubicacion_icono"></i>&nbsp;${plaza.direccion}</p>
                        <br>
                        <p>${estrellasHTML} Calificación: ${plaza.valoracion} - ${plaza.cantidad_resenas} opiniones</p>

                        </div>
                        
                        `

                    })
                }
            })


        })

        .catch(error => {
            console.error('Hubo un problema con la petición Fetch:', error);
        });
    }

    obtenerTodasLasPlazas()

    window.buscarPlazaEnMapa = function(latitud, longitud) {
        
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitud, lng: longitud },
            zoom: 15
        });
        
        var marker = new google.maps.Marker({
            position: { lat: latitud, lng: longitud },
            map: map,
            title: 'Ubicación de la plaza'
        });

        

    };

});


