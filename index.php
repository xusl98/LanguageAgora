<?php 
/* index.php
	Fichero principal llamado reiteradamente para cada seccion solicitada
	El parametro option indica la sección a cargar
*/

	// framework para construir MVC
    include 'librerias/framework.php'; 
    header("Content-Type: text/html; charset=utf-8");
    
   
?>

<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="./librerias/jquery/jQuery-3.4.1.js"></script>
    <script src="./librerias/bootstrap-4.4.1-dist/js/bootstrap.min.js"></script>
    <script src="./js/plantilla.js"></script>
    <script src="./js/common.js"></script>
    <script src="./js/smtp.js"></script>
    <script src="./librerias/Chart.js-2.9.3/dist/Chart.js"></script>
    <link rel="stylesheet" href="./librerias/bootstrap-4.4.1-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/estilo.css">
    <link href="./librerias/fontawesome-free-5.13.0-web/css/all.css" rel="stylesheet">

    <link rel="shortcut icon" type="image/x-icon" href="./resources/favicon.ico">
    <link rel="icon" href="./resources/favicon.ico" type="image/x-icon">



    <script src="./librerias/SweetAlerts/dist/sweetalert2.min.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script> -->
    <link rel="stylesheet" href="./librerias/SweetAlerts/dist/sweetalert2.min.css">
    </head>


    <body>
    <div class="container-fluid">
    <?php 


    function getIdiomas(){
        $db = new database();
        $sql = "SELECT * FROM language order by name";
        $db->query($sql);
        return $db->cargaMatriz();
    }

    $nav = '
    <nav class="navbar navbar-expand-lg row nav">
        <div class="col-md-5">
            <a class="navbar-brand" href="index.php">LanguageAgora</a>
        </div>
        <div class=" dropdown col-md-4">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Idioma
            </a>
            <div id="dropdown" class="dropdown-menu" aria-labelledby="navbarDropdown">';
    $idiomas = getIdiomaS();
    foreach ($idiomas as $idioma){
        $nav .= '<a class="dropdown-item" href="index.php?option=language&lang='.$idioma['languageId'].'&name='.$idioma['name'].'">'.$idioma['name'].'</a>';
    }

            $nav .= '</div>
        </div>
        <div class="col-md-3 row">
            <div class="dropdown col-md-6">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Perfil
                </a>
                <div id="perfilDropdown" class="dropdown-menu" aria-labelledby="navbarDropdown"></div>
            </div>
            <div class="dropdown col-md-6">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Configuración
                </a>
                <div id="confDropdown" class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div class="dropdown-item">
                        <div class="custom-control custom-switch ">
                            <input type="checkbox" class="custom-control-input" id="customSwitch1">
                            <label class="custom-control-label" for="customSwitch1">Modo Oscuro</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    ';
  if(isset($_GET['option'])){
      if ($_GET['option'] != 'signUp' && $_GET['option'] != 'login'){
      echo $nav;
    }
} else {
    echo $nav;
} 
            ?>
            <?php echo loader($componente); 					// Cuerpo ?>
            
    </div>
    <!-- MODAL Iniciar sesión -->
    <div class="modal fade" id="inicioModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Iniciar Sesión</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group row">
                          <label for="userNav" class="col-md-2 col-form-label">Usuario</label>
                          <div class="col-md-10">
                            <input type="text" class="form-control" id="userNav">
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="passwordNav" class="col-md-2 col-form-label">Contraseña</label>
                          <div class="col-md-10">
                            <input type="password" class="form-control" id="passwordNav">
                          </div>
                        </div>
                      </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnInicio">Iniciar Sesión</button>
                </div>
            </div>
        </div>
    </div>
    <!-- TOAST -->
    <div id="nameToast" role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false" style="display: none;">
        <div class="toast-header toast-error-header">
            <strong id="toastTitle" class="mr-auto">Error</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" style="color: white;">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="toastText" class="toast-body toast-error-body">
            La combinación de usuario y contraseña no es correcta.
        </div>
    </div>
</body>

</html>
