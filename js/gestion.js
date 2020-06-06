var userId;
var questionId;

var selectedLangName;
var selectedLangId;





$(document).ready(function () {
    $('#dtBasicExample').DataTable({
        "paging": true // false to disable pagination (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');
    $('#tablaUsuarios').DataTable({
        "paging": true // false to disable pagination (or any other option)
    });

    if (parseInt(sessionStorage.getItem('userType')) == 1) {
        $('.onlyAdmin').css('display', 'none');
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



    $('#langSelector').change(function () {
        selectedLangName = $("#langSelector option:selected").text();
        if (selectedLangName != 'Elige un idioma...') {
            selectedLangId = $("#langSelector option:selected").attr('lang');

            $('#selectedLang').text(selectedLangName);
            $('#btnEliminarIdioma').css('visibility', 'visible');
            // $('#langGraphs').css('display', 'block');
            $('#langGraphs').slideToggle();

            preguntasIdiomaMes();
            preguntasIdiomaAnio();
            respuestasIdiomaMes();
            respuestasIdiomaAnio();

            if ($("#langSelector option:selected").attr('langDisabled') == true) {
                $('#btnDisable').text('Habilitar Idioma');
                $('#selectedLang').css('text-decoration', 'line-through');
                $('#selectedLang').css('color', 'gray');
            } else {
                $('#btnDisable').text('Deshabilitar Idioma');
                $('#selectedLang').css('text-decoration', 'none');
                $('#selectedLang').css('color', 'black');
            }
        } else {
            $('#btnEliminarIdioma').css('visibility', 'hidden');
            $('#selectedLang').text('');
            // $('#langGraphs').css('display', 'none');
            // $('#langGraphs').hide();
            $('#langGraphs').slideToggle();
        }
    });

    $('#btnAddLang').click(function () {
        var langName = $('#inputLangName').val().trim();

        if (langName == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Rellena el campo nombre',
            })
        } else {
            $('#inputLangName').val('');
            var opciones = { url: path + "server/gestion/insertaIdioma.php", data: { name: langName }, type: "POST", dataType: "json", };
            $.ajax(opciones)
            // .done(peticionEliminarPregCorrecta)
            // .fail()
            .always(peticionInsertarIdioma)
            ;
        }
    });

    $('#btnEliminarIdioma').click(function () {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar el idioma después de borrarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {
                var opciones = { url: path + "server/gestion/borrarIdioma.php", data: { langId: selectedLangId }, type: "POST", dataType: "json", };
                $.ajax(opciones)
                    // .done(peticionEliminarPregCorrecta)
                    // .fail()
                    .always(peticionBorrarIdioma)
                    ;

            }
        })

    });


});

function preguntasIdiomaMes() {
    var opciones = { url: path + "server/gestion/obtenerPreguntasIdiomaMes.php", data: { langId: selectedLangId }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerPreguntasLangMes)
        ;

}

function preguntasIdiomaAnio() {
    var opciones = { url: path + "server/gestion/obtenerPreguntasIdiomaAno.php", data: { langId: selectedLangId }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerPreguntasLangAnio)
        ;
}

function respuestasIdiomaMes() {
    var opciones = { url: path + "server/gestion/obtenerRespuestasIdiomaMes.php", data: { langId: selectedLangId }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerRespuestasLangMes)
        ;
}
function respuestasIdiomaAnio() {
    var opciones = { url: path + "server/gestion/obtenerRespuestasIdiomaAno.php", data: { langId: selectedLangId }, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerRespuestasLangAnio)
        ;
}

function peticionObtenerRespuestasLangMes(respuestas){
    console.log(respuestas)

    var fecha = new Date();

    var labelsMonth = [];
    var dias = getDaysInMonth(fecha.getMonth(), fecha.getFullYear());
    var dataMonth = [];
    for (respuesta of respuestas) {
        dataMonth[respuesta['dia'] - 1] = respuesta['respuestas'];
    }
    for (let i = 0; i < dias; i++) {
        if (dataMonth[i] == null) {
            dataMonth[i] = 0;
        }
        labelsMonth[i] = i + 1;
    }


    new Chart(document.getElementById("line-chart-answersLang-month"), {
        type: 'line',
        responsive: true,
        data: {
            labels: labelsMonth,
            datasets: [
                {
                    borderColor: '#1A5F83',
                    backgroundColor: 'transparent',
                    label: "Número de respuestas",
                    data: dataMonth
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Respuestas por día en el mes actual'
            }
        }
    });
}

function peticionObtenerRespuestasLangAnio(respuestas){
    console.log(respuestas)
    var fecha = new Date();

    var labelsYear = [];
    var dataYear = [];
    for (respuesta of respuestas) {
        dataYear[respuesta['mes'] - 1] = respuesta['respuestas'];
    }
    for (let i = 0; i < 12; i++) {
        if (dataYear[i] == null) {
            dataYear[i] = 0;
        }
        labelsYear[i] = i + 1;
    }


    new Chart(document.getElementById("line-chart-answersLang-year"), {
        type: 'line',
        responsive: true,
        data: {
            labels: labelsYear,
            datasets: [
                {
                    borderColor: '#1A5F83',
                    backgroundColor: 'transparent',
                    label: "Número de respuestas",
                    data: dataYear
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Respuestas por mes en el año actual'
            }
        }
    });
}

function peticionObtenerPreguntasLangAnio(preguntas) {
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


    new Chart(document.getElementById("line-chart-questionsLang-year"), {
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


function peticionObtenerPreguntasLangMes(preguntas) {
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

    new Chart(document.getElementById("line-chart-questionsLang-month"), {
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


function peticionBorrarIdioma() {
    Swal.fire(
        'Eliminado!',
        'El idioma ha sido eliminado',
        'success'
    )
    cargarSelect();

    $('#langSelector').val(1);
    $('#btnEliminarIdioma').css('visibility', 'hidden');
    $('#selectedLang').text('');
    // $('#langGraphs').css('display', 'none');
    // $('#langGraphs').hide();
    $('#langGraphs').slideToggle();


}

function peticionInsertarIdioma() {
    Swal.fire(
        '¡Insertado!',
        'El idioma ha sido añadido',
        'success'
    )
    cargarSelect();


}

function cargarSelect() {
    var opciones = { url: path + "server/home/obtenerIdiomas.php", data: {}, type: "POST", dataType: "json", };
    $.ajax(opciones)
        // .done(peticionEliminarPregCorrecta)
        // .fail()
        .always(peticionObtenerIdiomas)
        ;
        actualizarIdiomas();
}

function peticionObtenerIdiomas(idiomas) {
    var html = '<option value="1" id="default" selected>Elige un idioma...</option>';
    for (idioma of idiomas) {
        html += '<option lang="' + idioma['languageId'] + '" langDisabled="' + idioma['disabled'] + '">' + idioma['name'] + '</option>'
    }
    $('#langSelector').html(html);
}

function peticionEliminarUsuarioCorrecta() {
    $('#tr' + userId).remove();
    Swal.fire(
        '¡Eliminado!',
        'El usuario ha sido eliminado',
        'success'
    )
}
function peticionEliminarPreguntaCorrecta() {
    $('#tr' + questionId).remove();
    Swal.fire(
        '¡Eliminado!',
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
    return new Date(year, month, 0).getDate();
};