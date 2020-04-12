var questionId;
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


    cargarRespuestas(questionId);

    


});

function cargarRespuestas(questionId){
    url = path + "LanguageAgora/server/question/obtenerRespuestas.php"
    var miXHR = new XMLHttpRequest();
    var param = 'question=' + questionId;
    miXHR.onreadystatechange = peticionRespuestasCorrecta;
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
            for (let respuesta of respuestas) {
                html += '<div class="card text-center">' +
                    '<div class="card-body container-fluid" style="margin-top: 3%;">' +
                    '<p  class="card-text align-left">' + respuesta.text +
                    '</p>' +
                    '<div class="row">' +
                    '<div class="col-md-8">&nbsp;</div>' +
                    '<div class="col-md-4">' +
                    '<button id="down-' + respuesta.answerId + '" partnerBtn="up-' + respuesta.answerId + '" type="button" class="btn btn-secondary btn-vote"><i class="fa fa-arrow-down"></i></button>' +
                    '<span id="score-' + respuesta.answerId + '">' + respuesta.score + '</span>' +
                    '<button id="up-' + respuesta.answerId + '" partnerBtn="down-' + respuesta.answerId + '" type="button" class="btn btn-secondary btn-vote"><i class="fa fa-arrow-up"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer text-muted">' +
                    '<div><span  style="margin-right: 5%;">' + respuesta.date + '</span><a' +
                    'style="color: #6c757d; margin-left: 5%;" href="#" >' + respuesta.name + '</a></div>' +
                    '</div>' +
                    '</div>';
                console.log(sesionIniciada)
                //Salén marcadas las respuestas que has votado
                if (sesionIniciada == true) {
                    comprobarVotado(respuesta.answerId);
                }
            }
            $('#respuestas').html(html);


            $('.btn-vote').click(function () {
                console.log($(this))
                //Si quieres anular una votación
                if ($(this).hasClass('btn-warning')) {
                    $(this).removeClass('btn-warning');
                    $(this).addClass('btn-secondary');
                    // Borrar el voto de la base de datos y cambiar valor del score de la respuesta
                    borrarVoto(sessionStorage.getItem('user'), $(this).attr('id').split('-')[1], $(this).attr('id').split('-')[0]);

                } else {
                    var partnerBtn = $(this).attr('partnerBtn');
                    partnerBtn = $('#' + partnerBtn);
                    // Si el otro botón está marcado
                    if (partnerBtn.hasClass('btn-warning')) {
                        //deseleccionar el otro botón y seleccionar el pulsado
                        partnerBtn.removeClass('btn-warning');
                        partnerBtn.addClass('btn-secondary');
                        $(this).removeClass('btn-secondary');
                        $(this).addClass('btn-warning');
                        // Modificar el atributo upvoted y cambiar valor del score de la respuesta
                        borrarVoto(sessionStorage.getItem('user'), $(this).attr('id').split('-')[1], $(this).attr('partnerBtn').split('-')[0]);
                        insertarVoto(sessionStorage.getItem('user'), $(this).attr('id').split('-')[1], $(this).attr('id').split('-')[0]);
                    } else {
                        $(this).removeClass('btn-secondary');
                        $(this).addClass('btn-warning');
                        // Insertar el voto en la base de datos y cambiar valor del score de la respuesta
                        insertarVoto(sessionStorage.getItem('user'), $(this).attr('id').split('-')[1], $(this).attr('id').split('-')[0]);
                    }
                }


            });



        } else {
            console.log('No hay preguntas')
        }

    }
}

function comprobarVotado(answerId) {
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
            console.log(votaciones)
            if (votaciones[0].upvoted == 1) {
                $('#up-' + votaciones[0].answerId).attr('class', 'btn btn-warning');
            } else if (votaciones[0].upvoted == 0) {
                $('#down-' + votaciones[0].answerId).attr('class', 'btn btn-warning');
            }


        } else {
            // console.log('No hay votaciones')
        }

    }
}


function borrarVoto(userId, answerId, voteType) {
    url = path + "LanguageAgora/server/question/borrarVoto.php"
    var miXHR = new XMLHttpRequest();
    var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user') + '&vote=' + voteType;
    miXHR.onreadystatechange = peticionBorrarVotadoCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}
function peticionBorrarVotadoCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        var answerId = this.responseText.split('-')[0];
        var vote = this.responseText.split('-')[1];
        if (vote.includes('up')){
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) - 1);
        } else if (vote.includes('down')){
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) + 1);

        }
    }
}

function insertarVoto(userId, answerId, voteType) {
    url = path + "LanguageAgora/server/question/insertarVoto.php"
    var miXHR = new XMLHttpRequest();
    var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user') + '&vote=' + voteType;
    miXHR.onreadystatechange = peticionInsertarVotadoCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}
function peticionInsertarVotadoCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        var answerId = this.responseText.split('-')[0];
        var vote = this.responseText.split('-')[1];
        if (vote.includes('up')){
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) + 1);
        } else if (vote.includes('down')){
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) - 1);

        }
    }
}