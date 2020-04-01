<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'aaaaa', 'aaaaa', 'superhero');
$mysqli->set_charset("utf8");
$cons="SELECT codigo,superheroe,identidad_secreta,super_poder,alineacion,fecha_aparicion,victorias,derrotas, descgen as genero FROM superheroes inner join genero on superheroes.genero=genero.id ";


if(isset($_GET['orden']))
{    
    $cons= $cons." order by ".$_GET['orden'];    
}

$res = $mysqli->query($cons);
if( mysqli_num_rows($res) > 0 ){
        $response = ProcessDbData($res);
}else{
        $response = array();
}
mysqli_free_result($res);
mysqli_close($mysqli);
if(is_array($response))
{
      $cadena=json_encode($response);

}
header('Content-Type: application/json');
echo $cadena;

function ProcessDbData($obj){
    $result = array();
    if(!empty($obj)){
        while($row = mysqli_fetch_assoc($obj)){
            $result[] = $row;
        }
        return $result;
    }
    return $result;
}

//echo "<table>\n";
//while($f = $res->fetch_object()){
//	echo "\t<tr>\n";
//	echo "\t\t<td>$f->nombres</td>\n";
//	echo "\t\t<td>$f->apellidos</td>\n";
// 	echo "\t</tr>\n";    
//}
//echo "</table>\n";


?>
