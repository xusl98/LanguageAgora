<script src="./js/profile.js"></script>

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
                    <div class="container-fluid">
                        <div class="row">
                            <h1 id="userTitle" class="col-md-9">Nombre de usuario</h1>
                            <a href="#" id="modPerfil" class="btn btn-primary" class="col-md-3">Modificar Perfil</a>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h6>Puntuación de respuestas: <?php
                                    echo modelHome::getPuntuacionRespuestas($_GET['user'])['score'];

                                ?></h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <h5>Últimas Preguntas</h5>
                                <div id="listaPreguntas" class="list-group">
                                    <div class="list-group-item list-group-item-action"><span>Idioma</span><a href="#"
                                            class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                                    </div>
                                </div>
                                <a href="#" id="btnPreguntas" class="btn btn-primary">Ver Todas</a>
                            </div>
                            <div class="col-md-6">
                                <h5>Últimas Respuestas</h5>
                                <div id="listaRespuestas" class="list-group">
                                    <div class="list-group-item list-group-item-action"><span>Idioma</span><a href="#"
                                            class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                                    </div>
                                </div>
                                <a href="#" id="btnRespuestas" class="btn btn-primary">Ver Todas</a>
                            </div>
                        </div>
                        <div class="row">
                            <canvas class="canvas" id="doughnut-chart-questions"></canvas>
                            <canvas class="canvas" id="doughnut-chart-answers"></canvas>

                        </div>
                    </div>
                    <!-- CONTENIDO -->
                </div>
            </div>
            <div class="col-md-3">&nbsp;</div>
        </div>
    </div>
