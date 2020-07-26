/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Lec 48

// 1)Create a fundamental game variable 
var scores, currentScore, activePlayer, lastdice1, lastdice2, dice1, dice2, dice, storeSix, winningScore; 
init();
// used in init function
// scores = [0,0];
// currentScore = 0;
// activePlayer = 0;

// 2) how to generate ramdom number
// dice = Math.floor(Math.random() * 6) + 1; 

// 3) manipulating the DOM using querySelector and innerHTML
// document.querySelector("#current-" + activePlayer).textContent = dice; // setting the #current-0 or #current 1 value
// document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>'; // we can set HTML tag selected through querySelector as a child

// 4) reading value from DOM
// var x = document.querySelector("#score-" + activePlayer).textContent; // getting the value from score-0 or score-1 id (can use .innerHTML instead of .textContent) 

// 5) How to change CSS Styles
// document.querySelector(".dice").style.display = "none";





// Lec 49

// 4) Another way to select ID (apart from querySelector)
// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';
// document.querySelector(".btn-new").style.display = 'none';


// function clicker(){
// }
function nextPlayer(){
    console.log("next player");
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
    document.querySelector(".dice-1").style.display = 'none';
    document.querySelector(".dice-2").style.display = 'none';
    storeSix = 0;
    currentScore = 0;
    dice1 = 0;
    dice2 = 0;
    dice = 0;
}

// 1) How to setup an Event Handler
// 2) adding clicker argument (not clicker()) after 'click', calls the function clicker using through another function ie; eventListener() function which is called callback function..
document.querySelector(".btn-roll").addEventListener('click', function(){ // 3) this is anonymous function
    // i. get the random number
    dice1 = Math.floor(Math.random() * 6) + 1; 
    dice2 = Math.floor(Math.random() * 6) + 1; 
    // ii. Display the result
    var diceDOM1 = document.querySelector(".dice-1");
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'image/dice-' + dice1 +'.png'; // 5) Change img in img element 

    var diceDOM2 = document.querySelector(".dice-2");
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'image/dice-' + dice2 +'.png'; // 5) Change img in img element 
    
    console.log("dice1 "+dice1+" dice2 "+dice2);
    dice = dice1 + dice2;
    // iii. Update the round score if the score is greater than 1


    if( (dice1 === 6) ^ (dice2 === 6)){
        storeSix++;
        if((lastdice1 === 6) || (lastdice2 === 6))
            storeSix++;
        console.log("storeSix"+ storeSix);
        if( storeSix >= 2 ){
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = '0';
            console.log("dice1 6 or dice2 6 called");
            nextPlayer();
        }
    } else{
        storeSix = 0;
    }

    
    if( (dice1 > 1 && dice2 > 1)){
        
        document.getElementById('current-' + activePlayer).textContent = dice;
        currentScore += dice;
        
        if( dice1 === 6 && dice2 === 6){
            storeSix = storeSix + 2;
            console.log("storeSix"+ storeSix);
            
            if( storeSix >= 2 ){
                scores[activePlayer] = 0;
                console.log("dice1 dice2 6 called");
                document.getElementById('score-'+activePlayer).textContent = '0';
                nextPlayer();
            }
        }
    } else{
        if( dice1 === 1 || dice2 === 1 ){
            console.log("reset");
            nextPlayer();
        }
    }

    lastdice1 = dice1;
    lastdice2 = dice2;
    console.log(currentScore);

});


// Lec 50 and 51
document.querySelector(".btn-hold").addEventListener('click', function(){
   // store currentScore of activePlayer in scores[] and reflect in #score-0 or #score-1 DOM
   scores[activePlayer] += currentScore;
   document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];
   
    // if score > 100 player won
   if (scores[activePlayer] >= Number(winningScore)){
        winner();
    } else{
        // on click hold button toggle activePlayer
        nextPlayer();
    }

});

// calling function init to reset all Lec 52 and 53
document.querySelector(".btn-new").addEventListener("click", init);


function winner(){
        document.getElementById("name-"+activePlayer).textContent = "WINNER!";
        var player = document.querySelector(".player-"+activePlayer+"-panel");
        player.classList.add('winner');
        player.classList.remove('active');
        document.querySelector(".btn-roll").style.display = 'none';
        document.querySelector(".btn-hold").style.display = 'none';
        document.querySelector(".btn-new").style.display = 'block';
        document.querySelector(".dice-1").style.display = 'none';
        document.querySelector(".dice-2").style.display = 'none';
}

function init(){
    document.querySelector(".score").style.display = 'block';
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    storeSix = 0;
    winningScore = 0;
    lastdice1 = 0;
    lastdice2 = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(".btn-roll").style.display = 'none';
    document.querySelector(".btn-hold").style.display = 'none';
    document.querySelector(".btn-new").style.display = 'none';
    document.querySelector(".dice-1").style.display = 'none';
    document.querySelector(".dice-2").style.display = 'none';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".input").style.display = 'block';
    document.getElementById("quantity").value = ' ';
    
    var player0 = document.querySelector(".player-0-panel");
    player0.classList.remove('active');
    player0.classList.add('active');// Why? because there is already an active class. Adding another will have two active class which we dont want
    player0.classList.remove('winner');
    
    var player1 = document.querySelector(".player-1-panel");
    player1.classList.remove('active');
    player1.classList.remove('winner');
}

//Set the score to Win
document.querySelector("#submit").addEventListener("click", function(){
    winningScore = document.getElementById("quantity").value;
    document.querySelector(".input").style.display = 'none';
    document.querySelector(".score").style.display = 'none';

    document.querySelector(".btn-roll").style.display = 'block';
    document.querySelector(".btn-hold").style.display = 'block';
    document.querySelector(".dice-1").style.display = 'block';
    document.querySelector(".dice-2").style.display = 'block';
});