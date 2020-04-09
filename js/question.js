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
            $('#user').text(preguntas[0].name);

            
        } else {
            console.log('No hay preguntas')
        }

    }
}