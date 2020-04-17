<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'jsainz', 'js_348', '2020p_jsainz');
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
