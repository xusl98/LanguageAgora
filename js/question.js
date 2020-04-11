var questionId;
var repuestaActual = -1;
$(document).ready(function () {

    //coger de la url elid de la pregunta 
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    questionId = urlParams.get('question');
    language = urlParams.get('lang');
    languageId = urlParams.get('langId');

    //obtener todos los datos de la pregunta
    url = path + "LanguageAgora/server/question/obtenerPregunta.php"
    var miXHR = new XMLHttpRequest();
    var param = 'question=' + questionId;
    miXHR.onreadystatechange = peticionPreguntasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);

    $('#idioma').text(language);
    $("#idioma").attr("href", 'language.html?lang=' + languageId + '&name=' + language);


    url = path + "LanguageAgora/server/question/obtenerRespuestas.php"
    var miXHR = new XMLHttpRequest();
    var param = 'question=' + questionId;
    miXHR.onreadystatechange = peticionRespuestasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
    

});

function peticionPreguntasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var preguntas = JSON.parse(this.responseText);
        if (preguntas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(preguntas)
            $('#titulo').text(preguntas[0].title);
            $('#texto').text(preguntas[0].text);
            $('#fecha').text(preguntas[0].date);
            $('#pregUser').text(preguntas[0].name);

            
        } else {
            console.log('No hay preguntas')
        }

    }
}
function peticionRespuestasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var respuestas = JSON.parse(this.responseText);
        if (respuestas.length > 0) {
            console.log(respuestas)
            var html = '';
            for (let respuesta of respuestas){
                repuestaActual = respuesta.answerId;
                html += '<div class="card text-center">'+
                '<div class="card-body container-fluid" style="margin-top: 3%;">'+
                    '<p  class="card-text align-left">'+respuesta.text+
                    '</p>'+
                    '<div class="row">'+
                        '<div class="col-md-8">&nbsp;</div>'+
                        '<div class="col-md-4">'+  
                            '<button id="down'+respuesta.answerId+'" type="button" class="btn btn-secondary"><i class="fa fa-arrow-down"></i></button>'+
                            respuesta.score+
                            '<button id="up'+respuesta.answerId+'" type="button" class="btn btn-secondary"><i class="fa fa-arrow-up"></i></button>'+  
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="card-footer text-muted">'+
                    '<div><span  style="margin-right: 5%;">'+respuesta.date+'</span><a'+
                            'style="color: #6c757d; margin-left: 5%;" href="#" >'+respuesta.name+'</a></div>'+
                '</div>'+
            '</div>';
            console.log(sesionIniciada)
            if (sesionIniciada == true){
                comprobarVotado(respuesta.answerId);
            }
            }
            $('#respuestas').html(html);
            //idiomas el dropdown y la lista de idiomas
            

            
        } else {
            console.log('No hay preguntas')
        }

    }
}

function comprobarVotado(answerId){
    url = path + "LanguageAgora/server/question/comprobarVotado.php"
    var miXHR = new XMLHttpRequest();
    console.log(sessionStorage.getItem('user'))
    console.log(answerId)
    var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user');
    miXHR.onreadystatechange = peticioncomprobarVotadoCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function peticioncomprobarVotadoCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var votaciones = JSON.parse(this.responseText);
        if (votaciones.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            //TODO hacer la funcionalidad de los votos
            console.log(votaciones)
            if (votaciones[0].upvoted == 1){
                $('#up' + repuestaActual).attr('class', 'btn btn-warning');
            } else if (votaciones[0].upvoted == 0){
                $('#down' + repuestaActual).attr('class', 'btn btn-warning');
            }

            
        } else {
            console.log('No hay votaciones')
        }

    }
}