
<?php 
//inclu�mos la clase ajax 
require ('./librerias/xajax/xajax_core/xajax.inc.php');

//instanciamos el objeto de la clase xajax 
$xajax = new xajax(); 
// $xajax->setFlag('debug', true);


//asociamos la funci�n creada anteriormente al objeto xajax 
$xajax->register(XAJAX_FUNCTION,"getIdiomas"); 

//El objeto xajax tiene que procesar cualquier petici�n 
$xajax->processRequest();
?> 

<link rel="stylesheet" href="./css/signUp.css">
<script src="./js/login.js"></script>
<style>
    i{
        visibility: hidden;
    }
</style>
<div class="container h-100">
        <div class="d-flex justify-content-center h-100">
            <div class="user_card">
                <div class="d-flex justify-content-center">
                    <div class="brand_logo_container">
                        <img src="./resources/logoLetNegra.png"
                            class="brand_logo" alt="Logo">
                    </div>
                </div>
                <div class="d-flex justify-content-center form_container">
                    <form id="formLogin">
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" id="user" name="user" pattern="[^\s]+" required class="form-control input_user" value="" placeholder="Usuario">
                        </div>
                        <div class="input-group mb-2">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" id="password" name="password" pattern="[^\s]+" required class="form-control input_pass" value=""
                                placeholder="Contraseña">
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customControlInline">
                                <label class="custom-control-label" for="customControlInline">Recuérdame</label>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center mt-3 login_container">
                            <input id="submit" type="submit" name="button" class="btn login_btn" value="Iniciar Sesión">
                            <!-- <button type="button" name="button" class="btn login_btn">Iniciar Sesión</button> -->
                        </div>
                    </form>
                </div>

                <div class="mt-4">
                    <div class="d-flex justify-content-center links">
                        ¿No tienes una cuenta? <a href="index.php?option=signUp" class="ml-2">Registrarse</a>
                    </div>
                    <div class="d-flex justify-content-center links">
                        <a href="#">¿Olvidaste la contraseña?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- TOAST -->
    <div id="nameToast" role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false">
        <div class="toast-header toast-error-header">
            <strong class="mr-auto">Error</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" style="color: white;">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="toastText" class="toast-body toast-error-body">
            La combinación de usuario y contraseña no es correcta.
        </div>
    </div>