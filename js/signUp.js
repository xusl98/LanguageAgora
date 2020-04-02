
isValid = false;
passwordValid = false;
nameValid = false;
emailValid = false;
var code = 0;

//Creación del evento inputChange que se emitirá al perder el foco de un input
inputChangeEvent = 1;
inputChangeEvent = new Event("inputChange", { bubbles: true });



$(document).ready(function () {

    $('input').on('blur', function () {

        switch (this.id) {
            case 'user':
                compruebaNombre(this);
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

    $('#form').submit(function () {
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
        if ($('#code').val() == code){
            alert('REGISTRADO');
            //TODO AÑADIR EL USUARIO A LA BASE DE DATOS
            //TODO REDIRIGIR A INICIO DE SESIÓN 
        }
    });

});


$(document).on('inputChange', function () {
    console.log(isValid);
    $('input[type=submit]')[0].disabled = isValid && passwordValid && nameValid && emailValid ? false : true;
});






function compruebaNombre(user) {
    url = "http://localhost/LanguageAgora/server/consulta.php"
    var name = user.value;

    var param = 'name=' + name;
    // console.log(param)
    if (name.trim() == '') {
        isValid = false;
        $('#user').css('background-color', '#c96c62');
        $('#toastText').text('El campo nombre no puede estar vacío.');
        $('#nameToast').toast({
            animation: true,
            autohide: true,
            delay: 3000
        });
        $('#nameToast').toast('show');
        document.dispatchEvent(inputChangeEvent);
    } else {
        var miXHR = new XMLHttpRequest();
        miXHR.onreadystatechange = peticionCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
    }
}

function peticionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        // console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        if (respuesta.length > 0) {
            $('#user').css('background-color', '#c96c62');
            $('#toastText').text('El nombre insertadoya está siendo utilizado.');
            $('#nameToast').toast({
                animation: true,
                autohide: true,
                delay: 3000
            });
            $('#nameToast').toast('show');
            nameValid = false;
        } else {
            nameValid = true;
        }

    }
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

function comprobarPassword(passoword) {
    if ($('#password').val() != passoword.value) {
        $(this).css('background-color', '#c96c62');
        $('#toastText').text('Las dos contraseñas deben coincidir.');
        $('#nameToast').toast({
            animation: true,
            autohide: true,
            delay: 3000
        });
        $('#nameToast').toast('show');
        passwordValid = false;
    } else {
        passwordValid = true;
    }

}
function comprobarEmail(email) {
    if (validarEmail(email.value)) {
        emailValid = true;
    } else {
        $(this).css('background-color', '#c96c62');
        $('#toastText').text('Introduce una dirección de correo válido.');
        $('#nameToast').toast({
            animation: true,
            autohide: true,
            delay: 3000
        });
        $('#nameToast').toast('show');
        emailValid = false;
    }
}

