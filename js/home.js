$(document).ready(function () {
    url = "http://localhost/LanguageAgora/server/home/obtenerIdiomas.php"
        // console.log(param)
        var miXHR = new XMLHttpRequest();
        miXHR.onreadystatechange = peticionCorrecta;
        miXHR.open("GET", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(null);
});

function peticionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var idiomas = JSON.parse(this.responseText);
        if (idiomas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(idiomas)
            var dropMenu = '';
            var lista = '';
            for (let idioma of idiomas){
                dropMenu += '<a class="dropdown-item" href="#">' + idioma.name + '</a>';
                lista += '<a href="#" class="list-group-item list-group-item-action">' + idioma.name + '</a>';
                $('#dropdown').html(dropMenu);
                $('#lista').html(lista);
            }
        } else {
           alert('Fallo en el servidor');
        }

    }
}