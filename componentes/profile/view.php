<script src="./js/profile.js"></script>
<link rel="stylesheet" href="./css/profile.css">
<?php 
$user = $_GET['user'];
?> 

<div class="row">
            <div class="col-md-3">&nbsp;</div>
            <div class="col-md-6 content" style="margin-top: 5%;">
                <div>
                    <!-- CONTENIDO -->
                    <div class="container-fluid">
                        <div class="row">
                            <h1 id="userTitle" class="col-md-9">Nombre de usuario</h1>
                            <div class="col-md-3">
                                <a href="#" id="modPerfil" class="btn btn-primary">Modificar Perfil</a>
                                <a href="#" id="mensaje" class="btn btn-primary"><i class="far fa-envelope"></i></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Puntuación de respuestas: <?php
                                    echo modelHome::getPuntuacionRespuestas($user)['score'];
                                    
                                    ?></h6>
                            </div>
                            <div class="col-md-6">
                                    <h6>Último inicio de sesión: <?php
                                    echo modelHome::getUltimoLogin($user)['lastLogin'];
                                    
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
                                <a href="#" id="btnPreguntas" class="btn btn-primary btnTodas">Ver Todas</a>
                            </div>
                            <div class="col-md-6">
                                <h5>Últimas Respuestas</h5>
                                <div id="listaRespuestas" class="list-group">
                                    <div class="list-group-item list-group-item-action"><span>Idioma</span><a href="#"
                                            class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                                    </div>
                                </div>
                                <a href="#" id="btnRespuestas" class="btn btn-primary btnTodas">Ver Todas</a>
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
