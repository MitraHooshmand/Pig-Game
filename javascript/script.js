"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];
let playing = true;

const switchUsers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomDice}.png`;
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      /////// swich the useres
      switchUsers();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    ///////// add current score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    ////////  if score >=100, game will finish   playing=fale
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      //   player0El.classList.add("player--winner");
      diceEl.classList.add("hidden");
      btnRoll.classList.add("disable");
    } else {
      /////// finish the game
      switchUsers();
    }
  }
});

btnNew.addEventListener("click", function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  btnRoll.classList.remove("disable");

  scores = [0, 0];
  currentScore = 0;

  playing = true;
});
