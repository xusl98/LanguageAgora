//TODO FUNCIONALIDAD MODO OSCURO

var sesionIniciada = false;
var eventoSesionCerrada = new Event("sesionCerrada", { bubbles: true });
var eventoSesionIniciada = new Event("sesionIniciada", { bubbles: true });
$(document).ready(function () {
    url = path + "server/home/obtenerIdiomas.php"
    // console.log(param)
    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = peticionCorrecta;
    miXHR.open("GET", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(null);

    //Si tiene sesión iniciada
    if (parseInt(sessionStorage.getItem('user'))) {
        sesionIniciada = true;
    }
    console.log(sesionIniciada)
    cambioSesion();

    $('#nameToast').css('display', 'none');

});

function peticionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var idiomas = JSON.parse(this.responseText);
        if (idiomas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(idiomas)
            var dropMenu = '';
            var lista = '';
            for (let idioma of idiomas) {
                dropMenu += '<a class="dropdown-item" href="index.php?option=language&lang=' + idioma.languageId + '&name=' + idioma.name + '">' + idioma.name + '</a>';
                lista += '<a href="index.php?option=language&lang=' + idioma.languageId + '&name=' + idioma.name + '" class="list-group-item list-group-item-action">' + idioma.name + '</a>';
                // $('#dropdown').html(dropMenu);
                // $('#lista').html(lista);
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
        perfilDropdown += '<a class="dropdown-item" href="index.php?option=signUp">Registrarse</a>';

        //Al pulsar incicio de sesión
        $('#btnInicio').click(function () {
            url = path + "server/index/comprobarInicio.php"
            var name = $('#userNav').val();
            var pass = $('#passwordNav').val();
            var param = 'name=' + name + '&pass=' + pass;
            $('#userNav').val('');
            $('#passwordNav').val('');
            // console.log(param)
            var miXHR = new XMLHttpRequest();
            miXHR.onreadystatechange = inicioSesionCorrecto;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
            return false;
        });

    } else {
        perfilDropdown = '<a class="dropdown-item" href="index.php?option=profile&user=' + sessionStorage.getItem('user') + '">Ver Perfil</a>';
        perfilDropdown += '<span style="cursor: pointer;" class="dropdown-item" id="cerrarSesion" href="#">Cerrar Sesión</span>';
    }
    $('#perfilDropdown').html(perfilDropdown);

    $('#cerrarSesion').click(function () {
        sessionStorage.setItem('user', null);
        sesionIniciada = false;
        document.dispatchEvent(eventoSesionCerrada);
        cambioSesion();
        $('#toastTitle').text('Cierre de sesión.');
        $('#toastText').text('Sesión cerrada satisfactoriamente.');
        $('#nameToast').toast({
            animation: true,
            autohide: true,
            delay: 3000
        });
        $('#nameToast').css('display', 'block'); $('#nameToast').toast('show');
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
            document.dispatchEvent(eventoSesionIniciada);
            cambioSesion();
            $('#inicioModal').modal('hide');
            $('#toastTitle').text('Inicio de sesión.');
            $('#toastText').text('Sesión iniciada satisfactoriamente.');
            $('#nameToast').toast({
                animation: true,
                autohide: true,
                delay: 3000
            });
            $('#nameToast').css('display', 'block'); $('#nameToast').toast('show');
        } else {
            $('#nameToast').toast({
                animation: true,
                autohide: true,
                delay: 3000
            });
            $('#nameToast').css('display', 'block'); $('#nameToast').toast('show');
        }

    }
}
