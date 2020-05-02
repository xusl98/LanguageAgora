var questionId;
var languageId;
var language;
$(document).ready(function () {

    //coger de la url elid de la pregunta 
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    questionId = urlParams.get('question');
    language = urlParams.get('lang');
    languageId = urlParams.get('langId');

    cargarPregunta(questionId);

    $('#idioma').text(language);
    $("#idioma").attr("href", 'index.php?option=language&lang=' + languageId + '&name=' + language);


    cargarRespuestas(questionId);

    $('#editQuestion').attr('href', 'index.php?option=newQuestion&lang=' + languageId + '&name=' + language + '&question=' + questionId);

    $('#btnEliminar').click(function () {
        url = path + "server/question/borrarPregunta.php"
        var miXHR = new XMLHttpRequest();
        var param = 'question=' + questionId;
        miXHR.onreadystatechange = peticionEliminarPregCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
    });
    $('#btnEliminarResp').click(function () {
        var answer = $(this).attr('answer');
        url = path + "server/question/borrarRespuesta.php"
        var miXHR = new XMLHttpRequest();
        console.log(answer)
        var param = 'answer=' + answer;
        miXHR.onreadystatechange = peticionEliminarRespCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
    });



    //Para que no aparezca al iniciar la página
    $('#nuevaRespuesta').css('display', 'none');



    $('#btnCancelarRespuesta').click(function () {
        $('#nuevaRespuesta').css('display', 'none');
    });

    $('#btnAceptarRespuesta').click(function () {
        var answer = $('#nuevaRespuesta').attr('new');
        console.log($(this))
        if ($('#nuevaRespuesta').attr('new') == -1) {
            //  Guardar respuesta y cargarRespuestas()
            var text = $('#answerBody').val();
            url = path + "server/question/insertaRespuesta.php"
            var miXHR = new XMLHttpRequest();
            var param = 'question=' + questionId + '&text=' + text + '&user=' + sessionStorage.getItem('user') + '&date=' + (new Date().toLocaleDateString('fr-CA'));
            console.log(param)
            miXHR.onreadystatechange = peticionInsertaRespCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
        } else {
            //  Update respuesta y cargarRespuestas()
            var text = $('#answerBody').val();
            url = path + "server/question/actualizaRespuesta.php"
            var miXHR = new XMLHttpRequest();
            var param = 'answer=' + answer + '&text=' + text;
            console.log(param)
            miXHR.onreadystatechange = peticionEditaRespCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
        }



        $('#nuevaRespuesta').css('display', 'none');
    });

});



$(document).on('sesionCerrada', function () {
    sesionCambiada();
});
$(document).on('sesionIniciada', function () {
    sesionCambiada();
});

function sesionCambiada() {
    cargarPregunta(questionId);
    cargarRespuestas(questionId);
}

function cargarPregunta(questionId) {
    url = path + "server/question/obtenerPregunta.php"
    var miXHR = new XMLHttpRequest();
    var param = 'question=' + questionId;
    miXHR.onreadystatechange = peticionPreguntasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}

function cargarRespuestas(questionId) {
    url = path + "server/question/obtenerRespuestas.php"
    var miXHR = new XMLHttpRequest();
    var param = 'question=' + questionId;
    miXHR.onreadystatechange = peticionRespuestasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);

}



function comprobarVotado(answerId) {
    url = path + "server/question/comprobarVotado.php"
    var miXHR = new XMLHttpRequest();
    console.log(sessionStorage.getItem('user'))
    console.log(answerId)
    var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user');
    miXHR.onreadystatechange = peticioncomprobarVotadoCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}




function borrarVoto(userId, answerId, voteType) {
    url = path + "server/question/borrarVoto.php"
    var miXHR = new XMLHttpRequest();
    var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user') + '&vote=' + voteType;
    miXHR.onreadystatechange = peticionBorrarVotadoCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);
}


function insertarVoto(userId, answerId, voteType) {
    url = path + "server/question/insertarVoto.php"
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
        if (vote.includes('up')) {
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) + 1);
        } else if (vote.includes('down')) {
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) - 1);

        }
    }
}
function peticionBorrarVotadoCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        var answerId = this.responseText.split('-')[0];
        var vote = this.responseText.split('-')[1];
        if (vote.includes('up')) {
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) - 1);
        } else if (vote.includes('down')) {
            $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) + 1);

        }
    }
}
function peticionInsertaRespCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        console.log('respuesta añadida')
        cargarRespuestas(questionId);
    }
}
function peticionEditaRespCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        console.log('respuesta editada')
        cargarRespuestas(questionId);
    }
}

function peticionEliminarPregCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        window.location.href = 'index.php?option=language&lang=' + languageId + '&name=' + language;
    }
}

function peticionEliminarRespCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        cargarRespuestas(questionId);
        $('#elimModalResp').modal('hide');
    }
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

function peticionPreguntasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var preguntas = JSON.parse(this.responseText);
        if (preguntas.length > 0) {

            console.log(preguntas)
            $('#titulo').text(preguntas[0].title);
            $('#texto').text(preguntas[0].text);
            $('#fecha').text(preguntas[0].date);
            $('#pregUser').text(preguntas[0].name);
            $('#pregUser').attr('href', 'index.php?option=profile&user=' + preguntas[0].userId);


            if (sessionStorage.getItem('user') != preguntas[0].userId) {
                $('#editQuestion').css('visibility', 'hidden');
                $('#deleteQuestion').css('visibility', 'hidden');
            } else {
                $('#editQuestion').css('visibility', 'visible');
                $('#deleteQuestion').css('visibility', 'visible');
            }

        } else {
            console.log('No hay preguntas')
        }

        if (sesionIniciada == true) {
            $('#contResp').html('<button id="btnResponder" class="btn btn-primary">Responder</button>');
            $('#btnResponder').click(function () {
                $('#nuevaRespuesta').css('display', 'block');
                $('#answerBody').val('');
                $('#nuevaRespuesta').attr('new', '-1');
            });
        } else {
            $('#contResp').html('<button id="btnResponder" class="btn btn-primary" data-toggle="modal" data-target="#inicioModal">Responder</button>');
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
                    '<div class="card-body container-fluid textoIzquierda" style="margin-top: 3%;">' +
                    '<p id="text-' + respuesta.answerId + '"  class="card-text align-left">' + respuesta.text +
                    '</p>' +
                    '<div class="row">' +
                    '<div class="col-md-8" style="text-align:left;"><a id="editAnswer-' + respuesta.answerId + '" class="editAnswer" style="color: gray;" href="#">Editar</a>&nbsp;<a  data-toggle="modal" data-target="#elimModalResp" id="deleteAnswer-' + respuesta.answerId + '" class="deleteAnswer" style="color: gray;" href="#">Eliminar</a></div>' +
                    '<div class="col-md-4">' +
                    '<button id="down-' + respuesta.answerId + '" partnerBtn="up-' + respuesta.answerId + '" type="button" class="btn btn-secondary btn-vote"><i class="fa fa-arrow-down"></i></button>' +
                    '<span id="score-' + respuesta.answerId + '">' + respuesta.score + '</span>' +
                    '<button id="up-' + respuesta.answerId + '" partnerBtn="down-' + respuesta.answerId + '" type="button" class="btn btn-secondary btn-vote"><i class="fa fa-arrow-up"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer text-muted">' +
                    '<div><span  style="margin-right: 5%;">' + respuesta.date + '</span><a ' +
                    'style="color: #6c757d; margin-left: 5%;" href="index.php?option=profile&user=' + respuesta.userId + '" >' + respuesta.name + '</a></div>' +
                    '</div>' +
                    '</div>';
                console.log(sesionIniciada)
                //Salén marcadas las respuestas que has votado
                if (sesionIniciada == true) {
                    comprobarVotado(respuesta.answerId);
                }
            }
            $('#respuestas').html(html);

            $('.deleteAnswer').click(function () {
                var id = $(this).attr('id').split('-')[1];
                $('#btnEliminarResp').attr('answer', id);
            });

            $('.editAnswer').click(function () {
                var id = $(this).attr('id').split('-')[1];
                $('#nuevaRespuesta').css('display', 'block');
                var texto = $('#text-' + id).text();
                $('#answerBody').val(texto);
                $('#nuevaRespuesta').attr('new', id);
            });

            for (respuesta of respuestas) {
                if (sessionStorage.getItem('user') != respuesta.userId) {
                    console.log(respuesta.answerId)
                    $('#editAnswer-' + respuesta.answerId).css('visibility', 'hidden');
                    $('#deleteAnswer-' + respuesta.answerId).css('visibility', 'hidden');
                }
            }


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
                        if (sesionIniciada) {
                            $(this).removeClass('btn-secondary');
                            $(this).addClass('btn-warning');
                            // Insertar el voto en la base de datos y cambiar valor del score de la respuesta
                            insertarVoto(sessionStorage.getItem('user'), $(this).attr('id').split('-')[1], $(this).attr('id').split('-')[0]);
                        } else {
                            $('#inicioSesion').click();
                        }
                    }
                }


            });



        } else {
            console.log('No hay preguntas')
        }

    }
}