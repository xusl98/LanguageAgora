<?php

class modelHome {
    public static function getUsuarios(){
        $db = new database();
        $sql = "SELECT * FROM user";
        $db->query($sql);
        return $db->cargaMatriz();
    }

    public static function getPreguntasReportadas(){
        $db = new database();
        $sql = "SELECT question.questionId, question.title, question.text, user.name user, question.date, language.name as language, language.languageId as languageId  FROM question, user, language where question.reported = 1 and user.userId = question.userId and language.languageId = question.languageId";
        $db->query($sql);
        return $db->cargaMatriz();
    }
  
}
?>

