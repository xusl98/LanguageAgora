<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'jsainz', 'js_348', '2020p_jsainz');
$mysqli->set_charset("utf8");
$ip = $_POST['ip'];
$country = $_POST['country'];
$countryCode = $_POST['countryCode'];
$date = $_POST['date'];
$time = $_POST['time'];

$dateTime = $date . ' ' . $time;



//'2020-05-26 11:16:12'
$cons="INSERT INTO visit (ip, country, countryCode, dateTime) VALUES ('$ip', '$country', '$countryCode', '$dateTime');";


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
