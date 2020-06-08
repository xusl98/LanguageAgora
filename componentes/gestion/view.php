<script src="./js/gestion.js"></script>
<link rel="stylesheet" href="./css/gestion.css">


<link href="./librerias/MDBootstrap/css/addons/datatables.min.css" rel="stylesheet">
<script type="text/javascript" src="./librerias/MDBootstrap/js/addons/datatables.min.js"></script>
<?php 
?>

<div class="row">
    <div class="col-md-12">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active miTab" id="reports-tab" data-toggle="tab" href="#reports" role="tab"
                    aria-controls="reports" aria-selected="false">Reportes</a>
            </li>
            <li class="nav-item onlyAdmin">
                <a class="nav-link miTab" id="users-tab" data-toggle="tab" href="#users" role="tab"
                    aria-controls="users" aria-selected="true">Usuarios</a>
            </li>
            <li class="nav-item onlyAdmin">
                <a class="nav-link miTab" id="data-tab" data-toggle="tab" href="#data" role="tab" aria-controls="data"
                    aria-selected="false">Datos</a>
            </li>
            <li class="nav-item onlyAdmin">
                <a class="nav-link miTab" id="languages-tab" data-toggle="tab" href="#languages" role="tab" aria-controls="data"
                    aria-selected="false">Idiomas</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            
            <div class="tab-pane fade show active" id="reports" role="tabpanel" aria-labelledby="reports-tab">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                    width="100%">
                    <thead>
                        <tr>
                            <th class="th-sm">Pregunta

                            </th>
                            <th class="th-sm">Texto

                            </th>
                            <th class="th-sm">Usuario

                            </th>
                            <th class="th-sm">Fecha

                            </th>
                            <th class="th-sm">Idioma

                            </th>
                            <th class="th-sm">Eliminar

                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <?php 
                        $preguntas = modelHome::getPreguntasReportadas();
                        foreach ($preguntas as $pregunta){
                            // print_r($pregunta);
                                echo "<tr id=\"tr".$pregunta['questionId']."\">
                                <td id=\"title" . $pregunta['questionId'] . "\"><a class=\"enlace\" href=\"index.php?option=question&question=" . $pregunta['questionId'] . "&lang=" . $pregunta['language'] . "&langId=" . $pregunta['languageId'] . "\">".$pregunta['title']."</a></td>
                                <td>".$pregunta['text']."</td>
                                <td id=\"name".$pregunta['userId']."\"><a class=\"enlace\" href=\"index.php?option=profile&user=" . $pregunta['userId'] . "\">".$pregunta['user']."</a></td>
                                <td>".$pregunta['date']."</td>
                                <td>".$pregunta['language']."</td>
                                <td><i id=\"".$pregunta['questionId']."\" class=\"fas fa-trash-alt elimPreg\"></i></td>
                                </tr>";
                        }
                        ?>
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Pregunta
                            </th>
                            <th>Texto
                            </th>
                            <th>Usuario
                            </th>
                            <th>Fecha
                            </th>
                            <th>Idioma
                            </th>
                            <th>Eliminar
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="tab-pane fade " id="users" role="tabpanel" aria-labelledby="user-tab">
                <table id="tablaUsuarios" class="table table-striped table-bordered table-sm" cellspacing="0"
                    width="100%">
                    <thead>
                        <tr>
                            <th class="th-sm">Nombre

                            </th>
                            <th class="th-sm">Email

                            </th>
                            <th class="th-sm">Fecha de registro

                            </th>
                            <th class="th-sm">Tipo de usuario

                            </th>
                            <th class="th-sm">Eliminar

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <!-- echo "<tr id=\"tr".$usuario['userId']."\">
                                <td id=\"name".$usuario['userId']."\"><a class=\"enlace\" href=\"index.php?option=profile&user=" . $usuario['userId'] . "\">".$usuario['name']."</a></td>
                                <td>".$usuario['email']."</td>
                                <td>".$usuario['fechaRegistro']."</td>
                                <td>".$userType."</td>
                                <td><i id=\"".$usuario['userId']."\" class=\"fas fa-trash-alt elimUser\"></i></td>
                                </tr>";
                                break; -->
                                <!-- echo "<tr>
                                <td id=\"name".$usuario['userId']."\"><a class=\"enlace\" href=\"index.php?option=profile&user=" . $usuario['userId'] . "\">".$usuario['name']."</a></td>
                                <td>".$usuario['email']."</td>
                                <td>".$usuario['fechaRegistro']."</td>
                                <td>".$userType."</td>
                                <td><i id=\"".$usuario['userId']."\" class=\"fas fa-trash-alt elimUser\"></i></td>
                                </tr>";
                                break; -->
                        <?php 
                        $usuarios = modelHome::getUsuarios();
                        foreach ($usuarios as $usuario){
                          $userType = '';
                          switch ($usuario['userTypeId']) {
                            case 0:
                                $userType = 'Usuario';
                                echo "<tr id=\"tr".$usuario['userId']."\">
                                <td id=\"name".$usuario['userId']."\"><a class=\"enlace\" href=\"index.php?option=profile&user=" . $usuario['userId'] . "\">".$usuario['name']."</a></td>
                                <td>".$usuario['email']."</td>
                                <td>".$usuario['fechaRegistro']."</td>
                                <td><select class=\"custom-select userTypeSelect\" id=\"tipo-" . $usuario['userId'] . "\">
                                <option value=\"0\" selected>Usuario</option>
                                <option value=\"1\">Moderador</option>
                                </select></td>
                                <td><i id=\"".$usuario['userId']."\" class=\"fas fa-trash-alt elimUser\"></i></td>
                                </tr>";
                                break;
                            case 1:
                                $userType = 'Moderador';
                                echo "<tr>
                                <td id=\"name".$usuario['userId']."\"><a class=\"enlace\" href=\"index.php?option=profile&user=" . $usuario['userId'] . "\">".$usuario['name']."</a></td>
                                <td>".$usuario['email']."</td>
                                <td>".$usuario['fechaRegistro']."</td>
                                <td><select class=\"custom-select userTypeSelect\" id=\"tipo-" . $usuario['userId'] . "\">
                                <option value=\"0\">Usuario</option>
                                <option value=\"1\" selected>Moderador</option>
                                </select></td>
                                <td><i id=\"".$usuario['userId']."\" class=\"fas fa-trash-alt elimUser\"></i></td>
                                </tr>";
                                break;
                            case 2:
                              $userType = 'Admin';
                              echo "<tr>
                              <td id=\"name".$usuario['userId']."\"><a class=\"enlace\" href=\"index.php?option=profile&user=" . $usuario['userId'] . "\">".$usuario['name']."</a></td>
                              <td>".$usuario['email']."</td>
                              <td>".$usuario['fechaRegistro']."</td>
                              <td>".$userType."</td>
                              <td></td>
                              </tr>";
                                break;
                        }
                          
                        }
                        ?>
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Nombre
                            </th>
                            <th>Email
                            </th>
                            <th>Fecha de registro
                            </th>
                            <th>Tipo de usuario
                            </th>
                            <th>Eliminar
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <!-- DATOS -->
            <div class="tab-pane fade" id="data" role="tabpanel" aria-labelledby="data-tab">
                <div class="container-fluid">
                        <div class="textoCentro"><h1>Visitas</h1></div>
                        <div class="row">
                            <div class="col-md-6">
                                <canvas class="canvas" id="line-chart-visits-year"></canvas>
                            </div>
                            <div class="col-md-6">
                                <canvas class="canvas" id="line-chart-visits-month"></canvas>
                            </div>
                        </div>
                        <div class="textoCentro"><h1>Preguntas</h1></div>
                        <div class="row">
                            <div class="col-md-6">
                                <canvas class="canvas" id="line-chart-questions-year"></canvas>
                            </div>
                            <div class="col-md-6">
                                <canvas class="canvas" id="line-chart-questions-month"></canvas>
                            </div>
                        </div>
                </div>
            </div>
            <div class="tab-pane fade container-fluid" id="languages" role="tabpanel" aria-labelledby="languages-tab">
            <!-- Hacer un combobox para seleccionar un idioma y que te salgan datos del idioma seleccionado, poder desactivar el idioma para que no se vea en la página y poder dar de alta un nuevo idioma -->
                
                <div class="row">
                    <div class="col-md-2">
                        <input id="inputLangName" type="text" class="form-control" placeholder="Idioma">
                    </div>
                    <div class="col-md-2">
                            <button class="btn btn-primary" id="btnAddLang">Añadir Idioma</button>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-2">
                        <div class="input-group mb-3">
                            <select id="langSelector" class="custom-select">
                                <option id="default" selected>Elige un idioma...</option>
                                    <?php
                                    require_once "./server/language.php";
                                        $idiomas = modelHome::getIdiomas();
                                        foreach ($idiomas as $idioma){
                                            $language = new Language($idioma);
                                            // print_r($pregunta);
                                                echo "<option lang=\"" . $language->getLanguageId() . "\" langDisabled=\"" . $language->getDisabled() . "\">" . $language->getName() . "</option>";
                                                
                                        }
                                    ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-8 textoCentro" ><h1 id="selectedLang">&nbsp;</h1></div>
                    <div class="col-md-2">
                        <button id="btnDisable" type="button" class="btn btn-light">Deshabilitar Idioma</button>
                    </div>
                </div>

                <div id="langGraphs" style="display:none;" class="container-fluid">
                    <div class="textoCentro"><h2>Preguntas</h2></div>
                    <div class="row">
                        <div class="col-md-6">
                            <canvas class="canvas" id="line-chart-questionsLang-year"></canvas>
                        </div>
                        <div class="col-md-6">
                            <canvas class="canvas" id="line-chart-questionsLang-month"></canvas>
                        </div>
                    </div>
                    <div class="textoCentro"><h2>Respuestas</h2></div>
                    <div class="row">
                        <div class="col-md-6">
                            <canvas class="canvas" id="line-chart-answersLang-year"></canvas>
                        </div>
                        <div class="col-md-6">
                            <canvas class="canvas" id="line-chart-answersLang-month"></canvas>
                        </div>
                    </div>
                </div>                        
                <div class="textoCentro">
                    <button style="visibility: hidden;" id="btnEliminarIdioma" class="btn btn-danger">Eliminar Idioma</button>   
                </div>
            </div>
        </div>
    </div>
</div>