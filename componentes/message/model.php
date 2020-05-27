<?php

class modelHome {
    public static function getPuntuacionRespuestas($userId){
        $db = new database();
        $sql = "SELECT SUM(score) as score from answer where userId = $userId";
        $db->query($sql);
        return $db->cargaFila();
    }
  
}
?>

