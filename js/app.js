/*
 * Create a list that holds all of your cards
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

let openCardsArray;

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


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function buildGrid(cardsArray) {
  openCardsArray = [];
  cardsArray.forEach(function(card, ind) {
    document.querySelectorAll('.deck i.fa')[ind].className = `fa ${card}`;
  });

  [...document.querySelectorAll('.card')].forEach(function (card) {
    if (card.classList.contains('open')) {
      card.classList.remove('open');
      card.classList.remove('show');
    }

    if (card.classList.contains('match')) {
      card.classList.remove('match');
      card.classList.remove('show');
    }
  })
}

function openCard(card) {
  card.classList.add('open');
  card.classList.add('show');
}

function closeCards(card1, card2) {
  setTimeout(function () {
    card1.classList.remove('open');
    card1.classList.remove('show');
    card2.classList.remove('open');
    card2.classList.remove('show');
  }, 200);
}


function addCardToOpen(card) {
  openCardsArray.push(card.id);
}

function matchCards(card1, card2) {
  card1.classList.remove('open');
  card2.classList.remove('open');
  card1.classList.add('match');
  card2.classList.add('match');

}

function checkNext() {
  if (openCardsArray.length === 2) {
    console.log(openCardsArray);
    if (document.getElementById(openCardsArray[0]).firstElementChild.classList[1] ===
      document.getElementById(openCardsArray[1]).firstElementChild.classList[1]) {
        matchCards(document.getElementById(openCardsArray[0]), document.getElementById(openCardsArray[1]));
        console.log('match');
        openCardsArray = [];
    } else {
      closeCards(document.getElementById(openCardsArray[0]), document.getElementById(openCardsArray[1]));
      console.log('dont');
      openCardsArray = [];
    }
  }
}

buildGrid(shuffle(cardsArray));

[...document.querySelectorAll('.card')].forEach(function (cardElement) {
  cardElement.addEventListener('click', function (event) {
    if (cardElement.classList.contains('match')) {
      return
    } else if (openCardsArray.length !== 0 && openCardsArray[0] === cardElement.id) {
      return
    } else {
      openCard(cardElement);
      addCardToOpen(cardElement);
      checkNext();
    }
  });
});

const startButton = document.querySelector('i.fa.fa-repeat');
startButton.addEventListener('click', function (event) {
  event.preventDefault();
  console.log('shuffle', cardsArray);
  buildGrid(shuffle(cardsArray));
});








/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
