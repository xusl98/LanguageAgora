<?php

/**
 * Conexion PDO
 */
class database {
    //atributo que guarda la conexión
    private $conexion;
    
    //variable que ejecuta las consultas
    private $stmt;
    
    //array con los datos de errores
    private $error = array();
    
    //variable para transacciones, 1 = Bien 0 = Mal
    private $centinela = 1;
    
    //filas afectadas por la consulta
    private $affectedRows = 0;


    private $driver = 'mysql';
    private $dbhost = 'localhost';
    private $dbuser = 'u935523561_xusl98';
    private $dbpass = 'Polientes98';
    private $dbname = 'u935523561_2020p_jsainz';
    // private $dbname = '2020p_jsainz';
    
    //constructor que realiza la conexion a la bbdd
    public function __construct() {
        try {
            $this->conexion = new PDO($this->driver.':host='.$this->dbhost.';dbname='.$this->dbname.";charset=UTF8", $this->dbuser, $this->dbpass);
        } catch (Exception $e) {
            echo "Se ha producido un error en la conexion con la BD."; 
        }
    }
    
    //ejecuta una sentencia sql
    public function query($sql,$params = null){
        $this->stmt = $this->conexion->prepare($sql);
        $this->stmt->execute($params);
        $this->comprobarQuery();
    }
    
    //comprueba si se ha realizado la consulta correctamente
    public function comprobarQuery(){
        $this->error = $this->stmt->errorInfo();
        if($this->error[0] != 00000){
            $this->centinela = 0;
        }
        
        //cuando realiza una select centinel = 1
        $this->affectedRows = $this->stmt->rowCount();
        if($this->affectedRows==0){
            $this->centinela = 0;
        }
    }
    
    //devuelve el numero de filas afectadas en la consulta
    public function affectedRows(){
        return $this->affectedRows;
    }

    //devuelve el ultimo error en la conexion con la bbdd
    public function getError(){
        $e = array();
        $e['ref']  = $this->error[0];
        $e['code'] = $this->error[1];
        $e['desc'] = $this->error[2];
        
        return $e;
    }

    public function cargaMatriz(){
        $lista = array();
        while($fila = $this->stmt->fetch(PDO::FETCH_ASSOC)){
            $lista[] = $fila;
        }
        return $lista;
    }
    
    public function cargaFila(){
        $fila = $this->stmt->fetch(PDO::FETCH_ASSOC);
        return $fila;
    }
    
    public function cierraConexion(){
        $this->stmt = null;
        $this->conexion = null;
    }

}
?>
