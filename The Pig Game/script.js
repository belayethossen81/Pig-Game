"use strict";

// Selecting Element
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Condition
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");

}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

// Rolling Dic Functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. Generating A Rendom Dice Roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display Dice
        diceEl.classList.remove("hidden");
        diceEl.src = `images/dice-${dice}.png`;

        // 3. Check For Rolled 1.
        if (dice !== 1) {
            // Add Dise To Current Score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch To Next Player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        // 1.Add Current Score To Active Player Score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2.Check If Player's Score >= 100
        if (scores[activePlayer] >= 100) {
            // Finish The Game
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            //Switch To Next Player
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);