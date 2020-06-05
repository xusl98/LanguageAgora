var userId;




$(document).ready(function () {
    $('#dtBasicExample').DataTable({
        "paging": true // false to disable pagination (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');


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


});


function peticionEliminarUsuarioCorrecta() {
    $('#tr' + userId).remove();
    Swal.fire(
        'Eliminado!',
        'El usuario ha sido eliminado',
        'success'
    )
}


$(document).on('sesionCerrada', function () {
    window.location.href = "index.php";
});