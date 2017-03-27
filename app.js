/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,isPlaying,diceDOM;

gameInit();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if(isPlaying){
    if (scores[activePlayer] <= 50){
    // 1. Generate a dice value
    var dice = Math.floor(Math.random()*6 + 1);

    // Check Values
    if (dice != 1){
    // 2. Update Values
    roundScore += dice;
    scores[activePlayer] += dice;

    if (scores[activePlayer] > 50){
     winnerSet();
    }
    // 3. Update UI
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    document.getElementById("current-" + activePlayer).textContent = roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    } else{
        scores[activePlayer] -= 5;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        NextPlayer();
        diceDOM.style.display = "block";
        diceDOM.src = "dice-1.png";
    }
    } else {
       winnerSet();
    }
    }

});

document.querySelector('.btn-hold').addEventListener('click',NextPlayer);

document.querySelector('.btn-new').addEventListener('click',gameInit);

function NextPlayer(){

        if (isPlaying){
        diceDOM.style.display = "none";
        activePlayer = (activePlayer===0) ? 1 : 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        roundScore = 0;
        document.getElementById("current-0").textContent = 0;
        document.getElementById("current-1").textContent = 0;
        }
}

function winnerSet(){
        winnerTextDOM = document.getElementById('name-' + activePlayer);
        winnerTextDOM.textContent = "WINNER!";
        winnerTextDOM.style.color = "#EB4D4D"
        winnerTextDOM.style.fontWeight = 300;
        winnerTextDOM.style.transition = "all 2s ease";
        diceDOM.style.display = "none";
        isPlaying = false;
}

function gameInit(){

scores = [0,0];
roundScore = 0;
activePlayer = 0;

isPlaying = true;

diceDOM = document.querySelector(".dice");
diceDOM.style.display = "none";

document.getElementById("score-0").textContent = 0;
document.getElementById("score-1").textContent = 0;
document.getElementById("current-0").textContent = 0;
document.getElementById("current-1").textContent = 0;

document.getElementById("name-0").textContent = "Player 1";
document.getElementById("name-1").textContent = "Player 2";


}
