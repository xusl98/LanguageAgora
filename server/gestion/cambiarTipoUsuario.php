<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'jsainz', 'js_348', '2020p_jsainz');
$mysqli->set_charset("utf8");
$userId = $_POST['userId'];
$userType = $_POST['userType'];


$cons="UPDATE user SET userTypeId = '$userType' where userId = $userId";



$res = $mysqli->query($cons);


// header('Content-Type: application/json');
// do {
//     if ($resultado = $mysqli->store_result()) {
//         var_dump($resultado->fetch_all(MYSQLI_ASSOC));
//         $resultado->free();
//     }
// } while ($mysqli->more_results() && $mysqli->next_result());

echo $res;


?>