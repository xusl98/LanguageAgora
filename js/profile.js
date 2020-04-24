var user;
$(document).ready(function () {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    userId = urlParams.get('user');

    url = path + "server/profile/obtenerPerfil.php"
    var miXHR = new XMLHttpRequest();
    var param = 'user=' + userId;
    miXHR.onreadystatechange = peticionPerfilCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);

    url = path + "server/profile/obtenerPreguntasRealizadas.php"
    var miXHR = new XMLHttpRequest();
    var param = 'user=' + userId;
    miXHR.onreadystatechange = peticionGraficoPreguntasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);


    url = path + "server/profile/obtenerRespuestasRealizadas.php"
    var miXHR = new XMLHttpRequest();
    var param = 'user=' + userId;
    miXHR.onreadystatechange = peticionGraficoRespuestasCorrecta;
    miXHR.open("POST", url);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(param);

    
//SELECT COUNT(DISTINCT(question.questionId)), language.name from language, question, user where question.languageId = language.languageId and question.userId = 18 GROUP BY question.languageId
});



function peticionPerfilCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        user = respuesta[0];
        console.log(user)
        $('#userTitle').text(user.name);
    }
}
function peticionGraficoPreguntasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        var graphData = respuesta;
        console.log(graphData)

        var labels = [];
        var data = [];
        for (dato of respuesta){
            data.push(dato.count);
            labels.push(dato.name);
        }
        if (labels.length == 0){
            labels = ['Nada'];
            data = [1];
        }
        
        new Chart(document.getElementById("doughnut-chart-questions"), {
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Número de preguntas",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#F763F7", "#ADF763", "#120A91", "#E73E3E", "#E2E73E"],
                  data: data
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Número de preguntas por idioma'
              }
            }
        });
    }
}
function peticionGraficoRespuestasCorrecta() {
    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseText);
        var respuesta = JSON.parse(this.responseText);
        var graphData = respuesta;
        console.log(graphData)

        var labels = [];
        var data = [];
        for (dato of respuesta){
            data.push(dato.count);
            labels.push(dato.name);
        }
        if (labels.length == 0){
            labels = ['Nada'];
            data = [1];
        }
        
        new Chart(document.getElementById("doughnut-chart-answers"), {
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Número de respuestas",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#F763F7", "#ADF763", "#120A91", "#E73E3E", "#E2E73E"],
                  data: data
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Número de respuestas por idioma'
              }
            }
        });
    }
}