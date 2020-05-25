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
            miXHR.onreadystatechange = peticionUsuarioCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);

        } else {
            alert('Rellena el campo de nombre');
            $('#nombreModal').modal('hide');
        }
    });


    $('#btnPassword').click(function () {
        if ($('#oldPass').val().trim() == '' || $('#pass').val().trim() == '' || $('#confPass').val().trim() == ''){
            $('#passwordModal').modal('hide');
            alert('Rellena todos los campos');
        } else {
            var url = path + "server/modifProfile/comprobarInicio.php"
            var name = $('#user').val();
            var param = 'name=' + userName + '&pass=' + $('#oldPass').val();
            var miXHR = new XMLHttpRequest();
            miXHR.onreadystatechange = peticionPassCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
        }
    });

    //TODO funcionalidad para el cambio de contraseña
});

function peticionUsuarioCorrecta() {
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

function peticionPassCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var respuesta = JSON.parse(this.responseText);
        if (respuesta.length > 0) {
            if ($('#pass').val() == $('#confPass').val()) {
                var url = path + "server/modifProfile/actualizaPassword.php"
                var miXHR = new XMLHttpRequest();
                var param = 'password=' + $('#pass').val() + '&userId=' + userId;
                miXHR.onreadystatechange = peticionCambioPassword;
                miXHR.open("POST", url);
                miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                miXHR.send(param);
            } else {
                $('#passwordModal').modal('hide');
                alert('Las contraseñas no coinciden');
            }
        } else {
            $('#passwordModal').modal('hide');
            alert('Contraseña incorrecta');
        }
    }
}

function peticionCambioPassword() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText);
        $('#passwordModal').modal('hide');
        alert('Contraseña cambiada satisfactoriamente');
    }
}