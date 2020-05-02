$(document).ready(function(){
    //función del slider principal
    $(function(){
        $('#slider div:gt(0)').hide(); //esconde todos los div menos el primero
        setInterval(function(){
          $('#slider div:first-child').fadeOut(4000) //tiempo que tarda la img en desaparecer
             .next('div').fadeIn(2000) //tiempo q tarda en aparacer la siguiente
             .end().appendTo('#slider');}, 6000); //tiempo que permanece la img
    });
    
    //***************************
    
    //funcion para que cambie la img al seleccionar una comunidad del desplegable
    $('#eligeComunidad').change(function(){
        var idAutonomia = document.getElementById('eligeComunidad').value;
        $.ajax({
            type: "POST",
            url: "componentes/home/ajax/masVotado.php",
            data: { 
                idAutonomia: idAutonomia,
            },
            cache : false,
            success: function(response){
                var contenedor = document.getElementById('imgMasVotado');
                var src = 'img/slider/'+response;
                contenedor.src = src;
            }
        });
    });
    
    //*****************************
    
    //funciones simulan pulsar botones
    $(".botones").mousedown(function(){
        $(this).css("border","1px solid #fff");
    });
    $(".botones").mouseup(function(){
        $(this).css("border","1px solid #000");
    });
    
    
    //***********************************
    // Reestablecer el tamaño de la fuente

        var fuenteOriginal = $("body").css("font-size");
        $(".disminuitFont").click(function(){
           $("body").css("font-size", fuenteOriginal);
            cont = 0;
        });

    // Aumentar el tamaño de la fuente

        var cont = 0;

        $("#aumentarFont").click(function(){
            if (cont < 1){
                var fuenteActual = $("body").css("font-size");
                var numFuenteActual = parseInt(fuenteActual, 10);
                var nuevaFuente = numFuenteActual*1.15;
                $("body").css("font-size", nuevaFuente);
                cont++;
           }
        });
  
});

