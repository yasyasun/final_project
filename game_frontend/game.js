console.log("Скрипт загружен");

const burgerMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");
burgerMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});

var buttonStart = document.querySelector(".button-start")
var ticTacToe = document.querySelector(".tic-tac-toe");
var blockPlayer = document.querySelector(".block-player");
var blockNowPlayer = document.querySelector(".block-player div");
var gameBlock = document.querySelectorAll(".block");
var mass = ["X", "0"];
var blockWinner = document.querySelector(".winner");

buttonStart.onclick = playGame;

function transformGame() {
    buttonStart.classList.toggle("hidden-button");
    ticTacToe.classList.toggle("open-game");
    blockPlayer.classList.toggle("close-block-player");
}

function endGame() {
    buttonStart.classList.remove("hidden-button");
    ticTacToe.classList.remove("open-game");
    blockPlayer.classList.add("close-block-player");
    buttonStart.innerHTML = "Играть снова";
    blockWinner.classList.remove("hidden-winner");
    setTimeout(function() {
         for(i = 0; i < gameBlock.length; i++) {
         gameBlock[i].innerHTML = "";
    }
    }, 1000)
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInner() {
    blockNowPlayer.innerHTML = mass[rand(0, mass.length-1)]
}

function nextPlayer() {
    if(blockNowPlayer.innerHTML === mass[0]){
        blockNowPlayer.innerHTML = mass[1];
    }
    else if(blockNowPlayer.innerHTML === mass[1]) {
        blockNowPlayer.innerHTML = mass[0];
    }
}

function indexOfMass(a, m) {
    var result;
    for(i = 0; i < m.length; i++) {
        if(a.indexOf(m[i]) === -1) result = -1;
    }
    if(result !== -1) return true;
    else if(result === -1) return false;
}

function checkWin() {
    var massWin = [ [0,1,2],[3,4,5],[6,7,8],
                  [0,3,6],[1,4,7],[2,5,8],
                  [0,4,8],[2,4,6] ];
    var x = [];
    var y = [];
    for(i = 0; i < gameBlock.length; i++) {
        if(gameBlock[i].innerHTML === "X") x.push(i);
        else if(gameBlock[i].innerHTML === "0") y.push(i);
    }
    for(z = 0; z < massWin.length; z++) {
        if(indexOfMass(x, massWin[z])) {
            endGame()
            return("Победил крестик");
        }
        
        if(indexOfMass(y, massWin[z])) {
            endGame()
            return("Победил нолик");
        }
    }
}

function stopPlay() {
    ticTacToe.onclick = function() {
        return false;
    }
}

function playGame() {
    transformGame();
    blockWinner.classList.add("hidden-winner");
    randomInner();
    var count = 0;
    ticTacToe.onclick = function(event) {
        if(event.target.className === "block" &&
           event.target.innerHTML === "") {
            event.target.innerHTML = blockNowPlayer.innerHTML;
            nextPlayer();
            count++;
            if(checkWin()) {
                blockWinner.innerHTML = "Игра закончена <br/>" + checkWin();
            };
            if(count === 9) {
                if(!checkWin()) {
                    endGame()
                    blockWinner.innerHTML = "Игра закончилась ничьей";
                }
            }
        }
    }  
}
