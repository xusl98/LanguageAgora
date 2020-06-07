<?php

class modelHome {
    public static function getPuntuacionRespuestas($userId){
        $db = new database();
        $sql = "SELECT SUM(score) as score from answer where userId = $userId";
        $db->query($sql);
        return $db->cargaFila();
    }
    public static function getUltimoLogin($userId){
        $db = new database();
        $sql = "SELECT lastLogin from user where userId = $userId";
        $db->query($sql);
        return $db->cargaFila();
    }
  
}
?>

