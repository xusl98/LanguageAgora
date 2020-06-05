<?php

class modelHome {
    public static function getUsuarios(){
        $db = new database();
        $sql = "SELECT * FROM user";
        $db->query($sql);
        return $db->cargaMatriz();
    }

    public static function marcarComoLeido($otraPersona){
        $db = new database();
        $sql = "UPDATE message SET message.leido = 1 WHERE message.chatId = $chatId and message.sender = $otraPersona";
        $db->query($sql);
        return $db->cargaFila();
    }
  
}
?>

