'use strict';
// declaring elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const diceEl = document.querySelector('.dice');
const dice2El = document.querySelector('.dice2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//declaring variables
let score, currentScore, activePlayer, gamePlaying;

//for initialization
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  diceEl.classList.add('hidden');
  dice2El.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';

  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');

  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

//rolling dice
btnRoll.addEventListener('click', function () {
  if (gamePlaying) {
    //generating a random dice
    var dice = Math.trunc(Math.random() * 6) + 1;
    var dice2 = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    dice2El.classList.remove('hidden');

    diceEl.src = `dice-${dice}.png`;
    dice2El.src = `dice-${dice2}.png`;

    //condition for rolled dice 1
    if (dice !== 1 && dice2 !== 1) {
      currentScore += dice + dice2;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch the player
      nextPlayer();
    }
  }
});

//hold dice
btnHold.addEventListener('click', function () {
  if (gamePlaying) {
    //adding current score to the active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //when winning the game
    if (score[activePlayer] >= 100) {
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';

      diceEl.classList.add('hidden');
      dice2El.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

//reset new game
btnNew.addEventListener('click', init);

//condition for next player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  currentScore = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
