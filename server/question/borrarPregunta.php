<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'u935523561_xusl98', 'Polientes98', 'u935523561_2020p_jsainz');
$mysqli->set_charset("utf8");
$id = $_POST['question'];

$cons="DELETE FROM question where questionId = $id;";



$mysqli->query($cons);


// header('Content-Type: application/json');
// do {
//     if ($resultado = $mysqli->store_result()) {
//         var_dump($resultado->fetch_all(MYSQLI_ASSOC));
//         $resultado->free();
//     }
// } while ($mysqli->more_results() && $mysqli->next_result());

echo $id . "-" . $vote;


?>
