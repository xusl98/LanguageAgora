//TODO hacer olvidaste la contraseña
$(document).ready(function () {
    console.log(path)
    $('#formLogin').submit(function () {
        url = path + "server/index/comprobarInicio.php"
        var name = $('#user').val();
        var pass = $('#password').val();
        var param = 'name=' + name + '&pass=' + pass;
        // console.log(param)
        var miXHR = new XMLHttpRequest();
        miXHR.onreadystatechange = peticionLoginCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
        return false;
    });


    $('#olvPass').click(function () {


        Swal.fire({
            title: 'Input email address',
            input: 'email',
            inputPlaceholder: 'Enter your email address'
        }).then((result) => {
            email = result.value;

            var url = path + "server/index/comprobarCorreo.php"
            var param = 'correo=' + email;
            // console.log(param)
            var miXHR = new XMLHttpRequest();
            miXHR.onreadystatechange = peticionCorreoCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
        });

    });

});

function peticionCorreoCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        // console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
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
                            var url = path + "server/index/cambiarPassword.php"
                            var param = 'userId=' + respuesta[0]['userId'] + '&password=' + answers[1];
                            // console.log(param)
                            var miXHR = new XMLHttpRequest();
                            miXHR.onreadystatechange = peticionCambioPassCorrecta;
                            miXHR.open("POST", url);
                            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            miXHR.send(param);
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
}

function peticionCambioPassCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText);
        Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada satisfactoriamente'
        })

    }
}
function peticionLoginCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        // console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
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
}