<script src="./js/message.js"></script>
<link rel="stylesheet" href="./css/message.css">
<?php 
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
