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
            <li class="nav-item" id="usersLi">
                <a class="nav-link miTab" id="users-tab" data-toggle="tab" href="#users" role="tab"
                    aria-controls="users" aria-selected="true">Usuarios</a>
            </li>
            <li class="nav-item">
                <a class="nav-link miTab" id="data-tab" data-toggle="tab" href="#data" role="tab" aria-controls="data"
                    aria-selected="false">Datos</a>
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
                                <td>".$userType."</td>
                                <td><i id=\"".$usuario['userId']."\" class=\"fas fa-trash-alt elimUser\"></i></td>
                                </tr>";
                                break;
                            case 1:
                                $userType = 'Moderador';
                                echo "<tr>
                                <td id=\"name".$usuario['userId']."\"><a class=\"enlace\" href=\"index.php?option=profile&user=" . $usuario['userId'] . "\">".$usuario['name']."</a></td>
                                <td>".$usuario['email']."</td>
                                <td>".$usuario['fechaRegistro']."</td>
                                <td>".$userType."</td>
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
                        <div style="text-align:center;"><h1>Visitas</h1></div>
                        <div class="row">
                            <div class="col-md-6">
                                <canvas class="canvas" id="line-chart-visits-month"></canvas>
                            </div>
                            <div class="col-md-6">
                            <canvas class="canvas" id="line-chart-visits-year"></canvas>
                            </div>
                        </div>
                        <div style="text-align:center;"><h1>Preguntas</h1></div>
                        <div class="row">
                            <div class="col-md-6">
                                <canvas class="canvas" id="line-chart-questions-month"></canvas>
                            </div>
                            <div class="col-md-6">
                                <canvas class="canvas" id="line-chart-questions-year"></canvas>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>