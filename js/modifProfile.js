var userId;
var userName;
$(document).ready(function () {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    userId = urlParams.get('user');
    userName = urlParams.get('userName');
    $('#userTitle').text(userName);
    $('#userTitle').click(function () {
        window.history.back();
    });


    $('#btnCambiarNombre').click(function () {
        $('#nuevoNombre').text($('#userName').val());
    });

    $('#btnNombre').click(function () {
        if ($('#userName').val().trim() != '') {

            var url = path + "server/modifProfile/comprobarUsuario.php"
            var name = $('#user').val();
            var param = 'name=' + $('#userName').val();
            var miXHR = new XMLHttpRequest();
            miXHR.onreadystatechange = peticionLoginCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);

        } else {
            alert('Rellena el campo de nombre');
            $('#nombreModal').modal('hide');
        }
    });


    //TODO funcionalidad para el cambio de contraseña
});

function peticionLoginCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        // console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        if (respuesta.length > 0) {
            

            alert('El nombre de usuario ya existe');
            $('#nombreModal').modal('hide');
        } else {
            var url = path + "server/modifProfile/actualizaNombreUsuario.php"
            var miXHR = new XMLHttpRequest();
            var param = 'name=' + $('#userName').val() + '&userId=' + userId;
            miXHR.onreadystatechange = peticionCambioNombreCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
            $('#nombreModal').modal('hide');
        }

    }
}


function peticionCambioNombreCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText);
    }
}