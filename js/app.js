const myDeckElement = document.querySelector('.deck');
const newGameButton = document.querySelector('.restart');
const endGameScreen = document.querySelector('.modal')
const movesCounter = document.querySelector('.moves');
const my3rdStar = document.getElementById('third_star');
const my2ndStar = document.getElementById('second_star');
let cardsFlipped = 0, cardOne, cardTwo, movesTaken = 0;
let gameTime, timerRefresh;
let howManyStars = 3;

shuffleBoard();
gameTimer();


// Create Three Event Listeners for the Game
// 1 of 3 - Create An Event Listener on the Unordered List with ".deck" Class.
// This event listener will handle what to do whenever the player clicks a Card on the board.

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

// 2 of 3 - Create An Event Listener on the DIV with the ".restart" class.
// This event listener will handle resetting the Game board when the user clicks the restart icon.

// NOTE: I WILL PROBABLY NEED TO MOVE EVERYTHING IN HERE INTO ITS OWN FUNCTION AND JUST CALL THE FUNCTION HERE
// THAT WAY THE POST GAME WON RESTART OPTION CAN CALL THE SAME FUNCTION.

newGameButton.addEventListener('click', function () {
    newGame();
});


// 3 of 3 - Create An Event Listener on the div with Modal / Game End Screen "Play again" question.

endGameScreen.addEventListener('click', function (){
    // If button clicked on end screen model
    // Reset the game board if player clicks to play again.
    if (event.target.nodeName === 'BUTTON') {
        // console.log(event.target.id);
        if (event.target.id === 'play-again') {
            newGame();
        }
        // close out modal after either button pushed.
        endGameScreen.classList.add("invisible");
    }
});


// ALL FUNCTIONS CALLED FROM ABOVE OR BELOW.


function newGame() {
    movesTaken = -1;
    movesCountAndScore();
    shuffleBoard();
    clearInterval(timerRefresh);
    gameTimer();
}

function movesCountAndScore() {

    movesTaken++;
    movesCounter.textContent = movesTaken;

    // my2ndStar and my3rdStar declared at top of script.

    if (movesTaken === 21) {
        my3rdStar.classList.add("invisible");
        console.log(my3rdStar);
        howManyStars = 2;
    } else if (movesTaken === 31) {
        my2ndStar.classList.add("invisible");
        console.log(my2ndStar);
        howManyStars = 1;
    } else if (movesTaken === 0) {
        if (my3rdStar.classList.contains("invisible")) {
            my3rdStar.classList.remove("invisible");
            howManyStars = 3;
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
        // Stop game timer
        clearInterval(timerRefresh);

        endGameScreen.classList.remove("invisible");

        document.getElementById("stat-time").innerHTML = gameTime;

        // use howManyStars value to loop and create as many stars li as need to visually have number of stars in stat output

        // Create document fragment to stage stars to add to user output / modal screen
        const myStarDocFrag = document.createDocumentFragment();

        // Create new list item with star class (for star symbol styling) for each star player has left
        for (i = 1; i <= howManyStars; i++) {
            const newStarsLI = document.createElement('li');
            newStarsLI.classList.add('fa');
            newStarsLI.classList.add('fa-star');
            myStarDocFrag.appendChild(newStarsLI);
        }

        // Add number of stars player has left to modal game stat screen
        let getStarsUL = document.querySelector('.modal-stars');
        getStarsUL.innerHTML = "";
        getStarsUL.appendChild(myStarDocFrag);

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

function gameTimer() {

    // Below is modified approach in w3schools tutorial for countdown timer here: 
    // https://www.w3schools.com/howto/howto_js_countdown.asp

    const startTime = new Date().getTime();
    document.getElementById("timer").innerHTML = "0:00";

    // console.log(startTime);

    // Set timer refresh to every one second (see "1000" parameter send to setInterval function)
    timerRefresh = setInterval(function() {

        // Capture the current time in a variable
        const currentTime = new Date().getTime();

        // Subtract the start time from current time to get time elapsed since start of game.
        const timeElapsed = currentTime - startTime;

        console.log(timeElapsed);

        // Convert timeElapsed variable into minutes and seconds to output to screen.
        const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

        // Add leading zero to seconds variable where value < 10 seconds.
        if (seconds < 10) {
            numToString = seconds.toString();
            // console.log(numToString);
            seconds = "0" + numToString;
        }

        // Display output on board in elment with id="timer"
        gameTime = minutes + ":" + seconds;
        document.getElementById("timer").innerHTML = gameTime;

    }, 1000);
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
