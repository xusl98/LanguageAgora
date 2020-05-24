
<?php 
//inclu�mos la clase ajax 
require ('./librerias/xajax/xajax_core/xajax.inc.php');

//instanciamos el objeto de la clase xajax 
$xajax = new xajax(); 
// $xajax->setFlag('debug', true);


//asociamos la funci�n creada anteriormente al objeto xajax 
$xajax->register(XAJAX_FUNCTION,"getIdiomas"); 

//El objeto xajax tiene que procesar cualquier petici�n 
$xajax->processRequest();
?> 
<script src="./js/modifProfile.js"></script>
<div class="row">
            <div class="col-md-3">&nbsp;</div>
            <div class="col-md-6" style="margin-top: 2%;">
                <div>
                    <!-- CONTENIDO -->
                    <div class="container-fluid ">
                        <h1 id="userTitle" class="col-md-9">Nombre de usuario</h1>
                            <div class="form-group card">
                                <div class="card-body">
                                    <label for="userName">Nombre de usuario</label>
                                    <small id="userHelp" class="form-text text-muted">Introduce el nombre al que quieres cambiar</small>
                                    <input type="text" class="form-control" id="userName" aria-describedby="userName">
                                    <div style="text-align:right;">
                                        <button id="btnCambiarNombre" class="btn btn-primary" data-toggle="modal" data-target="#nombreModal">Cambiar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group card">
                                <div class="card-body">
                                    <label for="oldPass">Contraseña</label>
                                    <small id="oldPassHelp" class="form-text text-muted">Introduce la contraseña actual</small>
                                    <input type="password" class="form-control" id="oldPass" aria-describedby="oldPass">
                                    <small id="passHelp" class="form-text text-muted">Introduce la nueva contraseña</small>
                                    <input type="password" class="form-control" id="pass" aria-describedby="pass">
                                    <small id="passHelp2" class="form-text text-muted">Vuelve a introducir la contraseña</small>
                                    <input type="password" class="form-control" id="confPass" aria-describedby="confPass">
                                    <div style="text-align:right;">
                                        <button class="btn btn-primary">Cambiar</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <!-- CONTENIDO -->
                </div>
            </div>
            <div class="col-md-3">&nbsp;</div>

            
            <!-- MODAL Cambiar nombre -->
    <div class="modal fade" id="nombreModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">¿Seguro que quieres que "<span id="nuevoNombre"></span>" sea tu nuevo nombre de usuario?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnNombre">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>
