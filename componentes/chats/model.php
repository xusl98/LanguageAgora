<?php

class modelHome {
    public static function getChats($userId){
        $db = new database();
        $sql = "SELECT DISTINCT chat.chatId as michat, chat.user1Id, chat.user2Id, (select count(message.messageId) from message, chat where message.chatId = chat.chatId and chat.chatId = michat) as numMensajes, (select message.text from message, chat where message.chatId = chat.chatId and chat.chatId = michat order by message.dateTime limit 1) as ultimoMensaje FROM chat, message, user WHERE (chat.user1Id = user.userId or chat.user2Id = user.userId) and user.userId = $userId";
        $db->query($sql);
        return $db->cargaMatriz();
    }
    
    public static function getUserName($userId){
        $db = new database();
        $sql = "SELECT user.name from user where user.userId = $userId";
        $db->query($sql);
        return $db->cargaFila();
    }

    public static function getMensajesNoLeidos($chat, $otraPersona){
        $db = new database();
        $sql = "select count(DISTINCT message.messageId) as noLeidos from message, chat, user where message.chatId = chat.chatId and chat.chatId = $chat and message.leido = false and message.sender = $otraPersona";
        $db->query($sql);
        return $db->cargaFila();
    }
  
}
?>

