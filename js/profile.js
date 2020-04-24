var user;
$(document).ready(function () {

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  userId = urlParams.get('user');

  //Datos del perfil
  url = path + "server/profile/obtenerPerfil.php"
  var miXHR = new XMLHttpRequest();
  var param = 'user=' + userId;
  miXHR.onreadystatechange = peticionPerfilCorrecta;
  miXHR.open("POST", url);
  miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  miXHR.send(param);

  //Gráfico preguntas
  url = path + "server/profile/obtenerPreguntasRealizadas.php"
  var miXHR = new XMLHttpRequest();
  var param = 'user=' + userId;
  miXHR.onreadystatechange = peticionGraficoPreguntasCorrecta;
  miXHR.open("POST", url);
  miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  miXHR.send(param);

  //Gráfico repuestas
  url = path + "server/profile/obtenerRespuestasRealizadas.php"
  var miXHR = new XMLHttpRequest();
  var param = 'user=' + userId;
  miXHR.onreadystatechange = peticionGraficoRespuestasCorrecta;
  miXHR.open("POST", url);
  miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  miXHR.send(param);

  //Últimas preguntas
  url = path + "server/profile/obtenerUltimasPreguntas.php"
  var miXHR = new XMLHttpRequest();
  var param = 'user=' + userId;
  miXHR.onreadystatechange = peticionPreguntasCorrecta;
  miXHR.open("POST", url);
  miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  miXHR.send(param);

  //Últimas respuestas
  url = path + "server/profile/obtenerUltimasRespuestas.php"
  var miXHR = new XMLHttpRequest();
  var param = 'user=' + userId;
  miXHR.onreadystatechange = peticionRespuestasCorrecta;
  miXHR.open("POST", url);
  miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  miXHR.send(param);


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
    var respuesta = JSON.parse(this.responseText);
    var graphData = respuesta;
    console.log(graphData)

    var labels = [];
    var data = [];
    for (dato of respuesta) {
      data.push(dato.count);
      labels.push(dato.name);
    }
    if (labels.length == 0) {
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
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#F763F7", "#ADF763", "#120A91", "#E73E3E", "#E2E73E"],
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
    var respuesta = JSON.parse(this.responseText);
    var graphData = respuesta;
    console.log(graphData)

    var labels = [];
    var data = [];
    for (dato of respuesta) {
      data.push(dato.count);
      labels.push(dato.name);
    }
    if (labels.length == 0) {
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
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#F763F7", "#ADF763", "#120A91", "#E73E3E", "#E2E73E"],
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
function peticionPreguntasCorrecta() {
  if ((this.readyState === 4) && (this.status === 200)) {
    var preguntas = JSON.parse(this.responseText);
    console.log(preguntas)
    var html = "";
    for (pregunta of preguntas){
      html += '<div class="list-group-item list-group-item-action"><span>' + pregunta.name + '</span><a href="question.html?question=' + pregunta.questionID + '&lang=' + pregunta.name + '&langId=' + pregunta.languageId + '" class="list-group-item list-group-item-action">' + pregunta.title + '</a></div>';
    }
    $('#listaPreguntas').html(html);
  }
}
function peticionRespuestasCorrecta() {
  if ((this.readyState === 4) && (this.status === 200)) {
    var respuestas = JSON.parse(this.responseText);
    console.log(respuestas)
    var html = "";
    for (respuesta of respuestas){
      html += '<div class="list-group-item list-group-item-action"><span>' + respuesta.name + '</span><a href="question.html?question=' + respuesta.questionId + '&lang=' + respuesta.name + '&langId=' + respuesta.languageId + '" class="list-group-item list-group-item-action">' + respuesta.text + '</a></div>';
    }
    console.log(html)
    $('#listaRespuestas').html(html);
  }
}