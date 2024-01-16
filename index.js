//--------------------------------------------------- Receber o valor aleatório --------------------------------------------------------------------------------------------
var numGerado;
var i = 0;
var centena = 0, centenaProv, centenaStr, dezena, dezenaProv, dezenaStr, unidade, unidadeStr;

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        var btn = document.querySelector("#botao");
      
      btn.click();
    
    }
  });

function calcCentena (valor){
    centenaProv = valor/100;
    centenaProv = Math.floor(centenaProv);
    centena = centenaProv*100;
    
    centenaStr = centenaProv.toString();

    return centena, centenaStr;
}

function calcDezena (valor){
    
    dezenaProv = (valor-centena)/10;
    dezenaProv = Math.floor(dezenaProv);
    dezena = dezenaProv*10;
    
    dezenaStr = dezenaProv.toString();

    return dezena, dezenaStr;
}

function calcUnidade (valor){
    unidade = valor-centena-dezena;

    unidadeStr = unidade.toString();

    return unidade, unidadeStr;
}

function regras (){
    alert(
        "\nDigite um número entre 1 e 300\n\nO objetivo é acertar o número aleatório. O jogo dará dicas conforme você dá os seus palpites\n\nTente acertar com o menor número de tentativas possíveis.\n\nBoa sorte!!!"
    )
}

function reset(){

    i=0;
    centena = 0;
    dezena = 0;
    
    
    fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300')
    .then((response) => response.json()
    )
    .then((data) => {
        numGerado = data.value;
        var erro = data.StatusCode;

        console.log(numGerado);
        console.log(erro);
        
        document.getElementById("contador").style.color = "#EEEEEE";
        
        if(numGerado != undefined){
            document.getElementById("contador").innerHTML = "Contador de tentativas: ";
            
            document.getElementById("mensagem").innerHTML = "";
            document.getElementById("display-1").className = "display-container display-vazio tres-display";
            document.getElementById("display-2").className = "display-container display-num-0 tres-display";
            document.getElementById("display-3").className = "display-container display-vazio tres-display"; 
            
            document.getElementById("nova-partida").innerHTML = ""
            
            document.getElementById("palpite").value = "";
            document.getElementById("palpite").disabled = false;
            document.getElementById("botao").disabled = false; 
            document.getElementById("botao").style.background = "linear-gradient(to bottom, #EF6C00 0%,#C0661C 100%)";
            document.getElementById("botao").style.cursor = "pointer";
            
        } else if (numGerado == undefined){
            if(i<0){
                document.getElementById("contador").style.color = "#cc3300";
            }

            calcCentena(erro);
            
            calcDezena(erro);
            
            calcUnidade(erro);
                
            document.getElementById("mensagem").style.color = "#cc3300";
            document.getElementById("mensagem").innerHTML = "ERRO";
            
            document.getElementById("display-1").className = "display-container display-num-"+centenaStr+ "-erro";
            document.getElementById("display-2").className = "display-container display-num-"+dezenaStr+ "-erro";
            document.getElementById("display-3").className = "display-container display-num-"+unidadeStr+ "-erro"; 
            
            document.getElementById("palpite").disabled = true;
            document.getElementById("botao").disabled = true;
            document.getElementById("botao").style.background = "#DDDDDD";
            document.getElementById("botao").style.cursor = "default";
            document.getElementById("nova-partida").innerHTML = "<button onclick= \"{reset()}\" id= \"botao-nova-partida\" class= \"botao-nova-partida\"><i class=\"fa fa-repeat\"></i> NOVA PARTIDA</button>";
        }
    });
    
    return numGerado;
}


