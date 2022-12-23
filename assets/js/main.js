let btnst = $("#botaoStart");
btnst.on("click", start);

var energyBar = 3;
var pontos = 00000;
var scoreStd = 100;
var velocidadeEnemy1 = 1;
var velocidadeEnemy2 = 2;
var podeAtirar2 = true;

var somDisparo=document.getElementById("somDisparo");
var somExplosao=document.getElementById("somExplosao");
var musica=document.getElementById("musica");
var musica_fundo=document.getElementById("musica_fundo");
musica_fundo.volume = .7;
var somGameover=document.getElementById("somGameover");
var somPerdido=document.getElementById("somPerdido");
var somResgate=document.getElementById("somResgate");

musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica_fundo.addEventListener("ended", function(){ musica_fundo.currentTime = 0; musica_fundo.play(); }, false);
musica.play();

function start() { // Inicio da função start()
    $('footer').remove();
    musica.pause()
    musica_fundo.play();
    setInterval(movefundo,16);
    setInterval(enemyMove1,16);
    setInterval(enemyMove2,16);
    setInterval(friendMove,16);
    setInterval(() => colisoes("#jogador", "#inimigo1"), 1);
    setInterval(() => colisoes("#jogador", "#inimigo2"), 1);
    setInterval(() => colisoes("#disparo", "#inimigo1"), 1);
    setInterval(() => colisoes("#disparo", "#inimigo2"), 1);
    setInterval(() => colisoes("#jogador", "#disparo2"), 1);
    setInterval(() => colisoes("#jogador", "#amigo"), 1);
    setInterval(() => colisoes("#amigo", "#inimigo2"), 1);

	$("#inicio").hide();
	
	$("#fundoGame").append("<div class='obj anima1 coming' id='jogador'></div>");
	$("#fundoGame").append("<div class='obj anima2' id='inimigo1'></div>");
	$("#fundoGame").append("<div class='obj' id='inimigo2'></div>");
	$("#fundoGame").append("<div class='obj anima3' id='amigo'></div>");
    $("#fundoGame").append("<div class='obj' id='placar'><span class='score'>score:</span><br><span id='scoreNum'>0</span></div>");
    $("#fundoGame").append("<div class='obj' id='energia'></div>");

    pontos = 00000;
    $('#scoreNum').html(pontos);

} // Fim da função start

//Principais variáveis do jogo
	

