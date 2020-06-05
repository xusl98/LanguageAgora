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

    if (parseInt(sessionStorage.getItem('userType')) == 1){
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

//TODO datos

$(document).on('sesionCerrada', function () {
    window.location.href = "index.php";
});