//TODO FUNCIONALIDAD MODO OSCURO
// Este js contiene la funcionalidad de la barra de navegación que será común en muchas pantallas
var sesionIniciada = false;
$(document).ready(function () {
    url = path + "LanguageAgora/server/home/obtenerIdiomas.php"
    // console.log(param)
    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = peticionCorrecta;
    miXHR.open("GET", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(null);

    //Si tiene sesión iniciada
    if (sessionStorage.getItem('user') != null) {
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
            for (let idioma of idiomas) {
                dropMenu += '<a class="dropdown-item" href="language.html?lang=' + idioma.languageId + '&name=' + idioma.name + '">' + idioma.name + '</a>';
                $('#dropdown').html(dropMenu);
            }
        } else {
            alert('Fallo en el servidor');
        }

    }
}

function cambioSesion() {
    var perfilDropdown = '';
    if (!sesionIniciada) {
        perfilDropdown = '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#inicioModal">Iniciar Sesión</a>';
        perfilDropdown += '<a class="dropdown-item" href="signUp.html">Registrarse</a>';

        //Al pulsar incicio de sesión
        $('#btnInicio').click(function () {
            url = path + "LanguageAgora/server/index/comprobarInicio.php"
            var name = $('#user').val();
            var pass = $('#password').val();
            var param = 'name=' + name + '&pass=' + pass;
            // console.log(param)
            var miXHR = new XMLHttpRequest();
            miXHR.onreadystatechange = inicioSesionCorrecto;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
            return false;
        });

    } else {
        //TODO editar perfil
        perfilDropdown = '<a class="dropdown-item" href="#">Editar Perfil</a>';
        perfilDropdown += '<span style="cursor: pointer;" class="dropdown-item" id="cerrarSesion" href="#">Cerrar Sesión</span>';
    }
    $('#perfilDropdown').html(perfilDropdown);

    $('#cerrarSesion').click(function () {
        sessionStorage.setItem('user', null);
        sesionIniciada = false;
        cambioSesion();
        $('#toastTitle').text('Cierre de sesión.');
        $('#toastText').text('Sesión cerrada satisfactoriamente.');
        $('#nameToast').toast({
            animation: true,
            autohide: true,
            delay: 3000
        });
        $('#nameToast').toast('show');
        return false;
    });
}

function inicioSesionCorrecto() {
    if ((this.readyState === 4) && (this.status === 200)) {
        // console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        if (respuesta.length > 0) {
            sessionStorage.setItem('user', respuesta[0].userId);
            sesionIniciada = true;
            cambioSesion();
            $('#inicioModal').modal('hide');
            $('#toastTitle').text('Inicio de sesión.');
            $('#toastText').text('Sesión iniciada satisfactoriamente.');
            $('#nameToast').toast({
                animation: true,
                autohide: true,
                delay: 3000
            });
            $('#nameToast').toast('show');
        } else {
            $('#nameToast').toast({
                animation: true,
                autohide: true,
                delay: 3000
            });
            $('#nameToast').toast('show');
        }

    }
}
