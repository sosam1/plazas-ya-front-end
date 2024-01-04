URL_API_AUTENTICACION = "http://127.0.0.1:8001/api/usuarios/registrar"

let userInput = document.getElementById("userInput")
let emailInput = document.getElementById("emailInput")
let passInput = document.getElementById("passInput")
let pass2Input = document.getElementById("pass2Input")

function crearUsuario(){

    console.log("llego")

    jQuery.ajax({
        url: 'http://127.0.0.1:8001/api/usuarios/registrar',
        type: 'POST',
        data: {
            'username': userInput.value,
            'email': emailInput.value,
            'password': passInput.value,
            'password_confirmation': pass2Input.value
        },

        success: function(data) {
            alert("succes")
        },

        error: function(error){
            alert(error.responseJSON.message);
        }

    });

    

}