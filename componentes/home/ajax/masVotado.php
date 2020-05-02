<?php
include '../../../framework.php';
include '../model.php';

echo modelHome::getImagenesVotados($_POST['idAutonomia']);