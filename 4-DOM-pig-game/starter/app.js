/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0,0];
let roundScore = 0;
let activePlayer = 0;

document.getElementById("score-0").textContent = '0';
document.getElementById("score-1").textContent = '0';
document.getElementById("current-0").textContent = '0';
document.getElementById("current-1").textContent = '0'; 



document.querySelector(".dice").style.display = 'none';

document.querySelector(".btn-roll").addEventListener('click', function() {
    //Generate random number between 1 and 6 with dice
    let dice = Math.floor(Math.random() * 6 + 1);
    //Change the dice display to block or visible
    let diceDom = document.querySelector(".dice");
    diceDom.style.display = 'block';
    //Select the appropriate image source
    diceDom.src = "dice-" + dice + ".png";

    //Update the round score only if dice greater than 1 or not equal to 1
    if(dice !== 1) {
        //Update the score
        roundScore += dice;
        //Display the score
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
        /*Other player's turn
        if(activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }*/
        nextPlayer();
    }
});

document.querySelector(".btn-hold").addEventListener('click', function() {
    //1. Update the global player score
        scores[activePlayer] += roundScore;
    //2. Update the UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    //3. Check if global score is greater or equal to 100
         if(scores[activePlayer] >= 100) {
        //Change text from player number to winner
        document.querySelector("#name-" + activePlayer).textContent = 'Winner!!!';
        //Remove the dice
        document.querySelector(".dice").style.display = 'none';
        //Remove the active class from the winner 
        document.querySelector("player-" + activePlayer + "-panel").classList.remove("active");
        //Add the winner presentation style 
        document.querySelector("player-" + activePlayer + "-panel").classList.remove("winner");
    } else {
    //4. Next Player
         nextPlayer();
        }
    });

function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        //Reset current score for eacch player
        document.getElementById("current-0").textContent = roundScore;
        document.getElementById("current-1").textContent = roundScore;
        //Toggle the css of the active player by removing/adding the active class
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        //Remove the dice to show other player turn
        document.querySelector(".dice").style.display = 'none';
}