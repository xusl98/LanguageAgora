<script src="./js/question.js"></script>



<div class="row">
            <div class="col-md-3">&nbsp;</div>
            <div class="col-md-6" style="margin-top: 2%;">
                <div>
                    <!-- CONTENIDO -->
                    <div class="card text-center textoIzquierda">
                        <div class="card-header align-left">
                            <a style="color: black;" href="#" id="idioma">Language</a>
                        </div>
                        <div class="card-body container-fluid">
                            <h5 id="titulo" class="card-title align-left">Título</h5>
                            <p id="texto" class="card-text align-left">With supporting text below as a natural lead-in
                                to
                                additional content.
                            </p>
                            <p>
                            
                            <span id="spanReport" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Pregunta no adecuada" data-placement="right">
                                <button id="btnReport" question="" class="btn btn-primary" style="pointer-events: none;" type="button"><i class="far fa-flag"></i></button>
                            </span>
                            </p>    
                            <div class="row">
                                <div class="col-md-8" style="text-align: left;"><a id="editQuestion" style="color: gray;" href="#">Editar</a>&nbsp;<a id="deleteQuestion" style="color: gray;" href="#" >Eliminar</a></div>
                                <div id="contResp" class="col-md-4">
                                    <button id="btnResponder" class="btn btn-primary">Responder</button> 
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-muted textoCentro">
                            <div><span id="fecha" style="margin-right: 5%;">00/00/0000</span><a
                                    style="color: #6c757d; margin-left: 5%;" href="#" id="pregUser">usuario</a></div>
                        </div>
                    </div>
                    <!-- PARA NUEVA O EDITAR RESPUESTA -->
                    <div id="nuevaRespuesta" class="card container-fluid">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="exampleInputPassword1">Respuesta</label>
                                <textarea class="form-control" id="answerBody" rows="5"></textarea>
                            </div>
                            <div style="text-align: right;">
                                <button id="btnCancelarRespuesta" class="btn btn-primary">Cancelar</button>
                                <button id="btnAceptarRespuesta" class="btn btn-primary">Aceptar</button>
                            </div>
                        </div>
                    </div>
                    <!-- PARA NUEVA O EDITAR RESPUESTA -->
                    <div id="respuestas">

                    </div>
                    <!-- <div class="card text-center">
                        <div class="card-body container-fluid" style="margin-top: 3%;">
                            <p  class="card-text align-left">With supporting text below as a natural lead-in
                                to
                                additional content.
                            </p>
                            <div class="row">
                                <div class="col-md-8">&nbsp;</div>
                                <div class="col-md-4">  
                                    <button type="button" class="btn btn-primary"><i class="fa fa-arrow-down"></i></button>
                                    0
                                    <button type="button" class="btn btn-primary"><i class="fa fa-arrow-up"></i></button>  

                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                            <div><span  style="margin-right: 5%;">00/00/0000</span><a
                                    style="color: #6c757d; margin-left: 5%;" href="#" >usuario</a></div>
                        </div>
                    </div> -->
                    <!-- CONTENIDO -->
                </div>
            </div>
            <div class="col-md-3">&nbsp;</div>
        </div>
    </div>
    
    <!-- MODAL CONFIRMAR BORRADO -->
    <div class="modal fade" id="elimModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar Pregunta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>¿Seguro que quieres eliminar esta pregunta?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnEliminar">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- MODAL CONFIRMAR BORRADO RESPUESTA -->
    <div class="modal fade" id="elimModalResp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar Respuesta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>¿Seguro que quieres eliminar esta respuesta?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" answer="" id="btnEliminarResp">Eliminar</button>
                </div>
            </div>
        </div>
    </div>