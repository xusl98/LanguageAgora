
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
<script src="./js/signUp.js"></script>

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
                        <a href="index.php"><img src="./resources/logoLetNegra.png" class="brand_logo" alt="Logo"></a>
                    </div>
                </div>
                <div class="d-flex justify-content-center form_container">
                    <form id="formReg">
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span id="validUser" class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" id="user" name="user" pattern="[^\s]+" required
                                class="form-control input_user myInput" value="" placeholder="Usuario">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span id="validEmail" class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="email" id="email" name="email" pattern="[^\s]+" required
                                class="form-control input_user myInput" value="" placeholder="Email">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span id="validPass" class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" id="password" name="password" pattern="[^\s]+" required
                                class="form-control input_pass myInput" value="" placeholder="Contraseña">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span id="validPass2" class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" id="password2" name="password2" pattern="[^\s]+" required
                                class="form-control input_pass myInput" value="" placeholder="Repetir Contraseña">
                        </div>
                        <div class="d-flex justify-content-center mt-3 login_container">
                            <input type="button" disabled="true" id="submit" name="button" class="btn login_btn"
                                value="Registrarse" data-toggle="modal" data-target="#loginModal">
                        </div>
                    </form>
                </div>
                <div class="mt-4">
                    <div class="d-flex justify-content-center links">
                        ¿Ya tienes una cuenta? <a href="index.php?option=login" class="ml-2">Iniciar Sesión</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Validar correo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Se ha enviado un código al correo: "<span id="spanEmail"></span>" 
                    <label for="code">Introduce el código recibido</label>
                    <input type="text" id="code" name="code">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="codeBtn">Aceptar</button>
                </div>
            </div>
        </div>
    </div>