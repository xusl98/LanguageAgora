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
            // url = path + "server/question/insertaRespuesta.php"
            // var miXHR = new XMLHttpRequest();
            // var param = 'question=' + questionId + '&text=' + text + '&user=' + sessionStorage.getItem('user') + '&date=' + (new Date().toLocaleDateString('fr-CA'));
            // console.log(param)
            // miXHR.onreadystatechange = peticionInsertaRespCorrecta;
            // miXHR.open("POST", url);
            // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // miXHR.send(param);


            var opciones = { url: path + "server/question/insertaRespuesta.php", data: { question: questionId, text: text, user: sessionStorage.getItem('user'), date: (new Date().toLocaleDateString('fr-CA')) }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                .done(peticionInsertaRespCorrecta)
                // .fail()
                // .always(inicioSesionCorrecto)
                ;
        } else {
            //  Update respuesta y cargarRespuestas()
            var text = $('#answerBody').val();
            // url = path + "server/question/actualizaRespuesta.php"
            // var miXHR = new XMLHttpRequest();
            // var param = 'answer=' + answer + '&text=' + text;
            // console.log(param)
            // miXHR.onreadystatechange = peticionEditaRespCorrecta;
            // miXHR.open("POST", url);
            // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // miXHR.send(param);

            var opciones = { url: path + "server/question/actualizaRespuesta.php", data: { answer: answer, text: text }, type: "POST", dataType: "json", };
            $.ajax(opciones)
                .done(peticionEditaRespCorrecta)
                // .fail()
                // .always(inicioSesionCorrecto)
                ;
        }




        $('#nuevaRespuesta').css('display', 'none');
    });


    $('#deleteQuestion').click(function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar la pregunta después de borrarla",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {
                // url = path + "server/question/borrarPregunta.php"
                // var miXHR = new XMLHttpRequest();
                // var param = 'question=' + questionId;
                // miXHR.onreadystatechange = peticionEliminarPregCorrecta;
                // miXHR.open("POST", url);
                // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                // miXHR.send(param);

                var opciones = { url: path + "server/question/borrarPregunta.php", data: { question: questionId }, type: "POST", dataType: "json", };
                $.ajax(opciones)
                    // .done(peticionEliminarPregCorrecta)
                    // .fail()
                    .always(peticionEliminarPregCorrecta)
                    ;

            }
        })
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
    // url = path + "server/question/obtenerPregunta.php"
    // var miXHR = new XMLHttpRequest();
    // var param = 'question=' + questionId;
    // miXHR.onreadystatechange = peticionPreguntasCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    var opciones = { url: path + "server/question/obtenerPregunta.php", data: { question: questionId }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        .done(peticionPreguntasCorrecta)
        // .fail()
        // .always(peticionEliminarPregCorrecta)
        ;
}

function cargarRespuestas(questionId) {
    // url = path + "server/question/obtenerRespuestas.php"
    // var miXHR = new XMLHttpRequest();
    // var param = 'question=' + questionId;
    // miXHR.onreadystatechange = peticionRespuestasCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    var opciones = { url: path + "server/question/obtenerRespuestas.php", data: { question: questionId }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        .done(peticionRespuestasCorrecta)
        // .fail()
        // .always(peticionEliminarPregCorrecta)
        ;

}



function comprobarVotado(answerId) {
    // url = path + "server/question/comprobarVotado.php"
    // var miXHR = new XMLHttpRequest();
    // console.log(sessionStorage.getItem('user'))
    // console.log(answerId)
    // var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user');
    // miXHR.onreadystatechange = peticioncomprobarVotadoCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    var opciones = { url: path + "server/question/comprobarVotado.php", data: { answer: answerId, user: sessionStorage.getItem('user') }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticioncomprobarVotadoCorrecta)
        // .fail()
        .always(peticioncomprobarVotadoCorrecta)
        ;
}




function borrarVoto(userId, answerId, voteType) {
    // url = path + "server/question/borrarVoto.php"
    // var miXHR = new XMLHttpRequest();
    // var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user') + '&vote=' + voteType;
    // miXHR.onreadystatechange = peticionBorrarVotadoCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    var opciones = { url: path + "server/question/borrarVoto.php", data: { answer: answerId, user: sessionStorage.getItem('user'), vote: voteType }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionBorrarVotadoCorrecta)
        // .fail()
        .always(peticionBorrarVotadoCorrecta)
        ;
}


