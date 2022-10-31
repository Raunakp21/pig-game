'use strict';

//current player
let activePlayer = 0;
let loseFlag = 0;

//Storing elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

function scoreReset() {
  activePlayer = 0;
  score0.textContent = '0';
  score1.textContent = '0';
  diceEl.classList.add('hidden');
  current0.textContent = '0';
  current1.textContent = '0';
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
}

function hold() {
  if (loseFlag == 1) {
    //reseting current score
    document.querySelector(`#current--${activePlayer}`).textContent = '0';
    loseFlag = 0;
  } else {
    document.querySelector(`#score--${activePlayer}`).textContent =
      Number(document.querySelector(`#score--${activePlayer}`).textContent) +
      Number(document.querySelector(`#current--${activePlayer}`).textContent);

    if (
      Number(document.querySelector(`#score--${activePlayer}`).textContent) >=
      100
    ) {
      alert(`Player${activePlayer + 1} won the Game 🎉`);
      scoreReset();
    }
    //reseting current score
    document.querySelector(`#current--${activePlayer}`).textContent = '0';
  }
  //switching players
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  //UI changes after player change
  if (activePlayer) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
}
//Initial Value reset
scoreReset();

//Event handler for dice roll click
btnRoll.addEventListener('click', function () {
  //1. generate a random dice number from 1 to 6
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (dice == 1) {
    loseFlag = 1;
    hold();
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
  } else {
    //2. show this number in the dice images
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. add this number to the current players score.
    document.getElementById(`current--${activePlayer}`).textContent =
      Number(document.getElementById(`current--${activePlayer}`).textContent) +
      dice;
  }
});

//Event Handler for New Game or reset
btnHold.addEventListener('click', hold);

//Event Handler for Hold/Switch
btnNew.addEventListener('click', scoreReset);
