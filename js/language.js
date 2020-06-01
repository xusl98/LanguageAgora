
var languageId;
var languageName;
var num = 10;



$(document).ready(function () {


    $('#searchInput').val('');
    //id y nombre del idioma de la url
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    languageId = urlParams.get('lang');
    languageName = urlParams.get('name');
    $('#titulo').text(languageName);
    obtenerPreguntas()

    console.log(sessionStorage.getItem('user'))

    $('.idioma').text(languageName);


    sesionCambiada();
    $('#newQuestionAnchor').attr('href', 'index.php?option=newQuestion&lang=' + languageId + '&name=' + languageName + '&question=-1');


    $('#btnVerMas').click(function () {
        num += 10;
        obtenerPreguntas();
    });

    $('#searchBtn').click(function () {
        num = 10;
        obtenerPreguntas();
    });
    $('#closeChip').click(function () {
        $('#chip').css('visibility', 'hidden');
        $('#searchInput').val('');
        obtenerPreguntas();
    });
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
    var filter = $('#searchInput').val();
    if (filter == '') {
        $('#chip').css('visibility', 'hidden');
    } else {
        $('#chip').css('visibility', 'visible');
        $('#chipText').text(filter);
    }
    console.log('-' + filter + '-')

    var opciones = { url: path + "server/language/obtenerPreguntas.php", data: { lang: languageId, num: num, filter: filter }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        .done(peticionPreguntasCorrecta)
        // .fail()
        // .always()
        ;


    // url = path + "server/language/obtenerPreguntas.php"
    // var miXHR = new XMLHttpRequest();
    // var param = 'lang=' + languageId + '&num=' + num + '&filter=' + filter;
    // miXHR.onreadystatechange = peticionPreguntasCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    // url = path + "server/language/obtenerUsuariosMasPreguntas.php"
    // var miXHR = new XMLHttpRequest();
    // var param = 'lang=' + languageId;
    // miXHR.onreadystatechange = peticionUsuariosPreguntasCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);

    // url = path + "server/language/obtenerUsuariosMasRespuestas.php"
    // var miXHR = new XMLHttpRequest();
    // var param = 'lang=' + languageId;
    // miXHR.onreadystatechange = peticionUsuariosRespuestasCorrecta;
    // miXHR.open("POST", url);
    // miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // miXHR.send(param);
}

function peticionPreguntasCorrecta(preguntas) {
    // if ((this.readyState === 4) && (this.status === 200)) {
        // var preguntas = JSON.parse(this.responseText);
        if (preguntas.length > 0) {
            //idiomas el dropdown y la lista de idiomas
            console.log(preguntas)
            var lista = '';
            for (let pregunta of preguntas) {
                var texto = pregunta.text.substring(0, 50) + '...';
                lista += '<a href="index.php?option=question&question=' + pregunta.questionID + '&lang=' + languageName + '&langId=' + languageId + '" class="list-group-item list-group-item-action"><div><div class="row"><u class="col-10">' + pregunta.title + '</u><span class="col-2">' + pregunta.date + '</span></div><div>' + texto + '</div><div class="row"><span class="col-10">&nbsp;</span><span>' + pregunta.name + '</span></div></div></a>';
            }
            $('#lista').html(lista);
            console.log(lista)
        } else {
            console.log('No hay preguntas')
        }

    // }
}
// function peticionUsuariosPreguntasCorrecta() {
//     if ((this.readyState === 4) && (this.status === 200)) {
//         var usuarios = JSON.parse(this.responseText);
//         if (usuarios.length > 0) {
//             //lista usuarios con más preguntas
//             console.log(usuarios)
//             var lista = '';
//             for (let usuario of usuarios) {
//                 lista += '<a href="index.php?option=profile&user=' + usuario.userId + '" class="list-group-item d-flex justify-content-between align-items-center user">' + usuario.name + '<span class="badge badge-primary badge-pill">' + usuario.questions + '</span></a>';
//             }
//             // $('#listaUsuariosPreguntas').html(lista);
//             console.log(lista)
//         } else {
//             console.log('No hay usuarios')
//         }

//     }
// }
// function peticionUsuariosRespuestasCorrecta() {
//     if ((this.readyState === 4) && (this.status === 200)) {
//         var usuarios = JSON.parse(this.responseText);
//         if (usuarios.length > 0) {
//             //lista usuarios con más respuestas
//             console.log(usuarios)
//             var lista = '';
//             for (let usuario of usuarios) {
//                 lista += '<a href="index.php?option=profile&user=' + usuario.userId + '" class="list-group-item d-flex justify-content-between align-items-center user">' + usuario.name + '<span class="badge badge-primary badge-pill">' + usuario.answers + '</span></a>';
//             }
//             // $('#listaUsuariosRespuestas').html(lista);
//             console.log(lista)
//         } else {
//             console.log('No hay usuarios')
//         }

//     }
// }


