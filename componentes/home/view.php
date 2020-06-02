
<script src="./js/home.js"></script>
<link rel="stylesheet" href="./css/home.css">
<div class="row">
            <div class="col-md-12" style="margin-top: -2%;">
                <div>
                    <!-- CONTENIDO -->
                    <!-- CAROUSSEL -->
                    <div id="carouselExampleCaptions" class="carousel slide row" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="./resources/slider/foto1.jpg" class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <div class="fondoNegro menosOscuro">
                                        <h5>Pregunta</h5>
                                        <p>Haz preguntas sobre las dudas que te surjan.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="./resources/slider/foto2.jpg" class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <div class="fondoNegro">
                                        <h5>Responde</h5>
                                        <p>Ayuda a resolver las dudas de otros usuarios</p>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="./resources/slider/foto3.jpg" class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <div class="fondoNegro masOscuro">
                                        <h5>Valora</h5>
                                        <p>Valora las respuestas de otros usuarios.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button"
                            data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button"
                            data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <!-- LISTA IDIOMAS -->
                    <div style="margin-bottom: 2%; text-align:center; padding: 0 20% 0 20%;" id="idiomas">
                        <!-- <h1>Idiomas</h1> -->
                        <a id="idiomasDesp" data-toggle="collapse" href="#lista" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <h1>Idiomas <i id="despleg" class="fas fa-chevron-right"></i></h1>
                        </a>
                        <div id="lista" class="list-group collapse">
                        <?php 
                        foreach ($idiomas as $idioma){
                            echo '<a href="index.php?option=language&lang='.$idioma['languageId'].'&name='.$idioma['name'].'" class="list-group-item list-group-item-action">'.$idioma['name'].'</a>';
                        }
                        ?>
                        </div>
                    </div>
                    <!-- CONTENIDO -->
                </div>
            </div>
        </div>