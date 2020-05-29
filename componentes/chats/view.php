<script src="./js/chats.js"></script>
<link rel="stylesheet" href="./css/chats.css">

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
                            <h1>Chats</h1>
                        </div>
                        <div class="row">
                            <div id="chats" class="container-fluid">
                                <?php 
                                    $userId = $_GET['user']    ;

                                    $chats = modelHome::getChats($userId);
                                    foreach ($chats as $chat){
                                        if ($chat['numMensajes'] > 0){
                                            $otraPersona;
                                            if ($userId == $chat['user1Id']){
                                                $otraPersona = $chat['user2Id'];
                                            } else {
                                                $otraPersona = $chat['user1Id'];
                                            }
                                            $html = "<a href=\"index.php?option=message&user=$userId&receiver=$otraPersona&receiverName=" . modelHome::getUserName($otraPersona)['name'] . "\" class=\"row chat";

                                            $noLeidos = modelHome::getMensajesNoLeidos($chat['michat'], $otraPersona);
                                            if ($noLeidos['noLeidos'] > 0){
                                                $html .= " chatDestacado\"><div class=\"card-body col-md-1\">
                                                <span class=\"badge badge-secondary\">" . $noLeidos['noLeidos'] . "</span>
                                                </div>";
                                            } else {
                                                $html .= "\"><div class=\"card-body col-md-1\">
                                                &nbsp;
                                                </div>";
                                            }


                                            $html .= "<div class=\"card-body col-md-11\">
                                                <h5 class=\"card-title\">" . modelHome::getUserName($otraPersona)['name'] ."</h5>
                                                <p class=\"card-text\">" . $chat['ultimoMensaje'] . "</p>
                                                </div>
                                                </a>";
                                            echo $html;
                                        }
                                    }
                                ?>
                                <!--  -->
                                <!-- <div class="row">
                                    <div class="card-body col-md-1">
                                        <span class="badge badge-secondary">1</span>
                                    </div>
                                    <div class="card-body col-md-11">
                                        <h5 class="card-title">User</h5>
                                        <p class="card-text">Last message...</p>
                                    </div>
                                </div> -->
                                <!--  -->
                                
                            </div>
                        </div>
                    </div>
                    <!-- CONTENIDO -->
                </div>
            </div>
            <div class="col-md-3">&nbsp;</div>
        </div>
    </div>
