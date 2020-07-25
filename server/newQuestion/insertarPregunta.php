<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'u935523561_xusl98', 'Polientes98', 'u935523561_2020p_jsainz');
$mysqli->set_charset("utf8");
$title = $_POST['title'];
$text = $_POST['text'];
$user = $_POST['user'];
$date = $_POST['date'];
$lang = $_POST['lang'];


$cons="INSERT INTO question (title, text, userId, date, languageId) VALUES ('$title', '$text', $user, '$date', $lang)";



$res = $mysqli->query($cons);
mysqli_free_result($res);
mysqli_close($mysqli);
header('Content-Type: application/json');
echo true;


?>