//Função que movimenta o fundo do jogo
	
	function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
    if(esquerda <= -2200){$("#fundoGame").css("background-position",0);}
	else {$("#fundoGame").css("background-position",esquerda-1);}
	
	} // fim da função movefundo()


    document.body.addEventListener('keypress', function (event) {

        document.getElementById("jogador").classList.remove("coming");

        pressedKey = event.key;

        if (pressedKey == "w") {
            var jogadorY = parseInt($("#jogador").css("top"));
            if( jogadorY <= 182){$("#jogador").css("top", "20px"); return}
            $("#jogador").css("top", jogadorY-100 + "px");

        }

        if (pressedKey == "s") {
            var jogadorY = parseInt($("#jogador").css("top"));
            if( jogadorY >= 437){$("#jogador").css("top", "438px"); return}
            $("#jogador").css("top", jogadorY+100 + "px");


        }

        if (pressedKey == "d") {
            var jogadorY = parseInt($("#jogador").css("left"));
            if( jogadorY >= 700){$("#jogador").css("left", "700px"); return}
            $("#jogador").css("left", jogadorY+100 + "px");

            $("#jogador").css("transform","rotate(22deg)");

        }

        if (pressedKey == "a") {
            var jogadorY = parseInt($("#jogador").css("left"));
            if( jogadorY <= 8){$("#jogador").css("left", "8px"); return}
            $("#jogador").css("left", jogadorY-100 + "px");

            $("#jogador").css("transform","rotate(-22deg)");


        }

        if (pressedKey == "j") {
            disparo();
        }

        
    });

    document.body.addEventListener('keyup', function (event) {

            $("#jogador").css("transform","rotate(0deg)");
        
    });


    //Função que movimenta o inimigo

    function enemyMove1(){
        
        enemy_1_PosX = parseInt($("#inimigo1").css("left"));
        enemy_1_PosY = Math.floor(Math.random()*350);

        if(enemy_1_PosX <= 0) {

        $("#inimigo1").css("top", enemy_1_PosY + "px");
        $("#inimigo1").css("left", "889px");
        } else {

        enemy_1_PosX -= velocidadeEnemy1;

        $("#inimigo1").css("left", enemy_1_PosX + "px");
    }

    }

    function enemyMove2(){
        enemy_2_PosX = parseInt($("#inimigo2").css("left"));

        if(enemy_2_PosX <= 0) {

        $("#inimigo2").css("left", "889px");
        } else {

        enemy_2_PosX -= velocidadeEnemy2;

        $("#inimigo2").css("left", enemy_2_PosX + "px");
    }
    
    }

    function friendMove(){
        amigo_PosX = parseInt($("#amigo").css("left"));

        if(amigo_PosX >= 889) {

        $("#amigo").css("left", "10px");
        } else {

        amigo_PosX += Math.random()*3;

        $("#amigo").css("left", amigo_PosX + "px");
    }
    
    }

    var podeAtirar = true;

    function disparo() {

        if(podeAtirar == true) {
         let jogadorX = parseInt($("#jogador").css("left"));
         let jogadorY = parseInt($("#jogador").css("top"));
         somDisparo.play();
         tiroX = jogadorX + 190;
         tiroY = jogadorY + 37;

         $("#fundoGame").append("<div id='disparo'></div>");
         $("#disparo").css("left", tiroX + "px");
         $("#disparo").css("top", tiroY + "px");

         podeAtirar = false;

         var animatiroX = setInterval(() => {
            if (parseInt($("#disparo").css("left")) >= 900){
                clearInterval(animatiroX);
                $("#disparo").remove();
                podeAtirar = true;
            } else {
                trajetoria = parseInt($("#disparo").css("left")) + 10;
                $("#disparo").css("left", trajetoria + "px");
            }
         },30);

        }
    }

    function disparoInimigo1() {

        if(podeAtirar2 == true) {
         let enemyX = parseInt($("#inimigo1").css("left"));
         let enemyY = parseInt($("#inimigo1").css("top"));

         tiroX = enemyX + 103;
         tiroY = enemyY + 67;

         $("#fundoGame").append("<div id='disparo2'></div>");
         $("#disparo2").css("left", tiroX + "px");
         $("#disparo2").css("top", tiroY + "px");

         podeAtirar2 = false;

         var animatiroX = setInterval(() => {
            if (parseInt($("#disparo2").css("top")) >= 500){
                clearInterval(animatiroX);
                $("#disparo2").remove();
                podeAtirar2 = true;
            } else {
                trajetoria = parseInt($("#disparo2").css("top")) + 3;
                $("#disparo2").css("top", trajetoria + "px");
            }
         },30);

        }
    }

    function colisoes(objeto1, objeto2) {

        let x1 = parseInt($(objeto1).css("left"));
        let y1 = parseInt($(objeto1).css("top"));
        let w1 = parseInt($(objeto1).css("width"));
        let h1 = parseInt($(objeto1).css("height"));

        let x2 = parseInt($(objeto2).css("left"));
        let y2 = parseInt($(objeto2).css("top"));
        let w2 = parseInt($(objeto2).css("width"));
        let h2 = parseInt($(objeto2).css("height"));

        if(x1 < x2 && x2 < x1 + w1 || x1 == x2 || x1 > x2 && x1 < x2 + w2 ) {

            if(objeto2 == "#inimigo1" && y2 < y1) {
                disparoInimigo1();
            }

            if (y1 == y2 || y1 > y2 && y1 < y2 + h2 || y1 < y2 && y2 < y1 + h1){

                if(objeto1 == "#disparo" && objeto2 == "#inimigo1"){
                    $("#fundoGame").append("<div id='scoreGain'></div>");
                    $("#scoreGain").html('+' + scoreStd);
                    $("#scoreGain").css("top", "300px");
                    
                    setTimeout(() => $("#scoreGain").remove(),2000);

                    $(objeto1).remove();
                    velocidadeEnemy1 += 1;
                    explAnima(objeto2);
                    console.log("Marcou Ponto!");

                    podeAtirar = true;
                    somaPontos("derrotaInimigo");
                    somExplosao.pause();
                    somExplosao.play();
                    
                    return;
                }

                if(objeto1 == "#disparo" & objeto2 == "#inimigo2"){
                    $("#fundoGame").append("<div id='scoreGain2'></div>");
                    $("#scoreGain2").html('+' + scoreStd);
                    setTimeout(() => $("#scoreGain2").remove(),2000);
                    $(objeto1).remove();
                    velocidadeEnemy2 += 1;
                    explAnima(objeto2);
                    console.log("Marcou Ponto!");

                    podeAtirar = true;
                    somaPontos("derrotaInimigo");
                    somExplosao.pause();
                    somExplosao.play();
                    return;
                }

                if(objeto1 == "#jogador" && objeto2 != "#amigo") {

                    energyBar -= 1;
                    scoreStd = 100;
                    $('#energia').css("background-image", "url(assets/img/energia"+energyBar+".png)");
                    $('#jogador').css("animation", "damageReceived .2s infinite alternate");
                    setTimeout(() => $('#jogador').css("animation", "play .1s steps(2) infinite"), 2000);

                    if(energyBar < 1){
                        gameover();
                        return;
                    }
                    podeAtirar2 = true;
                    explAnima(objeto2);

                    somExplosao.pause();
                    somExplosao.play();
                    return;
                }

                if(objeto1 == "#jogador" && objeto2 == "#amigo"){
                    console.log("Resgatou com sucesso!!");
                    $("#fundoGame").append("<div id='scoreGain3'></div>");
                    $("#scoreGain3").html("+1000");
                    let exploX = parseInt($("#amigo").css("left"));
                    let exploY = parseInt($("#amigo").css("top"));
                    $("#scoreGain3").css("left", exploX+20 + "px");
                    $("#scoreGain3").css("top", exploY-20 + "px");
                    $(objeto2).remove();
                    setTimeout(() => {
                        $("#fundoGame").append("<div class='obj anima3' id='amigo'></div>");
                        $("#scoreGain3").remove();
                    }, 10000);
                    somaPontos("resgate");
                    somResgate.play();
                    return;
                }

                if(objeto1 == "#amigo" && objeto2 == "#inimigo2"){
                    explAnima(objeto1);
                    console.log("Resgate Falhou!")
                    return;
                }
                
                return;
            }

            return;

        }

        return;
    }




