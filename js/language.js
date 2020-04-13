//TODO FUNCIONALIDAD MODO OSCURO

var languageId;
var languageName;
var num = 10;

$(document).ready(function () {
    


    //id y nombre del idioma de la url
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    languageId = urlParams.get('lang');
    languageName = urlParams.get('name');
    $('#titulo').text(languageName);
    obtenerPreguntas()

    $('#btnVerMas').click(function () {
        num += 10;
        obtenerPreguntas();
    });

    if (sessionStorage.getItem('user') != null){
        sesionIniciada = true;
    }


    sesionCambiada();
    $('#newQuestionAnchor').attr('href', 'newQuestion.html?lang=' + languageId + '&name=' + languageName);

});

$(document).on('sesionCerrada', function () {
    sesionCambiada();
});
$(document).on('sesionIniciada', function () {
    sesionCambiada();
});

function sesionCambiada() {
    console.log(sesionIniciada)
    
    if (sesionIniciada == true) {
        $('#newQuestionAnchor').css('display', 'block');
        $('#newQuestionAnchor2').css('display', 'none');
    } else {
        $('#newQuestionAnchor2').css('display', 'block');
        $('#newQuestionAnchor').css('display', 'none');
    }
}

function obtenerPreguntas() {
    url = path + "server/language/obtenerPreguntas.php"
    var miXHR = new XMLHttpRequest();
    var param = 'lang=' + languageId + '&num=' + num;
    miXHR.onreadystatechange = peticionPreguntasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function peticionPreguntasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var preguntas = JSON.parse(this.responseText);
        if (preguntas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(preguntas)
            var lista = '';
            for (let pregunta of preguntas) {
                var texto = pregunta.text.substring(0, 50) + '...';
                //TODO abrir pagina de question al pulsar
                lista += '<a href="question.html?question=' + pregunta.questionID + '&lang=' + languageName + '&langId='+languageId+'" class="list-group-item list-group-item-action"><div><div class="row"><u class="col-10">' + pregunta.title + '</u><span class="col-2">' + pregunta.date + '</span></div><div>' + texto + '</div><div class="row"><span class="col-10">&nbsp;</span><span>' + pregunta.name + '</span></div></div></a>';
            }
            $('#lista').html(lista);
            console.log(lista)
        } else {
            console.log('No hay preguntas')
        }

    }
}


