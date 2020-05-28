<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'jsainz', 'js_348', '2020p_jsainz');
$mysqli->set_charset("utf8");
$chatId = $_POST['chatId'];
$otraPersona = $_POST['otraPersona'];


$cons="UPDATE message SET message.leido = 1 WHERE message.chatId = $chatId and message.sender = $otraPersona";



$res = $mysqli->query($cons);
mysqli_free_result($res);
mysqli_close($mysqli);
header('Content-Type: application/json');
echo true;


?>