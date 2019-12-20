//Deck Stuffs ---------------------------------------------------------------------------------------------
//Every New game that starts this is used to make the starting deck.
var createStartingDeck = function () {
    for (i = 0; i < 10; i++) {
        if (i < 5) {
            cardsInSession[i] = cards[0];
        } else {
            cardsInSession[i] = cards[1];
        }
    }
}

//Initiates the battle variables
var initBattle = function () {
    currentEnemy = enemies.normal[0]; //picks enemy
    shuffleSess2Deck();
}

//shuffles deck and slots it into the deck variable
var shuffleSess2Deck = function () {
    let tempD = cardsInSession;
    shuffle(tempD);
    cardsInDeck = tempD;
}

//gets the state of the card slot clicked and executes
var getSlotData = function (event) {
    if (this.attributes.state.textContent !== "empty") {
        var cardPosition = parseInt(this.attributes.position.textContent);
        hand2Flow(cardPosition);
    } else {
        console.log("do nothing");
    }
}

//moves the card from Hand to flow area
var hand2Flow = function (cardPosition) {
    cardsInFlow = cardsInHand[cardPosition]
}

//Moves cardsSession to deck.
var dealDeck = function () {
    for (var i = 0; i < 5; i++) {
        var cards = document.querySelectorAll(".cards")
        cards[i].setAttribute("state", "" + cardsInDeck[i].cardID);
        cardsInHand.push(cardsInDeck.shift());
        cards[i].innerText = cardsInHand[i].cardID;
    }
}

//Empties the hand into the discard pile
var discardHand = function () {
    var handSize = cardsInHand.length
    for (var i = 0; i < handSize; i++) {
        cardsInDiscard.push(cardsInHand.shift());
    }
}

var shuffleDiscard2Deck = function () {
    shuffle(cardsInDiscard);
    var discardSize = cardsInDiscard.length
    for (var i = 0; i < discardSize; i++) {
        cardsInDeck.push(cardsInDiscard.shift());
    };
}



//Combat Stuffs---------------------------------------------------------------------------------------------
































//Randomizer Stuffs-----------------------------------------------------------------------------------
var ranNumGen = function (numRange) {
    ranNum = Math.floor(Math.random()*numRange);
    console.log(ranNum);
    return ranNum;
};

//Well.... it shuffles.
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
} //it takes the