//TODO para cargar la página de inicio (spinner que aparezca al dar click a iniciar sesión hasta que termine de procesarse la petición)
//TODO hacer olvidaste la contraseña
$(document).ready(function () {
    console.log(path)
    $('#form').submit(function () {
        url = path + "LanguageAgora/server/index/comprobarInicio.php"
        var name = $('#user').val();
        var pass = $('#password').val();
        var param = 'name=' + name + '&pass=' + pass;
        // console.log(param)
        var miXHR = new XMLHttpRequest();
        miXHR.onreadystatechange = peticionCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
        return false;
    });
});

function peticionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        // console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        if (respuesta.length > 0) {
            sessionStorage.setItem('user', respuesta[0].userId);
            window.location.href = 'home.html';
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