
var user;
var receiver;
var chatId;
$(document).ready(function () {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    user = urlParams.get('user');
    receiver = urlParams.get('receiver');
    receiverName = urlParams.get('receiverName');

    $('#receiverName').text(receiverName);


    comprobarChatCreado();



    $('#enviarMensaje').click(function () {
        var mensaje = $('#mensaje').val().trim()
        if (mensaje != '') {
            insertaMensaje(mensaje);
        }
    });


    



});

//TODO hacer en la barra de navegación un enlace a una página de chats abiertos

function marcarLeido(){
    url = path + "server/message/marcarMensajeLeido.php"
    var param = 'chatId=' + chatId + '&otraPersona=' + receiver;
    console.log(param)
    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = marcarLeidoCorrectamente;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function insertaMensaje(mensaje) {
    url = path + "server/message/insertaMensaje.php"

    var d = new Date();
    var fecha = d.getFullYear() + '-' + (parseInt(d.getMonth()) + 1) + '-' + d.getDate();
    var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    
    var param = 'sender=' + parseInt(sessionStorage.getItem('user')) + '&chatId=' + chatId + '&text=' + mensaje + '&date=' + fecha + '&time=' + hora;
    console.log(param)
    
    $('#mensaje').val('');

    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = mensajeInsertadoCorrectamente;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}


function comprobarChatCreado() {
    url = path + "server/message/comprobarChatCreado.php"
    var param = 'user=' + user + '&receiver=' + receiver;
    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = peticionComprobacionCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function obtenerMensajes() {
    url = path + "server/message/obtenerMensajes.php"
    var param = 'chatId=' + chatId;
    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = peticionMensajesCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function mostrarMensajes(mensajes) {
    var html = '';
    for (mensaje of mensajes) {
        if (parseInt(sessionStorage.getItem('user')) == mensaje.sender) {
            //si el mensaje lo has enviado tu
            html += '<div class="row message"><div class="col-md-6">&nbsp;</div><div class="col-md-6"><div class="mine">' + mensaje.text + '<small>&nbsp;' + mensaje.dateTime.split(' ')[1].substring(0, 5) + '</small></div></div></div>';
        } else {
            //si el mensaje lo ha enviado la otra persona
            html += '<div class="row message"><div class="col-md-6"><div class="him">' + mensaje.text + '<small>&nbsp;' + mensaje.dateTime.split(' ')[1].substring(0, 5) + '</small></div></div><div class="col-md-6">&nbsp;</div></div>';

        }
        $('#mensajes').html(html);
    }
}

function peticionComprobacionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var respuesta = JSON.parse(this.responseText);
        console.log(this.responseText)
        if (respuesta.length > 0) {
            //cuando ya existe el chat

            chatId = respuesta[0].chatId;

            marcarLeido();

            obtenerMensajes();

        } else {
            //cuando no existe el chat
            url = path + "server/message/registraChat.php"

            var param = 'user=' + user + '&receiver=' + receiver;

            var miXHR = new XMLHttpRequest();
            miXHR.onreadystatechange = chatCreadoCorrectamente;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);

            comprobarChatCreado();
        }

    }
}

function peticionMensajesCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var mensajes = JSON.parse(this.responseText);
        console.log(mensajes)
        mostrarMensajes(mensajes);
    }
}


function chatCreadoCorrectamente() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
    }
}
function marcarLeidoCorrectamente() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
    }
}

function mensajeInsertadoCorrectamente() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        obtenerMensajes();
    }
}


document.onkeydown = function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key===13){
        var mensaje = $('#mensaje').val().trim()
        if (mensaje != '') {
            insertaMensaje(mensaje);
        }
    }
}

$(document).on('sesionCerrada', function () {
    window.history.back();
  });