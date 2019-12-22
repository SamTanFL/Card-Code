//Deck Stuffs ---------------------------------------------------------------------------------------------
//Every New game that starts this is used to make the starting deck.
var createStartingDeck = function () {
    var tempCards = cards.slice();
    for (i = 0; i < 10; i++) {
        if (i < 5) {
            cardsInSession[i] = tempCards[0];
        } else {
            cardsInSession[i] = tempCards[1];
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
    var tempD = cardsInSession.slice();
    shuffle(tempD);
    cardsInDeck = tempD.slice();
}

//gets the state of the card slot clicked and executes
var getSlotData = function (event) {
    if (this.attributes.state.textContent !== "empty" && this.attributes.state.textContent !== "used") {
        var cardPosition = parseInt(this.attributes.position.textContent);
        handToFlow(cardPosition);
    } else {
        console.log("do nothing");
    }
}

//moves the card from Hand to flow area
var handToFlow = function (cardPosition) {
    var tempHands = cardsInHand.slice();
    if (cardsInFlow[0] == "empty") {
        cardsInFlow[0] = tempHands[cardPosition];
        event.target.setAttribute("state", "used");
    } else if (cardsInFlow[1] == "empty") {
        cardsInFlow[1] = tempHands[cardPosition];
        event.target.setAttribute("state", "used");
    } else if (cardsInFlow[2] == "empty") {
        cardsInFlow[2] = tempHands[cardPosition];
        event.target.setAttribute("state", "used");
    } else {
        alert("Flow is Full")
    }
}

//Moves cardsSession to deck.
var dealDeck = function () {
    for (var i = 0; i < 5; i++) {
        var card = document.querySelectorAll(".cards")
        cardsInHand.push(cardsInDeck.shift());
        card[i].setAttribute("state", "" + cardsInHand[i].cardID);
        cardsInHand[i].cardSlot = parseInt(document.querySelectorAll(".cards")[i].attributes.position.textContent);
        card[i].innerText = cardsInHand[i].cardID;
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

//moves card from flow back to hand
var flowToHand = function (event) {
    var flowPosition = parseInt(this.attributes.position.textContent);
    cardInFlow[flowPosition] = "empty";
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