
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
                        <a href="index.php"><img src="./resources/logoLetNegra.png"
                            class="brand_logo" alt="Logo"></a>
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
                        <a id="olvPass" href="#">¿Olvidaste la contraseña?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>