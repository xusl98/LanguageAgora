<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'u935523561_xusl98', 'Polientes98', 'u935523561_2020p_jsainz');
$mysqli->set_charset("utf8");
$user = $_POST['user'];
$receiver = $_POST['receiver'];



$cons="INSERT INTO chat (user1Id, user2Id) VALUES ($user, $receiver);";


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
