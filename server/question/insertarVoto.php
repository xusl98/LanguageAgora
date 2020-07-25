<?php
// Conectando, seleccionando la base de datos
$mysqli = new mysqli('127.0.0.1', 'u935523561_xusl98', 'Polientes98', 'u935523561_2020p_jsainz');
$mysqli->set_charset("utf8");
$id = $_POST['answer'];
$user = $_POST['user'];
$vote = $_POST['vote'];
$voteInsert = 0;
if ($vote == 'up'){
    $voteInsert = 1;
} else {
    $voteInsert = 0;
}


$cons="INSERT INTO voted (userId, answerId, upvoted) VALUES ($user, $id, $voteInsert);";


// $res = $mysqli->query($cons);
if ($vote == "up"){
    $cons .= "UPDATE answer SET score = score + 1 WHERE answer.answerId = $id;";
} else {
    $cons .= "UPDATE answer SET score = score - 1 WHERE answer.answerId = $id;";
}

$mysqli->multi_query($cons);


// header('Content-Type: application/json');
// do {
//     if ($resultado = $mysqli->store_result()) {
//         var_dump($resultado->fetch_all(MYSQLI_ASSOC));
//         $resultado->free();
//     }
// } while ($mysqli->more_results() && $mysqli->next_result());

echo $id . "-" . $vote;


?>
