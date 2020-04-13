var languageId;
var languageName;

$(document).ready(function () {


    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    languageId = urlParams.get('lang');
    languageName = urlParams.get('name');

    $('#languageTitle').text(languageName);


    $('#btnAceptar').click(function () {
        console.log($('#questionTitle').val())
        console.log($('#questionBody').val())
        console.log(new Date())
        console.log(sessionStorage.getItem('user'))
        console.log(languageId)

        url = path + "LanguageAgora/server/newQuestion/insertarPregunta.php"
        var miXHR = new XMLHttpRequest();
        var param = 'title=' + $('#questionTitle').val() + '&text=' + $('#questionBody').val() + '&user=' + sessionStorage.getItem('user') + '&date=' + (new Date().toLocaleDateString('fr-CA')) + '&lang=' + languageId;
        miXHR.onreadystatechange = peticionInsertarQuestionCorrecta;
        miXHR.open("POST", url);
        miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        miXHR.send(param);
    });

});

function peticionInsertarQuestionCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText)
        window.location.href = 'language.html?lang=' + languageId + '&name=' + languageName;
    }
}