function gameover() {
    $("#fundoGame").css("opacity", ".8");
    musica_fundo.pause()
    somGameover.play();
    velocidadeEnemy2 = 1;
    velocidadeEnemy2 = 2;

    console.log("GAME OVER!");
    let objetos = document.querySelectorAll(".obj");

    for(i of objetos) {$(i).remove();}
    
    $("#fundoGame").append("<div id='gameOver_end'><div class='text_go'>Game over</div><div id='placar2'>asas</div><button class='botaoTelaInicio'>Voltar ao Menu</button></div>");
    $('#placar2').html("score total: " + pontos);

    botaoInicio = document.getElementsByClassName("botaoTelaInicio")[0];
    botaoInicio.addEventListener("click", () => window.location.reload());
    return;
}


function explAnima(objeto) {

                    let exploX = parseInt($(objeto).css("left"));
                    let exploY = parseInt($(objeto).css("top"));

                    $(objeto).remove();

                    if(objeto == "#inimigo1"){
                    $("#fundoGame").append("<div id='explosao1'></div>");
                    
                    $("#explosao1").css("left", exploX + "px");
                    $("#explosao1").css("top", exploY + "px");

                    $("#scoreGain").css("left", exploX+60 + "px");
                    $("#scoreGain").css("top", exploY-60 + "px");

                    setTimeout(() => {
                        $("#explosao1").remove();
                        enemy_1_PosY = Math.floor(Math.random()*350);
                        $("#fundoGame").append("<div class='obj anima2' id='inimigo1'></div>");
                        $("#inimigo1").css("top", enemy_1_PosY + "px");
                    }, 2000);
                    } else

                    if(objeto == "#inimigo2"){
                        $("#fundoGame").append("<div id='explosao2'></div>");
                        $("#explosao2").css("left", exploX + "px");
                        $("#explosao2").css("top", exploY + "px"); 
                        
                        $("#scoreGain2").css("left", exploX+60 + "px");
                        $("#scoreGain2").css("top", exploY-60 + "px");
    
                        setTimeout(() => {
                            $("#explosao2").remove();
                            $("#fundoGame").append("<div class='obj' id='inimigo2'></div>");
                        }, 2000);
                        } else

                    if(objeto == "#amigo"){
                        $("#fundoGame").append("<div id='amigoDeath'></div>");
                        $("#amigoDeath").css("left", exploX + "px");
                        $("#amigoDeath").css("top", exploY + "px");
                        somPerdido.play();
                        setTimeout(() => {
                            $("#amigoDeath").remove();
                            $("#fundoGame").append("<div class='obj anima3' id='amigo'></div>");
                        }, 15000);
                        }

                    return;
}

function somaPontos(tipo) {

    if(tipo == 'resgate'){
        pontos = pontos + 1000;
        $('#scoreNum').html(pontos);
        return;
    } else if(tipo == 'derrotaInimigo'){
        scoreStd += 10;
        pontos = pontos + scoreStd;
        $('#scoreNum').html(pontos);
        return;
    }
}