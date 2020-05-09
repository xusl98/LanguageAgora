<?php

class modelHome {
    public static function getPreguntas($user){
        $db = new database();
        $sql = "SELECT questionID, title, text, date, user.name, language.name, language.languageId from question, user, language where user.userId = $user and user.userId = question.userId and language.languageID = question.languageId order by question.date desc";
        $db->query($sql);
        return $db->cargaMatriz();
    }
    public static function getRespuestas($user){
        $db = new database();
        $sql = "SELECT answerId, language.languageId, answer.text, score, question.questionId, answer.date, language.name, answer.date, answer.userId, user.userId from answer, user, question, language where user.userId = $user and user.userId = answer.userId and language.languageId = question.languageId and question.questionId = answer.questionId order by answer.date desc";
        $db->query($sql);
        return $db->cargaMatriz();
    }
    
  
}
?>

