var languageId;
var languageName;
var questionId;

$(document).ready(function () {


    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    languageId = urlParams.get('lang');
    languageName = urlParams.get('name');
    questionId = urlParams.get('question');

    $('#languageTitle').text(languageName);
    //Si es una nueva pregunta
    if (questionId < 0) {
        $('#btnAceptar').click(function () {
            console.log($('#questionTitle').val())
            console.log($('#questionBody').val())
            console.log(new Date())
            console.log(sessionStorage.getItem('user'))
            console.log(languageId)
            
            url = path + "server/newQuestion/insertarPregunta.php"
            var miXHR = new XMLHttpRequest();
            var param = 'title=' + $('#questionTitle').val() + '&text=' + $('#questionBody').val() + '&user=' + sessionStorage.getItem('user') + '&date=' + (new Date().toLocaleDateString('fr-CA')) + '&lang=' + languageId;
            miXHR.onreadystatechange = peticionInsertarQuestionCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
        });
    } else {
        //Si se edita una pregunta ya existente
        url = path + "server/question/obtenerPregunta.php"
        var miXHR = new XMLHttpRequest();
        var param = 'question=' + questionId;
        miXHR.onreadystatechange = peticionPreguntasCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
    }




});

function peticionPreguntasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        var preguntas = JSON.parse(this.responseText);
        if (preguntas.length > 0) {

            console.log(preguntas)
            $('#questionTitle').val(preguntas[0].title);
            $('#questionBody').val(preguntas[0].text);

        } else {
            console.log('No hay preguntas')
        }

        $('#btnAceptar').click(function () {

            console.log($('#questionTitle').val())
            console.log($('#questionBody').val())
            console.log(new Date())
            console.log(sessionStorage.getItem('user'))
            console.log(languageId)

            url = path + "server/newQuestion/actualizarPregunta.php"
            var miXHR = new XMLHttpRequest();
            var param = 'title=' + $('#questionTitle').val() + '&text=' + $('#questionBody').val() + '&id=' + questionId;
            miXHR.onreadystatechange = peticionActualizarQuestionCorrecta;
            miXHR.open("POST", url);
            miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            miXHR.send(param);
        });
    }
}

function peticionActualizarQuestionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        window.location.href = 'index.php?option=question&question=' + questionId + '&lang=' + languageName + '&langId=' + languageId;
    }
}
function peticionInsertarQuestionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        window.location.href = 'index.php?option=language&lang=' + languageId + '&name=' + languageName;
    }
}