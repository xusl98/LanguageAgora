
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


}

function peticionPreguntasCorrecta(preguntas) {
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

}


