var userId;
var questionId;





$(document).ready(function () {
    $('#dtBasicExample').DataTable({
        "paging": true // false to disable pagination (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');
    $('#tablaUsuarios').DataTable({
        "paging": true // false to disable pagination (or any other option)
    });

    if (parseInt(sessionStorage.getItem('userType')) == 1) {
        $('#usersLi').css('display', 'none');
    }


    $('.elimUser').click(function (e) {

        userId = e.target.id

        Swal.fire({
            title: '¿Estás seguro?',
            text: "El usuario \"" + $('#name' + userId).text() + "\" se borrará definitivamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {

                var opciones = { url: path + "server/gestion/borrarUsuario.php", data: { userId: userId }, type: "POST", dataType: "json", };
                $.ajax(opciones)
                    // .done(peticionEliminarPregCorrecta)
                    // .fail()
                    .always(peticionEliminarUsuarioCorrecta)
                    ;

            }
        })
    });
    $('.elimPreg').click(function (e) {

        questionId = e.target.id

        Swal.fire({
            title: '¿Estás seguro?',
            text: "La pregunta \"" + $('#title' + questionId).text() + "\" se borrará definitivamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {

                var opciones = { url: path + "server/gestion/borrarPregunta.php", data: { questionId: questionId }, type: "POST", dataType: "json", };
                $.ajax(opciones)
                    // .done(peticionEliminarPregCorrecta)
                    // .fail()
                    .always(peticionEliminarPreguntaCorrecta)
                    ;

            }
        })
    });

    var opciones = { url: path + "server/gestion/obtenerVisitasMes.php", data: {}, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerVisitasMes)
        ;

    var opciones = { url: path + "server/gestion/obtenerVisitasAno.php", data: {}, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerVisitasAno)
        ;

    var opciones = { url: path + "server/gestion/obtenerPreguntasAno.php", data: {}, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerPreguntasAno)
        ;

    var opciones = { url: path + "server/gestion/obtenerPreguntasMes.php", data: {}, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerPreguntasMes)
        ;


});


function peticionEliminarUsuarioCorrecta() {
    $('#tr' + userId).remove();
    Swal.fire(
        'Eliminado!',
        'El usuario ha sido eliminado',
        'success'
    )
}
function peticionEliminarPreguntaCorrecta() {
    $('#tr' + questionId).remove();
    Swal.fire(
        'Eliminado!',
        'La pregunta ha sido eliminada',
        'success'
    )
}
function peticionObtenerVisitasMes(visitas) {
    console.log(visitas)

    var fecha = new Date();

    var labelsMonth = [];
    var dias = getDaysInMonth(fecha.getMonth(), fecha.getFullYear());
    var dataMonth = [];
    for (visita of visitas) {
        dataMonth[visita['dia'] - 1] = visita['visitas'];
    }
    for (let i = 0; i < dias; i++) {
        if (dataMonth[i] == null) {
            dataMonth[i] = 0;
        }
        labelsMonth[i] = i + 1;
    }

    new Chart(document.getElementById("line-chart-visits-month"), {
        type: 'line',
        responsive: true,
        data: {
            labels: labelsMonth,
            datasets: [
                {
                    borderColor: '#1A5F83',
                    backgroundColor: 'transparent',
                    label: "Número de visitas",
                    data: dataMonth
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Visitas por día en el mes actual'
            }
        }
    });


}
function peticionObtenerPreguntasMes(preguntas) {
    console.log(preguntas)

    var fecha = new Date();

    var labelsMonth = [];
    var dias = getDaysInMonth(fecha.getMonth(), fecha.getFullYear());
    var dataMonth = [];
    for (pregunta of preguntas) {
        dataMonth[pregunta['dia'] - 1] = pregunta['preguntas'];
    }
    for (let i = 0; i < dias; i++) {
        if (dataMonth[i] == null) {
            dataMonth[i] = 0;
        }
        labelsMonth[i] = i + 1;
    }

    new Chart(document.getElementById("line-chart-questions-month"), {
        type: 'line',
        responsive: true,
        data: {
            labels: labelsMonth,
            datasets: [
                {
                    borderColor: '#1A5F83',
                    backgroundColor: 'transparent',
                    label: "Número de preguntas",
                    data: dataMonth
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Preguntas por día en el mes actual'
            }
        }
    });


}

function peticionObtenerVisitasAno(visitas) {
    console.log(visitas)
    var fecha = new Date();

    var labelsYear = [];
    var dataYear = [];
    for (visita of visitas) {
        dataYear[visita['mes'] - 1] = visita['visitas'];
    }
    for (let i = 0; i < 12; i++) {
        if (dataYear[i] == null) {
            dataYear[i] = 0;
        }
        labelsYear[i] = i + 1;
    }


    new Chart(document.getElementById("line-chart-visits-year"), {
        type: 'line',
        responsive: true,
        data: {
            labels: labelsYear,
            datasets: [
                {
                    borderColor: '#1A5F83',
                    backgroundColor: 'transparent',
                    label: "Número de visitas",
                    data: dataYear
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Visitas por mes en el año actual'
            }
        }
    });

}
function peticionObtenerPreguntasAno(preguntas) {
    console.log(preguntas)
    var fecha = new Date();

    var labelsYear = [];
    var dataYear = [];
    for (pregunta of preguntas) {
        dataYear[pregunta['mes'] - 1] = pregunta['preguntas'];
    }
    for (let i = 0; i < 12; i++) {
        if (dataYear[i] == null) {
            dataYear[i] = 0;
        }
        labelsYear[i] = i + 1;
    }


    new Chart(document.getElementById("line-chart-questions-year"), {
        type: 'line',
        responsive: true,
        data: {
            labels: labelsYear,
            datasets: [
                {
                    borderColor: '#1A5F83',
                    backgroundColor: 'transparent',
                    label: "Número de preguntas",
                    data: dataYear
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Preguntas por mes en el año actual'
            }
        }
    });

}


$(document).on('sesionCerrada', function () {
    window.location.href = "index.php";
});


function getDaysInMonth(month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
};