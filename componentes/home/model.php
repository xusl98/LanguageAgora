<?php

class modelHome {
    
     public static function getAutonomias(){
        $db = new database();
        $sql = "SELECT * FROM autonomias";
        $db->query($sql);
        return $db->cargaMatriz();
    }
    public static function getIdiomas(){
        $db = new database();
        $sql = "SELECT * FROM language where disabled = 0 order by name";
        $db->query($sql);
        return $db->cargaMatriz();
    }
    

}

?>

