<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'u935523561_xusl98', 'Polientes98', 'u935523561_2020p_jsainz');
$mysqli->set_charset("utf8");
$title = $_POST['title'];
$text = $_POST['text'];
$id = $_POST['id'];


$cons="UPDATE question SET title = '$title', text = '$text' WHERE questionId = $id;";



$res = $mysqli->query($cons);
mysqli_free_result($res);
mysqli_close($mysqli);
header('Content-Type: application/json');
echo true;


?>
