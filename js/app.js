/*
 * List that holds all the cards
 */
 const cardsArray = [
   'fa-diamond',
   'fa-paper-plane-o',
   'fa-anchor',
   'fa-bolt',
   'fa-cube',
   'fa-leaf',
   'fa-bicycle',
   'fa-bomb',
   'fa-diamond',
   'fa-paper-plane-o',
   'fa-anchor',
   'fa-bolt',
   'fa-cube',
   'fa-leaf',
   'fa-bicycle',
   'fa-bomb',
];

const startButton = document.querySelector('i.fa.fa-repeat');
const movesElement = document.querySelector('.score-panel .moves');
const starsElement = document.querySelector('.score-panel .stars');


let openCardsArray = [];
let moveCounter = 0;
let matchedPairsCounter = 0;

/*
* timer
*/

let sec = 0;

function pad(val) {
  return val > 9 ? val : '0' + val;
}

function changeTimer() {
  document.querySelector('.timer').innerHTML =
    `${pad(parseInt(sec/60, 10))}:${pad(++sec % 60)}`;
}

let timer = setInterval(() => changeTimer(), 1000);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function buildGrid(cardsArray) {
  // select all elements inside deck with the class 'fa'
  // and modify the classes
  cardsArray.forEach(function(card, ind) {
    document.querySelectorAll('.deck i.fa')[ind].className = `fa ${card}`;
  });
}

function openCard(card) {
 card.classList.add('open');
}

function showSymbol(card) {
  card.classList.add('show');
}

function addCardToOpenCards(card) {
  openCardsArray.push(card.id);
}

function matchCards(card1, card2) {
  card1.classList.remove('open');
  card2.classList.remove('open');
  card1.classList.add('match');
  card2.classList.add('match');
}

function closeCards(card1, card2) {
  setTimeout(function () {
    card1.classList.remove('open');
    card2.classList.remove('open');
    card1.classList.remove('show');
    card2.classList.remove('show');
  }, 300);
}

function incrementMoveCounter() {
  moveCounter++;
  movesElement.textContent = moveCounter === 1 ? '1 Move' : `${moveCounter} Moves`;
  if (moveCounter === 3) {
    starsElement.removeChild(starsElement.lastElementChild);
  }
  if (moveCounter === 5) {
    starsElement.removeChild(starsElement.lastElementChild);
  }
}

function checkIfDone() {
  if (matchedPairsCounter === 8) {
    const stars = document.querySelectorAll('.score-panel li').length;
    clearInterval(timer);

    //change content of modal
    document.querySelector('.modal-time span').innerHTML = `${pad(parseInt(sec/60, 10))}:${pad(sec % 60)}`;
    document.querySelector('.modal-score span').innerHTML =
      `${stars} ${stars === 1 ? 'star' : 'stars'}`;
    document.querySelector('.modal').style.display = 'block';
  }
}

function restoreThreeStars() {
  const starsNumber = starsElement.querySelectorAll('li').length;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 3 - starsNumber; i++) {
    const newListElement = document.createElement('li');
    const newClassElement = document.createElement('i');
    newClassElement.textContent = '';
    newClassElement.classList.add('fa');
    newClassElement.classList.add('fa-star');
    newListElement.appendChild(newClassElement);
    fragment.appendChild(newListElement);
  }
  starsElement.appendChild(fragment);
}

function restartGame() {
  // clear all the elements for score-panel
  moveCounter = 0;
  movesElement.textContent = '0 Moves';
  restoreThreeStars();

  // clear all the elements
  matchedPairsCounter = 0;
  openCardsArray = [];

  // start new timer
  clearInterval(timer);
  sec = 0;
  timer = setInterval(() => changeTimer(), 1000);

  // close all the open cards
  [...document.querySelectorAll('.card')].forEach(function (card) {
    if (card.classList.contains('open')) {
      card.classList.remove('open');
      card.classList.remove('show');
    }

    if (card.classList.contains('match')) {
      card.classList.remove('match');
      card.classList.remove('show');
    }
  });

  // mix cards and build a new grid
  buildGrid(shuffle(cardsArray));
}

buildGrid(shuffle(cardsArray));

// add listener to restart button
startButton.addEventListener('click', function (event) {
  event.preventDefault();
  restartGame();
});

// add listener to deck
document.querySelector('.deck').addEventListener('click', function (event) {
  if(event.target.classList.contains('show') ||
    event.target.classList.contains('deck')) {
    return
  }
  openCard(event.target);
  showSymbol(event.target);
  addCardToOpenCards(event.target);
  if (openCardsArray.length === 2) {
    const firstCard = document.getElementById(openCardsArray[0]);
    const secondCard = document.getElementById(openCardsArray[1]);
    if (firstCard.firstElementChild.classList[1] ===
      secondCard.firstElementChild.classList[1]) {
        matchCards(firstCard, secondCard);
        matchedPairsCounter++;
        checkIfDone();
    } else {
      closeCards(firstCard, secondCard);
    }
    openCardsArray = [];
    incrementMoveCounter();
  }
});

// add listener to the modal
document.addEventListener('click', function (event) {
  if (event.target === document.querySelector('.close')
    || event.target === document.querySelector('.modal')) {
    document.querySelector('.modal').style.display = 'none';
  }

  if (event.target === document.querySelector('button')) {
    document.querySelector('.modal').style.display = 'none';
    restartGame();
  }
});
