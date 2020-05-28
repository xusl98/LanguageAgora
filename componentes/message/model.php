<?php

class modelHome {
    public static function getPuntuacionRespuestas($userId){
        $db = new database();
        $sql = "SELECT SUM(score) as score from answer where userId = $userId";
        $db->query($sql);
        return $db->cargaFila();
    }

    public static function marcarComoLeido($otraPersona){
        $db = new database();
        $sql = "UPDATE message SET message.leido = 1 WHERE message.chatId = $chatId and message.sender = $otraPersona";
        $db->query($sql);
        return $db->cargaFila();
    }
  
}
?>

