<?php

class Language{
    private $languageId;
    private $name;
    private $disabled;
    
    function __construct($row) {
        $this->languageId = $row['languageId'];
        $this->name = $row['name'];
        $this->disabled = $row['disabled'];
    }
    
    function getLanguageId() {
        return $this->languageId;
    }

    function getName() {
        return $this->name;
    }

    function getDisabled() {
        return $this->disabled;
    }


    function setLanguageId($languageId) {
        $this->languageId = $languageId;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setDisabled($disabled) {
        $this->disabled = $disabled;
    }


    
}