<?php

class modelHome {
    public static function getPuntuacionRespuestas($userId){
        $db = new database();
        $sql = "SELECT SUM( DISTINCT answer.score) as score from answer, user where answer.userId = $userId";
        $db->query($sql);
        return $db->cargaFila();
    }
  
}
?>