async function main() {

    var palpite;
    
    palpite = document.getElementById('palpite').value;
    palpite = palpite/1;
    
    console.log(palpite);

    document.getElementById("contador").style.color = "#000";
    
    function msg (){

        if(palpite >= 1 && palpite <= 300){
            if (palpite < numGerado){
                i += 1;
                
                document.getElementById("mensagem").style.color = "#ff6600";
                document.getElementById("mensagem").innerHTML = "É maior";
                
            } else if(palpite > numGerado){
                i += 1;
                
                document.getElementById("mensagem").style.color = "#ff6600";
                document.getElementById("mensagem").innerHTML = "É menor";
                
            } else if(palpite == numGerado){
                i += 1;

                document.getElementById("contador").style.color = "#32bf00";
                
                document.getElementById("mensagem").style.color = "#32bf00";
                document.getElementById("mensagem").innerHTML = "Você acertou";
                
            } else if(numGerado == undefined){
                
                document.getElementById("mensagem").style.color = "#cc3300";
                document.getElementById("mensagem").innerHTML = "ERRO";
                
            }
        } else {
                        
            document.getElementById("contador").style.color = "#cc3300";
            
            document.getElementById("mensagem").style.color = "#cc3300";
            document.getElementById("mensagem").innerHTML = "ERRO";
        }
        
        document.getElementById("contador").innerHTML = "Contador de tentativas: "+i+"";
        
    }

    function display(){
        if(palpite >= 1 && palpite <= 300){
            if (palpite == numGerado){

                document.getElementById("nova-partida").innerHTML = "<button onclick= \"{reset()}\" id= \"botao-nova-partida\" class= \"botao-nova-partida\"><i class=\"fa fa-repeat\"></i> NOVA PARTIDA</button>";
                document.getElementById("palpite").disabled = true;
                document.getElementById("botao").disabled = true;
                document.getElementById("botao").style.background = "#DDDDDD";
                document.getElementById("botao").style.cursor = "default";


                if(palpite >= 1 && palpite <= 9){

                    document.getElementById("display-1").className = "display-container display-vazio";
                    document.getElementById("display-2").className = "display-container display-num-"+palpiteStr+ "-acerto";
                    document.getElementById("display-3").className = "display-container display-vazio";         

                } else if (palpite >= 10 && palpite <= 99){

                    document.getElementById("display-1").className = "display-container dois-display display-num-"+dezenaStr+ "-acerto";
                    document.getElementById("display-2").className = "display-container dois-display display-num-"+unidadeStr+ "-acerto";
                    document.getElementById("display-3").className = "display-container dois-display display-vazio";

                } else if(palpite >= 100 && palpite <= 300){

                    document.getElementById("display-1").className = "display-container display-num-"+centenaStr+ "-acerto";
                    document.getElementById("display-2").className = "display-container display-num-"+dezenaStr+ "-acerto";
                    document.getElementById("display-3").className = "display-container display-num-"+unidadeStr+ "-acerto";
                }

            } else if(palpite >= 1 && palpite <= 9){

                document.getElementById("palpite").value = "";

                document.getElementById("display-1").className = "display-container display-vazio";
                document.getElementById("display-2").className = "display-container display-num-"+palpiteStr+ "";
                document.getElementById("display-3").className = "display-container display-vazio";   

            } else if (palpite >= 10 && palpite <= 99){

                document.getElementById("palpite").value = "";

                document.getElementById("display-1").className = "display-container dois-display display-num-"+dezenaStr+ "";
                document.getElementById("display-2").className = "display-container dois-display display-num-"+unidadeStr+ "";
                document.getElementById("display-3").className = "display-container dois-display display-vazio";

            } else if(palpite >= 100 && palpite <= 300){

                document.getElementById("palpite").value = "";

                document.getElementById("display-1").className = "display-container display-num-"+centenaStr+ "";
                document.getElementById("display-2").className = "display-container display-num-"+dezenaStr+ "";
                document.getElementById("display-3").className = "display-container display-num-"+unidadeStr+ "";
            }

        } else if (palpite <= 0){

            document.getElementById("botao").disabled = true;
            document.getElementById("botao").style.background = "#DDDDDD";
            document.getElementById("botao").style.cursor = "default";
            document.getElementById("nova-partida").innerHTML = "<button onclick= \"{reset()}\" id= \"botao-nova-partida\" class= \"botao-nova-partida\"><i class=\"fa fa-repeat\"></i> NOVA PARTIDA</button>";                document.getElementById("palpite").disabled = true;



            document.getElementById("display-1").className = "display-container display-vazio";
            document.getElementById("display-2").className = "display-container display-num-0-erro";
            document.getElementById("display-3").className = "display-container display-vazio";

        } else {

            document.getElementById("botao").disabled = true;
            document.getElementById("botao").style.background = "#DDDDDD";
            document.getElementById("botao").style.cursor = "default";
            document.getElementById("nova-partida").innerHTML = "<button onclick= \"{reset()}\" id= \"botao-nova-partida\" class= \"botao-nova-partida\"><i class=\"fa fa-repeat\"></i> NOVA PARTIDA</button>";                document.getElementById("palpite").disabled = true;


            document.getElementById("display-1").className = "display-container display-num-"+centenaStr+ "-erro";
            document.getElementById("display-2").className = "display-container display-num-"+dezenaStr+ "-erro";
            document.getElementById("display-3").className = "display-container display-num-"+unidadeStr+ "-erro";
        }
    }    
    
//---------------------------------------------------------------------------- Validação -----------------------------------------------------------------------------------
    if (palpite <= 0){

        msg();

        display();
    }
    
    if (palpite >= 1 && palpite <= 9){
        
        var palpiteStr = palpite.toString();

        msg();
        
        display();
    }
    
    if(palpite >= 10 && palpite <= 99){

        centena = 0;
        
        calcDezena(palpite);

        calcUnidade(palpite);
        
        msg();
        
        display();
    }
    
    if(palpite >= 100 && palpite <= 300){
        
        calcCentena(palpite);
        
        calcDezena(palpite);
        
        calcUnidade(palpite);

        msg();

        display();
    }

    if(palpite >= 301 && palpite <= 999){

        calcCentena(palpite);
        
        calcDezena(palpite);
        
        calcUnidade(palpite);

        msg();

        display();
    }
}
