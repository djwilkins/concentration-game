/*
 * Create a list that holds all of your cards
 */

const myDeckElement = document.querySelector('.deck');
const newGameButton = document.querySelector('.restart');
const movesCounter = document.querySelector('.moves');
let cardsFlipped = 0, cardOne, cardTwo, movesTaken = 0;

shuffleBoard();

myDeckElement.addEventListener('click', function (event) {
    if (event.target.nodeName === 'LI') {
        
        // Capture state of selected card in variables.
        const isOpen = event.target.classList.contains('open');
        const isMatched = event.target.classList.contains('match');

        // If card not already turned over, turn it over.
        if (isOpen || isMatched) {
            console.log("Card already selected!");
        } else {
            event.target.classList.add("open", "show");
            cardsFlipped++;
            movesCountAndScore();
        }
        
        console.log(cardsFlipped);

        if (cardsFlipped === 1) {
            cardOne = event.target;
        } else if (cardsFlipped === 2) {
            // cardTwo = event.target.querySelector('i');
            cardTwo= event.target;
            // If two cards flipped over, check if a match and then see if all matches found.
                cardsMatch(cardOne, cardTwo);
        }

    }
});

newGameButton.addEventListener('click', function () {
    movesTaken = -1;
    movesCountAndScore();
    shuffleBoard();
});


function movesCountAndScore() {

    movesTaken++;
    movesCounter.textContent = movesTaken;

    const my3rdStar = document.getElementById('third_star');
    const my2ndStar = document.getElementById('second_star');

    if (movesTaken === 21) {
        my3rdStar.classList.add("invisible");
        console.log(my3rdStar);
    } else if (movesTaken === 31) {
        my2ndStar.classList.add("invisible");
        console.log(my2ndStar);
    } else if (movesTaken === 0) {
        if (my3rdStar.classList.contains("invisible")) {
            my3rdStar.classList.remove("invisible");
        }
        if (my2ndStar.classList.contains("invisible")) {
            my2ndStar.classList.remove("invisible");
        }
    }

}


function cardsMatch(card1, card2) {
    const cardOneFace = card1.querySelector('i').classList.value;
    const cardTwoFace = card2.querySelector('i').classList.value;

    // Delay result of two picks to give player time to see both selected first (with open styles).
    setTimeout(function() {
        // If cards match, update classes to match
        if (cardOneFace === cardTwoFace) {
            window.alert("Match!");
    
            card1.classList.add("match");
            card2.classList.add("match");
        } else {
            window.alert("Sorry, not a match!");
        }
        card1.classList.remove("open", "show");
        card2.classList.remove("open", "show");
        cardsFlipped = 0;

        // Check to see if all matches found and game over.
        isGameOver();
    }, 100);

}

function isGameOver() {
    const myCards = document.querySelectorAll('.card');
    let matchCount = 0;
    myCards.forEach(function(card) {
        if (card.classList.contains('match')) {
            matchCount++;    
        }
    });

    if (matchCount === 16) {
        window.alert("You won!");
        // Add other content for here
    }
    
}


 function shuffleBoard() {
    let getCardFaces = [];
    let stageCardFaces = [];
    let getDeck = document.querySelector('.deck');
    // Pull all card face class values from html doc.
    getCardFaces = document.querySelectorAll('.card i');

    getCardFaces.forEach(function(face) {
        stageCardFaces.push(face.classList.value);
    });

    // Shuffle Card Face Values in Array
    stageCardFaces = shuffle(stageCardFaces);

    const myDocFrag = document.createDocumentFragment();

    // Loop through all shuffled card values to create new HTML elements
    stageCardFaces.forEach(function(newFace) {
        const newCardElement = document.createElement('li');
        newCardElement.classList.add('card');
        newCardElement.innerHTML = '<i class="' + newFace + '"></i>'
        myDocFrag.appendChild(newCardElement);
        // console.log(newCardElement);
    });

    // Erase former ul .deck child elements and replace with newly shuffled elements.
    getDeck.innerHTML = "";
    getDeck.appendChild(myDocFrag);
};




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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
