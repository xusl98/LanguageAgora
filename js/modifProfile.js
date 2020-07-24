var userId;
var userName;
$(document).ready(function () {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    userId = urlParams.get('user');
    userName = urlParams.get('userName');
    $('#userTitle').text(userName);
    $('#userTitle').click(function () {
        window.location.href = document.referrer;
    });


    if (sessionStorage.getItem('user') != userId){
        window.history.back();
    }


    $('#btnCambiarNombre').click(function () {
        $('#nuevoNombre').text($('#userName').val());
    });

    $('#btnNombre').click(function () {
        if ($('#userName').val().trim() != '') {


            var opciones = { url: path + "server/modifProfile/comprobarUsuario.php", data: { name: $('#userName').val() }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                .done(peticionUsuarioCorrecta)
                // .fail()
                // .always()
                ;

        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Rellena el campo nombre',
                showConfirmButton: false,
                timer: 1500
            });
            $('#nombreModal').modal('hide');
        }
    });


    $('#btnPassword').click(function () {
        if ($('#oldPass').val().trim() == '' || $('#pass').val().trim() == '' || $('#confPass').val().trim() == '') {
            $('#passwordModal').modal('hide');
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Rellena todos los campos',
                showConfirmButton: false,
                timer: 1500
            });
        } else {

            var opciones = { url: path + "server/modifProfile/comprobarInicio.php", data: { name: userName, pass: $('#oldPass').val() }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                .done(peticionPassCorrecta)
                // .fail()
                // .always()
                ;
        }
    });

});

$(document).on('sesionCerrada', function () {
    window.history.back();
});

function peticionUsuarioCorrecta(respuesta) {
    if (respuesta.length > 0) {

        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El nombre de usuario ya existe',
            showConfirmButton: false,
            timer: 1500
        });
        $('#nombreModal').modal('hide');
    } else {
        var url = path + "server/modifProfile/actualizaNombreUsuario.php"
        var miXHR = new XMLHttpRequest();
        var param = 'name=' + $('#userName').val() + '&userId=' + userId;
        miXHR.onreadystatechange = peticionCambioNombreCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
        $('#userTitle').text($('#userName').val());
        $('#profileDrop').text($('#userName').val());
        $('#nombreModal').modal('hide');
        
    }

}


function peticionCambioNombreCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText);
    }
}

function peticionPassCorrecta(respuesta) {
    if (respuesta.length > 0) {
        if ($('#pass').val() == $('#confPass').val()) {

            var opciones = { url: path + "server/modifProfile/actualizaPassword.php", data: { password: $('#pass').val(), userId: userId }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                .done(peticionCambioPassword)
                // .fail()
                // .always()
                ;
        } else {
            $('#passwordModal').modal('hide');

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } else {
        $('#passwordModal').modal('hide');
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Contraseña incorrecta',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function peticionCambioPassword() {
        $('#passwordModal').modal('hide');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña cambiada satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
        });
}