<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'jsainz', 'js_348', 'agora');
$mysqli->set_charset("utf8");
$name = $_POST['name'];
$pass = $_POST['pass'];
$email = $_POST['email'];

echo "asdas";
echo $name;
echo "asdas";

$cons="INSERT INTO user (name, pass, email) VALUES ('$name', SHA1('$pass'), '$email')";


// if(isset($_POST['name']))
// {    
//     $cons= $cons." ".$_POST['name'] . "'";    
// }

$res = $mysqli->query($cons);
// if( mysqli_num_rows($res) > 0 ){
//         $response = ProcessDbData($res);
// }else{
//         $response = array();
// }
mysqli_free_result($res);
mysqli_close($mysqli);
// if(is_array($response))
// {
//       $cadena=json_encode($response);

// }
header('Content-Type: application/json');
echo true;

// function ProcessDbData($obj){
//     $result = array();
//     if(!empty($obj)){
//         while($row = mysqli_fetch_assoc($obj)){
//             $result[] = $row;
//         }
//         return $result;
//     }
//     return $result;
// }

//echo "<table>\n";
//while($f = $res->fetch_object()){
//	echo "\t<tr>\n";
//	echo "\t\t<td>$f->nombres</td>\n";
//	echo "\t\t<td>$f->apellidos</td>\n";
// 	echo "\t</tr>\n";    
//}
//echo "</table>\n";


?>