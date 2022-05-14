const gamesquares = document.querySelectorAll('.gamesquare');
const gameboard = document.getElementById('gameboard');
let xTurn = true;
const X_CLASS = 'x';
const O_CLASS = 'o';
const PLAYERS = {
    true:['x'],
    false:['o']
};


document.addEventListener('DOMContentLoaded',gameStart);
gamesquares.forEach(item=>{
    item.addEventListener('click',pickSquare,{once:true})
});



function gameStart(){
    gameboard.classList.add(currentPlayer());
}
function pickSquare(e){
    const currentSquare = e.target;
    const currentClass = currentPlayer();
    placeMark(currentSquare, currentClass);
    //place a mark
    //increment turn
    //check win condition
    //check draw

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
