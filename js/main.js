const gamesquares = document.querySelectorAll('.gamesquare');
const gameboard = document.getElementById('gameboard');
const gameMessage = document.querySelector('[data-win-message]');
const gameMessageContainer = document.querySelector('[data-win-message]').parentElement;
const restartButton = document.querySelector('#restartButton');

let xTurn = true;
//players as array in case I want to add different styles of player1 v player2
const PLAYERS = {
    true:['x'],
    false:['o']
};
const X_CLASS = PLAYERS[true][0];
const O_CLASS = PLAYERS[false][0];

const WIN_CONDITIONS = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];

restartButton.addEventListener('click', restartGame);
document.addEventListener('DOMContentLoaded',gameStart);




function gameStart(){
    gameboard.classList.add(currentPlayer());
    gamesquares.forEach(item=>{
        item.classList.remove(O_CLASS);
        item.classList.remove(X_CLASS);
        item.addEventListener('click',pickSquare,{once:true});
    });
}
function pickSquare(e){
    const currentSquare = e.target;
    const currentClass = currentPlayer();
    let gameStatus;
     //place a mark
    placeMark(currentSquare, currentClass);
    //increment turn
    //check win condition
    if(checkForWin(currentClass)){
        gameStatus = 1;
        resolveGame(gameStatus,currentClass)
    }else if(gameBoardFull()){
        gameStatus = 2;
        resolveGame(gameStatus,currentClass)
    }
    
    
    
    //check draw

}
function gameBoardFull(){
    return (document.querySelectorAll('.gamesquare.x').length + document.querySelectorAll('.gamesquare.o').length)>=9;
}
function resolveGame(condition,player_class){
    if(condition === 2){
        gameMessage.innerText = 'Draw!';
    }else{
        gameMessage.innerText = `${player_class} wins`
    }
    gameMessageContainer.classList.add('show');
}
function currentPlayer(){
    return PLAYERS[xTurn][0];
}
function nextPlayer(){
    return PLAYERS[!xTurn][0];
}
function placeMark(square, className){
    square.classList.add(className);
    nextTurn();
}
function nextTurn(){
    gameboard.classList.replace(currentPlayer(),nextPlayer());
    xTurn = !xTurn;
}
function checkForWin(currentPlayer){
    return WIN_CONDITIONS.some(condition=>{
        return condition.every(index=>{
            return gamesquares[index].classList.contains(currentPlayer)
        })
    })
}

function restartGame(){
    gameMessageContainer.classList.remove('show');
    gameStart();
}
