var user;
var userName;
var userId;
$(document).ready(function () {

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  userId = urlParams.get('user');

  //Datos del perfil

  var opciones = { url: path + "server/profile/obtenerPerfil.php", data: { user: userId }, type: "POST", dataType: "json", };
  $.ajax(opciones)
    .done(peticionPerfilCorrecta)
    // .fail()
    // .always(inicioSesionCorrecto)
    ;

  //Gráfico preguntas

  var opciones = { url: path + "server/profile/obtenerPreguntasRealizadas.php", data: { user: userId }, type: "POST", dataType: "json", };
  $.ajax(opciones)
    .done(peticionGraficoPreguntasCorrecta)
    // .fail()
    // .always(inicioSesionCorrecto)
    ;

  //Gráfico repuestas

  var opciones = { url: path + "server/profile/obtenerRespuestasRealizadas.php", data: { user: userId }, type: "POST", dataType: "json", };
  $.ajax(opciones)
    .done(peticionGraficoRespuestasCorrecta)
    // .fail()
    // .always(inicioSesionCorrecto)
    ;

  //Últimas preguntas

  var opciones = { url: path + "server/profile/obtenerUltimasPreguntas.php", data: { user: userId }, type: "POST", dataType: "json", };
  $.ajax(opciones)
    .done(peticionPreguntasCorrecta)
    // .fail()
    // .always(inicioSesionCorrecto)
    ;

  //Últimas respuestas

  var opciones = { url: path + "server/profile/obtenerUltimasRespuestas.php", data: { user: userId }, type: "POST", dataType: "json", };
  $.ajax(opciones)
    .done(peticionRespuestasCorrecta)
    // .fail()
    // .always(inicioSesionCorrecto)
    ;


  $('#btnPreguntas').attr('href', 'index.php?option=userList&user=' + userId + '&tipo=Preguntas');
  $('#btnRespuestas').attr('href', 'index.php?option=userList&user=' + userId + '&tipo=Respuestas');



  sesionCambiada();

  $(document).on('sesionCerrada', function () {
    sesionCambiada();
  });
  $(document).on('sesionIniciada', function () {
    sesionCambiada();
  });


});

function sesionCambiada() {
  if (sesionIniciada == true) {//Si la sesión está iniciada
    if (parseInt(sessionStorage.getItem('user')) == userId) {//si tu usuario es el mismo que el del perfil se verá el botón de de modif el perfil pero no el de mensaje
      $('#modPerfil').css('visibility', 'visible');
      $('#mensaje').css('visibility', 'hidden');
    } else {//si tu usuario es distinto al del perfil se verá el botón de mensaje pero no el de modif el perfil
      $('#modPerfil').css('visibility', 'hidden');
      $('#mensaje').css('visibility', 'visible');
      $('#mensaje').attr('href', 'index.php?option=message&user=' + parseInt(sessionStorage.getItem('user')) + '&receiver=' + userId + '&receiverName=' + userName);
    }
  } else {//si no tienes sesión iniciada no se verá ningún botón
    $('#modPerfil').css('visibility', 'hidden');
    $('#mensaje').css('visibility', 'hidden');
  }
}



function peticionPerfilCorrecta(respuesta) {
  // if ((this.readyState === 4) && (this.status === 200)) {
    console.log(this.responseText);
    // var respuesta = JSON.parse(this.responseText);
    user = respuesta[0];
    console.log(user)
    $('#modPerfil').attr('href', 'index.php?option=modifProfile&user=' + userId + '&userName=' + user.name);
    userName = user.name;
    $('#mensaje').attr('href', 'index.php?option=message&user=' + parseInt(sessionStorage.getItem('user')) + '&receiver=' + userId + '&receiverName=' + userName);
    $('#userTitle').text(user.name);
  // }
}
function peticionGraficoPreguntasCorrecta(respuesta) {
  // if ((this.readyState === 4) && (this.status === 200)) {
    // var respuesta = JSON.parse(this.responseText);
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
      responsive: true,
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
  // }
}
function peticionGraficoRespuestasCorrecta(respuesta) {
  // if ((this.readyState === 4) && (this.status === 200)) {
    // var respuesta = JSON.parse(this.responseText);
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
      responsive: true,
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
  // }
}
function peticionPreguntasCorrecta(preguntas) {
  // if ((this.readyState === 4) && (this.status === 200)) {
    // var preguntas = JSON.parse(this.responseText);
    console.log(preguntas)
    var html = "";
    for (pregunta of preguntas) {
      html += '<div class="list-group-item "><a style="color:black" href="index.php?option=language&lang=' + pregunta.languageId + '&name=' + pregunta.name + '">' + pregunta.name + '</a><a href="index.php?option=question&question=' + pregunta.questionID + '&lang=' + pregunta.name + '&langId=' + pregunta.languageId + '" class="list-group-item list-group-item-action">' + pregunta.title + '</a></div>';
    }
    if (html == "") {
      html = '<div class="list-group-item ">Este usuario no ha realizado ninguna pregunta</div>';
      $('#btnPreguntas').css('visibility', 'hidden');
    }
    $('#listaPreguntas').html(html);
  // }
}
function peticionRespuestasCorrecta(respuestas) {
  // if ((this.readyState === 4) && (this.status === 200)) {
    // var respuestas = JSON.parse(this.responseText);
    console.log(respuestas)
    var html = "";
    for (respuesta of respuestas) {
      html += '<div class="list-group-item "><a style="color: black" href="index.php?option=language&lang=' + respuesta.languageId + '&name=' + respuesta.name + '">' + respuesta.name + '</a><a href="index.php?option=question&question=' + respuesta.questionId + '&lang=' + respuesta.name + '&langId=' + respuesta.languageId + '" class="list-group-item list-group-item-action">' + respuesta.text.substring(0, 30) + '...</a></div>';
    }
    if (html == "") {
      html = '<div class="list-group-item ">Este usuario no ha respondido ninguna pregunta</div>';
      $('#btnRespuestas').css('visibility', 'hidden');
    }
    $('#listaRespuestas').html(html);
  // }
}