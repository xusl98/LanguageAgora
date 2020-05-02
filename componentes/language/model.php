<?php

class modelHome {
    
     public static function getUsuariosPreguntas($lang){
        $db = new database();
        $sql = "select count(question.questionId) as questions, user.name, user.userId from user, question where user.userId = question.userId and question.languageId = $lang GROUP BY user.userId order by questions desc LIMIT 6";
        $db->query($sql);
        return $db->cargaMatriz();
    }
     public static function getUsuariosRespuestas($lang){
        $db = new database();
        $sql = "select count(answer.answerId) as answers, user.name, user.userId from user, answer, question where user.userId = answer.userId and answer.questionId = question.questionId and question.languageId = $lang GROUP BY user.userId order by answers desc LIMIT 6";
        $db->query($sql);
        return $db->cargaMatriz();
    }
   

}

?>

