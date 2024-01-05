URL_API_AUTENTICACION = "http://127.0.0.1:8001/api/usuarios/login"

let userInput = document.getElementById("userInput")
let passInput = document.getElementById("passInput")


function login(){

    jQuery.ajax({
        url: 'http://127.0.0.1:8001/api/usuarios/login',
        type: 'POST',
        data: {
            'username': userInput.value,
            'password': passInput.value,
        },

        success: function(data) {
            alert("succes")
        },

        error: function(error){
            alert(error.responseJSON.message);
        }

    });

}