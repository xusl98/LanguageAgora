var sesionIniciada = false;
$(document).ready(function () {
    url = "http://localhost/LanguageAgora/server/home/obtenerIdiomas.php"
        // console.log(param)
        var miXHR = new XMLHttpRequest();
        miXHR.onreadystatechange = peticionCorrecta;
        miXHR.open("GET", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(null);

        //Si tiene sesión iniciada
        if (sessionStorage.getItem('user') != null){
            sesionIniciada = true;
        }

        cambioSesion();

});

function peticionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var idiomas = JSON.parse(this.responseText);
        if (idiomas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(idiomas)
            var dropMenu = '';
            for (let idioma of idiomas){
                dropMenu += '<a class="dropdown-item" href="#">' + idioma.name + '</a>';
                $('#dropdown').html(dropMenu);
            }
        } else {
           alert('Fallo en el servidor');
        }

    }
}

function cambioSesion(){
    var perfilDropdown = '';
    if (!sesionIniciada){
        perfilDropdown = '<a class="dropdown-item" href="#">Iniciar Sesión</a>';
        perfilDropdown += '<a class="dropdown-item" href="#">Registrarse</a>';
    } else {
        perfilDropdown = '<a class="dropdown-item" href="#">Editar Perfil</a>';
        perfilDropdown += '<a class="dropdown-item" href="#">Cerrar Sesión</a>';
    }
    $('#perfilDropdown').html(perfilDropdown);
}
