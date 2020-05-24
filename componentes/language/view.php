<script src="./js/language.js"></script>

<?php 

//TODO ver si puedo cargar por php las preguntas



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

<link rel="stylesheet" href="./css/language.css">
<div class="row">
            <div class="col-md-3" style="margin-top: 4%;">
                <div style="margin: 0 0% 0 10%;">
                    <h5>Usuarios con más preguntas de <span class="idioma"></span></h5>
                    <ul id="listaUsuariosPreguntas" class="list-group">
                    <?php
                    $lang = $_GET['lang'];
                     $usuariosPreguntas = modelHome::getUsuariosPreguntas($lang);
                     foreach ($usuariosPreguntas as $usuario){
                         echo '<a href="index.php?option=profile&user='.$usuario['userId'].'" class="list-group-item d-flex justify-content-between align-items-center user">'.$usuario['name'].'<span class="badge badge-primary badge-pill">'.$usuario['questions'].'</span></a>';
                     }
                     ?>
                      </ul>
                </div>
            </div>
            <div class="col-md-6" style="margin-top: 2%;"> 
                <div>
                    <!-- CONTENIDO -->
                    <h1 id="titulo"></h1>
                    <div class="input-group">
                        <input id="searchInput" value="" type="text" class="form-control"
                            placeholder="Busca una pregunta...">
                        <div class="input-group-append">
                            <button id="searchBtn" type="button" class="btn btn-outline-secondary"><i
                                    class="fas fa-search"></i></button>
                        </div>
                    </div>
                    <div id="chip" class="chip">
                        <span id="chipText"></span>
                        <span class="closebtn" id="closeChip">&times;</span>
                    </div>
                    <div class="row">
                        <div class="col-9">&nbsp;</div>
                        <div class="col-3">
                            <a id="newQuestionAnchor" href="#" class="btn btn-primary">Realizar una
                                Pregunta</a>
                            <a id="newQuestionAnchor2" style="display: none;" data-toggle="modal"
                                data-target="#inicioModal" class="btn btn-primary">Realizar una
                                Pregunta</a>
                        </div>
                    </div>
                    <!-- LISTA PREGUNTAS -->
                    <div id="lista" class="list-group">
                    </div>
                    <!-- LISTA PREGUNTAS -->
                    <div style="text-align: center;">
                        <button type="button" id="btnVerMas" class="btn btn-primary">Ver más</button>
                    </div>
                    <!-- CONTENIDO -->
                </div>
            </div>
            <div class="col-md-3" style="margin-top: 4%;">
                <div style="margin: 0 10% 0 0%;">
                    <h5>Usuarios con más respuestas de <span class="idioma"></span></h5>
                    <ul id="listaUsuariosRespuestas" class="list-group">
                    <?php
                    $lang = $_GET['lang'];
                     $usuariosRespuestas = modelHome::getUsuariosRespuestas($lang);
                     foreach ($usuariosRespuestas as $usuario){
                         echo '<a href="index.php?option=profile&user='.$usuario['userId'].'" class="list-group-item d-flex justify-content-between align-items-center user">'.$usuario['name'].'<span class="badge badge-primary badge-pill">'.$usuario['answers'].'</span></a>';
                     }
                     ?>
                      </ul>
                </div>
            </div>
        </div>