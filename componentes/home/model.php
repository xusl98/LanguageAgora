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
        $sql = "SELECT * FROM language order by name";
        $db->query($sql);
        return $db->cargaMatriz();
    }
    
    public static function getSitios(){
        $db = new database();
        $sql = "SELECT * FROM sitios_interes";
        $db->query($sql);
        return $db->cargaMatriz();
    }

    public static function getUltimosSitios(){
    $db = new database();
    $sql = "SELECT i.ruta, si.titulo, si.fecha, si.id
            FROM imagenes i, sitios_interes si
            WHERE i.sitios_interes_id = si.id
            AND i.id = si.imagen_portada
            ORDER BY si.fecha DESC 
            LIMIT 4";
    $db->query($sql);
    return $db->cargaMatriz();
    }
    
    public static function getImagenesVotados($id_autonomia){
        $db = new database();
        $sql = "SELECT i.*
                FROM sitios_interes si, imagenes i, autonomias a
                WHERE a.id = si.autonomias_id
                AND i.sitios_interes_id = si.id
                AND a.id = :id_autonomia
                ORDER BY votos DESC
                LIMIT 1;";
        $params = array(
            ':id_autonomia' => $id_autonomia
        );
        $db->query($sql,$params);
        $imagen = $db->cargaFila();
        return $imagen['ruta'];
    }

}

?>

