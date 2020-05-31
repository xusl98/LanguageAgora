//TODO FUNCIONALIDAD MODO OSCURO
// Este js contiene la funcionalidad de la barra de navegación que será común en muchas pantallas
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
        comprobarChats();
    } else {
        sesionIniciada = false;
    }
    console.log(sesionIniciada)
    cambioSesion();

    


});

function comprobarChats() {
    url = path + "server/home/comprobarChats.php"
    var miXHR = new XMLHttpRequest();
    var param = 'userId=' + sessionStorage.getItem('user');
    console.log(param)
    miXHR.onreadystatechange = peticionChatsCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function peticionChatsCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var chats = JSON.parse(this.responseText);
        if (chats.length > 0) {
            console.log(chats[0])
            if (chats[0]['chats'] > 0){
                $('#badgeChats').css('visibility', 'visible');
                $('#badgeChats').text(chats[0]['chats']);
            } else {
                $('#badgeChats').css('visibility', 'hidden');

            }
        } 

    }
}

function peticionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var idiomas = JSON.parse(this.responseText);
        if (idiomas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(idiomas)
            var dropMenu = '';
            for (let idioma of idiomas) {
                dropMenu += '<a class="dropdown-item" href="index.php?option=language&lang=' + idioma.languageId + '&name=' + idioma.name + '">' + idioma.name + '</a>';
                // $('#dropdown').html(dropMenu);
            }
        } else {
            alert('Fallo en el servidor');
        }

    }
}

function cambioSesion() {
    var perfilDropdown = '';
    if (!sesionIniciada) {
        perfilDropdown = '<a id="inicioSesion" class="dropdown-item" href="#" data-toggle="modal" data-target="#inicioModal">Iniciar Sesión</a>';
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
            console.log(name + ' ' + pass )
            var miXHR = new XMLHttpRequest();
            miXHR.onreadystatechange = inicioSesionCorrecto;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
            return false;
        });

    } else {
        perfilDropdown = '<a class="dropdown-item" href="index.php?option=profile&user=' + sessionStorage.getItem('user') + '">Ver Perfil</a>';
        perfilDropdown += '<a id="toChats" href="index.php?option=chats&user=' + sessionStorage.getItem('user') + '" class="notification dropdown-item"><span>Chats</span><span id="badgeChats" class="badge">3</span></a>';
        // perfilDropdown += '<a id="toChats" class="dropdown-item" href="index.php?option=chats&user=' + sessionStorage.getItem('user') + '">Chats</a>';
        perfilDropdown += '<span style="cursor: pointer;" class="dropdown-item" id="cerrarSesion" href="#">Cerrar Sesión</span>';
    }
    $('#perfilDropdown').html(perfilDropdown);
    comprobarChats();
    $('#cerrarSesion').click(function () {
        sessionStorage.setItem('user', null);
        console.log(sessionStorage.getItem('user'))
        sesionIniciada = false;
        document.dispatchEvent(eventoSesionCerrada);
        cambioSesion();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Éxito',
            text: 'Sesión cerrada satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          })
        return false;
    });
}

function inicioSesionCorrecto() {
    if ((this.readyState === 4) && (this.status === 200)) {
        // console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        if (respuesta.length > 0) {
            sessionStorage.setItem('user', respuesta[0].userId);
            console.log(sessionStorage.getItem('user'))
            sesionIniciada = true;
            document.dispatchEvent(eventoSesionIniciada);
            cambioSesion();
            $('#inicioModal').modal('hide');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Éxito',
                text: 'Sesión iniciada satisfactoriamente',
                showConfirmButton: false,
                timer: 1500
              })
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error',
                text: 'El usuario y la contraseña no coinciden',
                showConfirmButton: false,
                timer: 1500
              })
        }

    }
}
