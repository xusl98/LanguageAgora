
isValid = false;
passwordValid = false;
nameValid = false;
emailValid = false;
var code = 0;

//Creación del evento inputChange que se emitirá al perder el foco de un input
inputChangeEvent = 1;
inputChangeEvent = new Event("inputChange", { bubbles: true });

cargaUser = 0;

$(document).ready(function () {
    $('input').on('blur', function () {

        switch (this.id) {
            case 'user':
                compruebaNombre(this);
                break;
            case 'password':
                passwordNoVacia(this);
                break;
            case 'password2':
                comprobarPassword(this);
                break;
            case 'email':
                comprobarEmail(this);
                break;
        }

        comprobarVacios();


        document.dispatchEvent(inputChangeEvent);
    });

    $('#password2').focus(function () {
        $(this).css('background-color', 'white');
    });
    $('#user').focus(function () {
        $(this).css('background-color', 'white');
    });

    $('#submit').click(function (e) {
        $('#loginModal').modal('show');
        $('#spanEmail').text($('#email').val());
        code = Math.floor(Math.random() * (99999 - 0) + 0);
        var body = "Este es el código que tendrás que introducir para confirmar el registro de la cuenta: " + code;
        Email.send({
            Host: "smtp.gmail.com",
            Username: "languageagora@gmail.com",//correo origen
            Password: "agldaw214",//contraseña
            To: $('#email').val(),//correo destino
            From: "languageagora@gmail.com",//correo origen
            Subject: "Código LanguageAgora",//asunto
            Body: body,//cuerpo
        });
        return false;
    });

    $('#codeBtn').click(function () {
        if ($('#code').val() == code) {
            insertaUsuario($('#user').val(), $('#password').val(), $('#email').val());
            window.location.href = 'index.php?option=login';
        }
    });


});


$(document).on('inputChange', function () {
    console.log(isValid);
    console.log(passwordValid);
    console.log(nameValid);
    console.log(emailValid);
    $('#submit')[0].disabled = isValid && passwordValid && nameValid && emailValid && $('#termsCheck').prop('checked') ? false : true;
});






function compruebaNombre(user) {

    // var url = path + "server/signUp/compruebaNombre.php"
    var name = user.value;

    // var param = 'name=' + name;
    // console.log(param)
    if (name.trim() == '') {
        isValid = false;
        $('#validUser').removeClass('validatorValid');
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: 'El campo nombre no puede estar vacío',
            showConfirmButton: false,
            timer: 1000
        })
        document.dispatchEvent(inputChangeEvent);
    } else {
        // var miXHR = new XMLHttpRequest();
        // miXHR.onreadystatechange = peticionNombreCorrecta;
        // miXHR.open("POST", url);
        // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // miXHR.send(param);

        var opciones = { url: path + "server/signUp/compruebaNombre.php", data: { name: name }, type: "POST", dataType: "json", };
        $.ajax(opciones)
            .done(peticionNombreCorrecta)
            // .fail()
            // .always(peticionNombreCorrecta)
            ;
    }
    cargaUser++;
}

function peticionNombreCorrecta(respuesta) {
    // if ((this.readyState === 4) && (this.status === 200)) {
    // console.log(this.responseText);
    // var respuesta = JSON.parse(this.responseText);
    console.log(respuesta)
    if (respuesta.length > 0) {
        $('#validUser').removeClass('validatorValid');
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: 'El nombre insertado ya está siendo utilizado',
            showConfirmButton: false,
            timer: 1000
        })
        nameValid = false;
    } else {
        $('#validUser').addClass('validatorValid');
        nameValid = true;
    }

    // }
    comprobarVacios();
    document.dispatchEvent(inputChangeEvent);
}

function validarEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function comprobarVacios() {
    var vacios = false;
    var inputs = $('.myInput');
    for (let input of inputs) {
        console.log(input.value)
        if (input.value) {
            if (input.value.trim() == '') {
                vacios = true;
            }
        } else {
            vacios = true;
        }
    }
    isValid = vacios ? false : true;
}

function passwordNoVacia(password) {
    if (password.value.trim() != '') {
        passwordValid = true;
        $('#validPass').addClass('validatorValid');
    } else {
        $('#validPass').removeClass('validatorValid');
        passwordValid = false;
    }
}

function comprobarPassword(passoword) {
    if ($('#password').val() != passoword.value) {
        $('#validPass2').removeClass('validatorValid');
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: 'Las dos contraseñas deben coincidir',
            showConfirmButton: false,
            timer: 1000
        })
        passwordValid = false;
    } else {
        passwordValid = true;
        $('#validPass2').addClass('validatorValid');
    }

}
function comprobarEmail(email) {
    if (validarEmail(email.value)) {


        // url = path + "server/signUp/compruebaEmail.php"

        // var param = 'email=' + email.value;
        // var miXHR = new XMLHttpRequest();
        // miXHR.onreadystatechange = peticionEmailCorrecta;
        // miXHR.open("POST", url);
        // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // miXHR.send(param);

        var opciones = { url: path + "server/signUp/compruebaEmail.php", data: { email: email.value }, type: "POST", dataType: "json", };
        $.ajax(opciones)
            .done(peticionEmailCorrecta)
            // .fail()
            // .always(peticionNombreCorrecta)
            ;
    } else {
        $('#validEmail').removeClass('validatorValid');
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: 'Introduce una dirección de correo válida',
            showConfirmButton: false,
            timer: 1000
        })
        emailValid = false;
    }


}

function peticionEmailCorrecta(respuesta) {
    // if ((this.readyState === 4) && (this.status === 200)) {
    // console.log(this.responseText);
    // var respuesta = JSON.parse(this.responseText);
    if (respuesta.length > 0) {
        $('#validEmail').removeClass('validatorValid');
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: 'El email insertado ya está siendo utilizado',
            showConfirmButton: false,
            timer: 1000
        })
        emailValid = false;
    } else {
        $('#validEmail').addClass('validatorValid');
        emailValid = true;
    }

    // }
    comprobarVacios();
    document.dispatchEvent(inputChangeEvent);
}


function insertaUsuario(user, pass, email) {
    // url = path + "server/signUp/registraUsuario.php"

    // var param = 'name=' + user + '&pass=' + pass + '&email=' + email + '&date=' + (new Date().toLocaleDateString('fr-CA'));

    // var miXHR = new XMLHttpRequest();
    // miXHR.onreadystatechange = insercionCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    var opciones = { url: path + "server/signUp/registraUsuario.php", data: { name: user, pass: pass, email: email, date: (new Date().toLocaleDateString('fr-CA')) }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEmailCorrecta)
        // .fail()
        .always(insercionCorrecta)
        ;

}

function insercionCorrecta() {
    // if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
    // }
}

