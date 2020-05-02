<?php
include 'componentes/home/model.php';

$autonomias     = modelHome::getAutonomias();
$idiomas     = modelHome::getIdiomaS();
$ultimosSitios  = modelHome::getUltimosSitios();

include 'componentes/home/view.php';