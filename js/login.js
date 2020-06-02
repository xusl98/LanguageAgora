//TODO hacer olvidaste la contraseña
$(document).ready(function () {
    console.log(path)
    $('#formLogin').submit(function () {
        url = path + "server/index/comprobarInicio.php"
        var name = $('#user').val();
        var pass = $('#password').val();


        var opciones = { url: path + "server/index/comprobarInicio.php", data: { name: name, pass: pass }, type: "POST", dataType: "json", };
        $.ajax(opciones)
            .done(peticionLoginCorrecta)
            // .fail()
            // .always()
            ;
        return false;
    });


    $('#olvPass').click(function () {


        Swal.fire({
            title: 'Email',
            input: 'email',
            inputPlaceholder: 'Introduce tu correo electrónico'
        }).then((result) => {
            email = result.value;

            var opciones = { url: path + "server/index/comprobarCorreo.php", data: { correo: email }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                .done(peticionCorreoCorrecta)
                // .fail()
                // .always()
                ;

        });

    });

});

function peticionCorreoCorrecta(respuesta) {
    if (respuesta.length > 0) {
        var email = respuesta[0]['email'];
        console.log(email)
        var code = Math.floor(Math.random() * (99999 - 0) + 0);
        var body = "Este es el código que tendrás que introducir para cambiar la contraseña de la cuenta: " + code;
        Email.send({
            Host: "smtp.gmail.com",
            Username: "languageagora@gmail.com",//correo origen
            Password: "agldaw214",//contraseña
            To: email,//correo destino
            From: "languageagora@gmail.com",//correo origen
            Subject: "Código LanguageAgora",//asunto
            Body: body,//cuerpo
        });

        Swal.mixin({

            confirmButtonText: 'Siguiente',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'Correo',
                input: 'text',
                text: 'Te habrá llegado al correo el código a introducir'
            },
            {
                title: 'Nueva Contraseña',
                input: 'text',
                text: 'Introduce la nueva contraseña'
            },
            {
                title: 'Comprobación',
                input: 'text',
                text: 'Vuelve a introducir la nueva contraseña'
            }
        ]).then((result) => {
            if (result.value) {
                const answers = result.value;
                console.log(answers)
                console.log(answers[0])
                console.log(code)
                if (code == parseInt(answers[0])) {
                    if (answers[1] == answers[2]) {
                        console.log(respuesta[0]['userId'])



                        var opciones = { url: path + "server/index/cambiarPassword.php", data: { userId: respuesta[0]['userId'], password: answers[1] }, type: "POST", dataType: "json", };
                        $.ajax(opciones)
                            .done(peticionCambioPassCorrecta)
                            // .fail()
                            // .always()
                            ;


                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Las contraseñas no coinciden',
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Código incorrecto',
                    })
                }


            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Introduce un correo Válido',
        })
    }

}

function peticionCambioPassCorrecta() {
        console.log(this.responseText);
        Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada satisfactoriamente'
        })

}
function peticionLoginCorrecta(respuesta) {
    if (respuesta.length > 0) {
        sessionStorage.setItem('user', respuesta[0].userId);
        window.location.href = 'index.php';
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: 'Las contraseña y usuario no coinciden',
            showConfirmButton: false,
            timer: 1000
        })
    }

}