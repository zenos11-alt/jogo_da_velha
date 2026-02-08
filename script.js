//dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let vez = '';
let warning = '';
let playing = false;

reset();

//eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {//percorre cada item
    item.addEventListener('click', itemClick);//add evento de click
});

//function
function itemClick(event) {
    let item = event.target.getAttribute('data-item')//pega o item q foi clicado
    if(playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';//limpa

    let random = Math.floor(Math.random() * 2);//gera numero aleatorio entre 0 e 1
    player = (random === 0) ? 'x' : 'o';//escolhe jogador

    for(let i in square) {
        square[i] = '';//percorre o tabuleiro
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {//percorre e verrifica se tem algo preeenchido
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)//pega item
            item.innerHTML = square[i];//se estiver preenchida ou vazio renderiza na tela
        }

        checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';//simplificado
    renderInfo();

    /*if(player === 'x') {
        player = 'o';
    } else {
        player = 'x';
    }*/
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;//para o jogo
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate';
        playing = false
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');//cria array - a1,a2,a3
        let hasWon  =  pArray.every(option => square[option] === player)//verrifica se tem algo preeenchido
        if(hasWon) {
            return true;
        }
    }
    return false//se nao houver vencedor
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true;
}