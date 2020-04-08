//TODO FUNCIONALIDAD MODO OSCURO

var languageId;
var languageName;
var sesionIniciada = false;
var num = 10;

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

    //get language name and id
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    languageId = urlParams.get('lang');
    languageName = urlParams.get('name');
    $('#titulo').text(languageName);
    obtenerPreguntas()

    $('#btnVerMas').click(function () {
        num += 10;
        obtenerPreguntas();
    });

});

function obtenerPreguntas() {
    url = path + "LanguageAgora/server/language/obtenerPreguntas.php"
    var miXHR = new XMLHttpRequest();
    var param = 'lang=' + languageId + '&num=' + num;
    miXHR.onreadystatechange = peticionPreguntasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function peticionPreguntasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var preguntas = JSON.parse(this.responseText);
        if (preguntas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(preguntas)
            var lista = '';
            for (let pregunta of preguntas) {
                var texto = pregunta.text.substring(0, 50) + '...';
                //TODO abrir pagina de question al pulsar
                lista += '<a href="#" class="list-group-item list-group-item-action"><div><div class="row"><u class="col-10">' + pregunta.title + '</u><span class="col-2">' + pregunta.date + '</span></div><div>' + texto + '</div><div class="row"><span class="col-10">&nbsp;</span><span>' + pregunta.name + '</span></div></div></a>';
            }
            $('#lista').html(lista);
            console.log(lista)
        } else {
            console.log('No hay preguntas')
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
