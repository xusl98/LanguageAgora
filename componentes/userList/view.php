
<?php 


$tipo = $_GET['tipo'];
$user = $_GET['user'];

?> 

<div class="row">
            <div class="col-md-3">&nbsp;</div>
            <div class="col-md-6" style="margin-top: 5%;">
                <div>
                    <!-- CONTENIDO -->
                    <div class="container-fluid">
                    <div class="row">
                            <div class="col-md-12">
                            <?php
                            echo '<h5 style="text-align:center;">' . $tipo . ' Realizadas</h5>';
                            ?>
                                <!-- <h5>Preguntas Realizadas</h5> -->
                                <div id="listaPreguntas" class="list-group">
                                <?php 
                                if ($tipo == 'Preguntas'){
                                    $preguntas = modelHome::getPreguntas($user);
                                    foreach ($preguntas as $pregunta){
                                        echo '<div class="list-group-item "><a style="color:black" href="index.php?option=language&lang='. $pregunta['languageId'] .'&name=' . $pregunta['name'] .'">' . $pregunta['name'] . '</a><a href="index.php?option=question&question=' . $pregunta['questionID'] . '&lang=' . $pregunta['name'] . '&langId=' . $pregunta['languageId'] . '" class="list-group-item list-group-item-action">' . $pregunta['title'] . '</a></div>';
                                    }
                                } else if ($tipo == 'Respuestas'){
                                    $respuestas = modelHome::getRespuestas($user);
                                    foreach ($respuestas as $respuesta){
                                        echo '<div class="list-group-item "><a style="color: black" href="index.php?option=language&lang='  . $respuesta['languageId']  .'&name='  . $respuesta['name']  .'">'  . $respuesta['name']  . '</a><a href="index.php?option=question&question='  . $respuesta['questionId']  . '&lang='  . $respuesta['name']  . '&langId='  . $respuesta['languageId']  . '" class="list-group-item list-group-item-action">'  . substr($respuesta['text'], 0, 30)  . '...</a></div>';
                                    }
                                }

                                ?>
                                    <!-- <div class="list-group-item list-group-item-action"><span>Idioma</span><a href="#"
                                            class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                                    </div> -->
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
