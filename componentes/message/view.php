<script src="./js/message.js"></script>
<link rel="stylesheet" href="./css/message.css">
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
$user = $_GET['user'];
?> 

<div class="row">
            <div class="col-md-3">&nbsp;</div>
            <div class="col-md-6" style="margin-top: 2%;">
                <div>
                    <!-- CONTENIDO -->
                    <div class="container-fluid card">
                        <div class="row card-header">
                            <h3 id="receiverName">User</h3>
                        </div>
                        <div class="row card-body">
                        <div id="mensajes" class="mensajes container-fluid">
                        <!--  -->
                            <div class="row message">
                                <div class="col-md-6">
                                    <div class="him">
                                        Mensaje recibido 
                                        <small>10:34</small>       
                                    </div>
                                </div>
                                <div class="col-md-6">&nbsp;</div>
                            </div>
                            <div class="row message">
                                <div class="col-md-6">&nbsp;</div>
                                <div class="col-md-6">
                                    <div class="mine">
                                        Mensaje enviado  
                                        <small>10:35</small>       
                                    </div>
                                </div>
                            </div>
                            <!--  -->
                        </div>
                        </div>
                        <div class="row card-footer">
                            <div class="input-group mb-3">
                                <input id="mensaje" type="text" class="form-control" placeholder="Escribe el mensaje..." >
                                <div class="input-group-append">
                                    <button id="enviarMensaje" class="input-group-text btn btn-light"><i class="far fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- CONTENIDO -->
                </div>
            </div>
            <div class="col-md-3">&nbsp;</div>
        </div>
    </div>
