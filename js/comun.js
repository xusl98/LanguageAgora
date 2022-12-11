// Este js contiene la funcionalidad de la barra de navegación que será común en muchas pantallas
var sesionIniciada = false;
var eventoSesionCerrada = new Event("sesionCerrada", { bubbles: true });
var eventoSesionIniciada = new Event("sesionIniciada", { bubbles: true });
$(document).ready(function () {
    var path = './';



    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ip = e.ip;
        $.getJSON("https://extreme-ip-lookup.com/json/" + e.ip, function (e) {
            console.log(e)

            var d = new Date();
            var fecha = d.getFullYear() + '-' + (parseInt(d.getMonth()) + 1) + '-' + d.getDate();
            var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

            var opciones = { url: path + "server/home/insertaVisit.php", data: { ip: e.query, country: e.country, countryCode: e.countryCode, date: fecha, time: hora }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                // .done(peticionBusquedaUsuario)
                // .fail()
                .always(peticionInsertaVisita)
                ;
        });
    });



    //Si tiene sesión iniciada
    if (parseInt(sessionStorage.getItem('user'))) {
        sesionIniciada = true;
        comprobarChats();
    } else {
        sesionIniciada = false;
    }
    if (sessionStorage.getItem('name')) {
        $('#profileDrop').text(sessionStorage.getItem('name'));
    } else {
        $('#profileDrop').text('Perfil');
    }

    console.log(sesionIniciada)
    cambioSesion();


    $('#inicioSesion').click(function () {
        setTimeout(function () {
            $('#userNav').focus();
        }, 700);
    });

    $('#btnBUsuario').click(function () {
        var name = $('#inputBUsuario').val();
        var opciones = { url: path + "server/home/buscarUsuario.php", data: { name: name }, type: "POST", dataType: "json", };
        $.ajax(opciones)
            // .done(peticionBusquedaUsuario)
            // .fail()
            .always(peticionBusquedaUsuario)
            ;
    });



});

function comprobarChats() {

    var opciones = { url: path + "server/home/comprobarChats.php", data: { userId: sessionStorage.getItem('user') }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        .done(peticionChatsCorrecta)
        // .fail()
        // .always(peticionActualizarQuestionCorrecta)
        ;
}

function peticionBusquedaUsuario(usuario) {
    if (usuario.length > 0) {
        //Usuario no encontrado
        console.log(usuario)
        window.location.href = "index.php?option=profile&user=" + usuario[0]['userId'];
    } else {
        //No encontrado
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no encontrado',
        })
    }
}
function peticionInsertaVisita() {
    console.log('visita insertada')
}
function peticionChatsCorrecta(chats) {
    if (chats.length > 0) {
        console.log(chats[0])
        if (chats[0]['chats'] > 0) {
            $('#badgeChats').css('display', 'block');
            $('#badgeChats').text(chats[0]['chats']);
        } else {
            $('#badgeChats').css('display', 'none');

        }
    }

}


function cambioSesion() {
    var perfilDropdown = '';
    if (!sesionIniciada) {
        $('#profileDrop').text('Perfil');
        perfilDropdown = '<a id="inicioSesion" class="dropdown-item colorBlanco" href="#" data-toggle="modal" data-target="#inicioModal">Iniciar Sesión</a>';
        $('#pestChats').html('');
        $('#pestGestion').html('');
        perfilDropdown += '<a class="dropdown-item colorBlanco" href="index.php?option=signUp">Registrarse</a>';

        //Al pulsar incicio de sesión
        $('#btnInicio').click(function () {
            var name = $('#userNav').val();
            var pass = $('#passwordNav').val();
            $('#userNav').val('');
            $('#passwordNav').val('');


            var opciones = { url: path + "server/index/comprobarInicio.php", data: { name: name, pass: pass }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                .done(inicioSesionCorrecto)
                // .fail()
                // .always(inicioSesionCorrecto)
                ;
            return false;
        });

    } else {
        perfilDropdown = '<a class="dropdown-item colorBlanco" href="index.php?option=profile&user=' + sessionStorage.getItem('user') + '">Ver Perfil</a>';
        chatHtml = '<a id="toChats" href="index.php?option=chats&user=' + sessionStorage.getItem('user') + '" class="notification nav-link colorBlanco"><span>Chats</span><span style="display:none;" id="badgeChats" class="badge">3</span></a>';
        $('#pestChats').html(chatHtml);
        console.log(sessionStorage.getItem('userType'))
        if (parseInt(sessionStorage.getItem('userType')) != 0) {
            $('#pestGestion').html('<a class="nav-link colorBlanco" href="index.php?option=gestion" tabindex="-1" aria-disabled="true">Gestión</a>');
        } else {
            $('#pestGestion').html('');
        }
        perfilDropdown += '<span style="cursor: pointer;" class="dropdown-item" id="cerrarSesion" href="#">Cerrar Sesión</span>';
    }
    $('#perfilDropdown').html(perfilDropdown);
    comprobarChats();
    $('#cerrarSesion').click(function () {
        sessionStorage.setItem('user', null);
        sessionStorage.setItem('name', null);
        sessionStorage.setItem('userType', null);
        $('#profileDrop').text('Perfil');
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

function inicioSesionCorrecto(respuesta) {
    if (respuesta.length > 0) {
        sessionStorage.setItem('user', respuesta[0].userId);
        sessionStorage.setItem('name', respuesta[0].name);
        sessionStorage.setItem('userType', respuesta[0].userTypeId);
        console.log(sessionStorage.getItem('user'))
        sesionIniciada = true;
        $('#profileDrop').text(respuesta[0].name);
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

        var opciones = { url: path + "server/home/cambiarUltimoInicio.php", data: { userId: sessionStorage.getItem('user'), date: (new Date().toLocaleDateString('fr-CA')) }, type: "POST", dataType: "json", };
        $.ajax(opciones)
            // .done(peticionEmailCorrecta)
            // .fail()
            .always(peticionCambiarInicio)
            ;
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


function actualizarIdiomas() {
    var opciones = { url: path + "server/home/obtenerIdiomas.php", data: {}, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerIdiomasNav)
        ;
}

function peticionCambiarInicio(){
    console.log('Login cambiado')
}

function peticionObtenerIdiomasNav(idiomas) {
    html = '';
    for (idioma of idiomas) {
        html += '<a class="dropdown-item" href="index.php?option=language&lang=' + idioma['languageId'] + '&name=' + idioma['name'] + '">' + idioma['name'] + '</a>';
    }
    $('#dropLangs').html(html);

}

$(document).on("keypress", "input", function (e) {
    if (e.which == 13) {
        //Se ejecutará click en el botón correspondiente al input en el que esté situado el foco
        var btn = e.target.getAttribute('btn');
        $('#' + btn).click();
    }
});