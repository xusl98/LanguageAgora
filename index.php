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
    <script src="./librerias/bootstrap-4.4.1-dist/js/bootstrap.bundle.min.js"></script>
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
    <div class="container-fluid" style="min-height: 80%;">
    <?php 


    function getIdiomas(){
        $db = new database();
        $sql = "SELECT * FROM language order by name";
        $db->query($sql);
        return $db->cargaMatriz();
    }

    
    // $nav = '
    // <nav style="z-index:100" class="navbar navbar-expand-lg row nav">
    //     <div class="col-md-5">
    //         <a class="navbar-brand" href="index.php">LanguageAgora</a>
    //     </div>
    //     <div class=" dropdown col-md-4">
    //         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
    //             aria-haspopup="true" aria-expanded="false">
    //             Idioma
    //         </a>
    //         <div id="dropdown" class="dropdown-menu" aria-labelledby="navbarDropdown">';
    // $idiomas = getIdiomaS();
    // foreach ($idiomas as $idioma){
    //     $nav .= '<a class="dropdown-item" href="index.php?option=language&lang='.$idioma['languageId'].'&name='.$idioma['name'].'">'.$idioma['name'].'</a>';
    // }

    //         $nav .= '</div>
    //     </div>
    //     <div class="col-md-3 row">
    //         <div class="dropdown col-md-6">
    //             <a class="nav-link dropdown-toggle" href="#" id="profileDrop" role="button"
    //                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                 Perfil
    //             </a>
    //             <div id="perfilDropdown" class="dropdown-menu" aria-labelledby="navbarDropdown"></div>
    //         </div>
    //         <div class="dropdown col-md-6">
    //             <div class="input-group mb-3">
    //                 <input id="inputBUsuario" btn="btnBUsuario" type="text" class="form-control x" placeholder="Usuario..." >
    //                 <div class="input-group-append">
    //                     <button id="btnBUsuario" class="input-group-text btn btn-light"><i class="fas fa-search"></i></button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </nav>
    // ';
    // echo $nav;
            ?>

<nav class="navbar navbar-expand-lg ">
  <a class="navbar-brand" href="index.php">LanguageAgora</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"><i style="color:white;" class="fas fa-bars"></i></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Idioma
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <?php
            $idiomas = getIdiomaS();
            foreach ($idiomas as $idioma){
                echo '<a class="dropdown-item" href="index.php?option=language&lang='.$idioma['languageId'].'&name='.$idioma['name'].'">'.$idioma['name'].'</a>';
            }
        ?>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a id="profileDrop" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Perfil
        </a>
        <div id="perfilDropdown" class="dropdown-menu" aria-labelledby="navbarDropdown"></div>
      </li>
      <li class="nav-item" id="pestChats">
          
      </li>
      <li class="nav-item" id="pestGestion">
        
      </li>
    </ul>
        <form class="form-inline my-2 my-lg-0" style="margin-right:1%;">
            <div class="input-group mb-3">
                <input id="inputBUsuario" btn="btnBUsuario" type="text" class="form-control x" placeholder="Usuario..." >
                <div class="input-group-append">
                    <button id="btnBUsuario" class="input-group-text btn btn-light"><i class="fas fa-search"></i></button>
                </div>
            </div>
        </form>
  </div>
</nav>
<div style="height: 150px;">&nbsp;</div>


            <?php echo loader($componente); 					// Cuerpo ?>
            
    </div>
    <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
    <div class="container text-center">
      <small>Copyright &copy; 2020 LanguageAgora</small>
    </div>
  </footer>
    <!-- MODAL Iniciar sesión -->
    <div class="modal fade" id="inicioModal" tabindex="-1" role="dialog" 
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
                            <input btn="btnInicio" type="text" class="form-control" id="userNav">
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="passwordNav" class="col-md-2 col-form-label">Contraseña</label>
                          <div class="col-md-10">
                            <input btn="btnInicio" type="password" class="form-control" id="passwordNav">
                          </div>
                        </div>
                      </form>
<!-- TEMPORAL -->
          <div>
          USUARIOS -> CONTRASEÑAS
          <br>
          "usuario" -> "a"
          <br>
          "mod"  -> "a"
          <br>
          "admin"  -> "a"
          </div>
<!-- TEMPORAL -->

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnInicio">Iniciar Sesión</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
