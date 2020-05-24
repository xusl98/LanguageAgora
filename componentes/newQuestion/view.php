<script src="./js/newQuestion.js"></script>

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

<div class="container-fluid">
        <div class="row">
            <div class="col-md-3">&nbsp;</div>
            <div class="col-md-6" style="margin-top: 2%;">
                <div>
                    <!-- CONTENIDO -->
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Título</label>
                                <input type="text" class="form-control" id="questionTitle">
                                <small id="emailHelp" class="form-text text-muted">El título tiene que resumir lo que estás preguntando.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Cuerpo</label>
                                <textarea class="form-control" id="questionBody" rows="5"></textarea>
                            </div>
                            <div style="text-align:right;">
                                <button id="btnCancelar" class="btn btn-primary">Cancelar</button>
                                <button id="btnAceptar" class="btn btn-primary">Aceptar</button>
                            </div>
                        </div>
                    </div>

                    <!-- CONTENIDO -->
                </div>
            </div>
            <div class="col-md-3">&nbsp;</div>
        </div>
    </div>
   