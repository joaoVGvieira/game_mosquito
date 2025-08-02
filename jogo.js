var largura = 0
var altura = 0
var vida = 1
var tempo = 50
var criaMosquitoTempo = 0 // valor padrão

// obter nível da URL
var nivel = new URLSearchParams(window.location.search).get('nivel')
switch (nivel) {
    case 'facil':
        criaMosquitoTempo = 2000
        break
    case 'medio':
        criaMosquitoTempo = 1500
        break
    case 'dificil':
        criaMosquitoTempo = 1300
        break
    default:
        alert('Nível inválido!')
        window.location.href = 'index.html'
}

function ajustarTamanhoTela() {
    largura = window.innerWidth
    altura = window.innerHeight
}

ajustarTamanhoTela()

document.getElementById('cronometro').innerHTML = `Tempo Restante: ${tempo}`

var cronometro = setInterval(function () {
    tempo--
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = `Tempo Restante: ${tempo}`
    }
}, 1000)


function posicaoRandomica() {

    if (document.getElementById('borboleta')) {
        document.getElementById('borboleta').remove();
    }


    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        var coracao = document.getElementById('v' + vida)
        if (coracao) {
            coracao.src = "imagens/coracao_vazio.png"
        }
        vida++

        if (vida > 3) {
            window.location.href = 'game_over.html'
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 150
    var posicaoY = Math.floor(Math.random() * altura) - 150

    posicaoX = Math.max(0, posicaoX)
    posicaoY = Math.max(0, posicaoY)

    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove()
    }
    if ((nivel === 'medio' || nivel === 'dificil') && Math.random() < 0.4) {
        var posicaoBX = Math.floor(Math.random() * largura) - 200;
        var posicaoBY = Math.floor(Math.random() * altura) - 200;
        posicaoBX = Math.max(0, posicaoBX);
        posicaoBY = Math.max(0, posicaoBY);

        var borboleta = document.createElement('img');
        borboleta.src = 'imagens/borboleta.png'; // Adicione essa imagem na pasta
        borboleta.className = 'borboleta ' + ladoAleatorio();
        borboleta.style.left = posicaoBX + 'px';
        borboleta.style.top = posicaoBY + 'px';
        borboleta.style.position = 'absolute';
        borboleta.style.width = '150px'; 
        borboleta.style.height = '150px';  
        borboleta.id = 'borboleta';
        borboleta.onclick = function () {
            this.remove();
            var coracao = document.getElementById('v' + vida);
            if (coracao) {
                coracao.src = "imagens/coracao_vazio.png";
            }
            vida++;
            if (vida > 3) {
                window.location.href = 'game_over.html';
            }
        };
        document.body.appendChild(borboleta);
    }else {
       document.body.appendChild(mosquito)
    }
    
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)
    return ['mosquito1', 'mosquito2', 'mosquito3'][classe]
}


function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)
    return classe === 0 ? 'ladoA' : 'ladoB'
}

var criaMosquito = setInterval(posicaoRandomica, criaMosquitoTempo)




 