function insertarVoto(userId, answerId, voteType) {
    // url = path + "server/question/insertarVoto.php"
    // var miXHR = new XMLHttpRequest();
    // var param = 'answer=' + answerId + '&user=' + sessionStorage.getItem('user') + '&vote=' + voteType;
    // miXHR.onreadystatechange = peticionInsertarVotadoCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    var opciones = { url: path + "server/question/insertarVoto.php", data: { answer: answerId, user: sessionStorage.getItem('user'), vote: voteType }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionInsertarVotadoCorrecta)
        // .fail()
        .always(peticionInsertarVotadoCorrecta)
        ;
}
function peticionInsertarVotadoCorrecta(a) {
    // if ((this.readyState === 4) && (this.status === 200)) {
    console.log(a.responseText)
    var answerId = a.responseText.split('-')[0];
    var vote = a.responseText.split('-')[1];
    if (vote.includes('up')) {
        $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) + 1);
    } else if (vote.includes('down')) {
        $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) - 1);

    }
    // }
}
function peticionBorrarVotadoCorrecta(a) {
    // if ((this.readyState === 4) && (this.status === 200)) {
    console.log(a.responseText)
    var answerId = a.responseText.split('-')[0];
    var vote = a.responseText.split('-')[1];
    if (vote.includes('up')) {
        $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) - 1);
    } else if (vote.includes('down')) {
        $('#score-' + answerId).text(parseInt($('#score-' + answerId).text()) + 1);

    }
    // }
}
function peticionInsertaRespCorrecta() {
    // if ((this.readyState === 4) && (this.status === 200)) {
    console.log(this.responseText)
    console.log('respuesta añadida')
    cargarRespuestas(questionId);
    // }
}
function peticionEditaRespCorrecta() {
    // if ((this.readyState === 4) && (this.status === 200)) {
    console.log(this.responseText)
    console.log('respuesta editada')
    cargarRespuestas(questionId);
    // }
}

function peticionEliminarPregCorrecta() {
    // if ((this.readyState === 4) && (this.status === 200)) {
    Swal.fire(
        'Eliminado!',
        'La pregunta ha sido eliminada',
        'success'
    )
    window.location.href = 'index.php?option=language&lang=' + languageId + '&name=' + language;
    // }
}

function peticionEliminarRespCorrecta() {
    // if ((this.readyState === 4) && (this.status === 200)) {
        cargarRespuestas(questionId);
        Swal.fire(
            'Eliminado!',
            'La respuesta ha sido eliminada',
            'success'
        )
        // $('#elimModalResp').modal('hide');
    // }
}

function peticioncomprobarVotadoCorrecta(votaciones) {
    // if ((this.readyState === 4) && (this.status === 200)) {
    // var votaciones = JSON.parse(this.responseText);
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

    // }
}

function peticionPreguntasCorrecta(preguntas) {
    // if ((this.readyState === 4) && (this.status === 200)) {
    // var preguntas = JSON.parse(this.responseText);
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

    // }
}
function peticionRespuestasCorrecta(respuestas) {
    // if ((this.readyState === 4) && (this.status === 200)) {
    // var respuestas = JSON.parse(this.responseText);
    if (respuestas.length > 0) {
        console.log(respuestas)
        var html = '';
        for (let respuesta of respuestas) {
            html += '<div class="card text-center">' +
                '<div class="card-body container-fluid textoIzquierda" style="margin-top: 3%;">' +
                '<p id="text-' + respuesta.answerId + '"  class="card-text align-left">' + respuesta.text +
                '</p>' +
                '<div class="row">' +
                '<div class="col-md-8" style="text-align:left;"><a id="editAnswer-' + respuesta.answerId + '" class="editAnswer" style="color: gray;" href="#">Editar</a>&nbsp;<a id="deleteAnswer-' + respuesta.answerId + '" class="deleteAnswer" style="color: gray;" href="#">Eliminar</a></div>' +
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
            var answer = id;
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás recuperar la respuesta después de borrarla",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.value) {
                    // url = path + "server/question/borrarRespuesta.php"
                    // var miXHR = new XMLHttpRequest();
                    // console.log(answer)
                    // var param = 'answer=' + answer;
                    // miXHR.onreadystatechange = peticionEliminarRespCorrecta;
                    // miXHR.open("POST", url);
                    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    // miXHR.send(param);

                    var opciones = { url: path + "server/question/borrarRespuesta.php", data: { answer: answer }, type: "POST", dataType: "json", };
                    $.ajax(opciones)
                        // .done(peticionInsertarVotadoCorrecta)
                        // .fail()
                        .always(peticionEliminarRespCorrecta)
                        ;

                }
            })
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

    // }
}